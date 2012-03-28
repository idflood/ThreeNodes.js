define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Node',
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
  'order!threenodes/nodes/Group',
  'order!threenodes/collections/Connections',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.NodeGraph extends Backbone.Collection
    
    initialize: (models, options) =>
      @connections = new ThreeNodes.ConnectionsCollection()
      self = this
      # save material nodes in an array so they can be quickly rebuild
      @materials = []
      
      @connections.bind "add", (connection) ->
        self.trigger "nodeslist:rebuild", self
      
      @bind "remove", (node) =>
        indx = @materials.indexOf(node)
        if indx != -1
          @materials.splice(indx, 1)
        self.trigger "nodeslist:rebuild", self
      
      @bind "RebuildAllShaders", () =>
        for node in @materials
          node.rebuildShader()
      
      @connections.bind "remove", (connection) ->
        self.trigger "nodeslist:rebuild", self
      
      @bind "add", (node) ->
        if node.is_material && node.is_material == true
          @materials.push(node)
        
        self.trigger "nodeslist:rebuild", self
            
      @bind "createConnection", (field1, field2) =>
        @connections.create
          from_field: field1
          to_field: field2
    
    clearWorkspace: () =>
      @removeAllConnections()
      @removeAll()
      $("#webgl-window canvas").remove()
      @materials = []
      return this
    
    bindTimelineEvents: (timeline) =>
      if @timeline
        @timeline.off("trackRebuild", @showNodesAnimation)
        @timeline.off("startSound", @startSound)
        @timeline.off("stopSound", @stopSound)
      console.log "binding timeline"
      @timeline = timeline
      @timeline.on("trackRebuild", @showNodesAnimation)
      @timeline.on("startSound", @startSound)
      @timeline.on("stopSound", @stopSound)
    
    create_node: (options) =>
      opt = options
      if $.type(opt) == "string"
        opt = {type: opt}
      
      opt.timeline = @timeline
      
      if !ThreeNodes.nodes[opt.type]
        console.error("Node type doesn't exists: " + opt.type)
      
      n = new ThreeNodes.nodes[opt.type](opt)
      @add(n)
      n
    
    render: () =>
      invalidNodes = {}
      terminalNodes = {}
      
      for node in @models
        if node.has_out_connection() == false || node.auto_evaluate || node.delays_output
          terminalNodes[node.attributes["nid"]] = node
        invalidNodes[node.attributes["nid"]] = node
      
      evaluateSubGraph = (node) ->
        upstreamNodes = node.getUpstreamNodes()
        for upnode in upstreamNodes
          if invalidNodes[upnode.attributes["nid"]] && !upnode.delays_output
            evaluateSubGraph(upnode)
        if node.dirty || node.auto_evaluate
          node.compute()
          node.dirty = false
          node.rack.setFieldInputUnchanged()
        
        delete invalidNodes[node.attributes["nid"]]
        true
      
      for nid of terminalNodes
        if invalidNodes[nid]
          evaluateSubGraph(terminalNodes[nid])
      true
    
    createConnectionFromObject: (connection) =>
      from_node = @getNodeByNid(connection.from_node.toString())
      from = from_node.rack.node_fields.outputs[connection.from.toString()]
      to_node = @getNodeByNid(connection.to_node.toString())
      to = to_node.rack.node_fields.inputs[connection.to.toString()]
      # if a field is missing try to switch from/to
      if !from || !to
        tmp = from_node
        from_node = to_node
        to_node = tmp
        from = from_node.rack.node_fields.outputs[connection.to.toString()]
        to = to_node.rack.node_fields.inputs[connection.from.toString()]
      
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
    
    createGroup: (model, external_objects = []) =>
      # create the group node
      grp = @create_node(model)
      
      # Recreate the external connections
      for connection in external_objects
        if connection.to_subfield
          from = @getNodeByNid(connection.from_node).rack.getField(connection.from, true)
          to = grp.rack.getField(connection.to + "-" + connection.to_node)
        else
          from = grp.rack.getField(connection.from + "-" + connection.from_node, true)
          to = @getNodeByNid(connection.to_node).rack.getField(connection.to)
        
        c = @connections.create
          from_field: from
          to_field: to
      
      return this
    
    removeConnection: (c) ->
      @connections.remove(c)
    
    getNodeByNid: (nid) =>
      for node in @models
        if node.get("nid").toString() == nid.toString()
          return node
      return false
    
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
    
    removeAll: () ->
      $("#tab-attribute").html("")
      models = @models.concat()
      _.invoke models, "remove"
      @reset([])
      true
    
    removeAllConnections: () ->
      @connections.removeAll()
      