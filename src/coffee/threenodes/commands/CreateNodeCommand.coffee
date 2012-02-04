define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.CreateNodeCommand
    execute: (nodename, dx = 0, dy = 0) ->
      injector = @context.injector
      ng = injector.get("NodeGraph")
      ng.create_node(nodename, dx, dy)
