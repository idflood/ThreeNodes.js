var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jQuery', 'Underscore', 'Backbone', "order!libs/Three", "order!libs/three-extras/js/ShaderExtras", "order!libs/three-extras/js/postprocessing/EffectComposer", "order!libs/three-extras/js/postprocessing/MaskPass", "order!libs/three-extras/js/postprocessing/RenderPass", "order!libs/three-extras/js/postprocessing/ShaderPass", "order!libs/three-extras/js/postprocessing/BloomPass", "order!libs/three-extras/js/postprocessing/FilmPass", "order!libs/three-extras/js/postprocessing/DotScreenPass", "order!libs/BlobBuilder.min", "order!libs/FileSaver.min", "order!libs/canvas-toBlob.min"], function($, _, Backbone) {
  "use strict";  ThreeNodes.Webgl = {};
  return ThreeNodes.WebglBase = (function() {

    function WebglBase() {
      this.rebuild_all_shaders = __bind(this.rebuild_all_shaders, this);
      this.exportImage = __bind(this.exportImage, this);      console.log("webgl init...");
      this.current_scene = new THREE.Scene();
      this.current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000);
      this.current_renderer = new THREE.WebGLRenderer({
        clearColor: 0x000000,
        preserveDrawingBuffer: true
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
      ThreeNodes.events.on("ExportImage", this.exportImage);
      ThreeNodes.events.on("RebuildAllShaders", this.rebuild_all_shaders);
      ThreeNodes.rebuild_all_shaders = this.rebuild_all_shaders;
    }

    WebglBase.prototype.exportImage = function(fname) {
      var canvas, on_write;
      canvas = this.current_renderer.domElement;
      on_write = function(blob) {
        return saveAs(blob, fname);
      };
      return canvas.toBlob(on_write, "image/png");
    };

    WebglBase.prototype.rebuild_all_shaders = function() {
      var n, sub_material, _i, _j, _len, _len2, _ref, _ref2;
      console.log("rebuilding shaders");
      _ref = ThreeNodes.webgl_materials_node;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if ($.type(n.ob) === "array") {
          _ref2 = n.ob;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            sub_material = _ref2[_j];
            console.log(sub_material);
            sub_material.program = false;
          }
        } else {
          n.ob.program = false;
        }
      }
      return true;
    };

    return WebglBase;

  })();
});
