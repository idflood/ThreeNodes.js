define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  return ThreeNodes.CreateNodeCommand = (function() {
    function CreateNodeCommand() {}
    CreateNodeCommand.prototype.execute = function(nodename, nodetype, dx, dy) {
      var injector, ng;
      if (dx == null) {
        dx = 0;
      }
      if (dy == null) {
        dy = 0;
      }
      injector = this.context.injector;
      ng = injector.get("NodeGraph");
      return ng.create_node(nodename, nodetype, dx, dy);
    };
    return CreateNodeCommand;
  })();
});