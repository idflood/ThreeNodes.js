define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.nodes.types.Conditional.IfElse extends ThreeNodes.NodeBase
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
        res = @rack.get("val1").get()
      else
        res = @rack.get("val2").get()
      @rack.set("out", res)
  
  class ThreeNodes.nodes.types.Conditional.And extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : false
          "val2" : false
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get() && @rack.get("val2").get()
      @rack.set("out", res)
  
  class ThreeNodes.nodes.types.Conditional.Or extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : false
          "val2" : false
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get() || @rack.get("val2").get()
      @rack.set("out", res)
  
  class ThreeNodes.nodes.types.Conditional.Equal extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : {type: "Any", val: 0.0}
          "val2" : {type: "Any", val: 1.0}
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get() == @rack.get("val2").get()
      @rack.set("out", res)
  
  class ThreeNodes.nodes.types.Conditional.Smaller extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : {type: "Float", val: 0.0}
          "val2" : {type: "Float", val: 1.0}
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get() < @rack.get("val2").get()
      @rack.set("out", res)
  
  class ThreeNodes.nodes.types.Conditional.Greater extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "val1" : {type: "Float", val: 0.0}
          "val2" : {type: "Float", val: 1.0}
        outputs:
          "out" : false
  
    compute: =>
      res = @rack.get("val1").get() > @rack.get("val2").get()
      @rack.set("out", res)
