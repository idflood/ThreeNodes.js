define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/field_context_menu.tmpl.html",
  "text!templates/node_context_menu.tmpl.html",
  "order!threenodes/core/WebglBase",
  "order!libs/jquery.tmpl.min",
  'order!threenodes/ui/AppSidebar',
  'order!threenodes/ui/AppMenuBar',
  "libs/three-extras/js/RequestAnimationFrame",
  "order!libs/raphael-min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
], ($, _, Backbone, _view_field_context_menu, _view_node_context_menu) ->
  class ThreeNodes.AppUI
    constructor: () ->
      _.extend(@, Backbone.Events)
      @svg = Raphael("graph", 4000, 4000)
      ThreeNodes.svg = @svg
    
    onRegister: () =>
      injector = @context.injector
      
      injector.mapSingleton "ThreeNodes.AppSidebar", ThreeNodes.AppSidebar
      injector.mapSingleton "ThreeNodes.AppMenuBar", ThreeNodes.AppMenuBar
      @webgl = injector.get "ThreeNodes.WebglBase"
      @sidebar = injector.get "ThreeNodes.AppSidebar"
      @sidebar = injector.get "ThreeNodes.AppMenuBar"
      
      @add_window_resize_handler()
      @init_context_menus()
      @show_application()
      @animate()
    
    init_context_menus: () =>
      menu_field_menu = $.tmpl(_view_field_context_menu, {})
      $("body").append(menu_field_menu)
      
      node_menu = $.tmpl(_view_node_context_menu, {})
      $("body").append(node_menu)
    
    add_window_resize_handler: () =>
      $(window).resize @on_ui_window_resize
      @on_ui_window_resize()
    
    show_application: () =>
      delay_intro = 500
      $("body > header").delay(delay_intro).fadeOut(0)
      $("#sidebar").delay(delay_intro).fadeIn(0)
      $("#container-wrapper").delay(delay_intro).fadeIn(0)
      $("#sidebar-toggle").delay(delay_intro).fadeIn(0)
      
    render: () =>
      @trigger("render")
    
    on_ui_window_resize: () =>
      w = $(window).width()
      h = $(window).height()
      $("#container-wrapper").css
        width: w
        height: h - 25
      $("#sidebar").css("height", h)
      
    animate: () =>
      @render()
      requestAnimationFrame( @animate )
