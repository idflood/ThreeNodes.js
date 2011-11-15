var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min"], function($, _, Backbone) {
  return ThreeNodes.AppSidebar = (function() {
    function AppSidebar() {
      this.init_sidebar_tab_new_node = __bind(this.init_sidebar_tab_new_node, this);
      this.init_sidebar_search = __bind(this.init_sidebar_search, this);
      this.init_sidebar_toggle = __bind(this.init_sidebar_toggle, this);
      this.init_sidebar_tabs = __bind(this.init_sidebar_tabs, this);
      this.init_sidebar_tab_system = __bind(this.init_sidebar_tab_system, this);
      this.onRegister = __bind(this.onRegister, this);      _.extend(this, Backbone.Events);
    }
    AppSidebar.prototype.onRegister = function() {
      this.init_sidebar_tab_new_node();
      this.init_sidebar_search();
      this.init_sidebar_toggle();
      this.init_sidebar_tabs();
      return this.init_sidebar_tab_system();
    };
    AppSidebar.prototype.init_sidebar_tab_system = function() {
      var self;
      self = this;
      $(".new_file").click(function(e) {
        e.preventDefault();
        return self.context.commandMap.execute("ClearWorkspaceCommand");
      });
      $(".open_file").click(function(e) {
        e.preventDefault();
        return $("#main_file_input_open").click();
      });
      $(".save_file").click(function(e) {
        e.preventDefault();
        return self.context.commandMap.execute("SaveFileCommand");
      });
      $("#main_file_input_open").change(function(e) {
        return self.context.commandMap.execute("LoadLocalFileCommand", e);
      });
      return $(".rebuild_shaders").click(function(e) {
        e.preventDefault();
        self.trigger("rebuild_all_shaders");
        return false;
      });
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
    AppSidebar.prototype.init_sidebar_search = function() {
      var toggle_class;
      toggle_class = "hidden-element";
      return $("#node_filter").keyup(function(e) {
        var v;
        v = $.trim($("#node_filter").val()).toLowerCase();
        if (v === "") {
          return $("#tab-new li").removeClass(toggle_class);
        } else {
          return $("#tab-new li").each(function(el) {
            var has_visible_items, s, ul;
            s = $.trim($("a", this).html()).toLowerCase();
            if (s.indexOf(v) !== -1) {
              return $(this).removeClass(toggle_class);
            } else {
              $(this).addClass(toggle_class);
              ul = $(this).parent();
              has_visible_items = false;
              ul.children().each(function() {
                if ($(this).hasClass(toggle_class) === false) {
                  return has_visible_items = true;
                }
              });
              if (has_visible_items === false) {
                return ul.prev().addClass(toggle_class);
              } else {
                return ul.prev().removeClass(toggle_class);
              }
            }
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
        start: function(event, ui) {
          return $("#sidebar").hide();
        }
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
          dy = ui.position.top - 10 + $("#container-wrapper").scrollTop();
          self.context.commandMap.execute("CreateNodeCommand", nodename, nodetype, dx, dy);
          return $("#sidebar").show();
        }
      });
    };
    return AppSidebar;
  })();
});