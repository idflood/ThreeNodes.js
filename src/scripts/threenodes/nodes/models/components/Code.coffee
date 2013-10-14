define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Node = require 'cs!threenodes/nodes/models/Node'
  NodeWithCenterTextfield = require 'cs!threenodes/nodes/views/NodeWithCenterTextfield'

  namespace "ThreeNodes.nodes.views",
    Expression: class Expression extends NodeWithCenterTextfield
      getCenterField: () => @model.fields.getField("code")

  namespace "ThreeNodes.nodes.models",
    Expression: class Expression extends Node
      @node_name = 'Expression'
      @group_name = 'Code'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @out = null
        @onCodeUpdate()
        field = @fields.getField("code")


        field.on "value_updated", @onCodeUpdate

      onCodeUpdate: (code = "") =>
        console.log code
        try
          @function = new Function(code)
        catch error
          console.warn error
          @function = false

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "code" : ""
          outputs:
            "out" : {type: "Any", val: null}
        return $.extend(true, base_fields, fields)

      compute: () =>
        code = @fields.getField("code").getValue()
        # By default, keep last result from a valid code.
        result = @out
        if @function != false
          # Function should simply return a value.
          # It can access extra fields with this.fields.getField / setField.
          result = @function()

        # Assign the new result to @out.
        @out = result

        @fields.setField("out", @out)
