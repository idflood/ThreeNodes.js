class nodes.types.Lights.PointLight extends NodeBase
  set_fields: =>
    super
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
    @rack.get("out", true).set @ob

class nodes.types.Lights.SpotLight extends NodeBase
  set_fields: =>
    super
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
      rebuild_all_shaders()
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob

class nodes.types.Lights.DirectionalLight extends NodeBase
  set_fields: =>
    super
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
    @rack.get("out", true).set @ob

class nodes.types.Lights.AmbientLight extends NodeBase
  set_fields: =>
    super
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
    @rack.get("out", true).set @ob