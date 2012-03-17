var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/views/TreeView'], function($, _, Backbone) {
  "use strict";
  /* Sidebar View
  */  return ThreeNodes.Sidebar = (function(_super) {

    __extends(Sidebar, _super);

    function Sidebar() {
      this.initNewNode = __bind(this.initNewNode, this);
      this.initSearch = __bind(this.initSearch, this);
      this.filter_list = __bind(this.filter_list, this);
      this.filter_list_item = __bind(this.filter_list_item, this);
      this.renderNodesAttributes = __bind(this.renderNodesAttributes, this);
      this.initTabs = __bind(this.initTabs, this);
      this.initTreeView = __bind(this.initTreeView, this);
      Sidebar.__super__.constructor.apply(this, arguments);
    }

    Sidebar.prototype.initialize = function() {
      Sidebar.__super__.initialize.apply(this, arguments);
      this.initNewNode();
      this.initSearch();
      this.initTabs();
      return this.initTreeView();
    };

    Sidebar.prototype.initTreeView = function() {
      this.treeview = new ThreeNodes.TreeView({
        el: $("#tab-list")
      });
      return this;
    };

    Sidebar.prototype.initTabs = function() {
      this.$el.tabs({
        fx: {
          opacity: 'toggle',
          duration: 100
        }
      });
      return this;
    };

    Sidebar.prototype.renderNodesAttributes = function(nodes) {
      var $target, f, node, _i, _len;
      $target = $("#tab-attribute");
      $target.html("");
      if (!nodes || nodes.length < 1) return this;
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        $target.append("<h2>" + (node.get('name')) + "</h2>");
        for (f in node.rack.node_fields.inputs) {
          node.rack.node_fields.inputs[f].render_sidebar();
        }
      }
      return this;
    };

    Sidebar.prototype.filter_list_item = function($item, value) {
      var s;
      s = $.trim($("a", $item).html()).toLowerCase();
      if (s.indexOf(value) === -1) {
        return $item.hide();
      } else {
        return $item.show();
      }
    };

    Sidebar.prototype.filter_list = function(ul, value) {
      var has_visible_items, self, ul_title;
      self = this;
      ul_title = ul.prev();
      has_visible_items = false;
      $("li", ul).each(function() {
        return self.filter_list_item($(this), value);
      });
      if ($("li:visible", ul).length === 0) {
        ul_title.hide();
      } else {
        ul_title.show();
      }
      return this;
    };

    Sidebar.prototype.initSearch = function() {
      var self;
      self = this;
      $("#node_filter").keyup(function(e) {
        var v;
        v = $.trim($("#node_filter").val()).toLowerCase();
        if (v === "") {
          return $("#tab-new li, #tab-new h3").show();
        } else {
          return $("#tab-new ul").each(function() {
            return self.filter_list($(this), v);
          });
        }
      });
      return this;
    };

    Sidebar.prototype.initNewNode = function() {
      var $container, group, group_name, node, nodes_by_group, result, self, _i, _len, _ref;
      self = this;
      $container = $("#tab-new");
      result = [];
      nodes_by_group = {};
      for (node in ThreeNodes.nodes) {
        group_name = ThreeNodes.nodes[node].group_name.replace(/\./g, "-");
        if (!nodes_by_group[group_name]) nodes_by_group[group_name] = [];
        nodes_by_group[group_name].push(node);
      }
      for (group in nodes_by_group) {
        $container.append("<h3>" + group + "</h3><ul id='nodetype-" + group + "'></ul>");
        _ref = nodes_by_group[group];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          $("#nodetype-" + group, $container).append("<li><a class='button' rel='" + node + "' href='#'>" + ThreeNodes.nodes[node].node_name + "</a></li>");
        }
      }
      $("a.button", $container).draggable({
        revert: "valid",
        opacity: 0.7,
        helper: "clone",
        revertDuration: 0,
        scroll: false,
        containment: "document"
      });
      $("#container").droppable({
        accept: "#tab-new a.button",
        activeClass: "ui-state-active",
        hoverClass: "ui-state-hover",
        drop: function(event, ui) {
          var dx, dy, nodename, offset;
          nodename = ui.draggable.attr("rel");
          offset = $("#container-wrapper").offset();
          dx = ui.position.left + $("#container-wrapper").scrollLeft() - offset.left - 10;
          dy = ui.position.top + $("#container-wrapper").scrollTop() - $("#sidebar").scrollTop() - offset.top;
          ThreeNodes.events.trigger("CreateNode", {
            type: nodename,
            x: dx,
            y: dy
          });
          return $("#sidebar").show();
        }
      });
      return this;
    };

    return Sidebar;

  })(Backbone.View);
});
