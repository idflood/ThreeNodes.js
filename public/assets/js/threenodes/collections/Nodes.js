var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/views/NodeView', 'order!threenodes/nodes/Base', 'order!threenodes/nodes/Conditional', 'order!threenodes/nodes/Geometry', 'order!threenodes/nodes/Lights', 'order!threenodes/nodes/Materials', 'order!threenodes/nodes/Math', 'order!threenodes/nodes/PostProcessing', 'order!threenodes/nodes/Three', 'order!threenodes/nodes/Utils', 'order!threenodes/nodes/Spread', 'order!threenodes/nodes/Particle', 'order!threenodes/nodes/Group', 'order!threenodes/collections/Connections'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.NodeGraph = (function(_super) {

    __extends(NodeGraph, _super);

    function NodeGraph() {
      this.stopSound = __bind(this.stopSound, this);
      this.startSound = __bind(this.startSound, this);
      this.showNodesAnimation = __bind(this.showNodesAnimation, this);
      this.getNodeByNid = __bind(this.getNodeByNid, this);
      this.renderAllConnections = __bind(this.renderAllConnections, this);
      this.createConnectionFromObject = __bind(this.createConnectionFromObject, this);
      this.render = __bind(this.render, this);
      this.create_node = __bind(this.create_node, this);
      this.bindTimelineEvents = __bind(this.bindTimelineEvents, this);
      this.clearWorkspace = __bind(this.clearWorkspace, this);
      this.initialize = __bind(this.initialize, this);
      NodeGraph.__super__.constructor.apply(this, arguments);
    }

    NodeGraph.prototype.initialize = function(models, options) {
      var self,
        _this = this;
      this.connections = new ThreeNodes.ConnectionsCollection();
      self = this;
      this.materials = [];
      if (options.is_test === false) {
        this.connections.bind("add", function(connection) {
          var view;
          view = new ThreeNodes.ConnectionView({
            model: connection
          });
          return self.trigger("nodeslist:rebuild", self);
        });
      }
      this.bind("remove", function(node) {
        var indx;
        indx = _this.materials.indexOf(node);
        if (indx !== -1) _this.materials.splice(indx, 1);
        return self.trigger("nodeslist:rebuild", self);
      });
      this.bind("RebuildAllShaders", function() {
        var node, _i, _len, _ref, _results;
        _ref = _this.materials;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(node.rebuildShader());
        }
        return _results;
      });
      this.connections.bind("remove", function(connection) {
        return self.trigger("nodeslist:rebuild", self);
      });
      this.bind("add", function(node) {
        var $tmpl, template, tmpl, view;
        template = ThreeNodes.NodeView.template;
        tmpl = _.template(template, node);
        $tmpl = $(tmpl).appendTo("#container");
        view = new ThreeNodes.NodeView({
          model: node,
          el: $tmpl
        });
        if (node.is_material && node.is_material === true) {
          this.materials.push(node);
        }
        return self.trigger("nodeslist:rebuild", self);
      });
      return this.bind("createConnection", function(field1, field2) {
        return _this.connections.create({
          from_field: field1,
          to_field: field2
        });
      });
    };

    NodeGraph.prototype.clearWorkspace = function() {
      this.removeAllConnections();
      this.removeAll();
      $("#webgl-window canvas").remove();
      this.materials = [];
      return this;
    };

    NodeGraph.prototype.bindTimelineEvents = function(timeline) {
      if (this.timeline) {
        this.timeline.off("trackRebuild", this.showNodesAnimation);
        this.timeline.off("startSound", this.startSound);
        this.timeline.off("stopSound", this.stopSound);
      }
      console.log("binding timeline");
      this.timeline = timeline;
      this.timeline.on("trackRebuild", this.showNodesAnimation);
      this.timeline.on("startSound", this.startSound);
      return this.timeline.on("stopSound", this.stopSound);
    };

    NodeGraph.prototype.create_node = function(options) {
      var n, opt;
      opt = options;
      if ($.type(opt) === "string") {
        opt = {
          type: opt
        };
      }
      opt.timeline = this.timeline;
      if (!ThreeNodes.nodes[opt.type]) {
        console.error("Node type doesn't exists: " + opt.type);
      }
      n = new ThreeNodes.nodes[opt.type](opt);
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
          node.compute();
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
      from_node = this.getNodeByNid(connection.from_node.toString());
      from = from_node.rack.node_fields.outputs[connection.from.toString()];
      to_node = this.getNodeByNid(connection.to_node.toString());
      to = to_node.rack.node_fields.inputs[connection.to.toString()];
      if (!from || !to) {
        tmp = from_node;
        from_node = to_node;
        to_node = tmp;
        from = from_node.rack.node_fields.outputs[connection.to.toString()];
        to = to_node.rack.node_fields.inputs[connection.from.toString()];
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

    NodeGraph.prototype.getNodeByNid = function(nid) {
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

    NodeGraph.prototype.removeAll = function() {
      var models;
      $("#tab-attribute").html("");
      models = this.models.concat();
      _.invoke(models, "remove");
      this.reset([]);
      return true;
    };

    NodeGraph.prototype.removeAllConnections = function() {
      return this.connections.removeAll();
    };

    return NodeGraph;

  })(Backbone.Collection);
});
