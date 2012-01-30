define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/BlobBuilder.min",
  "order!libs/FileSaver.min",
  "order!libs/canvas-toBlob.min",
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.ExportImageCommand
    execute: (fname) ->
      renderer = ThreeNodes.Webgl.current_renderer
      canvas = renderer.domElement
      #ThreeNodes.is_playing = false
      on_write = (blob) ->
        saveAs(blob, fname)
        #ThreeNodes.is_playing = true
      canvas.toBlob(on_write, "image/png")
