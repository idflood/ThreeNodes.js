#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/views/sidebar/fields/BaseField'

### Vector3Field View ###
namespace "ThreeNodes.views.fields",
  EulerField: class EulerField extends BaseField
    render: () =>
      @createSidebarFieldTitle()
      @createSubvalTextinput("x")
      @createSubvalTextinput("y")
      @createSubvalTextinput("z")
      @createSubvalTextinput("order", "string")
      return @
