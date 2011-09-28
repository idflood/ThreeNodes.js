field_click_1 = false

class NodeBase 
  constructor: (@x, @y) ->
    @nid = get_uid()
    @container = $("#container")
    @out_connections = []
    @rack = new NodeFieldRack(this)
    @value = false
    @name = false
    @main_view = false
    @updated = false
    @init()
    
  typename: => "Node"
  
  has_out_connection: () =>
    @out_connections.length != 0
  
  compute: () =>
    @value = @value
  
  update: () =>
    if @updated == true
      return true
    @updated = true
    # update all input fields ( if they have connections they take care themselft to update their source node)
    @rack.update_inputs()
    # update node output values based on inputs
    @compute()
  
  apply_fields_to_val: (afields, target, exceptions = []) =>
    for f of afields
      nf = afields[f]
      if exceptions.indexOf(nf.name) == -1
        target[nf.name] = @rack.get(nf.name).val
  
  create_field_from_default_type: (fname, default_value) ->
    ftype = switch $.type(default_value)
      when "number" then "Float"
      when "boolean" then "Bool"
      else "String"
    new fields.types[ftype](fname, default_value)
  
  
    

  create_field_connection: (field) =>
    f = this
    if field_click_1 == false
      field_click_1 = field
      $(".inputs .field").filter () ->
        $(this).parent().parent().parent().attr("id") != "nid-#{f.nid}"
      .addClass "field-target"
    else
      field_click_2 = field
      new NodeConnection(field_click_1, field_click_2)
      $(".field").removeClass "field-target"
      field_click_1 = false
      
  add_field_listener: ($field) =>
    self = this
    f_name = $field.attr("id")
    f_type = $field.parent().attr("class")
    field = @rack.node_fields[f_type][f_name]
    $field.click (e) ->
      e.preventDefault()
      if e.shiftKey == true
        field.remove_connections()
      else
        self.create_field_connection(field)
  
  add_out_connection: (c, field) =>
    if @out_connections.indexOf(c) == -1
      @out_connections.push(c)
      
  remove_connection: (c) =>
    c_index = @out_connections.indexOf(c)
    if c_index != -1
      @out_connections.splice(c_index, 1)
      
  init: () =>
    n = this
    @container.append "<div id='nid-#{@nid}' class='node node-#{@typename()}'><div class='head'>#{@typename()}</div><div class='options'><div class='inputs'></div><div class='center'></div><div class='outputs'></div></div></div>"
    @main_view = $("#nid-#{@nid}")
    @main_view.css
      left: @x
      top: @y
    @main_view.draggable
      drag: () ->
        render_connections()
      stop: () ->
        render_connections()
    $(".head", @main_view).dblclick (e) ->
      $(".options", n.main_view).animate {height: 'toggle'}, 120, () ->
        render_connections()

class NodeNumberSimple extends NodeBase
  constructor: (x, y) ->
    super x, y
    @value = 0
    @v_in = @rack.addInput(new fields.types.Float("in", 0))
    @v_out = @rack.addOutput(new fields.types.Float("out", 0))
  
  process_val: (num, i) =>
    num
  
  compute: =>
    res = false
    switch $.type(@v_in.get())
      when "array" then res = _.map(@v_in.val, (n, i) -> @process_val(n, i))
      else res = @process_val(@v_in.get(), 0)
    if @v_out.get() != res
      @v_out.set res
    true

class nodes.types.Base.Number extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
    @rack.add_center_textfield(@v_in)
  
  typename : => "Number"

class nodes.types.Base.String extends NodeBase
  constructor: (x, y) ->
    super x, y
    @value = ""
    @rack.addFields
      inputs:
        "string": ""
      outputs:
        "out": {type: "Any", val: @ob}
  compute: =>
    @rack.get("out", true).set @rack.get("string").get()
  typename : => "String"

class nodes.types.Math.Sin extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
  process_val: (num, i) =>
    Math.sin(num)
  typename : => "Sin"

class nodes.types.Math.Cos extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
  process_val: (num, i) =>
    Math.cos(num)
  typename : => "Cos"

class nodes.types.Math.Tan extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
  process_val: (num, i) =>
    Math.tan(num)
  typename : => "Tan"

class nodes.types.Math.Round extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
  process_val: (num, i) =>
    Math.round(num)
  typename : => "Round"

class nodes.types.Math.Mult extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
    @v_factor = @rack.addInput(new fields.types.Float("factor", 2))
  process_val: (num, i) =>
    num * @v_factor.get()
  typename : => "Mult"

