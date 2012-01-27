var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.NodeView = Backbone.View.extend({
    initialize: function() {
      return true;
    },
    onRegister: function() {
      $(this.el).css({
        left: this.options.x,
        top: this.options.y
      });
      this.make_draggable();
      this.init_el_click();
      this.init_title_click();
      return this.make_selectable();
    },
    init_context_menu: function() {
      return $(".field", this.el).contextMenu({
        menu: "field-context-menu"
      }, function(action, el, pos) {
        var field;
        if (action === "remove_connection") {
          field = $(el).data("object");
          return field.remove_connections();
        }
      });
    },
    render_connections: function() {
      return this.options.rack.render_connections();
    },
    compute_node_position: function() {
      var pos;
      pos = $(this.el).position();
      this.options.x = pos.left;
      return this.options.y = pos.top;
    },
    init_el_click: function() {
      var self;
      self = this;
      return $(this.el).click(function(e) {
        var selectable;
        if (e.metaKey === false) {
          $(".node").removeClass("ui-selected");
          $(this).addClass("ui-selecting");
        } else {
          if ($(this).hasClass("ui-selected")) {
            $(this).removeClass("ui-selected");
          } else {
            $(this).addClass("ui-selecting");
          }
        }
        selectable = $("#container").data("selectable");
        selectable.refresh();
        selectable._mouseStop(null);
        return self.options.rack.render_sidebar();
      });
    },
    init_title_click: function() {
      var self;
      self = this;
      return $(".head span", this.el).dblclick(function(e) {
        var $input, apply_input_result, prev;
        prev = $(this).html();
        $(".head", self.el).append("<input type='text' />");
        $(this).hide();
        $input = $(".head input", self.el);
        $input.val(prev);
        apply_input_result = function() {
          $(".head span", self.el).html($input.val()).show();
          self.options.name = $input.val();
          return $input.remove();
        };
        $input.blur(function(e) {
          return apply_input_result();
        });
        $("#graph").click(function(e) {
          return apply_input_result();
        });
        return $input.keydown(function(e) {
          if (e.keyCode === 13) {
            return apply_input_result();
          }
        });
      });
    },
    make_draggable: function() {
      var self;
      self = this;
      return $(this.el).draggable({
        start: function(ev, ui) {
          if ($(this).hasClass("ui-selected")) {
            ThreeNodes.selected_nodes = $(".ui-selected").each(function() {
              return $(this).data("offset", $(this).offset());
            });
          } else {
            ThreeNodes.selected_nodes = $([]);
            $(".node").removeClass("ui-selected");
          }
          return ThreeNodes.nodes_offset = $(this).offset();
        },
        drag: function(ev, ui) {
          var dl, dt;
          dt = ui.position.top - ThreeNodes.nodes_offset.top;
          dl = ui.position.left - ThreeNodes.nodes_offset.left;
          ThreeNodes.selected_nodes.not(this).each(function() {
            var dx, dy, el, offset;
            el = $(this);
            offset = el.data("offset");
            dx = offset.top + dt;
            dy = offset.left + dl;
            el.css({
              top: dx,
              left: dy
            });
            el.data("object").view.render_connections();
            return el.data("object").view.compute_node_position();
          });
          return self.render_connections();
        },
        stop: function() {
          ThreeNodes.selected_nodes.not(this).each(function() {
            var el;
            el = $(this).data("object");
            return el.view.render_connections();
          });
          self.compute_node_position();
          return self.render_connections();
        }
      });
    },
    make_selectable: function() {
      var self;
      self = this;
      return $("#container").selectable({
        filter: ".node",
        stop: __bind(function(event, ui) {
          var $selected, nodes;
          $selected = $(".node.ui-selected");
          nodes = [];
          $selected.each(function() {
            var ob;
            ob = $(this).data("object");
            ob.anim.objectTrack.name = $(".head span", ob.main_view).html();
            return nodes.push(ob.anim);
          });
          return self.options.apptimeline.timeline.selectAnims(nodes);
        }, this)
      });
    }
  });
  return ThreeNodes.NodeView;
});