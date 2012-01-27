define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.OnUiResizeCommand
    execute: () ->
      if @context.testing_mode == false
        injector = @context.injector
        ui = injector.get "AppUI"
        ui.on_ui_window_resize()
