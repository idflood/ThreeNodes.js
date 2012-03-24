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
      var name, node, proxyfield, subfield, _i, _len, _ref, _ref2, _ref3;
      if (!this.subgraph) return false;
      console.log("up");
      _ref = this.rack.node_fields.inputs;
      for (name in _ref) {
        proxyfield = _ref[name];
        console.log(proxyfield);
        if (proxyfield.subfield) {
          proxyfield.subfield.setValue(proxyfield.attributes.value);
        }
      }
      this.subgraph.render();
      _ref2 = this.subgraph.models;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        node = _ref2[_i];
        _ref3 = node.rack.node_fields.outputs;
        for (name in _ref3) {
          subfield = _ref3[name];
          if (subfield.proxy) subfield.proxy.setValue(subfield.attributes.value);
        }
      }
      return this;
    };

    return Group;

  })(ThreeNodes.NodeBase);
});
