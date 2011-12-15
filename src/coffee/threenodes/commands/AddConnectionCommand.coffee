define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.AddConnectionCommand
    execute: (connection) ->
      injector = @context.injector
      ng = injector.get("NodeGraph")
      ng.addConnection(connection)
