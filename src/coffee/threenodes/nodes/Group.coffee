define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Node',
  'order!threenodes/utils/Utils',
  'order!threenodes/models/GroupDefinition',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.nodes.Group extends ThreeNodes.NodeBase
    @node_name = 'Group'
    @group_name = false
        
    initialize: (options) =>
      super
      @definition = options.definition
      
      # A group contains a sub-nodegraph (nodes)
      @subgraph = new ThreeNodes.NodeGraph([], ThreeNodes.settings.testing_mode)
      
      # Create the subnodes
      for node in @definition.get("nodes")
        n = @subgraph.create_node(node)
        n.post_init()
      
      # Recreate the connections between internal subnodes
      for connection in @definition.get("connections")
        @subgraph.createConnectionFromObject(connection)
        
    set_fields: =>
      @rack.createNodesProxyFields(@subgraph.models)
      return this
    
    remove: () =>
      if @subgraph
        @subgraph.removeAll()
        # todo: create a destroy method and properly clean the sub-nodegraph
        delete @subgraph
      delete @definition
      super
    
    compute: =>
      if !@subgraph then return false
      # Since we are using proxy fields the upstream nodes are 'automatically' handled.
      # For inputs we simply need to copy value from fields to subfield (proxy->field)
      # For outputs we copy sufield value to the field (field->proxy)
      console.log "up"
      # Apply each input proxy to the subfield
      for name, proxyfield of @rack.node_fields.inputs
        console.log proxyfield
        if proxyfield.subfield
          
          proxyfield.subfield.setValue(proxyfield.attributes.value)
      
      # Render the subgraph
      @subgraph.render()
      
      #console.log @subgraph.models
      #return this
      for node in @subgraph.models
        # Apply each outputs field to the proxy
        for name, subfield of node.rack.node_fields.outputs
          if subfield.proxy
            subfield.proxy.setValue(subfield.attributes.value)
      return this
  