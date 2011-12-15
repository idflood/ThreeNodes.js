define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  "use strict"
  class ThreeJsIntegrationTest
    constructor: (app) ->
      module "ThreeJsIntegrationTest"
      
      test "Scene node children", () ->
        ng = app.nodegraph
        injector = app.injector
        app.commandMap.execute "ClearWorkspaceCommand"
        n1 = ng.create_node("Three", "Scene")
        n2 = ng.create_node("Utils", "Merge")
        n3 = ng.create_node("Three", "Mesh")
        c1 = injector.instanciate(ThreeNodes.NodeConnection, n2.rack.get("out", true), n1.rack.get("children"))
        c2 = injector.instanciate(ThreeNodes.NodeConnection, n3.rack.get("out", true), n2.rack.get("in0"))
        ng.render()
        
        equals n1.ob.children.length, 1, "The Three.scene has 1 child"
        c2.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The mesh has been removed from the scene children"
        
        # recreate the connection and add one extra mesh
        n4 = ng.create_node("Three", "Mesh")
        c2 = injector.instanciate(ThreeNodes.NodeConnection, n3.rack.get("out", true), n2.rack.get("in0"))
        c3 = injector.instanciate(ThreeNodes.NodeConnection, n4.rack.get("out", true), n2.rack.get("in1"))
        ng.render()
        
        equals n1.ob.children.length, 2, "The Three.scene has 2 childs"
        # remove the link between merge to scene
        c1.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The Three.scene has 0 child"
        
        # mesh default material and color
        meshNode = ng.create_node("Three", "Mesh")
        mesh = meshNode.ob
        ng.render()
        equals mesh[0].material.constructor, THREE.MeshBasicMaterial, "Mesh default material is a MeshBasicMaterial"
        equals mesh[0].material.color.r, 1, "Mesh default material is red (1/3)"
        equals mesh[0].material.color.g, 0, "Mesh default material is red (2/3)"
        equals mesh[0].material.color.b, 0, "Mesh default material is red (3/3)"
        
        # webgl
        n5 = ng.create_node("Three", "WebGLRenderer")
        c4 = injector.instanciate(ThreeNodes.NodeConnection, n1.rack.get("out", true), n5.rack.get("scene"))
        
        ng.render()
        equals ThreeNodes.Webgl.renderModel.scene.id, n5.rack.get("scene").get().id, "ThreeNodes.Webgl.renderModel.scene == scene connected to the renderer"
        equals n5.rack.get("postfx").get().length, 0, "Webgl.postfx array is empty"
        
      test "Camera -> object3d -> merge -> scene connection test (children array)", () ->
        ng = app.nodegraph
        injector = app.injector
        app.commandMap.execute "ClearWorkspaceCommand"
        
        n1 = ng.create_node("Three", "Scene")
        n2 = ng.create_node("Utils", "Merge")
        node_object3d = ng.create_node("Three", "Object3D")
        node_camera = ng.create_node("Three", "Camera")
        node_webgl = ng.create_node("Three", "WebGLRenderer")
        
        # scene -> webglrenderer.scene
        injector.instanciate(ThreeNodes.NodeConnection, n1.rack.get("out", true), node_webgl.rack.get("scene"))
        
        # merge -> scene.children
        injector.instanciate(ThreeNodes.NodeConnection, n2.rack.get("out", true), n1.rack.get("children"))
        # camera -> object3d.children
        injector.instanciate(ThreeNodes.NodeConnection, node_camera.rack.get("out", true), node_object3d.rack.get("children"))
        # cammera -> scene.camera
        injector.instanciate(ThreeNodes.NodeConnection, node_camera.rack.get("out", true), node_webgl.rack.get("camera"))
        # object3d -> merge
        injector.instanciate(ThreeNodes.NodeConnection, node_object3d.rack.get("out", true), n2.rack.get("in0"))

        ng.render()
        equals node_object3d.ob.children.length, 1, "Object3D has one child"
        equals n1.ob.children.length, 1, "Scene has one child"