class nodes.types.Math.Max extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
    @v_inb = @rack.addInput(new fields.types.Float("in2", 0))
  process_val: (num, i) =>
    Math.max(num, @v_inb.get())
  typename : => "Max"

class nodes.types.Math.Min extends NodeNumberSimple
  constructor: (x, y) ->
    super x, y
    @v_inb = @rack.addInput(new fields.types.Float("in2", 0))
  process_val: (num, i) =>
    Math.min(num, @v_inb.get())
  typename : => "Min"

class nodes.types.Utils.Random extends NodeBase
  constructor: (x, y) ->
    super x, y
    @rack.addFields
      inputs:
        "min" : 0
        "max" : 1
      outputs:
        "out" : 0
    @rack.add_center_textfield(@rack.get("out", true))

  compute: =>
    old = @rack.get("out", true).get()
    @value = @rack.get("min").get() + Math.random() * (@rack.get("max").get() - @rack.get("min").get())
    if @value != old
      @rack.get("out", true).set @value
  typename : => "Random"

class nodes.types.Utils.Merge extends NodeBase
  constructor: (x, y) ->
    super x, y
    @rack.addFields
      inputs:
        "in0" : {type: "Any", val: null}
        "in1" : {type: "Any", val: null}
        "in2" : {type: "Any", val: null}
        "in3" : {type: "Any", val: null}
        "in4" : {type: "Any", val: null}
        "in5" : {type: "Any", val: null}
      outputs:
        "out" : {type: "Array", val: []}

  compute: =>
    old = @rack.get("out", true).get()
    @value = []
    for f of @rack.node_fields.inputs
      k = @rack.node_fields.inputs[f]
      if k.get() != null
        @value[@value.length] = k.get()
    if @value != old
      @rack.get("out", true).set @value
  typename : => "Merge"

class nodes.types.Utils.Get extends NodeBase
  constructor: (x, y) ->
    super x, y
    @rack.addFields
      inputs:
        "array" : {type: "Array", val: null}
        "index" : 0
      outputs:
        "out" : {type: "Any", val: null}

  compute: =>
    old = @rack.get("out", true).get()
    @value = false
    arr = @rack.get("array").get()
    ind = parseInt(@rack.get("index").get())
    if $.type(arr) == "array"
      @value = arr[ind % arr.length]
    if @value != old
      @rack.get("out", true).set @value
  typename : => "Get"

class nodes.types.Utils.Timer extends NodeBase
  constructor: (x, y) ->
    super x, y
    @old = @get_time()
    @counter = 0
    @rack.addFields
      inputs:
        "reset" : false
        "pause" : false
        "max" : 99999999999
      outputs:
        "out" : 0
    
    @rack.add_center_textfield(@rack.get("out", true))
  
  get_time: => new Date().getTime()
    
  compute: =>
    oldval = @rack.get("out", true).get()
    now = @get_time()
    if @rack.get("pause").get() == false
      @counter += now - @old
    if @rack.get("reset").get() == true
      @counter = 0
    
    diff = @rack.get("max").get() - @counter
    if diff <= 0
      #@counter = diff * -1
      @counter = 0
    @old = now

    #if @counter != oldval
    @rack.get("out", true).set @counter
  typename : => "Timer"

class nodes.types.Base.Vector2 extends NodeBase
  constructor: (x, y) ->
    super x, y
    @vec = new THREE.Vector2(0, 0)
    @rack.addFields
      inputs:
        "xy" : {type: "Vector2", val: false}
        "x" : 0
        "y" : 0
      outputs:
        "xy" : {type: "Vector2", val: false}
        "x" : 0
        "y" : 0
  
  compute: =>
    old = @rack.get("xy", true).get()
    @value = @rack.get("xy").get()
    if @rack.get("xy").connections.length == 0
      @value = new THREE.Vector2(@rack.get("x").get(), @rack.get("y").get())
    if @value != old
      #@v_out.signal.dispatch @value
      @rack.get("xy", true).set @value
      @rack.get("x", true).set @value.x
      @rack.get("y", true).set @value.y
  typename : -> "Vector2"

class nodes.types.Base.Vector3 extends NodeBase
  constructor: (x, y) ->
    super x, y
    @vec = new THREE.Vector3(0, 0, 0)
    @rack.addFields
      inputs:
        "xyz" : {type: "Vector3", val: false}
        "x" : 0
        "y" : 0
        "z" : 0
      outputs:
        "xyz" : {type: "Vector3", val: false}
        "x" : 0
        "y" : 0
        "z" : 0
  
  compute: =>
    old = @rack.get("xyz", true).get()
    @value = @rack.get("xyz").get()
    if @rack.get("xyz").connections.length == 0
      #@vec.set @v_in_x.val, @v_in_y.val, @v_in_z.val
      #@value = @vec
      @value = new THREE.Vector3(@rack.get("x").get(), @rack.get("y").get(), @rack.get("z").get())
    if @value != old
      #@v_out.signal.dispatch @value
      @rack.get("xyz", true).set @value
      @rack.get("x", true).set @value.x
      @rack.get("y", true).set @value.y
      @rack.get("z", true).set @value.z
  typename : -> "Vector3"

