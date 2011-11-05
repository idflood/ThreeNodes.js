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
    @vars_shadow_options = ["castShadow", "receiveShadow"]
    @shadow_cache = @create_cache_object(@vars_shadow_options)

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children'])
    childs_in = @rack.get("children").get()
    
    # remove old childs
    for child in @ob.children
      ind = childs_in.indexOf(child)
      if child && ind == -1 && child
        console.log "object remove child"
        console.log @ob
        @ob.removeChild(child)
    
    #add new childs
    for child in childs_in
      ind = @ob.children.indexOf(child)
      if ind == -1
        console.log "object add child"
        console.log @ob
        @ob.addChild(child)
    
    @rack.set("out", @ob)

class nodes.types.Three.Scene extends nodes.types.Three.Object3D
  set_fields: =>
    super
    @ob = new THREE.Scene()
    current_scene = @ob
    
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
        console.log "scene remove child"
        console.log @ob
        @ob.remove(child)
        
    for child in @ob.children
      ind = childs_in.indexOf(child)
      if child && ind == -1 && child instanceof THREE.Light == true
        @ob.remove(child)
        
    #add new childs
    for child in childs_in
      if child instanceof THREE.Light == true
        ind = @ob.children.indexOf(child)
        if ind == -1
          @ob.add(child)
          rebuild_all_shaders()
      else
        ind = @ob.children.indexOf(child)
        if ind == -1
          console.log "scene add child"
          console.log @ob
          @ob.add(child)

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'lights'])
    @apply_children()
    @rack.set("out", @ob)

class nodes.types.Three.Mesh extends nodes.types.Three.Object3D
  set_fields: =>
    super
    @ob = new THREE.Mesh(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: false }))
    @rack.addFields
      inputs:
        "geometry": {type: "Any", val: new THREE.CubeGeometry( 200, 200, 200 )}
        "materials": {type: "Array", val: [new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: false })]}
        "overdraw": false
    @rack.set("out", @ob)
    @geometry_cache = @rack.get('geometry').get().id
    @materials_cache = @rack.get('materials').get()

  compute: =>
    needs_rebuild = false
    
    if @input_value_has_changed(@vars_shadow_options, @shadow_cache)
      @ob = new THREE.Mesh(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: false }))
      needs_rebuild = true
      
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'geometry'])
    
    if @geometry_cache != @rack.get('geometry').get().id || flatArraysAreEquals(@materials_cache, @rack.get('materials').get()) == false
      @ob = new THREE.Mesh(@rack.get('geometry').get(), @rack.get('materials').get())
      @geometry_cache = @rack.get('geometry').get().id
      @materials_cache = @rack.get('materials').get()
    
    @shadow_cache = @create_cache_object(@vars_shadow_options)
    
    if needs_rebuild == true
      rebuild_all_shaders()
    
    @rack.set("out", @ob)

class nodes.types.Three.Camera extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
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
    @rack.set("out", @ob)

class nodes.types.Three.Texture extends NodeBase
  set_fields: =>
    super
    @ob = false
    @cached = false
    @rack.addFields
      inputs:
        "image": {type: "String", val: false}
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    current = @rack.get("image").get()
    if current && current != ""
      if @cached == false || ($.type(@cached) == "object" && @cached.constructor == THREE.Texture && @cached.image.attributes[0].nodeValue != current)
        #@ob = new THREE.Texture(current)
        @ob = new THREE.ImageUtils.loadTexture(current)
        console.log "new texture"
        console.log @ob
        @cached = @ob
        
    @rack.set("out", @ob)
    
class nodes.types.Three.WebGLRenderer extends NodeBase
  set_fields: =>
    super
    @ob = current_renderer
    @width = 0
    @height = 0
    @rack.addFields
      inputs:
        "width": 800
        "height": 600
        "scene": {type: "Scene", val: new THREE.Scene()}
        "camera": {type: "Camera", val: new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)}
        "bg_color": {type: "Color", val: new THREE.Color(0, 0, 0)}
        "postfx": {type: "Any", val: false}
        "shadowCameraNear": 3
        "shadowCameraFar": 3000
        "shadowMapWidth": 512
        "shadowMapHeight": 512
        "shadowMapEnabled": false
        "shadowMapSoft": true
      outputs:
        "out": {type: "Any", val: @ob}
    @apply_size()
    @rack.get("camera").val.position.z = 1000
    @win = window.open('', 'win' + @nid, "width=800,height=600,scrollbars=false,location=false,status=false,menubar=false")
    @win.document.body.appendChild( @ob.domElement );
    $("*", @win.document).css
      padding: 0
      margin: 0
    @old_bg = false
    @apply_bg_color()
  
  apply_bg_color: ->
    new_val = @rack.get('bg_color').get().getContextStyle()
    if @win && @old_bg != new_val
      $(@win.document.body).css
        background: new_val
      @ob.setClearColor( @rack.get('bg_color').get(), 1 )
      @old_bg = new_val
  
  apply_size: =>
    if !@win
      return false
    w = @rack.get('width').get()
    h = @rack.get('height').get()
    if w != @width || h != @height
      @ob.setSize(w, h)
    @width = w
    @height = h
  
  apply_post_fx: =>
    fxs = @rack.get("postfx").get()
    if fxs == false
      fxs = []
    fxs.unshift renderModel
    fxs.push effectScreen
    composer.passes = fxs
    
  compute: =>
    @apply_size()
    @apply_bg_color()
    @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['width', 'height', 'scene', 'camera', 'bg_color', 'postfx'])
    sce = @rack.get("scene").get()
    cam = @rack.get("camera").get()
    
    current_camera = cam
    current_scene = sce
    #if sce != false && cam != false
    #@ob.render(sce, cam)
    @apply_post_fx()
    @ob.clear()
    renderModel.scene = current_scene
    renderModel.camera = current_camera
    composer.render(0.05)
    #@rack.set("out", @ob)
