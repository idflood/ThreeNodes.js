
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.LoadLocalFileCommand = (function() {

    function LoadLocalFileCommand() {}

    LoadLocalFileCommand.prototype.execute = function(event) {
      var file_handler, injector;
      injector = this.context.injector;
      file_handler = injector.get("FileHandler");
      return file_handler.load_local_file_input_changed(event);
    };

    return LoadLocalFileCommand;

  })();
});
