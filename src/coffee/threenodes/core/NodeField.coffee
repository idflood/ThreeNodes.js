define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node_field_input.tmpl.html",
  "text!templates/node_field_output.tmpl.html",
  'order!threenodes/utils/Utils',
  'order!threenodes/models/NodeFieldModel',
], ($, _, Backbone, _view_node_field_in, _view_node_field_out) ->
  "use strict"
  class ThreeNodes.NodeField
    @connections = false
    constructor: (@name, @val, @possible_values = false, @fid = ThreeNodes.Utils.get_uid()) ->
      self = this
      @on_value_update_hooks = {}
      @node = false
      @is_output = false
      @changed = true
      @connections = []
      @default_value = null
    
    onRegister: () ->
      ng = @context.injector.get("NodeGraph")
      ng.fields_by_fid[@fid] = this
      @on_value_changed(@val)
    
    set: (v) =>
      @changed = true
      @node.dirty = true
      new_val = @on_value_changed(v)
      
      if $.type(new_val) == "array"
        tmp_val = _.filter new_val, (item) ->
          item != null
        if tmp_val.length != 0
          new_val = tmp_val
        else
          new_val = null
      
      if new_val == null
        if @default_value != null && @default_value != undefined
          @val = @default_value
        new_val = @val
      
      @val = new_val
      
      for hook of @on_value_update_hooks
        @on_value_update_hooks[hook](@val)
      if @is_output == true
        for connection in @connections
          connection.to_field.set(@val)
      true
  
    get: (index = 0) =>
      if $.type(@val) != "array"
        return @val
      else
        return @val[index % @val.length]
    
    isChanged: () =>
      res = @changed
      @changed = false
      res
    
    isConnected: () =>
      @connections.length > 0
    
    getSliceCount: () =>
      if jQuery.type(@val) != "array"
        return 1
      return @val.length
    
    is_animation_property: () =>
      if this.constructor == ThreeNodes.fields.types.Float || this.constructor == ThreeNodes.fields.types.Bool
        return true
      return false
    
    toJSON : () =>
      res =
        name: @name
      # help avoid cyclic value
      val_type = jQuery.type(@get())
      if val_type != "object" && val_type != "array"
        res.val = @get()
      res
    
    toCode: () =>
      res = ""
      val_type = jQuery.type(@get())
      if val_type != "object" && val_type != "array"
        res = "\t\t{name: '#{@name}', val: #{@get()}},\n"
      else
        res = "\t\t{name: '#{@name}'},\n"
      res
    
    toXML : () =>
      "\t\t\t<field fid='#{@fid}' val='#{@get()}'/>\n"
  
    render_connections: () =>
      for connection in @connections
        connection.render()
      true
    
    render_sidebar: =>
      false
    
    render_button: =>
      layout = _view_node_field_in
      if @is_output
        layout = _view_node_field_out
      el = $.tmpl(layout, this)
      el.data("object", this)
      el
      
    compute_value : (val) =>
      val
    
    add_connection: (c) =>
      if @connections.indexOf(c) == -1
        @connections.push c
        if @is_output == true
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
    
    create_sidebar_container: (name = @name) =>
      $cont = $("#tab-attribute")
      $cont.append("<div id='side-field-" + @fid + "'></div>")
      $target = $("#side-field-#{@fid}")
      $target.append("<h3>#{name}</h3>")
      return $target
    
    create_textfield: ($target, id) =>
      $target.append("<div><input type='text' id='#{id}' /></div>")
      return $("#" + id)
    
    link_textfield_to_val: (f_input) =>
      self = this
      @on_value_update_hooks.update_sidebar_textfield = (v) ->
        f_input.val(v)
      f_input.val(@get())
      f_input.keypress (e) ->
        if e.which == 13
          self.set($(this).val())
          $(this).blur()
      f_input
    
    link_textfield_to_subval: (f_input, subval) =>
      self = this
      @on_value_update_hooks["update_sidebar_textfield_" + subval] = (v) ->
        f_input.val(v[subval])
      f_input.val(@get()[subval])
      f_input.keypress (e) ->
        if e.which == 13
          self.val[subval] = $(this).val()
          $(this).blur()
      f_input
  
    create_sidebar_field_title: (name = @name) =>
      $cont = $("#tab-attribute")
      $cont.append("<h3>#{name}</h3>")
      return $cont
    
    create_subval_textinput: (subval) =>
      $target = @create_sidebar_container(subval)
      f_in = @create_textfield($target, "side-field-txt-input-#{subval}-#{@fid}")
      @link_textfield_to_subval(f_in, subval)
  
  class ThreeNodes.fields.types.Any extends ThreeNodes.NodeField
    compute_value : (val) =>
      val
    
    on_value_changed : (val) =>
      @val = @compute_value(val)
    
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
      if @is_output == false
        @on_value_changed([])
    
    on_value_changed : (val) =>
      @val = @compute_value(val)
    
    get: (index = 0) => @val
    
  class ThreeNodes.fields.types.Bool extends ThreeNodes.NodeField
    render_sidebar: =>
      self = this
      $target = @create_sidebar_container()
      id = "side-field-checkbox-#{@fid}"
      $target.append("<div><input type='checkbox' id='#{id}'/></div>")
      f_in = $("#" + id)
      @on_value_update_hooks.update_sidebar_textfield = (v) ->
        if self.get() == true
          f_in.attr('checked', 'checked')
        else
          f_in.removeAttr('checked')
      if @get() == true
        f_in.attr('checked', 'checked')
      f_in.change (e) ->
        if $(this).is(':checked')
          self.set(true)
        else
          self.set(false)
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
      f_in = @create_textfield($target, "side-field-txt-input-#{@fid}")
      @on_value_update_hooks.update_sidebar_textfield = (v) ->
        f_in.val(v.toString())
      f_in.val(@get())
      f_in.keypress (e) ->
        if e.which == 13
          self.set($(this).val())
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
        self.set($(this).val())
      return true
    
    create_sidebar_input: ($target) =>
      f_in = @create_textfield($target, "side-field-txt-input-#{@fid}")
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
