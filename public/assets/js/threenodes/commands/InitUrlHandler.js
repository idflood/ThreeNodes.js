var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.InitUrlHandler = (function() {
    function InitUrlHandler() {}
    InitUrlHandler.prototype.execute = function() {
      var delay, init_url, injector, url_cache;
      injector = this.context.injector;
      url_cache = false;
      $(window).bind('hashchange', __bind(function(e) {
        var fh, filename, url;
        url = $.param.fragment();
        fh = injector.get("FileHandler");
        if (url === url_cache) {
          return false;
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
        return url_cache = url;
      }, this));
      delay = function(ms, func) {
        return setTimeout(func, ms);
      };
      init_url = function() {
        console.log("yes");
        return $(window).trigger('hashchange');
      };
      return delay(500, function() {
        return init_url();
      });
    };
    return InitUrlHandler;
  })();
});