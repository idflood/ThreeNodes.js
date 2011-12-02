define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  class NodeConnectionTest
    constructor: (app) ->
      module "NodeConnection"
      
      test "Basic connection", () ->
        app.commandMap.execute "ClearWorkspaceCommand"
        injector = app.injector
        ng = app.nodegraph
        n1 = ng.create_node("Base", "Number")
        n2 = ng.create_node("Base", "Number")
        c1 = injector.instanciate(ThreeNodes.NodeConnection, n1.v_out, n2.v_in)
        
        equals ng.node_connections.length, 1, "There is one connection"
        equals n1.v_out.connections.length, 1, "The output field has one connection"
        n1.v_in.set 0.5
        ng.render()
        equals n2.v_out.get(), 0.5, "Node 1 output has been set"
        equals n2.v_out.get(), 0.5, "Node value propagated from node1 to node2 (1/2)"
        n1.v_in.set 0.8
        ng.render()
        equals n2.v_out.get(), 0.8, "Node value propagated from node1 to node2 (2/2)"
        
        c1.remove()
        equals ng.node_connections.length, 0, "A specific connection has been removed"
        equals n1.v_out.connections.length, 0, "Node 1 has no output conection"
        equals n2.v_in.connections.length, 0, "Node 2 has no input conection"
        
        n1.v_in.set 42
        ng.render()
        equals n2.v_out.get(), 0.8, "Node2 value didn't change if there is no connection"
        
        n3 = ng.create_node("Base", "Number")
        c1 = injector.instanciate(ThreeNodes.NodeConnection, n1.v_out, n2.v_in)
        c2 = injector.instanciate(ThreeNodes.NodeConnection, n1.v_out, n3.v_in)
        n1.v_in.set 0.7
        ng.render()
        equals n2.v_out.get(), 0.7, "Multiple output connection propagated 1/2"
        equals n3.v_out.get(), 0.7, "Multiple output connection propagated 2/2"
        
        # try to connect two outputs to one input (only the last one should be valid, the first removed)
        n4 = ng.create_node("Base", "Number")
        c3 = injector.instanciate(ThreeNodes.NodeConnection, n4.v_out, n3.v_in)
        n4.v_in.set 14
        ng.render()
        equals n3.v_in.connections.length, 1, "Input only have one connection"
        equals n3.v_out.get(), 14, "The second connection is valid and propagated the value"
      
      test "Array connections", () ->
        # verify that the good amount of objects are created when having many inputs
        app.commandMap.execute "ClearWorkspaceCommand"
        injector = app.injector
        ng = app.nodegraph
        
        n1 = ng.create_node("Base", "Number")
        n2 = ng.create_node("Base", "Number")
        node_mult = ng.create_node("Math", "Mult")
        node_merge = ng.create_node("Utils", "Merge")
        c1 = injector.instanciate(ThreeNodes.NodeConnection, n1.v_out, node_merge.rack.get("in0"))
        c2 = injector.instanciate(ThreeNodes.NodeConnection, n2.v_out, node_merge.rack.get("in1"))
        c3 = injector.instanciate(ThreeNodes.NodeConnection, node_merge.rack.get("out", true), node_mult.v_factor)
        n1.v_in.set 1
        n2.v_in.set 2
        node_mult.v_in.set 3
        ng.render()
        
        equals n1.v_out.val.length, 1, "Node number output one float value"
        equals node_merge.rack.get("out", true).val.length, 2, "Merge node output 2 values"
        equals node_mult.v_factor.val.length, 2, "Mult node input factor has 2 values"
        equals node_mult.rack.getMaxInputSliceCount(), 1, "Mult node has correct MaxInputSliceCount (1 since array start with 0)"
        equals node_mult.v_out.get(0), 3, "1st mult output equals 3"
        equals node_mult.v_out.get(1), 6, "2nd mult output equals 6"
        
        # verify Vector3 support spreads
        app.commandMap.execute "ClearWorkspaceCommand"
        n1 = ng.create_node("Base", "Number")
        n2 = ng.create_node("Base", "Number")
        node_vec = ng.create_node("Base", "Vector3")
        node_merge = ng.create_node("Utils", "Merge")
        c1 = injector.instanciate(ThreeNodes.NodeConnection, n1.v_out, node_merge.rack.get("in0"))
        c2 = injector.instanciate(ThreeNodes.NodeConnection, n2.v_out, node_merge.rack.get("in1"))
        c3 = injector.instanciate(ThreeNodes.NodeConnection, node_merge.rack.get("out", true), node_vec.rack.get("y"))
        n1.v_in.set 5
        n2.v_in.set 7
        ng.render()
        
        equals node_vec.rack.get("y").val.length, 2, "Vector3.y input has 2 values"
        equals node_vec.rack.getMaxInputSliceCount(), 1, "Vector3 node has correct MaxInputSliceCount (1 since array start with 0)"
        equals node_vec.rack.get("xyz", true).get(0).y, 5, "1st y value"
        equals node_vec.rack.get("xyz", true).get(1).y, 7, "2nd y value"
        console.log node_vec.rack.get("xyz", true)
        # mesh should duplicate itself
        app.commandMap.execute "ClearWorkspaceCommand"
        meshNode = ng.create_node("Three", "Mesh")
        node_merge = ng.create_node("Utils", "Merge", 0, 0)
        nvec1 = ng.create_node("Base", "Vector3", 0, 0)
        nvec2 = ng.create_node("Base", "Vector3", 0, 0)
        c1 = injector.instanciate(ThreeNodes.NodeConnection, nvec1.rack.get("xyz", true), node_merge.rack.get("in0"))
        c2 = injector.instanciate(ThreeNodes.NodeConnection, nvec2.rack.get("xyz", true), node_merge.rack.get("in1"))
        c3 = injector.instanciate(ThreeNodes.NodeConnection, node_merge.rack.get("out", true), meshNode.rack.get("position"))
        ng.render()
        
        equals meshNode.ob.length, 2, "Meshnode has 2 mesh since it has 2 positions"
        equals node_merge.rack.get("out", true).val.length, 2, "Merge node output 2 values"
        c2.remove()
        ng.render()
        equals node_merge.rack.get("out", true).val.length, 1, "Merge node output 1 value"
        equals meshNode.ob.length, 1, "Meshnode has 1 mesh because a connection has been removed"
