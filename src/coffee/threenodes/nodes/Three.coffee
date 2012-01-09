define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.nodes.types.Three.Object3D extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.Object3D()
      @rack.addFields
        inputs:
          "children": {type: "Object3D", val: [], default: []}
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
    
    get_children_array: =>
      childs = @rack.get("children").val
      if childs && $.type(childs) != "array"
        return [childs]
      return childs
    
    compute: =>
      @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children'])
      childs_in = @get_children_array()
      
      # no connections mean no children
      if @rack.get("children").connections.length == 0 && @ob.children.length != 0
        @ob.remove(@ob.children[0]) while @ob.children.length > 0
      
      # remove old childs
      for child in @ob.children
        ind = childs_in.indexOf(child)
        if child && ind == -1 && child
          #console.log "object remove child"
          #console.log @ob
          @ob.remove(child)
      
      #add new childs
      for child in childs_in
        ind = @ob.children.indexOf(child)
        if ind == -1
          #console.log "object add child"
          #console.log @ob
          @ob.add(child)
      
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Three.Scene extends ThreeNodes.nodes.types.Three.Object3D
    set_fields: =>
      super
      @ob = new THREE.Scene()
      @v_fog = @rack.addField("fog", {type: 'Any', val: null})
      current_scene = @ob
  
    apply_children: =>
      # no connections means no children
      if @rack.get("children").connections.length == 0 && @ob.children.length != 0
        @ob.remove(@ob.children[0]) while @ob.children.length > 0
        return true
      
      childs_in = @get_children_array()
      # remove old childs
      for child in @ob.children
        ind = childs_in.indexOf(child)
        if child && ind == -1 && child instanceof THREE.Light == false
          #console.log "scene remove child"
          #console.log @ob
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
            ThreeNodes.rebuild_all_shaders()
        else
          ind = @ob.children.indexOf(child)
          if ind == -1
            #console.log "scene add child"
            #console.log @ob
            @ob.add(child)
  
    compute: =>
      @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'lights'])
      @apply_children()
      @rack.set("out", @ob)
  
  class Object3DwithMeshAndMaterial extends ThreeNodes.nodes.types.Three.Object3D
    set_fields: =>
      super
      @material_cache = false
      @geometry_cache = false
      
    rebuild_geometry: =>
      field = @rack.get('geometry')
      if field.connections.length > 0
        geom = field.connections[0].from_field.node
        geom.cached = []
        geom.compute()
      else
        @rack.get('geometry').set(new THREE.CubeGeometry( 200, 200, 200 ))
      
    get_geometry_cache: =>
      res = ""
      if jQuery.type(@rack.get('geometry').val) == "array"
        for f in @rack.get('geometry').val
          res += f.id
      else
        res = @rack.get('geometry').val.id
      res
      
    get_material_cache: =>
      res = ""
      if jQuery.type(@rack.get('material').val) == "array"
        for f in @rack.get('material').val
          res += f.id
      else
        res = @rack.get('material').val.id
      res
  
  class ThreeNodes.nodes.types.Three.Mesh extends Object3DwithMeshAndMaterial
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "geometry": {type: "Geometry", val: new THREE.CubeGeometry( 200, 200, 200 )}
          "material": {type: "Material", val: new THREE.MeshBasicMaterial({color: 0xff0000})}
          "overdraw": false
      @ob = [new THREE.Mesh(@rack.get('geometry').get(), @rack.get('material').get())]
      @last_slice_count = 1
      @compute()
      
    compute: =>
      needs_rebuild = false
      numItems = @rack.getMaxInputSliceCount()
      new_material_cache = @get_material_cache()
      new_geometry_cache = @get_geometry_cache()
      
      if @last_slice_count != numItems
        needs_rebuild = true
        @last_slice_count = numItems
      
      if @input_value_has_changed(@vars_shadow_options, @shadow_cache)
        needs_rebuild = true
      
      if @material_cache != new_material_cache
        # let's trigger a geometry rebuild so we have the appropriate buffers set
        @rebuild_geometry()
      
      if @geometry_cache != new_geometry_cache || @material_cache != new_material_cache || needs_rebuild
        @ob = []
        for i in [0..numItems]
          item = new THREE.Mesh(@rack.get('geometry').get(i), @rack.get('material').get(i))
          @ob[i] = item
          
      for i in [0..numItems]
        @apply_fields_to_val(@rack.node_fields.inputs, @ob[i], ['children', 'geometry', 'material'], i)
      
      if needs_rebuild == true
        ThreeNodes.rebuild_all_shaders()
      
      @shadow_cache = @create_cache_object(@vars_shadow_options)
      @geometry_cache = @get_geometry_cache()
      @material_cache = @get_material_cache()
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Three.Line extends Object3DwithMeshAndMaterial
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "geometry": {type: "Geometry", val: new THREE.CubeGeometry( 200, 200, 200 )}
          "material": {type: "Material", val: new THREE.LineBasicMaterial({color: 0xffffff})}
          "type":
            type: "Float"
            val: THREE.LineStrip
            values:
              "LineStrip": THREE.LineStrip
              "LinePieces": THREE.LinePieces
      @ob = [new THREE.Line(@rack.get('geometry').get(), @rack.get('material').get())]
      @last_slice_count = 1
      @compute()
      
    compute: =>
      needs_rebuild = false
      numItems = @rack.getMaxInputSliceCount()
      new_material_cache = @get_material_cache()
      new_geometry_cache = @get_geometry_cache()
      
      if @last_slice_count != numItems
        needs_rebuild = true
        @last_slice_count = numItems
      
      if @input_value_has_changed(@vars_shadow_options, @shadow_cache)
        needs_rebuild = true
      
      if @material_cache != new_material_cache
        # let's trigger a geometry rebuild so we have the appropriate buffers set
        @rebuild_geometry()
      
      if @geometry_cache != new_geometry_cache || @material_cache != new_material_cache || needs_rebuild
        @ob = []
        for i in [0..numItems]
          item = new THREE.Line(@rack.get('geometry').get(i), @rack.get('material').get(i))
          @ob[i] = item
          
      for i in [0..numItems]
        @apply_fields_to_val(@rack.node_fields.inputs, @ob[i], ['children', 'geometry', 'material'], i)
      
      if needs_rebuild == true
        ThreeNodes.rebuild_all_shaders()
      
      @shadow_cache = @create_cache_object(@vars_shadow_options)
      @geometry_cache = @get_geometry_cache()
      @material_cache = @get_material_cache()
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Three.Camera extends ThreeNodes.NodeBase
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
          "target": {type: "Vector3", val: new THREE.Vector3()}
          "useTarget": false
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['target'])
      @ob.lookAt(@rack.get("target").get())
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Three.Texture extends ThreeNodes.NodeBase
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
  
  class ThreeNodes.nodes.types.Three.Fog extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @ob = false
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "near": 1
          "far": 1000
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      if @ob == false
        @ob = new THREE.Fog(0xffffff, 1, 1000)
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Three.FogExp2 extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @ob = false
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "density": 0.00025
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      if @ob == false
        @ob = new THREE.FogExp2(0xffffff, 0.00025)
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Three.WebGLRenderer extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @preview_mode = true
      @creating_popup = false
      @ob = ThreeNodes.Webgl.current_renderer
      @width = 0
      @height = 0
      $("body").append("<div id='webgl-window'></div>")
      @webgl_container = $("#webgl-window")
      @rack.addFields
        inputs:
          "width": 800
          "height": 600
          "scene": {type: "Scene", val: new THREE.Scene()}
          "camera": {type: "Camera", val: new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)}
          "bg_color": {type: "Color", val: new THREE.Color(0, 0, 0)}
          "postfx": {type: "Array", val: []}
          "shadowCameraNear": 3
          "shadowCameraFar": 3000
          "shadowMapWidth": 512
          "shadowMapHeight": 512
          "shadowMapEnabled": false
          "shadowMapSoft": true
      
      @rack.get("camera").val.position.z = 1000
      @win = false
      @apply_size()
      @old_bg = false
      @apply_bg_color()
      self = this
      
      @add_mouse_handler()
      @webgl_container.click (e) =>
        if @context.player_mode == false
          @create_popup_view()
      return this
    
    add_mouse_handler: =>
      $(@ob.domElement).mousemove (e) ->
        ThreeNodes.mouseX = e.layerX
        ThreeNodes.mouseY = e.layerY
    
    create_popup_view: ->
      @preview_mode = false
      @creating_popup = true
      
      @win = window.open('', 'win' + @nid, "width=800,height=600,scrollbars=false,location=false,status=false,menubar=false")
      $("body", $(@win.document)).append( @ob.domElement )
      $("*", $(@win.document)).css
        padding: 0
        margin: 0
      @apply_bg_color(true)
      @apply_size(true)
      @add_mouse_handler()
    
    create_preview_view: ->
      @preview_mode = true
      @webgl_container.append( @ob.domElement )
      @apply_bg_color(true)
      @apply_size(true)
      @add_mouse_handler()
    
    apply_bg_color: (force_refresh = false) ->
      new_val = @rack.get('bg_color').get().getContextStyle()
      
      if @old_bg == new_val && force_refresh == false
        return false
      
      @ob.setClearColor( @rack.get('bg_color').get(), 1 )
      @webgl_container.css
        background: new_val
      
      if @win
        $(@win.document.body).css
          background: new_val
      
      @old_bg = new_val
    
    apply_size: (force_refresh = false) =>
      w = @rack.get('width').get()
      h = @rack.get('height').get()
      dw = w
      dh = h
      if @win == false && @context.player_mode == false
        maxw = 220
        r = w / h
        dw = maxw
        dh = dw / r
      if dw != @width || dh != @height || force_refresh
        @ob.setSize(dw, dh)
        if @win && @win != false
          # todo: implement the same with ".innerWidth =" and ".innerHeight =" when chrome support this
          @win.resizeTo(dw, dh + 52)
      @width = dw
      @height = dh
    
    apply_post_fx: =>
      # work on a copy of the incoming array
      fxs = @rack.get("postfx").get().slice(0)
      # 1st pass = rendermodel, last pass = screen
      fxs.unshift ThreeNodes.Webgl.renderModel
      fxs.push ThreeNodes.Webgl.effectScreen
      ThreeNodes.Webgl.composer.passes = fxs
      
    add_renderer_to_dom: =>
      if @preview_mode && $("canvas", @webgl_container).length == 0
        @create_preview_view()
      if @preview_mode == false && @win == false
        @create_popup_view()
    
    compute: =>
      # help fix asynchronous bug with firefox when opening popup
      if @creating_popup == true && !@win
        return
      
      @creating_popup = false
      if @win != false
        if @win.closed && @preview_mode == false
          @preview_mode = true
          @win = false
      if !@context.testing_mode
        @add_renderer_to_dom()
      
      @apply_size()
      @apply_bg_color()
      @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['width', 'height', 'scene', 'camera', 'bg_color', 'postfx'])
      ThreeNodes.Webgl.current_camera = @rack.get("camera").get()
      ThreeNodes.Webgl.current_scene = @rack.get("scene").get()
      
      #set the current aspect on the camera
      @rack.get("camera").get().aspect = @width / @height
      @rack.get("camera").get().updateProjectionMatrix()
      
      @apply_post_fx()
      @ob.clear()
      ThreeNodes.Webgl.renderModel.scene = ThreeNodes.Webgl.current_scene
      ThreeNodes.Webgl.renderModel.camera = ThreeNodes.Webgl.current_camera
      ThreeNodes.Webgl.composer.renderer = ThreeNodes.Webgl.current_renderer
      ThreeNodes.Webgl.composer.render(0.05)
    
    remove: () =>
      if @win && @win != false
        @win.close()
      super
