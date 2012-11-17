define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/SidebarField',
  'cs!threenodes/views/FieldTextField',
], (_, Backbone) ->
  #"use strict"

  ### SidebarField View ###
  namespace "ThreeNodes.views.fields",
    BaseField: class BaseField extends Backbone.View
      initialize: (options) ->
        super
        @model.on "value_updated", @on_value_updated

      on_value_updated: (new_val) => return @

      renderSidebar: () => return @

      createSidebarContainer: (name = @model.get("name")) =>
        sidebar_container = new ThreeNodes.SidebarField
          fid: @model.get("fid")
          model: @
          name: name
          el: $("#tab-attribute")

        $target = sidebar_container.container
        return $target

      createTextfield: ($target, type = "float", link_to_val = true) =>
        textField = new ThreeNodes.FieldTextField
          model: @model
          el: $target
          type: type
          link_to_val: link_to_val

        return textField

      createSubvalTextinput: (subval, type = "float") =>
        $target = @createSidebarContainer(subval)
        textfield = @createTextfield($target, type, false)
        textfield.linkTextfieldToSubval(textfield.$input, subval, type)
        if type == "float"
          textfield.addTextfieldSlider(textfield.$input)
        return false

      createSidebarFieldTitle: (name = @model.get("name")) =>
        $cont = $("#tab-attribute")
        $cont.append("<h3>#{name}</h3>")
        return $cont
