var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.UrlHandler = (function(_super) {

    __extends(UrlHandler, _super);

    function UrlHandler() {
      this.onPlayExample = __bind(this.onPlayExample, this);
      this.onExample = __bind(this.onExample, this);
      this.onPlay = __bind(this.onPlay, this);
      this.onDefault = __bind(this.onDefault, this);
      UrlHandler.__super__.constructor.apply(this, arguments);
    }

    UrlHandler.prototype.routes = {
      "": "onDefault",
      "play": "onPlay",
      "example/:file": "onExample",
      "play/example/:file": "onPlayExample"
    };

    UrlHandler.prototype.onDefault = function() {
      return this.trigger("SetDisplayModeCommand", false);
    };

    UrlHandler.prototype.onPlay = function() {
      return this.trigger("SetDisplayModeCommand", true);
    };

    UrlHandler.prototype.onExample = function(file, player_mode) {
      var self;
      if (player_mode == null) player_mode = false;
      self = this;
      this.trigger("SetDisplayModeCommand", player_mode);
      this.trigger("ClearWorkspace");
      return $.ajax({
        url: "examples/" + file,
        dataType: 'text',
        success: function(data) {
          return self.trigger("LoadJSON", data);
        }
      });
    };

    UrlHandler.prototype.onPlayExample = function(file) {
      return this.onExample(file, true);
    };

    return UrlHandler;

  })(Backbone.Router);
});
