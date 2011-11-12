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
      @types = false
    
    create_node: (component, type, x, y, inXML = false) =>
      n = new ThreeNodes.nodes.types[component][type](x, y, inXML)
      @nodes.push(n)
      n
    
    get_component_by_type: (type) =>
      if @types == false
        @types = {}
        for comp of nodes.types
          for typ of nodes.types[comp]
            @types[typ.toString()] = comp
      @types[type]
    
    render: () =>
      for node in @nodes
        if node.has_out_connection() == false
          node.update()
      for node in @nodes
        node.updated = false
      true
