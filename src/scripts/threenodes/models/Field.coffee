define [
  'Underscore',
  'Backbone',
  'cs!threenodes/utils/Indexer',
  # todo: remove the following... just wrong to create view from model
  # but going step by step to not break everything
  'cs!threenodes/views/SidebarField',
], (_, Backbone) ->
  #"use strict"

  ### Field model ###
  namespace "ThreeNodes",
    NodeField: class NodeField extends Backbone.Model
      # Create a static indexer used if the field is not part of a nodes collection (tests)
      @STATIC_INDEXER: new ThreeNodes.Indexer()

      defaults: () ->
        fid: -1
        name: "fieldname"
        machine_name: "fieldname-nid"
        is_output: false
        value: 0
        default: null

      # Override the backbone sync method since the field is not directly stored on a server
      sync: () =>

      # A field is always valid
      _validate: (attrs, options) => return true

      # override the backbone set method if the key is "value"
      # this is one of the most called function so this needs to be fast
      set: (key, value, options = {}) =>
        if key == "value"
          this.attributes[key] = value
          return this

        super

      load: (data) =>
        # Return without doing anything if there is no data
        if !data && data != false
          return

        if $.type(data) != "object"
          # If the loaded data is not an object simply apply the value
          @setValue(data)
        else
          # If the data is an object then directly apply each object properties to the value
          for property of data
            @attributes.value[property] = data[property]
        return this

      initialize: (options) =>
        self = this
        # Keep reference to some variables
        @node = options.node
        @subfield = options.subfield
        indexer = options.indexer || ThreeNodes.NodeField.STATIC_INDEXER

        # Common field variables
        @proxy = false
        @changed = true

        # Array containing all connections from and to this field
        @connections = []

        # Callback called when the value is changed
        # todo: replace it with the backbone standard way?
        @on_value_update_hooks = {}

        # Field machine_name must be unique inside each nodes
        @set("machine_name", @get("name"))

        # For proxyfields we append the subfield node id
        # since the same field name can be in different subnodes
        if @subfield && @subfield.node
          @set("machine_name", @get("name") + "-" + @subfield.node.get("nid"))
        if @get("fid") == -1
          @set("fid", indexer.getUID())

      remove: () =>
        delete @on_value_update_hooks
        delete @node
        delete @connections
        delete @button
        delete @proxy
        delete @subfield
        @destroy()

      setValue: (v) =>
        # Set the 'changed' flag on the field and on the node
        @changed = true
        if @node then @node.dirty = true

        # Define references to the previous and current value
        prev_val = @attributes["value"]
        new_val = @onValueChanged(v)

        # remove all null values from the array
        if $.type(new_val) == "array"
          tmp_val = _.filter new_val, (item) ->
            item != null
          if this.constructor == Array
            new_val = tmp_val
          else
            if tmp_val.length != 0
              new_val = tmp_val
            else
              new_val = null

        # Reset the value if it's null and it has a default
        if new_val == null
          default_val = @attributes["default"]
          if default_val != null && default_val != undefined
            prev_val = default_val
          new_val = prev_val

        # Set the value
        @attributes["value"] = new_val

        # Call the on_value_update hooks
        for hook of @on_value_update_hooks
          @on_value_update_hooks[hook](new_val)

        # If this is an output and it is connected, propagate the value to the inputs
        if @attributes["is_output"] == true
          for connection in @connections
            connection.to_field.setValue(new_val)

        # Handle relation between field and subfields (for grouping)
        if @subfield && @attributes["is_output"] == false
          # propagate the value to the subfield
          @subfield.setValue(new_val)
        else if @proxy && @attributes["is_output"] == true
          # propagate the value to the proxy field
          @proxy.setValue(new_val)
        return true

      getValue: (index = 0) =>
        val = @attributes["value"]
        if $.type(val) != "array"
          return val
        else
          return val[index % val.length]

      isChanged: () =>
        res = @changed
        @changed = false
        res

      isConnected: () =>
        @connections.length > 0

      getSliceCount: () =>
        val = @attributes["value"]
        if jQuery.type(val) != "array"
          return 1
        return val.length

      isAnimationProperty: () =>
        if this.constructor == Float || this.constructor == Bool
          return true
        return false

      toJSON : () =>
        res =
          name: @get("name")

        # Add the node nid for fields that are part of subnodes (group)
        if @subfield
          res.nid = @subfield.node.get("nid")

        # Help avoid cyclic value
        val = @get("value")
        val_type = jQuery.type(val)
        if val_type != "object" && val_type != "array"
          res.val = val

        # We may still need to save basic values
        if val_type == "object"
          if val.constructor == THREE.Vector2 || val.constructor == THREE.Vector3 || val.constructor == THREE.Vector4 || val.constructor == THREE.Color
            res.val = val

        return res

      renderConnections: () =>
        for connection in @connections
          connection.render()
        true

      renderSidebar: =>
        false

      computeValue : (val) =>
        val

      addConnection: (c) =>
        if @connections.indexOf(c) == -1
          @connections.push c
          if @get("is_output") == true
            @node.addOutConnection(c, this)
          @node.disablePropertyAnim(this)
        c

      unregisterConnection: (c) =>
        @node.removeConnection(c)

        ind = @connections.indexOf(c)
        if ind != -1
          @connections.splice(ind, 1)
        if @connections.length == 0
          @node.enablePropertyAnim(this)

      # remove all connections
      removeConnections: () =>
        @connections[0].remove() while @connections.length > 0

      onValueChanged: (val) =>
        self = this
        if $.type(val) == "array"
          return _.map(val, (n) -> self.computeValue(n))

        return @computeValue(val)

      createSidebarContainer: (name = @get("name")) =>
        sidebar_container = new ThreeNodes.SidebarField
          fid: @get("fid")
          model: @
          name: name
          el: $("#tab-attribute")

        $target = sidebar_container.container
        return $target

      addTextfieldSlider: ($el) =>
        $parent = $el.parent()
        on_slider_change = (e, ui) ->
          $el.val(ui.value)
          # simulate a keypress to apply value
          press = jQuery.Event("keypress")
          press.which = 13
          $el.trigger(press)
        remove_slider = () ->
          $(".slider-container", $parent).remove()
        create_slider = () ->
          remove_slider()
          $parent.append('<div class="slider-container"><div class="slider"></div></div>')
          current_val = parseFloat($el.val())
          min_diff = 0.5
          diff = Math.max(min_diff, Math.abs(current_val * 4))
          $(".slider-container", $parent).append("<span class='min'>#{(current_val - diff).toFixed(2)}</span>")
          $(".slider-container", $parent).append("<span class='max'>#{(current_val + diff).toFixed(2)}</span>")

          $(".slider", $parent).slider
            min: current_val - diff
            max: current_val + diff
            value: current_val
            step: 0.01
            change: on_slider_change
            slide: on_slider_change
        # recreate slider on focus
        $el.focus (e) =>
          create_slider()
        # create first slider
        create_slider()

      createTextfield: ($target, type = "float", link_to_val = true) =>
        container = $("<div class='input-container'><input type='text' class='field-#{type}' /></div>").appendTo($target)
        $el = $("input", container)
        if type == "float" && link_to_val == true
          $el.val(@getValue())
          @addTextfieldSlider($el)
        return $el

      linkTextfieldToVal: (f_input, type = "float") =>
        self = this
        @on_value_update_hooks.update_sidebar_textfield = (v) ->
          f_input.val(v)
        f_input.val(@getValue())
        f_input.keypress (e) ->
          if e.which == 13
            if type == "float"
              self.setValue(parseFloat($(this).val()))
            else
              self.setValue($(this).val())
            $(this).blur()
        f_input

      linkTextfieldToSubval: (f_input, subval, type = "float") =>
        self = this

        @on_value_update_hooks["update_sidebar_textfield_" + subval] = (v) ->
          f_input.val(v[subval])

        f_input.val(self.getValue()[subval])
        f_input.keypress (e) ->
          if e.which == 13
            dval = $(this).val()
            if type == "float" then dval = parseFloat(dval)
            if $.type(self.attributes.value) == "array"
              self.attributes.value[0][subval] = dval
            else
              self.attributes.value[subval] = dval
            $(this).blur()
        f_input

      createSidebarFieldTitle: (name = @get("name")) =>
        $cont = $("#tab-attribute")
        $cont.append("<h3>#{name}</h3>")
        return $cont

      createSubvalTextinput: (subval, type = "float") =>
        $target = @createSidebarContainer(subval)
        f_in = @createTextfield($target, type, false)
        @linkTextfieldToSubval(f_in, subval, type)
        if type == "float"
          @addTextfieldSlider(f_in)
        return false

  namespace "ThreeNodes.fields",
    Any: class Any extends NodeField
      computeValue : (val) =>
        val

      onValueChanged : (val) =>
        return val

    Array: class Array extends NodeField
      computeValue : (val) =>
        if !val || val == false
          return []
        if $.type(val) == "array"
          val
        else
          [val]

      removeConnections: () =>
        super
        if @get("is_output") == false
          @setValue([])

      onValueChanged : (val) =>
        return @computeValue(val)

      getValue: (index = 0) => @get("value")

    Bool: class Bool extends NodeField
      renderSidebar: =>
        self = this
        $target = @createSidebarContainer()
        id = "side-field-checkbox-#{@get('fid')}"
        $target.append("<div><input type='checkbox' id='#{id}'/></div>")
        f_in = $("#" + id)

        @on_value_update_hooks.update_sidebar_textfield = (v) ->
          if self.getValue() == true
            f_in.attr('checked', 'checked')
          else
            f_in.removeAttr('checked')

        if @getValue() == true
          f_in.attr('checked', 'checked')
        f_in.change (e) ->
          if $(this).is(':checked')
            self.setValue(true)
          else
            self.setValue(false)
        true

      computeValue : (val) =>
        switch $.type(val)
          when "boolean" then return val
          when "number" then return val != 0
          when "string" then return val == "1"
        return null

    String: class String extends NodeField
      renderSidebar: =>
        self = this
        $target = @createSidebarContainer()
        f_in = @createTextfield($target, "string")
        @on_value_update_hooks.update_sidebar_textfield = (v) ->
          f_in.val(v.toString())
        f_in.val(@getValue())
        f_in.keypress (e) ->
          if e.which == 13
            self.setValue($(this).val())
            $(this).blur()
        true
      computeValue : (val) =>
        switch $.type(val)
          when "array" then return val
          when "number" then return val.toString
          when "string" then return val
        return null

    Float: class Float extends NodeField
      create_sidebar_select: ($target) =>
        self = this
        input = "<div><select>"
        for f of @possible_values
          dval = @possible_values[f]
          if dval == @val
            input += "<option value='#{dval}' selected='selected'>#{f}</option>"
          else
            input += "<option value='#{dval}'>#{f}</option>"
        input += "</select></div>"
        $target.append(input)
        $("select", $target).change (e) ->
          self.setValue($(this).val())
        return true

      create_sidebar_input: ($target) =>
        f_in = @createTextfield($target)
        @linkTextfieldToVal(f_in)

      renderSidebar: =>
        $target = @createSidebarContainer()
        if @possible_values
          @create_sidebar_select($target)
        else
          @create_sidebar_input($target)
        true

      computeValue : (val) =>
        switch $.type(val)
          when "number", "string" then return parseFloat(val)
          when "object"
            if val.constructor == THREE.Vector2 || val.constructor == THREE.Vector3
              return val
          when "boolean"
            if val == true
              return 1
            else
              return 0
        return null

    Vector2: class Vector2 extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Vector2
            return val
        return null

      renderSidebar: =>
        @createSidebarFieldTitle()
        @createSubvalTextinput("x")
        @createSubvalTextinput("y")
        true

    Vector3: class Vector3 extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Vector3
            return val
        return null

      renderSidebar: =>
        @createSidebarFieldTitle()
        @createSubvalTextinput("x")
        @createSubvalTextinput("y")
        @createSubvalTextinput("z")
        true

    Vector4: class Vector4 extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Vector4
            return val
        return null

      renderSidebar: =>
        @createSidebarFieldTitle()
        @createSubvalTextinput("x")
        @createSubvalTextinput("y")
        @createSubvalTextinput("z")
        @createSubvalTextinput("w")
        true

    Quaternion: class Quaternion extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Quaternion
            return val
        return null

    Color: class Color extends NodeField
      computeValue : (val) =>
        switch $.type(val)
          when "number" then return new THREE.Color().setRGB(val, val, val)
          when "object"
            switch val.constructor
              when THREE.Color then return val
              when THREE.Vector3 then return new THREE.Color().setRGB(val.x, val.y, val.z)
          when "boolean"
            if val
              return new THREE.Color(0xffffff)
            else
              return new THREE.Color(0x000000)
        return null

    Object3D: class Object3D extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Object3D || val instanceof THREE.Object3D
            return val
        return null
    Scene: class Scene extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Scene
            return val
        return null
    Camera: class Camera extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Camera || val.constructor == THREE.PerspectiveCamera || val.constructor == THREE.OrthographicCamera
            return val
        return null
    Mesh: class Mesh extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Mesh || val instanceof THREE.Mesh
            return val
        return null
    Geometry: class Geometry extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Geometry || val instanceof THREE.Geometry
            return val
        return null
    Material: class Material extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Material || val instanceof THREE.Material
            return val
        return null
    Texture: class Texture extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Texture || val instanceof THREE.Texture
            return val
        return null

    Fog: class Fog extends NodeField
      computeValue : (val) =>
        if $.type(val) == "object"
          if val.constructor == THREE.Fog || val.constructor == THREE.FogExp2
            return val
        return null
