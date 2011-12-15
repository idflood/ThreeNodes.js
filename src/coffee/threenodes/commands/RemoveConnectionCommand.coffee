define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.RemoveConnectionCommand
    execute: (connection) ->
      injector = @context.injector
      ng = injector.get("NodeGraph")
      ng.removeConnection(connection)
