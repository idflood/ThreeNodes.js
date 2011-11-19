var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  ThreeNodes.nodes.types.Lights.PointLight = (function() {
    __extends(PointLight, ThreeNodes.NodeBase);
    function PointLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      PointLight.__super__.constructor.apply(this, arguments);
    }
    PointLight.prototype.set_fields = function() {
      PointLight.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.PointLight(0xffffff);
      return this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xffffff)
          },
          "position": {
            type: "Vector3",
            val: new THREE.Vector3(0, 300, 0)
          },
          "intensity": 1,
          "distance": 0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };
    PointLight.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.set("out", this.ob);
    };
    return PointLight;
  })();
  ThreeNodes.nodes.types.Lights.SpotLight = (function() {
    __extends(SpotLight, ThreeNodes.NodeBase);
    function SpotLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SpotLight.__super__.constructor.apply(this, arguments);
    }
    SpotLight.prototype.set_fields = function() {
      SpotLight.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.SpotLight(0xffffff);
      return this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xffffff)
          },
          "position": {
            type: "Vector3",
            val: new THREE.Vector3(0, 300, 0)
          },
          "target": {
            type: "Any",
            val: new THREE.Object3D()
          },
          "intensity": 1,
          "distance": 0,
          "castShadow": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };
    SpotLight.prototype.compute = function() {
      if (this.rack.get("castShadow").get() !== this.ob.castShadow) {
        ThreeNodes.rebuild_all_shaders();
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.set("out", this.ob);
    };
    return SpotLight;
  })();
  ThreeNodes.nodes.types.Lights.DirectionalLight = (function() {
    __extends(DirectionalLight, ThreeNodes.NodeBase);
    function DirectionalLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      DirectionalLight.__super__.constructor.apply(this, arguments);
    }
    DirectionalLight.prototype.set_fields = function() {
      DirectionalLight.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.DirectionalLight(0xffffff);
      return this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xffffff)
          },
          "position": {
            type: "Vector3",
            val: new THREE.Vector3(0, 300, 0)
          },
          "intensity": 1,
          "distance": 0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };
    DirectionalLight.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.set("out", this.ob);
    };
    return DirectionalLight;
  })();
  return ThreeNodes.nodes.types.Lights.AmbientLight = (function() {
    __extends(AmbientLight, ThreeNodes.NodeBase);
    function AmbientLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      AmbientLight.__super__.constructor.apply(this, arguments);
    }
    AmbientLight.prototype.set_fields = function() {
      AmbientLight.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.AmbientLight(0xffffff);
      return this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xffffff)
          },
          "intensity": 1,
          "distance": 0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };
    AmbientLight.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.set("out", this.ob);
    };
    return AmbientLight;
  })();
});