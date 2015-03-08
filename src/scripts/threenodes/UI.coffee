require 'jquery'
_ = require 'Underscore'
Backbone = require 'Backbone'
UI = require './views/UI'
Workspace = require './views/Workspace'
GroupDefinitionView = require './views/GroupDefinitionView'
WebglBase = require './utils/WebglBase'

NodeView = require 'threenodes/nodes/views/NodeView'
NodeViewColor = require 'threenodes/nodes/views/Color'
NodeViewWebgl = require 'threenodes/nodes/views/WebGLRenderer'
NodeViewGroup = require 'threenodes/nodes/views/Group'

class UI
  constructor: (@core) ->
    # Define renderer mouseX/Y for use in utils.Mouse node for instance
    ThreeNodes.renderer =
      mouseX: 0
      mouseY: 0

    @webgl = new WebglBase()

    # Initialize the user interface and timeline
    @initUI()
    #@initTimeline()

    # Initialize the workspace view
    @createWorkspace()
    # Make the workspace display the global nodes and connections
    @workspace.render(@core.nodes)

    # Start the url handling
    #
    # Enabling the pushState method would require to redirect path
    # for the node.js server and github page (if possible)
    # for simplicity we disable it
    #Backbone.history.start
    #  pushState: false

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
    if @core.settings.test == false
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

  setDisplayMode: (is_player = false) =>
    if @ui then @ui.setDisplayMode(is_player)

  clearWorkspace: () =>
    @nodes.clearWorkspace()
    @group_definitions.removeAll()
    if @ui then @ui.clearWorkspace()
    #@initTimeline()

UI.nodes = {}
UI.nodes.NodeView = NodeView
UI.nodes.Color = NodeViewColor
UI.nodes.WebGLRenderer = NodeViewWebgl
UI.nodes.Group = NodeViewGroup

module.exports = UI
