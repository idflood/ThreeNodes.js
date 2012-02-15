
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.ExportCodeCommand = (function() {

    function ExportCodeCommand() {}

    ExportCodeCommand.prototype.execute = function() {
      var file_handler, injector;
      injector = this.context.injector;
      file_handler = injector.get("FileHandler");
      return file_handler.export_code();
    };

    return ExportCodeCommand;

  })();
});
