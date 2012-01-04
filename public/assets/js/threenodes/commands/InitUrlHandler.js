var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.InitUrlHandler = (function() {
    function InitUrlHandler() {}
    InitUrlHandler.prototype.execute = function() {
      var injector, on_url_change, url_cache;
      injector = this.context.injector;
      url_cache = false;
      on_url_change = __bind(function(e) {
        var fh, filename, url;
        url = $.param.fragment();
        fh = injector.get("FileHandler");
        if (url === url_cache) {
          return false;
        }
        if (url.indexOf("play/") === 0) {
          url = url.replace("play/", "");
          this.context.player_mode = true;
          $("body").addClass("player-mode");
        } else {
          $("body").addClass("editor-mode");
        }
        if (url.indexOf("example/") === 0) {
          filename = url.replace("example/", "");
          this.context.commandMap.execute("ClearWorkspaceCommand");
          $.ajax({
            url: "examples/" + filename,
            dataType: 'text',
            success: function(data) {
              return fh.load_from_json_data(data);
            }
          });
        }
        return url_cache = $.param.fragment();
      }, this);
      $(window).bind('hashchange', __bind(function(e) {
        return on_url_change(e);
      }, this));
      return on_url_change(null);
    };
    return InitUrlHandler;
  })();
});