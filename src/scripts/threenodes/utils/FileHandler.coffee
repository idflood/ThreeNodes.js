define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Utils = require 'cs!threenodes/utils/Utils'
  CodeExporter = require 'cs!threenodes/utils/CodeExporter'

  require 'libs/BlobBuilder.min'
  require 'libs/FileSaver.min'
  require 'libs/json2'

  class FileHandler extends Backbone.Events
    constructor: (@nodes, @group_definitions) ->
      _.extend(FileHandler::, Backbone.Events)

    saveLocalFile: () =>
      bb = new BlobBuilder()
      result_string = @getLocalJson()
      bb.append(result_string)
      fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.json")

    exportCode: () =>
      # get the json export and convert it to code
      json = @getLocalJson(false)
      exporter = new CodeExporter()
      res = exporter.toCode(json)

      bb = new BlobBuilder()
      bb.append(res)
      fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.js")

    getLocalJson: (stringify = true) =>
      res =
        uid: @nodes.indexer.getUID(false)
        nodes: jQuery.map(@nodes.models, (n, i) -> n.toJSON())
        connections: jQuery.map(@nodes.connections.models, (c, i) -> c.toJSON())
        groups: jQuery.map(@group_definitions.models, (g, i) -> g.toJSON())

      if stringify
        return JSON.stringify(res)
      else
        return res

    loadFromJsonData: (txt) =>
      # Parse the json string
      loaded_data = JSON.parse(txt)

      # First recreate the group definitions
      if loaded_data.groups
        for grp_def in loaded_data.groups
          @group_definitions.create(grp_def)

      # Create the nodes
      for node in loaded_data.nodes
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
      for connection in loaded_data.connections
        @nodes.createConnectionFromObject(connection)

      @nodes.indexer.uid = loaded_data.uid
      delay = (ms, func) -> setTimeout func, ms
      delay 1, => @nodes.renderAllConnections()

    loadLocalFile: (e) =>
      # Clear the workspace first
      @trigger("ClearWorkspace")

      # Load the file
      file = e.target.files[0]
      reader = new FileReader()
      self = this
      reader.onload = (e) ->
        txt = e.target.result
        # Call loadFromJsonData when the file is loaded
        self.loadFromJsonData(txt)
      reader.readAsText(file, "UTF-8")
