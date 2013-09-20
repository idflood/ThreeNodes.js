define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  require 'cs!threenodes/views/sidebar/fields/BaseField'

  ### Vector2Field View ###
  namespace "ThreeNodes.views.fields",
    Vector2Field: class Vector2Field extends ThreeNodes.views.fields.BaseField
      render: () =>
        @createSidebarFieldTitle()
        @createSubvalTextinput("x")
        @createSubvalTextinput("y")
        return @
