define [
  'jquery',
  'Underscore',
  'Backbone',
  'cs!threenodes/models/Node',
  'cs!threenodes/utils/Utils',
], (jQuery, _, Backbone) ->
  #"use strict"

  namespace "ThreeNodes.nodes.models",
    Object3D: class Object3D extends ThreeNodes.NodeBase
      @node_name = 'Object3D'
      @group_name = 'Three'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.Object3D()
        @vars_shadow_options = ["castShadow", "receiveShadow"]
        @shadow_cache = @createCacheObject(@vars_shadow_options)

        @vars_shadow_options = ["castShadow", "receiveShadow"]
      setFields: =>
        # We don't want to have the basic input / output
        # so don't call super neither extend fields with base_fields
        fields =
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
        return fields

      deleteObjectAttributes: (ob) =>
        if ob
          delete ob.up
          delete ob.position
          delete ob.rotation
          delete ob.scale
          delete ob.matrix
          delete ob.matrixWorld
          delete ob.matrixRotationWorld
          delete ob.quaternion
          delete ob._vector

      remove: () =>
        super
        @deleteObjectAttributes(@ob)
        delete @ob
        delete @shadow_cache

      get_children_array: =>
        childs = @fields.getField("children").get("value")
        if childs && $.type(childs) != "array"
          return [childs]
        return childs

      apply_children: =>
        # no connections means no children
        if @fields.getField("children").connections.length == 0 && @ob.children.length != 0
          @ob.remove(@ob.children[0]) while @ob.children.length > 0
          return true

        childs_in = @get_children_array()
        # remove old childs
        for child in @ob.children
          ind = childs_in.indexOf(child)
          if child && ind == -1
            #console.log "object remove child"
            @ob.remove(child)

        #add new childs
        for child in childs_in
          ind = @ob.children.indexOf(child)
          if child instanceof THREE.Light == true
            if ind == -1
              @ob.add(child)
              @trigger("RebuildAllShaders")
          else
            if ind == -1
              #console.log "scene add child"
              @ob.add(child)

      compute: =>
        @applyFieldsToVal(@fields.inputs, @ob, ['children'])
        @apply_children()
        @fields.setField("out", @ob)

    Scene: class Scene extends Object3D
      @node_name = 'Scene'
      @group_name = 'Three'

      initialize: (options) =>
        super
        @ob = new THREE.Scene()

      #setFields: =>
      #  super
      #  @v_fog = @fields.addField("fog", {type: 'Any', val: null})

      remove: () =>
        if @ob
          delete @ob.fog
          delete @ob.__objects
          delete @ob.__lights
          delete @ob.__objectsAdded
          delete @ob.__objectsRemoved
        delete @vfog
        super

      compute: =>
        @applyFieldsToVal(@fields.inputs, @ob, ['children', 'lights'])
        @apply_children()
        @fields.setField("out", @ob)

    Object3DwithMeshAndMaterial: class Object3DwithMeshAndMaterial extends Object3D
      initialize: (options) =>
        super
        @material_cache = false
        @geometry_cache = false

      remove: () =>
        delete @material_cache
        delete @geometry_cache
        super

      rebuild_geometry: =>
        field = @fields.getField('geometry')
        if field.connections.length > 0
          geom = field.connections[0].from_field.node
          geom.cached = []
          geom.compute()
        else
          @fields.getField('geometry').setValue(new THREE.CubeGeometry( 200, 200, 200 ))

      get_geometry_cache: =>
        res = ""
        current_val = @fields.getField('geometry').get("value")
        if $.type(current_val) == "array"
          for f in current_val
            res += f.id
        else
          res = current_val.id
        res

      get_material_cache: =>
        res = ""
        current_val = @fields.getField('material').get("value")
        if $.type(current_val) == "array"
          for f in current_val
            res += f.id
        else
          res = current_val.id
        res

    ColladaLoader: class ColladaLoader extends Object3D
      @node_name = 'ColladaLoader'
      @group_name = 'Three'

      initialize: (options) =>
        @ob = [new THREE.Object3D()]
        @file_url = ""
        @vars_shadow_options = ["castShadow", "receiveShadow"]
        @shadow_cache = @createCacheObject(@vars_shadow_options)
        @compute()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "file_url": ""
        return $.extend(true, base_fields, fields)

      remove: () =>
        if @ob
          for item in @ob
            @deleteObjectAttributes(item)

        delete @model_object
        super

      onModelLoaded: () =>
        for subchild in @ob
          subchild.add(@model_object)

      compute: =>
        needs_rebuild = false
        #numItems = @fields.getMaxInputSliceCount()
        numItems = 0
        new_url = @fields.getField('file_url').getValue()
        #if @last_slice_count != numItems
        #  needs_rebuild = true
        #  @last_slice_count = numItems

        cast = @fields.getField('castShadow').getValue()
        receive = @fields.getField('receiveShadow').getValue()

        if new_url != "" && @file_url != new_url
          @ob = []
          for i in [0..numItems]
            @ob[i] = new THREE.Object3D()
          loader = new THREE.ColladaLoader()
          loader.options.convertUpAxis = true
          loader.load new_url, (collada) =>
            dae = collada.scene
            dae.updateMatrix()
            @model_object = dae
            @onModelLoaded()
            applyShadowOptionsToSubMeshes(@model_object)

        applyShadowOptionsToSubMeshes = (obj) =>
          if !obj
            return false

          obj.castShadow = cast
          obj.receiveShadow = receive

          if obj.material
            rebuild_shader = false
            if obj.material.castShadow != cast || obj.material.receiveShadow != receive
              rebuild_shader = true
              obj.material.castShadow = cast
              obj.material.receiveShadow = receive
            if rebuild_shader == true
              obj.material.program = false
          if obj.children && obj.children.length > 0
            for child in obj.children
              applyShadowOptionsToSubMeshes(child)

        for i in [0..numItems]
          @applyFieldsToVal(@fields.inputs, @ob[i], ['children', 'file_url', 'castShadow', 'receiveShadow'], i)
          @ob[i].castShadow = cast
          @ob[i].receiveShadow = receive

        if @model_object && @inputValueHasChanged(@vars_shadow_options, @shadow_cache)
          needs_rebuild = true
          applyShadowOptionsToSubMeshes(@model_object)

        if needs_rebuild == true
          @trigger("RebuildAllShaders")

        @file_url = new_url
        @shadow_cache = @createCacheObject(@vars_shadow_options)
        @fields.setField("out", @ob)

    ThreeMesh: class ThreeMesh extends Object3DwithMeshAndMaterial
      @node_name = 'Mesh'
      @group_name = 'Three'

      initialize: (options) =>
        @ob = [new THREE.Mesh(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshBasicMaterial({color: 0xff0000}))]
        @last_slice_count = 1
        @compute()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "geometry": {type: "Geometry", val: new THREE.CubeGeometry( 200, 200, 200 )}
            "material": {type: "Material", val: new THREE.MeshBasicMaterial({color: 0xff0000})}
            "overdraw": false
        return $.extend(true, base_fields, fields)

      remove: () =>
        if @ob
          for item in @ob
            @deleteObjectAttributes(item)
            delete item.geometry
            delete item.material

        super

      compute: =>
        needs_rebuild = false
        numItems = @fields.getMaxInputSliceCount()
        new_material_cache = @get_material_cache()
        new_geometry_cache = @get_geometry_cache()

        if @last_slice_count != numItems
          needs_rebuild = true
          @last_slice_count = numItems

        if @inputValueHasChanged(@vars_shadow_options, @shadow_cache)
          needs_rebuild = true

        if @material_cache != new_material_cache
          # let's trigger a geometry rebuild so we have the appropriate buffers set
          @rebuild_geometry()

        if @geometry_cache != new_geometry_cache || @material_cache != new_material_cache || needs_rebuild
          @ob = []
          for i in [0..numItems]
            item = new THREE.Mesh(@fields.getField('geometry').getValue(i), @fields.getField('material').getValue(i))
            @ob[i] = item

        for i in [0..numItems]
          @applyFieldsToVal(@fields.inputs, @ob[i], ['children', 'geometry', 'material'], i)

        if needs_rebuild == true
          @trigger("RebuildAllShaders")

        @shadow_cache = @createCacheObject(@vars_shadow_options)
        @geometry_cache = @get_geometry_cache()
        @material_cache = @get_material_cache()
        @fields.setField("out", @ob)

    ThreeLine: class ThreeLine extends Object3DwithMeshAndMaterial
      @node_name = 'Line'
      @group_name = 'Three'

      initialize: (options) =>
        @ob = [new THREE.Line(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.LineBasicMaterial({color: 0xffffff}))]
        @last_slice_count = 1
        @compute()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "geometry": {type: "Geometry", val: new THREE.CubeGeometry( 200, 200, 200 )}
            "material": {type: "Material", val: new THREE.LineBasicMaterial({color: 0xffffff})}
            "type":
              type: "Float"
              val: THREE.LineStrip
              values:
                "LineStrip": THREE.LineStrip
                "LinePieces": THREE.LinePieces
        return $.extend(true, base_fields, fields)

      compute: =>
        needs_rebuild = false
        numItems = @fields.getMaxInputSliceCount()
        new_material_cache = @get_material_cache()
        new_geometry_cache = @get_geometry_cache()

        if @last_slice_count != numItems
          needs_rebuild = true
          @last_slice_count = numItems

        if @inputValueHasChanged(@vars_shadow_options, @shadow_cache)
          needs_rebuild = true

        if @material_cache != new_material_cache
          # let's trigger a geometry rebuild so we have the appropriate buffers set
          @rebuild_geometry()

        if @geometry_cache != new_geometry_cache || @material_cache != new_material_cache || needs_rebuild
          @ob = []
          for i in [0..numItems]
            item = new THREE.Line(@fields.getField('geometry').getValue(i), @fields.getField('material').getValue(i))
            @ob[i] = item

        for i in [0..numItems]
          @applyFieldsToVal(@fields.inputs, @ob[i], ['children', 'geometry', 'material'], i)

        if needs_rebuild == true
          @trigger("RebuildAllShaders")

        @shadow_cache = @createCacheObject(@vars_shadow_options)
        @geometry_cache = @get_geometry_cache()
        @material_cache = @get_material_cache()
        @fields.setField("out", @ob)

    Camera: class Camera extends ThreeNodes.NodeBase
      @node_name = 'Camera'
      @group_name = 'Three'

      initialize: (options) =>
        super
        @ob = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)

      getFields: =>
        base_fields = super
        fields =
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
        return $.extend(true, base_fields, fields)

      deleteObjectAttributes: (ob) =>
        if ob
          delete ob.up
          delete ob.position
          delete ob.rotation
          delete ob.scale
          delete ob.matrix
          delete ob.matrixWorld
          delete ob.matrixRotationWorld
          delete ob.quaternion
          delete ob._vector

      remove: () =>
        @deleteObjectAttributes(@ob)
        delete @ob
        super

      compute: =>
        @applyFieldsToVal(@fields.inputs, @ob, ['target'])
        @ob.lookAt(@fields.getField("target").getValue())
        @fields.setField("out", @ob)

    Texture: class Texture extends ThreeNodes.NodeBase
      @node_name = 'Texture'
      @group_name = 'Three'

      initialize: (options) =>
        super
        @ob = false
        @cached = false

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "image": {type: "String", val: false}
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: () =>
        delete @ob
        delete @cached
        super

      compute: =>
        current = @fields.getField("image").getValue()
        if current && current != ""
          if @cached == false || ($.type(@cached) == "object" && @cached.constructor == THREE.Texture && @cached.image.attributes[0].nodeValue != current)
            #@ob = new THREE.Texture(current)
            @ob = new THREE.ImageUtils.loadTexture(current)
            console.log "new texture"
            console.log @ob
            @cached = @ob

        @fields.setField("out", @ob)

    Fog: class Fog extends ThreeNodes.NodeBase
      @node_name = 'Fog'
      @group_name = 'Three'

      initialize: (options) =>
        super
        @ob = false

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "color": {type: "Color", val: new THREE.Color(0xffffff)}
            "near": 1
            "far": 1000
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: () =>
        delete @ob
        super

      compute: =>
        if @ob == false
          @ob = new THREE.Fog(0xffffff, 1, 1000)
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    FogExp2: class FogExp2 extends ThreeNodes.NodeBase
      @node_name = 'FogExp2'
      @group_name = 'Three'

      initialize: (options) =>
        super
        @ob = false

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "color": {type: "Color", val: new THREE.Color(0xffffff)}
            "density": 0.00025
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: () =>
        delete @ob
        super

      compute: =>
        if @ob == false
          @ob = new THREE.FogExp2(0xffffff, 0.00025)
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    WebGLRenderer: class WebGLRenderer extends ThreeNodes.NodeBase
      @node_name = 'WebGLRenderer'
      @group_name = 'Three'

      # Mouse position  over webgl renderer
      @mouseX: 0
      @mouseY: 0

      initialize: (options) =>
        super
        @auto_evaluate = true
        @preview_mode = true
        @creating_popup = false
        @ob = ThreeNodes.Webgl.current_renderer
        @width = 0
        @height = 0
        $("body").append("<div id='webgl-window'></div>")
        @webgl_container = $("#webgl-window")

        @win = false
        @apply_size()
        @old_bg = false
        @apply_bg_color()
        self = this

        @add_mouse_handler()
        @webgl_container.bind "click", (e) =>
          console.log "webgl.click"
          if @settings.player_mode == false
            @create_popup_view()

      getFields: =>
        camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
        camera.attributes.value.position.z = 1000
        base_fields = super
        fields =
          inputs:
            "width": 800
            "height": 600
            "scene": {type: "Scene", val: new THREE.Scene()}
            "camera": {type: "Camera", val: camera}
            "bg_color": {type: "Color", val: new THREE.Color(0, 0, 0)}
            "postfx": {type: "Array", val: []}
            "shadowCameraNear": 3
            "shadowCameraFar": 3000
            "shadowMapWidth": 512
            "shadowMapHeight": 512
            "shadowMapEnabled": false
            "shadowMapSoft": true

        return $.extend(true, base_fields, fields)

      remove: () =>
        if @win && @win != false
          @win.close()

        if ThreeNodes.Webgl.current_camera == @fields.getField("camera").getValue()
          ThreeNodes.Webgl.current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
          ThreeNodes.Webgl.renderModel.camera = ThreeNodes.Webgl.current_camera
        if ThreeNodes.Webgl.current_scene == @fields.getField("scene").getValue()
          ThreeNodes.Webgl.current_scene = new THREE.Scene()
          ThreeNodes.Webgl.renderModel.scene = ThreeNodes.Webgl.current_scene

        @webgl_container.unbind()
        $(@ob.domElement).unbind()
        @webgl_container.remove()
        delete @ob
        delete @width
        delete @height
        delete @webgl_container
        delete @win
        super

      add_mouse_handler: =>
        $(@ob.domElement).unbind "mousemove"
        $(@ob.domElement).bind "mousemove", (e) ->
          ThreeNodes.renderer.mouseX = e.clientX
          ThreeNodes.renderer.mouseY = e.clientY
        return this

      create_popup_view: ->
        @preview_mode = false
        @creating_popup = true

        w = @fields.getField('width').getValue()
        h = @fields.getField('height').getValue()

        @win = window.open('', 'win' + @nid, "width=#{w},height=#{h},scrollbars=false,location=false,status=false,menubar=false")
        $("body", $(@win.document)).append( @ob.domElement )
        $("*", $(@win.document)).css
          padding: 0
          margin: 0
        @apply_bg_color(true)
        @apply_size(true)
        @add_mouse_handler()
        return this

      create_preview_view: ->
        @preview_mode = true
        @webgl_container.append( @ob.domElement )
        @apply_bg_color(true)
        @apply_size(true)
        @add_mouse_handler()
        return this

      apply_bg_color: (force_refresh = false) ->
        new_val = @fields.getField('bg_color').getValue().getContextStyle()

        if @old_bg == new_val && force_refresh == false
          return false

        @ob.setClearColor( @fields.getField('bg_color').getValue(), 1 )
        @webgl_container.css
          background: new_val

        if @win
          $(@win.document.body).css
            background: new_val

        @old_bg = new_val

      apply_size: (force_refresh = false) =>
        w = @fields.getField('width').getValue()
        h = @fields.getField('height').getValue()
        dw = w
        dh = h
        if @win == false && @settings.player_mode == false
          maxw = 220
          r = w / h
          dw = maxw
          dh = dw / r
        if dw != @width || dh != @height || force_refresh
          @ob.setSize(dw, dh)
          if @win && @win != false
            console.log "..."
            # todo: implement the same with ".innerWidth =" and ".innerHeight =" when chrome support this
            # resize to beacame buggy on some chrome versions
            #@win.resizeTo(dw, dh + 52)
        @width = dw
        @height = dh

      apply_post_fx: =>
        # work on a copy of the incoming array
        fxs = @fields.getField("postfx").getValue().slice(0)
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
        if !ThreeNodes.Webgl.current_renderer
          return
        # help fix asynchronous bug with firefox when opening popup
        if @creating_popup == true && !@win
          return

        @creating_popup = false
        if @win != false
          if @win.closed && @preview_mode == false
            @preview_mode = true
            @win = false
        if !@settings.test
          @add_renderer_to_dom()

        @apply_size()
        @apply_bg_color()
        @applyFieldsToVal(@fields.inputs, @ob, ['width', 'height', 'scene', 'camera', 'bg_color', 'postfx'])
        ThreeNodes.Webgl.current_camera = @fields.getField("camera").getValue()
        ThreeNodes.Webgl.current_scene = @fields.getField("scene").getValue()

        #set the current aspect on the camera
        @fields.getField("camera").getValue().aspect = @width / @height
        @fields.getField("camera").getValue().updateProjectionMatrix()

        @apply_post_fx()
        @ob.clear()
        ThreeNodes.Webgl.renderModel.scene = ThreeNodes.Webgl.current_scene
        ThreeNodes.Webgl.renderModel.camera = ThreeNodes.Webgl.current_camera
        ThreeNodes.Webgl.composer.renderer = ThreeNodes.Webgl.current_renderer
        ThreeNodes.Webgl.composer.render(0.05)
