jQuery = require 'jquery'
_ = require 'Underscore'
Backbone = require 'Backbone'
Node = require 'threenodes/nodes/models/Node'

class IfElse extends Node
  @node_name = 'IfElse'
  @group_name = 'Conditional'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "condition" : false
        "val1" : {type: "Any", val: 0.0}
        "val2" : {type: "Any", val: 1.0}
      outputs:
        "out" : {type: "Any", val: false}
    return $.extend(true, base_fields, fields)

  compute: =>
    cond = @fields.getField("condition").getValue()
    if cond == false
      res = @fields.getField("val1").attributes.value
    else
      res = @fields.getField("val2").attributes.value
    @fields.setField("out", res)

ThreeNodes.Core.addNodeType('IfElse', IfElse)

class And extends Node
  @node_name = 'And'
  @group_name = 'Conditional'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "val1" : false
        "val2" : false
      outputs:
        "out" : false
    return $.extend(true, base_fields, fields)

  compute: =>
    res = @fields.getField("val1").getValue() != false && @fields.getField("val2").getValue() != false
    @fields.setField("out", res)

ThreeNodes.Core.addNodeType('And', And)

class Or extends Node
  @node_name = 'Or'
  @group_name = 'Conditional'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "val1" : false
        "val2" : false
      outputs:
        "out" : false
    return $.extend(true, base_fields, fields)

  compute: =>
    res = @fields.getField("val1").getValue() != false || @fields.getField("val2").getValue() != false
    @fields.setField("out", res)

ThreeNodes.Core.addNodeType('Or', Or)

class Equal extends Node
  @node_name = 'Equal'
  @group_name = 'Conditional'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "val1" : {type: "Any", val: 0.0}
        "val2" : {type: "Any", val: 1.0}
      outputs:
        "out" : false
    return $.extend(true, base_fields, fields)

  compute: =>
    res = @fields.getField("val1").getValue(0) == @fields.getField("val2").getValue(0)
    @fields.setField("out", res)

ThreeNodes.Core.addNodeType('Equal', Equal)

class Smaller extends Node
  @node_name = 'Smaller'
  @group_name = 'Conditional'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "val1" : {type: "Float", val: 0.0}
        "val2" : {type: "Float", val: 1.0}
      outputs:
        "out" : false
    return $.extend(true, base_fields, fields)

  compute: =>
    res = @fields.getField("val1").getValue(0) < @fields.getField("val2").getValue(0)
    @fields.setField("out", res)

ThreeNodes.Core.addNodeType('Smaller', Smaller)

class Greater extends Node
  @node_name = 'Greater'
  @group_name = 'Conditional'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "val1" : {type: "Float", val: 0.0}
        "val2" : {type: "Float", val: 1.0}
      outputs:
        "out" : false
    return $.extend(true, base_fields, fields)

  compute: =>
    res = @fields.getField("val1").getValue(0) > @fields.getField("val2").getValue(0)
    @fields.setField("out", res)

ThreeNodes.Core.addNodeType('Greater', Greater)
