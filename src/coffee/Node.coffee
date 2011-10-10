field_click_1 = false

class NodeBase 
  constructor: (@x, @y, @inXML = false) ->
    if @inXML
      @nid = parseInt @inXML.attr("nid")
      uid = @nid
    else
      @nid = get_uid()
    @container = $("#container")
    @out_connections = []
    @rack = new NodeFieldRack(this, @inXML)
    @value = false
    @name = false
    @main_view = false
    @updated = false
    @init()
    @set_fields()
    if @inXML != false
      @rack.fromXML(@inXML)
    
  typename: => String(@constructor.name)
  
  set_fields: =>
    # to implement
  
  has_out_connection: () =>
    @out_connections.length != 0
  
  compute: () =>
    @value = @value
  
  remove: () =>
    @main_view.remove()
    # todo: maybe remove fields
    # todo: remove sidebar attributes if this is the selected node
  
  update: () =>
    if @updated == true
      return true
    @updated = true
    # update all input fields and their connected node source
    @rack.update_inputs()
    # update node output values based on inputs
    @compute()
  
  toXML: () =>
    pos = @main_view.position()
    "\t\t\t<node nid='#{@nid}' type='#{@typename()}' x='#{pos.left}' y='#{pos.top}'>#{@rack.toXML()}</node>\n"
  
  apply_fields_to_val: (afields, target, exceptions = []) =>
    for f of afields
      nf = afields[f]
      if exceptions.indexOf(nf.name) == -1
        target[nf.name] = @rack.get(nf.name).val
  
  create_field_connection: (field) =>
    f = this
    if field_click_1 == false
      field_click_1 = field
      $(".inputs .field").filter () ->
        $(this).parent().parent().parent().attr("id") != "nid-#{f.nid}"
      .addClass "field-possible-target"
    else
      field_click_2 = field
      new NodeConnection(field_click_1, field_click_2)
      $(".field").removeClass "field-possible-target"
      field_click_1 = false
      
  render_connections: () =>
    @rack.render_connections()
    #svg.safari()
  
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
    this
    
  add_out_connection: (c, field) =>
    if @out_connections.indexOf(c) == -1
      @out_connections.push(c)
    c

  remove_connection: (c) =>
    c_index = @out_connections.indexOf(c)
    if c_index != -1
      @out_connections.splice(c_index, 1)
    c

  init: () =>
    self = this
    @container.append "<div id='nid-#{@nid}' class='node node-#{@typename()}'><div class='head'>#{@typename()}</div><div class='options'><div class='inputs'></div><div class='center'></div><div class='outputs'></div></div></div>"
    @main_view = $("#nid-#{@nid}")
    @main_view.css
      left: @x
      top: @y
    @main_view.draggable
      drag: () ->
        self.render_connections()
      stop: () ->
        self.render_connections()
    $(".head", @main_view).dblclick (e) ->
      $(".options", self.main_view).animate {height: 'toggle'}, 120, () ->
        self.render_connections()
        
    $(".head", @main_view).click (e) ->
      self.rack.render_sidebar()

class NodeNumberSimple extends NodeBase
  init: =>
    super
    @value = 0
    
  set_fields: =>
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
  set_fields: =>
    super
    @rack.add_center_textfield(@v_in)

class nodes.types.Base.String extends NodeBase
  init: =>
    super
    @value = ""
    
  set_fields: =>
    @rack.addFields
      inputs:
        "string": ""
      outputs:
        "out": {type: "Any", val: @ob}
  compute: =>
    @rack.get("out", true).set @rack.get("string").get()

class nodes.types.Math.Sin extends NodeNumberSimple
  process_val: (num, i) =>
    Math.sin(num)

class nodes.types.Math.Cos extends NodeNumberSimple
  process_val: (num, i) =>
    Math.cos(num)

class nodes.types.Math.Tan extends NodeNumberSimple
  process_val: (num, i) =>
    Math.tan(num)

class nodes.types.Math.Round extends NodeNumberSimple
  process_val: (num, i) =>
    Math.round(num)

class nodes.types.Math.Ceil extends NodeNumberSimple
  process_val: (num, i) =>
    Math.ceil(num)

class nodes.types.Math.Floor extends NodeNumberSimple
  process_val: (num, i) =>
    Math.floor(num)

class nodes.types.Math.Mod extends NodeNumberSimple
  set_fields: =>
    super
    @v_valy = @rack.addInput(new fields.types.Float("y", 2))
  process_val: (num, i) =>
    num % @v_valy.get()

class nodes.types.Math.Add extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("y", 1))
  process_val: (num, i) =>
    num + @v_factor.get()

class nodes.types.Math.Subtract extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("y", 1))
  process_val: (num, i) =>
    num - @v_factor.get()

class nodes.types.Math.Mult extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("factor", 2))
  process_val: (num, i) =>
    num * @v_factor.get()

class nodes.types.Math.Divide extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("y", 2))
  process_val: (num, i) =>
    num / @v_factor.get()

class nodes.types.Math.Min extends NodeNumberSimple
  set_fields: =>
    super
    @v_inb = @rack.addInput(new fields.types.Float("in2", 0))
  process_val: (num, i) =>
    Math.min(num, @v_inb.get())

