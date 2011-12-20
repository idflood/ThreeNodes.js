define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.RemoveSelectedNodesCommand = (function() {
    function RemoveSelectedNodesCommand() {}
    RemoveSelectedNodesCommand.prototype.execute = function(connection) {
      return $(".node.ui-selected").each(function() {
        return $(this).data("object").remove();
      });
    };
    return RemoveSelectedNodesCommand;
  })();
});