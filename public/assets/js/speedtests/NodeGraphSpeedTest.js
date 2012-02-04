define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  "use strict";
  var NodeGraphSpeedTest;
  return NodeGraphSpeedTest = (function() {
    function NodeGraphSpeedTest(app) {
      var filehandler, injector, n1, n2, ng, node_mult, rnd;
      ng = app.nodegraph;
      injector = app.injector;
      filehandler = app.injector.get("FileHandler");
      app.commandMap.execute("ClearWorkspaceCommand");
      n1 = ng.create_node("Number");
      n2 = ng.create_node("Vector3");
      rnd = ng.create_node("Random");
      node_mult = ng.create_node("MathMult");
      node_mult.rack.get("factor").set(3);
      injector.instanciate(ThreeNodes.NodeConnection, n1.v_out, node_mult.v_in);
      injector.instanciate(ThreeNodes.NodeConnection, rnd.v_out, n1.v_in);
      ng.render();
      JSLitmus.test("Simple math.mult function", function() {
        return ng.render();
      });
    }
    return NodeGraphSpeedTest;
  })();
});