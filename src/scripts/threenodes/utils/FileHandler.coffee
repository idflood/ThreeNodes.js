define [
  'use!Underscore', 
  'use!Backbone',
  'threenodes/utils/Utils',
  'order!threenodes/utils/CodeExporter',
  "order!libs/BlobBuilder.min",
  "order!libs/FileSaver.min",
  "order!libs/json2",
], (_, Backbone, Utils) ->
  "use strict"
  $ = jQuery
  
  class ThreeNodes.FileHandler extends Backbone.Events
    constructor: (@nodes, @group_definitions) ->
      _.extend(FileHandler::, Backbone.Events)
      
    save_local_file: () =>
      bb = new BlobBuilder()
      result_string = @get_local_json()
      bb.append(result_string)
      fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.json")
    
    export_code: () =>
      # get the json export and convert it to code
      json = @get_local_json(false)
      exporter = new ThreeNodes.CodeExporter()
      res = exporter.toCode(json)
      
      bb = new BlobBuilder()
      bb.append(res)
      fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.js")
      
    get_local_json: (stringify = true) =>
      res = 
        uid: Utils.get_uid(false)
        nodes: jQuery.map(@nodes.models, (n, i) -> n.toJSON())
        connections: jQuery.map(@nodes.connections.models, (c, i) -> c.toJSON())
        groups: jQuery.map(@group_definitions.models, (g, i) -> g.toJSON())
      if stringify
        return JSON.stringify(res)
      else
        return res
    
    get_local_xml: () =>
      res = ""
      res += '<?xml version="1.0" encoding="UTF-8"?>\n'
      res += ("<app>\n")
    
      res += "\t<uid last='#{ThreeNodes.get_uid(false)}' />\n"
    
      res += "\t<nodes>\n"
      for node in @nodes.models
        res += node.toXML()
      res += "\t</nodes>\n"
      
      res += "\t<connections>\n"
      for c in @nodes.connections.models
        res += c.toXML()
      res += "\t</connections>\n"
      
      res += "</app>"
      res
    
    load_from_json_data: (txt) =>
      loaded_data = JSON.parse(txt)
      for grp_def in loaded_data.groups
        @group_definitions.create(grp_def)
      
      for node in loaded_data.nodes
        if node.type != "Group"
          @nodes.create_node(node)
        else
          def = @group_definitions.getByGid(node.definition_id)
          if def
            @nodes.createGroup(node)
          else
            console.log "can't find the GroupDefinition: #{node.definition_id}"
      
      for connection in loaded_data.connections
        @nodes.createConnectionFromObject(connection)
      
      Utils.uid = loaded_data.uid
      delay = (ms, func) -> setTimeout func, ms
      delay 1, => @nodes.renderAllConnections()
    
    load_from_xml_data: (txt) =>
      loaded_data = $(txt)
      
      $("node", loaded_data).each () ->
        $this = $(this)
        x = parseInt $this.attr("x")
        y = parseInt $this.attr("y")
        nid = parseInt $this.attr("nid")
        type = $this.attr("type")
        n = @nodes.create_node($this)
      
      $("connection", loaded_data).each () ->
        $this = $(this)
        from = parseInt $this.attr("from")
        to = parseInt $this.attr("to")
        cid = parseInt $this.attr("id")
        from = ThreeNodes.nodes.fields[from.toString()]
        to = ThreeNodes.nodes.fields[to.toString()]
        c = @nodes.connections.create
          from_field: from
          to_field: to
          cid: cid
        
      ThreeNodes.uid = parseInt $("uid", loaded_data).attr("last")
    
    load_local_file: (e) =>
      @trigger("ClearWorkspace")
      file = e.target.files[0]
      reader = new FileReader()
      self = this
      reader.onload = (e) ->
        txt = e.target.result
        self.load_from_json_data(txt)
      reader.readAsText(file, "UTF-8")
