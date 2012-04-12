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
  'order!threenodes/views/GroupDefinitionView',
  'order!threenodes/views/Workspace',
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
      
      # Disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
      # this makes the soundinput node not working
      websocket_enabled = false
      
      # Initialize some core classes
      @url_handler = new ThreeNodes.UrlHandler()
      @group_definitions = new ThreeNodes.GroupDefinitions([])
      @nodes = new ThreeNodes.NodesCollection([], {settings: settings})
      @socket = new ThreeNodes.AppWebsocket(websocket_enabled)
      @webgl = new ThreeNodes.WebglBase()
      @file_handler = new ThreeNodes.FileHandler(@nodes, @group_definitions)
      
      # Create a group node when selected nodes are grouped
      @group_definitions.bind "definition:created", @nodes.createGroup
      
      # When a group definition is removed delete all goup nodes using this definition
      @group_definitions.bind "remove", @nodes.removeGroupsByDefinition
      
      # Create views if the application is not in test mode
      if @settings.test == false
        # Create group definition views when a new one is created
        @group_definitions.bind "add", (definition) ->
          template = ThreeNodes.GroupDefinitionView.template
          tmpl = _.template(template, definition)
          $tmpl = $(tmpl).appendTo("#library")
          
          view = new ThreeNodes.GroupDefinitionView
            model: definition
            el: $tmpl
          view.render()
      
      # File and url events
      @file_handler.on("ClearWorkspace", () => @clearWorkspace())
      @url_handler.on("ClearWorkspace", () => @clearWorkspace())
      @url_handler.on("LoadJSON", @file_handler.load_from_json_data)
      
      # Initialize the user interface and timeline
      @initUI()
      @initTimeline()
      
      # Initialize the workspace view
      @workspace = new ThreeNodes.Workspace()
      # Make the workspace display the global nodes and connections
      @workspace.render(@nodes)
      
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
        @ui.on("render", @nodes.render)
        @ui.on("renderConnections", @nodes.renderAllConnections)
        
        # Setup the main menu events
        @ui.menubar.on("RmoveSelectedNodes", @nodes.removeSelectedNodes)
        @ui.menubar.on("ClearWorkspace", @clearWorkspace)
        @ui.menubar.on("SaveFile", @file_handler.save_local_file)
        @ui.menubar.on("ExportCode", @file_handler.export_code)
        @ui.menubar.on("LoadJSON", @file_handler.load_from_json_data)
        @ui.menubar.on("LoadFile", @file_handler.load_local_file)
        @ui.menubar.on("ExportImage", @webgl.exportImage)
        @ui.menubar.on("GroupSelectedNodes", @group_definitions.groupSelectedNodes)
        
        # Special events
        @ui.on("CreateNode", @nodes.create_node)
        @nodes.on("nodeslist:rebuild", @ui.onNodeListRebuild)
        @url_handler.on("SetDisplayModeCommand", @ui.setDisplayMode)
      else
        # If the application is in test mode add a css class to the body
        $("body").addClass "test-mode"
      return this
    
    initTimeline: () =>
      # Remove old timeline DOM elements
      $("#timeline-container, #keyEditDialog").remove()
      
      # Cleanup the old timeline if there was one
      if @timelineView
        @nodes.off("remove", @timelineView.onNodeRemove)
        @timelineView.remove()
        if @ui
          @timelineView.off("TimelineCreated", @ui.on_ui_window_resize)
      
      # Create a new timeline
      @timelineView = new ThreeNodes.AppTimeline
        el: $("#timeline")
        ui: @ui
      
      # Bind events to it
      @nodes.bindTimelineEvents(@timelineView)
      @nodes.on("remove", @timelineView.onNodeRemove)
      if @ui then @ui.on_ui_window_resize()
      
      return this
    
    setDisplayMode: (is_player = false) =>
      if @ui then @ui.setDisplayMode(is_player)
    
    clearWorkspace: () =>
      @nodes.clearWorkspace()
      @group_definitions.removeAll()
      if @ui then @ui.clearWorkspace()
      @initTimeline()
      
