#if typeof requirejs != 'function' then requirejs = define
console.log("this gets called in node if jQuery is removed from the testrunner require function")

define ['use!Underscore', 'use!Backbone',"cs!threenodes/App", "cs!threenodes/utils/Utils"], (_, Backbone, App, Utils) ->
  "use strict"
  
  # never called using node.js, works in the browser
  console.log("TESTING...")
  $ = jQuery
  assert = require('chai').assert
  
  suite "Nodes", () ->
    app = new App
      test: true
    
    ng = app.nodes
    
    setup: () ->
      app.clearWorkspace()
      
    test "Nodes collection has correct number of nodes", () ->
      ng.createNode("Number")
      assert.equal ng.length, 1
      ng.createNode("Number")
      assert.equal ng.length, 3
      
    test "ng.indexer.uid is different than 0", () ->
      assert.notEqual ng.indexer.uid, 0
    
    test "Nodes collection is properly reset", () ->
      app.clearWorkspace()
      assert.equal ng.length, 0
      assert.equal ng.indexer.getUID(false), 0
      assert.equal ng.indexer.uid, 0
