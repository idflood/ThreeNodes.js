define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  _view_field_textfield = require 'text!templates/field_textfield.tmpl.html'
  DraggableNumber = require 'draggable-number'

  ### SidebarTextfield View ###
  class SidebarTextfield extends Backbone.View
    initialize: (options) ->
      super
      @slider = false
      @render()

    render: () =>
      # Compile the template file
      @container = $(_.template(_view_field_textfield, @options))
      @$el.append(@container)
      @$input = $("input", @container)

      if @options.type == "float" && @options.link_to_val == true
        @$input.val(@model.getValue())
        @slider = @addTextfieldSlider(@$input)
      return @

    linkTextfieldToVal: (type = "float") =>
      on_value_changed = (v) =>
        @slider.set(v)
      @model.on "value_updated", on_value_changed

      @$input.val(@model.getValue())

      @slider._options.changeCallback = (new_val) =>
        @model.setValue(new_val)

      @$input.keypress (e) =>
        if e.which == 13
          if type == "float"
            @model.setValue(parseFloat(@$input.val()))
          else
            @model.setValue(@$input.val())
          @$input.blur()
      return this

    linkTextfieldToSubval: (subval, type = "float") =>
      # TODO: use the event instead of the hook
      @model.on_value_update_hooks["update_sidebar_textfield_" + subval] = (v) =>
        @$input.val(v[subval])

      @$input.val(@model.getValue()[subval])

      updateVal = () =>
        dval = @$input.val()
        if type == "float" then dval = parseFloat(dval)
        if $.type(@model.attributes.value) == "array"
          @model.attributes.value[0][subval] = dval
        else
          @model.attributes.value[subval] = dval

      @slider._options.changeCallback = (new_val) =>
        updateVal()

      @$input.change (e) =>
        updateVal()
      @$input.keypress (e) =>
        if e.which == 13
          updateVal()
          @$input.blur()
      return this

    addTextfieldSlider: () =>
      slider = new DraggableNumber(@$input.get(0))
      return slider
