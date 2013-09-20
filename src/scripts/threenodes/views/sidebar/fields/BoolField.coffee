define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  require 'cs!threenodes/views/sidebar/fields/BaseField'

  ### SidebarField View ###
  namespace "ThreeNodes.views.fields",
    BoolField: class BoolField extends ThreeNodes.views.fields.BaseField
      on_value_updated: (new_val) =>
        if @model.getValue() == true
          @$checkbox.attr('checked', 'checked')
        else
          @$checkbox.removeAttr('checked')

      render: () =>
        console.log "check.."
        $target = @createSidebarContainer()
        id = "side-field-checkbox-#{@model.get('fid')}"
        $container = $("<div><input type='checkbox' id='#{id}'/></div>").appendTo($target)
        @$checkbox = $("input", $container)

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
