define [
  'use!Underscore', 
  'use!Backbone',
  "text!templates/field_context_menu.tmpl.html",
  "text!templates/node_context_menu.tmpl.html",
  "text!templates/app_ui.tmpl.html",
  'order!threenodes/views/Sidebar',
  'order!threenodes/views/MenuBar',
  "order!libs/three-extras/js/RequestAnimationFrame",
  "order!libs/raphael-min",
  "order!libs/jquery.contextMenu",
  "jQueryUi",
  "order!libs/jquery.transform2d",
  "order!libs/jquery-scrollview/jquery.scrollview",
  "order!libs/jquery.layout-latest",
], (_, Backbone, _view_field_context_menu, _view_node_context_menu, _view_app_ui) ->
  "use strict"
  $ = jQuery
  
  ### UI View ###
  
  class ThreeNodes.UI extends Backbone.View
    
    # Background svg used to draw the connections
    @svg: false
    
    initialize: (options) ->
      super
      
      @is_grabbing = false
      
      # Bind events
      $(window).resize(@on_ui_window_resize)
            
      # Create the ui dom elements from template
      ui_tmpl = _.template(_view_app_ui, {})
      @$el.append(ui_tmpl)
      
      # Setup SVG for drawing connections
      @svg = Raphael("graph", 4000, 4000)
      ThreeNodes.UI.svg = @svg
      ThreeNodes.UI.svg_connecting_line = @svg.path("M0 -20 L0 -20").attr
        stroke: "#fff"
        'stroke-dasharray': "-"
        fill: "none"
        opacity: 0
      
      # Setup the sidebar and menu subviews
      @sidebar = new ThreeNodes.Sidebar({el: $("#sidebar")})
      @initMenubar()
      
      # Set the layout and show application
      @initLayout()
      @initDrop()
      @show_application()
      
      # Fire the first resize event
      @on_ui_window_resize()
      
      # Start main render loop
      @animate()
    
    onNodeListRebuild: (nodegraph) =>
      if @timeoutId
        clearTimeout(@timeoutId)
      # add a little delay since the event is fired multiple time on file load
      onTimeOut = () =>
        @sidebar.render(nodegraph)
      @timeoutId = setTimeout(onTimeOut, 10)
    
    initDrop: () =>
      self = this
      # Setup the drop area for the draggables created above
      $("#container").droppable
        accept: "#tab-new a.button, #library .definition"
        activeClass: "ui-state-active"
        hoverClass: "ui-state-hover"
        drop: (event, ui) ->
          offset = $("#container-wrapper").offset()
          definition = false
          
          if ui.draggable.hasClass("definition")
            nodename = "Group"
            container =  $("#library")
            definition = ui.draggable.data("model")
            offset.left -= container.offset().left
          else
            nodename = ui.draggable.attr("rel")
            container =  $("#sidebar")
          
          dx = ui.position.left + $("#container-wrapper").scrollLeft() - offset.left - 10
          dy = ui.position.top + $("#container-wrapper").scrollTop() - container.scrollTop() - offset.top
          #debugger
          self.trigger("CreateNode", {type: nodename, x: dx, y: dy, definition: definition})
          $("#sidebar").show()
      
      return this
    
    clearWorkspace: () =>
      @sidebar.clearWorkspace()
    
    # Setup menubar
    initMenubar: () =>
      menu_tmpl = _.template(ThreeNodes.MenuBar.template, {})
      $menu_tmpl = $(menu_tmpl).prependTo("body")
      @menubar = new ThreeNodes.MenuBar
        el: $menu_tmpl
      
      @menubar.on "ToggleAttributes", () => if @layout then @layout.toggle("west")
      @menubar.on "ToggleLibrary", () => if @layout then @layout.toggle("east")
      @menubar.on "ToggleTimeline", () => if @layout then @layout.toggle("south")
      
      return this
        
    # Setup layout
    initLayout: () =>
      @makeSelectable()
      @setupMouseScroll()
      @init_context_menus()
      @init_bottom_toolbox()
      @init_display_mode_switch()
      
      @layout = $('body').layout
        scrollToBookmarkOnLoad: false
        center:
          size: "100%"
        north:
          closable: false
          resizable: false
          slidable: false
          showOverflowOnHover: true
          size: 24
          resizerClass: "ui-layout-resizer-hidden"
          spacing_open: 0
          spacing_closed: 0
        east:
          minSize: 220
          initClosed: true
        west:
          minSize: 220
        south:
          minSize: 48
          size: 48
          onopen: (name, pane_el, state, opt, layout_name) =>
            @trigger("timelineResize", pane_el.innerHeight())
            @on_ui_window_resize()
          onclose: (name, pane_el, state, opt, layout_name) =>
            @trigger("timelineResize", pane_el.innerHeight())
            @on_ui_window_resize()
          onresize: (name, pane_el, state, opt, layout_name) =>
            @trigger("timelineResize", pane_el.innerHeight())
            @on_ui_window_resize()
      
      # Set timeline height
      @trigger("timelineResize", 48)
      return this
    
    makeSelectable: () ->
      $("#container").selectable
        filter: ".node"
        stop: (event, ui) =>
          $selected = $(".node.ui-selected")
          nodes = []
          anims = []
          $selected.each () ->
            ob = $(this).data("object")
            ob.anim.objectTrack.name = ob.get("name")
            anims.push(ob.anim)
            nodes.push(ob)
          @sidebar.renderNodesAttributes(nodes)
          @trigger("selectAnims", anims)
      return @
    
    setDisplayMode: (is_player = false) =>
      if is_player == true
        $("body").addClass("player-mode")
        $("body").removeClass("editor-mode")
        $("#display-mode-switch").html("editor mode")
      else
        $("body").addClass("editor-mode")
        $("body").removeClass("player-mode")
        $("#display-mode-switch").html("player mode")
      
      ThreeNodes.settings.player_mode = is_player
      if is_player == false
        @trigger("renderConnections")
      return true
    
    setupMouseScroll: () =>
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
      @setDisplayMode(!ThreeNodes.settings.player_mode)
      return this
    
    init_display_mode_switch: () =>
      $("body").append("<div id='display-mode-switch'>switch mode</div>")
      $("#display-mode-switch").click (e) =>
        @switch_display_mode()
    
    init_bottom_toolbox: () =>
      $("body").append("<div id='bottom-toolbox'></div>")
      $container = $("#bottom-toolbox")
      @init_resize_slider($container)
    
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
    
    init_context_menus: () =>
      menu_field_menu = _.template(_view_field_context_menu, {})
      $("body").append(menu_field_menu)
      
      node_menu = _.template(_view_node_context_menu, {})
      $("body").append(node_menu)
    
    show_application: () =>
      delay_intro = 500
      $("body > header").delay(delay_intro).hide()
      $("#sidebar").delay(delay_intro).show()
      $("#container-wrapper").delay(delay_intro).show()
      @trigger("renderConnections")
      
    render: () =>
      @trigger("render")
    
    on_ui_window_resize: () =>
      w = $(window).width()
      h = $(window).height()
      timelinesize = $("#timeline").innerHeight()
      
      toolbox_pos = timelinesize + 20
      $("#bottom-toolbox").attr("style", "bottom: #{toolbox_pos}px !important;")
      
    animate: () =>
      @render()
      requestAnimationFrame( @animate )
