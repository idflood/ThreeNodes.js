var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";
  var Object3DwithMeshAndMaterial;
  ThreeNodes.nodes.Object3D = (function(_super) {

    __extends(Object3D, _super);

    function Object3D() {
      this.compute = __bind(this.compute, this);
      this.apply_children = __bind(this.apply_children, this);
      this.get_children_array = __bind(this.get_children_array, this);
      this.set_fields = __bind(this.set_fields, this);
      Object3D.__super__.constructor.apply(this, arguments);
    }

    Object3D.node_name = 'Object3D';

    Object3D.group_name = 'Three';

    Object3D.prototype.set_fields = function() {
      this.auto_evaluate = true;
      this.ob = new THREE.Object3D();
      this.rack.addFields({
        inputs: {
          "children": {
            type: "Object3D",
            val: [],
            "default": []
          },
          "position": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "rotation": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "scale": {
            type: "Vector3",
            val: new THREE.Vector3(1, 1, 1)
          },
          "doubleSided": false,
          "visible": true,
          "castShadow": false,
          "receiveShadow": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.vars_shadow_options = ["castShadow", "receiveShadow"];
      return this.shadow_cache = this.create_cache_object(this.vars_shadow_options);
    };

    Object3D.prototype.get_children_array = function() {
      var childs;
      childs = this.rack.getField("children").get("value");
      if (childs && $.type(childs) !== "array") return [childs];
      return childs;
    };

    Object3D.prototype.apply_children = function() {
      var child, childs_in, ind, _i, _j, _len, _len2, _ref, _results;
      if (this.rack.getField("children").connections.length === 0 && this.ob.children.length !== 0) {
        while (this.ob.children.length > 0) {
          this.ob.remove(this.ob.children[0]);
        }
        return true;
      }
      childs_in = this.get_children_array();
      _ref = this.ob.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        ind = childs_in.indexOf(child);
        if (child && ind === -1) this.ob.remove(child);
      }
      _results = [];
      for (_j = 0, _len2 = childs_in.length; _j < _len2; _j++) {
        child = childs_in[_j];
        ind = this.ob.children.indexOf(child);
        if (child instanceof THREE.Light === true) {
          if (ind === -1) {
            this.ob.add(child);
            _results.push(ThreeNodes.rebuild_all_shaders());
          } else {
            _results.push(void 0);
          }
        } else {
          if (ind === -1) {
            _results.push(this.ob.add(child));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };

    Object3D.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children']);
      this.apply_children();
      return this.rack.setField("out", this.ob);
    };

    return Object3D;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Scene = (function(_super) {

    __extends(Scene, _super);

    function Scene() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Scene.__super__.constructor.apply(this, arguments);
    }

    Scene.node_name = 'Scene';

    Scene.group_name = 'Three';

    Scene.prototype.set_fields = function() {
      var current_scene;
      Scene.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.Scene();
      this.v_fog = this.rack.addField("fog", {
        type: 'Any',
        val: null
      });
      return current_scene = this.ob;
    };

    Scene.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children', 'lights']);
      this.apply_children();
      return this.rack.setField("out", this.ob);
    };

    return Scene;

  })(ThreeNodes.nodes.Object3D);
  Object3DwithMeshAndMaterial = (function(_super) {

    __extends(Object3DwithMeshAndMaterial, _super);

    function Object3DwithMeshAndMaterial() {
      this.get_material_cache = __bind(this.get_material_cache, this);
      this.get_geometry_cache = __bind(this.get_geometry_cache, this);
      this.rebuild_geometry = __bind(this.rebuild_geometry, this);
      this.set_fields = __bind(this.set_fields, this);
      Object3DwithMeshAndMaterial.__super__.constructor.apply(this, arguments);
    }

    Object3DwithMeshAndMaterial.prototype.set_fields = function() {
      Object3DwithMeshAndMaterial.__super__.set_fields.apply(this, arguments);
      this.material_cache = false;
      return this.geometry_cache = false;
    };

    Object3DwithMeshAndMaterial.prototype.rebuild_geometry = function() {
      var field, geom;
      field = this.rack.getField('geometry');
      if (field.connections.length > 0) {
        geom = field.connections[0].from_field.node;
        geom.cached = [];
        return geom.compute();
      } else {
        return this.rack.getField('geometry').setValue(new THREE.CubeGeometry(200, 200, 200));
      }
    };

    Object3DwithMeshAndMaterial.prototype.get_geometry_cache = function() {
      var f, res, _i, _len, _ref;
      res = "";
      if (jQuery.type(this.rack.getField('geometry').get("value")) === "array") {
        _ref = this.rack.getField('geometry').get("value");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          res += f.id;
        }
      } else {
        res = this.rack.getField('geometry').get("value").id;
      }
      return res;
    };

    Object3DwithMeshAndMaterial.prototype.get_material_cache = function() {
      var f, res, _i, _len, _ref;
      res = "";
      if (jQuery.type(this.rack.getField('material').get("value")) === "array") {
        _ref = this.rack.getField('material').get("value");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          res += f.id;
        }
      } else {
        res = this.rack.getField('material').get("value").id;
      }
      return res;
    };

    return Object3DwithMeshAndMaterial;

  })(ThreeNodes.nodes.Object3D);
  ThreeNodes.nodes.ThreeMesh = (function(_super) {

    __extends(ThreeMesh, _super);

    function ThreeMesh() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      ThreeMesh.__super__.constructor.apply(this, arguments);
    }

    ThreeMesh.node_name = 'Mesh';

    ThreeMesh.group_name = 'Three';

    ThreeMesh.prototype.set_fields = function() {
      ThreeMesh.__super__.set_fields.apply(this, arguments);
      this.rack.addFields({
        inputs: {
          "geometry": {
            type: "Geometry",
            val: new THREE.CubeGeometry(200, 200, 200)
          },
          "material": {
            type: "Material",
            val: new THREE.MeshBasicMaterial({
              color: 0xff0000
            })
          },
          "overdraw": false
        }
      });
      this.ob = [new THREE.Mesh(this.rack.getField('geometry').getValue(), this.rack.getField('material').getValue())];
      this.last_slice_count = 1;
      return this.compute();
    };

    ThreeMesh.prototype.compute = function() {
      var i, item, needs_rebuild, new_geometry_cache, new_material_cache, numItems;
      needs_rebuild = false;
      numItems = this.rack.getMaxInputSliceCount();
      new_material_cache = this.get_material_cache();
      new_geometry_cache = this.get_geometry_cache();
      if (this.last_slice_count !== numItems) {
        needs_rebuild = true;
        this.last_slice_count = numItems;
      }
      if (this.input_value_has_changed(this.vars_shadow_options, this.shadow_cache)) {
        needs_rebuild = true;
      }
      if (this.material_cache !== new_material_cache) this.rebuild_geometry();
      if (this.geometry_cache !== new_geometry_cache || this.material_cache !== new_material_cache || needs_rebuild) {
        this.ob = [];
        for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
          item = new THREE.Mesh(this.rack.getField('geometry').getValue(i), this.rack.getField('material').getValue(i));
          this.ob[i] = item;
        }
      }
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob[i], ['children', 'geometry', 'material'], i);
      }
      if (needs_rebuild === true) ThreeNodes.rebuild_all_shaders();
      this.shadow_cache = this.create_cache_object(this.vars_shadow_options);
      this.geometry_cache = this.get_geometry_cache();
      this.material_cache = this.get_material_cache();
      return this.rack.setField("out", this.ob);
    };

    return ThreeMesh;

  })(Object3DwithMeshAndMaterial);
  ThreeNodes.nodes.ThreeLine = (function(_super) {

    __extends(ThreeLine, _super);

    function ThreeLine() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      ThreeLine.__super__.constructor.apply(this, arguments);
    }

    ThreeLine.node_name = 'Line';

    ThreeLine.group_name = 'Three';

    ThreeLine.prototype.set_fields = function() {
      ThreeLine.__super__.set_fields.apply(this, arguments);
      this.rack.addFields({
        inputs: {
          "geometry": {
            type: "Geometry",
            val: new THREE.CubeGeometry(200, 200, 200)
          },
          "material": {
            type: "Material",
            val: new THREE.LineBasicMaterial({
              color: 0xffffff
            })
          },
          "type": {
            type: "Float",
            val: THREE.LineStrip,
            values: {
              "LineStrip": THREE.LineStrip,
              "LinePieces": THREE.LinePieces
            }
          }
        }
      });
      this.ob = [new THREE.Line(this.rack.getField('geometry').getValue(), this.rack.getField('material').getValue())];
      this.last_slice_count = 1;
      return this.compute();
    };

    ThreeLine.prototype.compute = function() {
      var i, item, needs_rebuild, new_geometry_cache, new_material_cache, numItems;
      needs_rebuild = false;
      numItems = this.rack.getMaxInputSliceCount();
      new_material_cache = this.get_material_cache();
      new_geometry_cache = this.get_geometry_cache();
      if (this.last_slice_count !== numItems) {
        needs_rebuild = true;
        this.last_slice_count = numItems;
      }
      if (this.input_value_has_changed(this.vars_shadow_options, this.shadow_cache)) {
        needs_rebuild = true;
      }
      if (this.material_cache !== new_material_cache) this.rebuild_geometry();
      if (this.geometry_cache !== new_geometry_cache || this.material_cache !== new_material_cache || needs_rebuild) {
        this.ob = [];
        for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
          item = new THREE.Line(this.rack.getField('geometry').getValue(i), this.rack.getField('material').getValue(i));
          this.ob[i] = item;
        }
      }
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob[i], ['children', 'geometry', 'material'], i);
      }
      if (needs_rebuild === true) ThreeNodes.rebuild_all_shaders();
      this.shadow_cache = this.create_cache_object(this.vars_shadow_options);
      this.geometry_cache = this.get_geometry_cache();
      this.material_cache = this.get_material_cache();
      return this.rack.setField("out", this.ob);
    };

    return ThreeLine;

  })(Object3DwithMeshAndMaterial);
  ThreeNodes.nodes.Camera = (function(_super) {

    __extends(Camera, _super);

    function Camera() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Camera.__super__.constructor.apply(this, arguments);
    }

    Camera.node_name = 'Camera';

    Camera.group_name = 'Three';

    Camera.prototype.set_fields = function() {
      Camera.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000);
      return this.rack.addFields({
        inputs: {
          "fov": 50,
          "aspect": 1,
          "near": 0.1,
          "far": 2000,
          "position": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "target": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "useTarget": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    Camera.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['target']);
      this.ob.lookAt(this.rack.getField("target").getValue());
      return this.rack.setField("out", this.ob);
    };

    return Camera;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Texture = (function(_super) {

    __extends(Texture, _super);

    function Texture() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Texture.__super__.constructor.apply(this, arguments);
    }

    Texture.node_name = 'Texture';

    Texture.group_name = 'Three';

    Texture.prototype.set_fields = function() {
      Texture.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      this.cached = false;
      return this.rack.addFields({
        inputs: {
          "image": {
            type: "String",
            val: false
          }
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    Texture.prototype.compute = function() {
      var current;
      current = this.rack.getField("image").getValue();
      if (current && current !== "") {
        if (this.cached === false ||  ($.type(this.cached) === "object" && this.cached.constructor === THREE.Texture && this.cached.image.attributes[0].nodeValue !== current)) {
          this.ob = new THREE.ImageUtils.loadTexture(current);
          console.log("new texture");
          console.log(this.ob);
          this.cached = this.ob;
        }
      }
      return this.rack.setField("out", this.ob);
    };

    return Texture;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Fog = (function(_super) {

    __extends(Fog, _super);

    function Fog() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Fog.__super__.constructor.apply(this, arguments);
    }

    Fog.node_name = 'Fog';

    Fog.group_name = 'Three';

    Fog.prototype.set_fields = function() {
      Fog.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      return this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xffffff)
          },
          "near": 1,
          "far": 1000
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    Fog.prototype.compute = function() {
      if (this.ob === false) this.ob = new THREE.Fog(0xffffff, 1, 1000);
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return Fog;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.FogExp2 = (function(_super) {

    __extends(FogExp2, _super);

    function FogExp2() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      FogExp2.__super__.constructor.apply(this, arguments);
    }

    FogExp2.node_name = 'FogExp2';

    FogExp2.group_name = 'Three';

    FogExp2.prototype.set_fields = function() {
      FogExp2.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      return this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xffffff)
          },
          "density": 0.00025
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    FogExp2.prototype.compute = function() {
      if (this.ob === false) this.ob = new THREE.FogExp2(0xffffff, 0.00025);
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return FogExp2;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.WebGLRenderer = (function(_super) {

    __extends(WebGLRenderer, _super);

    function WebGLRenderer() {
      this.remove = __bind(this.remove, this);
      this.compute = __bind(this.compute, this);
      this.add_renderer_to_dom = __bind(this.add_renderer_to_dom, this);
      this.apply_post_fx = __bind(this.apply_post_fx, this);
      this.apply_size = __bind(this.apply_size, this);
      this.add_mouse_handler = __bind(this.add_mouse_handler, this);
      this.set_fields = __bind(this.set_fields, this);
      WebGLRenderer.__super__.constructor.apply(this, arguments);
    }

    WebGLRenderer.node_name = 'WebGLRenderer';

    WebGLRenderer.group_name = 'Three';

    WebGLRenderer.prototype.set_fields = function() {
      var self,
        _this = this;
      WebGLRenderer.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.preview_mode = true;
      this.creating_popup = false;
      this.ob = ThreeNodes.Webgl.current_renderer;
      this.width = 0;
      this.height = 0;
      $("body").append("<div id='webgl-window'></div>");
      this.webgl_container = $("#webgl-window");
      this.rack.addFields({
        inputs: {
          "width": 800,
          "height": 600,
          "scene": {
            type: "Scene",
            val: new THREE.Scene()
          },
          "camera": {
            type: "Camera",
            val: new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
          },
          "bg_color": {
            type: "Color",
            val: new THREE.Color(0, 0, 0)
          },
          "postfx": {
            type: "Array",
            val: []
          },
          "shadowCameraNear": 3,
          "shadowCameraFar": 3000,
          "shadowMapWidth": 512,
          "shadowMapHeight": 512,
          "shadowMapEnabled": false,
          "shadowMapSoft": true
        }
      });
      this.rack.getField("camera").attributes.value.position.z = 1000;
      this.win = false;
      this.apply_size();
      this.old_bg = false;
      this.apply_bg_color();
      self = this;
      this.add_mouse_handler();
      this.webgl_container.click(function(e) {
        if (_this.context.player_mode === false) return _this.create_popup_view();
      });
      return this;
    };

    WebGLRenderer.prototype.add_mouse_handler = function() {
      $(this.ob.domElement).unbind("mousemove");
      $(this.ob.domElement).bind("mousemove", function(e) {
        ThreeNodes.mouseX = e.layerX;
        return ThreeNodes.mouseY = e.layerY;
      });
      return this;
    };

    WebGLRenderer.prototype.create_popup_view = function() {
      this.preview_mode = false;
      this.creating_popup = true;
      this.win = window.open('', 'win' + this.nid, "width=800,height=600,scrollbars=false,location=false,status=false,menubar=false");
      $("body", $(this.win.document)).append(this.ob.domElement);
      $("*", $(this.win.document)).css({
        padding: 0,
        margin: 0
      });
      this.apply_bg_color(true);
      this.apply_size(true);
      this.add_mouse_handler();
      return this;
    };

    WebGLRenderer.prototype.create_preview_view = function() {
      this.preview_mode = true;
      this.webgl_container.append(this.ob.domElement);
      this.apply_bg_color(true);
      this.apply_size(true);
      this.add_mouse_handler();
      return this;
    };

    WebGLRenderer.prototype.apply_bg_color = function(force_refresh) {
      var new_val;
      if (force_refresh == null) force_refresh = false;
      new_val = this.rack.getField('bg_color').getValue().getContextStyle();
      if (this.old_bg === new_val && force_refresh === false) return false;
      this.ob.setClearColor(this.rack.getField('bg_color').getValue(), 1);
      this.webgl_container.css({
        background: new_val
      });
      if (this.win) {
        $(this.win.document.body).css({
          background: new_val
        });
      }
      return this.old_bg = new_val;
    };

    WebGLRenderer.prototype.apply_size = function(force_refresh) {
      var dh, dw, h, maxw, r, w;
      if (force_refresh == null) force_refresh = false;
      w = this.rack.getField('width').getValue();
      h = this.rack.getField('height').getValue();
      dw = w;
      dh = h;
      if (this.win === false && this.context.player_mode === false) {
        maxw = 220;
        r = w / h;
        dw = maxw;
        dh = dw / r;
      }
      if (dw !== this.width || dh !== this.height ||  force_refresh) {
        this.ob.setSize(dw, dh);
        if (this.win && this.win !== false) this.win.resizeTo(dw, dh + 52);
      }
      this.width = dw;
      return this.height = dh;
    };

    WebGLRenderer.prototype.apply_post_fx = function() {
      var fxs;
      fxs = this.rack.getField("postfx").getValue().slice(0);
      fxs.unshift(ThreeNodes.Webgl.renderModel);
      fxs.push(ThreeNodes.Webgl.effectScreen);
      return ThreeNodes.Webgl.composer.passes = fxs;
    };

    WebGLRenderer.prototype.add_renderer_to_dom = function() {
      if (this.preview_mode && $("canvas", this.webgl_container).length === 0) {
        this.create_preview_view();
      }
      if (this.preview_mode === false && this.win === false) {
        return this.create_popup_view();
      }
    };

    WebGLRenderer.prototype.compute = function() {
      if (this.creating_popup === true && !this.win) return;
      this.creating_popup = false;
      if (this.win !== false) {
        if (this.win.closed && this.preview_mode === false) {
          this.preview_mode = true;
          this.win = false;
        }
      }
      if (!this.context.testing_mode) this.add_renderer_to_dom();
      this.apply_size();
      this.apply_bg_color();
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['width', 'height', 'scene', 'camera', 'bg_color', 'postfx']);
      ThreeNodes.Webgl.current_camera = this.rack.getField("camera").getValue();
      ThreeNodes.Webgl.current_scene = this.rack.getField("scene").getValue();
      this.rack.getField("camera").getValue().aspect = this.width / this.height;
      this.rack.getField("camera").getValue().updateProjectionMatrix();
      this.apply_post_fx();
      this.ob.clear();
      ThreeNodes.Webgl.renderModel.scene = ThreeNodes.Webgl.current_scene;
      ThreeNodes.Webgl.renderModel.camera = ThreeNodes.Webgl.current_camera;
      ThreeNodes.Webgl.composer.renderer = ThreeNodes.Webgl.current_renderer;
      return ThreeNodes.Webgl.composer.render(0.05);
    };

    WebGLRenderer.prototype.remove = function() {
      if (this.win && this.win !== false) this.win.close();
      return WebGLRenderer.__super__.remove.apply(this, arguments);
    };

    return WebGLRenderer;

  })(ThreeNodes.NodeBase);
});
