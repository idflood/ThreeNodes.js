define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.ClearWorkspaceCommand
    execute: () ->
      injector = @context.injector
      ng = injector.get("NodeGraph")
      ng.remove_all_connections()
      ng.remove_all_nodes()
      @context.reset_global_variables()
      $("#webgl-window canvas").remove()
      
      # create a new timeline
      $("#timeline-container, #keyEditDialog").remove()
      timeline = injector.get "AppTimeline"
      timeline.onRegister()
