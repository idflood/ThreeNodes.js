var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  ThreeNodes.NodeMaterialBase = (function() {
    __extends(NodeMaterialBase, ThreeNodes.NodeBase);
    function NodeMaterialBase() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      NodeMaterialBase.__super__.constructor.apply(this, arguments);
    }
    NodeMaterialBase.prototype.set_fields = function() {
      NodeMaterialBase.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      ThreeNodes.webgl_materials_node[ThreeNodes.webgl_materials_node.length] = this;
      return this.rack.addFields({
        inputs: {
          "opacity": 1,
          "transparent": false,
          "depthTest": true,
          "alphaTest": 0,
          "polygonOffset": false,
          "polygonOffsetFactor": 0,
          "polygonOffsetUnits": 0
        }
      });
    };
    NodeMaterialBase.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.set("out", this.ob);
    };
    return NodeMaterialBase;
  })();
  ThreeNodes.nodes.types.Materials.MeshBasicMaterial = (function() {
    __extends(MeshBasicMaterial, ThreeNodes.NodeMaterialBase);
    function MeshBasicMaterial() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      MeshBasicMaterial.__super__.constructor.apply(this, arguments);
    }
    MeshBasicMaterial.prototype.set_fields = function() {
      MeshBasicMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.MeshBasicMaterial({
        color: 0xff0000
      });
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(1, 0, 0)
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
    MeshBasicMaterial.prototype.compute = function() {
      if (this.input_value_has_changed(this.vars_rebuild_shader_on_change)) {
        this.ob = new THREE.MeshBasicMaterial({
          color: 0xff0000
        });
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
      return this.rack.set("out", this.ob);
    };
    return MeshBasicMaterial;
  })();
  return ThreeNodes.nodes.types.Materials.MeshLambertMaterial = (function() {
    __extends(MeshLambertMaterial, ThreeNodes.NodeMaterialBase);
    function MeshLambertMaterial() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      MeshLambertMaterial.__super__.constructor.apply(this, arguments);
    }
    MeshLambertMaterial.prototype.set_fields = function() {
      MeshLambertMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.MeshLambertMaterial({
        color: 0xff0000
      });
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(1, 0, 0)
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
    MeshLambertMaterial.prototype.compute = function() {
      if (this.input_value_has_changed(this.vars_rebuild_shader_on_change)) {
        this.ob = new THREE.MeshLambertMaterial({
          color: 0xff0000
        });
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
      return this.rack.set("out", this.ob);
    };
    return MeshLambertMaterial;
  })();
});