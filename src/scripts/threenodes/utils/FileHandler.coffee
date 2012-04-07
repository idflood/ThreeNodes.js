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
        uid: @nodes.indexer.get_uid(false)
        nodes: jQuery.map(@nodes.models, (n, i) -> n.toJSON())
        connections: jQuery.map(@nodes.connections.models, (c, i) -> c.toJSON())
        groups: jQuery.map(@group_definitions.models, (g, i) -> g.toJSON())
      
      if stringify
        return JSON.stringify(res)
      else
        return res
        
    load_from_json_data: (txt) =>
      loaded_data = JSON.parse(txt)
      if loaded_data.groups
        for grp_def in loaded_data.groups
          @group_definitions.create(grp_def)
      
      for node in loaded_data.nodes
        if node.type != "Group"
          @nodes.create_node(node)
        else
          def = @group_definitions.getByGid(node.definition_id)
          if def
            node.definition = def
            grp = @nodes.createGroup(node)
          else
            console.log "can't find the GroupDefinition: #{node.definition_id}"
      
      for connection in loaded_data.connections
        @nodes.createConnectionFromObject(connection)
      
      @nodes.indexer.uid = loaded_data.uid
      delay = (ms, func) -> setTimeout func, ms
      delay 1, => @nodes.renderAllConnections()
    
    load_local_file: (e) =>
      @trigger("ClearWorkspace")
      file = e.target.files[0]
      reader = new FileReader()
      self = this
      reader.onload = (e) ->
        txt = e.target.result
        self.load_from_json_data(txt)
      reader.readAsText(file, "UTF-8")
