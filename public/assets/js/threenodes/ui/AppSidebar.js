var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/jquery.contextMenu"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.AppSidebar = (function() {
    function AppSidebar() {
      this.init_sidebar_tab_new_node = __bind(this.init_sidebar_tab_new_node, this);
      this.init_sidebar_search = __bind(this.init_sidebar_search, this);
      this.filter_list = __bind(this.filter_list, this);
      this.filter_list_item = __bind(this.filter_list_item, this);
      this.init_sidebar_toggle = __bind(this.init_sidebar_toggle, this);
      this.init_sidebar_tabs = __bind(this.init_sidebar_tabs, this);
      this.onRegister = __bind(this.onRegister, this);      _.extend(this, Backbone.Events);
    }
    AppSidebar.prototype.onRegister = function() {
      this.init_sidebar_tab_new_node();
      this.init_sidebar_search();
      this.init_sidebar_toggle();
      return this.init_sidebar_tabs();
    };
    AppSidebar.prototype.init_sidebar_tabs = function() {
      return $("#sidebar").tabs({
        fx: {
          opacity: 'toggle',
          duration: 100
        }
      });
    };
    AppSidebar.prototype.init_sidebar_toggle = function() {
      return $("#sidebar-toggle").click(function(e) {
        var $t, o;
        $t = $("#sidebar");
        o = 10;
        if ($t.position().left < -20) {
          $("#sidebar-toggle").removeClass("toggle-closed");
          $t.animate({
            left: 0
          }, {
            queue: false,
            duration: 140
          }, "swing");
          return $("#sidebar-toggle").animate({
            left: 220 + o
          }, {
            queue: false,
            duration: 80
          }, "swing");
        } else {
          $("#sidebar-toggle").addClass("toggle-closed");
          $t.animate({
            left: -220
          }, {
            queue: false,
            duration: 120
          }, "swing");
          return $("#sidebar-toggle").animate({
            left: o
          }, {
            queue: false,
            duration: 180
          }, "swing");
        }
      });
    };
    AppSidebar.prototype.filter_list_item = function($item, value) {
      var s;
      s = $.trim($("a", $item).html()).toLowerCase();
      if (s.indexOf(value) === -1) {
        return $item.hide();
      } else {
        return $item.show();
      }
    };
    AppSidebar.prototype.filter_list = function(ul, value) {
      var has_visible_items, self, ul_title;
      self = this;
      ul_title = ul.prev();
      has_visible_items = false;
      $("li", ul).each(function() {
        return self.filter_list_item($(this), value);
      });
      if ($("li:visible", ul).length === 0) {
        return ul_title.hide();
      } else {
        return ul_title.show();
      }
    };
    AppSidebar.prototype.init_sidebar_search = function() {
      var self;
      self = this;
      return $("#node_filter").keyup(function(e) {
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
    };
    AppSidebar.prototype.init_sidebar_tab_new_node = function() {
      var $container, group, group_name, node, nodes_by_group, result, self, _i, _len, _ref;
      self = this;
      $container = $("#tab-new");
      result = [];
      nodes_by_group = {};
      for (node in ThreeNodes.nodes) {
        group_name = ThreeNodes.nodes[node].group_name.replace(/\./g, "-");
        if (!nodes_by_group[group_name]) {
          nodes_by_group[group_name] = [];
        }
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
      return $("#container").droppable({
        accept: "#tab-new a.button",
        activeClass: "ui-state-active",
        hoverClass: "ui-state-hover",
        drop: function(event, ui) {
          var dx, dy, nodename;
          nodename = ui.draggable.attr("rel");
          dx = ui.position.left + $("#container-wrapper").scrollLeft() - 10;
          dy = ui.position.top - 10 + $("#container-wrapper").scrollTop() - $("#sidebar").scrollTop();
          self.context.commandMap.execute("CreateNodeCommand", nodename, dx, dy);
          return $("#sidebar").show();
        }
      });
    };
    return AppSidebar;
  })();
});