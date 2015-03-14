#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/fields/views/sidebar/BaseField'

### Vector3Field View ###
class Vector3Field extends BaseField
  render: () =>
    @createSidebarFieldTitle()
    @createSubvalTextinput("x")
    @createSubvalTextinput("y")
    @createSubvalTextinput("z")
    return @

module.exports = Vector3Field
