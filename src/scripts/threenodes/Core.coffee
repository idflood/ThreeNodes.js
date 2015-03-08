UrlHandler = require './utils/UrlHandler'
FileHandler = require './utils/FileHandler'
#AppWebsocket = require './utils/AppWebsocket'
Nodes = require './nodes/collections/Nodes'
GroupDefinitions = require './collections/GroupDefinitions'
#GroupDefinitionView = require './views/GroupDefinitionView'
#WebglBase = require './utils/WebglBase'

#require 'jquery'

#### App
class Core
  constructor: (options) ->
    # Default settings
    settings =
      test: false
      player_mode: false
    @settings = $.extend(settings, options)

    # Disable websocket by default since this makes firefox sometimes throw an exception if the server isn't available
    # this makes the soundinput node not working
    websocket_enabled = false

    # Initialize some core classes
    @url_handler = new UrlHandler()
    @group_definitions = new GroupDefinitions([])
    @nodes = new Nodes([], {settings: settings})
    #@socket = new AppWebsocket(websocket_enabled)
    @file_handler = new FileHandler(@nodes, @group_definitions)

    # Create a group node when selected nodes are grouped
    @group_definitions.bind "definition:created", @nodes.createGroup

    # When a group definition is removed delete all goup nodes using this definition
    @group_definitions.bind "remove", @nodes.removeGroupsByDefinition

    # File and url events
    @url_handler.on("LoadJSON", @file_handler.loadFromJsonData)

    return true

module.exports = Core
