class nodes.types.PostProcessing.BloomPass extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.BloomPass(1.6)
    @rack.addFields
      inputs:
        "strength": 1.6
        "kernelSize": 25
        "sigma": 4.0
        "resolution": 256
      outputs:
        "out": {type: "Any", val: @ob}
    @cached = @get_cached_array ['strength', 'kernelSize', 'sigma', 'resolution']
    
  get_cached_array: (vals) =>
    res = []
    for v in vals
      res[res.lengt] = @rack.get(v).get()
      
  value_has_changed: (vals) =>
    newvals = @get_cached_array ['strength', 'kernelSize', 'sigma', 'resolution']
    if flatArraysAreEquals(newvals, @cached) == false
      @cached = newvals
      return true
    false
    
  compute: =>
    if @value_has_changed(['strength', 'kernelSize', 'sigma', 'resolution']) == true
      @ob = new THREE.BloomPass(@rack.get("strength").get(), @rack.get('kernelSize').get(), @rack.get('sigma').get(), @rack.get('resolution').get())
    #@apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob
    
