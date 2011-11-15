define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  return ThreeNodes.SaveFileCommand = (function() {
    function SaveFileCommand() {}
    SaveFileCommand.prototype.execute = function() {
      var file_handler, injector;
      injector = this.context.injector;
      file_handler = injector.get("FileHandler");
      return file_handler.save_local_file();
    };
    return SaveFileCommand;
  })();
});