define [
  'use!Underscore', 
  'use!Backbone',
  "order!libs/qunit-git",
], (_, Backbone) ->
  "use strict"
  
  $ = jQuery
  
  class ThreeJsIntegrationTest
    constructor: (app) ->
      module "ThreeJsIntegrationTest"
      
      test "Scene node children", () ->
        ng = app.nodes
        app.clearWorkspace()
        n1 = ng.createNode("Scene")
        n2 = ng.createNode("Merge")
        n3 = ng.createNode("ThreeMesh")
        c1 = ng.connections.create
          from_field: n2.fields.getField("out", true)
          to_field: n1.fields.getField("children")
        c2 = ng.connections.create
          from_field: n3.fields.getField("out", true)
          to_field: n2.fields.getField("in0")
        ng.render()
        
        equals n1.ob.children.length, 1, "The Three.scene has 1 child"
        c2.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The mesh has been removed from the scene children"
        
        # recreate the connection and add one extra mesh
        n4 = ng.createNode("ThreeMesh")
        c2 = ng.connections.create
          from_field: n3.fields.getField("out", true)
          to_field: n2.fields.getField("in0")
        c3 = ng.connections.create
          from_field: n4.fields.getField("out", true)
          to_field: n2.fields.getField("in1")
        ng.render()
        
        equals n1.ob.children.length, 2, "The Three.scene has 2 childs"
        # remove the link between merge to scene
        c1.remove()
        ng.render()
        equals n1.ob.children.length, 0, "The Three.scene has 0 child"
        
        # mesh default material and color
        meshNode = ng.createNode("ThreeMesh")
        mesh = meshNode.ob
        ng.render()
        equals mesh[0].material.constructor, THREE.MeshBasicMaterial, "Mesh default material is a MeshBasicMaterial"
        equals mesh[0].material.color.r, 1, "Mesh default material is red (1/3)"
        equals mesh[0].material.color.g, 0, "Mesh default material is red (2/3)"
        equals mesh[0].material.color.b, 0, "Mesh default material is red (3/3)"
        
        # webgl
        n5 = ng.createNode("WebGLRenderer")
        c4 = ng.connections.create
          from_field: n1.fields.getField("out", true)
          to_field: n5.fields.getField("scene")
        
        ng.render()
        equals ThreeNodes.Webgl.renderModel.scene.id, n5.fields.getField("scene").getValue().id, "ThreeNodes.Webgl.renderModel.scene == scene connected to the renderer"
        equals n5.fields.getField("postfx").getValue().length, 0, "Webgl.postfx array is empty"
        
      test "Camera -> object3d -> merge -> scene connection test (children array)", () ->
        ng = app.nodes
        app.clearWorkspace()
        
        n1 = ng.createNode("Scene")
        n2 = ng.createNode("Merge")
        node_object3d = ng.createNode("Object3D")
        node_camera = ng.createNode("Camera")
        node_webgl = ng.createNode("WebGLRenderer")
        
        # scene -> webglrenderer.scene
        ng.connections.create
          from_field: n1.fields.getField("out", true)
          to_field: node_webgl.fields.getField("scene")
        # merge -> scene.children
        ng.connections.create
          from_field: n2.fields.getField("out", true)
          to_field: n1.fields.getField("children")
        # camera -> object3d.children
        ng.connections.create
          from_field: node_camera.fields.getField("out", true)
          to_field: node_object3d.fields.getField("children")
        # cammera -> scene.camera
        ng.connections.create
          from_field: node_camera.fields.getField("out", true)
          to_field: node_webgl.fields.getField("camera")
        # object3d -> merge
        ng.connections.create
          from_field: node_object3d.fields.getField("out", true)
          to_field: n2.fields.getField("in0")

        ng.render()
        equals node_object3d.ob.children.length, 1, "Object3D has one child"
        equals n1.ob.children.length, 1, "Scene has one child"
