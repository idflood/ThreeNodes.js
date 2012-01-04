define(['jQuery', 'Underscore', 'Backbone', "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.NodeFieldRackView = Backbone.View.extend({
    add_field_listener: function($field) {
      var accept_class, field, get_path, highlight_possible_targets, self;
      self = this;
      field = $field.data("object");
      get_path = function(start, end, offset) {
        return "M" + (start.left + offset.left + 2) + " " + (start.top + offset.top + 2) + " L" + (end.left + offset.left) + " " + (end.top + offset.top);
      };
      highlight_possible_targets = function() {
        var target;
        target = ".outputs .field";
        if (field.is_output === true) {
          target = ".inputs .field";
        }
        return $(target).filter(function() {
          return $(this).parent().parent().parent().attr("id") !== ("nid-" + self.nid);
        }).addClass("field-possible-target");
      };
      $(".inner-field", $field).draggable({
        helper: function() {
          return $("<div class='ui-widget-drag-helper'></div>");
        },
        scroll: true,
        cursor: 'pointer',
        cursorAt: {
          left: 0,
          top: 0
        },
        start: function(event, ui) {
          highlight_possible_targets();
          if (ThreeNodes.svg_connecting_line) {
            return ThreeNodes.svg_connecting_line.attr({
              opacity: 1
            });
          }
        },
        stop: function(event, ui) {
          $(".field").removeClass("field-possible-target");
          if (ThreeNodes.svg_connecting_line) {
            return ThreeNodes.svg_connecting_line.attr({
              opacity: 0
            });
          }
        },
        drag: function(event, ui) {
          var pos;
          if (ThreeNodes.svg_connecting_line) {
            pos = $("span", event.target).position();
            ThreeNodes.svg_connecting_line.attr({
              path: get_path(pos, ui.position, self.options.node.main_view.position())
            });
            return true;
          }
        }
      });
      accept_class = ".outputs .inner-field";
      if (field && field.is_output === true) {
        accept_class = ".inputs .inner-field";
      }
      $(".inner-field", $field).droppable({
        accept: accept_class,
        activeClass: "ui-state-active",
        hoverClass: "ui-state-hover",
        drop: function(event, ui) {
          var field2, origin;
          origin = $(ui.draggable).parent();
          field2 = origin.data("object");
          return self.context.injector.instanciate(ThreeNodes.NodeConnection, field, field2);
        }
      });
      return this;
    }
  });
  return ThreeNodes.NodeFieldRackView;
});