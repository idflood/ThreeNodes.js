_ = require 'Underscore'
Backbone = require 'Backbone'
Node = require 'threenodes/nodes/models/Node'
NodeNumberSimple = require 'threenodes/nodes/models/NodeNumberSimple'

class MathSin extends NodeNumberSimple
  @node_name = 'Sin'
  @group_name = 'Math'

  process_val: (num, i) =>
    Math.sin(num)

ThreeNodes.Core.addNodeType('MathSin', MathSin)

class MathCos extends NodeNumberSimple
  @node_name = 'Cos'
  @group_name = 'Math'

  process_val: (num, i) =>
    Math.cos(num)

ThreeNodes.Core.addNodeType('MathCos', MathCos)

class MathTan extends NodeNumberSimple
  @node_name = 'Tan'
  @group_name = 'Math'

  process_val: (num, i) =>
    Math.tan(num)

ThreeNodes.Core.addNodeType('MathTan', MathTan)

class MathRound extends NodeNumberSimple
  @node_name = 'Round'
  @group_name = 'Math'

  process_val: (num, i) =>
    Math.round(num)

ThreeNodes.Core.addNodeType('MathRound', MathRound)

class MathCeil extends NodeNumberSimple
  @node_name = 'Ceil'
  @group_name = 'Math'

  process_val: (num, i) =>
    Math.ceil(num)

ThreeNodes.Core.addNodeType('MathCeil', MathCeil)

class MathFloor extends NodeNumberSimple
  @node_name = 'Floor'
  @group_name = 'Math'

  process_val: (num, i) =>
    Math.floor(num)

ThreeNodes.Core.addNodeType('MathFloor', MathFloor)

class NodeNumberParam1 extends NodeNumberSimple
  process_val: (num, numb, i) =>
    num + numb

  apply_num_to_vec2: (a, b, i) =>
    switch $.type(a)
      when "number" then new THREE.Vector2(@process_val(a, b.x, i), @process_val(a, b.y, i))
      when "object" then new THREE.Vector2(@process_val(a.x, b, i), @process_val(a.y, b, i))

  apply_num_to_vec3: (a, b, i) =>
    switch $.type(a)
      when "number" then new THREE.Vector3(@process_val(a, b.x, i), @process_val(a, b.y, i), @process_val(a, b.z, i))
      when "object" then new THREE.Vector3(@process_val(a.x, b, i), @process_val(a.y, b, i), @process_val(a.z, b, i))

  remove: () =>
    delete @v_factor
    super

  compute: =>
    res = []
    numItems = @fields.getMaxInputSliceCount()
    for i in [0..numItems]
      ref = @v_in.getValue(i)
      refb = @v_factor.getValue(i)
      switch $.type(ref)
        when "number"
          switch $.type(refb)
            when "number" then res[i] = @process_val(ref, refb, i)
            when "object"
              switch refb.constructor
                when THREE.Vector2 then res[i] = @apply_num_to_vec2(ref, refb, i)
                when THREE.Vector3 then res[i] = @apply_num_to_vec3(ref, refb, i)
        when "object"
          switch ref.constructor
            when THREE.Vector2
              switch $.type(refb)
                when "number" then res[i] = @apply_num_to_vec2(ref, refb, i)
                when "object" then res[i] = new THREE.Vector2(@process_val(ref.x, refb.x, i), @process_val(ref.y, refb.y, i))
            when THREE.Vector3
              switch $.type(refb)
                when "number" then res[i] = @apply_num_to_vec3(ref, refb, i)
                when "object" then res[i] = new THREE.Vector3(@process_val(ref.x, refb.x, i), @process_val(ref.y, refb.y, i), @process_val(ref.z, refb.z, i))

    @v_out.setValue res
    true

class MathMod extends NodeNumberParam1
  @node_name = 'Mod'
  @group_name = 'Math'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "y": {type: "Float", val: 2}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @v_factor = @fields.getField("y")

  process_val: (num, numb, i) =>
    num % numb

ThreeNodes.Core.addNodeType('MathMod', MathMod)

class MathAdd extends NodeNumberParam1
  @node_name = 'Add'
  @group_name = 'Math'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "y": {type: "Float", val: 1}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @v_factor = @fields.getField("y")

  process_val: (num, numb, i) =>
    num + numb

ThreeNodes.Core.addNodeType('MathAdd', MathAdd)

class MathSubtract extends NodeNumberParam1
  @node_name = 'Subtract'
  @group_name = 'Math'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "y": {type: "Float", val: 1}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @v_factor = @fields.getField("y")

  process_val: (num, numb, i) =>
    num - numb

ThreeNodes.Core.addNodeType('MathSubtract', MathSubtract)

class MathMult extends NodeNumberParam1
  @node_name = 'Mult'
  @group_name = 'Math'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "factor": {type: "Float", val: 2}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @v_factor = @fields.getField("factor")

  process_val: (num, numb, i) =>
    num * numb

ThreeNodes.Core.addNodeType('MathMult', MathMult)

class MathDivide extends NodeNumberParam1
  @node_name = 'Divide'
  @group_name = 'Math'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "y": {type: "Float", val: 2}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @v_factor = @fields.getField("y")

  process_val: (num, numb, i) =>
    num / numb

ThreeNodes.Core.addNodeType('MathDivide', MathDivide)

class MathMin extends NodeNumberParam1
  @node_name = 'Min'
  @group_name = 'Math'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "in2": {type: "Float", val: 0}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @v_factor = @fields.getField("in2")

  process_val: (num, numb, i) =>
    Math.min(num, numb)

ThreeNodes.Core.addNodeType('MathMin', MathMin)

class MathMax extends NodeNumberParam1
  @node_name = 'Max'
  @group_name = 'Math'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "in2": {type: "Float", val: 0}
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @v_factor = @fields.getField("in2")

  process_val: (num, numb, i) =>
    Math.max(num, numb)

ThreeNodes.Core.addNodeType('MathMax', MathMax)

class MathAttenuation extends NodeNumberParam1
  @node_name = 'Attenuation'
  @group_name = 'Math'

  initialize: (options) =>
    super
    @val = 0

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "default": 0
        "reset": false
        "factor": 0.8
    return $.extend(true, base_fields, fields)

  onFieldsCreated: () =>
    super
    @def_val = @fields.getField("default")
    @reset_val = @fields.getField("reset")
    @v_factor = @fields.getField("factor")
    @val = @def_val.getValue()

  process_val: (num, numb, i) =>
    if @reset_val.getValue(i) == true
      @val = @def_val.getValue(i)
    @val = @val + (@v_in.getValue(i) - @val) * @v_factor.getValue(i)
    @val

ThreeNodes.Core.addNodeType('MathAttenuation', MathAttenuation)
