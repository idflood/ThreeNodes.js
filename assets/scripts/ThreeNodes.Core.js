(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"), require("Backbone"));
	else if(typeof define === 'function' && define.amd)
		define(["_", "Backbone"], factory);
	else if(typeof exports === 'object')
		exports["Core"] = factory(require("_"), require("Backbone"));
	else
		root["ThreeNodes"] = root["ThreeNodes"] || {}, root["ThreeNodes"]["Core"] = factory(root["_"], root["Backbone"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Core, GroupDefinitions, Nodes;
	
	Nodes = __webpack_require__(11);
	
	GroupDefinitions = __webpack_require__(4);
	
	Core = (function() {
	  Core.fields = {
	    models: {},
	    views: {}
	  };
	
	  Core.nodes = {
	    models: {},
	    views: {}
	  };
	
	  function Core(options) {
	    var settings;
	    settings = {
	      test: false,
	      player_mode: false
	    };
	    this.settings = $.extend({}, settings, options);
	    this.group_definitions = new GroupDefinitions([]);
	    this.nodes = new Nodes([], {
	      settings: this.settings
	    });
	    this.group_definitions.bind("definition:created", this.nodes.createGroup);
	    this.group_definitions.bind("remove", this.nodes.removeGroupsByDefinition);
	  }
	
	  Core.addFieldType = function(fieldName, field) {
	    Core.fields.models[fieldName] = field;
	    return true;
	  };
	
	  Core.addFieldView = function(fieldName, fieldView) {
	    Core.fields.views[fieldName] = fieldView;
	    return true;
	  };
	
	  Core.addNodeType = function(nodeName, nodeType) {
	    Core.nodes.models[nodeName] = nodeType;
	    return true;
	  };
	
	  Core.addNodeView = function(viewName, nodeView) {
	    Core.nodes.views[viewName] = nodeView;
	    return true;
	  };
	
	  Core.prototype.setNodes = function(json_object) {
	    var connection, def, delay, grp, grp_def, i, j, k, len, len1, len2, node, ref, ref1, ref2;
	    this.nodes.removeAll();
	    if (json_object.groups) {
	      ref = json_object.groups;
	      for (i = 0, len = ref.length; i < len; i++) {
	        grp_def = ref[i];
	        this.group_definitions.create(grp_def);
	      }
	    }
	    ref1 = json_object.nodes;
	    for (j = 0, len1 = ref1.length; j < len1; j++) {
	      node = ref1[j];
	      if (node.type !== "Group") {
	        this.nodes.createNode(node);
	      } else {
	        def = this.group_definitions.getByGid(node.definition_id);
	        if (def) {
	          node.definition = def;
	          grp = this.nodes.createGroup(node);
	        } else {
	          console.log("can't find the GroupDefinition: " + node.definition_id);
	        }
	      }
	    }
	    ref2 = json_object.connections;
	    for (k = 0, len2 = ref2.length; k < len2; k++) {
	      connection = ref2[k];
	      this.nodes.createConnectionFromObject(connection);
	    }
	    this.nodes.indexer.uid = json_object.uid;
	    delay = function(ms, func) {
	      return setTimeout(func, ms);
	    };
	    return delay(1, (function(_this) {
	      return function() {
	        return _this.nodes.renderAllConnections();
	      };
	    })(this));
	  };
	
	  return Core;
	
	})();
	
	module.exports = Core;


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	var Backbone, GroupDefinition, GroupDefinitions, Indexer, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Indexer = __webpack_require__(43);
	
	GroupDefinition = __webpack_require__(44);
	
	GroupDefinitions = (function(superClass) {
	  extend(GroupDefinitions, superClass);
	
	  function GroupDefinitions() {
	    this.removeAll = bind(this.removeAll, this);
	    this.groupSelectedNodes = bind(this.groupSelectedNodes, this);
	    this.create = bind(this.create, this);
	    this.render = bind(this.render, this);
	    this.getByGid = bind(this.getByGid, this);
	    this.removeAll = bind(this.removeAll, this);
	    this.initialize = bind(this.initialize, this);
	    return GroupDefinitions.__super__.constructor.apply(this, arguments);
	  }
	
	  GroupDefinitions.prototype.model = GroupDefinition;
	
	  GroupDefinitions.prototype.initialize = function() {
	    this.indexer = new Indexer();
	    return this.bind("group:removed", (function(_this) {
	      return function(c) {
	        return _this.remove(c);
	      };
	    })(this));
	  };
	
	  GroupDefinitions.prototype.removeAll = function() {
	    var models;
	    models = this.models.concat();
	    _.invoke(models, "remove");
	    this.reset([]);
	    return this.indexer.reset();
	  };
	
	  GroupDefinitions.prototype.getByGid = function(gid) {
	    return this.find(function(def) {
	      return def.get("gid") === gid;
	    });
	  };
	
	  GroupDefinitions.prototype.render = function() {
	    return this.each(function(c) {
	      return c.render();
	    });
	  };
	
	  GroupDefinitions.prototype.create = function(model, options) {
	    if (!options) {
	      options = {};
	    }
	    options.indexer = this.indexer;
	    model = this._prepareModel(model, options);
	    if (!model) {
	      return false;
	    }
	    this.add(model, options);
	    return model;
	  };
	
	  GroupDefinitions.prototype.groupSelectedNodes = function(selected_nodes) {
	    var already_exists, average_position, connection, connection_description, dx, dy, external_connections, external_objects, field, group_def, i, indx1, indx2, j, k, l, len, len1, len2, len3, model, node, ref, ref1;
	    if (selected_nodes == null) {
	      selected_nodes = false;
	    }
	    if (!selected_nodes) {
	      selected_nodes = this.getSelectedNodes();
	    }
	    average_position = this.getNodesAveragePosition(selected_nodes);
	    dx = average_position.x;
	    dy = average_position.y;
	    group_def = new GroupDefinition({
	      fromSelectedNodes: selected_nodes,
	      indexer: this.indexer
	    });
	    this.add(group_def);
	    external_connections = [];
	    external_objects = [];
	    for (i = 0, len = selected_nodes.length; i < len; i++) {
	      node = selected_nodes[i];
	      ref = node.fields.models;
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        field = ref[j];
	        ref1 = field.connections;
	        for (k = 0, len2 = ref1.length; k < len2; k++) {
	          connection = ref1[k];
	          indx1 = selected_nodes.indexOf(connection.from_field.node);
	          indx2 = selected_nodes.indexOf(connection.to_field.node);
	          if (indx1 === -1 || indx2 === -1) {
	            already_exists = external_connections.indexOf(connection);
	            if (already_exists === -1) {
	              external_connections.push(connection);
	              connection_description = connection.toJSON();
	              connection_description.to_subfield = indx1 === -1;
	              external_objects.push(connection_description);
	            }
	          }
	        }
	      }
	    }
	    for (l = 0, len3 = selected_nodes.length; l < len3; l++) {
	      node = selected_nodes[l];
	      node.remove();
	    }
	    model = {
	      type: "Group",
	      definition: group_def,
	      x: dx,
	      y: dy
	    };
	    this.trigger("definition:created", model, external_objects);
	    return group_def;
	  };
	
	  GroupDefinitions.prototype.getSelectedNodes = function() {
	    var $selected, selected_nodes;
	    selected_nodes = [];
	    $selected = $(".node.ui-selected").not(".node .node");
	    $selected.each(function() {
	      var node;
	      node = $(this).data("object");
	      return selected_nodes.push(node);
	    });
	    return selected_nodes;
	  };
	
	  GroupDefinitions.prototype.getNodesAveragePosition = function(selected_nodes) {
	    var $selected, dx, dy, i, len, max_x, max_y, min_x, min_y, node;
	    min_x = 0;
	    min_y = 0;
	    max_x = 0;
	    max_y = 0;
	    $selected = $(".node.ui-selected");
	    if ($selected.length < 1 && selected_nodes.length === 0) {
	      return false;
	    }
	    for (i = 0, len = selected_nodes.length; i < len; i++) {
	      node = selected_nodes[i];
	      min_x = Math.min(min_x, node.get("x"));
	      max_x = Math.max(max_x, node.get("x"));
	      min_y = Math.min(min_y, node.get("y"));
	      max_y = Math.max(max_y, node.get("y"));
	    }
	    dx = (min_x + max_x) / 2;
	    dy = (min_y + max_y) / 2;
	    return {
	      x: dx,
	      y: dy
	    };
	  };
	
	  GroupDefinitions.prototype.removeAll = function() {
	    return this.remove(this.models);
	  };
	
	  return GroupDefinitions;
	
	})(Backbone.Collection);
	
	module.exports = GroupDefinitions;


/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Connections, Indexer, Nodes, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Indexer = __webpack_require__(43);
	
	Connections = __webpack_require__(57);
	
	Nodes = (function(superClass) {
	  extend(Nodes, superClass);
	
	  function Nodes() {
	    this.stopSound = bind(this.stopSound, this);
	    this.startSound = bind(this.startSound, this);
	    this.showNodesAnimation = bind(this.showNodesAnimation, this);
	    this.getNodeByNid = bind(this.getNodeByNid, this);
	    this.renderAllConnections = bind(this.renderAllConnections, this);
	    this.removeGroupsByDefinition = bind(this.removeGroupsByDefinition, this);
	    this.createGroup = bind(this.createGroup, this);
	    this.createConnectionFromObject = bind(this.createConnectionFromObject, this);
	    this.render = bind(this.render, this);
	    this.createNode = bind(this.createNode, this);
	    this.find = bind(this.find, this);
	    this.bindTimelineEvents = bind(this.bindTimelineEvents, this);
	    this.destroy = bind(this.destroy, this);
	    this.clearWorkspace = bind(this.clearWorkspace, this);
	    this.initialize = bind(this.initialize, this);
	    return Nodes.__super__.constructor.apply(this, arguments);
	  }
	
	  Nodes.prototype.initialize = function(models, options) {
	    var self;
	    this.settings = options.settings;
	    self = this;
	    this.materials = [];
	    this.indexer = new Indexer();
	    this.connections = new Connections([], {
	      indexer: this.indexer
	    });
	    this.parent = options.parent;
	    this.connections.bind("add", function(connection) {
	      return self.trigger("nodeslist:rebuild", self);
	    });
	    this.bind("remove", (function(_this) {
	      return function(node) {
	        var indx;
	        indx = _this.materials.indexOf(node);
	        if (indx !== -1) {
	          _this.materials.splice(indx, 1);
	        }
	        return self.trigger("nodeslist:rebuild", self);
	      };
	    })(this));
	    this.bind("RebuildAllShaders", (function(_this) {
	      return function() {
	        var i, len, node, ref, results;
	        ref = _this.materials;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          node = ref[i];
	          results.push(node.rebuildShader());
	        }
	        return results;
	      };
	    })(this));
	    this.connections.bind("remove", function(connection) {
	      return self.trigger("nodeslist:rebuild", self);
	    });
	    this.bind("add", function(node) {
	      if (node.is_material && node.is_material === true) {
	        this.materials.push(node);
	      }
	      return self.trigger("nodeslist:rebuild", self);
	    });
	    return this.bind("createConnection", (function(_this) {
	      return function(field1, field2) {
	        return _this.connections.create({
	          from_field: field1,
	          to_field: field2
	        });
	      };
	    })(this));
	  };
	
	  Nodes.prototype.clearWorkspace = function() {
	    this.removeConnections();
	    this.removeAll();
	    $("#webgl-window canvas").remove();
	    this.materials = [];
	    this.indexer.reset();
	    return this;
	  };
	
	  Nodes.prototype.destroy = function() {
	    this.removeConnections();
	    this.removeAll();
	    delete this.materials;
	    delete this.indexer;
	    return delete this.connections;
	  };
	
	  Nodes.prototype.bindTimelineEvents = function(timeline) {
	    if (this.timeline) {
	      this.timeline.off("tfieldsRebuild", this.showNodesAnimation);
	      this.timeline.off("startSound", this.startSound);
	      this.timeline.off("stopSound", this.stopSound);
	    }
	    this.timeline = timeline;
	    this.timeline.on("tfieldsRebuild", this.showNodesAnimation);
	    this.timeline.on("startSound", this.startSound);
	    return this.timeline.on("stopSound", this.stopSound);
	  };
	
	  Nodes.prototype.find = function(node_name) {
	    return this.where({
	      name: node_name
	    });
	  };
	
	  Nodes.prototype.createNode = function(options) {
	    var n;
	    if ($.type(options) === "string") {
	      options = {
	        type: options
	      };
	    }
	    options.timeline = this.timeline;
	    options.settings = this.settings;
	    options.indexer = this.indexer;
	    options.parent = this.parent;
	    if (!ThreeNodes.Core.nodes.models[options.type]) {
	      console.error("Node type doesn't exists: " + options.type);
	      return false;
	    }
	    n = new ThreeNodes.Core.nodes.models[options.type](options);
	    this.add(n);
	    return n;
	  };
	
	  Nodes.prototype.render = function() {
	    var buildNodeArrays, evaluateSubGraph, invalidNodes, nid, terminalNodes;
	    invalidNodes = {};
	    terminalNodes = {};
	    buildNodeArrays = function(nodes) {
	      var i, len, node, results;
	      results = [];
	      for (i = 0, len = nodes.length; i < len; i++) {
	        node = nodes[i];
	        if (node.hasOutConnection() === false || node.auto_evaluate || node.delays_output) {
	          terminalNodes[node.attributes["nid"] + "/" + node.attributes["gid"]] = node;
	        }
	        invalidNodes[node.attributes["nid"] + "/" + node.attributes["gid"]] = node;
	        if (node.nodes) {
	          results.push(buildNodeArrays(node.nodes.models));
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    };
	    buildNodeArrays(this.models);
	    evaluateSubGraph = function(node) {
	      var i, len, upnode, upstreamNodes;
	      upstreamNodes = node.getUpstreamNodes();
	      for (i = 0, len = upstreamNodes.length; i < len; i++) {
	        upnode = upstreamNodes[i];
	        if (invalidNodes[upnode.attributes["nid"] + "/" + upnode.attributes["gid"]] && !upnode.delays_output) {
	          evaluateSubGraph(upnode);
	        }
	      }
	      if (node.dirty || node.auto_evaluate) {
	        node.compute();
	        node.dirty = false;
	        node.fields.setFieldInputUnchanged();
	      }
	      delete invalidNodes[node.attributes["nid"] + "/" + node.attributes["gid"]];
	      return true;
	    };
	    for (nid in terminalNodes) {
	      if (invalidNodes[nid]) {
	        evaluateSubGraph(terminalNodes[nid]);
	      }
	    }
	    return true;
	  };
	
	  Nodes.prototype.createConnectionFromObject = function(connection) {
	    var c, from, from_gid, from_node, tmp, to, to_gid, to_node;
	    from_gid = connection.from_node_gid ? connection.from_node_gid.toString() : "-1";
	    from_node = this.getNodeByNid(connection.from_node.toString(), from_gid);
	    from = from_node.fields.outputs[connection.from.toString()];
	    to_gid = connection.to_node_gid ? connection.to_node_gid.toString() : "-1";
	    to_node = this.getNodeByNid(connection.to_node.toString(), to_gid);
	    to = to_node.fields.inputs[connection.to.toString()];
	    if (!from || !to) {
	      tmp = from_node;
	      from_node = to_node;
	      to_node = tmp;
	      from = from_node.fields.outputs[connection.to.toString()];
	      to = to_node.fields.inputs[connection.from.toString()];
	    }
	    c = this.connections.create({
	      from_field: from,
	      to_field: to,
	      cid: connection.id
	    });
	    return c;
	  };
	
	  Nodes.prototype.createGroup = function(model, external_objects) {
	    var c, connection, from, grp, i, len, target_node, to;
	    if (external_objects == null) {
	      external_objects = [];
	    }
	    grp = this.createNode(model);
	    for (i = 0, len = external_objects.length; i < len; i++) {
	      connection = external_objects[i];
	      from = false;
	      to = false;
	      if (connection.to_subfield) {
	        from = this.getNodeByNid(connection.from_node).fields.getField(connection.from, true);
	        target_node = this.getNodeByNid(connection.to_node);
	        if (target_node) {
	          to = target_node.fields.getField(connection.to, false);
	        }
	      } else {
	        target_node = this.getNodeByNid(connection.from_node);
	        if (target_node) {
	          from = target_node.fields.getField(connection.from, true);
	        }
	        to = this.getNodeByNid(connection.to_node).fields.getField(connection.to);
	      }
	      c = this.connections.create({
	        from_field: from,
	        to_field: to
	      });
	    }
	    return grp;
	  };
	
	  Nodes.prototype.removeGroupsByDefinition = function(def) {
	    var _nodes;
	    _nodes = this.models.concat();
	    return _.each(_nodes, function(node) {
	      if (node.definition && node.definition.gid === def.gid) {
	        return node.remove();
	      }
	    });
	  };
	
	  Nodes.prototype.renderAllConnections = function() {
	    return this.connections.render();
	  };
	
	  Nodes.prototype.removeConnection = function(c) {
	    return this.connections.remove(c);
	  };
	
	  Nodes.prototype.getNodeByNid = function(nid, gid) {
	    var i, len, node, ref, res;
	    if (gid == null) {
	      gid = "-1";
	    }
	    ref = this.models;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      if (node.get("nid").toString() === nid.toString()) {
	        if (gid === "-1" || node.get("gid").toString() === gid.toString()) {
	          return node;
	        }
	      }
	      if (node.nodes) {
	        res = node.nodes.getNodeByNid(nid, gid);
	        if (res) {
	          return res;
	        }
	      }
	    }
	    return false;
	  };
	
	  Nodes.prototype.showNodesAnimation = function() {
	    return this.invoke("showNodeAnimation");
	  };
	
	  Nodes.prototype.startSound = function(time) {
	    return this.each(function(node) {
	      if (node.playSound instanceof Function) {
	        return node.playSound(time);
	      }
	    });
	  };
	
	  Nodes.prototype.stopSound = function() {
	    return this.each(function(node) {
	      if (node.stopSound instanceof Function) {
	        return node.stopSound();
	      }
	    });
	  };
	
	  Nodes.prototype.removeSelectedNodes = function() {
	    var i, len, node, ref, results;
	    ref = $(".node.ui-selected");
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      results.push($(node).data("object").remove());
	    }
	    return results;
	  };
	
	  Nodes.prototype.removeAll = function() {
	    var models;
	    $("#tab-attribute").html("");
	    models = this.models.concat();
	    _.invoke(models, "remove");
	    this.reset([]);
	    return true;
	  };
	
	  Nodes.prototype.removeConnections = function() {
	    return this.connections.removeAll();
	  };
	
	  return Nodes;
	
	})(Backbone.Collection);
	
	module.exports = Nodes;


/***/ },

