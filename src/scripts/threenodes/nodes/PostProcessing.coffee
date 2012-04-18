define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/utils/Utils',
  'cs!threenodes/models/Node',
], (_, Backbone, Utils) ->
  #"use strict"
  
  $ = window.jQuery
  
  namespace "ThreeNodes.nodes"
    class BloomPass extends ThreeNodes.NodeBase
      @node_name = 'Bloom'
      @group_name = 'PostProcessing'
      
      setFields: =>
        super
        @ob = new THREE.BloomPass(1.6)
        @fields.addFields
          inputs:
            "strength": 1.6
            "kernelSize": 25
            "sigma": 4.0
            "resolution": 256
          outputs:
            "out": {type: "Any", val: @ob}
        @cached = @createCacheObject ['kernelSize', 'sigma', 'resolution']
      
      remove: () =>
        delete @ob
        delete @cached
        super
      
      value_has_changed: (vals) =>
        newvals = @createCacheObject vals
        if Utils.flatArraysAreEquals(newvals, @cached) == false
          @cached = newvals
          return true
        false
        
      compute: =>
        if @value_has_changed(['kernelSize', 'sigma', 'resolution']) == true
          @ob = new THREE.BloomPass(@fields.getField("strength").getValue(), @fields.getField('kernelSize').getValue(), @fields.getField('sigma').getValue(), @fields.getField('resolution').getValue())
        @ob.screenUniforms[ "opacity" ].value = @fields.getField("strength").getValue()
        @fields.setField("out", @ob)
    
    class DotScreenPass extends ThreeNodes.NodeBase
      @node_name = 'DotScreen'
      @group_name = 'PostProcessing'
      
      setFields: =>
        super
        @ob = new THREE.DotScreenPass(new THREE.Vector2( 0.5, 0.5 ))
        @fields.addFields
          inputs:
            "center": {type: "Vector2", val: new THREE.Vector2( 0.5, 0.5 )}
            "angle": 1.57
            "scale": 1.0
          outputs:
            "out": {type: "Any", val: @ob}
        @cached = @createCacheObject ['center', 'angle', 'scale']
      
      remove: () =>
        delete @ob
        delete @cached
        super
      
      value_has_changed: (vals) =>
        newvals = @createCacheObject vals
        if Utils.flatArraysAreEquals(newvals, @cached) == false
          @cached = newvals
          return true
        false
        
      compute: =>
        if @value_has_changed(['center', 'angle', 'scale']) == true
          @ob = new THREE.DotScreenPass(@fields.getField("center").getValue(), @fields.getField('angle').getValue(), @fields.getField('scale').getValue())
        @fields.setField("out", @ob)
    
    class FilmPass extends ThreeNodes.NodeBase
      @node_name = 'Film'
      @group_name = 'PostProcessing'
      
      setFields: =>
        super
        @ob = new THREE.FilmPass( 0.5, 0.125, 2048, false )
        @fields.addFields
          inputs:
            "noiseIntensity": 0.5
            "scanlinesIntensity": 0.125
            "scanlinesCount": 2048
            "grayscale": false
          outputs:
            "out": {type: "Any", val: @ob}
        @cached = @createCacheObject ['noiseIntensity', 'scanlinesIntensity', 'scanlinesCount', 'grayscale']
      
      remove: () =>
        delete @ob
        delete @cached
        super
      
      value_has_changed: (vals) =>
        newvals = @createCacheObject vals
        if Utils.flatArraysAreEquals(newvals, @cached) == false
          @cached = newvals
          return true
        false
        
      compute: =>
        @ob.uniforms.grayscale.value = @fields.getField("grayscale").getValue()
        @ob.uniforms.nIntensity.value = @fields.getField("noiseIntensity").getValue()
        @ob.uniforms.sIntensity.value = @fields.getField("scanlinesIntensity").getValue()
        @ob.uniforms.sCount.value = @fields.getField("scanlinesCount").getValue()
        @fields.setField("out", @ob)
    
    class VignettePass extends ThreeNodes.NodeBase
      @node_name = 'Vignette'
      @group_name = 'PostProcessing'
      
      setFields: =>
        super
        shader = THREE.ShaderExtras[ "vignette" ]
        @ob = new THREE.ShaderPass( shader )
        @fields.addFields
          inputs:
            "offset": 1.0
            "darkness": 1.0
          outputs:
            "out": {type: "Any", val: @ob}
      
      remove: () =>
        delete @ob
        super
      
      compute: =>
        @ob.uniforms[ "offset" ].value = @fields.getField("offset").getValue()
        @ob.uniforms[ "darkness" ].value = @fields.getField("darkness").getValue()
        @fields.setField("out", @ob)
    
    class HorizontalBlurPass extends ThreeNodes.NodeBase
      @node_name = 'HorizontalBlur'
      @group_name = 'PostProcessing'
      
      setFields: =>
        super
        shader = THREE.ShaderExtras[ "horizontalBlur" ]
        @ob = new THREE.ShaderPass( shader )
        @fields.addFields
          inputs:
            "delta": 1.0 / 512.0
          outputs:
            "out": {type: "Any", val: @ob}
      
      remove: () =>
        delete @ob
        super
      
      compute: =>
        @ob.uniforms[ "h" ].value = @fields.getField("delta").getValue()
        @fields.setField("out", @ob)
    
    class VerticalBlurPass extends ThreeNodes.NodeBase
      @node_name = 'VerticalBlur'
      @group_name = 'PostProcessing'
      
      setFields: =>
        super
        shader = THREE.ShaderExtras[ "verticalBlur" ]
        @ob = new THREE.ShaderPass( shader )
        @fields.addFields
          inputs:
            "delta": 1.0 / 512.0
          outputs:
            "out": {type: "Any", val: @ob}
      
      remove: () =>
        delete @ob
        super
      
      compute: =>
        @ob.uniforms[ "v" ].value = @fields.getField("delta").getValue()
        @fields.setField("out", @ob)
    
    class BleachPass extends ThreeNodes.NodeBase
      @node_name = 'Bleach'
      @group_name = 'PostProcessing'
      
      setFields: =>
        super
        shader = THREE.ShaderExtras[ "bleachbypass" ]
        @ob = new THREE.ShaderPass( shader )
        @fields.addFields
          inputs:
            "opacity": 0.95
          outputs:
            "out": {type: "Any", val: @ob}
      
      remove: () =>
        delete @ob
        super
      
      compute: =>
        @ob.uniforms[ "opacity" ].value = @fields.getField("opacity").getValue()
        @fields.setField("out", @ob)
