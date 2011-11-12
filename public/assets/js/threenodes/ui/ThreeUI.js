var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ThreeNodes.UI = (function() {
  function UI(app) {
    this.app = app;
    this.animate = __bind(this.animate, this);
    this.on_ui_window_resize = __bind(this.on_ui_window_resize, this);
    this.render = __bind(this.render, this);
    this.show_application = __bind(this.show_application, this);
    this.add_window_resize_handler = __bind(this.add_window_resize_handler, this);
    this.init_context_menus = __bind(this.init_context_menus, this);
    this.init_ui = __bind(this.init_ui, this);
    this.svg = false;
  }
  UI.prototype.init_ui = function() {
    this.svg = Raphael("graph", 4000, 4000);
    this.sidebar = new ThreeNodes.Sidebar();
    this.add_window_resize_handler();
    this.init_context_menus();
    return this.show_application();
  };
  UI.prototype.init_context_menus = function() {
    var menu_field_menu, node_menu;
    menu_field_menu = $.tmpl(ThreeNodes.templates.field_context_menu, {});
    $("body").append(menu_field_menu);
    node_menu = $.tmpl(ThreeNodes.templates.node_context_menu, {});
    return $("body").append(node_menu);
  };
  UI.prototype.add_window_resize_handler = function() {
    $(window).resize(this.on_ui_window_resize);
    return this.on_ui_window_resize();
  };
  UI.prototype.show_application = function() {
    var delay_intro;
    delay_intro = 500;
    $("body > header").delay(delay_intro).fadeOut(0);
    $("#sidebar").delay(delay_intro).fadeIn(0);
    $("#container-wrapper").delay(delay_intro).fadeIn(0);
    return $("#sidebar-toggle").delay(delay_intro).fadeIn(0);
  };
  UI.prototype.render = function() {
    return this.app.nodegraph.render();
  };
  UI.prototype.on_ui_window_resize = function() {
    var h, w;
    w = $(window).width();
    h = $(window).height();
    $("#container-wrapper").css({
      width: w,
      height: h
    });
    return $("#sidebar").css("height", h);
  };
  UI.prototype.animate = function() {
    this.render();
    return requestAnimationFrame(this.animate);
  };
  return UI;
})();