/***/ 34:
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

/***/ 43:
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

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	var Backbone, GroupDefinition, Utils, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	
	/* GroupDefinition model */
	
	GroupDefinition = (function(superClass) {
	  extend(GroupDefinition, superClass);
	
	  function GroupDefinition() {
	    this.fromSelectedNodes = bind(this.fromSelectedNodes, this);
	    this.initialize = bind(this.initialize, this);
	    this.getUID = bind(this.getUID, this);
	    this.sync = bind(this.sync, this);
	    return GroupDefinition.__super__.constructor.apply(this, arguments);
	  }
	
	  GroupDefinition.prototype.defaults = {
	    nodes: [],
	    connections: [],
	    name: "Group",
	    gid: -1
	  };
	
	  GroupDefinition.prototype.sync = function() {};
	
	  GroupDefinition.prototype.getUID = function() {
	    this.internal_uid += 1;
	    return this.internal_uid;
	  };
	
	  GroupDefinition.prototype.initialize = function(options) {
	    var indexer;
	    GroupDefinition.__super__.initialize.apply(this, arguments);
	    this.internal_uid = 0;
	    indexer = options.indexer;
	    if (this.get("gid") === -1) {
	      this.set("gid", indexer.getUID());
	    }
	    if (options.fromSelectedNodes && options.fromSelectedNodes !== false) {
	      return this.fromSelectedNodes(options.fromSelectedNodes);
	    }
	  };
	
	  GroupDefinition.prototype.fromSelectedNodes = function(selected_nodes) {
	    var already_exists, connection, field, indx1, indx2, internal_connections, j, k, l, len, len1, len2, node, ref, ref1;
	    internal_connections = [];
	    for (j = 0, len = selected_nodes.length; j < len; j++) {
	      node = selected_nodes[j];
	      ref = node.fields.models;
	      for (k = 0, len1 = ref.length; k < len1; k++) {
	        field = ref[k];
	        ref1 = field.connections;
	        for (l = 0, len2 = ref1.length; l < len2; l++) {
	          connection = ref1[l];
	          indx1 = selected_nodes.indexOf(connection.from_field.node);
	          indx2 = selected_nodes.indexOf(connection.to_field.node);
	          if (indx1 !== -1 && indx2 !== -1) {
	            already_exists = internal_connections.indexOf(connection);
	            if (already_exists === -1) {
	              internal_connections.push(connection);
	            }
	          }
	        }
	      }
	    }
	    this.attributes.nodes = jQuery.map(selected_nodes, function(n, i) {
	      return n.toJSON();
	    });
	    return this.attributes.connections = jQuery.map(internal_connections, function(c, i) {
	      return c.toJSON();
	    });
	  };
	
	  GroupDefinition.prototype.toJSON = function() {
	    var res;
	    res = {
	      gid: this.get("gid"),
	      name: this.get("name"),
	      connections: this.get("connections"),
	      nodes: this.get("nodes")
	    };
	    return res;
	  };
	
	  GroupDefinition.prototype.toCode = function() {
	    var res;
	    res = "";
	    return res;
	  };
	
	  return GroupDefinition;
	
	})(Backbone.Model);
	
	module.exports = GroupDefinition;


