_ = require 'Underscore'
Backbone = require 'Backbone'
Rc4Random = require 'threenodes/utils/Rc4Random'
Node = require 'threenodes/nodes/models/Node'

class RandomSpread extends Node
  @node_name = 'RandomSpread'
  @group_name = 'Spread'

  initialize: (options) =>
    super
    @auto_evaluate = false
    @rnd = false
    @value = false
    @seed = false
    @count = false
    @width = false
    @offset = false

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "count": 1
        "seed" : 1
        "width" : 1
        "offset": 0
      outputs:
        "out" : 0
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    @v_out = @fields.getField("out", true)

  remove: () =>
    delete @v_out
    super

  compute: =>
    needs_rebuild = false
    if @seed != @fields.getField("seed").get("value") || @count != parseInt(@fields.getField("count").getValue(0)) || @width != @fields.getField("width").get("value") || @offset != @fields.getField("offset").get("value")
      @seed = @fields.getField("seed").get("value")
      @rnd = new Rc4Random(@seed.toString())

      @value = []
      @width = @fields.getField("width").getValue(0)
      @offset = @fields.getField("offset").getValue(0)
      @count = parseInt(@fields.getField("count").get("value"))
      for i in [0..@count - 1]
        @value[i] = @rnd.getRandomNumber() * @width - @width / 2 + @offset
    @fields.setField("out", @value)

ThreeNodes.Core.addNodeType('RandomSpread', RandomSpread)

class LinearSpread extends Node
  @node_name = 'LinearSpread'
  @group_name = 'Spread'

  initialize: (options) =>
    super
    @auto_evaluate = false
    @value = false
    @count = false
    @width = false
    @phase = false
    @offset = false

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "count": 1
        "width" : 1
        "phase" : 0
        "offset": 0
      outputs:
        "out" : 0
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    @v_out = @fields.getField("out", true)

  remove: () =>
    delete @v_out
    super

  compute: =>
    needs_rebuild = false
    @width = @fields.getField("width").getValue(0)
    @offset = @fields.getField("offset").getValue(0)
    @phase = @fields.getField("phase").getValue(0)
    @count = parseInt(@fields.getField("count").getValue())
    @value = []

    stepSize = @width / @count
    shift = stepSize / 2
    for i in [0..@count - 1]
      res = ( i * stepSize + shift + @phase ) % @width
      res = @offset - @width / 2 + res
      @value[i] = res
    @fields.setField("out", @value)

ThreeNodes.Core.addNodeType('LinearSpread', LinearSpread)
