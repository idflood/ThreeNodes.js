define [
  'Underscore',
  'Backbone',
  'cs!threenodes/models/Node',
  'cs!threenodes/utils/Utils',
  'cs!threenodes/models/GroupDefinition',
], (_, Backbone) ->
  #"use strict"

  namespace "ThreeNodes.nodes.models",
    Group: class Group extends ThreeNodes.NodeBase
      @node_name = 'Group'
      @group_name = false

      initialize: (options) =>
        # First create the subnodes so that when the group node is inited
        # the fields are accessible
        @initSubnodes(options)

        # Now that subnodes are created we can safely init the group node
        super

        # Recreate the connections between internal subnodes
        for connection in @definition.get("connections")
          @nodes.createConnectionFromObject(connection)

      initSubnodes: (options) =>
        # A group contains a sub-nodes (nodes)
        @nodes = new ThreeNodes.NodesCollection([], {settings: options.settings, parent: this})

        # Save the group definition reference
        @definition = options.definition

        # Create the subnodes
        for node in @definition.get("nodes")
          n = @nodes.createNode(node)

      toJSON: () =>
        res =
          nid: @get('nid')
          name: @get('name')
          type: @typename()
          anim: @getAnimationData()
          x: @get('x')
          y: @get('y')
          fields: @fields.toJSON()
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

