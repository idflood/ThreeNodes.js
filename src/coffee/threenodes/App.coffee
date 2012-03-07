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
  'order!threenodes/collections/NodeGraph',
  'order!threenodes/views/AppUI',
  'order!threenodes/views/AppTimeline',
  'order!threenodes/utils/AppWebsocket',
  'order!threenodes/utils/Injector',
  'order!threenodes/utils/CommandMap',
  'order!threenodes/utils/FileHandler',
  'order!threenodes/utils/UrlHandler',
  "order!libs/jquery.ba-bbq.min",
], ($, _, Backbone, NodeGraph, AppUI) ->
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
           
      ThreeNodes.webgl_materials_node = []
      
      @injector = new ThreeNodes.Injector(this)
      @commandMap = new ThreeNodes.CommandMap(this)
      
      @url_handler = new ThreeNodes.UrlHandler()
      @url_handler.context = this
      
      @injector.mapSingleton "NodeGraph", ThreeNodes.NodeGraph
      @injector.mapSingleton "AppWebsocket", ThreeNodes.AppWebsocket
      @injector.mapSingleton "AppUI", AppUI
      @injector.mapSingleton "FileHandler", ThreeNodes.FileHandler
      
      @nodegraph = @injector.get "NodeGraph"
      @nodegraph.on "resetTimeline", @initTimeline
      @socket = @injector.get "AppWebsocket"
      @webgl = new ThreeNodes.WebglBase()
      
      @player_mode = false
            
      if @testing_mode == false
        @ui = @injector.get "AppUI",
          el: $("body")
        @ui.on("render", @nodegraph.render)
        @initTimeline()
      else
        $("body").addClass "test-mode"
        ThreeNodes.events.trigger "InitUrlHandler"
        @initTimeline()
      
      return true
    
    initTimeline: () =>
      $("#timeline-container, #keyEditDialog").remove()
      if @ui && @timelineView
        @ui.off("render", @timelineView.update)
      
      if @timelineView
        @timelineView.off("trackRebuild", @nodegraph.showNodesAnimation)
        @timelineView.off("startSound", @nodegraph.startSound)
        @timelineView.off("stopSound", @nodegraph.stopSound)
      
      @timelineView = new ThreeNodes.AppTimeline()
      
      if @ui
        @ui.on("render", @timelineView.update)
      
      @timelineView.on("trackRebuild", @nodegraph.showNodesAnimation)
      @timelineView.on("startSound", @nodegraph.startSound)
      @timelineView.on("stopSound", @nodegraph.stopSound)
      ThreeNodes.events.trigger "OnUIResize"
    
    clear_workspace: () ->
      ThreeNodes.events.trigger("ClearWorkspace")
    
    reset_global_variables: () ->
      ThreeNodes.uid = 0
      @nodegraph.node_connections = []
      
      ThreeNodes.webgl_materials_node = []
