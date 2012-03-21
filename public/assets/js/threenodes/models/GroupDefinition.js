var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['Underscore', 'Backbone', 'order!threenodes/utils/Utils'], function(_, Backbone) {
  "use strict";  return ThreeNodes.GroupDefinition = (function(_super) {

    __extends(GroupDefinition, _super);

    function GroupDefinition() {
      this.remove = __bind(this.remove, this);
      this.fromSelectedNodes = __bind(this.fromSelectedNodes, this);
      this.initialize = __bind(this.initialize, this);
      this.getUID = __bind(this.getUID, this);
      this.sync = __bind(this.sync, this);
      GroupDefinition.__super__.constructor.apply(this, arguments);
    }

    GroupDefinition.prototype.defaults = {
      "nodes": [],
      "connections": [],
      "name": "Group"
    };

    GroupDefinition.prototype.sync = function() {};

    GroupDefinition.prototype.getUID = function() {
      this.internal_uid += 1;
      return this.internal_uid;
    };

    GroupDefinition.prototype.initialize = function(options) {
      this.internal_uid = 0;
      if (options.fromSelectedNodes && options.fromSelectedNodes !== false) {
        return this.fromSelectedNodes(options.fromSelectedNodes);
      }
    };

    GroupDefinition.prototype.fromSelectedNodes = function(selected_nodes) {
      var already_exists, connection, data, field, indx1, indx2, internal_connections, node, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
      internal_connections = [];
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
            if (indx1 !== -1 && indx2 !== -1) {
              already_exists = internal_connections.indexOf(connection);
              if (already_exists === -1) internal_connections.push(connection);
            }
          }
        }
      }
      data = {
        nodes: jQuery.map(selected_nodes, function(n, i) {
          return n.toJSON();
        }),
        connections: jQuery.map(internal_connections, function(c, i) {
          return c.toJSON();
        })
      };
      return console.log(data);
    };

    GroupDefinition.prototype.remove = function() {
      return GroupDefinition.__super__.remove.apply(this, arguments);
    };

    GroupDefinition.prototype.toJSON = function() {
      var res;
      res = {
        name: this.get("name"),
        conncections: this.get("conncections"),
        nodes: this.get("nodes")
      };
      return res;
    };

    GroupDefinition.prototype.toCode = function() {
      var res;
      res = "";
      return res;
    };

    return GroupDefinition;

  })(Backbone.Model);
});
