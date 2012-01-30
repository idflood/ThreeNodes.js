define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/BlobBuilder.min",
  "order!libs/FileSaver.min",
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.ExportImageCommand
    dataURItoBlob: (dataURI, callback) ->
      byteString = atob(dataURI.split(',')[1])
      mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      ab = new ArrayBuffer(byteString.length)
      ia = new Uint8Array(ab)
      for i in [0..byteString.length - 1]
        ia[i] = byteString.charCodeAt(i)
      
      bb = new BlobBuilder()
      bb.append(ab)
      return bb.getBlob(mimeString)
      
    execute: (filename = "exported-image.png") ->
      renderer = ThreeNodes.Webgl.current_renderer
      dataURL = renderer.domElement.toDataURL("image/png")
      #image64 = dataURLreplace("image/png", "image/octet-stream")
      #bb.append(image64)
      saveAs(@dataURItoBlob(dataURL), filename)
