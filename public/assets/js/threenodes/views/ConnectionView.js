var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  return ThreeNodes.ConnectionView = (function() {
    __extends(ConnectionView, Backbone.View);
    function ConnectionView() {
      ConnectionView.__super__.constructor.apply(this, arguments);
    }
    ConnectionView.prototype.onRegister = function() {
      if (this.model.is_valid) {
        this.line = false;
        this.model.bind("render", __bind(function() {
          return this.render();
        }, this));
        return this.render();
      }
    };
    ConnectionView.prototype.initialize = function() {
      this.container = $("#graph");
      this.model.bind('change', this.render);
      this.render;
      return this;
    };
    ConnectionView.prototype.remove = function() {
      if (ThreeNodes.svg && this.line) {
        this.line.remove();
        return this.line = false;
      }
    };
    ConnectionView.prototype.render = function() {
      var color;
      if (ThreeNodes.svg) {
        if (this.line && this.line.attrs) {
          this.line.attr({
            path: this.get_path()
          });
        } else {
          color = "#555";
          this.line = ThreeNodes.svg.path(this.get_path()).attr({
            stroke: color,
            fill: "none"
          });
        }
      }
      return this;
    };
    ConnectionView.prototype.get_field_position = function(field) {
      var diff, o1;
      o1 = $("#fid-" + field.fid + " .inner-field span").offset();
      diff = 3;
      o1.top += diff;
      o1.left += diff;
      if (o1.left === diff && o1.top === diff) {
        o1 = $("#nid-" + (field.node.model.get('nid'))).offset();
        o1.top += $("#nid-" + (field.node.model.get('nid'))).outerHeight() / 2 + 3;
        if (field.is_output === true) {
          o1.left += $("#nid-" + (field.node.model.get('nid'))).outerWidth() - 2;
        }
      }
      return o1;
    };
    ConnectionView.prototype.get_path = function() {
      var container_y, diffx, diffy, f1, f2, min_diff, ofx, ofy, x1, x2, x3, x4, y1, y2, y3, y4;
      container_y = parseFloat($("#container-wrapper").css("top"));
      f1 = this.get_field_position(this.model.from_field);
      f2 = this.get_field_position(this.model.to_field);
      ofx = $("#container-wrapper").scrollLeft();
      ofy = $("#container-wrapper").scrollTop() - container_y;
      x1 = f1.left + ofx;
      y1 = f1.top + ofy;
      x4 = f2.left + ofx;
      y4 = f2.top + ofy;
      min_diff = 42;
      diffx = Math.max(min_diff, x4 - x1);
      diffy = Math.max(min_diff, y4 - y1);
      x2 = x1 + diffx * 0.5;
      y2 = y1;
      x3 = x4 - diffx * 0.5;
      y3 = y4;
      return ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    };
    return ConnectionView;
  })();
});