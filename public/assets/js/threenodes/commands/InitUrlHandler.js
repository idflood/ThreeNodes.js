
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.InitUrlHandler = (function() {

    function InitUrlHandler() {}

    InitUrlHandler.prototype.execute = function() {
      var injector, on_url_change, url_cache,
        _this = this;
      injector = this.context.injector;
      url_cache = false;
      on_url_change = function(e) {
        var fh, filename, url;
        url = $.param.fragment();
        fh = injector.get("FileHandler");
        if (url === url_cache) return false;
        if (url.indexOf("play/") === 0) {
          url = url.replace("play/", "");
          _this.context.commandMap.execute("SetDisplayModeCommand", true);
        } else {
          _this.context.commandMap.execute("SetDisplayModeCommand", false);
        }
        if (url.indexOf("example/") === 0) {
          filename = url.replace("example/", "");
          _this.context.commandMap.execute("ClearWorkspaceCommand");
          $.ajax({
            url: "examples/" + filename,
            dataType: 'text',
            success: function(data) {
              return fh.load_from_json_data(data);
            }
          });
        }
        return url_cache = $.param.fragment();
      };
      $(window).bind('hashchange', function(e) {
        return on_url_change(e);
      });
      return on_url_change(null);
    };

    return InitUrlHandler;

  })();
});
