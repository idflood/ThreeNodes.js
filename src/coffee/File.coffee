save_local_file = () ->
  bb = new BlobBuilder()
  console.log window
  bb.append('<?xml version="1.0" encoding="UTF-8"?>\n')
  bb.append("<app>\n")

  bb.append("\t<uid last='#{uid}' />\n")

  bb.append("\t<nodes>\n")
  for node in nodegraph.nodes
    bb.append(node.toXML())
  bb.append("\t</nodes>\n")
  
  bb.append("\t<connections>\n")
  for c in node_connections
    bb.append(c.toXML())
  bb.append("\t</connections>\n")
  
  bb.append("</app>")
  fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.xml")
  
load_local_file_input_changed = (e) ->
  remove_all_connections()
  remove_all_nodes()
  reset_global_variables()
  file = this.files[0]
  reader = new FileReader()
  reader.onload = (e) ->
    txt = e.target.result
    loaded_data = $(txt)
    
    $("node", loaded_data).each () ->
      $this = $(this)
      x = parseInt $this.attr("x")
      y = parseInt $this.attr("y")
      nid = parseInt $this.attr("nid")
      type = $this.attr("type")
      component = nodegraph.get_component_by_type(type)
      n = nodegraph.create_node(component, type, x, y, $this)
    
    $("connection", loaded_data).each () ->
      $this = $(this)
      from = parseInt $this.attr("from")
      to = parseInt $this.attr("to")
      cid = parseInt $this.attr("id")
      from = nodes.fields[from.toString()]
      to = nodes.fields[to.toString()]
      c = new NodeConnection(from, to, cid)
    uid = parseInt $("uid", loaded_data).attr("last")
  reader.readAsText(file, "UTF-8")
  
remove_all_nodes = () ->
  $("#tab-attribute").html("")
  for node in nodegraph.nodes
    node.remove()
remove_all_connections = () ->
  for c in node_connections
    c.remove()

reset_global_variables = () ->
  uid = 0
  node_connections = []
  nodegraph.nodes = []
  nodes.fields = {}
  nodes.list = []

  webgl_materials_node = []