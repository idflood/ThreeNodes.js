var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "order!libs/tree.jquery"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.TreeView = (function(_super) {

    __extends(TreeView, _super);

    function TreeView() {
      this.render = __bind(this.render, this);
      TreeView.__super__.constructor.apply(this, arguments);
    }

    TreeView.prototype.initialize = function(options) {
      TreeView.__super__.initialize.apply(this, arguments);
      return this.timeoutId = false;
    };

    TreeView.prototype.render = function(nodelist) {
      var data, nid, node, renderNode, terminalNodes, _i, _len, _ref,
        _this = this;
      if (this.$el.data("tree")) this.$el.tree("destroy");
      if (nodelist === false) {
        this.$el.html("");
        return this;
      }
      data = [];
      terminalNodes = {};
      _ref = nodelist.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.has_out_connection() === false) {
          terminalNodes[node.attributes["nid"]] = node;
        }
      }
      renderNode = function(node) {
        var result, upnode, upstreamNodes, _j, _len2;
        result = {};
        result.label = node.get("name");
        result.model = node;
        result.children = [];
        upstreamNodes = node.getUpstreamNodes();
        for (_j = 0, _len2 = upstreamNodes.length; _j < _len2; _j++) {
          upnode = upstreamNodes[_j];
          result.children.push(renderNode(upnode));
        }
        return result;
      };
      for (nid in terminalNodes) {
        data.push(renderNode(terminalNodes[nid]));
      }
      this.$el.tree({
        data: data,
        autoOpen: true,
        selectable: true
      });
      this.$el.bind("tree.click", function(e) {
        var selectable;
        node = e.node.model;
        $(".node").removeClass("ui-selected");
        $("#nid-" + node.get("nid")).addClass("ui-selected");
        selectable = $("#container").data("selectable");
        selectable.refresh();
        return selectable._mouseStop(null);
      });
      return this;
    };

    return TreeView;

  })(Backbone.View);
});
