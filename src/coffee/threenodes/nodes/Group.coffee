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
    
    initialize: (options) ->
      super
      @definition = options.definition
      # a group contains a sub-nodegraph (nodes)
      @subgraph = new ThreeNodes.NodeGraph([], ThreeNodes.settings.testing_mode)
      for node in @definition.get("nodes")
        n = @subgraph.create_node(node)
      
      for connection in @definition.get("connections")
        @subgraph.createConnectionFromObject(connection)
      @renderNestedFields()
    
    renderNestedFields: () =>
      # todo ...
    
    remove: () =>
      if @subgraph
        @subgraph.removeAll()
        # todo: create a destroy method and properly clean the sub-nodegraph
        delete @subgraph
      delete @definition
      super
    
    set_fields: =>
      super
      
  
    compute: =>
      if @subgraph then @subgraph.render()
      return this
  