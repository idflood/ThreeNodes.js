define [
  'use!Underscore', 
  'use!Backbone',
  'order!threenodes/utils/Utils',
], (_, Backbone, Utils) ->
  "use strict"
  
  class ThreeNodes.GroupDefinition extends Backbone.Model
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
      
      if @get("gid") == -1
        @set("gid", Utils.get_uid())
      
      if options.fromSelectedNodes && options.fromSelectedNodes != false
        @fromSelectedNodes(options.fromSelectedNodes)
    
    fromSelectedNodes: (selected_nodes) =>
      internal_connections = []
      for node in selected_nodes
        # check each node fields
        for field in node.rack.models
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
    
    remove: =>
      super
    
    toJSON: () ->
      res =
        gid: @get("gid")
        name: @get("name")
        connections: @get("connections")
        nodes: @get("nodes")
      res
    
    toCode: () ->
      res = ""
      res
