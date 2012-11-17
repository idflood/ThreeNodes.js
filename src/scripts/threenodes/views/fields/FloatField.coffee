define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/fields/BaseField',
], (_, Backbone) ->
  #"use strict"

  ### FloatField View ###
  namespace "ThreeNodes.views.fields",
    FloatField: class FloatField extends ThreeNodes.views.fields.BaseField
      initialize: (options) ->
        super

      render: () =>
        $target = @createSidebarContainer()
        if @model.possible_values
          @create_sidebar_select($target)
        else
          @create_sidebar_input($target)
        true

      create_sidebar_select: ($target) =>
        self = this
        input = "<div><select>"
        for f of @model.possible_values
          dval = @model.possible_values[f]
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
        @textfield = @createTextfield($target)
        @textfield.linkTextfieldToVal(@textfield.$input)
