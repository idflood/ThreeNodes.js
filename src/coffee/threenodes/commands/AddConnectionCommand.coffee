define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  class ThreeNodes.AddConnectionCommand
    execute: (connection) ->
      injector = @context.injector
      ng = injector.get("NodeGraph")
      ng.addConnection(connection)
