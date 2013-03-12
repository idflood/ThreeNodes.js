define [
  'Underscore',
  'Backbone',
  'cs!threenodes/models/Node',
  'cs!threenodes/utils/Utils',
], (_, Backbone) ->
  #"use strict"

  namespace "ThreeNodes.nodes.models",
    PointLight: class PointLight extends ThreeNodes.NodeBase
      @node_name = 'PointLight'
      @group_name = 'Lights'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.PointLight(0xffffff)

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "color": {type: "Color", val: new THREE.Color(0xffffff)}
            "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
            "intensity": 1
            "distance": 0
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        super

      compute: =>
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    SpotLight: class SpotLight extends ThreeNodes.NodeBase
      @node_name = 'SpotLight'
      @group_name = 'Lights'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.SpotLight(0xffffff)

      getFields: =>
        base_fields = super
        fields =
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
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        super

      compute: =>
        if @fields.getField("castShadow").getValue() != @ob.castShadow
          @trigger("RebuildAllShaders")
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    DirectionalLight: class DirectionalLight extends ThreeNodes.NodeBase
      @node_name = 'DirectionalLight'
      @group_name = 'Lights'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.DirectionalLight(0xffffff)

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "color": {type: "Color", val: new THREE.Color(0xffffff)}
            "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
            "intensity": 1
            "distance": 0
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        super

      compute: =>
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    AmbientLight: class AmbientLight extends ThreeNodes.NodeBase
      @node_name = 'AmbientLight'
      @group_name = 'Lights'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.AmbientLight(0xffffff)

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "color": {type: "Color", val: new THREE.Color(0xffffff)}
            "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        super

      compute: =>
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)
