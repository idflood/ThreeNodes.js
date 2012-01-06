define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.SetDisplayModeCommand
    execute: (is_player = false) ->
      injector = @context.injector
      ui = injector.get("AppUI")
      if is_player == true
        $("body").addClass("player-mode")
        $("body").removeClass("editor-mode")
      else
        $("body").addClass("editor-mode")
        $("body").removeClass("player-mode")
      
      @context.player_mode = is_player
      if is_player == false
        injector.get("NodeGraph").renderAllConnections()
      return true
