define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  CodeMirror = require 'bower_components/codemirror/lib/codemirror'

  require 'libs/jshint'
  require 'bower_components/codemirror/mode/javascript/javascript'
  require 'bower_components/codemirror/addon/lint/lint'
  require 'bower_components/codemirror/addon/lint/javascript-lint'

  require 'cs!../models/Node'
  require 'cs!./NodeView'

  class NodeCodeView extends ThreeNodes.NodeView
    initialize: (options) =>
      super
      field = @getCenterField()

      container = $("<div><textarea data-fid='#{field.get('fid')}' spellcheck='false'></textarea></div>")
      container.insertAfter($(".options", @$el))
      f_in = $("textarea", container)

      field.on_value_update_hooks.update_center_textfield = (v) ->
        if v != null
          f_in.val(v.toString())
      f_in.val(field.getValue())

      editor = CodeMirror.fromTextArea f_in.get(0),
        mode: "javascript"
        theme: 'monokai'
        tabSize: 2
        lineNumbers: true
        gutters: ["CodeMirror-lint-markers"]
        lint: true

      editor.on "change", (instance, changeObj) ->
        field.setValue(editor.getValue())

      $codemirror = @$el.find('.CodeMirror')
      $codemirror.parent().on "mousemove click mouseup mousedown", (e) ->
        e.stopPropagation()


      if field.get("is_output") == true
        f_in.attr("disabled", "disabled")
        editor.setOption('readOnly', true)
      else
        f_in.keyup (e) ->
          field.setValue($(this).val())
          #console.log e
          #if e.which == 13
          #  field.setValue($(this).val())
          #  $(this).blur()
      @

    # View class can override this. Possibility to reuse this class
    getCenterField: () => @model.fields.getField("code")