/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Connection, Connections,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Backbone = __webpack_require__(3);
	
	Connection = __webpack_require__(89);
	
	Connections = (function(superClass) {
	  extend(Connections, superClass);
	
	  function Connections() {
	    this.removeAll = bind(this.removeAll, this);
	    this.create = bind(this.create, this);
	    this.render = bind(this.render, this);
	    this.initialize = bind(this.initialize, this);
	    return Connections.__super__.constructor.apply(this, arguments);
	  }
	
	  Connections.prototype.model = Connection;
	
	  Connections.prototype.initialize = function(models, options) {
	    this.indexer = options.indexer;
	    this.bind("connection:removed", (function(_this) {
	      return function(c) {
	        return _this.remove(c);
	      };
	    })(this));
	    return Connections.__super__.initialize.apply(this, arguments);
	  };
	
	  Connections.prototype.render = function() {
	    return this.each(function(c) {
	      return c.render();
	    });
	  };
	
	  Connections.prototype.create = function(model, options) {
	    if (!options) {
	      options = {};
	    }
	    model.indexer = this.indexer;
	    model = this._prepareModel(model, options);
	    if (!model) {
	      return false;
	    }
	    this.add(model, options);
	    return model;
	  };
	
	  Connections.prototype.removeAll = function() {
	    return this.remove(this.models);
	  };
	
	  return Connections;
	
	})(Backbone.Collection);
	
	module.exports = Connections;


