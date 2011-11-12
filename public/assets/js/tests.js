var required_test_libs;
required_test_libs = ["order!libs/qunit-git", "order!app"];
require(required_test_libs, function() {
  return "wait for apps dependencies...";
});
window.init_test = function() {
  console.log("test init");
  module("NodegGraph");
  return test("Nodegraph nodes", function() {
    var ng;
    ng = new NodeGraph();
    ng.create_node("Base", "Number", 0, 0);
    equals(1, ng.nodes.length, "Nodegraph has 1 node");
    ng.create_node("Base", "Number", 0, 0);
    equals(2, ng.nodes.length, "Nodegraph has 2 nodes");
    clear_workspace();
    return equals(0, ng.nodes.length, "Nodegraph has 0 nodes");
  });
};