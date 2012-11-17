define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/fields/BaseField',
], (_, Backbone) ->
  #"use strict"

  ### StringField View ###
  namespace "ThreeNodes.views.fields",
    StringField: class StringField extends ThreeNodes.views.fields.BaseField
      initialize: (options) ->
        super
        @model.on "value_updated", @on_value_updated

      on_value_updated: (new_val) =>
        if @model.getValue() == true
          @$checkbox.attr('checked', 'checked')
        else
          @$checkbox.removeAttr('checked')

      renderSidebar: () =>
        $target = @createSidebarContainer()
        @textfield = @createTextfield($target, "string")
        @$input = @textfield.$input

        @on_value_update_hooks.update_sidebar_textfield = (v) ->
          @$input.val(v.toString())

        @$input.val(@model.getValue())
        @$input.keypress (e) =>
          if e.which == 13
            @model.setValue(@$input.val())
            @$input.blur()

        return @
