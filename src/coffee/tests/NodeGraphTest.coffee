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
        equals ng.nodes.length, 1, "Nodegraph has 1 node"
        ng.create_node("Base", "Number", 0, 0)
        equals ng.nodes.length, 2, "Nodegraph has 2 nodes"
        app.clear_workspace()
        equals ng.nodes.length, 0, "Nodegraph has 0 nodes"
