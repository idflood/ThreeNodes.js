var ThreeNodes;
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
define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeGraph', 'order!threenodes/ui/AppUI', 'order!threenodes/ui/AppTimeline', 'order!threenodes/utils/AppWebsocket', 'order!threenodes/utils/Injector', 'order!threenodes/utils/CommandMap', 'order!threenodes/utils/FileHandler', 'order!threenodes/commands/ClearWorkspaceCommand', 'order!threenodes/commands/RemoveConnectionCommand', 'order!threenodes/commands/CreateNodeCommand', 'order!threenodes/commands/SaveFileCommand', 'order!threenodes/commands/LoadLocalFileCommand', 'order!threenodes/commands/RebuildShadersCommand', 'order!threenodes/commands/RemoveSelectedNodesCommand', 'order!threenodes/commands/SetDisplayModeCommand', 'order!threenodes/commands/InitUrlHandler', 'order!threenodes/commands/ExportCodeCommand', 'order!threenodes/commands/ExportImageCommand', 'order!threenodes/commands/OnUiResizeCommand', "order!libs/jquery.ba-bbq.min"], function($, _, Backbone, NodeGraph, AppUI) {
  "use strict";  return ThreeNodes.App = (function() {
    function App(testing_mode) {
      this.testing_mode = testing_mode != null ? testing_mode : false;
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
      this.commandMap.register("ClearWorkspaceCommand", ThreeNodes.ClearWorkspaceCommand);
      this.commandMap.register("RemoveConnectionCommand", ThreeNodes.RemoveConnectionCommand);
      this.commandMap.register("CreateNodeCommand", ThreeNodes.CreateNodeCommand);
      this.commandMap.register("SaveFileCommand", ThreeNodes.SaveFileCommand);
      this.commandMap.register("LoadLocalFileCommand", ThreeNodes.LoadLocalFileCommand);
      this.commandMap.register("RebuildShadersCommand", ThreeNodes.RebuildShadersCommand);
      this.commandMap.register("RemoveSelectedNodesCommand", ThreeNodes.RemoveSelectedNodesCommand);
      this.commandMap.register("InitUrlHandler", ThreeNodes.InitUrlHandler);
      this.commandMap.register("SetDisplayModeCommand", ThreeNodes.SetDisplayModeCommand);
      this.commandMap.register("ExportCodeCommand", ThreeNodes.ExportCodeCommand);
      this.commandMap.register("ExportImageCommand", ThreeNodes.ExportImageCommand);
      this.commandMap.register("OnUiResizeCommand", ThreeNodes.OnUiResizeCommand);
      this.injector.mapSingleton("NodeGraph", ThreeNodes.NodeGraph);
      this.injector.mapSingleton("AppWebsocket", ThreeNodes.AppWebsocket);
      this.injector.mapSingleton("AppTimeline", ThreeNodes.AppTimeline);
      this.injector.mapSingleton("AppUI", AppUI);
      this.injector.mapSingleton("FileHandler", ThreeNodes.FileHandler);
      this.injector.mapSingleton("ThreeNodes.WebglBase", ThreeNodes.WebglBase);
      this.nodegraph = this.injector.get("NodeGraph");
      this.socket = this.injector.get("AppWebsocket");
      this.webgl = this.injector.get("ThreeNodes.WebglBase");
      this.player_mode = false;
      if (this.testing_mode === false) {
        this.ui = this.injector.get("AppUI");
        this.ui.bind("render", this.nodegraph.render);
      } else {
        $("body").addClass("test-mode");
        this.timeline = this.injector.get("AppTimeline");
        this.commandMap.execute("InitUrlHandler");
      }
      return true;
    }
    App.prototype.clear_workspace = function() {
      return this.context.commandMap.execute("ClearWorkspaceCommand");
    };
    App.prototype.reset_global_variables = function() {
      ThreeNodes.uid = 0;
      this.nodegraph.node_connections = [];
      return ThreeNodes.webgl_materials_node = [];
    };
    return App;
  })();
});