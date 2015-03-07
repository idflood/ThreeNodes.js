_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/views/sidebar/fields/BaseField'

### Vector2Field View ###
namespace "ThreeNodes.views.fields",
  Vector2Field: class Vector2Field extends BaseField
    render: () =>
      @createSidebarFieldTitle()
      @createSubvalTextinput("x")
      @createSubvalTextinput("y")
      return @
