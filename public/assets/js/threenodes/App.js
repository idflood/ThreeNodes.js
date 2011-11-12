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
ThreeNodes.node_connections = [];
ThreeNodes.flash_sound_value = {
  kick: 0,
  snare: 0,
  hat: 0
};
define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeGraph', 'order!threenodes/ui/AppUI', 'order!threenodes/utils/AppWebsocket'], function($, _, Backbone, NodeGraph, AppUI) {
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
      this.nodegraph = new ThreeNodes.NodeGraph();
      this.socket = new ThreeNodes.AppWebsocket();
      if ($("#qunit-tests").length === 0) {
        this.init_ui();
      }
    }
    App.prototype.init_ui = function() {
      this.ui = new AppUI();
      this.ui.bind("render", this.nodegraph.render);
      return this.ui.sidebar.bind("create_node", this.nodegraph.create_node);
    };
    App.prototype.clear_workspace = function() {
      this.remove_all_connections();
      this.remove_all_nodes();
      return this.reset_global_variables();
    };
    App.prototype.remove_all_nodes = function() {
      var node, _i, _len, _ref;
      $("#tab-attribute").html("");
      _ref = this.nodegraph.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.remove();
      }
      return true;
    };
    App.prototype.remove_all_connections = function() {
      while (ThreeNodes.node_connections.length > 0) {
        ThreeNodes.node_connections[0].remove();
      }
      return true;
    };
    App.prototype.reset_global_variables = function() {
      var uid;
      uid = 0;
      ThreeNodes.node_connections = [];
      this.nodegraph.nodes = [];
      ThreeNodes.nodes.fields = {};
      ThreeNodes.nodes.list = [];
      return ThreeNodes.webgl_materials_node = [];
    };
    return App;
  })();
});