define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.CreateNodeCommand = (function() {
    function CreateNodeCommand() {}
    CreateNodeCommand.prototype.execute = function(nodename, dx, dy) {
      var injector, ng;
      if (dx == null) {
        dx = 0;
      }
      if (dy == null) {
        dy = 0;
      }
      injector = this.context.injector;
      ng = injector.get("NodeGraph");
      return ng.create_node(nodename, dx, dy);
    };
    return CreateNodeCommand;
  })();
});