define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  var NodeGraphTest;
  return NodeGraphTest = (function() {
    function NodeGraphTest(app) {
      module("NodeGraph");
      test("Nodegraph nodes", function() {
        var ng;
        ng = app.nodegraph;
        ng.create_node("Base", "Number", 0, 0);
        equals(1, ng.nodes.length, "Nodegraph has 1 node");
        ng.create_node("Base", "Number", 0, 0);
        equals(2, ng.nodes.length, "Nodegraph has 2 nodes");
        app.clear_workspace();
        return equals(0, ng.nodes.length, "Nodegraph has 0 nodes");
      });
    }
    return NodeGraphTest;
  })();
});