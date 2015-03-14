#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/fields/views/sidebar/BaseField'

### Euler3Field View ###
class EulerField extends BaseField
  render: () =>
    @createSidebarFieldTitle()
    @createSubvalTextinput("x")
    @createSubvalTextinput("y")
    @createSubvalTextinput("z")
    @createSubvalTextinput("order", "string")
    return @

module.exports = EulerField
