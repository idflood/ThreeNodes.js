define [
  'Underscore',
  'Backbone',
  "text!templates/field_sidebar_container.tmpl.html",
], (_, Backbone, _view_field_sidebar_container) ->
  #"use strict"

  ### SidebarField View ###
  namespace "ThreeNodes",
    SidebarField: class SidebarField extends Backbone.View
      initialize: (options) ->
        super
        @render()

      render: () =>
        # Compile the template file
        @container = $(_.template(_view_field_sidebar_container, @options))
        @$el.append(@container)
        console.log @container
        return @
