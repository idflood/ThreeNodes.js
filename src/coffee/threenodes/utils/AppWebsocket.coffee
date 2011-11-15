define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "libs/sockjs-latest.min",
], ($, _, Backbone) ->
  class ThreeNodes.AppWebsocket
    constructor: () ->
      if ThreeNodes.websocket_enabled
        webso = false
        if window.MozWebSocket
          webso = window.MozWebSocket
        else
          webso = WebSocket
      
        console.log("init websocket.")
        self = this
        try
          socket = new webso("ws://localhost:8080/p5websocket")
          socket.onmessage = (data) ->
            self.on_websocket_message(data)
            
          socket.onerror = () ->
            console.log 'socket close'
        catch e
          console.log "no websockets!"
          console.log e
        true
    
    on_websocket_message: (data) =>
      messg = data.data
      ThreeNodes.flash_sound_value = jQuery.parseJSON(messg)
