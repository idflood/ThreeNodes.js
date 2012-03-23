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
      var field, field_el, name, node, res, _i, _len, _ref, _ref2, _ref3, _results;
      _ref = this.subgraph.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.rack.hasUnconnectedInputs() === true) {
          res = $("<div class='subnodes fields-node-" + (node.get('nid')) + "'></div>");
          res.append("<h3>" + (node.get('name')) + "</h3>");
          console.log(node.rack.node_fields);
          _ref2 = node.rack.node_fields.inputs;
          for (name in _ref2) {
            field = _ref2[name];
            field_el = field.render_button();
            console.log("k");
            console.log(field_el);
            res.append(field_el);
          }
          this.rack.trigger("addCustomHtml", res, ".inputs");
        }
        if (node.rack.hasUnconnectedOutputs() === true) {
          res = $("<div class='subnodes fields-node-" + (node.get('nid')) + "'></div>");
          res.append("<h3>" + (node.get('name')) + "</h3>");
          _ref3 = node.rack.node_fields.outputs;
          for (name in _ref3) {
            field = _ref3[name];
            field_el = field.render_button();
            res.append(field_el);
          }
          _results.push(this.rack.trigger("addCustomHtml", res, ".outputs"));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
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
      if (this.subgraph) this.subgraph.render();
      return this;
    };

    return Group;

  })(ThreeNodes.NodeBase);
});
