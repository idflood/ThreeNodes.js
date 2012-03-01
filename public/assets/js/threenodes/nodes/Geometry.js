var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.PlaneGeometry = (function(_super) {

    __extends(PlaneGeometry, _super);

    function PlaneGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      PlaneGeometry.__super__.constructor.apply(this, arguments);
    }

    PlaneGeometry.node_name = 'Plane';

    PlaneGeometry.group_name = 'Geometry';

    PlaneGeometry.prototype.set_fields = function() {
      PlaneGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.PlaneGeometry(100, 100, 1, 1, 1);
      this.rack.addFields({
        inputs: {
          "width": 100,
          "height": 100,
          "segments_width": 1,
          "segments_height": 1
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    PlaneGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("width").getValue(), this.rack.getField("height").getValue(), this.rack.getField("segments_width").getValue(), this.rack.getField("segments_height").getValue()];
    };

    PlaneGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.PlaneGeometry(this.rack.getField("width").getValue(), this.rack.getField("height").getValue(), this.rack.getField("segments_width").getValue(), this.rack.getField("segments_height").getValue());
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return PlaneGeometry;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.CubeGeometry = (function(_super) {

    __extends(CubeGeometry, _super);

    function CubeGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      CubeGeometry.__super__.constructor.apply(this, arguments);
    }

    CubeGeometry.node_name = 'Cube';

    CubeGeometry.group_name = 'Geometry';

    CubeGeometry.prototype.set_fields = function() {
      CubeGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1);
      this.rack.addFields({
        inputs: {
          "flip": -1,
          "width": 100,
          "height": 100,
          "depth": 100,
          "segments_width": 1,
          "segments_height": 1,
          "segments_depth": 1
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    CubeGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("width").getValue(), this.rack.getField("height").getValue(), this.rack.getField("depth").getValue(), this.rack.getField("segments_width").getValue(), this.rack.getField("segments_height").getValue(), this.rack.getField("segments_depth").getValue(), this.rack.getField("flip").getValue()];
    };

    CubeGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.CubeGeometry(this.rack.getField("width").getValue(), this.rack.getField("height").getValue(), this.rack.getField("depth").getValue(), this.rack.getField("segments_width").getValue(), this.rack.getField("segments_height").getValue(), this.rack.getField("segments_depth").getValue(), this.rack.getField("flip").getValue());
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return CubeGeometry;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SphereGeometry = (function(_super) {

    __extends(SphereGeometry, _super);

    function SphereGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      SphereGeometry.__super__.constructor.apply(this, arguments);
    }

    SphereGeometry.node_name = 'Sphere';

    SphereGeometry.group_name = 'Geometry';

    SphereGeometry.prototype.set_fields = function() {
      SphereGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.SphereGeometry(100, 20, 20);
      this.rack.addFields({
        inputs: {
          "radius": 100,
          "segments_width": 1,
          "segments_height": 1
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    SphereGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("radius").getValue(), this.rack.getField("segments_width").getValue(), this.rack.getField("segments_height").getValue()];
    };

    SphereGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.SphereGeometry(this.rack.getField("radius").getValue(), this.rack.getField("segments_width").getValue(), this.rack.getField("segments_height").getValue());
        this.cached = new_cache;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return SphereGeometry;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.CylinderGeometry = (function(_super) {

    __extends(CylinderGeometry, _super);

    function CylinderGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      CylinderGeometry.__super__.constructor.apply(this, arguments);
    }

    CylinderGeometry.node_name = 'Cylinder';

    CylinderGeometry.group_name = 'Geometry';

    CylinderGeometry.prototype.set_fields = function() {
      CylinderGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.CylinderGeometry(100, 100, 20, 30, 1, false);
      this.rack.addFields({
        inputs: {
          "radiusTop": 100,
          "radiusBottom": 100,
          "height": 20,
          "segmentsRadius": 30,
          "segmentsHeight": 1,
          "openEnded": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    CylinderGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("radiusTop").getValue(), this.rack.getField("radiusBottom").getValue(), this.rack.getField("height").getValue(), this.rack.getField("segmentsRadius").getValue(), this.rack.getField("segmentsHeight").getValue(), this.rack.getField("openEnded").getValue()];
    };

    CylinderGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.CylinderGeometry(this.rack.getField("radiusTop").getValue(), this.rack.getField("radiusBottom").getValue(), this.rack.getField("height").getValue(), this.rack.getField("segmentsRadius").getValue(), this.rack.getField("segmentsHeight").getValue(), this.rack.getField("openEnded").getValue());
        this.cached = new_cache;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return CylinderGeometry;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.TorusGeometry = (function(_super) {

    __extends(TorusGeometry, _super);

    function TorusGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      TorusGeometry.__super__.constructor.apply(this, arguments);
    }

    TorusGeometry.node_name = 'Torus';

    TorusGeometry.group_name = 'Geometry';

    TorusGeometry.prototype.set_fields = function() {
      TorusGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.TorusGeometry(100, 40, 8, 6, Math.PI * 2);
      this.rack.addFields({
        inputs: {
          "radius": 100,
          "tube": 40,
          "segmentsR": 8,
          "segmentsT": 6,
          "arc": Math.PI * 2
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    TorusGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("radius").getValue(), this.rack.getField("tube").getValue(), this.rack.getField("segmentsR").getValue(), this.rack.getField("segmentsT").getValue(), this.rack.getField("arc").getValue()];
    };

    TorusGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.TorusGeometry(this.rack.getField("radius").getValue(), this.rack.getField("tube").getValue(), this.rack.getField("segmentsR").getValue(), this.rack.getField("segmentsT").getValue(), this.rack.getField("arc").getValue());
        this.cached = new_cache;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return TorusGeometry;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.TorusKnotGeometry = (function(_super) {

    __extends(TorusKnotGeometry, _super);

    function TorusKnotGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      TorusKnotGeometry.__super__.constructor.apply(this, arguments);
    }

    TorusKnotGeometry.node_name = 'TorusKnot';

    TorusKnotGeometry.group_name = 'Geometry';

    TorusKnotGeometry.prototype.set_fields = function() {
      TorusKnotGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.TorusKnotGeometry(200, 40, 64, 8, 2, 3, 1);
      this.rack.addFields({
        inputs: {
          "radius": 200,
          "tube": 40,
          "segmentsR": 64,
          "segmentsT": 8,
          "p": 2,
          "q": 3,
          "heightScale": 1
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    TorusKnotGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("radius").getValue(), this.rack.getField("tube").getValue(), this.rack.getField("segmentsR").getValue(), this.rack.getField("segmentsT").getValue(), this.rack.getField("p").getValue(), this.rack.getField("q").getValue(), this.rack.getField("heightScale").getValue()];
    };

    TorusKnotGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.TorusKnotGeometry(this.rack.getField("radius").getValue(), this.rack.getField("tube").getValue(), this.rack.getField("segmentsR").getValue(), this.rack.getField("segmentsT").getValue(), this.rack.getField("p").getValue(), this.rack.getField("q").getValue(), this.rack.getField("heightScale").getValue());
        this.cached = new_cache;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return TorusKnotGeometry;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.OctahedronGeometry = (function(_super) {

    __extends(OctahedronGeometry, _super);

    function OctahedronGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      OctahedronGeometry.__super__.constructor.apply(this, arguments);
    }

    OctahedronGeometry.node_name = 'Octahedron';

    OctahedronGeometry.group_name = 'Geometry';

    OctahedronGeometry.prototype.set_fields = function() {
      OctahedronGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.OctahedronGeometry(100, 0);
      this.rack.addFields({
        inputs: {
          "radius": 100,
          "detail": 0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    OctahedronGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("radius").getValue(), this.rack.getField("detail").getValue()];
    };

    OctahedronGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.OctahedronGeometry(this.rack.getField("radius").getValue(), this.rack.getField("detail").getValue());
        this.cached = new_cache;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.setField("out", this.ob);
    };

    return OctahedronGeometry;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.TextGeometry = (function(_super) {

    __extends(TextGeometry, _super);

    function TextGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      TextGeometry.__super__.constructor.apply(this, arguments);
    }

    TextGeometry.node_name = 'Text';

    TextGeometry.group_name = 'Geometry';

    TextGeometry.prototype.set_fields = function() {
      TextGeometry.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      this.rack.addFields({
        inputs: {
          "text": "Example",
          "font": {
            type: "Any",
            val: {}
          },
          "size": 100,
          "height": 20,
          "curveSegments": 4,
          "bevelEnabled": false,
          "bevelThickness": 0,
          "bevelSize": 0
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.cached = this.get_cache_array();
    };

    TextGeometry.prototype.get_cache_array = function() {
      return [this.rack.getField("font").getValue(), this.rack.getField("text").getValue(), this.rack.getField("size").getValue(), this.rack.getField("height").getValue(), this.rack.getField("curveSegments").getValue(), this.rack.getField("bevelEnabled").getValue(), this.rack.getField("bevelThickness").getValue(), this.rack.getField("bevelSize").getValue()];
    };

    TextGeometry.prototype.compute = function() {
      var font, has_font_attribute, new_cache;
      new_cache = this.get_cache_array();
      font = this.rack.get("font").getValue();
      has_font_attribute = function(f) {
        if (font["font"] && font["weight"]) return true;
        return false;
      };
      if (!has_font_attribute(font) ||  this.rack.get("text").getValue() === "") {
        this.ob = false;
        this.rack.setField("out", this.ob);
        return false;
      }
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
        console.log("building text " + font.font + " / " + font.weight);
        this.ob = new THREE.TextGeometry(this.rack.getField("text").getValue(), {
          size: this.rack.getField("size").getValue(),
          height: this.rack.getField("height").getValue(),
          font: font.font,
          weight: font.weight,
          curveSegments: this.rack.getField("curveSegments").getValue()
        });
        this.ob.computeBoundingBox();
        this.ob.computeVertexNormals();
        this.cached = new_cache;
      }
      return this.rack.setField("out", this.ob);
    };

    return TextGeometry;

  })(ThreeNodes.NodeBase);
});
