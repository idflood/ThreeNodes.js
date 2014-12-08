define (require) ->
  ### UI View ###
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  _view_app_ui = require 'text!templates/app_ui.tmpl.html'
  Sidebar = require 'cs!threenodes/views/sidebar/Sidebar'
  Breadcrumb = require 'cs!threenodes/views/Breadcrumb'
  MenuBar = require 'cs!threenodes/views/MenuBar'

  require 'RequestAnimationFrame'
  require 'Raphael'
  require 'jquery.ui'
  require 'libs/jquery.transform2d'
  require 'libs/jquery-scrollview/jquery.scrollview'
  require 'jquery.layout'

  class UI extends Backbone.View

    # Background svg used to draw the connections
    @svg: false
    @connecting_line = false

    initialize: (options) ->
      super

      @settings = options.settings
      @is_grabbing = false

      # Bind events
      $(window).resize(@onUiWindowResize)

      # Create the ui dom elements from template
      ui_tmpl = _.template(_view_app_ui, {})
      @$el.append(ui_tmpl)

      # Create breadcrumb view (for selecting current group/workspace)
      @breadcrumb = new Breadcrumb({el: $("#breadcrumb")})

      # Setup SVG for drawing connections
      UI.svg = Raphael("graph", 4000, 4000)
      UI.connecting_line = UI.svg.path("M0 -20 L0 -20").attr
        stroke: "#fff"
        'stroke-dasharray': "-"
        fill: "none"
        opacity: 0

      # Setup the sidebar and menu subviews
      @sidebar = new Sidebar({el: $("#sidebar")})
      @initMenubar()

      # Set the layout and show application
      @initLayout()
      @showApplication()

      # Fire the first resize event
      @onUiWindowResize()

      # Start main render loop
      @animate()

    onNodeListRebuild: (nodes) =>
      if @timeoutId
        clearTimeout(@timeoutId)
      # add a little delay since the event is fired multiple time on file load
      onTimeOut = () =>
        @sidebar.render(nodes)
      @timeoutId = setTimeout(onTimeOut, 10)

    clearWorkspace: () =>
      # Remove the nodes attributes from the sidebar
      @sidebar.clearWorkspace()

    # Setup menubar
    initMenubar: () =>
      menu_tmpl = _.template(MenuBar.template, {})
      $menu_tmpl = $(menu_tmpl).prependTo("body")
      @menubar = new MenuBar
        el: $menu_tmpl

      @menubar.on "ToggleAttributes", () => if @layout then @layout.toggle("west")
      @menubar.on "ToggleLibrary", () => if @layout then @layout.toggle("east")
      @menubar.on "ToggleTimeline", () => if @layout then @layout.toggle("south")

      return this

    # Setup layout
    initLayout: () =>
      @makeSelectable()
      @setupMouseScroll()
      @initBottomToolbox()
      @initDisplayModeSwitch()

      @layout = $('body').layout
        scrollToBookmarkOnLoad: false
        animatePaneSizing: false
        fxName: 'none'
        center:
          size: "100%"
        north:
          closable: false
          resizable: false
          slidable: false
          showOverflowOnHover: true
          size: 27
          resizerClass: "ui-layout-resizer-hidden"
          spacing_open: 0
          spacing_closed: 0
        east:
          minSize: 220
          initClosed: true
          onresize: (name, pane_el, state, opt, layout_name) =>
            @onUiWindowResize()
          onopen: (name, pane_el, state, opt, layout_name) =>
            @onUiWindowResize()
          onclose: (name, pane_el, state, opt, layout_name) =>
            @onUiWindowResize()
        west:
          minSize: 220
        south:
          minSize: 48
          size: 48
          onopen: (name, pane_el, state, opt, layout_name) =>
            @trigger("timelineResize", pane_el.innerHeight())
            @onUiWindowResize()
          onclose: (name, pane_el, state, opt, layout_name) =>
            @trigger("timelineResize", pane_el.innerHeight())
            @onUiWindowResize()
          onresize: (name, pane_el, state, opt, layout_name) =>
            @trigger("timelineResize", pane_el.innerHeight())
            @onUiWindowResize()

      # Set timeline height
      @trigger("timelineResize", 48)
      return this

    # Handle the nodes selection
    makeSelectable: () ->
      $("#container").selectable
        filter: ".node"
        stop: (event, ui) =>
          $selected = $(".node.ui-selected")
          nodes = []
          anims = []
          # Add the nodes and their anims container to some arrays
          $selected.each () ->
            ob = $(this).data("object")
            if !ob.get("parent")
              ob.anim.objectTrack.name = ob.get("name")
              anims.push(ob.anim)
              nodes.push(ob)
            else
              # if this is a subnode we only select the group
              obgrp = ob.get("parent")
              obgrp.anim.objectTrack.name = ob.get("name")
              # add the object only once
              if !_.find(nodes, (n) -> n.cid == obgrp.cid)
                anims.push(obgrp.anim)
                nodes.push(obgrp)
          # Display the selected nodes attributes in the sidebar
          @sidebar.clearNodesAttributes()
          @sidebar.renderNodesAttributes(nodes)
          # Display the selected nodes in the timeline
          @trigger("selectAnims", anims)

      # Quick fix for input blur.
      # Without this, after focusing an input in a node it was difficult
      # to unfocus it. Clicking on the workspace didn't worked.
      # The problem come from the selectable above which prevent event propagation
      # somewhere.
      $("#container").mousedown (e) ->
        $('input, textarea').trigger('blur')
      return @

    # Switch between player/editor mode
    setDisplayMode: (is_player = false) =>
      if is_player == true
        $("body").addClass("player-mode")
        $("body").removeClass("editor-mode")
        $("#display-mode-switch").html("")
      else
        $("body").addClass("editor-mode")
        $("body").removeClass("player-mode")
        $("#display-mode-switch").html("player mode")

      $("#display-mode-switch").toggleClass("icon-pencil", is_player)

      @settings.player_mode = is_player
      if is_player == false
        @trigger("renderConnections")
      return true

    setupMouseScroll: () =>
      @scroll_target = $("#container-wrapper")

      # Return true if the click is made on the background, false otherwise
      is_from_target = (e) ->
        if e.target == $("#graph svg")[0]
          return true
        return false

      # Disable the context menu on the container so that we can drag with right click
      @scroll_target.bind "contextmenu", (e) -> return false

      # Handle start drag
      @scroll_target.mousedown (e) =>
        # Init drag only if middle or right click AND if the target element is the svg
        if is_from_target(e) && (e.which == 2 || e.which == 3)
          @is_grabbing = true
          @xp = e.pageX
          @yp = e.pageY
          return false

      # Hande drag when the mouse move
      @scroll_target.mousemove (e) =>
        if is_from_target(e) && (@is_grabbing == true)
          @scrollTo(@xp - e.pageX, @yp - e.pageY)
          @xp = e.pageX
          @yp = e.pageY

      # Handle stop drag
      @scroll_target.mouseout => @is_grabbing = false
      @scroll_target.mouseup (e) =>
        if is_from_target(e) && (e.which == 2 || e.which == 3)
          @is_grabbing = false

      return true

    scrollTo: (dx, dy) =>
      x = @scroll_target.scrollLeft() + dx
      y = @scroll_target.scrollTop() + dy
      @scroll_target.scrollLeft(x).scrollTop(y)

    switchDisplayMode: () =>
      @setDisplayMode(!@settings.player_mode)
      return this

    initDisplayModeSwitch: () =>
      $("body").append("<div id='display-mode-switch'>switch mode</div>")
      $("#display-mode-switch").click (e) =>
        @switchDisplayMode()

    # Setup the bottom right dom container
    initBottomToolbox: () =>
      $("body").append("<div id='bottom-toolbox'></div>")
      $container = $("#bottom-toolbox")
      @initResizeSlider($container)

    # Initialize the little node zoom slider
    initResizeSlider: ($container) =>
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

    # Display the app and hide the intro
    showApplication: () =>
      delay_intro = 500

      # Display/hide with some delay
      $("body > header").delay(delay_intro).hide()
      $("#sidebar").delay(delay_intro).show()
      $("#container-wrapper").delay(delay_intro).show()

      # Render the connections if needed
      @trigger("renderConnections")

    # Function called when the window is resized and if some panels are closed/opened/resized
    onUiWindowResize: () =>
      # Default minimum margins
      margin_bottom = 20
      margin_right = 25

      # Calculate the bottom and right margins if the corresponding panels are not closed
      if @layout.south.state.isClosed == false then margin_bottom += $("#timeline").innerHeight()
      if @layout.east.state.isClosed == false then margin_right += $("#library").innerWidth()

      # Apply the margins to some DOM elements
      $("#bottom-toolbox").attr("style", "bottom: #{margin_bottom}px !important; right: #{margin_right}px")
      $("#webgl-window").css
        right: margin_right

    animate: () =>
      @trigger("render")
      requestAnimationFrame( @animate )
