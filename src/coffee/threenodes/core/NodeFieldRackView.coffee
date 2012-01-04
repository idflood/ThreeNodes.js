define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  ThreeNodes.NodeFieldRackView = Backbone.View.extend
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
      if field && field.is_output == true
        accept_class = ".inputs .inner-field"
      
      $(".inner-field", $field).droppable
        accept: accept_class
        activeClass: "ui-state-active"
        hoverClass: "ui-state-hover"
        drop: (event, ui) ->
          origin = $(ui.draggable).parent()
          field2 = origin.data("object")
          self.context.injector.instanciate(ThreeNodes.NodeConnection, field, field2)
      
      return this
  return ThreeNodes.NodeFieldRackView
