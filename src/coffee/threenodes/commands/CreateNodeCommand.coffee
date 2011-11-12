define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  class ThreeNodes.CreateNodeCommand
    execute: (nodename, nodetype, dx = 0, dy = 0) ->
      injector = @context.injector
      ng = injector.get("NodeGraph")
      ng.create_node(nodename, nodetype, dx, dy)
