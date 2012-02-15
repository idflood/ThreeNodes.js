
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.OnUiResizeCommand = (function() {

    function OnUiResizeCommand() {}

    OnUiResizeCommand.prototype.execute = function() {
      var injector, ui;
      if (this.context.testing_mode === false) {
        injector = this.context.injector;
        ui = injector.get("AppUI");
        return ui.on_ui_window_resize();
      }
    };

    return OnUiResizeCommand;

  })();
});
