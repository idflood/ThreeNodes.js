var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.UrlHandler = (function(_super) {

    __extends(UrlHandler, _super);

    function UrlHandler() {
      var _this = this;
      ThreeNodes.events.on("InitUrlHandler", function(e) {
        return _this.execute();
      });
    }

    UrlHandler.prototype.execute = function() {
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
          ThreeNodes.events.trigger("SetDisplayModeCommand", true);
        } else {
          ThreeNodes.events.trigger("SetDisplayModeCommand", false);
        }
        if (url.indexOf("example/") === 0) {
          filename = url.replace("example/", "");
          ThreeNodes.events.trigger("ClearWorkspace");
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

    return UrlHandler;

  })(Backbone.Events);
});
