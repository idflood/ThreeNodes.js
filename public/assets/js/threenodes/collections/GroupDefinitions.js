var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['Underscore', 'Backbone', 'order!threenodes/models/Connection', 'order!threenodes/views/ConnectionView'], function(_, Backbone) {
  "use strict";  return ThreeNodes.GroupDefinitions = (function(_super) {

    __extends(GroupDefinitions, _super);

    function GroupDefinitions() {
      this.removeAll = __bind(this.removeAll, this);
      this.groupSelectedNodes = __bind(this.groupSelectedNodes, this);
      this.create = __bind(this.create, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      GroupDefinitions.__super__.constructor.apply(this, arguments);
    }

    GroupDefinitions.prototype.model = ThreeNodes.GroupDefinition;

    GroupDefinitions.prototype.initialize = function() {
      var _this = this;
      return this.bind("group:removed", function(c) {
        return _this.remove(c);
      });
    };

    GroupDefinitions.prototype.render = function() {
      return this.each(function(c) {
        return c.render();
      });
    };

    GroupDefinitions.prototype.create = function(model, options) {
      if (!options) options = {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      this.add(model, options);
      return model;
    };

    GroupDefinitions.prototype.groupSelectedNodes = function() {
      var $selected, already_exists, connection, connection_description, dx, dy, external_connections, external_objects, field, group_def, indx1, indx2, max_x, max_y, min_x, min_y, model, node, selected_nodes, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2;
      min_x = 0;
      min_y = 0;
      max_x = 0;
      max_y = 0;
      $selected = $(".node.ui-selected");
      if ($selected.length < 1) return false;
      selected_nodes = [];
      $selected.each(function() {
        var node;
        node = $(this).data("object");
        min_x = Math.min(min_x, node.get("x"));
        max_x = Math.max(max_x, node.get("x"));
        min_y = Math.min(min_y, node.get("y"));
        max_y = Math.max(max_y, node.get("y"));
        return selected_nodes.push(node);
      });
      dx = (min_x + max_x) / 2;
      dy = (min_y + max_y) / 2;
      group_def = new ThreeNodes.GroupDefinition({
        fromSelectedNodes: selected_nodes
      });
      this.add(group_def);
      external_connections = [];
      external_objects = [];
      for (_i = 0, _len = selected_nodes.length; _i < _len; _i++) {
        node = selected_nodes[_i];
        _ref = node.rack.models;
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          field = _ref[_j];
          _ref2 = field.connections;
          for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
            connection = _ref2[_k];
            indx1 = selected_nodes.indexOf(connection.from_field.node);
            indx2 = selected_nodes.indexOf(connection.to_field.node);
            if (indx1 === -1 || indx2 === -1) {
              already_exists = external_connections.indexOf(connection);
              if (already_exists === -1) {
                external_connections.push(connection);
                connection_description = connection.toJSON();
                connection_description.to_subfield = indx1 === -1;
                external_objects.push(connection_description);
              }
            }
          }
        }
      }
      for (_l = 0, _len4 = selected_nodes.length; _l < _len4; _l++) {
        node = selected_nodes[_l];
        node.remove();
      }
      model = {
        type: "Group",
        definition: group_def,
        x: dx,
        y: dy
      };
      this.trigger("definition:created", model, external_objects);
      return this;
    };

    GroupDefinitions.prototype.removeAll = function() {
      return this.remove(this.models);
    };

    return GroupDefinitions;

  })(Backbone.Collection);
});
