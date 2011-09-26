nodegraph = {}
nodegraph.nodes = []

nodegraph.create_node = (component, type, x, y) ->
  n = false
  n = new nodes.types[component][type](x, y)
  #switch type
  #  when "Number" then n = new nodes.types.Number(200, 100)
  #  when "String" then n = new nodes.types.String(200, 100)
  
  #n.init($("#container"))
  nodegraph.nodes.push(n)

nodegraph.render = () ->
  for node in nodegraph.nodes
    if node.has_out_connection() == false
      node.update()
  for node in nodegraph.nodes
    node.updated = false
  true