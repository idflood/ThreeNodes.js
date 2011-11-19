define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  class ThreeNodes.RebuildShadersCommand
    execute: () ->
      injector = @context.injector
      webgl = injector.get("ThreeNodes.WebglBase")
      webgl.rebuild_all_shaders()
