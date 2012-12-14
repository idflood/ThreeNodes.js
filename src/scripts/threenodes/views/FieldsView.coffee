define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/FieldButton',
  "jquery.ui",
  'cs!threenodes/utils/Utils',
], (_, Backbone) ->
  #"use strict"

  ### Fields View ###
  namespace "ThreeNodes",
    FieldsView: class FieldsView extends Backbone.View
      # Save some options in variables and bind events
      initialize: (options) ->
        super
        @node = options.node
        @subviews = []
        @collection.on("add", @onFieldCreated)

        # create already existing fields
        @collection.each(@onFieldCreated)

      # Create the field dom element and add events to it
      onFieldCreated: (field) =>
        target = if field.get("is_output") == false then ".inputs" else ".outputs"
        view = new ThreeNodes.FieldButton
          model: field

        view.$el.appendTo($(target, @$el))

        # Save a reference of the field DOM element for ConnectionView
        # todo: remove this... but how?
        field.button = view.$el

        @subviews.push(view)

      # Unbind events, destroy jquery-ui widgets, remove dom elements
      # and delete variables
      remove: () =>
        @undelegateEvents()
        @collection.off("add", @onFieldCreated)

        # Remove all FieldButton subviews
        views = @subviews.concat()
        _.each views, (view) -> view.remove()

        # Remove elements which may have events attached
        $("input", $(@el)).remove()

        # Delete references
        delete @collection
        delete @node
        delete @subviews
        super
