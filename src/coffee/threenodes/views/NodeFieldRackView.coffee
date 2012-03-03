define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/utils/Utils',
], ($, _, Backbone) ->
  "use strict"
  
  class ThreeNodes.NodeFieldRackView extends Backbone.View
    initialize: (options) ->
      @node = options.node
      @collection.bind "add", (model) ->
        #console.log "collection.add"
      @collection.bind "renderSidebar", () =>
        @renderSidebar()
      @collection.bind "addCenterTextfield", (field) =>
        @addCenterTextfield(field)
      @collection.bind "field:registered", (model, el) =>
        @add_field_listener(el)
    
    renderSidebar: () =>
      $target = $("#tab-attribute")
      $target.html("");
      for f of @collection.node_fields.inputs
        @collection.node_fields.inputs[f].render_sidebar()
      true
    
    add_field_listener: ($field) ->
      self = this
      field = $field.data("object")
      get_path = (start, end, offset) ->
        "M#{start.left + offset.left + 2} #{start.top + offset.top + 2} L#{end.left + offset.left} #{end.top + offset.top}"
      
      highlight_possible_targets = () ->
        target = ".outputs .field"
        if field.is_output == true
          target = ".inputs .field"
        $(target).filter () ->
          $(this).parent().parent().parent().attr("id") != "nid-#{self.nid}"
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
          if ThreeNodes.svg_connecting_line
            ThreeNodes.svg_connecting_line.attr
              opacity: 1
        stop: (event, ui) ->
          $(".field").removeClass "field-possible-target"
          if ThreeNodes.svg_connecting_line
            ThreeNodes.svg_connecting_line.attr
              opacity: 0
        drag: (event, ui) ->
          if ThreeNodes.svg_connecting_line
            pos = $("span", event.target).position()
            ThreeNodes.svg_connecting_line.attr
              path: get_path(pos, ui.position, self.options.node.main_view.position())
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
    
    addCenterTextfield: (field) =>
      $(".options .center", @options.node.main_view).append("<div><input type='text' id='f-txt-input-#{field.get('fid')}' /></div>")
      f_in = $("#f-txt-input-#{field.get('fid')}")
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
    
