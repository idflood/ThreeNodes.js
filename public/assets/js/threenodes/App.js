var ThreeNodes,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ThreeNodes = {};

ThreeNodes.websocket_enabled = false;

ThreeNodes.nodes = {};

ThreeNodes.sound_nodes = [];

ThreeNodes.mouseX = 0;

ThreeNodes.mouseY = 0;

ThreeNodes.is_playing = true;

ThreeNodes.fields = {
  types: {}
};

ThreeNodes.webgl_materials_node = [];

ThreeNodes.svg = false;

ThreeNodes.flash_sound_value = {
  kick: 0,
  snare: 0,
  hat: 0
};

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/collections/NodeGraph', 'order!threenodes/views/AppUI', 'order!threenodes/views/AppTimeline', 'order!threenodes/utils/AppWebsocket', 'order!threenodes/utils/Injector', 'order!threenodes/utils/CommandMap', 'order!threenodes/utils/FileHandler', 'order!threenodes/utils/UrlHandler', "order!libs/jquery.ba-bbq.min"], function($, _, Backbone, NodeGraph, AppUI) {
  "use strict";  ThreeNodes.events = _.extend({}, Backbone.Events);
  return ThreeNodes.App = (function() {

    function App(testing_mode) {
      this.testing_mode = testing_mode != null ? testing_mode : false;
      this.initTimeline = __bind(this.initTimeline, this);
      console.log("ThreeNodes app init...");
      this.current_scene = false;
      this.current_camera = false;
      this.current_renderer = false;
      this.effectScreen = false;
      this.renderModel = false;
      this.composer = false;
      ThreeNodes.webgl_materials_node = [];
      this.injector = new ThreeNodes.Injector(this);
      this.commandMap = new ThreeNodes.CommandMap(this);
      this.url_handler = new ThreeNodes.UrlHandler();
      this.url_handler.context = this;
      this.injector.mapSingleton("NodeGraph", ThreeNodes.NodeGraph);
      this.injector.mapSingleton("AppWebsocket", ThreeNodes.AppWebsocket);
      this.injector.mapSingleton("AppUI", AppUI);
      this.injector.mapSingleton("FileHandler", ThreeNodes.FileHandler);
      this.nodegraph = this.injector.get("NodeGraph");
      this.nodegraph.on("resetTimeline", this.initTimeline);
      this.socket = this.injector.get("AppWebsocket");
      this.webgl = new ThreeNodes.WebglBase();
      this.player_mode = false;
      if (this.testing_mode === false) {
        this.ui = this.injector.get("AppUI", {
          el: $("body")
        });
        this.ui.on("render", this.nodegraph.render);
        this.initTimeline();
      } else {
        $("body").addClass("test-mode");
        ThreeNodes.events.trigger("InitUrlHandler");
        this.initTimeline();
      }
      return true;
    }

    App.prototype.initTimeline = function() {
      $("#timeline-container, #keyEditDialog").remove();
      if (this.ui && this.timelineView) {
        this.ui.off("render", this.timelineView.update);
      }
      if (this.timelineView) {
        this.timelineView.off("trackRebuild", this.nodegraph.showNodesAnimation);
        this.timelineView.off("startSound", this.nodegraph.startSound);
        this.timelineView.off("stopSound", this.nodegraph.stopSound);
      }
      this.timelineView = new ThreeNodes.AppTimeline();
      if (this.ui) this.ui.on("render", this.timelineView.update);
      this.timelineView.on("trackRebuild", this.nodegraph.showNodesAnimation);
      this.timelineView.on("startSound", this.nodegraph.startSound);
      this.timelineView.on("stopSound", this.nodegraph.stopSound);
      return ThreeNodes.events.trigger("OnUIResize");
    };

    App.prototype.clear_workspace = function() {
      return ThreeNodes.events.trigger("ClearWorkspace");
    };

    App.prototype.reset_global_variables = function() {
      ThreeNodes.uid = 0;
      this.nodegraph.node_connections = [];
      return ThreeNodes.webgl_materials_node = [];
    };

    return App;

  })();
});
