define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/core/Node',
  'order!threenodes/nodes/Base',
  'order!threenodes/nodes/Conditional',
  'order!threenodes/nodes/Geometry',
  'order!threenodes/nodes/Lights',
  'order!threenodes/nodes/Materials',
  'order!threenodes/nodes/Math',
  'order!threenodes/nodes/PostProcessing',
  'order!threenodes/nodes/Three',
  'order!threenodes/nodes/Utils',
], ($, _, Backbone) ->
  class ThreeNodes.NodeGraph
    constructor: () ->
      @nodes = []
      @node_connections = []
      @types = false
    
    create_node: (component, type, x, y, inXML = false) =>
      n = new ThreeNodes.nodes.types[component][type](x, y, inXML)
      @context.injector.applyContext(n)
      @nodes.push(n)
      n
    
    get_component_by_type: (type) =>
      if @types == false
        @types = {}
        for comp of ThreeNodes.nodes.types
          for typ of ThreeNodes.nodes.types[comp]
            @types[typ.toString()] = comp
      @types[type]
    
    render: () =>
      for node in @nodes
        if node.has_out_connection() == false
          node.update()
      for node in @nodes
        node.updated = false
      true
    
    addConnection: (c) ->
      @node_connections[@node_connections.length] = c
    
    removeConnection: (c) ->
      ind = @node_connections.indexOf(c)
      if ind != -1
        @node_connections.splice(ind, 1)
    
    remove_all_nodes: () ->
      $("#tab-attribute").html("")
      for node in @nodes
        node.remove()
      true
    
    remove_all_connections: () ->
      while @node_connections.length > 0
        @node_connections[0].remove()
      true