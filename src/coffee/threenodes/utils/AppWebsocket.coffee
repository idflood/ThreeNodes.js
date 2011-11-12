define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "libs/sockjs-latest.min",
], ($, _, Backbone) ->
  class ThreeNodes.AppWebsocket
    constructor: () ->
      webso = false
      if window.MozWebSocket
        webso = window.MozWebSocket
      else
        webso = WebSocket
    
      console.log("init websocket.")
      socket = new webso("ws://localhost:8080/p5websocket")
      
      self = this
      socket.onmessage = (data) ->
        self.on_websocket_message(data)
        
      socket.onerror = () ->
        console.log 'socket close'
      true
    on_websocket_message: (data) =>
      messg = data.data
      ThreeNodes.flash_sound_value = jQuery.parseJSON(messg)
