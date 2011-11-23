var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "text!templates/field_context_menu.tmpl.html", "text!templates/node_context_menu.tmpl.html", "order!threenodes/core/WebglBase", "order!libs/jquery.tmpl.min", 'order!threenodes/ui/AppSidebar', 'order!threenodes/ui/AppMenuBar', "order!libs/three-extras/js/RequestAnimationFrame", "order!libs/raphael-min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min"], function($, _, Backbone, _view_field_context_menu, _view_node_context_menu) {
  return ThreeNodes.AppUI = (function() {
    function AppUI() {
      this.animate = __bind(this.animate, this);
      this.on_ui_window_resize = __bind(this.on_ui_window_resize, this);
      this.render = __bind(this.render, this);
      this.show_application = __bind(this.show_application, this);
      this.add_window_resize_handler = __bind(this.add_window_resize_handler, this);
      this.init_context_menus = __bind(this.init_context_menus, this);
      this.onRegister = __bind(this.onRegister, this);      _.extend(this, Backbone.Events);
      this.svg = Raphael("graph", 4000, 4000);
      ThreeNodes.svg = this.svg;
    }
    AppUI.prototype.onRegister = function() {
      var injector;
      injector = this.context.injector;
      injector.mapSingleton("ThreeNodes.AppSidebar", ThreeNodes.AppSidebar);
      injector.mapSingleton("ThreeNodes.AppMenuBar", ThreeNodes.AppMenuBar);
      this.webgl = injector.get("ThreeNodes.WebglBase");
      this.sidebar = injector.get("ThreeNodes.AppSidebar");
      this.sidebar = injector.get("ThreeNodes.AppMenuBar");
      this.add_window_resize_handler();
      this.init_context_menus();
      this.show_application();
      return this.animate();
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
      var delay_intro;
      delay_intro = 500;
      $("body > header").delay(delay_intro).fadeOut(0);
      $("#sidebar").delay(delay_intro).fadeIn(0);
      $("#container-wrapper").delay(delay_intro).fadeIn(0);
      return $("#sidebar-toggle").delay(delay_intro).fadeIn(0);
    };
    AppUI.prototype.render = function() {
      return this.trigger("render");
    };
    AppUI.prototype.on_ui_window_resize = function() {
      var h, w;
      w = $(window).width();
      h = $(window).height();
      $("#container-wrapper").css({
        width: w,
        height: h - 25
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