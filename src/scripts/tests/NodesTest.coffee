define [
  'use!Underscore', 
  'use!Backbone',
  "threenodes/utils/Utils",
  "order!libs/qunit-git",
], (_, Backbone, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class NodesTest
    constructor: (app) ->
      module "NodeGraph"
      
      test "Nodegraph nodes", () ->
        ng = app.nodegraph
        app.clearWorkspace()
        ng.create_node("Number")
        equals ng.length, 1, "Nodegraph has 1 node"
        ng.create_node("Number")
        equals ng.length, 2, "Nodegraph has 2 nodes"
        notEqual ng.indexer.uid, 0, "ng.indexer.uid is different than 0"
        app.clearWorkspace()
        
        equals ng.length, 0, "Nodegraph has 0 nodes"
        equals ng.indexer.get_uid(false), 0, "ng.indexer.uid has been reset to 0 (1/2)"
        equals ng.indexer.uid, 0, "ThreeNodes.uid has been reset to 0 (2/2)"
