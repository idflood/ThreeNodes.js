var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "text!templates/field_context_menu.tmpl.html", "text!templates/node_context_menu.tmpl.html", "order!threenodes/core/WebglBase", "order!libs/jquery.tmpl.min", 'order!threenodes/ui/AppSidebar', 'order!threenodes/ui/AppMenuBar', "order!libs/three-extras/js/RequestAnimationFrame", "order!libs/raphael-min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", "order!libs/jquery.transform2d", "order!libs/jquery-scrollview/jquery.scrollview"], function($, _, Backbone, _view_field_context_menu, _view_node_context_menu) {
  "use strict";  return ThreeNodes.AppUI = (function() {
    function AppUI() {
      this.animate = __bind(this.animate, this);
      this.on_ui_window_resize = __bind(this.on_ui_window_resize, this);
      this.render = __bind(this.render, this);
      this.show_application = __bind(this.show_application, this);
      this.add_window_resize_handler = __bind(this.add_window_resize_handler, this);
      this.init_context_menus = __bind(this.init_context_menus, this);
      this.init_timeline_switcher = __bind(this.init_timeline_switcher, this);
      this.init_resize_slider = __bind(this.init_resize_slider, this);
      this.init_bottom_toolbox = __bind(this.init_bottom_toolbox, this);
      this.init_display_mode_switch = __bind(this.init_display_mode_switch, this);
      this.switch_display_mode = __bind(this.switch_display_mode, this);
      this.scrollTo = __bind(this.scrollTo, this);
      this.stropgrab = __bind(this.stropgrab, this);
      this.onRegister = __bind(this.onRegister, this);      _.extend(this, Backbone.Events);
    }
    AppUI.prototype.onRegister = function() {
      var injector, is_from_target;
      injector = this.context.injector;
      this.context.commandMap.execute("InitUrlHandler");
      this.player_mode = this.context.player_mode;
      injector.mapSingleton("ThreeNodes.AppSidebar", ThreeNodes.AppSidebar);
      injector.mapSingleton("ThreeNodes.AppMenuBar", ThreeNodes.AppMenuBar);
      this.webgl = injector.get("ThreeNodes.WebglBase");
      this.svg = Raphael("graph", 4000, 4000);
      ThreeNodes.svg = this.svg;
      ThreeNodes.svg_connecting_line = this.svg.path("M0 -20 L0 -20").attr({
        stroke: "#fff",
        'stroke-dasharray': "-",
        fill: "none",
        opacity: 0
      });
      this.sidebar = injector.get("ThreeNodes.AppSidebar");
      this.menubar = injector.get("ThreeNodes.AppMenuBar");
      this.timeline = injector.get("AppTimeline");
      this.add_window_resize_handler();
      this.init_context_menus();
      this.init_bottom_toolbox();
      this.init_display_mode_switch();
      this.animate();
      this.show_application();
      this.is_grabbing = false;
      this.scroll_target = $("#container-wrapper");
      is_from_target = function(e) {
        if (e.target === $("#graph svg")[0]) {
          return true;
        }
        return false;
      };
      this.scroll_target.bind("contextmenu", function(e) {
        return false;
      });
      this.scroll_target.mousedown(__bind(function(e) {
        if (is_from_target(e)) {
          if (e.which === 2 || e.which === 3) {
            this.is_grabbing = true;
            this.xp = e.pageX;
            this.yp = e.pageY;
            return false;
          }
        }
      }, this));
      this.scroll_target.mousemove(__bind(function(e) {
        if (is_from_target(e)) {
          if (this.is_grabbing === true) {
            this.scrollTo(this.xp - e.pageX, this.yp - e.pageY);
            this.xp = e.pageX;
            return this.yp = e.pageY;
          }
        }
      }, this));
      this.scroll_target.mouseout(__bind(function() {
        return this.stropgrab();
      }, this));
      this.scroll_target.mouseup(__bind(function(e) {
        if (is_from_target(e)) {
          if (e.which === 2 || e.which === 3) {
            return this.stropgrab();
          }
        }
      }, this));
      return true;
    };
    AppUI.prototype.stropgrab = function() {
      return this.is_grabbing = false;
    };
    AppUI.prototype.scrollTo = function(dx, dy) {
      var x, y;
      x = this.scroll_target.scrollLeft() + dx;
      y = this.scroll_target.scrollTop() + dy;
      return this.scroll_target.scrollLeft(x).scrollTop(y);
    };
    AppUI.prototype.switch_display_mode = function() {
      $("body").toggleClass("player-mode");
      $("body").toggleClass("editor-mode");
      this.context.player_mode = $("body").hasClass("player-mode");
      if (this.context.player_mode === false) {
        this.context.injector.get("NodeGraph").renderAllConnections();
      }
      return this;
    };
    AppUI.prototype.init_display_mode_switch = function() {
      $("body").append("<div id='display-mode-switch'>switch mode</div>");
      return $("#display-mode-switch").click(__bind(function(e) {
        return this.switch_display_mode();
      }, this));
    };
    AppUI.prototype.init_bottom_toolbox = function() {
      var $container;
      $("body").append("<div id='bottom-toolbox'></div>");
      $container = $("#bottom-toolbox");
      this.init_resize_slider($container);
      return this.init_timeline_switcher($container);
    };
    AppUI.prototype.init_resize_slider = function($container) {
      var scale_graph;
      $container.append("<div id='zoom-slider'></div>");
      scale_graph = function(val) {
        var factor;
        factor = val / 100;
        return $("#container").css('transform', "scale(" + factor + ", " + factor + ")");
      };
      return $("#zoom-slider").slider({
        min: 25,
        step: 25,
        value: 100,
        change: function(event, ui) {
          return scale_graph(ui.value);
        },
        slide: function(event, ui) {
          return scale_graph(ui.value);
        }
      });
    };
    AppUI.prototype.init_timeline_switcher = function($container) {
      $container.append("<div id='timeline-switcher'><a href='#'>Toggle timeline</a></div>");
      return $("#timeline-switcher a").click(__bind(function(e) {
        e.preventDefault();
        $("body").toggleClass("hidden-timeline");
        return this.on_ui_window_resize();
      }, this));
    };
    AppUI.prototype.init_context_menus = function() {
      var menu_field_menu, node_menu;
      menu_field_menu = $.tmpl(_view_field_context_menu, {});
      $("body").append(menu_field_menu);
      node_menu = $.tmpl(_view_node_context_menu, {});
      return $("body").append(node_menu);
    };
    AppUI.prototype.add_window_resize_handler = function() {
      $(window).resize(this.on_ui_window_resize);
      return this.on_ui_window_resize();
    };
    AppUI.prototype.show_application = function() {
      var delay_intro, nodegraph;
      delay_intro = 500;
      $("body > header").delay(delay_intro).hide();
      $("#sidebar").delay(delay_intro).show();
      $("#container-wrapper").delay(delay_intro).show();
      $("#sidebar-toggle").delay(delay_intro).show();
      nodegraph = this.context.injector.get("NodeGraph");
      return nodegraph.renderAllConnections();
    };
    AppUI.prototype.render = function() {
      if (this.timeline) {
        this.timeline.update();
      }
      return this.trigger("render");
    };
    AppUI.prototype.on_ui_window_resize = function() {
      var h, hidden_timeline, timelinesize, w;
      hidden_timeline = $("body").hasClass("hidden-timeline");
      w = $(window).width();
      h = $(window).height();
      timelinesize = 203;
      if (hidden_timeline) {
        timelinesize = 30;
      }
      $("#container-wrapper").css({
        width: w,
        height: h - 25 - timelinesize
      });
      return $("#sidebar").css("height", h - 25);
    };
    AppUI.prototype.animate = function() {
      this.render();
      return requestAnimationFrame(this.animate);
    };
    return AppUI;
  })();
});