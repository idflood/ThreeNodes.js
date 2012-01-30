define(['jQuery', 'Underscore', 'Backbone', "order!libs/BlobBuilder.min", "order!libs/FileSaver.min", "order!libs/canvas-toBlob.min"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.ExportImageCommand = (function() {
    function ExportImageCommand() {}
    ExportImageCommand.prototype.execute = function(fname) {
      var canvas, on_write, renderer;
      renderer = ThreeNodes.Webgl.current_renderer;
      canvas = renderer.domElement;
      on_write = function(blob) {
        return saveAs(blob, fname);
      };
      return canvas.toBlob(on_write, "image/png");
    };
    return ExportImageCommand;
  })();
});