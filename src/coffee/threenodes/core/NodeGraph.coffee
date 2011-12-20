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
  'order!threenodes/nodes/Spread',
  'order!threenodes/nodes/Particle',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.NodeGraph
    constructor: () ->
      @nodes = []
      @nodes_by_nid = {}
      @node_connections = []
      @types = false
    
    create_node: (component, type, x, y, inXML = false, inJSON = false) =>
      n = new ThreeNodes.nodes.types[component][type](x, y, inXML, inJSON)
      @context.injector.applyContext(n)
      @nodes.push(n)
      @nodes_by_nid[n.nid] = n
      n
    
    get_component_by_type: (type) =>
      if @types == false
        @types = {}
        for comp of ThreeNodes.nodes.types
          for typ of ThreeNodes.nodes.types[comp]
            @types[typ.toString()] = comp
      @types[type]
    
    render: () =>
      invalidNodes = {}
      terminalNodes = {}
      
      for node in @nodes
        if node.has_out_connection() == false || node.auto_evaluate || node.delays_output
          terminalNodes[node.nid] = node
        invalidNodes[node.nid] = node
      
      evaluateSubGraph = (node) ->
        upstreamNodes = node.getUpstreamNodes()
        for upnode in upstreamNodes
          if invalidNodes[upnode.nid] && !upnode.delays_output
            evaluateSubGraph(upnode)
        if node.dirty || node.auto_evaluate
          node.update()
          node.dirty = false
          node.rack.setFieldInputUnchanged()
        
        delete invalidNodes[node.nid]
        true
      
      for nid of terminalNodes
        if invalidNodes[nid]
          evaluateSubGraph(terminalNodes[nid])
      true
    
    addConnection: (c) ->
      @node_connections[@node_connections.length] = c
    
    removeNode: (n) ->
      ind = @nodes.indexOf(n)
      if ind != -1
        @nodes.splice(ind, 1)
      if @nodes_by_nid[n.nid]
        delete @nodes_by_nid[n.nid]
    
    removeConnection: (c) ->
      ind = @node_connections.indexOf(c)
      if ind != -1
        @node_connections.splice(ind, 1)
    
    get_node: (nid) =>
      @nodes_by_nid[nid]
    
    remove_all_nodes: () ->
      $("#tab-attribute").html("")
      while @nodes.length > 0
        @nodes[0].remove()
      true
    
    remove_all_connections: () ->
      while @node_connections.length > 0
        @node_connections[0].remove()
      true
      