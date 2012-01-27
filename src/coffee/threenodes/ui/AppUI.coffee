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
  "order!libs/three-extras/js/RequestAnimationFrame",
  "order!libs/raphael-min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  "order!libs/jquery.transform2d",
  "order!libs/jquery-scrollview/jquery.scrollview",
], ($, _, Backbone, _view_field_context_menu, _view_node_context_menu) ->
  "use strict"
  class ThreeNodes.AppUI
    constructor: () ->
      _.extend(@, Backbone.Events)
    
    onRegister: () =>
      injector = @context.injector
      @context.commandMap.execute "InitUrlHandler"
      @player_mode = @context.player_mode
      
      injector.mapSingleton "ThreeNodes.AppSidebar", ThreeNodes.AppSidebar
      injector.mapSingleton "ThreeNodes.AppMenuBar", ThreeNodes.AppMenuBar
      
      @webgl = injector.get "ThreeNodes.WebglBase"
    
      @svg = Raphael("graph", 4000, 4000)
      ThreeNodes.svg = @svg
      ThreeNodes.svg_connecting_line = @svg.path("M0 -20 L0 -20").attr
        stroke: "#fff"
        'stroke-dasharray': "-"
        fill: "none"
        opacity: 0
      @sidebar = injector.get "ThreeNodes.AppSidebar"
      @menubar = injector.get "ThreeNodes.AppMenuBar"
      @timeline = injector.get "AppTimeline"
      
      @add_window_resize_handler()
      @init_context_menus()
      @init_bottom_toolbox()
      @init_display_mode_switch()
      @animate()
      @show_application()
      @on_ui_window_resize()
      @is_grabbing = false
      
      @scroll_target = $("#container-wrapper")
      is_from_target = (e) ->
        if e.target == $("#graph svg")[0]
          return true
        return false
      @scroll_target.bind "contextmenu", (e) ->
        return false
      @scroll_target.mousedown (e) =>
        if is_from_target(e)
          #middle or right click button
          if e.which == 2 || e.which == 3
            @is_grabbing = true
            @xp = e.pageX
            @yp = e.pageY
            return false
      @scroll_target.mousemove (e) =>
        if is_from_target(e)
          if @is_grabbing == true
            @scrollTo(@xp - e.pageX, @yp - e.pageY)
            @xp = e.pageX
            @yp = e.pageY
      @scroll_target.mouseout => @stropgrab()
      @scroll_target.mouseup (e) => 
        if is_from_target(e)
          if e.which == 2 || e.which == 3
            @stropgrab()
    
      return true
    
    stropgrab: () =>
      @is_grabbing = false
    
    scrollTo: (dx, dy) =>
      x = @scroll_target.scrollLeft() + dx
      y = @scroll_target.scrollTop() + dy
      @scroll_target.scrollLeft(x).scrollTop(y)
    
    switch_display_mode: () =>
      @context.commandMap.execute("SetDisplayModeCommand", !@context.player_mode)
      return this
    
    init_display_mode_switch: () =>
      $("body").append("<div id='display-mode-switch'>switch mode</div>")
      $("#display-mode-switch").click (e) =>
        @switch_display_mode()
    
    init_bottom_toolbox: () =>
      $("body").append("<div id='bottom-toolbox'></div>")
      $container = $("#bottom-toolbox")
      @init_resize_slider($container)
      #@init_timeline_switcher($container)
    
    init_resize_slider: ($container) =>
      $container.append("<div id='zoom-slider'></div>")
      scale_graph = (val) ->
        factor = val / 100
        $("#container").css('transform', "scale(#{factor}, #{factor})")
      
      $("#zoom-slider").slider
        min: 25
        step: 25
        value: 100
        change: (event, ui) -> scale_graph(ui.value)
        slide: (event, ui) -> scale_graph(ui.value) 
    
    init_timeline_switcher: ($container) =>
      $container.append("<div id='timeline-switcher'><a href='#'>Toggle timeline</a></div>")
      $("#timeline-switcher a").click (e) =>
        e.preventDefault()
        $("body").toggleClass "hidden-timeline"
        @on_ui_window_resize()
    
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
      $("body > header").delay(delay_intro).hide()
      $("#sidebar").delay(delay_intro).show()
      $("#container-wrapper").delay(delay_intro).show()
      $("#sidebar-toggle").delay(delay_intro).show()
      
      nodegraph = @context.injector.get("NodeGraph")
      nodegraph.renderAllConnections()
      
    render: () =>
      if @timeline
        @timeline.update()
      @trigger("render")
    
    on_ui_window_resize: () =>
      w = $(window).width()
      h = $(window).height()
      timelinesize = parseInt(localStorage["timeline.js.settings.canvasHeight"])
      
      $("#container-wrapper").css
        width: w
        height: h - 26 - timelinesize
      
      toolbox_pos = timelinesize + 20
      $("#bottom-toolbox").attr("style", "bottom: #{toolbox_pos}px !important;")
      
      $("#sidebar").css("height", h - 25)
      
    animate: () =>
      @render()
      requestAnimationFrame( @animate )
