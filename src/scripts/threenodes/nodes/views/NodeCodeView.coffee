define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  require 'cs!../models/Node'
  require 'cs!./NodeView'

  class NodeCodeView extends ThreeNodes.NodeView
    initialize: (options) =>
      super
      field = @getCenterField()
      console.log @$el
      container = $("<div><textarea data-fid='#{field.get('fid')}' spellcheck='false'>test</textarea></div>")
      container.insertAfter($(".options", @$el))
      f_in = $("textarea", container)
      field.on_value_update_hooks.update_center_textfield = (v) ->
        if v != null
          f_in.val(v.toString())
      f_in.val(field.getValue())
      if field.get("is_output") == true
        f_in.attr("disabled", "disabled")
      else
        f_in.keypress (e) ->
          console.log e
          if e.which == 13
            field.setValue($(this).val())
            $(this).blur()
      @

    # View class can override this. Possibility to reuse this class
    getCenterField: () => @model.fields.getField("in")
