define [
  'Underscore', 
  'Backbone',
  "libs/qunit-git",
], (_, Backbone) ->
  #"use strict"
  
  $ = jQuery
  
  class ConnectionTest
    constructor: (app) ->
      module "NodeConnection"
      
      test "Basic connection", () ->
        app.clearWorkspace()
        ng = app.nodes
        n1 = ng.createNode("Number")
        n2 = ng.createNode("Number")
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: n2.v_in
        
        equals ng.connections.length, 1, "There is one connection"
        equals n1.v_out.connections.length, 1, "The output field has one connection"
        n1.v_in.setValue 0.5
        ng.render()
        equals n1.v_out.getValue(), 0.5, "Node 1 output has been set"
        equals n2.v_out.getValue(), 0.5, "Node value propagated from node1 to node2 (1/2)"
        n1.v_in.setValue 0.8
        ng.render()
        equals n2.v_out.getValue(), 0.8, "Node value propagated from node1 to node2 (2/2)"
        
        c1.remove()
        equals ng.connections.length, 0, "A specific connection has been removed"
        equals n1.v_out.connections.length, 0, "Node 1 has no output conection"
        equals n2.v_in.connections.length, 0, "Node 2 has no input conection"
        
        n1.v_in.setValue 42
        ng.render()
        equals n2.v_out.getValue(), 0.8, "Node2 value didn't change if there is no connection"
        
        n3 = ng.createNode("Number")
        c1 = ng.connections.add
          from_field: n1.v_out
          to_field: n2.v_in
        c2 = ng.connections.add
          from_field: n1.v_out
          to_field: n3.v_in
        n1.v_in.setValue 0.7
        ng.render()
        equals n2.v_out.getValue(), 0.7, "Multiple output connection propagated 1/2"
        equals n3.v_out.getValue(), 0.7, "Multiple output connection propagated 2/2"
        
        # try to connect two outputs to one input (only the last one should be valid, the first removed)
        n4 = ng.createNode("Number")
        c3 = ng.connections.add
          from_field: n4.v_out
          to_field: n3.v_in
        n4.v_in.setValue 14
        ng.render()
        equals n3.v_in.connections.length, 1, "Input only have one connection"
        equals n3.v_out.getValue(), 14, "The second connection is valid and propagated the value"
      
      test "Connection between wrong field types", () ->
        app.clearWorkspace()
        ng = app.nodes
        
        n1 = ng.createNode("Number")
        n2 = ng.createNode("ThreeMesh")
        ng.render()
        
        old_val = n2.fields.getField("geometry").getValue()
        # can't really connect a number to a geometry field, should not change his value
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: n2.fields.getField("geometry")
        ng.render()
                
        equals n2.fields.getField("geometry").getValue().id, old_val.id, "Geometry field value should not change if wrong type is passed"
        
        # same with mesh.material
        c1.remove()
        old_val = n2.fields.getField("material").getValue()
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: n2.fields.getField("material")
        ng.render()
        
        equals n2.fields.getField("material").getValue().id, old_val.id, "Material field value should not change if wrong type is passed"
      
      test "Connection between wrong field types (children array)", () ->
        app.clearWorkspace()
        ng = app.nodes
        
        n1 = ng.createNode("Number")
        n3 = ng.createNode("Scene")
        equals $.type(n3.ob.children), "array", "Scene.children is by default an empty array"
        c2 = ng.connections.create
          from_field: n1.v_out
          to_field: n3.fields.getField("children")
        # the ng.render throw an error if the children attribute is not valid
        ng.render()
        
        equals $.type(n3.ob.children), "array", "Scene.children is still an array after connecting a number to it"
        equals n3.ob.children.length, 0, "Scene.children array is still empty"
      
      test "Connection direction", () ->
        app.clearWorkspace()
        ng = app.nodes
        
        n1 = ng.createNode("Number")
        n2 = ng.createNode("Number")
        # connect node in reverse order (from input to output)
        c1 = ng.connections.create
          from_field: n2.v_in
          to_field: n1.v_out
        n1.v_in.setValue 4
        ng.render()
        
        equals n2.v_out.getValue(), 4, "Connection is created with good input/output order and the value has been propagated"
      
      test "Connection from input to anoter input", () ->
        app.clearWorkspace()
        ng = app.nodes
        
        n1 = ng.createNode("Number")
        n2 = ng.createNode("Number")
        # connect an input to another input
        c1 = ng.connections.create
          from_field: n1.v_in
          to_field: n2.v_in
        # the connection should not be created
        ng.render()
        
        equals ng.connections.length, 0, "The connection has not been created since it is wrong"
      
      test "Connection from and to the same node", () ->
        app.clearWorkspace()
        ng = app.nodes
        
        n1 = ng.createNode("Number")
        # connect an input to another input
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: n1.v_in
        # the connection should not be created
        ng.render()
        
        equals ng.connections.length, 0, "The connection has not been created since it is wrong"
      
      test "Array connections", () ->
        # verify that the good amount of objects are created when having many inputs
        app.clearWorkspace()
        ng = app.nodes
        
        n1 = ng.createNode("Number")
        n2 = ng.createNode("Number")
        node_mult = ng.createNode("MathMult")
        node_merge = ng.createNode("Merge")
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: node_merge.fields.getField("in0")
        c2 = ng.connections.create
          from_field: n2.v_out
          to_field: node_merge.fields.getField("in1")
        c3 = ng.connections.create
          from_field: node_merge.fields.getField("out", true)
          to_field: node_mult.v_factor
        n1.v_in.setValue 1
        n2.v_in.setValue 2
        node_mult.v_in.setValue 3
        ng.render()
        
        equals n1.v_out.get("value").length, 1, "Node number output one float value"
        equals node_merge.fields.getField("out", true).get("value").length, 2, "Merge node output 2 values"
        equals node_mult.v_factor.get("value").length, 2, "Mult node input factor has 2 values"
        equals node_mult.fields.getMaxInputSliceCount(), 1, "Mult node has correct MaxInputSliceCount (1 since array start with 0)"
        equals node_mult.v_out.getValue(0), 3, "1st mult output equals 3"
        equals node_mult.v_out.getValue(1), 6, "2nd mult output equals 6"
        
        # verify Vector3 support spreads
        app.clearWorkspace()
        n1 = ng.createNode("Number")
        n2 = ng.createNode("Number")
        node_vec = ng.createNode("Vector3")
        node_merge = ng.createNode("Merge")
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: node_merge.fields.getField("in0")
        c2 = ng.connections.create
          from_field: n2.v_out
          to_field: node_merge.fields.getField("in1")
        c3 = ng.connections.create
          from_field: node_merge.fields.getField("out", true)
          to_field: node_vec.fields.getField("y")
        n1.v_in.setValue 5
        n2.v_in.setValue 7
        ng.render()
        
        
        equals node_vec.fields.getField("y").get("value").length, 2, "Vector3.y input has 2 values"
        equals node_vec.fields.getMaxInputSliceCount(), 1, "Vector3 node has correct MaxInputSliceCount (1 since array start with 0)"
        equals node_vec.fields.getField("xyz", true).getValue(0).y, 5, "1st y value"
        equals node_vec.fields.getField("xyz", true).getValue(1).y, 7, "2nd y value"
        
        # mesh should duplicate itself
        app.clearWorkspace()
        meshNode = ng.createNode("ThreeMesh")
        node_merge = ng.createNode("Merge")
        nvec1 = ng.createNode("Vector3")
        nvec2 = ng.createNode("Vector3")
        c1 = ng.connections.create
          from_field: nvec1.fields.getField("xyz", true)
          to_field: node_merge.fields.getField("in0")
        c2 = ng.connections.create
          from_field: nvec2.fields.getField("xyz", true)
          to_field: node_merge.fields.getField("in1")
        c3 = ng.connections.create
          from_field: node_merge.fields.getField("out", true)
          to_field: meshNode.fields.getField("position")
        ng.render()
        
        equals meshNode.ob.length, 2, "Meshnode has 2 mesh since it has 2 positions"
        equals node_merge.fields.getField("out", true).get("value").length, 2, "Merge node output 2 values"
        c2.remove()
        ng.render()
        equals node_merge.fields.getField("out", true).get("value").length, 1, "Merge node output 1 value"
        equals meshNode.ob.length, 1, "Meshnode has 1 mesh because a connection has been removed"
