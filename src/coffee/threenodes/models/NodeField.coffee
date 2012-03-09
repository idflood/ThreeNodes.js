define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node_field_input.tmpl.html",
  "text!templates/node_field_output.tmpl.html",
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_field_in, _view_node_field_out) ->
  "use strict"
  class ThreeNodes.NodeField extends Backbone.Model
    defaults: () ->
      fid: -1
      name: "fieldname"
      is_output: false
      value: 0
      default: null
    
    sync: () =>
    
    initialize: (options) =>
      self = this
      @on_value_update_hooks = {}
      @node = options.node
      @changed = true
      @connections = []
      if @get("fid") == -1
        @set("fid", ThreeNodes.Utils.get_uid())
    
    remove: () =>
      delete @on_value_update_hooks
      delete @node
      delete @connections
    
    setFID: (fid) =>
      @set("fid", fid)
    
    onRegister: () ->
      ng = @context.nodegraph
      ng.fields_by_fid[@fid] = this
      @on_value_changed(@val)
    
    setValue: (v) =>
      @changed = true
      if @node
        @node.dirty = true
      prev_val = @get("value")
      new_val = @on_value_changed(v)
      
      # remove all null values from the array
      if $.type(new_val) == "array"
        tmp_val = _.filter new_val, (item) ->
          item != null
        if this.constructor == ThreeNodes.fields.types.Array
          new_val = tmp_val
        else
          if tmp_val.length != 0
            new_val = tmp_val
          else
            new_val = null
      
      # reset the value if it's null and it has a default
      if new_val == null
        if @get("default") != null && @get("default") != undefined
          prev_val = @get("default")
        new_val = prev_val
      
      @set("value", new_val)
      for hook of @on_value_update_hooks
        @on_value_update_hooks[hook](new_val)
      if @get("is_output") == true
        for connection in @connections
          connection.to_field.setValue(new_val)
      true
  
    getValue: (index = 0) =>
      val = @get("value")
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
      val = @get("value")
      if jQuery.type(val) != "array"
        return 1
      return val.length
    
    is_animation_property: () =>
      if this.constructor == ThreeNodes.fields.types.Float || this.constructor == ThreeNodes.fields.types.Bool
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
      res
    
    toCode: () =>
      res = ""
      val = @get("value")
      val_type = jQuery.type(val)
      if val_type != "object" && val_type != "array"
        res = "\t\t{name: '#{@get('name')}', val: #{val}},\n"
      else
        res = "\t\t{name: '#{@get('name')}'},\n"
      res
    
    toXML : () =>
      val = @get("value")
      "\t\t\t<field fid='#{@get('fid')}' val='#{val}'/>\n"
  
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
      $cont.append("<div id='side-field-" + @get("fid") + "'></div>")
      $target = $("#side-field-#{@get('fid')}")
      $target.append("<h3>#{name}</h3>")
      return $target
    
    create_textfield: ($target, id, type = "float") =>
      $target.append("<div class='input-container'><input type='text' id='#{id}' class='field-#{type}' /></div>")
      $el = $("#" + id)
      if type == "float"
        $el.val(@getValue())
        on_slider_change = (e, ui) ->
          $el.val(ui.value)
          # simulate a keypress to apply value
          press = jQuery.Event("keypress")
          press.which = 13
          $el.trigger(press)
        remove_slider = () ->
          $(".slider-container", $el.parent()).remove()
        create_slider = () ->
          remove_slider()
          $el.parent().append('<div class="slider-container"><div class="slider"></div></div>')
          current_val = parseFloat($el.val())
          min_diff = 0.5
          diff = Math.max(min_diff, Math.abs(current_val * 4))
          $(".slider-container", $el.parent()).append("<span class='min'>#{(current_val - diff).toFixed(2)}</span>")
          $(".slider-container", $el.parent()).append("<span class='max'>#{(current_val + diff).toFixed(2)}</span>")
          
          $(".slider", $target).slider
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
      f_input.val(@get("value")[subval])
      f_input.keypress (e) ->
        if e.which == 13
          self.attributes.value[subval] = $(this).val()
          $(this).blur()
      f_input
  
    create_sidebar_field_title: (name = @get("name")) =>
      $cont = $("#tab-attribute")
      $cont.append("<h3>#{name}</h3>")
      return $cont
    
    create_subval_textinput: (subval, type = "float") =>
      $target = @create_sidebar_container(subval)
      f_in = @create_textfield($target, "side-field-txt-input-#{subval}-#{@get('fid')}", type)
      @link_textfield_to_subval(f_in, subval)
  
  class ThreeNodes.fields.types.Any extends ThreeNodes.NodeField
    compute_value : (val) =>
      val
    
    on_value_changed : (val) =>
      return val
    
  class ThreeNodes.fields.types.Array extends ThreeNodes.NodeField
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
    
  class ThreeNodes.fields.types.Bool extends ThreeNodes.NodeField
    render_sidebar: =>
      self = this
      $target = @create_sidebar_container()
      id = "side-field-checkbox-#{@fid}"
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
  
  class ThreeNodes.fields.types.String extends ThreeNodes.NodeField
    render_sidebar: =>
      self = this
      $target = @create_sidebar_container()
      f_in = @create_textfield($target, "side-field-txt-input-#{@get('fid')}", "string")
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
  
  class ThreeNodes.fields.types.Float extends ThreeNodes.NodeField
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
      f_in = @create_textfield($target, "side-field-txt-input-#{@get('name')}")
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
      
  class ThreeNodes.fields.types.Vector2 extends ThreeNodes.NodeField
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
  
  class ThreeNodes.fields.types.Vector3 extends ThreeNodes.NodeField
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
  
  class ThreeNodes.fields.types.Vector4 extends ThreeNodes.NodeField
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
  
  class ThreeNodes.fields.types.Quaternion extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Quaternion
          return val
      return null
      
  class ThreeNodes.fields.types.Color extends ThreeNodes.NodeField
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
   
  class ThreeNodes.fields.types.Object3D extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Object3D || val instanceof THREE.Object3D
          return val
      return null
  class ThreeNodes.fields.types.Scene extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Scene
          return val
      return null
  class ThreeNodes.fields.types.Camera extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Camera || val.constructor == THREE.PerspectiveCamera || val.constructor == THREE.OrthographicCamera
          return val
      return null
  class ThreeNodes.fields.types.Mesh extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Mesh || val instanceof THREE.Mesh
          return val
      return null
  class ThreeNodes.fields.types.Geometry extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Geometry || val instanceof THREE.Geometry
          return val
      return null
  class ThreeNodes.fields.types.Material extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Material || val instanceof THREE.Material
          return val
      return null
  class ThreeNodes.fields.types.Texture extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Texture || val instanceof THREE.Texture
          return val
      return null
  class ThreeNodes.fields.types.Fog extends ThreeNodes.NodeField
    compute_value : (val) =>
      if $.type(val) == "object"
        if val.constructor == THREE.Fog || val.constructor == THREE.FogExp2
          return val
      return null
