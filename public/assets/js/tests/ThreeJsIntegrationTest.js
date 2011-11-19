define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  var ThreeJsIntegrationTest;
  return ThreeJsIntegrationTest = (function() {
    function ThreeJsIntegrationTest(app) {
      module("ThreeJsIntegrationTest");
      test("Scene node children", function() {
        var c1, c2, c3, c4, injector, mesh, meshNode, n1, n2, n3, n4, n5, ng;
        ng = app.nodegraph;
        injector = app.injector;
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Three", "Scene");
        n2 = ng.create_node("Utils", "Merge");
        n3 = ng.create_node("Three", "Mesh");
        c1 = injector.instanciate(ThreeNodes.NodeConnection, n2.rack.get("out", true), n1.rack.get("children"));
        c2 = injector.instanciate(ThreeNodes.NodeConnection, n3.rack.get("out", true), n2.rack.get("in0"));
        ng.render();
        equals(n1.ob.children.length, 1, "The Three.scene has 1 child");
        c2.remove();
        ng.render();
        equals(n1.ob.children.length, 0, "The mesh has been removed from the scene children");
        n4 = ng.create_node("Three", "Mesh");
        c2 = injector.instanciate(ThreeNodes.NodeConnection, n3.rack.get("out", true), n2.rack.get("in0"));
        c3 = injector.instanciate(ThreeNodes.NodeConnection, n4.rack.get("out", true), n2.rack.get("in1"));
        ng.render();
        equals(n1.ob.children.length, 2, "The Three.scene has 2 childs");
        c1.remove();
        ng.render();
        equals(n1.ob.children.length, 0, "The Three.scene has 0 child");
        meshNode = ng.create_node("Three", "Mesh");
        mesh = meshNode.ob;
        ng.render();
        equals(mesh.material.constructor, THREE.MeshLambertMaterial, "Mesh default material is a MeshLambertMaterial");
        equals(mesh.material.color.r, 1, "Mesh default material is red (1/3)");
        equals(mesh.material.color.g, 0, "Mesh default material is red (2/3)");
        equals(mesh.material.color.b, 0, "Mesh default material is red (3/3)");
        n5 = ng.create_node("Three", "WebGLRenderer");
        c4 = injector.instanciate(ThreeNodes.NodeConnection, n1.rack.get("out", true), n5.rack.get("scene"));
        ng.render();
        equals(ThreeNodes.Webgl.renderModel.scene.id, n5.rack.get("scene").get().id, "ThreeNodes.Webgl.renderModel.scene == scene connected to the renderer");
        return equals(n5.rack.get("postfx").get().length, 0, "Webgl.postfx array is empty");
      });
    }
    return ThreeJsIntegrationTest;
  })();
});