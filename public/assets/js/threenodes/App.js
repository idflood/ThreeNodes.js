var ThreeNodes;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ThreeNodes = {};
ThreeNodes.nodes = {
  fields: {},
  list: [],
  types: {
    Base: {},
    Math: {},
    Utils: {},
    Conditional: {},
    Geometry: {},
    Three: {},
    Materials: {},
    Lights: {},
    PostProcessing: {}
  }
};
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
define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeGraph', 'order!threenodes/ui/AppUI', 'order!threenodes/utils/AppWebsocket', 'order!threenodes/utils/Injector', 'order!threenodes/utils/CommandMap', 'order!threenodes/commands/ClearWorkspaceCommand', 'order!threenodes/commands/AddConnectionCommand', 'order!threenodes/commands/RemoveConnectionCommand', 'order!threenodes/commands/CreateNodeCommand'], function($, _, Backbone, NodeGraph, AppUI) {
  return ThreeNodes.App = (function() {
    function App() {
      this.init_ui = __bind(this.init_ui, this);      console.log("ThreeNodes app init...");
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
      this.commandMap.register("AddConnectionCommand", ThreeNodes.AddConnectionCommand);
      this.commandMap.register("RemoveConnectionCommand", ThreeNodes.RemoveConnectionCommand);
      this.commandMap.register("CreateNodeCommand", ThreeNodes.CreateNodeCommand);
      this.injector.mapSingleton("NodeGraph", ThreeNodes.NodeGraph);
      this.injector.mapSingleton("AppWebsocket", ThreeNodes.AppWebsocket);
      this.injector.mapSingleton("AppUI", AppUI);
      this.nodegraph = this.injector.get("NodeGraph");
      this.socket = this.injector.get("AppWebsocket");
      if ($("#qunit-tests").length === 0) {
        this.init_ui();
      }
    }
    App.prototype.init_ui = function() {
      this.ui = this.injector.get("AppUI");
      return this.ui.bind("render", this.nodegraph.render);
    };
    App.prototype.clear_workspace = function() {
      return this.context.commandMap.execute("ClearWorkspaceCommand");
    };
    App.prototype.reset_global_variables = function() {
      ThreeNodes.uid = 0;
      this.nodegraph.node_connections = [];
      this.nodegraph.nodes = [];
      ThreeNodes.nodes.fields = {};
      ThreeNodes.nodes.list = [];
      return ThreeNodes.webgl_materials_node = [];
    };
    return App;
  })();
});