define (require) ->
  #"use strict"
  Backbone = require 'Backbone'

  class UrlHandler extends Backbone.Router
    routes:
      "": "onDefault"
      "play": "onPlay"
      "example/:file": "onExample"
      "play/example/:file": "onPlayExample"

    onDefault: () =>
      @trigger("SetDisplayModeCommand", false)

    onPlay: () =>
      @trigger("SetDisplayModeCommand", true)

    onExample: (file, player_mode = false) =>
      self = this
      @trigger("SetDisplayModeCommand", player_mode)
      @trigger("ClearWorkspace")
      $.ajax
        url: "examples/#{file}"
        dataType: 'text'
        success: (data) ->
          self.trigger("LoadJSON", data)

    onPlayExample: (file) =>
      @onExample(file, true)
