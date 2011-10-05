nodegraph = {}
nodegraph.nodes = []
nodegraph.types = false

nodegraph.create_node = (component, type, x, y, inXML = false) ->
  n = false
  n = new nodes.types[component][type](x, y, inXML)
  nodegraph.nodes.push(n)
  n

nodegraph.get_component_by_type = (type) ->
  if nodegraph.types == false
    nodegraph.types = {}
    for comp of nodes.types
      for typ of nodes.types[comp]
        nodegraph.types[typ.toString()] = comp
  nodegraph.types[type]

nodegraph.render = () ->
  for node in nodegraph.nodes
    if node.has_out_connection() == false
      node.update()
  for node in nodegraph.nodes
    node.updated = false
  true