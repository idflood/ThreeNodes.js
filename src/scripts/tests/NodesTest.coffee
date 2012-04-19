define [
  'use!Underscore', 
  'use!Backbone',
  "cs!threenodes/utils/Utils",
  "order!libs/qunit-git",
], (_, Backbone, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class NodesTest
    constructor: (app) ->
      module "Nodes"
      
      test "Nodes", () ->
        ng = app.nodes
        app.clearWorkspace()
        ng.createNode("Number")
        equals ng.length, 1, "Nodes collection has 1 node"
        ng.createNode("Number")
        equals ng.length, 2, "Nodes collection has 2 nodes"
        notEqual ng.indexer.uid, 0, "ng.indexer.uid is different than 0"
        app.clearWorkspace()
        
        equals ng.length, 0, "Nodes collection has 0 nodes"
        equals ng.indexer.getUID(false), 0, "ng.indexer.uid has been reset to 0 (1/2)"
        equals ng.indexer.uid, 0, "ThreeNodes.uid has been reset to 0 (2/2)"
