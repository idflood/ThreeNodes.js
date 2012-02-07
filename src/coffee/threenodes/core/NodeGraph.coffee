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
      @fields_by_fid = {}
      @node_connections = []
      @types = false
    
    create_node: (nodename, x, y, inXML = false, inJSON = false) =>
      if !ThreeNodes.nodes[nodename]
        console.error("Node type doesn't exists: " + nodename)
      n = new ThreeNodes.nodes[nodename](x, y, inXML, inJSON)
      @context.injector.applyContext(n)
      @nodes.push(n)
      @nodes_by_nid[n.model.get("nid")] = n
      n
    
    render: () =>
      invalidNodes = {}
      terminalNodes = {}
      
      for node in @nodes
        if node.has_out_connection() == false || node.auto_evaluate || node.delays_output
          terminalNodes[node.model.get("nid")] = node
        invalidNodes[node.model.get("nid")] = node
      
      evaluateSubGraph = (node) ->
        upstreamNodes = node.getUpstreamNodes()
        for upnode in upstreamNodes
          if invalidNodes[upnode.model.get("nid")] && !upnode.delays_output
            evaluateSubGraph(upnode)
        if node.dirty || node.auto_evaluate
          node.update()
          node.dirty = false
          node.rack.setFieldInputUnchanged()
        
        delete invalidNodes[node.model.get("nid")]
        true
      
      for nid of terminalNodes
        if invalidNodes[nid]
          evaluateSubGraph(terminalNodes[nid])
      true
    
    addConnection: (c) ->
      @node_connections[@node_connections.length] = c
    
    createConnectionFromObject: (connection) =>
      from_node = @get_node(connection.from_node.toString())
      from = from_node.rack.node_fields_by_name.outputs[connection.from.toString()]
      to_node = @get_node(connection.to_node.toString())
      to = to_node.rack.node_fields_by_name.inputs[connection.to.toString()]
      c = new ThreeNodes.NodeConnection(from, to, connection.id)
      @context.injector.applyContext(c)
      c
    
    renderAllConnections: () =>
      console.log "render all connections"
      for c in @node_connections
        c.render()
      return true
    
    removeNode: (n) ->
      ind = @nodes.indexOf(n)
      if ind != -1
        @nodes.splice(ind, 1)
      if @nodes_by_nid[n.model.get("nid")]
        delete @nodes_by_nid[n.model.get("nid")]
    
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
      