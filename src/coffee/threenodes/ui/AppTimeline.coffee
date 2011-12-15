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
        colorBackground: "#333"
        colorButtonBackground: "#222222"
        colorButtonStroke: "#777"
        colorScrollbar: "#373737"
        colorScrollbarThumb: "#555"
        colorTimelineLabel: "#999"
        colorTimelineTick: "#555"
        colorTimeScale: "#666"
        colorHeaderBorder: "#222"
        colorTimeTicker: "#07f"
      Timeline.globalInstance = @timeline
      @timeline.loop(-1)
      @time = 0
    
    update: () =>
      n = Date.now()
      if @timeline
        dt = n - @time
        @timeline.update(dt)
      @time = n
