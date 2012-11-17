define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/sidebar/fields/BaseField',
], (_, Backbone) ->
  #"use strict"

  ### SidebarField View ###
  namespace "ThreeNodes.views.fields",
    BoolField: class BoolField extends ThreeNodes.views.fields.BaseField
      initialize: (options) ->
        super

      on_value_updated: (new_val) =>
        if @model.getValue() == true
          @$checkbox.attr('checked', 'checked')
        else
          @$checkbox.removeAttr('checked')

      render: () =>
        $target = @createSidebarContainer()
        id = "side-field-checkbox-#{@model.get('fid')}"
        $target.append("<div><input type='checkbox' id='#{id}'/></div>")
        @$checkbox = $("#" + id)

        # Set the inital state of the checkbox
        if @model.getValue() == true
          @$checkbox.attr('checked', 'checked')

        # Listen to the checkbox change status
        @$checkbox.change (e) =>
          if @$checkbox.is(':checked')
            @model.setValue(true)
          else
            @model.setValue(false)
        return @
