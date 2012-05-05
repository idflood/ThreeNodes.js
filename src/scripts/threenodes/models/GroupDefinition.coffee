
define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/utils/Utils',
], (_, Backbone, Utils) ->
  #"use strict"
  
  ### GroupDefinition model ###
  
  # A GroupDefinition defines what is inside a group node, subnodes and internal connections.
  
  namespace "ThreeNodes",
    GroupDefinition: class GroupDefinition extends Backbone.Model
      defaults:
        nodes: []
        connections: []
        name: "Group"
        gid: -1
      
      sync: () =>
      
      getUID: () =>
        @internal_uid += 1
        return @internal_uid
      
      initialize: (options) =>
        super
        @internal_uid = 0
        indexer = options.indexer
        
        if @get("gid") == -1
          @set("gid", indexer.getUID())
        
        if options.fromSelectedNodes && options.fromSelectedNodes != false
          @fromSelectedNodes(options.fromSelectedNodes)
      
      fromSelectedNodes: (selected_nodes) =>
        internal_connections = []
        for node in selected_nodes
          # check each node fields
          for field in node.fields.models
            # loop each connections since we can have multiple out connections
            for connection in field.connections
              indx1 = selected_nodes.indexOf(connection.from_field.node)
              indx2 = selected_nodes.indexOf(connection.to_field.node)
              # if "from" AND "out" are internal add it
              if indx1 != -1 && indx2 != -1
                # don't add it twice
                already_exists = internal_connections.indexOf(connection)
                if already_exists == -1
                  internal_connections.push(connection)
        @attributes.nodes = jQuery.map(selected_nodes, (n, i) -> n.toJSON())
        @attributes.connections = jQuery.map(internal_connections, (c, i) -> c.toJSON())
      
      toJSON: () ->
        res =
          gid: @get("gid")
          name: @get("name")
          connections: @get("connections")
          nodes: @get("nodes")
        res
      
      toCode: () ->
        # todo: export group definition to code
        res = ""
        res
