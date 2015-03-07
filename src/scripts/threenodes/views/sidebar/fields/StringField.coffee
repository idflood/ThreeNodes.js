#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/views/sidebar/fields/BaseField'

### StringField View ###
namespace "ThreeNodes.views.fields",
  StringField: class StringField extends BaseField
    render: () =>
      $target = @createSidebarContainer()
      if @model.attributes.possibilities
        @create_sidebar_select($target)
      else
        @create_sidebar_input($target)
      true

    # Todo: DRY... same code on FloatField.
    create_sidebar_select: ($target) =>
      self = this
      input = "<div><select>"
      for f of @model.get("possibilities")
        dval = @model.get("possibilities")[f]
        if dval == @val
          input += "<option value='#{dval}' selected='selected'>#{f}</option>"
        else
          input += "<option value='#{dval}'>#{f}</option>"
      input += "</select></div>"
      $target.append(input)
      $("select", $target).change (e) =>
        @model.setValue($("select", $target).val())
      return true

    create_sidebar_input: ($target) =>
      @textfield = @createTextfield($target, "string")
      @textfield.linkTextfieldToVal("string")
