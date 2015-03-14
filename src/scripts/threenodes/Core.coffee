#AppWebsocket = require './utils/AppWebsocket'
Nodes = require './nodes/collections/Nodes'
GroupDefinitions = require './collections/GroupDefinitions'
#GroupDefinitionView = require './views/GroupDefinitionView'
#WebglBase = require './utils/WebglBase'

#require 'jquery'

#### App
class Core
  @fields: {models:{}, views: {}}
  @nodes: {models: {}, views: {}}

  constructor: (options) ->
    # Default settings
    settings =
      test: false
      player_mode: false
    @settings = $.extend({}, settings, options)

    # Disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
    # this makes the soundinput node not working
    websocket_enabled = false

    # Initialize some core classes
    @group_definitions = new GroupDefinitions([])
    @nodes = new Nodes([], {settings: settings})
    #@socket = new AppWebsocket(websocket_enabled)

    # Create a group node when selected nodes are grouped
    @group_definitions.bind("definition:created", @nodes.createGroup)

    # When a group definition is removed delete all goup nodes using this definition
    @group_definitions.bind("remove", @nodes.removeGroupsByDefinition)

  @addFieldType: (fieldName, field) ->
    Core.fields.models[fieldName] = field
    return true

  @addFieldView: (fieldName, fieldView) ->
    Core.fields.views[fieldName] = fieldView
    return true

  @addNodeType: (nodeName, nodeType) ->
    Core.nodes.models[nodeName] = nodeType
    return true

  @addNodeView: (viewName, nodeView) ->
    Core.nodes.views[viewName] = nodeView
    return true

module.exports = Core
