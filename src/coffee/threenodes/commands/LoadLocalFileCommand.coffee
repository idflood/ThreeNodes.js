define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  class ThreeNodes.LoadLocalFileCommand
    execute: (event) ->
      injector = @context.injector
      file_handler = injector.get("FileHandler")
      file_handler.load_local_file_input_changed(event)
