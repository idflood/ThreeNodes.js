var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jQuery', 'Underscore', 'Backbone', "order!libs/timeline.js/timeline", "order!libs/timeline.js/timeline-gui"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.AppTimeline = (function() {

    function AppTimeline() {
      this.update = __bind(this.update, this);
      this.onRegister = __bind(this.onRegister, this);      _.extend(this, Backbone.Events);
    }

    AppTimeline.prototype.onRegister = function() {
      var ng,
        _this = this;
      ng = this.context.injector.get("NodeGraph");
      localStorage["timeline.js.settings.canvasHeight"] = 46 + 120;
      this.timeline = new Timeline({
        displayOnlySelected: true,
        colorBackground: "#333",
        colorButtonBackground: "#222222",
        colorButtonStroke: "#777",
        colorScrollbar: "#373737",
        colorScrollbarThumb: "#555",
        colorTimelineLabel: "#999",
        colorTimelineTick: "#555",
        colorTimeScale: "#666",
        colorHeaderBorder: "#222",
        colorTimeTicker: "#f00",
        colorTrackBottomLine: "#555",
        colorPropertyLabel: "#999",
        onGuiSave: function() {
          return _this.context.commandMap.execute("OnUiResizeCommand");
        },
        setPropertyValue: function(propertyAnim, t) {
          return propertyAnim.target[propertyAnim.propertyName].setValue(t);
        },
        applyPropertyValue: function(propertyAnim, t) {
          return propertyAnim.target[propertyAnim.propertyName].setValue(propertyAnim.startValue + (propertyAnim.endValue - propertyAnim.startValue) * t);
        },
        getPropertyValue: function(propertyAnim) {
          return propertyAnim.target[propertyAnim.propertyName].getValue();
        },
        onTrackRebuild: function() {
          var node, _i, _len, _ref, _results;
          _ref = ng.models;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(node.onTimelineRebuild());
          }
          return _results;
        },
        onStop: function() {
          var node, _i, _len, _ref, _results;
          _ref = ThreeNodes.sound_nodes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(node.stopSound());
          }
          return _results;
        },
        onPlay: function(time) {
          var node, _i, _len, _ref, _results;
          _ref = ThreeNodes.sound_nodes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(node.playSound(time));
          }
          return _results;
        }
      });
      Timeline.globalInstance = this.timeline;
      this.timeline.loop(-1);
      return this.time = 0;
    };

    AppTimeline.prototype.update = function() {
      var dt, n;
      n = Date.now();
      if (this.timeline) {
        dt = n - this.time;
        this.timeline.update(dt / 1000);
      }
      return this.time = n;
    };

    return AppTimeline;

  })();
});
