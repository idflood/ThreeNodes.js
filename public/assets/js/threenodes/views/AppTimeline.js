var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "order!libs/timeline.js/timeline", "order!libs/timeline.js/timeline-gui"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.AppTimeline = (function(_super) {

    __extends(AppTimeline, _super);

    function AppTimeline() {
      this.update = __bind(this.update, this);
      this.initialize = __bind(this.initialize, this);
      AppTimeline.__super__.constructor.apply(this, arguments);
    }

    AppTimeline.prototype.initialize = function(options) {
      var ng,
        _this = this;
      ng = options.nodegraph;
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
          return ThreeNodes.events.trigger("OnUIResize");
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

  })(Backbone.View);
});
