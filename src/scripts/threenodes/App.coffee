define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  UI = require 'cs!threenodes/views/UI'
  Workspace = require 'cs!threenodes/views/Workspace'
  AppTimeline = require 'cs!threenodes/views/AppTimeline'
  UrlHandler = require 'cs!threenodes/utils/UrlHandler'
  FileHandler = require 'cs!threenodes/utils/FileHandler'
  AppWebsocket = require 'cs!threenodes/utils/AppWebsocket'

  require 'jquery'
  require 'libs/namespace'
  require 'cs!threenodes/collections/Nodes'
  require 'cs!threenodes/collections/GroupDefinitions'
  require 'cs!threenodes/views/GroupDefinitionView'
  require 'cs!threenodes/utils/WebglBase'

  #### App
  namespace "ThreeNodes",
    App: class App
      constructor: (options) ->
        # Default settings
        settings =
          test: false
          player_mode: false
        @settings = $.extend(settings, options)

        # Define renderer mouseX/Y for use in utils.Mouse node for instance
        ThreeNodes.renderer =
          mouseX: 0
          mouseY: 0

        # Disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
        # this makes the soundinput node not working
        websocket_enabled = false

        # Initialize some core classes
        @url_handler = new UrlHandler()
        @group_definitions = new ThreeNodes.GroupDefinitions([])
        @nodes = new ThreeNodes.NodesCollection([], {settings: settings})
        @socket = new AppWebsocket(websocket_enabled)
        @webgl = new ThreeNodes.WebglBase()
        @file_handler = new FileHandler(@nodes, @group_definitions)

        # Create a group node when selected nodes are grouped
        @group_definitions.bind "definition:created", @nodes.createGroup

        # When a group definition is removed delete all goup nodes using this definition
        @group_definitions.bind "remove", @nodes.removeGroupsByDefinition

        # Create views if the application is not in test mode
        if @settings.test == false
          # Create group definition views when a new one is created
          @group_definitions.bind "add", (definition) =>
            template = ThreeNodes.GroupDefinitionView.template
            tmpl = _.template(template, definition)
            $tmpl = $(tmpl).appendTo("#library")

            view = new ThreeNodes.GroupDefinitionView
              model: definition
              el: $tmpl
            view.bind "edit", @setWorkspaceFromDefinition
            view.render()

        # File and url events
        @file_handler.on("ClearWorkspace", () => @clearWorkspace())
        @url_handler.on("ClearWorkspace", () => @clearWorkspace())
        @url_handler.on("LoadJSON", @file_handler.loadFromJsonData)

        # Initialize the user interface and timeline
        @initUI()
        @initTimeline()

        # Initialize the workspace view
        @createWorkspace()
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

      createWorkspace: () =>
        if @workspace then @workspace.destroy()
        @workspace = new Workspace
          el: jQuery("<div class='nodes-container'></div>").appendTo("#container")
          settings: @settings

      setWorkspaceFromDefinition: (definition) =>
        @createWorkspace()

        # always remove current edit node if it exists
        if @edit_node
          console.log "remove edit node"
          @edit_node.remove()
          delete @edit_node
          # maybe sync new modifications...

        if definition == "global"
          @workspace.render(@nodes)
          @ui.breadcrumb.reset()
        else
          # create a hidden temporary group node from this definition
          @edit_node = @nodes.createGroup
            type: "Group"
            definition: definition
            x: -9999
          @workspace.render(@edit_node.nodes)
          @ui.breadcrumb.set([definition])

      initUI: () =>
        if @settings.test == false
          # Create the main user interface view
          @ui = new UI
            el: $("body")
            settings: @settings

          # Link UI to render events
          @ui.on("render", @nodes.render)
          @ui.on("renderConnections", @nodes.renderAllConnections)

          # Setup the main menu events
          @ui.menubar.on("RemoveSelectedNodes", @nodes.removeSelectedNodes)
          @ui.menubar.on("ClearWorkspace", @clearWorkspace)
          @ui.menubar.on("SaveFile", @file_handler.saveLocalFile)
          @ui.menubar.on("ExportCode", @file_handler.exportCode)
          @ui.menubar.on("LoadJSON", @file_handler.loadFromJsonData)
          @ui.menubar.on("LoadFile", @file_handler.loadLocalFile)
          @ui.menubar.on("ExportImage", @webgl.exportImage)
          @ui.menubar.on("GroupSelectedNodes", @group_definitions.groupSelectedNodes)

          # Special events
          @nodes.on("nodeslist:rebuild", @ui.onNodeListRebuild)
          @url_handler.on("SetDisplayModeCommand", @ui.setDisplayMode)

          #breadcrumb
          @ui.breadcrumb.on("click", @setWorkspaceFromDefinition)
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
            @timelineView.off("TimelineCreated", @ui.onUiWindowResize)

        # Create a new timeline
        @timelineView = new AppTimeline
          el: $("#timeline")
          ui: @ui

        # Bind events to it
        @nodes.bindTimelineEvents(@timelineView)
        @nodes.on("remove", @timelineView.onNodeRemove)
        if @ui then @ui.onUiWindowResize()

        return this

      setDisplayMode: (is_player = false) =>
        if @ui then @ui.setDisplayMode(is_player)

      clearWorkspace: () =>
        @nodes.clearWorkspace()
        @group_definitions.removeAll()
        if @ui then @ui.clearWorkspace()
        @initTimeline()

