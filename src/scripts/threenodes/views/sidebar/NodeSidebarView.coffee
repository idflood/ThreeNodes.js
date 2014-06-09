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

      # Special case for code nodes, add buttons to add inputs/outputs.
      # Todo: find a way to define a sidebarview class by nodetypes and
      # refactor this (CodeSidebarView extends NodeSidebarView)
      if @model.onCodeUpdate
        self = this
        @$el.append("<h2>Add custom fields</h2>")
        $inputs_form = $('<form class="dynamic-fields__form"></form>')
        $inputs_form.append('<input type="text" name="key" placeholder="key" />')
        $inputs_form.append('<input type="text" name="type" placeholder="type" />')
        $inputs_form.append('<input type="submit" value="Add input field" />')
        @$el.append($inputs_form)

        $inputs_form.on 'submit', (e) ->
          e.preventDefault()
          $form = $(this)
          $key = $(this).find('[name="key"]')
          $type = 'Any'
          key = $.trim($key.val())
          if key != ''
            # add this to the model custom fields definition and rerender the view.
            self.model.addCustomField(key, 'Any', 'inputs')
            # Reset form.
            $key.val('')

            # Simply rerender the sidebar.
            # todo: maybe do something like remove the render.
            self.render()

      return @