class nodes.types.Math.Max extends NodeNumberSimple
  set_fields: =>
    super
    @v_inb = @rack.addInput(new fields.types.Float("in2", 0))
  process_val: (num, i) =>
    Math.max(num, @v_inb.get())

class nodes.types.Utils.Random extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Utils.Merge extends NodeBase
  set_fields: =>
    super
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
      if k.get() != null && k.connections.length > 0
        @value[@value.length] = k.get()
    if @value != old
      @rack.get("out", true).set @value

class nodes.types.Utils.Get extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Utils.SoundInput extends NodeBase
  set_fields: =>
    super
    @counter = 0
    @rack.addFields
      outputs:
        "low" : 0
        "medium" : 0
        "high" : 0
  compute: () =>
    @rack.get("low", true).set flash_sound_value[2 % flash_sound_value.length]
    @rack.get("medium", true).set flash_sound_value[9 % flash_sound_value.length]
    @rack.get("high", true).set flash_sound_value[14 % flash_sound_value.length]
  

class nodes.types.Utils.Timer extends NodeBase
  set_fields: =>
    super
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
    @rack.get("out", true).set @counter

class nodes.types.Base.Vector2 extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Base.Vector3 extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Base.Color extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Three.Object3D extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.Object3D()
    @rack.addFields
      inputs:
        "children": {type: "Array", val: []}
        "position": {type: "Vector3", val: new THREE.Vector3()}
        "rotation": {type: "Vector3", val: new THREE.Vector3()}
        "scale": {type: "Vector3", val: new THREE.Vector3(1, 1, 1)}
        "doubleSided": false
        "visible": true
        "castShadow": false
        "receiveShadow": false
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

class nodes.types.Geometry.CubeGeometry extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Geometry.SphereGeometry extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Three.Scene extends nodes.types.Three.Object3D
  set_fields: =>
    super
    @ob = new THREE.Scene()
    #@rack.addFields
    #  inputs:
    #    "lights": {type: "Array", val: []}
    #@obl = new THREE.PointLight(0xffffff)
    #@obl.position.y = 300
    #@obo = new THREE.Mesh(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: false }))
    #@obo.position.y = -300

  apply_children: =>
    childs_in = @rack.get("children").get()
    #console.log childs_in
    # remove old childs
    for child in @ob.children
      ind = childs_in.indexOf(child)
      if child && ind == -1 && child instanceof THREE.Light == false
        console.log "remove"
        console.log child
        @ob.removeChild(child)
        
    for child in @ob.children
      ind = childs_in.indexOf(child)
      if child && ind == -1 && child instanceof THREE.Light == true
        console.log "remove light"
        console.log child
        @ob.removeLight(child)
        
    #add new childs
    for child in childs_in
      if child instanceof THREE.Light == true
        ind = @ob.children.indexOf(child)
        if ind == -1
          console.log "light"
          console.log child
          @ob.addLight(child)
          console.log @ob.children
      else
        ind = @ob.children.indexOf(child)
        if ind == -1
          console.log child
          @ob.addChild(child)
        #@ob.addChild(child)
  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'lights'])
    @apply_children()
    @rack.get("out", true).set @ob

class nodes.types.Three.Mesh extends nodes.types.Three.Object3D
  set_fields: =>
    super
    @ob = new THREE.Mesh(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: false }))
    @rack.addFields
      inputs:
        "geometry": {type: "Any", val: new THREE.CubeGeometry( 200, 200, 200 )}
        "materials": {type: "Array", val: [new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: false })]}
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

class nodes.types.Three.Camera extends NodeBase
  set_fields: =>
    super
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

class nodes.types.Three.WebGLRenderer extends NodeBase
  set_fields: =>
    super
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
    console.log "xyz"
    @win = window.open('', 'win' + @nid, "width=800,height=600,scrollbars=false")
    @win.document.body.appendChild( @ob.domElement );
  
  apply_size: =>
    if !@win
      return false
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

class nodes.types.Lights.PointLight extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.PointLight(0xffffff)
    
    @rack.addFields
      inputs:
        "color": {type: "Color", val: new THREE.Color(0xffffff)}
        "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
        "intensity": 1
        "distance": 0
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob

class nodes.types.Lights.DirectionalLight extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.DirectionalLight(0xffffff)
    
    @rack.addFields
      inputs:
        "color": {type: "Color", val: new THREE.Color(0xffffff)}
        "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
        "intensity": 1
        "distance": 0
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob

class nodes.types.Lights.AmbientLight extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.AmbientLight(0xffffff)
    
    @rack.addFields
      inputs:
        "color": {type: "Color", val: new THREE.Color(0xffffff)}
        "intensity": 1
        "distance": 0
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob

class NodeMaterialBase extends NodeBase
  set_fields: =>
    super
    @ob = false
    webgl_materials_node[webgl_materials_node.length] = this
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
  set_fields: =>
    super
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

#https://github.com/mrdoob/three.js/blob/master/src/materials/MeshLambertMaterial.js
class nodes.types.Materials.MeshLambertMaterial extends NodeMaterialBase
  set_fields: =>
    super
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


