var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/sockjs-latest.min"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.AppWebsocket = (function() {
    function AppWebsocket() {
      this.on_websocket_message = __bind(this.on_websocket_message, this);
      var self, socket, webso;
      if (ThreeNodes.websocket_enabled) {
        webso = false;
        if (window.MozWebSocket) {
          webso = window.MozWebSocket;
        } else {
          webso = WebSocket;
        }
        console.log("init websocket.");
        self = this;
        try {
          socket = new webso("ws://localhost:8080/p5websocket");
          socket.onmessage = function(data) {
            return self.on_websocket_message(data);
          };
          socket.onerror = function() {
            return console.log('socket close');
          };
        } catch (e) {
          console.log("no websockets!");
          console.log(e);
        }
        true;
      }
    }
    AppWebsocket.prototype.on_websocket_message = function(data) {
      var messg;
      messg = data.data;
      return ThreeNodes.flash_sound_value = jQuery.parseJSON(messg);
    };
    return AppWebsocket;
  })();
});