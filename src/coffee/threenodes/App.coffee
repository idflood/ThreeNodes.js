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
  'order!threenodes/utils/AppWebsocket',
  'order!threenodes/utils/FileHandler',
  'order!threenodes/utils/UrlHandler',
  "order!threenodes/utils/WebglBase",
], ($, _, Backbone) ->
  "use strict"
  
  # use a global event dispatcher (would be better without it)
  ThreeNodes.events = _.extend({}, Backbone.Events)
  
  class ThreeNodes.App
    constructor: (testing_mode = false) ->
      # save settings in a global object
      # if you have a more elegant way to handle this don't hesitate
      ThreeNodes.settings =
        testing_mode: testing_mode
        player_mode: false
      
      @url_handler = new ThreeNodes.UrlHandler()
      @nodegraph = new ThreeNodes.NodeGraph([], {is_test: testing_mode})
      @socket = new ThreeNodes.AppWebsocket()
      @webgl = new ThreeNodes.WebglBase()
      @file_handler = new ThreeNodes.FileHandler(@nodegraph)
            
      ThreeNodes.events.on "ClearWorkspace", () => @clearWorkspace()
      
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
      else
        $("body").addClass "test-mode"
      return this
    
    initTimeline: () =>
      $("#timeline-container, #keyEditDialog").remove()
      if @timelineView then @timelineView.remove()
      
      @timelineView = new ThreeNodes.AppTimeline
        el: $("#timeline")
        ui: @ui
      
      return this
    
    clearWorkspace: () ->
      @reset_global_variables()
      @initTimeline()
    
    reset_global_variables: () ->
      ThreeNodes.uid = 0
      ThreeNodes.selected_nodes = $([])
