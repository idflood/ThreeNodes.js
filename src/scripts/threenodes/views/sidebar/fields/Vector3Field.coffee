#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/views/sidebar/fields/BaseField'

### Vector3Field View ###
namespace "ThreeNodes.views.fields",
  Vector3Field: class Vector3Field extends BaseField
    render: () =>
      @createSidebarFieldTitle()
      @createSubvalTextinput("x")
      @createSubvalTextinput("y")
      @createSubvalTextinput("z")
      return @
