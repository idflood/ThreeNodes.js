define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  "use strict"
  class MathTest
    constructor: (app) ->
      module "Math nodes"
      
      test "Basic math", () ->
        ThreeNodes.events.trigger("ClearWorkspace")
        ng = app.nodegraph
        
        n1 = ng.create_node("Number")
        n2 = ng.create_node("Vector3")
        node_mult = ng.create_node("MathMult")
        
        n1.v_in.setValue 2
        node_mult.rack.getField("factor").setValue(3)
        
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
        n2_out = n2.rack.getField("xyz", true)
        n2.rack.getField("x").setValue(1)
        n2.rack.getField("y").setValue(2)
        n2.rack.getField("z").setValue(3)
        c1 = ng.connections.create
          from_field: n2_out
          to_field: node_mult.v_in
        
        ng.render()
        equals $.type(node_mult.v_out.attributes.value[0]), "object", "Mult node output an object"
        equals node_mult.v_out.getValue().x, 3, "mult.x = 3 * 1 = 3"
        equals node_mult.v_out.getValue().y, 6, "mult.y = 3 * 2 = 6"
        equals node_mult.v_out.getValue().z, 9, "mult.z = 3 * 3 = 9"
        