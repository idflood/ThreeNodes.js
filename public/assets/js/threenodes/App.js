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

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/collections/Nodes', 'order!threenodes/collections/GroupDefinitions', 'order!threenodes/views/UI', 'order!threenodes/views/Timeline', 'order!threenodes/views/NodeView', 'order!threenodes/views/GroupDefinitionView', 'order!threenodes/utils/AppWebsocket', 'order!threenodes/utils/FileHandler', 'order!threenodes/utils/UrlHandler', "order!threenodes/utils/WebglBase"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.App = (function() {

    function App(testing_mode) {
      var _this = this;
      if (testing_mode == null) testing_mode = false;
      this.clearWorkspace = __bind(this.clearWorkspace, this);
      this.setDisplayMode = __bind(this.setDisplayMode, this);
      this.initTimeline = __bind(this.initTimeline, this);
      this.initUI = __bind(this.initUI, this);
      ThreeNodes.settings = {
        testing_mode: testing_mode,
        player_mode: false
      };
      this.url_handler = new ThreeNodes.UrlHandler();
      this.group_definitions = new ThreeNodes.GroupDefinitions([]);
      this.nodegraph = new ThreeNodes.NodeGraph([], {
        is_test: testing_mode
      });
      this.nodegraph.bind("add", function(node) {
        var $tmpl, template, tmpl, view;
        template = ThreeNodes.NodeView.template;
        tmpl = _.template(template, node);
        $tmpl = $(tmpl).appendTo("#container");
        return view = new ThreeNodes.NodeView({
          model: node,
          el: $tmpl
        });
      });
      this.group_definitions.bind("definition:created", this.nodegraph.createGroup);
      this.group_definitions.bind("add", function(definition) {
        var $tmpl, template, tmpl, view;
        template = ThreeNodes.GroupDefinitionView.template;
        tmpl = _.template(template, definition);
        $tmpl = $(tmpl).appendTo("#library");
        view = new ThreeNodes.GroupDefinitionView({
          model: definition,
          el: $tmpl
        });
        return view.render();
      });
      if (testing_mode === false) {
        this.nodegraph.connections.bind("add", function(connection) {
          var view;
          return view = new ThreeNodes.ConnectionView({
            model: connection
          });
        });
      }
      this.socket = new ThreeNodes.AppWebsocket();
      this.webgl = new ThreeNodes.WebglBase();
      this.file_handler = new ThreeNodes.FileHandler(this.nodegraph);
      this.file_handler.on("ClearWorkspace", function() {
        return _this.clearWorkspace();
      });
      this.url_handler.on("ClearWorkspace", function() {
        return _this.clearWorkspace();
      });
      this.url_handler.on("LoadJSON", this.file_handler.load_from_json_data);
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
        this.ui.menubar.on("RmoveSelectedNodes", this.nodegraph.removeSelectedNodes);
        this.ui.menubar.on("ClearWorkspace", this.clearWorkspace);
        this.ui.menubar.on("SaveFile", this.file_handler.save_local_file);
        this.ui.menubar.on("ExportCode", this.file_handler.export_code);
        this.ui.menubar.on("LoadJSON", this.file_handler.load_from_json_data);
        this.ui.menubar.on("LoadFile", this.file_handler.load_local_file);
        this.ui.menubar.on("ExportImage", this.webgl.exportImage);
        this.ui.menubar.on("GroupSelectedNodes", this.group_definitions.groupSelectedNodes);
        this.ui.on("CreateNode", this.nodegraph.create_node);
        this.nodegraph.on("nodeslist:rebuild", this.ui.onNodeListRebuild);
        this.url_handler.on("SetDisplayModeCommand", this.ui.setDisplayMode);
      } else {
        $("body").addClass("test-mode");
      }
      return this;
    };

    App.prototype.initTimeline = function() {
      $("#timeline-container, #keyEditDialog").remove();
      if (this.timelineView) {
        this.nodegraph.off("remove", this.timelineView.onNodeRemove);
        this.timelineView.remove();
        if (this.ui) {
          this.timelineView.off("TimelineCreated", this.ui.on_ui_window_resize);
        }
      }
      this.timelineView = new ThreeNodes.AppTimeline({
        el: $("#timeline"),
        ui: this.ui
      });
      this.nodegraph.bindTimelineEvents(this.timelineView);
      this.nodegraph.on("remove", this.timelineView.onNodeRemove);
      if (this.ui) this.ui.on_ui_window_resize();
      return this;
    };

    App.prototype.setDisplayMode = function(is_player) {
      if (is_player == null) is_player = false;
      if (this.ui) return this.ui.setDisplayMode(is_player);
    };

    App.prototype.clearWorkspace = function() {
      this.nodegraph.clearWorkspace();
      this.reset_global_variables();
      if (this.ui) this.ui.clearWorkspace();
      return this.initTimeline();
    };

    App.prototype.reset_global_variables = function() {
      ThreeNodes.uid = 0;
      return ThreeNodes.selected_nodes = $([]);
    };

    return App;

  })();
});
