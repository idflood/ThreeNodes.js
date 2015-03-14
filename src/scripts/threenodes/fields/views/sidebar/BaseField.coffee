#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'
_view_field_sidebar_container = require 'templates/field_sidebar_container.tmpl.html'

SidebarTextfield = require 'threenodes/views/sidebar/SidebarTextfield'

### BaseField View ###
class BaseField extends Backbone.View
  initialize: (options) ->
    super
    @model.on "value_updated", @on_value_updated
    @render()

  on_value_updated: (new_val) => return @

  render: () =>
    return @

  createSidebarContainer: (name = @model.get("name")) =>
    options =
      fid: @model.get("fid")
      model: @
      name: name
    @container = $(_.template(_view_field_sidebar_container, options))
    @$el.append(@container)

    return @container

  createTextfield: ($target, type = "float", link_to_val = true) =>
    textField = new SidebarTextfield
      model: @model
      el: $target
      type: type
      link_to_val: link_to_val

    return textField

  createSubvalTextinput: (subval, type = "float") =>
    $target = @createSidebarContainer(subval)
    textfield = @createTextfield($target, type, false)
    textfield.linkTextfieldToSubval(subval, type)
    return false

  createSidebarFieldTitle: (name = @model.get("name")) =>
    @$el.append("<h3>#{name}</h3>")
    return @$el

module.exports = BaseField
