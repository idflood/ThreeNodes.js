define [
  'use!Underscore', 
  'use!Backbone',
  "text!templates/node_field_input.tmpl.html",
  "text!templates/node_field_output.tmpl.html",
  'order!threenodes/utils/Utils',
], (_, Backbone, _view_node_field_in, _view_node_field_out, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class ThreeNodes.NodeField extends Backbone.Model
    defaults: () ->
      fid: -1
      name: "fieldname"
      is_output: false
      value: 0
      default: null
    
    sync: () =>
    _validate: (attrs, options) => return true
        
    # override the backbone set method if the key is "value"
    # this is one of the most called function so this needs to be fast
    set: (key, value, options = {}) =>
      if key == "value"
        this.attributes[key] = value
        return this
      
      super
    
    load: (data) =>
      if !data && data != false
        return
      if $.type(data) != "object"
        @setValue(data)
      else
        # directly apply each object properties to the value
        for property of data
          @attributes.value[property] = data[property]
      return this
    
    initialize: (options) =>
      self = this
      @on_value_update_hooks = {}
      @node = options.node
      @subfield = options.subfield
      @proxy = false
      @changed = true
      @connections = []
      if @get("fid") == -1
        @set("fid", Utils.get_uid())
    
    remove: () =>
      delete @on_value_update_hooks
      delete @node
      delete @connections
      delete @button
      delete @proxy
      delete @subfield
      @destroy()
    
    setFID: (fid) =>
      @set("fid", fid)
    
    setValue: (v) =>
      @changed = true
      if @node
        @node.dirty = true
      prev_val = @attributes["value"]
      new_val = @on_value_changed(v)
      
      # remove all null values from the array
      if $.type(new_val) == "array"
        tmp_val = _.filter new_val, (item) ->
          item != null
        if this.constructor == ThreeNodes.fields.Array
          new_val = tmp_val
        else
          if tmp_val.length != 0
            new_val = tmp_val
          else
            new_val = null
      
      # reset the value if it's null and it has a default
      if new_val == null
        default_val = @attributes["default"]
        if default_val != null && default_val != undefined
          prev_val = default_val
        new_val = prev_val
      
      #@set("value", new_val, {silent: true})
      @attributes["value"] = new_val
      for hook of @on_value_update_hooks
        @on_value_update_hooks[hook](new_val)
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
    
    is_animation_property: () =>
      if this.constructor == ThreeNodes.fields.Float || this.constructor == ThreeNodes.fields.Bool
        return true
      return false
    
    toJSON : () =>
      res =
        name: @get("name")
      # help avoid cyclic value
      val = @get("value")
      val_type = jQuery.type(val)
      if val_type != "object" && val_type != "array"
        res.val = val
      # we may still need to save basic values
      if val_type == "object"
        if val.constructor == THREE.Vector2 || val.constructor == THREE.Vector3 || val.constructor == THREE.Vector4 || val.constructor == THREE.Color
          res.val = val
      res
  
    render_connections: () =>
      for connection in @connections
        connection.render()
      true
    
    render_sidebar: =>
      false
    
    render_button: =>
      layout = _view_node_field_in
      if @get("is_output")
        layout = _view_node_field_out
      el = _.template layout,
        fid: @get("fid")
        name: @get("name")
      el = $(el)
      el.data("object", this)
      @button = el
      el
      
    compute_value : (val) =>
      val
    
    add_connection: (c) =>
      if @connections.indexOf(c) == -1
        @connections.push c
        if @get("is_output") == true
          @node.add_out_connection(c, this)
        @node.disable_property_anim(this)
      c
    
    unregister_connection: (c) =>
      @node.remove_connection(c)
      
      ind = @connections.indexOf(c)
      if ind != -1
        @connections.splice(ind, 1)
      if @connections.length == 0
        @node.enable_property_anim(this)
        
    # remove all connections
    remove_connections: () =>
      @connections[0].remove() while @connections.length > 0
      true
      
    on_value_changed : (val) =>
      self = this
      if $.type(val) == "array"
        return _.map(val, (n) -> self.compute_value(n))
      
      return @compute_value(val)
    
    create_sidebar_container: (name = @get("name")) =>
      $cont = $("#tab-attribute")
      $target = $("<div data-fid='" + @get("fid") + "' class='field-wrapper'></div>").appendTo($cont)
      $target.append("<h3>#{name}</h3>")
      return $target
    
    add_textfield_slider: ($el) =>
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
    
    create_textfield: ($target, type = "float", link_to_val = true) =>
      container = $("<div class='input-container'><input type='text' class='field-#{type}' /></div>").appendTo($target)
      $el = $("input", container)
      if type == "float" && link_to_val == true
        $el.val(@getValue())
        @add_textfield_slider($el)
      return $el
    
    link_textfield_to_val: (f_input) =>
      self = this
      @on_value_update_hooks.update_sidebar_textfield = (v) ->
        f_input.val(v)
      f_input.val(@getValue())
      f_input.keypress (e) ->
        if e.which == 13
          self.setValue($(this).val())
          $(this).blur()
      f_input
    
    link_textfield_to_subval: (f_input, subval) =>
      self = this
      
      @on_value_update_hooks["update_sidebar_textfield_" + subval] = (v) ->
        f_input.val(v[subval])
      
      f_input.val(self.getValue()[subval])
      f_input.keypress (e) ->
        if e.which == 13
          if $.type(self.attributes.value) == "array"
            self.attributes.value[0][subval] = $(this).val()
          else
            self.attributes.value[subval] = $(this).val()
          $(this).blur()
      f_input
  
    create_sidebar_field_title: (name = @get("name")) =>
      $cont = $("#tab-attribute")
      $cont.append("<h3>#{name}</h3>")
      return $cont
    
    create_subval_textinput: (subval, type = "float") =>
      $target = @create_sidebar_container(subval)
      f_in = @create_textfield($target, type, false)
      @link_textfield_to_subval(f_in, subval)
      if type == "float"
        @add_textfield_slider(f_in)
  
  class ThreeNodes.fields.Any extends ThreeNodes.NodeField
    compute_value : (val) =>
      val
    
    on_value_changed : (val) =>
      return val
    
  class ThreeNodes.fields.Array extends ThreeNodes.NodeField
    compute_value : (val) =>
      if !val || val == false
        return []
      if $.type(val) == "array"
        val
      else
        [val]
    
    remove_connections: () =>
      super
      if @get("is_output") == false
        @setValue([])
    
    on_value_changed : (val) =>
      return @compute_value(val)
    
    getValue: (index = 0) => @get("value")
    
  class ThreeNodes.fields.Bool extends ThreeNodes.NodeField
    render_sidebar: =>
      self = this
      $target = @create_sidebar_container()
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
        
    compute_value : (val) =>
      switch $.type(val)
        when "boolean" then return val
        when "number" then return val != 0
        when "string" then return val == "1"
      return null
  
  class ThreeNodes.fields.String extends ThreeNodes.NodeField
    render_sidebar: =>
      self = this
      $target = @create_sidebar_container()
      f_in = @create_textfield($target, "string")
      @on_value_update_hooks.update_sidebar_textfield = (v) ->
        f_in.val(v.toString())
      f_in.val(@getValue())
      f_in.keypress (e) ->
        if e.which == 13
          self.setValue($(this).val())
          $(this).blur()
      true
    compute_value : (val) =>
      switch $.type(val)
        when "array" then return val
        when "number" then return val.toString
        when "string" then return val
      return null
  
  class ThreeNodes.fields.Float extends ThreeNodes.NodeField
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
      f_in = @create_textfield($target)
      @link_textfield_to_val(f_in)
          
    render_sidebar: =>
      $target = @create_sidebar_container()
      if @possible_values
        @create_sidebar_select($target)
      else
        @create_sidebar_input($target)
      true
    
    compute_value : (val) =>
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
      
  class ThreeNodes.fields.Vector2 extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Vector2
          return val
      return null
    
    render_sidebar: =>
      @create_sidebar_field_title()
      @create_subval_textinput("x")
      @create_subval_textinput("y")
      true
  
  class ThreeNodes.fields.Vector3 extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Vector3
          return val
      return null
    
    render_sidebar: =>
      @create_sidebar_field_title()
      @create_subval_textinput("x")
      @create_subval_textinput("y")
      @create_subval_textinput("z")
      true
  
  class ThreeNodes.fields.Vector4 extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Vector4
          return val
      return null
    
    render_sidebar: =>
      @create_sidebar_field_title()
      @create_subval_textinput("x")
      @create_subval_textinput("y")
      @create_subval_textinput("z")
      @create_subval_textinput("w")
      true
  
  class ThreeNodes.fields.Quaternion extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Quaternion
          return val
      return null
      
  class ThreeNodes.fields.Color extends ThreeNodes.NodeField
    compute_value : (val) =>
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
   
  class ThreeNodes.fields.Object3D extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Object3D || val instanceof THREE.Object3D
          return val
      return null
  class ThreeNodes.fields.Scene extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Scene
          return val
      return null
  class ThreeNodes.fields.Camera extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Camera || val.constructor == THREE.PerspectiveCamera || val.constructor == THREE.OrthographicCamera
          return val
      return null
  class ThreeNodes.fields.Mesh extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Mesh || val instanceof THREE.Mesh
          return val
      return null
  class ThreeNodes.fields.Geometry extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Geometry || val instanceof THREE.Geometry
          return val
      return null
  class ThreeNodes.fields.Material extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Material || val instanceof THREE.Material
          return val
      return null
  class ThreeNodes.fields.Texture extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Texture || val instanceof THREE.Texture
          return val
      return null
  class ThreeNodes.fields.Fog extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Fog || val.constructor == THREE.FogExp2
          return val
      return null
