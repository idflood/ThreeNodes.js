#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'

#require 'threenodes/views/sidebar/fields/BoolField'
#require 'threenodes/views/sidebar/fields/StringField'
#require 'threenodes/views/sidebar/fields/FloatField'
#require 'threenodes/views/sidebar/fields/Vector2Field'
#require 'threenodes/views/sidebar/fields/Vector3Field'
#require 'threenodes/views/sidebar/fields/Vector4Field'
#require 'threenodes/views/sidebar/fields/QuaternionField'
#require 'threenodes/views/sidebar/fields/EulerField'

### NodeSidebarView ###
class NodeSidebarView extends Backbone.View
  initialize: (options) ->
    super
    @render()

  displayFields: (fields) =>
    #throw new Error("Need to reimplement")
    # todo: set the View from the field class.
    # add a static field on the model, @sidebarView: BoolFieldView
    for f of fields
      field = fields[f]
      view_class = field.constructor.VIEW

      if view_class != false
        view = new view_class
          model: field
        @$el.append(view.el)

  render: () =>
    # Compile the template file
    @$el.html("<h2>#{@model.get('name')}</h2>")
    @displayFields(@model.fields.inputs)

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
        $type = $(this).find('[name="type"]')
        type = 'Any'
        if $.trim($type.val()) != ''
          type = $.trim($type.val())
        key = $.trim($key.val())
        if key != ''
          # add this to the model custom fields definition and rerender the view.
          self.model.addCustomField(key, type, 'inputs')
          # Reset form.
          $key.val('')
          $type.val('')

          # Simply rerender the sidebar.
          # todo: maybe do something like remove the render.
          self.render()

    return @

module.exports = NodeSidebarView
