define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Utils = require 'cs!threenodes/utils/Utils'
  Fields = require 'cs!threenodes/fields/collections/Fields'
  Node = require 'cs!threenodes/nodes/models/Node'

  ### NodeNumberSimple model ###
  class NodeNumberSimple extends Node
    getFields: =>
      base_fields = super
      fields =
        inputs:
          "in": {type: "Float", val: 0}
        outputs:
          "out": {type: "Float", val: 0}
      return $.extend(true, base_fields, fields)

    onFieldsCreated: () =>
      @v_in = @fields.getField("in")
      @v_out = @fields.getField("out", true)

    process_val: (num, i) => num

    remove: () =>
      delete @v_in
      delete @v_out
      super

    compute: =>
      res = []
      numItems = @fields.getMaxInputSliceCount()
      for i in [0..numItems]
        ref = @v_in.getValue(i)
        switch $.type(ref)
          when "number" then res[i] = @process_val(ref, i)
          when "object"
            switch ref.constructor
              when THREE.Vector2
                res[i].x = @process_val(ref.x, i)
                res[i].y = @process_val(ref.y, i)
              when THREE.Vector3
                res[i].x = @process_val(ref.x, i)
                res[i].y = @process_val(ref.y, i)
                res[i].z = @process_val(ref.z, i)
      @v_out.setValue res
      true
