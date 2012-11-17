define [
  'Underscore',
  'Backbone',
  "text!templates/field_sidebar_container.tmpl.html",
  'cs!threenodes/views/FieldTextField',
], (_, Backbone, _view_field_sidebar_container) ->
  #"use strict"

  ### BaseField View ###
  namespace "ThreeNodes.views.fields",
    BaseField: class BaseField extends Backbone.View
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
        #$("#tab-attribute").append(target)

        #return target
        return @container

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
