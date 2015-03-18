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

    # Initialize some core classes
    @group_definitions = new GroupDefinitions([])
    @nodes = new Nodes([], {settings: @settings})

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

  setNodes: (json_object) ->
    @nodes.removeAll()
    # First recreate the group definitions
    if json_object.groups
      for grp_def in json_object.groups
        @group_definitions.create(grp_def)

    # Create the nodes
    for node in json_object.nodes
      if node.type != "Group"
        # Create a simple node
        @nodes.createNode(node)
      else
        # If the node is a group we first need to get the previously created group definition
        def = @group_definitions.getByGid(node.definition_id)
        if def
          node.definition = def
          grp = @nodes.createGroup(node)
        else
          console.log "can't find the GroupDefinition: #{node.definition_id}"

    # Create the connections
    for connection in json_object.connections
      @nodes.createConnectionFromObject(connection)

    @nodes.indexer.uid = json_object.uid
    delay = (ms, func) -> setTimeout func, ms
    delay 1, => @nodes.renderAllConnections()

module.exports = Core
