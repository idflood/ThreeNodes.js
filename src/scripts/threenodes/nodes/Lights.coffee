root = if typeof window != "undefined" && window != null then window else exports

define [
  'jQuery',
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/models/Node',
  'cs!threenodes/utils/Utils',
], (jQuery, _, Backbone) ->
  #"use strict"
  
  $ = jQuery
  
  class root.ThreeNodes.nodes.PointLight extends root.ThreeNodes.NodeBase
    @node_name = 'PointLight'
    @group_name = 'Lights'
    
    setFields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.PointLight(0xffffff)
      
      @fields.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
          "intensity": 1
          "distance": 0
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: =>
      delete @ob
      super
    
    compute: =>
      @applyFieldsToVal(@fields.inputs, @ob)
      @fields.setField("out", @ob)
  
  class root.ThreeNodes.nodes.SpotLight extends root.ThreeNodes.NodeBase
    @node_name = 'SpotLight'
    @group_name = 'Lights'
    
    setFields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.SpotLight(0xffffff)
      
      @fields.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
          "target": {type: "Any", val: new THREE.Object3D()}
          "intensity": 1
          "distance": 0
          "castShadow": false
          "shadowCameraNear": 50
          "shadowCameraFar": 5000
          "shadowCameraFov": 50
          "shadowBias": 0
          "shadowDarkness": 0.5
          "shadowMapWidth": 512
          "shadowMapHeight": 512
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: =>
      delete @ob
      super
    
    compute: =>
      if @fields.getField("castShadow").getValue() != @ob.castShadow
        @trigger("RebuildAllShaders")
      @applyFieldsToVal(@fields.inputs, @ob)
      @fields.setField("out", @ob)
  
  class root.ThreeNodes.nodes.DirectionalLight extends root.ThreeNodes.NodeBase
    @node_name = 'DirectionalLight'
    @group_name = 'Lights'
    
    setFields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.DirectionalLight(0xffffff)
      
      @fields.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
          "intensity": 1
          "distance": 0
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: =>
      delete @ob
      super
    
    compute: =>
      @applyFieldsToVal(@fields.inputs, @ob)
      @fields.setField("out", @ob)
  
  class root.ThreeNodes.nodes.AmbientLight extends root.ThreeNodes.NodeBase
    @node_name = 'AmbientLight'
    @group_name = 'Lights'
    
    setFields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.AmbientLight(0xffffff)
      
      @fields.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: =>
      delete @ob
      super
    
    compute: =>
      @applyFieldsToVal(@fields.inputs, @ob)
      @fields.setField("out", @ob)
