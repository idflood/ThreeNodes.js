_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/fields/views/sidebar/BaseField'

### Vector2Field View ###
class Vector2Field extends BaseField
  render: () =>
    @createSidebarFieldTitle()
    @createSubvalTextinput("x")
    @createSubvalTextinput("y")
    return @

module.exports = Vector2Field
