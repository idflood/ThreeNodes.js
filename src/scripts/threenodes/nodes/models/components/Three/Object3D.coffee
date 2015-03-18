Node = require 'threenodes/nodes/models/Node'

class Object3D extends Node
  @node_name = 'Object3D'
  @group_name = 'Three'

  initialize: (options) =>
    super
    @auto_evaluate = false
    @ob = new THREE.Object3D()
    @vars_shadow_options = ["castShadow", "receiveShadow"]
    @shadow_cache = @createCacheObject(@vars_shadow_options)
    @vars_shadow_options = ["castShadow", "receiveShadow"]

  getFields: =>
    # We don't want to have the basic input / output
    # so don't call super neither extend fields with base_fields
    fields =
      inputs:
        "children": {type: "Object3D", val: [], default: []}
        "position": {type: "Vector3", val: new THREE.Vector3()}
        "rotation": {type: "Any", val: new THREE.Euler()}
        "scale": {type: "Vector3", val: new THREE.Vector3(1, 1, 1)}
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
    if !@fields.getField("children") then return false

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

  applyRotation: (target, rotation) =>
    if rotation instanceof THREE.Euler
      target.setRotationFromEuler(rotation)
    else if rotation instanceof THREE.Quaternion
      target.quaternion = rotation
    else if rotation instanceof THREE.Vector3
      target.rotation.set(rotation.x, rotation.y, rotation.z, "XYZ")

  compute: =>
    @applyFieldsToVal(@fields.inputs, @ob, ['children', 'rotation'])
    rotation = @fields.getField('rotation').getValue()
    @applyRotation(@ob, rotation)
    @apply_children()
    @fields.setField("out", @ob)

ThreeNodes.Core.addNodeType('Object3D', Object3D)

module.exports = Object3D
