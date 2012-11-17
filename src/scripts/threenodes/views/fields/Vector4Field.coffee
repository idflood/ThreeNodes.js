define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/fields/BaseField',
], (_, Backbone) ->
  #"use strict"

  ### Vector3Field View ###
  namespace "ThreeNodes.views.fields",
    Vector4Field: class Vector4Field extends ThreeNodes.views.fields.BaseField
      renderSidebar: () =>
        @createSidebarFieldTitle()
        @createSubvalTextinput("x")
        @createSubvalTextinput("y")
        @createSubvalTextinput("z")
        @createSubvalTextinput("w")
        return @
