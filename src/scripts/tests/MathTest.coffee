define [
  'use!Underscore', 
  'use!Backbone',
  "order!libs/qunit-git",
], (_, Backbone) ->
  "use strict"
  
  $ = jQuery
  
  class MathTest
    constructor: (app) ->
      module "Math nodes"
      
      test "Basic math", () ->
        app.clearWorkspace()
        ng = app.nodes
        
        n1 = ng.createNode("Number")
        n2 = ng.createNode("Vector3")
        node_mult = ng.createNode("MathMult")
        
        n1.v_in.setValue 2
        node_mult.fields.getField("factor").setValue(3)
        
        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: node_mult.v_in
        
        ng.render()
        
        equals ng.connections.length, 1, "There is one connection"
        equals n1.v_out.connections.length, 1, "The output field has one connection"
        equals n1.v_out.get("is_output"), true, "n1.v_out is output"
        equals n1.v_out.getValue(), 2, "first node output 2"
        equals node_mult.v_in.connections.length, 1, "The input field has one connection"
        equals node_mult.v_in.getValue(), 2, "The value propagated from n1 to node node_mult"
        equals node_mult.v_out.getValue(), 6, "2 * 3 = 6"
        
        # connect a vector 3 to the factor, should output vector 3
        n2_out = n2.fields.getField("xyz", true)
        n2.fields.getField("x").setValue(1)
        n2.fields.getField("y").setValue(2)
        n2.fields.getField("z").setValue(3)
        c1 = ng.connections.create
          from_field: n2_out
          to_field: node_mult.v_in
        
        ng.render()
        equals $.type(node_mult.v_out.attributes.value[0]), "object", "Mult node output an object"
        equals node_mult.v_out.getValue().x, 3, "mult.x = 3 * 1 = 3"
        equals node_mult.v_out.getValue().y, 6, "mult.y = 3 * 2 = 6"
        equals node_mult.v_out.getValue().z, 9, "mult.z = 3 * 3 = 9"
        