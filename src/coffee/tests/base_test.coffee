required_test_libs = [
  "order!libs/qunit-git",
  "order!app"
  ]
require required_test_libs, () ->
  "wait for apps dependencies..."

window.init_test = () ->
  console.log "test init"
  module "NodegGraph"
  
  test "Nodegraph nodes", ->
    ng = new NodeGraph()
    ng.create_node("Base", "Number", 0, 0)
    equals 1, ng.nodes.length, "Nodegraph has 1 node"
    ng.create_node("Base", "Number", 0, 0)
    equals 2, ng.nodes.length, "Nodegraph has 2 nodes"
    clear_workspace()
    equals 0, ng.nodes.length, "Nodegraph has 0 nodes"