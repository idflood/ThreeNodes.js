#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
namespace = require('libs/namespace').namespace

BaseField = require 'threenodes/fields/views/sidebar/BaseField'

### Vector4Field View ###
class Vector4Field extends BaseField
  render: () =>
    @createSidebarFieldTitle()
    @createSubvalTextinput("x")
    @createSubvalTextinput("y")
    @createSubvalTextinput("z")
    @createSubvalTextinput("w")
    return @

module.exports = Vector4Field
