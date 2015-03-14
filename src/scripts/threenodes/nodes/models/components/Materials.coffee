_ = require 'Underscore'
Backbone = require 'Backbone'
Node = require 'threenodes/nodes/models/Node'
NodeMaterialBase = require 'threenodes/nodes/models/components/Three/NodeMaterialBase'


class MeshBasicMaterial extends NodeMaterialBase
  @node_name = 'MeshBasic'
  @group_name = 'Materials'

  initialize: (options) =>
    super
    @ob = []
    @material_class = THREE.MeshBasicMaterial
    @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
    @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "color": {type: "Color", val: new THREE.Color(0xff0000)}
        "map": {type: "Any", val: false}
        "reflectivity": 1
        "refractionRatio": 0.98
        "wireframe": false
        "wireframeLinecap": 1
        "vertexColors": false
        "skinning": false
        "fog": true
      outputs:
        "out": {type: "Any", val: @ob}
    return $.extend(true, base_fields, fields)

ThreeNodes.Core.addNodeType('MeshBasicMaterial', MeshBasicMaterial)

class LineBasicMaterial extends NodeMaterialBase
  @node_name = 'LineBasic'
  @group_name = 'Materials'

  initialize: (options) =>
    super
    @ob = []
    @material_class = THREE.LineBasicMaterial
    @vars_rebuild_shader_on_change = ["transparent", "depthTest"]
    @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "color": {type: "Color", val: new THREE.Color(0xff0000)}
        "linewidth": 1
      outputs:
        "out": {type: "Any", val: @ob}
    return $.extend(true, base_fields, fields)

ThreeNodes.Core.addNodeType('LineBasicMaterial', LineBasicMaterial)

class MeshLambertMaterial extends NodeMaterialBase
  @node_name = 'MeshLambert'
  @group_name = 'Materials'

  initialize: (options) =>
    super
    @ob = []
    @material_class = THREE.MeshLambertMaterial
    @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
    @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "color": {type: "Color", val: new THREE.Color(0xff0000)}
        "ambient": {type: "Color", val: new THREE.Color(0x050505)}
        "map": {type: "Any", val: false}
        "reflectivity": 1
        "refractionRatio": 0.98
        "wireframe": false
        "vertexColors": {type: "Any", val: false}
        "skinning": false
        "fog": true
      outputs:
        "out": {type: "Any", val: @ob}
    return $.extend(true, base_fields, fields)

ThreeNodes.Core.addNodeType('MeshLambertMaterial', MeshLambertMaterial)

class MeshPhongMaterial extends NodeMaterialBase
  @node_name = 'MeshPhong'
  @group_name = 'Materials'

  initialize: (options) =>
    super
    @ob = []
    @material_class = THREE.MeshPhongMaterial
    @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
    @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "color": {type: "Color", val: new THREE.Color(0xff0000)}
        "map": {type: "Any", val: false}
        "ambient": {type: "Color", val: new THREE.Color(0x050505)}
        "specular": {type: "Color", val: new THREE.Color(0x111111)}
        "shininess": 30
        "reflectivity": 1
        "refractionRatio": 0.98
        "wireframe": false
        "vertexColors": {type: "Any", val: false}
        "skinning": false
        "fog": true
      outputs:
        "out": {type: "Any", val: @ob}
    return $.extend(true, base_fields, fields)

ThreeNodes.Core.addNodeType('MeshPhongMaterial', MeshPhongMaterial)
