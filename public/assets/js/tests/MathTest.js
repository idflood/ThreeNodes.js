
define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  "use strict";
  var MathTest;
  return MathTest = (function() {

    function MathTest(app) {
      module("Math nodes");
      test("Basic math", function() {
        var c1, injector, n1, n2, n2_out, ng, node_mult;
        app.commandMap.execute("ClearWorkspaceCommand");
        injector = app.injector;
        ng = app.nodegraph;
        n1 = ng.create_node("Number");
        n2 = ng.create_node("Vector3");
        node_mult = ng.create_node("MathMult");
        n1.v_in.setValue(2);
        node_mult.rack.getField("factor").setValue(3);
        ng.connections.create({
          from_field: n1.v_out,
          to_field: node_mult.v_in
        });
        ng.render();
        equals(node_mult.v_out.getValue(), 6, "2 * 3 = 6");
        n2_out = n2.rack.getField("xyz", true);
        n2.rack.getField("x").setValue(1);
        n2.rack.getField("y").setValue(2);
        n2.rack.getField("z").setValue(3);
        c1 = ng.connections.create({
          from_field: n2_out,
          to_field: node_mult.v_in
        });
        ng.render();
        equals($.type(node_mult.v_out.attributes.value[0]), "object", "Mult node output an object");
        equals(node_mult.v_out.getValue().x, 3, "mult.x = 3 * 1 = 3");
        equals(node_mult.v_out.getValue().y, 6, "mult.y = 3 * 2 = 6");
        return equals(node_mult.v_out.getValue().z, 9, "mult.z = 3 * 3 = 9");
      });
    }

    return MathTest;

  })();
});
