define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Indexer = require 'cs!threenodes/utils/Indexer'
  Connections = require 'cs!threenodes/collections/Connections'

  require 'cs!threenodes/models/Node'
  require 'cs!threenodes/nodes/Base'
  require 'cs!threenodes/nodes/Conditional'
  require 'cs!threenodes/nodes/Geometry'
  require 'cs!threenodes/nodes/Lights'
  require 'cs!threenodes/nodes/Materials'
  require 'cs!threenodes/nodes/Math'
  require 'cs!threenodes/nodes/PostProcessing'
  require 'cs!threenodes/nodes/Three'
  require 'cs!threenodes/nodes/ConstructiveSolidGeometry'
  require 'cs!threenodes/nodes/Utils'
  require 'cs!threenodes/nodes/Spread'
  require 'cs!threenodes/nodes/Particle'
  require 'cs!threenodes/nodes/Group'

  namespace "ThreeNodes",
    NodesCollection: class NodesCollection extends Backbone.Collection

      initialize: (models, options) =>
        @settings = options.settings
        self = this
        # save material nodes in an array so they can be quickly rebuild
        @materials = []

        # Each node collections has it's own indexer, used to get unique id
        @indexer = new Indexer()

        # Create the connections collection
        @connections = new Connections([], {indexer: @indexer})

        # Parent node, used for groups
        @parent = options.parent

        @connections.bind "add", (connection) ->
          self.trigger "nodeslist:rebuild", self

        @bind "remove", (node) =>
          indx = @materials.indexOf(node)
          if indx != -1
            @materials.splice(indx, 1)
          self.trigger "nodeslist:rebuild", self

        @bind "RebuildAllShaders", () =>
          for node in @materials
            node.rebuildShader()

        @connections.bind "remove", (connection) ->
          self.trigger "nodeslist:rebuild", self

        @bind "add", (node) ->
          if node.is_material && node.is_material == true
            @materials.push(node)

          self.trigger "nodeslist:rebuild", self

        @bind "createConnection", (field1, field2) =>
          @connections.create
            from_field: field1
            to_field: field2

      clearWorkspace: () =>
        @removeConnections()
        @removeAll()
        $("#webgl-window canvas").remove()
        @materials = []
        @indexer.reset()
        return this

      destroy: () =>
        @removeConnections()
        @removeAll()
        delete @materials
        delete @indexer
        delete @connections

      bindTimelineEvents: (timeline) =>
        if @timeline
          @timeline.off("tfieldsRebuild", @showNodesAnimation)
          @timeline.off("startSound", @startSound)
          @timeline.off("stopSound", @stopSound)

        @timeline = timeline
        @timeline.on("tfieldsRebuild", @showNodesAnimation)
        @timeline.on("startSound", @startSound)
        @timeline.on("stopSound", @stopSound)

      createNode: (options) =>
        # If not is a string instead of an object then take the option as the node type
        if $.type(options) == "string"
          options = {type: options}

        # Save references of the application settings and timeline in the node model
        options.timeline = @timeline
        options.settings = @settings

        # Save a reference of the nodes indexer
        options.indexer = @indexer

        options.parent = @parent

        # Print error if the node type is not found and return false
        if !ThreeNodes.nodes.models[options.type]
          console.error("Node type doesn't exists: " + options.type)
          return false

        # Create the node and pass the options
        n = new ThreeNodes.nodes.models[options.type](options)

        # Add the node to the collection
        @add(n)
        n

      render: () =>
        # Define temporary objects to index the nodes
        invalidNodes = {}
        terminalNodes = {}

        # Flatten the array of nodes.
        # Nodes from groups will appear in the invalidNodes and/or terminalNodes too
        # Get all root nodes and nodes requiring an update
        buildNodeArrays = (nodes) ->
          for node in nodes
            if node.hasOutConnection() == false || node.auto_evaluate || node.delays_output
              terminalNodes[node.attributes["nid"] + "/" + node.attributes["gid"]] = node
            invalidNodes[node.attributes["nid"] + "/" + node.attributes["gid"]] = node
            if node.nodes
              buildNodeArrays(node.nodes.models)
        buildNodeArrays(@models)

        # Update a node and his parents
        evaluateSubGraph = (node) ->
          upstreamNodes = node.getUpstreamNodes()
          for upnode in upstreamNodes
            if invalidNodes[upnode.attributes["nid"] + "/" + upnode.attributes["gid"]] && !upnode.delays_output
              evaluateSubGraph(upnode)
          if node.dirty || node.auto_evaluate
            node.compute()
            node.dirty = false
            node.fields.setFieldInputUnchanged()

          delete invalidNodes[node.attributes["nid"] + "/" + node.attributes["gid"]]
          true

        # Process all root nodes which require an update
        for nid of terminalNodes
          if invalidNodes[nid]
            evaluateSubGraph(terminalNodes[nid])
        true

      createConnectionFromObject: (connection) =>

        # Get variables from their id
        from_gid = if connection.from_node_gid then connection.from_node_gid.toString() else "-1"
        from_node = @getNodeByNid(connection.from_node.toString(), from_gid)
        from = from_node.fields.outputs[connection.from.toString()]
        to_gid = if connection.to_node_gid then connection.to_node_gid.toString() else "-1"
        to_node = @getNodeByNid(connection.to_node.toString(), to_gid)
        to = to_node.fields.inputs[connection.to.toString()]

        # If a field is missing try to switch from/to
        if !from || !to
          tmp = from_node
          from_node = to_node
          to_node = tmp
          from = from_node.fields.outputs[connection.to.toString()]
          to = to_node.fields.inputs[connection.from.toString()]

        c = @connections.create
            from_field: from
            to_field: to
            cid: connection.id

        c

      createGroup: (model, external_objects = []) =>
        # create the group node
        grp = @createNode(model)

        # Recreate the external connections
        for connection in external_objects
          from = false
          to = false
          if connection.to_subfield
            from = @getNodeByNid(connection.from_node).fields.getField(connection.from, true)
            target_node = @getNodeByNid(connection.to_node)
            if target_node
              to = target_node.fields.getField(connection.to, false)
          else
            target_node = @getNodeByNid(connection.from_node)
            if target_node
              from = target_node.fields.getField(connection.from, true)
            to = @getNodeByNid(connection.to_node).fields.getField(connection.to)

          c = @connections.create
            from_field: from
            to_field: to

        return grp

      removeGroupsByDefinition: (def) =>
        _nodes = @models.concat()
        _.each _nodes, (node) -> if node.definition && node.definition.gid == def.gid then node.remove()

      renderAllConnections: () =>
        @connections.render()

      removeConnection: (c) ->
        @connections.remove(c)

      getNodeByNid: (nid, gid = "-1") =>
        for node in @models
          if node.get("nid").toString() == nid.toString()
            if gid == "-1" || node.get("gid").toString() == gid.toString()
              return node
          # special case for group
          if node.nodes
            res = node.nodes.getNodeByNid(nid, gid)
            if res then return res

        return false

      showNodesAnimation: () =>
        @invoke "showNodeAnimation"

      startSound: (time) =>
        @each (node) -> if node.playSound instanceof Function then node.playSound(time)

      stopSound: () =>
        @each (node) -> if node.stopSound instanceof Function then node.stopSound()

      removeSelectedNodes: () ->
        for node in $(".node.ui-selected")
          $(node).data("object").remove()

      removeAll: () ->
        $("#tab-attribute").html("")
        models = @models.concat()
        _.invoke models, "remove"
        @reset([])
        true

      removeConnections: () ->
        @connections.removeAll()

