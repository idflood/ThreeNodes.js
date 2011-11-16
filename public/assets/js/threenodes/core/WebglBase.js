var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/Three", "order!libs/three-extras/js/ShaderExtras", "order!libs/three-extras/js/postprocessing/EffectComposer", "order!libs/three-extras/js/postprocessing/MaskPass", "order!libs/three-extras/js/postprocessing/RenderPass", "order!libs/three-extras/js/postprocessing/ShaderPass", "order!libs/three-extras/js/postprocessing/BloomPass", "order!libs/three-extras/js/postprocessing/FilmPass", "order!libs/three-extras/js/postprocessing/DotScreenPass"], function($, _, Backbone) {
  ThreeNodes.Webgl = {};
  return ThreeNodes.WebglBase = (function() {
    function WebglBase() {
      this.rebuild_all_shaders = __bind(this.rebuild_all_shaders, this);      console.log("webgl init...");
      this.current_scene = new THREE.Scene();
      this.current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000);
      this.current_renderer = new THREE.WebGLRenderer({
        clearColor: 0x000000
      });
      this.current_renderer.autoClear = false;
      this.effectScreen = new THREE.ShaderPass(THREE.ShaderExtras["screen"]);
      this.effectScreen.renderToScreen = true;
      this.renderModel = new THREE.RenderPass(this.current_scene, this.current_camera);
      this.composer = new THREE.EffectComposer(this.current_renderer);
      ThreeNodes.Webgl.current_renderer = this.current_renderer;
      ThreeNodes.Webgl.current_scene = this.current_scene;
      ThreeNodes.Webgl.current_camera = this.current_camera;
      ThreeNodes.Webgl.composer = this.composer;
      ThreeNodes.Webgl.renderModel = this.renderModel;
      ThreeNodes.Webgl.effectScreen = this.effectScreen;
      ThreeNodes.rebuild_all_shaders = this.rebuild_all_shaders;
    }
    WebglBase.prototype.rebuild_all_shaders = function() {
      var n, _i, _len, _ref, _results;
      console.log("rebuilding shaders");
      console.log(ThreeNodes.webgl_materials_node);
      _ref = ThreeNodes.webgl_materials_node;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        _results.push(n.ob.program = false);
      }
      return _results;
    };
    return WebglBase;
  })();
});