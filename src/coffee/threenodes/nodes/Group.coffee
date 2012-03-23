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
      
      # a group contains a sub-nodegraph (nodes)
      @subgraph = new ThreeNodes.NodeGraph([], ThreeNodes.settings.testing_mode)
      for node in @definition.get("nodes")
        n = @subgraph.create_node(node)
        #n.set_fields()
        n.post_init()
      
      for connection in @definition.get("connections")
        @subgraph.createConnectionFromObject(connection)
        
    set_fields: =>
      # todo ...
      for node in @subgraph.models
        
        if node.rack.hasUnconnectedInputs() == true
          res = $("<div class='subnodes fields-node-#{node.get('nid')}'></div>")
          res.append("<h3>#{node.get('name')}</h3>")
          console.log node.rack.node_fields
          for name, field of node.rack.node_fields.inputs
            field_el = field.render_button()
            console.log "k"
            console.log field_el
            res.append(field_el)
          @rack.trigger("addCustomHtml", res, ".inputs")
        
        
        if node.rack.hasUnconnectedOutputs() == true
          res = $("<div class='subnodes fields-node-#{node.get('nid')}'></div>")
          res.append("<h3>#{node.get('name')}</h3>")
          for name, field of node.rack.node_fields.outputs
            field_el = field.render_button()
            res.append(field_el)
          @rack.trigger("addCustomHtml", res, ".outputs")
    
    remove: () =>
      if @subgraph
        @subgraph.removeAll()
        # todo: create a destroy method and properly clean the sub-nodegraph
        delete @subgraph
      delete @definition
      super
    
    compute: =>
      if @subgraph then @subgraph.render()
      return this
  