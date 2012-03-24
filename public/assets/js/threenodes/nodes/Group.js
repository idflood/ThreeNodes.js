var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/utils/Utils', 'order!threenodes/models/GroupDefinition'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.nodes.Group = (function(_super) {

    __extends(Group, _super);

    function Group() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.set_fields = __bind(this.set_fields, this);
      this.initialize = __bind(this.initialize, this);
      Group.__super__.constructor.apply(this, arguments);
    }

    Group.node_name = 'Group';

    Group.group_name = false;

    Group.prototype.initialize = function(options) {
      var connection, n, node, _i, _j, _len, _len2, _ref, _ref2, _results;
      Group.__super__.initialize.apply(this, arguments);
      this.auto_evaluate = true;
      this.definition = options.definition;
      this.subgraph = new ThreeNodes.NodeGraph([], ThreeNodes.settings.testing_mode);
      _ref = this.definition.get("nodes");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        n = this.subgraph.create_node(node);
        n.post_init();
      }
      _ref2 = this.definition.get("connections");
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        connection = _ref2[_j];
        _results.push(this.subgraph.createConnectionFromObject(connection));
      }
      return _results;
    };

    Group.prototype.set_fields = function() {
      this.rack.createNodesProxyFields(this.subgraph.models);
      return this;
    };

    Group.prototype.remove = function() {
      if (this.subgraph) {
        this.subgraph.removeAll();
        delete this.subgraph;
      }
      delete this.definition;
      return Group.__super__.remove.apply(this, arguments);
    };

    Group.prototype.compute = function() {
      if (!this.subgraph) return false;
      this.subgraph.render();
      return this;
    };

    return Group;

  })(ThreeNodes.NodeBase);
});
