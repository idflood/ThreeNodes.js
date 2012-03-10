ThreeNodes = {}

# disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
# this makes the soundinput node not working
ThreeNodes.websocket_enabled = false

ThreeNodes.nodes = {}

ThreeNodes.mouseX = 0
ThreeNodes.mouseY = 0

ThreeNodes.fields =
  types: {}

ThreeNodes.webgl_materials_node = []
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
  'order!threenodes/utils/AppWebsocket',
  'order!threenodes/utils/Injector',
  'order!threenodes/utils/CommandMap',
  'order!threenodes/utils/FileHandler',
  'order!threenodes/utils/UrlHandler',
  "order!threenodes/utils/WebglBase",
], ($, _, Backbone) ->
  "use strict"
  
  # use a global event dispatcher instead of the context/commandMap thing
  # it may be removed if all commands are converted to backbone class (event)
  ThreeNodes.events = _.extend({}, Backbone.Events)
  
  class ThreeNodes.App
    constructor: (@testing_mode = false) ->
      console.log "ThreeNodes app init..."
      @current_scene = false
      @current_camera = false
      @current_renderer = false
      @effectScreen = false
      @renderModel = false
      @composer = false
      
      @injector = new ThreeNodes.Injector(this)
      @commandMap = new ThreeNodes.CommandMap(this)
      
      @url_handler = new ThreeNodes.UrlHandler()
      @url_handler.context = this
      
      @injector.mapSingleton "NodeGraph", ThreeNodes.NodeGraph
      @injector.mapSingleton "AppWebsocket", ThreeNodes.AppWebsocket
      @injector.mapSingleton "UI", ThreeNodes.UI
      @injector.mapSingleton "FileHandler", ThreeNodes.FileHandler
      
      @nodegraph = new ThreeNodes.NodeGraph([], {is_test: @testing_mode})
      @nodegraph.context = this
      @socket = @injector.get "AppWebsocket"
      @webgl = new ThreeNodes.WebglBase()
      @file_handler = new ThreeNodes.FileHandler()
      @file_handler.context = this
      
      @player_mode = false
      
      @nodegraph.on "remove", () =>
        @timelineView.selectAnims([])
      
      ThreeNodes.events.on "ClearWorkspace", () =>
        @clearWorkspace()
      
      if @testing_mode == false
        @ui = @injector.get "UI",
          el: $("body")
        @ui.on("render", @nodegraph.render)
        @initTimeline()
      else
        $("body").addClass "test-mode"
        ThreeNodes.events.trigger "InitUrlHandler"
        @initTimeline()
      
      # removing this would require to redirect path
      # for the node.js server and github page (if possible)
      # for simplicity disable pushState
      Backbone.history.start
        pushState: false
      return true
    
    initTimeline: () =>
      $("#timeline-container, #keyEditDialog").remove()
      if @ui && @timelineView
        @ui.off("render", @timelineView.update)
        @ui.off("selectAnims", @timelineView.selectAnims)
      
      if @timelineView
        @timelineView.off("trackRebuild", @nodegraph.showNodesAnimation)
        @timelineView.off("startSound", @nodegraph.startSound)
        @timelineView.off("stopSound", @nodegraph.stopSound)
        @timelineView.remove()
      
      @timelineView = new ThreeNodes.AppTimeline()
      
      if @ui
        @ui.on("render", @timelineView.update)
        @ui.on("selectAnims", @timelineView.selectAnims)
      
      @timelineView.on("trackRebuild", @nodegraph.showNodesAnimation)
      @timelineView.on("startSound", @nodegraph.startSound)
      @timelineView.on("stopSound", @nodegraph.stopSound)
      ThreeNodes.events.trigger "OnUIResize"
    
    clearWorkspace: () ->
      @reset_global_variables()
      @initTimeline()
    
    reset_global_variables: () ->
      ThreeNodes.uid = 0
      @nodegraph.node_connections = []
      ThreeNodes.selected_nodes = $([])
