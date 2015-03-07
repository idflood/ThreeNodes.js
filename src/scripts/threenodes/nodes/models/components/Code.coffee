_ = require 'Underscore'
Backbone = require 'Backbone'
Node = require 'threenodes/nodes/models/Node'
NodeCodeView = require 'threenodes/nodes/views/NodeCodeView'
namespace = require('libs/namespace').namespace

namespace "ThreeNodes.nodes.views",
  Code: class Code extends NodeCodeView
  Expression: class Expression extends NodeCodeView

namespace "ThreeNodes.nodes.models",
  Expression: class Expression extends Node
    @node_name = 'Expression'
    @group_name = 'Code'

    initialize: (options) =>
      # Prepare custom fields before calling the super constructructor since
      # it will call getFields when creating @fields.
      @custom_fields = {inputs: {}, outputs: {}}
      @loadCustomFields(options)

      super
      @auto_evaluate = true
      @out = null

      @onCodeUpdate()
      field = @fields.getField("code")

      field.on "value_updated", @onCodeUpdate

    loadCustomFields: (options) =>
      if !options.custom_fields then return
      @custom_fields = $.extend(true, @custom_fields, options.custom_fields)

    onCodeUpdate: (code = "") =>
      console.log code
      try
        @function = new Function(code)
      catch error
        console.warn error
        @function = false

    addCustomField: (key, type, direction = 'inputs') =>
      field = {key: key, type: type}
      # Add the field to the a variable for saving.
      @custom_fields[direction][key] = field

      value = false
      @fields.addField(key, {value: value, type: type, default: false}, direction)

    toJSON: () =>
      res = super
      res.custom_fields = @custom_fields
      return res

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "code" : ""
        outputs:
          "out" : {type: "Any", val: null}
      # merge with custom fields
      fields = $.extend(true, fields, @custom_fields)
      return $.extend(true, base_fields, fields)

    compute: () =>
      code = @fields.getField("code").getValue()
      # By default, keep last result from a valid code.
      result = @out
      if @function != false
        # Function should simply return a value.
        # It can access extra fields with this.fields.getField / setField.
        try
          result = @function()
        catch error
          # do nothing on errors.
          # todo: maybe display error + line error in code (dispatch even to view).

      # Assign the new result to @out.
      @out = result

      @fields.setField("out", @out)

  Code: class Code extends Expression
    @node_name = 'Code'
    @group_name = 'Code'

    initialize: (options) =>
      super

    getDynamicFields: () =>
      return {}

    getFields: =>
      base_fields = super
      fields = @getDynamicFields()
      return $.extend(true, base_fields, fields)
