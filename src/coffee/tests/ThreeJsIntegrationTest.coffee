define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  class ThreeJsIntegrationTest
    constructor: (app) ->
      module "ThreeJsIntegrationTest"
      
      test "Scene node children", () ->
        ng = app.nodegraph
        app.commandMap.execute "ClearWorkspaceCommand"
        n1 = ng.create_node("Three", "Scene")
        n2 = ng.create_node("Utils", "Merge")
        n3 = ng.create_node("Three", "Mesh")
        c1 = new ThreeNodes.NodeConnection(n2.rack.get("out", true), n1.rack.get("children"))
        c2 = new ThreeNodes.NodeConnection(n3.rack.get("out", true), n2.rack.get("in0"))
        app.injector.applyContext(c1)
        app.injector.applyContext(c2)
        ng.render()
        
        equals n1.ob.children.length, 1, "The Three.scene has 1 child"
        c2.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The mesh has been removed from the scene children"
        
        # recreate the connection and add one extra mesh
        n4 = ng.create_node("Three", "Mesh")
        c2 = new ThreeNodes.NodeConnection(n3.rack.get("out", true), n2.rack.get("in0"))
        c3 = new ThreeNodes.NodeConnection(n4.rack.get("out", true), n2.rack.get("in1"))
        app.injector.applyContext(c2)
        app.injector.applyContext(c3)
        ng.render()
        
        equals n1.ob.children.length, 2, "The Three.scene has 2 childs"
        # remove the link between merge to scene
        c1.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The Three.scene has 0 child"
