define [
  'Underscore', 
  'Backbone',
  'order!threenodes/utils/Utils',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.GroupDefinition extends Backbone.Model
    defaults:
      "nodes": {}
      "conncections": {}
      "name": "Group"
    
    sync: () =>
    
    getUID: () =>
      @internal_uid += 1
      return @internal_uid
    
    initialize: (options) =>
      @internal_uid = 0
      if options.fromSelectedNodes && options.fromSelectedNodes == true
        @fromSelectedNodes()
    
    fromSelectedNodes: () =>
      selected_nodes = []
      $(".node.ui-selected").each () ->
        selected_nodes.push($(this).data("object"))
      external_connections = []
      for node in selected_nodes
        # check each node fields
        for field in node.rack.models
          # loop each connections since we can have multiple out connections
          for connection in field.connections
            indx1 = selected_nodes.indexOf(connection.from_field.node)
            indx2 = selected_nodes.indexOf(connection.to_field.node)
            # if from or out is external add it
            if indx1 == -1 || indx2 == -1
              # don't add it twice
              already_exists = external_connections.indexOf(connection)
              if already_exists == -1
                external_connections.push(connection)
      data =
        nodes: jQuery.map(selected_nodes, (n, i) -> n.toJSON())
        connections: jQuery.map(external_connections, (c, i) -> c.toJSON())
      console.log data
    
    remove: =>
      super
    
    toJSON: () ->
      res =
        name: @get("name")
        conncections: @get("conncections")
        nodes: @get("nodes")
      res
    
    toCode: () ->
      res = ""
      res
