define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/fields/BoolField',
  'cs!threenodes/views/fields/StringField',
  'cs!threenodes/views/fields/FloatField',
  'cs!threenodes/views/fields/Vector2Field',
  'cs!threenodes/views/fields/Vector3Field',
  'cs!threenodes/views/fields/Vector4Field',
], (_, Backbone) ->
  #"use strict"

  ### NodeSidebarView ###
  namespace "ThreeNodes",
    NodeSidebarView: class NodeSidebarView extends Backbone.View
      initialize: (options) ->
        super
        @render()

      render: () =>
        # Compile the template file
        @$el.html("<h2>#{@model.get('name')}</h2>")
        for f of @model.fields.inputs
          field = @model.fields.inputs[f]
          view_class = switch field.constructor
            when ThreeNodes.fields.Bool then ThreeNodes.views.fields.BoolField
            when ThreeNodes.fields.String then ThreeNodes.views.fields.StringField
            when ThreeNodes.fields.Float then ThreeNodes.views.fields.FloatField
            when ThreeNodes.fields.Vector2 then ThreeNodes.views.fields.Vector2Field
            when ThreeNodes.fields.Vector3 then ThreeNodes.views.fields.Vector3Field
            when ThreeNodes.fields.Vector4 then ThreeNodes.views.fields.Vector4Field
            else false

          if view_class != false
            view = new view_class
              model: field
            view.renderSidebar()
          else
            field.renderSidebar()
        return @
