define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  require 'cs!threenodes/views/sidebar/fields/BoolField'
  require 'cs!threenodes/views/sidebar/fields/StringField'
  require 'cs!threenodes/views/sidebar/fields/FloatField'
  require 'cs!threenodes/views/sidebar/fields/Vector2Field'
  require 'cs!threenodes/views/sidebar/fields/Vector3Field'
  require 'cs!threenodes/views/sidebar/fields/Vector4Field'
  require 'cs!threenodes/views/sidebar/fields/QuaternionField'
  require 'cs!threenodes/views/sidebar/fields/EulerField'

  ### NodeSidebarView ###
  class NodeSidebarView extends Backbone.View
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
          when ThreeNodes.fields.Quaternion then ThreeNodes.views.fields.QuaternionField
          when ThreeNodes.fields.Euler then ThreeNodes.views.fields.EulerField
          else false

        if view_class != false
          view = new view_class
            model: field
          @$el.append(view.el)
      return @
