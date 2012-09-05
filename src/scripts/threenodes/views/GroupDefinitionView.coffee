
define [
  'Underscore',
  'Backbone',
  "text!templates/definition.tmpl.html",
  "text!templates/confirm_group_delete.tmpl.html",
  "libs/jquery.contextMenu",
  "libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'cs!threenodes/utils/Utils',
], (_, Backbone, _view_template, _view_group_delete) ->
  #"use strict"

  ### Node View ###
  namespace "ThreeNodes",
    GroupDefinitionView: class GroupDefinitionView extends Backbone.View
      @template = _view_template

      initialize: () ->
        @$el.draggable
          revert: "valid"
          opacity: 0.7
          helper: "clone"
          revertDuration: 0
          scroll: false
          containment: "document"
        @$el.data("model", @model)
        @model.bind('remove', () => @remove())

        # Trigger edit/remove events when these buttons are clicked
        $(".edit", @$el).click (e) =>
          e.preventDefault()
          @trigger("edit", @model)

        $(".remove", @$el).click (e) =>
          e.preventDefault()
          @createConfirmModal()


      createConfirmModal: () =>
        # Remove any previously created modal
        if @$confirm then @$confirm.dialog("destroy")
        $("#confirm-groupdefinition-delete").remove()

        # Create the group definition remove confirmation dialog
        self = this
        grp_confirm_tmpl = _.template(_view_group_delete, {})
        @$confirm = $(grp_confirm_tmpl).appendTo("body")
        @$confirm.dialog
          resizable: false
          height: 120
          modal: true
          buttons:
            "Delete": () ->
              self.model.destroy()
              self.$confirm.dialog("close")
            "Cancel": () =>
              self.$confirm.dialog("close")
