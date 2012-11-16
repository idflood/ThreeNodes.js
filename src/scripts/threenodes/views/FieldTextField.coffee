define [
  'Underscore',
  'Backbone',
  "text!templates/field_textfield.tmpl.html",
], (_, Backbone, _view_field_textfield) ->
  #"use strict"

  ### FieldTextField View ###
  namespace "ThreeNodes",
    FieldTextField: class FieldTextField extends Backbone.View
      initialize: (options) ->
        super
        @render()

      render: () =>
        # Compile the template file
        @container = $(_.template(_view_field_textfield, @options))
        @$el.append(@container)
        return @
