var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.PointLight = (function(_super) {

    __extends(PointLight, _super);

    function PointLight() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.set_fields = __bind(this.set_fields, this);
      PointLight.__super__.constructor.apply(this, arguments);
    }

    PointLight.node_name = 'PointLight';

    PointLight.group_name = 'Lights';

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

    PointLight.prototype.remove = function() {
      delete this.ob;
      return PointLight.__super__.remove.apply(this, arguments);
    };

    PointLight.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return PointLight;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SpotLight = (function(_super) {

    __extends(SpotLight, _super);

    function SpotLight() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.set_fields = __bind(this.set_fields, this);
      SpotLight.__super__.constructor.apply(this, arguments);
    }

    SpotLight.node_name = 'SpotLight';

    SpotLight.group_name = 'Lights';

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
          "castShadow": false,
          "shadowCameraNear": 50,
          "shadowCameraFar": 5000,
          "shadowCameraFov": 50,
          "shadowBias": 0,
          "shadowDarkness": 0.5,
          "shadowMapWidth": 512,
          "shadowMapHeight": 512
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    SpotLight.prototype.remove = function() {
      delete this.ob;
      return SpotLight.__super__.remove.apply(this, arguments);
    };

    SpotLight.prototype.compute = function() {
      if (this.rack.getField("castShadow").getValue() !== this.ob.castShadow) {
        ThreeNodes.events.trigger("RebuildAllShaders");
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return SpotLight;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.DirectionalLight = (function(_super) {

    __extends(DirectionalLight, _super);

    function DirectionalLight() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.set_fields = __bind(this.set_fields, this);
      DirectionalLight.__super__.constructor.apply(this, arguments);
    }

    DirectionalLight.node_name = 'DirectionalLight';

    DirectionalLight.group_name = 'Lights';

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

    DirectionalLight.prototype.remove = function() {
      delete this.ob;
      return DirectionalLight.__super__.remove.apply(this, arguments);
    };

    DirectionalLight.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return DirectionalLight;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.AmbientLight = (function(_super) {

    __extends(AmbientLight, _super);

    function AmbientLight() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.set_fields = __bind(this.set_fields, this);
      AmbientLight.__super__.constructor.apply(this, arguments);
    }

    AmbientLight.node_name = 'AmbientLight';

    AmbientLight.group_name = 'Lights';

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
          "position": {
            type: "Vector3",
            val: new THREE.Vector3(0, 300, 0)
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

    AmbientLight.prototype.remove = function() {
      delete this.ob;
      return AmbientLight.__super__.remove.apply(this, arguments);
    };

    AmbientLight.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return AmbientLight;

  })(ThreeNodes.NodeBase);
});