class nodes.types.Base.Color extends NodeBase
  constructor: (x, y) ->
    super x, y
    @vec = new THREE.Color(1, 0, 0)
    @rack.addFields
      inputs:
        "rgb": {type: "Color", val: false}
        "r": 0
        "g": 0
        "b": 0
      outputs:
        "rgb": {type: "Color", val: false}
        "r": 0
        "g": 0
        "b": 0
  
  compute: =>
    old = @rack.get("rgb", true).get()
    @value = @rack.get("rgb").get()
    if @rack.get("rgb").connections.length == 0
      @value = new THREE.Color().setRGB(@rack.get("r").get(), @rack.get("g").get(), @rack.get("b").get())
    if @value != old
      @rack.get("rgb", true).set @value
      @rack.get("r", true).set @value.r
      @rack.get("g", true).set @value.g
      @rack.get("b", true).set @value.b
  typename : -> "Color"



class nodes.types.Three.Object3D extends NodeBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.Object3D()
    @rack.addFields
      inputs:
        "children": {type: "Array", val: []}
        "position": {type: "Vector3", val: new THREE.Vector3()}
        "rotation": {type: "Vector3", val: new THREE.Vector3()}
        "scale": {type: "Vector3", val: new THREE.Vector3(1, 1, 1)}
        "doubleSided": false
        "visible": true
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children'])
    for child in @rack.get("children").get()
      ind = @ob.children.indexOf(child)
      if ind == -1
        @ob.addChild(child)
    for child in @ob.children
      ind = @rack.get("children").val.indexOf(child)
      if ind != -1
        @ob.removeChild(child)
    @rack.get("out", true).set @ob
  typename : => "Object3D"
  
class nodes.types.Geometry.CubeGeometry extends NodeBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1)
    @rack.addFields
      inputs:
        "flip": -1
        "width": 100,
        "height": 100,
        "depth": 100,
        "segments_width": 1,
        "segments_height": 1,
        "segments_depth": 1,
      outputs:
        "out": {type: "Any", val: @ob}
    @cached = @get_cache_array()
  
  get_cache_array: =>
    [@rack.get("width").get(), @rack.get("height").get(), @rack.get("depth").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get(), @rack.get("segments_depth").get(), @rack.get("flip").get()]

  compute: =>
    new_cache = @get_cache_array()
    if flatArraysAreEquals(new_cache, @cached) == false
      @ob = new THREE.CubeGeometry(@rack.get("width").get(), @rack.get("height").get(), @rack.get("depth").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get(), @rack.get("segments_depth").get(), @rack.get("flip").get())
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob
  typename : => "CubeGeometry"

class nodes.types.Geometry.SphereGeometry extends NodeBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.SphereGeometry(100, 20, 20)
    
    #@value = 0
    @rack.addFields
      inputs:
        "radius": 100
        "segments_width": 1
        "segments_height": 1
      outputs:
        "out": {type: "Any", val: @ob}
    @cached = @get_cache_array()
  
  get_cache_array: =>
    [@rack.get("radius").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get()]

  compute: =>
    new_cache = @get_cache_array()
    if flatArraysAreEquals(new_cache, @cached) == false
      @ob = new THREE.SphereGeometry(@rack.get("radius").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get())
      @cached = new_cache
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob
  typename : => "SphereGeometry"

class nodes.types.Three.Scene extends nodes.types.Three.Object3D
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.Scene()
    #@rack.addFields
    #  inputs:
    #    "lights": {type: "Array", val: []}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'lights'])
    childs_in = @rack.get("children").get()
    # remove old childs
    for child in @ob.children
      ind = childs_in.indexOf(child)
      if ind == -1
        console.log "remove"
        console.log child
        @ob.removeChild(child)
    
    #add new childs
    for child in childs_in
      ind = @ob.children.indexOf(child)
      if ind == -1
        console.log child
        @ob.addChild(child)
        
    
    @rack.get("out", true).set @ob
  typename : => "Scene"

