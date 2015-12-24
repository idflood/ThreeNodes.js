(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("_"), require("Backbone"), require("Blob"), require("FileSaver"), require("Three"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "_", "Backbone", "Blob", "FileSaver", "Three"], factory);
	else if(typeof exports === 'object')
		exports["NodeTypes.Three"] = factory(require("jQuery"), require("_"), require("Backbone"), require("Blob"), require("FileSaver"), require("Three"));
	else
		root["ThreeNodes"] = root["ThreeNodes"] || {}, root["ThreeNodes"]["NodeTypes.Three"] = factory(root["jQuery"], root["_"], root["Backbone"], root["Blob"], root["FileSaver"], root["Three"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_31__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_33__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	
	__webpack_require__(24);
	
	__webpack_require__(25);
	
	__webpack_require__(26);
	
	__webpack_require__(27);
	
	__webpack_require__(28);
	
	__webpack_require__(29);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CubeGeometry, CylinderGeometry, Node, OctahedronGeometry, PlaneGeometry, SphereGeometry, TextGeometry, TorusGeometry, TorusKnotGeometry, Utils, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	Node = __webpack_require__(35);
	
	PlaneGeometry = (function(superClass) {
	  extend(PlaneGeometry, superClass);
	
	  function PlaneGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return PlaneGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  PlaneGeometry.node_name = 'Plane';
	
	  PlaneGeometry.group_name = 'Geometry';
	
	  PlaneGeometry.prototype.initialize = function(options) {
	    PlaneGeometry.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.PlaneGeometry(100, 100, 1, 1, 1);
	    return this.cached = this.get_cache_array();
	  };
	
	  PlaneGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = PlaneGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  PlaneGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return PlaneGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  PlaneGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("width").getValue(), this.fields.getField("height").getValue(), this.fields.getField("segments_width").getValue(), this.fields.getField("segments_height").getValue()];
	  };
	
	  PlaneGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      this.ob = new THREE.PlaneGeometry(this.fields.getField("width").getValue(), this.fields.getField("height").getValue(), this.fields.getField("segments_width").getValue(), this.fields.getField("segments_height").getValue());
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return PlaneGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('PlaneGeometry', PlaneGeometry);
	
	CubeGeometry = (function(superClass) {
	  extend(CubeGeometry, superClass);
	
	  function CubeGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return CubeGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  CubeGeometry.node_name = 'Cube';
	
	  CubeGeometry.group_name = 'Geometry';
	
	  CubeGeometry.prototype.initialize = function(options) {
	    CubeGeometry.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1);
	    return this.cached = this.get_cache_array();
	  };
	
	  CubeGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = CubeGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  CubeGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return CubeGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  CubeGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("width").getValue(), this.fields.getField("height").getValue(), this.fields.getField("depth").getValue(), this.fields.getField("segments_width").getValue(), this.fields.getField("segments_height").getValue(), this.fields.getField("segments_depth").getValue(), this.fields.getField("flip").getValue()];
	  };
	
	  CubeGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      this.ob = new THREE.CubeGeometry(this.fields.getField("width").getValue(), this.fields.getField("height").getValue(), this.fields.getField("depth").getValue(), this.fields.getField("segments_width").getValue(), this.fields.getField("segments_height").getValue(), this.fields.getField("segments_depth").getValue(), this.fields.getField("flip").getValue());
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return CubeGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('CubeGeometry', CubeGeometry);
	
	SphereGeometry = (function(superClass) {
	  extend(SphereGeometry, superClass);
	
	  function SphereGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SphereGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  SphereGeometry.node_name = 'Sphere';
	
	  SphereGeometry.group_name = 'Geometry';
	
	  SphereGeometry.prototype.initialize = function(options) {
	    SphereGeometry.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.SphereGeometry(100, 20, 20);
	    return this.cached = this.get_cache_array();
	  };
	
	  SphereGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SphereGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SphereGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return SphereGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  SphereGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("radius").getValue(), this.fields.getField("segments_width").getValue(), this.fields.getField("segments_height").getValue()];
	  };
	
	  SphereGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      this.ob = new THREE.SphereGeometry(this.fields.getField("radius").getValue(), this.fields.getField("segments_width").getValue(), this.fields.getField("segments_height").getValue());
	      this.cached = new_cache;
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return SphereGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SphereGeometry', SphereGeometry);
	
	CylinderGeometry = (function(superClass) {
	  extend(CylinderGeometry, superClass);
	
	  function CylinderGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return CylinderGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  CylinderGeometry.node_name = 'Cylinder';
	
	  CylinderGeometry.group_name = 'Geometry';
	
	  CylinderGeometry.prototype.initialize = function(options) {
	    CylinderGeometry.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.CylinderGeometry(100, 100, 20, 30, 1, false);
	    return this.cached = this.get_cache_array();
	  };
	
	  CylinderGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = CylinderGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  CylinderGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return CylinderGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  CylinderGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("radiusTop").getValue(), this.fields.getField("radiusBottom").getValue(), this.fields.getField("height").getValue(), this.fields.getField("segmentsRadius").getValue(), this.fields.getField("segmentsHeight").getValue(), this.fields.getField("openEnded").getValue()];
	  };
	
	  CylinderGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      this.ob = new THREE.CylinderGeometry(this.fields.getField("radiusTop").getValue(), this.fields.getField("radiusBottom").getValue(), this.fields.getField("height").getValue(), this.fields.getField("segmentsRadius").getValue(), this.fields.getField("segmentsHeight").getValue(), this.fields.getField("openEnded").getValue());
	      this.cached = new_cache;
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return CylinderGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('CylinderGeometry', CylinderGeometry);
	
	TorusGeometry = (function(superClass) {
	  extend(TorusGeometry, superClass);
	
	  function TorusGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return TorusGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  TorusGeometry.node_name = 'Torus';
	
	  TorusGeometry.group_name = 'Geometry';
	
	  TorusGeometry.prototype.initialize = function(options) {
	    TorusGeometry.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.TorusGeometry(100, 40, 8, 6, Math.PI * 2);
	    return this.cached = this.get_cache_array();
	  };
	
	  TorusGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = TorusGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  TorusGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return TorusGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  TorusGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("radius").getValue(), this.fields.getField("tube").getValue(), this.fields.getField("segmentsR").getValue(), this.fields.getField("segmentsT").getValue(), this.fields.getField("arc").getValue()];
	  };
	
	  TorusGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      this.ob = new THREE.TorusGeometry(this.fields.getField("radius").getValue(), this.fields.getField("tube").getValue(), this.fields.getField("segmentsR").getValue(), this.fields.getField("segmentsT").getValue(), this.fields.getField("arc").getValue());
	      this.cached = new_cache;
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return TorusGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('TorusGeometry', TorusGeometry);
	
	TorusKnotGeometry = (function(superClass) {
	  extend(TorusKnotGeometry, superClass);
	
	  function TorusKnotGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return TorusKnotGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  TorusKnotGeometry.node_name = 'TorusKnot';
	
	  TorusKnotGeometry.group_name = 'Geometry';
	
	  TorusKnotGeometry.prototype.initialize = function(options) {
	    TorusKnotGeometry.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.TorusKnotGeometry(200, 40, 64, 8, 2, 3, 1);
	    return this.cached = this.get_cache_array();
	  };
	
	  TorusKnotGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = TorusKnotGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  TorusKnotGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return TorusKnotGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  TorusKnotGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("radius").getValue(), this.fields.getField("tube").getValue(), this.fields.getField("segmentsR").getValue(), this.fields.getField("segmentsT").getValue(), this.fields.getField("p").getValue(), this.fields.getField("q").getValue(), this.fields.getField("heightScale").getValue()];
	  };
	
	  TorusKnotGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      this.ob = new THREE.TorusKnotGeometry(this.fields.getField("radius").getValue(), this.fields.getField("tube").getValue(), this.fields.getField("segmentsR").getValue(), this.fields.getField("segmentsT").getValue(), this.fields.getField("p").getValue(), this.fields.getField("q").getValue(), this.fields.getField("heightScale").getValue());
	      this.cached = new_cache;
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return TorusKnotGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('TorusKnotGeometry', TorusKnotGeometry);
	
	OctahedronGeometry = (function(superClass) {
	  extend(OctahedronGeometry, superClass);
	
	  OctahedronGeometry.node_name = 'Octahedron';
	
	  OctahedronGeometry.group_name = 'Geometry';
	
	  function OctahedronGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    OctahedronGeometry.__super__.constructor.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.OctahedronGeometry(100, 0);
	    this.cached = this.get_cache_array();
	  }
	
	  OctahedronGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = OctahedronGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  OctahedronGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return OctahedronGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  OctahedronGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("radius").getValue(), this.fields.getField("detail").getValue()];
	  };
	
	  OctahedronGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      this.ob = new THREE.OctahedronGeometry(this.fields.getField("radius").getValue(), this.fields.getField("detail").getValue());
	      this.cached = new_cache;
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return OctahedronGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('OctahedronGeometry', OctahedronGeometry);
	
	TextGeometry = (function(superClass) {
	  extend(TextGeometry, superClass);
	
	  function TextGeometry() {
	    this.compute = bind(this.compute, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return TextGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  TextGeometry.node_name = 'Text';
	
	  TextGeometry.group_name = 'Geometry';
	
	  TextGeometry.prototype.initialize = function(options) {
	    TextGeometry.__super__.initialize.apply(this, arguments);
	    this.ob = false;
	    return this.cached = [];
	  };
	
	  TextGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = TextGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  TextGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return TextGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  TextGeometry.prototype.get_cache_array = function() {
	    var font_obj;
	    font_obj = this.fields.getField("font").getValue();
	    if (!font_obj.font) {
	      font_obj.font = '';
	    }
	    if (!font_obj.weight) {
	      font_obj.weight = '';
	    }
	    return [font_obj.font, font_obj.weight, this.fields.getField("text").getValue(), this.fields.getField("size").getValue(), this.fields.getField("height").getValue(), this.fields.getField("curveSegments").getValue(), this.fields.getField("bevelEnabled").getValue(), this.fields.getField("bevelThickness").getValue(), this.fields.getField("bevelSize").getValue()];
	  };
	
	  TextGeometry.prototype.compute = function() {
	    var font, has_font_attribute, new_cache;
	    new_cache = this.get_cache_array();
	    font = this.fields.getField("font").getValue();
	    has_font_attribute = function(f) {
	      if (font["font"] && font["weight"]) {
	        return true;
	      }
	      return false;
	    };
	    if (!has_font_attribute(font) || this.fields.getField("text").getValue() === "") {
	      this.ob = false;
	      this.fields.setField("out", this.ob);
	      return false;
	    }
	    if (Utils.flatArraysAreEquals(new_cache, this.cached) === false) {
	      console.log("building text " + font.font + " / " + font.weight);
	      this.ob = new THREE.TextGeometry(this.fields.getField("text").getValue(), {
	        size: this.fields.getField("size").getValue(),
	        height: this.fields.getField("height").getValue(),
	        font: font.font,
	        weight: font.weight,
	        curveSegments: this.fields.getField("curveSegments").getValue()
	      });
	      this.ob.computeBoundingBox();
	      this.ob.computeVertexNormals();
	    }
	    this.cached = new_cache;
	    return this.fields.setField("out", this.ob);
	  };
	
	  return TextGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('TextGeometry', TextGeometry);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var AmbientLight, Backbone, DirectionalLight, Node, PointLight, SpotLight, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	PointLight = (function(superClass) {
	  extend(PointLight, superClass);
	
	  function PointLight() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return PointLight.__super__.constructor.apply(this, arguments);
	  }
	
	  PointLight.node_name = 'PointLight';
	
	  PointLight.group_name = 'Lights';
	
	  PointLight.prototype.initialize = function(options) {
	    PointLight.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    return this.ob = new THREE.PointLight(0xffffff);
	  };
	
	  PointLight.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = PointLight.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  PointLight.prototype.remove = function() {
	    delete this.ob;
	    return PointLight.__super__.remove.apply(this, arguments);
	  };
	
	  PointLight.prototype.compute = function() {
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return PointLight;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('PointLight', PointLight);
	
	SpotLight = (function(superClass) {
	  extend(SpotLight, superClass);
	
	  function SpotLight() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SpotLight.__super__.constructor.apply(this, arguments);
	  }
	
	  SpotLight.node_name = 'SpotLight';
	
	  SpotLight.group_name = 'Lights';
	
	  SpotLight.prototype.initialize = function(options) {
	    SpotLight.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    return this.ob = new THREE.SpotLight(0xffffff);
	  };
	
	  SpotLight.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SpotLight.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SpotLight.prototype.remove = function() {
	    delete this.ob;
	    return SpotLight.__super__.remove.apply(this, arguments);
	  };
	
	  SpotLight.prototype.compute = function() {
	    if (this.fields.getField("castShadow").getValue() !== this.ob.castShadow) {
	      this.trigger("RebuildAllShaders");
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return SpotLight;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SpotLight', SpotLight);
	
	DirectionalLight = (function(superClass) {
	  extend(DirectionalLight, superClass);
	
	  function DirectionalLight() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return DirectionalLight.__super__.constructor.apply(this, arguments);
	  }
	
	  DirectionalLight.node_name = 'DirectionalLight';
	
	  DirectionalLight.group_name = 'Lights';
	
	  DirectionalLight.prototype.initialize = function(options) {
	    DirectionalLight.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    return this.ob = new THREE.DirectionalLight(0xffffff);
	  };
	
	  DirectionalLight.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = DirectionalLight.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  DirectionalLight.prototype.remove = function() {
	    delete this.ob;
	    return DirectionalLight.__super__.remove.apply(this, arguments);
	  };
	
	  DirectionalLight.prototype.compute = function() {
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return DirectionalLight;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('DirectionalLight', DirectionalLight);
	
	AmbientLight = (function(superClass) {
	  extend(AmbientLight, superClass);
	
	  function AmbientLight() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return AmbientLight.__super__.constructor.apply(this, arguments);
	  }
	
	  AmbientLight.node_name = 'AmbientLight';
	
	  AmbientLight.group_name = 'Lights';
	
	  AmbientLight.prototype.initialize = function(options) {
	    AmbientLight.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    return this.ob = new THREE.AmbientLight(0xffffff);
	  };
	
	  AmbientLight.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = AmbientLight.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  AmbientLight.prototype.remove = function() {
	    delete this.ob;
	    return AmbientLight.__super__.remove.apply(this, arguments);
	  };
	
	  AmbientLight.prototype.compute = function() {
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return AmbientLight;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('AmbientLight', AmbientLight);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, LineBasicMaterial, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, Node, NodeMaterialBase, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	NodeMaterialBase = __webpack_require__(40);
	
	MeshBasicMaterial = (function(superClass) {
	  extend(MeshBasicMaterial, superClass);
	
	  function MeshBasicMaterial() {
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return MeshBasicMaterial.__super__.constructor.apply(this, arguments);
	  }
	
	  MeshBasicMaterial.node_name = 'MeshBasic';
	
	  MeshBasicMaterial.group_name = 'Materials';
	
	  MeshBasicMaterial.prototype.initialize = function(options) {
	    MeshBasicMaterial.__super__.initialize.apply(this, arguments);
	    this.ob = [];
	    this.material_class = THREE.MeshBasicMaterial;
	    this.vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"];
	    return this.material_cache = this.createCacheObject(this.vars_rebuild_shader_on_change);
	  };
	
	  MeshBasicMaterial.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MeshBasicMaterial.__super__.getFields.apply(this, arguments);
	    fields = {
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
	        "skinning": false,
	        "fog": true
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  return MeshBasicMaterial;
	
	})(NodeMaterialBase);
	
	ThreeNodes.Core.addNodeType('MeshBasicMaterial', MeshBasicMaterial);
	
	LineBasicMaterial = (function(superClass) {
	  extend(LineBasicMaterial, superClass);
	
	  function LineBasicMaterial() {
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return LineBasicMaterial.__super__.constructor.apply(this, arguments);
	  }
	
	  LineBasicMaterial.node_name = 'LineBasic';
	
	  LineBasicMaterial.group_name = 'Materials';
	
	  LineBasicMaterial.prototype.initialize = function(options) {
	    LineBasicMaterial.__super__.initialize.apply(this, arguments);
	    this.ob = [];
	    this.material_class = THREE.LineBasicMaterial;
	    this.vars_rebuild_shader_on_change = ["transparent", "depthTest"];
	    return this.material_cache = this.createCacheObject(this.vars_rebuild_shader_on_change);
	  };
	
	  LineBasicMaterial.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = LineBasicMaterial.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  return LineBasicMaterial;
	
	})(NodeMaterialBase);
	
	ThreeNodes.Core.addNodeType('LineBasicMaterial', LineBasicMaterial);
	
	MeshLambertMaterial = (function(superClass) {
	  extend(MeshLambertMaterial, superClass);
	
	  function MeshLambertMaterial() {
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return MeshLambertMaterial.__super__.constructor.apply(this, arguments);
	  }
	
	  MeshLambertMaterial.node_name = 'MeshLambert';
	
	  MeshLambertMaterial.group_name = 'Materials';
	
	  MeshLambertMaterial.prototype.initialize = function(options) {
	    MeshLambertMaterial.__super__.initialize.apply(this, arguments);
	    this.ob = [];
	    this.material_class = THREE.MeshLambertMaterial;
	    this.vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"];
	    return this.material_cache = this.createCacheObject(this.vars_rebuild_shader_on_change);
	  };
	
	  MeshLambertMaterial.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MeshLambertMaterial.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "color": {
	          type: "Color",
	          val: new THREE.Color(0xff0000)
	        },
	        "ambient": {
	          type: "Color",
	          val: new THREE.Color(0x050505)
	        },
	        "map": {
	          type: "Any",
	          val: false
	        },
	        "reflectivity": 1,
	        "refractionRatio": 0.98,
	        "wireframe": false,
	        "vertexColors": {
	          type: "Any",
	          val: false
	        },
	        "skinning": false,
	        "fog": true
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  return MeshLambertMaterial;
	
	})(NodeMaterialBase);
	
	ThreeNodes.Core.addNodeType('MeshLambertMaterial', MeshLambertMaterial);
	
	MeshPhongMaterial = (function(superClass) {
	  extend(MeshPhongMaterial, superClass);
	
	  function MeshPhongMaterial() {
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return MeshPhongMaterial.__super__.constructor.apply(this, arguments);
	  }
	
	  MeshPhongMaterial.node_name = 'MeshPhong';
	
	  MeshPhongMaterial.group_name = 'Materials';
	
	  MeshPhongMaterial.prototype.initialize = function(options) {
	    MeshPhongMaterial.__super__.initialize.apply(this, arguments);
	    this.ob = [];
	    this.material_class = THREE.MeshPhongMaterial;
	    this.vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"];
	    return this.material_cache = this.createCacheObject(this.vars_rebuild_shader_on_change);
	  };
	
	  MeshPhongMaterial.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MeshPhongMaterial.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "color": {
	          type: "Color",
	          val: new THREE.Color(0xff0000)
	        },
	        "map": {
	          type: "Any",
	          val: false
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
	        "skinning": false,
	        "fog": true
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  return MeshPhongMaterial;
	
	})(NodeMaterialBase);
	
	ThreeNodes.Core.addNodeType('MeshPhongMaterial', MeshPhongMaterial);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BleachPass, BloomPass, DotScreenPass, FilmPass, HorizontalBlurPass, Node, Utils, VerticalBlurPass, VignettePass, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	Node = __webpack_require__(35);
	
	__webpack_require__(61);
	
	__webpack_require__(62);
	
	__webpack_require__(63);
	
	__webpack_require__(64);
	
	__webpack_require__(67);
	
	__webpack_require__(65);
	
	__webpack_require__(68);
	
	__webpack_require__(66);
	
	__webpack_require__(69);
	
	BloomPass = (function(superClass) {
	  extend(BloomPass, superClass);
	
	  function BloomPass() {
	    this.compute = bind(this.compute, this);
	    this.value_has_changed = bind(this.value_has_changed, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return BloomPass.__super__.constructor.apply(this, arguments);
	  }
	
	  BloomPass.node_name = 'Bloom';
	
	  BloomPass.group_name = 'PostProcessing';
	
	  BloomPass.prototype.initialize = function(options) {
	    BloomPass.__super__.initialize.apply(this, arguments);
	    this.ob = new THREE.BloomPass(1.6);
	    return this.cached = this.createCacheObject(['kernelSize', 'sigma', 'resolution']);
	  };
	
	  BloomPass.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = BloomPass.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  BloomPass.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return BloomPass.__super__.remove.apply(this, arguments);
	  };
	
	  BloomPass.prototype.value_has_changed = function(vals) {
	    var newvals;
	    newvals = this.createCacheObject(vals);
	    if (Utils.flatArraysAreEquals(newvals, this.cached) === false) {
	      this.cached = newvals;
	      return true;
	    }
	    return false;
	  };
	
	  BloomPass.prototype.compute = function() {
	    if (this.value_has_changed(['kernelSize', 'sigma', 'resolution']) === true) {
	      this.ob = new THREE.BloomPass(this.fields.getField("strength").getValue(), this.fields.getField('kernelSize').getValue(), this.fields.getField('sigma').getValue(), this.fields.getField('resolution').getValue());
	    }
	    this.ob.copyUniforms["opacity"].value = this.fields.getField("strength").getValue();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return BloomPass;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('BloomPass', BloomPass);
	
	DotScreenPass = (function(superClass) {
	  extend(DotScreenPass, superClass);
	
	  function DotScreenPass() {
	    this.compute = bind(this.compute, this);
	    this.value_has_changed = bind(this.value_has_changed, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return DotScreenPass.__super__.constructor.apply(this, arguments);
	  }
	
	  DotScreenPass.node_name = 'DotScreen';
	
	  DotScreenPass.group_name = 'PostProcessing';
	
	  DotScreenPass.prototype.initialize = function(options) {
	    DotScreenPass.__super__.initialize.apply(this, arguments);
	    this.ob = new THREE.DotScreenPass(new THREE.Vector2(0.5, 0.5));
	    return this.cached = this.createCacheObject(['center', 'angle', 'scale']);
	  };
	
	  DotScreenPass.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = DotScreenPass.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  DotScreenPass.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return DotScreenPass.__super__.remove.apply(this, arguments);
	  };
	
	  DotScreenPass.prototype.value_has_changed = function(vals) {
	    var newvals;
	    newvals = this.createCacheObject(vals);
	    if (Utils.flatArraysAreEquals(newvals, this.cached) === false) {
	      this.cached = newvals;
	      return true;
	    }
	    return false;
	  };
	
	  DotScreenPass.prototype.compute = function() {
	    if (this.value_has_changed(['center', 'angle', 'scale']) === true) {
	      this.ob = new THREE.DotScreenPass(this.fields.getField("center").getValue(), this.fields.getField('angle').getValue(), this.fields.getField('scale').getValue());
	    }
	    return this.fields.setField("out", this.ob);
	  };
	
	  return DotScreenPass;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('DotScreenPass', DotScreenPass);
	
	FilmPass = (function(superClass) {
	  extend(FilmPass, superClass);
	
	  function FilmPass() {
	    this.compute = bind(this.compute, this);
	    this.value_has_changed = bind(this.value_has_changed, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return FilmPass.__super__.constructor.apply(this, arguments);
	  }
	
	  FilmPass.node_name = 'Film';
	
	  FilmPass.group_name = 'PostProcessing';
	
	  FilmPass.prototype.initialize = function(options) {
	    FilmPass.__super__.initialize.apply(this, arguments);
	    this.ob = new THREE.FilmPass(0.5, 0.125, 2048, false);
	    return this.cached = this.createCacheObject(['noiseIntensity', 'scanlinesIntensity', 'scanlinesCount', 'grayscale']);
	  };
	
	  FilmPass.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = FilmPass.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  FilmPass.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return FilmPass.__super__.remove.apply(this, arguments);
	  };
	
	  FilmPass.prototype.value_has_changed = function(vals) {
	    var newvals;
	    newvals = this.createCacheObject(vals);
	    if (Utils.flatArraysAreEquals(newvals, this.cached) === false) {
	      this.cached = newvals;
	      return true;
	    }
	    return false;
	  };
	
	  FilmPass.prototype.compute = function() {
	    this.ob.uniforms.grayscale.value = this.fields.getField("grayscale").getValue();
	    this.ob.uniforms.nIntensity.value = this.fields.getField("noiseIntensity").getValue();
	    this.ob.uniforms.sIntensity.value = this.fields.getField("scanlinesIntensity").getValue();
	    this.ob.uniforms.sCount.value = this.fields.getField("scanlinesCount").getValue();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return FilmPass;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('FilmPass', FilmPass);
	
	VignettePass = (function(superClass) {
	  extend(VignettePass, superClass);
	
	  function VignettePass() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return VignettePass.__super__.constructor.apply(this, arguments);
	  }
	
	  VignettePass.node_name = 'Vignette';
	
	  VignettePass.group_name = 'PostProcessing';
	
	  VignettePass.prototype.initialize = function(options) {
	    var shader;
	    VignettePass.__super__.initialize.apply(this, arguments);
	    shader = THREE.VignetteShader;
	    return this.ob = new THREE.ShaderPass(shader);
	  };
	
	  VignettePass.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = VignettePass.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  VignettePass.prototype.remove = function() {
	    delete this.ob;
	    return VignettePass.__super__.remove.apply(this, arguments);
	  };
	
	  VignettePass.prototype.compute = function() {
	    this.ob.uniforms["offset"].value = this.fields.getField("offset").getValue();
	    this.ob.uniforms["darkness"].value = this.fields.getField("darkness").getValue();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return VignettePass;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('VignettePass', VignettePass);
	
	HorizontalBlurPass = (function(superClass) {
	  extend(HorizontalBlurPass, superClass);
	
	  function HorizontalBlurPass() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return HorizontalBlurPass.__super__.constructor.apply(this, arguments);
	  }
	
	  HorizontalBlurPass.node_name = 'HorizontalBlur';
	
	  HorizontalBlurPass.group_name = 'PostProcessing';
	
	  HorizontalBlurPass.prototype.initialize = function(options) {
	    var shader;
	    HorizontalBlurPass.__super__.initialize.apply(this, arguments);
	    shader = THREE.HorizontalBlurShader;
	    return this.ob = new THREE.ShaderPass(shader);
	  };
	
	  HorizontalBlurPass.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = HorizontalBlurPass.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "delta": 1.0 / 512.0
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  HorizontalBlurPass.prototype.remove = function() {
	    delete this.ob;
	    return HorizontalBlurPass.__super__.remove.apply(this, arguments);
	  };
	
	  HorizontalBlurPass.prototype.compute = function() {
	    this.ob.uniforms["h"].value = this.fields.getField("delta").getValue();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return HorizontalBlurPass;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('HorizontalBlurPass', HorizontalBlurPass);
	
	VerticalBlurPass = (function(superClass) {
	  extend(VerticalBlurPass, superClass);
	
	  function VerticalBlurPass() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return VerticalBlurPass.__super__.constructor.apply(this, arguments);
	  }
	
	  VerticalBlurPass.node_name = 'VerticalBlur';
	
	  VerticalBlurPass.group_name = 'PostProcessing';
	
	  VerticalBlurPass.prototype.initialize = function(options) {
	    var shader;
	    VerticalBlurPass.__super__.initialize.apply(this, arguments);
	    shader = THREE.VerticalBlurShader;
	    return this.ob = new THREE.ShaderPass(shader);
	  };
	
	  VerticalBlurPass.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = VerticalBlurPass.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "delta": 1.0 / 512.0
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  VerticalBlurPass.prototype.remove = function() {
	    delete this.ob;
	    return VerticalBlurPass.__super__.remove.apply(this, arguments);
	  };
	
	  VerticalBlurPass.prototype.compute = function() {
	    this.ob.uniforms["v"].value = this.fields.getField("delta").getValue();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return VerticalBlurPass;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('VerticalBlurPass', VerticalBlurPass);
	
	BleachPass = (function(superClass) {
	  extend(BleachPass, superClass);
	
	  function BleachPass() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return BleachPass.__super__.constructor.apply(this, arguments);
	  }
	
	  BleachPass.node_name = 'Bleach';
	
	  BleachPass.group_name = 'PostProcessing';
	
	  BleachPass.prototype.initialize = function(options) {
	    var shader;
	    BleachPass.__super__.initialize.apply(this, arguments);
	    shader = THREE.BleachBypassShader;
	    return this.ob = new THREE.ShaderPass(shader);
	  };
	
	  BleachPass.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = BleachPass.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "opacity": 0.95
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  BleachPass.prototype.remove = function() {
	    delete this.ob;
	    return BleachPass.__super__.remove.apply(this, arguments);
	  };
	
	  BleachPass.prototype.compute = function() {
	    this.ob.uniforms["opacity"].value = this.fields.getField("opacity").getValue();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return BleachPass;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('BleachPass', BleachPass);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Camera, ColladaLoader, Fog, FogExp2, Node, Object3D, Object3DwithMeshAndMaterial, Scene, Texture, ThreeLine, ThreeMesh, WebGLRenderer, WebglBase, _, jQuery,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	jQuery = __webpack_require__(1);
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	__webpack_require__(70);
	
	Object3D = __webpack_require__(41);
	
	WebglBase = __webpack_require__(42);
	
	Scene = (function(superClass) {
	  extend(Scene, superClass);
	
	  function Scene() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Scene.__super__.constructor.apply(this, arguments);
	  }
	
	  Scene.node_name = 'Scene';
	
	  Scene.group_name = 'Three';
	
	  Scene.prototype.initialize = function(options) {
	    Scene.__super__.initialize.apply(this, arguments);
	    return this.ob = new THREE.Scene();
	  };
	
	  Scene.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Scene.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "fog": {
	          type: 'Any',
	          val: null
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Scene.prototype.onFieldsCreated = function() {
	    return this.v_fog = this.fields.getField("fog");
	  };
	
	  Scene.prototype.remove = function() {
	    if (this.ob) {
	      delete this.ob.fog;
	      delete this.ob.__objects;
	      delete this.ob.__lights;
	      delete this.ob.__objectsAdded;
	      delete this.ob.__objectsRemoved;
	    }
	    delete this.vfog;
	    return Scene.__super__.remove.apply(this, arguments);
	  };
	
	  Scene.prototype.compute = function() {
	    var rotation;
	    this.applyFieldsToVal(this.fields.inputs, this.ob, ['children', 'lights', 'rotation']);
	    this.apply_children();
	    rotation = this.fields.getField('rotation').getValue();
	    this.applyRotation(this.ob, rotation);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return Scene;
	
	})(Object3D);
	
	ThreeNodes.Core.addNodeType('Scene', Scene);
	
	Object3DwithMeshAndMaterial = (function(superClass) {
	  extend(Object3DwithMeshAndMaterial, superClass);
	
	  function Object3DwithMeshAndMaterial() {
	    this.get_material_cache = bind(this.get_material_cache, this);
	    this.get_geometry_cache = bind(this.get_geometry_cache, this);
	    this.rebuild_geometry = bind(this.rebuild_geometry, this);
	    this.remove = bind(this.remove, this);
	    this.initialize = bind(this.initialize, this);
	    return Object3DwithMeshAndMaterial.__super__.constructor.apply(this, arguments);
	  }
	
	  Object3DwithMeshAndMaterial.prototype.initialize = function(options) {
	    Object3DwithMeshAndMaterial.__super__.initialize.apply(this, arguments);
	    this.material_cache = false;
	    return this.geometry_cache = false;
	  };
	
	  Object3DwithMeshAndMaterial.prototype.remove = function() {
	    delete this.material_cache;
	    delete this.geometry_cache;
	    return Object3DwithMeshAndMaterial.__super__.remove.apply(this, arguments);
	  };
	
	  Object3DwithMeshAndMaterial.prototype.rebuild_geometry = function() {
	    var field, geom;
	    field = this.fields.getField('geometry');
	    if (field.connections.length > 0) {
	      geom = field.connections[0].from_field.node;
	      geom.cached = [];
	      return geom.compute();
	    } else {
	      return this.fields.getField('geometry').setValue(new THREE.CubeGeometry(200, 200, 200));
	    }
	  };
	
	  Object3DwithMeshAndMaterial.prototype.get_geometry_cache = function() {
	    var current_val, f, j, len, res;
	    res = "";
	    current_val = this.fields.getField('geometry').get("value");
	    if ($.type(current_val) === "array") {
	      for (j = 0, len = current_val.length; j < len; j++) {
	        f = current_val[j];
	        res += f.id;
	      }
	    } else {
	      res = current_val.id;
	    }
	    return res;
	  };
	
	  Object3DwithMeshAndMaterial.prototype.get_material_cache = function() {
	    var current_val, f, j, len, res;
	    res = "";
	    current_val = this.fields.getField('material').get("value");
	    if ($.type(current_val) === "array") {
	      for (j = 0, len = current_val.length; j < len; j++) {
	        f = current_val[j];
	        res += f.id;
	      }
	    } else {
	      res = current_val.id;
	    }
	    return res;
	  };
	
	  return Object3DwithMeshAndMaterial;
	
	})(Object3D);
	
	ColladaLoader = (function(superClass) {
	  extend(ColladaLoader, superClass);
	
	  function ColladaLoader() {
	    this.compute = bind(this.compute, this);
	    this.onModelLoaded = bind(this.onModelLoaded, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return ColladaLoader.__super__.constructor.apply(this, arguments);
	  }
	
	  ColladaLoader.node_name = 'ColladaLoader';
	
	  ColladaLoader.group_name = 'Three';
	
	  ColladaLoader.prototype.initialize = function(options) {
	    ColladaLoader.__super__.initialize.apply(this, arguments);
	    this.ob = [new THREE.Object3D()];
	    this.file_url = "";
	    this.vars_shadow_options = ["castShadow", "receiveShadow"];
	    this.shadow_cache = [];
	    return this.compute();
	  };
	
	  ColladaLoader.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = ColladaLoader.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "file_url": ""
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  ColladaLoader.prototype.remove = function() {
	    var item, j, len, ref;
	    if (this.ob) {
	      ref = this.ob;
	      for (j = 0, len = ref.length; j < len; j++) {
	        item = ref[j];
	        this.deleteObjectAttributes(item);
	      }
	    }
	    delete this.model_object;
	    return ColladaLoader.__super__.remove.apply(this, arguments);
	  };
	
	  ColladaLoader.prototype.onModelLoaded = function() {
	    var j, len, ref, results, subchild;
	    ref = this.ob;
	    results = [];
	    for (j = 0, len = ref.length; j < len; j++) {
	      subchild = ref[j];
	      results.push(subchild.add(this.model_object));
	    }
	    return results;
	  };
	
	  ColladaLoader.prototype.compute = function() {
	    var applyShadowOptionsToSubMeshes, cast, i, j, k, loader, needs_rebuild, new_url, numItems, receive, ref, ref1, rotation;
	    needs_rebuild = false;
	    numItems = 0;
	    new_url = this.fields.getField('file_url').getValue();
	    cast = this.fields.getField('castShadow').getValue();
	    receive = this.fields.getField('receiveShadow').getValue();
	    if (new_url !== "" && this.file_url !== new_url) {
	      this.ob = [];
	      for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	        this.ob[i] = new THREE.Object3D();
	      }
	      loader = new THREE.ColladaLoader();
	      loader.options.convertUpAxis = true;
	      loader.load(new_url, (function(_this) {
	        return function(collada) {
	          var dae;
	          dae = collada.scene;
	          dae.updateMatrix();
	          _this.model_object = dae;
	          _this.onModelLoaded();
	          return applyShadowOptionsToSubMeshes(_this.model_object);
	        };
	      })(this));
	    }
	    applyShadowOptionsToSubMeshes = (function(_this) {
	      return function(obj) {
	        var child, k, len, rebuild_shader, ref1, results;
	        if (!obj) {
	          return false;
	        }
	        obj.castShadow = cast;
	        obj.receiveShadow = receive;
	        if (obj.material) {
	          rebuild_shader = false;
	          if (obj.material.castShadow !== cast || obj.material.receiveShadow !== receive) {
	            rebuild_shader = true;
	            obj.material.castShadow = cast;
	            obj.material.receiveShadow = receive;
	          }
	          if (rebuild_shader === true) {
	            obj.material.program = false;
	          }
	        }
	        if (obj.children && obj.children.length > 0) {
	          ref1 = obj.children;
	          results = [];
	          for (k = 0, len = ref1.length; k < len; k++) {
	            child = ref1[k];
	            results.push(applyShadowOptionsToSubMeshes(child));
	          }
	          return results;
	        }
	      };
	    })(this);
	    for (i = k = 0, ref1 = numItems; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
	      this.applyFieldsToVal(this.fields.inputs, this.ob[i], ['children', 'file_url', 'castShadow', 'receiveShadow', 'rotation'], i);
	      rotation = this.fields.getField('rotation').getValue(i);
	      this.applyRotation(this.ob[i], rotation);
	      this.ob[i].castShadow = cast;
	      this.ob[i].receiveShadow = receive;
	    }
	    if (this.model_object && this.inputValueHasChanged(this.vars_shadow_options, this.shadow_cache)) {
	      needs_rebuild = true;
	      applyShadowOptionsToSubMeshes(this.model_object);
	    }
	    if (needs_rebuild === true) {
	      this.trigger("RebuildAllShaders");
	    }
	    this.file_url = new_url;
	    this.shadow_cache = this.createCacheObject(this.vars_shadow_options);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return ColladaLoader;
	
	})(Object3D);
	
	ThreeNodes.Core.addNodeType('ColladaLoader', ColladaLoader);
	
	ThreeMesh = (function(superClass) {
	  extend(ThreeMesh, superClass);
	
	  function ThreeMesh() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return ThreeMesh.__super__.constructor.apply(this, arguments);
	  }
	
	  ThreeMesh.node_name = 'Mesh';
	
	  ThreeMesh.group_name = 'Three';
	
	  ThreeMesh.prototype.initialize = function(options) {
	    ThreeMesh.__super__.initialize.apply(this, arguments);
	    this.ob = [
	      new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
	        color: 0xff0000
	      }))
	    ];
	    this.last_slice_count = 1;
	    return this.compute();
	  };
	
	  ThreeMesh.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = ThreeMesh.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  ThreeMesh.prototype.remove = function() {
	    var item, j, len, ref;
	    if (this.ob) {
	      ref = this.ob;
	      for (j = 0, len = ref.length; j < len; j++) {
	        item = ref[j];
	        this.deleteObjectAttributes(item);
	        delete item.geometry;
	        delete item.material;
	      }
	    }
	    return ThreeMesh.__super__.remove.apply(this, arguments);
	  };
	
	  ThreeMesh.prototype.compute = function() {
	    var count_change, i, item, j, k, l, needs_rebuild, new_geometry_cache, new_material_cache, numItems, ref, ref1, ref2, ref3, rotation;
	    needs_rebuild = false;
	    count_change = false;
	    numItems = this.fields.getMaxInputSliceCount();
	    new_material_cache = this.get_material_cache();
	    new_geometry_cache = this.get_geometry_cache();
	    if (this.last_slice_count !== numItems) {
	      count_change = true;
	      if (this.ob == null) {
	        this.ob = [];
	      }
	      if (this.last_slice_count > numItems) {
	        this.ob = this.ob.slice(0, numItems);
	      } else {
	        for (i = j = ref = this.ob.length, ref1 = numItems; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
	          item = new THREE.Mesh(this.fields.getField('geometry').getValue(i), this.fields.getField('material').getValue(i));
	          this.ob[i] = item;
	        }
	      }
	    }
	    if (this.inputValueHasChanged(this.vars_shadow_options, this.shadow_cache)) {
	      needs_rebuild = true;
	    }
	    if (this.material_cache !== new_material_cache) {
	      this.rebuild_geometry();
	    }
	    if (this.geometry_cache !== new_geometry_cache || this.material_cache !== new_material_cache || needs_rebuild) {
	      this.ob = [];
	      for (i = k = 0, ref2 = numItems - 1; 0 <= ref2 ? k <= ref2 : k >= ref2; i = 0 <= ref2 ? ++k : --k) {
	        item = new THREE.Mesh(this.fields.getField('geometry').getValue(i), this.fields.getField('material').getValue(i));
	        this.ob[i] = item;
	      }
	    }
	    for (i = l = 0, ref3 = this.ob.length - 1; 0 <= ref3 ? l <= ref3 : l >= ref3; i = 0 <= ref3 ? ++l : --l) {
	      this.applyFieldsToVal(this.fields.inputs, this.ob[i], ['children', 'geometry', 'material', 'rotation'], i);
	      rotation = this.fields.getField('rotation').getValue(i);
	      this.applyRotation(this.ob[i], rotation);
	    }
	    if (needs_rebuild === true || count_change) {
	      this.trigger("RebuildAllShaders");
	    }
	    this.shadow_cache = this.createCacheObject(this.vars_shadow_options);
	    this.geometry_cache = this.get_geometry_cache();
	    this.material_cache = this.get_material_cache();
	    this.last_slice_count = numItems;
	    return this.fields.setField("out", this.ob);
	  };
	
	  return ThreeMesh;
	
	})(Object3DwithMeshAndMaterial);
	
	ThreeNodes.Core.addNodeType('ThreeMesh', ThreeMesh);
	
	ThreeLine = (function(superClass) {
	  extend(ThreeLine, superClass);
	
	  function ThreeLine() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return ThreeLine.__super__.constructor.apply(this, arguments);
	  }
	
	  ThreeLine.node_name = 'Line';
	
	  ThreeLine.group_name = 'Three';
	
	  ThreeLine.prototype.initialize = function(options) {
	    this.ob = [
	      new THREE.Line(new THREE.CubeGeometry(200, 200, 200), new THREE.LineBasicMaterial({
	        color: 0xffffff
	      }))
	    ];
	    this.last_slice_count = 1;
	    return this.compute();
	  };
	
	  ThreeLine.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = ThreeLine.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  ThreeLine.prototype.compute = function() {
	    var i, item, j, k, needs_rebuild, new_geometry_cache, new_material_cache, numItems, ref, ref1, rotation;
	    needs_rebuild = false;
	    numItems = this.fields.getMaxInputSliceCount();
	    new_material_cache = this.get_material_cache();
	    new_geometry_cache = this.get_geometry_cache();
	    if (this.last_slice_count !== numItems) {
	      needs_rebuild = true;
	      this.last_slice_count = numItems;
	    }
	    if (this.inputValueHasChanged(this.vars_shadow_options, this.shadow_cache)) {
	      needs_rebuild = true;
	    }
	    if (this.material_cache !== new_material_cache) {
	      this.rebuild_geometry();
	    }
	    if (this.geometry_cache !== new_geometry_cache || this.material_cache !== new_material_cache || needs_rebuild) {
	      this.ob = [];
	      for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	        item = new THREE.Line(this.fields.getField('geometry').getValue(i), this.fields.getField('material').getValue(i));
	        this.ob[i] = item;
	      }
	    }
	    for (i = k = 0, ref1 = numItems; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
	      this.applyFieldsToVal(this.fields.inputs, this.ob[i], ['children', 'geometry', 'material', 'rotation'], i);
	      rotation = this.fields.getField('rotation').getValue(i);
	      this.applyRotation(this.ob[i], rotation);
	    }
	    if (needs_rebuild === true) {
	      this.trigger("RebuildAllShaders");
	    }
	    this.shadow_cache = this.createCacheObject(this.vars_shadow_options);
	    this.geometry_cache = this.get_geometry_cache();
	    this.material_cache = this.get_material_cache();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return ThreeLine;
	
	})(Object3DwithMeshAndMaterial);
	
	ThreeNodes.Core.addNodeType('ThreeLine', ThreeLine);
	
	Camera = (function(superClass) {
	  extend(Camera, superClass);
	
	  function Camera() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.deleteObjectAttributes = bind(this.deleteObjectAttributes, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Camera.__super__.constructor.apply(this, arguments);
	  }
	
	  Camera.node_name = 'Camera';
	
	  Camera.group_name = 'Three';
	
	  Camera.prototype.initialize = function(options) {
	    Camera.__super__.initialize.apply(this, arguments);
	    return this.ob = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000);
	  };
	
	  Camera.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Camera.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Camera.prototype.deleteObjectAttributes = function(ob) {
	    if (ob) {
	      delete ob.up;
	      delete ob.position;
	      delete ob.rotation;
	      delete ob.scale;
	      delete ob.matrix;
	      delete ob.matrixWorld;
	      delete ob.matrixRotationWorld;
	      delete ob.quaternion;
	      return delete ob._vector;
	    }
	  };
	
	  Camera.prototype.remove = function() {
	    this.deleteObjectAttributes(this.ob);
	    delete this.ob;
	    return Camera.__super__.remove.apply(this, arguments);
	  };
	
	  Camera.prototype.compute = function() {
	    this.applyFieldsToVal(this.fields.inputs, this.ob, ['target']);
	    this.ob.lookAt(this.fields.getField("target").getValue());
	    return this.fields.setField("out", this.ob);
	  };
	
	  return Camera;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Camera', Camera);
	
	Texture = (function(superClass) {
	  extend(Texture, superClass);
	
	  function Texture() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Texture.__super__.constructor.apply(this, arguments);
	  }
	
	  Texture.node_name = 'Texture';
	
	  Texture.group_name = 'Three';
	
	  Texture.prototype.initialize = function(options) {
	    Texture.__super__.initialize.apply(this, arguments);
	    this.ob = false;
	    return this.cached = false;
	  };
	
	  Texture.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Texture.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Texture.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return Texture.__super__.remove.apply(this, arguments);
	  };
	
	  Texture.prototype.compute = function() {
	    var current;
	    current = this.fields.getField("image").getValue();
	    if (current && current !== "") {
	      if (this.cached === false || ($.type(this.cached) === "object" && this.cached.constructor === THREE.Texture && this.cached.image.attributes[0].nodeValue !== current)) {
	        this.ob = new THREE.ImageUtils.loadTexture(current);
	        console.log("new texture");
	        console.log(this.ob);
	        this.cached = this.ob;
	      }
	    }
	    return this.fields.setField("out", this.ob);
	  };
	
	  return Texture;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Texture', Texture);
	
	Fog = (function(superClass) {
	  extend(Fog, superClass);
	
	  function Fog() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Fog.__super__.constructor.apply(this, arguments);
	  }
	
	  Fog.node_name = 'Fog';
	
	  Fog.group_name = 'Three';
	
	  Fog.prototype.initialize = function(options) {
	    Fog.__super__.initialize.apply(this, arguments);
	    return this.ob = false;
	  };
	
	  Fog.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Fog.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Fog.prototype.remove = function() {
	    delete this.ob;
	    return Fog.__super__.remove.apply(this, arguments);
	  };
	
	  Fog.prototype.compute = function() {
	    if (this.ob === false) {
	      this.ob = new THREE.Fog(0xffffff, 1, 1000);
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return Fog;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Fog', Fog);
	
	FogExp2 = (function(superClass) {
	  extend(FogExp2, superClass);
	
	  function FogExp2() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return FogExp2.__super__.constructor.apply(this, arguments);
	  }
	
	  FogExp2.node_name = 'FogExp2';
	
	  FogExp2.group_name = 'Three';
	
	  FogExp2.prototype.initialize = function(options) {
	    FogExp2.__super__.initialize.apply(this, arguments);
	    return this.ob = false;
	  };
	
	  FogExp2.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = FogExp2.__super__.getFields.apply(this, arguments);
	    fields = {
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  FogExp2.prototype.remove = function() {
	    delete this.ob;
	    return FogExp2.__super__.remove.apply(this, arguments);
	  };
	
	  FogExp2.prototype.compute = function() {
	    if (this.ob === false) {
	      this.ob = new THREE.FogExp2(0xffffff, 0.00025);
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob);
	    return this.fields.setField("out", this.ob);
	  };
	
	  return FogExp2;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('FogExp2', FogExp2);
	
	WebGLRenderer = (function(superClass) {
	  extend(WebGLRenderer, superClass);
	
	  function WebGLRenderer() {
	    this.compute = bind(this.compute, this);
	    this.apply_post_fx = bind(this.apply_post_fx, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return WebGLRenderer.__super__.constructor.apply(this, arguments);
	  }
	
	  WebGLRenderer.node_name = 'WebGLRenderer';
	
	  WebGLRenderer.group_name = 'Three';
	
	  WebGLRenderer.prototype.initialize = function(options) {
	    WebGLRenderer.__super__.initialize.apply(this, arguments);
	    if (!WebglBase.instance) {
	      this.webgl = new WebglBase();
	    } else {
	      this.webgl = WebglBase.instance;
	    }
	    this.auto_evaluate = true;
	    this.ob = WebglBase.current_renderer;
	    this.width = 0;
	    return this.height = 0;
	  };
	
	  WebGLRenderer.prototype.getFields = function() {
	    var base_fields, camera, fields;
	    camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000);
	    camera.position.z = 1000;
	    base_fields = WebGLRenderer.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "width": 800,
	        "height": 600,
	        "scene": {
	          type: "Scene",
	          val: new THREE.Scene()
	        },
	        "camera": {
	          type: "Camera",
	          val: camera
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  WebGLRenderer.prototype.remove = function() {
	    if (WebglBase.current_camera === this.fields.getField("camera").getValue()) {
	      WebglBase.current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000);
	      WebglBase.renderModel.camera = WebglBase.current_camera;
	    }
	    if (WebglBase.current_scene === this.fields.getField("scene").getValue()) {
	      WebglBase.current_scene = new THREE.Scene();
	      WebglBase.renderModel.scene = WebglBase.current_scene;
	    }
	    $(this.ob.domElement).unbind();
	    delete this.ob;
	    delete this.width;
	    delete this.height;
	    return WebGLRenderer.__super__.remove.apply(this, arguments);
	  };
	
	  WebGLRenderer.prototype.apply_post_fx = function() {
	    var fxs;
	    fxs = this.fields.getField("postfx").getValue().slice(0);
	    fxs.unshift(WebglBase.renderModel);
	    fxs.push(WebglBase.effectScreen);
	    return WebglBase.composer.passes = fxs;
	  };
	
	  WebGLRenderer.prototype.compute = function() {
	    if (!WebglBase.current_renderer) {
	      return;
	    }
	    this.trigger("on_compute");
	    this.applyFieldsToVal(this.fields.inputs, this.ob, ['width', 'height', 'scene', 'camera', 'bg_color', 'postfx']);
	    WebglBase.current_camera = this.fields.getField("camera").getValue();
	    WebglBase.current_scene = this.fields.getField("scene").getValue();
	    this.fields.getField("camera").getValue().aspect = this.width / this.height;
	    this.fields.getField("camera").getValue().updateProjectionMatrix();
	    this.apply_post_fx();
	    this.ob.clear();
	    WebglBase.renderModel.scene = WebglBase.current_scene;
	    WebglBase.renderModel.camera = WebglBase.current_camera;
	    WebglBase.composer.renderer = WebglBase.current_renderer;
	    return WebglBase.composer.render(0.05);
	  };
	
	  return WebGLRenderer;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('WebGLRenderer', WebGLRenderer);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CsgIntersect, CsgSubtract, CsgUnion, Node, NodeCSG, Utils, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	Node = __webpack_require__(35);
	
	__webpack_require__(33);
	
	__webpack_require__(52);
	
	__webpack_require__(53);
	
	NodeCSG = (function(superClass) {
	  extend(NodeCSG, superClass);
	
	  function NodeCSG() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.comput_csg_geometry = bind(this.comput_csg_geometry, this);
	    this.getFields = bind(this.getFields, this);
	    NodeCSG.__super__.constructor.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.ob = false;
	    this.cached = [];
	  }
	
	  NodeCSG.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = NodeCSG.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "a": {
	          type: "Any",
	          val: false
	        },
	        "position_a": {
	          type: "Vector3",
	          val: new THREE.Vector3()
	        },
	        "rotation_a": {
	          type: "Vector3",
	          val: new THREE.Vector3()
	        },
	        "b": {
	          type: "Any",
	          val: false
	        },
	        "position_b": {
	          type: "Vector3",
	          val: new THREE.Vector3()
	        },
	        "rotation_b": {
	          type: "Vector3",
	          val: new THREE.Vector3()
	        }
	      },
	      outputs: {
	        "geometry": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  NodeCSG.prototype.comput_csg_geometry = function(a, b) {
	    return a.union(b);
	  };
	
	  NodeCSG.prototype.get_cache_array = function() {
	    var a, b, pos_a, pos_b, rot_a, rot_b;
	    a = this.fields.getField("a").getValue();
	    pos_a = this.fields.getField("position_a").getValue();
	    rot_a = this.fields.getField("rotation_a").getValue();
	    b = this.fields.getField("b").getValue();
	    pos_b = this.fields.getField("position_b").getValue();
	    rot_b = this.fields.getField("rotation_b").getValue();
	    if (!a || !b) {
	      return [];
	    }
	    return [a.id, b.id, pos_a.x, pos_a.y, pos_a.z, rot_a.x, rot_a.y, rot_a.z, pos_b.x, pos_b.y, pos_b.z, rot_b.x, rot_b.y, rot_b.z];
	  };
	
	  NodeCSG.prototype.remove = function() {
	    delete this.ob;
	    delete this.cached;
	    return NodeCSG.__super__.remove.apply(this, arguments);
	  };
	
	  NodeCSG.prototype.compute = function() {
	    var a, b, csg_a, csg_b, csg_geom, new_cache, pos_a, pos_b, rot_a, rot_b;
	    a = this.fields.getField("a").getValue();
	    pos_a = this.fields.getField("position_a").getValue();
	    rot_a = this.fields.getField("rotation_a").getValue();
	    b = this.fields.getField("b").getValue();
	    pos_b = this.fields.getField("position_b").getValue();
	    rot_b = this.fields.getField("rotation_b").getValue();
	    new_cache = this.get_cache_array();
	    if ((a && b) && (Utils.flatArraysAreEquals(new_cache, this.cached) === false)) {
	      console.log("csg operation");
	      csg_a = THREE.CSG.toCSG(a, pos_a, rot_a);
	      csg_b = THREE.CSG.toCSG(b, pos_b, rot_b);
	      csg_geom = this.comput_csg_geometry(csg_a, csg_b);
	      this.ob = THREE.CSG.fromCSG(csg_geom);
	      this.cached = new_cache;
	    }
	    return this.fields.setField("geometry", this.ob);
	  };
	
	  return NodeCSG;
	
	})(Node);
	
	CsgUnion = (function(superClass) {
	  extend(CsgUnion, superClass);
	
	  function CsgUnion() {
	    return CsgUnion.__super__.constructor.apply(this, arguments);
	  }
	
	  CsgUnion.node_name = 'Union';
	
	  CsgUnion.group_name = 'Constructive-Geometry';
	
	  return CsgUnion;
	
	})(NodeCSG);
	
	ThreeNodes.Core.addNodeType('CsgUnion', CsgUnion);
	
	CsgSubtract = (function(superClass) {
	  extend(CsgSubtract, superClass);
	
	  function CsgSubtract() {
	    this.comput_csg_geometry = bind(this.comput_csg_geometry, this);
	    return CsgSubtract.__super__.constructor.apply(this, arguments);
	  }
	
	  CsgSubtract.node_name = 'Subtract';
	
	  CsgSubtract.group_name = 'Constructive-Geometry';
	
	  CsgSubtract.prototype.comput_csg_geometry = function(a, b) {
	    return a.subtract(b);
	  };
	
	  return CsgSubtract;
	
	})(NodeCSG);
	
	ThreeNodes.Core.addNodeType('CsgSubtract', CsgSubtract);
	
	CsgIntersect = (function(superClass) {
	  extend(CsgIntersect, superClass);
	
	  function CsgIntersect() {
	    this.comput_csg_geometry = bind(this.comput_csg_geometry, this);
	    return CsgIntersect.__super__.constructor.apply(this, arguments);
	  }
	
	  CsgIntersect.node_name = 'Intersect';
	
	  CsgIntersect.group_name = 'Constructive-Geometry';
	
	  CsgIntersect.prototype.comput_csg_geometry = function(a, b) {
	    return a.intersect(b);
	  };
	
	  return CsgIntersect;
	
	})(NodeCSG);
	
	ThreeNodes.Core.addNodeType('CsgIntersect', CsgIntersect);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Node, NodeMaterialBase, Object3D, ParticleBasicMaterial, ParticlePool, ParticleSystem, RandomCloudGeometry, SparksAccelerate, SparksAccelerateFactor, SparksAccelerateVelocity, SparksAge, SparksCubeZone, SparksEmitter, SparksLifetime, SparksLineZone, SparksMove, SparksPointZone, SparksPosition, SparksRandomDrift, SparksSteadyCounter, Utils, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	Node = __webpack_require__(35);
	
	Object3D = __webpack_require__(41);
	
	NodeMaterialBase = __webpack_require__(40);
	
	__webpack_require__(27);
	
	__webpack_require__(25);
	
	__webpack_require__(54);
	
	__webpack_require__(55);
	
	ParticleSystem = (function(superClass) {
	  extend(ParticleSystem, superClass);
	
	  function ParticleSystem() {
	    this.compute = bind(this.compute, this);
	    this.rebuild_geometry = bind(this.rebuild_geometry, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return ParticleSystem.__super__.constructor.apply(this, arguments);
	  }
	
	  ParticleSystem.node_name = 'ParticleSystem';
	
	  ParticleSystem.group_name = 'Particle';
	
	  ParticleSystem.prototype.initialize = function() {
	    ParticleSystem.__super__.initialize.apply(this, arguments);
	    this.ob = new THREE.ParticleSystem(new THREE.CubeGeometry(200, 200, 200), new THREE.ParticleBasicMaterial());
	    this.ob.dynamic = true;
	    this.geometry_cache = false;
	    this.material_cache = false;
	    return this.compute();
	  };
	
	  ParticleSystem.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = ParticleSystem.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "geometry": {
	          type: "Any",
	          val: new THREE.CubeGeometry(200, 200, 200)
	        },
	        "material": {
	          type: "Any",
	          val: new THREE.ParticleBasicMaterial()
	        },
	        "sortParticles": false
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  ParticleSystem.prototype.remove = function() {
	    ParticleSystem.__super__.remove.apply(this, arguments);
	    delete this.geometry_cache;
	    return delete this.material_cache;
	  };
	
	  ParticleSystem.prototype.rebuild_geometry = function() {
	    var field, geom;
	    field = this.fields.getField('geometry');
	    if (field.connections.length > 0) {
	      geom = field.connections[0].from_field.node;
	      geom.cached = [];
	      return geom.compute();
	    } else {
	      return this.fields.getField('geometry').setValue(new THREE.CubeGeometry(200, 200, 200));
	    }
	  };
	
	  ParticleSystem.prototype.compute = function() {
	    var needs_rebuild;
	    needs_rebuild = false;
	    if (this.material_cache !== this.fields.getField('material').getValue().id) {
	      this.rebuild_geometry();
	    }
	    if (this.geometry_cache !== this.fields.getField('geometry').getValue().id || this.material_cache !== this.fields.getField('material').getValue().id || needs_rebuild) {
	      this.ob = new THREE.ParticleSystem(this.fields.getField('geometry').getValue(), this.fields.getField('material').getValue());
	      this.geometry_cache = this.fields.getField('geometry').getValue().id;
	      this.material_cache = this.fields.getField('material').getValue().id;
	    }
	    this.applyFieldsToVal(this.fields.inputs, this.ob, ['children', 'geometry', 'material']);
	    if (needs_rebuild === true) {
	      this.trigger("RebuildAllShaders");
	    }
	    return this.fields.setField("out", this.ob);
	  };
	
	  return ParticleSystem;
	
	})(Object3D);
	
	ThreeNodes.Core.addNodeType('ParticleSystem', ParticleSystem);
	
	ParticleBasicMaterial = (function(superClass) {
	  extend(ParticleBasicMaterial, superClass);
	
	  function ParticleBasicMaterial() {
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return ParticleBasicMaterial.__super__.constructor.apply(this, arguments);
	  }
	
	  ParticleBasicMaterial.node_name = 'ParticleBasicMaterial';
	
	  ParticleBasicMaterial.group_name = 'Materials';
	
	  ParticleBasicMaterial.prototype.initialize = function(options) {
	    ParticleBasicMaterial.__super__.initialize.apply(this, arguments);
	    this.ob = [];
	    this.material_class = THREE.ParticleBasicMaterial;
	    this.vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"];
	    return this.material_cache = this.createCacheObject(this.vars_rebuild_shader_on_change);
	  };
	
	  ParticleBasicMaterial.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = ParticleBasicMaterial.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "color": {
	          type: "Color",
	          val: new THREE.Color(0xff0000)
	        },
	        "map": {
	          type: "Any",
	          val: false
	        },
	        "size": 1,
	        "sizeAttenuation": true,
	        "vertexColors": false
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  return ParticleBasicMaterial;
	
	})(NodeMaterialBase);
	
	ThreeNodes.Core.addNodeType('ParticleBasicMaterial', ParticleBasicMaterial);
	
	SparksEmitter = (function(superClass) {
	  extend(SparksEmitter, superClass);
	
	  function SparksEmitter() {
	    this.remove = bind(this.remove, this);
	    this.compute = bind(this.compute, this);
	    this.setTargetParticle = bind(this.setTargetParticle, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksEmitter.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksEmitter.node_name = 'Emitter';
	
	  SparksEmitter.group_name = 'Particle.sparks';
	
	  SparksEmitter.prototype.initialize = function(options) {
	    SparksEmitter.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.geom = new THREE.Geometry();
	    this.target_initializer = new SPARKS.Target(null, this.setTargetParticle);
	    this.pool = this.fields.getField("pool").getValue();
	    return this.ob = new SPARKS.Emitter(this.fields.getField("counter").getValue());
	  };
	
	  SparksEmitter.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksEmitter.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "counter": {
	          type: "Any",
	          val: new SPARKS.SteadyCounter(50)
	        },
	        "pool": {
	          type: "Any",
	          val: false
	        },
	        "initializers": {
	          type: "Array",
	          val: []
	        },
	        "actions": {
	          type: "Array",
	          val: []
	        }
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksEmitter.prototype.setTargetParticle = function(p) {
	    if (this.pool && this.pool.pool) {
	      return this.pool.pool.get();
	    }
	  };
	
	  SparksEmitter.prototype.compute = function() {
	    var initializers;
	    if (this.fields.getField("pool").getValue() !== false) {
	      if (this.pool !== this.fields.getField("pool").getValue()) {
	        this.ob.removeCallback("created");
	        this.ob.removeCallback("dead");
	        this.ob.stop();
	        this.ob = new SPARKS.Emitter(this.fields.getField("counter").getValue());
	        this.geom = new THREE.Geometry();
	        this.pool = this.fields.getField("pool").getValue();
	        this.pool.init_pool(this.geom);
	        this.ob.addCallback("created", this.pool.on_particle_created);
	        this.ob.addCallback("dead", this.pool.on_particle_dead);
	        console.log("pool particle setup...");
	      }
	    }
	    initializers = this.fields.getField("initializers").getValue().slice(0);
	    initializers.push(this.target_initializer);
	    this.ob._initializers = initializers;
	    this.ob._actions = this.fields.getField("actions").getValue();
	    this.ob._counter = this.fields.getField("counter").getValue();
	    if (this.pool !== false && this.ob.isRunning() === false) {
	      this.ob.start();
	    }
	    return this.fields.setField("out", this.geom);
	  };
	
	  SparksEmitter.prototype.remove = function() {
	    SparksEmitter.__super__.remove.apply(this, arguments);
	    if (this.ob) {
	      this.ob.removeCallback("created");
	      this.ob.removeCallback("dead");
	      this.ob.stop();
	    }
	    delete this.ob;
	    delete this.target_initializer;
	    delete this.geom;
	    return delete this.pool;
	  };
	
	  return SparksEmitter;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksEmitter', SparksEmitter);
	
	SparksAge = (function(superClass) {
	  extend(SparksAge, superClass);
	
	  function SparksAge() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksAge.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksAge.node_name = 'Age';
	
	  SparksAge.group_name = 'Particle.sparks.actions';
	
	  SparksAge.prototype.initialize = function(options) {
	    SparksAge.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.Age(TWEEN.Easing.Linear.EaseNone);
	  };
	
	  SparksAge.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksAge.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "easing": {
	          type: "Any",
	          val: TWEEN.Easing.Linear.EaseNone
	        }
	      },
	      outputs: {
	        "action": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksAge.prototype.remove = function() {
	    delete this.ob;
	    return SparksAge.__super__.remove.apply(this, arguments);
	  };
	
	  SparksAge.prototype.compute = function() {
	    this.ob._easing = this.fields.getField("easing").get("value");
	    return this.fields.setField("action", this.ob);
	  };
	
	  return SparksAge;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksAge', SparksAge);
	
	SparksMove = (function(superClass) {
	  extend(SparksMove, superClass);
	
	  function SparksMove() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksMove.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksMove.node_name = 'Move';
	
	  SparksMove.group_name = 'Particle.sparks.actions';
	
	  SparksMove.prototype.initialize = function(options) {
	    SparksMove.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.Move();
	  };
	
	  SparksMove.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksMove.__super__.getFields.apply(this, arguments);
	    fields = {
	      outputs: {
	        "action": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksMove.prototype.remove = function() {
	    delete this.ob;
	    return SparksMove.__super__.remove.apply(this, arguments);
	  };
	
	  SparksMove.prototype.compute = function() {
	    return this.fields.setField("action", this.ob);
	  };
	
	  return SparksMove;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksMove', SparksMove);
	
	SparksAccelerate = (function(superClass) {
	  extend(SparksAccelerate, superClass);
	
	  function SparksAccelerate() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksAccelerate.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksAccelerate.node_name = 'Accelerate';
	
	  SparksAccelerate.group_name = 'Particle.sparks.actions';
	
	  SparksAccelerate.prototype.initialize = function(options) {
	    SparksAccelerate.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.Accelerate(new THREE.Vector3(0, 1, 0));
	  };
	
	  SparksAccelerate.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksAccelerate.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "vector": {
	          type: "Vector3",
	          val: new THREE.Vector3(0, 1, 0)
	        }
	      },
	      outputs: {
	        "action": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksAccelerate.prototype.remove = function() {
	    delete this.ob;
	    return SparksAccelerate.__super__.remove.apply(this, arguments);
	  };
	
	  SparksAccelerate.prototype.compute = function() {
	    this.ob.acceleration = this.fields.getField("vector").getValue();
	    return this.fields.setField("action", this.ob);
	  };
	
	  return SparksAccelerate;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksAccelerate', SparksAccelerate);
	
	SparksAccelerateFactor = (function(superClass) {
	  extend(SparksAccelerateFactor, superClass);
	
	  function SparksAccelerateFactor() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksAccelerateFactor.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksAccelerateFactor.node_name = 'AccelerateFactor';
	
	  SparksAccelerateFactor.group_name = 'Particle.sparks.actions';
	
	  SparksAccelerateFactor.prototype.initialize = function(options) {
	    SparksAccelerateFactor.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.AccelerateFactor(2.0);
	  };
	
	  SparksAccelerateFactor.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksAccelerateFactor.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "factor": 2.0
	      },
	      outputs: {
	        "action": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksAccelerateFactor.prototype.remove = function() {
	    delete this.ob;
	    return SparksAccelerateFactor.__super__.remove.apply(this, arguments);
	  };
	
	  SparksAccelerateFactor.prototype.compute = function() {
	    this.ob.factor = this.fields.getField("factor").getValue();
	    return this.fields.setField("action", this.ob);
	  };
	
	  return SparksAccelerateFactor;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksAccelerateFactor', SparksAccelerateFactor);
	
	SparksAccelerateVelocity = (function(superClass) {
	  extend(SparksAccelerateVelocity, superClass);
	
	  function SparksAccelerateVelocity() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksAccelerateVelocity.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksAccelerateVelocity.node_name = 'AccelerateVelocity';
	
	  SparksAccelerateVelocity.group_name = 'Particle.sparks.actions';
	
	  SparksAccelerateVelocity.prototype.initialize = function(options) {
	    SparksAccelerateVelocity.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.AccelerateVelocity(2.0);
	  };
	
	  SparksAccelerateVelocity.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksAccelerateVelocity.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "factor": 2.0
	      },
	      outputs: {
	        "action": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksAccelerateVelocity.prototype.remove = function() {
	    delete this.ob;
	    return SparksAccelerateVelocity.__super__.remove.apply(this, arguments);
	  };
	
	  SparksAccelerateVelocity.prototype.compute = function() {
	    this.ob.factor = this.fields.getField("factor").getValue();
	    return this.fields.setField("action", this.ob);
	  };
	
	  return SparksAccelerateVelocity;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksAccelerateVelocity', SparksAccelerateVelocity);
	
	SparksRandomDrift = (function(superClass) {
	  extend(SparksRandomDrift, superClass);
	
	  function SparksRandomDrift() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksRandomDrift.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksRandomDrift.node_name = 'RandomDrift';
	
	  SparksRandomDrift.group_name = 'Particle.sparks.actions';
	
	  SparksRandomDrift.prototype.initialize = function(options) {
	    SparksRandomDrift.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.RandomDrift(new THREE.Vector3(0, 1, 0));
	  };
	
	  SparksRandomDrift.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksRandomDrift.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "vector": {
	          type: "Vector3",
	          val: new THREE.Vector3(0, 1, 0)
	        }
	      },
	      outputs: {
	        "action": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksRandomDrift.prototype.remove = function() {
	    delete this.ob;
	    return SparksRandomDrift.__super__.remove.apply(this, arguments);
	  };
	
	  SparksRandomDrift.prototype.compute = function() {
	    this.ob.drift = this.fields.getField("vector").getValue();
	    return this.fields.setField("action", this.ob);
	  };
	
	  return SparksRandomDrift;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksRandomDrift', SparksRandomDrift);
	
	SparksLifetime = (function(superClass) {
	  extend(SparksLifetime, superClass);
	
	  function SparksLifetime() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksLifetime.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksLifetime.node_name = 'Lifetime';
	
	  SparksLifetime.group_name = 'Particle.sparks.initializers';
	
	  SparksLifetime.prototype.initialize = function(options) {
	    SparksLifetime.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.Lifetime(4, 7);
	  };
	
	  SparksLifetime.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksLifetime.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "min": 4,
	        "max": 7
	      },
	      outputs: {
	        "initializer": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksLifetime.prototype.remove = function() {
	    delete this.ob;
	    return SparksLifetime.__super__.remove.apply(this, arguments);
	  };
	
	  SparksLifetime.prototype.compute = function() {
	    this.ob._min = this.fields.getField("min").getValue();
	    this.ob._min = this.fields.getField("max").getValue();
	    return this.fields.setField("initializer", this.ob);
	  };
	
	  return SparksLifetime;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksLifetime', SparksLifetime);
	
	SparksPosition = (function(superClass) {
	  extend(SparksPosition, superClass);
	
	  function SparksPosition() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksPosition.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksPosition.node_name = 'Position';
	
	  SparksPosition.group_name = 'Particle.sparks.initializers';
	
	  SparksPosition.prototype.initialize = function(options) {
	    SparksPosition.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.Position(new SPARKS.PointZone(new THREE.Vector3(0, 0, 0)));
	  };
	
	  SparksPosition.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksPosition.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "zone": {
	          type: "Any",
	          val: new SPARKS.PointZone(new THREE.Vector3(0, 0, 0))
	        }
	      },
	      outputs: {
	        "initializer": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksPosition.prototype.remove = function() {
	    delete this.ob;
	    return SparksPosition.__super__.remove.apply(this, arguments);
	  };
	
	  SparksPosition.prototype.compute = function() {
	    this.ob.zone = this.fields.getField("zone").getValue();
	    return this.fields.setField("initializer", this.ob);
	  };
	
	  return SparksPosition;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksPosition', SparksPosition);
	
	SparksPointZone = (function(superClass) {
	  extend(SparksPointZone, superClass);
	
	  function SparksPointZone() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksPointZone.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksPointZone.node_name = 'PointZone';
	
	  SparksPointZone.group_name = 'Particle.sparks.zone';
	
	  SparksPointZone.prototype.initialize = function(options) {
	    SparksPointZone.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.PointZone(new THREE.Vector3());
	  };
	
	  SparksPointZone.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksPointZone.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "pos": {
	          type: "Vector3",
	          val: new THREE.Vector3()
	        }
	      },
	      outputs: {
	        "zone": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksPointZone.prototype.remove = function() {
	    delete this.ob;
	    return SparksPointZone.__super__.remove.apply(this, arguments);
	  };
	
	  SparksPointZone.prototype.compute = function() {
	    this.ob.pos = this.fields.getField("pos").getValue();
	    return this.fields.setField("zone", this.ob);
	  };
	
	  return SparksPointZone;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksPointZone', SparksPointZone);
	
	SparksLineZone = (function(superClass) {
	  extend(SparksLineZone, superClass);
	
	  function SparksLineZone() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksLineZone.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksLineZone.node_name = 'LineZone';
	
	  SparksLineZone.group_name = 'Particle.sparks.zone';
	
	  SparksLineZone.prototype.initialize = function(options) {
	    SparksLineZone.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.LineZone(new THREE.Vector3(), new THREE.Vector3(100, 0, 0));
	  };
	
	  SparksLineZone.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksLineZone.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "start": {
	          type: "Vector3",
	          val: new THREE.Vector3()
	        },
	        "end": {
	          type: "Vector3",
	          val: new THREE.Vector3(100, 0, 0)
	        }
	      },
	      outputs: {
	        "zone": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksLineZone.prototype.remove = function() {
	    delete this.ob;
	    return SparksLineZone.__super__.remove.apply(this, arguments);
	  };
	
	  SparksLineZone.prototype.compute = function() {
	    if (this.ob.start !== this.fields.get("start").getValue() || this.ob.end !== this.fields.get("end").getValue()) {
	      this.ob.start = this.fields.getField("start").getValue();
	      this.ob.end = this.fields.getField("end").getValue();
	      this.ob._length = this.ob.end.clone().subSelf(this.ob.start);
	    }
	    return this.fields.setField("zone", this.ob);
	  };
	
	  return SparksLineZone;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksLineZone', SparksLineZone);
	
	SparksCubeZone = (function(superClass) {
	  extend(SparksCubeZone, superClass);
	
	  function SparksCubeZone() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksCubeZone.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksCubeZone.node_name = 'CubeZone';
	
	  SparksCubeZone.group_name = 'Particle.sparks.zone';
	
	  SparksCubeZone.prototype.initialize = function(options) {
	    SparksCubeZone.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.CubeZone(new THREE.Vector3(), 0, 0, 0);
	  };
	
	  SparksCubeZone.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksCubeZone.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "position": {
	          type: "Vector3",
	          val: new THREE.Vector3()
	        },
	        "x": 0,
	        "y": 0,
	        "z": 0
	      },
	      outputs: {
	        "zone": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksCubeZone.prototype.remove = function() {
	    delete this.ob;
	    return SparksCubeZone.__super__.remove.apply(this, arguments);
	  };
	
	  SparksCubeZone.prototype.compute = function() {
	    this.ob.position = this.fields.getField("position").getValue();
	    this.ob.x = this.fields.getField("x").getValue();
	    this.ob.y = this.fields.getField("y").getValue();
	    this.ob.z = this.fields.getField("z").getValue();
	    return this.fields.setField("zone", this.ob);
	  };
	
	  return SparksCubeZone;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksCubeZone', SparksCubeZone);
	
	SparksSteadyCounter = (function(superClass) {
	  extend(SparksSteadyCounter, superClass);
	
	  function SparksSteadyCounter() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return SparksSteadyCounter.__super__.constructor.apply(this, arguments);
	  }
	
	  SparksSteadyCounter.node_name = 'SteadyCounter';
	
	  SparksSteadyCounter.group_name = 'Particle.sparks';
	
	  SparksSteadyCounter.prototype.initialize = function(options) {
	    SparksSteadyCounter.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.ob = new SPARKS.SteadyCounter(100);
	  };
	
	  SparksSteadyCounter.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = SparksSteadyCounter.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "rate": 100
	      },
	      outputs: {
	        "counter": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  SparksSteadyCounter.prototype.remove = function() {
	    delete this.ob;
	    return SparksSteadyCounter.__super__.remove.apply(this, arguments);
	  };
	
	  SparksSteadyCounter.prototype.compute = function() {
	    this.ob.pos = this.fields.getField("rate").getValue();
	    return this.fields.setField("counter", this.ob);
	  };
	
	  return SparksSteadyCounter;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('SparksSteadyCounter', SparksSteadyCounter);
	
	ParticlePool = (function(superClass) {
	  extend(ParticlePool, superClass);
	
	  function ParticlePool() {
	    this.compute = bind(this.compute, this);
	    this.on_particle_dead = bind(this.on_particle_dead, this);
	    this.on_particle_updated = bind(this.on_particle_updated, this);
	    this.on_particle_created = bind(this.on_particle_created, this);
	    this.init_pool = bind(this.init_pool, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return ParticlePool.__super__.constructor.apply(this, arguments);
	  }
	
	  ParticlePool.node_name = 'ParticlePool';
	
	  ParticlePool.group_name = 'Particle.sparks';
	
	  ParticlePool.prototype.initialize = function(options) {
	    ParticlePool.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    return this.geom = false;
	  };
	
	  ParticlePool.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = ParticlePool.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "maxParticles": 10000
	      },
	      outputs: {
	        "pool": {
	          type: "Any",
	          val: this
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  ParticlePool.prototype.remove = function() {
	    delete this.pool;
	    delete this.geom;
	    return ParticlePool.__super__.remove.apply(this, arguments);
	  };
	
	  ParticlePool.prototype.init_pool = function(geom) {
	    var i, j, new_pos, pos, ref, results;
	    this.geom = geom;
	    this.pool = {
	      pools: [],
	      get: function() {
	        if (this.pools.length > 0) {
	          return this.pools.pop();
	        }
	        return null;
	      },
	      add: function(v) {
	        return this.pools.push(v);
	      }
	    };
	    new_pos = function() {
	      return new THREE.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	    };
	    results = [];
	    for (i = j = 0, ref = this.fields.getField("maxParticles").getValue() - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      pos = new_pos();
	      geom.vertices.push(pos);
	      results.push(this.pool.add(pos));
	    }
	    return results;
	  };
	
	  ParticlePool.prototype.on_particle_created = function(particle) {
	    var target;
	    if (this.geom === false) {
	      return false;
	    }
	    target = particle.target;
	    if (target) {
	      return particle.target.position = particle.position;
	    }
	  };
	
	  ParticlePool.prototype.on_particle_updated = function(particle) {
	    return true;
	  };
	
	  ParticlePool.prototype.on_particle_dead = function(particle) {
	    var target;
	    if (this.geom === false) {
	      return false;
	    }
	    target = particle.target;
	    if (target) {
	      particle.target.position.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	      return this.pool.add(particle.target);
	    }
	  };
	
	  ParticlePool.prototype.compute = function() {
	    if (this.geom !== false) {
	      this.geom.verticesNeedUpdate = true;
	    }
	    return this.fields.setField("pool", this);
	  };
	
	  return ParticlePool;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('ParticlePool', ParticlePool);
	
	RandomCloudGeometry = (function(superClass) {
	  extend(RandomCloudGeometry, superClass);
	
	  function RandomCloudGeometry() {
	    this.compute = bind(this.compute, this);
	    this.generate = bind(this.generate, this);
	    this.move_particles = bind(this.move_particles, this);
	    this.limit_position = bind(this.limit_position, this);
	    this.get_cache_array = bind(this.get_cache_array, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return RandomCloudGeometry.__super__.constructor.apply(this, arguments);
	  }
	
	  RandomCloudGeometry.node_name = 'RandomCloudGeometry';
	
	  RandomCloudGeometry.group_name = 'Particle';
	
	  RandomCloudGeometry.prototype.initialize = function(options) {
	    RandomCloudGeometry.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.ob = new THREE.Geometry();
	    this.cache = this.get_cache_array();
	    return this.generate();
	  };
	
	  RandomCloudGeometry.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = RandomCloudGeometry.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "nbrParticles": 20000,
	        "radius": 2000,
	        "rndVelocity": {
	          type: "Vector3",
	          val: new THREE.Vector3(1, 1, 1)
	        },
	        "linearVelocity": {
	          type: "Vector3",
	          val: new THREE.Vector3(1, 1, 1)
	        }
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.ob
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  RandomCloudGeometry.prototype.remove = function() {
	    delete this.ob;
	    delete this.cache;
	    return RandomCloudGeometry.__super__.remove.apply(this, arguments);
	  };
	
	  RandomCloudGeometry.prototype.get_cache_array = function() {
	    return [this.fields.getField("radius").getValue(), this.fields.getField("nbrParticles").getValue(), this.fields.getField("linearVelocity").getValue()];
	  };
	
	  RandomCloudGeometry.prototype.limit_position = function(pos) {
	    var margin, radius;
	    radius = this.fields.getField("radius").getValue();
	    margin = 5;
	    if (pos < radius * -1) {
	      pos = radius - margin;
	    } else if (pos > radius) {
	      pos = radius * -1 + margin;
	    }
	    return pos;
	  };
	
	  RandomCloudGeometry.prototype.move_particles = function() {
	    var key, p, ref, rndVelocity;
	    rndVelocity = this.fields.getField("rndVelocity").getValue();
	    ref = this.ob.vertices;
	    for (key in ref) {
	      p = ref[key];
	      p.x += Math.random() * rndVelocity.x - rndVelocity.x * 0.5 + p.velocity.x;
	      p.y += Math.random() * rndVelocity.y - rndVelocity.y * 0.5 + p.velocity.y;
	      p.z += Math.random() * rndVelocity.z - rndVelocity.z * 0.5 + p.velocity.z;
	      p.x = this.limit_position(p.x);
	      p.y = this.limit_position(p.y);
	      p.z = this.limit_position(p.z);
	    }
	    this.ob.verticesNeedUpdate = true;
	    return true;
	  };
	
	  RandomCloudGeometry.prototype.generate = function() {
	    var i, j, linearVelocity, rad, ref, total, v;
	    this.ob = new THREE.Geometry();
	    rad = this.fields.getField("radius").getValue();
	    total = this.fields.getField("nbrParticles").getValue();
	    linearVelocity = this.fields.getField("linearVelocity").getValue();
	    for (i = j = 0, ref = total; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      v = new THREE.Vector3(Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad);
	      v.velocity = new THREE.Vector3(Math.random() * linearVelocity.x - linearVelocity.x * 0.5, Math.random() * linearVelocity.y - linearVelocity.y * 0.5, Math.random() * linearVelocity.z - linearVelocity.z * 0.5);
	      this.ob.vertices.push(v);
	    }
	    return true;
	  };
	
	  RandomCloudGeometry.prototype.compute = function() {
	    var new_cache;
	    new_cache = this.get_cache_array();
	    if (Utils.flatArraysAreEquals(new_cache, this.cache) === false) {
	      this.generate();
	    }
	    this.move_particles();
	    this.cache = new_cache;
	    return this.fields.setField("out", this.ob);
	  };
	
	  return RandomCloudGeometry;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('RandomCloudGeometry', RandomCloudGeometry);


/***/ },
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Utils;
	
	Utils = (function() {
	  function Utils() {}
	
	  Utils.flatArraysAreEquals = function(arr1, arr2) {
	    var i, j, k, len;
	    if (arr1.length !== arr2.length) {
	      return false;
	    }
	    for (i = j = 0, len = arr1.length; j < len; i = ++j) {
	      k = arr1[i];
	      if (arr1[i] !== arr2[i]) {
	        return false;
	      }
	    }
	    return true;
	  };
	
	  return Utils;
	
	})();
	
	module.exports = Utils;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Fields, Node, Utils, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	Fields = __webpack_require__(78);
	
	
	/* Node model */
	
	Node = (function(superClass) {
	  extend(Node, superClass);
	
	  function Node() {
	    this.createAnimContainer = bind(this.createAnimContainer, this);
	    this.enablePropertyAnim = bind(this.enablePropertyAnim, this);
	    this.disablePropertyAnim = bind(this.disablePropertyAnim, this);
	    this.removeConnection = bind(this.removeConnection, this);
	    this.addOutConnection = bind(this.addOutConnection, this);
	    this.applyFieldsToVal = bind(this.applyFieldsToVal, this);
	    this.toJSON = bind(this.toJSON, this);
	    this.getAnimationData = bind(this.getAnimationData, this);
	    this.hasPropertyTrackAnim = bind(this.hasPropertyTrackAnim, this);
	    this.getDownstreamNodes = bind(this.getDownstreamNodes, this);
	    this.getUpstreamNodes = bind(this.getUpstreamNodes, this);
	    this.hasOutConnection = bind(this.hasOutConnection, this);
	    this.getFields = bind(this.getFields, this);
	    this.inputValueHasChanged = bind(this.inputValueHasChanged, this);
	    this.createCacheObject = bind(this.createCacheObject, this);
	    this.addCountInput = bind(this.addCountInput, this);
	    this.createConnection = bind(this.createConnection, this);
	    this.loadAnimation = bind(this.loadAnimation, this);
	    this.remove = bind(this.remove, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.typename = bind(this.typename, this);
	    this.initialize = bind(this.initialize, this);
	    return Node.__super__.constructor.apply(this, arguments);
	  }
	
	  Node.node_name = '';
	
	  Node.group_name = '';
	
	  Node.prototype.defaults = {
	    nid: -1,
	    gid: -1,
	    x: 0,
	    y: 0,
	    width: null,
	    height: null,
	    name: ""
	  };
	
	  Node.prototype.initialize = function(options) {
	    Node.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.delays_output = false;
	    this.dirty = true;
	    this.is_animated = false;
	    this.out_connections = [];
	    this.apptimeline = options.timeline;
	    this.settings = options.settings;
	    this.indexer = options.indexer;
	    this.options = options;
	    this.parent = options.parent;
	    if (this.get('name') === '') {
	      this.set('name', this.typename());
	    }
	    if (this.get('nid') === -1) {
	      this.set('nid', this.indexer.getUID());
	    } else {
	      this.indexer.uid = this.get('nid');
	    }
	    this.fields = new Fields(false, {
	      node: this,
	      indexer: this.indexer
	    });
	    this.onFieldsCreated();
	    this.fields.load(this.options.fields);
	    this.anim = this.createAnimContainer();
	    if (this.options.anim !== false) {
	      this.loadAnimation();
	    }
	    return this;
	  };
	
	  Node.prototype.typename = function() {
	    return String(this.constructor.name);
	  };
	
	  Node.prototype.onFieldsCreated = function() {};
	
	  Node.prototype.remove = function() {
	    if (this.anim) {
	      this.anim.destroy();
	    }
	    if (this.fields) {
	      this.fields.destroy();
	    }
	    delete this.fields;
	    delete this.apptimeline;
	    delete this.anim;
	    delete this.options;
	    delete this.settings;
	    delete this.indexer;
	    delete this.fully_inited;
	    return this.destroy();
	  };
	
	  Node.prototype.loadAnimation = function() {
	    var anims, i, len, propKey, propLabel, ref, track;
	    ref = this.options.anim;
	    for (propLabel in ref) {
	      anims = ref[propLabel];
	      track = this.anim.getPropertyTrack(propLabel);
	      for (i = 0, len = anims.length; i < len; i++) {
	        propKey = anims[i];
	        track.keys.push({
	          time: propKey.time,
	          value: propKey.value,
	          easing: Timeline.stringToEasingFunction(propKey.easing),
	          track: track
	        });
	      }
	      this.anim.timeline.rebuildTrackAnimsFromKeys(track);
	    }
	    return true;
	  };
	
	  Node.prototype.createConnection = function(field1, field2) {
	    return this.trigger("createConnection", field1, field2);
	  };
	
	  Node.prototype.addCountInput = function() {
	    return this.fields.addFields({
	      inputs: {
	        "count": 1
	      }
	    });
	  };
	
	  Node.prototype.createCacheObject = function(values) {
	    var field, i, len, res, v;
	    res = {};
	    for (i = 0, len = values.length; i < len; i++) {
	      v = values[i];
	      field = this.fields.getField(v);
	      res[v] = !field ? false : field.attributes["value"];
	    }
	    return res;
	  };
	
	  Node.prototype.inputValueHasChanged = function(values, cache) {
	    var field, i, len, v, v2;
	    if (cache == null) {
	      cache = this.material_cache;
	    }
	    for (i = 0, len = values.length; i < len; i++) {
	      v = values[i];
	      field = this.fields.getField(v);
	      if (!field) {
	        return false;
	      } else {
	        v2 = field.attributes["value"];
	        if (v2 !== cache[v]) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };
	
	  Node.prototype.getFields = function() {
	    return {};
	  };
	
	  Node.prototype.hasOutConnection = function() {
	    return this.out_connections.length !== 0;
	  };
	
	  Node.prototype.getUpstreamNodes = function() {
	    return this.fields.getUpstreamNodes();
	  };
	
	  Node.prototype.getDownstreamNodes = function() {
	    return this.fields.getDownstreamNodes();
	  };
	
	  Node.prototype.hasPropertyTrackAnim = function() {
	    var i, len, propTrack, ref;
	    ref = this.anim.objectTrack.propertyTracks;
	    for (i = 0, len = ref.length; i < len; i++) {
	      propTrack = ref[i];
	      if (propTrack.anims.length > 0) {
	        return true;
	      }
	    }
	    return false;
	  };
	
	  Node.prototype.getAnimationData = function() {
	    var anim, i, j, k, len, len1, propTrack, ref, ref1, res;
	    if (!this.anim || !this.anim.objectTrack || !this.anim.objectTrack.propertyTracks || this.hasPropertyTrackAnim() === false) {
	      return false;
	    }
	    if (this.anim !== false) {
	      res = {};
	      ref = this.anim.objectTrack.propertyTracks;
	      for (i = 0, len = ref.length; i < len; i++) {
	        propTrack = ref[i];
	        res[propTrack.propertyName] = [];
	        ref1 = propTrack.keys;
	        for (j = 0, len1 = ref1.length; j < len1; j++) {
	          anim = ref1[j];
	          k = {
	            time: anim.time,
	            value: anim.value,
	            easing: Timeline.easingFunctionToString(anim.easing)
	          };
	          res[propTrack.propertyName].push(k);
	        }
	      }
	    }
	    return res;
	  };
	
	  Node.prototype.toJSON = function() {
	    var res;
	    res = {
	      nid: this.get('nid'),
	      name: this.get('name'),
	      type: this.typename(),
	      anim: this.getAnimationData(),
	      x: this.get('x'),
	      y: this.get('y'),
	      width: this.get('width'),
	      height: this.get('height'),
	      fields: this.fields.toJSON()
	    };
	    return res;
	  };
	
	  Node.prototype.applyFieldsToVal = function(afields, target, exceptions, index) {
	    var f, field_name, nf, results;
	    if (exceptions == null) {
	      exceptions = [];
	    }
	    results = [];
	    for (f in afields) {
	      nf = afields[f];
	      field_name = nf.get("name");
	      if (exceptions.indexOf(field_name) === -1) {
	        results.push(target[field_name] = this.fields.getField(field_name).getValue(index));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };
	
	  Node.prototype.addOutConnection = function(c, field) {
	    if (this.out_connections.indexOf(c) === -1) {
	      this.out_connections.push(c);
	    }
	    return c;
	  };
	
	  Node.prototype.removeConnection = function(c) {
	    var c_index;
	    c_index = this.out_connections.indexOf(c);
	    if (c_index !== -1) {
	      this.out_connections.splice(c_index, 1);
	    }
	    return c;
	  };
	
	  Node.prototype.disablePropertyAnim = function(field) {
	    if (this.anim && field.get("is_output") === false) {
	      return this.anim.disableProperty(field.get("name"));
	    }
	  };
	
	  Node.prototype.enablePropertyAnim = function(field) {
	    if (field.get("is_output") === true || !this.anim) {
	      return false;
	    }
	    if (field.isAnimationProperty()) {
	      return this.anim.enableProperty(field.get("name"));
	    }
	  };
	
	  Node.prototype.createAnimContainer = function() {
	    var f, field, res;
	    res = anim("nid-" + this.get("nid"), this.fields.inputs);
	    for (f in this.fields.inputs) {
	      field = this.fields.inputs[f];
	      if (field.isAnimationProperty() === false) {
	        this.disablePropertyAnim(field);
	      }
	    }
	    return res;
	  };
	
	  return Node;
	
	})(Backbone.Model);
	
	module.exports = Node;


/***/ },
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Node, NodeMaterialBase,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Node = __webpack_require__(35);
	
	NodeMaterialBase = (function(superClass) {
	  extend(NodeMaterialBase, superClass);
	
	  function NodeMaterialBase() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.rebuildShader = bind(this.rebuildShader, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return NodeMaterialBase.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeMaterialBase.prototype.initialize = function(options) {
	    NodeMaterialBase.__super__.initialize.apply(this, arguments);
	    this.ob = false;
	    this.auto_evaluate = false;
	    this.material_class = false;
	    this.last_slice_count = -1;
	    return this.is_material = true;
	  };
	
	  NodeMaterialBase.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = NodeMaterialBase.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "opacity": 1,
	        "transparent": false,
	        "side": {
	          type: "Float",
	          val: THREE.FrontSide,
	          values: {
	            "Front": THREE.FrontSide,
	            "Back": THREE.BackSide,
	            "Both": THREE.DoubleSide
	          }
	        },
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
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  NodeMaterialBase.prototype.rebuildShader = function() {
	    var j, len, ref, sub_material;
	    if (!this.ob) {
	      return this;
	    }
	    if ($.type(this.ob) === "array") {
	      ref = this.ob;
	      for (j = 0, len = ref.length; j < len; j++) {
	        sub_material = ref[j];
	        console.log("rebuilding submaterial");
	        sub_material.needsUpdate = true;
	      }
	    } else {
	      this.ob.needsUpdate = true;
	    }
	    return this;
	  };
	
	  NodeMaterialBase.prototype.remove = function() {
	    delete this.ob;
	    delete this.material_cache;
	    delete this.material_class;
	    return NodeMaterialBase.__super__.remove.apply(this, arguments);
	  };
	
	  NodeMaterialBase.prototype.compute = function() {
	    var i, j, k, needs_rebuild, numItems, ref, ref1;
	    needs_rebuild = false;
	    numItems = this.fields.getMaxInputSliceCount();
	    if (this.inputValueHasChanged(this.vars_rebuild_shader_on_change) || this.last_slice_count !== numItems) {
	      needs_rebuild = true;
	    }
	    if (needs_rebuild === true) {
	      this.ob = [];
	      for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	        this.ob[i] = new this.material_class();
	      }
	    }
	    for (i = k = 0, ref1 = numItems; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
	      this.applyFieldsToVal(this.fields.inputs, this.ob[i], [], i);
	    }
	    this.material_cache = this.createCacheObject(this.vars_rebuild_shader_on_change);
	    this.last_slice_count = numItems;
	    return this.fields.setField("out", this.ob);
	  };
	
	  return NodeMaterialBase;
	
	})(Node);
	
	module.exports = NodeMaterialBase;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var Node, Object3D,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Node = __webpack_require__(35);
	
	Object3D = (function(superClass) {
	  extend(Object3D, superClass);
	
	  function Object3D() {
	    this.compute = bind(this.compute, this);
	    this.applyRotation = bind(this.applyRotation, this);
	    this.apply_children = bind(this.apply_children, this);
	    this.get_children_array = bind(this.get_children_array, this);
	    this.remove = bind(this.remove, this);
	    this.deleteObjectAttributes = bind(this.deleteObjectAttributes, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Object3D.__super__.constructor.apply(this, arguments);
	  }
	
	  Object3D.node_name = 'Object3D';
	
	  Object3D.group_name = 'Three';
	
	  Object3D.prototype.initialize = function(options) {
	    Object3D.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.ob = new THREE.Object3D();
	    this.vars_shadow_options = ["castShadow", "receiveShadow"];
	    this.shadow_cache = this.createCacheObject(this.vars_shadow_options);
	    return this.vars_shadow_options = ["castShadow", "receiveShadow"];
	  };
	
	  Object3D.prototype.getFields = function() {
	    var fields;
	    fields = {
	      inputs: {
	        "children": {
	          type: "Object3D",
	          val: [],
	          "default": [],
	          propagateDirty: false
	        },
	        "position": {
	          type: "Vector3",
	          val: new THREE.Vector3(),
	          propagateDirty: false
	        },
	        "rotation": {
	          type: "Any",
	          val: new THREE.Euler(),
	          propagateDirty: false
	        },
	        "scale": {
	          type: "Vector3",
	          val: new THREE.Vector3(1, 1, 1),
	          propagateDirty: false
	        },
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
	    };
	    return fields;
	  };
	
	  Object3D.prototype.deleteObjectAttributes = function(ob) {
	    if (ob) {
	      delete ob.up;
	      delete ob.position;
	      delete ob.rotation;
	      delete ob.scale;
	      delete ob.matrix;
	      delete ob.matrixWorld;
	      delete ob.matrixRotationWorld;
	      delete ob.quaternion;
	      return delete ob._vector;
	    }
	  };
	
	  Object3D.prototype.remove = function() {
	    Object3D.__super__.remove.apply(this, arguments);
	    this.deleteObjectAttributes(this.ob);
	    delete this.ob;
	    return delete this.shadow_cache;
	  };
	
	  Object3D.prototype.get_children_array = function() {
	    var childs;
	    childs = this.fields.getField("children").get("value");
	    if (childs && $.type(childs) !== "array") {
	      return [childs];
	    }
	    return childs;
	  };
	
	  Object3D.prototype.apply_children = function() {
	    var child, children, childs_in, i, item, j, len, results;
	    children = this.fields.getField("children");
	    if (!children) {
	      return false;
	    }
	    if (!children.changed) {
	      return;
	    }
	    if (this.fields.getField("children").connections.length === 0 && this.ob.children.length !== 0) {
	      while (this.ob.children.length > 0) {
	        this.ob.remove(this.ob.children[0]);
	      }
	      return true;
	    }
	    childs_in = this.get_children_array();
	    i = this.ob.children.length;
	    while (i--) {
	      child = this.ob.children[i];
	      item = _.find(childs_in, function(item) {
	        return item.uuid === child.uuid;
	      });
	      if (!item) {
	        console.log("object remove child");
	        this.ob.remove(child);
	      }
	    }
	    results = [];
	    for (j = 0, len = childs_in.length; j < len; j++) {
	      child = childs_in[j];
	      item = _.find(this.ob.children, function(item) {
	        return item.uuid === child.uuid;
	      });
	      if (!item) {
	        if (child instanceof THREE.Light === true) {
	          this.ob.add(child);
	          results.push(this.trigger("RebuildAllShaders"));
	        } else {
	          console.log("scene add child");
	          results.push(this.ob.add(child));
	        }
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };
	
	  Object3D.prototype.applyRotation = function(target, rotation) {
	    if (rotation instanceof THREE.Euler) {
	      return target.setRotationFromEuler(rotation);
	    } else if (rotation instanceof THREE.Quaternion) {
	      return target.quaternion = rotation;
	    } else if (rotation instanceof THREE.Vector3) {
	      return target.rotation.set(rotation.x, rotation.y, rotation.z, "XYZ");
	    }
	  };
	
	  Object3D.prototype.compute = function() {
	    var rotation;
	    this.applyFieldsToVal(this.fields.inputs, this.ob, ['children', 'rotation']);
	    rotation = this.fields.getField('rotation').getValue();
	    this.applyRotation(this.ob, rotation);
	    this.apply_children();
	    return this.fields.setField("out", this.ob);
	  };
	
	  return Object3D;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Object3D', Object3D);
	
	module.exports = Object3D;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, WebglBase, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	__webpack_require__(79);
	
	__webpack_require__(80);
	
	__webpack_require__(81);
	
	__webpack_require__(82);
	
	__webpack_require__(83);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	__webpack_require__(84);
	
	WebglBase = (function() {
	  WebglBase.instance = false;
	
	  function WebglBase() {
	    this.exportImage = bind(this.exportImage, this);
	    console.log("webgl init...");
	    WebglBase.instance = this;
	    this.current_scene = new THREE.Scene();
	    this.current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000);
	    this.current_renderer = false;
	    if (window.WebGLRenderingContext) {
	      this.current_renderer = new THREE.WebGLRenderer({
	        clearColor: 0x000000,
	        preserveDrawingBuffer: true
	      });
	    }
	    this.current_renderer.autoClear = false;
	    this.effectScreen = new THREE.ShaderPass(THREE.CopyShader);
	    this.effectScreen.renderToScreen = true;
	    this.renderModel = new THREE.RenderPass(this.current_scene, this.current_camera);
	    this.composer = new THREE.EffectComposer(this.current_renderer);
	    WebglBase.current_renderer = this.current_renderer;
	    WebglBase.current_scene = this.current_scene;
	    WebglBase.current_camera = this.current_camera;
	    WebglBase.composer = this.composer;
	    WebglBase.renderModel = this.renderModel;
	    WebglBase.effectScreen = this.effectScreen;
	  }
	
	  WebglBase.prototype.exportImage = function(fname) {
	    var canvas, on_write;
	    canvas = this.current_renderer.domElement;
	    on_write = function(blob) {
	      return saveAs(blob, fname);
	    };
	    return canvas.toBlob(on_write, "image/png");
	  };
	
	  return WebglBase;
	
	})();
	
	module.exports = WebglBase;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var Indexer;
	
	Indexer = (function() {
	  function Indexer() {
	    this.uid = 0;
	  }
	
	  Indexer.prototype.getUID = function(increment) {
	    if (increment == null) {
	      increment = true;
	    }
	    if (increment) {
	      return this.uid += 1;
	    } else {
	      return this.uid;
	    }
	  };
	
	  Indexer.prototype.reset = function() {
	    return this.uid = 0;
	  };
	
	  return Indexer;
	
	})();
	
	module.exports = Indexer;


/***/ },
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * namespace.coffee v1.0.0
	 * Copyright (c) 2011 CodeCatalyst, LLC.
	 * Open source under the MIT License.
	 */
	(function() {
	  var namespace;
	  namespace = function(name, values) {
	    var key, subpackage, target, value, _i, _len, _ref, _results;
	    target = typeof exports !== "undefined" && exports !== null ? exports : window;
	    //target = window;
	    if (name.length > 0) {
	      _ref = name.split('.');
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        subpackage = _ref[_i];
	        target = target[subpackage] || (target[subpackage] = {});
	      }
	    }
	    _results = [];
	    for (key in values) {
	      value = values[key];
	      _results.push(target[key] = value);
	    }
	    return _results;
	  };
	  namespace("", {
	    namespace: namespace
	  });
	}).call(this);


/***/ },
/* 51 */,
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// Constructive Solid Geometry (CSG) is a modeling technique that uses Boolean
	// operations like union and intersection to combine 3D solids. This library
	// implements CSG operations on meshes elegantly and concisely using BSP trees,
	// and is meant to serve as an easily understandable implementation of the
	// algorithm. All edge cases involving overlapping coplanar polygons in both
	// solids are correctly handled.
	// 
	// Example usage:
	// 
	//     var cube = CSG.cube();
	//     var sphere = CSG.sphere({ radius: 1.3 });
	//     var polygons = cube.subtract(sphere).toPolygons();
	// 
	// ## Implementation Details
	// 
	// All CSG operations are implemented in terms of two functions, `clipTo()` and
	// `invert()`, which remove parts of a BSP tree inside another BSP tree and swap
	// solid and empty space, respectively. To find the union of `a` and `b`, we
	// want to remove everything in `a` inside `b` and everything in `b` inside `a`,
	// then combine polygons from `a` and `b` into one solid:
	// 
	//     a.clipTo(b);
	//     b.clipTo(a);
	//     a.build(b.allPolygons());
	// 
	// The only tricky part is handling overlapping coplanar polygons in both trees.
	// The code above keeps both copies, but we need to keep them in one tree and
	// remove them in the other tree. To remove them from `b` we can clip the
	// inverse of `b` against `a`. The code for union now looks like this:
	// 
	//     a.clipTo(b);
	//     b.clipTo(a);
	//     b.invert();
	//     b.clipTo(a);
	//     b.invert();
	//     a.build(b.allPolygons());
	// 
	// Subtraction and intersection naturally follow from set operations. If
	// union is `A | B`, subtraction is `A - B = ~(~A | B)` and intersection is
	// `A & B = ~(~A | ~B)` where `~` is the complement operator.
	// 
	// ## License
	// 
	// Copyright (c) 2011 Evan Wallace (http://madebyevan.com/), under the MIT license.
	
	// # class CSG
	
	// Holds a binary space partition tree representing a 3D solid. Two solids can
	// be combined using the `union()`, `subtract()`, and `intersect()` methods.
	
	CSG = function() {
	  this.polygons = [];
	};
	
	// Construct a CSG solid from a list of `CSG.Polygon` instances.
	CSG.fromPolygons = function(polygons) {
	  var csg = new CSG();
	  csg.polygons = polygons;
	  return csg;
	};
	
	CSG.prototype = {
	  clone: function() {
	    var csg = new CSG();
	    csg.polygons = this.polygons.map(function(p) { return p.clone(); });
	    return csg;
	  },
	
	  toPolygons: function() {
	    return this.polygons;
	  },
	
	  // Return a new CSG solid representing space in either this solid or in the
	  // solid `csg`. Neither this solid nor the solid `csg` are modified.
	  // 
	  //     A.union(B)
	  // 
	  //     +-------+            +-------+
	  //     |       |            |       |
	  //     |   A   |            |       |
	  //     |    +--+----+   =   |       +----+
	  //     +----+--+    |       +----+       |
	  //          |   B   |            |       |
	  //          |       |            |       |
	  //          +-------+            +-------+
	  // 
	  union: function(csg) {
	    var a = new CSG.Node(this.clone().polygons);
	    var b = new CSG.Node(csg.clone().polygons);
	    a.clipTo(b);
	    b.clipTo(a);
	    b.invert();
	    b.clipTo(a);
	    b.invert();
	    a.build(b.allPolygons());
	    return CSG.fromPolygons(a.allPolygons());
	  },
	
	  // Return a new CSG solid representing space in this solid but not in the
	  // solid `csg`. Neither this solid nor the solid `csg` are modified.
	  // 
	  //     A.subtract(B)
	  // 
	  //     +-------+            +-------+
	  //     |       |            |       |
	  //     |   A   |            |       |
	  //     |    +--+----+   =   |    +--+
	  //     +----+--+    |       +----+
	  //          |   B   |
	  //          |       |
	  //          +-------+
	  // 
	  subtract: function(csg) {
	    var a = new CSG.Node(this.clone().polygons);
	    var b = new CSG.Node(csg.clone().polygons);
	    a.invert();
	    a.clipTo(b);
	    b.clipTo(a);
	    b.invert();
	    b.clipTo(a);
	    b.invert();
	    a.build(b.allPolygons());
	    a.invert();
	    return CSG.fromPolygons(a.allPolygons());
	  },
	
	  // Return a new CSG solid representing space both this solid and in the
	  // solid `csg`. Neither this solid nor the solid `csg` are modified.
	  // 
	  //     A.intersect(B)
	  // 
	  //     +-------+
	  //     |       |
	  //     |   A   |
	  //     |    +--+----+   =   +--+
	  //     +----+--+    |       +--+
	  //          |   B   |
	  //          |       |
	  //          +-------+
	  // 
	  intersect: function(csg) {
	    var a = new CSG.Node(this.clone().polygons);
	    var b = new CSG.Node(csg.clone().polygons);
	    a.invert();
	    b.clipTo(a);
	    b.invert();
	    a.clipTo(b);
	    b.clipTo(a);
	    a.build(b.allPolygons());
	    a.invert();
	    return CSG.fromPolygons(a.allPolygons());
	  },
	
	  // Return a new CSG solid with solid and empty space switched. This solid is
	  // not modified.
	  inverse: function() {
	    var csg = this.clone();
	    csg.polygons.map(function(p) { p.flip(); });
	    return csg;
	  }
	};
	
	// Construct an axis-aligned solid cuboid. Optional parameters are `center` and
	// `radius`, which default to `[0, 0, 0]` and `[1, 1, 1]`. The radius can be
	// specified using a single number or a list of three numbers, one for each axis.
	// 
	// Example code:
	// 
	//     var cube = CSG.cube({
	//       center: [0, 0, 0],
	//       radius: 1
	//     });
	CSG.cube = function(options) {
	  options = options || {};
	  var c = new CSG.Vector(options.center || [0, 0, 0]);
	  var r = !options.radius ? [1, 1, 1] : options.radius.length ?
	           options.radius : [options.radius, options.radius, options.radius];
	  return CSG.fromPolygons([
	    [[0, 4, 6, 2], [-1, 0, 0]],
	    [[1, 3, 7, 5], [+1, 0, 0]],
	    [[0, 1, 5, 4], [0, -1, 0]],
	    [[2, 6, 7, 3], [0, +1, 0]],
	    [[0, 2, 3, 1], [0, 0, -1]],
	    [[4, 5, 7, 6], [0, 0, +1]]
	  ].map(function(info) {
	    return new CSG.Polygon(info[0].map(function(i) {
	      var pos = new CSG.Vector(
	        c.x + r[0] * (2 * !!(i & 1) - 1),
	        c.y + r[1] * (2 * !!(i & 2) - 1),
	        c.z + r[2] * (2 * !!(i & 4) - 1)
	      );
	      return new CSG.Vertex(pos, new CSG.Vector(info[1]));
	    }));
	  }));
	};
	
	// Construct a solid sphere. Optional parameters are `center`, `radius`,
	// `slices`, and `stacks`, which default to `[0, 0, 0]`, `1`, `16`, and `8`.
	// The `slices` and `stacks` parameters control the tessellation along the
	// longitude and latitude directions.
	// 
	// Example usage:
	// 
	//     var sphere = CSG.sphere({
	//       center: [0, 0, 0],
	//       radius: 1,
	//       slices: 16,
	//       stacks: 8
	//     });
	CSG.sphere = function(options) {
	  options = options || {};
	  var c = new CSG.Vector(options.center || [0, 0, 0]);
	  var r = options.radius || 1;
	  var slices = options.slices || 16;
	  var stacks = options.stacks || 8;
	  var polygons = [], vertices;
	  function vertex(theta, phi) {
	    theta *= Math.PI * 2;
	    phi *= Math.PI;
	    var dir = new CSG.Vector(
	      Math.cos(theta) * Math.sin(phi),
	      Math.cos(phi),
	      Math.sin(theta) * Math.sin(phi)
	    );
	    vertices.push(new CSG.Vertex(c.plus(dir.times(r)), dir));
	  }
	  for (var i = 0; i < slices; i++) {
	    for (var j = 0; j < stacks; j++) {
	      vertices = [];
	      vertex(i / slices, j / stacks);
	      if (j > 0) vertex((i + 1) / slices, j / stacks);
	      if (j < stacks - 1) vertex((i + 1) / slices, (j + 1) / stacks);
	      vertex(i / slices, (j + 1) / stacks);
	      polygons.push(new CSG.Polygon(vertices));
	    }
	  }
	  return CSG.fromPolygons(polygons);
	};
	
	// Construct a solid cylinder. Optional parameters are `start`, `end`,
	// `radius`, and `slices`, which default to `[0, -1, 0]`, `[0, 1, 0]`, `1`, and
	// `16`. The `slices` parameter controls the tessellation.
	// 
	// Example usage:
	// 
	//     var cylinder = CSG.cylinder({
	//       start: [0, -1, 0],
	//       end: [0, 1, 0],
	//       radius: 1,
	//       slices: 16
	//     });
	CSG.cylinder = function(options) {
	  options = options || {};
	  var s = new CSG.Vector(options.start || [0, -1, 0]);
	  var e = new CSG.Vector(options.end || [0, 1, 0]);
	  var ray = e.minus(s);
	  var r = options.radius || 1;
	  var slices = options.slices || 16;
	  var axisZ = ray.unit(), isY = (Math.abs(axisZ.y) > 0.5);
	  var axisX = new CSG.Vector(isY, !isY, 0).cross(axisZ).unit();
	  var axisY = axisX.cross(axisZ).unit();
	  var start = new CSG.Vertex(s, axisZ.negated());
	  var end = new CSG.Vertex(e, axisZ.unit());
	  var polygons = [];
	  function point(stack, slice, normalBlend) {
	    var angle = slice * Math.PI * 2;
	    var out = axisX.times(Math.cos(angle)).plus(axisY.times(Math.sin(angle)));
	    var pos = s.plus(ray.times(stack)).plus(out.times(r));
	    var normal = out.times(1 - Math.abs(normalBlend)).plus(axisZ.times(normalBlend));
	    return new CSG.Vertex(pos, normal);
	  }
	  for (var i = 0; i < slices; i++) {
	    var t0 = i / slices, t1 = (i + 1) / slices;
	    polygons.push(new CSG.Polygon([start, point(0, t0, -1), point(0, t1, -1)]));
	    polygons.push(new CSG.Polygon([point(0, t1, 0), point(0, t0, 0), point(1, t0, 0), point(1, t1, 0)]));
	    polygons.push(new CSG.Polygon([end, point(1, t1, 1), point(1, t0, 1)]));
	  }
	  return CSG.fromPolygons(polygons);
	};
	
	// # class Vector
	
	// Represents a 3D vector.
	// 
	// Example usage:
	// 
	//     new CSG.Vector(1, 2, 3);
	//     new CSG.Vector([1, 2, 3]);
	//     new CSG.Vector({ x: 1, y: 2, z: 3 });
	
	CSG.Vector = function(x, y, z) {
	  if (arguments.length == 3) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	  } else if ('x' in x) {
	    this.x = x.x;
	    this.y = x.y;
	    this.z = x.z;
	  } else {
	    this.x = x[0];
	    this.y = x[1];
	    this.z = x[2];
	  }
	};
	
	CSG.Vector.prototype = {
	  clone: function() {
	    return new CSG.Vector(this.x, this.y, this.z);
	  },
	
	  negated: function() {
	    return new CSG.Vector(-this.x, -this.y, -this.z);
	  },
	
	  plus: function(a) {
	    return new CSG.Vector(this.x + a.x, this.y + a.y, this.z + a.z);
	  },
	
	  minus: function(a) {
	    return new CSG.Vector(this.x - a.x, this.y - a.y, this.z - a.z);
	  },
	
	  times: function(a) {
	    return new CSG.Vector(this.x * a, this.y * a, this.z * a);
	  },
	
	  dividedBy: function(a) {
	    return new CSG.Vector(this.x / a, this.y / a, this.z / a);
	  },
	
	  dot: function(a) {
	    return this.x * a.x + this.y * a.y + this.z * a.z;
	  },
	
	  lerp: function(a, t) {
	    return this.plus(a.minus(this).times(t));
	  },
	
	  length: function() {
	    return Math.sqrt(this.dot(this));
	  },
	
	  unit: function() {
	    return this.dividedBy(this.length());
	  },
	
	  cross: function(a) {
	    return new CSG.Vector(
	      this.y * a.z - this.z * a.y,
	      this.z * a.x - this.x * a.z,
	      this.x * a.y - this.y * a.x
	    );
	  }
	};
	
	// # class Vertex
	
	// Represents a vertex of a polygon. Use your own vertex class instead of this
	// one to provide additional features like texture coordinates and vertex
	// colors. Custom vertex classes need to provide a `pos` property and `clone()`,
	// `flip()`, and `interpolate()` methods that behave analogous to the ones
	// defined by `CSG.Vertex`. This class provides `normal` so convenience
	// functions like `CSG.sphere()` can return a smooth vertex normal, but `normal`
	// is not used anywhere else.
	
	CSG.Vertex = function(pos, normal) {
	  this.pos = new CSG.Vector(pos);
	  this.normal = new CSG.Vector(normal);
	};
	
	CSG.Vertex.prototype = {
	  clone: function() {
	    return new CSG.Vertex(this.pos.clone(), this.normal.clone());
	  },
	
	  // Invert all orientation-specific data (e.g. vertex normal). Called when the
	  // orientation of a polygon is flipped.
	  flip: function() {
	    this.normal = this.normal.negated();
	  },
	
	  // Create a new vertex between this vertex and `other` by linearly
	  // interpolating all properties using a parameter of `t`. Subclasses should
	  // override this to interpolate additional properties.
	  interpolate: function(other, t) {
	    return new CSG.Vertex(
	      this.pos.lerp(other.pos, t),
	      this.normal.lerp(other.normal, t)
	    );
	  }
	};
	
	// # class Plane
	
	// Represents a plane in 3D space.
	
	CSG.Plane = function(normal, w) {
	  this.normal = normal;
	  this.w = w;
	};
	
	// `CSG.Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
	// point is on the plane.
	CSG.Plane.EPSILON = 1e-5;
	
	CSG.Plane.fromPoints = function(a, b, c) {
	  var n = b.minus(a).cross(c.minus(a)).unit();
	  return new CSG.Plane(n, n.dot(a));
	};
	
	CSG.Plane.prototype = {
	  clone: function() {
	    return new CSG.Plane(this.normal.clone(), this.w);
	  },
	
	  flip: function() {
	    this.normal = this.normal.negated();
	    this.w = -this.w;
	  },
	
	  // Split `polygon` by this plane if needed, then put the polygon or polygon
	  // fragments in the appropriate lists. Coplanar polygons go into either
	  // `coplanarFront` or `coplanarBack` depending on their orientation with
	  // respect to this plane. Polygons in front or in back of this plane go into
	  // either `front` or `back`.
	  splitPolygon: function(polygon, coplanarFront, coplanarBack, front, back) {
	    var COPLANAR = 0;
	    var FRONT = 1;
	    var BACK = 2;
	    var SPANNING = 3;
	
	    // Classify each point as well as the entire polygon into one of the above
	    // four classes.
	    var polygonType = 0;
	    var types = [];
	    for (var i = 0; i < polygon.vertices.length; i++) {
	      var t = this.normal.dot(polygon.vertices[i].pos) - this.w;
	      var type = (t < -CSG.Plane.EPSILON) ? BACK : (t > CSG.Plane.EPSILON) ? FRONT : COPLANAR;
	      polygonType |= type;
	      types.push(type);
	    }
	
	    // Put the polygon in the correct list, splitting it when necessary.
	    switch (polygonType) {
	      case COPLANAR:
	        (this.normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
	        break;
	      case FRONT:
	        front.push(polygon);
	        break;
	      case BACK:
	        back.push(polygon);
	        break;
	      case SPANNING:
	        var f = [], b = [];
	        for (var i = 0; i < polygon.vertices.length; i++) {
	          var j = (i + 1) % polygon.vertices.length;
	          var ti = types[i], tj = types[j];
	          var vi = polygon.vertices[i], vj = polygon.vertices[j];
	          if (ti != BACK) f.push(vi);
	          if (ti != FRONT) b.push(ti != BACK ? vi.clone() : vi);
	          if ((ti | tj) == SPANNING) {
	            var t = (this.w - this.normal.dot(vi.pos)) / this.normal.dot(vj.pos.minus(vi.pos));
	            var v = vi.interpolate(vj, t);
	            f.push(v);
	            b.push(v.clone());
	          }
	        }
	        if (f.length >= 3) front.push(new CSG.Polygon(f, polygon.shared));
	        if (b.length >= 3) back.push(new CSG.Polygon(b, polygon.shared));
	        break;
	    }
	  }
	};
	
	// # class Polygon
	
	// Represents a convex polygon. The vertices used to initialize a polygon must
	// be coplanar and form a convex loop. They do not have to be `CSG.Vertex`
	// instances but they must behave similarly (duck typing can be used for
	// customization).
	// 
	// Each convex polygon has a `shared` property, which is shared between all
	// polygons that are clones of each other or were split from the same polygon.
	// This can be used to define per-polygon properties (such as surface color).
	
	CSG.Polygon = function(vertices, shared) {
	  this.vertices = vertices;
	  this.shared = shared;
	  this.plane = CSG.Plane.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
	};
	
	CSG.Polygon.prototype = {
	  clone: function() {
	    var vertices = this.vertices.map(function(v) { return v.clone(); });
	    return new CSG.Polygon(vertices, this.shared);
	  },
	
	  flip: function() {
	    this.vertices.reverse().map(function(v) { v.flip(); });
	    this.plane.flip();
	  }
	};
	
	// # class Node
	
	// Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
	// by picking a polygon to split along. That polygon (and all other coplanar
	// polygons) are added directly to that node and the other polygons are added to
	// the front and/or back subtrees. This is not a leafy BSP tree since there is
	// no distinction between internal and leaf nodes.
	
	CSG.Node = function(polygons) {
	  this.plane = null;
	  this.front = null;
	  this.back = null;
	  this.polygons = [];
	  if (polygons) this.build(polygons);
	};
	
	CSG.Node.prototype = {
	  clone: function() {
	    var node = new CSG.Node();
	    node.plane = this.plane && this.plane.clone();
	    node.front = this.front && this.front.clone();
	    node.back = this.back && this.back.clone();
	    node.polygons = this.polygons.map(function(p) { return p.clone(); });
	    return node;
	  },
	
	  // Convert solid space to empty space and empty space to solid space.
	  invert: function() {
	    for (var i = 0; i < this.polygons.length; i++) {
	      this.polygons[i].flip();
	    }
	    this.plane.flip();
	    if (this.front) this.front.invert();
	    if (this.back) this.back.invert();
	    var temp = this.front;
	    this.front = this.back;
	    this.back = temp;
	  },
	
	  // Recursively remove all polygons in `polygons` that are inside this BSP
	  // tree.
	  clipPolygons: function(polygons) {
	    if (!this.plane) return polygons.slice();
	    var front = [], back = [];
	    for (var i = 0; i < polygons.length; i++) {
	      this.plane.splitPolygon(polygons[i], front, back, front, back);
	    }
	    if (this.front) front = this.front.clipPolygons(front);
	    if (this.back) back = this.back.clipPolygons(back);
	    else back = [];
	    return front.concat(back);
	  },
	
	  // Remove all polygons in this BSP tree that are inside the other BSP tree
	  // `bsp`.
	  clipTo: function(bsp) {
	    this.polygons = bsp.clipPolygons(this.polygons);
	    if (this.front) this.front.clipTo(bsp);
	    if (this.back) this.back.clipTo(bsp);
	  },
	
	  // Return a list of all polygons in this BSP tree.
	  allPolygons: function() {
	    var polygons = this.polygons.slice();
	    if (this.front) polygons = polygons.concat(this.front.allPolygons());
	    if (this.back) polygons = polygons.concat(this.back.allPolygons());
	    return polygons;
	  },
	
	  // Build a BSP tree out of `polygons`. When called on an existing tree, the
	  // new polygons are filtered down to the bottom of the tree and become new
	  // nodes there. Each set of polygons is partitioned using the first polygon
	  // (no heuristic is used to pick a good split).
	  build: function(polygons) {
	    if (!polygons.length) return;
	    if (!this.plane) this.plane = polygons[0].plane.clone();
	    var front = [], back = [];
	    for (var i = 0; i < polygons.length; i++) {
	      this.plane.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
	    }
	    if (front.length) {
	      if (!this.front) this.front = new CSG.Node();
	      this.front.build(front);
	    }
	    if (back.length) {
	      if (!this.back) this.back = new CSG.Node();
	      this.back.build(back);
	    }
	  }
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	window.ThreeBSP = (function() {
		
		var ThreeBSP,
			EPSILON = 1e-5,
			COPLANAR = 0,
			FRONT = 1,
			BACK = 2,
			SPANNING = 3;
		
		ThreeBSP = function( geometry ) {
			// Convert THREE.Geometry to ThreeBSP
			var i, _length_i,
				face, vertex, faceVertexUvs,
				polygon,
				polygons = [],
				tree;
		
			if ( geometry instanceof THREE.Geometry ) {
				this.matrix = new THREE.Matrix4;
			} else if ( geometry instanceof THREE.Mesh ) {
				// #todo: add hierarchy support
				geometry.updateMatrix();
				this.matrix = geometry.matrix.clone();
				geometry = geometry.geometry;
			} else if ( geometry instanceof ThreeBSP.Node ) {
				this.tree = geometry;
				this.matrix = new THREE.Matrix4;
				return this;
			} else {
				throw 'ThreeBSP: Given geometry is unsupported';
			}
		
			for ( i = 0, _length_i = geometry.faces.length; i < _length_i; i++ ) {
				face = geometry.faces[i];
				faceVertexUvs = geometry.faceVertexUvs[0][i];
				polygon = new ThreeBSP.Polygon;
				
				if ( face instanceof THREE.Face3 ) {
					vertex = geometry.vertices[ face.a ];
					vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[0], new THREE.Vector2( faceVertexUvs[0].x, faceVertexUvs[0].y ) );
					vertex.applyMatrix4(this.matrix);
					polygon.vertices.push( vertex );
					
					vertex = geometry.vertices[ face.b ];
					vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[1], new THREE.Vector2( faceVertexUvs[1].x, faceVertexUvs[1].y ) );
					vertex.applyMatrix4(this.matrix);
					polygon.vertices.push( vertex );
					
					vertex = geometry.vertices[ face.c ];
					vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[2], new THREE.Vector2( faceVertexUvs[2].x, faceVertexUvs[2].y ) );
					vertex.applyMatrix4(this.matrix);
					polygon.vertices.push( vertex );
				} else if ( typeof THREE.Face4 ) {
					vertex = geometry.vertices[ face.a ];
					vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[0], new THREE.Vector2( faceVertexUvs[0].x, faceVertexUvs[0].y ) );
					vertex.applyMatrix4(this.matrix);
					polygon.vertices.push( vertex );
					
					vertex = geometry.vertices[ face.b ];
					vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[1], new THREE.Vector2( faceVertexUvs[1].x, faceVertexUvs[1].y ) );
					vertex.applyMatrix4(this.matrix);
					polygon.vertices.push( vertex );
					
					vertex = geometry.vertices[ face.c ];
					vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[2], new THREE.Vector2( faceVertexUvs[2].x, faceVertexUvs[2].y ) );
					vertex.applyMatrix4(this.matrix);
					polygon.vertices.push( vertex );
					
					vertex = geometry.vertices[ face.d ];
					vertex = new ThreeBSP.Vertex( vertex.x, vertex.y, vertex.z, face.vertexNormals[3], new THREE.Vector2( faceVertexUvs[3].x, faceVertexUvs[3].y ) );
					vertex.applyMatrix4(this.matrix);
					polygon.vertices.push( vertex );
				} else {
					throw 'Invalid face type at index ' + i;
				}
				
				polygon.calculateProperties();
				polygons.push( polygon );
			};
		
			this.tree = new ThreeBSP.Node( polygons );
		};
		ThreeBSP.prototype.subtract = function( other_tree ) {
			var a = this.tree.clone(),
				b = other_tree.tree.clone();
			
			a.invert();
			a.clipTo( b );
			b.clipTo( a );
			b.invert();
			b.clipTo( a );
			b.invert();
			a.build( b.allPolygons() );
			a.invert();
			a = new ThreeBSP( a );
			a.matrix = this.matrix;
			return a;
		};
		ThreeBSP.prototype.union = function( other_tree ) {
			var a = this.tree.clone(),
				b = other_tree.tree.clone();
			
			a.clipTo( b );
			b.clipTo( a );
			b.invert();
			b.clipTo( a );
			b.invert();
			a.build( b.allPolygons() );
			a = new ThreeBSP( a );
			a.matrix = this.matrix;
			return a;
		};
		ThreeBSP.prototype.intersect = function( other_tree ) {
			var a = this.tree.clone(),
				b = other_tree.tree.clone();
			
			a.invert();
			b.clipTo( a );
			b.invert();
			a.clipTo( b );
			b.clipTo( a );
			a.build( b.allPolygons() );
			a.invert();
			a = new ThreeBSP( a );
			a.matrix = this.matrix;
			return a;
		};
		ThreeBSP.prototype.toGeometry = function() {
			var i, j,
				matrix = new THREE.Matrix4().getInverse( this.matrix ),
				geometry = new THREE.Geometry(),
				polygons = this.tree.allPolygons(),
				polygon_count = polygons.length,
				polygon, polygon_vertice_count,
				vertice_dict = {},
				vertex_idx_a, vertex_idx_b, vertex_idx_c,
				vertex, face,
				verticeUvs;
		
			for ( i = 0; i < polygon_count; i++ ) {
				polygon = polygons[i];
				polygon_vertice_count = polygon.vertices.length;
				
				for ( j = 2; j < polygon_vertice_count; j++ ) {
					verticeUvs = [];
					
					vertex = polygon.vertices[0];
					verticeUvs.push( new THREE.Vector2( vertex.uv.x, vertex.uv.y ) );
					vertex = new THREE.Vector3( vertex.x, vertex.y, vertex.z );
					vertex.applyMatrix4(matrix);
					
					if ( typeof vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] !== 'undefined' ) {
						vertex_idx_a = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ];
					} else {
						geometry.vertices.push( vertex );
						vertex_idx_a = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] = geometry.vertices.length - 1;
					}
					
					vertex = polygon.vertices[j-1];
					verticeUvs.push( new THREE.Vector2( vertex.uv.x, vertex.uv.y ) );
					vertex = new THREE.Vector3( vertex.x, vertex.y, vertex.z );
					vertex.applyMatrix4(matrix);
					if ( typeof vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] !== 'undefined' ) {
						vertex_idx_b = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ];
					} else {
						geometry.vertices.push( vertex );
						vertex_idx_b = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] = geometry.vertices.length - 1;
					}
					
					vertex = polygon.vertices[j];
					verticeUvs.push( new THREE.Vector2( vertex.uv.x, vertex.uv.y ) );
					vertex = new THREE.Vector3( vertex.x, vertex.y, vertex.z );
					vertex.applyMatrix4(matrix);
					if ( typeof vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] !== 'undefined' ) {
						vertex_idx_c = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ];
					} else {
						geometry.vertices.push( vertex );
						vertex_idx_c = vertice_dict[ vertex.x + ',' + vertex.y + ',' + vertex.z ] = geometry.vertices.length - 1;
					}
					
					face = new THREE.Face3(
						vertex_idx_a,
						vertex_idx_b,
						vertex_idx_c,
						new THREE.Vector3( polygon.normal.x, polygon.normal.y, polygon.normal.z )
					);
					
					geometry.faces.push( face );
					geometry.faceVertexUvs[0].push( verticeUvs );
				}
				
			}
			return geometry;
		};
		ThreeBSP.prototype.toMesh = function( material ) {
			var geometry = this.toGeometry(),
				mesh = new THREE.Mesh( geometry, material );
			
			mesh.position.getPositionFromMatrix( this.matrix );
			mesh.rotation.setFromRotationMatrix( this.matrix );
			
			return mesh;
		};
		
		
		ThreeBSP.Polygon = function( vertices, normal, w ) {
			if ( !( vertices instanceof Array ) ) {
				vertices = [];
			}
			
			this.vertices = vertices;
			if ( vertices.length > 0 ) {
				this.calculateProperties();
			} else {
				this.normal = this.w = undefined;
			}
		};
		ThreeBSP.Polygon.prototype.calculateProperties = function() {
			var a = this.vertices[0],
				b = this.vertices[1],
				c = this.vertices[2];
				
			this.normal = b.clone().subtract( a ).cross(
				c.clone().subtract( a )
			).normalize();
			
			this.w = this.normal.clone().dot( a );
			
			return this;
		};
		ThreeBSP.Polygon.prototype.clone = function() {
			var i, vertice_count,
				polygon = new ThreeBSP.Polygon;
			
			for ( i = 0, vertice_count = this.vertices.length; i < vertice_count; i++ ) {
				polygon.vertices.push( this.vertices[i].clone() );
			};
			polygon.calculateProperties();
			
			return polygon;
		};
		
		ThreeBSP.Polygon.prototype.flip = function() {
			var i, vertices = [];
			
			this.normal.multiplyScalar( -1 );
			this.w *= -1;
			
			for ( i = this.vertices.length - 1; i >= 0; i-- ) {
				vertices.push( this.vertices[i] );
			};
			this.vertices = vertices;
			
			return this;
		};
		ThreeBSP.Polygon.prototype.classifyVertex = function( vertex ) {  
			var side_value = this.normal.dot( vertex ) - this.w;
			
			if ( side_value < -EPSILON ) {
				return BACK;
			} else if ( side_value > EPSILON ) {
				return FRONT;
			} else {
				return COPLANAR;
			}
		};
		ThreeBSP.Polygon.prototype.classifySide = function( polygon ) {
			var i, vertex, classification,
				num_positive = 0,
				num_negative = 0,
				vertice_count = polygon.vertices.length;
			
			for ( i = 0; i < vertice_count; i++ ) {
				vertex = polygon.vertices[i];
				classification = this.classifyVertex( vertex );
				if ( classification === FRONT ) {
					num_positive++;
				} else if ( classification === BACK ) {
					num_negative++;
				}
			}
			
			if ( num_positive > 0 && num_negative === 0 ) {
				return FRONT;
			} else if ( num_positive === 0 && num_negative > 0 ) {
				return BACK;
			} else if ( num_positive === 0 && num_negative === 0 ) {
				return COPLANAR;
			} else {
				return SPANNING;
			}
		};
		ThreeBSP.Polygon.prototype.splitPolygon = function( polygon, coplanar_front, coplanar_back, front, back ) {
			var classification = this.classifySide( polygon );
			
			if ( classification === COPLANAR ) {
				
				( this.normal.dot( polygon.normal ) > 0 ? coplanar_front : coplanar_back ).push( polygon );
				
			} else if ( classification === FRONT ) {
				
				front.push( polygon );
				
			} else if ( classification === BACK ) {
				
				back.push( polygon );
				
			} else {
				
				var vertice_count,
					i, j, ti, tj, vi, vj,
					t, v,
					f = [],
					b = [];
				
				for ( i = 0, vertice_count = polygon.vertices.length; i < vertice_count; i++ ) {
					
					j = (i + 1) % vertice_count;
					vi = polygon.vertices[i];
					vj = polygon.vertices[j];
					ti = this.classifyVertex( vi );
					tj = this.classifyVertex( vj );
					
					if ( ti != BACK ) f.push( vi );
					if ( ti != FRONT ) b.push( vi );
					if ( (ti | tj) === SPANNING ) {
						t = ( this.w - this.normal.dot( vi ) ) / this.normal.dot( vj.clone().subtract( vi ) );
						v = vi.interpolate( vj, t );
						f.push( v );
						b.push( v );
					}
				}
				
				
				if ( f.length >= 3 ) front.push( new ThreeBSP.Polygon( f ).calculateProperties() );
				if ( b.length >= 3 ) back.push( new ThreeBSP.Polygon( b ).calculateProperties() );
			}
		};
		
		ThreeBSP.Vertex = function( x, y, z, normal, uv ) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.normal = normal || new THREE.Vector3;
			this.uv = uv || new THREE.Vector2;
		};
		ThreeBSP.Vertex.prototype.clone = function() {
			return new ThreeBSP.Vertex( this.x, this.y, this.z, this.normal.clone(), this.uv.clone() );
		};
		ThreeBSP.Vertex.prototype.add = function( vertex ) {
			this.x += vertex.x;
			this.y += vertex.y;
			this.z += vertex.z;
			return this;
		};
		ThreeBSP.Vertex.prototype.subtract = function( vertex ) {
			this.x -= vertex.x;
			this.y -= vertex.y;
			this.z -= vertex.z;
			return this;
		};
		ThreeBSP.Vertex.prototype.multiplyScalar = function( scalar ) {
			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
			return this;
		};
		ThreeBSP.Vertex.prototype.cross = function( vertex ) {
			var x = this.x,
				y = this.y,
				z = this.z;
	
			this.x = y * vertex.z - z * vertex.y;
			this.y = z * vertex.x - x * vertex.z;
			this.z = x * vertex.y - y * vertex.x;
			
			return this;
		};
		ThreeBSP.Vertex.prototype.normalize = function() {
			var length = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
			
			this.x /= length;
			this.y /= length;
			this.z /= length;
			
			return this;
		};
		ThreeBSP.Vertex.prototype.dot = function( vertex ) {
			return this.x * vertex.x + this.y * vertex.y + this.z * vertex.z;
		};
		ThreeBSP.Vertex.prototype.lerp = function( a, t ) {
			this.add(
				a.clone().subtract( this ).multiplyScalar( t )
			);
			
			this.normal.add(
				a.normal.clone().sub( this.normal ).multiplyScalar( t )
			);
			
			this.uv.add(
				a.uv.clone().sub( this.uv ).multiplyScalar( t )
			);
			
			return this;
		};
		ThreeBSP.Vertex.prototype.interpolate = function( other, t ) {
			return this.clone().lerp( other, t );
		};
		ThreeBSP.Vertex.prototype.applyMatrix4 = function ( m ) {
	
			// input: THREE.Matrix4 affine matrix
	
			var x = this.x, y = this.y, z = this.z;
	
			var e = m.elements;
	
			this.x = e[0] * x + e[4] * y + e[8]  * z + e[12];
			this.y = e[1] * x + e[5] * y + e[9]  * z + e[13];
			this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
	
			return this;
	
		}
		
		
		ThreeBSP.Node = function( polygons ) {
			var i, polygon_count,
				front = [],
				back = [];
	
			this.polygons = [];
			this.front = this.back = undefined;
			
			if ( !(polygons instanceof Array) || polygons.length === 0 ) return;
	
			this.divider = polygons[0].clone();
			
			for ( i = 0, polygon_count = polygons.length; i < polygon_count; i++ ) {
				this.divider.splitPolygon( polygons[i], this.polygons, this.polygons, front, back );
			}   
			
			if ( front.length > 0 ) {
				this.front = new ThreeBSP.Node( front );
			}
			
			if ( back.length > 0 ) {
				this.back = new ThreeBSP.Node( back );
			}
		};
		ThreeBSP.Node.isConvex = function( polygons ) {
			var i, j;
			for ( i = 0; i < polygons.length; i++ ) {
				for ( j = 0; j < polygons.length; j++ ) {
					if ( i !== j && polygons[i].classifySide( polygons[j] ) !== BACK ) {
						return false;
					}
				}
			}
			return true;
		};
		ThreeBSP.Node.prototype.build = function( polygons ) {
			var i, polygon_count,
				front = [],
				back = [];
			
			if ( !this.divider ) {
				this.divider = polygons[0].clone();
			}
	
			for ( i = 0, polygon_count = polygons.length; i < polygon_count; i++ ) {
				this.divider.splitPolygon( polygons[i], this.polygons, this.polygons, front, back );
			}   
			
			if ( front.length > 0 ) {
				if ( !this.front ) this.front = new ThreeBSP.Node();
				this.front.build( front );
			}
			
			if ( back.length > 0 ) {
				if ( !this.back ) this.back = new ThreeBSP.Node();
				this.back.build( back );
			}
		};
		ThreeBSP.Node.prototype.allPolygons = function() {
			var polygons = this.polygons.slice();
			if ( this.front ) polygons = polygons.concat( this.front.allPolygons() );
			if ( this.back ) polygons = polygons.concat( this.back.allPolygons() );
			return polygons;
		};
		ThreeBSP.Node.prototype.clone = function() {
			var node = new ThreeBSP.Node();
			
			node.divider = this.divider.clone();
			node.polygons = this.polygons.map( function( polygon ) { return polygon.clone(); } );
			node.front = this.front && this.front.clone();
			node.back = this.back && this.back.clone();
			
			return node;
		};
		ThreeBSP.Node.prototype.invert = function() {
			var i, polygon_count, temp;
			
			for ( i = 0, polygon_count = this.polygons.length; i < polygon_count; i++ ) {
				this.polygons[i].flip();
			}
			
			this.divider.flip();
			if ( this.front ) this.front.invert();
			if ( this.back ) this.back.invert();
			
			temp = this.front;
			this.front = this.back;
			this.back = temp;
			
			return this;
		};
		ThreeBSP.Node.prototype.clipPolygons = function( polygons ) {
			var i, polygon_count,
				front, back;
	
			if ( !this.divider ) return polygons.slice();
			
			front = [], back = [];
			
			for ( i = 0, polygon_count = polygons.length; i < polygon_count; i++ ) {
				this.divider.splitPolygon( polygons[i], front, back, front, back );
			}
	
			if ( this.front ) front = this.front.clipPolygons( front );
			if ( this.back ) back = this.back.clipPolygons( back );
			else back = [];
	
			return front.concat( back );
		};
		
		ThreeBSP.Node.prototype.clipTo = function( node ) {
			this.polygons = node.clipPolygons( this.polygons );
			if ( this.front ) this.front.clipTo( node );
			if ( this.back ) this.back.clipTo( node );
		};
		
		
		return ThreeBSP;
	})();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// tween.js r5 - http://github.com/sole/tween.js
	var TWEEN=TWEEN||function(){var a,e,c=60,b=false,h=[],i;return{setFPS:function(f){c=f||60},start:function(f){arguments.length!=0&&this.setFPS(f);e=setInterval(this.update,1E3/c)},stop:function(){clearInterval(e)},setAutostart:function(f){(b=f)&&!e&&this.start()},add:function(f){h.push(f);b&&!e&&this.start()},getAll:function(){return h},removeAll:function(){h=[]},remove:function(f){a=h.indexOf(f);a!==-1&&h.splice(a,1)},update:function(f){a=0;i=h.length;for(f=f||Date.now();a<i;)if(h[a].update(f))a++;
	else{h.splice(a,1);i--}i==0&&b==true&&this.stop()}}}();
	TWEEN.Tween=function(a){var e={},c={},b={},h=1E3,i=0,f=null,n=TWEEN.Easing.Linear.EaseNone,k=null,l=null,m=null;this.to=function(d,g){if(g!==null)h=g;for(var j in d)if(a[j]!==null)b[j]=d[j];return this};this.start=function(d){TWEEN.add(this);f=d?d+i:Date.now()+i;for(var g in b)if(a[g]!==null){e[g]=a[g];c[g]=b[g]-a[g]}return this};this.stop=function(){TWEEN.remove(this);return this};this.delay=function(d){i=d;return this};this.easing=function(d){n=d;return this};this.chain=function(d){k=d};this.onUpdate=
	function(d){l=d;return this};this.onComplete=function(d){m=d;return this};this.update=function(d){var g,j;if(d<f)return true;d=(d-f)/h;d=d>1?1:d;j=n(d);for(g in c)a[g]=e[g]+c[g]*j;l!==null&&l.call(a,j);if(d==1){m!==null&&m.call(a);k!==null&&k.start();return false}return true}};TWEEN.Easing={Linear:{},Quadratic:{},Cubic:{},Quartic:{},Quintic:{},Sinusoidal:{},Exponential:{},Circular:{},Elastic:{},Back:{},Bounce:{}};TWEEN.Easing.Linear.EaseNone=function(a){return a};
	TWEEN.Easing.Quadratic.EaseIn=function(a){return a*a};TWEEN.Easing.Quadratic.EaseOut=function(a){return-a*(a-2)};TWEEN.Easing.Quadratic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a;return-0.5*(--a*(a-2)-1)};TWEEN.Easing.Cubic.EaseIn=function(a){return a*a*a};TWEEN.Easing.Cubic.EaseOut=function(a){return--a*a*a+1};TWEEN.Easing.Cubic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a;return 0.5*((a-=2)*a*a+2)};TWEEN.Easing.Quartic.EaseIn=function(a){return a*a*a*a};
	TWEEN.Easing.Quartic.EaseOut=function(a){return-(--a*a*a*a-1)};TWEEN.Easing.Quartic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a;return-0.5*((a-=2)*a*a*a-2)};TWEEN.Easing.Quintic.EaseIn=function(a){return a*a*a*a*a};TWEEN.Easing.Quintic.EaseOut=function(a){return(a-=1)*a*a*a*a+1};TWEEN.Easing.Quintic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a*a;return 0.5*((a-=2)*a*a*a*a+2)};TWEEN.Easing.Sinusoidal.EaseIn=function(a){return-Math.cos(a*Math.PI/2)+1};
	TWEEN.Easing.Sinusoidal.EaseOut=function(a){return Math.sin(a*Math.PI/2)};TWEEN.Easing.Sinusoidal.EaseInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};TWEEN.Easing.Exponential.EaseIn=function(a){return a==0?0:Math.pow(2,10*(a-1))};TWEEN.Easing.Exponential.EaseOut=function(a){return a==1?1:-Math.pow(2,-10*a)+1};TWEEN.Easing.Exponential.EaseInOut=function(a){if(a==0)return 0;if(a==1)return 1;if((a*=2)<1)return 0.5*Math.pow(2,10*(a-1));return 0.5*(-Math.pow(2,-10*(a-1))+2)};
	TWEEN.Easing.Circular.EaseIn=function(a){return-(Math.sqrt(1-a*a)-1)};TWEEN.Easing.Circular.EaseOut=function(a){return Math.sqrt(1- --a*a)};TWEEN.Easing.Circular.EaseInOut=function(a){if((a/=0.5)<1)return-0.5*(Math.sqrt(1-a*a)-1);return 0.5*(Math.sqrt(1-(a-=2)*a)+1)};TWEEN.Easing.Elastic.EaseIn=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);return-(c*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b))};
	TWEEN.Easing.Elastic.EaseOut=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);return c*Math.pow(2,-10*a)*Math.sin((a-e)*2*Math.PI/b)+1};
	TWEEN.Easing.Elastic.EaseInOut=function(a){var e,c=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!c||c<1){c=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/c);if((a*=2)<1)return-0.5*c*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b);return c*Math.pow(2,-10*(a-=1))*Math.sin((a-e)*2*Math.PI/b)*0.5+1};TWEEN.Easing.Back.EaseIn=function(a){return a*a*(2.70158*a-1.70158)};TWEEN.Easing.Back.EaseOut=function(a){return(a-=1)*a*(2.70158*a+1.70158)+1};
	TWEEN.Easing.Back.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*(3.5949095*a-2.5949095);return 0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)};TWEEN.Easing.Bounce.EaseIn=function(a){return 1-TWEEN.Easing.Bounce.EaseOut(1-a)};TWEEN.Easing.Bounce.EaseOut=function(a){return(a/=1)<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};
	TWEEN.Easing.Bounce.EaseInOut=function(a){if(a<0.5)return TWEEN.Easing.Bounce.EaseIn(a*2)*0.5;return TWEEN.Easing.Bounce.EaseOut(a*2-1)*0.5+0.5};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * @author zz85 (http://github.com/zz85 http://www.lab4games.net/zz85/blog)
	 *
	 * a simple to use javascript 3d particles system inspired by FliNT and Stardust
	 * created with TWEEN.js and THREE.js
	 *
	 * for feature requests or bugs, please visit https://github.com/zz85/sparks.js
	 *
	 * licensed under the MIT license 
	 */
	
	var SPARKS = {};
	
	/********************************
	* Emitter Class
	*
	*   Creates and Manages Particles
	*********************************/
	
	
	SPARKS.Engine = {
		// Combined Singleton Engine;
		_TIMESTEP: 15,
		_timer: null,
		_lastTime: null,
		_timerStep: 10,
		_velocityVerlet: false,
		_emitters: [],
		_isRunning: false,
		
		add: function(emitter) {
			this._emitters.push(emitter);
		},
		// run its built in timer / stepping
		start: function() {
			this._lastTime = Date.now();
			this._timer = setTimeout(this.step, this._timerStep, this);
			
			for (var i=0,il=this._emitters.length;i<il;i++) {
				this._emitters[i]._isRunning = true;
			}
			
			this._isRunning = true;
		},
		
		stop: function() {
			this._isRunning = false;
			for (var i=0,il=this._emitters.length;i<il;i++) {
				this._emitters[i]._isRunning = false;
			}
			clearTimeout(this._timer);
		},
		
		isRunning: function() {
			return this._isRunning;
		},
		
		// Step gets called upon by the engine
		// but attempts to call update() on a regular basics
		step: function(me) {
			
			var time = Date.now();
			var elapsed = time - me._lastTime;
		   	
			if (!this._velocityVerlet) {
				// if elapsed is way higher than time step, (usually after switching tabs, or excution cached in ff)
				// we will drop cycles. perhaps set to a limit of 10 or something?
				var maxBlock = me._TIMESTEP * 20;
				
				if (elapsed >= maxBlock) {
					//console.log('warning: sparks.js is fast fowarding engine, skipping steps', elapsed / emitter._TIMESTEP);
					//emitter.update( (elapsed - maxBlock) / 1000);
					elapsed = maxBlock;
				}
			
				while(elapsed >= me._TIMESTEP) {
					me.update(me._TIMESTEP / 1000);
					elapsed -= me._TIMESTEP;
				}
				me._lastTime = time - elapsed;
				
			} else {
				me.update(elapsed/1000);
				me._lastTime = time;
			}
			
			
			setTimeout(me.step, me._timerStep, me);
			
		},
		
		update: function(time) {
			for (var i=0,il=this._emitters.length;i<il;i++) {
				this._emitters[i].update(time);
			}
		}
		
	};
	
	SPARKS.Emitter = function (counter) {
	    
	    this._counter = counter ? counter : new SPARKS.SteadyCounter(10); // provides number of particles to produce
	    
	    this._particles = [];
	    
	    
	    this._initializers = []; // use for creation of particles
	    this._actions = [];     // uses action to update particles
	    this._activities = [];  //  not supported yet
	        
	    this._handlers = [];
	    
	    this.callbacks = {};
	};
	
	
	SPARKS.Emitter.prototype = {
		
		_TIMESTEP: 15,
		_timer: null,
		_lastTime: null,
		_timerStep: 10,
		_velocityVerlet: false,
		_isRunning: false,
		
		// run its built in timer / stepping
		start: function() {
			this._lastTime = Date.now();
			this._timer = setTimeout(this.step, this._timerStep, this);
			this._isRunning = true;
		},
		
		stop: function() {
			this._isRunning = false;
			clearTimeout(this._timer);
		},
		
		isRunning: function() {
			return this._isRunning;
		},
		
		// Step gets called upon by the engine
		// but attempts to call update() on a regular basics
		// This method is also described in http://gameclosure.com/2011/04/11/deterministic-delta-tee-in-js-games/
		step: function(emitter) {
			
			var time = Date.now();
			var elapsed = time - emitter._lastTime;
		   	
			if (!this._velocityVerlet) {
				// if elapsed is way higher than time step, (usually after switching tabs, or excution cached in ff)
				// we will drop cycles. perhaps set to a limit of 10 or something?
				var maxBlock = emitter._TIMESTEP * 20;
				
				if (elapsed >= maxBlock) {
					//console.log('warning: sparks.js is fast fowarding engine, skipping steps', elapsed / emitter._TIMESTEP);
					//emitter.update( (elapsed - maxBlock) / 1000);
					elapsed = maxBlock;
				}
			
				while(elapsed >= emitter._TIMESTEP) {
					emitter.update(emitter._TIMESTEP / 1000);
					elapsed -= emitter._TIMESTEP;
				}
				emitter._lastTime = time - elapsed;
				
			} else {
				emitter.update(elapsed/1000);
				emitter._lastTime = time;
			}
			
			
			
			if (emitter._isRunning)
			setTimeout(emitter.step, emitter._timerStep, emitter);
			
		},
	
	
		// Update particle engine in seconds, not milliseconds
	    update: function(time) {
			
	        var len = this._counter.updateEmitter( this, time );
	        
	        // Create particles
	        for( i = 0; i < len; i++ ) {
	            this.createParticle();
	        }
	        
	        // Update activities
	        len = this._activities.length;
	        for ( i = 0; i < len; i++ )
	        {
	            this._activities[i].update( this, time );
	        }
	        
	        
	        len = this._actions.length;
	        var action;
	        var len2 = this._particles.length;
	        
	        for( j = 0; j < len; j++ )
	        {
	            action = this._actions[j];
	            for ( i = 0; i < len2; ++i )
	            {
	                particle = this._particles[i];
	                action.update( this, particle, time );
	            }
	        }
	        
	        
	        // remove dead particles
	        for ( i = len2; i--; )
	        {
	            particle = this._particles[i];
	            if ( particle.isDead )
	            {
	                //particle = 
					this._particles.splice( i, 1 );
	                this.dispatchEvent("dead", particle);
					SPARKS.VectorPool.release(particle.position); //
					SPARKS.VectorPool.release(particle.velocity);
	                
	            } else {
	                this.dispatchEvent("updated", particle);
	            }
	        }
	        
			this.dispatchEvent("loopUpdated");
			
	    },
	    
	    createParticle: function() {
	        var particle = new SPARKS.Particle();
	        // In future, use a Particle Factory
	        var len = this._initializers.length, i;
	
	        for ( i = 0; i < len; i++ ) {
	            this._initializers[i].initialize( this, particle );
	        }
	        
	        this._particles.push( particle );
	        
	        this.dispatchEvent("created", particle); // ParticleCreated
	        
	        return particle;
	    },
	    
	    addInitializer: function (initializer) {
	        this._initializers.push(initializer);
	    },
	    
	    addAction: function (action) {
	        this._actions.push(action);
	    },
	
	    removeInitializer: function (initializer) {
			var index = this._initializers.indexOf(initializer);
			if (index > -1) {
				this._initializers.splice( index, 1 );
			}
	    },
	
	    removeAction: function (action) {
			var index = this._actions.indexOf(action);
			if (index > -1) {
				this._actions.splice( index, 1 );
			}
			//console.log('removeAction', index, this._actions);
	    },
	    
	    addCallback: function(name, callback) {
	        this.callbacks[name] = callback;
	    },
	    
	    removeCallback: function(name) {
	        delete this.callbacks[name];
	    },
	    
	    dispatchEvent: function(name, args) {
	        var callback = this.callbacks[name];
	        if (callback) {
	            callback(args);
	        }
	    
	    }
	    
	
	};
	
	
	/*
	 * Constant Names for
	 * Events called by emitter.dispatchEvent()
	 * 
	 */
	SPARKS.EVENT_PARTICLE_CREATED = "created"
	SPARKS.EVENT_PARTICLE_UPDATED = "updated"
	SPARKS.EVENT_PARTICLE_DEAD = "dead";
	SPARKS.EVENT_LOOP_UPDATED = "loopUpdated";
	
	
	
	/*
	 * Steady Counter attempts to produces a particle rate steadily
	 *
	 */
	
	// Number of particles per seconds
	SPARKS.SteadyCounter = function(rate) {
	    this.rate = rate;
	    
		// we use a shortfall counter to make up for slow emitters 
		this.leftover = 0;
		
	};
	
	SPARKS.SteadyCounter.prototype.updateEmitter = function(emitter, time) {
	
		var targetRelease = time * this.rate + this.leftover;
		var actualRelease = Math.floor(targetRelease);
		
		this.leftover = targetRelease - actualRelease;
		
		return actualRelease;
	};
	
	
	/*
	 * Shot Counter produces specified particles 
	 * on a single impluse or burst
	 */
	
	SPARKS.ShotCounter = function(particles) {
		this.particles = particles;
		this.used = false;
	};
	
	SPARKS.ShotCounter.prototype.updateEmitter = function(emitter, time) {
	
		if (this.used) {
			return 0;
		} else {
			this.used = true;
		}
		
		return this.particles;
	};
	
	
	/********************************
	* Particle Class
	*
	*   Represents a single particle
	*********************************/
	SPARKS.Particle = function() {
	
	    /**
	     * The lifetime of the particle, in seconds.
	     */
	    this.lifetime = 0;
	    
	    /**
	     * The age of the particle, in seconds.
	     */
	    this.age = 0;
	    
	    /**
	     * The energy of the particle.
	     */
	    this.energy = 1;
	    
	    /**
	     * Whether the particle is dead and should be removed from the stage.
	     */
	    this.isDead = false;
	    
	    this.target = null; // tag
	    
	    /**
	     * For 3D
	     */
	     
	     this.position = SPARKS.VectorPool.get().set(0,0,0); //new THREE.Vector3( 0, 0, 0 );
	     this.velocity = SPARKS.VectorPool.get().set(0,0,0); //new THREE.Vector3( 0, 0, 0 );
		this._oldvelocity = SPARKS.VectorPool.get().set(0,0,0);
	     // rotation vec3
	     // angVelocity vec3
	     // faceAxis vec3
	    
	};
	
	
	/********************************
	* Action Classes
	*
	*   An abstract class which have
	*   update function
	*********************************/
	SPARKS.Action = function() {
	    this._priority = 0;
	};
	
	
	SPARKS.Age = function(easing) {
	    this._easing = (easing == null) ? TWEEN.Easing.Linear.EaseNone : easing;
	};
	
	SPARKS.Age.prototype.update = function (emitter, particle, time) {
	    particle.age += time;
	    if( particle.age >= particle.lifetime )
	    {
	        particle.energy = 0;
	        particle.isDead = true;
	    }
	    else
	    {
	        var t = this._easing(particle.age / particle.lifetime);
	        particle.energy = -1 * t + 1;
	    }
	};
	
	/*
	// Mark particle as dead when particle's < 0
	
	SPARKS.Death = function(easing) {
	    this._easing = (easing == null) ? TWEEN.Linear.EaseNone : easing;
	};
	
	SPARKS.Death.prototype.update = function (emitter, particle, time) {
	    if (particle.life <= 0) {
	        particle.isDead = true;
	    }
	};
	*/
				
	
	SPARKS.Move = function() {
	    
	};
	
	SPARKS.Move.prototype.update = function(emitter, particle, time) {
	    // attempt verlet velocity updating.
	    var p = particle.position;
		var v = particle.velocity;
	    var old = particle._oldvelocity;
		
		if (this._velocityVerlet) {	
			p.x += (v.x + old.x) * 0.5 * time;
			p.y += (v.y + old.y) * 0.5 * time;
			p.z += (v.z + old.z) * 0.5 * time;
		} else {
			p.x += v.x * time;
			p.y += v.y * time;
			p.z += v.z * time;
		}
	
	    //  OldVel = Vel;
	    // Vel = Vel + Accel * dt;
	    // Pos = Pos + (vel + Vel + Accel * dt) * 0.5 * dt;
		
	
	
	};
	
	/* Marks particles found in specified zone dead */
	SPARKS.DeathZone = function(zone) {
	    this.zone = zone;
	};
	
	SPARKS.DeathZone.prototype.update = function(emitter, particle, time) {
	    
	    if (this.zone.contains(particle.position)) {
			particle.isDead = true;
		}
	
	};
	
	/*
	 * SPARKS.ActionZone applies an action when particle is found in zone
	 */
	SPARKS.ActionZone = function(action, zone) {
		this.action = action;
	    this.zone = zone;
	};
	
	SPARKS.ActionZone.prototype.update = function(emitter, particle, time) {
	
	    if (this.zone.contains(particle.position)) {
			this.action.update( emitter, particle, time );
		}
	
	};
	
	/*
	 * Accelerate action affects velocity in specified 3d direction 
	 */
	SPARKS.Accelerate = function(x,y,z) {
		
		if (x instanceof THREE.Vector3) {
			this.acceleration = x;
			return;
		}
	
	    this.acceleration = new THREE.Vector3(x,y,z);
	    
	};
	
	SPARKS.Accelerate.prototype.update = function(emitter, particle, time) {
	    var acc = this.acceleration;
	    
	    var v = particle.velocity;
	    
		particle._oldvelocity.set(v.x, v.y, v.z);
		
	    v.x += acc.x * time;
	    v.y += acc.y * time;
	    v.z += acc.z * time; 
	
	};
	
	/*
	 * Accelerate Factor accelerate based on a factor of particle's velocity.
	 */
	SPARKS.AccelerateFactor = function(factor) {
	    this.factor = factor;
	};
	
	SPARKS.AccelerateFactor.prototype.update = function(emitter, particle, time) {
	    var factor = this.factor;
	    
	    var v = particle.velocity;
		var len = v.length();
		var adjFactor;
	    if (len>0) {
	
			adjFactor = factor * time / len;
			adjFactor += 1;
			
			v.multiplyScalar(adjFactor);
	
		}
	
	};
	
	/*
	AccelerateNormal
	 * AccelerateVelocity affects velocity based on its velocity direction
	 */
	SPARKS.AccelerateVelocity = function(factor) {
	
		this.factor = factor;
	
	};
	
	SPARKS.AccelerateVelocity.prototype.update = function(emitter, particle, time) {
	    var factor = this.factor;
	
	    var v = particle.velocity;
	
	
	    v.z += - v.x * factor;
	    v.y += v.z * factor;
	    v.x +=  v.y * factor;
	
	};
	
	
	/* Set the max ammount of x,y,z drift movements in a second */
	SPARKS.RandomDrift = function(x,y,z) {
		if (x instanceof THREE.Vector3) {
			this.drift = x;
			return;
		}
	
	    this.drift = new THREE.Vector3(x,y,z);
	}
	
	
	SPARKS.RandomDrift.prototype.update = function(emitter, particle, time) {
	    var drift = this.drift;
	    
	    var v = particle.velocity;
	    
	    v.x += ( Math.random() - 0.5 ) * drift.x * time;
	    v.y += ( Math.random() - 0.5 ) * drift.y * time;
	    v.z += ( Math.random() - 0.5 ) * drift.z * time;
	
	};
	
	/********************************
	* Zone Classes
	*
	*   An abstract classes which have
	*   getLocation() function
	*********************************/
	SPARKS.Zone = function() {
	};
	
	// TODO, contains() for Zone
	
	SPARKS.PointZone = function(pos) {
	    this.pos = pos;
	};
	
	SPARKS.PointZone.prototype.getLocation = function() {
	    return this.pos;
	};
	
	SPARKS.PointZone = function(pos) {
	    this.pos = pos;
	};
	
	SPARKS.PointZone.prototype.getLocation = function() {
	    return this.pos;
	};
	
	SPARKS.LineZone = function(start, end) {
	    this.start = start;
		this.end = end;
		this._length = end.clone().sub( start );
	};
	
	SPARKS.LineZone.prototype.getLocation = function() {
	    var len = this._length.clone();
	
		len.multiplyScalar( Math.random() );
		return len.add( this.start );
		
	};
	
	// Basically a RectangleZone
	SPARKS.ParallelogramZone = function(corner, side1, side2) {
	    this.corner = corner;
		this.side1 = side1;
		this.side2 = side2;
	};
	
	SPARKS.ParallelogramZone.prototype.getLocation = function() {
	    
		var d1 = this.side1.clone().multiplyScalar( Math.random() );
		var d2 = this.side2.clone().multiplyScalar( Math.random() );
		d1.add(d2);
		return d1.add( this.corner );
		
	};
	
	SPARKS.CubeZone = function(position, x, y, z) {
	    this.position = position;
		this.x = x;
		this.y = y;
		this.z = z;
	};
	
	SPARKS.CubeZone.prototype.getLocation = function() {
	    //TODO use pool?
	
		var location = this.position.clone();
		location.x += Math.random() * this.x;
		location.y += Math.random() * this.y;
		location.z += Math.random() * this.z;
		
		return location;
		
	};
	
	
	SPARKS.CubeZone.prototype.contains = function(position) {
	
		var startX = this.position.x;
		var startY = this.position.y;
		var startZ = this.position.z;
		var x = this.x; // width
		var y = this.y; // depth
		var z = this.z; // height
		
		if (x<0) {
			startX += x;
			x = Math.abs(x);
		}
		
		if (y<0) {
			startY += y;
			y = Math.abs(y);
		}
		
		if (z<0) {
			startZ += z;
			z = Math.abs(z);
		}
		
		var diffX = position.x - startX;
		var diffY = position.y - startY;
		var diffZ = position.z - startZ;
		
		if ( (diffX > 0) && (diffX < x) && 
				(diffY > 0) && (diffY < y) && 
				(diffZ > 0) && (diffZ < z) ) {
			return true;
		}
		
		return false;
		
	};
	
	
	
	/**
	 * The constructor creates a DiscZone 3D zone.
	 * 
	 * @param centre The point at the center of the disc.
	 * @param normal A vector normal to the disc.
	 * @param outerRadius The outer radius of the disc.
	 * @param innerRadius The inner radius of the disc. This defines the hole 
	 * in the center of the disc. If set to zero, there is no hole. 
	 */
	
	/*
	// BUGGY!!
	SPARKS.DiscZone = function(center, radiusNormal, outerRadius, innerRadius) {
	    this.center = center;
		this.radiusNormal = radiusNormal;
		this.outerRadius = (outerRadius==undefined) ? 0 : outerRadius;
		this.innerRadius = (innerRadius==undefined) ? 0 : innerRadius;
		
	};
	
	SPARKS.DiscZone.prototype.getLocation = function() {
	    var rand = Math.random();
		var _innerRadius = this.innerRadius;
		var _outerRadius = this.outerRadius;
		var center = this.center;
		var _normal = this.radiusNormal;
		
		_distToOrigin = _normal.dot( center );
		
		var radius = _innerRadius + (1 - rand * rand ) * ( _outerRadius - _innerRadius );
		var angle = Math.random() * SPARKS.Utils.TWOPI;
		
		var _distToOrigin = _normal.dot( center );
		var axes = SPARKS.Utils.getPerpendiculars( _normal.clone() );
		var _planeAxis1 = axes[0];
		var _planeAxis2 = axes[1];
		
		var p = _planeAxis1.clone();
		p.multiplyScalar( radius * Math.cos( angle ) );
		var p2 = _planeAxis2.clone();
		p2.multiplyScalar( radius * Math.sin( angle ) );
		p.add( p2 );
		return _center.add( p );
		
	};
	*/
	
	SPARKS.SphereCapZone = function(x, y, z, minr, maxr, angle) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    this.minr = minr;
	    this.maxr = maxr;
	    this.angle = angle;
	};
	
	SPARKS.SphereCapZone.prototype.getLocation = function() {
	    var theta = Math.PI *2  * SPARKS.Utils.random();
	    var r = SPARKS.Utils.random();
	    
	    //new THREE.Vector3
	    var v =  SPARKS.VectorPool.get().set(r * Math.cos(theta), -1 / Math.tan(this.angle * SPARKS.Utils.DEGREE_TO_RADIAN), r * Math.sin(theta));
	    
	    //v.length = StardustMath.interpolate(0, _minRadius, 1, _maxRadius, Math.random());
	            
	    var i = this.minr - ((this.minr-this.maxr) *  Math.random() );
	    v.multiplyScalar(i);
	
		v.__markedForReleased = true;
	    
	    return v;
	};
	
	
	/********************************
	* Initializer Classes
	*
	*   Classes which initializes
	*   particles. Implements initialize( emitter:Emitter, particle:Particle )
	*********************************/
	
	// Specifies random life between max and min
	SPARKS.Lifetime = function(min, max) {
	    this._min = min;
	    
	    this._max = max ? max : min;
	    
	};
	
	SPARKS.Lifetime.prototype.initialize = function( emitter/*Emitter*/, particle/*Particle*/ ) {
	    particle.lifetime = this._min + SPARKS.Utils.random() * ( this._max - this._min );
	};
	
	
	SPARKS.Position = function(zone) {
	    this.zone = zone;
	};
	
	SPARKS.Position.prototype.initialize = function( emitter/*Emitter*/, particle/*Particle*/ ) {
	    var pos = this.zone.getLocation();
	    particle.position.set(pos.x, pos.y, pos.z);
	};
	
	SPARKS.Velocity = function(zone) {
	    this.zone = zone;
	};
	
	SPARKS.Velocity.prototype.initialize = function( emitter/*Emitter*/, particle/*Particle*/ ) {
	    var pos = this.zone.getLocation();
	    particle.velocity.set(pos.x, pos.y, pos.z);
		if (pos.__markedForReleased) {
			//console.log("release");
			SPARKS.VectorPool.release(pos);
			pos.__markedForReleased = false;
		}
	};
	
	SPARKS.Target = function(target, callback) {
	    this.target = target;
	    this.callback = callback;
	};
	
	SPARKS.Target.prototype.initialize = function( emitter, particle ) {
	
	    if (this.callback) {
	        particle.target = this.callback();
	    } else {
	        particle.target = this.target;
	    }
	
	};
	
	/********************************
	* VectorPool 
	*
	*  Reuse much of Vectors if possible
	*********************************/
	
	SPARKS.VectorPool = {
		__pools: [],
	
		// Get a new Vector
		get: function() {
			if (this.__pools.length>0) {
				return this.__pools.pop();
			}
			
			return this._addToPool();
			
		},
		
		// Release a vector back into the pool
		release: function(v) {
			this.__pools.push(v);
		},
		
		// Create a bunch of vectors and add to the pool
		_addToPool: function() {
			//console.log("creating some pools");
			
			for (var i=0, size = 100; i < size; i++) {
				this.__pools.push(new THREE.Vector3());
			}
			
			return new THREE.Vector3();
			
		}
		
		
		
	};
	
	
	/********************************
	* Util Classes
	*
	*   Classes which initializes
	*   particles. Implements initialize( emitter:Emitter, particle:Particle )
	*********************************/
	SPARKS.Utils = {
	    random: function() {
	        return Math.random();
	    },
	    DEGREE_TO_RADIAN: Math.PI / 180,
		TWOPI: Math.PI * 2,
	
		getPerpendiculars: function(normal) {
			var p1 = this.getPerpendicular( normal );
			var p2 = normal.cross( p1 );
			p2.normalize();
			return [ p1, p2 ];
		},
		
		getPerpendicular: function( v )
		{
			if( v.x == 0 )
			{
				return new THREE.Vector3D( 1, 0, 0 );
			}
			else
			{
				var temp = new THREE.Vector3( v.y, -v.x, 0 );
				return temp.normalize();
			}
		}
	
	};

/***/ },
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Vignette shader
	 * based on PaintEffect postprocess from ro.me
	 * http://code.google.com/p/3-dreams-of-black/source/browse/deploy/js/effects/PaintEffect.js
	 */
	
	THREE.VignetteShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"offset":   { type: "f", value: 1.0 },
			"darkness": { type: "f", value: 1.0 }
	
		},
	
		vertexShader: [
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	
			"}"
	
		].join("\n"),
	
		fragmentShader: [
	
			"uniform float offset;",
			"uniform float darkness;",
	
			"uniform sampler2D tDiffuse;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				// Eskil's vignette
	
				"vec4 texel = texture2D( tDiffuse, vUv );",
				"vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );",
				"gl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );",
	
				/*
				// alternative version from glfx.js
				// this one makes more "dusty" look (as opposed to "burned")
	
				"vec4 color = texture2D( tDiffuse, vUv );",
				"float dist = distance( vUv, vec2( 0.5 ) );",
				"color.rgb *= smoothstep( 0.8, offset * 0.799, dist *( darkness + offset ) );",
				"gl_FragColor = color;",
				*/
	
			"}"
	
		].join("\n")
	
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 *
	 * Two pass Gaussian blur filter (horizontal and vertical blur shaders)
	 * - described in http://www.gamerendering.com/2008/10/11/gaussian-blur-filter-shader/
	 *   and used in http://www.cake23.de/traveling-wavefronts-lit-up.html
	 *
	 * - 9 samples per pass
	 * - standard deviation 2.7
	 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
	 */
	
	THREE.HorizontalBlurShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"h":        { type: "f", value: 1.0 / 512.0 }
	
		},
	
		vertexShader: [
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	
			"}"
	
		].join("\n"),
	
		fragmentShader: [
	
			"uniform sampler2D tDiffuse;",
			"uniform float h;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vec4 sum = vec4( 0.0 );",
	
				"sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;",
				"sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;",
				"sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;",
				"sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
				"sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;",
				"sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;",
				"sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;",
				"sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;",
	
				"gl_FragColor = sum;",
	
			"}"
	
		].join("\n")
	
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 *
	 * Two pass Gaussian blur filter (horizontal and vertical blur shaders)
	 * - described in http://www.gamerendering.com/2008/10/11/gaussian-blur-filter-shader/
	 *   and used in http://www.cake23.de/traveling-wavefronts-lit-up.html
	 *
	 * - 9 samples per pass
	 * - standard deviation 2.7
	 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
	 */
	
	THREE.VerticalBlurShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"v":        { type: "f", value: 1.0 / 512.0 }
	
		},
	
		vertexShader: [
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	
			"}"
	
		].join("\n"),
	
		fragmentShader: [
	
			"uniform sampler2D tDiffuse;",
			"uniform float v;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vec4 sum = vec4( 0.0 );",
	
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;",
				"sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;",
	
				"gl_FragColor = sum;",
	
			"}"
	
		].join("\n")
	
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Bleach bypass shader [http://en.wikipedia.org/wiki/Bleach_bypass]
	 * - based on Nvidia example
	 * http://developer.download.nvidia.com/shaderlibrary/webpages/shader_library.html#post_bleach_bypass
	 */
	
	THREE.BleachBypassShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"opacity":  { type: "f", value: 1.0 }
	
		},
	
		vertexShader: [
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	
			"}"
	
		].join("\n"),
	
		fragmentShader: [
	
			"uniform float opacity;",
	
			"uniform sampler2D tDiffuse;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vec4 base = texture2D( tDiffuse, vUv );",
	
				"vec3 lumCoeff = vec3( 0.25, 0.65, 0.1 );",
				"float lum = dot( lumCoeff, base.rgb );",
				"vec3 blend = vec3( lum );",
	
				"float L = min( 1.0, max( 0.0, 10.0 * ( lum - 0.45 ) ) );",
	
				"vec3 result1 = 2.0 * base.rgb * blend;",
				"vec3 result2 = 1.0 - 2.0 * ( 1.0 - blend ) * ( 1.0 - base.rgb );",
	
				"vec3 newColor = mix( result1, result2, L );",
	
				"float A2 = opacity * base.a;",
				"vec3 mixRGB = A2 * newColor.rgb;",
				"mixRGB += ( ( 1.0 - A2 ) * base.rgb );",
	
				"gl_FragColor = vec4( mixRGB, base.a );",
	
			"}"
	
		].join("\n")
	
	};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Convolution shader
	 * ported from o3d sample to WebGL / GLSL
	 * http://o3d.googlecode.com/svn/trunk/samples/convolution.html
	 */
	
	THREE.ConvolutionShader = {
	
		defines: {
	
			"KERNEL_SIZE_FLOAT": "25.0",
			"KERNEL_SIZE_INT": "25",
	
		},
	
		uniforms: {
	
			"tDiffuse":        { type: "t", value: null },
			"uImageIncrement": { type: "v2", value: new THREE.Vector2( 0.001953125, 0.0 ) },
			"cKernel":         { type: "fv1", value: [] }
	
		},
	
		vertexShader: [
	
			"uniform vec2 uImageIncrement;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	
			"}"
	
		].join("\n"),
	
		fragmentShader: [
	
			"uniform float cKernel[ KERNEL_SIZE_INT ];",
	
			"uniform sampler2D tDiffuse;",
			"uniform vec2 uImageIncrement;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vec2 imageCoord = vUv;",
				"vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );",
	
				"for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {",
	
					"sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];",
					"imageCoord += uImageIncrement;",
	
				"}",
	
				"gl_FragColor = sum;",
	
			"}"
	
	
		].join("\n"),
	
		buildKernel: function ( sigma ) {
	
			// We lop off the sqrt(2 * pi) * sigma term, since we're going to normalize anyway.
	
			function gauss( x, sigma ) {
	
				return Math.exp( - ( x * x ) / ( 2.0 * sigma * sigma ) );
	
			}
	
			var i, values, sum, halfWidth, kMaxKernelSize = 25, kernelSize = 2 * Math.ceil( sigma * 3.0 ) + 1;
	
			if ( kernelSize > kMaxKernelSize ) kernelSize = kMaxKernelSize;
			halfWidth = ( kernelSize - 1 ) * 0.5;
	
			values = new Array( kernelSize );
			sum = 0.0;
			for ( i = 0; i < kernelSize; ++i ) {
	
				values[ i ] = gauss( i - halfWidth, sigma );
				sum += values[ i ];
	
			}
	
			// normalize the kernel
	
			for ( i = 0; i < kernelSize; ++i ) values[ i ] /= sum;
	
			return values;
	
		}
	
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Film grain & scanlines shader
	 *
	 * - ported from HLSL to WebGL / GLSL
	 * http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
	 *
	 * Screen Space Static Postprocessor
	 *
	 * Produces an analogue noise overlay similar to a film grain / TV static
	 *
	 * Original implementation and noise algorithm
	 * Pat 'Hawthorne' Shearon
	 *
	 * Optimized scanlines + noise version with intensity scaling
	 * Georg 'Leviathan' Steinrohder
	 *
	 * This version is provided under a Creative Commons Attribution 3.0 License
	 * http://creativecommons.org/licenses/by/3.0/
	 */
	
	THREE.FilmShader = {
	
		uniforms: {
	
			"tDiffuse":   { type: "t", value: null },
			"time":       { type: "f", value: 0.0 },
			"nIntensity": { type: "f", value: 0.5 },
			"sIntensity": { type: "f", value: 0.05 },
			"sCount":     { type: "f", value: 4096 },
			"grayscale":  { type: "i", value: 1 }
	
		},
	
		vertexShader: [
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	
			"}"
	
		].join("\n"),
	
		fragmentShader: [
	
			// control parameter
			"uniform float time;",
	
			"uniform bool grayscale;",
	
			// noise effect intensity value (0 = no effect, 1 = full effect)
			"uniform float nIntensity;",
	
			// scanlines effect intensity value (0 = no effect, 1 = full effect)
			"uniform float sIntensity;",
	
			// scanlines effect count value (0 = no effect, 4096 = full effect)
			"uniform float sCount;",
	
			"uniform sampler2D tDiffuse;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				// sample the source
				"vec4 cTextureScreen = texture2D( tDiffuse, vUv );",
	
				// make some noise
				"float x = vUv.x * vUv.y * time *  1000.0;",
				"x = mod( x, 13.0 ) * mod( x, 123.0 );",
				"float dx = mod( x, 0.01 );",
	
				// add noise
				"vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );",
	
				// get us a sine and cosine
				"vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );",
	
				// add scanlines
				"cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;",
	
				// interpolate between source and result by intensity
				"cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );",
	
				// convert to grayscale if desired
				"if( grayscale ) {",
	
					"cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );",
	
				"}",
	
				"gl_FragColor =  vec4( cResult, cTextureScreen.a );",
	
			"}"
	
		].join("\n")
	
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	THREE.DotScreenPass = function ( center, angle, scale ) {
	
		if ( THREE.DotScreenShader === undefined )
			console.error( "THREE.DotScreenPass relies on THREE.DotScreenShader" );
	
		var shader = THREE.DotScreenShader;
	
		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	
		if ( center !== undefined ) this.uniforms[ "center" ].value.copy( center );
		if ( angle !== undefined ) this.uniforms[ "angle"].value = angle;
		if ( scale !== undefined ) this.uniforms[ "scale"].value = scale;
	
		this.material = new THREE.ShaderMaterial( {
	
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader
	
		} );
	
		this.enabled = true;
		this.renderToScreen = false;
		this.needsSwap = true;
	
	};
	
	THREE.DotScreenPass.prototype = {
	
		render: function ( renderer, writeBuffer, readBuffer, delta ) {
	
			this.uniforms[ "tDiffuse" ].value = readBuffer;
			this.uniforms[ "tSize" ].value.set( readBuffer.width, readBuffer.height );
	
			THREE.EffectComposer.quad.material = this.material;
	
			if ( this.renderToScreen ) {
	
				renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );
	
			} else {
	
				renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, writeBuffer, false );
	
			}
	
		}
	
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	THREE.BloomPass = function ( strength, kernelSize, sigma, resolution ) {
	
		strength = ( strength !== undefined ) ? strength : 1;
		kernelSize = ( kernelSize !== undefined ) ? kernelSize : 25;
		sigma = ( sigma !== undefined ) ? sigma : 4.0;
		resolution = ( resolution !== undefined ) ? resolution : 256;
	
		// render targets
	
		var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
	
		this.renderTargetX = new THREE.WebGLRenderTarget( resolution, resolution, pars );
		this.renderTargetY = new THREE.WebGLRenderTarget( resolution, resolution, pars );
	
		// copy material
	
		if ( THREE.CopyShader === undefined )
			console.error( "THREE.BloomPass relies on THREE.CopyShader" );
	
		var copyShader = THREE.CopyShader;
	
		this.copyUniforms = THREE.UniformsUtils.clone( copyShader.uniforms );
	
		this.copyUniforms[ "opacity" ].value = strength;
	
		this.materialCopy = new THREE.ShaderMaterial( {
	
			uniforms: this.copyUniforms,
			vertexShader: copyShader.vertexShader,
			fragmentShader: copyShader.fragmentShader,
			blending: THREE.AdditiveBlending,
			transparent: true
	
		} );
	
		// convolution material
	
		if ( THREE.ConvolutionShader === undefined )
			console.error( "THREE.BloomPass relies on THREE.ConvolutionShader" );
	
		var convolutionShader = THREE.ConvolutionShader;
	
		this.convolutionUniforms = THREE.UniformsUtils.clone( convolutionShader.uniforms );
	
		this.convolutionUniforms[ "uImageIncrement" ].value = THREE.BloomPass.blurx;
		this.convolutionUniforms[ "cKernel" ].value = THREE.ConvolutionShader.buildKernel( sigma );
	
		this.materialConvolution = new THREE.ShaderMaterial( {
	
			uniforms: this.convolutionUniforms,
			vertexShader:  convolutionShader.vertexShader,
			fragmentShader: convolutionShader.fragmentShader,
			defines: {
				"KERNEL_SIZE_FLOAT": kernelSize.toFixed( 1 ),
				"KERNEL_SIZE_INT": kernelSize.toFixed( 0 )
			}
	
		} );
	
		this.enabled = true;
		this.needsSwap = false;
		this.clear = false;
	
	};
	
	THREE.BloomPass.prototype = {
	
		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {
	
			if ( maskActive ) renderer.context.disable( renderer.context.STENCIL_TEST );
	
			// Render quad with blured scene into texture (convolution pass 1)
	
			THREE.EffectComposer.quad.material = this.materialConvolution;
	
			this.convolutionUniforms[ "tDiffuse" ].value = readBuffer;
			this.convolutionUniforms[ "uImageIncrement" ].value = THREE.BloomPass.blurX;
	
			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, this.renderTargetX, true );
	
	
			// Render quad with blured scene into texture (convolution pass 2)
	
			this.convolutionUniforms[ "tDiffuse" ].value = this.renderTargetX;
			this.convolutionUniforms[ "uImageIncrement" ].value = THREE.BloomPass.blurY;
	
			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, this.renderTargetY, true );
	
			// Render original scene with superimposed blur to texture
	
			THREE.EffectComposer.quad.material = this.materialCopy;
	
			this.copyUniforms[ "tDiffuse" ].value = this.renderTargetY;
	
			if ( maskActive ) renderer.context.enable( renderer.context.STENCIL_TEST );
	
			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, readBuffer, this.clear );
	
		}
	
	};
	
	THREE.BloomPass.blurX = new THREE.Vector2( 0.001953125, 0.0 );
	THREE.BloomPass.blurY = new THREE.Vector2( 0.0, 0.001953125 );


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	THREE.FilmPass = function ( noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale ) {
	
		if ( THREE.FilmShader === undefined )
			console.error( "THREE.FilmPass relies on THREE.FilmShader" );
	
		var shader = THREE.FilmShader;
	
		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	
		this.material = new THREE.ShaderMaterial( {
	
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader
	
		} );
	
		if ( grayscale !== undefined )	this.uniforms.grayscale.value = grayscale;
		if ( noiseIntensity !== undefined ) this.uniforms.nIntensity.value = noiseIntensity;
		if ( scanlinesIntensity !== undefined ) this.uniforms.sIntensity.value = scanlinesIntensity;
		if ( scanlinesCount !== undefined ) this.uniforms.sCount.value = scanlinesCount;
	
		this.enabled = true;
		this.renderToScreen = false;
		this.needsSwap = true;
	
	};
	
	THREE.FilmPass.prototype = {
	
		render: function ( renderer, writeBuffer, readBuffer, delta ) {
	
			this.uniforms[ "tDiffuse" ].value = readBuffer;
			this.uniforms[ "time" ].value += delta;
	
			THREE.EffectComposer.quad.material = this.material;
	
			if ( this.renderToScreen ) {
	
				renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );
	
			} else {
	
				renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, writeBuffer, false );
	
			}
	
		}
	
	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author Tim Knip / http://www.floorplanner.com/ / tim at floorplanner.com
	 */
	
	THREE.ColladaLoader = function () {
	
		var COLLADA = null;
		var scene = null;
		var daeScene;
	
		var readyCallbackFunc = null;
	
		var sources = {};
		var images = {};
		var animations = {};
		var controllers = {};
		var geometries = {};
		var materials = {};
		var effects = {};
		var cameras = {};
		var lights = {};
	
		var animData;
		var visualScenes;
		var baseUrl;
		var morphs;
		var skins;
	
		var flip_uv = true;
		var preferredShading = THREE.SmoothShading;
	
		var options = {
			// Force Geometry to always be centered at the local origin of the
			// containing Mesh.
			centerGeometry: false,
	
			// Axis conversion is done for geometries, animations, and controllers.
			// If we ever pull cameras or lights out of the COLLADA file, they'll
			// need extra work.
			convertUpAxis: false,
	
			subdivideFaces: true,
	
			upAxis: 'Y',
	
			// For reflective or refractive materials we'll use this cubemap
			defaultEnvMap: null
	
		};
	
		var colladaUnit = 1.0;
		var colladaUp = 'Y';
		var upConversion = null;
	
		function load ( url, readyCallback, progressCallback ) {
	
			var length = 0;
	
			if ( document.implementation && document.implementation.createDocument ) {
	
				var request = new XMLHttpRequest();
	
				request.onreadystatechange = function() {
	
					if( request.readyState == 4 ) {
	
						if( request.status == 0 || request.status == 200 ) {
	
	
							if ( request.responseXML ) {
	
								readyCallbackFunc = readyCallback;
								parse( request.responseXML, undefined, url );
	
							} else if ( request.responseText ) {
	
								readyCallbackFunc = readyCallback;
								var xmlParser = new DOMParser();
								var responseXML = xmlParser.parseFromString( request.responseText, "application/xml" );
								parse( responseXML, undefined, url );
	
							} else {
	
								console.error( "ColladaLoader: Empty or non-existing file (" + url + ")" );
	
							}
	
						}
	
					} else if ( request.readyState == 3 ) {
	
						if ( progressCallback ) {
	
							if ( length == 0 ) {
	
								length = request.getResponseHeader( "Content-Length" );
	
							}
	
							progressCallback( { total: length, loaded: request.responseText.length } );
	
						}
	
					}
	
				}
	
				request.open( "GET", url, true );
				request.send( null );
	
			} else {
	
				alert( "Don't know how to parse XML!" );
	
			}
	
		}
	
		function parse( doc, callBack, url ) {
	
			COLLADA = doc;
			callBack = callBack || readyCallbackFunc;
	
			if ( url !== undefined ) {
	
				var parts = url.split( '/' );
				parts.pop();
				baseUrl = ( parts.length < 1 ? '.' : parts.join( '/' ) ) + '/';
	
			}
	
			parseAsset();
			setUpConversion();
			images = parseLib( "library_images image", _Image, "image" );
			materials = parseLib( "library_materials material", Material, "material" );
			effects = parseLib( "library_effects effect", Effect, "effect" );
			geometries = parseLib( "library_geometries geometry", Geometry, "geometry" );
			cameras = parseLib( "library_cameras camera", Camera, "camera" );
			lights = parseLib( "library_lights light", Light, "light" );
			controllers = parseLib( "library_controllers controller", Controller, "controller" );
			animations = parseLib( "library_animations animation", Animation, "animation" );
			visualScenes = parseLib( "library_visual_scenes visual_scene", VisualScene, "visual_scene" );
			
			morphs = [];
			skins = [];
	
			daeScene = parseScene();
			scene = new THREE.Object3D();
	
			for ( var i = 0; i < daeScene.nodes.length; i ++ ) {
	
				scene.add( createSceneGraph( daeScene.nodes[ i ] ) );
	
			}
	
			// unit conversion
			scene.scale.multiplyScalar( colladaUnit );
	
			createAnimations();
	
			var result = {
	
				scene: scene,
				morphs: morphs,
				skins: skins,
				animations: animData,
				dae: {
					images: images,
					materials: materials,
					cameras: cameras,
					lights: lights,
					effects: effects,
					geometries: geometries,
					controllers: controllers,
					animations: animations,
					visualScenes: visualScenes,
					scene: daeScene
				}
	
			};
	
			if ( callBack ) {
	
				callBack( result );
	
			}
	
			return result;
	
		}
	
		function setPreferredShading ( shading ) {
	
			preferredShading = shading;
	
		}
	
		function parseAsset () {
	
			var elements = COLLADA.querySelectorAll('asset');
	
			var element = elements[0];
	
			if ( element && element.childNodes ) {
	
				for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
					var child = element.childNodes[ i ];
	
					switch ( child.nodeName ) {
	
						case 'unit':
	
							var meter = child.getAttribute( 'meter' );
	
							if ( meter ) {
	
								colladaUnit = parseFloat( meter );
	
							}
	
							break;
	
						case 'up_axis':
	
							colladaUp = child.textContent.charAt(0);
							break;
	
					}
	
				}
	
			}
	
		}
	
		function parseLib ( q, classSpec, prefix ) {
	
			var elements = COLLADA.querySelectorAll(q);
	
			var lib = {};
	
			var i = 0;
	
			var elementsLength = elements.length;
	
			for ( var j = 0; j < elementsLength; j ++ ) {
	
				var element = elements[j];
				var daeElement = ( new classSpec() ).parse( element );
	
				if ( !daeElement.id || daeElement.id.length == 0 ) daeElement.id = prefix + ( i ++ );
				lib[ daeElement.id ] = daeElement;
	
			}
	
			return lib;
	
		}
	
		function parseScene() {
		
			var sceneElement = COLLADA.querySelectorAll('scene instance_visual_scene')[0];
			
			if ( sceneElement ) {
	
				var url = sceneElement.getAttribute( 'url' ).replace( /^#/, '' );
				return visualScenes[ url.length > 0 ? url : 'visual_scene0' ];
	
			} else {
	
				return null;
	
			}
	
		}
	
		function createAnimations() {
	
			animData = [];
	
			// fill in the keys
			recurseHierarchy( scene );
	
		}
	
		function recurseHierarchy( node ) {
	
			var n = daeScene.getChildById( node.name, true ),
				newData = null;
	
			if ( n && n.keys ) {
	
				newData = {
					fps: 60,
					hierarchy: [ {
						node: n,
						keys: n.keys,
						sids: n.sids
					} ],
					node: node,
					name: 'animation_' + node.name,
					length: 0
				};
	
				animData.push(newData);
	
				for ( var i = 0, il = n.keys.length; i < il; i++ ) {
	
					newData.length = Math.max( newData.length, n.keys[i].time );
	
				}
	
			} else  {
	
				newData = {
					hierarchy: [ {
						keys: [],
						sids: []
					} ]
				}
	
			}
	
			for ( var i = 0, il = node.children.length; i < il; i++ ) {
	
				var d = recurseHierarchy( node.children[i] );
	
				for ( var j = 0, jl = d.hierarchy.length; j < jl; j ++ ) {
	
					newData.hierarchy.push( {
						keys: [],
						sids: []
					} );
	
				}
	
			}
	
			return newData;
	
		}
	
		function calcAnimationBounds () {
	
			var start = 1000000;
			var end = -start;
			var frames = 0;
			var ID;
			for ( var id in animations ) {
	
				var animation = animations[ id ];
				ID = ID || animation.id; 
				for ( var i = 0; i < animation.sampler.length; i ++ ) {
	
					var sampler = animation.sampler[ i ];
					
					sampler.create();
	
					start = Math.min( start, sampler.startTime );
					end = Math.max( end, sampler.endTime );
					frames = Math.max( frames, sampler.input.length );
	
				}
	
			}
	
			return { start:start, end:end, frames:frames,ID:ID };
	
		}
	
		function createMorph ( geometry, ctrl ) {
	
			var morphCtrl = ctrl instanceof InstanceController ? controllers[ ctrl.url ] : ctrl;
	
			if ( !morphCtrl || !morphCtrl.morph ) {
	
				console.log("could not find morph controller!");
				return;
	
			}
	
			var morph = morphCtrl.morph;
	
			for ( var i = 0; i < morph.targets.length; i ++ ) {
	
				var target_id = morph.targets[ i ];
				var daeGeometry = geometries[ target_id ];
	
				if ( !daeGeometry.mesh ||
					 !daeGeometry.mesh.primitives ||
					 !daeGeometry.mesh.primitives.length ) {
					 continue;
				}
	
				var target = daeGeometry.mesh.primitives[ 0 ].geometry;
	
				if ( target.vertices.length === geometry.vertices.length ) {
	
					geometry.morphTargets.push( { name: "target_1", vertices: target.vertices } );
	
				}
	
			}
	
			geometry.morphTargets.push( { name: "target_Z", vertices: geometry.vertices } );
	
		};
	
		function createSkin ( geometry, ctrl, applyBindShape ) {
	
			var skinCtrl = controllers[ ctrl.url ];
	
			if ( !skinCtrl || !skinCtrl.skin ) {
	
				console.log( "could not find skin controller!" );
				return;
	
			}
	
			if ( !ctrl.skeleton || !ctrl.skeleton.length ) {
	
				console.log( "could not find the skeleton for the skin!" );
				return;
	
			}
	
			var skin = skinCtrl.skin;
			var skeleton = daeScene.getChildById( ctrl.skeleton[ 0 ] );
			var hierarchy = [];
	
			applyBindShape = applyBindShape !== undefined ? applyBindShape : true;
	
			var bones = [];
			geometry.skinWeights = [];
			geometry.skinIndices = [];
	
			//createBones( geometry.bones, skin, hierarchy, skeleton, null, -1 );
			//createWeights( skin, geometry.bones, geometry.skinIndices, geometry.skinWeights );
	
			/*
			geometry.animation = {
				name: 'take_001',
				fps: 30,
				length: 2,
				JIT: true,
				hierarchy: hierarchy
			};
			*/
	
			if ( applyBindShape ) {
	
				for ( var i = 0; i < geometry.vertices.length; i ++ ) {
	
					geometry.vertices[ i ].applyMatrix4( skin.bindShapeMatrix );
	
				}
	
			}
	
		}
	
		function setupSkeleton ( node, bones, frame, parent ) {
	
			node.world = node.world || new THREE.Matrix4();
			node.localworld = node.localworld || new THREE.Matrix4();
			node.world.copy( node.matrix );
			node.localworld.copy( node.matrix );
	
			if ( node.channels && node.channels.length ) {
	
				var channel = node.channels[ 0 ];
				var m = channel.sampler.output[ frame ];
	
				if ( m instanceof THREE.Matrix4 ) {
	
					node.world.copy( m );
					node.localworld.copy(m);
					if(frame == 0)
						node.matrix.copy(m);
				}
	
			}
	
			if ( parent ) {
	
				node.world.multiplyMatrices( parent, node.world );
	
			}
	
			bones.push( node );
	
			for ( var i = 0; i < node.nodes.length; i ++ ) {
	
				setupSkeleton( node.nodes[ i ], bones, frame, node.world );
	
			}
	
		}
	
		function setupSkinningMatrices ( bones, skin ) {
	
			// FIXME: this is dumb...
			
			for ( var i = 0; i < bones.length; i ++ ) {
			
				var bone = bones[ i ];
				var found = -1;
	
				if ( bone.type != 'JOINT' ) continue;
	
				for ( var j = 0; j < skin.joints.length; j ++ ) {
	
					if ( bone.sid == skin.joints[ j ] ) {
	
						found = j;
						break;
	
					}
	
				}
	
				if ( found >= 0 ) {
	
					var inv = skin.invBindMatrices[ found ];
	
					bone.invBindMatrix = inv;
					bone.skinningMatrix = new THREE.Matrix4();
					bone.skinningMatrix.multiplyMatrices(bone.world, inv); // (IBMi * JMi)
					bone.animatrix = new THREE.Matrix4();
	
					bone.animatrix.copy(bone.localworld);
					bone.weights = [];
	
					for ( var j = 0; j < skin.weights.length; j ++ ) {
						
						for (var k = 0; k < skin.weights[ j ].length; k ++ ) {
	
							var w = skin.weights[ j ][ k ];
	
							if ( w.joint == found ) {
	
								bone.weights.push( w );
	
							}
	
						}
	
					}
	
				} else {
	
					console.warn( "ColladaLoader: Could not find joint '" + bone.sid + "'." );
	
					bone.skinningMatrix = new THREE.Matrix4();
					bone.weights = [];
	
				}
			}
	
		}
	
		//Walk the Collada tree and flatten the bones into a list, extract the position, quat and scale from the matrix
		function flattenSkeleton(skeleton) {
	
			var list = [];
			var walk = function(parentid, node, list) {
	
				var bone = {};
				bone.name = node.sid;
				bone.parent = parentid;
				bone.matrix = node.matrix;
				var data = [new THREE.Vector3(),new THREE.Quaternion(),new THREE.Vector3()];
				bone.matrix.decompose(data[0],data[1],data[2]);
								
				bone.pos = [data[0].x,data[0].y,data[0].z];
								
				bone.scl = [data[2].x,data[2].y,data[2].z];
				bone.rotq = [data[1].x,data[1].y,data[1].z,data[1].w];
				list.push(bone);
	
				for(var i in node.nodes) {
	
					walk(node.sid,node.nodes[i],list);
	
				}
	
			};
	
			walk(-1,skeleton,list);
			return list;
	
		}
	
		//Move the vertices into the pose that is proper for the start of the animation
		function skinToBindPose(geometry,skeleton,skinController) {
	
			var bones = [];
			setupSkeleton( skeleton, bones, -1 );
			setupSkinningMatrices( bones, skinController.skin );
			v = new THREE.Vector3();
			var skinned = [];
	
			for(var i =0; i < geometry.vertices.length; i++) {
	
				skinned.push(new THREE.Vector3());
	
			}
	
			for ( i = 0; i < bones.length; i ++ ) {
	
				if ( bones[ i ].type != 'JOINT' ) continue;
	
				for ( j = 0; j < bones[ i ].weights.length; j ++ ) {
	
					w = bones[ i ].weights[ j ];
					vidx = w.index;
					weight = w.weight;
	
					o = geometry.vertices[vidx];
					s = skinned[vidx];
					
					v.x = o.x;
					v.y = o.y;
					v.z = o.z;
	
					v.applyMatrix4( bones[i].skinningMatrix );
	
					s.x += (v.x * weight);
					s.y += (v.y * weight);
					s.z += (v.z * weight);
				}
	
			}
	
			for(var i =0; i < geometry.vertices.length; i++) {
	
				geometry.vertices[i] = skinned[i];
	
			}
	
		}
	
		function applySkin ( geometry, instanceCtrl, frame ) {
	
			// TODO: get this from the renderer or options
			var maxbones = 30;
			
			var skinController = controllers[ instanceCtrl.url ];
	
			frame = frame !== undefined ? frame : 40;
	
			if ( !skinController || !skinController.skin ) {
	
				console.log( 'ColladaLoader: Could not find skin controller.' );
				return;
	
			}
	
			if ( !instanceCtrl.skeleton || !instanceCtrl.skeleton.length ) {
	
				console.log( 'ColladaLoader: Could not find the skeleton for the skin. ' );
				return;
	
			}
	
			var animationBounds = calcAnimationBounds();
			var skeleton = daeScene.getChildById( instanceCtrl.skeleton[0], true ) ||
						   daeScene.getChildBySid( instanceCtrl.skeleton[0], true );
			
			//flatten the skeleton into a list of bones
			var bonelist = flattenSkeleton(skeleton);
			var joints = skinController.skin.joints;
	
			//sort that list so that the order reflects the order in the joint list
			var sortedbones = [];
			for(var i = 0; i < joints.length; i++) {
	
				for(var j =0; j < bonelist.length; j++) {
	
					if(bonelist[j].name == joints[i]) {
	
						sortedbones[i] = bonelist[j];
	
					}
	
				}
	
			}
	
			//hook up the parents by index instead of name
			for(var i = 0; i < sortedbones.length; i++) {
	
				for(var j =0; j < sortedbones.length; j++) {
	
					if(sortedbones[i].parent == sortedbones[j].name) {
	
						sortedbones[i].parent = j;
	
					}
	
				}
	
			}
	
	
			var i, j, w, vidx, weight;
			var v = new THREE.Vector3(), o, s;
	
			// move vertices to bind shape
			for ( i = 0; i < geometry.vertices.length; i ++ ) {
						geometry.vertices[i].applyMatrix4( skinController.skin.bindShapeMatrix );
			}
	
			var skinIndices = [];
			var skinWeights = [];
			var weights = skinController.skin.weights;
	
			//hook up the skin weights
			// TODO -  this might be a good place to choose greatest 4 weights
			for(var i =0; i < weights.length; i++) {
	
				var indicies = new THREE.Vector4(weights[i][0]?weights[i][0].joint:0,weights[i][1]?weights[i][1].joint:0,weights[i][2]?weights[i][2].joint:0,weights[i][3]?weights[i][3].joint:0);
				var weight = new THREE.Vector4(weights[i][0]?weights[i][0].weight:0,weights[i][1]?weights[i][1].weight:0,weights[i][2]?weights[i][2].weight:0,weights[i][3]?weights[i][3].weight:0);
				
				skinIndices.push(indicies);
				skinWeights.push(weight);
	
			}
	
			geometry.skinIndices = skinIndices;
			geometry.skinWeights = skinWeights;
			geometry.bones = sortedbones;
			// process animation, or simply pose the rig if no animation
			
			//create an animation for the animated bones
			//NOTE: this has no effect when using morphtargets
			var animationdata = {"name":animationBounds.ID,"fps":30,"length":animationBounds.frames/30,"hierarchy":[]};
	
			for(var j =0; j < sortedbones.length; j++) {
	
				animationdata.hierarchy.push({parent:sortedbones[j].parent, name:sortedbones[j].name, keys:[]});
	
			}
	
			//if using hardware skinning, move the vertices into the binding pose
			if(sortedbones.length < maxbones) {
	
				skinToBindPose(geometry,skeleton,skinController);
	
			}
	
			for ( frame = 0; frame < animationBounds.frames; frame ++ ) {
	
				var bones = [];
				var skinned = [];
				// process the frame and setup the rig with a fresh
				// transform, possibly from the bone's animation channel(s)
	
				setupSkeleton( skeleton, bones, frame );
				setupSkinningMatrices( bones, skinController.skin );
	
				//if using hardware skinning, just hook up the animiation data
				if(sortedbones.length < maxbones) {
	
					for(var i = 0; i < bones.length; i ++) {
	
						for(var j = 0; j < animationdata.hierarchy.length; j ++) {
	
							if(animationdata.hierarchy[j].name == bones[i].sid) {
	
								var key = {};
								key.time = (frame/30);
								key.matrix = bones[i].animatrix;
								
								if(frame == 0)
									bones[i].matrix = key.matrix;
								
								var data = [new THREE.Vector3(),new THREE.Quaternion(),new THREE.Vector3()];
								key.matrix.decompose(data[0],data[1],data[2]);
								
								key.pos = [data[0].x,data[0].y,data[0].z];
								
								key.scl = [data[2].x,data[2].y,data[2].z];
								key.rot = data[1];
	
								animationdata.hierarchy[j].keys.push(key);
	
							}
	
						}
	
					}
	
					geometry.animation = animationdata;
	
				} else {
	
					// otherwise, process the animation into morphtargets
					
					for ( i = 0; i < geometry.vertices.length; i++ ) {
	
						skinned.push( new THREE.Vector3() );
	
					}
	
					for ( i = 0; i < bones.length; i ++ ) {
	
						if ( bones[ i ].type != 'JOINT' ) continue;
	
						for ( j = 0; j < bones[ i ].weights.length; j ++ ) {
	
							w = bones[ i ].weights[ j ];
							vidx = w.index;
							weight = w.weight;
	
							o = geometry.vertices[vidx];
							s = skinned[vidx];
	
							v.x = o.x;
							v.y = o.y;
							v.z = o.z;
	
							v.applyMatrix4( bones[i].skinningMatrix );
	
							s.x += (v.x * weight);
							s.y += (v.y * weight);
							s.z += (v.z * weight);
	
						}
	
					}
	
				geometry.morphTargets.push( { name: "target_" + frame, vertices: skinned } );
	
				}
	
			}
	
		};
	
		function createSceneGraph ( node, parent ) {
	
			var obj = new THREE.Object3D();
			var skinned = false;
			var skinController;
			var morphController;
			var i, j;
	
			// FIXME: controllers
	
			for ( i = 0; i < node.controllers.length; i ++ ) {
	
				var controller = controllers[ node.controllers[ i ].url ];
	
				switch ( controller.type ) {
	
					case 'skin':
	
						if ( geometries[ controller.skin.source ] ) {
	
							var inst_geom = new InstanceGeometry();
	
							inst_geom.url = controller.skin.source;
							inst_geom.instance_material = node.controllers[ i ].instance_material;
	
							node.geometries.push( inst_geom );
							skinned = true;
							skinController = node.controllers[ i ];
	
						} else if ( controllers[ controller.skin.source ] ) {
	
							// urgh: controller can be chained
							// handle the most basic case...
	
							var second = controllers[ controller.skin.source ];
							morphController = second;
						//	skinController = node.controllers[i];
	
							if ( second.morph && geometries[ second.morph.source ] ) {
	
								var inst_geom = new InstanceGeometry();
	
								inst_geom.url = second.morph.source;
								inst_geom.instance_material = node.controllers[ i ].instance_material;
	
								node.geometries.push( inst_geom );
	
							}
	
						}
	
						break;
	
					case 'morph':
	
						if ( geometries[ controller.morph.source ] ) {
	
							var inst_geom = new InstanceGeometry();
	
							inst_geom.url = controller.morph.source;
							inst_geom.instance_material = node.controllers[ i ].instance_material;
	
							node.geometries.push( inst_geom );
							morphController = node.controllers[ i ];
	
						}
	
						console.log( 'ColladaLoader: Morph-controller partially supported.' );
	
					default:
						break;
	
				}
	
			}
	
			// geometries
	
			var double_sided_materials = {};
	
			for ( i = 0; i < node.geometries.length; i ++ ) {
	
				var instance_geometry = node.geometries[i];
				var instance_materials = instance_geometry.instance_material;
				var geometry = geometries[ instance_geometry.url ];
				var used_materials = {};
				var used_materials_array = [];
				var num_materials = 0;
				var first_material;
	
				if ( geometry ) {
	
					if ( !geometry.mesh || !geometry.mesh.primitives )
						continue;
	
					if ( obj.name.length == 0 ) {
	
						obj.name = geometry.id;
	
					}
	
					// collect used fx for this geometry-instance
	
					if ( instance_materials ) {
	
						for ( j = 0; j < instance_materials.length; j ++ ) {
	
							var instance_material = instance_materials[ j ];
							var mat = materials[ instance_material.target ];
							var effect_id = mat.instance_effect.url;
							var shader = effects[ effect_id ].shader;
							var material3js = shader.material;
	
							if ( geometry.doubleSided ) {
	
								if ( !( instance_material.symbol in double_sided_materials ) ) {
	
									var _copied_material = material3js.clone();
									_copied_material.side = THREE.DoubleSide;
									double_sided_materials[ instance_material.symbol ] = _copied_material;
	
								}
	
								material3js = double_sided_materials[ instance_material.symbol ];
	
							}
	
							material3js.opacity = !material3js.opacity ? 1 : material3js.opacity;
							used_materials[ instance_material.symbol ] = num_materials;
							used_materials_array.push( material3js );
							first_material = material3js;
							first_material.name = mat.name == null || mat.name === '' ? mat.id : mat.name;
							num_materials ++;
	
						}
	
					}
	
					var mesh;
					var material = first_material || new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.FlatShading, side: geometry.doubleSided ? THREE.DoubleSide : THREE.FrontSide } );
					var geom = geometry.mesh.geometry3js;
	
					if ( num_materials > 1 ) {
	
						material = new THREE.MeshFaceMaterial( used_materials_array );
	
						for ( j = 0; j < geom.faces.length; j ++ ) {
	
							var face = geom.faces[ j ];
							face.materialIndex = used_materials[ face.daeMaterial ]
	
						}
	
					}
	
					if ( skinController !== undefined ) {
	
						
						applySkin( geom, skinController );
	
						if(geom.morphTargets.length > 0) {
	
							material.morphTargets = true;
							material.skinning = false;
	
						} else {
	
							material.morphTargets = false;
							material.skinning = true;
	
						}				
						
	
						mesh = new THREE.SkinnedMesh( geom, material, false );
	
	
						//mesh.skeleton = skinController.skeleton;
						//mesh.skinController = controllers[ skinController.url ];
						//mesh.skinInstanceController = skinController;
						mesh.name = 'skin_' + skins.length;
	
						
						
						//mesh.animationHandle.setKey(0);
						skins.push( mesh );
	
					} else if ( morphController !== undefined ) {
	
						createMorph( geom, morphController );
	
						material.morphTargets = true;
	
						mesh = new THREE.Mesh( geom, material );
						mesh.name = 'morph_' + morphs.length;
	
						morphs.push( mesh );
	
					} else {
	
						mesh = new THREE.Mesh( geom, material );
						// mesh.geom.name = geometry.id;
	
					}
	
					node.geometries.length > 1 ? obj.add( mesh ) : obj = mesh;
	
				}
	
			}
	
			for ( i = 0; i < node.cameras.length; i ++ ) {
	
				var instance_camera = node.cameras[i];
				var cparams = cameras[instance_camera.url];
	
				obj = new THREE.PerspectiveCamera(cparams.fov, parseFloat(cparams.aspect_ratio), 
						parseFloat(cparams.znear), parseFloat(cparams.zfar));
	
			}
	
			for ( i = 0; i < node.lights.length; i ++ ) {
	
				var instance_light = node.lights[i];
				var lparams = lights[instance_light.url];
	
				if ( lparams && lparams.technique ) {
	
					var color = lparams.color.getHex();
					var intensity = lparams.intensity;
					var distance = 0;
					var angle = lparams.falloff_angle;
					var exponent; // Intentionally undefined, don't know what this is yet
	
					switch ( lparams.technique ) {
	
						case 'directional':
	
							obj = new THREE.DirectionalLight( color, intensity, distance );
							break;
	
						case 'point':
	
							obj = new THREE.PointLight( color, intensity, distance );
							break;
	
						case 'spot':
	
							obj = new THREE.SpotLight( color, intensity, distance, angle, exponent );
							break;
	
						case 'ambient':
	
							obj = new THREE.AmbientLight( color );
							break;
	
					}
	
				}
	
			}
	
			obj.name = node.name || node.id || "";
			obj.layer = node.layer || "";
			obj.matrix = node.matrix;
			obj.matrix.decompose( obj.position, obj.quaternion, obj.scale );
	
			if ( options.centerGeometry && obj.geometry ) {
	
				var delta = THREE.GeometryUtils.center( obj.geometry );
				delta.multiply( obj.scale );
				delta.applyQuaternion( obj.quaternion );
	
				obj.position.sub( delta );
	
			}
	
			for ( i = 0; i < node.nodes.length; i ++ ) {
	
				obj.add( createSceneGraph( node.nodes[i], node ) );
	
			}
	
			return obj;
	
		};
	
		function getJointId( skin, id ) {
	
			for ( var i = 0; i < skin.joints.length; i ++ ) {
	
				if ( skin.joints[ i ] == id ) {
	
					return i;
	
				}
	
			}
	
		};
	
		function getLibraryNode( id ) {
	
	        var nodes = COLLADA.querySelectorAll('library_nodes node');
	
	        for ( var i = 0; i < nodes.length; i++ ) {
	
	            var attObj = nodes[i].attributes.getNamedItem('id');
	            if ( attObj && attObj.value === id ) {
	                return nodes[i];
	        }
	        }
	
	        return undefined;
	
		};
	
		function getChannelsForNode (node ) {
	
			var channels = [];
			var startTime = 1000000;
			var endTime = -1000000;
	
			for ( var id in animations ) {
	
				var animation = animations[id];
	
				for ( var i = 0; i < animation.channel.length; i ++ ) {
	
					var channel = animation.channel[i];
					var sampler = animation.sampler[i];
					var id = channel.target.split('/')[0];
	
					if ( id == node.id ) {
	
						sampler.create();
						channel.sampler = sampler;
						startTime = Math.min(startTime, sampler.startTime);
						endTime = Math.max(endTime, sampler.endTime);
						channels.push(channel);
	
					}
	
				}
	
			}
	
			if ( channels.length ) {
	
				node.startTime = startTime;
				node.endTime = endTime;
	
			}
	
			return channels;
	
		};
	
		function calcFrameDuration( node ) {
	
			var minT = 10000000;
	
			for ( var i = 0; i < node.channels.length; i ++ ) {
	
				var sampler = node.channels[i].sampler;
	
				for ( var j = 0; j < sampler.input.length - 1; j ++ ) {
	
					var t0 = sampler.input[ j ];
					var t1 = sampler.input[ j + 1 ];
					minT = Math.min( minT, t1 - t0 );
	
				}
			}
	
			return minT;
	
		};
	
		function calcMatrixAt( node, t ) {
	
			var animated = {};
	
			var i, j;
	
			for ( i = 0; i < node.channels.length; i ++ ) {
	
				var channel = node.channels[ i ];
				animated[ channel.sid ] = channel;
	
			}
	
			var matrix = new THREE.Matrix4();
	
			for ( i = 0; i < node.transforms.length; i ++ ) {
	
				var transform = node.transforms[ i ];
				var channel = animated[ transform.sid ];
	
				if ( channel !== undefined ) {
	
					var sampler = channel.sampler;
					var value;
	
					for ( j = 0; j < sampler.input.length - 1; j ++ ) {
	
						if ( sampler.input[ j + 1 ] > t ) {
	
							value = sampler.output[ j ];
							//console.log(value.flatten)
							break;
	
						}
	
					}
	
					if ( value !== undefined ) {
	
						if ( value instanceof THREE.Matrix4 ) {
	
							matrix.multiplyMatrices( matrix, value );
	
						} else {
	
							// FIXME: handle other types
	
							matrix.multiplyMatrices( matrix, transform.matrix );
	
						}
	
					} else {
	
						matrix.multiplyMatrices( matrix, transform.matrix );
	
					}
	
				} else {
	
					matrix.multiplyMatrices( matrix, transform.matrix );
	
				}
	
			}
	
			return matrix;
	
		};
	
		function bakeAnimations ( node ) {
	
			if ( node.channels && node.channels.length ) {
	
				var keys = [],
					sids = [];
	
				for ( var i = 0, il = node.channels.length; i < il; i++ ) {
	
					var channel = node.channels[i],
						fullSid = channel.fullSid,
						sampler = channel.sampler,
						input = sampler.input,
						transform = node.getTransformBySid( channel.sid ),
						member;
	
					if ( channel.arrIndices ) {
	
						member = [];
	
						for ( var j = 0, jl = channel.arrIndices.length; j < jl; j++ ) {
	
							member[ j ] = getConvertedIndex( channel.arrIndices[ j ] );
	
						}
	
					} else {
	
						member = getConvertedMember( channel.member );
	
					}
	
					if ( transform ) {
	
						if ( sids.indexOf( fullSid ) === -1 ) {
	
							sids.push( fullSid );
	
						}
	
						for ( var j = 0, jl = input.length; j < jl; j++ ) {
	
							var time = input[j],
								data = sampler.getData( transform.type, j ),
								key = findKey( keys, time );
	
							if ( !key ) {
	
								key = new Key( time );
								var timeNdx = findTimeNdx( keys, time );
								keys.splice( timeNdx == -1 ? keys.length : timeNdx, 0, key );
	
							}
	
							key.addTarget( fullSid, transform, member, data );
	
						}
	
					} else {
	
						console.log( 'Could not find transform "' + channel.sid + '" in node ' + node.id );
	
					}
	
				}
	
				// post process
				for ( var i = 0; i < sids.length; i++ ) {
	
					var sid = sids[ i ];
	
					for ( var j = 0; j < keys.length; j++ ) {
	
						var key = keys[ j ];
	
						if ( !key.hasTarget( sid ) ) {
	
							interpolateKeys( keys, key, j, sid );
	
						}
	
					}
	
				}
	
				node.keys = keys;
				node.sids = sids;
	
			}
	
		};
	
		function findKey ( keys, time) {
	
			var retVal = null;
	
			for ( var i = 0, il = keys.length; i < il && retVal == null; i++ ) {
	
				var key = keys[i];
	
				if ( key.time === time ) {
	
					retVal = key;
	
				} else if ( key.time > time ) {
	
					break;
	
				}
	
			}
	
			return retVal;
	
		};
	
		function findTimeNdx ( keys, time) {
	
			var ndx = -1;
	
			for ( var i = 0, il = keys.length; i < il && ndx == -1; i++ ) {
	
				var key = keys[i];
	
				if ( key.time >= time ) {
	
					ndx = i;
	
				}
	
			}
	
			return ndx;
	
		};
	
		function interpolateKeys ( keys, key, ndx, fullSid ) {
	
			var prevKey = getPrevKeyWith( keys, fullSid, ndx ? ndx-1 : 0 ),
				nextKey = getNextKeyWith( keys, fullSid, ndx+1 );
	
			if ( prevKey && nextKey ) {
	
				var scale = (key.time - prevKey.time) / (nextKey.time - prevKey.time),
					prevTarget = prevKey.getTarget( fullSid ),
					nextData = nextKey.getTarget( fullSid ).data,
					prevData = prevTarget.data,
					data;
	
				if ( prevTarget.type === 'matrix' ) {
	
					data = prevData;
	
				} else if ( prevData.length ) {
	
					data = [];
	
					for ( var i = 0; i < prevData.length; ++i ) {
	
						data[ i ] = prevData[ i ] + ( nextData[ i ] - prevData[ i ] ) * scale;
	
					}
	
				} else {
	
					data = prevData + ( nextData - prevData ) * scale;
	
				}
	
				key.addTarget( fullSid, prevTarget.transform, prevTarget.member, data );
	
			}
	
		};
	
		// Get next key with given sid
	
		function getNextKeyWith( keys, fullSid, ndx ) {
	
			for ( ; ndx < keys.length; ndx++ ) {
	
				var key = keys[ ndx ];
	
				if ( key.hasTarget( fullSid ) ) {
	
					return key;
	
				}
	
			}
	
			return null;
	
		};
	
		// Get previous key with given sid
	
		function getPrevKeyWith( keys, fullSid, ndx ) {
	
			ndx = ndx >= 0 ? ndx : ndx + keys.length;
	
			for ( ; ndx >= 0; ndx-- ) {
	
				var key = keys[ ndx ];
	
				if ( key.hasTarget( fullSid ) ) {
	
					return key;
	
				}
	
			}
	
			return null;
	
		};
	
		function _Image() {
	
			this.id = "";
			this.init_from = "";
	
		};
	
		_Image.prototype.parse = function(element) {
	
			this.id = element.getAttribute('id');
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				if ( child.nodeName == 'init_from' ) {
	
					this.init_from = child.textContent;
	
				}
	
			}
	
			return this;
	
		};
	
		function Controller() {
	
			this.id = "";
			this.name = "";
			this.type = "";
			this.skin = null;
			this.morph = null;
	
		};
	
		Controller.prototype.parse = function( element ) {
	
			this.id = element.getAttribute('id');
			this.name = element.getAttribute('name');
			this.type = "none";
	
			for ( var i = 0; i < element.childNodes.length; i++ ) {
	
				var child = element.childNodes[ i ];
	
				switch ( child.nodeName ) {
	
					case 'skin':
	
						this.skin = (new Skin()).parse(child);
						this.type = child.nodeName;
						break;
	
					case 'morph':
	
						this.morph = (new Morph()).parse(child);
						this.type = child.nodeName;
						break;
	
					default:
						break;
	
				}
			}
	
			return this;
	
		};
	
		function Morph() {
	
			this.method = null;
			this.source = null;
			this.targets = null;
			this.weights = null;
	
		};
	
		Morph.prototype.parse = function( element ) {
	
			var sources = {};
			var inputs = [];
			var i;
	
			this.method = element.getAttribute( 'method' );
			this.source = element.getAttribute( 'source' ).replace( /^#/, '' );
	
			for ( i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'source':
	
						var source = ( new Source() ).parse( child );
						sources[ source.id ] = source;
						break;
	
					case 'targets':
	
						inputs = this.parseInputs( child );
						break;
	
					default:
	
						console.log( child.nodeName );
						break;
	
				}
	
			}
	
			for ( i = 0; i < inputs.length; i ++ ) {
	
				var input = inputs[ i ];
				var source = sources[ input.source ];
	
				switch ( input.semantic ) {
	
					case 'MORPH_TARGET':
	
						this.targets = source.read();
						break;
	
					case 'MORPH_WEIGHT':
	
						this.weights = source.read();
						break;
	
					default:
						break;
	
				}
			}
	
			return this;
	
		};
	
		Morph.prototype.parseInputs = function(element) {
	
			var inputs = [];
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[i];
				if ( child.nodeType != 1) continue;
	
				switch ( child.nodeName ) {
	
					case 'input':
	
						inputs.push( (new Input()).parse(child) );
						break;
	
					default:
						break;
				}
			}
	
			return inputs;
	
		};
	
		function Skin() {
	
			this.source = "";
			this.bindShapeMatrix = null;
			this.invBindMatrices = [];
			this.joints = [];
			this.weights = [];
	
		};
	
		Skin.prototype.parse = function( element ) {
	
			var sources = {};
			var joints, weights;
	
			this.source = element.getAttribute( 'source' ).replace( /^#/, '' );
			this.invBindMatrices = [];
			this.joints = [];
			this.weights = [];
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'bind_shape_matrix':
	
						var f = _floats(child.textContent);
						this.bindShapeMatrix = getConvertedMat4( f );
						break;
	
					case 'source':
	
						var src = new Source().parse(child);
						sources[ src.id ] = src;
						break;
	
					case 'joints':
	
						joints = child;
						break;
	
					case 'vertex_weights':
	
						weights = child;
						break;
	
					default:
	
						console.log( child.nodeName );
						break;
	
				}
			}
	
			this.parseJoints( joints, sources );
			this.parseWeights( weights, sources );
	
			return this;
	
		};
	
		Skin.prototype.parseJoints = function ( element, sources ) {
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'input':
	
						var input = ( new Input() ).parse( child );
						var source = sources[ input.source ];
	
						if ( input.semantic == 'JOINT' ) {
	
							this.joints = source.read();
	
						} else if ( input.semantic == 'INV_BIND_MATRIX' ) {
	
							this.invBindMatrices = source.read();
	
						}
	
						break;
	
					default:
						break;
				}
	
			}
	
		};
	
		Skin.prototype.parseWeights = function ( element, sources ) {
	
			var v, vcount, inputs = [];
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'input':
	
						inputs.push( ( new Input() ).parse( child ) );
						break;
	
					case 'v':
	
						v = _ints( child.textContent );
						break;
	
					case 'vcount':
	
						vcount = _ints( child.textContent );
						break;
	
					default:
						break;
	
				}
	
			}
	
			var index = 0;
	
			for ( var i = 0; i < vcount.length; i ++ ) {
	
				var numBones = vcount[i];
				var vertex_weights = [];
	
				for ( var j = 0; j < numBones; j++ ) {
	
					var influence = {};
	
					for ( var k = 0; k < inputs.length; k ++ ) {
	
						var input = inputs[ k ];
						var value = v[ index + input.offset ];
	
						switch ( input.semantic ) {
	
							case 'JOINT':
	
								influence.joint = value;//this.joints[value];
								break;
	
							case 'WEIGHT':
	
								influence.weight = sources[ input.source ].data[ value ];
								break;
	
							default:
								break;
	
						}
	
					}
	
					vertex_weights.push( influence );
					index += inputs.length;
				}
	
				for ( var j = 0; j < vertex_weights.length; j ++ ) {
	
					vertex_weights[ j ].index = i;
	
				}
	
				this.weights.push( vertex_weights );
	
			}
	
		};
	
		function VisualScene () {
	
			this.id = "";
			this.name = "";
			this.nodes = [];
			this.scene = new THREE.Object3D();
	
		};
	
		VisualScene.prototype.getChildById = function( id, recursive ) {
	
			for ( var i = 0; i < this.nodes.length; i ++ ) {
	
				var node = this.nodes[ i ].getChildById( id, recursive );
	
				if ( node ) {
	
					return node;
	
				}
	
			}
	
			return null;
	
		};
	
		VisualScene.prototype.getChildBySid = function( sid, recursive ) {
	
			for ( var i = 0; i < this.nodes.length; i ++ ) {
	
				var node = this.nodes[ i ].getChildBySid( sid, recursive );
	
				if ( node ) {
	
					return node;
	
				}
	
			}
	
			return null;
	
		};
	
		VisualScene.prototype.parse = function( element ) {
	
			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
			this.nodes = [];
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'node':
	
						this.nodes.push( ( new Node() ).parse( child ) );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		function Node() {
	
			this.id = "";
			this.name = "";
			this.sid = "";
			this.nodes = [];
			this.controllers = [];
			this.transforms = [];
			this.geometries = [];
			this.channels = [];
			this.matrix = new THREE.Matrix4();
	
		};
	
		Node.prototype.getChannelForTransform = function( transformSid ) {
	
			for ( var i = 0; i < this.channels.length; i ++ ) {
	
				var channel = this.channels[i];
				var parts = channel.target.split('/');
				var id = parts.shift();
				var sid = parts.shift();
				var dotSyntax = (sid.indexOf(".") >= 0);
				var arrSyntax = (sid.indexOf("(") >= 0);
				var arrIndices;
				var member;
	
				if ( dotSyntax ) {
	
					parts = sid.split(".");
					sid = parts.shift();
					member = parts.shift();
	
				} else if ( arrSyntax ) {
	
					arrIndices = sid.split("(");
					sid = arrIndices.shift();
	
					for ( var j = 0; j < arrIndices.length; j ++ ) {
	
						arrIndices[ j ] = parseInt( arrIndices[ j ].replace( /\)/, '' ) );
	
					}
	
				}
	
				if ( sid == transformSid ) {
	
					channel.info = { sid: sid, dotSyntax: dotSyntax, arrSyntax: arrSyntax, arrIndices: arrIndices };
					return channel;
	
				}
	
			}
	
			return null;
	
		};
	
		Node.prototype.getChildById = function ( id, recursive ) {
	
			if ( this.id == id ) {
	
				return this;
	
			}
	
			if ( recursive ) {
	
				for ( var i = 0; i < this.nodes.length; i ++ ) {
	
					var n = this.nodes[ i ].getChildById( id, recursive );
	
					if ( n ) {
	
						return n;
	
					}
	
				}
	
			}
	
			return null;
	
		};
	
		Node.prototype.getChildBySid = function ( sid, recursive ) {
	
			if ( this.sid == sid ) {
	
				return this;
	
			}
	
			if ( recursive ) {
	
				for ( var i = 0; i < this.nodes.length; i ++ ) {
	
					var n = this.nodes[ i ].getChildBySid( sid, recursive );
	
					if ( n ) {
	
						return n;
	
					}
	
				}
			}
	
			return null;
	
		};
	
		Node.prototype.getTransformBySid = function ( sid ) {
	
			for ( var i = 0; i < this.transforms.length; i ++ ) {
	
				if ( this.transforms[ i ].sid == sid ) return this.transforms[ i ];
	
			}
	
			return null;
	
		};
	
		Node.prototype.parse = function( element ) {
	
			var url;
	
			this.id = element.getAttribute('id');
			this.sid = element.getAttribute('sid');
			this.name = element.getAttribute('name');
			this.type = element.getAttribute('type');
			this.layer = element.getAttribute('layer');
	
			this.type = this.type == 'JOINT' ? this.type : 'NODE';
	
			this.nodes = [];
			this.transforms = [];
			this.geometries = [];
			this.cameras = [];
			this.lights = [];
			this.controllers = [];
			this.matrix = new THREE.Matrix4();
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'node':
	
						this.nodes.push( ( new Node() ).parse( child ) );
						break;
	
					case 'instance_camera':
	
						this.cameras.push( ( new InstanceCamera() ).parse( child ) );
						break;
	
					case 'instance_controller':
	
						this.controllers.push( ( new InstanceController() ).parse( child ) );
						break;
	
					case 'instance_geometry':
	
						this.geometries.push( ( new InstanceGeometry() ).parse( child ) );
						break;
	
					case 'instance_light':
	
						this.lights.push( ( new InstanceLight() ).parse( child ) );
						break;
	
					case 'instance_node':
	
						url = child.getAttribute( 'url' ).replace( /^#/, '' );
						var iNode = getLibraryNode( url );
	
						if ( iNode ) {
	
							this.nodes.push( ( new Node() ).parse( iNode )) ;
	
						}
	
						break;
	
					case 'rotate':
					case 'translate':
					case 'scale':
					case 'matrix':
					case 'lookat':
					case 'skew':
	
						this.transforms.push( ( new Transform() ).parse( child ) );
						break;
	
					case 'extra':
						break;
	
					default:
	
						console.log( child.nodeName );
						break;
	
				}
	
			}
	
			this.channels = getChannelsForNode( this );
			bakeAnimations( this );
	
			this.updateMatrix();
	
			return this;
	
		};
	
		Node.prototype.updateMatrix = function () {
	
			this.matrix.identity();
	
			for ( var i = 0; i < this.transforms.length; i ++ ) {
	
				this.transforms[ i ].apply( this.matrix );
	
			}
	
		};
	
		function Transform () {
	
			this.sid = "";
			this.type = "";
			this.data = [];
			this.obj = null;
	
		};
	
		Transform.prototype.parse = function ( element ) {
	
			this.sid = element.getAttribute( 'sid' );
			this.type = element.nodeName;
			this.data = _floats( element.textContent );
			this.convert();
	
			return this;
	
		};
	
		Transform.prototype.convert = function () {
	
			switch ( this.type ) {
	
				case 'matrix':
	
					this.obj = getConvertedMat4( this.data );
					break;
	
				case 'rotate':
	
					this.angle = THREE.Math.degToRad( this.data[3] );
	
				case 'translate':
	
					fixCoords( this.data, -1 );
					this.obj = new THREE.Vector3( this.data[ 0 ], this.data[ 1 ], this.data[ 2 ] );
					break;
	
				case 'scale':
	
					fixCoords( this.data, 1 );
					this.obj = new THREE.Vector3( this.data[ 0 ], this.data[ 1 ], this.data[ 2 ] );
					break;
	
				default:
					console.log( 'Can not convert Transform of type ' + this.type );
					break;
	
			}
	
		};
	
		Transform.prototype.apply = function () {
	
			var m1 = new THREE.Matrix4();
	
			return function ( matrix ) {
	
				switch ( this.type ) {
	
					case 'matrix':
	
						matrix.multiply( this.obj );
	
						break;
	
					case 'translate':
	
						matrix.multiply( m1.makeTranslation( this.obj.x, this.obj.y, this.obj.z ) );
	
						break;
	
					case 'rotate':
	
						matrix.multiply( m1.makeRotationAxis( this.obj, this.angle ) );
	
						break;
	
					case 'scale':
	
						matrix.scale( this.obj );
	
						break;
	
				}
	
			};
	
		}();
	
		Transform.prototype.update = function ( data, member ) {
	
			var members = [ 'X', 'Y', 'Z', 'ANGLE' ];
	
			switch ( this.type ) {
	
				case 'matrix':
	
					if ( ! member ) {
	
						this.obj.copy( data );
	
					} else if ( member.length === 1 ) {
	
						switch ( member[ 0 ] ) {
	
							case 0:
	
								this.obj.n11 = data[ 0 ];
								this.obj.n21 = data[ 1 ];
								this.obj.n31 = data[ 2 ];
								this.obj.n41 = data[ 3 ];
	
								break;
	
							case 1:
	
								this.obj.n12 = data[ 0 ];
								this.obj.n22 = data[ 1 ];
								this.obj.n32 = data[ 2 ];
								this.obj.n42 = data[ 3 ];
	
								break;
	
							case 2:
	
								this.obj.n13 = data[ 0 ];
								this.obj.n23 = data[ 1 ];
								this.obj.n33 = data[ 2 ];
								this.obj.n43 = data[ 3 ];
	
								break;
	
							case 3:
	
								this.obj.n14 = data[ 0 ];
								this.obj.n24 = data[ 1 ];
								this.obj.n34 = data[ 2 ];
								this.obj.n44 = data[ 3 ];
	
								break;
	
						}
	
					} else if ( member.length === 2 ) {
	
						var propName = 'n' + ( member[ 0 ] + 1 ) + ( member[ 1 ] + 1 );
						this.obj[ propName ] = data;
	
					} else {
	
						console.log('Incorrect addressing of matrix in transform.');
	
					}
	
					break;
	
				case 'translate':
				case 'scale':
	
					if ( Object.prototype.toString.call( member ) === '[object Array]' ) {
	
						member = members[ member[ 0 ] ];
	
					}
	
					switch ( member ) {
	
						case 'X':
	
							this.obj.x = data;
							break;
	
						case 'Y':
	
							this.obj.y = data;
							break;
	
						case 'Z':
	
							this.obj.z = data;
							break;
	
						default:
	
							this.obj.x = data[ 0 ];
							this.obj.y = data[ 1 ];
							this.obj.z = data[ 2 ];
							break;
	
					}
	
					break;
	
				case 'rotate':
	
					if ( Object.prototype.toString.call( member ) === '[object Array]' ) {
	
						member = members[ member[ 0 ] ];
	
					}
	
					switch ( member ) {
	
						case 'X':
	
							this.obj.x = data;
							break;
	
						case 'Y':
	
							this.obj.y = data;
							break;
	
						case 'Z':
	
							this.obj.z = data;
							break;
	
						case 'ANGLE':
	
							this.angle = THREE.Math.degToRad( data );
							break;
	
						default:
	
							this.obj.x = data[ 0 ];
							this.obj.y = data[ 1 ];
							this.obj.z = data[ 2 ];
							this.angle = THREE.Math.degToRad( data[ 3 ] );
							break;
	
					}
					break;
	
			}
	
		};
	
		function InstanceController() {
	
			this.url = "";
			this.skeleton = [];
			this.instance_material = [];
	
		};
	
		InstanceController.prototype.parse = function ( element ) {
	
			this.url = element.getAttribute('url').replace(/^#/, '');
			this.skeleton = [];
			this.instance_material = [];
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType !== 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'skeleton':
	
						this.skeleton.push( child.textContent.replace(/^#/, '') );
						break;
	
					case 'bind_material':
				
						var instances = child.querySelectorAll('instance_material');
						
						for ( var j = 0; j < instances.length; j ++ ){
	
							var instance = instances[j];
							this.instance_material.push( (new InstanceMaterial()).parse(instance) );
							
						}
	
	
						break;
	
					case 'extra':
						break;
	
					default:
						break;
	
				}
			}
	
			return this;
	
		};
	
		function InstanceMaterial () {
	
			this.symbol = "";
			this.target = "";
	
		};
	
		InstanceMaterial.prototype.parse = function ( element ) {
	
			this.symbol = element.getAttribute('symbol');
			this.target = element.getAttribute('target').replace(/^#/, '');
			return this;
	
		};
	
		function InstanceGeometry() {
	
			this.url = "";
			this.instance_material = [];
	
		};
	
		InstanceGeometry.prototype.parse = function ( element ) {
	
			this.url = element.getAttribute('url').replace(/^#/, '');
			this.instance_material = [];
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;
	
				if ( child.nodeName == 'bind_material' ) {
	
					var instances = child.querySelectorAll('instance_material');
						
					for ( var j = 0; j < instances.length; j ++ ) {
	
						var instance = instances[j];
						this.instance_material.push( (new InstanceMaterial()).parse(instance) );
	
					}
	
					break;
	
				}
	
			}
	
			return this;
	
		};
	
		function Geometry() {
	
			this.id = "";
			this.mesh = null;
	
		};
	
		Geometry.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute('id');
	
			extractDoubleSided( this, element );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[i];
	
				switch ( child.nodeName ) {
	
					case 'mesh':
	
						this.mesh = (new Mesh(this)).parse(child);
						break;
	
					case 'extra':
	
						// console.log( child );
						break;
	
					default:
						break;
				}
			}
	
			return this;
	
		};
	
		function Mesh( geometry ) {
	
			this.geometry = geometry.id;
			this.primitives = [];
			this.vertices = null;
			this.geometry3js = null;
	
		};
	
		Mesh.prototype.parse = function( element ) {
	
			this.primitives = [];
	
			var i, j;
	
			for ( i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				switch ( child.nodeName ) {
	
					case 'source':
	
						_source( child );
						break;
	
					case 'vertices':
	
						this.vertices = ( new Vertices() ).parse( child );
						break;
	
					case 'triangles':
	
						this.primitives.push( ( new Triangles().parse( child ) ) );
						break;
	
					case 'polygons':
	
						this.primitives.push( ( new Polygons().parse( child ) ) );
						break;
	
					case 'polylist':
	
						this.primitives.push( ( new Polylist().parse( child ) ) );
						break;
	
					default:
						break;
	
				}
	
			}
	
			this.geometry3js = new THREE.Geometry();
	
			var vertexData = sources[ this.vertices.input['POSITION'].source ].data;
	
			for ( i = 0; i < vertexData.length; i += 3 ) {
	
				this.geometry3js.vertices.push( getConvertedVec3( vertexData, i ).clone() );
	
			}
	
			for ( i = 0; i < this.primitives.length; i ++ ) {
	
				var primitive = this.primitives[ i ];
				primitive.setVertices( this.vertices );
				this.handlePrimitive( primitive, this.geometry3js );
	
			}
	
			this.geometry3js.computeCentroids();
			this.geometry3js.computeFaceNormals();
	
			if ( this.geometry3js.calcNormals ) {
	
				this.geometry3js.computeVertexNormals();
				delete this.geometry3js.calcNormals;
	
			}
	
			// this.geometry3js.computeBoundingBox();
	
			return this;
	
		};
	
		Mesh.prototype.handlePrimitive = function( primitive, geom ) {
	
			var j, k, pList = primitive.p, inputs = primitive.inputs;
			var input, index, idx32;
			var source, numParams;
			var vcIndex = 0, vcount = 3, maxOffset = 0;
			var texture_sets = [];
			
			for ( j = 0; j < inputs.length; j ++ ) {
	
				input = inputs[ j ];
	
				var offset = input.offset + 1;
				maxOffset = (maxOffset < offset)? offset : maxOffset;
	
				switch ( input.semantic ) {
	
					case 'TEXCOORD':
						texture_sets.push( input.set );
						break;
	
				}
	
			}
	
			for ( var pCount = 0; pCount < pList.length; ++pCount ) {
	
				var p = pList[ pCount ], i = 0;
	
				while ( i < p.length ) {
	
					var vs = [];
					var ns = [];
					var ts = null;
					var cs = [];
	
					if ( primitive.vcount ) {
	
						vcount = primitive.vcount.length ? primitive.vcount[ vcIndex ++ ] : primitive.vcount;
	
					} else {
	
						vcount = p.length / maxOffset;
	
					}
	
	
					for ( j = 0; j < vcount; j ++ ) {
	
						for ( k = 0; k < inputs.length; k ++ ) {
	
							input = inputs[ k ];
							source = sources[ input.source ];
	
							index = p[ i + ( j * maxOffset ) + input.offset ];
							numParams = source.accessor.params.length;
							idx32 = index * numParams;
	
							switch ( input.semantic ) {
	
								case 'VERTEX':
	
									vs.push( index );
	
									break;
	
								case 'NORMAL':
	
									ns.push( getConvertedVec3( source.data, idx32 ) );
	
									break;
	
								case 'TEXCOORD':
	
									ts = ts || { };
									if ( ts[ input.set ] === undefined ) ts[ input.set ] = [];
									// invert the V
									ts[ input.set ].push( new THREE.Vector2( source.data[ idx32 ], source.data[ idx32 + 1 ] ) );
	
									break;
	
								case 'COLOR':
	
									cs.push( new THREE.Color().setRGB( source.data[ idx32 ], source.data[ idx32 + 1 ], source.data[ idx32 + 2 ] ) );
	
									break;
	
								default:
	
									break;
	
							}
	
						}
	
					}
	
					if ( ns.length == 0 ) {
	
						// check the vertices inputs
						input = this.vertices.input.NORMAL;
	
						if ( input ) {
	
							source = sources[ input.source ];
							numParams = source.accessor.params.length;
	
							for ( var ndx = 0, len = vs.length; ndx < len; ndx++ ) {
	
								ns.push( getConvertedVec3( source.data, vs[ ndx ] * numParams ) );
	
							}
	
						} else {
	
							geom.calcNormals = true;
	
						}
	
					}
	
					if ( !ts ) {
	
						ts = { };
						// check the vertices inputs
						input = this.vertices.input.TEXCOORD;
	
						if ( input ) {
	
							texture_sets.push( input.set );
							source = sources[ input.source ];
							numParams = source.accessor.params.length;
	
							for ( var ndx = 0, len = vs.length; ndx < len; ndx++ ) {
	
								idx32 = vs[ ndx ] * numParams;
								if ( ts[ input.set ] === undefined ) ts[ input.set ] = [ ];
								// invert the V
								ts[ input.set ].push( new THREE.Vector2( source.data[ idx32 ], 1.0 - source.data[ idx32 + 1 ] ) );
	
							}
	
						}
	
					}
	
					if ( cs.length == 0 ) {
	
						// check the vertices inputs
						input = this.vertices.input.COLOR;
	
						if ( input ) {
	
							source = sources[ input.source ];
							numParams = source.accessor.params.length;
	
							for ( var ndx = 0, len = vs.length; ndx < len; ndx++ ) {
	
								idx32 = vs[ ndx ] * numParams;
								cs.push( new THREE.Color().setRGB( source.data[ idx32 ], source.data[ idx32 + 1 ], source.data[ idx32 + 2 ] ) );
	
							}
	
						}
	
					}
	
					var face = null, faces = [], uv, uvArr;
	
					if ( vcount === 3 ) {
	
						faces.push( new THREE.Face3( vs[0], vs[1], vs[2], ns, cs.length ? cs : new THREE.Color() ) );
	
					} else if ( vcount === 4 ) {
	
						faces.push( new THREE.Face3( vs[0], vs[1], vs[3], [ns[0], ns[1], ns[3]], cs.length ? [cs[0], cs[1], cs[3]] : new THREE.Color() ) );
						
						faces.push( new THREE.Face3( vs[1], vs[2], vs[3], [ns[1], ns[2], ns[3]], cs.length ? [cs[1], cs[2], cs[3]] : new THREE.Color() ) );
	
					} else if ( vcount > 4 && options.subdivideFaces ) {
	
						var clr = cs.length ? cs : new THREE.Color(),
							vec1, vec2, vec3, v1, v2, norm;
	
						// subdivide into multiple Face3s
	
						for ( k = 1; k < vcount - 1; ) {
	
							// FIXME: normals don't seem to be quite right
	
							faces.push( new THREE.Face3( vs[0], vs[k], vs[k+1], [ ns[0], ns[k++], ns[k] ],  clr ) );
	
						}
	
					}
	
					if ( faces.length ) {
	
						for ( var ndx = 0, len = faces.length; ndx < len; ndx ++ ) {
	
							face = faces[ndx];
							face.daeMaterial = primitive.material;
							geom.faces.push( face );
	
							for ( k = 0; k < texture_sets.length; k++ ) {
	
								uv = ts[ texture_sets[k] ];
	
								if ( vcount > 4 ) {
	
									// Grab the right UVs for the vertices in this face
									uvArr = [ uv[0], uv[ndx+1], uv[ndx+2] ];
	
								} else if ( vcount === 4 ) {
	
									if ( ndx === 0 ) {
	
										uvArr = [ uv[0], uv[1], uv[3] ];
	
									} else {
	
										uvArr = [ uv[1].clone(), uv[2], uv[3].clone() ];
	
									}
	
								} else {
	
									uvArr = [ uv[0], uv[1], uv[2] ];
	
								}
	
								if ( geom.faceVertexUvs[k] === undefined ) {
	
									geom.faceVertexUvs[k] = [];
	
								}
	
								geom.faceVertexUvs[k].push( uvArr );
	
							}
	
						}
	
					} else {
	
						console.log( 'dropped face with vcount ' + vcount + ' for geometry with id: ' + geom.id );
	
					}
	
					i += maxOffset * vcount;
	
				}
			}
	
		};
	
		function Polygons () {
	
			this.material = "";
			this.count = 0;
			this.inputs = [];
			this.vcount = null;
			this.p = [];
			this.geometry = new THREE.Geometry();
	
		};
	
		Polygons.prototype.setVertices = function ( vertices ) {
	
			for ( var i = 0; i < this.inputs.length; i ++ ) {
	
				if ( this.inputs[ i ].source == vertices.id ) {
	
					this.inputs[ i ].source = vertices.input[ 'POSITION' ].source;
	
				}
	
			}
	
		};
	
		Polygons.prototype.parse = function ( element ) {
	
			this.material = element.getAttribute( 'material' );
			this.count = _attr_as_int( element, 'count', 0 );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				switch ( child.nodeName ) {
	
					case 'input':
	
						this.inputs.push( ( new Input() ).parse( element.childNodes[ i ] ) );
						break;
	
					case 'vcount':
	
						this.vcount = _ints( child.textContent );
						break;
	
					case 'p':
	
						this.p.push( _ints( child.textContent ) );
						break;
	
					case 'ph':
	
						console.warn( 'polygon holes not yet supported!' );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		function Polylist () {
	
			Polygons.call( this );
	
			this.vcount = [];
	
		};
	
		Polylist.prototype = Object.create( Polygons.prototype );
	
		function Triangles () {
	
			Polygons.call( this );
	
			this.vcount = 3;
	
		};
	
		Triangles.prototype = Object.create( Polygons.prototype );
	
		function Accessor() {
	
			this.source = "";
			this.count = 0;
			this.stride = 0;
			this.params = [];
	
		};
	
		Accessor.prototype.parse = function ( element ) {
	
			this.params = [];
			this.source = element.getAttribute( 'source' );
			this.count = _attr_as_int( element, 'count', 0 );
			this.stride = _attr_as_int( element, 'stride', 0 );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				if ( child.nodeName == 'param' ) {
	
					var param = {};
					param[ 'name' ] = child.getAttribute( 'name' );
					param[ 'type' ] = child.getAttribute( 'type' );
					this.params.push( param );
	
				}
	
			}
	
			return this;
	
		};
	
		function Vertices() {
	
			this.input = {};
	
		};
	
		Vertices.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute('id');
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				if ( element.childNodes[i].nodeName == 'input' ) {
	
					var input = ( new Input() ).parse( element.childNodes[ i ] );
					this.input[ input.semantic ] = input;
	
				}
	
			}
	
			return this;
	
		};
	
		function Input () {
	
			this.semantic = "";
			this.offset = 0;
			this.source = "";
			this.set = 0;
	
		};
	
		Input.prototype.parse = function ( element ) {
	
			this.semantic = element.getAttribute('semantic');
			this.source = element.getAttribute('source').replace(/^#/, '');
			this.set = _attr_as_int(element, 'set', -1);
			this.offset = _attr_as_int(element, 'offset', 0);
	
			if ( this.semantic == 'TEXCOORD' && this.set < 0 ) {
	
				this.set = 0;
	
			}
	
			return this;
	
		};
	
		function Source ( id ) {
	
			this.id = id;
			this.type = null;
	
		};
	
		Source.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute( 'id' );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[i];
	
				switch ( child.nodeName ) {
	
					case 'bool_array':
	
						this.data = _bools( child.textContent );
						this.type = child.nodeName;
						break;
	
					case 'float_array':
	
						this.data = _floats( child.textContent );
						this.type = child.nodeName;
						break;
	
					case 'int_array':
	
						this.data = _ints( child.textContent );
						this.type = child.nodeName;
						break;
	
					case 'IDREF_array':
					case 'Name_array':
	
						this.data = _strings( child.textContent );
						this.type = child.nodeName;
						break;
	
					case 'technique_common':
	
						for ( var j = 0; j < child.childNodes.length; j ++ ) {
	
							if ( child.childNodes[ j ].nodeName == 'accessor' ) {
	
								this.accessor = ( new Accessor() ).parse( child.childNodes[ j ] );
								break;
	
							}
						}
						break;
	
					default:
						// console.log(child.nodeName);
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		Source.prototype.read = function () {
	
			var result = [];
	
			//for (var i = 0; i < this.accessor.params.length; i++) {
	
				var param = this.accessor.params[ 0 ];
	
				//console.log(param.name + " " + param.type);
	
				switch ( param.type ) {
	
					case 'IDREF':
					case 'Name': case 'name':
					case 'float':
	
						return this.data;
	
					case 'float4x4':
	
						for ( var j = 0; j < this.data.length; j += 16 ) {
	
							var s = this.data.slice( j, j + 16 );
							var m = getConvertedMat4( s );
							result.push( m );
						}
	
						break;
	
					default:
	
						console.log( 'ColladaLoader: Source: Read dont know how to read ' + param.type + '.' );
						break;
	
				}
	
			//}
	
			return result;
	
		};
	
		function Material () {
	
			this.id = "";
			this.name = "";
			this.instance_effect = null;
	
		};
	
		Material.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				if ( element.childNodes[ i ].nodeName == 'instance_effect' ) {
	
					this.instance_effect = ( new InstanceEffect() ).parse( element.childNodes[ i ] );
					break;
	
				}
	
			}
	
			return this;
	
		};
	
		function ColorOrTexture () {
	
			this.color = new THREE.Color();
			this.color.setRGB( Math.random(), Math.random(), Math.random() );
			this.color.a = 1.0;
	
			this.texture = null;
			this.texcoord = null;
			this.texOpts = null;
	
		};
	
		ColorOrTexture.prototype.isColor = function () {
	
			return ( this.texture == null );
	
		};
	
		ColorOrTexture.prototype.isTexture = function () {
	
			return ( this.texture != null );
	
		};
	
		ColorOrTexture.prototype.parse = function ( element ) {
	
			if (element.nodeName == 'transparent') {
	
				this.opaque = element.getAttribute('opaque');
	
			}
			
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'color':
	
						var rgba = _floats( child.textContent );
						this.color = new THREE.Color();
						this.color.setRGB( rgba[0], rgba[1], rgba[2] );
						this.color.a = rgba[3];
						break;
	
					case 'texture':
	
						this.texture = child.getAttribute('texture');
						this.texcoord = child.getAttribute('texcoord');
						// Defaults from:
						// https://collada.org/mediawiki/index.php/Maya_texture_placement_MAYA_extension
						this.texOpts = {
							offsetU: 0,
							offsetV: 0,
							repeatU: 1,
							repeatV: 1,
							wrapU: 1,
							wrapV: 1
						};
						this.parseTexture( child );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		ColorOrTexture.prototype.parseTexture = function ( element ) {
	
			if ( ! element.childNodes ) return this;
	
			// This should be supported by Maya, 3dsMax, and MotionBuilder
	
			if ( element.childNodes[1] && element.childNodes[1].nodeName === 'extra' ) {
	
				element = element.childNodes[1];
	
				if ( element.childNodes[1] && element.childNodes[1].nodeName === 'technique' ) {
	
					element = element.childNodes[1];
	
				}
	
			}
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				switch ( child.nodeName ) {
	
					case 'offsetU':
					case 'offsetV':
					case 'repeatU':
					case 'repeatV':
	
						this.texOpts[ child.nodeName ] = parseFloat( child.textContent );
	
						break;
	
					case 'wrapU':
					case 'wrapV':
						
						// some dae have a value of true which becomes NaN via parseInt
	
						if ( child.textContent.toUpperCase() === 'TRUE' ) {
						
							this.texOpts[ child.nodeName ] = 1;
						
						} else {
						
							this.texOpts[ child.nodeName ] = parseInt( child.textContent );
						
						}
						break;
	
					default:
	
						this.texOpts[ child.nodeName ] = child.textContent;
	
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		function Shader ( type, effect ) {
	
			this.type = type;
			this.effect = effect;
			this.material = null;
	
		};
	
		Shader.prototype.parse = function ( element ) {
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'ambient':
					case 'emission':
					case 'diffuse':
					case 'specular':
					case 'transparent':
	
						this[ child.nodeName ] = ( new ColorOrTexture() ).parse( child );
						break;
	
					case 'shininess':
					case 'reflectivity':
					case 'index_of_refraction':
					case 'transparency':
	
						var f = child.querySelectorAll('float');
	
						if ( f.length > 0 )
							this[ child.nodeName ] = parseFloat( f[ 0 ].textContent );
	
						break;
	
					default:
						break;
	
				}
	
			}
	
			this.create();
			return this;
	
		};
	
		Shader.prototype.create = function() {
	
			var props = {};
	
			var transparent = false;
	
			if (this['transparency'] !== undefined && this['transparent'] !== undefined) {
				// convert transparent color RBG to average value
				var transparentColor = this['transparent'];
				var transparencyLevel = (this.transparent.color.r +
											this.transparent.color.g + 
											this.transparent.color.b)
											/ 3 * this.transparency;
				
				if (transparencyLevel > 0) {
					transparent = true;
					props[ 'transparent' ] = true;
					props[ 'opacity' ] = 1 - transparencyLevel;
	
				}
	
			}
			
			for ( var prop in this ) {
	
				switch ( prop ) {
	
					case 'ambient':
					case 'emission':
					case 'diffuse':
					case 'specular':
	
						var cot = this[ prop ];
	
						if ( cot instanceof ColorOrTexture ) {
	
							if ( cot.isTexture() ) {
	
								var samplerId = cot.texture;
								var surfaceId = this.effect.sampler[samplerId];
	
								if ( surfaceId !== undefined && surfaceId.source !== undefined ) {
	
									var surface = this.effect.surface[surfaceId.source];
									var image = images[surface.init_from];
	
									if (image) {
	
										var texture = THREE.ImageUtils.loadTexture(baseUrl + image.init_from);
										texture.wrapS = cot.texOpts.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
										texture.wrapT = cot.texOpts.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
										texture.offset.x = cot.texOpts.offsetU;
										texture.offset.y = cot.texOpts.offsetV;
										texture.repeat.x = cot.texOpts.repeatU;
										texture.repeat.y = cot.texOpts.repeatV;
										props['map'] = texture;
	
										// Texture with baked lighting?
										if (prop === 'emission') props['emissive'] = 0xffffff;
	
									}
	
								}
	
							} else if ( prop === 'diffuse' || !transparent ) {
	
								if ( prop === 'emission' ) {
	
									props[ 'emissive' ] = cot.color.getHex();
	
								} else {
	
									props[ prop ] = cot.color.getHex();
	
								}
	
							}
	
						}
	
						break;
	
					case 'shininess':
	
						props[ prop ] = this[ prop ];
						break;
	
					case 'reflectivity':
	
						props[ prop ] = this[ prop ];
						if( props[ prop ] > 0.0 ) props['envMap'] = options.defaultEnvMap;
						props['combine'] = THREE.MixOperation;	//mix regular shading with reflective component
						break;
	
					case 'index_of_refraction':
	
						props[ 'refractionRatio' ] = this[ prop ]; //TODO: "index_of_refraction" becomes "refractionRatio" in shader, but I'm not sure if the two are actually comparable
						if ( this[ prop ] !== 1.0 ) props['envMap'] = options.defaultEnvMap;
						break;
	
					case 'transparency':
						// gets figured out up top
						break;
	
					default:
						break;
	
				}
	
			}
	
			props[ 'shading' ] = preferredShading;
			props[ 'side' ] = this.effect.doubleSided ? THREE.DoubleSide : THREE.FrontSide;
	
			switch ( this.type ) {
	
				case 'constant':
	
					if (props.emissive != undefined) props.color = props.emissive;
					this.material = new THREE.MeshBasicMaterial( props );
					break;
	
				case 'phong':
				case 'blinn':
	
					if (props.diffuse != undefined) props.color = props.diffuse;
					this.material = new THREE.MeshPhongMaterial( props );
					break;
	
				case 'lambert':
				default:
	
					if (props.diffuse != undefined) props.color = props.diffuse;
					this.material = new THREE.MeshLambertMaterial( props );
					break;
	
			}
	
			return this.material;
	
		};
	
		function Surface ( effect ) {
	
			this.effect = effect;
			this.init_from = null;
			this.format = null;
	
		};
	
		Surface.prototype.parse = function ( element ) {
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'init_from':
	
						this.init_from = child.textContent;
						break;
	
					case 'format':
	
						this.format = child.textContent;
						break;
	
					default:
	
						console.log( "unhandled Surface prop: " + child.nodeName );
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		function Sampler2D ( effect ) {
	
			this.effect = effect;
			this.source = null;
			this.wrap_s = null;
			this.wrap_t = null;
			this.minfilter = null;
			this.magfilter = null;
			this.mipfilter = null;
	
		};
	
		Sampler2D.prototype.parse = function ( element ) {
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'source':
	
						this.source = child.textContent;
						break;
	
					case 'minfilter':
	
						this.minfilter = child.textContent;
						break;
	
					case 'magfilter':
	
						this.magfilter = child.textContent;
						break;
	
					case 'mipfilter':
	
						this.mipfilter = child.textContent;
						break;
	
					case 'wrap_s':
	
						this.wrap_s = child.textContent;
						break;
	
					case 'wrap_t':
	
						this.wrap_t = child.textContent;
						break;
	
					default:
	
						console.log( "unhandled Sampler2D prop: " + child.nodeName );
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		function Effect () {
	
			this.id = "";
			this.name = "";
			this.shader = null;
			this.surface = {};
			this.sampler = {};
	
		};
	
		Effect.prototype.create = function () {
	
			if ( this.shader == null ) {
	
				return null;
	
			}
	
		};
	
		Effect.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
	
			extractDoubleSided( this, element );
	
			this.shader = null;
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'profile_COMMON':
	
						this.parseTechnique( this.parseProfileCOMMON( child ) );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		Effect.prototype.parseNewparam = function ( element ) {
	
			var sid = element.getAttribute( 'sid' );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'surface':
	
						this.surface[sid] = ( new Surface( this ) ).parse( child );
						break;
	
					case 'sampler2D':
	
						this.sampler[sid] = ( new Sampler2D( this ) ).parse( child );
						break;
	
					case 'extra':
	
						break;
	
					default:
	
						console.log( child.nodeName );
						break;
	
				}
	
			}
	
		};
	
		Effect.prototype.parseProfileCOMMON = function ( element ) {
	
			var technique;
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'profile_COMMON':
	
						this.parseProfileCOMMON( child );
						break;
	
					case 'technique':
	
						technique = child;
						break;
	
					case 'newparam':
	
						this.parseNewparam( child );
						break;
	
					case 'image':
	
						var _image = ( new _Image() ).parse( child );
						images[ _image.id ] = _image;
						break;
	
					case 'extra':
						break;
	
					default:
	
						console.log( child.nodeName );
						break;
	
				}
	
			}
	
			return technique;
	
		};
	
		Effect.prototype.parseTechnique= function ( element ) {
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[i];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'constant':
					case 'lambert':
					case 'blinn':
					case 'phong':
	
						this.shader = ( new Shader( child.nodeName, this ) ).parse( child );
						break;
	
					default:
						break;
	
				}
	
			}
	
		};
	
		function InstanceEffect () {
	
			this.url = "";
	
		};
	
		InstanceEffect.prototype.parse = function ( element ) {
	
			this.url = element.getAttribute( 'url' ).replace( /^#/, '' );
			return this;
	
		};
	
		function Animation() {
	
			this.id = "";
			this.name = "";
			this.source = {};
			this.sampler = [];
			this.channel = [];
	
		};
	
		Animation.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
			this.source = {};
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'animation':
	
						var anim = ( new Animation() ).parse( child );
	
						for ( var src in anim.source ) {
	
							this.source[ src ] = anim.source[ src ];
	
						}
	
						for ( var j = 0; j < anim.channel.length; j ++ ) {
	
							this.channel.push( anim.channel[ j ] );
							this.sampler.push( anim.sampler[ j ] );
	
						}
	
						break;
	
					case 'source':
	
						var src = ( new Source() ).parse( child );
						this.source[ src.id ] = src;
						break;
	
					case 'sampler':
	
						this.sampler.push( ( new Sampler( this ) ).parse( child ) );
						break;
	
					case 'channel':
	
						this.channel.push( ( new Channel( this ) ).parse( child ) );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		function Channel( animation ) {
	
			this.animation = animation;
			this.source = "";
			this.target = "";
			this.fullSid = null;
			this.sid = null;
			this.dotSyntax = null;
			this.arrSyntax = null;
			this.arrIndices = null;
			this.member = null;
	
		};
	
		Channel.prototype.parse = function ( element ) {
	
			this.source = element.getAttribute( 'source' ).replace( /^#/, '' );
			this.target = element.getAttribute( 'target' );
	
			var parts = this.target.split( '/' );
	
			var id = parts.shift();
			var sid = parts.shift();
	
			var dotSyntax = ( sid.indexOf(".") >= 0 );
			var arrSyntax = ( sid.indexOf("(") >= 0 );
	
			if ( dotSyntax ) {
	
				parts = sid.split(".");
				this.sid = parts.shift();
				this.member = parts.shift();
	
			} else if ( arrSyntax ) {
	
				var arrIndices = sid.split("(");
				this.sid = arrIndices.shift();
	
				for (var j = 0; j < arrIndices.length; j ++ ) {
	
					arrIndices[j] = parseInt( arrIndices[j].replace(/\)/, '') );
	
				}
	
				this.arrIndices = arrIndices;
	
			} else {
	
				this.sid = sid;
	
			}
	
			this.fullSid = sid;
			this.dotSyntax = dotSyntax;
			this.arrSyntax = arrSyntax;
	
			return this;
	
		};
	
		function Sampler ( animation ) {
	
			this.id = "";
			this.animation = animation;
			this.inputs = [];
			this.input = null;
			this.output = null;
			this.strideOut = null;
			this.interpolation = null;
			this.startTime = null;
			this.endTime = null;
			this.duration = 0;
	
		};
	
		Sampler.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute( 'id' );
			this.inputs = [];
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'input':
	
						this.inputs.push( (new Input()).parse( child ) );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		Sampler.prototype.create = function () {
	
			for ( var i = 0; i < this.inputs.length; i ++ ) {
	
				var input = this.inputs[ i ];
				var source = this.animation.source[ input.source ];
	
				switch ( input.semantic ) {
	
					case 'INPUT':
	
						this.input = source.read();
						break;
	
					case 'OUTPUT':
	
						this.output = source.read();
						this.strideOut = source.accessor.stride;
						break;
	
					case 'INTERPOLATION':
	
						this.interpolation = source.read();
						break;
	
					case 'IN_TANGENT':
	
						break;
	
					case 'OUT_TANGENT':
	
						break;
	
					default:
	
						console.log(input.semantic);
						break;
	
				}
	
			}
	
			this.startTime = 0;
			this.endTime = 0;
			this.duration = 0;
	
			if ( this.input.length ) {
	
				this.startTime = 100000000;
				this.endTime = -100000000;
	
				for ( var i = 0; i < this.input.length; i ++ ) {
	
					this.startTime = Math.min( this.startTime, this.input[ i ] );
					this.endTime = Math.max( this.endTime, this.input[ i ] );
	
				}
	
				this.duration = this.endTime - this.startTime;
	
			}
	
		};
	
		Sampler.prototype.getData = function ( type, ndx ) {
	
			var data;
	
			if ( type === 'matrix' && this.strideOut === 16 ) {
	
				data = this.output[ ndx ];
	
			} else if ( this.strideOut > 1 ) {
	
				data = [];
				ndx *= this.strideOut;
	
				for ( var i = 0; i < this.strideOut; ++i ) {
	
					data[ i ] = this.output[ ndx + i ];
	
				}
	
				if ( this.strideOut === 3 ) {
	
					switch ( type ) {
	
						case 'rotate':
						case 'translate':
	
							fixCoords( data, -1 );
							break;
	
						case 'scale':
	
							fixCoords( data, 1 );
							break;
	
					}
	
				} else if ( this.strideOut === 4 && type === 'matrix' ) {
	
					fixCoords( data, -1 );
	
				}
	
			} else {
	
				data = this.output[ ndx ];
	
			}
	
			return data;
	
		};
	
		function Key ( time ) {
	
			this.targets = [];
			this.time = time;
	
		};
	
		Key.prototype.addTarget = function ( fullSid, transform, member, data ) {
	
			this.targets.push( {
				sid: fullSid,
				member: member,
				transform: transform,
				data: data
			} );
	
		};
	
		Key.prototype.apply = function ( opt_sid ) {
	
			for ( var i = 0; i < this.targets.length; ++i ) {
	
				var target = this.targets[ i ];
	
				if ( !opt_sid || target.sid === opt_sid ) {
	
					target.transform.update( target.data, target.member );
	
				}
	
			}
	
		};
	
		Key.prototype.getTarget = function ( fullSid ) {
	
			for ( var i = 0; i < this.targets.length; ++i ) {
	
				if ( this.targets[ i ].sid === fullSid ) {
	
					return this.targets[ i ];
	
				}
	
			}
	
			return null;
	
		};
	
		Key.prototype.hasTarget = function ( fullSid ) {
	
			for ( var i = 0; i < this.targets.length; ++i ) {
	
				if ( this.targets[ i ].sid === fullSid ) {
	
					return true;
	
				}
	
			}
	
			return false;
	
		};
	
		// TODO: Currently only doing linear interpolation. Should support full COLLADA spec.
		Key.prototype.interpolate = function ( nextKey, time ) {
	
			for ( var i = 0; i < this.targets.length; ++i ) {
	
				var target = this.targets[ i ],
					nextTarget = nextKey.getTarget( target.sid ),
					data;
	
				if ( target.transform.type !== 'matrix' && nextTarget ) {
	
					var scale = ( time - this.time ) / ( nextKey.time - this.time ),
						nextData = nextTarget.data,
						prevData = target.data;
	
					// check scale error
	
					if ( scale < 0 || scale > 1 ) {
	
						console.log( "Key.interpolate: Warning! Scale out of bounds:" + scale );
						scale = scale < 0 ? 0 : 1;
	
					}
	
					if ( prevData.length ) {
	
						data = [];
	
						for ( var j = 0; j < prevData.length; ++j ) {
	
							data[ j ] = prevData[ j ] + ( nextData[ j ] - prevData[ j ] ) * scale;
	
						}
	
					} else {
	
						data = prevData + ( nextData - prevData ) * scale;
	
					}
	
				} else {
	
					data = target.data;
	
				}
	
				target.transform.update( data, target.member );
	
			}
	
		};
	
		// Camera
		function Camera() {
	
			this.id = "";
			this.name = "";
			this.technique = "";
	
		};
	
		Camera.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'optics':
	
						this.parseOptics( child );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		Camera.prototype.parseOptics = function ( element ) {
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				if ( element.childNodes[ i ].nodeName == 'technique_common' ) {
	
					var technique = element.childNodes[ i ];
	
					for ( var j = 0; j < technique.childNodes.length; j ++ ) {
	
						this.technique = technique.childNodes[ j ].nodeName;
	
						if ( this.technique == 'perspective' ) {
	
							var perspective = technique.childNodes[ j ];
	
							for ( var k = 0; k < perspective.childNodes.length; k ++ ) {
	
								var param = perspective.childNodes[ k ];
	
								switch ( param.nodeName ) {
	
									case 'yfov':
										this.yfov = param.textContent;
										break;
									case 'xfov':
										this.xfov = param.textContent;
										break;
									case 'znear':
										this.znear = param.textContent;
										break;
									case 'zfar':
										this.zfar = param.textContent;
										break;
									case 'aspect_ratio':
										this.aspect_ratio = param.textContent;
										break;
	
								}
	
							}
	
						} else if ( this.technique == 'orthographic' ) {
	
							var orthographic = technique.childNodes[ j ];
	
							for ( var k = 0; k < orthographic.childNodes.length; k ++ ) {
	
								var param = orthographic.childNodes[ k ];
	
								switch ( param.nodeName ) {
	
									case 'xmag':
										this.xmag = param.textContent;
										break;
									case 'ymag':
										this.ymag = param.textContent;
										break;
									case 'znear':
										this.znear = param.textContent;
										break;
									case 'zfar':
										this.zfar = param.textContent;
										break;
									case 'aspect_ratio':
										this.aspect_ratio = param.textContent;
										break;
	
								}
	
							}
	
						}
	
					}
	
				}
	
			}
	
			return this;
	
		};
	
		function InstanceCamera() {
	
			this.url = "";
	
		};
	
		InstanceCamera.prototype.parse = function ( element ) {
	
			this.url = element.getAttribute('url').replace(/^#/, '');
	
			return this;
	
		};
	
		// Light
	
		function Light() {
	
			this.id = "";
			this.name = "";
			this.technique = "";
	
		};
	
		Light.prototype.parse = function ( element ) {
	
			this.id = element.getAttribute( 'id' );
			this.name = element.getAttribute( 'name' );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
				if ( child.nodeType != 1 ) continue;
	
				switch ( child.nodeName ) {
	
					case 'technique_common':
	
						this.parseCommon( child );
						break;
	
					case 'technique':
	
						this.parseTechnique( child );
						break;
	
					default:
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		Light.prototype.parseCommon = function ( element ) {
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				switch ( element.childNodes[ i ].nodeName ) {
	
					case 'directional':
					case 'point':
					case 'spot':
					case 'ambient':
	
						this.technique = element.childNodes[ i ].nodeName;
	
						var light = element.childNodes[ i ];
	
						for ( var j = 0; j < light.childNodes.length; j ++ ) {
	
							var child = light.childNodes[j];
	
							switch ( child.nodeName ) {
	
								case 'color':
	
									var rgba = _floats( child.textContent );
									this.color = new THREE.Color(0);
									this.color.setRGB( rgba[0], rgba[1], rgba[2] );
									this.color.a = rgba[3];
									break;
	
								case 'falloff_angle':
	
									this.falloff_angle = parseFloat( child.textContent );
									break;
							}
	
						}
	
				}
	
			}
	
			return this;
	
		};
	
		Light.prototype.parseTechnique = function ( element ) {
	
			this.profile = element.getAttribute( 'profile' );
	
			for ( var i = 0; i < element.childNodes.length; i ++ ) {
	
				var child = element.childNodes[ i ];
	
				switch ( child.nodeName ) {
	
					case 'intensity':
	
						this.intensity = parseFloat(child.textContent);
						break;
	
				}
	
			}
	
			return this;
	
		};
	
		function InstanceLight() {
	
			this.url = "";
	
		};
	
		InstanceLight.prototype.parse = function ( element ) {
	
			this.url = element.getAttribute('url').replace(/^#/, '');
	
			return this;
	
		};
	
		function _source( element ) {
	
			var id = element.getAttribute( 'id' );
	
			if ( sources[ id ] != undefined ) {
	
				return sources[ id ];
	
			}
	
			sources[ id ] = ( new Source(id )).parse( element );
			return sources[ id ];
	
		};
	
		function _nsResolver( nsPrefix ) {
	
			if ( nsPrefix == "dae" ) {
	
				return "http://www.collada.org/2005/11/COLLADASchema";
	
			}
	
			return null;
	
		};
	
		function _bools( str ) {
	
			var raw = _strings( str );
			var data = [];
	
			for ( var i = 0, l = raw.length; i < l; i ++ ) {
	
				data.push( (raw[i] == 'true' || raw[i] == '1') ? true : false );
	
			}
	
			return data;
	
		};
	
		function _floats( str ) {
	
			var raw = _strings(str);
			var data = [];
	
			for ( var i = 0, l = raw.length; i < l; i ++ ) {
	
				data.push( parseFloat( raw[ i ] ) );
	
			}
	
			return data;
	
		};
	
		function _ints( str ) {
	
			var raw = _strings( str );
			var data = [];
	
			for ( var i = 0, l = raw.length; i < l; i ++ ) {
	
				data.push( parseInt( raw[ i ], 10 ) );
	
			}
	
			return data;
	
		};
	
		function _strings( str ) {
	
			return ( str.length > 0 ) ? _trimString( str ).split( /\s+/ ) : [];
	
		};
	
		function _trimString( str ) {
	
			return str.replace( /^\s+/, "" ).replace( /\s+$/, "" );
	
		};
	
		function _attr_as_float( element, name, defaultValue ) {
	
			if ( element.hasAttribute( name ) ) {
	
				return parseFloat( element.getAttribute( name ) );
	
			} else {
	
				return defaultValue;
	
			}
	
		};
	
		function _attr_as_int( element, name, defaultValue ) {
	
			if ( element.hasAttribute( name ) ) {
	
				return parseInt( element.getAttribute( name ), 10) ;
	
			} else {
	
				return defaultValue;
	
			}
	
		};
	
		function _attr_as_string( element, name, defaultValue ) {
	
			if ( element.hasAttribute( name ) ) {
	
				return element.getAttribute( name );
	
			} else {
	
				return defaultValue;
	
			}
	
		};
	
		function _format_float( f, num ) {
	
			if ( f === undefined ) {
	
				var s = '0.';
	
				while ( s.length < num + 2 ) {
	
					s += '0';
	
				}
	
				return s;
	
			}
	
			num = num || 2;
	
			var parts = f.toString().split( '.' );
			parts[ 1 ] = parts.length > 1 ? parts[ 1 ].substr( 0, num ) : "0";
	
			while( parts[ 1 ].length < num ) {
	
				parts[ 1 ] += '0';
	
			}
	
			return parts.join( '.' );
	
		};
	
		function extractDoubleSided( obj, element ) {
	
			obj.doubleSided = false;
	
			var node = element.querySelectorAll('extra double_sided')[0];
		
			if ( node ) {
	
				if ( node && parseInt( node.textContent, 10 ) === 1 ) {
	
					obj.doubleSided = true;
	
				}
	
			}
	
		};
	
		// Up axis conversion
	
		function setUpConversion() {
	
			if ( !options.convertUpAxis || colladaUp === options.upAxis ) {
	
				upConversion = null;
	
			} else {
	
				switch ( colladaUp ) {
	
					case 'X':
	
						upConversion = options.upAxis === 'Y' ? 'XtoY' : 'XtoZ';
						break;
	
					case 'Y':
	
						upConversion = options.upAxis === 'X' ? 'YtoX' : 'YtoZ';
						break;
	
					case 'Z':
	
						upConversion = options.upAxis === 'X' ? 'ZtoX' : 'ZtoY';
						break;
	
				}
	
			}
	
		};
	
		function fixCoords( data, sign ) {
	
			if ( !options.convertUpAxis || colladaUp === options.upAxis ) {
	
				return;
	
			}
	
			switch ( upConversion ) {
	
				case 'XtoY':
	
					var tmp = data[ 0 ];
					data[ 0 ] = sign * data[ 1 ];
					data[ 1 ] = tmp;
					break;
	
				case 'XtoZ':
	
					var tmp = data[ 2 ];
					data[ 2 ] = data[ 1 ];
					data[ 1 ] = data[ 0 ];
					data[ 0 ] = tmp;
					break;
	
				case 'YtoX':
	
					var tmp = data[ 0 ];
					data[ 0 ] = data[ 1 ];
					data[ 1 ] = sign * tmp;
					break;
	
				case 'YtoZ':
	
					var tmp = data[ 1 ];
					data[ 1 ] = sign * data[ 2 ];
					data[ 2 ] = tmp;
					break;
	
				case 'ZtoX':
	
					var tmp = data[ 0 ];
					data[ 0 ] = data[ 1 ];
					data[ 1 ] = data[ 2 ];
					data[ 2 ] = tmp;
					break;
	
				case 'ZtoY':
	
					var tmp = data[ 1 ];
					data[ 1 ] = data[ 2 ];
					data[ 2 ] = sign * tmp;
					break;
	
			}
	
		};
	
		function getConvertedVec3( data, offset ) {
	
			var arr = [ data[ offset ], data[ offset + 1 ], data[ offset + 2 ] ];
			fixCoords( arr, -1 );
			return new THREE.Vector3( arr[ 0 ], arr[ 1 ], arr[ 2 ] );
	
		};
	
		function getConvertedMat4( data ) {
	
			if ( options.convertUpAxis ) {
	
				// First fix rotation and scale
	
				// Columns first
				var arr = [ data[ 0 ], data[ 4 ], data[ 8 ] ];
				fixCoords( arr, -1 );
				data[ 0 ] = arr[ 0 ];
				data[ 4 ] = arr[ 1 ];
				data[ 8 ] = arr[ 2 ];
				arr = [ data[ 1 ], data[ 5 ], data[ 9 ] ];
				fixCoords( arr, -1 );
				data[ 1 ] = arr[ 0 ];
				data[ 5 ] = arr[ 1 ];
				data[ 9 ] = arr[ 2 ];
				arr = [ data[ 2 ], data[ 6 ], data[ 10 ] ];
				fixCoords( arr, -1 );
				data[ 2 ] = arr[ 0 ];
				data[ 6 ] = arr[ 1 ];
				data[ 10 ] = arr[ 2 ];
				// Rows second
				arr = [ data[ 0 ], data[ 1 ], data[ 2 ] ];
				fixCoords( arr, -1 );
				data[ 0 ] = arr[ 0 ];
				data[ 1 ] = arr[ 1 ];
				data[ 2 ] = arr[ 2 ];
				arr = [ data[ 4 ], data[ 5 ], data[ 6 ] ];
				fixCoords( arr, -1 );
				data[ 4 ] = arr[ 0 ];
				data[ 5 ] = arr[ 1 ];
				data[ 6 ] = arr[ 2 ];
				arr = [ data[ 8 ], data[ 9 ], data[ 10 ] ];
				fixCoords( arr, -1 );
				data[ 8 ] = arr[ 0 ];
				data[ 9 ] = arr[ 1 ];
				data[ 10 ] = arr[ 2 ];
	
				// Now fix translation
				arr = [ data[ 3 ], data[ 7 ], data[ 11 ] ];
				fixCoords( arr, -1 );
				data[ 3 ] = arr[ 0 ];
				data[ 7 ] = arr[ 1 ];
				data[ 11 ] = arr[ 2 ];
	
			}
	
			return new THREE.Matrix4(
				data[0], data[1], data[2], data[3],
				data[4], data[5], data[6], data[7],
				data[8], data[9], data[10], data[11],
				data[12], data[13], data[14], data[15]
				);
	
		};
	
		function getConvertedIndex( index ) {
	
			if ( index > -1 && index < 3 ) {
	
				var members = ['X', 'Y', 'Z'],
					indices = { X: 0, Y: 1, Z: 2 };
	
				index = getConvertedMember( members[ index ] );
				index = indices[ index ];
	
			}
	
			return index;
	
		};
	
		function getConvertedMember( member ) {
	
			if ( options.convertUpAxis ) {
	
				switch ( member ) {
	
					case 'X':
	
						switch ( upConversion ) {
	
							case 'XtoY':
							case 'XtoZ':
							case 'YtoX':
	
								member = 'Y';
								break;
	
							case 'ZtoX':
	
								member = 'Z';
								break;
	
						}
	
						break;
	
					case 'Y':
	
						switch ( upConversion ) {
	
							case 'XtoY':
							case 'YtoX':
							case 'ZtoX':
	
								member = 'X';
								break;
	
							case 'XtoZ':
							case 'YtoZ':
							case 'ZtoY':
	
								member = 'Z';
								break;
	
						}
	
						break;
	
					case 'Z':
	
						switch ( upConversion ) {
	
							case 'XtoZ':
	
								member = 'X';
								break;
	
							case 'YtoZ':
							case 'ZtoX':
							case 'ZtoY':
	
								member = 'Y';
								break;
	
						}
	
						break;
	
				}
	
			}
	
			return member;
	
		};
	
		return {
	
			load: load,
			parse: parse,
			setPreferredShading: setPreferredShading,
			applySkin: applySkin,
			geometries : geometries,
			options: options
	
		};
	
	};


/***/ },
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Fields, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	__webpack_require__(95);
	
	
	/* Fields Collection */
	
	Fields = (function(superClass) {
	  extend(Fields, superClass);
	
	  function Fields() {
	    this.renderSidebar = bind(this.renderSidebar, this);
	    this.addFields = bind(this.addFields, this);
	    this.addField = bind(this.addField, this);
	    this.removeConnections = bind(this.removeConnections, this);
	    this.renderConnections = bind(this.renderConnections, this);
	    this.setFieldInputUnchanged = bind(this.setFieldInputUnchanged, this);
	    this.hasUnconnectedFields = bind(this.hasUnconnectedFields, this);
	    this.hasUnconnectedOutputs = bind(this.hasUnconnectedOutputs, this);
	    this.hasUnconnectedInputs = bind(this.hasUnconnectedInputs, this);
	    this.getDownstreamNodes = bind(this.getDownstreamNodes, this);
	    this.getUpstreamNodes = bind(this.getUpstreamNodes, this);
	    this.getMaxInputSliceCount = bind(this.getMaxInputSliceCount, this);
	    this.setField = bind(this.setField, this);
	    this.getField = bind(this.getField, this);
	    this.toJSON = bind(this.toJSON, this);
	    this.load = bind(this.load, this);
	    this.destroy = bind(this.destroy, this);
	    this.initialize = bind(this.initialize, this);
	    return Fields.__super__.constructor.apply(this, arguments);
	  }
	
	  Fields.prototype.initialize = function(models, options) {
	    Fields.__super__.initialize.apply(this, arguments);
	    this.node = options.node;
	    this.indexer = options.indexer;
	    this.inputs = {};
	    this.outputs = {};
	    this.special_elements = {
	      left: [],
	      center: [],
	      right: []
	    };
	    return this.addFields(this.node.getFields());
	  };
	
	  Fields.prototype.destroy = function() {
	    this.removeConnections();
	    while (this.models.length > 0) {
	      this.models[0].remove();
	    }
	    delete this.node;
	    delete this.inputs;
	    delete this.outputs;
	    delete this.indexer;
	    return delete this.special_elements;
	  };
	
	  Fields.prototype.load = function(data) {
	    var f, j, len, node_field, ref;
	    if (!data || !data["in"]) {
	      return false;
	    }
	    ref = data["in"];
	    for (j = 0, len = ref.length; j < len; j++) {
	      f = ref[j];
	      if (!f.nid) {
	        node_field = this.inputs[f.name];
	      } else {
	        node_field = this.inputs[f.name + "-" + f.nid];
	      }
	      if (node_field) {
	        node_field.load(f.val);
	      }
	    }
	    return true;
	  };
	
	  Fields.prototype.toJSON = function() {
	    var data;
	    data = {
	      "in": jQuery.map(this.inputs, function(f, i) {
	        return f.toJSON();
	      }),
	      out: jQuery.map(this.outputs, function(f, i) {
	        return f.toJSON();
	      })
	    };
	    return data;
	  };
	
	  Fields.prototype.getField = function(key, is_out) {
	    var target;
	    if (is_out == null) {
	      is_out = false;
	    }
	    target = is_out === true ? "outputs" : "inputs";
	    return this[target][key];
	  };
	
	  Fields.prototype.setField = function(key, value) {
	    if (this.outputs[key]) {
	      return this.outputs[key].setValue(value);
	    }
	  };
	
	  Fields.prototype.getMaxInputSliceCount = function() {
	    var f, fname, ref, result, val;
	    result = 1;
	    ref = this.inputs;
	    for (fname in ref) {
	      f = ref[fname];
	      val = f.attributes.value;
	      if (val && $.type(val) === "array") {
	        if (val.length > result) {
	          result = val.length;
	        }
	      }
	    }
	    return result - 1;
	  };
	
	  Fields.prototype.getUpstreamNodes = function() {
	    var c, f, fname, j, len, ref, ref1, res;
	    res = [];
	    ref = this.inputs;
	    for (fname in ref) {
	      f = ref[fname];
	      ref1 = f.connections;
	      for (j = 0, len = ref1.length; j < len; j++) {
	        c = ref1[j];
	        res[res.length] = c.from_field.node;
	      }
	    }
	    return res;
	  };
	
	  Fields.prototype.getDownstreamNodes = function() {
	    var c, f, fname, j, k, len, len1, ref, ref1, res;
	    res = [];
	    ref = this.outputs;
	    for (f = j = 0, len = ref.length; j < len; f = ++j) {
	      fname = ref[f];
	      f = this.inputs[fname];
	      ref1 = f.connections;
	      for (k = 0, len1 = ref1.length; k < len1; k++) {
	        c = ref1[k];
	        res[res.length] = c.to_field.node;
	      }
	    }
	    return res;
	  };
	
	  Fields.prototype.hasUnconnectedInputs = function() {
	    var f, fname, ref;
	    ref = this.inputs;
	    for (fname in ref) {
	      f = ref[fname];
	      if (f.connections.length === 0) {
	        return true;
	      }
	    }
	    return false;
	  };
	
	  Fields.prototype.hasUnconnectedOutputs = function() {
	    var f, fname, ref;
	    ref = this.outputs;
	    for (fname in ref) {
	      f = ref[fname];
	      if (f.connections.length === 0) {
	        return true;
	      }
	    }
	    return false;
	  };
	
	  Fields.prototype.hasUnconnectedFields = function() {
	    return hasUnconnectedInputs() || hasUnconnectedOutputs();
	  };
	
	  Fields.prototype.setFieldInputUnchanged = function() {
	    var f, fname, j, len, ref, results;
	    ref = this.inputs;
	    results = [];
	    for (j = 0, len = ref.length; j < len; j++) {
	      fname = ref[j];
	      f = this.inputs[fname];
	      results.push(f.changed = false);
	    }
	    return results;
	  };
	
	  Fields.prototype.renderConnections = function() {
	    return this.invoke("renderConnections");
	  };
	
	  Fields.prototype.removeConnections = function() {
	    return this.invoke("removeConnections");
	  };
	
	  Fields.prototype.addField = function(name, value, direction) {
	    var f, field, field_index, field_is_out, target;
	    if (direction == null) {
	      direction = "inputs";
	    }
	    f = false;
	    field_is_out = direction !== "inputs";
	    if ($.type(value) !== "object") {
	      value = this.getFieldValueObject(value);
	    }
	    if (value.propagateDirty == null) {
	      value.propagateDirty = true;
	    }
	    field = new ThreeNodes.Core.fields.models[value.type]({
	      name: name,
	      value: value.val,
	      possibilities: value.values,
	      node: this.node,
	      is_output: field_is_out,
	      "default": value["default"],
	      subfield: value.subfield,
	      indexer: this.indexer,
	      propagateDirty: value.propagateDirty
	    });
	    target = field.get("is_output") === false ? "inputs" : "outputs";
	    field_index = field.get("name");
	    if (field.subfield) {
	      field_index += "-" + field.subfield.node.get("nid");
	    }
	    this[target][field_index] = field;
	    this.add(field);
	    return field;
	  };
	
	  Fields.prototype.addFields = function(fields_array) {
	    var dir, fname, value;
	    for (dir in fields_array) {
	      for (fname in fields_array[dir]) {
	        value = fields_array[dir][fname];
	        this.addField(fname, value, dir);
	      }
	    }
	    return this;
	  };
	
	  Fields.prototype.renderSidebar = function() {
	    this.trigger("renderSidebar");
	    return this;
	  };
	
	  Fields.prototype.getFieldValueObject = function(default_value) {
	    var ftype, res;
	    ftype = (function() {
	      switch ($.type(default_value)) {
	        case "number":
	          return "Float";
	        case "boolean":
	          return "Bool";
	        default:
	          return "String";
	      }
	    })();
	    res = {
	      type: ftype,
	      val: default_value
	    };
	    return res;
	  };
	
	  return Fields;
	
	})(Backbone.Collection);
	
	module.exports = Fields;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	THREE.EffectComposer = function ( renderer, renderTarget ) {
	
		this.renderer = renderer;
	
		if ( renderTarget === undefined ) {
	
			var width = window.innerWidth || 1;
			var height = window.innerHeight || 1;
			var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
	
			renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );
	
		}
	
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
	
		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;
	
		this.passes = [];
	
		if ( THREE.CopyShader === undefined )
			console.error( "THREE.EffectComposer relies on THREE.CopyShader" );
	
		this.copyPass = new THREE.ShaderPass( THREE.CopyShader );
	
	};
	
	THREE.EffectComposer.prototype = {
	
		swapBuffers: function() {
	
			var tmp = this.readBuffer;
			this.readBuffer = this.writeBuffer;
			this.writeBuffer = tmp;
	
		},
	
		addPass: function ( pass ) {
	
			this.passes.push( pass );
	
		},
	
		insertPass: function ( pass, index ) {
	
			this.passes.splice( index, 0, pass );
	
		},
	
		render: function ( delta ) {
	
			this.writeBuffer = this.renderTarget1;
			this.readBuffer = this.renderTarget2;
	
			var maskActive = false;
	
			var pass, i, il = this.passes.length;
	
			for ( i = 0; i < il; i ++ ) {
	
				pass = this.passes[ i ];
	
				if ( !pass.enabled ) continue;
	
				pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );
	
				if ( pass.needsSwap ) {
	
					if ( maskActive ) {
	
						var context = this.renderer.context;
	
						context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
	
						this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );
	
						context.stencilFunc( context.EQUAL, 1, 0xffffffff );
	
					}
	
					this.swapBuffers();
	
				}
	
				if ( pass instanceof THREE.MaskPass ) {
	
					maskActive = true;
	
				} else if ( pass instanceof THREE.ClearMaskPass ) {
	
					maskActive = false;
	
				}
	
			}
	
		},
	
		reset: function ( renderTarget ) {
	
			if ( renderTarget === undefined ) {
	
				renderTarget = this.renderTarget1.clone();
	
				renderTarget.width = window.innerWidth;
				renderTarget.height = window.innerHeight;
	
			}
	
			this.renderTarget1 = renderTarget;
			this.renderTarget2 = renderTarget.clone();
	
			this.writeBuffer = this.renderTarget1;
			this.readBuffer = this.renderTarget2;
	
		},
	
		setSize: function ( width, height ) {
	
			var renderTarget = this.renderTarget1.clone();
	
			renderTarget.width = width;
			renderTarget.height = height;
	
			this.reset( renderTarget );
	
		}
	
	};
	
	// shared ortho camera
	
	THREE.EffectComposer.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
	
	THREE.EffectComposer.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );
	
	THREE.EffectComposer.scene = new THREE.Scene();
	THREE.EffectComposer.scene.add( THREE.EffectComposer.quad );


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	THREE.MaskPass = function ( scene, camera ) {
	
		this.scene = scene;
		this.camera = camera;
	
		this.enabled = true;
		this.clear = true;
		this.needsSwap = false;
	
		this.inverse = false;
	
	};
	
	THREE.MaskPass.prototype = {
	
		render: function ( renderer, writeBuffer, readBuffer, delta ) {
	
			var context = renderer.context;
	
			// don't update color or depth
	
			context.colorMask( false, false, false, false );
			context.depthMask( false );
	
			// set up stencil
	
			var writeValue, clearValue;
	
			if ( this.inverse ) {
	
				writeValue = 0;
				clearValue = 1;
	
			} else {
	
				writeValue = 1;
				clearValue = 0;
	
			}
	
			context.enable( context.STENCIL_TEST );
			context.stencilOp( context.REPLACE, context.REPLACE, context.REPLACE );
			context.stencilFunc( context.ALWAYS, writeValue, 0xffffffff );
			context.clearStencil( clearValue );
	
			// draw into the stencil buffer
	
			renderer.render( this.scene, this.camera, readBuffer, this.clear );
			renderer.render( this.scene, this.camera, writeBuffer, this.clear );
	
			// re-enable update of color and depth
	
			context.colorMask( true, true, true, true );
			context.depthMask( true );
	
			// only render where stencil is set to 1
	
			context.stencilFunc( context.EQUAL, 1, 0xffffffff );  // draw if == 1
			context.stencilOp( context.KEEP, context.KEEP, context.KEEP );
	
		}
	
	};
	
	
	THREE.ClearMaskPass = function () {
	
		this.enabled = true;
	
	};
	
	THREE.ClearMaskPass.prototype = {
	
		render: function ( renderer, writeBuffer, readBuffer, delta ) {
	
			var context = renderer.context;
	
			context.disable( context.STENCIL_TEST );
	
		}
	
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {
	
		this.scene = scene;
		this.camera = camera;
	
		this.overrideMaterial = overrideMaterial;
	
		this.clearColor = clearColor;
		this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;
	
		this.oldClearColor = new THREE.Color();
		this.oldClearAlpha = 1;
	
		this.enabled = true;
		this.clear = true;
		this.needsSwap = false;
	
	};
	
	THREE.RenderPass.prototype = {
	
		render: function ( renderer, writeBuffer, readBuffer, delta ) {
	
			this.scene.overrideMaterial = this.overrideMaterial;
	
			if ( this.clearColor ) {
	
				this.oldClearColor.copy( renderer.getClearColor() );
				this.oldClearAlpha = renderer.getClearAlpha();
	
				renderer.setClearColor( this.clearColor, this.clearAlpha );
	
			}
	
			renderer.render( this.scene, this.camera, readBuffer, this.clear );
	
			if ( this.clearColor ) {
	
				renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
	
			}
	
			this.scene.overrideMaterial = null;
	
		}
	
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	THREE.ShaderPass = function ( shader, textureID ) {
	
		this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";
	
		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	
		this.material = new THREE.ShaderMaterial( {
	
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader
	
		} );
	
		this.renderToScreen = false;
	
		this.enabled = true;
		this.needsSwap = true;
		this.clear = false;
	
	};
	
	THREE.ShaderPass.prototype = {
	
		render: function ( renderer, writeBuffer, readBuffer, delta ) {
	
			if ( this.uniforms[ this.textureID ] ) {
	
				this.uniforms[ this.textureID ].value = readBuffer;
	
			}
	
			THREE.EffectComposer.quad.material = this.material;
	
			if ( this.renderToScreen ) {
	
				renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );
	
			} else {
	
				renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, writeBuffer, this.clear );
	
			}
	
		}
	
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Full-screen textured quad shader
	 */
	
	THREE.CopyShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"opacity":  { type: "f", value: 1.0 }
	
		},
	
		vertexShader: [
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	
			"}"
	
		].join("\n"),
	
		fragmentShader: [
	
			"uniform float opacity;",
	
			"uniform sampler2D tDiffuse;",
	
			"varying vec2 vUv;",
	
			"void main() {",
	
				"vec4 texel = texture2D( tDiffuse, vUv );",
				"gl_FragColor = opacity * texel;",
	
			"}"
	
		].join("\n")
	
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* canvas-toBlob.js
	 * A canvas.toBlob() implementation.
	 * 2011-07-13
	 *
	 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
	 * License: X11/MIT
	 *   See LICENSE.md
	 */
	
	/*global self */
	/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
	  plusplus: true */
	
	/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */
	
	(function(view) {
	"use strict";
	var
	    Uint8Array = view.Uint8Array
	  , HTMLCanvasElement = view.HTMLCanvasElement
	  , is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
	  , base64_ranks
	  , decode_base64 = function(base64) {
	    var
	        len = base64.length
	      , buffer = new Uint8Array(len / 4 * 3 | 0)
	      , i = 0
	      , outptr = 0
	      , last = [0, 0]
	      , state = 0
	      , save = 0
	      , rank
	      , code
	      , undef
	    ;
	    while (len--) {
	      code = base64.charCodeAt(i++);
	      rank = base64_ranks[code-43];
	      if (rank !== 255 && rank !== undef) {
	        last[1] = last[0];
	        last[0] = code;
	        save = (save << 6) | rank;
	        state++;
	        if (state === 4) {
	          buffer[outptr++] = save >>> 16;
	          if (last[1] !== 61 /* padding character */) {
	            buffer[outptr++] = save >>> 8;
	          }
	          if (last[0] !== 61 /* padding character */) {
	            buffer[outptr++] = save;
	          }
	          state = 0;
	        }
	      }
	    }
	    // 2/3 chance there's going to be some null bytes at the end, but that
	    // doesn't really matter with most image formats.
	    // If it somehow matters for you, truncate the buffer up outptr.
	    return buffer;
	  }
	;
	if (Uint8Array) {
	  base64_ranks = new Uint8Array([
	      62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
	    , -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9
	    , 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
	    , -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
	    , 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
	  ]);
	}
	if (HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) {
	  HTMLCanvasElement.prototype.toBlob = function(callback, type /*, ...args*/) {
	      if (!type) {
	      type = "image/png";
	    } if (this.mozGetAsFile) {
	      callback(this.mozGetAsFile("canvas", type));
	      return;
	    }
	    var
	        args = Array.prototype.slice.call(arguments, 1)
	      , dataURI = this.toDataURL.apply(this, args)
	      , header_end = dataURI.indexOf(",")
	      , data = dataURI.substring(header_end + 1)
	      , is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
	      , blob
	    ;
	    if (Blob.fake) {
	      // no reason to decode a data: URI that's just going to become a data URI again
	      blob = new Blob
	      if (is_base64) {
	        blob.encoding = "base64";
	      } else {
	        blob.encoding = "URI";
	      }
	      blob.data = data;
	      blob.size = data.length;
	    } else if (Uint8Array) {
	      if (is_base64) {
	        blob = new Blob([decode_base64(data)], {type: type});
	      } else {
	        blob = new Blob([decodeURIComponent(data)], {type: type});
	      }
	    }
	    callback(blob);
	  };
	}
	}(self));


/***/ },
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var Any, Array, Backbone, Bool, BoolField, Camera, Color, Euler, EulerField, Float, FloatField, Fog, Geometry, Indexer, Material, Mesh, NodeField, Object3D, Quaternion, QuaternionField, Scene, String, StringField, Texture, Vector2, Vector2Field, Vector3, Vector3Field, Vector4, Vector4Field, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Indexer = __webpack_require__(43);
	
	namespace = __webpack_require__(50).namespace;
	
	BoolField = __webpack_require__(99);
	
	StringField = __webpack_require__(100);
	
	FloatField = __webpack_require__(101);
	
	Vector2Field = __webpack_require__(102);
	
	Vector3Field = __webpack_require__(103);
	
	Vector4Field = __webpack_require__(104);
	
	QuaternionField = __webpack_require__(105);
	
	EulerField = __webpack_require__(106);
	
	
	/* Field model */
	
	NodeField = (function(superClass) {
	  extend(NodeField, superClass);
	
	  function NodeField() {
	    this.onValueChanged = bind(this.onValueChanged, this);
	    this.removeConnections = bind(this.removeConnections, this);
	    this.unregisterConnection = bind(this.unregisterConnection, this);
	    this.addConnection = bind(this.addConnection, this);
	    this.computeValue = bind(this.computeValue, this);
	    this.renderConnections = bind(this.renderConnections, this);
	    this.toJSON = bind(this.toJSON, this);
	    this.isAnimationProperty = bind(this.isAnimationProperty, this);
	    this.getSliceCount = bind(this.getSliceCount, this);
	    this.isConnected = bind(this.isConnected, this);
	    this.isChanged = bind(this.isChanged, this);
	    this.getValue = bind(this.getValue, this);
	    this.setValue = bind(this.setValue, this);
	    this.remove = bind(this.remove, this);
	    this.initialize = bind(this.initialize, this);
	    this.load = bind(this.load, this);
	    this.set = bind(this.set, this);
	    this._validate = bind(this._validate, this);
	    this.sync = bind(this.sync, this);
	    return NodeField.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeField.VIEW = false;
	
	  NodeField.STATIC_INDEXER = new Indexer();
	
	  NodeField.prototype.defaults = function() {
	    return {
	      fid: -1,
	      name: "fieldname",
	      machine_name: "fieldname-nid",
	      is_output: false,
	      value: 0,
	      "default": null
	    };
	  };
	
	  NodeField.prototype.sync = function() {};
	
	  NodeField.prototype._validate = function(attrs, options) {
	    return true;
	  };
	
	  NodeField.prototype.set = function(key, value, options) {
	    if (options == null) {
	      options = {};
	    }
	    if (key === "value") {
	      this.attributes[key] = value;
	      return this;
	    }
	    return NodeField.__super__.set.apply(this, arguments);
	  };
	
	  NodeField.prototype.load = function(data) {
	    var property;
	    if (!data && data !== false) {
	      return;
	    }
	    if ($.type(data) !== "object") {
	      this.setValue(data);
	    } else {
	      for (property in data) {
	        this.attributes.value[property] = data[property];
	      }
	    }
	    return this;
	  };
	
	  NodeField.prototype.initialize = function(options) {
	    var indexer, self;
	    self = this;
	    this.node = options.node;
	    this.subfield = options.subfield;
	    this.propagateDirty = options.propagateDirty != null ? options.propagateDirty : true;
	    indexer = options.indexer || ThreeNodes.NodeField.STATIC_INDEXER;
	    this.changed = true;
	    this.connections = [];
	    this.on_value_update_hooks = {};
	    this.set("machine_name", this.get("name"));
	    if (this.subfield && this.subfield.node) {
	      this.set("machine_name", this.get("name") + "-" + this.subfield.node.get("nid"));
	    }
	    if (this.get("fid") === -1) {
	      return this.set("fid", indexer.getUID());
	    }
	  };
	
	  NodeField.prototype.remove = function() {
	    delete this.on_value_update_hooks;
	    delete this.node;
	    delete this.connections;
	    delete this.button;
	    delete this.subfield;
	    return this.destroy();
	  };
	
	  NodeField.prototype.isEqual = function(val, prev) {
	    var i, j, len, prev1, same_array, val1;
	    if (_.isArray(val) && _.isArray(prev)) {
	      if (val.length !== prev.length) {
	        return false;
	      }
	      same_array = true;
	      for (i = j = 0, len = val.length; j < len; i = ++j) {
	        val1 = val[i];
	        prev1 = prev[i];
	        if (this.isEqual(val1, prev1) === false) {
	          same_array = false;
	          break;
	        }
	      }
	      if (same_array === false) {
	        return false;
	      } else {
	        return true;
	      }
	    } else if (_.isObject(val) && _.isObject(prev)) {
	      if ((val.uuid != null) && (prev.uuid != null) && val.uuid === prev.uuid) {
	        return true;
	      }
	      return false;
	    } else if (val === prev) {
	      return true;
	    }
	    return false;
	  };
	
	  NodeField.prototype.setValue = function(v) {
	    var connection, default_val, hook, j, len, new_val, prev_val, propagate, ref, setNodeDirty, tmp_val;
	    prev_val = this.attributes["value"];
	    if (this.isEqual(v, prev_val)) {
	      return false;
	    }
	    this.changed = true;
	    propagate = this.propagateDirty;
	    setNodeDirty = function(node) {
	      node.dirty = true;
	      if (propagate && node.parent) {
	        return setNodeDirty(node.parent);
	      }
	    };
	    if (this.node) {
	      setNodeDirty(this.node);
	    }
	    new_val = this.onValueChanged(v);
	    if ($.type(new_val) === "array") {
	      tmp_val = _.filter(new_val, function(item) {
	        return item !== null;
	      });
	      if (this.constructor === Array) {
	        new_val = tmp_val;
	      } else {
	        if (tmp_val.length !== 0) {
	          new_val = tmp_val;
	        } else {
	          new_val = null;
	        }
	      }
	    }
	    if (new_val === null) {
	      default_val = this.attributes["default"];
	      if (default_val !== null && default_val !== void 0) {
	        prev_val = default_val;
	      }
	      new_val = prev_val;
	    }
	    this.attributes["value"] = new_val;
	    this.trigger("value_updated", new_val);
	    for (hook in this.on_value_update_hooks) {
	      this.on_value_update_hooks[hook](new_val);
	    }
	    if (this.attributes["is_output"] === true) {
	      ref = this.connections;
	      for (j = 0, len = ref.length; j < len; j++) {
	        connection = ref[j];
	        connection.to_field.setValue(new_val);
	      }
	    }
	    return true;
	  };
	
	  NodeField.prototype.getValue = function(index) {
	    var val;
	    if (index == null) {
	      index = 0;
	    }
	    val = this.attributes["value"];
	    if ($.type(val) !== "array") {
	      return val;
	    } else {
	      return val[index % val.length];
	    }
	  };
	
	  NodeField.prototype.isChanged = function() {
	    var res;
	    res = this.changed;
	    this.changed = false;
	    return res;
	  };
	
	  NodeField.prototype.isConnected = function() {
	    return this.connections.length > 0;
	  };
	
	  NodeField.prototype.getSliceCount = function() {
	    var val;
	    val = this.attributes["value"];
	    if (jQuery.type(val) !== "array") {
	      return 1;
	    }
	    return val.length;
	  };
	
	  NodeField.prototype.isAnimationProperty = function() {
	    if (this.constructor === Float || this.constructor === Bool) {
	      return true;
	    }
	    return false;
	  };
	
	  NodeField.prototype.toJSON = function() {
	    var res, val, val_type;
	    res = {
	      name: this.get("name")
	    };
	    if (this.subfield) {
	      res.nid = this.subfield.node.get("nid");
	    }
	    val = this.get("value");
	    val_type = jQuery.type(val);
	    if (val_type !== "object" && val_type !== "array") {
	      res.val = val;
	    }
	    if (val_type === "object") {
	      if (val.constructor === THREE.Vector2 || val.constructor === THREE.Vector3 || val.constructor === THREE.Vector4 || val.constructor === THREE.Color) {
	        res.val = val;
	      }
	    }
	    return res;
	  };
	
	  NodeField.prototype.renderConnections = function() {
	    var connection, j, len, ref;
	    ref = this.connections;
	    for (j = 0, len = ref.length; j < len; j++) {
	      connection = ref[j];
	      connection.render();
	    }
	    return true;
	  };
	
	  NodeField.prototype.computeValue = function(val) {
	    return val;
	  };
	
	  NodeField.prototype.addConnection = function(c) {
	    if (this.connections.indexOf(c) === -1) {
	      this.connections.push(c);
	      if (this.get("is_output") === true) {
	        this.node.addOutConnection(c, this);
	      }
	      this.node.disablePropertyAnim(this);
	    }
	    return c;
	  };
	
	  NodeField.prototype.unregisterConnection = function(c) {
	    var ind;
	    this.node.removeConnection(c);
	    ind = this.connections.indexOf(c);
	    if (ind !== -1) {
	      this.connections.splice(ind, 1);
	    }
	    if (this.connections.length === 0) {
	      return this.node.enablePropertyAnim(this);
	    }
	  };
	
	  NodeField.prototype.removeConnections = function() {
	    while (this.connections.length > 0) {
	      this.connections[0].remove();
	    }
	    return this;
	  };
	
	  NodeField.prototype.onValueChanged = function(val) {
	    var self;
	    self = this;
	    if ($.type(val) === "array") {
	      return _.map(val, function(n) {
	        return self.computeValue(n);
	      });
	    }
	    return this.computeValue(val);
	  };
	
	  return NodeField;
	
	})(Backbone.Model);
	
	Any = (function(superClass) {
	  extend(Any, superClass);
	
	  function Any() {
	    this.onValueChanged = bind(this.onValueChanged, this);
	    this.computeValue = bind(this.computeValue, this);
	    return Any.__super__.constructor.apply(this, arguments);
	  }
	
	  Any.prototype.computeValue = function(val) {
	    return val;
	  };
	
	  Any.prototype.onValueChanged = function(val) {
	    return val;
	  };
	
	  return Any;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Any', Any);
	
	Array = (function(superClass) {
	  extend(Array, superClass);
	
	  function Array() {
	    this.getValue = bind(this.getValue, this);
	    this.onValueChanged = bind(this.onValueChanged, this);
	    this.removeConnections = bind(this.removeConnections, this);
	    this.computeValue = bind(this.computeValue, this);
	    return Array.__super__.constructor.apply(this, arguments);
	  }
	
	  Array.prototype.computeValue = function(val) {
	    if (!val || val === false) {
	      return [];
	    }
	    if ($.type(val) === "array") {
	      return val;
	    } else {
	      return [val];
	    }
	  };
	
	  Array.prototype.removeConnections = function() {
	    Array.__super__.removeConnections.apply(this, arguments);
	    if (this.get("is_output") === false) {
	      return this.setValue([]);
	    }
	  };
	
	  Array.prototype.onValueChanged = function(val) {
	    return this.computeValue(val);
	  };
	
	  Array.prototype.getValue = function(index) {
	    if (index == null) {
	      index = 0;
	    }
	    return this.get("value");
	  };
	
	  return Array;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Array', Array);
	
	Bool = (function(superClass) {
	  extend(Bool, superClass);
	
	  function Bool() {
	    this.computeValue = bind(this.computeValue, this);
	    return Bool.__super__.constructor.apply(this, arguments);
	  }
	
	  Bool.VIEW = BoolField;
	
	  Bool.prototype.computeValue = function(val) {
	    switch ($.type(val)) {
	      case "boolean":
	        return val;
	      case "number":
	        return val !== 0;
	      case "string":
	        return val === "1";
	    }
	    return null;
	  };
	
	  return Bool;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Bool', Bool);
	
	String = (function(superClass) {
	  extend(String, superClass);
	
	  function String() {
	    this.computeValue = bind(this.computeValue, this);
	    return String.__super__.constructor.apply(this, arguments);
	  }
	
	  String.VIEW = StringField;
	
	  String.prototype.computeValue = function(val) {
	    switch ($.type(val)) {
	      case "array":
	        return val;
	      case "number":
	        return val.toString;
	      case "string":
	        return val;
	    }
	    return null;
	  };
	
	  return String;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('String', String);
	
	Float = (function(superClass) {
	  extend(Float, superClass);
	
	  function Float() {
	    this.computeValue = bind(this.computeValue, this);
	    return Float.__super__.constructor.apply(this, arguments);
	  }
	
	  Float.VIEW = FloatField;
	
	  Float.prototype.computeValue = function(val) {
	    switch ($.type(val)) {
	      case "number":
	      case "string":
	        return parseFloat(val);
	      case "object":
	        if (val.constructor === THREE.Vector2 || val.constructor === THREE.Vector3) {
	          return val;
	        }
	        break;
	      case "boolean":
	        if (val === true) {
	          return 1;
	        } else {
	          return 0;
	        }
	    }
	    return null;
	  };
	
	  return Float;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Float', Float);
	
	Vector2 = (function(superClass) {
	  extend(Vector2, superClass);
	
	  function Vector2() {
	    this.computeValue = bind(this.computeValue, this);
	    return Vector2.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector2.VIEW = Vector2Field;
	
	  Vector2.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Vector2) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Vector2;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Vector2', Vector2);
	
	Vector3 = (function(superClass) {
	  extend(Vector3, superClass);
	
	  function Vector3() {
	    this.computeValue = bind(this.computeValue, this);
	    return Vector3.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector3.VIEW = Vector3Field;
	
	  Vector3.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Vector3) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Vector3;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Vector3', Vector3);
	
	Vector4 = (function(superClass) {
	  extend(Vector4, superClass);
	
	  function Vector4() {
	    this.computeValue = bind(this.computeValue, this);
	    return Vector4.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector4.VIEW = Vector4Field;
	
	  Vector4.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Vector4) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Vector4;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Vector4', Vector4);
	
	Quaternion = (function(superClass) {
	  extend(Quaternion, superClass);
	
	  function Quaternion() {
	    this.computeValue = bind(this.computeValue, this);
	    return Quaternion.__super__.constructor.apply(this, arguments);
	  }
	
	  Quaternion.VIEW = QuaternionField;
	
	  Quaternion.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Quaternion) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Quaternion;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Quaternion', Quaternion);
	
	Euler = (function(superClass) {
	  extend(Euler, superClass);
	
	  function Euler() {
	    this.computeValue = bind(this.computeValue, this);
	    return Euler.__super__.constructor.apply(this, arguments);
	  }
	
	  Euler.VIEW = EulerField;
	
	  Euler.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Euler) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Euler;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Euler', Euler);
	
	Color = (function(superClass) {
	  extend(Color, superClass);
	
	  function Color() {
	    this.computeValue = bind(this.computeValue, this);
	    return Color.__super__.constructor.apply(this, arguments);
	  }
	
	  Color.VIEW = false;
	
	  Color.prototype.computeValue = function(val) {
	    switch ($.type(val)) {
	      case "number":
	        return new THREE.Color().setRGB(val, val, val);
	      case "object":
	        switch (val.constructor) {
	          case THREE.Color:
	            return val;
	          case THREE.Vector3:
	            return new THREE.Color().setRGB(val.x, val.y, val.z);
	        }
	        break;
	      case "boolean":
	        if (val) {
	          return new THREE.Color(0xffffff);
	        } else {
	          return new THREE.Color(0x000000);
	        }
	    }
	    return null;
	  };
	
	  return Color;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Color', Color);
	
	Object3D = (function(superClass) {
	  extend(Object3D, superClass);
	
	  function Object3D() {
	    this.computeValue = bind(this.computeValue, this);
	    return Object3D.__super__.constructor.apply(this, arguments);
	  }
	
	  Object3D.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Object3D || val instanceof THREE.Object3D) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Object3D;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Object3D', Object3D);
	
	Scene = (function(superClass) {
	  extend(Scene, superClass);
	
	  function Scene() {
	    this.computeValue = bind(this.computeValue, this);
	    return Scene.__super__.constructor.apply(this, arguments);
	  }
	
	  Scene.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val instanceof THREE.Scene) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Scene;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Scene', Scene);
	
	Camera = (function(superClass) {
	  extend(Camera, superClass);
	
	  function Camera() {
	    this.computeValue = bind(this.computeValue, this);
	    return Camera.__super__.constructor.apply(this, arguments);
	  }
	
	  Camera.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val instanceof THREE.Camera || val instanceof THREE.PerspectiveCamera || val instanceof THREE.OrthographicCamera) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Camera;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Camera', Camera);
	
	Mesh = (function(superClass) {
	  extend(Mesh, superClass);
	
	  function Mesh() {
	    this.computeValue = bind(this.computeValue, this);
	    return Mesh.__super__.constructor.apply(this, arguments);
	  }
	
	  Mesh.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Mesh || val instanceof THREE.Mesh) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Mesh;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Mesh', Mesh);
	
	Geometry = (function(superClass) {
	  extend(Geometry, superClass);
	
	  function Geometry() {
	    this.computeValue = bind(this.computeValue, this);
	    return Geometry.__super__.constructor.apply(this, arguments);
	  }
	
	  Geometry.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Geometry || val instanceof THREE.Geometry) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Geometry;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Geometry', Geometry);
	
	Material = (function(superClass) {
	  extend(Material, superClass);
	
	  function Material() {
	    this.computeValue = bind(this.computeValue, this);
	    return Material.__super__.constructor.apply(this, arguments);
	  }
	
	  Material.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Material || val instanceof THREE.Material) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Material;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Material', Material);
	
	Texture = (function(superClass) {
	  extend(Texture, superClass);
	
	  function Texture() {
	    this.computeValue = bind(this.computeValue, this);
	    return Texture.__super__.constructor.apply(this, arguments);
	  }
	
	  Texture.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Texture || val instanceof THREE.Texture) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Texture;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Texture', Texture);
	
	Fog = (function(superClass) {
	  extend(Fog, superClass);
	
	  function Fog() {
	    this.computeValue = bind(this.computeValue, this);
	    return Fog.__super__.constructor.apply(this, arguments);
	  }
	
	  Fog.prototype.computeValue = function(val) {
	    if ($.type(val) === "object") {
	      if (val.constructor === THREE.Fog || val.constructor === THREE.FogExp2) {
	        return val;
	      }
	    }
	    return null;
	  };
	
	  return Fog;
	
	})(NodeField);
	
	ThreeNodes.Core.addFieldType('Fog', Fog);


/***/ },
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, BoolField, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* SidebarField View */
	
	BoolField = (function(superClass) {
	  extend(BoolField, superClass);
	
	  function BoolField() {
	    this.render = bind(this.render, this);
	    this.on_value_updated = bind(this.on_value_updated, this);
	    return BoolField.__super__.constructor.apply(this, arguments);
	  }
	
	  BoolField.prototype.on_value_updated = function(new_val) {
	    if (this.model.getValue() === true) {
	      return this.$checkbox.attr('checked', 'checked');
	    } else {
	      return this.$checkbox.removeAttr('checked');
	    }
	  };
	
	  BoolField.prototype.render = function() {
	    var $container, $target, id;
	    console.log("check..");
	    $target = this.createSidebarContainer();
	    id = "side-field-checkbox-" + (this.model.get('fid'));
	    $container = $("<div><input type='checkbox' id='" + id + "'/></div>").appendTo($target);
	    this.$checkbox = $("input", $container);
	    if (this.model.getValue() === true) {
	      this.$checkbox.attr('checked', 'checked');
	    }
	    this.$checkbox.change((function(_this) {
	      return function(e) {
	        if (_this.$checkbox.is(':checked')) {
	          return _this.model.setValue(true);
	        } else {
	          return _this.model.setValue(false);
	        }
	      };
	    })(this));
	    return this;
	  };
	
	  return BoolField;
	
	})(BaseField);
	
	module.exports = BoolField;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, StringField, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* StringField View */
	
	StringField = (function(superClass) {
	  extend(StringField, superClass);
	
	  function StringField() {
	    this.create_sidebar_input = bind(this.create_sidebar_input, this);
	    this.create_sidebar_select = bind(this.create_sidebar_select, this);
	    this.render = bind(this.render, this);
	    return StringField.__super__.constructor.apply(this, arguments);
	  }
	
	  StringField.prototype.render = function() {
	    var $target;
	    $target = this.createSidebarContainer();
	    if (this.model.attributes.possibilities) {
	      this.create_sidebar_select($target);
	    } else {
	      this.create_sidebar_input($target);
	    }
	    return true;
	  };
	
	  StringField.prototype.create_sidebar_select = function($target) {
	    var dval, f, input, self;
	    self = this;
	    input = "<div><select>";
	    for (f in this.model.get("possibilities")) {
	      dval = this.model.get("possibilities")[f];
	      if (dval === this.val) {
	        input += "<option value='" + dval + "' selected='selected'>" + f + "</option>";
	      } else {
	        input += "<option value='" + dval + "'>" + f + "</option>";
	      }
	    }
	    input += "</select></div>";
	    $target.append(input);
	    $("select", $target).change((function(_this) {
	      return function(e) {
	        return _this.model.setValue($("select", $target).val());
	      };
	    })(this));
	    return true;
	  };
	
	  StringField.prototype.create_sidebar_input = function($target) {
	    this.textfield = this.createTextfield($target, "string");
	    return this.textfield.linkTextfieldToVal("string");
	  };
	
	  return StringField;
	
	})(BaseField);
	
	module.exports = StringField;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, FloatField, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* FloatField View */
	
	FloatField = (function(superClass) {
	  extend(FloatField, superClass);
	
	  function FloatField() {
	    this.create_sidebar_input = bind(this.create_sidebar_input, this);
	    this.create_sidebar_select = bind(this.create_sidebar_select, this);
	    this.render = bind(this.render, this);
	    return FloatField.__super__.constructor.apply(this, arguments);
	  }
	
	  FloatField.prototype.initialize = function(options) {
	    return FloatField.__super__.initialize.apply(this, arguments);
	  };
	
	  FloatField.prototype.render = function() {
	    var $target;
	    $target = this.createSidebarContainer();
	    if (this.model.attributes.possibilities) {
	      this.create_sidebar_select($target);
	    } else {
	      this.create_sidebar_input($target);
	    }
	    return true;
	  };
	
	  FloatField.prototype.create_sidebar_select = function($target) {
	    var dval, f, input, self;
	    self = this;
	    input = "<div><select>";
	    for (f in this.model.get("possibilities")) {
	      dval = this.model.get("possibilities")[f];
	      if (dval === this.val) {
	        input += "<option value='" + dval + "' selected='selected'>" + f + "</option>";
	      } else {
	        input += "<option value='" + dval + "'>" + f + "</option>";
	      }
	    }
	    input += "</select></div>";
	    $target.append(input);
	    $("select", $target).change((function(_this) {
	      return function(e) {
	        return _this.model.setValue($("select", $target).val());
	      };
	    })(this));
	    return true;
	  };
	
	  FloatField.prototype.create_sidebar_input = function($target) {
	    this.textfield = this.createTextfield($target);
	    return this.textfield.linkTextfieldToVal();
	  };
	
	  return FloatField;
	
	})(BaseField);
	
	module.exports = FloatField;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, Vector2Field, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* Vector2Field View */
	
	Vector2Field = (function(superClass) {
	  extend(Vector2Field, superClass);
	
	  function Vector2Field() {
	    this.render = bind(this.render, this);
	    return Vector2Field.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector2Field.prototype.render = function() {
	    this.createSidebarFieldTitle();
	    this.createSubvalTextinput("x");
	    this.createSubvalTextinput("y");
	    return this;
	  };
	
	  return Vector2Field;
	
	})(BaseField);
	
	module.exports = Vector2Field;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, Vector3Field, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* Vector3Field View */
	
	Vector3Field = (function(superClass) {
	  extend(Vector3Field, superClass);
	
	  function Vector3Field() {
	    this.render = bind(this.render, this);
	    return Vector3Field.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector3Field.prototype.render = function() {
	    this.createSidebarFieldTitle();
	    this.createSubvalTextinput("x");
	    this.createSubvalTextinput("y");
	    this.createSubvalTextinput("z");
	    return this;
	  };
	
	  return Vector3Field;
	
	})(BaseField);
	
	module.exports = Vector3Field;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, Vector4Field, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* Vector4Field View */
	
	Vector4Field = (function(superClass) {
	  extend(Vector4Field, superClass);
	
	  function Vector4Field() {
	    this.render = bind(this.render, this);
	    return Vector4Field.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector4Field.prototype.render = function() {
	    this.createSidebarFieldTitle();
	    this.createSubvalTextinput("x");
	    this.createSubvalTextinput("y");
	    this.createSubvalTextinput("z");
	    this.createSubvalTextinput("w");
	    return this;
	  };
	
	  return Vector4Field;
	
	})(BaseField);
	
	module.exports = Vector4Field;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, QuaternionField, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* Vector3Field View */
	
	QuaternionField = (function(superClass) {
	  extend(QuaternionField, superClass);
	
	  function QuaternionField() {
	    this.render = bind(this.render, this);
	    return QuaternionField.__super__.constructor.apply(this, arguments);
	  }
	
	  QuaternionField.prototype.render = function() {
	    this.createSidebarFieldTitle();
	    this.createSubvalTextinput("x");
	    this.createSubvalTextinput("y");
	    this.createSubvalTextinput("z");
	    this.createSubvalTextinput("w");
	    return this;
	  };
	
	  return QuaternionField;
	
	})(BaseField);
	
	module.exports = QuaternionField;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, EulerField, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	BaseField = __webpack_require__(107);
	
	
	/* Euler3Field View */
	
	EulerField = (function(superClass) {
	  extend(EulerField, superClass);
	
	  function EulerField() {
	    this.render = bind(this.render, this);
	    return EulerField.__super__.constructor.apply(this, arguments);
	  }
	
	  EulerField.prototype.render = function() {
	    this.createSidebarFieldTitle();
	    this.createSubvalTextinput("x");
	    this.createSubvalTextinput("y");
	    this.createSubvalTextinput("z");
	    this.createSubvalTextinput("order", "string");
	    return this;
	  };
	
	  return EulerField;
	
	})(BaseField);
	
	module.exports = EulerField;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, BaseField, SidebarTextfield, _, _view_field_sidebar_container,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	_view_field_sidebar_container = __webpack_require__(108);
	
	SidebarTextfield = __webpack_require__(109);
	
	
	/* BaseField View */
	
	BaseField = (function(superClass) {
	  extend(BaseField, superClass);
	
	  function BaseField() {
	    this.createSidebarFieldTitle = bind(this.createSidebarFieldTitle, this);
	    this.createSubvalTextinput = bind(this.createSubvalTextinput, this);
	    this.createTextfield = bind(this.createTextfield, this);
	    this.createSidebarContainer = bind(this.createSidebarContainer, this);
	    this.render = bind(this.render, this);
	    this.on_value_updated = bind(this.on_value_updated, this);
	    return BaseField.__super__.constructor.apply(this, arguments);
	  }
	
	  BaseField.prototype.initialize = function(options) {
	    BaseField.__super__.initialize.apply(this, arguments);
	    this.model.on("value_updated", this.on_value_updated);
	    return this.render();
	  };
	
	  BaseField.prototype.on_value_updated = function(new_val) {
	    return this;
	  };
	
	  BaseField.prototype.render = function() {
	    return this;
	  };
	
	  BaseField.prototype.createSidebarContainer = function(name) {
	    var options;
	    if (name == null) {
	      name = this.model.get("name");
	    }
	    options = {
	      fid: this.model.get("fid"),
	      model: this,
	      name: name
	    };
	    this.container = $(_.template(_view_field_sidebar_container, options));
	    this.$el.append(this.container);
	    return this.container;
	  };
	
	  BaseField.prototype.createTextfield = function($target, type, link_to_val) {
	    var textField;
	    if (type == null) {
	      type = "float";
	    }
	    if (link_to_val == null) {
	      link_to_val = true;
	    }
	    textField = new SidebarTextfield({
	      model: this.model,
	      el: $target,
	      type: type,
	      link_to_val: link_to_val
	    });
	    return textField;
	  };
	
	  BaseField.prototype.createSubvalTextinput = function(subval, type) {
	    var $target, textfield;
	    if (type == null) {
	      type = "float";
	    }
	    $target = this.createSidebarContainer(subval);
	    textfield = this.createTextfield($target, type, false);
	    textfield.linkTextfieldToSubval(subval, type);
	    return false;
	  };
	
	  BaseField.prototype.createSidebarFieldTitle = function(name) {
	    if (name == null) {
	      name = this.model.get("name");
	    }
	    this.$el.append("<h3>" + name + "</h3>");
	    return this.$el;
	  };
	
	  return BaseField;
	
	})(Backbone.View);
	
	module.exports = BaseField;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div data-fid=\"<%= fid %>\" class='field-wrapper'>\n  <h3><%= name %></h3>\n</div>\n";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, DraggableNumber, SidebarTextfield, _, _view_field_textfield,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	_view_field_textfield = __webpack_require__(110);
	
	DraggableNumber = __webpack_require__(111);
	
	
	/* SidebarTextfield View */
	
	SidebarTextfield = (function(superClass) {
	  extend(SidebarTextfield, superClass);
	
	  function SidebarTextfield() {
	    this.addTextfieldSlider = bind(this.addTextfieldSlider, this);
	    this.linkTextfieldToSubval = bind(this.linkTextfieldToSubval, this);
	    this.linkTextfieldToVal = bind(this.linkTextfieldToVal, this);
	    this.render = bind(this.render, this);
	    return SidebarTextfield.__super__.constructor.apply(this, arguments);
	  }
	
	  SidebarTextfield.prototype.initialize = function(options) {
	    SidebarTextfield.__super__.initialize.apply(this, arguments);
	    this.slider = false;
	    return this.render();
	  };
	
	  SidebarTextfield.prototype.render = function() {
	    this.container = $(_.template(_view_field_textfield, this.options));
	    this.$el.append(this.container);
	    this.$input = $("input", this.container);
	    return this;
	  };
	
	  SidebarTextfield.prototype.linkTextfieldToVal = function(type) {
	    var on_value_changed;
	    if (type == null) {
	      type = "float";
	    }
	    this.$input.val(this.model.getValue());
	    if (this.options.type === "float" && this.slider === false) {
	      this.slider = this.addTextfieldSlider();
	    }
	    on_value_changed = (function(_this) {
	      return function(v) {
	        if (_this.slider) {
	          return _this.slider.set(v);
	        }
	      };
	    })(this);
	    this.model.on("value_updated", on_value_changed);
	    this.$input.val(this.model.getValue());
	    if (this.slider) {
	      this.slider._options.changeCallback = (function(_this) {
	        return function(new_val) {
	          return _this.model.setValue(new_val);
	        };
	      })(this);
	    }
	    this.$input.keypress((function(_this) {
	      return function(e) {
	        if (e.which === 13) {
	          if (type === "float") {
	            _this.model.setValue(parseFloat(_this.$input.val()));
	          } else {
	            _this.model.setValue(_this.$input.val());
	          }
	          return _this.$input.blur();
	        }
	      };
	    })(this));
	    return this;
	  };
	
	  SidebarTextfield.prototype.linkTextfieldToSubval = function(subval, type) {
	    var updateVal;
	    if (type == null) {
	      type = "float";
	    }
	    this.$input.val(this.model.getValue()[subval]);
	    if (this.options.type === "float") {
	      this.slider = this.addTextfieldSlider();
	    }
	    this.model.on_value_update_hooks["update_sidebar_textfield_" + subval] = (function(_this) {
	      return function(v) {
	        return _this.$input.val(v[subval]);
	      };
	    })(this);
	    updateVal = (function(_this) {
	      return function() {
	        var dval;
	        dval = _this.$input.val();
	        if (type === "float") {
	          dval = parseFloat(dval);
	        }
	        if ($.type(_this.model.attributes.value) === "array") {
	          return _this.model.attributes.value[0][subval] = dval;
	        } else {
	          return _this.model.attributes.value[subval] = dval;
	        }
	      };
	    })(this);
	    this.slider._options.changeCallback = (function(_this) {
	      return function(new_val) {
	        return updateVal();
	      };
	    })(this);
	    this.$input.change((function(_this) {
	      return function(e) {
	        return updateVal();
	      };
	    })(this));
	    this.$input.keypress((function(_this) {
	      return function(e) {
	        if (e.which === 13) {
	          updateVal();
	          return _this.$input.blur();
	        }
	      };
	    })(this));
	    return this;
	  };
	
	  SidebarTextfield.prototype.addTextfieldSlider = function() {
	    var slider;
	    slider = new DraggableNumber(this.$input.get(0));
	    return slider;
	  };
	
	  return SidebarTextfield;
	
	})(Backbone.View);
	
	module.exports = SidebarTextfield;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class='input-container'>\n  <input type='text' class='field-<%= type %>' />\n</div>\n";

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/**!
	 * draggable-number.js
	 * Minimal numeric input widget
	 *
	 * @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
	 * @author David Mignot - http://idflood.com
	 * @version 0.3.0
	 **/
	(function(root, factory) {
	    if(true) {
	        module.exports = factory();
	    }
	    else if(typeof define === 'function' && define.amd) {
	        define([], factory);
	    }
	    else {
	        root['DraggableNumber'] = factory();
	    }
	}(this, function() {
	// Utility function to replace .bind(this) since it is not available in all browsers.
	var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	/**
	 * Define the DraggableNumber element.
	 * @constructor
	 * @param {DomElement} input - The input which will be converted to a draggableNumber.
	 */
	DraggableNumber = function (input, options) {
	  this._options = options !== undefined ? options : {};
	
	  this._input = input;
	  this._span = document.createElement("span");
	  this._isDragging = false;
	  this._lastMousePosition = {x: 0, y: 0};
	  this._value = 0;
	
	  // Minimum mouse movement before a drag start.
	  this._dragThreshold = this._setOption('dragThreshold', 10);
	
	  // Min/max value.
	  this._min = this._setOption('min', -Infinity);
	  this._max = this._setOption('max', Infinity);
	
	  // Store the original display style for the input and span.
	  this._inputDisplayStyle = "";
	  this._spanDisplayStyle = "";
	
	  this._init();
	};
	
	/**
	 * Constant used when there is no key modifier.
	 * @constant
	 * type {Number}
	 */
	DraggableNumber.MODIFIER_NONE = 0;
	
	/**
	 * Constant used when there is a shift key modifier.
	 * @constant
	 * type {Number}
	 */
	DraggableNumber.MODIFIER_LARGE = 1;
	
	/**
	 * Constant used when there is a control key modifier.
	 * @constant
	 * type {Number}
	 */
	DraggableNumber.MODIFIER_SMALL = 2;
	
	DraggableNumber.prototype = {
	  constructor: DraggableNumber,
	
	  /**
	   * Initialize the DraggableNumber.
	   * @private
	   */
	  _init: function () {
	    // Get the inital _value from the input.
	    this._value = parseFloat(this._input.value, 10);
	
	    // Add a span containing the _value. Clicking on the span will show the
	    // input. Dragging the span will change the _value.
	    this._addSpan();
	
	    // Save the original display style of the input and span.
	    this._inputDisplayStyle = this._input.style.display;
	    this._spanDisplayStyle = this._span.style.display;
	
	    // Hide the input.
	    this._input.style.display = 'none';
	
	    // Bind 'this' on event callbacks.
	    this._onMouseUp = __bind(this._onMouseUp, this);
	    this._onMouseMove = __bind(this._onMouseMove, this);
	    this._onMouseDown = __bind(this._onMouseDown, this);
	    this._onInputBlur = __bind(this._onInputBlur, this);
	    this._onInputKeyDown = __bind(this._onInputKeyDown, this);
	    this._onInputChange = __bind(this._onInputChange, this);
	
	    // Add mousedown event handler.
	    this._span.addEventListener('mousedown', this._onMouseDown, false);
	
	    // Add key events on the input.
	    this._input.addEventListener('blur', this._onInputBlur, false);
	    this._input.addEventListener('keypress', this._onInputKeyDown, false);
	
	    // Directly assign the function instead of using addeventlistener.
	    // To programatically change the _value of the draggableNumber you
	    // could then do:
	    // input._value = new_number;
	    // input.onchange();
	    this._input.onchange = this._onInputChange;
	  },
	
	  /**
	   * Set the DraggableNumber value.
	   * @public
	   * @param {Number} new_value - The new value.
	   */
	  set: function (new_value) {
	    new_value = this._constraintValue(new_value);
	    this._value = new_value;
	    this._input.value = this._value;
	    this._span.innerHTML = this._value;
	  },
	
	  /**
	   * Get the DraggableNumber value.
	   * @public
	   * @returns {Number}
	   */
	  get: function () {
	    return this._value;
	  },
	
	  /**
	   * Set the minimum value.
	   * @public
	   * @param {Number} min - The minimum value.
	   */
	  setMin: function (min) {
	    this._min = min;
	    // Set the value with current value to automatically constrain it if needed.
	    this.set(this._value);
	  },
	
	  /**
	   * Set the maximum value.
	   * @public
	   * @param {Number} min - The minimum value.
	   */
	  setMax: function (max) {
	    this._max = max;
	    // Set the value with current value to automatically constrain it if needed.
	    this.set(this._value);
	  },
	
	  /**
	   * Remove the DraggableNumber.
	   * @public
	   */
	  destroy: function () {
	    // Remove event listeners.
	    this._span.removeEventListener('mousedown', this._onMouseDown, false);
	    this._input.removeEventListener('blur', this._onInputBlur, false);
	    this._input.removeEventListener('keypress', this._onInputKeyDown, false);
	    document.removeEventListener('mouseup', this._onMouseUp, false);
	    document.removeEventListener('mousemove', this._onMouseMove, false);
	
	    // Remove the span element.
	    if (this._span.parentNode) {
	      this._span.parentNode.removeChild(this._span);
	    }
	
	    // Delete variables.
	    delete this._input;
	    delete this._span;
	    delete this._inputDisplayStyle;
	    delete this._spanDisplayStyle;
	  },
	
	  /**
	   * Set an option value based on the option parameter and the data attribute.
	   * @private
	   * @param {String} name - The option name.
	   * @param {Number} defaultValue - The default value.
	   * @returns {Number}
	   */
	  _setOption: function (name, defaultValue) {
	    // Return the option if it is defined.
	    if (this._options[name] !== undefined) {
	      return this._options[name];
	    }
	    // Return the data attribute if it is defined.
	    if (this._input.hasAttribute("data-" + name)) {
	      return parseFloat(this._input.getAttribute("data-" + name), 10);
	    }
	    // If there is no option and no attribute, return the default value.
	    return defaultValue;
	  },
	
	  /**
	   * Prevent selection on the whole document.
	   * @private
	   * @param {Boolean} prevent - Should we prevent or not the selection.
	   */
	  _preventSelection: function (prevent) {
	    var value = 'none';
	    if (prevent === false) {
	      value = 'all';
	    }
	
	    document.body.style['-moz-user-select'] = value;
	    document.body.style['-webkit-user-select'] = value;
	    document.body.style['-ms-user-select'] = value;
	    document.body.style['user-select'] = value;
	  },
	
	  /**
	   * Add a span element before the input.
	   * @private
	   */
	  _addSpan: function () {
	    var inputParent = this._input.parentNode;
	    inputParent.insertBefore(this._span, this._input);
	    this._span.innerHTML = this.get();
	
	    // Add resize cursor.
	    this._span.style.cursor = "col-resize";
	  },
	
	  /**
	   * Display the input and hide the span element.
	   * @private
	   */
	  _showInput: function () {
	    this._input.style.display = this._inputDisplayStyle;
	    this._span.style.display = 'none';
	    this._input.focus();
	  },
	
	  /**
	   * Show the span element and hide the input.
	   * @private
	   */
	  _showSpan: function () {
	    this._input.style.display = 'none';
	    this._span.style.display = this._spanDisplayStyle;
	  },
	
	  /**
	   * Called on input blur, set the new value and display span.
	   * @private
	   * @param {Object} e - Event.
	   */
	  _onInputBlur: function (e) {
	    this._onInputChange();
	    this._showSpan();
	  },
	
	  /**
	   * Called on input onchange event, set the value based on the input value.
	   * @private
	   */
	  _onInputChange: function () {
	    this.set(parseFloat(this._input.value, 10));
	  },
	
	  /**
	   * Called on input key down, blur on enter.
	   * @private
	   * @param {Object} e - Key event.
	   */
	  _onInputKeyDown: function (e) {
	    var keyEnter = 13;
	    if (e.charCode == keyEnter) {
	      this._input.blur();
	    }
	  },
	
	  /**
	   * Called on span mouse down, prevent selection and initalize logic for mouse drag.
	   * @private
	   * @param {Object} e - Mouse event.
	   */
	  _onMouseDown: function (e) {
	    this._preventSelection(true);
	    this._isDragging = false;
	    this._lastMousePosition = {x: e.clientX, y: e.clientY};
	
	    document.addEventListener('mouseup', this._onMouseUp, false);
	    document.addEventListener('mousemove', this._onMouseMove, false);
	  },
	
	  /**
	   * Called on span mouse up, show input if no drag.
	   * @private
	   * @param {Object} e - Mouse event.
	   */
	  _onMouseUp: function (e) {
	    this._preventSelection(false);
	    // If we didn't drag the span then we display the input.
	    if (this._isDragging === false) {
	      this._showInput();
	    }
	    this._isDragging = false;
	
	    document.removeEventListener('mouseup', this._onMouseUp, false);
	    document.removeEventListener('mousemove', this._onMouseMove, false);
	  },
	
	  /**
	   * Check if difference bettween 2 positions is above minimum threshold.
	   * @private
	   * @param {Object} newMousePosition - the new mouse position.
	   * @param {Object} lastMousePosition - the last mouse position.
	   * @returns {Boolean}
	   */
	  _hasMovedEnough: function (newMousePosition, lastMousePosition) {
	    if (Math.abs(newMousePosition.x - lastMousePosition.x) >= this._dragThreshold ||
	      Math.abs(newMousePosition.y - lastMousePosition.y) >= this._dragThreshold) {
	      return true;
	    }
	    return false;
	  },
	
	  _onMouseMove: function (e) {
	    // Get the new mouse position.
	    var newMousePosition = {x: e.clientX, y: e.clientY};
	
	    if (this._hasMovedEnough(newMousePosition, this._lastMousePosition)) {
	      this._isDragging = true;
	    }
	
	    // If we are not dragging don't do anything.
	    if (this._isDragging === false) {
	      return;
	    }
	
	    // Get the increment modifier. Small increment * 0.1, large increment * 10.
	    var modifier = DraggableNumber.MODIFIER_NONE;
	    if (e.shiftKey) {
	      modifier = DraggableNumber.MODIFIER_LARGE;
	    }
	    else if (e.ctrlKey) {
	      modifier = DraggableNumber.MODIFIER_SMALL;
	    }
	
	    // Calculate the delta with previous mouse position.
	    var delta = this._getLargestDelta(newMousePosition, this._lastMousePosition);
	
	    // Get the number offset.
	    var offset = this._getNumberOffset(delta, modifier);
	
	    // Update the input number.
	    var new_value = this.get() + offset;
	    this.set(new_value);
	
	    // Call onchange callback if it exists.
	    if ("changeCallback" in this._options) {
	      this._options.changeCallback(new_value);
	    }
	
	    // Save current mouse position.
	    this._lastMousePosition = newMousePosition;
	  },
	
	  /**
	   * Return the number offset based on a delta and a modifier.
	   * @private
	   * @param {Number} delta - a positive or negative number.
	   * @param {Number} modifier - the modifier type.
	   * @returns {Number}
	   */
	  _getNumberOffset: function (delta, modifier) {
	    var increment = 1;
	    if (modifier == DraggableNumber.MODIFIER_SMALL) {
	      increment *= 0.1;
	    }
	    else if (modifier == DraggableNumber.MODIFIER_LARGE) {
	      increment *= 10;
	    }
	    // Negative increment if delta is negative.
	    if (delta < 0) {
	      increment *= -1;
	    }
	    return increment;
	  },
	
	  /**
	   * Return the largest difference between two positions, either x or y.
	   * @private
	   * @param {Object} newMousePosition - the new mouse position.
	   * @param {Object} lastMousePosition - the last mouse position.
	   * @returns {Number}
	   */
	  _getLargestDelta: function (newPosition, oldPosition) {
	    var result = 0;
	    var delta = {
	      x: newPosition.x - oldPosition.x,
	      y: newPosition.y - oldPosition.y,
	    };
	
	    if (Math.abs(delta.x) > Math.abs(delta.y)) {
	      return delta.x;
	    }
	    else {
	      // Inverse the position.y since mouse move to up should increase the _value.
	      return delta.y * -1;
	    }
	  },
	
	  /**
	   * Constrain a value between min and max.
	   * @private
	   * @param {Number} value - The value to constrain.
	   * @returns {Number}
	   */
	  _constraintValue: function (value) {
	    value = Math.min(value, this._max);
	    value = Math.max(value, this._min);
	    return value;
	  }
	};
	
	    return DraggableNumber;
	}));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=ThreeNodes.NodeTypes.Three.js.map