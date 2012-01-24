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
        n1 = ng.create_node("Base", "Number");
        n2 = ng.create_node("Base", "Vector3");
        node_mult = ng.create_node("Math", "Mult");
        n1.v_in.set(2);
        node_mult.rack.get("factor").set(3);
        injector.instanciate(ThreeNodes.NodeConnection, n1.v_out, node_mult.v_in);
        ng.render();
        equals(node_mult.v_out.get(), 6, "2 * 3 = 6");
        n2_out = n2.rack.get("xyz", true);
        n2.rack.get("x").set(1);
        n2.rack.get("y").set(2);
        n2.rack.get("z").set(3);
        c1 = injector.instanciate(ThreeNodes.NodeConnection, n2_out, node_mult.v_in);
        ng.render();
        equals($.type(n1.v_out.val[0]), "Object", "Mult node output an object");
        equals(node_mult.v_out.get().x, 2, "mult.x = 2 * 1 = 2");
        equals(node_mult.v_out.get().y, 4, "mult.y = 2 * 2 = 4");
        return equals(node_mult.v_out.get().z, 6, "mult.z = 2 * 3 = 6");
      });
    }
    return MathTest;
  })();
});