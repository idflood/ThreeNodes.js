ThreeNodes = {}

ThreeNodes.nodes =
  fields: {}
  list: []
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
  'order!threenodes/commands/ClearWorkspaceCommand',
  'order!threenodes/commands/AddConnectionCommand',
  'order!threenodes/commands/CreateNodeCommand',
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
      @commandMap.register "CreateNodeCommand", ThreeNodes.CreateNodeCommand
      
      @injector.mapSingleton "NodeGraph", ThreeNodes.NodeGraph
      @injector.mapSingleton "AppWebsocket", ThreeNodes.AppWebsocket
      @injector.mapSingleton "AppUI", AppUI
      
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
      ThreeNodes.nodes.list = []
    
      ThreeNodes.webgl_materials_node = []
