define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Node',
  'order!threenodes/utils/Utils',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.nodes.BloomPass extends ThreeNodes.NodeBase
    @node_name = 'Bloom'
    @group_name = 'PostProcessing'
    
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
      @cached = @get_cached_array ['kernelSize', 'sigma', 'resolution']
    
    remove: () =>
      delete @ob
      delete @cached
      super
    
    value_has_changed: (vals) =>
      newvals = @get_cached_array vals
      if ThreeNodes.Utils.flatArraysAreEquals(newvals, @cached) == false
        @cached = newvals
        return true
      false
      
    compute: =>
      if @value_has_changed(['kernelSize', 'sigma', 'resolution']) == true
        @ob = new THREE.BloomPass(@rack.getField("strength").getValue(), @rack.getField('kernelSize').getValue(), @rack.getField('sigma').getValue(), @rack.getField('resolution').getValue())
      @ob.screenUniforms[ "opacity" ].value = @rack.getField("strength").getValue()
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.DotScreenPass extends ThreeNodes.NodeBase
    @node_name = 'DotScreen'
    @group_name = 'PostProcessing'
    
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
    
    remove: () =>
      delete @ob
      delete @cached
      super
    
    value_has_changed: (vals) =>
      newvals = @get_cached_array vals
      if ThreeNodes.Utils.flatArraysAreEquals(newvals, @cached) == false
        @cached = newvals
        return true
      false
      
    compute: =>
      if @value_has_changed(['center', 'angle', 'scale']) == true
        @ob = new THREE.DotScreenPass(@rack.getField("center").getValue(), @rack.getField('angle').getValue(), @rack.getField('scale').getValue())
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.FilmPass extends ThreeNodes.NodeBase
    @node_name = 'Film'
    @group_name = 'PostProcessing'
    
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
    
    remove: () =>
      delete @ob
      delete @cached
      super
    
    value_has_changed: (vals) =>
      newvals = @get_cached_array vals
      if ThreeNodes.Utils.flatArraysAreEquals(newvals, @cached) == false
        @cached = newvals
        return true
      false
      
    compute: =>
      @ob.uniforms.grayscale.value = @rack.getField("grayscale").getValue()
      @ob.uniforms.nIntensity.value = @rack.getField("noiseIntensity").getValue()
      @ob.uniforms.sIntensity.value = @rack.getField("scanlinesIntensity").getValue()
      @ob.uniforms.sCount.value = @rack.getField("scanlinesCount").getValue()
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.VignettePass extends ThreeNodes.NodeBase
    @node_name = 'Vignette'
    @group_name = 'PostProcessing'
    
    set_fields: =>
      super
      shader = THREE.ShaderExtras[ "vignette" ]
      @ob = new THREE.ShaderPass( shader )
      @rack.addFields
        inputs:
          "offset": 1.0
          "darkness": 1.0
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.uniforms[ "offset" ].value = @rack.getField("offset").getValue()
      @ob.uniforms[ "darkness" ].value = @rack.getField("darkness").getValue()
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.HorizontalBlurPass extends ThreeNodes.NodeBase
    @node_name = 'HorizontalBlur'
    @group_name = 'PostProcessing'
    
    set_fields: =>
      super
      shader = THREE.ShaderExtras[ "horizontalBlur" ]
      @ob = new THREE.ShaderPass( shader )
      @rack.addFields
        inputs:
          "delta": 1.0 / 512.0
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.uniforms[ "h" ].value = @rack.getField("delta").getValue()
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.VerticalBlurPass extends ThreeNodes.NodeBase
    @node_name = 'VerticalBlur'
    @group_name = 'PostProcessing'
    
    set_fields: =>
      super
      shader = THREE.ShaderExtras[ "verticalBlur" ]
      @ob = new THREE.ShaderPass( shader )
      @rack.addFields
        inputs:
          "delta": 1.0 / 512.0
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.uniforms[ "v" ].value = @rack.getField("delta").getValue()
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.BleachPass extends ThreeNodes.NodeBase
    @node_name = 'Bleach'
    @group_name = 'PostProcessing'
    
    set_fields: =>
      super
      shader = THREE.ShaderExtras[ "bleachbypass" ]
      @ob = new THREE.ShaderPass( shader )
      @rack.addFields
        inputs:
          "opacity": 0.95
        outputs:
          "out": {type: "Any", val: @ob}
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.uniforms[ "opacity" ].value = @rack.getField("opacity").getValue()
      @rack.setField("out", @ob)
