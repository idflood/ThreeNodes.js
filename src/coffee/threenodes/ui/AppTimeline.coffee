define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/timeline.js/timeline",
  "order!libs/timeline.js/timeline-gui",
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.AppTimeline
    constructor: () ->
      _.extend(@, Backbone.Events)
    
    onRegister: () =>
      @timeline = new Timeline
        displayOnlySelected: true
        colorBackground: "#333"
        colorButtonBackground: "#222222"
        colorButtonStroke: "#777"
        colorScrollbar: "#373737"
        colorScrollbarThumb: "#555"
        colorTimelineLabel: "#999"
        colorTimelineTick: "#555"
        colorTimeScale: "#666"
        colorHeaderBorder: "#222"
        colorTimeTicker: "#f00"
        colorTrackBottomLine: "#555"
        colorPropertyLabel: "#999"
        setPropertyValue: (propertyAnim, t) ->
          propertyAnim.target[propertyAnim.propertyName].set(t)
        applyPropertyValue: (propertyAnim, t) ->
          propertyAnim.target[propertyAnim.propertyName].set(propertyAnim.startValue + (propertyAnim.endValue - propertyAnim.startValue) * t)
        getPropertyValue: (propertyAnim) ->
          propertyAnim.target[propertyAnim.propertyName].get()
      Timeline.globalInstance = @timeline
      @timeline.loop(-1)
      @time = 0
    
    update: () =>
      n = Date.now()
      if @timeline
        dt = n - @time
        @timeline.update(dt / 1000)
      @time = n
