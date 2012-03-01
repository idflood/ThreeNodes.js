define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Node',
  'order!threenodes/utils/Utils',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.nodes.RandomSpread extends ThreeNodes.NodeBase
    @node_name = 'RandomSpread'
    @group_name = 'Spread'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @rnd = false
      @value = false
      @seed = false
      @count = false
      @width = false
      @offset = false
      @rack.addFields
        inputs:
          "count": 1
          "seed" : 1
          "width" : 1
          "offset": 0
        outputs:
          "out" : 0
      
      @v_out = @rack.getField("out", true)
  
    compute: =>
      needs_rebuild = false
      if @seed != @rack.getField("seed").get("value") || @count != parseInt(@rack.getField("count").getValue(0)) || @width != @rack.getField("width").get("value") || @offset != @rack.getField("offset").get("value")
        @seed = @rack.getField("seed").get("value")
        @rnd = new ThreeNodes.Utils.Rc4Random(@seed.toString())
        
        @value = []
        @width = @rack.getField("width").getValue(0)
        @offset = @rack.getField("offset").getValue(0)
        @count = parseInt(@rack.getField("count").get("value"))
        for i in [0..@count - 1]
          @value[i] = @rnd.getRandomNumber() * @width - @width / 2 + @offset
      @rack.setField("out", @value)
  
  class ThreeNodes.nodes.LinearSpread extends ThreeNodes.NodeBase
    @node_name = 'LinearSpread'
    @group_name = 'Spread'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @value = false
      @count = false
      @width = false
      @phase = false
      @offset = false
      @rack.addFields
        inputs:
          "count": 1
          "width" : 1
          "phase" : 0
          "offset": 0
        outputs:
          "out" : 0
      
      @v_out = @rack.getField("out", true)
  
    compute: =>
      needs_rebuild = false
      @width = @rack.getField("width").getValue(0)
      @offset = @rack.getField("offset").getValue(0)
      @phase = @rack.getField("phase").getValue(0)
      @count = parseInt(@rack.getField("count").getValue())
      @value = []
      
      stepSize = @width / @count
      shift = stepSize / 2
      for i in [0..@count - 1]
        res = ( i * stepSize + shift + @phase ) % @width
        res = @offset - @width / 2 + res
        @value[i] = res
      @rack.setField("out", @value)
      