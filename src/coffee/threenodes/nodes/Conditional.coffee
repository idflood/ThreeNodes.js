define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.nodes.IfElse extends ThreeNodes.NodeBase
    @node_name = 'IfElse'
    @group_name = 'Conditional'
    
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "condition" : false
          "val1" : {type: "Any", val: 0.0}
          "val2" : {type: "Any", val: 1.0}
        outputs:
          "out" : {type: "Any", val: false}
  
    compute: =>
      cond = @rack.get("condition").get()
      if cond == false
        res = @rack.get("val1").val
      else
        res = @rack.get("val2").val
      @rack.setField("out", res)
  
  class ThreeNodes.nodes.And extends ThreeNodes.NodeBase
    @node_name = 'And'
    @group_name = 'Conditional'
    
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : false
          "val2" : false
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get() != false && @rack.get("val2").get() != false
      @rack.setField("out", res)
  
  class ThreeNodes.nodes.Or extends ThreeNodes.NodeBase
    @node_name = 'Or'
    @group_name = 'Conditional'
    
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : false
          "val2" : false
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get() != false || @rack.get("val2").get() != false
      @rack.setField("out", res)
  
  class ThreeNodes.nodes.Equal extends ThreeNodes.NodeBase
    @node_name = 'Equal'
    @group_name = 'Conditional'
    
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : {type: "Any", val: 0.0}
          "val2" : {type: "Any", val: 1.0}
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get(0) == @rack.get("val2").get(0)
      @rack.setField("out", res)
  
  class ThreeNodes.nodes.Smaller extends ThreeNodes.NodeBase
    @node_name = 'Smaller'
    @group_name = 'Conditional'
    
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : {type: "Float", val: 0.0}
          "val2" : {type: "Float", val: 1.0}
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get(0) < @rack.get("val2").get(0)
      @rack.setField("out", res)
  
  class ThreeNodes.nodes.Greater extends ThreeNodes.NodeBase
    @node_name = 'Greater'
    @group_name = 'Conditional'
    
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : {type: "Float", val: 0.0}
          "val2" : {type: "Float", val: 1.0}
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get(0) > @rack.get("val2").get(0)
      @rack.setField("out", res)
