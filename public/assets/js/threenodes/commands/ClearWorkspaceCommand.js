define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.ClearWorkspaceCommand = (function() {
    function ClearWorkspaceCommand() {}
    ClearWorkspaceCommand.prototype.execute = function() {
      var injector, ng, timeline;
      injector = this.context.injector;
      ng = injector.get("NodeGraph");
      ng.remove_all_connections();
      ng.remove_all_nodes();
      this.context.reset_global_variables();
      $("#webgl-window canvas").remove();
      $("#timeline-container, #keyEditDialog").remove();
      timeline = injector.get("AppTimeline");
      return timeline.onRegister();
    };
    return ClearWorkspaceCommand;
  })();
});