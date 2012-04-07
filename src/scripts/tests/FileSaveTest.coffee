define [
  'use!Underscore', 
  'use!Backbone',
  "order!libs/qunit-git",
], (_, Backbone) ->
  "use strict"
  
  $ = jQuery
  
  class FileSaveTest
    constructor: (app) ->
      module "File"
      
      test "JSON save", () ->
        ng = app.nodegraph
        filehandler = app.file_handler
        app.clearWorkspace()
        
        # test with two number nodes connected
        n1 = ng.create_node({type: "Number", x: 363, y: 113})
        n2 = ng.create_node({type: "Number", x: 123, y: 456})
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: n2.v_in
        n1.v_in.setValue 4
        ng.render()
        
        json_string = filehandler.get_local_json()
        
        parsed_data1 = JSON.parse(json_string)
        equals parsed_data1.uid, 7, "Saved the last uid"
        equals parsed_data1.nodes.length, 2, "Saved 2 nodes"
        equals parsed_data1.connections.length, 1, "Saved one connection"
        _n1 = parsed_data1.nodes[0]
        equals _n1.nid, n1.get('nid'), "Node1.nid saved"
        equals _n1.x, n1.get('x'), "Node1.x saved"
        equals _n1.y, n1.get('y'), "Node1.x saved"
        _n2 = parsed_data1.nodes[1]
        equals _n2.nid, n2.get('nid'), "Node1.nid saved"
        equals _n2.x, n2.get('x'), "Node1.x saved"
        equals _n2.y, n2.get('y'), "Node1.x saved"
        
        _c1 = parsed_data1.connections[0]
        equals _c1.id, c1.get("cid"), "Connection1.cid saved"
        equals _c1.from, c1.from_field.get("name"), "Connection1.from_field saved"
        equals _c1.to, c1.to_field.get("name"), "Connection1.to_field saved"
        
        # save a scene connected to webglrenderer
        app.clearWorkspace()
        n1 = ng.create_node("Scene")
        n2 = ng.create_node("WebGLRenderer")
        c1 = ng.connections.create
          from_field: n1.fields.getField("out", true)
          to_field: n2.fields.getField("scene")
        ng.render()
        
        json_string = filehandler.get_local_json()
        parsed_data1 = JSON.parse(json_string)
        equals parsed_data1.nodes.length, 2, "Saved 2 nodes"
        equals parsed_data1.connections.length, 1, "Saved one connection"
        
        # test for possible circular reference in json
        # appear when saving an object inside an array, the mesh in the merge array for this example
        app.clearWorkspace()
        n1 = ng.create_node("Scene")
        n2 = ng.create_node("Merge")
        n3 = ng.create_node("ThreeMesh")
        c1 = ng.connections.create
          from_field: n2.fields.getField("out", true)
          to_field: n1.fields.getField("children")
        c2 = ng.connections.create
          from_field: n3.fields.getField("out", true)
          to_field: n2.fields.getField("in0")
        ng.render()
        
        json_string = filehandler.get_local_json()
        parsed_data1 = JSON.parse(json_string)
        equals parsed_data1.nodes.length, 3, "Saved 3 nodes (cyclic value)"
