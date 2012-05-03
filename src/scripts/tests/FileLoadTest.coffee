define [
  'use!Underscore', 
  'use!Backbone',
  "order!libs/qunit-git",
], (_, Backbone) ->
  #"use strict"
  
  $ = jQuery
  
  class FileLoadTest
    constructor: (app) ->
      module "File"
      
      test "JSON loader", () ->
        ng = app.nodes
        filehandler = app.file_handler
        app.clearWorkspace()
        
        # test with two number nodes connected
        n1 = ng.createNode({type: "Number", x: 363, y: 113})
        n2 = ng.createNode("Number")
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: n2.v_in
        n1.v_in.setValue 4
        ng.render()
        
        json_string1 = filehandler.getLocalJson()
        app.clearWorkspace()
        
        filehandler.loadFromJsonData(json_string1)
        
        ng.render()
        equals ng.length, 2, "The 2 nodes are created in the nodes collection"
        equals ng.connections.length, 1, "A connection has been created"
        equals ng.models[0].get("x"), 363, "node1.x has been set"
        equals ng.models[0].get("y"), 113, "node1.y has been set"
        equals ng.models[0].v_in.getValue(), 4, "The first node input has been set to 4"
        equals ng.models[1].v_out.getValue(), 4, "The second node has been connected and the output is 4"
        
        app.clearWorkspace()
        # test with a vector3 object instead of only float
        n1 = ng.createNode("Vector3")
        n2 = ng.createNode("Number")
        n3 = ng.createNode("Number")
        c1 = ng.connections.create
          from_field: n1.fields.getField("x", true)
          to_field: n2.v_in
        c2 = ng.connections.create
          from_field: n1.fields.getField("y", true)
          to_field: n3.v_in
        n1.fields.getField("x").setValue(0.7)
        n1.fields.getField("y").setValue(12)
        ng.render()
        
        json_string2 = filehandler.getLocalJson()
        app.clearWorkspace()
        
        filehandler.loadFromJsonData(json_string2)
        ng.render()
        equals ng.length, 3, "The 3 nodes are created in the nodes collection"
        equals ng.connections.length, 2, "2 connections has been created"
        equals ng.models[1].v_out.getValue(), 0.7, "node2.input has been set"
        equals ng.models[2].v_out.getValue(), 12, "node3.input has been set"
        
        # possible issue with mesh (mesh.geometry undefined)
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
        
        json_string2 = filehandler.getLocalJson()
        app.clearWorkspace()
        
        filehandler.loadFromJsonData(json_string2)
        ng.render()
        equals ng.length, 3, "The 3 nodes are created in the nodes collection"
        equals ng.connections.length, 2, "2 connections has been created"
