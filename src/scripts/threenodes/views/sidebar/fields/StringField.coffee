define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  BaseField = require 'cs!threenodes/views/sidebar/fields/BaseField'

  ### StringField View ###
  namespace "ThreeNodes.views.fields",
    StringField: class StringField extends BaseField
      render: () =>
        $target = @createSidebarContainer()
        @textfield = @createTextfield($target, "string")
        @textfield.linkTextfieldToVal(@textfield.$input, "string")
        return this
