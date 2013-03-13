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
        # Don't show input field from subnode if it has an internal connection
        if field.get("is_output") == false && field.isConnected()
          connection = field.connections[0]
          # if from_field node and to_field node have a gid != -1 and are identical
          from_gid = connection.from_field.node.get("gid")
          to_gid = connection.to_field.node.get("gid")
          if from_gid != "-1" && to_gid != "-1" && from_gid == to_gid
            # stop there
            return
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
