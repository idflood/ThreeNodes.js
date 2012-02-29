define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/core/NodeFieldRack',
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
      
      @v_out = @rack.get("out", true)
  
    compute: =>
      needs_rebuild = false
      if @seed != @rack.get("seed").val || @count != parseInt(@rack.get("count").get(0)) || @width != @rack.get("width").val || @offset != @rack.get("offset").val
        @seed = @rack.get("seed").val
        @rnd = new ThreeNodes.Utils.Rc4Random(@seed.toString())
        
        @value = []
        @width = @rack.get("width").get(0)
        @offset = @rack.get("offset").get(0)
        @count = parseInt(@rack.get("count").val)
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
      
      @v_out = @rack.get("out", true)
  
    compute: =>
      needs_rebuild = false
      @width = @rack.get("width").get(0)
      @offset = @rack.get("offset").get(0)
      @phase = @rack.get("phase").get(0)
      @count = parseInt(@rack.get("count").val)
      @value = []
      
      stepSize = @width / @count
      shift = stepSize / 2
      for i in [0..@count - 1]
        res = ( i * stepSize + shift + @phase ) % @width
        res = @offset - @width / 2 + res
        @value[i] = res
      @rack.setField("out", @value)
      