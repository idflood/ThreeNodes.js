define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Node = require 'cs!threenodes/nodes/models/Node'
  NodeNumberSimple = require 'cs!threenodes/nodes/models/NodeNumberSimple'
  NodeWithCenterTextfield = require 'cs!threenodes/nodes/views/NodeWithCenterTextfield'

  namespace "ThreeNodes.nodes.views",
    Number: class Number extends NodeWithCenterTextfield

    String: class String extends NodeWithCenterTextfield
      getCenterField: () => @model.fields.getField("string")

  namespace "ThreeNodes.nodes.models",
    Number: class Number extends NodeNumberSimple
      @node_name = 'Number'
      @group_name = 'Base'

    Boolean: class Boolean extends Node
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

    String: class String extends Node
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

    Vector2: class Vector2 extends Node
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

    Vector3: class Vector3 extends Node
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

    Color: class Color extends Node
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
