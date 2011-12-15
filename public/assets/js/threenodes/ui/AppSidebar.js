var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min"], function($, _, Backbone) {
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
      var $container, node, nt, self;
      self = this;
      $container = $("#tab-new");
      for (nt in ThreeNodes.nodes.types) {
        $container.append("<h3>" + nt + "</h3><ul id='nodetype-" + nt + "'></ul>");
        for (node in ThreeNodes.nodes.types[nt]) {
          $("#nodetype-" + nt, $container).append("<li><a class='button' rel='" + nt + "' href='#'>" + (node.toString()) + "</a></li>");
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
          var dx, dy, nodename, nodetype;
          nodename = ui.draggable.attr("rel");
          nodetype = jQuery.trim(ui.draggable.html());
          dx = ui.position.left + $("#container-wrapper").scrollLeft() - 10;
          dy = ui.position.top - 10 + $("#container-wrapper").scrollTop() - $("#sidebar").scrollTop();
          self.context.commandMap.execute("CreateNodeCommand", nodename, nodetype, dx, dy);
          return $("#sidebar").show();
        }
      });
    };
    return AppSidebar;
  })();
});