
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.RemoveConnectionCommand = (function() {

    function RemoveConnectionCommand() {}

    RemoveConnectionCommand.prototype.execute = function(connection) {
      var injector, ng;
      injector = this.context.injector;
      ng = injector.get("NodeGraph");
      return ng.removeConnection(connection);
    };

    return RemoveConnectionCommand;

  })();
});
