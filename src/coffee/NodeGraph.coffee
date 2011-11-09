class NodeGraph
  constructor: () ->
    @nodes = []
    @types = false
  
  create_node: (component, type, x, y, inXML = false) =>
    n = false
    n = new nodes.types[component][type](x, y, inXML)
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