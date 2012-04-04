define [
  'use!Underscore', 
  'use!Backbone',
  "threenodes/utils/Utils",
  "order!libs/qunit-git",
], (_, Backbone, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class NodeGraphTest
    constructor: (app) ->
      module "NodeGraph"
      
      test "Nodegraph nodes", () ->
        ng = app.nodegraph
        ThreeNodes.events.trigger("ClearWorkspace")
        ng.create_node("Number")
        equals ng.length, 1, "Nodegraph has 1 node"
        ng.create_node("Number")
        equals ng.length, 2, "Nodegraph has 2 nodes"
        notEqual Utils.uid, 0, "Utils.uid is different than 0"
        
        ThreeNodes.events.trigger("ClearWorkspace")
        equals ng.length, 0, "Nodegraph has 0 nodes"
        equals Utils.get_uid(false), 0, "ThreeNodes.uid has been reset to 0 (1/2)"
        equals Utils.uid, 0, "ThreeNodes.uid has been reset to 0 (2/2)"
