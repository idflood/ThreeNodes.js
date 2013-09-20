define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  require 'cs!threenodes/views/sidebar/fields/BaseField'

  ### Vector3Field View ###
  namespace "ThreeNodes.views.fields",
    Vector3Field: class Vector3Field extends ThreeNodes.views.fields.BaseField
      render: () =>
        @createSidebarFieldTitle()
        @createSubvalTextinput("x")
        @createSubvalTextinput("y")
        @createSubvalTextinput("z")
        return @
