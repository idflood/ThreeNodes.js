var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", 'order!threenodes/views/NodeFieldRackView', "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";
  /* Node View
  */  ThreeNodes.NodeView = (function(_super) {

    __extends(NodeView, _super);

    function NodeView() {
      this.remove = __bind(this.remove, this);
      this.compute_node_position = __bind(this.compute_node_position, this);
      this.render_connections = __bind(this.render_connections, this);
      this.highlighAnimations = __bind(this.highlighAnimations, this);
      this.render = __bind(this.render, this);
      this.postInit = __bind(this.postInit, this);
      NodeView.__super__.constructor.apply(this, arguments);
    }

    NodeView.template = _view_node_template;

    NodeView.prototype.initialize = function() {
      var _this = this;
      this.make_draggable();
      this.init_el_click();
      this.init_title_click();
      this.rack_view = new ThreeNodes.NodeFieldRackView({
        node: this.model,
        collection: this.model.rack,
        el: $(".options", this.el),
        node_el: this.$el
      });
      this.model.bind('change', this.render);
      this.model.bind('postInit', this.postInit);
      this.model.bind('remove', function() {
        return _this.remove();
      });
      this.model.bind("node:computePosition", this.compute_node_position);
      this.model.bind("node:renderConnections", this.render_connections);
      this.model.bind("node:showAnimations", this.highlighAnimations);
      this.render();
      this.model.post_init();
      return this;
    };

    NodeView.prototype.postInit = function() {
      this.$el.data("object", this.model);
      return this.init_context_menu();
    };

    NodeView.prototype.render = function() {
      this.$el.css({
        left: parseInt(this.model.get("x")),
        top: parseInt(this.model.get("y"))
      });
      $(".head span", this.$el).text(this.model.get("name"));
      $(".head span", this.$el).show();
      return this;
    };

    NodeView.prototype.init_context_menu = function() {
      $(".field", this.el).contextMenu({
        menu: "field-context-menu"
      }, function(action, el, pos) {
        var field;
        if (action === "remove_connection") {
          field = $(el).data("object");
          return field.remove_connections();
        }
      });
      return this;
    };

    NodeView.prototype.highlighAnimations = function() {
      var $target, nodeAnimation, propTrack, _i, _len, _ref;
      nodeAnimation = false;
      _ref = this.model.anim.objectTrack.propertyTracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        propTrack = _ref[_i];
        $target = $('.inputs .field-' + propTrack.name, this.$el);
        if (propTrack.anims.length > 0) {
          $target.addClass("has-animation");
          nodeAnimation = true;
        } else {
          $target.removeClass("has-animation");
        }
      }
      if (nodeAnimation === true) {
        this.$el.addClass("node-has-animation");
      } else {
        this.$el.removeClass("node-has-animation");
      }
      return true;
    };

    NodeView.prototype.render_connections = function() {
      return this.model.rack.renderConnections();
    };

    NodeView.prototype.compute_node_position = function() {
      var offset, pos;
      pos = $(this.el).position();
      offset = $("#container-wrapper").offset();
      return this.model.setPosition(pos.left + $("#container-wrapper").scrollLeft(), pos.top + $("#container-wrapper").scrollTop());
    };

    NodeView.prototype.remove = function() {
      $(".field", this.el).destroyContextMenu();
      $(this.el).draggable("destroy");
      $(this.el).unbind();
      this.undelegateEvents();
      this.rack_view.remove();
      this.rack_view = null;
      return NodeView.__super__.remove.apply(this, arguments);
    };

    NodeView.prototype.init_el_click = function() {
      var self;
      self = this;
      $(this.el).click(function(e) {
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
        return self.model.rack.render_sidebar();
      });
      return this;
    };

    NodeView.prototype.init_title_click = function() {
      var self;
      self = this;
      $(".head span", this.el).dblclick(function(e) {
        var $input, apply_input_result, prev;
        prev = $(this).html();
        $(".head", self.el).append("<input type='text' />");
        $(this).hide();
        $input = $(".head input", self.el);
        $input.val(prev);
        apply_input_result = function() {
          self.model.setName($input.val());
          return $input.remove();
        };
        $input.blur(function(e) {
          return apply_input_result();
        });
        $("#graph").click(function(e) {
          return apply_input_result();
        });
        return $input.keydown(function(e) {
          if (e.keyCode === 13) return apply_input_result();
        });
      });
      return this;
    };

    NodeView.prototype.make_draggable = function() {
      var self;
      self = this;
      $(this.el).draggable({
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
            el.data("object").trigger("node:computePosition");
            return el.data("object").trigger("node:renderConnections");
          });
          return self.render_connections();
        },
        stop: function() {
          ThreeNodes.selected_nodes.not(this).each(function() {
            var el;
            el = $(this).data("object");
            return el.trigger("node:renderConnections");
          });
          self.compute_node_position();
          return self.render_connections();
        }
      });
      return this;
    };

    return NodeView;

  })(Backbone.View);
  return ThreeNodes.NodeView;
});
