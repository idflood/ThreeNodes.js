_ = require 'Underscore'
Backbone = require 'Backbone'
Node = require 'threenodes/nodes/models/Node'
NodeNumberSimple = require 'threenodes/nodes/models/NodeNumberSimple'
NodeWithCenterTextfield = require 'threenodes/nodes/views/NodeWithCenterTextfield'
NodeColorView = require 'threenodes/nodes/views/Color'


class Number extends NodeWithCenterTextfield
ThreeNodes.Core.addNodeView('Number', Number)

class String extends NodeWithCenterTextfield
  getCenterField: () => @model.fields.getField("string")
ThreeNodes.Core.addNodeView('String', String)

class Color extends NodeColorView
ThreeNodes.Core.addNodeView('Color', Color)

class Number extends NodeNumberSimple
  @node_name = 'Number'
  @group_name = 'Base'

ThreeNodes.Core.addNodeType('Number', Number)

class Boolean extends Node
  @node_name = 'Boolean'
  @group_name = 'Base'

  initialize: (options) =>
    super
    @value = true

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "bool": true
      outputs:
        "out": {type: "Bool", val: @value}
    return $.extend(true, base_fields, fields)

  compute: =>
    @fields.setField("out", @fields.getField("bool").getValue())

ThreeNodes.Core.addNodeType('Boolean', Boolean)

class URL extends Node
  @node_name = 'URL'
  @group_name = 'Base'

  initialize: (options) =>
    super
    @value = ""

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "string": ""
      outputs:
        "out": {type: "Any", val: @value}
    return $.extend(true, base_fields, fields)

  compute: =>

    url_text = @fields.getField("string").getValue()
    if url_text == ""
      return
    the_fields = @fields

    result = $.get(url_text, (f, s) ->  the_fields.setField("out", f)).fail( (e) -> the_fields.setField("out", "ERROR") )
    #the_fields.setField("out", "ERROR")


ThreeNodes.Core.addNodeType('URL', URL)

class String extends Node
  @node_name = 'String'
  @group_name = 'Base'

  initialize: (options) =>
    super
    @value = ""

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "string": ""
      outputs:
        "out": {type: "Any", val: @value}
    return $.extend(true, base_fields, fields)

  compute: =>

    @fields.setField("out", @fields.getField("string").getValue())

ThreeNodes.Core.addNodeType('String', String)


class Vector2 extends Node
  @node_name = 'Vector2'
  @group_name = 'Base'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "x" : 0
        "y" : 0
      outputs:
        "xy" : {type: "Vector2", val: false}
        "x" : 0
        "y" : 0
    return $.extend(true, base_fields, fields)

  compute: =>
    res = []
    resx = []
    resy = []
    numItems = @fields.getMaxInputSliceCount()

    for i in [0..numItems]
      resx[i] = @fields.getField("x").getValue(i)
      resy[i] = @fields.getField("y").getValue(i)
      res[i] = new THREE.Vector3(resx[i], resy[i])

    @fields.setField("xy", res)
    @fields.setField("x", resx)
    @fields.setField("y", resy)

ThreeNodes.Core.addNodeType('Vector2', Vector2)

class Vector3 extends Node
  @node_name = 'Vector3'
  @group_name = 'Base'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "x" : 0
        "y" : 0
        "z" : 0
      outputs:
        "xyz" : {type: "Vector3", val: false}
        "x" : 0
        "y" : 0
        "z" : 0
    return $.extend(true, base_fields, fields)

  compute: =>
    res = []
    resx = []
    resy = []
    resz = []
    numItems = @fields.getMaxInputSliceCount()

    for i in [0..numItems]
      resx[i] = @fields.getField("x").getValue(i)
      resy[i] = @fields.getField("y").getValue(i)
      resz[i] = @fields.getField("z").getValue(i)
      res[i] = new THREE.Vector3(resx[i], resy[i], resz[i])

    @fields.setField("xyz", res)
    @fields.setField("x", resx)
    @fields.setField("y", resy)
    @fields.setField("z", resz)

ThreeNodes.Core.addNodeType('Vector3', Vector3)

class Quaternion extends Node
  @node_name = 'Quaternion'
  @group_name = 'Base'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "x" : 0
        "y" : 0
        "z" : 0
        "w" : 1
      outputs:
        "xyzw" : {type: "Quaternion", val: false}
        "x" : 0
        "y" : 0
        "z" : 0
        "w" : 1
    return $.extend(true, base_fields, fields)

  compute: =>
    res = []
    resx = []
    resy = []
    resz = []
    resw = []
    numItems = @fields.getMaxInputSliceCount()

    for i in [0..numItems]
      resx[i] = @fields.getField("x").getValue(i)
      resy[i] = @fields.getField("y").getValue(i)
      resz[i] = @fields.getField("z").getValue(i)
      resw[i] = @fields.getField("w").getValue(i)
      res[i] = new THREE.Quaternion(resx[i], resy[i], resz[i], resw[i])

    @fields.setField("xyzw", res)
    @fields.setField("x", resx)
    @fields.setField("y", resy)
    @fields.setField("z", resz)
    @fields.setField("w", resw)

ThreeNodes.Core.addNodeType('Quaternion', Quaternion)

class Euler extends Node
  @node_name = 'Euler'
  @group_name = 'Base'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "x" : 0
        "y" : 0
        "z" : 0
        "order":
          type: "String"
          val: "XYZ"
          values:
            "XYZ": "XYZ"
            "YZX": "YZX"
            "ZXY": "ZXY"
            "XZY": "XZY"
            "YXZ": "YXZ"
            "ZYX": "ZYX"
      outputs:
        "euler" : {type: "Euler", val: false}
        "x" : 0
        "y" : 0
        "z" : 0
        "order": "XYZ"
    return $.extend(true, base_fields, fields)

  compute: =>
    res = []
    resx = []
    resy = []
    resz = []
    resorder = []
    numItems = @fields.getMaxInputSliceCount()

    for i in [0..numItems]
      resx[i] = @fields.getField("x").getValue(i)
      resy[i] = @fields.getField("y").getValue(i)
      resz[i] = @fields.getField("z").getValue(i)
      resorder[i] = @fields.getField("order").getValue(i)
      res[i] = new THREE.Euler(resx[i], resy[i], resz[i], resorder[i])

    @fields.setField("euler", res)
    @fields.setField("x", resx)
    @fields.setField("y", resy)
    @fields.setField("z", resz)
    @fields.setField("order", resorder)

ThreeNodes.Core.addNodeType('Euler', Euler)

class Color extends Node
  @node_name = 'Color'
  @group_name = 'Base'

  getFields: =>
    base_fields = super
    fields =
      inputs:
        "r": 0
        "g": 0
        "b": 0
      outputs:
        "rgb": {type: "Color", val: false}
        "r": 0
        "g": 0
        "b": 0
    return $.extend(true, base_fields, fields)

  compute: =>
    res = []
    resr = []
    resg = []
    resb = []
    numItems = @fields.getMaxInputSliceCount()

    for i in [0..numItems]
      resr[i] = @fields.getField("r").getValue(i)
      resg[i] = @fields.getField("g").getValue(i)
      resb[i] = @fields.getField("b").getValue(i)
      res[i] = new THREE.Color().setRGB(resr[i], resg[i], resb[i])

    @fields.setField("rgb", res)
    @fields.setField("r", resr)
    @fields.setField("g", resg)
    @fields.setField("b", resb)

ThreeNodes.Core.addNodeType('Color', Color)
