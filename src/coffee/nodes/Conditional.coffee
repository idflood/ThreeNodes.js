class nodes.types.Conditional.IfElse extends NodeBase
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
    @rack.get("out", true).set res

class nodes.types.Conditional.Equal extends NodeBase
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
    @rack.get("out", true).set res

class nodes.types.Conditional.Smaller extends NodeBase
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
    @rack.get("out", true).set res

class nodes.types.Conditional.Greater extends NodeBase
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
    @rack.get("out", true).set res
