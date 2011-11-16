define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  class FileSaveTest
    constructor: (app) ->
      module "File"
      
      test "JSON save", () ->
        ng = app.nodegraph
        filehandler = app.injector.get "FileHandler"
        app.commandMap.execute "ClearWorkspaceCommand"
        
        # test with two number nodes connected
        n1 = ng.create_node("Base", "Number", 363, 113)
        n2 = ng.create_node("Base", "Number", 123, 456)
        c1 = new ThreeNodes.NodeConnection(n1.v_out, n2.v_in)
        app.injector.applyContext(c1)
        n1.v_in.set 4
        ng.render()
        
        json_string = filehandler.get_local_json()
        
        parsed_data1 = JSON.parse(json_string)
        equals parsed_data1.uid, 7, "Saved the last uid"
        equals parsed_data1.nodes.length, 2, "Saved 2 nodes"
        equals parsed_data1.connections.length, 1, "Saved one connection"
        _n1 = parsed_data1.nodes[0]
        equals _n1.nid, n1.nid, "Node1.nid saved"
        equals _n1.x, n1.x, "Node1.x saved"
        equals _n1.y, n1.y, "Node1.x saved"
        _n2 = parsed_data1.nodes[1]
        equals _n2.nid, n2.nid, "Node1.nid saved"
        equals _n2.x, n2.x, "Node1.x saved"
        equals _n2.y, n2.y, "Node1.x saved"
        
        _c1 = parsed_data1.connections[0]
        equals _c1.id, c1.cid, "Connection1.cid saved"
        equals _c1.from, c1.from_field.fid, "Connection1.from_field saved"
        equals _c1.to, c1.to_field.fid, "Connection1.to_field saved"
        
        # save a scene connected to webglrenderer
        app.commandMap.execute "ClearWorkspaceCommand"
        n1 = ng.create_node("Three", "Scene")
        n2 = ng.create_node("Three", "WebGLRenderer")
        c1 = new ThreeNodes.NodeConnection(n1.rack.get("out", true), n2.rack.get("scene"))
        app.injector.applyContext(c1)
        ng.render()
        
        json_string = filehandler.get_local_json()
        parsed_data1 = JSON.parse(json_string)
        equals parsed_data1.nodes.length, 2, "Saved 2 nodes"
        equals parsed_data1.connections.length, 1, "Saved one connection"
        
        # test for possible circular reference in json
        # appear when saving an object inside an array, the mesh in the merge array for this example
        app.commandMap.execute "ClearWorkspaceCommand"
        n1 = ng.create_node("Three", "Scene")
        n2 = ng.create_node("Utils", "Merge")
        n3 = ng.create_node("Three", "Mesh")
        c1 = new ThreeNodes.NodeConnection(n2.rack.get("out", true), n1.rack.get("children"))
        c2 = new ThreeNodes.NodeConnection(n3.rack.get("out", true), n2.rack.get("in0"))
        app.injector.applyContext(c1)
        app.injector.applyContext(c2)
        ng.render()
        
        json_string = filehandler.get_local_json()
        parsed_data1 = JSON.parse(json_string)
        equals parsed_data1.nodes.length, 3, "Saved 3 nodes (cyclic value)"
        
        
