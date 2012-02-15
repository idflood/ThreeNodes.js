
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.SetDisplayModeCommand = (function() {

    function SetDisplayModeCommand() {}

    SetDisplayModeCommand.prototype.execute = function(is_player) {
      var injector, ui;
      if (is_player == null) is_player = false;
      injector = this.context.injector;
      ui = injector.get("AppUI");
      if (is_player === true) {
        $("body").addClass("player-mode");
        $("body").removeClass("editor-mode");
      } else {
        $("body").addClass("editor-mode");
        $("body").removeClass("player-mode");
      }
      this.context.player_mode = is_player;
      if (is_player === false) injector.get("NodeGraph").renderAllConnections();
      return true;
    };

    return SetDisplayModeCommand;

  })();
});
