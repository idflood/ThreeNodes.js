define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  class NodeGraphTest
    constructor: (app) ->
      module "NodeGraph"
      
      test "Nodegraph nodes", () ->
        ng = app.nodegraph
        ng.create_node("Base", "Number", 0, 0)
        equals 1, ng.nodes.length, "Nodegraph has 1 node"
        ng.create_node("Base", "Number", 0, 0)
        equals 2, ng.nodes.length, "Nodegraph has 2 nodes"
        app.clear_workspace()
        equals 0, ng.nodes.length, "Nodegraph has 0 nodes"
