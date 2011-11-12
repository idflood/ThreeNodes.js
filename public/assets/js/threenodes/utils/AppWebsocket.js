var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "libs/sockjs-latest.min"], function($, _, Backbone) {
  return ThreeNodes.AppWebsocket = (function() {
    function AppWebsocket() {
      this.on_websocket_message = __bind(this.on_websocket_message, this);
      var self, socket, webso;
      webso = false;
      if (window.MozWebSocket) {
        webso = window.MozWebSocket;
      } else {
        webso = WebSocket;
      }
      console.log("init websocket.");
      socket = new webso("ws://localhost:8080/p5websocket");
      self = this;
      socket.onmessage = function(data) {
        return self.on_websocket_message(data);
      };
      socket.onerror = function() {
        return console.log('socket close');
      };
      true;
    }
    AppWebsocket.prototype.on_websocket_message = function(data) {
      var messg;
      messg = data.data;
      return ThreeNodes.flash_sound_value = jQuery.parseJSON(messg);
    };
    return AppWebsocket;
  })();
});