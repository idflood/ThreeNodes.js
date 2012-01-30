define(['jQuery', 'Underscore', 'Backbone', "order!libs/BlobBuilder.min", "order!libs/FileSaver.min"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.ExportImageCommand = (function() {
    function ExportImageCommand() {}
    ExportImageCommand.prototype.dataURItoBlob = function(dataURI, callback) {
      var ab, bb, byteString, i, ia, mimeString, _ref;
      byteString = atob(dataURI.split(',')[1]);
      mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      ab = new ArrayBuffer(byteString.length);
      ia = new Uint8Array(ab);
      for (i = 0, _ref = byteString.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        ia[i] = byteString.charCodeAt(i);
      }
      bb = new BlobBuilder();
      bb.append(ab);
      return bb.getBlob(mimeString);
    };
    ExportImageCommand.prototype.execute = function(filename) {
      var dataURL, renderer;
      if (filename == null) {
        filename = "exported-image.png";
      }
      renderer = ThreeNodes.Webgl.current_renderer;
      dataURL = renderer.domElement.toDataURL("image/png");
      return saveAs(this.dataURItoBlob(dataURL), filename);
    };
    return ExportImageCommand;
  })();
});