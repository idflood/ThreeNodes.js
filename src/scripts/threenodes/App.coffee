#### App

# Declare namespace
if ThreeNodes == null || typeof(!ThreeNodes) != "object"
  ThreeNodes = {}
if ThreeNodes.nodes == null || typeof(!ThreeNodes.nodes) != "object"
  ThreeNodes.nodes = {}
if ThreeNodes.fields == null || typeof(!ThreeNodes.fields) != "object"
  ThreeNodes.fields = {}

define [
  'use!Underscore',
  'use!Backbone',
  "order!threenodes/utils/Utils",
  'order!threenodes/collections/Nodes',
  'order!threenodes/collections/GroupDefinitions',
  'order!threenodes/views/UI',
  'order!threenodes/views/Timeline',
  'order!threenodes/views/NodeView',
  'order!threenodes/views/GroupDefinitionView',
  'order!threenodes/utils/AppWebsocket',
  'order!threenodes/utils/FileHandler',
  'order!threenodes/utils/UrlHandler',
  "order!threenodes/utils/WebglBase",
], (_, Backbone, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class ThreeNodes.App
    constructor: (options) ->
      # Default settings
      settings = 
        test: false
        player_mode: false
      @settings = $.extend(settings, options)
      
      # disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
      # this makes the soundinput node not working
      websocket_enabled = false
      
      @url_handler = new ThreeNodes.UrlHandler()
      @group_definitions = new ThreeNodes.GroupDefinitions([])
      @nodegraph = new ThreeNodes.NodeGraph([], {settings: settings})
      @nodegraph.bind "add", (node) ->
        template = ThreeNodes.NodeView.template
        tmpl = _.template(template, node)
        $tmpl = $(tmpl).appendTo("#container")
        view = new ThreeNodes.NodeView
          model: node
          el: $tmpl
      
      @group_definitions.bind "definition:created", @nodegraph.createGroup
      @group_definitions.bind "add", (definition) ->
        template = ThreeNodes.GroupDefinitionView.template
        tmpl = _.template(template, definition)
        $tmpl = $(tmpl).appendTo("#library")
        
        view = new ThreeNodes.GroupDefinitionView
          model: definition
          el: $tmpl
        view.render()
      
      if @settings.test == false
        @nodegraph.connections.bind "add", (connection) ->
          view = new ThreeNodes.ConnectionView
            model: connection
      
      @socket = new ThreeNodes.AppWebsocket(websocket_enabled)
      @webgl = new ThreeNodes.WebglBase()
      @file_handler = new ThreeNodes.FileHandler(@nodegraph, @group_definitions)
      
      # File and url events
      @file_handler.on("ClearWorkspace", () => @clearWorkspace())
      @url_handler.on("ClearWorkspace", () => @clearWorkspace())
      @url_handler.on("LoadJSON", @file_handler.load_from_json_data)
      
      @initUI()
      @initTimeline()
      
      # Start the url handling
      # 
      # Enabling the pushState method would require to redirect path
      # for the node.js server and github page (if possible)
      # for simplicity we disable it
      Backbone.history.start
        pushState: false
      
      return true
    
    initUI: () =>
      if @settings.test == false
        # Create the main user interface view
        @ui = new ThreeNodes.UI
          el: $("body")
          settings: @settings
        
        # Link UI to render events
        @ui.on("render", @nodegraph.render)
        @ui.on("renderConnections", @nodegraph.renderAllConnections)
        
        # Setup the main menu events
        @ui.menubar.on("RmoveSelectedNodes", @nodegraph.removeSelectedNodes)
        @ui.menubar.on("ClearWorkspace", @clearWorkspace)
        @ui.menubar.on("SaveFile", @file_handler.save_local_file)
        @ui.menubar.on("ExportCode", @file_handler.export_code)
        @ui.menubar.on("LoadJSON", @file_handler.load_from_json_data)
        @ui.menubar.on("LoadFile", @file_handler.load_local_file)
        @ui.menubar.on("ExportImage", @webgl.exportImage)
        @ui.menubar.on("GroupSelectedNodes", @group_definitions.groupSelectedNodes)
        
        # Special events
        @ui.on("CreateNode", @nodegraph.create_node)
        @nodegraph.on("nodeslist:rebuild", @ui.onNodeListRebuild)
        @url_handler.on("SetDisplayModeCommand", @ui.setDisplayMode)
      else
        # If the application is in test mode add a css class to the body
        $("body").addClass "test-mode"
      return this
    
    initTimeline: () =>
      $("#timeline-container, #keyEditDialog").remove()
      if @timelineView
        @nodegraph.off("remove", @timelineView.onNodeRemove)
        @timelineView.remove()
        if @ui
          @timelineView.off("TimelineCreated", @ui.on_ui_window_resize)
      @timelineView = new ThreeNodes.AppTimeline
        el: $("#timeline")
        ui: @ui
      @nodegraph.bindTimelineEvents(@timelineView)
      @nodegraph.on("remove", @timelineView.onNodeRemove)
      if @ui
        @ui.on_ui_window_resize()
      return this
    
    
    setDisplayMode: (is_player = false) =>
      if @ui then @ui.setDisplayMode(is_player)
    
    clearWorkspace: () =>
      @nodegraph.clearWorkspace()
      @group_definitions.removeAll()
      Utils.uid = 0
      if @ui then @ui.clearWorkspace()
      @initTimeline()
      
