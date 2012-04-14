define [
  'use!Underscore', 
  'use!Backbone',
  'order!threenodes/models/Node',
  'order!threenodes/utils/Utils',
], (_, Backbone) ->
  "use strict"
  
  $ = jQuery
  
  class ThreeNodes.NodeMaterialBase extends ThreeNodes.NodeBase
    setFields: =>
      super
      @ob = false
      @auto_evaluate = true
      @material_class = false
      @last_slice_count = -1
      @is_material = true
      @fields.addFields
        inputs:
          "opacity": 1
          "transparent": false
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
    
    rebuildShader: () =>
      if !@ob
        return @
      if $.type(@ob) == "array"
        for sub_material in @ob
          console.log "rebuilding submaterial"
          sub_material.program = false
      else
        @ob.program = false
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
  
  class ThreeNodes.nodes.MeshBasicMaterial extends ThreeNodes.NodeMaterialBase
    @node_name = 'MeshBasic'
    @group_name = 'Materials'
    
    setFields: =>
      super
      @ob = []
      @material_class = THREE.MeshBasicMaterial
      @fields.addFields
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
      @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
      @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)
  
  class ThreeNodes.nodes.LineBasicMaterial extends ThreeNodes.NodeMaterialBase
    @node_name = 'LineBasic'
    @group_name = 'Materials'
    
    setFields: =>
      super
      @ob = []
      @material_class = THREE.LineBasicMaterial
      @fields.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xff0000)}
          "linewidth": 1
        outputs:
          "out": {type: "Any", val: @ob}
      @vars_rebuild_shader_on_change = ["transparent", "depthTest"]
      @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)
  
  class ThreeNodes.nodes.MeshLambertMaterial extends ThreeNodes.NodeMaterialBase
    @node_name = 'MeshLambert'
    @group_name = 'Materials'
    
    setFields: =>
      super
      @ob = []
      @material_class = THREE.MeshLambertMaterial
      @fields.addFields
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
      @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
      @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)
  
  class ThreeNodes.nodes.MeshPhongMaterial extends ThreeNodes.NodeMaterialBase
    @node_name = 'MeshPhong'
    @group_name = 'Materials'
    
    setFields: =>
      super
      @ob = []
      @material_class = THREE.MeshPhongMaterial
      @fields.addFields
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
      @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
      @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)
