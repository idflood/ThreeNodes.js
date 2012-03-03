define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  "use strict"
  class NodeGraphTest
    constructor: (app) ->
      module "NodeGraph"
      
      test "Nodegraph nodes", () ->
        ng = app.nodegraph
        ThreeNodes.events.trigger("ClearWorkspace")
        ng.create_node("Number", 0, 0)
        equals ng.length, 1, "Nodegraph has 1 node"
        ng.create_node("Number", 0, 0)
        equals ng.length, 2, "Nodegraph has 2 nodes"
        ThreeNodes.events.trigger("ClearWorkspace")
        equals ng.length, 0, "Nodegraph has 0 nodes"
        equals ThreeNodes.uid, 0, "ThreeNodes.uid has been reset to 0"
