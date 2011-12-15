define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/BlobBuilder.min",
  "order!libs/FileSaver.min",
  "order!libs/json2",
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.FileHandler
    save_local_file: () =>
      bb = new BlobBuilder()
      result_string = @get_local_json()
      bb.append(result_string)
      fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.json")
    
    get_local_json: () =>
      nodegraph = @context.injector.get("NodeGraph")
      res = 
        uid: ThreeNodes.uid
        nodes: jQuery.map(nodegraph.nodes, (n, i) -> n.toJSON())
        connections: jQuery.map(nodegraph.node_connections, (c, i) -> c.toJSON())
      JSON.stringify(res)
    
    get_local_xml: () =>
      nodegraph = @context.injector.get("NodeGraph")
      res = ""
      res += '<?xml version="1.0" encoding="UTF-8"?>\n'
      res += ("<app>\n")
    
      res += "\t<uid last='#{ThreeNodes.uid}' />\n"
    
      res += "\t<nodes>\n"
      for node in nodegraph.nodes
        res += node.toXML()
      res += "\t</nodes>\n"
      
      res += "\t<connections>\n"
      for c in nodegraph.node_connections
        res += c.toXML()
      res += "\t</connections>\n"
      
      res += "</app>"
      res
    
    load_from_json_data: (txt) =>
      nodegraph = @context.injector.get("NodeGraph")
      loaded_data = JSON.parse(txt)
      for node in loaded_data.nodes
        component = nodegraph.get_component_by_type(node.type)
        n = nodegraph.create_node(component, node.type, node.x, node.y, false, node)
      
      for connection in loaded_data.connections
        from_node = nodegraph.get_node(connection.from_node.toString())
        from = from_node.rack.node_fields_by_name.outputs[connection.from.toString()]
        to_node = nodegraph.get_node(connection.to_node.toString())
        to = to_node.rack.node_fields_by_name.inputs[connection.to.toString()]
        c = new ThreeNodes.NodeConnection(from, to, connection.id)
        @context.injector.applyContext(c)
      ThreeNodes.uid = loaded_data.uid
    
    load_from_xml_data: (txt) =>
      nodegraph = @context.injector.get("NodeGraph")
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
        from = ThreeNodes.nodes.fields[from.toString()]
        to = ThreeNodes.nodes.fields[to.toString()]
        c = new NodeConnection(from, to, cid)
        @context.injector.applyContext(c)
      ThreeNodes.uid = parseInt $("uid", loaded_data).attr("last")
    
    load_local_file_input_changed: (e) =>
      @context.commandMap.execute("ClearWorkspaceCommand")
      nodegraph = @context.injector.get("NodeGraph")
      file = e.target.files[0]
      reader = new FileReader()
      self = this
      reader.onload = (e) ->
        txt = e.target.result
        self.load_from_json_data(txt)
      reader.readAsText(file, "UTF-8")