/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Connection, Indexer,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Backbone = __webpack_require__(3);
	
	Indexer = __webpack_require__(43);
	
	
	/* Connection model */
	
	Connection = (function(superClass) {
	  extend(Connection, superClass);
	
	  function Connection() {
	    this.switchFieldsIfNeeded = bind(this.switchFieldsIfNeeded, this);
	    this.validate = bind(this.validate, this);
	    this.render = bind(this.render, this);
	    this.remove = bind(this.remove, this);
	    this.initialize = bind(this.initialize, this);
	    this.sync = bind(this.sync, this);
	    return Connection.__super__.constructor.apply(this, arguments);
	  }
	
	  Connection.STATIC_INDEXER = new Indexer();
	
	  Connection.prototype.defaults = {
	    "cid": -1
	  };
	
	  Connection.prototype.sync = function() {};
	
	  Connection.prototype.initialize = function(options) {
	    var indexer;
	    this.options = options;
	    indexer = options.indexer || Connection.STATIC_INDEXER;
	    if (this.get("cid") === -1) {
	      this.set({
	        "cid": indexer.getUID()
	      });
	    }
	    if (this.isValid()) {
	      this.to_field.removeConnections();
	      this.from_field.addConnection(this);
	      this.to_field.addConnection(this);
	      this.to_field.setValue(this.from_field.get("value"));
	      return this.from_field.node.dirty = true;
	    }
	  };
	
	  Connection.prototype.remove = function() {
	    this.from_field.unregisterConnection(this);
	    this.to_field.unregisterConnection(this);
	    this.to_field.removeConnections();
	    this.to_field.node.dirty = true;
	    this.to_field.changed = true;
	    delete this.from_field;
	    delete this.to_field;
	    this.trigger("connection:removed", this);
	    this.destroy();
	    return false;
	  };
	
	  Connection.prototype.render = function() {
	    return this.trigger("render", this, this);
	  };
	
	  Connection.prototype.validate = function(attrs, options) {
	    this.from_field = attrs.from_field;
	    this.to_field = attrs.to_field;
	    if (!this.from_field || !this.to_field) {
	      return true;
	    }
	    if (this.from_field.get("is_output") === this.to_field.get("is_output")) {
	      return true;
	    }
	    if (this.from_field.node.get('nid') === this.to_field.node.get('nid')) {
	      return true;
	    }
	    this.switchFieldsIfNeeded();
	    return false;
	  };
	
	  Connection.prototype.switchFieldsIfNeeded = function() {
	    var f_out;
	    if (this.from_field.get("is_output") === false) {
	      f_out = this.to_field;
	      this.to_field = this.from_field;
	      this.from_field = f_out;
	    }
	    return this;
	  };
	
	  Connection.prototype.toJSON = function() {
	    var res;
	    res = {
	      id: this.get("cid"),
	      from_node: this.from_field.node.get("nid"),
	      from_node_gid: this.from_field.node.get("gid"),
	      from: this.from_field.get("machine_name"),
	      to_node: this.to_field.node.get("nid"),
	      to_node_gid: this.to_field.node.get("gid"),
	      to: this.to_field.get("machine_name")
	    };
	    return res;
	  };
	
	  return Connection;
	
	})(Backbone.Model);
	
	module.exports = Connection;


/***/ }

/******/ })
});

//# sourceMappingURL=ThreeNodes.Core.js.map