define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/timeline.js/timeline",
  "order!libs/timeline.js/timeline-gui",
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.AppTimeline extends Backbone.View
    initialize: (options) =>
      # reset canvas height
      localStorage["timeline.js.settings.canvasHeight"] = 46 + 120
      
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
        onGuiSave: () =>
          ThreeNodes.events.trigger "OnUIResize"
        setPropertyValue: (propertyAnim, t) ->
          propertyAnim.target[propertyAnim.propertyName].setValue(t)
        applyPropertyValue: (propertyAnim, t) ->
          propertyAnim.target[propertyAnim.propertyName].setValue(propertyAnim.startValue + (propertyAnim.endValue - propertyAnim.startValue) * t)
        getPropertyValue: (propertyAnim) ->
          propertyAnim.target[propertyAnim.propertyName].getValue()
        onTrackRebuild: () => @trigger("trackRebuild")
        onStop: () => @trigger("stopSound")
        onPlay: (time) => @trigger("startSound", time)
      Timeline.globalInstance = @timeline
      
      @timeline.loop(-1)
      @time = 0
    
    selectAnims: (nodes) =>
      @timeline.selectAnims(nodes)
    
    remove: () =>
      @undelegateEvents()
      @timeline.destroy()
      @timeline = null
      @time = null
      super
    
    update: () =>
      n = Date.now()
      if @timeline
        dt = n - @time
        @timeline.update(dt / 1000)
      @time = n
