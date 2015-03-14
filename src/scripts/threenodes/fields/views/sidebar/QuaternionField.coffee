#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/fields/views/sidebar/BaseField'

### Vector3Field View ###
class QuaternionField extends BaseField
  render: () =>
    @createSidebarFieldTitle()
    @createSubvalTextinput("x")
    @createSubvalTextinput("y")
    @createSubvalTextinput("z")
    @createSubvalTextinput("w")
    return @

module.exports = QuaternionField
