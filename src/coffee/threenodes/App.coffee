ThreeNodes = {}

# disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
# this makes the soundinput node not working
ThreeNodes.websocket_enabled = false

ThreeNodes.nodes =
  fields: {}
  types:
    Base: {}
    Math: {}
    Utils: {}
    Conditional: {}
    Geometry: {}
    Three: {}
    Materials: {}
    Lights: {}
    PostProcessing: {}

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
  'order!threenodes/core/NodeGraph',
  'order!threenodes/ui/AppUI',
  'order!threenodes/utils/AppWebsocket',
  'order!threenodes/utils/Injector',
  'order!threenodes/utils/CommandMap',
  'order!threenodes/utils/FileHandler',
  'order!threenodes/commands/ClearWorkspaceCommand',
  'order!threenodes/commands/AddConnectionCommand',
  'order!threenodes/commands/RemoveConnectionCommand',
  'order!threenodes/commands/CreateNodeCommand',
  'order!threenodes/commands/SaveFileCommand',
  'order!threenodes/commands/LoadLocalFileCommand',
], ($, _, Backbone, NodeGraph, AppUI) ->
  class ThreeNodes.App
    constructor: () ->
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
      
      @commandMap.register "ClearWorkspaceCommand", ThreeNodes.ClearWorkspaceCommand
      @commandMap.register "AddConnectionCommand", ThreeNodes.AddConnectionCommand
      @commandMap.register "RemoveConnectionCommand", ThreeNodes.RemoveConnectionCommand
      @commandMap.register "CreateNodeCommand", ThreeNodes.CreateNodeCommand
      @commandMap.register "SaveFileCommand", ThreeNodes.SaveFileCommand
      @commandMap.register "LoadLocalFileCommand", ThreeNodes.LoadLocalFileCommand
      
      @injector.mapSingleton "NodeGraph", ThreeNodes.NodeGraph
      @injector.mapSingleton "AppWebsocket", ThreeNodes.AppWebsocket
      @injector.mapSingleton "AppUI", AppUI
      @injector.mapSingleton "FileHandler", ThreeNodes.FileHandler
      
      @nodegraph = @injector.get "NodeGraph"
      @socket = @injector.get "AppWebsocket"
      
      if $("#qunit-tests").length == 0
        @init_ui()
    
    init_ui: () =>
      @ui = @injector.get "AppUI"
      @ui.bind("render", @nodegraph.render)
    
    clear_workspace: () ->
      @context.commandMap.execute "ClearWorkspaceCommand"
    
    reset_global_variables: () ->
      ThreeNodes.uid = 0
      @nodegraph.node_connections = []
      @nodegraph.nodes = []
      ThreeNodes.nodes.fields = {}
    
      ThreeNodes.webgl_materials_node = []
