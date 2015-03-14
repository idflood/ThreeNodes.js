jQuery = require 'jquery'
_ = require 'Underscore'
Backbone = require 'Backbone'
Node = require 'threenodes/nodes/models/Node'
require 'ColladaLoader'
Object3D = require 'threenodes/nodes/models/components/Three/Object3D'
WebglBase = require 'threenodes/utils/WebglBase'

class Scene extends Object3D
  @node_name = 'Scene'
  @group_name = 'Three'

  initialize: (options) =>
    super
    @ob = new THREE.Scene()

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "fog": {type: 'Any', val: null}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    @v_fog = @fields.getField("fog")

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
    @applyFieldsToVal(@fields.inputs, @ob, ['children', 'lights', 'rotation'])
    @apply_children()
    rotation = @fields.getField('rotation').getValue()
    @applyRotation(@ob, rotation)
    @fields.setField("out", @ob)

ThreeNodes.Core.addNodeType('Scene', Scene)

class Object3DwithMeshAndMaterial extends Object3D
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

class ColladaLoader extends Object3D
  @node_name = 'ColladaLoader'
  @group_name = 'Three'

  initialize: (options) =>
    super
    @ob = [new THREE.Object3D()]
    @file_url = ""
    @vars_shadow_options = ["castShadow", "receiveShadow"]
    @shadow_cache = []
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
      @applyFieldsToVal(@fields.inputs, @ob[i], ['children', 'file_url', 'castShadow', 'receiveShadow', 'rotation'], i)
      rotation = @fields.getField('rotation').getValue(i)
      @applyRotation(@ob[i], rotation)
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

ThreeNodes.Core.addNodeType('ColladaLoader', ColladaLoader)

class ThreeMesh extends Object3DwithMeshAndMaterial
  @node_name = 'Mesh'
  @group_name = 'Three'

  initialize: (options) =>
    super
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
      @applyFieldsToVal(@fields.inputs, @ob[i], ['children', 'geometry', 'material', 'rotation'], i)
      rotation = @fields.getField('rotation').getValue(i)
      @applyRotation(@ob[i], rotation)

    if needs_rebuild == true
      @trigger("RebuildAllShaders")

    @shadow_cache = @createCacheObject(@vars_shadow_options)
    @geometry_cache = @get_geometry_cache()
    @material_cache = @get_material_cache()
    @fields.setField("out", @ob)

ThreeNodes.Core.addNodeType('ThreeMesh', ThreeMesh)

class ThreeLine extends Object3DwithMeshAndMaterial
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
      @applyFieldsToVal(@fields.inputs, @ob[i], ['children', 'geometry', 'material', 'rotation'], i)
      rotation = @fields.getField('rotation').getValue(i)
      @applyRotation(@ob[i], rotation)

    if needs_rebuild == true
      @trigger("RebuildAllShaders")

    @shadow_cache = @createCacheObject(@vars_shadow_options)
    @geometry_cache = @get_geometry_cache()
    @material_cache = @get_material_cache()
    @fields.setField("out", @ob)

ThreeNodes.Core.addNodeType('ThreeLine', ThreeLine)

class Camera extends Node
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

ThreeNodes.Core.addNodeType('Camera', Camera)

class Texture extends Node
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

ThreeNodes.Core.addNodeType('Texture', Texture)

class Fog extends Node
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

ThreeNodes.Core.addNodeType('Fog', Fog)

class FogExp2 extends Node
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

ThreeNodes.Core.addNodeType('FogExp2', FogExp2)

class WebGLRenderer extends Node
  @node_name = 'WebGLRenderer'
  @group_name = 'Three'

  initialize: (options) =>
    super
    if !WebglBase.instance
      @webgl = new WebglBase()
    else
      @webgl = WebglBase.instance
    @auto_evaluate = true
    @ob = WebglBase.current_renderer

    @width = 0
    @height = 0

  getFields: =>
    camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
    camera.position.z = 1000
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
    if WebglBase.current_camera == @fields.getField("camera").getValue()
      WebglBase.current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
      WebglBase.renderModel.camera = WebglBase.current_camera
    if WebglBase.current_scene == @fields.getField("scene").getValue()
      WebglBase.current_scene = new THREE.Scene()
      WebglBase.renderModel.scene = WebglBase.current_scene

    $(@ob.domElement).unbind()
    delete @ob
    delete @width
    delete @height
    super

  apply_post_fx: =>
    # work on a copy of the incoming array
    fxs = @fields.getField("postfx").getValue().slice(0)
    # 1st pass = rendermodel, last pass = screen
    fxs.unshift WebglBase.renderModel
    fxs.push WebglBase.effectScreen
    WebglBase.composer.passes = fxs

  compute: =>
    if !WebglBase.current_renderer
      return

    @trigger("on_compute")

    @applyFieldsToVal(@fields.inputs, @ob, ['width', 'height', 'scene', 'camera', 'bg_color', 'postfx'])
    WebglBase.current_camera = @fields.getField("camera").getValue()
    WebglBase.current_scene = @fields.getField("scene").getValue()

    #set the current aspect on the camera
    @fields.getField("camera").getValue().aspect = @width / @height
    @fields.getField("camera").getValue().updateProjectionMatrix()

    @apply_post_fx()
    @ob.clear()
    WebglBase.renderModel.scene = WebglBase.current_scene
    WebglBase.renderModel.camera = WebglBase.current_camera
    WebglBase.composer.renderer = WebglBase.current_renderer
    WebglBase.composer.render(0.05)

ThreeNodes.Core.addNodeType('WebGLRenderer', WebGLRenderer)
