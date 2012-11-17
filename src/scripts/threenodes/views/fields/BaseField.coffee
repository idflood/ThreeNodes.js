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
        f_in = @createTextfield($target, type, false)
        f_in.linkTextfieldToSubval(f_in, subval, type)
        if type == "float"
          f_in.addTextfieldSlider(f_in)
        return false

      createSidebarFieldTitle: (name = @model.get("name")) =>
        $cont = $("#tab-attribute")
        $cont.append("<h3>#{name}</h3>")
        return $cont
