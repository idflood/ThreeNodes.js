define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node_field_input.tmpl.html",
  "text!templates/node_field_output.tmpl.html",
  'order!threenodes/utils/Utils',
  "order!libs/signals.min",
], ($, _, Backbone, _view_node_field_in, _view_node_field_out) ->
  class ThreeNodes.NodeField
    @connections = false
    constructor: (@name, @val, @fid = ThreeNodes.Utils.get_uid()) ->
      self = this
      @on_value_update_hooks = {}
      @signal = new signals.Signal()
      @node = false
      @is_output = false
      @connections = []
      ThreeNodes.nodes.fields[@fid] = this
      @on_value_changed(@val)
    
    set: (v) =>
      v = @on_value_changed(v)
      for hook of @on_value_update_hooks
        @on_value_update_hooks[hook](v)
      if @is_output == true
        for connection in @connections
          connection.update()
      true
  
    get: () =>
      @val
    
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
      $.tmpl(layout, this)
      
    compute_value : (val) =>
      val
    
    update_input_node : () =>
      for c in @connections
        c.update_node_from()
      true
    
    add_connection: (c) =>
      if @connections.indexOf(c) == -1
        @connections.push c
      if @is_output == true
        @node.add_out_connection(c, this)
      c
    
    unregister_connection: (c) =>
      @node.remove_connection(c)
      ind = @connections.indexOf(c)
      if ind != -1
        @connections.splice(ind, 1)
      
    # called on shift click on a field / remove all connections
    remove_connections: () =>
      console.log "removing connections"
      @connections[0].remove() while @connections.length > 0
      true
      
    on_value_changed : (val) =>
      switch $.type(val)
        when "array" then @val = _.map(val, (n) -> @compute_value(n))
        else @val = @compute_value(val)
      #@update_ui()
      @val
  
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
    on_value_changed : (val) =>
      @val = @compute_value(val)
      
  class ThreeNodes.fields.types.Bool extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "boolean" then res = val
        when "number" then res = val != 0
        when "string" then res = val == "1"
      res
  
  class ThreeNodes.fields.types.String extends ThreeNodes.NodeField
    render_sidebar: =>
      self = this
      $cont = $("#tab-attribute")
      $cont.append("<div id='side-field-" + @fid + "'></div>")
      $target = $("#side-field-#{@fid}")
      $target.append("<h3>#{@name}</h3>")
      $target.append("<div><input type='text' id='side-field-txt-input-#{@fid}' /></div>")
      f_in = $("#side-field-txt-input-#{@fid}")
      @on_value_update_hooks.update_sidebar_textfield = (v) ->
        f_in.val(v.toString())
      f_in.val(@get())
      f_in.keypress (e) ->
        if e.which == 13
          self.set($(this).val())
          $(this).blur()
      false
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "number" then res = val.toString
        when "string" then res = val
      res
  
  class ThreeNodes.fields.types.Float extends ThreeNodes.NodeField
    render_sidebar: =>
      self = this
      $cont = $("#tab-attribute")
      $cont.append("<div id='side-field-" + @fid + "'></div>")
      $target = $("#side-field-#{@fid}")
      $target.append("<h3>#{@name}</h3>")
      $target.append("<div><input type='text' id='side-field-txt-input-#{@fid}' /></div>")
      f_in = $("#side-field-txt-input-#{@fid}")
      @on_value_update_hooks.update_sidebar_textfield = (v) ->
        f_in.val(v.toString().substring(0, 10))
      f_in.val(@get())
      f_in.keypress (e) ->
        if e.which == 13
          self.set($(this).val())
          $(this).blur()
      false
    compute_value : (val) =>
      res = @get()
      switch $.type(val)
        when "number" then res = parseFloat(val)
        when "string" then res = parseFloat(val)
        when "boolean"
          if val
            res = 1
          else
            res = 0
      res
      
  class ThreeNodes.fields.types.Vector2 extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Vector2
          res = val
      res
          
  class ThreeNodes.fields.types.Vector3 extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Vector3
          res = val
      res
  
  class ThreeNodes.fields.types.Vector4 extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Vector4
          res = val
      res
  
  class ThreeNodes.fields.types.Quaternion extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Quaternion
          res = val
      res
      
  class ThreeNodes.fields.types.Color extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Color
          res = val
      res
   
  class ThreeNodes.fields.types.Object3D extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Object3D || val instanceof THREE.Object3D
          res = val
      res
  class ThreeNodes.fields.types.Scene extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Scene
          res = val
      res
  class ThreeNodes.fields.types.Camera extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Camera || val.constructor == THREE.PerspectiveCamera || val.constructor == THREE.OrthographicCamera
          res = val
      res
  class ThreeNodes.fields.types.Mesh extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Mesh || val instanceof THREE.Mesh
          res = val
      res
  class ThreeNodes.fields.types.Geometry extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Geometry || val instanceof THREE.Geometry
          res = val
      res
  class ThreeNodes.fields.types.Texture extends ThreeNodes.NodeField
    compute_value : (val) =>
      res = false
      switch $.type(val)
        when "object" then if val.constructor == THREE.Texture || val instanceof THREE.Texture
          res = val
      res
