var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.NodeMaterialBase = (function() {
    __extends(NodeMaterialBase, ThreeNodes.NodeBase);
    function NodeMaterialBase() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      NodeMaterialBase.__super__.constructor.apply(this, arguments);
    }
    NodeMaterialBase.prototype.set_fields = function() {
      NodeMaterialBase.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      this.auto_evaluate = true;
      this.material_class = false;
      this.last_slice_count = -1;
      ThreeNodes.webgl_materials_node[ThreeNodes.webgl_materials_node.length] = this;
      return this.rack.addFields({
        inputs: {
          "opacity": 1,
          "transparent": false,
          "depthTest": true,
          "alphaTest": 0,
          "polygonOffset": false,
          "polygonOffsetFactor": 0,
          "polygonOffsetUnits": 0,
          "blending": {
            type: "Float",
            val: THREE.NormalBlending,
            values: {
              "Normal": THREE.NormalBlending,
              "Additive": THREE.AdditiveBlending,
              "Subtractive": THREE.SubtractiveBlending,
              "Multiply": THREE.MultiplyBlending,
              "AdditiveAlpha": THREE.AdditiveAlphaBlending
            }
          }
        }
      });
    };
    NodeMaterialBase.prototype.compute = function() {
      var i, needs_rebuild, numItems;
      needs_rebuild = false;
      numItems = this.rack.getMaxInputSliceCount();
      if (this.input_value_has_changed(this.vars_rebuild_shader_on_change) || this.last_slice_count !== numItems) {
        needs_rebuild = true;
      }
      if (needs_rebuild === true) {
        this.ob = [];
        for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
          this.ob[i] = new this.material_class();
        }
      }
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob[i], [], i);
      }
      this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
      this.last_slice_count = numItems;
      return this.rack.set("out", this.ob);
    };
    return NodeMaterialBase;
  })();
  ThreeNodes.nodes.types.Materials.MeshBasicMaterial = (function() {
    __extends(MeshBasicMaterial, ThreeNodes.NodeMaterialBase);
    function MeshBasicMaterial() {
      this.set_fields = __bind(this.set_fields, this);
      MeshBasicMaterial.__super__.constructor.apply(this, arguments);
    }
    MeshBasicMaterial.prototype.set_fields = function() {
      MeshBasicMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = [];
      this.material_class = THREE.MeshBasicMaterial;
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xff0000)
          },
          "map": {
            type: "Any",
            val: false
          },
          "reflectivity": 1,
          "refractionRatio": 0.98,
          "wireframe": false,
          "wireframeLinecap": 1,
          "vertexColors": false,
          "skinning": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"];
      return this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
    };
    return MeshBasicMaterial;
  })();
  ThreeNodes.nodes.types.Materials.LineBasicMaterial = (function() {
    __extends(LineBasicMaterial, ThreeNodes.NodeMaterialBase);
    function LineBasicMaterial() {
      this.set_fields = __bind(this.set_fields, this);
      LineBasicMaterial.__super__.constructor.apply(this, arguments);
    }
    LineBasicMaterial.prototype.set_fields = function() {
      LineBasicMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = [];
      this.material_class = THREE.LineBasicMaterial;
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xff0000)
          },
          "linewidth": 1
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.vars_rebuild_shader_on_change = ["transparent", "depthTest"];
      return this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
    };
    return LineBasicMaterial;
  })();
  ThreeNodes.nodes.types.Materials.MeshLambertMaterial = (function() {
    __extends(MeshLambertMaterial, ThreeNodes.NodeMaterialBase);
    function MeshLambertMaterial() {
      this.set_fields = __bind(this.set_fields, this);
      MeshLambertMaterial.__super__.constructor.apply(this, arguments);
    }
    MeshLambertMaterial.prototype.set_fields = function() {
      MeshLambertMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = [];
      this.material_class = THREE.MeshLambertMaterial;
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xff0000)
          },
          "reflectivity": 1,
          "refractionRatio": 0.98,
          "wireframe": false,
          "vertexColors": {
            type: "Any",
            val: false
          },
          "skinning": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.vars_rebuild_shader_on_change = ["transparent", "depthTest"];
      return this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
    };
    return MeshLambertMaterial;
  })();
  return ThreeNodes.nodes.types.Materials.MeshPhongMaterial = (function() {
    __extends(MeshPhongMaterial, ThreeNodes.NodeMaterialBase);
    function MeshPhongMaterial() {
      this.set_fields = __bind(this.set_fields, this);
      MeshPhongMaterial.__super__.constructor.apply(this, arguments);
    }
    MeshPhongMaterial.prototype.set_fields = function() {
      MeshPhongMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = [];
      this.material_class = THREE.MeshPhongMaterial;
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xff0000)
          },
          "ambient": {
            type: "Color",
            val: new THREE.Color(0x050505)
          },
          "specular": {
            type: "Color",
            val: new THREE.Color(0x111111)
          },
          "shininess": 30,
          "reflectivity": 1,
          "refractionRatio": 0.98,
          "wireframe": false,
          "vertexColors": {
            type: "Any",
            val: false
          },
          "skinning": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.vars_rebuild_shader_on_change = ["transparent", "depthTest"];
      return this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
    };
    return MeshPhongMaterial;
  })();
});