var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.BloomPass = (function(_super) {

    __extends(BloomPass, _super);

    function BloomPass() {
      this.compute = __bind(this.compute, this);
      this.value_has_changed = __bind(this.value_has_changed, this);
      this.set_fields = __bind(this.set_fields, this);
      BloomPass.__super__.constructor.apply(this, arguments);
    }

    BloomPass.node_name = 'Bloom';

    BloomPass.group_name = 'PostProcessing';

    BloomPass.prototype.set_fields = function() {
      BloomPass.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.BloomPass(1.6);
      this.rack.addFields({
        inputs: {
          "strength": 1.6,
          "kernelSize": 25,
          "sigma": 4.0,
          "resolution": 256
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cached_array(['kernelSize', 'sigma', 'resolution']);
    };

    BloomPass.prototype.value_has_changed = function(vals) {
      var newvals;
      newvals = this.get_cached_array(vals);
      if (ThreeNodes.Utils.flatArraysAreEquals(newvals, this.cached) === false) {
        this.cached = newvals;
        return true;
      }
      return false;
    };

    BloomPass.prototype.compute = function() {
      if (this.value_has_changed(['kernelSize', 'sigma', 'resolution']) === true) {
        this.ob = new THREE.BloomPass(this.rack.get("strength").get(), this.rack.get('kernelSize').get(), this.rack.get('sigma').get(), this.rack.get('resolution').get());
      }
      this.ob.screenUniforms["opacity"].value = this.rack.get("strength").get();
      return this.rack.setField("out", this.ob);
    };

    return BloomPass;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.DotScreenPass = (function(_super) {

    __extends(DotScreenPass, _super);

    function DotScreenPass() {
      this.compute = __bind(this.compute, this);
      this.value_has_changed = __bind(this.value_has_changed, this);
      this.set_fields = __bind(this.set_fields, this);
      DotScreenPass.__super__.constructor.apply(this, arguments);
    }

    DotScreenPass.node_name = 'DotScreen';

    DotScreenPass.group_name = 'PostProcessing';

    DotScreenPass.prototype.set_fields = function() {
      DotScreenPass.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.DotScreenPass(new THREE.Vector2(0.5, 0.5));
      this.rack.addFields({
        inputs: {
          "center": {
            type: "Vector2",
            val: new THREE.Vector2(0.5, 0.5)
          },
          "angle": 1.57,
          "scale": 1.0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cached_array(['center', 'angle', 'scale']);
    };

    DotScreenPass.prototype.value_has_changed = function(vals) {
      var newvals;
      newvals = this.get_cached_array(vals);
      if (ThreeNodes.Utils.flatArraysAreEquals(newvals, this.cached) === false) {
        this.cached = newvals;
        return true;
      }
      return false;
    };

    DotScreenPass.prototype.compute = function() {
      if (this.value_has_changed(['center', 'angle', 'scale']) === true) {
        this.ob = new THREE.DotScreenPass(this.rack.get("center").get(), this.rack.get('angle').get(), this.rack.get('scale').get());
      }
      return this.rack.setField("out", this.ob);
    };

    return DotScreenPass;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.FilmPass = (function(_super) {

    __extends(FilmPass, _super);

    function FilmPass() {
      this.compute = __bind(this.compute, this);
      this.value_has_changed = __bind(this.value_has_changed, this);
      this.set_fields = __bind(this.set_fields, this);
      FilmPass.__super__.constructor.apply(this, arguments);
    }

    FilmPass.node_name = 'Film';

    FilmPass.group_name = 'PostProcessing';

    FilmPass.prototype.set_fields = function() {
      FilmPass.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.FilmPass(0.5, 0.125, 2048, false);
      this.rack.addFields({
        inputs: {
          "noiseIntensity": 0.5,
          "scanlinesIntensity": 0.125,
          "scanlinesCount": 2048,
          "grayscale": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cached_array(['noiseIntensity', 'scanlinesIntensity', 'scanlinesCount', 'grayscale']);
    };

    FilmPass.prototype.value_has_changed = function(vals) {
      var newvals;
      newvals = this.get_cached_array(vals);
      if (ThreeNodes.Utils.flatArraysAreEquals(newvals, this.cached) === false) {
        this.cached = newvals;
        return true;
      }
      return false;
    };

    FilmPass.prototype.compute = function() {
      this.ob.uniforms.grayscale.value = this.rack.get("grayscale").get();
      this.ob.uniforms.nIntensity.value = this.rack.get("noiseIntensity").get();
      this.ob.uniforms.sIntensity.value = this.rack.get("scanlinesIntensity").get();
      this.ob.uniforms.sCount.value = this.rack.get("scanlinesCount").get();
      return this.rack.setField("out", this.ob);
    };

    return FilmPass;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.VignettePass = (function(_super) {

    __extends(VignettePass, _super);

    function VignettePass() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      VignettePass.__super__.constructor.apply(this, arguments);
    }

    VignettePass.node_name = 'Vignette';

    VignettePass.group_name = 'PostProcessing';

    VignettePass.prototype.set_fields = function() {
      var shader;
      VignettePass.__super__.set_fields.apply(this, arguments);
      shader = THREE.ShaderExtras["vignette"];
      this.ob = new THREE.ShaderPass(shader);
      return this.rack.addFields({
        inputs: {
          "offset": 1.0,
          "darkness": 1.0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    VignettePass.prototype.compute = function() {
      this.ob.uniforms["offset"].value = this.rack.get("offset").get();
      this.ob.uniforms["darkness"].value = this.rack.get("darkness").get();
      return this.rack.setField("out", this.ob);
    };

    return VignettePass;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.HorizontalBlurPass = (function(_super) {

    __extends(HorizontalBlurPass, _super);

    function HorizontalBlurPass() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      HorizontalBlurPass.__super__.constructor.apply(this, arguments);
    }

    HorizontalBlurPass.node_name = 'HorizontalBlur';

    HorizontalBlurPass.group_name = 'PostProcessing';

    HorizontalBlurPass.prototype.set_fields = function() {
      var shader;
      HorizontalBlurPass.__super__.set_fields.apply(this, arguments);
      shader = THREE.ShaderExtras["horizontalBlur"];
      this.ob = new THREE.ShaderPass(shader);
      return this.rack.addFields({
        inputs: {
          "delta": 1.0 / 512.0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    HorizontalBlurPass.prototype.compute = function() {
      this.ob.uniforms["h"].value = this.rack.get("delta").get();
      return this.rack.setField("out", this.ob);
    };

    return HorizontalBlurPass;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.VerticalBlurPass = (function(_super) {

    __extends(VerticalBlurPass, _super);

    function VerticalBlurPass() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      VerticalBlurPass.__super__.constructor.apply(this, arguments);
    }

    VerticalBlurPass.node_name = 'VerticalBlur';

    VerticalBlurPass.group_name = 'PostProcessing';

    VerticalBlurPass.prototype.set_fields = function() {
      var shader;
      VerticalBlurPass.__super__.set_fields.apply(this, arguments);
      shader = THREE.ShaderExtras["verticalBlur"];
      this.ob = new THREE.ShaderPass(shader);
      return this.rack.addFields({
        inputs: {
          "delta": 1.0 / 512.0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    VerticalBlurPass.prototype.compute = function() {
      this.ob.uniforms["v"].value = this.rack.get("delta").get();
      return this.rack.setField("out", this.ob);
    };

    return VerticalBlurPass;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.BleachPass = (function(_super) {

    __extends(BleachPass, _super);

    function BleachPass() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      BleachPass.__super__.constructor.apply(this, arguments);
    }

    BleachPass.node_name = 'Bleach';

    BleachPass.group_name = 'PostProcessing';

    BleachPass.prototype.set_fields = function() {
      var shader;
      BleachPass.__super__.set_fields.apply(this, arguments);
      shader = THREE.ShaderExtras["bleachbypass"];
      this.ob = new THREE.ShaderPass(shader);
      return this.rack.addFields({
        inputs: {
          "opacity": 0.95
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };

    BleachPass.prototype.compute = function() {
      this.ob.uniforms["opacity"].value = this.rack.get("opacity").get();
      return this.rack.setField("out", this.ob);
    };

    return BleachPass;

  })(ThreeNodes.NodeBase);
});
