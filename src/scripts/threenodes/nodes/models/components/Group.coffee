define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Nodes = require 'cs!threenodes/nodes/collections/Nodes'
  Node = require 'cs!threenodes/nodes/models/Node'

  namespace "ThreeNodes.nodes.models",
    Group: class Group extends Node
      @node_name = 'Group'
      @group_name = false

      initialize: (options) =>
        # First create the subnodes so that when the group node is inited
        # the fields are accessible
        @initSubnodes(options)

        # Now that subnodes are created we can safely init the group node
        super

        # set the subnodes gid
        @nodes.each (node) => node.set("gid", @get("nid"))

        # Recreate the connections between internal subnodes
        for connection in @definition.get("connections")
          @nodes.createConnectionFromObject(connection)

      initSubnodes: (options) =>
        # A group contains a sub-nodes (nodes)
        @nodes = new Nodes([], {settings: options.settings, parent: this})

        # Save the group definition reference
        @definition = options.definition

        # Create the subnodes
        #for node in @definition.get("nodes")
        # To test.... what if we load saved nodes if any, or the definition
        nds = if options.nodes then options.nodes else @definition.get("nodes")

        for node in nds
          n = @nodes.createNode(node)

      toJSON: () =>
        res =
          nid: @get('nid')
          name: @get('name')
          type: @typename()
          anim: @getAnimationData()
          x: @get('x')
          y: @get('y')
          #fields: @fields.toJSON() fields doesn't exists anymore... need to find a way to load saved data
          nodes: jQuery.map(@nodes.models, (n, i) -> n.toJSON())
          definition_id: @definition.get("gid")

        res

      getFields: =>
        # don't return any fields, we will render each subnodes
        return false

      remove: () =>
        if @nodes
          @nodes.destroy()
          # todo: create a destroy method and properly clean the sub-nodes
          delete @nodes
        delete @definition
        super

      compute: =>
        # no need to do special things since the subnodes are
        # "merged in the main arrays" in nodes.render
        return this

