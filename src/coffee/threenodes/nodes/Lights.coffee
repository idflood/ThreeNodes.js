define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  class ThreeNodes.nodes.types.Lights.PointLight extends ThreeNodes.NodeBase
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
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Lights.SpotLight extends ThreeNodes.NodeBase
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
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Lights.DirectionalLight extends ThreeNodes.NodeBase
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
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Lights.AmbientLight extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.AmbientLight(0xffffff)
      
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xffffff)}
          "intensity": 1
          "distance": 0
        outputs:
          "out": {type: "Any", val: @ob}
  
    compute: =>
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)