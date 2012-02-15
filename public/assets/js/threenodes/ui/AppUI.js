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
      var injector, is_from_target,
        _this = this;
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
      this.on_ui_window_resize();
      this.is_grabbing = false;
      this.scroll_target = $("#container-wrapper");
      is_from_target = function(e) {
        if (e.target === $("#graph svg")[0]) return true;
        return false;
      };
      this.scroll_target.bind("contextmenu", function(e) {
        return false;
      });
      this.scroll_target.mousedown(function(e) {
        if (is_from_target(e)) {
          if (e.which === 2 || e.which === 3) {
            _this.is_grabbing = true;
            _this.xp = e.pageX;
            _this.yp = e.pageY;
            return false;
          }
        }
      });
      this.scroll_target.mousemove(function(e) {
        if (is_from_target(e)) {
          if (_this.is_grabbing === true) {
            _this.scrollTo(_this.xp - e.pageX, _this.yp - e.pageY);
            _this.xp = e.pageX;
            return _this.yp = e.pageY;
          }
        }
      });
      this.scroll_target.mouseout(function() {
        return _this.stropgrab();
      });
      this.scroll_target.mouseup(function(e) {
        if (is_from_target(e)) {
          if (e.which === 2 || e.which === 3) return _this.stropgrab();
        }
      });
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
      this.context.commandMap.execute("SetDisplayModeCommand", !this.context.player_mode);
      return this;
    };

    AppUI.prototype.init_display_mode_switch = function() {
      var _this = this;
      $("body").append("<div id='display-mode-switch'>switch mode</div>");
      return $("#display-mode-switch").click(function(e) {
        return _this.switch_display_mode();
      });
    };

    AppUI.prototype.init_bottom_toolbox = function() {
      var $container;
      $("body").append("<div id='bottom-toolbox'></div>");
      $container = $("#bottom-toolbox");
      return this.init_resize_slider($container);
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
      var _this = this;
      $container.append("<div id='timeline-switcher'><a href='#'>Toggle timeline</a></div>");
      return $("#timeline-switcher a").click(function(e) {
        e.preventDefault();
        $("body").toggleClass("hidden-timeline");
        return _this.on_ui_window_resize();
      });
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
      if (this.timeline) this.timeline.update();
      if (ThreeNodes.is_playing === true) return this.trigger("render");
    };

    AppUI.prototype.on_ui_window_resize = function() {
      var h, timelinesize, toolbox_pos, w;
      w = $(window).width();
      h = $(window).height();
      timelinesize = parseInt(localStorage["timeline.js.settings.canvasHeight"]);
      $("#container-wrapper").css({
        width: w,
        height: h - 26 - timelinesize
      });
      toolbox_pos = timelinesize + 20;
      $("#bottom-toolbox").attr("style", "bottom: " + toolbox_pos + "px !important;");
      return $("#sidebar").css({
        bottom: timelinesize
      });
    };

    AppUI.prototype.animate = function() {
      this.render();
      return requestAnimationFrame(this.animate);
    };

    return AppUI;

  })();
});
