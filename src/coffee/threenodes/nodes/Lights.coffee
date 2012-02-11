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
  class ThreeNodes.nodes.PointLight extends ThreeNodes.NodeBase
    @node_name = 'PointLight'
    @group_name = 'Lights'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.PointLight(0xffffff)
      
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
          "intensity": 1
          "distance": 0
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      @apply_fields_to_val(@rack.collection.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.SpotLight extends ThreeNodes.NodeBase
    @node_name = 'SpotLight'
    @group_name = 'Lights'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.SpotLight(0xffffff)
      
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
          "target": {type: "Any", val: new THREE.Object3D()}
          "intensity": 1
          "distance": 0
          "castShadow": false
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      if @rack.get("castShadow").get() != @ob.castShadow
        ThreeNodes.rebuild_all_shaders()
      @apply_fields_to_val(@rack.collection.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.DirectionalLight extends ThreeNodes.NodeBase
    @node_name = 'DirectionalLight'
    @group_name = 'Lights'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.DirectionalLight(0xffffff)
      
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
          "intensity": 1
          "distance": 0
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      @apply_fields_to_val(@rack.collection.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.AmbientLight extends ThreeNodes.NodeBase
    @node_name = 'AmbientLight'
    @group_name = 'Lights'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.AmbientLight(0xffffff)
      
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "position": {type: "Vector3", val: new THREE.Vector3(0, 300, 0)}
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      @apply_fields_to_val(@rack.collection.node_fields.inputs, @ob)
      @rack.set("out", @ob)
