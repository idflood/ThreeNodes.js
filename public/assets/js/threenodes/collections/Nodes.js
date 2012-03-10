var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/views/NodeView', 'order!threenodes/nodes/Base', 'order!threenodes/nodes/Conditional', 'order!threenodes/nodes/Geometry', 'order!threenodes/nodes/Lights', 'order!threenodes/nodes/Materials', 'order!threenodes/nodes/Math', 'order!threenodes/nodes/PostProcessing', 'order!threenodes/nodes/Three', 'order!threenodes/nodes/Utils', 'order!threenodes/nodes/Spread', 'order!threenodes/nodes/Particle', 'order!threenodes/collections/Connections'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.NodeGraph = (function(_super) {

    __extends(NodeGraph, _super);

    function NodeGraph() {
      this.stopSound = __bind(this.stopSound, this);
      this.startSound = __bind(this.startSound, this);
      this.showNodesAnimation = __bind(this.showNodesAnimation, this);
      this.get_node = __bind(this.get_node, this);
      this.renderAllConnections = __bind(this.renderAllConnections, this);
      this.createConnectionFromObject = __bind(this.createConnectionFromObject, this);
      this.render = __bind(this.render, this);
      this.create_node = __bind(this.create_node, this);
      this.clearWorkspace = __bind(this.clearWorkspace, this);
      this.initialize = __bind(this.initialize, this);
      NodeGraph.__super__.constructor.apply(this, arguments);
    }

    NodeGraph.prototype.initialize = function(models, options) {
      var _this = this;
      this.types = false;
      this.connections = new ThreeNodes.ConnectionsCollection();
      if (options.is_test === false) {
        this.connections.bind("add", function(connection) {
          var view;
          return view = new ThreeNodes.ConnectionView({
            model: connection
          });
        });
      }
      this.bind("add", function(node) {
        var $tmpl, template, tmpl, view;
        template = ThreeNodes.NodeView.template;
        tmpl = _.template(template, node);
        $tmpl = $(tmpl).appendTo("#container");
        view = new ThreeNodes.NodeView({
          model: node,
          el: $tmpl
        });
        return node.view = view;
      });
      this.bind("createConnection", function(field1, field2) {
        return _this.connections.create({
          from_field: field1,
          to_field: field2
        });
      });
      ThreeNodes.events.on("RmoveSelectedNodes", this.removeSelectedNodes);
      ThreeNodes.events.on("CreateNode", this.create_node);
      return ThreeNodes.events.on("ClearWorkspace", this.clearWorkspace);
    };

    NodeGraph.prototype.clearWorkspace = function() {
      this.remove_all_connections();
      this.remove_all_nodes();
      $("#webgl-window canvas").remove();
      return this;
    };

    NodeGraph.prototype.create_node = function(nodename, x, y, inXML, inJSON) {
      var n;
      if (inXML == null) inXML = false;
      if (inJSON == null) inJSON = false;
      if (!ThreeNodes.nodes[nodename]) {
        console.error("Node type doesn't exists: " + nodename);
      }
      n = new ThreeNodes.nodes[nodename]({
        x: x,
        y: y,
        timeline: this.timeline,
        inXML: inXML,
        inJSON: inJSON
      });
      n.load(inXML, inJSON);
      this.add(n);
      return n;
    };

    NodeGraph.prototype.render = function() {
      var evaluateSubGraph, invalidNodes, nid, node, terminalNodes, _i, _len, _ref;
      invalidNodes = {};
      terminalNodes = {};
      _ref = this.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.has_out_connection() === false || node.auto_evaluate || node.delays_output) {
          terminalNodes[node.attributes["nid"]] = node;
        }
        invalidNodes[node.attributes["nid"]] = node;
      }
      evaluateSubGraph = function(node) {
        var upnode, upstreamNodes, _j, _len2;
        upstreamNodes = node.getUpstreamNodes();
        for (_j = 0, _len2 = upstreamNodes.length; _j < _len2; _j++) {
          upnode = upstreamNodes[_j];
          if (invalidNodes[upnode.attributes["nid"]] && !upnode.delays_output) {
            evaluateSubGraph(upnode);
          }
        }
        if (node.dirty || node.auto_evaluate) {
          node.update();
          node.dirty = false;
          node.rack.setFieldInputUnchanged();
        }
        delete invalidNodes[node.attributes["nid"]];
        return true;
      };
      for (nid in terminalNodes) {
        if (invalidNodes[nid]) evaluateSubGraph(terminalNodes[nid]);
      }
      return true;
    };

    NodeGraph.prototype.createConnectionFromObject = function(connection) {
      var c, from, from_node, tmp, to, to_node;
      from_node = this.get_node(connection.from_node.toString());
      from = from_node.rack.node_fields_by_name.outputs[connection.from.toString()];
      to_node = this.get_node(connection.to_node.toString());
      to = to_node.rack.node_fields_by_name.inputs[connection.to.toString()];
      if (!from || !to) {
        tmp = from_node;
        from_node = to_node;
        to_node = tmp;
        from = from_node.rack.node_fields_by_name.outputs[connection.to.toString()];
        to = to_node.rack.node_fields_by_name.inputs[connection.from.toString()];
      }
      c = this.connections.create({
        from_field: from,
        to_field: to,
        cid: connection.id
      });
      return c;
    };

    NodeGraph.prototype.renderAllConnections = function() {
      return this.connections.render();
    };

    NodeGraph.prototype.removeSelectedNodes = function() {
      $(".node.ui-selected").each(function() {
        return $(this).data("object").remove();
      });
      return true;
    };

    NodeGraph.prototype.removeConnection = function(c) {
      return this.connections.remove(c);
    };

    NodeGraph.prototype.get_node = function(nid) {
      var node, _i, _len, _ref;
      _ref = this.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.get("nid").toString() === nid) return node;
      }
      return false;
    };

    NodeGraph.prototype.showNodesAnimation = function() {
      this.invoke("showNodeAnimation");
      return this;
    };

    NodeGraph.prototype.startSound = function(time) {
      this.each(function(node) {
        if (node.playSound instanceof Function) return node.playSound(time);
      });
      return this;
    };

    NodeGraph.prototype.stopSound = function() {
      this.each(function(node) {
        if (node.stopSound instanceof Function) return node.stopSound();
      });
      return this;
    };

    NodeGraph.prototype.remove_all_nodes = function() {
      var models;
      $("#tab-attribute").html("");
      models = this.models.concat();
      _.invoke(models, "remove");
      this.reset([]);
      return true;
    };

    NodeGraph.prototype.remove_all_connections = function() {
      return this.connections.removeAll();
    };

    return NodeGraph;

  })(Backbone.Collection);
});
