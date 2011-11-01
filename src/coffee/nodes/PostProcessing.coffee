class nodes.types.PostProcessing.BloomPass extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.BloomPass(1.6)
    @rack.addFields
      inputs:
        "strength": 1
        "kernelSize": 25
        "sigma": 4.0
        "resolution": 256
      outputs:
        "out": {type: "Any", val: @ob}

  compute: =>
    @apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob
    
