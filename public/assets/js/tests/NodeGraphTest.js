
define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  "use strict";
  var NodeGraphTest;
  return NodeGraphTest = (function() {

    function NodeGraphTest(app) {
      module("NodeGraph");
      test("Nodegraph nodes", function() {
        var ng;
        ng = app.nodegraph;
        app.commandMap.execute("ClearWorkspaceCommand");
        ng.create_node("Number", 0, 0);
        equals(ng.length, 1, "Nodegraph has 1 node");
        ng.create_node("Number", 0, 0);
        equals(ng.length, 2, "Nodegraph has 2 nodes");
        app.commandMap.execute("ClearWorkspaceCommand");
        equals(ng.length, 0, "Nodegraph has 0 nodes");
        return equals(ThreeNodes.uid, 0, "ThreeNodes.uid has been reset to 0");
      });
    }

    return NodeGraphTest;

  })();
});
