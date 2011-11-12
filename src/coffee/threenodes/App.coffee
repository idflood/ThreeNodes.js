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
ThreeNodes.node_connections = []
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
      @nodegraph = new ThreeNodes.NodeGraph()
      @socket = new ThreeNodes.AppWebsocket()
      
      if $("#qunit-tests").length == 0
        @init_ui()
    
    init_ui: () =>
      @ui = new AppUI()
      @ui.bind("render", @nodegraph.render)
      @ui.sidebar.bind("create_node", @nodegraph.create_node)
    clear_workspace: () ->
      @remove_all_connections()
      @remove_all_nodes()
      @reset_global_variables()
      
    remove_all_nodes: () ->
      $("#tab-attribute").html("")
      for node in @nodegraph.nodes
        node.remove()
      true
    remove_all_connections: () ->
      while ThreeNodes.node_connections.length > 0
        ThreeNodes.node_connections[0].remove()
      true
    
    reset_global_variables: () ->
      uid = 0
      ThreeNodes.node_connections = []
      @nodegraph.nodes = []
      ThreeNodes.nodes.fields = {}
      ThreeNodes.nodes.list = []
    
      ThreeNodes.webgl_materials_node = []
