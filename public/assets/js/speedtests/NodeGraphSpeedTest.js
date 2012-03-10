
define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  "use strict";
  var NodeGraphSpeedTest;
  return NodeGraphSpeedTest = (function() {

    function NodeGraphSpeedTest(app) {
      var filehandler, injector, n1, n2, ng, node_mult, rnd;
      ng = app.nodegraph;
      injector = app.injector;
      filehandler = app.file_handler;
      ThreeNodes.events.trigger("ClearWorkspace");
      n1 = ng.create_node("Number");
      n2 = ng.create_node("Vector3");
      rnd = ng.create_node("Random");
      node_mult = ng.create_node("MathMult");
      node_mult.rack.getField("factor").setValue(3);
      ng.connections.create({
        from_field: n1.v_out,
        to_field: node_mult.v_in
      });
      ng.connections.create({
        from_field: rnd.v_out,
        to_field: n1.v_in
      });
      ng.render();
      JSLitmus.test("Simple math.mult function", function() {
        return ng.render();
      });
    }

    return NodeGraphSpeedTest;

  })();
});
