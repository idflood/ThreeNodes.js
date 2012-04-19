
define [
  'use!Underscore', 
  'use!Backbone',
  "order!libs/sockjs-latest.min",
], (_, Backbone) ->
  #"use strict"
  window.namespace "ThreeNodes",
    AppWebsocket: class AppWebsocket
      constructor: (websocket_enabled = false) ->
        if websocket_enabled
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
              self.onWebsocketMessage(data)
              
            socket.onerror = () ->
              console.log 'socket close'
          catch e
            console.log "no websockets!"
            console.log e
          true
      
      onWebsocketMessage: (data) =>
        messg = data.data
        #ThreeNodes.flash_sound_value = jQuery.parseJSON(messg)
