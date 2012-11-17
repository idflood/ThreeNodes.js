define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/fields/BaseField',
], (_, Backbone) ->
  #"use strict"

  ### Vector3Field View ###
  namespace "ThreeNodes.views.fields",
    Vector3Field: class Vector3Field extends ThreeNodes.views.fields.BaseField
      render: () =>
        @createSidebarFieldTitle()
        @createSubvalTextinput("x")
        @createSubvalTextinput("y")
        @createSubvalTextinput("z")
        return @
