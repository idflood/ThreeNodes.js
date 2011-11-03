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
      
  value_has_changed: (vals) =>
    newvals = @get_cached_array vals
    if flatArraysAreEquals(newvals, @cached) == false
      @cached = newvals
      return true
    false
    
  compute: =>
    if @value_has_changed(['strength', 'kernelSize', 'sigma', 'resolution']) == true
      @ob = new THREE.BloomPass(@rack.get("strength").get(), @rack.get('kernelSize').get(), @rack.get('sigma').get(), @rack.get('resolution').get())
    #@apply_fields_to_val(@rack.node_fields.inputs, @ob)
    @rack.get("out", true).set @ob

class nodes.types.PostProcessing.DotScreenPass extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.DotScreenPass(new THREE.Vector2( 0.5, 0.5 ))
    @rack.addFields
      inputs:
        "center": {type: "Vector2", val: new THREE.Vector2( 0.5, 0.5 )}
        "angle": 1.57
        "scale": 1.0
      outputs:
        "out": {type: "Any", val: @ob}
    @cached = @get_cached_array ['center', 'angle', 'scale']
      
  value_has_changed: (vals) =>
    newvals = @get_cached_array vals
    if flatArraysAreEquals(newvals, @cached) == false
      @cached = newvals
      return true
    false
    
  compute: =>
    if @value_has_changed(['center', 'angle', 'scale']) == true
      @ob = new THREE.DotScreenPass(@rack.get("center").get(), @rack.get('angle').get(), @rack.get('scale').get())
    @rack.get("out", true).set @ob

class nodes.types.PostProcessing.FilmPass extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.FilmPass( 0.5, 0.125, 2048, false )
    @rack.addFields
      inputs:
        "noiseIntensity": 0.5
        "scanlinesIntensity": 0.125
        "scanlinesCount": 2048
        "grayscale": false
      outputs:
        "out": {type: "Any", val: @ob}
    @cached = @get_cached_array ['noiseIntensity', 'scanlinesIntensity', 'scanlinesCount', 'grayscale']
      
  value_has_changed: (vals) =>
    newvals = @get_cached_array vals
    if flatArraysAreEquals(newvals, @cached) == false
      @cached = newvals
      return true
    false
    
  compute: =>
    if @value_has_changed(['noiseIntensity', 'scanlinesIntensity', 'scanlinesCount', 'grayscale']) == true
      @ob = new THREE.FilmPass(@rack.get("noiseIntensity").get(), @rack.get('scanlinesIntensity').get(), @rack.get('scanlinesCount').get(), @rack.get('grayscale').get())
    @rack.get("out", true).set @ob
    
