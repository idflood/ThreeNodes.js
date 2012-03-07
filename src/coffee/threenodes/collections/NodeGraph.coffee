define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Node',
  'order!threenodes/views/NodeView',
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
  'order!threenodes/collections/ConnectionsCollection',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.NodeGraph extends Backbone.Collection
    
    initialize: (models, options) =>
      @nodes_by_nid = {}
      @fields_by_fid = {}
      @types = false
      @connections = new ThreeNodes.ConnectionsCollection()
      @connections.bind "add", (connection) ->
        view = new ThreeNodes.ConnectionView
          model: connection
      
      @bind "add", (node) ->
        template = ThreeNodes.NodeView.template
        tmpl = _.template(template, node)
        $tmpl = $(tmpl).appendTo("#container")
        view = new ThreeNodes.NodeView
          model: node
          el: $tmpl
        # keep a ref to the view in the model
        # used mainly in NodeView.make_draggable
        # it would be better without this
        node.view = view
      
      @bind "createConnection", (field1, field2) =>
        @connections.create
          from_field: field1
          to_field: field2
    
      ThreeNodes.events.on "RmoveSelectedNodes", @removeSelectedNodes
      ThreeNodes.events.on "CreateNode", @create_node
      ThreeNodes.events.on "ClearWorkspace", @clearWorkspace
    
    clearWorkspace: () =>
      @remove_all_connections()
      @remove_all_nodes()
      @context.reset_global_variables()
      $("#webgl-window canvas").remove()
      
      # create a new timeline
      @trigger("resetTimeline")
      
      return this
    
    create_node: (nodename, x, y, inXML = false, inJSON = false) =>
      if !ThreeNodes.nodes[nodename]
        console.error("Node type doesn't exists: " + nodename)
      n = new ThreeNodes.nodes[nodename]
        x: x
        y: y
        context: @context
        inXML: inXML
        inJSON: inJSON
      
      n.load(inXML, inJSON)
      @add(n)
      @nodes_by_nid[n.get("nid")] = n
      n
    
    render: () =>
      invalidNodes = {}
      terminalNodes = {}
      
      for node in @models
        if node.has_out_connection() == false || node.auto_evaluate || node.delays_output
          terminalNodes[node.get("nid")] = node
        invalidNodes[node.get("nid")] = node
      
      evaluateSubGraph = (node) ->
        upstreamNodes = node.getUpstreamNodes()
        for upnode in upstreamNodes
          if invalidNodes[upnode.get("nid")] && !upnode.delays_output
            evaluateSubGraph(upnode)
        if node.dirty || node.auto_evaluate
          node.update()
          node.dirty = false
          node.rack.setFieldInputUnchanged()
        
        delete invalidNodes[node.get("nid")]
        true
      
      for nid of terminalNodes
        if invalidNodes[nid]
          evaluateSubGraph(terminalNodes[nid])
      true
    
    createConnectionFromObject: (connection) =>
      from_node = @get_node(connection.from_node.toString())
      from = from_node.rack.node_fields_by_name.outputs[connection.from.toString()]
      to_node = @get_node(connection.to_node.toString())
      to = to_node.rack.node_fields_by_name.inputs[connection.to.toString()]
      c = @connections.create
          from_field: from
          to_field: to
          cid: connection.id
      c
    
    renderAllConnections: () =>
      @connections.render()
    
    removeSelectedNodes: () ->
      $(".node.ui-selected").each () ->
        $(this).data("object").remove()
      return true
    
    removeNode: (n) ->
      @remove(n)
      if @nodes_by_nid[n.get("nid")]
        delete @nodes_by_nid[n.get("nid")]
    
    removeConnection: (c) ->
      @connections.remove(c)
    
    get_node: (nid) =>
      @nodes_by_nid[nid]
    
    showNodesAnimation: () =>
      @invoke "showNodeAnimation"
      @
    
    startSound: (time) =>
      @each (node) ->
        if node.playSound instanceof Function
          node.playSound(time)
      @
    
    stopSound: () =>
      @each (node) ->
        if node.stopSound instanceof Function
          node.stopSound()
      @
    
    remove_all_nodes: () ->
      $("#tab-attribute").html("")
      models = @models.concat()
      _.invoke models, "remove"
      @reset([])
      true
    
    remove_all_connections: () ->
      @connections.removeAll()
      