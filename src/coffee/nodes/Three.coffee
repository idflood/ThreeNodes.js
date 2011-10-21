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
    
    # remove old childs
    for child in @ob.children
      ind = childs_in.indexOf(child)
      if child && ind == -1 && child instanceof THREE.Light == false
        @ob.removeChild(child)
        
    for child in @ob.children
      ind = childs_in.indexOf(child)
      if child && ind == -1 && child instanceof THREE.Light == true
        @ob.removeLight(child)
        
    #add new childs
    for child in childs_in
      if child instanceof THREE.Light == true
        ind = @ob.children.indexOf(child)
        if ind == -1
          @ob.addLight(child)
      else
        ind = @ob.children.indexOf(child)
        if ind == -1
          @ob.addChild(child)

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
