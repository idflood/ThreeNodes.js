define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.UrlHandler extends Backbone.Router
    routes:
      "": "onDefault"
      "play": "onPlay"
      "example/:file": "onExample"
      "play/example/:file": "onPlayExample"
    
    onDefault: () =>
      ThreeNodes.events.trigger("SetDisplayModeCommand", false)
    
    onPlay: () =>
      ThreeNodes.events.trigger("SetDisplayModeCommand", true)
    
    onExample: (file, player_mode = false) =>
      fh = @context.file_handler
      ThreeNodes.events.trigger("SetDisplayModeCommand", player_mode)
      ThreeNodes.events.trigger("ClearWorkspace")
      $.ajax
        url: "examples/#{file}"
        dataType: 'text'
        success: (data) ->
          fh.load_from_json_data(data)
    
    onPlayExample: (file) =>
      @onExample(file, true)
