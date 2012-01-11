define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.ExportCodeCommand
    execute: () ->
      injector = @context.injector
      file_handler = injector.get("FileHandler")
      file_handler.export_code()
