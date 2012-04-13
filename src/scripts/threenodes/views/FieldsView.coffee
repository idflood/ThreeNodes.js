define [
  'use!Underscore', 
  'use!Backbone',
  'threenodes/views/UI',
  "jQueryUi",
  'order!threenodes/utils/Utils',
], (_, Backbone, UiView) ->
  "use strict"
  
  ### Fields View ###
  $ = jQuery
  
  class ThreeNodes.FieldsView extends Backbone.View
    # Save some options in variables and bind events
    initialize: (options) ->
      super
      @node = options.node
      @node_el = options.node_el
      
      @collection.bind("addCenterTextfield", @addCenterTextfield)
      @collection.bind("addCustomHtml", @addCustomHtml)
      @collection.bind("add", @onFieldCreated)
    
    # Create the field dom element and add events to it
    onFieldCreated: (field) =>
      console.log "create button"
      target = if field.get("is_output") == false then ".inputs" else ".outputs"
      el = $(field.render_button()).appendTo($(target, @$el))
      @add_field_listener(el)
    
    # Unbind events, destroy jquery-ui widgets, remove dom elements
    # and delete variables
    remove: () =>
      @undelegateEvents()
      
      $(".inner-field", $(@el)).each () ->
        if $(this).data("droppable")
          $(this).droppable("destroy")
      $(".inner-field", $(@el)).each () ->
        if $(this).data("draggable")
          $(this).draggable("destroy")
      
      # Remove elements which may have events attached
      $(".inner-field", $(@el)).remove()
      $(".field", $(@el)).remove()
      $("input", $(@el)).remove()
      delete @collection
      delete @node_el
      delete @node
      super
    
    add_field_listener: ($field) ->
      self = this
      field = $field.data("object")
      get_path = (start, end, offset) ->
        ofx = $("#container-wrapper").scrollLeft()
        ofy = $("#container-wrapper").scrollTop()
        "M#{start.left + offset.left + ofx + 2} #{start.top + offset.top + ofy + 2} L#{end.left + offset.left + ofx} #{end.top + offset.top + ofy}"
      
      highlight_possible_targets = () ->
        target = ".outputs .field"
        if field.get("is_output") == true
          target = ".inputs .field"
        $(target).filter () ->
          $(this).parent().parent().parent().data("nid") != self.node.get("nid")
        .addClass "field-possible-target"
      
      $(".inner-field", $field).draggable
        helper: () ->
          $("<div class='ui-widget-drag-helper'></div>")
        scroll: true
        cursor: 'pointer'
        cursorAt:
          left: 0
          top: 0
        start: (event, ui) ->
          highlight_possible_targets()
          if UiView.connecting_line
            UiView.connecting_line.attr
              opacity: 1
        stop: (event, ui) ->
          $(".field").removeClass "field-possible-target"
          if UiView.connecting_line
            UiView.connecting_line.attr
              opacity: 0
        drag: (event, ui) ->
          if UiView.connecting_line
            pos = $(".inner-field span", $field).position()
            UiView.connecting_line.attr
              path: get_path(pos, ui.position, self.node_el.position())
            return true
      
      accept_class = ".outputs .inner-field"
      if field && field.get("is_output") == true
        accept_class = ".inputs .inner-field"
      
      $(".inner-field", $field).droppable
        accept: accept_class
        activeClass: "ui-state-active"
        hoverClass: "ui-state-hover"
        drop: (event, ui) ->
          origin = $(ui.draggable).parent()
          field2 = origin.data("object")
          self.node.createConnection(field, field2)
      
      return this
    
    addCustomHtml: ($element, target = ".center") =>
      $element.appendTo($(target, @$el))
      return this
    
    addCenterTextfield: (field) =>
      container = $("<div><input type='text' data-fid='#{field.get('fid')}' /></div>").appendTo($(".center", @$el))
      f_in = $("input", container)
      field.on_value_update_hooks.update_center_textfield = (v) ->
        if v != null
          f_in.val(v.toString())
          #f_in.val(v.toString().substring(0, 10))
      f_in.val(field.getValue())
      if field.get("is_output") == true
        f_in.attr("disabled", "disabled")
      else
        f_in.keypress (e) ->
          if e.which == 13
            field.setValue($(this).val())
            $(this).blur()
      @
    
