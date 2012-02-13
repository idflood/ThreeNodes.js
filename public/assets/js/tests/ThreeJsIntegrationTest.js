define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  "use strict";
  var ThreeJsIntegrationTest;
  return ThreeJsIntegrationTest = (function() {
    function ThreeJsIntegrationTest(app) {
      module("ThreeJsIntegrationTest");
      test("Scene node children", function() {
        var c1, c2, c3, c4, injector, mesh, meshNode, n1, n2, n3, n4, n5, ng;
        ng = app.nodegraph;
        injector = app.injector;
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Scene");
        n2 = ng.create_node("Merge");
        n3 = ng.create_node("ThreeMesh");
        c1 = ng.connections.create({
          from_field: n2.rack.get("out", true),
          to_field: n1.rack.get("children")
        });
        c2 = ng.connections.create({
          from_field: n3.rack.get("out", true),
          to_field: n2.rack.get("in0")
        });
        ng.render();
        equals(n1.ob.children.length, 1, "The Three.scene has 1 child");
        c2.remove();
        ng.render();
        equals(n1.ob.children.length, 0, "The mesh has been removed from the scene children");
        n4 = ng.create_node("ThreeMesh");
        c2 = ng.connections.create({
          from_field: n3.rack.get("out", true),
          to_field: n2.rack.get("in0")
        });
        c3 = ng.connections.create({
          from_field: n4.rack.get("out", true),
          to_field: n2.rack.get("in1")
        });
        ng.render();
        equals(n1.ob.children.length, 2, "The Three.scene has 2 childs");
        c1.remove();
        ng.render();
        equals(n1.ob.children.length, 0, "The Three.scene has 0 child");
        meshNode = ng.create_node("ThreeMesh");
        mesh = meshNode.ob;
        ng.render();
        equals(mesh[0].material.constructor, THREE.MeshBasicMaterial, "Mesh default material is a MeshBasicMaterial");
        equals(mesh[0].material.color.r, 1, "Mesh default material is red (1/3)");
        equals(mesh[0].material.color.g, 0, "Mesh default material is red (2/3)");
        equals(mesh[0].material.color.b, 0, "Mesh default material is red (3/3)");
        n5 = ng.create_node("WebGLRenderer");
        c4 = ng.connections.create({
          from_field: n1.rack.get("out", true),
          to_field: n5.rack.get("scene")
        });
        ng.render();
        equals(ThreeNodes.Webgl.renderModel.scene.id, n5.rack.get("scene").get().id, "ThreeNodes.Webgl.renderModel.scene == scene connected to the renderer");
        return equals(n5.rack.get("postfx").get().length, 0, "Webgl.postfx array is empty");
      });
      test("Camera -> object3d -> merge -> scene connection test (children array)", function() {
        var injector, n1, n2, ng, node_camera, node_object3d, node_webgl;
        ng = app.nodegraph;
        injector = app.injector;
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Scene");
        n2 = ng.create_node("Merge");
        node_object3d = ng.create_node("Object3D");
        node_camera = ng.create_node("Camera");
        node_webgl = ng.create_node("WebGLRenderer");
        ng.connections.create({
          from_field: n1.rack.get("out", true),
          to_field: node_webgl.rack.get("scene")
        });
        ng.connections.create({
          from_field: n2.rack.get("out", true),
          to_field: n1.rack.get("children")
        });
        ng.connections.create({
          from_field: node_camera.rack.get("out", true),
          to_field: node_object3d.rack.get("children")
        });
        ng.connections.create({
          from_field: node_camera.rack.get("out", true),
          to_field: node_webgl.rack.get("camera")
        });
        ng.connections.create({
          from_field: node_object3d.rack.get("out", true),
          to_field: n2.rack.get("in0")
        });
        ng.render();
        equals(node_object3d.ob.children.length, 1, "Object3D has one child");
        return equals(n1.ob.children.length, 1, "Scene has one child");
      });
    }
    return ThreeJsIntegrationTest;
  })();
});