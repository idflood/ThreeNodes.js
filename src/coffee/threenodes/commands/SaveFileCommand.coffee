define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.SaveFileCommand
    execute: () ->
      injector = @context.injector
      file_handler = injector.get("FileHandler")
      file_handler.save_local_file()
