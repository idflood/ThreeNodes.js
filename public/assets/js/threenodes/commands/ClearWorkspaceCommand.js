define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  return ThreeNodes.ClearWorkspaceCommand = (function() {
    function ClearWorkspaceCommand() {}
    ClearWorkspaceCommand.prototype.execute = function() {
      var injector, ng;
      injector = this.context.injector;
      ng = injector.get("NodeGraph");
      ng.remove_all_connections();
      ng.remove_all_nodes();
      return this.context.reset_global_variables();
    };
    return ClearWorkspaceCommand;
  })();
});