define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.RebuildShadersCommand = (function() {
    function RebuildShadersCommand() {}
    RebuildShadersCommand.prototype.execute = function() {
      var injector, webgl;
      injector = this.context.injector;
      webgl = injector.get("ThreeNodes.WebglBase");
      return webgl.rebuild_all_shaders();
    };
    return RebuildShadersCommand;
  })();
});