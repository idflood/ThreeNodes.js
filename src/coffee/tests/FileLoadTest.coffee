define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  class FileLoadTest
    constructor: (app) ->
      module "File"
      
      test "JSON loader", () ->
        ng = app.nodegraph
        filehandler = app.injector.get "FileHandler"
        app.commandMap.execute "ClearWorkspaceCommand"
        
        # test with two number nodes connected
        n1 = ng.create_node("Base", "Number", 363, 113)
        n2 = ng.create_node("Base", "Number")
        c1 = new ThreeNodes.NodeConnection(n1.v_out, n2.v_in)
        app.injector.applyContext(c1)
        n1.v_in.set 4
        ng.render()
        
        json_string1 = filehandler.get_local_json()
        app.commandMap.execute "ClearWorkspaceCommand"
        
        filehandler.load_from_json_data(json_string1)
        ng.render()
        equals ng.nodes.length, 2, "The 2 nodes are created in the nodegraph"
        equals ng.node_connections.length, 1, "A connection has been created"
        equals ng.nodes[0].x, 363, "node1.x has been set"
        equals ng.nodes[0].y, 113, "node1.y has been set"
        equals ng.nodes[0].v_in.get(), 4, "The first node input has been set to 4"
        equals ng.nodes[1].v_out.get(), 4, "The second node has been connected and the output is 4"
        
        app.commandMap.execute "ClearWorkspaceCommand"
        # test with a vector3 object instead of only float
        n1 = ng.create_node("Base", "Vector3")
        n2 = ng.create_node("Base", "Number")
        n3 = ng.create_node("Base", "Number")
        c1 = new ThreeNodes.NodeConnection(n1.rack.get("x", true), n2.v_in)
        c2 = new ThreeNodes.NodeConnection(n1.rack.get("y", true), n3.v_in)
        app.injector.applyContext(c1)
        app.injector.applyContext(c2)
        n1.rack.get("x").set(0.7)
        n1.rack.get("y").set(12)
        ng.render()
        
        json_string2 = filehandler.get_local_json()
        app.commandMap.execute "ClearWorkspaceCommand"
        
        filehandler.load_from_json_data(json_string2)
        ng.render()
        equals ng.nodes.length, 3, "The 3 nodes are created in the nodegraph"
        equals ng.node_connections.length, 2, "2 connections has been created"
        equals ng.nodes[1].v_out.get(), 0.7, "node2.input has been set"
        equals ng.nodes[2].v_out.get(), 12, "node3.input has been set"
        
        # possible issue with mesh (mesh.geometry undefined)
        app.commandMap.execute "ClearWorkspaceCommand"
        n1 = ng.create_node("Three", "Scene")
        n2 = ng.create_node("Utils", "Merge")
        n3 = ng.create_node("Three", "Mesh")
        c1 = new ThreeNodes.NodeConnection(n2.rack.get("out", true), n1.rack.get("children"))
        c2 = new ThreeNodes.NodeConnection(n3.rack.get("out", true), n2.rack.get("in0"))
        app.injector.applyContext(c1)
        app.injector.applyContext(c2)
        ng.render()
        
        json_string2 = filehandler.get_local_json()
        app.commandMap.execute "ClearWorkspaceCommand"
        
        filehandler.load_from_json_data(json_string2)
        ng.render()
        equals ng.nodes.length, 3, "The 3 nodes are created in the nodegraph"
        equals ng.node_connections.length, 2, "2 connections has been created"
