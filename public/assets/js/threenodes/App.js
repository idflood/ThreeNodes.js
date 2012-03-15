var ThreeNodes,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ThreeNodes = {};

ThreeNodes.websocket_enabled = false;

ThreeNodes.nodes = {};

ThreeNodes.mouseX = 0;

ThreeNodes.mouseY = 0;

ThreeNodes.fields = {
  types: {}
};

ThreeNodes.svg = false;

ThreeNodes.flash_sound_value = {
  kick: 0,
  snare: 0,
  hat: 0
};

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/collections/Nodes', 'order!threenodes/views/UI', 'order!threenodes/views/Timeline', 'order!threenodes/utils/AppWebsocket', 'order!threenodes/utils/FileHandler', 'order!threenodes/utils/UrlHandler', "order!threenodes/utils/WebglBase"], function($, _, Backbone) {
  "use strict";  ThreeNodes.events = _.extend({}, Backbone.Events);
  return ThreeNodes.App = (function() {

    function App(testing_mode) {
      var _this = this;
      if (testing_mode == null) testing_mode = false;
      this.initTimeline = __bind(this.initTimeline, this);
      this.initUI = __bind(this.initUI, this);
      ThreeNodes.settings = {
        testing_mode: testing_mode,
        player_mode: false
      };
      this.url_handler = new ThreeNodes.UrlHandler();
      this.nodegraph = new ThreeNodes.NodeGraph([], {
        is_test: testing_mode
      });
      this.socket = new ThreeNodes.AppWebsocket();
      this.webgl = new ThreeNodes.WebglBase();
      this.file_handler = new ThreeNodes.FileHandler(this.nodegraph);
      ThreeNodes.events.on("ClearWorkspace", function() {
        return _this.clearWorkspace();
      });
      this.initUI(testing_mode);
      this.initTimeline();
      Backbone.history.start({
        pushState: false
      });
      return true;
    }

    App.prototype.initUI = function(testing_mode) {
      if (testing_mode === false) {
        this.ui = new ThreeNodes.UI({
          el: $("body")
        });
        this.ui.on("render", this.nodegraph.render);
        this.ui.on("renderConnections", this.nodegraph.renderAllConnections);
      } else {
        $("body").addClass("test-mode");
      }
      return this;
    };

    App.prototype.initTimeline = function() {
      $("#timeline-container, #keyEditDialog").remove();
      if (this.timelineView) this.timelineView.remove();
      this.timelineView = new ThreeNodes.AppTimeline({
        el: $("#timeline"),
        ui: this.ui
      });
      return this;
    };

    App.prototype.clearWorkspace = function() {
      this.reset_global_variables();
      return this.initTimeline();
    };

    App.prototype.reset_global_variables = function() {
      ThreeNodes.uid = 0;
      this.nodegraph.node_connections = [];
      return ThreeNodes.selected_nodes = $([]);
    };

    return App;

  })();
});
