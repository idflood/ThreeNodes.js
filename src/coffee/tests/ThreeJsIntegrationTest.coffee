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
        ThreeNodes.events.trigger("ClearWorkspace")
        n1 = ng.create_node("Scene")
        n2 = ng.create_node("Merge")
        n3 = ng.create_node("ThreeMesh")
        c1 = ng.connections.create
          from_field: n2.rack.getField("out", true)
          to_field: n1.rack.getField("children")
        c2 = ng.connections.create
          from_field: n3.rack.getField("out", true)
          to_field: n2.rack.getField("in0")
        ng.render()
        
        equals n1.ob.children.length, 1, "The Three.scene has 1 child"
        c2.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The mesh has been removed from the scene children"
        
        # recreate the connection and add one extra mesh
        n4 = ng.create_node("ThreeMesh")
        c2 = ng.connections.create
          from_field: n3.rack.getField("out", true)
          to_field: n2.rack.getField("in0")
        c3 = ng.connections.create
          from_field: n4.rack.getField("out", true)
          to_field: n2.rack.getField("in1")
        ng.render()
        
        equals n1.ob.children.length, 2, "The Three.scene has 2 childs"
        # remove the link between merge to scene
        c1.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The Three.scene has 0 child"
        
        # mesh default material and color
        meshNode = ng.create_node("ThreeMesh")
        mesh = meshNode.ob
        ng.render()
        equals mesh[0].material.constructor, THREE.MeshBasicMaterial, "Mesh default material is a MeshBasicMaterial"
        equals mesh[0].material.color.r, 1, "Mesh default material is red (1/3)"
        equals mesh[0].material.color.g, 0, "Mesh default material is red (2/3)"
        equals mesh[0].material.color.b, 0, "Mesh default material is red (3/3)"
        
        # webgl
        n5 = ng.create_node("WebGLRenderer")
        c4 = ng.connections.create
          from_field: n1.rack.getField("out", true)
          to_field: n5.rack.getField("scene")
        
        ng.render()
        equals ThreeNodes.Webgl.renderModel.scene.id, n5.rack.getField("scene").getValue().id, "ThreeNodes.Webgl.renderModel.scene == scene connected to the renderer"
        equals n5.rack.getField("postfx").getValue().length, 0, "Webgl.postfx array is empty"
        
      test "Camera -> object3d -> merge -> scene connection test (children array)", () ->
        ng = app.nodegraph
        injector = app.injector
        ThreeNodes.events.trigger("ClearWorkspace")
        
        n1 = ng.create_node("Scene")
        n2 = ng.create_node("Merge")
        node_object3d = ng.create_node("Object3D")
        node_camera = ng.create_node("Camera")
        node_webgl = ng.create_node("WebGLRenderer")
        
        # scene -> webglrenderer.scene
        ng.connections.create
          from_field: n1.rack.getField("out", true)
          to_field: node_webgl.rack.getField("scene")
        # merge -> scene.children
        ng.connections.create
          from_field: n2.rack.getField("out", true)
          to_field: n1.rack.getField("children")
        # camera -> object3d.children
        ng.connections.create
          from_field: node_camera.rack.getField("out", true)
          to_field: node_object3d.rack.getField("children")
        # cammera -> scene.camera
        ng.connections.create
          from_field: node_camera.rack.getField("out", true)
          to_field: node_webgl.rack.getField("camera")
        # object3d -> merge
        ng.connections.create
          from_field: node_object3d.rack.getField("out", true)
          to_field: n2.rack.getField("in0")

        ng.render()
        equals node_object3d.ob.children.length, 1, "Object3D has one child"
        equals n1.ob.children.length, 1, "Scene has one child"
