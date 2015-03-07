_ = require 'Underscore'
Backbone = require 'Backbone'
Utils = require 'threenodes/utils/Utils'
Node = require 'threenodes/nodes/models/Node'
namespace = require('libs/namespace').namespace

require 'ShaderVignette'
require 'HorizontalBlurShader'
require 'VerticalBlurShader'
require 'BleachBypassShader'
require 'DotScreenPass'
require 'BloomPass'
require 'FilmPass'

namespace "ThreeNodes.nodes.models",
  BloomPass: class BloomPass extends Node
    @node_name = 'Bloom'
    @group_name = 'PostProcessing'

    initialize: (options) =>
      super
      @ob = new THREE.BloomPass(1.6)
      @cached = @createCacheObject ['kernelSize', 'sigma', 'resolution']

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "strength": 1.6
          "kernelSize": 25
          "sigma": 4.0
          "resolution": 256
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

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
      @ob.copyUniforms[ "opacity" ].value = @fields.getField("strength").getValue()
      @fields.setField("out", @ob)

  DotScreenPass: class DotScreenPass extends Node
    @node_name = 'DotScreen'
    @group_name = 'PostProcessing'

    initialize: (options) =>
      super
      @ob = new THREE.DotScreenPass(new THREE.Vector2( 0.5, 0.5 ))
      @cached = @createCacheObject ['center', 'angle', 'scale']

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "center": {type: "Vector2", val: new THREE.Vector2( 0.5, 0.5 )}
          "angle": 1.57
          "scale": 1.0
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

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

  FilmPass: class FilmPass extends Node
    @node_name = 'Film'
    @group_name = 'PostProcessing'

    initialize: (options) =>
      super
      @ob = new THREE.FilmPass( 0.5, 0.125, 2048, false )
      @cached = @createCacheObject ['noiseIntensity', 'scanlinesIntensity', 'scanlinesCount', 'grayscale']

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "noiseIntensity": 0.5
          "scanlinesIntensity": 0.125
          "scanlinesCount": 2048
          "grayscale": false
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

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

  VignettePass: class VignettePass extends Node
    @node_name = 'Vignette'
    @group_name = 'PostProcessing'

    initialize: (options) =>
      super
      shader = THREE.VignetteShader
      @ob = new THREE.ShaderPass( shader )

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "offset": 1.0
          "darkness": 1.0
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.uniforms[ "offset" ].value = @fields.getField("offset").getValue()
      @ob.uniforms[ "darkness" ].value = @fields.getField("darkness").getValue()
      @fields.setField("out", @ob)

  HorizontalBlurPass: class HorizontalBlurPass extends Node
    @node_name = 'HorizontalBlur'
    @group_name = 'PostProcessing'

    initialize: (options) =>
      super
      shader = THREE.HorizontalBlurShader
      @ob = new THREE.ShaderPass( shader )

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "delta": 1.0 / 512.0
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.uniforms[ "h" ].value = @fields.getField("delta").getValue()
      @fields.setField("out", @ob)

  VerticalBlurPass: class VerticalBlurPass extends Node
    @node_name = 'VerticalBlur'
    @group_name = 'PostProcessing'

    initialize: (options) =>
      super
      shader = THREE.VerticalBlurShader
      @ob = new THREE.ShaderPass( shader )

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "delta": 1.0 / 512.0
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.uniforms[ "v" ].value = @fields.getField("delta").getValue()
      @fields.setField("out", @ob)

  BleachPass: class BleachPass extends Node
    @node_name = 'Bleach'
    @group_name = 'PostProcessing'

    initialize: (options) =>
      super
      shader = THREE.BleachBypassShader
      @ob = new THREE.ShaderPass( shader )

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "opacity": 0.95
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.uniforms[ "opacity" ].value = @fields.getField("opacity").getValue()
      @fields.setField("out", @ob)
