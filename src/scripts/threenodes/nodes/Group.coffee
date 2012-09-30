define [
  'Underscore',
  'Backbone',
  'cs!threenodes/models/Node',
  'cs!threenodes/utils/Utils',
  'cs!threenodes/models/GroupDefinition',
], (_, Backbone) ->
  #"use strict"

  namespace "ThreeNodes.nodes",
    Group: class Group extends ThreeNodes.NodeBase
      @node_name = 'Group'
      @group_name = false

      initialize: (options) =>
        # First create the subnodes so that when the group node is inited
        # the fields are accessible
        @initSubnodes(options)

        # Now that subnodes are created we can safely init the group node
        super

        # Set auto evaluate to true since we want to be sure to update subnodes
        # There could be no incoming connection but an auto evaluated subnode,
        # if we don't evaluate the group the subnode will never update
        @auto_evaluate = true

        # Recreate the connections between internal subnodes
        for connection in @definition.get("connections")
          @nodes.createConnectionFromObject(connection)

      initSubnodes: (options) =>
        # A group contains a sub-nodes (nodes)
        @nodes = new ThreeNodes.NodesCollection([], {settings: options.settings})

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

      setFields: =>
        @fields.createNodesProxyFields(@nodes.models)
        return this

      remove: () =>
        if @nodes
          @nodes.removeAll()
          # todo: create a destroy method and properly clean the sub-nodes
          delete @nodes
        delete @definition
        super

      compute: =>
        if !@nodes then return false
        # Since we are using proxy fields the upstream nodes are 'automatically' handled.
        # For inputs we simply need to copy value from fields to subfield (proxy->field)
        # For outputs we copy subfield value to the field (field->proxy)
        # The value propagation is directly handled in field.setValue
        @nodes.render()
        return this

