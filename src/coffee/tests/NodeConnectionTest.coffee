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
        ng = app.nodegraph
        n1 = ng.create_node("Base", "Number", 0, 0)
        n2 = ng.create_node("Base", "Number", 0, 0)
        
        c1 = new ThreeNodes.NodeConnection(n1.v_out, n2.v_in)
        app.injector.applyContext(c1)
        
        equals ng.node_connections.length, 1, "There is one connection"
        n1.v_in.set 0.5
        ng.render()
        equals n2.v_out.get(), 0.5, "Node value propagated from node1 to node2"
        
        c1.remove()
        equals ng.node_connections.length, 0, "A specific connection has been removed"
        
        n1.v_in.set 42
        ng.render()
        equals n2.v_out.get(), 0.5, "Node2 value didn't change if there is no connection"
        
        n3 = ng.create_node("Base", "Number", 0, 0)
        c1 = new ThreeNodes.NodeConnection(n1.v_out, n2.v_in)
        app.injector.applyContext(c1)
        c2 = new ThreeNodes.NodeConnection(n1.v_out, n3.v_in)
        app.injector.applyContext(c2)
        n1.v_in.set 0.7
        ng.render()
        equals n2.v_out.get(), 0.7, "Multiple output connection propagated 1/2"
        equals n3.v_out.get(), 0.7, "Multiple output connection propagated 2/2"
        
        # try to connect two outputs to one input (only the last one should be valid, the first removed)
        n4 = ng.create_node("Base", "Number", 0, 0)
        c3 = new ThreeNodes.NodeConnection(n4.v_out, n3.v_in)
        app.injector.applyContext(c3)
        n4.v_in.set 14
        ng.render()
        equals n3.v_in.connections.length, 1, "Input only have one connection"
        equals n3.v_out.get(), 14, "The second connection is valid and propagated the value"
