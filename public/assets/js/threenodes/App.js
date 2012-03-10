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

ThreeNodes.webgl_materials_node = [];

ThreeNodes.svg = false;

ThreeNodes.flash_sound_value = {
  kick: 0,
  snare: 0,
  hat: 0
};

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/collections/Nodes', 'order!threenodes/views/UI', 'order!threenodes/views/Timeline', 'order!threenodes/utils/AppWebsocket', 'order!threenodes/utils/Injector', 'order!threenodes/utils/CommandMap', 'order!threenodes/utils/FileHandler', 'order!threenodes/utils/UrlHandler', "order!threenodes/utils/WebglBase"], function($, _, Backbone) {
  "use strict";  ThreeNodes.events = _.extend({}, Backbone.Events);
  return ThreeNodes.App = (function() {

    function App(testing_mode) {
      var _this = this;
      this.testing_mode = testing_mode != null ? testing_mode : false;
      this.initTimeline = __bind(this.initTimeline, this);
      console.log("ThreeNodes app init...");
      this.current_scene = false;
      this.current_camera = false;
      this.current_renderer = false;
      this.effectScreen = false;
      this.renderModel = false;
      this.composer = false;
      this.injector = new ThreeNodes.Injector(this);
      this.commandMap = new ThreeNodes.CommandMap(this);
      this.url_handler = new ThreeNodes.UrlHandler();
      this.url_handler.context = this;
      this.injector.mapSingleton("NodeGraph", ThreeNodes.NodeGraph);
      this.injector.mapSingleton("AppWebsocket", ThreeNodes.AppWebsocket);
      this.injector.mapSingleton("UI", ThreeNodes.UI);
      this.injector.mapSingleton("FileHandler", ThreeNodes.FileHandler);
      this.nodegraph = new ThreeNodes.NodeGraph([], {
        is_test: this.testing_mode
      });
      this.nodegraph.context = this;
      this.socket = this.injector.get("AppWebsocket");
      this.webgl = new ThreeNodes.WebglBase();
      this.file_handler = new ThreeNodes.FileHandler();
      this.file_handler.context = this;
      this.player_mode = false;
      this.nodegraph.on("remove", function() {
        return _this.timelineView.selectAnims([]);
      });
      ThreeNodes.events.on("ClearWorkspace", function() {
        return _this.clearWorkspace();
      });
      if (this.testing_mode === false) {
        this.ui = this.injector.get("UI", {
          el: $("body")
        });
        this.ui.on("render", this.nodegraph.render);
        this.initTimeline();
      } else {
        $("body").addClass("test-mode");
        ThreeNodes.events.trigger("InitUrlHandler");
        this.initTimeline();
      }
      Backbone.history.start({
        pushState: false
      });
      return true;
    }

    App.prototype.initTimeline = function() {
      $("#timeline-container, #keyEditDialog").remove();
      if (this.ui && this.timelineView) {
        this.ui.off("render", this.timelineView.update);
        this.ui.off("selectAnims", this.timelineView.selectAnims);
      }
      if (this.timelineView) {
        this.timelineView.off("trackRebuild", this.nodegraph.showNodesAnimation);
        this.timelineView.off("startSound", this.nodegraph.startSound);
        this.timelineView.off("stopSound", this.nodegraph.stopSound);
        this.timelineView.remove();
      }
      this.timelineView = new ThreeNodes.AppTimeline();
      if (this.ui) {
        this.ui.on("render", this.timelineView.update);
        this.ui.on("selectAnims", this.timelineView.selectAnims);
      }
      this.timelineView.on("trackRebuild", this.nodegraph.showNodesAnimation);
      this.timelineView.on("startSound", this.nodegraph.startSound);
      this.timelineView.on("stopSound", this.nodegraph.stopSound);
      return ThreeNodes.events.trigger("OnUIResize");
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
