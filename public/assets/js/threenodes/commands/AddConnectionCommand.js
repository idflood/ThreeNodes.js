define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  return ThreeNodes.AddConnectionCommand = (function() {
    function AddConnectionCommand() {}
    AddConnectionCommand.prototype.execute = function(connection) {
      var injector, ng;
      injector = this.context.injector;
      ng = injector.get("NodeGraph");
      return ng.addConnection(connection);
    };
    return AddConnectionCommand;
  })();
});