class nodes.types.Three.Mesh extends nodes.types.Three.Object3D
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.Mesh(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true }))
    @rack.addFields
      inputs:
        "geometry": {type: "Any", val: new THREE.CubeGeometry( 200, 200, 200 )}
        "materials": {type: "Any", val: [new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true })]}
        "overdraw": false
    @rack.get("out", true).set @ob
    @geometry_cache = @rack.get('geometry').get().id
    @materials_cache = @rack.get('materials').get()

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'geometry'])
    if @geometry_cache != @rack.get('geometry').get().id || flatArraysAreEquals(@materials_cache, @rack.get('materials').get()) == false
      @ob = new THREE.Mesh(@rack.get('geometry').get(), @rack.get('materials').get())
      @geometry_cache = @rack.get('geometry').get().id
      @materials_cache = @rack.get('materials').get()
    @rack.get("out", true).set @ob
  typename : => "Mesh"

class nodes.types.Three.Camera extends NodeBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.Camera()
    @rack.addFields
      inputs:
        "fov": 50
        "aspect": 1
        "near": 0.1
        "far": 2000
        "position": {type: "Vector3", val: new THREE.Vector3()}
        "target": {type: "Object3D", val: new THREE.Object3D()}
        "useTarget": false
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob
  typename : => "Camera"

class nodes.types.Three.WebGLRenderer extends NodeBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.WebGLRenderer()
    @width = 0
    @height = 0
    @rack.addFields
      inputs:
        "width": 800
        "height": 600
        "scene": {type: "Scene", val: new THREE.Scene()}
        "camera": {type: "Camera", val: new THREE.Camera(75, 800 / 600, 1, 10000)}
      outputs:
        "out": {type: "Any", val: @ob}
    @apply_size()
    @rack.get("camera").val.position.z = 1000
    
    @win = window.open('', 'win' + @nid, "width=800,height=600,scrollbars=false")
    @win.document.body.appendChild( @ob.domElement );
  
  apply_size: =>
    w = @rack.get('width').get()
    h = @rack.get('height').get()
    if w != @width || h != @height
      @ob.setSize(w, h)
    @width = w
    @height = h
    
  compute: =>
    @apply_size()
    
    sce = @rack.get("scene").get()
    cam = @rack.get("camera").get()
    #if sce != false && cam != false
    @ob.render(sce, cam)
    #@rack.get("out", true).set @ob
  typename : => "WebGLRenderer"

class nodes.types.Three.PointLight extends NodeBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.PointLight(0xffffff)
    @rack.addFields
      inputs:
        "color": {type: "Color", val: new THREE.Color(1, 1, 1)}
        "position": {type: "Vector3", val: new THREE.Vector3()}
        "intensity": 1
        "distance": 0
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob
  typename : => "PointLight"

class NodeMaterialBase extends NodeBase
  constructor: (x, y) ->
    super x, y
    @ob = false
    @rack.addFields
      inputs:
        "opacity": 1
        "transparent": false
        "depthTest": true
        #"blending": THREE.NormalBlending
        "alphaTest": 0
        "polygonOffset": false
        "polygonOffsetFactor": 0
        "polygonOffsetUnits": 0
  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob

class nodes.types.Materials.MeshBasicMaterial extends NodeMaterialBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.MeshBasicMaterial({color: 0xff0000})
    @rack.addFields
      inputs:
        "color": {type: "Color", val: new THREE.Color(1, 0, 0)}
        "reflectivity": 1
        "refractionRatio": 0.98
        "wireframe": false
        "wireframeLinecap": 1
        "vertexColors": false
        "skinning": false
      outputs:
        "out": {type: "Any", val: @ob}
  
  #compute: =>
  #  @apply_fields_to_val(@rack.node_fields.inputs, @ob)
  #  @rack.get("out", true).set @ob
  typename : => "MeshBasicMaterial"

#https://github.com/mrdoob/three.js/blob/master/src/materials/MeshLambertMaterial.js
class nodes.types.Materials.MeshLambertMaterial extends NodeMaterialBase
  constructor: (x, y) ->
    super x, y
    @ob = new THREE.MeshLambertMaterial({color: 0xff0000})
    @rack.addFields
      inputs:
        "color": {type: "Color", val: new THREE.Color(1, 0, 0)}
        "reflectivity": 1
        "refractionRatio": 0.98
        "wireframe": false
        "vertexColors": {type: "Any", val: false}
        "skinning": false
      outputs:
        "out": {type: "Any", val: @ob}
  
  #compute: =>
  #  @apply_fields_to_val(@rack.node_fields.inputs, @ob)
  #  @rack.get("out", true).set @ob
  typename : => "MeshLambertMaterial"


