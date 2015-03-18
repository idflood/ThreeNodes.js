Node = require 'threenodes/nodes/models/Node'

class NodeMaterialBase extends Node
  initialize: (options) =>
    super
    @ob = false
    @auto_evaluate = false
    @material_class = false
    @last_slice_count = -1
    @is_material = true

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "opacity": 1
        "transparent": false
        "side":
          type: "Float"
          val: THREE.FrontSide
          values:
            "Front": THREE.FrontSide
            "Back": THREE.BackSide
            "Both": THREE.DoubleSide
        "depthTest": true
        "alphaTest": 0
        "polygonOffset": false
        "polygonOffsetFactor": 0
        "polygonOffsetUnits": 0
        "blending":
          type: "Float"
          val: THREE.NormalBlending
          values:
            "Normal": THREE.NormalBlending
            "Additive": THREE.AdditiveBlending
            "Subtractive": THREE.SubtractiveBlending
            "Multiply": THREE.MultiplyBlending
            "AdditiveAlpha": THREE.AdditiveAlphaBlending
    return $.extend(true, base_fields, fields)

  rebuildShader: () =>
    if !@ob
      return @
    if $.type(@ob) == "array"
      for sub_material in @ob
        console.log "rebuilding submaterial"
        sub_material.needsUpdate = true
    else
      @ob.needsUpdate = true
    @

  remove: () =>
    delete @ob
    delete @material_cache
    delete @material_class
    super

  compute: =>
    needs_rebuild = false
    numItems = @fields.getMaxInputSliceCount()
    if @inputValueHasChanged(@vars_rebuild_shader_on_change) || @last_slice_count != numItems
      needs_rebuild = true

    if needs_rebuild == true
      @ob = []
      for i in [0..numItems]
        @ob[i] = new @material_class()
    for i in [0..numItems]
      @applyFieldsToVal(@fields.inputs, @ob[i], [], i)
    @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)

    @last_slice_count = numItems
    @fields.setField("out", @ob)

module.exports = NodeMaterialBase
