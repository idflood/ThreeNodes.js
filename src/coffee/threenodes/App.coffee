ThreeNodes = {}

# disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
# this makes the soundinput node not working
ThreeNodes.websocket_enabled = false

ThreeNodes.nodes = {}

ThreeNodes.mouseX = 0
ThreeNodes.mouseY = 0

ThreeNodes.fields =
  types: {}

ThreeNodes.svg = false
ThreeNodes.flash_sound_value =
  kick: 0
  snare: 0
  hat: 0

define [
  'jQuery',
  'Underscore',
  'Backbone',
  'order!threenodes/collections/Nodes',
  'order!threenodes/views/UI',
  'order!threenodes/views/Timeline',
  'order!threenodes/views/NodeView',
  'order!threenodes/utils/AppWebsocket',
  'order!threenodes/utils/FileHandler',
  'order!threenodes/utils/UrlHandler',
  "order!threenodes/utils/WebglBase",
], ($, _, Backbone) ->
  "use strict"
  
  class ThreeNodes.App
    constructor: (testing_mode = false) ->
      # save settings in a global object
      # if you have a more elegant way to handle this don't hesitate
      ThreeNodes.settings =
        testing_mode: testing_mode
        player_mode: false
      
      @url_handler = new ThreeNodes.UrlHandler()
      @nodegraph = new ThreeNodes.NodeGraph([], {is_test: testing_mode})
      @nodegraph.bind "add", (node) ->
        template = ThreeNodes.NodeView.template
        tmpl = _.template(template, node)
        $tmpl = $(tmpl).appendTo("#container")
        view = new ThreeNodes.NodeView
          model: node
          el: $tmpl
      
      if testing_mode == false
        @nodegraph.connections.bind "add", (connection) ->
          view = new ThreeNodes.ConnectionView
            model: connection
      
      @socket = new ThreeNodes.AppWebsocket()
      @webgl = new ThreeNodes.WebglBase()
      @file_handler = new ThreeNodes.FileHandler(@nodegraph)
      
      @file_handler.on("ClearWorkspace", () => @clearWorkspace())
      @url_handler.on("ClearWorkspace", () => @clearWorkspace())
      @url_handler.on("LoadJSON", @file_handler.load_from_json_data)
      
      @initUI(testing_mode)
      @initTimeline()
      
      # Start the url handling
      
      # Enabling the pushState method would require to redirect path
      # for the node.js server and github page (if possible)
      # for simplicity we disable it
      Backbone.history.start
        pushState: false
      
      return true
    
    initUI: (testing_mode) =>
      if testing_mode == false
        @ui = new ThreeNodes.UI
          el: $("body")
        @ui.on("render", @nodegraph.render)
        @ui.on("renderConnections", @nodegraph.renderAllConnections)
        @ui.menubar.on("RmoveSelectedNodes", @nodegraph.removeSelectedNodes)
        @ui.menubar.on("ClearWorkspace", @clearWorkspace)
        @ui.menubar.on("SaveFile", @file_handler.save_local_file)
        @ui.menubar.on("ExportCode", @file_handler.export_code)
        @ui.menubar.on("LoadJSON", @file_handler.load_from_json_data)
        @ui.menubar.on("LoadFile", @file_handler.load_local_file)
        @ui.menubar.on("ExportImage", @webgl.exportImage)
        @ui.menubar.on("GroupSelectedNodes", @nodegraph.onGroupSelected)
        @ui.sidebar.on("CreateNode", @nodegraph.create_node)
        @nodegraph.on("nodeslist:rebuild", @ui.onNodeListRebuild)
        @url_handler.on("SetDisplayModeCommand", @ui.setDisplayMode)
      else
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
      @reset_global_variables()
      if @ui then @ui.clearWorkspace()
      @initTimeline()
    
    reset_global_variables: () ->
      ThreeNodes.uid = 0
      ThreeNodes.selected_nodes = $([])
