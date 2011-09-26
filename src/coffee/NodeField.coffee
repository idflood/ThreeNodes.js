class NodeField
  @connections = false
  constructor: (@name, @val, @fid = get_uid()) ->
    self = this
    @on_value_update_hooks = {}
    @signal = new signals.Signal()
    @node = false
    @is_output = false
    @connections = []
    
    @on_value_changed(@val)
  
  set: (v) =>
    @on_value_changed(v)
    for hook of @on_value_update_hooks
      @on_value_update_hooks[hook](v)
    if @is_output == true
      for connection in @connections
        connection.update()
    true
  get: () =>
    @val
  
  render_button: =>
    if @is_output
      return "<div id='fid-#{@fid}' class='field field-#{@name}' rel='#{@name}'>#{@name}<a href='#'></a></div>"
    else
      return "<div id='fid-#{@fid}' class='field field-#{@name}' rel='#{@name}'><a href='#'></a>#{@name}</div>"
  
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
  remove_connection: (c) =>
    @node.remove_connection(c)
    ind = @connections.indexOf(c)
    if ind != -1
      @connections.splice(ind, 1)
    
  # called on shift click on a field / remove all connections
  remove_connections: () =>
    @connections[0].remove() while @connections.length > 0
    true
    
  on_value_changed : (val) =>
    switch $.type(val)
      when "array" then @val = _.map(val, (n) -> @compute_value(n))
      else @val = @compute_value(val)
    #@update_ui()
    @val

class fields.types.Any extends NodeField
  compute_value : (val) =>
    val
  on_value_changed : (val) =>
    @val = @compute_value(val)
    
class fields.types.Array extends NodeField
  compute_value : (val) =>
    val
  on_value_changed : (val) =>
    @val = @compute_value(val)
    
class fields.types.Bool extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "boolean" then res = val
      when "number" then res = val != 0
      when "string" then res = val == "1"
    res

class fields.types.Float extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "number" then res = parseFloat(val)
      when "string" then res = parseFloat(val)
    res
    
class fields.types.Vector2 extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Vector2
        res = val
    res
        
class fields.types.Vector3 extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Vector3
        res = val
    res

class fields.types.Vector4 extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Vector4
        res = val
    res

class fields.types.Quaternion extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Quaternion
        res = val
    res
    
class fields.types.Color extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Color
        res = val
    res
 
class fields.types.Object3D extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Object3D
        res = val
    res
class fields.types.Scene extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Scene
        res = val
    res
class fields.types.Camera extends NodeField
  compute_value : (val) =>
    res = false
    switch $.type(val)
      when "object" then if val.constructor == THREE.Camera
        res = val
    res