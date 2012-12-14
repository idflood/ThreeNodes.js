define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/sidebar/fields/BaseField',
], (_, Backbone) ->
  #"use strict"

  ### StringField View ###
  namespace "ThreeNodes.views.fields",
    StringField: class StringField extends ThreeNodes.views.fields.BaseField
      render: () =>
        $target = @createSidebarContainer()
        @textfield = @createTextfield($target, "string")
        @textfield.linkTextfieldToVal(@textfield.$input, "string")
        return this
