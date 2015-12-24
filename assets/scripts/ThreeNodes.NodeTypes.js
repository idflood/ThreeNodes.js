(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("_"), require("Backbone"), require("libs/jshint"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "_", "Backbone", "libs/jshint"], factory);
	else if(typeof exports === 'object')
		exports["NodeTypes"] = factory(require("jQuery"), require("_"), require("Backbone"), require("libs/jshint"));
	else
		root["ThreeNodes"] = root["ThreeNodes"] || {}, root["ThreeNodes"]["NodeTypes"] = factory(root["jQuery"], root["_"], root["Backbone"], root["libs/jshint"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_72__) {
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

	__webpack_require__(16);
	
	__webpack_require__(17);
	
	__webpack_require__(18);
	
	__webpack_require__(19);
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	
	__webpack_require__(22);


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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, FieldsView, NodeView, _, _view_node_context_menu, _view_node_template, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	_view_node_template = __webpack_require__(73);
	
	_view_node_context_menu = __webpack_require__(74);
	
	FieldsView = __webpack_require__(59);
	
	namespace = __webpack_require__(50).namespace;
	
	__webpack_require__(51);
	
	__webpack_require__(1);
	
	
	/* Node View */
	
	NodeView = (function(superClass) {
	  extend(NodeView, superClass);
	
	  function NodeView() {
	    this.makeDraggable = bind(this.makeDraggable, this);
	    this.remove = bind(this.remove, this);
	    this.computeNodePosition = bind(this.computeNodePosition, this);
	    this.renderConnections = bind(this.renderConnections, this);
	    this.addSelectedClass = bind(this.addSelectedClass, this);
	    this.highlighAnimations = bind(this.highlighAnimations, this);
	    this.render = bind(this.render, this);
	    this.makeElement = bind(this.makeElement, this);
	    this.initContextMenus = bind(this.initContextMenus, this);
	    return NodeView.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeView.prototype.className = "node";
	
	  NodeView.prototype.initialize = function(options) {
	    this.makeElement();
	    if (!options.isSubNode) {
	      this.makeDraggable();
	    }
	    this.initNodeClick();
	    this.initTitleClick();
	    this.fields_view = new FieldsView({
	      node: this.model,
	      collection: this.model.fields,
	      el: $("> .options", this.$el)
	    });
	    this.model.on('change', this.render);
	    this.model.on('remove', (function(_this) {
	      return function() {
	        return _this.remove();
	      };
	    })(this));
	    this.model.on("node:computePosition", this.computeNodePosition);
	    this.model.on("node:renderConnections", this.renderConnections);
	    this.model.on("node:addSelectedClass", this.addSelectedClass);
	    this.render();
	    this.initContextMenus();
	    return this.highlighAnimations();
	  };
	
	  NodeView.prototype.initContextMenus = function() {
	    var node_menu;
	    if ($("#node-context-menu").length < 1) {
	      node_menu = _.template(_view_node_context_menu, {});
	      $("body").append(node_menu);
	    }
	    this.$el.find(".head").contextMenu({
	      menu: "node-context-menu"
	    }, (function(_this) {
	      return function(action, el, pos) {
	        if (action === "remove_node") {
	          return _this.model.remove();
	        }
	      };
	    })(this));
	    return this;
	  };
	
	  NodeView.prototype.makeElement = function() {
	    this.template = _.template(_view_node_template, this.model);
	    this.$el.html(this.template);
	    this.$el.addClass("type-" + this.model.constructor.group_name);
	    return this.$el.addClass("node-" + this.model.typename());
	  };
	
	  NodeView.prototype.render = function() {
	    this.$el.css({
	      left: parseInt(this.model.get("x")),
	      top: parseInt(this.model.get("y"))
	    });
	    this.$el.find("> .head span").text(this.model.get("name"));
	    return this.$el.find("> .head span").show();
	  };
	
	  NodeView.prototype.highlighAnimations = function() {
	    var $target, i, len, nodeAnimation, propTrack, ref;
	    nodeAnimation = false;
	    ref = this.model.anim.objectTrack.propertyTracks;
	    for (i = 0, len = ref.length; i < len; i++) {
	      propTrack = ref[i];
	      $target = $('.inputs .field-' + propTrack.name, this.$el);
	      if (propTrack.anims.length > 0) {
	        $target.addClass("has-animation");
	        nodeAnimation = true;
	      } else {
	        $target.removeClass("has-animation");
	      }
	    }
	    this.$el.toggleClass("node-has-animation", nodeAnimation);
	    return true;
	  };
	
	  NodeView.prototype.addSelectedClass = function() {
	    return this.$el.addClass("ui-selected");
	  };
	
	  NodeView.prototype.renderConnections = function() {
	    this.model.fields.renderConnections();
	    if (this.model.nodes) {
	      return _.each(this.model.nodes.models, function(n) {
	        return n.fields.renderConnections();
	      });
	    }
	  };
	
	  NodeView.prototype.computeNodePosition = function() {
	    var offset, pos;
	    pos = $(this.el).position();
	    offset = $("#container-wrapper").offset();
	    return this.model.set({
	      x: pos.left + $("#container-wrapper").scrollLeft(),
	      y: pos.top + $("#container-wrapper").scrollTop()
	    });
	  };
	
	  NodeView.prototype.remove = function() {
	    $(".field", this.el).destroyContextMenu();
	    if (this.$el.data("draggable")) {
	      this.$el.draggable("destroy");
	    }
	    $(this.el).unbind();
	    this.undelegateEvents();
	    if (this.fields_view) {
	      this.fields_view.remove();
	    }
	    delete this.fields_view;
	    return NodeView.__super__.remove.apply(this, arguments);
	  };
	
	  NodeView.prototype.initNodeClick = function() {
	    var self;
	    self = this;
	    $(this.el).click(function(e) {
	      var selectable;
	      if (e.metaKey === false) {
	        $(".node").removeClass("ui-selected");
	        $(this).addClass("ui-selecting");
	      } else {
	        if ($(this).hasClass("ui-selected")) {
	          $(this).removeClass("ui-selected");
	        } else {
	          $(this).addClass("ui-selecting");
	        }
	      }
	      selectable = $("#container").data("ui-selectable");
	      if (!selectable) {
	        return;
	      }
	      selectable.refresh();
	      selectable._mouseStop(null);
	      return self.model.fields.renderSidebar();
	    });
	    return this;
	  };
	
	  NodeView.prototype.initTitleClick = function() {
	    var $input, $title_span, self;
	    self = this;
	    $title_span = this.$el.find("> .head span");
	    $input = $("<input type='text' />");
	    this.$el.find("> .head").append($input);
	    $input.hide();
	    $input.on('mousedown', function(e) {
	      return e.stopPropagation();
	    });
	    $title_span.dblclick(function(e) {
	      var apply_input_result, prev;
	      prev = $(this).html();
	      $input.val(prev);
	      $title_span.hide();
	      $input.show();
	      apply_input_result = function() {
	        self.model.set('name', $input.val());
	        $input.hide();
	        return $title_span.show();
	      };
	      $input.blur(function(e) {
	        return apply_input_result();
	      });
	      $("#graph").click(function(e) {
	        return apply_input_result();
	      });
	      return $input.keydown(function(e) {
	        if (e.keyCode === 13) {
	          return apply_input_result();
	        }
	      });
	    });
	    return this;
	  };
	
	  NodeView.prototype.makeDraggable = function() {
	    var nodes_offset, selected_nodes, self;
	    self = this;
	    nodes_offset = {
	      top: 0,
	      left: 0
	    };
	    selected_nodes = $([]);
	    $(this.el).draggable({
	      start: function(ev, ui) {
	        if ($(this).hasClass("ui-selected")) {
	          selected_nodes = $(".ui-selected").each(function() {
	            return $(this).data("offset", $(this).offset());
	          });
	        } else {
	          selected_nodes = $([]);
	          $(".node").removeClass("ui-selected");
	        }
	        return nodes_offset = $(this).offset();
	      },
	      drag: function(ev, ui) {
	        var dl, dt;
	        dt = ui.position.top - nodes_offset.top;
	        dl = ui.position.left - nodes_offset.left;
	        selected_nodes.not(this).each(function() {
	          var dx, dy, el, offset;
	          el = $(this);
	          offset = el.data("offset");
	          dx = offset.top + dt;
	          dy = offset.left + dl;
	          el.css({
	            top: dx,
	            left: dy
	          });
	          el.data("object").trigger("node:computePosition");
	          return el.data("object").trigger("node:renderConnections");
	        });
	        return self.renderConnections();
	      },
	      stop: function() {
	        selected_nodes.not(this).each(function() {
	          var el;
	          el = $(this).data("object");
	          return el.trigger("node:renderConnections");
	        });
	        self.computeNodePosition();
	        return self.renderConnections();
	      }
	    });
	    return this;
	  };
	
	  return NodeView;
	
	})(Backbone.View);
	
	ThreeNodes.Core.addNodeView('NodeView', NodeView);
	
	module.exports = NodeView;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Color, NodeView, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	__webpack_require__(35);
	
	NodeView = __webpack_require__(12);
	
	__webpack_require__(71);
	
	Color = (function(superClass) {
	  extend(Color, superClass);
	
	  function Color() {
	    this.remove = bind(this.remove, this);
	    this.init_preview = bind(this.init_preview, this);
	    this.initialize = bind(this.initialize, this);
	    return Color.__super__.constructor.apply(this, arguments);
	  }
	
	  Color.prototype.initialize = function(options) {
	    Color.__super__.initialize.apply(this, arguments);
	    this.model.compute();
	    return this.init_preview();
	  };
	
	  Color.prototype.init_preview = function() {
	    var col, fields;
	    fields = this.model.fields;
	    this.$picker_el = $("<div class='color_preview'></div>");
	    col = fields.getField("rgb", true).getValue(0);
	    this.$picker_el.ColorPicker({
	      color: {
	        r: Math.ceil(col.r * 255),
	        g: Math.ceil(col.g * 255),
	        b: Math.ceil(col.b * 255)
	      },
	      livePreview: false,
	      onChange: (function(_this) {
	        return function(hsb, hex, rgb) {
	          fields.getField("r").setValue(rgb.r / 255);
	          fields.getField("g").setValue(rgb.g / 255);
	          return fields.getField("b").setValue(rgb.b / 255);
	        };
	      })(this)
	    });
	    $(".center", this.$el).append(this.$picker_el);
	    return fields.getField("rgb", true).on_value_update_hooks.set_bg_color_preview = (function(_this) {
	      return function(v) {
	        return _this.$picker_el.css({
	          background: v[0].getStyle()
	        });
	      };
	    })(this);
	  };
	
	  Color.prototype.remove = function() {
	    this.$picker_el.each(function() {
	      var cal, picker;
	      if ($(this).data('colorpickerId')) {
	        cal = $('#' + $(this).data('colorpickerId'));
	        picker = cal.data('colorpicker');
	        if (picker) {
	          delete picker.onChange;
	        }
	        return cal.remove();
	      }
	    });
	    this.$picker_el.unbind();
	    this.$picker_el.remove();
	    delete this.$picker_el;
	    return Color.__super__.remove.apply(this, arguments);
	  };
	
	  return Color;
	
	})(NodeView);
	
	module.exports = Color;


/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Boolean, Color, Euler, Node, NodeColorView, NodeNumberSimple, NodeWithCenterTextfield, Number, Quaternion, String, Vector2, Vector3, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	NodeNumberSimple = __webpack_require__(36);
	
	NodeWithCenterTextfield = __webpack_require__(37);
	
	NodeColorView = __webpack_require__(13);
	
	Number = (function(superClass) {
	  extend(Number, superClass);
	
	  function Number() {
	    return Number.__super__.constructor.apply(this, arguments);
	  }
	
	  return Number;
	
	})(NodeWithCenterTextfield);
	
	ThreeNodes.Core.addNodeView('Number', Number);
	
	String = (function(superClass) {
	  extend(String, superClass);
	
	  function String() {
	    this.getCenterField = bind(this.getCenterField, this);
	    return String.__super__.constructor.apply(this, arguments);
	  }
	
	  String.prototype.getCenterField = function() {
	    return this.model.fields.getField("string");
	  };
	
	  return String;
	
	})(NodeWithCenterTextfield);
	
	ThreeNodes.Core.addNodeView('String', String);
	
	Color = (function(superClass) {
	  extend(Color, superClass);
	
	  function Color() {
	    return Color.__super__.constructor.apply(this, arguments);
	  }
	
	  return Color;
	
	})(NodeColorView);
	
	ThreeNodes.Core.addNodeView('Color', Color);
	
	Number = (function(superClass) {
	  extend(Number, superClass);
	
	  function Number() {
	    return Number.__super__.constructor.apply(this, arguments);
	  }
	
	  Number.node_name = 'Number';
	
	  Number.group_name = 'Base';
	
	  return Number;
	
	})(NodeNumberSimple);
	
	ThreeNodes.Core.addNodeType('Number', Number);
	
	Boolean = (function(superClass) {
	  extend(Boolean, superClass);
	
	  function Boolean() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Boolean.__super__.constructor.apply(this, arguments);
	  }
	
	  Boolean.node_name = 'Boolean';
	
	  Boolean.group_name = 'Base';
	
	  Boolean.prototype.initialize = function(options) {
	    Boolean.__super__.initialize.apply(this, arguments);
	    return this.value = true;
	  };
	
	  Boolean.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Boolean.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "bool": true
	      },
	      outputs: {
	        "out": {
	          type: "Bool",
	          val: this.value
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Boolean.prototype.compute = function() {
	    return this.fields.setField("out", this.fields.getField("bool").getValue());
	  };
	
	  return Boolean;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Boolean', Boolean);
	
	String = (function(superClass) {
	  extend(String, superClass);
	
	  function String() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return String.__super__.constructor.apply(this, arguments);
	  }
	
	  String.node_name = 'String';
	
	  String.group_name = 'Base';
	
	  String.prototype.initialize = function(options) {
	    String.__super__.initialize.apply(this, arguments);
	    return this.value = "";
	  };
	
	  String.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = String.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "string": ""
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: this.value
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  String.prototype.compute = function() {
	    return this.fields.setField("out", this.fields.getField("string").getValue());
	  };
	
	  return String;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('String', String);
	
	Vector2 = (function(superClass) {
	  extend(Vector2, superClass);
	
	  function Vector2() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Vector2.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector2.node_name = 'Vector2';
	
	  Vector2.group_name = 'Base';
	
	  Vector2.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Vector2.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "x": 0,
	        "y": 0
	      },
	      outputs: {
	        "xy": {
	          type: "Vector2",
	          val: false
	        },
	        "x": 0,
	        "y": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Vector2.prototype.compute = function() {
	    var i, j, numItems, ref, res, resx, resy;
	    res = [];
	    resx = [];
	    resy = [];
	    numItems = this.fields.getMaxInputSliceCount();
	    for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      resx[i] = this.fields.getField("x").getValue(i);
	      resy[i] = this.fields.getField("y").getValue(i);
	      res[i] = new THREE.Vector3(resx[i], resy[i]);
	    }
	    this.fields.setField("xy", res);
	    this.fields.setField("x", resx);
	    return this.fields.setField("y", resy);
	  };
	
	  return Vector2;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Vector2', Vector2);
	
	Vector3 = (function(superClass) {
	  extend(Vector3, superClass);
	
	  function Vector3() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Vector3.__super__.constructor.apply(this, arguments);
	  }
	
	  Vector3.node_name = 'Vector3';
	
	  Vector3.group_name = 'Base';
	
	  Vector3.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Vector3.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "x": 0,
	        "y": 0,
	        "z": 0
	      },
	      outputs: {
	        "xyz": {
	          type: "Vector3",
	          val: false
	        },
	        "x": 0,
	        "y": 0,
	        "z": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Vector3.prototype.compute = function() {
	    var i, j, numItems, ref, res, resx, resy, resz;
	    res = [];
	    resx = [];
	    resy = [];
	    resz = [];
	    numItems = this.fields.getMaxInputSliceCount();
	    for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      resx[i] = this.fields.getField("x").getValue(i);
	      resy[i] = this.fields.getField("y").getValue(i);
	      resz[i] = this.fields.getField("z").getValue(i);
	      res[i] = new THREE.Vector3(resx[i], resy[i], resz[i]);
	    }
	    this.fields.setField("xyz", res);
	    this.fields.setField("x", resx);
	    this.fields.setField("y", resy);
	    return this.fields.setField("z", resz);
	  };
	
	  return Vector3;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Vector3', Vector3);
	
	Quaternion = (function(superClass) {
	  extend(Quaternion, superClass);
	
	  function Quaternion() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Quaternion.__super__.constructor.apply(this, arguments);
	  }
	
	  Quaternion.node_name = 'Quaternion';
	
	  Quaternion.group_name = 'Base';
	
	  Quaternion.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Quaternion.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "x": 0,
	        "y": 0,
	        "z": 0,
	        "w": 1
	      },
	      outputs: {
	        "xyzw": {
	          type: "Quaternion",
	          val: false
	        },
	        "x": 0,
	        "y": 0,
	        "z": 0,
	        "w": 1
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Quaternion.prototype.compute = function() {
	    var i, j, numItems, ref, res, resw, resx, resy, resz;
	    res = [];
	    resx = [];
	    resy = [];
	    resz = [];
	    resw = [];
	    numItems = this.fields.getMaxInputSliceCount();
	    for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      resx[i] = this.fields.getField("x").getValue(i);
	      resy[i] = this.fields.getField("y").getValue(i);
	      resz[i] = this.fields.getField("z").getValue(i);
	      resw[i] = this.fields.getField("w").getValue(i);
	      res[i] = new THREE.Quaternion(resx[i], resy[i], resz[i], resw[i]);
	    }
	    this.fields.setField("xyzw", res);
	    this.fields.setField("x", resx);
	    this.fields.setField("y", resy);
	    this.fields.setField("z", resz);
	    return this.fields.setField("w", resw);
	  };
	
	  return Quaternion;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Quaternion', Quaternion);
	
	Euler = (function(superClass) {
	  extend(Euler, superClass);
	
	  function Euler() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Euler.__super__.constructor.apply(this, arguments);
	  }
	
	  Euler.node_name = 'Euler';
	
	  Euler.group_name = 'Base';
	
	  Euler.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Euler.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "x": 0,
	        "y": 0,
	        "z": 0,
	        "order": {
	          type: "String",
	          val: "XYZ",
	          values: {
	            "XYZ": "XYZ",
	            "YZX": "YZX",
	            "ZXY": "ZXY",
	            "XZY": "XZY",
	            "YXZ": "YXZ",
	            "ZYX": "ZYX"
	          }
	        }
	      },
	      outputs: {
	        "euler": {
	          type: "Euler",
	          val: false
	        },
	        "x": 0,
	        "y": 0,
	        "z": 0,
	        "order": "XYZ"
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Euler.prototype.compute = function() {
	    var i, j, numItems, ref, res, resorder, resx, resy, resz;
	    res = [];
	    resx = [];
	    resy = [];
	    resz = [];
	    resorder = [];
	    numItems = this.fields.getMaxInputSliceCount();
	    for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      resx[i] = this.fields.getField("x").getValue(i);
	      resy[i] = this.fields.getField("y").getValue(i);
	      resz[i] = this.fields.getField("z").getValue(i);
	      resorder[i] = this.fields.getField("order").getValue(i);
	      res[i] = new THREE.Euler(resx[i], resy[i], resz[i], resorder[i]);
	    }
	    this.fields.setField("euler", res);
	    this.fields.setField("x", resx);
	    this.fields.setField("y", resy);
	    this.fields.setField("z", resz);
	    return this.fields.setField("order", resorder);
	  };
	
	  return Euler;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Euler', Euler);
	
	Color = (function(superClass) {
	  extend(Color, superClass);
	
	  function Color() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Color.__super__.constructor.apply(this, arguments);
	  }
	
	  Color.node_name = 'Color';
	
	  Color.group_name = 'Base';
	
	  Color.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Color.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "r": 0,
	        "g": 0,
	        "b": 0
	      },
	      outputs: {
	        "rgb": {
	          type: "Color",
	          val: false
	        },
	        "r": 0,
	        "g": 0,
	        "b": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Color.prototype.compute = function() {
	    var i, j, numItems, ref, res, resb, resg, resr;
	    res = [];
	    resr = [];
	    resg = [];
	    resb = [];
	    numItems = this.fields.getMaxInputSliceCount();
	    for (i = j = 0, ref = numItems; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      resr[i] = this.fields.getField("r").getValue(i);
	      resg[i] = this.fields.getField("g").getValue(i);
	      resb[i] = this.fields.getField("b").getValue(i);
	      res[i] = new THREE.Color().setRGB(resr[i], resg[i], resb[i]);
	    }
	    this.fields.setField("rgb", res);
	    this.fields.setField("r", resr);
	    this.fields.setField("g", resg);
	    return this.fields.setField("b", resb);
	  };
	
	  return Color;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Color', Color);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var And, Backbone, Equal, Greater, IfElse, Node, Or, Smaller, _, jQuery,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	jQuery = __webpack_require__(1);
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	IfElse = (function(superClass) {
	  extend(IfElse, superClass);
	
	  function IfElse() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return IfElse.__super__.constructor.apply(this, arguments);
	  }
	
	  IfElse.node_name = 'IfElse';
	
	  IfElse.group_name = 'Conditional';
	
	  IfElse.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = IfElse.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "condition": false,
	        "val1": {
	          type: "Any",
	          val: 0.0
	        },
	        "val2": {
	          type: "Any",
	          val: 1.0
	        }
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: false
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  IfElse.prototype.compute = function() {
	    var cond, res;
	    cond = this.fields.getField("condition").getValue();
	    if (cond === false) {
	      res = this.fields.getField("val1").attributes.value;
	    } else {
	      res = this.fields.getField("val2").attributes.value;
	    }
	    return this.fields.setField("out", res);
	  };
	
	  return IfElse;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('IfElse', IfElse);
	
	And = (function(superClass) {
	  extend(And, superClass);
	
	  function And() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return And.__super__.constructor.apply(this, arguments);
	  }
	
	  And.node_name = 'And';
	
	  And.group_name = 'Conditional';
	
	  And.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = And.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "val1": false,
	        "val2": false
	      },
	      outputs: {
	        "out": false
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  And.prototype.compute = function() {
	    var res;
	    res = this.fields.getField("val1").getValue() !== false && this.fields.getField("val2").getValue() !== false;
	    return this.fields.setField("out", res);
	  };
	
	  return And;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('And', And);
	
	Or = (function(superClass) {
	  extend(Or, superClass);
	
	  function Or() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Or.__super__.constructor.apply(this, arguments);
	  }
	
	  Or.node_name = 'Or';
	
	  Or.group_name = 'Conditional';
	
	  Or.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Or.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "val1": false,
	        "val2": false
	      },
	      outputs: {
	        "out": false
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Or.prototype.compute = function() {
	    var res;
	    res = this.fields.getField("val1").getValue() !== false || this.fields.getField("val2").getValue() !== false;
	    return this.fields.setField("out", res);
	  };
	
	  return Or;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Or', Or);
	
	Equal = (function(superClass) {
	  extend(Equal, superClass);
	
	  function Equal() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Equal.__super__.constructor.apply(this, arguments);
	  }
	
	  Equal.node_name = 'Equal';
	
	  Equal.group_name = 'Conditional';
	
	  Equal.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Equal.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "val1": {
	          type: "Any",
	          val: 0.0
	        },
	        "val2": {
	          type: "Any",
	          val: 1.0
	        }
	      },
	      outputs: {
	        "out": false
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Equal.prototype.compute = function() {
	    var res;
	    res = this.fields.getField("val1").getValue(0) === this.fields.getField("val2").getValue(0);
	    return this.fields.setField("out", res);
	  };
	
	  return Equal;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Equal', Equal);
	
	Smaller = (function(superClass) {
	  extend(Smaller, superClass);
	
	  function Smaller() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Smaller.__super__.constructor.apply(this, arguments);
	  }
	
	  Smaller.node_name = 'Smaller';
	
	  Smaller.group_name = 'Conditional';
	
	  Smaller.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Smaller.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "val1": {
	          type: "Float",
	          val: 0.0
	        },
	        "val2": {
	          type: "Float",
	          val: 1.0
	        }
	      },
	      outputs: {
	        "out": false
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Smaller.prototype.compute = function() {
	    var res;
	    res = this.fields.getField("val1").getValue(0) < this.fields.getField("val2").getValue(0);
	    return this.fields.setField("out", res);
	  };
	
	  return Smaller;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Smaller', Smaller);
	
	Greater = (function(superClass) {
	  extend(Greater, superClass);
	
	  function Greater() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Greater.__super__.constructor.apply(this, arguments);
	  }
	
	  Greater.node_name = 'Greater';
	
	  Greater.group_name = 'Conditional';
	
	  Greater.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Greater.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "val1": {
	          type: "Float",
	          val: 0.0
	        },
	        "val2": {
	          type: "Float",
	          val: 1.0
	        }
	      },
	      outputs: {
	        "out": false
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Greater.prototype.compute = function() {
	    var res;
	    res = this.fields.getField("val1").getValue(0) > this.fields.getField("val2").getValue(0);
	    return this.fields.setField("out", res);
	  };
	
	  return Greater;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Greater', Greater);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Code, CodeView, Expression, ExpressionView, Node, NodeCodeView, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	NodeCodeView = __webpack_require__(38);
	
	CodeView = (function(superClass) {
	  extend(CodeView, superClass);
	
	  function CodeView() {
	    return CodeView.__super__.constructor.apply(this, arguments);
	  }
	
	  return CodeView;
	
	})(NodeCodeView);
	
	ThreeNodes.Core.addNodeView('Code', CodeView);
	
	ExpressionView = (function(superClass) {
	  extend(ExpressionView, superClass);
	
	  function ExpressionView() {
	    return ExpressionView.__super__.constructor.apply(this, arguments);
	  }
	
	  return ExpressionView;
	
	})(NodeCodeView);
	
	ThreeNodes.Core.addNodeView('Expression', ExpressionView);
	
	Expression = (function(superClass) {
	  extend(Expression, superClass);
	
	  function Expression() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.toJSON = bind(this.toJSON, this);
	    this.addCustomField = bind(this.addCustomField, this);
	    this.onCodeUpdate = bind(this.onCodeUpdate, this);
	    this.loadCustomFields = bind(this.loadCustomFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Expression.__super__.constructor.apply(this, arguments);
	  }
	
	  Expression.node_name = 'Expression';
	
	  Expression.group_name = 'Code';
	
	  Expression.prototype.initialize = function(options) {
	    var field;
	    this.custom_fields = {
	      inputs: {},
	      outputs: {}
	    };
	    this.loadCustomFields(options);
	    Expression.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.out = null;
	    field = this.fields.getField("code");
	    field.on("value_updated", this.onCodeUpdate);
	    return this.onCodeUpdate(field.getValue());
	  };
	
	  Expression.prototype.loadCustomFields = function(options) {
	    if (!options.custom_fields) {
	      return;
	    }
	    return this.custom_fields = $.extend(true, this.custom_fields, options.custom_fields);
	  };
	
	  Expression.prototype.onCodeUpdate = function(code) {
	    var error;
	    if (code == null) {
	      code = "";
	    }
	    try {
	      return this["function"] = new Function(code);
	    } catch (_error) {
	      error = _error;
	      console.warn(error);
	      return this["function"] = false;
	    }
	  };
	
	  Expression.prototype.addCustomField = function(key, type, direction) {
	    var field, instance, value;
	    if (direction == null) {
	      direction = 'inputs';
	    }
	    field = {
	      key: key,
	      type: type
	    };
	    this.custom_fields[direction][key] = field;
	    value = false;
	    instance = this.fields.addField(key, {
	      value: value,
	      type: type,
	      "default": false
	    }, direction);
	    return instance;
	  };
	
	  Expression.prototype.toJSON = function() {
	    var res;
	    res = Expression.__super__.toJSON.apply(this, arguments);
	    res.custom_fields = this.custom_fields;
	    return res;
	  };
	
	  Expression.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Expression.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "code": ""
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: null
	        }
	      }
	    };
	    fields = $.extend(true, fields, this.custom_fields);
	    return $.extend(true, base_fields, fields);
	  };
	
	  Expression.prototype.compute = function() {
	    var code, error, result;
	    code = this.fields.getField("code").getValue();
	    result = this.out;
	    if (this["function"] !== false) {
	      try {
	        result = this["function"]();
	      } catch (_error) {
	        error = _error;
	      }
	    }
	    this.out = result;
	    return this.fields.setField("out", this.out);
	  };
	
	  return Expression;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Expression', Expression);
	
	Code = (function(superClass) {
	  extend(Code, superClass);
	
	  function Code() {
	    this.getFields = bind(this.getFields, this);
	    this.getDynamicFields = bind(this.getDynamicFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Code.__super__.constructor.apply(this, arguments);
	  }
	
	  Code.node_name = 'Code';
	
	  Code.group_name = 'Code';
	
	  Code.prototype.initialize = function(options) {
	    return Code.__super__.initialize.apply(this, arguments);
	  };
	
	  Code.prototype.getDynamicFields = function() {
	    return {};
	  };
	
	  Code.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Code.__super__.getFields.apply(this, arguments);
	    fields = this.getDynamicFields();
	    return $.extend(true, base_fields, fields);
	  };
	
	  return Code;
	
	})(Expression);
	
	ThreeNodes.Core.addNodeType('Code', Code);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, MathAdd, MathAttenuation, MathCeil, MathCos, MathDivide, MathFloor, MathMax, MathMin, MathMod, MathMult, MathRound, MathSin, MathSubtract, MathTan, Node, NodeNumberParam1, NodeNumberSimple, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	NodeNumberSimple = __webpack_require__(36);
	
	MathSin = (function(superClass) {
	  extend(MathSin, superClass);
	
	  function MathSin() {
	    this.process_val = bind(this.process_val, this);
	    return MathSin.__super__.constructor.apply(this, arguments);
	  }
	
	  MathSin.node_name = 'Sin';
	
	  MathSin.group_name = 'Math';
	
	  MathSin.prototype.process_val = function(num, i) {
	    return Math.sin(num);
	  };
	
	  return MathSin;
	
	})(NodeNumberSimple);
	
	ThreeNodes.Core.addNodeType('MathSin', MathSin);
	
	MathCos = (function(superClass) {
	  extend(MathCos, superClass);
	
	  function MathCos() {
	    this.process_val = bind(this.process_val, this);
	    return MathCos.__super__.constructor.apply(this, arguments);
	  }
	
	  MathCos.node_name = 'Cos';
	
	  MathCos.group_name = 'Math';
	
	  MathCos.prototype.process_val = function(num, i) {
	    return Math.cos(num);
	  };
	
	  return MathCos;
	
	})(NodeNumberSimple);
	
	ThreeNodes.Core.addNodeType('MathCos', MathCos);
	
	MathTan = (function(superClass) {
	  extend(MathTan, superClass);
	
	  function MathTan() {
	    this.process_val = bind(this.process_val, this);
	    return MathTan.__super__.constructor.apply(this, arguments);
	  }
	
	  MathTan.node_name = 'Tan';
	
	  MathTan.group_name = 'Math';
	
	  MathTan.prototype.process_val = function(num, i) {
	    return Math.tan(num);
	  };
	
	  return MathTan;
	
	})(NodeNumberSimple);
	
	ThreeNodes.Core.addNodeType('MathTan', MathTan);
	
	MathRound = (function(superClass) {
	  extend(MathRound, superClass);
	
	  function MathRound() {
	    this.process_val = bind(this.process_val, this);
	    return MathRound.__super__.constructor.apply(this, arguments);
	  }
	
	  MathRound.node_name = 'Round';
	
	  MathRound.group_name = 'Math';
	
	  MathRound.prototype.process_val = function(num, i) {
	    return Math.round(num);
	  };
	
	  return MathRound;
	
	})(NodeNumberSimple);
	
	ThreeNodes.Core.addNodeType('MathRound', MathRound);
	
	MathCeil = (function(superClass) {
	  extend(MathCeil, superClass);
	
	  function MathCeil() {
	    this.process_val = bind(this.process_val, this);
	    return MathCeil.__super__.constructor.apply(this, arguments);
	  }
	
	  MathCeil.node_name = 'Ceil';
	
	  MathCeil.group_name = 'Math';
	
	  MathCeil.prototype.process_val = function(num, i) {
	    return Math.ceil(num);
	  };
	
	  return MathCeil;
	
	})(NodeNumberSimple);
	
	ThreeNodes.Core.addNodeType('MathCeil', MathCeil);
	
	MathFloor = (function(superClass) {
	  extend(MathFloor, superClass);
	
	  function MathFloor() {
	    this.process_val = bind(this.process_val, this);
	    return MathFloor.__super__.constructor.apply(this, arguments);
	  }
	
	  MathFloor.node_name = 'Floor';
	
	  MathFloor.group_name = 'Math';
	
	  MathFloor.prototype.process_val = function(num, i) {
	    return Math.floor(num);
	  };
	
	  return MathFloor;
	
	})(NodeNumberSimple);
	
	ThreeNodes.Core.addNodeType('MathFloor', MathFloor);
	
	NodeNumberParam1 = (function(superClass) {
	  extend(NodeNumberParam1, superClass);
	
	  function NodeNumberParam1() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.apply_num_to_vec3 = bind(this.apply_num_to_vec3, this);
	    this.apply_num_to_vec2 = bind(this.apply_num_to_vec2, this);
	    this.process_val = bind(this.process_val, this);
	    return NodeNumberParam1.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeNumberParam1.prototype.process_val = function(num, numb, i) {
	    return num + numb;
	  };
	
	  NodeNumberParam1.prototype.apply_num_to_vec2 = function(a, b, i) {
	    switch ($.type(a)) {
	      case "number":
	        return new THREE.Vector2(this.process_val(a, b.x, i), this.process_val(a, b.y, i));
	      case "object":
	        return new THREE.Vector2(this.process_val(a.x, b, i), this.process_val(a.y, b, i));
	    }
	  };
	
	  NodeNumberParam1.prototype.apply_num_to_vec3 = function(a, b, i) {
	    switch ($.type(a)) {
	      case "number":
	        return new THREE.Vector3(this.process_val(a, b.x, i), this.process_val(a, b.y, i), this.process_val(a, b.z, i));
	      case "object":
	        return new THREE.Vector3(this.process_val(a.x, b, i), this.process_val(a.y, b, i), this.process_val(a.z, b, i));
	    }
	  };
	
	  NodeNumberParam1.prototype.remove = function() {
	    delete this.v_factor;
	    return NodeNumberParam1.__super__.remove.apply(this, arguments);
	  };
	
	  NodeNumberParam1.prototype.compute = function() {
	    var i, j, numItems, ref, ref1, refb, res;
	    res = [];
	    numItems = this.fields.getMaxInputSliceCount();
	    for (i = j = 0, ref1 = numItems; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
	      ref = this.v_in.getValue(i);
	      refb = this.v_factor.getValue(i);
	      switch ($.type(ref)) {
	        case "number":
	          switch ($.type(refb)) {
	            case "number":
	              res[i] = this.process_val(ref, refb, i);
	              break;
	            case "object":
	              switch (refb.constructor) {
	                case THREE.Vector2:
	                  res[i] = this.apply_num_to_vec2(ref, refb, i);
	                  break;
	                case THREE.Vector3:
	                  res[i] = this.apply_num_to_vec3(ref, refb, i);
	              }
	          }
	          break;
	        case "object":
	          switch (ref.constructor) {
	            case THREE.Vector2:
	              switch ($.type(refb)) {
	                case "number":
	                  res[i] = this.apply_num_to_vec2(ref, refb, i);
	                  break;
	                case "object":
	                  res[i] = new THREE.Vector2(this.process_val(ref.x, refb.x, i), this.process_val(ref.y, refb.y, i));
	              }
	              break;
	            case THREE.Vector3:
	              switch ($.type(refb)) {
	                case "number":
	                  res[i] = this.apply_num_to_vec3(ref, refb, i);
	                  break;
	                case "object":
	                  res[i] = new THREE.Vector3(this.process_val(ref.x, refb.x, i), this.process_val(ref.y, refb.y, i), this.process_val(ref.z, refb.z, i));
	              }
	          }
	      }
	    }
	    this.v_out.setValue(res);
	    return true;
	  };
	
	  return NodeNumberParam1;
	
	})(NodeNumberSimple);
	
	MathMod = (function(superClass) {
	  extend(MathMod, superClass);
	
	  function MathMod() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return MathMod.__super__.constructor.apply(this, arguments);
	  }
	
	  MathMod.node_name = 'Mod';
	
	  MathMod.group_name = 'Math';
	
	  MathMod.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathMod.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "y": {
	          type: "Float",
	          val: 2
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathMod.prototype.onFieldsCreated = function() {
	    MathMod.__super__.onFieldsCreated.apply(this, arguments);
	    return this.v_factor = this.fields.getField("y");
	  };
	
	  MathMod.prototype.process_val = function(num, numb, i) {
	    return num % numb;
	  };
	
	  return MathMod;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathMod', MathMod);
	
	MathAdd = (function(superClass) {
	  extend(MathAdd, superClass);
	
	  function MathAdd() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return MathAdd.__super__.constructor.apply(this, arguments);
	  }
	
	  MathAdd.node_name = 'Add';
	
	  MathAdd.group_name = 'Math';
	
	  MathAdd.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathAdd.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "y": {
	          type: "Float",
	          val: 1
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathAdd.prototype.onFieldsCreated = function() {
	    MathAdd.__super__.onFieldsCreated.apply(this, arguments);
	    return this.v_factor = this.fields.getField("y");
	  };
	
	  MathAdd.prototype.process_val = function(num, numb, i) {
	    return num + numb;
	  };
	
	  return MathAdd;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathAdd', MathAdd);
	
	MathSubtract = (function(superClass) {
	  extend(MathSubtract, superClass);
	
	  function MathSubtract() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return MathSubtract.__super__.constructor.apply(this, arguments);
	  }
	
	  MathSubtract.node_name = 'Subtract';
	
	  MathSubtract.group_name = 'Math';
	
	  MathSubtract.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathSubtract.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "y": {
	          type: "Float",
	          val: 1
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathSubtract.prototype.onFieldsCreated = function() {
	    MathSubtract.__super__.onFieldsCreated.apply(this, arguments);
	    return this.v_factor = this.fields.getField("y");
	  };
	
	  MathSubtract.prototype.process_val = function(num, numb, i) {
	    return num - numb;
	  };
	
	  return MathSubtract;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathSubtract', MathSubtract);
	
	MathMult = (function(superClass) {
	  extend(MathMult, superClass);
	
	  function MathMult() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return MathMult.__super__.constructor.apply(this, arguments);
	  }
	
	  MathMult.node_name = 'Mult';
	
	  MathMult.group_name = 'Math';
	
	  MathMult.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathMult.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "factor": {
	          type: "Float",
	          val: 2
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathMult.prototype.onFieldsCreated = function() {
	    MathMult.__super__.onFieldsCreated.apply(this, arguments);
	    return this.v_factor = this.fields.getField("factor");
	  };
	
	  MathMult.prototype.process_val = function(num, numb, i) {
	    return num * numb;
	  };
	
	  return MathMult;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathMult', MathMult);
	
	MathDivide = (function(superClass) {
	  extend(MathDivide, superClass);
	
	  function MathDivide() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return MathDivide.__super__.constructor.apply(this, arguments);
	  }
	
	  MathDivide.node_name = 'Divide';
	
	  MathDivide.group_name = 'Math';
	
	  MathDivide.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathDivide.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "y": {
	          type: "Float",
	          val: 2
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathDivide.prototype.onFieldsCreated = function() {
	    MathDivide.__super__.onFieldsCreated.apply(this, arguments);
	    return this.v_factor = this.fields.getField("y");
	  };
	
	  MathDivide.prototype.process_val = function(num, numb, i) {
	    return num / numb;
	  };
	
	  return MathDivide;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathDivide', MathDivide);
	
	MathMin = (function(superClass) {
	  extend(MathMin, superClass);
	
	  function MathMin() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return MathMin.__super__.constructor.apply(this, arguments);
	  }
	
	  MathMin.node_name = 'Min';
	
	  MathMin.group_name = 'Math';
	
	  MathMin.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathMin.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "in2": {
	          type: "Float",
	          val: 0
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathMin.prototype.onFieldsCreated = function() {
	    MathMin.__super__.onFieldsCreated.apply(this, arguments);
	    return this.v_factor = this.fields.getField("in2");
	  };
	
	  MathMin.prototype.process_val = function(num, numb, i) {
	    return Math.min(num, numb);
	  };
	
	  return MathMin;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathMin', MathMin);
	
	MathMax = (function(superClass) {
	  extend(MathMax, superClass);
	
	  function MathMax() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return MathMax.__super__.constructor.apply(this, arguments);
	  }
	
	  MathMax.node_name = 'Max';
	
	  MathMax.group_name = 'Math';
	
	  MathMax.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathMax.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "in2": {
	          type: "Float",
	          val: 0
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathMax.prototype.onFieldsCreated = function() {
	    MathMax.__super__.onFieldsCreated.apply(this, arguments);
	    return this.v_factor = this.fields.getField("in2");
	  };
	
	  MathMax.prototype.process_val = function(num, numb, i) {
	    return Math.max(num, numb);
	  };
	
	  return MathMax;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathMax', MathMax);
	
	MathAttenuation = (function(superClass) {
	  extend(MathAttenuation, superClass);
	
	  function MathAttenuation() {
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return MathAttenuation.__super__.constructor.apply(this, arguments);
	  }
	
	  MathAttenuation.node_name = 'Attenuation';
	
	  MathAttenuation.group_name = 'Math';
	
	  MathAttenuation.prototype.initialize = function(options) {
	    MathAttenuation.__super__.initialize.apply(this, arguments);
	    return this.val = 0;
	  };
	
	  MathAttenuation.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = MathAttenuation.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "default": 0,
	        "reset": false,
	        "factor": 0.8
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  MathAttenuation.prototype.onFieldsCreated = function() {
	    MathAttenuation.__super__.onFieldsCreated.apply(this, arguments);
	    this.def_val = this.fields.getField("default");
	    this.reset_val = this.fields.getField("reset");
	    this.v_factor = this.fields.getField("factor");
	    return this.val = this.def_val.getValue();
	  };
	
	  MathAttenuation.prototype.process_val = function(num, numb, i) {
	    if (this.reset_val.getValue(i) === true) {
	      this.val = this.def_val.getValue(i);
	    }
	    this.val = this.val + (this.v_in.getValue(i) - this.val) * this.v_factor.getValue(i);
	    return this.val;
	  };
	
	  return MathAttenuation;
	
	})(NodeNumberParam1);
	
	ThreeNodes.Core.addNodeType('MathAttenuation', MathAttenuation);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Font, Get, LFO, Merge, Mouse, Mp3Input, Node, NodeWithCenterTextfield, Random, Screen, Timer, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Node = __webpack_require__(35);
	
	NodeWithCenterTextfield = __webpack_require__(37);
	
	Random = (function(superClass) {
	  extend(Random, superClass);
	
	  function Random() {
	    this.getCenterField = bind(this.getCenterField, this);
	    return Random.__super__.constructor.apply(this, arguments);
	  }
	
	  Random.prototype.getCenterField = function() {
	    return this.model.fields.getField("out", true);
	  };
	
	  return Random;
	
	})(NodeWithCenterTextfield);
	
	ThreeNodes.Core.addNodeView('Random', Random);
	
	LFO = (function(superClass) {
	  extend(LFO, superClass);
	
	  function LFO() {
	    this.getCenterField = bind(this.getCenterField, this);
	    return LFO.__super__.constructor.apply(this, arguments);
	  }
	
	  LFO.prototype.getCenterField = function() {
	    return this.model.fields.getField("out", true);
	  };
	
	  return LFO;
	
	})(NodeWithCenterTextfield);
	
	ThreeNodes.Core.addNodeView('LFO', LFO);
	
	Timer = (function(superClass) {
	  extend(Timer, superClass);
	
	  function Timer() {
	    this.getCenterField = bind(this.getCenterField, this);
	    return Timer.__super__.constructor.apply(this, arguments);
	  }
	
	  Timer.prototype.getCenterField = function() {
	    return this.model.fields.getField("out", true);
	  };
	
	  return Timer;
	
	})(NodeWithCenterTextfield);
	
	ThreeNodes.Core.addNodeView('Timer', Timer);
	
	Random = (function(superClass) {
	  extend(Random, superClass);
	
	  function Random() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Random.__super__.constructor.apply(this, arguments);
	  }
	
	  Random.node_name = 'Random';
	
	  Random.group_name = 'Utils';
	
	  Random.prototype.initialize = function(options) {
	    Random.__super__.initialize.apply(this, arguments);
	    return this.auto_evaluate = true;
	  };
	
	  Random.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Random.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "min": 0,
	        "max": 1
	      },
	      outputs: {
	        "out": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Random.prototype.compute = function() {
	    var value;
	    value = this.fields.getField("min").getValue() + Math.random() * (this.fields.getField("max").getValue() - this.fields.getField("min").getValue());
	    return this.fields.setField("out", value);
	  };
	
	  return Random;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Random', Random);
	
	LFO = (function(superClass) {
	  extend(LFO, superClass);
	
	  function LFO() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return LFO.__super__.constructor.apply(this, arguments);
	  }
	
	  LFO.node_name = 'LFO';
	
	  LFO.group_name = 'Utils';
	
	  LFO.prototype.initialize = function(options) {
	    LFO.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.rndB = Math.random();
	    this.rndA = this.rndB;
	    this.rndrange = 1;
	    this.flip = 0;
	    this.taskinterval = 1;
	    this.taskintervalhold = 20;
	    this.clock = 0;
	    return this.PI = 3.14159;
	  };
	
	  LFO.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = LFO.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "min": 0,
	        "max": 1,
	        "duration": 1000,
	        "mode": {
	          type: "Float",
	          val: 0,
	          values: {
	            "sawtooth": 0,
	            "sine": 1,
	            "triangle": 2,
	            "square waver": 3,
	            "random": 4,
	            "random triangle": 5
	          }
	        }
	      },
	      outputs: {
	        "out": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  LFO.prototype.compute = function() {
	    var duration, halfway, hi, lfoout, lfout, low, max, min, mode, range, src, srctmp, time;
	    duration = this.fields.getField("duration").getValue();
	    min = this.fields.getField("min").getValue();
	    max = this.fields.getField("max").getValue();
	    mode = this.fields.getField("mode").getValue();
	    this.clock = Date.now();
	    time = (this.taskinterval * this.clock) % duration;
	    src = time / duration;
	    range = max - min;
	    lfoout = 0;
	    lfout = (function() {
	      switch (mode) {
	        case 0:
	          return (src * range) + min;
	        case 1:
	          return (range * Math.sin(src * this.PI)) + min;
	        case 2:
	          halfway = duration / 2;
	          if (time < halfway) {
	            return (2 * src * range) + min;
	          } else {
	            srctmp = (halfway - (time - halfway)) / duration;
	            return (2 * srctmp * range) + min;
	          }
	          break;
	        case 3:
	          low = time < duration / 2;
	          hi = time >= duration / 2;
	          return low * min + hi * max;
	        case 4:
	          if (time >= duration - this.taskinterval) {
	            this.rndA = Math.random();
	          }
	          return (this.rndA * range) + min;
	        case 5:
	          if (time < this.taskinterval) {
	            this.rndA = this.rndB;
	            this.rndB = range * Math.random() + min;
	            this.rndrange = this.rndB - this.rndA;
	          }
	          return src * this.rndrange + this.rndA;
	      }
	    }).call(this);
	    return this.fields.setField("out", lfout);
	  };
	
	  return LFO;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('LFO', LFO);
	
	Merge = (function(superClass) {
	  extend(Merge, superClass);
	
	  function Merge() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Merge.__super__.constructor.apply(this, arguments);
	  }
	
	  Merge.node_name = 'Merge';
	
	  Merge.group_name = 'Utils';
	
	  Merge.prototype.initialize = function(options) {
	    Merge.__super__.initialize.apply(this, arguments);
	    return this.auto_evaluate = false;
	  };
	
	  Merge.prototype.getFields = function() {
	    var fields;
	    fields = {
	      inputs: {
	        "in0": {
	          type: "Any",
	          val: null
	        },
	        "in1": {
	          type: "Any",
	          val: null
	        },
	        "in2": {
	          type: "Any",
	          val: null
	        },
	        "in3": {
	          type: "Any",
	          val: null
	        },
	        "in4": {
	          type: "Any",
	          val: null
	        },
	        "in5": {
	          type: "Any",
	          val: null
	        }
	      },
	      outputs: {
	        "out": {
	          type: "Array",
	          val: []
	        }
	      }
	    };
	    return fields;
	  };
	
	  Merge.prototype.compute = function() {
	    var changed, f, field, result, subval;
	    result = [];
	    changed = false;
	    for (f in this.fields.inputs) {
	      field = this.fields.inputs[f];
	      subval = field.get("value");
	      if (subval !== null && field.connections.length > 0 && field.changed === true) {
	        changed = true;
	        if (jQuery.type(subval) === "array") {
	          result = result.concat(subval);
	        } else {
	          result[result.length] = subval;
	        }
	      }
	    }
	    if (changed) {
	      return this.fields.setField("out", result);
	    }
	  };
	
	  return Merge;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Merge', Merge);
	
	Get = (function(superClass) {
	  extend(Get, superClass);
	
	  function Get() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    return Get.__super__.constructor.apply(this, arguments);
	  }
	
	  Get.node_name = 'Get';
	
	  Get.group_name = 'Utils';
	
	  Get.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Get.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "array": {
	          type: "Array",
	          val: null
	        },
	        "index": 0
	      },
	      outputs: {
	        "out": {
	          type: "Any",
	          val: null
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Get.prototype.compute = function() {
	    var arr, ind, old;
	    old = this.fields.getField("out", true).getValue();
	    this.value = false;
	    arr = this.fields.getField("array").getValue();
	    ind = parseInt(this.fields.getField("index").getValue());
	    if ($.type(arr) === "array") {
	      this.value = arr[ind % arr.length];
	    }
	    if (this.value !== old) {
	      return this.fields.setField("out", this.value);
	    }
	  };
	
	  return Get;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Get', Get);
	
	Mp3Input = (function(superClass) {
	  extend(Mp3Input, superClass);
	
	  function Mp3Input() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getAverageLevel = bind(this.getAverageLevel, this);
	    this.onSoundLoad = bind(this.onSoundLoad, this);
	    this.loadAudioBuffer = bind(this.loadAudioBuffer, this);
	    this.loadAudio = bind(this.loadAudio, this);
	    this.createSound = bind(this.createSound, this);
	    this.finishLoad = bind(this.finishLoad, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Mp3Input.__super__.constructor.apply(this, arguments);
	  }
	
	  Mp3Input.node_name = 'Mp3Input';
	
	  Mp3Input.group_name = 'Utils';
	
	  Mp3Input.prototype.initialize = function(options) {
	    Mp3Input.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.counter = 0;
	    this.playing = false;
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    if (AudioContext) {
	      this.audioContext = new AudioContext();
	    } else {
	      $(".options", this.main_view).prepend('<p class="warning">This node currently require a webaudio capable browser.</p>');
	    }
	    return this.url_cache = "";
	  };
	
	  Mp3Input.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Mp3Input.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "url": "",
	        "smoothingTime": 0.1
	      },
	      outputs: {
	        "average": 0,
	        "low": 0,
	        "medium": 0,
	        "high": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Mp3Input.prototype.remove = function() {
	    this.stopSound();
	    delete this.audioContext;
	    delete this.url_cache;
	    return Mp3Input.__super__.remove.apply(this, arguments);
	  };
	
	  Mp3Input.prototype.onRegister = function() {
	    Mp3Input.__super__.onRegister.apply(this, arguments);
	    if (this.fields.getField("url").getValue() !== "") {
	      return this.loadAudio(this.fields.getField("url").getValue());
	    }
	  };
	
	  Mp3Input.prototype.stopSound = function() {
	    if (!this.source) {
	      return false;
	    }
	    if (this.playing === true) {
	      this.source.stop(0.0);
	      this.source.disconnect(0);
	      return this.playing = false;
	    }
	  };
	
	  Mp3Input.prototype.playSound = function(time) {
	    if (this.source && this.audioContext && this.audioBuffer) {
	      this.stopSound();
	      this.source = this.createSound();
	      this.source.start(0, time, this.audioBuffer.duration - time);
	      return this.playing = true;
	    }
	  };
	
	  Mp3Input.prototype.finishLoad = function() {
	    var delay;
	    this.source.buffer = this.audioBuffer;
	    this.source.looping = true;
	    this.onSoundLoad();
	    Timeline.getGlobalInstance().maxTime = this.audioBuffer.duration;
	    delay = function(ms, func) {
	      return setTimeout(func, ms);
	    };
	    return delay(1000, (function(_this) {
	      return function() {
	        Timeline.getGlobalInstance().stop();
	        return Timeline.getGlobalInstance().play();
	      };
	    })(this));
	  };
	
	  Mp3Input.prototype.createSound = function() {
	    var src;
	    src = this.audioContext.createBufferSource();
	    if (this.audioBuffer) {
	      src.buffer = this.audioBuffer;
	    }
	    src.connect(this.analyser);
	    this.analyser.connect(this.audioContext.destination);
	    return src;
	  };
	
	  Mp3Input.prototype.loadAudio = function(url) {
	    Timeline.getGlobalInstance().stop();
	    this.analyser = this.audioContext.createAnalyser();
	    this.analyser.fftSize = 1024;
	    this.source = this.createSound();
	    return this.loadAudioBuffer(url);
	  };
	
	  Mp3Input.prototype.loadAudioBuffer = function(url) {
	    var onDecoded, request;
	    request = new XMLHttpRequest();
	    request.open("GET", url, true);
	    request.responseType = "arraybuffer";
	    onDecoded = (function(_this) {
	      return function(buffer) {
	        _this.audioBuffer = buffer;
	        return _this.finishLoad();
	      };
	    })(this);
	    request.onload = (function(_this) {
	      return function() {
	        return _this.audioContext.decodeAudioData(request.response, onDecoded);
	      };
	    })(this);
	    request.send();
	    return this;
	  };
	
	  Mp3Input.prototype.onSoundLoad = function() {
	    this.freqByteData = new Uint8Array(this.analyser.frequencyBinCount);
	    return this.timeByteData = new Uint8Array(this.analyser.frequencyBinCount);
	  };
	
	  Mp3Input.prototype.getAverageLevel = function(start, max) {
	    var i, j, length, ref, ref1, sum;
	    if (start == null) {
	      start = 0;
	    }
	    if (max == null) {
	      max = 512;
	    }
	    if (!this.freqByteData) {
	      return 0;
	    }
	    start = Math.floor(start);
	    max = Math.floor(max);
	    length = max - start;
	    sum = 0;
	    for (i = j = ref = start, ref1 = max; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
	      sum += this.freqByteData[i];
	    }
	    return sum / length;
	  };
	
	  Mp3Input.prototype.remove = function() {
	    Mp3Input.__super__.remove.apply(this, arguments);
	    if (this.source) {
	      this.source.stop(0.0);
	      this.source.disconnect();
	    }
	    this.freqByteData = false;
	    this.timeByteData = false;
	    this.audioBuffer = false;
	    this.audioContext = false;
	    return this.source = false;
	  };
	
	  Mp3Input.prototype.compute = function() {
	    var length, length3rd;
	    if (!window.AudioContext) {
	      return;
	    }
	    if (this.url_cache !== this.fields.getField("url").getValue()) {
	      this.url_cache = this.fields.getField("url").getValue();
	      this.loadAudio(this.url_cache);
	    }
	    if (this.analyser && this.freqByteData) {
	      this.analyser.smoothingTimeConstant = this.fields.getField("smoothingTime").getValue();
	      this.analyser.getByteFrequencyData(this.freqByteData);
	      this.analyser.getByteTimeDomainData(this.timeByteData);
	    }
	    if (this.freqByteData) {
	      length = this.freqByteData.length;
	      length3rd = length / 3;
	      this.fields.setField("average", this.getAverageLevel(0, length - 1));
	      this.fields.setField("low", this.getAverageLevel(0, length3rd - 1));
	      this.fields.setField("medium", this.getAverageLevel(length3rd, (length3rd * 2) - 1));
	      this.fields.setField("high", this.getAverageLevel(length3rd * 2, length - 1));
	    }
	    return true;
	  };
	
	  return Mp3Input;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Mp3Input', Mp3Input);
	
	Mouse = (function(superClass) {
	  extend(Mouse, superClass);
	
	  function Mouse() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Mouse.__super__.constructor.apply(this, arguments);
	  }
	
	  Mouse.node_name = 'Mouse';
	
	  Mouse.group_name = 'Utils';
	
	  Mouse.prototype.initialize = function(options) {
	    Mouse.__super__.initialize.apply(this, arguments);
	    return this.auto_evaluate = true;
	  };
	
	  Mouse.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Mouse.__super__.getFields.apply(this, arguments);
	    fields = {
	      outputs: {
	        "xy": {
	          type: "Vector2",
	          val: new THREE.Vector2()
	        },
	        "x": 0,
	        "y": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Mouse.prototype.compute = function() {
	    var dx, dy;
	    dx = ThreeNodes.renderer.mouseX;
	    dy = ThreeNodes.renderer.mouseY;
	    this.fields.setField("xy", new THREE.Vector2(dx, dy));
	    this.fields.setField("x", dx);
	    return this.fields.setField("y", dy);
	  };
	
	  return Mouse;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Mouse', Mouse);
	
	Screen = (function(superClass) {
	  extend(Screen, superClass);
	
	  function Screen() {
	    this.compute = bind(this.compute, this);
	    this.getFields = bind(this.getFields, this);
	    this.remove = bind(this.remove, this);
	    this.initialize = bind(this.initialize, this);
	    return Screen.__super__.constructor.apply(this, arguments);
	  }
	
	  Screen.node_name = 'Screen';
	
	  Screen.group_name = 'Utils';
	
	  Screen.width = 0;
	
	  Screen.height = 0;
	
	  Screen.onResize = function(e) {
	    Screen.width = $(window).width();
	    return Screen.height = $(window).height();
	  };
	
	  Screen.prototype.initialize = function(options) {
	    Screen.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    $(window).on("resize.threenodes", Screen.onResize);
	    return Screen.onResize();
	  };
	
	  Screen.prototype.remove = function() {
	    Screen.__super__.remove.apply(this, arguments);
	    return $(window).off("resize.threenodes");
	  };
	
	  Screen.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Screen.__super__.getFields.apply(this, arguments);
	    fields = {
	      outputs: {
	        "width": Screen.width,
	        "height": Screen.height
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Screen.prototype.compute = function() {
	    this.fields.setField("width", Screen.width);
	    return this.fields.setField("height", Screen.height);
	  };
	
	  return Screen;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Screen', Screen);
	
	Timer = (function(superClass) {
	  extend(Timer, superClass);
	
	  function Timer() {
	    this.compute = bind(this.compute, this);
	    this.get_time = bind(this.get_time, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Timer.__super__.constructor.apply(this, arguments);
	  }
	
	  Timer.node_name = 'Timer';
	
	  Timer.group_name = 'Utils';
	
	  Timer.prototype.initialize = function(options) {
	    Timer.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.old = this.get_time();
	    return this.counter = 0;
	  };
	
	  Timer.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Timer.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "reset": false,
	        "pause": false,
	        "max": 99999999999
	      },
	      outputs: {
	        "out": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  Timer.prototype.get_time = function() {
	    return new Date().getTime();
	  };
	
	  Timer.prototype.compute = function() {
	    var diff, now, oldval;
	    oldval = this.fields.getField("out", true).getValue();
	    now = this.get_time();
	    if (this.fields.getField("pause").getValue() === false) {
	      this.counter += now - this.old;
	    }
	    if (this.fields.getField("reset").getValue() === true) {
	      this.counter = 0;
	    }
	    diff = this.fields.getField("max").getValue() - this.counter;
	    if (diff <= 0) {
	      this.counter = 0;
	    }
	    this.old = now;
	    return this.fields.setField("out", this.counter);
	  };
	
	  return Timer;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Timer', Timer);
	
	Font = (function(superClass) {
	  extend(Font, superClass);
	
	  function Font() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return Font.__super__.constructor.apply(this, arguments);
	  }
	
	  Font.node_name = 'Font';
	
	  Font.group_name = 'Utils';
	
	  Font.prototype.initialize = function(options) {
	    var dir, i;
	    Font.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = true;
	    this.ob = "";
	    dir = "../../../../../../assets/fonts/";
	    this.files = {
	      "helvetiker": {
	        "normal": dir + "helvetiker_regular.typeface",
	        "bold": dir + "helvetiker_bold.typeface"
	      },
	      "optimer": {
	        "normal": dir + "optimer_regular.typeface",
	        "bold": dir + "optimer_bold.typeface"
	      },
	      "gentilis": {
	        "normal": dir + "gentilis_regular.typeface",
	        "bold": dir + "gentilis_bold.typeface"
	      },
	      "droid sans": {
	        "normal": dir + "droid/droid_sans_regular.typeface",
	        "bold": dir + "droid/droid_sans_bold.typeface"
	      },
	      "droid serif": {
	        "normal": dir + "droid/droid_serif_regular.typeface",
	        "bold": dir + "droid/droid_serif_bold.typeface"
	      }
	    };
	    this.reverseFontMap = {};
	    this.reverseWeightMap = {};
	    for (i in this.fields.getField("weight").get("possibilities")) {
	      this.reverseWeightMap[this.fields.getField("weight").get("possibilities")[i]] = i;
	    }
	    for (i in this.fields.getField("font").get("possibilities")) {
	      this.reverseFontMap[this.fields.getField("font").get("possibilities")[i]] = i;
	    }
	    this.fontcache = -1;
	    return this.weightcache = -1;
	  };
	
	  Font.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = Font.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "font": {
	          type: "Float",
	          val: 0,
	          values: {
	            "helvetiker": 0,
	            "optimer": 1,
	            "gentilis": 2,
	            "droid sans": 3,
	            "droid serif": 4
	          }
	        },
	        "weight": {
	          type: "Float",
	          val: 0,
	          values: {
	            "normal": 0,
	            "bold": 1
	          }
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
	
	  Font.prototype.remove = function() {
	    delete this.reverseFontMap;
	    delete this.reverseWeightMap;
	    delete this.ob;
	    return Font.__super__.remove.apply(this, arguments);
	  };
	
	  Font.prototype.compute = function() {
	    var findex, font, weight, windex;
	    findex = parseInt(this.fields.getField("font").getValue());
	    windex = parseInt(this.fields.getField("weight").getValue());
	    if (findex > 4 || findex < 0) {
	      findex = 0;
	    }
	    if (windex !== 0 || windex !== 1) {
	      windex = 0;
	    }
	    font = this.reverseFontMap[findex];
	    weight = this.reverseWeightMap[windex];
	    this.ob = {
	      font: font,
	      weight: weight
	    };
	    this.fontcache = findex;
	    this.weightcache = windex;
	    return this.fields.setField("out", this.ob);
	  };
	
	  return Font;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Font', Font);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, LinearSpread, Node, RandomSpread, Rc4Random, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Rc4Random = __webpack_require__(39);
	
	Node = __webpack_require__(35);
	
	RandomSpread = (function(superClass) {
	  extend(RandomSpread, superClass);
	
	  function RandomSpread() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return RandomSpread.__super__.constructor.apply(this, arguments);
	  }
	
	  RandomSpread.node_name = 'RandomSpread';
	
	  RandomSpread.group_name = 'Spread';
	
	  RandomSpread.prototype.initialize = function(options) {
	    RandomSpread.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.rnd = false;
	    this.value = false;
	    this.seed = false;
	    this.count = false;
	    this.width = false;
	    return this.offset = false;
	  };
	
	  RandomSpread.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = RandomSpread.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "count": 1,
	        "seed": 1,
	        "width": 1,
	        "offset": 0
	      },
	      outputs: {
	        "out": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  RandomSpread.prototype.onFieldsCreated = function() {
	    return this.v_out = this.fields.getField("out", true);
	  };
	
	  RandomSpread.prototype.remove = function() {
	    delete this.v_out;
	    return RandomSpread.__super__.remove.apply(this, arguments);
	  };
	
	  RandomSpread.prototype.compute = function() {
	    var i, j, needs_rebuild, ref;
	    needs_rebuild = false;
	    if (this.seed !== this.fields.getField("seed").get("value") || this.count !== parseInt(this.fields.getField("count").getValue(0)) || this.width !== this.fields.getField("width").get("value") || this.offset !== this.fields.getField("offset").get("value")) {
	      this.seed = this.fields.getField("seed").get("value");
	      this.rnd = new Rc4Random(this.seed.toString());
	      this.value = [];
	      this.width = this.fields.getField("width").getValue(0);
	      this.offset = this.fields.getField("offset").getValue(0);
	      this.count = parseInt(this.fields.getField("count").get("value"));
	      for (i = j = 0, ref = this.count - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	        this.value[i] = this.rnd.getRandomNumber() * this.width - this.width / 2 + this.offset;
	      }
	    }
	    return this.fields.setField("out", this.value);
	  };
	
	  return RandomSpread;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('RandomSpread', RandomSpread);
	
	LinearSpread = (function(superClass) {
	  extend(LinearSpread, superClass);
	
	  function LinearSpread() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    this.initialize = bind(this.initialize, this);
	    return LinearSpread.__super__.constructor.apply(this, arguments);
	  }
	
	  LinearSpread.node_name = 'LinearSpread';
	
	  LinearSpread.group_name = 'Spread';
	
	  LinearSpread.prototype.initialize = function(options) {
	    LinearSpread.__super__.initialize.apply(this, arguments);
	    this.auto_evaluate = false;
	    this.value = false;
	    this.count = false;
	    this.width = false;
	    this.phase = false;
	    return this.offset = false;
	  };
	
	  LinearSpread.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = LinearSpread.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "count": 1,
	        "width": 1,
	        "phase": 0,
	        "offset": 0
	      },
	      outputs: {
	        "out": 0
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  LinearSpread.prototype.onFieldsCreated = function() {
	    return this.v_out = this.fields.getField("out", true);
	  };
	
	  LinearSpread.prototype.remove = function() {
	    delete this.v_out;
	    return LinearSpread.__super__.remove.apply(this, arguments);
	  };
	
	  LinearSpread.prototype.compute = function() {
	    var i, j, needs_rebuild, ref, res, shift, stepSize;
	    needs_rebuild = false;
	    this.width = this.fields.getField("width").getValue(0);
	    this.offset = this.fields.getField("offset").getValue(0);
	    this.phase = this.fields.getField("phase").getValue(0);
	    this.count = parseInt(this.fields.getField("count").getValue());
	    this.value = [];
	    stepSize = this.width / this.count;
	    shift = stepSize / 2;
	    for (i = j = 0, ref = this.count - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      res = (i * stepSize + shift + this.phase) % this.width;
	      res = this.offset - this.width / 2 + res;
	      this.value[i] = res;
	    }
	    return this.fields.setField("out", this.value);
	  };
	
	  return LinearSpread;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('LinearSpread', LinearSpread);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Group, Node, Nodes, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Nodes = __webpack_require__(11);
	
	Node = __webpack_require__(35);
	
	Group = (function(superClass) {
	  extend(Group, superClass);
	
	  function Group() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.getFields = bind(this.getFields, this);
	    this.toJSON = bind(this.toJSON, this);
	    this.initSubnodes = bind(this.initSubnodes, this);
	    this.initialize = bind(this.initialize, this);
	    return Group.__super__.constructor.apply(this, arguments);
	  }
	
	  Group.node_name = 'Group';
	
	  Group.group_name = false;
	
	  Group.prototype.initialize = function(options) {
	    var connection, j, len, ref, results;
	    this.initSubnodes(options);
	    Group.__super__.initialize.apply(this, arguments);
	    this.nodes.each((function(_this) {
	      return function(node) {
	        return node.set("gid", _this.get("nid"));
	      };
	    })(this));
	    ref = this.definition.get("connections");
	    results = [];
	    for (j = 0, len = ref.length; j < len; j++) {
	      connection = ref[j];
	      results.push(this.nodes.createConnectionFromObject(connection));
	    }
	    return results;
	  };
	
	  Group.prototype.initSubnodes = function(options) {
	    var j, len, n, nds, node, results;
	    this.nodes = new Nodes([], {
	      settings: options.settings,
	      parent: this
	    });
	    this.definition = options.definition;
	    nds = options.nodes ? options.nodes : this.definition.get("nodes");
	    results = [];
	    for (j = 0, len = nds.length; j < len; j++) {
	      node = nds[j];
	      results.push(n = this.nodes.createNode(node));
	    }
	    return results;
	  };
	
	  Group.prototype.toJSON = function() {
	    var res;
	    res = {
	      nid: this.get('nid'),
	      name: this.get('name'),
	      type: this.typename(),
	      anim: this.getAnimationData(),
	      x: this.get('x'),
	      y: this.get('y'),
	      nodes: jQuery.map(this.nodes.models, function(n, i) {
	        return n.toJSON();
	      }),
	      definition_id: this.definition.get("gid")
	    };
	    return res;
	  };
	
	  Group.prototype.getFields = function() {
	    return false;
	  };
	
	  Group.prototype.remove = function() {
	    if (this.nodes) {
	      this.nodes.destroy();
	      delete this.nodes;
	    }
	    delete this.definition;
	    return Group.__super__.remove.apply(this, arguments);
	  };
	
	  Group.prototype.compute = function() {
	    return this;
	  };
	
	  return Group;
	
	})(Node);
	
	ThreeNodes.Core.addNodeType('Group', Group);


/***/ },
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Fields, Node, NodeNumberSimple, Utils, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	Fields = __webpack_require__(78);
	
	Node = __webpack_require__(35);
	
	
	/* NodeNumberSimple model */
	
	NodeNumberSimple = (function(superClass) {
	  extend(NodeNumberSimple, superClass);
	
	  function NodeNumberSimple() {
	    this.compute = bind(this.compute, this);
	    this.remove = bind(this.remove, this);
	    this.process_val = bind(this.process_val, this);
	    this.onFieldsCreated = bind(this.onFieldsCreated, this);
	    this.getFields = bind(this.getFields, this);
	    return NodeNumberSimple.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeNumberSimple.prototype.getFields = function() {
	    var base_fields, fields;
	    base_fields = NodeNumberSimple.__super__.getFields.apply(this, arguments);
	    fields = {
	      inputs: {
	        "in": {
	          type: "Float",
	          val: 0
	        }
	      },
	      outputs: {
	        "out": {
	          type: "Float",
	          val: 0
	        }
	      }
	    };
	    return $.extend(true, base_fields, fields);
	  };
	
	  NodeNumberSimple.prototype.onFieldsCreated = function() {
	    this.v_in = this.fields.getField("in");
	    return this.v_out = this.fields.getField("out", true);
	  };
	
	  NodeNumberSimple.prototype.process_val = function(num, i) {
	    return num;
	  };
	
	  NodeNumberSimple.prototype.remove = function() {
	    delete this.v_in;
	    delete this.v_out;
	    return NodeNumberSimple.__super__.remove.apply(this, arguments);
	  };
	
	  NodeNumberSimple.prototype.compute = function() {
	    var i, j, numItems, ref, ref1, res;
	    res = [];
	    numItems = this.fields.getMaxInputSliceCount();
	    for (i = j = 0, ref1 = numItems; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
	      ref = this.v_in.getValue(i);
	      switch ($.type(ref)) {
	        case "number":
	          res[i] = this.process_val(ref, i);
	          break;
	        case "object":
	          switch (ref.constructor) {
	            case THREE.Vector2:
	              res[i].x = this.process_val(ref.x, i);
	              res[i].y = this.process_val(ref.y, i);
	              break;
	            case THREE.Vector3:
	              res[i].x = this.process_val(ref.x, i);
	              res[i].y = this.process_val(ref.y, i);
	              res[i].z = this.process_val(ref.z, i);
	          }
	      }
	    }
	    this.v_out.setValue(res);
	    return true;
	  };
	
	  return NodeNumberSimple;
	
	})(Node);
	
	module.exports = NodeNumberSimple;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, NodeView, NodeWithCenterTextfield, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	__webpack_require__(35);
	
	NodeView = __webpack_require__(12);
	
	NodeWithCenterTextfield = (function(superClass) {
	  extend(NodeWithCenterTextfield, superClass);
	
	  function NodeWithCenterTextfield() {
	    this.getCenterField = bind(this.getCenterField, this);
	    this.initialize = bind(this.initialize, this);
	    return NodeWithCenterTextfield.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeWithCenterTextfield.prototype.initialize = function(options) {
	    var container, f_in, field;
	    NodeWithCenterTextfield.__super__.initialize.apply(this, arguments);
	    field = this.getCenterField();
	    container = $("<div><input type='text' data-fid='" + (field.get('fid')) + "' /></div>").appendTo($(".center", this.$el));
	    f_in = $("input", container);
	    field.on_value_update_hooks.update_center_textfield = function(v) {
	      if (v !== null) {
	        return f_in.val(v.toString());
	      }
	    };
	    f_in.val(field.getValue());
	    if (field.get("is_output") === true) {
	      f_in.attr("disabled", "disabled");
	    } else {
	      f_in.keypress(function(e) {
	        if (e.which === 13) {
	          field.setValue($(this).val());
	          return $(this).blur();
	        }
	      });
	    }
	    return this;
	  };
	
	  NodeWithCenterTextfield.prototype.getCenterField = function() {
	    return this.model.fields.getField("in");
	  };
	
	  return NodeWithCenterTextfield;
	
	})(NodeView);
	
	module.exports = NodeWithCenterTextfield;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CodeMirror, NodeCodeView, NodeView, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	CodeMirror = __webpack_require__(91);
	
	__webpack_require__(72);
	
	__webpack_require__(92);
	
	__webpack_require__(93);
	
	__webpack_require__(94);
	
	__webpack_require__(35);
	
	NodeView = __webpack_require__(12);
	
	NodeCodeView = (function(superClass) {
	  extend(NodeCodeView, superClass);
	
	  function NodeCodeView() {
	    this.getCenterField = bind(this.getCenterField, this);
	    this.render = bind(this.render, this);
	    this.initialize = bind(this.initialize, this);
	    return NodeCodeView.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeCodeView.prototype.initialize = function(options) {
	    var $codemirror, container, editor, f_in, field, self;
	    NodeCodeView.__super__.initialize.apply(this, arguments);
	    field = this.getCenterField();
	    container = $("<div><textarea data-fid='" + (field.get('fid')) + "' spellcheck='false'></textarea></div>");
	    this.$el.find('.options .center').append(container);
	    f_in = $("textarea", container);
	    field.on_value_update_hooks.update_center_textfield = function(v) {
	      if (v !== null) {
	        return f_in.val(v.toString());
	      }
	    };
	    f_in.val(field.getValue());
	    editor = CodeMirror.fromTextArea(f_in.get(0), {
	      mode: "javascript",
	      theme: 'monokai',
	      tabSize: 2,
	      lineNumbers: false,
	      gutters: ["CodeMirror-lint-markers"],
	      lint: true
	    });
	    self = this;
	    this.$el.resizable({
	      minHeight: 50,
	      minWidth: 220,
	      ghost: false,
	      resize: function(event, ui) {
	        var model, size;
	        size = ui.size;
	        editor.setSize(null, size.height - 37);
	        model = self.model;
	        model.set("width", size.width - 13);
	        model.set("height", size.height - 13);
	        return self.renderConnections();
	      }
	    });
	    editor.on("change", function(instance, changeObj) {
	      return field.setValue(editor.getValue());
	    });
	    $codemirror = this.$el.find('.CodeMirror');
	    $codemirror.parent().on("mousemove click mouseup mousedown", function(e) {
	      return e.stopPropagation();
	    });
	    if (this.model.get('height')) {
	      editor.setSize(null, this.model.get('height') - 37 + 13);
	    }
	    if (field.get("is_output") === true) {
	      f_in.attr("disabled", "disabled");
	      editor.setOption('readOnly', true);
	    } else {
	      f_in.keyup(function(e) {
	        return field.setValue($(this).val());
	      });
	    }
	    return this;
	  };
	
	  NodeCodeView.prototype.render = function() {
	    NodeCodeView.__super__.render.apply(this, arguments);
	    if (this.model.get('width')) {
	      this.$el.css('width', this.model.get('width'));
	    }
	    if (this.model.get('height')) {
	      return this.$el.css('height', this.model.get('height'));
	    }
	  };
	
	  NodeCodeView.prototype.getCenterField = function() {
	    return this.model.fields.getField("code");
	  };
	
	  return NodeCodeView;
	
	})(NodeView);
	
	module.exports = NodeCodeView;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Rc4Random,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Rc4Random = (function() {
	  function Rc4Random(seed) {
	    this.getRandomNumber = bind(this.getRandomNumber, this);
	    this.getRandomByte = bind(this.getRandomByte, this);
	    var i, j, k, l, ref, ref1, t;
	    this.keySchedule = [];
	    this.keySchedule_i = 0;
	    this.keySchedule_j = 0;
	    for (i = k = 0, ref = 256 - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
	      this.keySchedule[i] = i;
	    }
	    j = 0;
	    for (i = l = 0, ref1 = 256 - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; i = 0 <= ref1 ? ++l : --l) {
	      j = (j + this.keySchedule[i] + seed.charCodeAt(i % seed.length)) % 256;
	      t = this.keySchedule[i];
	      this.keySchedule[i] = this.keySchedule[j];
	      this.keySchedule[j] = t;
	    }
	  }
	
	  Rc4Random.prototype.getRandomByte = function() {
	    var t;
	    this.keySchedule_i = (this.keySchedule_i + 1) % 256;
	    this.keySchedule_j = (this.keySchedule_j + this.keySchedule[this.keySchedule_i]) % 256;
	    t = this.keySchedule[this.keySchedule_i];
	    this.keySchedule[this.keySchedule_i] = this.keySchedule[this.keySchedule_j];
	    this.keySchedule[this.keySchedule_j] = t;
	    return this.keySchedule[(this.keySchedule[this.keySchedule_i] + this.keySchedule[this.keySchedule_j]) % 256];
	  };
	
	  Rc4Random.prototype.getRandomNumber = function() {
	    var i, k, multiplier, number, ref;
	    number = 0;
	    multiplier = 1;
	    for (i = k = 0, ref = 8 - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
	      number += this.getRandomByte() * multiplier;
	      multiplier *= 256;
	    }
	    return number / 18446744073709551616;
	  };
	
	  return Rc4Random;
	
	})();
	
	module.exports = Rc4Random;


/***/ },
/* 40 */,
/* 41 */,
/* 42 */,
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// jQuery Context Menu Plugin
	//
	// Version 1.01
	//
	// Cory S.N. LaViska
	// A Beautiful Site (http://abeautifulsite.net/)
	//
	// More info: http://abeautifulsite.net/2008/09/jquery-context-menu-plugin/
	//
	// Terms of Use
	//
	// This plugin is dual-licensed under the GNU General Public License
	//   and the MIT License and is copyright A Beautiful Site, LLC.
	//
	if(jQuery)( function() {
		$.extend($.fn, {
	
			contextMenu: function(o, callback) {
				// Defaults
				if( o.menu == undefined ) return false;
				if( o.inSpeed == undefined ) o.inSpeed = 150;
				if( o.outSpeed == undefined ) o.outSpeed = 75;
				// 0 needs to be -1 for expected results (no fade)
				if( o.inSpeed == 0 ) o.inSpeed = -1;
				if( o.outSpeed == 0 ) o.outSpeed = -1;
				// Loop each context menu
				$(this).each( function() {
					var el = $(this);
					var offset = $(el).offset();
					// Add contextMenu class
					$('#' + o.menu).addClass('contextMenu');
					// Simulate a true right click
					$(this).mousedown( function(e) {
						var evt = e;
						evt.preventDefault();
						$(this).mouseup( function(e) {
							e.preventDefault();
							var srcElement = $(this);
							$(this).unbind('mouseup');
							if( evt.button == 2 ) {
								// Hide context menus that may be showing
								$(".contextMenu").hide();
								// Get this context menu
								var menu = $('#' + o.menu);
	
								if( $(el).hasClass('disabled') ) return false;
	
								// Detect mouse position
								var d = {}, x, y;
								if( self.innerHeight ) {
									d.pageYOffset = self.pageYOffset;
									d.pageXOffset = self.pageXOffset;
									d.innerHeight = self.innerHeight;
									d.innerWidth = self.innerWidth;
								} else if( document.documentElement &&
									document.documentElement.clientHeight ) {
									d.pageYOffset = document.documentElement.scrollTop;
									d.pageXOffset = document.documentElement.scrollLeft;
									d.innerHeight = document.documentElement.clientHeight;
									d.innerWidth = document.documentElement.clientWidth;
								} else if( document.body ) {
									d.pageYOffset = document.body.scrollTop;
									d.pageXOffset = document.body.scrollLeft;
									d.innerHeight = document.body.clientHeight;
									d.innerWidth = document.body.clientWidth;
								}
								(e.pageX) ? x = e.pageX : x = e.clientX + d.scrollLeft;
								(e.pageY) ? y = e.pageY : y = e.clientY + d.scrollTop;
	
								// Show the menu
								$(document).unbind('click');
								$(menu).css({ top: y, left: x }).fadeIn(o.inSpeed);
								// Hover events
								$(menu).find('A').mouseover( function() {
									$(menu).find('LI.hover').removeClass('hover');
									$(this).parent().addClass('hover');
								}).mouseout( function() {
									$(menu).find('LI.hover').removeClass('hover');
								});
	
								// Keyboard
								$(document).keypress( function(e) {
									switch( e.keyCode ) {
										case 38: // up
											if( $(menu).find('LI.hover').size() == 0 ) {
												$(menu).find('LI:last').addClass('hover');
											} else {
												$(menu).find('LI.hover').removeClass('hover').prevAll('LI:not(.disabled)').eq(0).addClass('hover');
												if( $(menu).find('LI.hover').size() == 0 ) $(menu).find('LI:last').addClass('hover');
											}
										break;
										case 40: // down
											if( $(menu).find('LI.hover').size() == 0 ) {
												$(menu).find('LI:first').addClass('hover');
											} else {
												$(menu).find('LI.hover').removeClass('hover').nextAll('LI:not(.disabled)').eq(0).addClass('hover');
												if( $(menu).find('LI.hover').size() == 0 ) $(menu).find('LI:first').addClass('hover');
											}
										break;
										case 13: // enter
											$(menu).find('LI.hover A').trigger('click');
										break;
										case 27: // esc
											$(document).trigger('click');
										break
									}
								});
	
								// When items are selected
								$('#' + o.menu).find('A').unbind('click');
								$('#' + o.menu).find('LI:not(.disabled) A').click( function() {
									$(document).unbind('click').unbind('keypress');
									$(".contextMenu").hide();
									// Callback
									if( callback ) callback( $(this).attr('href').substr(1), $(srcElement), {x: x - offset.left, y: y - offset.top, docX: x, docY: y} );
									return false;
								});
	
								// Hide bindings
								setTimeout( function() { // Delay for Mozilla
									$(document).click( function() {
										$(document).unbind('click').unbind('keypress');
										$(menu).fadeOut(o.outSpeed);
										return false;
									});
								}, 0);
							}
						});
					});
	
					// Disable text selection
					/*if( $.browser.mozilla ) {
						$('#' + o.menu).each( function() { $(this).css({ 'MozUserSelect' : 'none' }); });
					} else if( $.browser.msie ) {
						$('#' + o.menu).each( function() { $(this).bind('selectstart.disableTextSelect', function() { return false; }); });
					} else {*/
						$('#' + o.menu).each(function() { $(this).bind('mousedown.disableTextSelect', function() { return false; }); });
					//}
					// Disable browser context menu (requires both selectors to work in IE/Safari + FF/Chrome)
					$(el).add($('UL.contextMenu')).bind('contextmenu', function() { return false; });
	
				});
				return $(this);
			},
	
			// Disable context menu items on the fly
			disableContextMenuItems: function(o) {
				if( o == undefined ) {
					// Disable all
					$(this).find('LI').addClass('disabled');
					return( $(this) );
				}
				$(this).each( function() {
					if( o != undefined ) {
						var d = o.split(',');
						for( var i = 0; i < d.length; i++ ) {
							$(this).find('A[href="' + d[i] + '"]').parent().addClass('disabled');
	
						}
					}
				});
				return( $(this) );
			},
	
			// Enable context menu items on the fly
			enableContextMenuItems: function(o) {
				if( o == undefined ) {
					// Enable all
					$(this).find('LI.disabled').removeClass('disabled');
					return( $(this) );
				}
				$(this).each( function() {
					if( o != undefined ) {
						var d = o.split(',');
						for( var i = 0; i < d.length; i++ ) {
							$(this).find('A[href="' + d[i] + '"]').parent().removeClass('disabled');
	
						}
					}
				});
				return( $(this) );
			},
	
			// Disable context menu(s)
			disableContextMenu: function() {
				$(this).each( function() {
					$(this).addClass('disabled');
				});
				return( $(this) );
			},
	
			// Enable context menu(s)
			enableContextMenu: function() {
				$(this).each( function() {
					$(this).removeClass('disabled');
				});
				return( $(this) );
			},
	
			// Destroy context menu(s)
			destroyContextMenu: function() {
				// Destroy specified context menus
				$(this).each( function() {
					// Disable action
					$(this).unbind('mousedown').unbind('mouseup');
				});
				return( $(this) );
			}
	
		});
	})(jQuery);


/***/ },
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
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
/* 58 */,
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, FieldButton, FieldsView, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	FieldButton = __webpack_require__(90);
	
	__webpack_require__(1);
	
	
	/* Fields View */
	
	FieldsView = (function(superClass) {
	  extend(FieldsView, superClass);
	
	  function FieldsView() {
	    this.remove = bind(this.remove, this);
	    this.onFieldCreated = bind(this.onFieldCreated, this);
	    return FieldsView.__super__.constructor.apply(this, arguments);
	  }
	
	  FieldsView.prototype.initialize = function(options) {
	    FieldsView.__super__.initialize.apply(this, arguments);
	    this.node = options.node;
	    this.subviews = [];
	    this.collection.on("add", this.onFieldCreated);
	    return this.collection.each(this.onFieldCreated);
	  };
	
	  FieldsView.prototype.onFieldCreated = function(field) {
	    var $node, connection, from_gid, isInsideAnotherDOMnode, target, to_gid, view;
	    target = field.get("is_output") === false ? ".inputs" : ".outputs";
	    if (field.get("is_output") === false && field.isConnected()) {
	      connection = field.connections[0];
	      $node = this.$el.parent();
	      isInsideAnotherDOMnode = function() {
	        return $node.parent().closest(".node").length > 0;
	      };
	      if (isInsideAnotherDOMnode()) {
	        from_gid = connection.from_field.node.get("gid");
	        to_gid = connection.to_field.node.get("gid");
	        if (from_gid !== "-1" && to_gid !== "-1" && from_gid === to_gid) {
	          return;
	        }
	      }
	    }
	    view = new FieldButton({
	      model: field
	    });
	    view.$el.appendTo($(target, this.$el));
	    field.button = view.$el;
	    return this.subviews.push(view);
	  };
	
	  FieldsView.prototype.remove = function() {
	    var views;
	    this.undelegateEvents();
	    this.collection.off("add", this.onFieldCreated);
	    views = this.subviews.concat();
	    _.each(views, function(view) {
	      return view.remove();
	    });
	    $("input", $(this.el)).remove();
	    delete this.collection;
	    delete this.node;
	    delete this.subviews;
	    return FieldsView.__super__.remove.apply(this, arguments);
	  };
	
	  return FieldsView;
	
	})(Backbone.View);
	
	module.exports = FieldsView;


/***/ },
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * Color picker
	 * Author: Stefan Petre www.eyecon.ro
	 * 
	 * Dual licensed under the MIT and GPL licenses
	 * 
	 */
	(function ($) {
		var ColorPicker = function () {
			var
				ids = {},
				inAction,
				charMin = 65,
				visible,
				tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
				defaults = {
					eventName: 'click',
					onShow: function () {},
					onBeforeShow: function(){},
					onHide: function () {},
					onChange: function () {},
					onSubmit: function () {},
					color: 'ff0000',
					livePreview: true,
					flat: false
				},
				fillRGBFields = function  (hsb, cal) {
					var rgb = HSBToRGB(hsb);
					$(cal).data('colorpicker').fields
						.eq(1).val(rgb.r).end()
						.eq(2).val(rgb.g).end()
						.eq(3).val(rgb.b).end();
				},
				fillHSBFields = function  (hsb, cal) {
					$(cal).data('colorpicker').fields
						.eq(4).val(hsb.h).end()
						.eq(5).val(hsb.s).end()
						.eq(6).val(hsb.b).end();
				},
				fillHexFields = function (hsb, cal) {
					$(cal).data('colorpicker').fields
						.eq(0).val(HSBToHex(hsb)).end();
				},
				setSelector = function (hsb, cal) {
					$(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
					$(cal).data('colorpicker').selectorIndic.css({
						left: parseInt(150 * hsb.s/100, 10),
						top: parseInt(150 * (100-hsb.b)/100, 10)
					});
				},
				setHue = function (hsb, cal) {
					$(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h/360, 10));
				},
				setCurrentColor = function (hsb, cal) {
					$(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
				},
				setNewColor = function (hsb, cal) {
					$(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
				},
				keyDown = function (ev) {
					var pressedKey = ev.charCode || ev.keyCode || -1;
					if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
						return false;
					}
					var cal = $(this).parent().parent();
					if (cal.data('colorpicker').livePreview === true) {
						change.apply(this);
					}
				},
				change = function (ev) {
					var cal = $(this).parent().parent(), col;
					if (this.parentNode.className.indexOf('_hex') > 0) {
						cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
					} else if (this.parentNode.className.indexOf('_hsb') > 0) {
						cal.data('colorpicker').color = col = fixHSB({
							h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
							s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
							b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
						});
					} else {
						cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
							r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
							g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
							b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
						}));
					}
					if (ev) {
						fillRGBFields(col, cal.get(0));
						fillHexFields(col, cal.get(0));
						fillHSBFields(col, cal.get(0));
					}
					setSelector(col, cal.get(0));
					setHue(col, cal.get(0));
					setNewColor(col, cal.get(0));
					cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
				},
				blur = function (ev) {
					var cal = $(this).parent().parent();
					cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
				},
				focus = function () {
					charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
					$(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
					$(this).parent().addClass('colorpicker_focus');
				},
				downIncrement = function (ev) {
					var field = $(this).parent().find('input').focus();
					var current = {
						el: $(this).parent().addClass('colorpicker_slider'),
						max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
						y: ev.pageY,
						field: field,
						val: parseInt(field.val(), 10),
						preview: $(this).parent().parent().data('colorpicker').livePreview					
					};
					$(document).bind('mouseup', current, upIncrement);
					$(document).bind('mousemove', current, moveIncrement);
				},
				moveIncrement = function (ev) {
					ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
					if (ev.data.preview) {
						change.apply(ev.data.field.get(0), [true]);
					}
					return false;
				},
				upIncrement = function (ev) {
					change.apply(ev.data.field.get(0), [true]);
					ev.data.el.removeClass('colorpicker_slider').find('input').focus();
					$(document).unbind('mouseup', upIncrement);
					$(document).unbind('mousemove', moveIncrement);
					return false;
				},
				downHue = function (ev) {
					var current = {
						cal: $(this).parent(),
						y: $(this).offset().top
					};
					current.preview = current.cal.data('colorpicker').livePreview;
					$(document).bind('mouseup', current, upHue);
					$(document).bind('mousemove', current, moveHue);
				},
				moveHue = function (ev) {
					change.apply(
						ev.data.cal.data('colorpicker')
							.fields
							.eq(4)
							.val(parseInt(360*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.y))))/150, 10))
							.get(0),
						[ev.data.preview]
					);
					return false;
				},
				upHue = function (ev) {
					fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
					fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
					$(document).unbind('mouseup', upHue);
					$(document).unbind('mousemove', moveHue);
					return false;
				},
				downSelector = function (ev) {
					var current = {
						cal: $(this).parent(),
						pos: $(this).offset()
					};
					current.preview = current.cal.data('colorpicker').livePreview;
					$(document).bind('mouseup', current, upSelector);
					$(document).bind('mousemove', current, moveSelector);
				},
				moveSelector = function (ev) {
					change.apply(
						ev.data.cal.data('colorpicker')
							.fields
							.eq(6)
							.val(parseInt(100*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.pos.top))))/150, 10))
							.end()
							.eq(5)
							.val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX - ev.data.pos.left))))/150, 10))
							.get(0),
						[ev.data.preview]
					);
					return false;
				},
				upSelector = function (ev) {
					fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
					fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
					$(document).unbind('mouseup', upSelector);
					$(document).unbind('mousemove', moveSelector);
					return false;
				},
				enterSubmit = function (ev) {
					$(this).addClass('colorpicker_focus');
				},
				leaveSubmit = function (ev) {
					$(this).removeClass('colorpicker_focus');
				},
				clickSubmit = function (ev) {
					var cal = $(this).parent();
					var col = cal.data('colorpicker').color;
					cal.data('colorpicker').origColor = col;
					setCurrentColor(col, cal.get(0));
					cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
				},
				show = function (ev) {
					var cal = $('#' + $(this).data('colorpickerId'));
					cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
					var pos = $(this).offset();
					var viewPort = getViewport();
					var top = pos.top + this.offsetHeight;
					var left = pos.left;
					if (top + 176 > viewPort.t + viewPort.h) {
						top -= this.offsetHeight + 176;
					}
					if (left + 356 > viewPort.l + viewPort.w) {
						left -= 356;
					}
					cal.css({left: left + 'px', top: top + 'px'});
					if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
						cal.show();
					}
					$(document).bind('mousedown', {cal: cal}, hide);
					return false;
				},
				hide = function (ev) {
					if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
						if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
							ev.data.cal.hide();
						}
						$(document).unbind('mousedown', hide);
					}
				},
				isChildOf = function(parentEl, el, container) {
					if (parentEl == el) {
						return true;
					}
					if (parentEl.contains) {
						return parentEl.contains(el);
					}
					if ( parentEl.compareDocumentPosition ) {
						return !!(parentEl.compareDocumentPosition(el) & 16);
					}
					var prEl = el.parentNode;
					while(prEl && prEl != container) {
						if (prEl == parentEl)
							return true;
						prEl = prEl.parentNode;
					}
					return false;
				},
				getViewport = function () {
					var m = document.compatMode == 'CSS1Compat';
					return {
						l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
						t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
						w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
						h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
					};
				},
				fixHSB = function (hsb) {
					return {
						h: Math.min(360, Math.max(0, hsb.h)),
						s: Math.min(100, Math.max(0, hsb.s)),
						b: Math.min(100, Math.max(0, hsb.b))
					};
				}, 
				fixRGB = function (rgb) {
					return {
						r: Math.min(255, Math.max(0, rgb.r)),
						g: Math.min(255, Math.max(0, rgb.g)),
						b: Math.min(255, Math.max(0, rgb.b))
					};
				},
				fixHex = function (hex) {
					var len = 6 - hex.length;
					if (len > 0) {
						var o = [];
						for (var i=0; i<len; i++) {
							o.push('0');
						}
						o.push(hex);
						hex = o.join('');
					}
					return hex;
				}, 
				HexToRGB = function (hex) {
					var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
					return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
				},
				HexToHSB = function (hex) {
					return RGBToHSB(HexToRGB(hex));
				},
				RGBToHSB = function (rgb) {
					var hsb = {
						h: 0,
						s: 0,
						b: 0
					};
					var min = Math.min(rgb.r, rgb.g, rgb.b);
					var max = Math.max(rgb.r, rgb.g, rgb.b);
					var delta = max - min;
					hsb.b = max;
					if (max != 0) {
						
					}
					hsb.s = max != 0 ? 255 * delta / max : 0;
					if (hsb.s != 0) {
						if (rgb.r == max) {
							hsb.h = (rgb.g - rgb.b) / delta;
						} else if (rgb.g == max) {
							hsb.h = 2 + (rgb.b - rgb.r) / delta;
						} else {
							hsb.h = 4 + (rgb.r - rgb.g) / delta;
						}
					} else {
						hsb.h = -1;
					}
					hsb.h *= 60;
					if (hsb.h < 0) {
						hsb.h += 360;
					}
					hsb.s *= 100/255;
					hsb.b *= 100/255;
					return hsb;
				},
				HSBToRGB = function (hsb) {
					var rgb = {};
					var h = Math.round(hsb.h);
					var s = Math.round(hsb.s*255/100);
					var v = Math.round(hsb.b*255/100);
					if(s == 0) {
						rgb.r = rgb.g = rgb.b = v;
					} else {
						var t1 = v;
						var t2 = (255-s)*v/255;
						var t3 = (t1-t2)*(h%60)/60;
						if(h==360) h = 0;
						if(h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
						else if(h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
						else if(h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
						else if(h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
						else if(h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
						else if(h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
						else {rgb.r=0; rgb.g=0;	rgb.b=0}
					}
					return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
				},
				RGBToHex = function (rgb) {
					var hex = [
						rgb.r.toString(16),
						rgb.g.toString(16),
						rgb.b.toString(16)
					];
					$.each(hex, function (nr, val) {
						if (val.length == 1) {
							hex[nr] = '0' + val;
						}
					});
					return hex.join('');
				},
				HSBToHex = function (hsb) {
					return RGBToHex(HSBToRGB(hsb));
				},
				restoreOriginal = function () {
					var cal = $(this).parent();
					var col = cal.data('colorpicker').origColor;
					cal.data('colorpicker').color = col;
					fillRGBFields(col, cal.get(0));
					fillHexFields(col, cal.get(0));
					fillHSBFields(col, cal.get(0));
					setSelector(col, cal.get(0));
					setHue(col, cal.get(0));
					setNewColor(col, cal.get(0));
				};
			return {
				init: function (opt) {
					opt = $.extend({}, defaults, opt||{});
					if (typeof opt.color == 'string') {
						opt.color = HexToHSB(opt.color);
					} else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
						opt.color = RGBToHSB(opt.color);
					} else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
						opt.color = fixHSB(opt.color);
					} else {
						return this;
					}
					return this.each(function () {
						if (!$(this).data('colorpickerId')) {
							var options = $.extend({}, opt);
							options.origColor = opt.color;
							var id = 'collorpicker_' + parseInt(Math.random() * 1000);
							$(this).data('colorpickerId', id);
							var cal = $(tpl).attr('id', id);
							if (options.flat) {
								cal.appendTo(this).show();
							} else {
								cal.appendTo(document.body);
							}
							options.fields = cal
												.find('input')
													.bind('keyup', keyDown)
													.bind('change', change)
													.bind('blur', blur)
													.bind('focus', focus);
							cal
								.find('span').bind('mousedown', downIncrement).end()
								.find('>div.colorpicker_current_color').bind('click', restoreOriginal);
							options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
							options.selectorIndic = options.selector.find('div div');
							options.el = this;
							options.hue = cal.find('div.colorpicker_hue div');
							cal.find('div.colorpicker_hue').bind('mousedown', downHue);
							options.newColor = cal.find('div.colorpicker_new_color');
							options.currentColor = cal.find('div.colorpicker_current_color');
							cal.data('colorpicker', options);
							cal.find('div.colorpicker_submit')
								.bind('mouseenter', enterSubmit)
								.bind('mouseleave', leaveSubmit)
								.bind('click', clickSubmit);
							fillRGBFields(options.color, cal.get(0));
							fillHSBFields(options.color, cal.get(0));
							fillHexFields(options.color, cal.get(0));
							setHue(options.color, cal.get(0));
							setSelector(options.color, cal.get(0));
							setCurrentColor(options.color, cal.get(0));
							setNewColor(options.color, cal.get(0));
							console.log(options);
							if (options.flat) {
								cal.css({
									position: 'relative',
									display: 'block'
								});
							} else {
								$(this).bind(options.eventName, show);
							}
						}
					});
				},
				showPicker: function() {
					return this.each( function () {
						if ($(this).data('colorpickerId')) {
							show.apply(this);
						}
					});
				},
				hidePicker: function() {
					return this.each( function () {
						if ($(this).data('colorpickerId')) {
							$('#' + $(this).data('colorpickerId')).hide();
						}
					});
				},
				setColor: function(col) {
					if (typeof col == 'string') {
						col = HexToHSB(col);
					} else if (col.r != undefined && col.g != undefined && col.b != undefined) {
						col = RGBToHSB(col);
					} else if (col.h != undefined && col.s != undefined && col.b != undefined) {
						col = fixHSB(col);
					} else {
						return this;
					}
					return this.each(function(){
						if ($(this).data('colorpickerId')) {
							var cal = $('#' + $(this).data('colorpickerId'));
							cal.data('colorpicker').color = col;
							cal.data('colorpicker').origColor = col;
							fillRGBFields(col, cal.get(0));
							fillHSBFields(col, cal.get(0));
							fillHexFields(col, cal.get(0));
							setHue(col, cal.get(0));
							setSelector(col, cal.get(0));
							setCurrentColor(col, cal.get(0));
							setNewColor(col, cal.get(0));
						}
					});
				}
			};
		}();
		$.fn.extend({
			ColorPicker: ColorPicker.init,
			ColorPickerHide: ColorPicker.hidePicker,
			ColorPickerShow: ColorPicker.showPicker,
			ColorPickerSetColor: ColorPicker.setColor
		});
	})(jQuery)

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_72__;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class='head'><span><%= get(\"name\") %></span></div>\n<div class='options'>\n  <div class='inputs'></div>\n  <div class='center'></div>\n  <div class='outputs'></div>\n</div>\n";

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ul id=\"node-context-menu\" class=\"context-menu\">\n  <li><a href=\"#remove_node\">Remove node</a></li>\n</ul>";

/***/ },
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
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */
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


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, FieldButton, _, _view_field_context_menu, _view_node_field_in, _view_node_field_out,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	_view_node_field_in = __webpack_require__(96);
	
	_view_node_field_out = __webpack_require__(97);
	
	_view_field_context_menu = __webpack_require__(98);
	
	__webpack_require__(34);
	
	__webpack_require__(51);
	
	
	/* FieldButton View */
	
	FieldButton = (function(superClass) {
	  extend(FieldButton, superClass);
	
	  function FieldButton() {
	    this.render = bind(this.render, this);
	    this.makeElement = bind(this.makeElement, this);
	    this.remove = bind(this.remove, this);
	    return FieldButton.__super__.constructor.apply(this, arguments);
	  }
	
	  FieldButton.prototype.className = "field";
	
	  FieldButton.prototype.initialize = function(options) {
	    FieldButton.__super__.initialize.apply(this, arguments);
	    this.makeElement();
	    return this.render();
	  };
	
	  FieldButton.prototype.remove = function() {
	    var $inner;
	    $inner = $(".inner-field", this.$el);
	    if ($inner.data("droppable")) {
	      $inner.droppable("destroy");
	    }
	    if ($inner.data("draggable")) {
	      $inner.draggable("destroy");
	    }
	    $inner.remove();
	    return FieldButton.__super__.remove.apply(this, arguments);
	  };
	
	  FieldButton.prototype.makeElement = function() {
	    var bt, layout;
	    layout = this.model.get("is_output") ? _view_node_field_out : _view_node_field_in;
	    bt = _.template(layout, {
	      fid: this.model.get("fid"),
	      name: this.model.get("name")
	    });
	    return this.$el.html(bt);
	  };
	
	  FieldButton.prototype.render = function() {
	    this.$el.attr("rel", this.model.get("name"));
	    this.$el.addClass("field-" + this.model.get("name"));
	    this.$el.data("object", this.model);
	    this.$el.data("fid", this.model.get("fid"));
	    this.initContextMenu();
	    return this.addFieldListener();
	  };
	
	  FieldButton.prototype.initContextMenu = function() {
	    var menu_field_menu;
	    if ($("#field-context-menu").length < 1) {
	      menu_field_menu = _.template(_view_field_context_menu, {});
	      $("body").append(menu_field_menu);
	    }
	    this.$el.contextMenu({
	      menu: "field-context-menu"
	    }, (function(_this) {
	      return function(action, el, pos) {
	        if (action === "removeConnection") {
	          return _this.model.removeConnections();
	        }
	      };
	    })(this));
	    return this;
	  };
	
	  FieldButton.prototype.addFieldListener = function() {
	    var accept_class, field, getPath, highlight_possible_targets, self, start_offset_x, start_offset_y;
	    self = this;
	    field = this.model;
	    start_offset_x = 0;
	    start_offset_y = 0;
	    getPath = function(start, end, offset) {
	      var ofx, ofy;
	      ofx = $("#container-wrapper").scrollLeft();
	      ofy = $("#container-wrapper").scrollTop();
	      return "M" + (start.left + offset.left + 2) + " " + (start.top + offset.top + 2) + " L" + (end.left + offset.left + ofx - start_offset_x) + " " + (end.top + offset.top + ofy - start_offset_y);
	    };
	    highlight_possible_targets = function() {
	      var target;
	      target = ".outputs .field";
	      if (field.get("is_output") === true) {
	        target = ".inputs .field";
	      }
	      return $(target).filter(function() {
	        return $(this).parent().parent().parent().data("nid") !== field.node.get("nid");
	      }).addClass("field-possible-target");
	    };
	    $(".inner-field", this.$el).draggable({
	      helper: function() {
	        return $("<div class='ui-widget-drag-helper'></div>");
	      },
	      scroll: true,
	      cursor: 'pointer',
	      cursorAt: {
	        left: 0,
	        top: 0
	      },
	      start: function(event, ui) {
	        start_offset_x = $("#container-wrapper").scrollLeft();
	        start_offset_y = $("#container-wrapper").scrollTop();
	        highlight_possible_targets();
	        if (ThreeNodes.UI.UIView.connecting_line) {
	          return ThreeNodes.UI.UIView.connecting_line.attr({
	            opacity: 1
	          });
	        }
	      },
	      stop: function(event, ui) {
	        $(".field").removeClass("field-possible-target");
	        if (ThreeNodes.UI.UIView.connecting_line) {
	          return ThreeNodes.UI.UIView.connecting_line.attr({
	            opacity: 0
	          });
	        }
	      },
	      drag: function(event, ui) {
	        var node_pos, pos;
	        if (ThreeNodes.UI.UIView.connecting_line) {
	          pos = $(this).position();
	          node_pos = {
	            left: field.node.get("x"),
	            top: field.node.get("y")
	          };
	          ThreeNodes.UI.UIView.connecting_line.attr({
	            path: getPath(pos, ui.position, node_pos)
	          });
	          return true;
	        }
	      }
	    });
	    accept_class = ".outputs .inner-field";
	    if (field && field.get("is_output") === true) {
	      accept_class = ".inputs .inner-field";
	    }
	    $(".inner-field", this.$el).droppable({
	      accept: accept_class,
	      activeClass: "ui-state-active",
	      hoverClass: "ui-state-hover",
	      drop: function(event, ui) {
	        var field2, origin;
	        origin = $(ui.draggable).parent();
	        field2 = origin.data("object");
	        if (field.node.parent) {
	          return field2.node.createConnection(field, field2);
	        } else {
	          return field.node.createConnection(field, field2);
	        }
	      }
	    });
	    return this;
	  };
	
	  return FieldButton;
	
	})(Backbone.View);
	
	module.exports = FieldButton;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	// This is CodeMirror (http://codemirror.net), a code editor
	// implemented in JavaScript on top of the browser's DOM.
	//
	// You can find some technical background for some of the code below
	// at http://marijnhaverbeke.nl/blog/#cm-internals .
	
	(function(mod) {
	  if (true) // CommonJS
	    module.exports = mod();
	  else if (typeof define == "function" && define.amd) // AMD
	    return define([], mod);
	  else // Plain browser env
	    this.CodeMirror = mod();
	})(function() {
	  "use strict";
	
	  // BROWSER SNIFFING
	
	  // Kludges for bugs and behavior differences that can't be feature
	  // detected are enabled based on userAgent etc sniffing.
	
	  var gecko = /gecko\/\d/i.test(navigator.userAgent);
	  // ie_uptoN means Internet Explorer version N or lower
	  var ie_upto10 = /MSIE \d/.test(navigator.userAgent);
	  var ie_upto7 = ie_upto10 && (document.documentMode == null || document.documentMode < 8);
	  var ie_upto8 = ie_upto10 && (document.documentMode == null || document.documentMode < 9);
	  var ie_upto9 = ie_upto10 && (document.documentMode == null || document.documentMode < 10);
	  var ie_11up = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent);
	  var ie = ie_upto10 || ie_11up;
	  var webkit = /WebKit\//.test(navigator.userAgent);
	  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(navigator.userAgent);
	  var chrome = /Chrome\//.test(navigator.userAgent);
	  var presto = /Opera\//.test(navigator.userAgent);
	  var safari = /Apple Computer/.test(navigator.vendor);
	  var khtml = /KHTML\//.test(navigator.userAgent);
	  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
	  var phantom = /PhantomJS/.test(navigator.userAgent);
	
	  var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
	  // This is woefully incomplete. Suggestions for alternative methods welcome.
	  var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
	  var mac = ios || /Mac/.test(navigator.platform);
	  var windows = /win/i.test(navigator.platform);
	
	  var presto_version = presto && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
	  if (presto_version) presto_version = Number(presto_version[1]);
	  if (presto_version && presto_version >= 15) { presto = false; webkit = true; }
	  // Some browsers use the wrong event properties to signal cmd/ctrl on OS X
	  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
	  var captureRightClick = gecko || (ie && !ie_upto8);
	
	  // Optimize some code when these features are not used.
	  var sawReadOnlySpans = false, sawCollapsedSpans = false;
	
	  // EDITOR CONSTRUCTOR
	
	  // A CodeMirror instance represents an editor. This is the object
	  // that user code is usually dealing with.
	
	  function CodeMirror(place, options) {
	    if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);
	
	    this.options = options = options || {};
	    // Determine effective options based on given values and defaults.
	    copyObj(defaults, options, false);
	    setGuttersForLineNumbers(options);
	
	    var doc = options.value;
	    if (typeof doc == "string") doc = new Doc(doc, options.mode);
	    this.doc = doc;
	
	    var display = this.display = new Display(place, doc);
	    display.wrapper.CodeMirror = this;
	    updateGutters(this);
	    themeChanged(this);
	    if (options.lineWrapping)
	      this.display.wrapper.className += " CodeMirror-wrap";
	    if (options.autofocus && !mobile) focusInput(this);
	
	    this.state = {
	      keyMaps: [],  // stores maps added by addKeyMap
	      overlays: [], // highlighting overlays, as added by addOverlay
	      modeGen: 0,   // bumped when mode/overlay changes, used to invalidate highlighting info
	      overwrite: false, focused: false,
	      suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
	      pasteIncoming: false, cutIncoming: false, // help recognize paste/cut edits in readInput
	      draggingText: false,
	      highlight: new Delayed() // stores highlight worker timeout
	    };
	
	    // Override magic textarea content restore that IE sometimes does
	    // on our hidden textarea on reload
	    if (ie_upto10) setTimeout(bind(resetInput, this, true), 20);
	
	    registerEventHandlers(this);
	    ensureGlobalHandlers();
	
	    var cm = this;
	    runInOp(this, function() {
	      cm.curOp.forceUpdate = true;
	      attachDoc(cm, doc);
	
	      if ((options.autofocus && !mobile) || activeElt() == display.input)
	        setTimeout(bind(onFocus, cm), 20);
	      else
	        onBlur(cm);
	
	      for (var opt in optionHandlers) if (optionHandlers.hasOwnProperty(opt))
	        optionHandlers[opt](cm, options[opt], Init);
	      for (var i = 0; i < initHooks.length; ++i) initHooks[i](cm);
	    });
	  }
	
	  // DISPLAY CONSTRUCTOR
	
	  // The display handles the DOM integration, both for input reading
	  // and content drawing. It holds references to DOM nodes and
	  // display-related state.
	
	  function Display(place, doc) {
	    var d = this;
	
	    // The semihidden textarea that is focused when the editor is
	    // focused, and receives input.
	    var input = d.input = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
	    // The textarea is kept positioned near the cursor to prevent the
	    // fact that it'll be scrolled into view on input from scrolling
	    // our fake cursor out of view. On webkit, when wrap=off, paste is
	    // very slow. So make the area wide instead.
	    if (webkit) input.style.width = "1000px";
	    else input.setAttribute("wrap", "off");
	    // If border: 0; -- iOS fails to open keyboard (issue #1287)
	    if (ios) input.style.border = "1px solid black";
	    input.setAttribute("autocorrect", "off"); input.setAttribute("autocapitalize", "off"); input.setAttribute("spellcheck", "false");
	
	    // Wraps and hides input textarea
	    d.inputDiv = elt("div", [input], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
	    // The fake scrollbar elements.
	    d.scrollbarH = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
	    d.scrollbarV = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
	    // Covers bottom-right square when both scrollbars are present.
	    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
	    // Covers bottom of gutter when coverGutterNextToScrollbar is on
	    // and h scrollbar is present.
	    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
	    // Will contain the actual code, positioned to cover the viewport.
	    d.lineDiv = elt("div", null, "CodeMirror-code");
	    // Elements are added to these to represent selection and cursors.
	    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
	    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
	    // A visibility: hidden element used to find the size of things.
	    d.measure = elt("div", null, "CodeMirror-measure");
	    // When lines outside of the viewport are measured, they are drawn in this.
	    d.lineMeasure = elt("div", null, "CodeMirror-measure");
	    // Wraps everything that needs to exist inside the vertically-padded coordinate system
	    d.lineSpace = elt("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
	                      null, "position: relative; outline: none");
	    // Moved around its parent to cover visible view.
	    d.mover = elt("div", [elt("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative");
	    // Set to the height of the document, allowing scrolling.
	    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
	    // Behavior of elts with overflow: auto and padding is
	    // inconsistent across browsers. This is used to ensure the
	    // scrollable area is big enough.
	    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerCutOff + "px; width: 1px;");
	    // Will contain the gutters, if any.
	    d.gutters = elt("div", null, "CodeMirror-gutters");
	    d.lineGutter = null;
	    // Actual scrollable element.
	    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
	    d.scroller.setAttribute("tabIndex", "-1");
	    // The element in which the editor lives.
	    d.wrapper = elt("div", [d.inputDiv, d.scrollbarH, d.scrollbarV,
	                            d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
	
	    // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
	    if (ie_upto7) { d.gutters.style.zIndex = -1; d.scroller.style.paddingRight = 0; }
	    // Needed to hide big blue blinking cursor on Mobile Safari
	    if (ios) input.style.width = "0px";
	    if (!webkit) d.scroller.draggable = true;
	    // Needed to handle Tab key in KHTML
	    if (khtml) { d.inputDiv.style.height = "1px"; d.inputDiv.style.position = "absolute"; }
	    // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
	    if (ie_upto7) d.scrollbarH.style.minHeight = d.scrollbarV.style.minWidth = "18px";
	
	    if (place.appendChild) place.appendChild(d.wrapper);
	    else place(d.wrapper);
	
	    // Current rendered range (may be bigger than the view window).
	    d.viewFrom = d.viewTo = doc.first;
	    // Information about the rendered lines.
	    d.view = [];
	    // Holds info about a single rendered line when it was rendered
	    // for measurement, while not in view.
	    d.externalMeasured = null;
	    // Empty space (in pixels) above the view
	    d.viewOffset = 0;
	    d.lastSizeC = 0;
	    d.updateLineNumbers = null;
	
	    // Used to only resize the line number gutter when necessary (when
	    // the amount of lines crosses a boundary that makes its width change)
	    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
	    // See readInput and resetInput
	    d.prevInput = "";
	    // Set to true when a non-horizontal-scrolling line widget is
	    // added. As an optimization, line widget aligning is skipped when
	    // this is false.
	    d.alignWidgets = false;
	    // Flag that indicates whether we expect input to appear real soon
	    // now (after some event like 'keypress' or 'input') and are
	    // polling intensively.
	    d.pollingFast = false;
	    // Self-resetting timeout for the poller
	    d.poll = new Delayed();
	
	    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
	
	    // Tracks when resetInput has punted to just putting a short
	    // string into the textarea instead of the full selection.
	    d.inaccurateSelection = false;
	
	    // Tracks the maximum line length so that the horizontal scrollbar
	    // can be kept static when scrolling.
	    d.maxLine = null;
	    d.maxLineLength = 0;
	    d.maxLineChanged = false;
	
	    // Used for measuring wheel scrolling granularity
	    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
	
	    // True when shift is held down.
	    d.shift = false;
	
	    // Used to track whether anything happened since the context menu
	    // was opened.
	    d.selForContextMenu = null;
	  }
	
	  // STATE UPDATES
	
	  // Used to get the editor into a consistent state again when options change.
	
	  function loadMode(cm) {
	    cm.doc.mode = CodeMirror.getMode(cm.options, cm.doc.modeOption);
	    resetModeState(cm);
	  }
	
	  function resetModeState(cm) {
	    cm.doc.iter(function(line) {
	      if (line.stateAfter) line.stateAfter = null;
	      if (line.styles) line.styles = null;
	    });
	    cm.doc.frontier = cm.doc.first;
	    startWorker(cm, 100);
	    cm.state.modeGen++;
	    if (cm.curOp) regChange(cm);
	  }
	
	  function wrappingChanged(cm) {
	    if (cm.options.lineWrapping) {
	      addClass(cm.display.wrapper, "CodeMirror-wrap");
	      cm.display.sizer.style.minWidth = "";
	    } else {
	      rmClass(cm.display.wrapper, "CodeMirror-wrap");
	      findMaxLine(cm);
	    }
	    estimateLineHeights(cm);
	    regChange(cm);
	    clearCaches(cm);
	    setTimeout(function(){updateScrollbars(cm);}, 100);
	  }
	
	  // Returns a function that estimates the height of a line, to use as
	  // first approximation until the line becomes visible (and is thus
	  // properly measurable).
	  function estimateHeight(cm) {
	    var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
	    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
	    return function(line) {
	      if (lineIsHidden(cm.doc, line)) return 0;
	
	      var widgetsHeight = 0;
	      if (line.widgets) for (var i = 0; i < line.widgets.length; i++) {
	        if (line.widgets[i].height) widgetsHeight += line.widgets[i].height;
	      }
	
	      if (wrapping)
	        return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
	      else
	        return widgetsHeight + th;
	    };
	  }
	
	  function estimateLineHeights(cm) {
	    var doc = cm.doc, est = estimateHeight(cm);
	    doc.iter(function(line) {
	      var estHeight = est(line);
	      if (estHeight != line.height) updateLineHeight(line, estHeight);
	    });
	  }
	
	  function keyMapChanged(cm) {
	    var map = keyMap[cm.options.keyMap], style = map.style;
	    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") +
	      (style ? " cm-keymap-" + style : "");
	  }
	
	  function themeChanged(cm) {
	    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
	      cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
	    clearCaches(cm);
	  }
	
	  function guttersChanged(cm) {
	    updateGutters(cm);
	    regChange(cm);
	    setTimeout(function(){alignHorizontally(cm);}, 20);
	  }
	
	  // Rebuild the gutter elements, ensure the margin to the left of the
	  // code matches their width.
	  function updateGutters(cm) {
	    var gutters = cm.display.gutters, specs = cm.options.gutters;
	    removeChildren(gutters);
	    for (var i = 0; i < specs.length; ++i) {
	      var gutterClass = specs[i];
	      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
	      if (gutterClass == "CodeMirror-linenumbers") {
	        cm.display.lineGutter = gElt;
	        gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
	      }
	    }
	    gutters.style.display = i ? "" : "none";
	    updateGutterSpace(cm);
	  }
	
	  function updateGutterSpace(cm) {
	    var width = cm.display.gutters.offsetWidth;
	    cm.display.sizer.style.marginLeft = width + "px";
	    cm.display.scrollbarH.style.left = cm.options.fixedGutter ? width + "px" : 0;
	  }
	
	  // Compute the character length of a line, taking into account
	  // collapsed ranges (see markText) that might hide parts, and join
	  // other lines onto it.
	  function lineLength(line) {
	    if (line.height == 0) return 0;
	    var len = line.text.length, merged, cur = line;
	    while (merged = collapsedSpanAtStart(cur)) {
	      var found = merged.find(0, true);
	      cur = found.from.line;
	      len += found.from.ch - found.to.ch;
	    }
	    cur = line;
	    while (merged = collapsedSpanAtEnd(cur)) {
	      var found = merged.find(0, true);
	      len -= cur.text.length - found.from.ch;
	      cur = found.to.line;
	      len += cur.text.length - found.to.ch;
	    }
	    return len;
	  }
	
	  // Find the longest line in the document.
	  function findMaxLine(cm) {
	    var d = cm.display, doc = cm.doc;
	    d.maxLine = getLine(doc, doc.first);
	    d.maxLineLength = lineLength(d.maxLine);
	    d.maxLineChanged = true;
	    doc.iter(function(line) {
	      var len = lineLength(line);
	      if (len > d.maxLineLength) {
	        d.maxLineLength = len;
	        d.maxLine = line;
	      }
	    });
	  }
	
	  // Make sure the gutters options contains the element
	  // "CodeMirror-linenumbers" when the lineNumbers option is true.
	  function setGuttersForLineNumbers(options) {
	    var found = indexOf(options.gutters, "CodeMirror-linenumbers");
	    if (found == -1 && options.lineNumbers) {
	      options.gutters = options.gutters.concat(["CodeMirror-linenumbers"]);
	    } else if (found > -1 && !options.lineNumbers) {
	      options.gutters = options.gutters.slice(0);
	      options.gutters.splice(found, 1);
	    }
	  }
	
	  // SCROLLBARS
	
	  // Prepare DOM reads needed to update the scrollbars. Done in one
	  // shot to minimize update/measure roundtrips.
	  function measureForScrollbars(cm) {
	    var scroll = cm.display.scroller;
	    return {
	      clientHeight: scroll.clientHeight,
	      barHeight: cm.display.scrollbarV.clientHeight,
	      scrollWidth: scroll.scrollWidth, clientWidth: scroll.clientWidth,
	      barWidth: cm.display.scrollbarH.clientWidth,
	      docHeight: Math.round(cm.doc.height + paddingVert(cm.display))
	    };
	  }
	
	  // Re-synchronize the fake scrollbars with the actual size of the
	  // content.
	  function updateScrollbars(cm, measure) {
	    if (!measure) measure = measureForScrollbars(cm);
	    var d = cm.display;
	    var scrollHeight = measure.docHeight + scrollerCutOff;
	    var needsH = measure.scrollWidth > measure.clientWidth;
	    var needsV = scrollHeight > measure.clientHeight;
	    if (needsV) {
	      d.scrollbarV.style.display = "block";
	      d.scrollbarV.style.bottom = needsH ? scrollbarWidth(d.measure) + "px" : "0";
	      // A bug in IE8 can cause this value to be negative, so guard it.
	      d.scrollbarV.firstChild.style.height =
	        Math.max(0, scrollHeight - measure.clientHeight + (measure.barHeight || d.scrollbarV.clientHeight)) + "px";
	    } else {
	      d.scrollbarV.style.display = "";
	      d.scrollbarV.firstChild.style.height = "0";
	    }
	    if (needsH) {
	      d.scrollbarH.style.display = "block";
	      d.scrollbarH.style.right = needsV ? scrollbarWidth(d.measure) + "px" : "0";
	      d.scrollbarH.firstChild.style.width =
	        (measure.scrollWidth - measure.clientWidth + (measure.barWidth || d.scrollbarH.clientWidth)) + "px";
	    } else {
	      d.scrollbarH.style.display = "";
	      d.scrollbarH.firstChild.style.width = "0";
	    }
	    if (needsH && needsV) {
	      d.scrollbarFiller.style.display = "block";
	      d.scrollbarFiller.style.height = d.scrollbarFiller.style.width = scrollbarWidth(d.measure) + "px";
	    } else d.scrollbarFiller.style.display = "";
	    if (needsH && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
	      d.gutterFiller.style.display = "block";
	      d.gutterFiller.style.height = scrollbarWidth(d.measure) + "px";
	      d.gutterFiller.style.width = d.gutters.offsetWidth + "px";
	    } else d.gutterFiller.style.display = "";
	
	    if (!cm.state.checkedOverlayScrollbar && measure.clientHeight > 0) {
	      if (scrollbarWidth(d.measure) === 0) {
	        var w = mac && !mac_geMountainLion ? "12px" : "18px";
	        d.scrollbarV.style.minWidth = d.scrollbarH.style.minHeight = w;
	        var barMouseDown = function(e) {
	          if (e_target(e) != d.scrollbarV && e_target(e) != d.scrollbarH)
	            operation(cm, onMouseDown)(e);
	        };
	        on(d.scrollbarV, "mousedown", barMouseDown);
	        on(d.scrollbarH, "mousedown", barMouseDown);
	      }
	      cm.state.checkedOverlayScrollbar = true;
	    }
	  }
	
	  // Compute the lines that are visible in a given viewport (defaults
	  // the the current scroll position). viewPort may contain top,
	  // height, and ensure (see op.scrollToPos) properties.
	  function visibleLines(display, doc, viewPort) {
	    var top = viewPort && viewPort.top != null ? Math.max(0, viewPort.top) : display.scroller.scrollTop;
	    top = Math.floor(top - paddingTop(display));
	    var bottom = viewPort && viewPort.bottom != null ? viewPort.bottom : top + display.wrapper.clientHeight;
	
	    var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
	    // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
	    // forces those lines into the viewport (if possible).
	    if (viewPort && viewPort.ensure) {
	      var ensureFrom = viewPort.ensure.from.line, ensureTo = viewPort.ensure.to.line;
	      if (ensureFrom < from)
	        return {from: ensureFrom,
	                to: lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight)};
	      if (Math.min(ensureTo, doc.lastLine()) >= to)
	        return {from: lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight),
	                to: ensureTo};
	    }
	    return {from: from, to: Math.max(to, from + 1)};
	  }
	
	  // LINE NUMBERS
	
	  // Re-align line numbers and gutter marks to compensate for
	  // horizontal scrolling.
	  function alignHorizontally(cm) {
	    var display = cm.display, view = display.view;
	    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) return;
	    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
	    var gutterW = display.gutters.offsetWidth, left = comp + "px";
	    for (var i = 0; i < view.length; i++) if (!view[i].hidden) {
	      if (cm.options.fixedGutter && view[i].gutter)
	        view[i].gutter.style.left = left;
	      var align = view[i].alignable;
	      if (align) for (var j = 0; j < align.length; j++)
	        align[j].style.left = left;
	    }
	    if (cm.options.fixedGutter)
	      display.gutters.style.left = (comp + gutterW) + "px";
	  }
	
	  // Used to ensure that the line number gutter is still the right
	  // size for the current document size. Returns true when an update
	  // is needed.
	  function maybeUpdateLineNumberWidth(cm) {
	    if (!cm.options.lineNumbers) return false;
	    var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
	    if (last.length != display.lineNumChars) {
	      var test = display.measure.appendChild(elt("div", [elt("div", last)],
	                                                 "CodeMirror-linenumber CodeMirror-gutter-elt"));
	      var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
	      display.lineGutter.style.width = "";
	      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding);
	      display.lineNumWidth = display.lineNumInnerWidth + padding;
	      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
	      display.lineGutter.style.width = display.lineNumWidth + "px";
	      updateGutterSpace(cm);
	      return true;
	    }
	    return false;
	  }
	
	  function lineNumberFor(options, i) {
	    return String(options.lineNumberFormatter(i + options.firstLineNumber));
	  }
	
	  // Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
	  // but using getBoundingClientRect to get a sub-pixel-accurate
	  // result.
	  function compensateForHScroll(display) {
	    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
	  }
	
	  // DISPLAY DRAWING
	
	  // Updates the display, selection, and scrollbars, using the
	  // information in display.view to find out which nodes are no longer
	  // up-to-date. Tries to bail out early when no changes are needed,
	  // unless forced is true.
	  // Returns true if an actual update happened, false otherwise.
	  function updateDisplay(cm, viewPort, forced) {
	    var oldFrom = cm.display.viewFrom, oldTo = cm.display.viewTo, updated;
	    var visible = visibleLines(cm.display, cm.doc, viewPort);
	    for (var first = true;; first = false) {
	      var oldWidth = cm.display.scroller.clientWidth;
	      if (!updateDisplayInner(cm, visible, forced)) break;
	      updated = true;
	
	      // If the max line changed since it was last measured, measure it,
	      // and ensure the document's width matches it.
	      if (cm.display.maxLineChanged && !cm.options.lineWrapping)
	        adjustContentWidth(cm);
	
	      var barMeasure = measureForScrollbars(cm);
	      updateSelection(cm);
	      setDocumentHeight(cm, barMeasure);
	      updateScrollbars(cm, barMeasure);
	      if (webkit && cm.options.lineWrapping)
	        checkForWebkitWidthBug(cm, barMeasure); // (Issue #2420)
	      if (first && cm.options.lineWrapping && oldWidth != cm.display.scroller.clientWidth) {
	        forced = true;
	        continue;
	      }
	      forced = false;
	
	      // Clip forced viewport to actual scrollable area.
	      if (viewPort && viewPort.top != null)
	        viewPort = {top: Math.min(barMeasure.docHeight - scrollerCutOff - barMeasure.clientHeight, viewPort.top)};
	      // Updated line heights might result in the drawn area not
	      // actually covering the viewport. Keep looping until it does.
	      visible = visibleLines(cm.display, cm.doc, viewPort);
	      if (visible.from >= cm.display.viewFrom && visible.to <= cm.display.viewTo)
	        break;
	    }
	
	    cm.display.updateLineNumbers = null;
	    if (updated) {
	      signalLater(cm, "update", cm);
	      if (cm.display.viewFrom != oldFrom || cm.display.viewTo != oldTo)
	        signalLater(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
	    }
	    return updated;
	  }
	
	  // Does the actual updating of the line display. Bails out
	  // (returning false) when there is nothing to be done and forced is
	  // false.
	  function updateDisplayInner(cm, visible, forced) {
	    var display = cm.display, doc = cm.doc;
	    if (!display.wrapper.offsetWidth) {
	      resetView(cm);
	      return;
	    }
	
	    // Bail out if the visible area is already rendered and nothing changed.
	    if (!forced && visible.from >= display.viewFrom && visible.to <= display.viewTo &&
	        countDirtyView(cm) == 0)
	      return;
	
	    if (maybeUpdateLineNumberWidth(cm))
	      resetView(cm);
	    var dims = getDimensions(cm);
	
	    // Compute a suitable new viewport (from & to)
	    var end = doc.first + doc.size;
	    var from = Math.max(visible.from - cm.options.viewportMargin, doc.first);
	    var to = Math.min(end, visible.to + cm.options.viewportMargin);
	    if (display.viewFrom < from && from - display.viewFrom < 20) from = Math.max(doc.first, display.viewFrom);
	    if (display.viewTo > to && display.viewTo - to < 20) to = Math.min(end, display.viewTo);
	    if (sawCollapsedSpans) {
	      from = visualLineNo(cm.doc, from);
	      to = visualLineEndNo(cm.doc, to);
	    }
	
	    var different = from != display.viewFrom || to != display.viewTo ||
	      display.lastSizeC != display.wrapper.clientHeight;
	    adjustView(cm, from, to);
	
	    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
	    // Position the mover div to align with the current scroll position
	    cm.display.mover.style.top = display.viewOffset + "px";
	
	    var toUpdate = countDirtyView(cm);
	    if (!different && toUpdate == 0 && !forced) return;
	
	    // For big changes, we hide the enclosing element during the
	    // update, since that speeds up the operations on most browsers.
	    var focused = activeElt();
	    if (toUpdate > 4) display.lineDiv.style.display = "none";
	    patchDisplay(cm, display.updateLineNumbers, dims);
	    if (toUpdate > 4) display.lineDiv.style.display = "";
	    // There might have been a widget with a focused element that got
	    // hidden or updated, if so re-focus it.
	    if (focused && activeElt() != focused && focused.offsetHeight) focused.focus();
	
	    // Prevent selection and cursors from interfering with the scroll
	    // width.
	    removeChildren(display.cursorDiv);
	    removeChildren(display.selectionDiv);
	
	    if (different) {
	      display.lastSizeC = display.wrapper.clientHeight;
	      startWorker(cm, 400);
	    }
	
	    updateHeightsInViewport(cm);
	
	    return true;
	  }
	
	  function adjustContentWidth(cm) {
	    var display = cm.display;
	    var width = measureChar(cm, display.maxLine, display.maxLine.text.length).left;
	    display.maxLineChanged = false;
	    var minWidth = Math.max(0, width + 3);
	    var maxScrollLeft = Math.max(0, display.sizer.offsetLeft + minWidth + scrollerCutOff - display.scroller.clientWidth);
	    display.sizer.style.minWidth = minWidth + "px";
	    if (maxScrollLeft < cm.doc.scrollLeft)
	      setScrollLeft(cm, Math.min(display.scroller.scrollLeft, maxScrollLeft), true);
	  }
	
	  function setDocumentHeight(cm, measure) {
	    cm.display.sizer.style.minHeight = cm.display.heightForcer.style.top = measure.docHeight + "px";
	    cm.display.gutters.style.height = Math.max(measure.docHeight, measure.clientHeight - scrollerCutOff) + "px";
	  }
	
	  function checkForWebkitWidthBug(cm, measure) {
	    // Work around Webkit bug where it sometimes reserves space for a
	    // non-existing phantom scrollbar in the scroller (Issue #2420)
	    if (cm.display.sizer.offsetWidth + cm.display.gutters.offsetWidth < cm.display.scroller.clientWidth - 1) {
	      cm.display.sizer.style.minHeight = cm.display.heightForcer.style.top = "0px";
	      cm.display.gutters.style.height = measure.docHeight + "px";
	    }
	  }
	
	  // Read the actual heights of the rendered lines, and update their
	  // stored heights to match.
	  function updateHeightsInViewport(cm) {
	    var display = cm.display;
	    var prevBottom = display.lineDiv.offsetTop;
	    for (var i = 0; i < display.view.length; i++) {
	      var cur = display.view[i], height;
	      if (cur.hidden) continue;
	      if (ie_upto7) {
	        var bot = cur.node.offsetTop + cur.node.offsetHeight;
	        height = bot - prevBottom;
	        prevBottom = bot;
	      } else {
	        var box = cur.node.getBoundingClientRect();
	        height = box.bottom - box.top;
	      }
	      var diff = cur.line.height - height;
	      if (height < 2) height = textHeight(display);
	      if (diff > .001 || diff < -.001) {
	        updateLineHeight(cur.line, height);
	        updateWidgetHeight(cur.line);
	        if (cur.rest) for (var j = 0; j < cur.rest.length; j++)
	          updateWidgetHeight(cur.rest[j]);
	      }
	    }
	  }
	
	  // Read and store the height of line widgets associated with the
	  // given line.
	  function updateWidgetHeight(line) {
	    if (line.widgets) for (var i = 0; i < line.widgets.length; ++i)
	      line.widgets[i].height = line.widgets[i].node.offsetHeight;
	  }
	
	  // Do a bulk-read of the DOM positions and sizes needed to draw the
	  // view, so that we don't interleave reading and writing to the DOM.
	  function getDimensions(cm) {
	    var d = cm.display, left = {}, width = {};
	    for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
	      left[cm.options.gutters[i]] = n.offsetLeft;
	      width[cm.options.gutters[i]] = n.offsetWidth;
	    }
	    return {fixedPos: compensateForHScroll(d),
	            gutterTotalWidth: d.gutters.offsetWidth,
	            gutterLeft: left,
	            gutterWidth: width,
	            wrapperWidth: d.wrapper.clientWidth};
	  }
	
	  // Sync the actual display DOM structure with display.view, removing
	  // nodes for lines that are no longer in view, and creating the ones
	  // that are not there yet, and updating the ones that are out of
	  // date.
	  function patchDisplay(cm, updateNumbersFrom, dims) {
	    var display = cm.display, lineNumbers = cm.options.lineNumbers;
	    var container = display.lineDiv, cur = container.firstChild;
	
	    function rm(node) {
	      var next = node.nextSibling;
	      // Works around a throw-scroll bug in OS X Webkit
	      if (webkit && mac && cm.display.currentWheelTarget == node)
	        node.style.display = "none";
	      else
	        node.parentNode.removeChild(node);
	      return next;
	    }
	
	    var view = display.view, lineN = display.viewFrom;
	    // Loop over the elements in the view, syncing cur (the DOM nodes
	    // in display.lineDiv) with the view as we go.
	    for (var i = 0; i < view.length; i++) {
	      var lineView = view[i];
	      if (lineView.hidden) {
	      } else if (!lineView.node) { // Not drawn yet
	        var node = buildLineElement(cm, lineView, lineN, dims);
	        container.insertBefore(node, cur);
	      } else { // Already drawn
	        while (cur != lineView.node) cur = rm(cur);
	        var updateNumber = lineNumbers && updateNumbersFrom != null &&
	          updateNumbersFrom <= lineN && lineView.lineNumber;
	        if (lineView.changes) {
	          if (indexOf(lineView.changes, "gutter") > -1) updateNumber = false;
	          updateLineForChanges(cm, lineView, lineN, dims);
	        }
	        if (updateNumber) {
	          removeChildren(lineView.lineNumber);
	          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
	        }
	        cur = lineView.node.nextSibling;
	      }
	      lineN += lineView.size;
	    }
	    while (cur) cur = rm(cur);
	  }
	
	  // When an aspect of a line changes, a string is added to
	  // lineView.changes. This updates the relevant part of the line's
	  // DOM structure.
	  function updateLineForChanges(cm, lineView, lineN, dims) {
	    for (var j = 0; j < lineView.changes.length; j++) {
	      var type = lineView.changes[j];
	      if (type == "text") updateLineText(cm, lineView);
	      else if (type == "gutter") updateLineGutter(cm, lineView, lineN, dims);
	      else if (type == "class") updateLineClasses(lineView);
	      else if (type == "widget") updateLineWidgets(lineView, dims);
	    }
	    lineView.changes = null;
	  }
	
	  // Lines with gutter elements, widgets or a background class need to
	  // be wrapped, and have the extra elements added to the wrapper div
	  function ensureLineWrapped(lineView) {
	    if (lineView.node == lineView.text) {
	      lineView.node = elt("div", null, null, "position: relative");
	      if (lineView.text.parentNode)
	        lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
	      lineView.node.appendChild(lineView.text);
	      if (ie_upto7) lineView.node.style.zIndex = 2;
	    }
	    return lineView.node;
	  }
	
	  function updateLineBackground(lineView) {
	    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
	    if (cls) cls += " CodeMirror-linebackground";
	    if (lineView.background) {
	      if (cls) lineView.background.className = cls;
	      else { lineView.background.parentNode.removeChild(lineView.background); lineView.background = null; }
	    } else if (cls) {
	      var wrap = ensureLineWrapped(lineView);
	      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
	    }
	  }
	
	  // Wrapper around buildLineContent which will reuse the structure
	  // in display.externalMeasured when possible.
	  function getLineContent(cm, lineView) {
	    var ext = cm.display.externalMeasured;
	    if (ext && ext.line == lineView.line) {
	      cm.display.externalMeasured = null;
	      lineView.measure = ext.measure;
	      return ext.built;
	    }
	    return buildLineContent(cm, lineView);
	  }
	
	  // Redraw the line's text. Interacts with the background and text
	  // classes because the mode may output tokens that influence these
	  // classes.
	  function updateLineText(cm, lineView) {
	    var cls = lineView.text.className;
	    var built = getLineContent(cm, lineView);
	    if (lineView.text == lineView.node) lineView.node = built.pre;
	    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
	    lineView.text = built.pre;
	    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
	      lineView.bgClass = built.bgClass;
	      lineView.textClass = built.textClass;
	      updateLineClasses(lineView);
	    } else if (cls) {
	      lineView.text.className = cls;
	    }
	  }
	
	  function updateLineClasses(lineView) {
	    updateLineBackground(lineView);
	    if (lineView.line.wrapClass)
	      ensureLineWrapped(lineView).className = lineView.line.wrapClass;
	    else if (lineView.node != lineView.text)
	      lineView.node.className = "";
	    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
	    lineView.text.className = textClass || "";
	  }
	
	  function updateLineGutter(cm, lineView, lineN, dims) {
	    if (lineView.gutter) {
	      lineView.node.removeChild(lineView.gutter);
	      lineView.gutter = null;
	    }
	    var markers = lineView.line.gutterMarkers;
	    if (cm.options.lineNumbers || markers) {
	      var wrap = ensureLineWrapped(lineView);
	      var gutterWrap = lineView.gutter =
	        wrap.insertBefore(elt("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " +
	                              (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px"),
	                          lineView.text);
	      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"]))
	        lineView.lineNumber = gutterWrap.appendChild(
	          elt("div", lineNumberFor(cm.options, lineN),
	              "CodeMirror-linenumber CodeMirror-gutter-elt",
	              "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: "
	              + cm.display.lineNumInnerWidth + "px"));
	      if (markers) for (var k = 0; k < cm.options.gutters.length; ++k) {
	        var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
	        if (found)
	          gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " +
	                                     dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
	      }
	    }
	  }
	
	  function updateLineWidgets(lineView, dims) {
	    if (lineView.alignable) lineView.alignable = null;
	    for (var node = lineView.node.firstChild, next; node; node = next) {
	      var next = node.nextSibling;
	      if (node.className == "CodeMirror-linewidget")
	        lineView.node.removeChild(node);
	    }
	    insertLineWidgets(lineView, dims);
	  }
	
	  // Build a line's DOM representation from scratch
	  function buildLineElement(cm, lineView, lineN, dims) {
	    var built = getLineContent(cm, lineView);
	    lineView.text = lineView.node = built.pre;
	    if (built.bgClass) lineView.bgClass = built.bgClass;
	    if (built.textClass) lineView.textClass = built.textClass;
	
	    updateLineClasses(lineView);
	    updateLineGutter(cm, lineView, lineN, dims);
	    insertLineWidgets(lineView, dims);
	    return lineView.node;
	  }
	
	  // A lineView may contain multiple logical lines (when merged by
	  // collapsed spans). The widgets for all of them need to be drawn.
	  function insertLineWidgets(lineView, dims) {
	    insertLineWidgetsFor(lineView.line, lineView, dims, true);
	    if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++)
	      insertLineWidgetsFor(lineView.rest[i], lineView, dims, false);
	  }
	
	  function insertLineWidgetsFor(line, lineView, dims, allowAbove) {
	    if (!line.widgets) return;
	    var wrap = ensureLineWrapped(lineView);
	    for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
	      var widget = ws[i], node = elt("div", [widget.node], "CodeMirror-linewidget");
	      if (!widget.handleMouseEvents) node.ignoreEvents = true;
	      positionLineWidget(widget, node, lineView, dims);
	      if (allowAbove && widget.above)
	        wrap.insertBefore(node, lineView.gutter || lineView.text);
	      else
	        wrap.appendChild(node);
	      signalLater(widget, "redraw");
	    }
	  }
	
	  function positionLineWidget(widget, node, lineView, dims) {
	    if (widget.noHScroll) {
	      (lineView.alignable || (lineView.alignable = [])).push(node);
	      var width = dims.wrapperWidth;
	      node.style.left = dims.fixedPos + "px";
	      if (!widget.coverGutter) {
	        width -= dims.gutterTotalWidth;
	        node.style.paddingLeft = dims.gutterTotalWidth + "px";
	      }
	      node.style.width = width + "px";
	    }
	    if (widget.coverGutter) {
	      node.style.zIndex = 5;
	      node.style.position = "relative";
	      if (!widget.noHScroll) node.style.marginLeft = -dims.gutterTotalWidth + "px";
	    }
	  }
	
	  // POSITION OBJECT
	
	  // A Pos instance represents a position within the text.
	  var Pos = CodeMirror.Pos = function(line, ch) {
	    if (!(this instanceof Pos)) return new Pos(line, ch);
	    this.line = line; this.ch = ch;
	  };
	
	  // Compare two positions, return 0 if they are the same, a negative
	  // number when a is less, and a positive number otherwise.
	  var cmp = CodeMirror.cmpPos = function(a, b) { return a.line - b.line || a.ch - b.ch; };
	
	  function copyPos(x) {return Pos(x.line, x.ch);}
	  function maxPos(a, b) { return cmp(a, b) < 0 ? b : a; }
	  function minPos(a, b) { return cmp(a, b) < 0 ? a : b; }
	
	  // SELECTION / CURSOR
	
	  // Selection objects are immutable. A new one is created every time
	  // the selection changes. A selection is one or more non-overlapping
	  // (and non-touching) ranges, sorted, and an integer that indicates
	  // which one is the primary selection (the one that's scrolled into
	  // view, that getCursor returns, etc).
	  function Selection(ranges, primIndex) {
	    this.ranges = ranges;
	    this.primIndex = primIndex;
	  }
	
	  Selection.prototype = {
	    primary: function() { return this.ranges[this.primIndex]; },
	    equals: function(other) {
	      if (other == this) return true;
	      if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) return false;
	      for (var i = 0; i < this.ranges.length; i++) {
	        var here = this.ranges[i], there = other.ranges[i];
	        if (cmp(here.anchor, there.anchor) != 0 || cmp(here.head, there.head) != 0) return false;
	      }
	      return true;
	    },
	    deepCopy: function() {
	      for (var out = [], i = 0; i < this.ranges.length; i++)
	        out[i] = new Range(copyPos(this.ranges[i].anchor), copyPos(this.ranges[i].head));
	      return new Selection(out, this.primIndex);
	    },
	    somethingSelected: function() {
	      for (var i = 0; i < this.ranges.length; i++)
	        if (!this.ranges[i].empty()) return true;
	      return false;
	    },
	    contains: function(pos, end) {
	      if (!end) end = pos;
	      for (var i = 0; i < this.ranges.length; i++) {
	        var range = this.ranges[i];
	        if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0)
	          return i;
	      }
	      return -1;
	    }
	  };
	
	  function Range(anchor, head) {
	    this.anchor = anchor; this.head = head;
	  }
	
	  Range.prototype = {
	    from: function() { return minPos(this.anchor, this.head); },
	    to: function() { return maxPos(this.anchor, this.head); },
	    empty: function() {
	      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
	    }
	  };
	
	  // Take an unsorted, potentially overlapping set of ranges, and
	  // build a selection out of it. 'Consumes' ranges array (modifying
	  // it).
	  function normalizeSelection(ranges, primIndex) {
	    var prim = ranges[primIndex];
	    ranges.sort(function(a, b) { return cmp(a.from(), b.from()); });
	    primIndex = indexOf(ranges, prim);
	    for (var i = 1; i < ranges.length; i++) {
	      var cur = ranges[i], prev = ranges[i - 1];
	      if (cmp(prev.to(), cur.from()) >= 0) {
	        var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
	        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
	        if (i <= primIndex) --primIndex;
	        ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
	      }
	    }
	    return new Selection(ranges, primIndex);
	  }
	
	  function simpleSelection(anchor, head) {
	    return new Selection([new Range(anchor, head || anchor)], 0);
	  }
	
	  // Most of the external API clips given positions to make sure they
	  // actually exist within the document.
	  function clipLine(doc, n) {return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));}
	  function clipPos(doc, pos) {
	    if (pos.line < doc.first) return Pos(doc.first, 0);
	    var last = doc.first + doc.size - 1;
	    if (pos.line > last) return Pos(last, getLine(doc, last).text.length);
	    return clipToLen(pos, getLine(doc, pos.line).text.length);
	  }
	  function clipToLen(pos, linelen) {
	    var ch = pos.ch;
	    if (ch == null || ch > linelen) return Pos(pos.line, linelen);
	    else if (ch < 0) return Pos(pos.line, 0);
	    else return pos;
	  }
	  function isLine(doc, l) {return l >= doc.first && l < doc.first + doc.size;}
	  function clipPosArray(doc, array) {
	    for (var out = [], i = 0; i < array.length; i++) out[i] = clipPos(doc, array[i]);
	    return out;
	  }
	
	  // SELECTION UPDATES
	
	  // The 'scroll' parameter given to many of these indicated whether
	  // the new cursor position should be scrolled into view after
	  // modifying the selection.
	
	  // If shift is held or the extend flag is set, extends a range to
	  // include a given position (and optionally a second position).
	  // Otherwise, simply returns the range between the given positions.
	  // Used for cursor motion and such.
	  function extendRange(doc, range, head, other) {
	    if (doc.cm && doc.cm.display.shift || doc.extend) {
	      var anchor = range.anchor;
	      if (other) {
	        var posBefore = cmp(head, anchor) < 0;
	        if (posBefore != (cmp(other, anchor) < 0)) {
	          anchor = head;
	          head = other;
	        } else if (posBefore != (cmp(head, other) < 0)) {
	          head = other;
	        }
	      }
	      return new Range(anchor, head);
	    } else {
	      return new Range(other || head, head);
	    }
	  }
	
	  // Extend the primary selection range, discard the rest.
	  function extendSelection(doc, head, other, options) {
	    setSelection(doc, new Selection([extendRange(doc, doc.sel.primary(), head, other)], 0), options);
	  }
	
	  // Extend all selections (pos is an array of selections with length
	  // equal the number of selections)
	  function extendSelections(doc, heads, options) {
	    for (var out = [], i = 0; i < doc.sel.ranges.length; i++)
	      out[i] = extendRange(doc, doc.sel.ranges[i], heads[i], null);
	    var newSel = normalizeSelection(out, doc.sel.primIndex);
	    setSelection(doc, newSel, options);
	  }
	
	  // Updates a single range in the selection.
	  function replaceOneSelection(doc, i, range, options) {
	    var ranges = doc.sel.ranges.slice(0);
	    ranges[i] = range;
	    setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
	  }
	
	  // Reset the selection to a single range.
	  function setSimpleSelection(doc, anchor, head, options) {
	    setSelection(doc, simpleSelection(anchor, head), options);
	  }
	
	  // Give beforeSelectionChange handlers a change to influence a
	  // selection update.
	  function filterSelectionChange(doc, sel) {
	    var obj = {
	      ranges: sel.ranges,
	      update: function(ranges) {
	        this.ranges = [];
	        for (var i = 0; i < ranges.length; i++)
	          this.ranges[i] = new Range(clipPos(doc, ranges[i].anchor),
	                                     clipPos(doc, ranges[i].head));
	      }
	    };
	    signal(doc, "beforeSelectionChange", doc, obj);
	    if (doc.cm) signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
	    if (obj.ranges != sel.ranges) return normalizeSelection(obj.ranges, obj.ranges.length - 1);
	    else return sel;
	  }
	
	  function setSelectionReplaceHistory(doc, sel, options) {
	    var done = doc.history.done, last = lst(done);
	    if (last && last.ranges) {
	      done[done.length - 1] = sel;
	      setSelectionNoUndo(doc, sel, options);
	    } else {
	      setSelection(doc, sel, options);
	    }
	  }
	
	  // Set a new selection.
	  function setSelection(doc, sel, options) {
	    setSelectionNoUndo(doc, sel, options);
	    addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
	  }
	
	  function setSelectionNoUndo(doc, sel, options) {
	    if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange"))
	      sel = filterSelectionChange(doc, sel);
	
	    var bias = options && options.bias ||
	      (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
	    setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));
	
	    if (!(options && options.scroll === false) && doc.cm)
	      ensureCursorVisible(doc.cm);
	  }
	
	  function setSelectionInner(doc, sel) {
	    if (sel.equals(doc.sel)) return;
	
	    doc.sel = sel;
	
	    if (doc.cm) {
	      doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = true;
	      signalCursorActivity(doc.cm);
	    }
	    signalLater(doc, "cursorActivity", doc);
	  }
	
	  // Verify that the selection does not partially select any atomic
	  // marked ranges.
	  function reCheckSelection(doc) {
	    setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false), sel_dontScroll);
	  }
	
	  // Return a selection that does not partially select any atomic
	  // ranges.
	  function skipAtomicInSelection(doc, sel, bias, mayClear) {
	    var out;
	    for (var i = 0; i < sel.ranges.length; i++) {
	      var range = sel.ranges[i];
	      var newAnchor = skipAtomic(doc, range.anchor, bias, mayClear);
	      var newHead = skipAtomic(doc, range.head, bias, mayClear);
	      if (out || newAnchor != range.anchor || newHead != range.head) {
	        if (!out) out = sel.ranges.slice(0, i);
	        out[i] = new Range(newAnchor, newHead);
	      }
	    }
	    return out ? normalizeSelection(out, sel.primIndex) : sel;
	  }
	
	  // Ensure a given position is not inside an atomic range.
	  function skipAtomic(doc, pos, bias, mayClear) {
	    var flipped = false, curPos = pos;
	    var dir = bias || 1;
	    doc.cantEdit = false;
	    search: for (;;) {
	      var line = getLine(doc, curPos.line);
	      if (line.markedSpans) {
	        for (var i = 0; i < line.markedSpans.length; ++i) {
	          var sp = line.markedSpans[i], m = sp.marker;
	          if ((sp.from == null || (m.inclusiveLeft ? sp.from <= curPos.ch : sp.from < curPos.ch)) &&
	              (sp.to == null || (m.inclusiveRight ? sp.to >= curPos.ch : sp.to > curPos.ch))) {
	            if (mayClear) {
	              signal(m, "beforeCursorEnter");
	              if (m.explicitlyCleared) {
	                if (!line.markedSpans) break;
	                else {--i; continue;}
	              }
	            }
	            if (!m.atomic) continue;
	            var newPos = m.find(dir < 0 ? -1 : 1);
	            if (cmp(newPos, curPos) == 0) {
	              newPos.ch += dir;
	              if (newPos.ch < 0) {
	                if (newPos.line > doc.first) newPos = clipPos(doc, Pos(newPos.line - 1));
	                else newPos = null;
	              } else if (newPos.ch > line.text.length) {
	                if (newPos.line < doc.first + doc.size - 1) newPos = Pos(newPos.line + 1, 0);
	                else newPos = null;
	              }
	              if (!newPos) {
	                if (flipped) {
	                  // Driven in a corner -- no valid cursor position found at all
	                  // -- try again *with* clearing, if we didn't already
	                  if (!mayClear) return skipAtomic(doc, pos, bias, true);
	                  // Otherwise, turn off editing until further notice, and return the start of the doc
	                  doc.cantEdit = true;
	                  return Pos(doc.first, 0);
	                }
	                flipped = true; newPos = pos; dir = -dir;
	              }
	            }
	            curPos = newPos;
	            continue search;
	          }
	        }
	      }
	      return curPos;
	    }
	  }
	
	  // SELECTION DRAWING
	
	  // Redraw the selection and/or cursor
	  function updateSelection(cm) {
	    var display = cm.display, doc = cm.doc;
	    var curFragment = document.createDocumentFragment();
	    var selFragment = document.createDocumentFragment();
	
	    for (var i = 0; i < doc.sel.ranges.length; i++) {
	      var range = doc.sel.ranges[i];
	      var collapsed = range.empty();
	      if (collapsed || cm.options.showCursorWhenSelecting)
	        drawSelectionCursor(cm, range, curFragment);
	      if (!collapsed)
	        drawSelectionRange(cm, range, selFragment);
	    }
	
	    // Move the hidden textarea near the cursor to prevent scrolling artifacts
	    if (cm.options.moveInputWithCursor) {
	      var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
	      var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
	      var top = Math.max(0, Math.min(display.wrapper.clientHeight - 10,
	                                     headPos.top + lineOff.top - wrapOff.top));
	      var left = Math.max(0, Math.min(display.wrapper.clientWidth - 10,
	                                      headPos.left + lineOff.left - wrapOff.left));
	      display.inputDiv.style.top = top + "px";
	      display.inputDiv.style.left = left + "px";
	    }
	
	    removeChildrenAndAdd(display.cursorDiv, curFragment);
	    removeChildrenAndAdd(display.selectionDiv, selFragment);
	  }
	
	  // Draws a cursor for the given range
	  function drawSelectionCursor(cm, range, output) {
	    var pos = cursorCoords(cm, range.head, "div");
	
	    var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
	    cursor.style.left = pos.left + "px";
	    cursor.style.top = pos.top + "px";
	    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
	
	    if (pos.other) {
	      // Secondary cursor, shown when on a 'jump' in bi-directional text
	      var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
	      otherCursor.style.display = "";
	      otherCursor.style.left = pos.other.left + "px";
	      otherCursor.style.top = pos.other.top + "px";
	      otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
	    }
	  }
	
	  // Draws the given range as a highlighted selection
	  function drawSelectionRange(cm, range, output) {
	    var display = cm.display, doc = cm.doc;
	    var fragment = document.createDocumentFragment();
	    var padding = paddingH(cm.display), leftSide = padding.left, rightSide = display.lineSpace.offsetWidth - padding.right;
	
	    function add(left, top, width, bottom) {
	      if (top < 0) top = 0;
	      top = Math.round(top);
	      bottom = Math.round(bottom);
	      fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left +
	                               "px; top: " + top + "px; width: " + (width == null ? rightSide - left : width) +
	                               "px; height: " + (bottom - top) + "px"));
	    }
	
	    function drawForLine(line, fromArg, toArg) {
	      var lineObj = getLine(doc, line);
	      var lineLen = lineObj.text.length;
	      var start, end;
	      function coords(ch, bias) {
	        return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
	      }
	
	      iterateBidiSections(getOrder(lineObj), fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir) {
	        var leftPos = coords(from, "left"), rightPos, left, right;
	        if (from == to) {
	          rightPos = leftPos;
	          left = right = leftPos.left;
	        } else {
	          rightPos = coords(to - 1, "right");
	          if (dir == "rtl") { var tmp = leftPos; leftPos = rightPos; rightPos = tmp; }
	          left = leftPos.left;
	          right = rightPos.right;
	        }
	        if (fromArg == null && from == 0) left = leftSide;
	        if (rightPos.top - leftPos.top > 3) { // Different lines, draw top part
	          add(left, leftPos.top, null, leftPos.bottom);
	          left = leftSide;
	          if (leftPos.bottom < rightPos.top) add(left, leftPos.bottom, null, rightPos.top);
	        }
	        if (toArg == null && to == lineLen) right = rightSide;
	        if (!start || leftPos.top < start.top || leftPos.top == start.top && leftPos.left < start.left)
	          start = leftPos;
	        if (!end || rightPos.bottom > end.bottom || rightPos.bottom == end.bottom && rightPos.right > end.right)
	          end = rightPos;
	        if (left < leftSide + 1) left = leftSide;
	        add(left, rightPos.top, right - left, rightPos.bottom);
	      });
	      return {start: start, end: end};
	    }
	
	    var sFrom = range.from(), sTo = range.to();
	    if (sFrom.line == sTo.line) {
	      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
	    } else {
	      var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
	      var singleVLine = visualLine(fromLine) == visualLine(toLine);
	      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
	      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
	      if (singleVLine) {
	        if (leftEnd.top < rightStart.top - 2) {
	          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
	          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
	        } else {
	          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
	        }
	      }
	      if (leftEnd.bottom < rightStart.top)
	        add(leftSide, leftEnd.bottom, null, rightStart.top);
	    }
	
	    output.appendChild(fragment);
	  }
	
	  // Cursor-blinking
	  function restartBlink(cm) {
	    if (!cm.state.focused) return;
	    var display = cm.display;
	    clearInterval(display.blinker);
	    var on = true;
	    display.cursorDiv.style.visibility = "";
	    if (cm.options.cursorBlinkRate > 0)
	      display.blinker = setInterval(function() {
	        display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden";
	      }, cm.options.cursorBlinkRate);
	  }
	
	  // HIGHLIGHT WORKER
	
	  function startWorker(cm, time) {
	    if (cm.doc.mode.startState && cm.doc.frontier < cm.display.viewTo)
	      cm.state.highlight.set(time, bind(highlightWorker, cm));
	  }
	
	  function highlightWorker(cm) {
	    var doc = cm.doc;
	    if (doc.frontier < doc.first) doc.frontier = doc.first;
	    if (doc.frontier >= cm.display.viewTo) return;
	    var end = +new Date + cm.options.workTime;
	    var state = copyState(doc.mode, getStateBefore(cm, doc.frontier));
	
	    runInOp(cm, function() {
	    doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function(line) {
	      if (doc.frontier >= cm.display.viewFrom) { // Visible
	        var oldStyles = line.styles;
	        var highlighted = highlightLine(cm, line, state, true);
	        line.styles = highlighted.styles;
	        if (highlighted.classes) line.styleClasses = highlighted.classes;
	        else if (line.styleClasses) line.styleClasses = null;
	        var ischange = !oldStyles || oldStyles.length != line.styles.length;
	        for (var i = 0; !ischange && i < oldStyles.length; ++i) ischange = oldStyles[i] != line.styles[i];
	        if (ischange) regLineChange(cm, doc.frontier, "text");
	        line.stateAfter = copyState(doc.mode, state);
	      } else {
	        processLine(cm, line.text, state);
	        line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) : null;
	      }
	      ++doc.frontier;
	      if (+new Date > end) {
	        startWorker(cm, cm.options.workDelay);
	        return true;
	      }
	    });
	    });
	  }
	
	  // Finds the line to start with when starting a parse. Tries to
	  // find a line with a stateAfter, so that it can start with a
	  // valid state. If that fails, it returns the line with the
	  // smallest indentation, which tends to need the least context to
	  // parse correctly.
	  function findStartLine(cm, n, precise) {
	    var minindent, minline, doc = cm.doc;
	    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
	    for (var search = n; search > lim; --search) {
	      if (search <= doc.first) return doc.first;
	      var line = getLine(doc, search - 1);
	      if (line.stateAfter && (!precise || search <= doc.frontier)) return search;
	      var indented = countColumn(line.text, null, cm.options.tabSize);
	      if (minline == null || minindent > indented) {
	        minline = search - 1;
	        minindent = indented;
	      }
	    }
	    return minline;
	  }
	
	  function getStateBefore(cm, n, precise) {
	    var doc = cm.doc, display = cm.display;
	    if (!doc.mode.startState) return true;
	    var pos = findStartLine(cm, n, precise), state = pos > doc.first && getLine(doc, pos-1).stateAfter;
	    if (!state) state = startState(doc.mode);
	    else state = copyState(doc.mode, state);
	    doc.iter(pos, n, function(line) {
	      processLine(cm, line.text, state);
	      var save = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo;
	      line.stateAfter = save ? copyState(doc.mode, state) : null;
	      ++pos;
	    });
	    if (precise) doc.frontier = pos;
	    return state;
	  }
	
	  // POSITION MEASUREMENT
	
	  function paddingTop(display) {return display.lineSpace.offsetTop;}
	  function paddingVert(display) {return display.mover.offsetHeight - display.lineSpace.offsetHeight;}
	  function paddingH(display) {
	    if (display.cachedPaddingH) return display.cachedPaddingH;
	    var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
	    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
	    var data = {left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight)};
	    if (!isNaN(data.left) && !isNaN(data.right)) display.cachedPaddingH = data;
	    return data;
	  }
	
	  // Ensure the lineView.wrapping.heights array is populated. This is
	  // an array of bottom offsets for the lines that make up a drawn
	  // line. When lineWrapping is on, there might be more than one
	  // height.
	  function ensureLineHeights(cm, lineView, rect) {
	    var wrapping = cm.options.lineWrapping;
	    var curWidth = wrapping && cm.display.scroller.clientWidth;
	    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
	      var heights = lineView.measure.heights = [];
	      if (wrapping) {
	        lineView.measure.width = curWidth;
	        var rects = lineView.text.firstChild.getClientRects();
	        for (var i = 0; i < rects.length - 1; i++) {
	          var cur = rects[i], next = rects[i + 1];
	          if (Math.abs(cur.bottom - next.bottom) > 2)
	            heights.push((cur.bottom + next.top) / 2 - rect.top);
	        }
	      }
	      heights.push(rect.bottom - rect.top);
	    }
	  }
	
	  // Find a line map (mapping character offsets to text nodes) and a
	  // measurement cache for the given line number. (A line view might
	  // contain multiple lines when collapsed ranges are present.)
	  function mapFromLineView(lineView, line, lineN) {
	    if (lineView.line == line)
	      return {map: lineView.measure.map, cache: lineView.measure.cache};
	    for (var i = 0; i < lineView.rest.length; i++)
	      if (lineView.rest[i] == line)
	        return {map: lineView.measure.maps[i], cache: lineView.measure.caches[i]};
	    for (var i = 0; i < lineView.rest.length; i++)
	      if (lineNo(lineView.rest[i]) > lineN)
	        return {map: lineView.measure.maps[i], cache: lineView.measure.caches[i], before: true};
	  }
	
	  // Render a line into the hidden node display.externalMeasured. Used
	  // when measurement is needed for a line that's not in the viewport.
	  function updateExternalMeasurement(cm, line) {
	    line = visualLine(line);
	    var lineN = lineNo(line);
	    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
	    view.lineN = lineN;
	    var built = view.built = buildLineContent(cm, view);
	    view.text = built.pre;
	    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
	    return view;
	  }
	
	  // Get a {top, bottom, left, right} box (in line-local coordinates)
	  // for a given character.
	  function measureChar(cm, line, ch, bias) {
	    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
	  }
	
	  // Find a line view that corresponds to the given line number.
	  function findViewForLine(cm, lineN) {
	    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo)
	      return cm.display.view[findViewIndex(cm, lineN)];
	    var ext = cm.display.externalMeasured;
	    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size)
	      return ext;
	  }
	
	  // Measurement can be split in two steps, the set-up work that
	  // applies to the whole line, and the measurement of the actual
	  // character. Functions like coordsChar, that need to do a lot of
	  // measurements in a row, can thus ensure that the set-up work is
	  // only done once.
	  function prepareMeasureForLine(cm, line) {
	    var lineN = lineNo(line);
	    var view = findViewForLine(cm, lineN);
	    if (view && !view.text)
	      view = null;
	    else if (view && view.changes)
	      updateLineForChanges(cm, view, lineN, getDimensions(cm));
	    if (!view)
	      view = updateExternalMeasurement(cm, line);
	
	    var info = mapFromLineView(view, line, lineN);
	    return {
	      line: line, view: view, rect: null,
	      map: info.map, cache: info.cache, before: info.before,
	      hasHeights: false
	    };
	  }
	
	  // Given a prepared measurement object, measures the position of an
	  // actual character (or fetches it from the cache).
	  function measureCharPrepared(cm, prepared, ch, bias) {
	    if (prepared.before) ch = -1;
	    var key = ch + (bias || ""), found;
	    if (prepared.cache.hasOwnProperty(key)) {
	      found = prepared.cache[key];
	    } else {
	      if (!prepared.rect)
	        prepared.rect = prepared.view.text.getBoundingClientRect();
	      if (!prepared.hasHeights) {
	        ensureLineHeights(cm, prepared.view, prepared.rect);
	        prepared.hasHeights = true;
	      }
	      found = measureCharInner(cm, prepared, ch, bias);
	      if (!found.bogus) prepared.cache[key] = found;
	    }
	    return {left: found.left, right: found.right, top: found.top, bottom: found.bottom};
	  }
	
	  var nullRect = {left: 0, right: 0, top: 0, bottom: 0};
	
	  function measureCharInner(cm, prepared, ch, bias) {
	    var map = prepared.map;
	
	    var node, start, end, collapse;
	    // First, search the line map for the text node corresponding to,
	    // or closest to, the target character.
	    for (var i = 0; i < map.length; i += 3) {
	      var mStart = map[i], mEnd = map[i + 1];
	      if (ch < mStart) {
	        start = 0; end = 1;
	        collapse = "left";
	      } else if (ch < mEnd) {
	        start = ch - mStart;
	        end = start + 1;
	      } else if (i == map.length - 3 || ch == mEnd && map[i + 3] > ch) {
	        end = mEnd - mStart;
	        start = end - 1;
	        if (ch >= mEnd) collapse = "right";
	      }
	      if (start != null) {
	        node = map[i + 2];
	        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right"))
	          collapse = bias;
	        if (bias == "left" && start == 0)
	          while (i && map[i - 2] == map[i - 3] && map[i - 1].insertLeft) {
	            node = map[(i -= 3) + 2];
	            collapse = "left";
	          }
	        if (bias == "right" && start == mEnd - mStart)
	          while (i < map.length - 3 && map[i + 3] == map[i + 4] && !map[i + 5].insertLeft) {
	            node = map[(i += 3) + 2];
	            collapse = "right";
	          }
	        break;
	      }
	    }
	
	    var rect;
	    if (node.nodeType == 3) { // If it is a text node, use a range to retrieve the coordinates.
	      while (start && isExtendingChar(prepared.line.text.charAt(mStart + start))) --start;
	      while (mStart + end < mEnd && isExtendingChar(prepared.line.text.charAt(mStart + end))) ++end;
	      if (ie_upto8 && start == 0 && end == mEnd - mStart) {
	        rect = node.parentNode.getBoundingClientRect();
	      } else if (ie && cm.options.lineWrapping) {
	        var rects = range(node, start, end).getClientRects();
	        if (rects.length)
	          rect = rects[bias == "right" ? rects.length - 1 : 0];
	        else
	          rect = nullRect;
	      } else {
	        rect = range(node, start, end).getBoundingClientRect() || nullRect;
	      }
	    } else { // If it is a widget, simply get the box for the whole widget.
	      if (start > 0) collapse = bias = "right";
	      var rects;
	      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1)
	        rect = rects[bias == "right" ? rects.length - 1 : 0];
	      else
	        rect = node.getBoundingClientRect();
	    }
	    if (ie_upto8 && !start && (!rect || !rect.left && !rect.right)) {
	      var rSpan = node.parentNode.getClientRects()[0];
	      if (rSpan)
	        rect = {left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom};
	      else
	        rect = nullRect;
	    }
	
	    var top, bot = (rect.bottom + rect.top) / 2 - prepared.rect.top;
	    var heights = prepared.view.measure.heights;
	    for (var i = 0; i < heights.length - 1; i++)
	      if (bot < heights[i]) break;
	    top = i ? heights[i - 1] : 0; bot = heights[i];
	    var result = {left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
	                  right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
	                  top: top, bottom: bot};
	    if (!rect.left && !rect.right) result.bogus = true;
	    return result;
	  }
	
	  function clearLineMeasurementCacheFor(lineView) {
	    if (lineView.measure) {
	      lineView.measure.cache = {};
	      lineView.measure.heights = null;
	      if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++)
	        lineView.measure.caches[i] = {};
	    }
	  }
	
	  function clearLineMeasurementCache(cm) {
	    cm.display.externalMeasure = null;
	    removeChildren(cm.display.lineMeasure);
	    for (var i = 0; i < cm.display.view.length; i++)
	      clearLineMeasurementCacheFor(cm.display.view[i]);
	  }
	
	  function clearCaches(cm) {
	    clearLineMeasurementCache(cm);
	    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
	    if (!cm.options.lineWrapping) cm.display.maxLineChanged = true;
	    cm.display.lineNumChars = null;
	  }
	
	  function pageScrollX() { return window.pageXOffset || (document.documentElement || document.body).scrollLeft; }
	  function pageScrollY() { return window.pageYOffset || (document.documentElement || document.body).scrollTop; }
	
	  // Converts a {top, bottom, left, right} box from line-local
	  // coordinates into another coordinate system. Context may be one of
	  // "line", "div" (display.lineDiv), "local"/null (editor), or "page".
	  function intoCoordSystem(cm, lineObj, rect, context) {
	    if (lineObj.widgets) for (var i = 0; i < lineObj.widgets.length; ++i) if (lineObj.widgets[i].above) {
	      var size = widgetHeight(lineObj.widgets[i]);
	      rect.top += size; rect.bottom += size;
	    }
	    if (context == "line") return rect;
	    if (!context) context = "local";
	    var yOff = heightAtLine(lineObj);
	    if (context == "local") yOff += paddingTop(cm.display);
	    else yOff -= cm.display.viewOffset;
	    if (context == "page" || context == "window") {
	      var lOff = cm.display.lineSpace.getBoundingClientRect();
	      yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
	      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
	      rect.left += xOff; rect.right += xOff;
	    }
	    rect.top += yOff; rect.bottom += yOff;
	    return rect;
	  }
	
	  // Coverts a box from "div" coords to another coordinate system.
	  // Context may be "window", "page", "div", or "local"/null.
	  function fromCoordSystem(cm, coords, context) {
	    if (context == "div") return coords;
	    var left = coords.left, top = coords.top;
	    // First move into "page" coordinate system
	    if (context == "page") {
	      left -= pageScrollX();
	      top -= pageScrollY();
	    } else if (context == "local" || !context) {
	      var localBox = cm.display.sizer.getBoundingClientRect();
	      left += localBox.left;
	      top += localBox.top;
	    }
	
	    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
	    return {left: left - lineSpaceBox.left, top: top - lineSpaceBox.top};
	  }
	
	  function charCoords(cm, pos, context, lineObj, bias) {
	    if (!lineObj) lineObj = getLine(cm.doc, pos.line);
	    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
	  }
	
	  // Returns a box for a given cursor position, which may have an
	  // 'other' property containing the position of the secondary cursor
	  // on a bidi boundary.
	  function cursorCoords(cm, pos, context, lineObj, preparedMeasure) {
	    lineObj = lineObj || getLine(cm.doc, pos.line);
	    if (!preparedMeasure) preparedMeasure = prepareMeasureForLine(cm, lineObj);
	    function get(ch, right) {
	      var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left");
	      if (right) m.left = m.right; else m.right = m.left;
	      return intoCoordSystem(cm, lineObj, m, context);
	    }
	    function getBidi(ch, partPos) {
	      var part = order[partPos], right = part.level % 2;
	      if (ch == bidiLeft(part) && partPos && part.level < order[partPos - 1].level) {
	        part = order[--partPos];
	        ch = bidiRight(part) - (part.level % 2 ? 0 : 1);
	        right = true;
	      } else if (ch == bidiRight(part) && partPos < order.length - 1 && part.level < order[partPos + 1].level) {
	        part = order[++partPos];
	        ch = bidiLeft(part) - part.level % 2;
	        right = false;
	      }
	      if (right && ch == part.to && ch > part.from) return get(ch - 1);
	      return get(ch, right);
	    }
	    var order = getOrder(lineObj), ch = pos.ch;
	    if (!order) return get(ch);
	    var partPos = getBidiPartAt(order, ch);
	    var val = getBidi(ch, partPos);
	    if (bidiOther != null) val.other = getBidi(ch, bidiOther);
	    return val;
	  }
	
	  // Used to cheaply estimate the coordinates for a position. Used for
	  // intermediate scroll updates.
	  function estimateCoords(cm, pos) {
	    var left = 0, pos = clipPos(cm.doc, pos);
	    if (!cm.options.lineWrapping) left = charWidth(cm.display) * pos.ch;
	    var lineObj = getLine(cm.doc, pos.line);
	    var top = heightAtLine(lineObj) + paddingTop(cm.display);
	    return {left: left, right: left, top: top, bottom: top + lineObj.height};
	  }
	
	  // Positions returned by coordsChar contain some extra information.
	  // xRel is the relative x position of the input coordinates compared
	  // to the found position (so xRel > 0 means the coordinates are to
	  // the right of the character position, for example). When outside
	  // is true, that means the coordinates lie outside the line's
	  // vertical range.
	  function PosWithInfo(line, ch, outside, xRel) {
	    var pos = Pos(line, ch);
	    pos.xRel = xRel;
	    if (outside) pos.outside = true;
	    return pos;
	  }
	
	  // Compute the character position closest to the given coordinates.
	  // Input must be lineSpace-local ("div" coordinate system).
	  function coordsChar(cm, x, y) {
	    var doc = cm.doc;
	    y += cm.display.viewOffset;
	    if (y < 0) return PosWithInfo(doc.first, 0, true, -1);
	    var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
	    if (lineN > last)
	      return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, true, 1);
	    if (x < 0) x = 0;
	
	    var lineObj = getLine(doc, lineN);
	    for (;;) {
	      var found = coordsCharInner(cm, lineObj, lineN, x, y);
	      var merged = collapsedSpanAtEnd(lineObj);
	      var mergedPos = merged && merged.find(0, true);
	      if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0))
	        lineN = lineNo(lineObj = mergedPos.to.line);
	      else
	        return found;
	    }
	  }
	
	  function coordsCharInner(cm, lineObj, lineNo, x, y) {
	    var innerOff = y - heightAtLine(lineObj);
	    var wrongLine = false, adjust = 2 * cm.display.wrapper.clientWidth;
	    var preparedMeasure = prepareMeasureForLine(cm, lineObj);
	
	    function getX(ch) {
	      var sp = cursorCoords(cm, Pos(lineNo, ch), "line", lineObj, preparedMeasure);
	      wrongLine = true;
	      if (innerOff > sp.bottom) return sp.left - adjust;
	      else if (innerOff < sp.top) return sp.left + adjust;
	      else wrongLine = false;
	      return sp.left;
	    }
	
	    var bidi = getOrder(lineObj), dist = lineObj.text.length;
	    var from = lineLeft(lineObj), to = lineRight(lineObj);
	    var fromX = getX(from), fromOutside = wrongLine, toX = getX(to), toOutside = wrongLine;
	
	    if (x > toX) return PosWithInfo(lineNo, to, toOutside, 1);
	    // Do a binary search between these bounds.
	    for (;;) {
	      if (bidi ? to == from || to == moveVisually(lineObj, from, 1) : to - from <= 1) {
	        var ch = x < fromX || x - fromX <= toX - x ? from : to;
	        var xDiff = x - (ch == from ? fromX : toX);
	        while (isExtendingChar(lineObj.text.charAt(ch))) ++ch;
	        var pos = PosWithInfo(lineNo, ch, ch == from ? fromOutside : toOutside,
	                              xDiff < -1 ? -1 : xDiff > 1 ? 1 : 0);
	        return pos;
	      }
	      var step = Math.ceil(dist / 2), middle = from + step;
	      if (bidi) {
	        middle = from;
	        for (var i = 0; i < step; ++i) middle = moveVisually(lineObj, middle, 1);
	      }
	      var middleX = getX(middle);
	      if (middleX > x) {to = middle; toX = middleX; if (toOutside = wrongLine) toX += 1000; dist = step;}
	      else {from = middle; fromX = middleX; fromOutside = wrongLine; dist -= step;}
	    }
	  }
	
	  var measureText;
	  // Compute the default text height.
	  function textHeight(display) {
	    if (display.cachedTextHeight != null) return display.cachedTextHeight;
	    if (measureText == null) {
	      measureText = elt("pre");
	      // Measure a bunch of lines, for browsers that compute
	      // fractional heights.
	      for (var i = 0; i < 49; ++i) {
	        measureText.appendChild(document.createTextNode("x"));
	        measureText.appendChild(elt("br"));
	      }
	      measureText.appendChild(document.createTextNode("x"));
	    }
	    removeChildrenAndAdd(display.measure, measureText);
	    var height = measureText.offsetHeight / 50;
	    if (height > 3) display.cachedTextHeight = height;
	    removeChildren(display.measure);
	    return height || 1;
	  }
	
	  // Compute the default character width.
	  function charWidth(display) {
	    if (display.cachedCharWidth != null) return display.cachedCharWidth;
	    var anchor = elt("span", "xxxxxxxxxx");
	    var pre = elt("pre", [anchor]);
	    removeChildrenAndAdd(display.measure, pre);
	    var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
	    if (width > 2) display.cachedCharWidth = width;
	    return width || 10;
	  }
	
	  // OPERATIONS
	
	  // Operations are used to wrap a series of changes to the editor
	  // state in such a way that each change won't have to update the
	  // cursor and display (which would be awkward, slow, and
	  // error-prone). Instead, display updates are batched and then all
	  // combined and executed at once.
	
	  var nextOpId = 0;
	  // Start a new operation.
	  function startOperation(cm) {
	    cm.curOp = {
	      viewChanged: false,      // Flag that indicates that lines might need to be redrawn
	      startHeight: cm.doc.height, // Used to detect need to update scrollbar
	      forceUpdate: false,      // Used to force a redraw
	      updateInput: null,       // Whether to reset the input textarea
	      typing: false,           // Whether this reset should be careful to leave existing text (for compositing)
	      changeObjs: null,        // Accumulated changes, for firing change events
	      cursorActivityHandlers: null, // Set of handlers to fire cursorActivity on
	      selectionChanged: false, // Whether the selection needs to be redrawn
	      updateMaxLine: false,    // Set when the widest line needs to be determined anew
	      scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
	      scrollToPos: null,       // Used to scroll to a specific position
	      id: ++nextOpId           // Unique ID
	    };
	    if (!delayedCallbackDepth++) delayedCallbacks = [];
	  }
	
	  // Finish an operation, updating the display and signalling delayed events
	  function endOperation(cm) {
	    var op = cm.curOp, doc = cm.doc, display = cm.display;
	    cm.curOp = null;
	
	    if (op.updateMaxLine) findMaxLine(cm);
	
	    // If it looks like an update might be needed, call updateDisplay
	    if (op.viewChanged || op.forceUpdate || op.scrollTop != null ||
	        op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom ||
	                           op.scrollToPos.to.line >= display.viewTo) ||
	        display.maxLineChanged && cm.options.lineWrapping) {
	      var updated = updateDisplay(cm, {top: op.scrollTop, ensure: op.scrollToPos}, op.forceUpdate);
	      if (cm.display.scroller.offsetHeight) cm.doc.scrollTop = cm.display.scroller.scrollTop;
	    }
	    // If no update was run, but the selection changed, redraw that.
	    if (!updated && op.selectionChanged) updateSelection(cm);
	    if (!updated && op.startHeight != cm.doc.height) updateScrollbars(cm);
	
	    // Abort mouse wheel delta measurement, when scrolling explicitly
	    if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos))
	      display.wheelStartX = display.wheelStartY = null;
	
	    // Propagate the scroll position to the actual DOM scroller
	    if (op.scrollTop != null && display.scroller.scrollTop != op.scrollTop) {
	      var top = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
	      display.scroller.scrollTop = display.scrollbarV.scrollTop = doc.scrollTop = top;
	    }
	    if (op.scrollLeft != null && display.scroller.scrollLeft != op.scrollLeft) {
	      var left = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, op.scrollLeft));
	      display.scroller.scrollLeft = display.scrollbarH.scrollLeft = doc.scrollLeft = left;
	      alignHorizontally(cm);
	    }
	    // If we need to scroll a specific position into view, do so.
	    if (op.scrollToPos) {
	      var coords = scrollPosIntoView(cm, clipPos(cm.doc, op.scrollToPos.from),
	                                     clipPos(cm.doc, op.scrollToPos.to), op.scrollToPos.margin);
	      if (op.scrollToPos.isCursor && cm.state.focused) maybeScrollWindow(cm, coords);
	    }
	
	    if (op.selectionChanged) restartBlink(cm);
	
	    if (cm.state.focused && op.updateInput)
	      resetInput(cm, op.typing);
	
	    // Fire events for markers that are hidden/unidden by editing or
	    // undoing
	    var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
	    if (hidden) for (var i = 0; i < hidden.length; ++i)
	      if (!hidden[i].lines.length) signal(hidden[i], "hide");
	    if (unhidden) for (var i = 0; i < unhidden.length; ++i)
	      if (unhidden[i].lines.length) signal(unhidden[i], "unhide");
	
	    var delayed;
	    if (!--delayedCallbackDepth) {
	      delayed = delayedCallbacks;
	      delayedCallbacks = null;
	    }
	    // Fire change events, and delayed event handlers
	    if (op.changeObjs)
	      signal(cm, "changes", cm, op.changeObjs);
	    if (delayed) for (var i = 0; i < delayed.length; ++i) delayed[i]();
	    if (op.cursorActivityHandlers)
	      for (var i = 0; i < op.cursorActivityHandlers.length; i++)
	        op.cursorActivityHandlers[i](cm);
	  }
	
	  // Run the given function in an operation
	  function runInOp(cm, f) {
	    if (cm.curOp) return f();
	    startOperation(cm);
	    try { return f(); }
	    finally { endOperation(cm); }
	  }
	  // Wraps a function in an operation. Returns the wrapped function.
	  function operation(cm, f) {
	    return function() {
	      if (cm.curOp) return f.apply(cm, arguments);
	      startOperation(cm);
	      try { return f.apply(cm, arguments); }
	      finally { endOperation(cm); }
	    };
	  }
	  // Used to add methods to editor and doc instances, wrapping them in
	  // operations.
	  function methodOp(f) {
	    return function() {
	      if (this.curOp) return f.apply(this, arguments);
	      startOperation(this);
	      try { return f.apply(this, arguments); }
	      finally { endOperation(this); }
	    };
	  }
	  function docMethodOp(f) {
	    return function() {
	      var cm = this.cm;
	      if (!cm || cm.curOp) return f.apply(this, arguments);
	      startOperation(cm);
	      try { return f.apply(this, arguments); }
	      finally { endOperation(cm); }
	    };
	  }
	
	  // VIEW TRACKING
	
	  // These objects are used to represent the visible (currently drawn)
	  // part of the document. A LineView may correspond to multiple
	  // logical lines, if those are connected by collapsed ranges.
	  function LineView(doc, line, lineN) {
	    // The starting line
	    this.line = line;
	    // Continuing lines, if any
	    this.rest = visualLineContinued(line);
	    // Number of logical lines in this visual line
	    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
	    this.node = this.text = null;
	    this.hidden = lineIsHidden(doc, line);
	  }
	
	  // Create a range of LineView objects for the given lines.
	  function buildViewArray(cm, from, to) {
	    var array = [], nextPos;
	    for (var pos = from; pos < to; pos = nextPos) {
	      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
	      nextPos = pos + view.size;
	      array.push(view);
	    }
	    return array;
	  }
	
	  // Updates the display.view data structure for a given change to the
	  // document. From and to are in pre-change coordinates. Lendiff is
	  // the amount of lines added or subtracted by the change. This is
	  // used for changes that span multiple lines, or change the way
	  // lines are divided into visual lines. regLineChange (below)
	  // registers single-line changes.
	  function regChange(cm, from, to, lendiff) {
	    if (from == null) from = cm.doc.first;
	    if (to == null) to = cm.doc.first + cm.doc.size;
	    if (!lendiff) lendiff = 0;
	
	    var display = cm.display;
	    if (lendiff && to < display.viewTo &&
	        (display.updateLineNumbers == null || display.updateLineNumbers > from))
	      display.updateLineNumbers = from;
	
	    cm.curOp.viewChanged = true;
	
	    if (from >= display.viewTo) { // Change after
	      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo)
	        resetView(cm);
	    } else if (to <= display.viewFrom) { // Change before
	      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
	        resetView(cm);
	      } else {
	        display.viewFrom += lendiff;
	        display.viewTo += lendiff;
	      }
	    } else if (from <= display.viewFrom && to >= display.viewTo) { // Full overlap
	      resetView(cm);
	    } else if (from <= display.viewFrom) { // Top overlap
	      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
	      if (cut) {
	        display.view = display.view.slice(cut.index);
	        display.viewFrom = cut.lineN;
	        display.viewTo += lendiff;
	      } else {
	        resetView(cm);
	      }
	    } else if (to >= display.viewTo) { // Bottom overlap
	      var cut = viewCuttingPoint(cm, from, from, -1);
	      if (cut) {
	        display.view = display.view.slice(0, cut.index);
	        display.viewTo = cut.lineN;
	      } else {
	        resetView(cm);
	      }
	    } else { // Gap in the middle
	      var cutTop = viewCuttingPoint(cm, from, from, -1);
	      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
	      if (cutTop && cutBot) {
	        display.view = display.view.slice(0, cutTop.index)
	          .concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN))
	          .concat(display.view.slice(cutBot.index));
	        display.viewTo += lendiff;
	      } else {
	        resetView(cm);
	      }
	    }
	
	    var ext = display.externalMeasured;
	    if (ext) {
	      if (to < ext.lineN)
	        ext.lineN += lendiff;
	      else if (from < ext.lineN + ext.size)
	        display.externalMeasured = null;
	    }
	  }
	
	  // Register a change to a single line. Type must be one of "text",
	  // "gutter", "class", "widget"
	  function regLineChange(cm, line, type) {
	    cm.curOp.viewChanged = true;
	    var display = cm.display, ext = cm.display.externalMeasured;
	    if (ext && line >= ext.lineN && line < ext.lineN + ext.size)
	      display.externalMeasured = null;
	
	    if (line < display.viewFrom || line >= display.viewTo) return;
	    var lineView = display.view[findViewIndex(cm, line)];
	    if (lineView.node == null) return;
	    var arr = lineView.changes || (lineView.changes = []);
	    if (indexOf(arr, type) == -1) arr.push(type);
	  }
	
	  // Clear the view.
	  function resetView(cm) {
	    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
	    cm.display.view = [];
	    cm.display.viewOffset = 0;
	  }
	
	  // Find the view element corresponding to a given line. Return null
	  // when the line isn't visible.
	  function findViewIndex(cm, n) {
	    if (n >= cm.display.viewTo) return null;
	    n -= cm.display.viewFrom;
	    if (n < 0) return null;
	    var view = cm.display.view;
	    for (var i = 0; i < view.length; i++) {
	      n -= view[i].size;
	      if (n < 0) return i;
	    }
	  }
	
	  function viewCuttingPoint(cm, oldN, newN, dir) {
	    var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
	    if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size)
	      return {index: index, lineN: newN};
	    for (var i = 0, n = cm.display.viewFrom; i < index; i++)
	      n += view[i].size;
	    if (n != oldN) {
	      if (dir > 0) {
	        if (index == view.length - 1) return null;
	        diff = (n + view[index].size) - oldN;
	        index++;
	      } else {
	        diff = n - oldN;
	      }
	      oldN += diff; newN += diff;
	    }
	    while (visualLineNo(cm.doc, newN) != newN) {
	      if (index == (dir < 0 ? 0 : view.length - 1)) return null;
	      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
	      index += dir;
	    }
	    return {index: index, lineN: newN};
	  }
	
	  // Force the view to cover a given range, adding empty view element
	  // or clipping off existing ones as needed.
	  function adjustView(cm, from, to) {
	    var display = cm.display, view = display.view;
	    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
	      display.view = buildViewArray(cm, from, to);
	      display.viewFrom = from;
	    } else {
	      if (display.viewFrom > from)
	        display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
	      else if (display.viewFrom < from)
	        display.view = display.view.slice(findViewIndex(cm, from));
	      display.viewFrom = from;
	      if (display.viewTo < to)
	        display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
	      else if (display.viewTo > to)
	        display.view = display.view.slice(0, findViewIndex(cm, to));
	    }
	    display.viewTo = to;
	  }
	
	  // Count the number of lines in the view whose DOM representation is
	  // out of date (or nonexistent).
	  function countDirtyView(cm) {
	    var view = cm.display.view, dirty = 0;
	    for (var i = 0; i < view.length; i++) {
	      var lineView = view[i];
	      if (!lineView.hidden && (!lineView.node || lineView.changes)) ++dirty;
	    }
	    return dirty;
	  }
	
	  // INPUT HANDLING
	
	  // Poll for input changes, using the normal rate of polling. This
	  // runs as long as the editor is focused.
	  function slowPoll(cm) {
	    if (cm.display.pollingFast) return;
	    cm.display.poll.set(cm.options.pollInterval, function() {
	      readInput(cm);
	      if (cm.state.focused) slowPoll(cm);
	    });
	  }
	
	  // When an event has just come in that is likely to add or change
	  // something in the input textarea, we poll faster, to ensure that
	  // the change appears on the screen quickly.
	  function fastPoll(cm) {
	    var missed = false;
	    cm.display.pollingFast = true;
	    function p() {
	      var changed = readInput(cm);
	      if (!changed && !missed) {missed = true; cm.display.poll.set(60, p);}
	      else {cm.display.pollingFast = false; slowPoll(cm);}
	    }
	    cm.display.poll.set(20, p);
	  }
	
	  // Read input from the textarea, and update the document to match.
	  // When something is selected, it is present in the textarea, and
	  // selected (unless it is huge, in which case a placeholder is
	  // used). When nothing is selected, the cursor sits after previously
	  // seen text (can be empty), which is stored in prevInput (we must
	  // not reset the textarea when typing, because that breaks IME).
	  function readInput(cm) {
	    var input = cm.display.input, prevInput = cm.display.prevInput, doc = cm.doc;
	    // Since this is called a *lot*, try to bail out as cheaply as
	    // possible when it is clear that nothing happened. hasSelection
	    // will be the case when there is a lot of text in the textarea,
	    // in which case reading its value would be expensive.
	    if (!cm.state.focused || (hasSelection(input) && !prevInput) || isReadOnly(cm) || cm.options.disableInput)
	      return false;
	    // See paste handler for more on the fakedLastChar kludge
	    if (cm.state.pasteIncoming && cm.state.fakedLastChar) {
	      input.value = input.value.substring(0, input.value.length - 1);
	      cm.state.fakedLastChar = false;
	    }
	    var text = input.value;
	    // If nothing changed, bail.
	    if (text == prevInput && !cm.somethingSelected()) return false;
	    // Work around nonsensical selection resetting in IE9/10
	    if (ie && !ie_upto8 && cm.display.inputHasSelection === text) {
	      resetInput(cm);
	      return false;
	    }
	
	    var withOp = !cm.curOp;
	    if (withOp) startOperation(cm);
	    cm.display.shift = false;
	
	    if (text.charCodeAt(0) == 0x200b && doc.sel == cm.display.selForContextMenu && !prevInput)
	      prevInput = "\u200b";
	    // Find the part of the input that is actually new
	    var same = 0, l = Math.min(prevInput.length, text.length);
	    while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) ++same;
	    var inserted = text.slice(same), textLines = splitLines(inserted);
	
	    // When pasing N lines into N selections, insert one line per selection
	    var multiPaste = cm.state.pasteIncoming && textLines.length > 1 && doc.sel.ranges.length == textLines.length;
	
	    // Normal behavior is to insert the new text into every selection
	    for (var i = doc.sel.ranges.length - 1; i >= 0; i--) {
	      var range = doc.sel.ranges[i];
	      var from = range.from(), to = range.to();
	      // Handle deletion
	      if (same < prevInput.length)
	        from = Pos(from.line, from.ch - (prevInput.length - same));
	      // Handle overwrite
	      else if (cm.state.overwrite && range.empty() && !cm.state.pasteIncoming)
	        to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
	      var updateInput = cm.curOp.updateInput;
	      var changeEvent = {from: from, to: to, text: multiPaste ? [textLines[i]] : textLines,
	                         origin: cm.state.pasteIncoming ? "paste" : cm.state.cutIncoming ? "cut" : "+input"};
	      makeChange(cm.doc, changeEvent);
	      signalLater(cm, "inputRead", cm, changeEvent);
	      // When an 'electric' character is inserted, immediately trigger a reindent
	      if (inserted && !cm.state.pasteIncoming && cm.options.electricChars &&
	          cm.options.smartIndent && range.head.ch < 100 &&
	          (!i || doc.sel.ranges[i - 1].head.line != range.head.line)) {
	        var mode = cm.getModeAt(range.head);
	        if (mode.electricChars) {
	          for (var j = 0; j < mode.electricChars.length; j++)
	            if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
	              indentLine(cm, range.head.line, "smart");
	              break;
	            }
	        } else if (mode.electricInput) {
	          var end = changeEnd(changeEvent);
	          if (mode.electricInput.test(getLine(doc, end.line).text.slice(0, end.ch)))
	            indentLine(cm, range.head.line, "smart");
	        }
	      }
	    }
	    ensureCursorVisible(cm);
	    cm.curOp.updateInput = updateInput;
	    cm.curOp.typing = true;
	
	    // Don't leave long text in the textarea, since it makes further polling slow
	    if (text.length > 1000 || text.indexOf("\n") > -1) input.value = cm.display.prevInput = "";
	    else cm.display.prevInput = text;
	    if (withOp) endOperation(cm);
	    cm.state.pasteIncoming = cm.state.cutIncoming = false;
	    return true;
	  }
	
	  // Reset the input to correspond to the selection (or to be empty,
	  // when not typing and nothing is selected)
	  function resetInput(cm, typing) {
	    var minimal, selected, doc = cm.doc;
	    if (cm.somethingSelected()) {
	      cm.display.prevInput = "";
	      var range = doc.sel.primary();
	      minimal = hasCopyEvent &&
	        (range.to().line - range.from().line > 100 || (selected = cm.getSelection()).length > 1000);
	      var content = minimal ? "-" : selected || cm.getSelection();
	      cm.display.input.value = content;
	      if (cm.state.focused) selectInput(cm.display.input);
	      if (ie && !ie_upto8) cm.display.inputHasSelection = content;
	    } else if (!typing) {
	      cm.display.prevInput = cm.display.input.value = "";
	      if (ie && !ie_upto8) cm.display.inputHasSelection = null;
	    }
	    cm.display.inaccurateSelection = minimal;
	  }
	
	  function focusInput(cm) {
	    if (cm.options.readOnly != "nocursor" && (!mobile || activeElt() != cm.display.input))
	      cm.display.input.focus();
	  }
	
	  function ensureFocus(cm) {
	    if (!cm.state.focused) { focusInput(cm); onFocus(cm); }
	  }
	
	  function isReadOnly(cm) {
	    return cm.options.readOnly || cm.doc.cantEdit;
	  }
	
	  // EVENT HANDLERS
	
	  // Attach the necessary event handlers when initializing the editor
	  function registerEventHandlers(cm) {
	    var d = cm.display;
	    on(d.scroller, "mousedown", operation(cm, onMouseDown));
	    // Older IE's will not fire a second mousedown for a double click
	    if (ie_upto10)
	      on(d.scroller, "dblclick", operation(cm, function(e) {
	        if (signalDOMEvent(cm, e)) return;
	        var pos = posFromMouse(cm, e);
	        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) return;
	        e_preventDefault(e);
	        var word = findWordAt(cm, pos);
	        extendSelection(cm.doc, word.anchor, word.head);
	      }));
	    else
	      on(d.scroller, "dblclick", function(e) { signalDOMEvent(cm, e) || e_preventDefault(e); });
	    // Prevent normal selection in the editor (we handle our own)
	    on(d.lineSpace, "selectstart", function(e) {
	      if (!eventInWidget(d, e)) e_preventDefault(e);
	    });
	    // Some browsers fire contextmenu *after* opening the menu, at
	    // which point we can't mess with it anymore. Context menu is
	    // handled in onMouseDown for these browsers.
	    if (!captureRightClick) on(d.scroller, "contextmenu", function(e) {onContextMenu(cm, e);});
	
	    // Sync scrolling between fake scrollbars and real scrollable
	    // area, ensure viewport is updated when scrolling.
	    on(d.scroller, "scroll", function() {
	      if (d.scroller.clientHeight) {
	        setScrollTop(cm, d.scroller.scrollTop);
	        setScrollLeft(cm, d.scroller.scrollLeft, true);
	        signal(cm, "scroll", cm);
	      }
	    });
	    on(d.scrollbarV, "scroll", function() {
	      if (d.scroller.clientHeight) setScrollTop(cm, d.scrollbarV.scrollTop);
	    });
	    on(d.scrollbarH, "scroll", function() {
	      if (d.scroller.clientHeight) setScrollLeft(cm, d.scrollbarH.scrollLeft);
	    });
	
	    // Listen to wheel events in order to try and update the viewport on time.
	    on(d.scroller, "mousewheel", function(e){onScrollWheel(cm, e);});
	    on(d.scroller, "DOMMouseScroll", function(e){onScrollWheel(cm, e);});
	
	    // Prevent clicks in the scrollbars from killing focus
	    function reFocus() { if (cm.state.focused) setTimeout(bind(focusInput, cm), 0); }
	    on(d.scrollbarH, "mousedown", reFocus);
	    on(d.scrollbarV, "mousedown", reFocus);
	    // Prevent wrapper from ever scrolling
	    on(d.wrapper, "scroll", function() { d.wrapper.scrollTop = d.wrapper.scrollLeft = 0; });
	
	    on(d.input, "keyup", operation(cm, onKeyUp));
	    on(d.input, "input", function() {
	      if (ie && !ie_upto8 && cm.display.inputHasSelection) cm.display.inputHasSelection = null;
	      fastPoll(cm);
	    });
	    on(d.input, "keydown", operation(cm, onKeyDown));
	    on(d.input, "keypress", operation(cm, onKeyPress));
	    on(d.input, "focus", bind(onFocus, cm));
	    on(d.input, "blur", bind(onBlur, cm));
	
	    function drag_(e) {
	      if (!signalDOMEvent(cm, e)) e_stop(e);
	    }
	    if (cm.options.dragDrop) {
	      on(d.scroller, "dragstart", function(e){onDragStart(cm, e);});
	      on(d.scroller, "dragenter", drag_);
	      on(d.scroller, "dragover", drag_);
	      on(d.scroller, "drop", operation(cm, onDrop));
	    }
	    on(d.scroller, "paste", function(e) {
	      if (eventInWidget(d, e)) return;
	      cm.state.pasteIncoming = true;
	      focusInput(cm);
	      fastPoll(cm);
	    });
	    on(d.input, "paste", function() {
	      // Workaround for webkit bug https://bugs.webkit.org/show_bug.cgi?id=90206
	      // Add a char to the end of textarea before paste occur so that
	      // selection doesn't span to the end of textarea.
	      if (webkit && !cm.state.fakedLastChar && !(new Date - cm.state.lastMiddleDown < 200)) {
	        var start = d.input.selectionStart, end = d.input.selectionEnd;
	        d.input.value += "$";
	        d.input.selectionStart = start;
	        d.input.selectionEnd = end;
	        cm.state.fakedLastChar = true;
	      }
	      cm.state.pasteIncoming = true;
	      fastPoll(cm);
	    });
	
	    function prepareCopyCut(e) {
	      if (cm.somethingSelected()) {
	        if (d.inaccurateSelection) {
	          d.prevInput = "";
	          d.inaccurateSelection = false;
	          d.input.value = cm.getSelection();
	          selectInput(d.input);
	        }
	      } else {
	        var text = "", ranges = [];
	        for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
	          var line = cm.doc.sel.ranges[i].head.line;
	          var lineRange = {anchor: Pos(line, 0), head: Pos(line + 1, 0)};
	          ranges.push(lineRange);
	          text += cm.getRange(lineRange.anchor, lineRange.head);
	        }
	        if (e.type == "cut") {
	          cm.setSelections(ranges, null, sel_dontScroll);
	        } else {
	          d.prevInput = "";
	          d.input.value = text;
	          selectInput(d.input);
	        }
	      }
	      if (e.type == "cut") cm.state.cutIncoming = true;
	    }
	    on(d.input, "cut", prepareCopyCut);
	    on(d.input, "copy", prepareCopyCut);
	
	    // Needed to handle Tab key in KHTML
	    if (khtml) on(d.sizer, "mouseup", function() {
	      if (activeElt() == d.input) d.input.blur();
	      focusInput(cm);
	    });
	  }
	
	  // Called when the window resizes
	  function onResize(cm) {
	    // Might be a text scaling operation, clear size caches.
	    var d = cm.display;
	    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
	    cm.setSize();
	  }
	
	  // MOUSE EVENTS
	
	  // Return true when the given mouse event happened in a widget
	  function eventInWidget(display, e) {
	    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
	      if (!n || n.ignoreEvents || n.parentNode == display.sizer && n != display.mover) return true;
	    }
	  }
	
	  // Given a mouse event, find the corresponding position. If liberal
	  // is false, it checks whether a gutter or scrollbar was clicked,
	  // and returns null if it was. forRect is used by rectangular
	  // selections, and tries to estimate a character position even for
	  // coordinates beyond the right of the text.
	  function posFromMouse(cm, e, liberal, forRect) {
	    var display = cm.display;
	    if (!liberal) {
	      var target = e_target(e);
	      if (target == display.scrollbarH || target == display.scrollbarV ||
	          target == display.scrollbarFiller || target == display.gutterFiller) return null;
	    }
	    var x, y, space = display.lineSpace.getBoundingClientRect();
	    // Fails unpredictably on IE[67] when mouse is dragged around quickly.
	    try { x = e.clientX - space.left; y = e.clientY - space.top; }
	    catch (e) { return null; }
	    var coords = coordsChar(cm, x, y), line;
	    if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
	      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
	      coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
	    }
	    return coords;
	  }
	
	  // A mouse down can be a single click, double click, triple click,
	  // start of selection drag, start of text drag, new cursor
	  // (ctrl-click), rectangle drag (alt-drag), or xwin
	  // middle-click-paste. Or it might be a click on something we should
	  // not interfere with, such as a scrollbar or widget.
	  function onMouseDown(e) {
	    if (signalDOMEvent(this, e)) return;
	    var cm = this, display = cm.display;
	    display.shift = e.shiftKey;
	
	    if (eventInWidget(display, e)) {
	      if (!webkit) {
	        // Briefly turn off draggability, to allow widgets to do
	        // normal dragging things.
	        display.scroller.draggable = false;
	        setTimeout(function(){display.scroller.draggable = true;}, 100);
	      }
	      return;
	    }
	    if (clickInGutter(cm, e)) return;
	    var start = posFromMouse(cm, e);
	    window.focus();
	
	    switch (e_button(e)) {
	    case 1:
	      if (start)
	        leftButtonDown(cm, e, start);
	      else if (e_target(e) == display.scroller)
	        e_preventDefault(e);
	      break;
	    case 2:
	      if (webkit) cm.state.lastMiddleDown = +new Date;
	      if (start) extendSelection(cm.doc, start);
	      setTimeout(bind(focusInput, cm), 20);
	      e_preventDefault(e);
	      break;
	    case 3:
	      if (captureRightClick) onContextMenu(cm, e);
	      break;
	    }
	  }
	
	  var lastClick, lastDoubleClick;
	  function leftButtonDown(cm, e, start) {
	    setTimeout(bind(ensureFocus, cm), 0);
	
	    var now = +new Date, type;
	    if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
	      type = "triple";
	    } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
	      type = "double";
	      lastDoubleClick = {time: now, pos: start};
	    } else {
	      type = "single";
	      lastClick = {time: now, pos: start};
	    }
	
	    var sel = cm.doc.sel, modifier = mac ? e.metaKey : e.ctrlKey;
	    if (cm.options.dragDrop && dragAndDrop && !isReadOnly(cm) &&
	        type == "single" && sel.contains(start) > -1 && sel.somethingSelected())
	      leftButtonStartDrag(cm, e, start, modifier);
	    else
	      leftButtonSelect(cm, e, start, type, modifier);
	  }
	
	  // Start a text drag. When it ends, see if any dragging actually
	  // happen, and treat as a click if it didn't.
	  function leftButtonStartDrag(cm, e, start, modifier) {
	    var display = cm.display;
	    var dragEnd = operation(cm, function(e2) {
	      if (webkit) display.scroller.draggable = false;
	      cm.state.draggingText = false;
	      off(document, "mouseup", dragEnd);
	      off(display.scroller, "drop", dragEnd);
	      if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
	        e_preventDefault(e2);
	        if (!modifier)
	          extendSelection(cm.doc, start);
	        focusInput(cm);
	        // Work around unexplainable focus problem in IE9 (#2127)
	        if (ie_upto10 && !ie_upto8)
	          setTimeout(function() {document.body.focus(); focusInput(cm);}, 20);
	      }
	    });
	    // Let the drag handler handle this.
	    if (webkit) display.scroller.draggable = true;
	    cm.state.draggingText = dragEnd;
	    // IE's approach to draggable
	    if (display.scroller.dragDrop) display.scroller.dragDrop();
	    on(document, "mouseup", dragEnd);
	    on(display.scroller, "drop", dragEnd);
	  }
	
	  // Normal selection, as opposed to text dragging.
	  function leftButtonSelect(cm, e, start, type, addNew) {
	    var display = cm.display, doc = cm.doc;
	    e_preventDefault(e);
	
	    var ourRange, ourIndex, startSel = doc.sel;
	    if (addNew && !e.shiftKey) {
	      ourIndex = doc.sel.contains(start);
	      if (ourIndex > -1)
	        ourRange = doc.sel.ranges[ourIndex];
	      else
	        ourRange = new Range(start, start);
	    } else {
	      ourRange = doc.sel.primary();
	    }
	
	    if (e.altKey) {
	      type = "rect";
	      if (!addNew) ourRange = new Range(start, start);
	      start = posFromMouse(cm, e, true, true);
	      ourIndex = -1;
	    } else if (type == "double") {
	      var word = findWordAt(cm, start);
	      if (cm.display.shift || doc.extend)
	        ourRange = extendRange(doc, ourRange, word.anchor, word.head);
	      else
	        ourRange = word;
	    } else if (type == "triple") {
	      var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
	      if (cm.display.shift || doc.extend)
	        ourRange = extendRange(doc, ourRange, line.anchor, line.head);
	      else
	        ourRange = line;
	    } else {
	      ourRange = extendRange(doc, ourRange, start);
	    }
	
	    if (!addNew) {
	      ourIndex = 0;
	      setSelection(doc, new Selection([ourRange], 0), sel_mouse);
	      startSel = doc.sel;
	    } else if (ourIndex > -1) {
	      replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
	    } else {
	      ourIndex = doc.sel.ranges.length;
	      setSelection(doc, normalizeSelection(doc.sel.ranges.concat([ourRange]), ourIndex),
	                   {scroll: false, origin: "*mouse"});
	    }
	
	    var lastPos = start;
	    function extendTo(pos) {
	      if (cmp(lastPos, pos) == 0) return;
	      lastPos = pos;
	
	      if (type == "rect") {
	        var ranges = [], tabSize = cm.options.tabSize;
	        var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
	        var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
	        var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
	        for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line));
	             line <= end; line++) {
	          var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
	          if (left == right)
	            ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
	          else if (text.length > leftPos)
	            ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
	        }
	        if (!ranges.length) ranges.push(new Range(start, start));
	        setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex),
	                     {origin: "*mouse", scroll: false});
	        cm.scrollIntoView(pos);
	      } else {
	        var oldRange = ourRange;
	        var anchor = oldRange.anchor, head = pos;
	        if (type != "single") {
	          if (type == "double")
	            var range = findWordAt(cm, pos);
	          else
	            var range = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
	          if (cmp(range.anchor, anchor) > 0) {
	            head = range.head;
	            anchor = minPos(oldRange.from(), range.anchor);
	          } else {
	            head = range.anchor;
	            anchor = maxPos(oldRange.to(), range.head);
	          }
	        }
	        var ranges = startSel.ranges.slice(0);
	        ranges[ourIndex] = new Range(clipPos(doc, anchor), head);
	        setSelection(doc, normalizeSelection(ranges, ourIndex), sel_mouse);
	      }
	    }
	
	    var editorSize = display.wrapper.getBoundingClientRect();
	    // Used to ensure timeout re-tries don't fire when another extend
	    // happened in the meantime (clearTimeout isn't reliable -- at
	    // least on Chrome, the timeouts still happen even when cleared,
	    // if the clear happens after their scheduled firing time).
	    var counter = 0;
	
	    function extend(e) {
	      var curCount = ++counter;
	      var cur = posFromMouse(cm, e, true, type == "rect");
	      if (!cur) return;
	      if (cmp(cur, lastPos) != 0) {
	        ensureFocus(cm);
	        extendTo(cur);
	        var visible = visibleLines(display, doc);
	        if (cur.line >= visible.to || cur.line < visible.from)
	          setTimeout(operation(cm, function(){if (counter == curCount) extend(e);}), 150);
	      } else {
	        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
	        if (outside) setTimeout(operation(cm, function() {
	          if (counter != curCount) return;
	          display.scroller.scrollTop += outside;
	          extend(e);
	        }), 50);
	      }
	    }
	
	    function done(e) {
	      counter = Infinity;
	      e_preventDefault(e);
	      focusInput(cm);
	      off(document, "mousemove", move);
	      off(document, "mouseup", up);
	      doc.history.lastSelOrigin = null;
	    }
	
	    var move = operation(cm, function(e) {
	      if ((ie && !ie_upto9) ?  !e.buttons : !e_button(e)) done(e);
	      else extend(e);
	    });
	    var up = operation(cm, done);
	    on(document, "mousemove", move);
	    on(document, "mouseup", up);
	  }
	
	  // Determines whether an event happened in the gutter, and fires the
	  // handlers for the corresponding event.
	  function gutterEvent(cm, e, type, prevent, signalfn) {
	    try { var mX = e.clientX, mY = e.clientY; }
	    catch(e) { return false; }
	    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) return false;
	    if (prevent) e_preventDefault(e);
	
	    var display = cm.display;
	    var lineBox = display.lineDiv.getBoundingClientRect();
	
	    if (mY > lineBox.bottom || !hasHandler(cm, type)) return e_defaultPrevented(e);
	    mY -= lineBox.top - display.viewOffset;
	
	    for (var i = 0; i < cm.options.gutters.length; ++i) {
	      var g = display.gutters.childNodes[i];
	      if (g && g.getBoundingClientRect().right >= mX) {
	        var line = lineAtHeight(cm.doc, mY);
	        var gutter = cm.options.gutters[i];
	        signalfn(cm, type, cm, line, gutter, e);
	        return e_defaultPrevented(e);
	      }
	    }
	  }
	
	  function clickInGutter(cm, e) {
	    return gutterEvent(cm, e, "gutterClick", true, signalLater);
	  }
	
	  // Kludge to work around strange IE behavior where it'll sometimes
	  // re-fire a series of drag-related events right after the drop (#1551)
	  var lastDrop = 0;
	
	  function onDrop(e) {
	    var cm = this;
	    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
	      return;
	    e_preventDefault(e);
	    if (ie) lastDrop = +new Date;
	    var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
	    if (!pos || isReadOnly(cm)) return;
	    // Might be a file drop, in which case we simply extract the text
	    // and insert it.
	    if (files && files.length && window.FileReader && window.File) {
	      var n = files.length, text = Array(n), read = 0;
	      var loadFile = function(file, i) {
	        var reader = new FileReader;
	        reader.onload = operation(cm, function() {
	          text[i] = reader.result;
	          if (++read == n) {
	            pos = clipPos(cm.doc, pos);
	            var change = {from: pos, to: pos, text: splitLines(text.join("\n")), origin: "paste"};
	            makeChange(cm.doc, change);
	            setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
	          }
	        });
	        reader.readAsText(file);
	      };
	      for (var i = 0; i < n; ++i) loadFile(files[i], i);
	    } else { // Normal drop
	      // Don't do a replace if the drop happened inside of the selected text.
	      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
	        cm.state.draggingText(e);
	        // Ensure the editor is re-focused
	        setTimeout(bind(focusInput, cm), 20);
	        return;
	      }
	      try {
	        var text = e.dataTransfer.getData("Text");
	        if (text) {
	          if (cm.state.draggingText && !(mac ? e.metaKey : e.ctrlKey))
	            var selected = cm.listSelections();
	          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
	          if (selected) for (var i = 0; i < selected.length; ++i)
	            replaceRange(cm.doc, "", selected[i].anchor, selected[i].head, "drag");
	          cm.replaceSelection(text, "around", "paste");
	          focusInput(cm);
	        }
	      }
	      catch(e){}
	    }
	  }
	
	  function onDragStart(cm, e) {
	    if (ie && (!cm.state.draggingText || +new Date - lastDrop < 100)) { e_stop(e); return; }
	    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) return;
	
	    e.dataTransfer.setData("Text", cm.getSelection());
	
	    // Use dummy image instead of default browsers image.
	    // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
	    if (e.dataTransfer.setDragImage && !safari) {
	      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
	      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	      if (presto) {
	        img.width = img.height = 1;
	        cm.display.wrapper.appendChild(img);
	        // Force a relayout, or Opera won't use our image for some obscure reason
	        img._top = img.offsetTop;
	      }
	      e.dataTransfer.setDragImage(img, 0, 0);
	      if (presto) img.parentNode.removeChild(img);
	    }
	  }
	
	  // SCROLL EVENTS
	
	  // Sync the scrollable area and scrollbars, ensure the viewport
	  // covers the visible area.
	  function setScrollTop(cm, val) {
	    if (Math.abs(cm.doc.scrollTop - val) < 2) return;
	    cm.doc.scrollTop = val;
	    if (!gecko) updateDisplay(cm, {top: val});
	    if (cm.display.scroller.scrollTop != val) cm.display.scroller.scrollTop = val;
	    if (cm.display.scrollbarV.scrollTop != val) cm.display.scrollbarV.scrollTop = val;
	    if (gecko) updateDisplay(cm);
	    startWorker(cm, 100);
	  }
	  // Sync scroller and scrollbar, ensure the gutter elements are
	  // aligned.
	  function setScrollLeft(cm, val, isScroller) {
	    if (isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) return;
	    val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
	    cm.doc.scrollLeft = val;
	    alignHorizontally(cm);
	    if (cm.display.scroller.scrollLeft != val) cm.display.scroller.scrollLeft = val;
	    if (cm.display.scrollbarH.scrollLeft != val) cm.display.scrollbarH.scrollLeft = val;
	  }
	
	  // Since the delta values reported on mouse wheel events are
	  // unstandardized between browsers and even browser versions, and
	  // generally horribly unpredictable, this code starts by measuring
	  // the scroll effect that the first few mouse wheel events have,
	  // and, from that, detects the way it can convert deltas to pixel
	  // offsets afterwards.
	  //
	  // The reason we want to know the amount a wheel event will scroll
	  // is that it gives us a chance to update the display before the
	  // actual scrolling happens, reducing flickering.
	
	  var wheelSamples = 0, wheelPixelsPerUnit = null;
	  // Fill in a browser-detected starting value on browsers where we
	  // know one. These don't have to be accurate -- the result of them
	  // being wrong would just be a slight flicker on the first wheel
	  // scroll (if it is large enough).
	  if (ie) wheelPixelsPerUnit = -.53;
	  else if (gecko) wheelPixelsPerUnit = 15;
	  else if (chrome) wheelPixelsPerUnit = -.7;
	  else if (safari) wheelPixelsPerUnit = -1/3;
	
	  function onScrollWheel(cm, e) {
	    var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
	    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) dx = e.detail;
	    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) dy = e.detail;
	    else if (dy == null) dy = e.wheelDelta;
	
	    var display = cm.display, scroll = display.scroller;
	    // Quit if there's nothing to scroll here
	    if (!(dx && scroll.scrollWidth > scroll.clientWidth ||
	          dy && scroll.scrollHeight > scroll.clientHeight)) return;
	
	    // Webkit browsers on OS X abort momentum scrolls when the target
	    // of the scroll event is removed from the scrollable element.
	    // This hack (see related code in patchDisplay) makes sure the
	    // element is kept around.
	    if (dy && mac && webkit) {
	      outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
	        for (var i = 0; i < view.length; i++) {
	          if (view[i].node == cur) {
	            cm.display.currentWheelTarget = cur;
	            break outer;
	          }
	        }
	      }
	    }
	
	    // On some browsers, horizontal scrolling will cause redraws to
	    // happen before the gutter has been realigned, causing it to
	    // wriggle around in a most unseemly way. When we have an
	    // estimated pixels/delta value, we just handle horizontal
	    // scrolling entirely here. It'll be slightly off from native, but
	    // better than glitching out.
	    if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
	      if (dy)
	        setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight)));
	      setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth)));
	      e_preventDefault(e);
	      display.wheelStartX = null; // Abort measurement, if in progress
	      return;
	    }
	
	    // 'Project' the visible viewport to cover the area that is being
	    // scrolled into view (if we know enough to estimate it).
	    if (dy && wheelPixelsPerUnit != null) {
	      var pixels = dy * wheelPixelsPerUnit;
	      var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
	      if (pixels < 0) top = Math.max(0, top + pixels - 50);
	      else bot = Math.min(cm.doc.height, bot + pixels + 50);
	      updateDisplay(cm, {top: top, bottom: bot});
	    }
	
	    if (wheelSamples < 20) {
	      if (display.wheelStartX == null) {
	        display.wheelStartX = scroll.scrollLeft; display.wheelStartY = scroll.scrollTop;
	        display.wheelDX = dx; display.wheelDY = dy;
	        setTimeout(function() {
	          if (display.wheelStartX == null) return;
	          var movedX = scroll.scrollLeft - display.wheelStartX;
	          var movedY = scroll.scrollTop - display.wheelStartY;
	          var sample = (movedY && display.wheelDY && movedY / display.wheelDY) ||
	            (movedX && display.wheelDX && movedX / display.wheelDX);
	          display.wheelStartX = display.wheelStartY = null;
	          if (!sample) return;
	          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
	          ++wheelSamples;
	        }, 200);
	      } else {
	        display.wheelDX += dx; display.wheelDY += dy;
	      }
	    }
	  }
	
	  // KEY EVENTS
	
	  // Run a handler that was bound to a key.
	  function doHandleBinding(cm, bound, dropShift) {
	    if (typeof bound == "string") {
	      bound = commands[bound];
	      if (!bound) return false;
	    }
	    // Ensure previous input has been read, so that the handler sees a
	    // consistent view of the document
	    if (cm.display.pollingFast && readInput(cm)) cm.display.pollingFast = false;
	    var prevShift = cm.display.shift, done = false;
	    try {
	      if (isReadOnly(cm)) cm.state.suppressEdits = true;
	      if (dropShift) cm.display.shift = false;
	      done = bound(cm) != Pass;
	    } finally {
	      cm.display.shift = prevShift;
	      cm.state.suppressEdits = false;
	    }
	    return done;
	  }
	
	  // Collect the currently active keymaps.
	  function allKeyMaps(cm) {
	    var maps = cm.state.keyMaps.slice(0);
	    if (cm.options.extraKeys) maps.push(cm.options.extraKeys);
	    maps.push(cm.options.keyMap);
	    return maps;
	  }
	
	  var maybeTransition;
	  // Handle a key from the keydown event.
	  function handleKeyBinding(cm, e) {
	    // Handle automatic keymap transitions
	    var startMap = getKeyMap(cm.options.keyMap), next = startMap.auto;
	    clearTimeout(maybeTransition);
	    if (next && !isModifierKey(e)) maybeTransition = setTimeout(function() {
	      if (getKeyMap(cm.options.keyMap) == startMap) {
	        cm.options.keyMap = (next.call ? next.call(null, cm) : next);
	        keyMapChanged(cm);
	      }
	    }, 50);
	
	    var name = keyName(e, true), handled = false;
	    if (!name) return false;
	    var keymaps = allKeyMaps(cm);
	
	    if (e.shiftKey) {
	      // First try to resolve full name (including 'Shift-'). Failing
	      // that, see if there is a cursor-motion command (starting with
	      // 'go') bound to the keyname without 'Shift-'.
	      handled = lookupKey("Shift-" + name, keymaps, function(b) {return doHandleBinding(cm, b, true);})
	             || lookupKey(name, keymaps, function(b) {
	                  if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion)
	                    return doHandleBinding(cm, b);
	                });
	    } else {
	      handled = lookupKey(name, keymaps, function(b) { return doHandleBinding(cm, b); });
	    }
	
	    if (handled) {
	      e_preventDefault(e);
	      restartBlink(cm);
	      signalLater(cm, "keyHandled", cm, name, e);
	    }
	    return handled;
	  }
	
	  // Handle a key from the keypress event
	  function handleCharBinding(cm, e, ch) {
	    var handled = lookupKey("'" + ch + "'", allKeyMaps(cm),
	                            function(b) { return doHandleBinding(cm, b, true); });
	    if (handled) {
	      e_preventDefault(e);
	      restartBlink(cm);
	      signalLater(cm, "keyHandled", cm, "'" + ch + "'", e);
	    }
	    return handled;
	  }
	
	  var lastStoppedKey = null;
	  function onKeyDown(e) {
	    var cm = this;
	    ensureFocus(cm);
	    if (signalDOMEvent(cm, e)) return;
	    // IE does strange things with escape.
	    if (ie_upto10 && e.keyCode == 27) e.returnValue = false;
	    var code = e.keyCode;
	    cm.display.shift = code == 16 || e.shiftKey;
	    var handled = handleKeyBinding(cm, e);
	    if (presto) {
	      lastStoppedKey = handled ? code : null;
	      // Opera has no cut event... we try to at least catch the key combo
	      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey))
	        cm.replaceSelection("", null, "cut");
	    }
	
	    // Turn mouse into crosshair when Alt is held on Mac.
	    if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className))
	      showCrossHair(cm);
	  }
	
	  function showCrossHair(cm) {
	    var lineDiv = cm.display.lineDiv;
	    addClass(lineDiv, "CodeMirror-crosshair");
	
	    function up(e) {
	      if (e.keyCode == 18 || !e.altKey) {
	        rmClass(lineDiv, "CodeMirror-crosshair");
	        off(document, "keyup", up);
	        off(document, "mouseover", up);
	      }
	    }
	    on(document, "keyup", up);
	    on(document, "mouseover", up);
	  }
	
	  function onKeyUp(e) {
	    if (signalDOMEvent(this, e)) return;
	    if (e.keyCode == 16) this.doc.sel.shift = false;
	  }
	
	  function onKeyPress(e) {
	    var cm = this;
	    if (signalDOMEvent(cm, e)) return;
	    var keyCode = e.keyCode, charCode = e.charCode;
	    if (presto && keyCode == lastStoppedKey) {lastStoppedKey = null; e_preventDefault(e); return;}
	    if (((presto && (!e.which || e.which < 10)) || khtml) && handleKeyBinding(cm, e)) return;
	    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
	    if (handleCharBinding(cm, e, ch)) return;
	    if (ie && !ie_upto8) cm.display.inputHasSelection = null;
	    fastPoll(cm);
	  }
	
	  // FOCUS/BLUR EVENTS
	
	  function onFocus(cm) {
	    if (cm.options.readOnly == "nocursor") return;
	    if (!cm.state.focused) {
	      signal(cm, "focus", cm);
	      cm.state.focused = true;
	      addClass(cm.display.wrapper, "CodeMirror-focused");
	      // The prevInput test prevents this from firing when a context
	      // menu is closed (since the resetInput would kill the
	      // select-all detection hack)
	      if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
	        resetInput(cm);
	        if (webkit) setTimeout(bind(resetInput, cm, true), 0); // Issue #1730
	      }
	    }
	    slowPoll(cm);
	    restartBlink(cm);
	  }
	  function onBlur(cm) {
	    if (cm.state.focused) {
	      signal(cm, "blur", cm);
	      cm.state.focused = false;
	      rmClass(cm.display.wrapper, "CodeMirror-focused");
	    }
	    clearInterval(cm.display.blinker);
	    setTimeout(function() {if (!cm.state.focused) cm.display.shift = false;}, 150);
	  }
	
	  // CONTEXT MENU HANDLING
	
	  // To make the context menu work, we need to briefly unhide the
	  // textarea (making it as unobtrusive as possible) to let the
	  // right-click take effect on it.
	  function onContextMenu(cm, e) {
	    if (signalDOMEvent(cm, e, "contextmenu")) return;
	    var display = cm.display;
	    if (eventInWidget(display, e) || contextMenuInGutter(cm, e)) return;
	
	    var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
	    if (!pos || presto) return; // Opera is difficult.
	
	    // Reset the current text selection only if the click is done outside of the selection
	    // and 'resetSelectionOnContextMenu' option is true.
	    var reset = cm.options.resetSelectionOnContextMenu;
	    if (reset && cm.doc.sel.contains(pos) == -1)
	      operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
	
	    var oldCSS = display.input.style.cssText;
	    display.inputDiv.style.position = "absolute";
	    display.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) +
	      "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: " +
	      (ie ? "rgba(255, 255, 255, .05)" : "transparent") +
	      "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
	    focusInput(cm);
	    resetInput(cm);
	    // Adds "Select all" to context menu in FF
	    if (!cm.somethingSelected()) display.input.value = display.prevInput = " ";
	    display.selForContextMenu = cm.doc.sel;
	    clearTimeout(display.detectingSelectAll);
	
	    // Select-all will be greyed out if there's nothing to select, so
	    // this adds a zero-width space so that we can later check whether
	    // it got selected.
	    function prepareSelectAllHack() {
	      if (display.input.selectionStart != null) {
	        var selected = cm.somethingSelected();
	        var extval = display.input.value = "\u200b" + (selected ? display.input.value : "");
	        display.prevInput = selected ? "" : "\u200b";
	        display.input.selectionStart = 1; display.input.selectionEnd = extval.length;
	        // Re-set this, in case some other handler touched the
	        // selection in the meantime.
	        display.selForContextMenu = cm.doc.sel;
	      }
	    }
	    function rehide() {
	      display.inputDiv.style.position = "relative";
	      display.input.style.cssText = oldCSS;
	      if (ie_upto8) display.scrollbarV.scrollTop = display.scroller.scrollTop = scrollPos;
	      slowPoll(cm);
	
	      // Try to detect the user choosing select-all
	      if (display.input.selectionStart != null) {
	        if (!ie || ie_upto8) prepareSelectAllHack();
	        var i = 0, poll = function() {
	          if (display.selForContextMenu == cm.doc.sel && display.input.selectionStart == 0)
	            operation(cm, commands.selectAll)(cm);
	          else if (i++ < 10) display.detectingSelectAll = setTimeout(poll, 500);
	          else resetInput(cm);
	        };
	        display.detectingSelectAll = setTimeout(poll, 200);
	      }
	    }
	
	    if (ie && !ie_upto8) prepareSelectAllHack();
	    if (captureRightClick) {
	      e_stop(e);
	      var mouseup = function() {
	        off(window, "mouseup", mouseup);
	        setTimeout(rehide, 20);
	      };
	      on(window, "mouseup", mouseup);
	    } else {
	      setTimeout(rehide, 50);
	    }
	  }
	
	  function contextMenuInGutter(cm, e) {
	    if (!hasHandler(cm, "gutterContextMenu")) return false;
	    return gutterEvent(cm, e, "gutterContextMenu", false, signal);
	  }
	
	  // UPDATING
	
	  // Compute the position of the end of a change (its 'to' property
	  // refers to the pre-change end).
	  var changeEnd = CodeMirror.changeEnd = function(change) {
	    if (!change.text) return change.to;
	    return Pos(change.from.line + change.text.length - 1,
	               lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
	  };
	
	  // Adjust a position to refer to the post-change position of the
	  // same text, or the end of the change if the change covers it.
	  function adjustForChange(pos, change) {
	    if (cmp(pos, change.from) < 0) return pos;
	    if (cmp(pos, change.to) <= 0) return changeEnd(change);
	
	    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
	    if (pos.line == change.to.line) ch += changeEnd(change).ch - change.to.ch;
	    return Pos(line, ch);
	  }
	
	  function computeSelAfterChange(doc, change) {
	    var out = [];
	    for (var i = 0; i < doc.sel.ranges.length; i++) {
	      var range = doc.sel.ranges[i];
	      out.push(new Range(adjustForChange(range.anchor, change),
	                         adjustForChange(range.head, change)));
	    }
	    return normalizeSelection(out, doc.sel.primIndex);
	  }
	
	  function offsetPos(pos, old, nw) {
	    if (pos.line == old.line)
	      return Pos(nw.line, pos.ch - old.ch + nw.ch);
	    else
	      return Pos(nw.line + (pos.line - old.line), pos.ch);
	  }
	
	  // Used by replaceSelections to allow moving the selection to the
	  // start or around the replaced test. Hint may be "start" or "around".
	  function computeReplacedSel(doc, changes, hint) {
	    var out = [];
	    var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
	    for (var i = 0; i < changes.length; i++) {
	      var change = changes[i];
	      var from = offsetPos(change.from, oldPrev, newPrev);
	      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
	      oldPrev = change.to;
	      newPrev = to;
	      if (hint == "around") {
	        var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
	        out[i] = new Range(inv ? to : from, inv ? from : to);
	      } else {
	        out[i] = new Range(from, from);
	      }
	    }
	    return new Selection(out, doc.sel.primIndex);
	  }
	
	  // Allow "beforeChange" event handlers to influence a change
	  function filterChange(doc, change, update) {
	    var obj = {
	      canceled: false,
	      from: change.from,
	      to: change.to,
	      text: change.text,
	      origin: change.origin,
	      cancel: function() { this.canceled = true; }
	    };
	    if (update) obj.update = function(from, to, text, origin) {
	      if (from) this.from = clipPos(doc, from);
	      if (to) this.to = clipPos(doc, to);
	      if (text) this.text = text;
	      if (origin !== undefined) this.origin = origin;
	    };
	    signal(doc, "beforeChange", doc, obj);
	    if (doc.cm) signal(doc.cm, "beforeChange", doc.cm, obj);
	
	    if (obj.canceled) return null;
	    return {from: obj.from, to: obj.to, text: obj.text, origin: obj.origin};
	  }
	
	  // Apply a change to a document, and add it to the document's
	  // history, and propagating it to all linked documents.
	  function makeChange(doc, change, ignoreReadOnly) {
	    if (doc.cm) {
	      if (!doc.cm.curOp) return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
	      if (doc.cm.state.suppressEdits) return;
	    }
	
	    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
	      change = filterChange(doc, change, true);
	      if (!change) return;
	    }
	
	    // Possibly split or suppress the update based on the presence
	    // of read-only spans in its range.
	    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
	    if (split) {
	      for (var i = split.length - 1; i >= 0; --i)
	        makeChangeInner(doc, {from: split[i].from, to: split[i].to, text: i ? [""] : change.text});
	    } else {
	      makeChangeInner(doc, change);
	    }
	  }
	
	  function makeChangeInner(doc, change) {
	    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) return;
	    var selAfter = computeSelAfterChange(doc, change);
	    addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);
	
	    makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
	    var rebased = [];
	
	    linkedDocs(doc, function(doc, sharedHist) {
	      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
	        rebaseHist(doc.history, change);
	        rebased.push(doc.history);
	      }
	      makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
	    });
	  }
	
	  // Revert a change stored in a document's history.
	  function makeChangeFromHistory(doc, type, allowSelectionOnly) {
	    if (doc.cm && doc.cm.state.suppressEdits) return;
	
	    var hist = doc.history, event, selAfter = doc.sel;
	    var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
	
	    // Verify that there is a useable event (so that ctrl-z won't
	    // needlessly clear selection events)
	    for (var i = 0; i < source.length; i++) {
	      event = source[i];
	      if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges)
	        break;
	    }
	    if (i == source.length) return;
	    hist.lastOrigin = hist.lastSelOrigin = null;
	
	    for (;;) {
	      event = source.pop();
	      if (event.ranges) {
	        pushSelectionToHistory(event, dest);
	        if (allowSelectionOnly && !event.equals(doc.sel)) {
	          setSelection(doc, event, {clearRedo: false});
	          return;
	        }
	        selAfter = event;
	      }
	      else break;
	    }
	
	    // Build up a reverse change object to add to the opposite history
	    // stack (redo when undoing, and vice versa).
	    var antiChanges = [];
	    pushSelectionToHistory(selAfter, dest);
	    dest.push({changes: antiChanges, generation: hist.generation});
	    hist.generation = event.generation || ++hist.maxGeneration;
	
	    var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");
	
	    for (var i = event.changes.length - 1; i >= 0; --i) {
	      var change = event.changes[i];
	      change.origin = type;
	      if (filter && !filterChange(doc, change, false)) {
	        source.length = 0;
	        return;
	      }
	
	      antiChanges.push(historyChangeFromChange(doc, change));
	
	      var after = i ? computeSelAfterChange(doc, change, null) : lst(source);
	      makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
	      if (!i && doc.cm) doc.cm.scrollIntoView(change);
	      var rebased = [];
	
	      // Propagate to the linked documents
	      linkedDocs(doc, function(doc, sharedHist) {
	        if (!sharedHist && indexOf(rebased, doc.history) == -1) {
	          rebaseHist(doc.history, change);
	          rebased.push(doc.history);
	        }
	        makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
	      });
	    }
	  }
	
	  // Sub-views need their line numbers shifted when text is added
	  // above or below them in the parent document.
	  function shiftDoc(doc, distance) {
	    if (distance == 0) return;
	    doc.first += distance;
	    doc.sel = new Selection(map(doc.sel.ranges, function(range) {
	      return new Range(Pos(range.anchor.line + distance, range.anchor.ch),
	                       Pos(range.head.line + distance, range.head.ch));
	    }), doc.sel.primIndex);
	    if (doc.cm) {
	      regChange(doc.cm, doc.first, doc.first - distance, distance);
	      for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++)
	        regLineChange(doc.cm, l, "gutter");
	    }
	  }
	
	  // More lower-level change function, handling only a single document
	  // (not linked ones).
	  function makeChangeSingleDoc(doc, change, selAfter, spans) {
	    if (doc.cm && !doc.cm.curOp)
	      return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
	
	    if (change.to.line < doc.first) {
	      shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
	      return;
	    }
	    if (change.from.line > doc.lastLine()) return;
	
	    // Clip the change to the size of this doc
	    if (change.from.line < doc.first) {
	      var shift = change.text.length - 1 - (doc.first - change.from.line);
	      shiftDoc(doc, shift);
	      change = {from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
	                text: [lst(change.text)], origin: change.origin};
	    }
	    var last = doc.lastLine();
	    if (change.to.line > last) {
	      change = {from: change.from, to: Pos(last, getLine(doc, last).text.length),
	                text: [change.text[0]], origin: change.origin};
	    }
	
	    change.removed = getBetween(doc, change.from, change.to);
	
	    if (!selAfter) selAfter = computeSelAfterChange(doc, change, null);
	    if (doc.cm) makeChangeSingleDocInEditor(doc.cm, change, spans);
	    else updateDoc(doc, change, spans);
	    setSelectionNoUndo(doc, selAfter, sel_dontScroll);
	  }
	
	  // Handle the interaction of a change to a document with the editor
	  // that this document is part of.
	  function makeChangeSingleDocInEditor(cm, change, spans) {
	    var doc = cm.doc, display = cm.display, from = change.from, to = change.to;
	
	    var recomputeMaxLength = false, checkWidthStart = from.line;
	    if (!cm.options.lineWrapping) {
	      checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
	      doc.iter(checkWidthStart, to.line + 1, function(line) {
	        if (line == display.maxLine) {
	          recomputeMaxLength = true;
	          return true;
	        }
	      });
	    }
	
	    if (doc.sel.contains(change.from, change.to) > -1)
	      signalCursorActivity(cm);
	
	    updateDoc(doc, change, spans, estimateHeight(cm));
	
	    if (!cm.options.lineWrapping) {
	      doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
	        var len = lineLength(line);
	        if (len > display.maxLineLength) {
	          display.maxLine = line;
	          display.maxLineLength = len;
	          display.maxLineChanged = true;
	          recomputeMaxLength = false;
	        }
	      });
	      if (recomputeMaxLength) cm.curOp.updateMaxLine = true;
	    }
	
	    // Adjust frontier, schedule worker
	    doc.frontier = Math.min(doc.frontier, from.line);
	    startWorker(cm, 400);
	
	    var lendiff = change.text.length - (to.line - from.line) - 1;
	    // Remember that these lines changed, for updating the display
	    if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change))
	      regLineChange(cm, from.line, "text");
	    else
	      regChange(cm, from.line, to.line + 1, lendiff);
	
	    var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
	    if (changeHandler || changesHandler) {
	      var obj = {
	        from: from, to: to,
	        text: change.text,
	        removed: change.removed,
	        origin: change.origin
	      };
	      if (changeHandler) signalLater(cm, "change", cm, obj);
	      if (changesHandler) (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
	    }
	    cm.display.selForContextMenu = null;
	  }
	
	  function replaceRange(doc, code, from, to, origin) {
	    if (!to) to = from;
	    if (cmp(to, from) < 0) { var tmp = to; to = from; from = tmp; }
	    if (typeof code == "string") code = splitLines(code);
	    makeChange(doc, {from: from, to: to, text: code, origin: origin});
	  }
	
	  // SCROLLING THINGS INTO VIEW
	
	  // If an editor sits on the top or bottom of the window, partially
	  // scrolled out of view, this ensures that the cursor is visible.
	  function maybeScrollWindow(cm, coords) {
	    var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
	    if (coords.top + box.top < 0) doScroll = true;
	    else if (coords.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) doScroll = false;
	    if (doScroll != null && !phantom) {
	      var scrollNode = elt("div", "\u200b", null, "position: absolute; top: " +
	                           (coords.top - display.viewOffset - paddingTop(cm.display)) + "px; height: " +
	                           (coords.bottom - coords.top + scrollerCutOff) + "px; left: " +
	                           coords.left + "px; width: 2px;");
	      cm.display.lineSpace.appendChild(scrollNode);
	      scrollNode.scrollIntoView(doScroll);
	      cm.display.lineSpace.removeChild(scrollNode);
	    }
	  }
	
	  // Scroll a given position into view (immediately), verifying that
	  // it actually became visible (as line heights are accurately
	  // measured, the position of something may 'drift' during drawing).
	  function scrollPosIntoView(cm, pos, end, margin) {
	    if (margin == null) margin = 0;
	    for (;;) {
	      var changed = false, coords = cursorCoords(cm, pos);
	      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
	      var scrollPos = calculateScrollPos(cm, Math.min(coords.left, endCoords.left),
	                                         Math.min(coords.top, endCoords.top) - margin,
	                                         Math.max(coords.left, endCoords.left),
	                                         Math.max(coords.bottom, endCoords.bottom) + margin);
	      var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
	      if (scrollPos.scrollTop != null) {
	        setScrollTop(cm, scrollPos.scrollTop);
	        if (Math.abs(cm.doc.scrollTop - startTop) > 1) changed = true;
	      }
	      if (scrollPos.scrollLeft != null) {
	        setScrollLeft(cm, scrollPos.scrollLeft);
	        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) changed = true;
	      }
	      if (!changed) return coords;
	    }
	  }
	
	  // Scroll a given set of coordinates into view (immediately).
	  function scrollIntoView(cm, x1, y1, x2, y2) {
	    var scrollPos = calculateScrollPos(cm, x1, y1, x2, y2);
	    if (scrollPos.scrollTop != null) setScrollTop(cm, scrollPos.scrollTop);
	    if (scrollPos.scrollLeft != null) setScrollLeft(cm, scrollPos.scrollLeft);
	  }
	
	  // Calculate a new scroll position needed to scroll the given
	  // rectangle into view. Returns an object with scrollTop and
	  // scrollLeft properties. When these are undefined, the
	  // vertical/horizontal position does not need to be adjusted.
	  function calculateScrollPos(cm, x1, y1, x2, y2) {
	    var display = cm.display, snapMargin = textHeight(cm.display);
	    if (y1 < 0) y1 = 0;
	    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
	    var screen = display.scroller.clientHeight - scrollerCutOff, result = {};
	    var docBottom = cm.doc.height + paddingVert(display);
	    var atTop = y1 < snapMargin, atBottom = y2 > docBottom - snapMargin;
	    if (y1 < screentop) {
	      result.scrollTop = atTop ? 0 : y1;
	    } else if (y2 > screentop + screen) {
	      var newTop = Math.min(y1, (atBottom ? docBottom : y2) - screen);
	      if (newTop != screentop) result.scrollTop = newTop;
	    }
	
	    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
	    var screenw = display.scroller.clientWidth - scrollerCutOff;
	    x1 += display.gutters.offsetWidth; x2 += display.gutters.offsetWidth;
	    var gutterw = display.gutters.offsetWidth;
	    var atLeft = x1 < gutterw + 10;
	    if (x1 < screenleft + gutterw || atLeft) {
	      if (atLeft) x1 = 0;
	      result.scrollLeft = Math.max(0, x1 - 10 - gutterw);
	    } else if (x2 > screenw + screenleft - 3) {
	      result.scrollLeft = x2 + 10 - screenw;
	    }
	    return result;
	  }
	
	  // Store a relative adjustment to the scroll position in the current
	  // operation (to be applied when the operation finishes).
	  function addToScrollPos(cm, left, top) {
	    if (left != null || top != null) resolveScrollToPos(cm);
	    if (left != null)
	      cm.curOp.scrollLeft = (cm.curOp.scrollLeft == null ? cm.doc.scrollLeft : cm.curOp.scrollLeft) + left;
	    if (top != null)
	      cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
	  }
	
	  // Make sure that at the end of the operation the current cursor is
	  // shown.
	  function ensureCursorVisible(cm) {
	    resolveScrollToPos(cm);
	    var cur = cm.getCursor(), from = cur, to = cur;
	    if (!cm.options.lineWrapping) {
	      from = cur.ch ? Pos(cur.line, cur.ch - 1) : cur;
	      to = Pos(cur.line, cur.ch + 1);
	    }
	    cm.curOp.scrollToPos = {from: from, to: to, margin: cm.options.cursorScrollMargin, isCursor: true};
	  }
	
	  // When an operation has its scrollToPos property set, and another
	  // scroll action is applied before the end of the operation, this
	  // 'simulates' scrolling that position into view in a cheap way, so
	  // that the effect of intermediate scroll commands is not ignored.
	  function resolveScrollToPos(cm) {
	    var range = cm.curOp.scrollToPos;
	    if (range) {
	      cm.curOp.scrollToPos = null;
	      var from = estimateCoords(cm, range.from), to = estimateCoords(cm, range.to);
	      var sPos = calculateScrollPos(cm, Math.min(from.left, to.left),
	                                    Math.min(from.top, to.top) - range.margin,
	                                    Math.max(from.right, to.right),
	                                    Math.max(from.bottom, to.bottom) + range.margin);
	      cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
	    }
	  }
	
	  // API UTILITIES
	
	  // Indent the given line. The how parameter can be "smart",
	  // "add"/null, "subtract", or "prev". When aggressive is false
	  // (typically set to true for forced single-line indents), empty
	  // lines are not indented, and places where the mode returns Pass
	  // are left alone.
	  function indentLine(cm, n, how, aggressive) {
	    var doc = cm.doc, state;
	    if (how == null) how = "add";
	    if (how == "smart") {
	      // Fall back to "prev" when the mode doesn't have an indentation
	      // method.
	      if (!cm.doc.mode.indent) how = "prev";
	      else state = getStateBefore(cm, n);
	    }
	
	    var tabSize = cm.options.tabSize;
	    var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
	    if (line.stateAfter) line.stateAfter = null;
	    var curSpaceString = line.text.match(/^\s*/)[0], indentation;
	    if (!aggressive && !/\S/.test(line.text)) {
	      indentation = 0;
	      how = "not";
	    } else if (how == "smart") {
	      indentation = cm.doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
	      if (indentation == Pass) {
	        if (!aggressive) return;
	        how = "prev";
	      }
	    }
	    if (how == "prev") {
	      if (n > doc.first) indentation = countColumn(getLine(doc, n-1).text, null, tabSize);
	      else indentation = 0;
	    } else if (how == "add") {
	      indentation = curSpace + cm.options.indentUnit;
	    } else if (how == "subtract") {
	      indentation = curSpace - cm.options.indentUnit;
	    } else if (typeof how == "number") {
	      indentation = curSpace + how;
	    }
	    indentation = Math.max(0, indentation);
	
	    var indentString = "", pos = 0;
	    if (cm.options.indentWithTabs)
	      for (var i = Math.floor(indentation / tabSize); i; --i) {pos += tabSize; indentString += "\t";}
	    if (pos < indentation) indentString += spaceStr(indentation - pos);
	
	    if (indentString != curSpaceString) {
	      replaceRange(cm.doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
	    } else {
	      // Ensure that, if the cursor was in the whitespace at the start
	      // of the line, it is moved to the end of that space.
	      for (var i = 0; i < doc.sel.ranges.length; i++) {
	        var range = doc.sel.ranges[i];
	        if (range.head.line == n && range.head.ch < curSpaceString.length) {
	          var pos = Pos(n, curSpaceString.length);
	          replaceOneSelection(doc, i, new Range(pos, pos));
	          break;
	        }
	      }
	    }
	    line.stateAfter = null;
	  }
	
	  // Utility for applying a change to a line by handle or number,
	  // returning the number and optionally registering the line as
	  // changed.
	  function changeLine(cm, handle, changeType, op) {
	    var no = handle, line = handle, doc = cm.doc;
	    if (typeof handle == "number") line = getLine(doc, clipLine(doc, handle));
	    else no = lineNo(handle);
	    if (no == null) return null;
	    if (op(line, no)) regLineChange(cm, no, changeType);
	    return line;
	  }
	
	  // Helper for deleting text near the selection(s), used to implement
	  // backspace, delete, and similar functionality.
	  function deleteNearSelection(cm, compute) {
	    var ranges = cm.doc.sel.ranges, kill = [];
	    // Build up a set of ranges to kill first, merging overlapping
	    // ranges.
	    for (var i = 0; i < ranges.length; i++) {
	      var toKill = compute(ranges[i]);
	      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
	        var replaced = kill.pop();
	        if (cmp(replaced.from, toKill.from) < 0) {
	          toKill.from = replaced.from;
	          break;
	        }
	      }
	      kill.push(toKill);
	    }
	    // Next, remove those actual ranges.
	    runInOp(cm, function() {
	      for (var i = kill.length - 1; i >= 0; i--)
	        replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
	      ensureCursorVisible(cm);
	    });
	  }
	
	  // Used for horizontal relative motion. Dir is -1 or 1 (left or
	  // right), unit can be "char", "column" (like char, but doesn't
	  // cross line boundaries), "word" (across next word), or "group" (to
	  // the start of next group of word or non-word-non-whitespace
	  // chars). The visually param controls whether, in right-to-left
	  // text, direction 1 means to move towards the next index in the
	  // string, or towards the character to the right of the current
	  // position. The resulting position will have a hitSide=true
	  // property if it reached the end of the document.
	  function findPosH(doc, pos, dir, unit, visually) {
	    var line = pos.line, ch = pos.ch, origDir = dir;
	    var lineObj = getLine(doc, line);
	    var possible = true;
	    function findNextLine() {
	      var l = line + dir;
	      if (l < doc.first || l >= doc.first + doc.size) return (possible = false);
	      line = l;
	      return lineObj = getLine(doc, l);
	    }
	    function moveOnce(boundToLine) {
	      var next = (visually ? moveVisually : moveLogically)(lineObj, ch, dir, true);
	      if (next == null) {
	        if (!boundToLine && findNextLine()) {
	          if (visually) ch = (dir < 0 ? lineRight : lineLeft)(lineObj);
	          else ch = dir < 0 ? lineObj.text.length : 0;
	        } else return (possible = false);
	      } else ch = next;
	      return true;
	    }
	
	    if (unit == "char") moveOnce();
	    else if (unit == "column") moveOnce(true);
	    else if (unit == "word" || unit == "group") {
	      var sawType = null, group = unit == "group";
	      var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
	      for (var first = true;; first = false) {
	        if (dir < 0 && !moveOnce(!first)) break;
	        var cur = lineObj.text.charAt(ch) || "\n";
	        var type = isWordChar(cur, helper) ? "w"
	          : group && cur == "\n" ? "n"
	          : !group || /\s/.test(cur) ? null
	          : "p";
	        if (group && !first && !type) type = "s";
	        if (sawType && sawType != type) {
	          if (dir < 0) {dir = 1; moveOnce();}
	          break;
	        }
	
	        if (type) sawType = type;
	        if (dir > 0 && !moveOnce(!first)) break;
	      }
	    }
	    var result = skipAtomic(doc, Pos(line, ch), origDir, true);
	    if (!possible) result.hitSide = true;
	    return result;
	  }
	
	  // For relative vertical movement. Dir may be -1 or 1. Unit can be
	  // "page" or "line". The resulting position will have a hitSide=true
	  // property if it reached the end of the document.
	  function findPosV(cm, pos, dir, unit) {
	    var doc = cm.doc, x = pos.left, y;
	    if (unit == "page") {
	      var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
	      y = pos.top + dir * (pageSize - (dir < 0 ? 1.5 : .5) * textHeight(cm.display));
	    } else if (unit == "line") {
	      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
	    }
	    for (;;) {
	      var target = coordsChar(cm, x, y);
	      if (!target.outside) break;
	      if (dir < 0 ? y <= 0 : y >= doc.height) { target.hitSide = true; break; }
	      y += dir * 5;
	    }
	    return target;
	  }
	
	  // Find the word at the given position (as returned by coordsChar).
	  function findWordAt(cm, pos) {
	    var doc = cm.doc, line = getLine(doc, pos.line).text;
	    var start = pos.ch, end = pos.ch;
	    if (line) {
	      var helper = cm.getHelper(pos, "wordChars");
	      if ((pos.xRel < 0 || end == line.length) && start) --start; else ++end;
	      var startChar = line.charAt(start);
	      var check = isWordChar(startChar, helper)
	        ? function(ch) { return isWordChar(ch, helper); }
	        : /\s/.test(startChar) ? function(ch) {return /\s/.test(ch);}
	        : function(ch) {return !/\s/.test(ch) && !isWordChar(ch);};
	      while (start > 0 && check(line.charAt(start - 1))) --start;
	      while (end < line.length && check(line.charAt(end))) ++end;
	    }
	    return new Range(Pos(pos.line, start), Pos(pos.line, end));
	  }
	
	  // EDITOR METHODS
	
	  // The publicly visible API. Note that methodOp(f) means
	  // 'wrap f in an operation, performed on its `this` parameter'.
	
	  // This is not the complete set of editor methods. Most of the
	  // methods defined on the Doc type are also injected into
	  // CodeMirror.prototype, for backwards compatibility and
	  // convenience.
	
	  CodeMirror.prototype = {
	    constructor: CodeMirror,
	    focus: function(){window.focus(); focusInput(this); fastPoll(this);},
	
	    setOption: function(option, value) {
	      var options = this.options, old = options[option];
	      if (options[option] == value && option != "mode") return;
	      options[option] = value;
	      if (optionHandlers.hasOwnProperty(option))
	        operation(this, optionHandlers[option])(this, value, old);
	    },
	
	    getOption: function(option) {return this.options[option];},
	    getDoc: function() {return this.doc;},
	
	    addKeyMap: function(map, bottom) {
	      this.state.keyMaps[bottom ? "push" : "unshift"](map);
	    },
	    removeKeyMap: function(map) {
	      var maps = this.state.keyMaps;
	      for (var i = 0; i < maps.length; ++i)
	        if (maps[i] == map || (typeof maps[i] != "string" && maps[i].name == map)) {
	          maps.splice(i, 1);
	          return true;
	        }
	    },
	
	    addOverlay: methodOp(function(spec, options) {
	      var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
	      if (mode.startState) throw new Error("Overlays may not be stateful.");
	      this.state.overlays.push({mode: mode, modeSpec: spec, opaque: options && options.opaque});
	      this.state.modeGen++;
	      regChange(this);
	    }),
	    removeOverlay: methodOp(function(spec) {
	      var overlays = this.state.overlays;
	      for (var i = 0; i < overlays.length; ++i) {
	        var cur = overlays[i].modeSpec;
	        if (cur == spec || typeof spec == "string" && cur.name == spec) {
	          overlays.splice(i, 1);
	          this.state.modeGen++;
	          regChange(this);
	          return;
	        }
	      }
	    }),
	
	    indentLine: methodOp(function(n, dir, aggressive) {
	      if (typeof dir != "string" && typeof dir != "number") {
	        if (dir == null) dir = this.options.smartIndent ? "smart" : "prev";
	        else dir = dir ? "add" : "subtract";
	      }
	      if (isLine(this.doc, n)) indentLine(this, n, dir, aggressive);
	    }),
	    indentSelection: methodOp(function(how) {
	      var ranges = this.doc.sel.ranges, end = -1;
	      for (var i = 0; i < ranges.length; i++) {
	        var range = ranges[i];
	        if (!range.empty()) {
	          var start = Math.max(end, range.from().line);
	          var to = range.to();
	          end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
	          for (var j = start; j < end; ++j)
	            indentLine(this, j, how);
	        } else if (range.head.line > end) {
	          indentLine(this, range.head.line, how, true);
	          end = range.head.line;
	          if (i == this.doc.sel.primIndex) ensureCursorVisible(this);
	        }
	      }
	    }),
	
	    // Fetch the parser token for a given character. Useful for hacks
	    // that want to inspect the mode state (say, for completion).
	    getTokenAt: function(pos, precise) {
	      var doc = this.doc;
	      pos = clipPos(doc, pos);
	      var state = getStateBefore(this, pos.line, precise), mode = this.doc.mode;
	      var line = getLine(doc, pos.line);
	      var stream = new StringStream(line.text, this.options.tabSize);
	      while (stream.pos < pos.ch && !stream.eol()) {
	        stream.start = stream.pos;
	        var style = readToken(mode, stream, state);
	      }
	      return {start: stream.start,
	              end: stream.pos,
	              string: stream.current(),
	              type: style || null,
	              state: state};
	    },
	
	    getTokenTypeAt: function(pos) {
	      pos = clipPos(this.doc, pos);
	      var styles = getLineStyles(this, getLine(this.doc, pos.line));
	      var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
	      var type;
	      if (ch == 0) type = styles[2];
	      else for (;;) {
	        var mid = (before + after) >> 1;
	        if ((mid ? styles[mid * 2 - 1] : 0) >= ch) after = mid;
	        else if (styles[mid * 2 + 1] < ch) before = mid + 1;
	        else { type = styles[mid * 2 + 2]; break; }
	      }
	      var cut = type ? type.indexOf("cm-overlay ") : -1;
	      return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
	    },
	
	    getModeAt: function(pos) {
	      var mode = this.doc.mode;
	      if (!mode.innerMode) return mode;
	      return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode;
	    },
	
	    getHelper: function(pos, type) {
	      return this.getHelpers(pos, type)[0];
	    },
	
	    getHelpers: function(pos, type) {
	      var found = [];
	      if (!helpers.hasOwnProperty(type)) return helpers;
	      var help = helpers[type], mode = this.getModeAt(pos);
	      if (typeof mode[type] == "string") {
	        if (help[mode[type]]) found.push(help[mode[type]]);
	      } else if (mode[type]) {
	        for (var i = 0; i < mode[type].length; i++) {
	          var val = help[mode[type][i]];
	          if (val) found.push(val);
	        }
	      } else if (mode.helperType && help[mode.helperType]) {
	        found.push(help[mode.helperType]);
	      } else if (help[mode.name]) {
	        found.push(help[mode.name]);
	      }
	      for (var i = 0; i < help._global.length; i++) {
	        var cur = help._global[i];
	        if (cur.pred(mode, this) && indexOf(found, cur.val) == -1)
	          found.push(cur.val);
	      }
	      return found;
	    },
	
	    getStateAfter: function(line, precise) {
	      var doc = this.doc;
	      line = clipLine(doc, line == null ? doc.first + doc.size - 1: line);
	      return getStateBefore(this, line + 1, precise);
	    },
	
	    cursorCoords: function(start, mode) {
	      var pos, range = this.doc.sel.primary();
	      if (start == null) pos = range.head;
	      else if (typeof start == "object") pos = clipPos(this.doc, start);
	      else pos = start ? range.from() : range.to();
	      return cursorCoords(this, pos, mode || "page");
	    },
	
	    charCoords: function(pos, mode) {
	      return charCoords(this, clipPos(this.doc, pos), mode || "page");
	    },
	
	    coordsChar: function(coords, mode) {
	      coords = fromCoordSystem(this, coords, mode || "page");
	      return coordsChar(this, coords.left, coords.top);
	    },
	
	    lineAtHeight: function(height, mode) {
	      height = fromCoordSystem(this, {top: height, left: 0}, mode || "page").top;
	      return lineAtHeight(this.doc, height + this.display.viewOffset);
	    },
	    heightAtLine: function(line, mode) {
	      var end = false, last = this.doc.first + this.doc.size - 1;
	      if (line < this.doc.first) line = this.doc.first;
	      else if (line > last) { line = last; end = true; }
	      var lineObj = getLine(this.doc, line);
	      return intoCoordSystem(this, lineObj, {top: 0, left: 0}, mode || "page").top +
	        (end ? this.doc.height - heightAtLine(lineObj) : 0);
	    },
	
	    defaultTextHeight: function() { return textHeight(this.display); },
	    defaultCharWidth: function() { return charWidth(this.display); },
	
	    setGutterMarker: methodOp(function(line, gutterID, value) {
	      return changeLine(this, line, "gutter", function(line) {
	        var markers = line.gutterMarkers || (line.gutterMarkers = {});
	        markers[gutterID] = value;
	        if (!value && isEmpty(markers)) line.gutterMarkers = null;
	        return true;
	      });
	    }),
	
	    clearGutter: methodOp(function(gutterID) {
	      var cm = this, doc = cm.doc, i = doc.first;
	      doc.iter(function(line) {
	        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
	          line.gutterMarkers[gutterID] = null;
	          regLineChange(cm, i, "gutter");
	          if (isEmpty(line.gutterMarkers)) line.gutterMarkers = null;
	        }
	        ++i;
	      });
	    }),
	
	    addLineClass: methodOp(function(handle, where, cls) {
	      return changeLine(this, handle, "class", function(line) {
	        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : "wrapClass";
	        if (!line[prop]) line[prop] = cls;
	        else if (new RegExp("(?:^|\\s)" + cls + "(?:$|\\s)").test(line[prop])) return false;
	        else line[prop] += " " + cls;
	        return true;
	      });
	    }),
	
	    removeLineClass: methodOp(function(handle, where, cls) {
	      return changeLine(this, handle, "class", function(line) {
	        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : "wrapClass";
	        var cur = line[prop];
	        if (!cur) return false;
	        else if (cls == null) line[prop] = null;
	        else {
	          var found = cur.match(new RegExp("(?:^|\\s+)" + cls + "(?:$|\\s+)"));
	          if (!found) return false;
	          var end = found.index + found[0].length;
	          line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
	        }
	        return true;
	      });
	    }),
	
	    addLineWidget: methodOp(function(handle, node, options) {
	      return addLineWidget(this, handle, node, options);
	    }),
	
	    removeLineWidget: function(widget) { widget.clear(); },
	
	    lineInfo: function(line) {
	      if (typeof line == "number") {
	        if (!isLine(this.doc, line)) return null;
	        var n = line;
	        line = getLine(this.doc, line);
	        if (!line) return null;
	      } else {
	        var n = lineNo(line);
	        if (n == null) return null;
	      }
	      return {line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
	              textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
	              widgets: line.widgets};
	    },
	
	    getViewport: function() { return {from: this.display.viewFrom, to: this.display.viewTo};},
	
	    addWidget: function(pos, node, scroll, vert, horiz) {
	      var display = this.display;
	      pos = cursorCoords(this, clipPos(this.doc, pos));
	      var top = pos.bottom, left = pos.left;
	      node.style.position = "absolute";
	      display.sizer.appendChild(node);
	      if (vert == "over") {
	        top = pos.top;
	      } else if (vert == "above" || vert == "near") {
	        var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
	        hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
	        // Default to positioning above (if specified and possible); otherwise default to positioning below
	        if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight)
	          top = pos.top - node.offsetHeight;
	        else if (pos.bottom + node.offsetHeight <= vspace)
	          top = pos.bottom;
	        if (left + node.offsetWidth > hspace)
	          left = hspace - node.offsetWidth;
	      }
	      node.style.top = top + "px";
	      node.style.left = node.style.right = "";
	      if (horiz == "right") {
	        left = display.sizer.clientWidth - node.offsetWidth;
	        node.style.right = "0px";
	      } else {
	        if (horiz == "left") left = 0;
	        else if (horiz == "middle") left = (display.sizer.clientWidth - node.offsetWidth) / 2;
	        node.style.left = left + "px";
	      }
	      if (scroll)
	        scrollIntoView(this, left, top, left + node.offsetWidth, top + node.offsetHeight);
	    },
	
	    triggerOnKeyDown: methodOp(onKeyDown),
	    triggerOnKeyPress: methodOp(onKeyPress),
	    triggerOnKeyUp: methodOp(onKeyUp),
	
	    execCommand: function(cmd) {
	      if (commands.hasOwnProperty(cmd))
	        return commands[cmd](this);
	    },
	
	    findPosH: function(from, amount, unit, visually) {
	      var dir = 1;
	      if (amount < 0) { dir = -1; amount = -amount; }
	      for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
	        cur = findPosH(this.doc, cur, dir, unit, visually);
	        if (cur.hitSide) break;
	      }
	      return cur;
	    },
	
	    moveH: methodOp(function(dir, unit) {
	      var cm = this;
	      cm.extendSelectionsBy(function(range) {
	        if (cm.display.shift || cm.doc.extend || range.empty())
	          return findPosH(cm.doc, range.head, dir, unit, cm.options.rtlMoveVisually);
	        else
	          return dir < 0 ? range.from() : range.to();
	      }, sel_move);
	    }),
	
	    deleteH: methodOp(function(dir, unit) {
	      var sel = this.doc.sel, doc = this.doc;
	      if (sel.somethingSelected())
	        doc.replaceSelection("", null, "+delete");
	      else
	        deleteNearSelection(this, function(range) {
	          var other = findPosH(doc, range.head, dir, unit, false);
	          return dir < 0 ? {from: other, to: range.head} : {from: range.head, to: other};
	        });
	    }),
	
	    findPosV: function(from, amount, unit, goalColumn) {
	      var dir = 1, x = goalColumn;
	      if (amount < 0) { dir = -1; amount = -amount; }
	      for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
	        var coords = cursorCoords(this, cur, "div");
	        if (x == null) x = coords.left;
	        else coords.left = x;
	        cur = findPosV(this, coords, dir, unit);
	        if (cur.hitSide) break;
	      }
	      return cur;
	    },
	
	    moveV: methodOp(function(dir, unit) {
	      var cm = this, doc = this.doc, goals = [];
	      var collapse = !cm.display.shift && !doc.extend && doc.sel.somethingSelected();
	      doc.extendSelectionsBy(function(range) {
	        if (collapse)
	          return dir < 0 ? range.from() : range.to();
	        var headPos = cursorCoords(cm, range.head, "div");
	        if (range.goalColumn != null) headPos.left = range.goalColumn;
	        goals.push(headPos.left);
	        var pos = findPosV(cm, headPos, dir, unit);
	        if (unit == "page" && range == doc.sel.primary())
	          addToScrollPos(cm, null, charCoords(cm, pos, "div").top - headPos.top);
	        return pos;
	      }, sel_move);
	      if (goals.length) for (var i = 0; i < doc.sel.ranges.length; i++)
	        doc.sel.ranges[i].goalColumn = goals[i];
	    }),
	
	    toggleOverwrite: function(value) {
	      if (value != null && value == this.state.overwrite) return;
	      if (this.state.overwrite = !this.state.overwrite)
	        addClass(this.display.cursorDiv, "CodeMirror-overwrite");
	      else
	        rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
	
	      signal(this, "overwriteToggle", this, this.state.overwrite);
	    },
	    hasFocus: function() { return activeElt() == this.display.input; },
	
	    scrollTo: methodOp(function(x, y) {
	      if (x != null || y != null) resolveScrollToPos(this);
	      if (x != null) this.curOp.scrollLeft = x;
	      if (y != null) this.curOp.scrollTop = y;
	    }),
	    getScrollInfo: function() {
	      var scroller = this.display.scroller, co = scrollerCutOff;
	      return {left: scroller.scrollLeft, top: scroller.scrollTop,
	              height: scroller.scrollHeight - co, width: scroller.scrollWidth - co,
	              clientHeight: scroller.clientHeight - co, clientWidth: scroller.clientWidth - co};
	    },
	
	    scrollIntoView: methodOp(function(range, margin) {
	      if (range == null) {
	        range = {from: this.doc.sel.primary().head, to: null};
	        if (margin == null) margin = this.options.cursorScrollMargin;
	      } else if (typeof range == "number") {
	        range = {from: Pos(range, 0), to: null};
	      } else if (range.from == null) {
	        range = {from: range, to: null};
	      }
	      if (!range.to) range.to = range.from;
	      range.margin = margin || 0;
	
	      if (range.from.line != null) {
	        resolveScrollToPos(this);
	        this.curOp.scrollToPos = range;
	      } else {
	        var sPos = calculateScrollPos(this, Math.min(range.from.left, range.to.left),
	                                      Math.min(range.from.top, range.to.top) - range.margin,
	                                      Math.max(range.from.right, range.to.right),
	                                      Math.max(range.from.bottom, range.to.bottom) + range.margin);
	        this.scrollTo(sPos.scrollLeft, sPos.scrollTop);
	      }
	    }),
	
	    setSize: methodOp(function(width, height) {
	      function interpret(val) {
	        return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
	      }
	      if (width != null) this.display.wrapper.style.width = interpret(width);
	      if (height != null) this.display.wrapper.style.height = interpret(height);
	      if (this.options.lineWrapping) clearLineMeasurementCache(this);
	      this.curOp.forceUpdate = true;
	      signal(this, "refresh", this);
	    }),
	
	    operation: function(f){return runInOp(this, f);},
	
	    refresh: methodOp(function() {
	      var oldHeight = this.display.cachedTextHeight;
	      regChange(this);
	      this.curOp.forceUpdate = true;
	      clearCaches(this);
	      this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
	      updateGutterSpace(this);
	      if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5)
	        estimateLineHeights(this);
	      signal(this, "refresh", this);
	    }),
	
	    swapDoc: methodOp(function(doc) {
	      var old = this.doc;
	      old.cm = null;
	      attachDoc(this, doc);
	      clearCaches(this);
	      resetInput(this);
	      this.scrollTo(doc.scrollLeft, doc.scrollTop);
	      signalLater(this, "swapDoc", this, old);
	      return old;
	    }),
	
	    getInputField: function(){return this.display.input;},
	    getWrapperElement: function(){return this.display.wrapper;},
	    getScrollerElement: function(){return this.display.scroller;},
	    getGutterElement: function(){return this.display.gutters;}
	  };
	  eventMixin(CodeMirror);
	
	  // OPTION DEFAULTS
	
	  // The default configuration options.
	  var defaults = CodeMirror.defaults = {};
	  // Functions to run when options are changed.
	  var optionHandlers = CodeMirror.optionHandlers = {};
	
	  function option(name, deflt, handle, notOnInit) {
	    CodeMirror.defaults[name] = deflt;
	    if (handle) optionHandlers[name] =
	      notOnInit ? function(cm, val, old) {if (old != Init) handle(cm, val, old);} : handle;
	  }
	
	  // Passed to option handlers when there is no old value.
	  var Init = CodeMirror.Init = {toString: function(){return "CodeMirror.Init";}};
	
	  // These two are, on init, called from the constructor because they
	  // have to be initialized before the editor can start at all.
	  option("value", "", function(cm, val) {
	    cm.setValue(val);
	  }, true);
	  option("mode", null, function(cm, val) {
	    cm.doc.modeOption = val;
	    loadMode(cm);
	  }, true);
	
	  option("indentUnit", 2, loadMode, true);
	  option("indentWithTabs", false);
	  option("smartIndent", true);
	  option("tabSize", 4, function(cm) {
	    resetModeState(cm);
	    clearCaches(cm);
	    regChange(cm);
	  }, true);
	  option("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(cm, val) {
	    cm.options.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
	    cm.refresh();
	  }, true);
	  option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {cm.refresh();}, true);
	  option("electricChars", true);
	  option("rtlMoveVisually", !windows);
	  option("wholeLineUpdateBefore", true);
	
	  option("theme", "default", function(cm) {
	    themeChanged(cm);
	    guttersChanged(cm);
	  }, true);
	  option("keyMap", "default", keyMapChanged);
	  option("extraKeys", null);
	
	  option("lineWrapping", false, wrappingChanged, true);
	  option("gutters", [], function(cm) {
	    setGuttersForLineNumbers(cm.options);
	    guttersChanged(cm);
	  }, true);
	  option("fixedGutter", true, function(cm, val) {
	    cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
	    cm.refresh();
	  }, true);
	  option("coverGutterNextToScrollbar", false, updateScrollbars, true);
	  option("lineNumbers", false, function(cm) {
	    setGuttersForLineNumbers(cm.options);
	    guttersChanged(cm);
	  }, true);
	  option("firstLineNumber", 1, guttersChanged, true);
	  option("lineNumberFormatter", function(integer) {return integer;}, guttersChanged, true);
	  option("showCursorWhenSelecting", false, updateSelection, true);
	
	  option("resetSelectionOnContextMenu", true);
	
	  option("readOnly", false, function(cm, val) {
	    if (val == "nocursor") {
	      onBlur(cm);
	      cm.display.input.blur();
	      cm.display.disabled = true;
	    } else {
	      cm.display.disabled = false;
	      if (!val) resetInput(cm);
	    }
	  });
	  option("disableInput", false, function(cm, val) {if (!val) resetInput(cm);}, true);
	  option("dragDrop", true);
	
	  option("cursorBlinkRate", 530);
	  option("cursorScrollMargin", 0);
	  option("cursorHeight", 1);
	  option("workTime", 100);
	  option("workDelay", 100);
	  option("flattenSpans", true, resetModeState, true);
	  option("addModeClass", false, resetModeState, true);
	  option("pollInterval", 100);
	  option("undoDepth", 200, function(cm, val){cm.doc.history.undoDepth = val;});
	  option("historyEventDelay", 1250);
	  option("viewportMargin", 10, function(cm){cm.refresh();}, true);
	  option("maxHighlightLength", 10000, resetModeState, true);
	  option("moveInputWithCursor", true, function(cm, val) {
	    if (!val) cm.display.inputDiv.style.top = cm.display.inputDiv.style.left = 0;
	  });
	
	  option("tabindex", null, function(cm, val) {
	    cm.display.input.tabIndex = val || "";
	  });
	  option("autofocus", null);
	
	  // MODE DEFINITION AND QUERYING
	
	  // Known modes, by name and by MIME
	  var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};
	
	  // Extra arguments are stored as the mode's dependencies, which is
	  // used by (legacy) mechanisms like loadmode.js to automatically
	  // load a mode. (Preferred mechanism is the require/define calls.)
	  CodeMirror.defineMode = function(name, mode) {
	    if (!CodeMirror.defaults.mode && name != "null") CodeMirror.defaults.mode = name;
	    if (arguments.length > 2) {
	      mode.dependencies = [];
	      for (var i = 2; i < arguments.length; ++i) mode.dependencies.push(arguments[i]);
	    }
	    modes[name] = mode;
	  };
	
	  CodeMirror.defineMIME = function(mime, spec) {
	    mimeModes[mime] = spec;
	  };
	
	  // Given a MIME type, a {name, ...options} config object, or a name
	  // string, return a mode config object.
	  CodeMirror.resolveMode = function(spec) {
	    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
	      spec = mimeModes[spec];
	    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
	      var found = mimeModes[spec.name];
	      if (typeof found == "string") found = {name: found};
	      spec = createObj(found, spec);
	      spec.name = found.name;
	    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
	      return CodeMirror.resolveMode("application/xml");
	    }
	    if (typeof spec == "string") return {name: spec};
	    else return spec || {name: "null"};
	  };
	
	  // Given a mode spec (anything that resolveMode accepts), find and
	  // initialize an actual mode object.
	  CodeMirror.getMode = function(options, spec) {
	    var spec = CodeMirror.resolveMode(spec);
	    var mfactory = modes[spec.name];
	    if (!mfactory) return CodeMirror.getMode(options, "text/plain");
	    var modeObj = mfactory(options, spec);
	    if (modeExtensions.hasOwnProperty(spec.name)) {
	      var exts = modeExtensions[spec.name];
	      for (var prop in exts) {
	        if (!exts.hasOwnProperty(prop)) continue;
	        if (modeObj.hasOwnProperty(prop)) modeObj["_" + prop] = modeObj[prop];
	        modeObj[prop] = exts[prop];
	      }
	    }
	    modeObj.name = spec.name;
	    if (spec.helperType) modeObj.helperType = spec.helperType;
	    if (spec.modeProps) for (var prop in spec.modeProps)
	      modeObj[prop] = spec.modeProps[prop];
	
	    return modeObj;
	  };
	
	  // Minimal default mode.
	  CodeMirror.defineMode("null", function() {
	    return {token: function(stream) {stream.skipToEnd();}};
	  });
	  CodeMirror.defineMIME("text/plain", "null");
	
	  // This can be used to attach properties to mode objects from
	  // outside the actual mode definition.
	  var modeExtensions = CodeMirror.modeExtensions = {};
	  CodeMirror.extendMode = function(mode, properties) {
	    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : (modeExtensions[mode] = {});
	    copyObj(properties, exts);
	  };
	
	  // EXTENSIONS
	
	  CodeMirror.defineExtension = function(name, func) {
	    CodeMirror.prototype[name] = func;
	  };
	  CodeMirror.defineDocExtension = function(name, func) {
	    Doc.prototype[name] = func;
	  };
	  CodeMirror.defineOption = option;
	
	  var initHooks = [];
	  CodeMirror.defineInitHook = function(f) {initHooks.push(f);};
	
	  var helpers = CodeMirror.helpers = {};
	  CodeMirror.registerHelper = function(type, name, value) {
	    if (!helpers.hasOwnProperty(type)) helpers[type] = CodeMirror[type] = {_global: []};
	    helpers[type][name] = value;
	  };
	  CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
	    CodeMirror.registerHelper(type, name, value);
	    helpers[type]._global.push({pred: predicate, val: value});
	  };
	
	  // MODE STATE HANDLING
	
	  // Utility functions for working with state. Exported because nested
	  // modes need to do this for their inner modes.
	
	  var copyState = CodeMirror.copyState = function(mode, state) {
	    if (state === true) return state;
	    if (mode.copyState) return mode.copyState(state);
	    var nstate = {};
	    for (var n in state) {
	      var val = state[n];
	      if (val instanceof Array) val = val.concat([]);
	      nstate[n] = val;
	    }
	    return nstate;
	  };
	
	  var startState = CodeMirror.startState = function(mode, a1, a2) {
	    return mode.startState ? mode.startState(a1, a2) : true;
	  };
	
	  // Given a mode and a state (for that mode), find the inner mode and
	  // state at the position that the state refers to.
	  CodeMirror.innerMode = function(mode, state) {
	    while (mode.innerMode) {
	      var info = mode.innerMode(state);
	      if (!info || info.mode == mode) break;
	      state = info.state;
	      mode = info.mode;
	    }
	    return info || {mode: mode, state: state};
	  };
	
	  // STANDARD COMMANDS
	
	  // Commands are parameter-less actions that can be performed on an
	  // editor, mostly used for keybindings.
	  var commands = CodeMirror.commands = {
	    selectAll: function(cm) {cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);},
	    singleSelection: function(cm) {
	      cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
	    },
	    killLine: function(cm) {
	      deleteNearSelection(cm, function(range) {
	        if (range.empty()) {
	          var len = getLine(cm.doc, range.head.line).text.length;
	          if (range.head.ch == len && range.head.line < cm.lastLine())
	            return {from: range.head, to: Pos(range.head.line + 1, 0)};
	          else
	            return {from: range.head, to: Pos(range.head.line, len)};
	        } else {
	          return {from: range.from(), to: range.to()};
	        }
	      });
	    },
	    deleteLine: function(cm) {
	      deleteNearSelection(cm, function(range) {
	        return {from: Pos(range.from().line, 0),
	                to: clipPos(cm.doc, Pos(range.to().line + 1, 0))};
	      });
	    },
	    delLineLeft: function(cm) {
	      deleteNearSelection(cm, function(range) {
	        return {from: Pos(range.from().line, 0), to: range.from()};
	      });
	    },
	    undo: function(cm) {cm.undo();},
	    redo: function(cm) {cm.redo();},
	    undoSelection: function(cm) {cm.undoSelection();},
	    redoSelection: function(cm) {cm.redoSelection();},
	    goDocStart: function(cm) {cm.extendSelection(Pos(cm.firstLine(), 0));},
	    goDocEnd: function(cm) {cm.extendSelection(Pos(cm.lastLine()));},
	    goLineStart: function(cm) {
	      cm.extendSelectionsBy(function(range) { return lineStart(cm, range.head.line); }, sel_move);
	    },
	    goLineStartSmart: function(cm) {
	      cm.extendSelectionsBy(function(range) {
	        var start = lineStart(cm, range.head.line);
	        var line = cm.getLineHandle(start.line);
	        var order = getOrder(line);
	        if (!order || order[0].level == 0) {
	          var firstNonWS = Math.max(0, line.text.search(/\S/));
	          var inWS = range.head.line == start.line && range.head.ch <= firstNonWS && range.head.ch;
	          return Pos(start.line, inWS ? 0 : firstNonWS);
	        }
	        return start;
	      }, sel_move);
	    },
	    goLineEnd: function(cm) {
	      cm.extendSelectionsBy(function(range) { return lineEnd(cm, range.head.line); }, sel_move);
	    },
	    goLineRight: function(cm) {
	      cm.extendSelectionsBy(function(range) {
	        var top = cm.charCoords(range.head, "div").top + 5;
	        return cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div");
	      }, sel_move);
	    },
	    goLineLeft: function(cm) {
	      cm.extendSelectionsBy(function(range) {
	        var top = cm.charCoords(range.head, "div").top + 5;
	        return cm.coordsChar({left: 0, top: top}, "div");
	      }, sel_move);
	    },
	    goLineUp: function(cm) {cm.moveV(-1, "line");},
	    goLineDown: function(cm) {cm.moveV(1, "line");},
	    goPageUp: function(cm) {cm.moveV(-1, "page");},
	    goPageDown: function(cm) {cm.moveV(1, "page");},
	    goCharLeft: function(cm) {cm.moveH(-1, "char");},
	    goCharRight: function(cm) {cm.moveH(1, "char");},
	    goColumnLeft: function(cm) {cm.moveH(-1, "column");},
	    goColumnRight: function(cm) {cm.moveH(1, "column");},
	    goWordLeft: function(cm) {cm.moveH(-1, "word");},
	    goGroupRight: function(cm) {cm.moveH(1, "group");},
	    goGroupLeft: function(cm) {cm.moveH(-1, "group");},
	    goWordRight: function(cm) {cm.moveH(1, "word");},
	    delCharBefore: function(cm) {cm.deleteH(-1, "char");},
	    delCharAfter: function(cm) {cm.deleteH(1, "char");},
	    delWordBefore: function(cm) {cm.deleteH(-1, "word");},
	    delWordAfter: function(cm) {cm.deleteH(1, "word");},
	    delGroupBefore: function(cm) {cm.deleteH(-1, "group");},
	    delGroupAfter: function(cm) {cm.deleteH(1, "group");},
	    indentAuto: function(cm) {cm.indentSelection("smart");},
	    indentMore: function(cm) {cm.indentSelection("add");},
	    indentLess: function(cm) {cm.indentSelection("subtract");},
	    insertTab: function(cm) {cm.replaceSelection("\t");},
	    insertSoftTab: function(cm) {
	      var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
	      for (var i = 0; i < ranges.length; i++) {
	        var pos = ranges[i].from();
	        var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
	        spaces.push(new Array(tabSize - col % tabSize + 1).join(" "));
	      }
	      cm.replaceSelections(spaces);
	    },
	    defaultTab: function(cm) {
	      if (cm.somethingSelected()) cm.indentSelection("add");
	      else cm.execCommand("insertTab");
	    },
	    transposeChars: function(cm) {
	      runInOp(cm, function() {
	        var ranges = cm.listSelections(), newSel = [];
	        for (var i = 0; i < ranges.length; i++) {
	          var cur = ranges[i].head, line = getLine(cm.doc, cur.line).text;
	          if (line) {
	            if (cur.ch == line.length) cur = new Pos(cur.line, cur.ch - 1);
	            if (cur.ch > 0) {
	              cur = new Pos(cur.line, cur.ch + 1);
	              cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
	                              Pos(cur.line, cur.ch - 2), cur, "+transpose");
	            } else if (cur.line > cm.doc.first) {
	              var prev = getLine(cm.doc, cur.line - 1).text;
	              if (prev)
	                cm.replaceRange(line.charAt(0) + "\n" + prev.charAt(prev.length - 1),
	                                Pos(cur.line - 1, prev.length - 1), Pos(cur.line, 1), "+transpose");
	            }
	          }
	          newSel.push(new Range(cur, cur));
	        }
	        cm.setSelections(newSel);
	      });
	    },
	    newlineAndIndent: function(cm) {
	      runInOp(cm, function() {
	        var len = cm.listSelections().length;
	        for (var i = 0; i < len; i++) {
	          var range = cm.listSelections()[i];
	          cm.replaceRange("\n", range.anchor, range.head, "+input");
	          cm.indentLine(range.from().line + 1, null, true);
	          ensureCursorVisible(cm);
	        }
	      });
	    },
	    toggleOverwrite: function(cm) {cm.toggleOverwrite();}
	  };
	
	  // STANDARD KEYMAPS
	
	  var keyMap = CodeMirror.keyMap = {};
	  keyMap.basic = {
	    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
	    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
	    "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
	    "Tab": "defaultTab", "Shift-Tab": "indentAuto",
	    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
	    "Esc": "singleSelection"
	  };
	  // Note that the save and find-related commands aren't defined by
	  // default. User code or addons can define them. Unknown commands
	  // are simply ignored.
	  keyMap.pcDefault = {
	    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
	    "Ctrl-Home": "goDocStart", "Ctrl-Up": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Down": "goDocEnd",
	    "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
	    "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
	    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
	    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
	    "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
	    fallthrough: "basic"
	  };
	  keyMap.macDefault = {
	    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
	    "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
	    "Alt-Right": "goGroupRight", "Cmd-Left": "goLineStart", "Cmd-Right": "goLineEnd", "Alt-Backspace": "delGroupBefore",
	    "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
	    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
	    "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delLineLeft",
	    "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection",
	    fallthrough: ["basic", "emacsy"]
	  };
	  // Very basic readline/emacs-style bindings, which are standard on Mac.
	  keyMap.emacsy = {
	    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
	    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
	    "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
	    "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars"
	  };
	  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
	
	  // KEYMAP DISPATCH
	
	  function getKeyMap(val) {
	    if (typeof val == "string") return keyMap[val];
	    else return val;
	  }
	
	  // Given an array of keymaps and a key name, call handle on any
	  // bindings found, until that returns a truthy value, at which point
	  // we consider the key handled. Implements things like binding a key
	  // to false stopping further handling and keymap fallthrough.
	  var lookupKey = CodeMirror.lookupKey = function(name, maps, handle) {
	    function lookup(map) {
	      map = getKeyMap(map);
	      var found = map[name];
	      if (found === false) return "stop";
	      if (found != null && handle(found)) return true;
	      if (map.nofallthrough) return "stop";
	
	      var fallthrough = map.fallthrough;
	      if (fallthrough == null) return false;
	      if (Object.prototype.toString.call(fallthrough) != "[object Array]")
	        return lookup(fallthrough);
	      for (var i = 0; i < fallthrough.length; ++i) {
	        var done = lookup(fallthrough[i]);
	        if (done) return done;
	      }
	      return false;
	    }
	
	    for (var i = 0; i < maps.length; ++i) {
	      var done = lookup(maps[i]);
	      if (done) return done != "stop";
	    }
	  };
	
	  // Modifier key presses don't count as 'real' key presses for the
	  // purpose of keymap fallthrough.
	  var isModifierKey = CodeMirror.isModifierKey = function(event) {
	    var name = keyNames[event.keyCode];
	    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
	  };
	
	  // Look up the name of a key as indicated by an event object.
	  var keyName = CodeMirror.keyName = function(event, noShift) {
	    if (presto && event.keyCode == 34 && event["char"]) return false;
	    var name = keyNames[event.keyCode];
	    if (name == null || event.altGraphKey) return false;
	    if (event.altKey) name = "Alt-" + name;
	    if (flipCtrlCmd ? event.metaKey : event.ctrlKey) name = "Ctrl-" + name;
	    if (flipCtrlCmd ? event.ctrlKey : event.metaKey) name = "Cmd-" + name;
	    if (!noShift && event.shiftKey) name = "Shift-" + name;
	    return name;
	  };
	
	  // FROMTEXTAREA
	
	  CodeMirror.fromTextArea = function(textarea, options) {
	    if (!options) options = {};
	    options.value = textarea.value;
	    if (!options.tabindex && textarea.tabindex)
	      options.tabindex = textarea.tabindex;
	    if (!options.placeholder && textarea.placeholder)
	      options.placeholder = textarea.placeholder;
	    // Set autofocus to true if this textarea is focused, or if it has
	    // autofocus and no other element is focused.
	    if (options.autofocus == null) {
	      var hasFocus = activeElt();
	      options.autofocus = hasFocus == textarea ||
	        textarea.getAttribute("autofocus") != null && hasFocus == document.body;
	    }
	
	    function save() {textarea.value = cm.getValue();}
	    if (textarea.form) {
	      on(textarea.form, "submit", save);
	      // Deplorable hack to make the submit method do the right thing.
	      if (!options.leaveSubmitMethodAlone) {
	        var form = textarea.form, realSubmit = form.submit;
	        try {
	          var wrappedSubmit = form.submit = function() {
	            save();
	            form.submit = realSubmit;
	            form.submit();
	            form.submit = wrappedSubmit;
	          };
	        } catch(e) {}
	      }
	    }
	
	    textarea.style.display = "none";
	    var cm = CodeMirror(function(node) {
	      textarea.parentNode.insertBefore(node, textarea.nextSibling);
	    }, options);
	    cm.save = save;
	    cm.getTextArea = function() { return textarea; };
	    cm.toTextArea = function() {
	      save();
	      textarea.parentNode.removeChild(cm.getWrapperElement());
	      textarea.style.display = "";
	      if (textarea.form) {
	        off(textarea.form, "submit", save);
	        if (typeof textarea.form.submit == "function")
	          textarea.form.submit = realSubmit;
	      }
	    };
	    return cm;
	  };
	
	  // STRING STREAM
	
	  // Fed to the mode parsers, provides helper functions to make
	  // parsers more succinct.
	
	  var StringStream = CodeMirror.StringStream = function(string, tabSize) {
	    this.pos = this.start = 0;
	    this.string = string;
	    this.tabSize = tabSize || 8;
	    this.lastColumnPos = this.lastColumnValue = 0;
	    this.lineStart = 0;
	  };
	
	  StringStream.prototype = {
	    eol: function() {return this.pos >= this.string.length;},
	    sol: function() {return this.pos == this.lineStart;},
	    peek: function() {return this.string.charAt(this.pos) || undefined;},
	    next: function() {
	      if (this.pos < this.string.length)
	        return this.string.charAt(this.pos++);
	    },
	    eat: function(match) {
	      var ch = this.string.charAt(this.pos);
	      if (typeof match == "string") var ok = ch == match;
	      else var ok = ch && (match.test ? match.test(ch) : match(ch));
	      if (ok) {++this.pos; return ch;}
	    },
	    eatWhile: function(match) {
	      var start = this.pos;
	      while (this.eat(match)){}
	      return this.pos > start;
	    },
	    eatSpace: function() {
	      var start = this.pos;
	      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
	      return this.pos > start;
	    },
	    skipToEnd: function() {this.pos = this.string.length;},
	    skipTo: function(ch) {
	      var found = this.string.indexOf(ch, this.pos);
	      if (found > -1) {this.pos = found; return true;}
	    },
	    backUp: function(n) {this.pos -= n;},
	    column: function() {
	      if (this.lastColumnPos < this.start) {
	        this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
	        this.lastColumnPos = this.start;
	      }
	      return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
	    },
	    indentation: function() {
	      return countColumn(this.string, null, this.tabSize) -
	        (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
	    },
	    match: function(pattern, consume, caseInsensitive) {
	      if (typeof pattern == "string") {
	        var cased = function(str) {return caseInsensitive ? str.toLowerCase() : str;};
	        var substr = this.string.substr(this.pos, pattern.length);
	        if (cased(substr) == cased(pattern)) {
	          if (consume !== false) this.pos += pattern.length;
	          return true;
	        }
	      } else {
	        var match = this.string.slice(this.pos).match(pattern);
	        if (match && match.index > 0) return null;
	        if (match && consume !== false) this.pos += match[0].length;
	        return match;
	      }
	    },
	    current: function(){return this.string.slice(this.start, this.pos);},
	    hideFirstChars: function(n, inner) {
	      this.lineStart += n;
	      try { return inner(); }
	      finally { this.lineStart -= n; }
	    }
	  };
	
	  // TEXTMARKERS
	
	  // Created with markText and setBookmark methods. A TextMarker is a
	  // handle that can be used to clear or find a marked position in the
	  // document. Line objects hold arrays (markedSpans) containing
	  // {from, to, marker} object pointing to such marker objects, and
	  // indicating that such a marker is present on that line. Multiple
	  // lines may point to the same marker when it spans across lines.
	  // The spans will have null for their from/to properties when the
	  // marker continues beyond the start/end of the line. Markers have
	  // links back to the lines they currently touch.
	
	  var TextMarker = CodeMirror.TextMarker = function(doc, type) {
	    this.lines = [];
	    this.type = type;
	    this.doc = doc;
	  };
	  eventMixin(TextMarker);
	
	  // Clear the marker.
	  TextMarker.prototype.clear = function() {
	    if (this.explicitlyCleared) return;
	    var cm = this.doc.cm, withOp = cm && !cm.curOp;
	    if (withOp) startOperation(cm);
	    if (hasHandler(this, "clear")) {
	      var found = this.find();
	      if (found) signalLater(this, "clear", found.from, found.to);
	    }
	    var min = null, max = null;
	    for (var i = 0; i < this.lines.length; ++i) {
	      var line = this.lines[i];
	      var span = getMarkedSpanFor(line.markedSpans, this);
	      if (cm && !this.collapsed) regLineChange(cm, lineNo(line), "text");
	      else if (cm) {
	        if (span.to != null) max = lineNo(line);
	        if (span.from != null) min = lineNo(line);
	      }
	      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
	      if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm)
	        updateLineHeight(line, textHeight(cm.display));
	    }
	    if (cm && this.collapsed && !cm.options.lineWrapping) for (var i = 0; i < this.lines.length; ++i) {
	      var visual = visualLine(this.lines[i]), len = lineLength(visual);
	      if (len > cm.display.maxLineLength) {
	        cm.display.maxLine = visual;
	        cm.display.maxLineLength = len;
	        cm.display.maxLineChanged = true;
	      }
	    }
	
	    if (min != null && cm && this.collapsed) regChange(cm, min, max + 1);
	    this.lines.length = 0;
	    this.explicitlyCleared = true;
	    if (this.atomic && this.doc.cantEdit) {
	      this.doc.cantEdit = false;
	      if (cm) reCheckSelection(cm.doc);
	    }
	    if (cm) signalLater(cm, "markerCleared", cm, this);
	    if (withOp) endOperation(cm);
	    if (this.parent) this.parent.clear();
	  };
	
	  // Find the position of the marker in the document. Returns a {from,
	  // to} object by default. Side can be passed to get a specific side
	  // -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
	  // Pos objects returned contain a line object, rather than a line
	  // number (used to prevent looking up the same line twice).
	  TextMarker.prototype.find = function(side, lineObj) {
	    if (side == null && this.type == "bookmark") side = 1;
	    var from, to;
	    for (var i = 0; i < this.lines.length; ++i) {
	      var line = this.lines[i];
	      var span = getMarkedSpanFor(line.markedSpans, this);
	      if (span.from != null) {
	        from = Pos(lineObj ? line : lineNo(line), span.from);
	        if (side == -1) return from;
	      }
	      if (span.to != null) {
	        to = Pos(lineObj ? line : lineNo(line), span.to);
	        if (side == 1) return to;
	      }
	    }
	    return from && {from: from, to: to};
	  };
	
	  // Signals that the marker's widget changed, and surrounding layout
	  // should be recomputed.
	  TextMarker.prototype.changed = function() {
	    var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
	    if (!pos || !cm) return;
	    runInOp(cm, function() {
	      var line = pos.line, lineN = lineNo(pos.line);
	      var view = findViewForLine(cm, lineN);
	      if (view) {
	        clearLineMeasurementCacheFor(view);
	        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
	      }
	      cm.curOp.updateMaxLine = true;
	      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
	        var oldHeight = widget.height;
	        widget.height = null;
	        var dHeight = widgetHeight(widget) - oldHeight;
	        if (dHeight)
	          updateLineHeight(line, line.height + dHeight);
	      }
	    });
	  };
	
	  TextMarker.prototype.attachLine = function(line) {
	    if (!this.lines.length && this.doc.cm) {
	      var op = this.doc.cm.curOp;
	      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1)
	        (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
	    }
	    this.lines.push(line);
	  };
	  TextMarker.prototype.detachLine = function(line) {
	    this.lines.splice(indexOf(this.lines, line), 1);
	    if (!this.lines.length && this.doc.cm) {
	      var op = this.doc.cm.curOp;
	      (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
	    }
	  };
	
	  // Collapsed markers have unique ids, in order to be able to order
	  // them, which is needed for uniquely determining an outer marker
	  // when they overlap (they may nest, but not partially overlap).
	  var nextMarkerId = 0;
	
	  // Create a marker, wire it up to the right lines, and
	  function markText(doc, from, to, options, type) {
	    // Shared markers (across linked documents) are handled separately
	    // (markTextShared will call out to this again, once per
	    // document).
	    if (options && options.shared) return markTextShared(doc, from, to, options, type);
	    // Ensure we are in an operation.
	    if (doc.cm && !doc.cm.curOp) return operation(doc.cm, markText)(doc, from, to, options, type);
	
	    var marker = new TextMarker(doc, type), diff = cmp(from, to);
	    if (options) copyObj(options, marker, false);
	    // Don't connect empty markers unless clearWhenEmpty is false
	    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false)
	      return marker;
	    if (marker.replacedWith) {
	      // Showing up as a widget implies collapsed (widget replaces text)
	      marker.collapsed = true;
	      marker.widgetNode = elt("span", [marker.replacedWith], "CodeMirror-widget");
	      if (!options.handleMouseEvents) marker.widgetNode.ignoreEvents = true;
	      if (options.insertLeft) marker.widgetNode.insertLeft = true;
	    }
	    if (marker.collapsed) {
	      if (conflictingCollapsedRange(doc, from.line, from, to, marker) ||
	          from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker))
	        throw new Error("Inserting collapsed marker partially overlapping an existing one");
	      sawCollapsedSpans = true;
	    }
	
	    if (marker.addToHistory)
	      addChangeToHistory(doc, {from: from, to: to, origin: "markText"}, doc.sel, NaN);
	
	    var curLine = from.line, cm = doc.cm, updateMaxLine;
	    doc.iter(curLine, to.line + 1, function(line) {
	      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine)
	        updateMaxLine = true;
	      if (marker.collapsed && curLine != from.line) updateLineHeight(line, 0);
	      addMarkedSpan(line, new MarkedSpan(marker,
	                                         curLine == from.line ? from.ch : null,
	                                         curLine == to.line ? to.ch : null));
	      ++curLine;
	    });
	    // lineIsHidden depends on the presence of the spans, so needs a second pass
	    if (marker.collapsed) doc.iter(from.line, to.line + 1, function(line) {
	      if (lineIsHidden(doc, line)) updateLineHeight(line, 0);
	    });
	
	    if (marker.clearOnEnter) on(marker, "beforeCursorEnter", function() { marker.clear(); });
	
	    if (marker.readOnly) {
	      sawReadOnlySpans = true;
	      if (doc.history.done.length || doc.history.undone.length)
	        doc.clearHistory();
	    }
	    if (marker.collapsed) {
	      marker.id = ++nextMarkerId;
	      marker.atomic = true;
	    }
	    if (cm) {
	      // Sync editor state
	      if (updateMaxLine) cm.curOp.updateMaxLine = true;
	      if (marker.collapsed)
	        regChange(cm, from.line, to.line + 1);
	      else if (marker.className || marker.title || marker.startStyle || marker.endStyle)
	        for (var i = from.line; i <= to.line; i++) regLineChange(cm, i, "text");
	      if (marker.atomic) reCheckSelection(cm.doc);
	      signalLater(cm, "markerAdded", cm, marker);
	    }
	    return marker;
	  }
	
	  // SHARED TEXTMARKERS
	
	  // A shared marker spans multiple linked documents. It is
	  // implemented as a meta-marker-object controlling multiple normal
	  // markers.
	  var SharedTextMarker = CodeMirror.SharedTextMarker = function(markers, primary) {
	    this.markers = markers;
	    this.primary = primary;
	    for (var i = 0; i < markers.length; ++i)
	      markers[i].parent = this;
	  };
	  eventMixin(SharedTextMarker);
	
	  SharedTextMarker.prototype.clear = function() {
	    if (this.explicitlyCleared) return;
	    this.explicitlyCleared = true;
	    for (var i = 0; i < this.markers.length; ++i)
	      this.markers[i].clear();
	    signalLater(this, "clear");
	  };
	  SharedTextMarker.prototype.find = function(side, lineObj) {
	    return this.primary.find(side, lineObj);
	  };
	
	  function markTextShared(doc, from, to, options, type) {
	    options = copyObj(options);
	    options.shared = false;
	    var markers = [markText(doc, from, to, options, type)], primary = markers[0];
	    var widget = options.widgetNode;
	    linkedDocs(doc, function(doc) {
	      if (widget) options.widgetNode = widget.cloneNode(true);
	      markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
	      for (var i = 0; i < doc.linked.length; ++i)
	        if (doc.linked[i].isParent) return;
	      primary = lst(markers);
	    });
	    return new SharedTextMarker(markers, primary);
	  }
	
	  function findSharedMarkers(doc) {
	    return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())),
	                         function(m) { return m.parent; });
	  }
	
	  function copySharedMarkers(doc, markers) {
	    for (var i = 0; i < markers.length; i++) {
	      var marker = markers[i], pos = marker.find();
	      var mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
	      if (cmp(mFrom, mTo)) {
	        var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
	        marker.markers.push(subMark);
	        subMark.parent = marker;
	      }
	    }
	  }
	
	  function detachSharedMarkers(markers) {
	    for (var i = 0; i < markers.length; i++) {
	      var marker = markers[i], linked = [marker.primary.doc];;
	      linkedDocs(marker.primary.doc, function(d) { linked.push(d); });
	      for (var j = 0; j < marker.markers.length; j++) {
	        var subMarker = marker.markers[j];
	        if (indexOf(linked, subMarker.doc) == -1) {
	          subMarker.parent = null;
	          marker.markers.splice(j--, 1);
	        }
	      }
	    }
	  }
	
	  // TEXTMARKER SPANS
	
	  function MarkedSpan(marker, from, to) {
	    this.marker = marker;
	    this.from = from; this.to = to;
	  }
	
	  // Search an array of spans for a span matching the given marker.
	  function getMarkedSpanFor(spans, marker) {
	    if (spans) for (var i = 0; i < spans.length; ++i) {
	      var span = spans[i];
	      if (span.marker == marker) return span;
	    }
	  }
	  // Remove a span from an array, returning undefined if no spans are
	  // left (we don't store arrays for lines without spans).
	  function removeMarkedSpan(spans, span) {
	    for (var r, i = 0; i < spans.length; ++i)
	      if (spans[i] != span) (r || (r = [])).push(spans[i]);
	    return r;
	  }
	  // Add a span to a line.
	  function addMarkedSpan(line, span) {
	    line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
	    span.marker.attachLine(line);
	  }
	
	  // Used for the algorithm that adjusts markers for a change in the
	  // document. These functions cut an array of spans at a given
	  // character position, returning an array of remaining chunks (or
	  // undefined if nothing remains).
	  function markedSpansBefore(old, startCh, isInsert) {
	    if (old) for (var i = 0, nw; i < old.length; ++i) {
	      var span = old[i], marker = span.marker;
	      var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
	      if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
	        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
	        (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
	      }
	    }
	    return nw;
	  }
	  function markedSpansAfter(old, endCh, isInsert) {
	    if (old) for (var i = 0, nw; i < old.length; ++i) {
	      var span = old[i], marker = span.marker;
	      var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
	      if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
	        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
	        (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh,
	                                              span.to == null ? null : span.to - endCh));
	      }
	    }
	    return nw;
	  }
	
	  // Given a change object, compute the new set of marker spans that
	  // cover the line in which the change took place. Removes spans
	  // entirely within the change, reconnects spans belonging to the
	  // same marker that appear on both sides of the change, and cuts off
	  // spans partially within the change. Returns an array of span
	  // arrays with one element for each line in (after) the change.
	  function stretchSpansOverChange(doc, change) {
	    var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
	    var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
	    if (!oldFirst && !oldLast) return null;
	
	    var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
	    // Get the spans that 'stick out' on both sides
	    var first = markedSpansBefore(oldFirst, startCh, isInsert);
	    var last = markedSpansAfter(oldLast, endCh, isInsert);
	
	    // Next, merge those two ends
	    var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
	    if (first) {
	      // Fix up .to properties of first
	      for (var i = 0; i < first.length; ++i) {
	        var span = first[i];
	        if (span.to == null) {
	          var found = getMarkedSpanFor(last, span.marker);
	          if (!found) span.to = startCh;
	          else if (sameLine) span.to = found.to == null ? null : found.to + offset;
	        }
	      }
	    }
	    if (last) {
	      // Fix up .from in last (or move them into first in case of sameLine)
	      for (var i = 0; i < last.length; ++i) {
	        var span = last[i];
	        if (span.to != null) span.to += offset;
	        if (span.from == null) {
	          var found = getMarkedSpanFor(first, span.marker);
	          if (!found) {
	            span.from = offset;
	            if (sameLine) (first || (first = [])).push(span);
	          }
	        } else {
	          span.from += offset;
	          if (sameLine) (first || (first = [])).push(span);
	        }
	      }
	    }
	    // Make sure we didn't create any zero-length spans
	    if (first) first = clearEmptySpans(first);
	    if (last && last != first) last = clearEmptySpans(last);
	
	    var newMarkers = [first];
	    if (!sameLine) {
	      // Fill gap with whole-line-spans
	      var gap = change.text.length - 2, gapMarkers;
	      if (gap > 0 && first)
	        for (var i = 0; i < first.length; ++i)
	          if (first[i].to == null)
	            (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i].marker, null, null));
	      for (var i = 0; i < gap; ++i)
	        newMarkers.push(gapMarkers);
	      newMarkers.push(last);
	    }
	    return newMarkers;
	  }
	
	  // Remove spans that are empty and don't have a clearWhenEmpty
	  // option of false.
	  function clearEmptySpans(spans) {
	    for (var i = 0; i < spans.length; ++i) {
	      var span = spans[i];
	      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false)
	        spans.splice(i--, 1);
	    }
	    if (!spans.length) return null;
	    return spans;
	  }
	
	  // Used for un/re-doing changes from the history. Combines the
	  // result of computing the existing spans with the set of spans that
	  // existed in the history (so that deleting around a span and then
	  // undoing brings back the span).
	  function mergeOldSpans(doc, change) {
	    var old = getOldSpans(doc, change);
	    var stretched = stretchSpansOverChange(doc, change);
	    if (!old) return stretched;
	    if (!stretched) return old;
	
	    for (var i = 0; i < old.length; ++i) {
	      var oldCur = old[i], stretchCur = stretched[i];
	      if (oldCur && stretchCur) {
	        spans: for (var j = 0; j < stretchCur.length; ++j) {
	          var span = stretchCur[j];
	          for (var k = 0; k < oldCur.length; ++k)
	            if (oldCur[k].marker == span.marker) continue spans;
	          oldCur.push(span);
	        }
	      } else if (stretchCur) {
	        old[i] = stretchCur;
	      }
	    }
	    return old;
	  }
	
	  // Used to 'clip' out readOnly ranges when making a change.
	  function removeReadOnlyRanges(doc, from, to) {
	    var markers = null;
	    doc.iter(from.line, to.line + 1, function(line) {
	      if (line.markedSpans) for (var i = 0; i < line.markedSpans.length; ++i) {
	        var mark = line.markedSpans[i].marker;
	        if (mark.readOnly && (!markers || indexOf(markers, mark) == -1))
	          (markers || (markers = [])).push(mark);
	      }
	    });
	    if (!markers) return null;
	    var parts = [{from: from, to: to}];
	    for (var i = 0; i < markers.length; ++i) {
	      var mk = markers[i], m = mk.find(0);
	      for (var j = 0; j < parts.length; ++j) {
	        var p = parts[j];
	        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) continue;
	        var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
	        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom)
	          newParts.push({from: p.from, to: m.from});
	        if (dto > 0 || !mk.inclusiveRight && !dto)
	          newParts.push({from: m.to, to: p.to});
	        parts.splice.apply(parts, newParts);
	        j += newParts.length - 1;
	      }
	    }
	    return parts;
	  }
	
	  // Connect or disconnect spans from a line.
	  function detachMarkedSpans(line) {
	    var spans = line.markedSpans;
	    if (!spans) return;
	    for (var i = 0; i < spans.length; ++i)
	      spans[i].marker.detachLine(line);
	    line.markedSpans = null;
	  }
	  function attachMarkedSpans(line, spans) {
	    if (!spans) return;
	    for (var i = 0; i < spans.length; ++i)
	      spans[i].marker.attachLine(line);
	    line.markedSpans = spans;
	  }
	
	  // Helpers used when computing which overlapping collapsed span
	  // counts as the larger one.
	  function extraLeft(marker) { return marker.inclusiveLeft ? -1 : 0; }
	  function extraRight(marker) { return marker.inclusiveRight ? 1 : 0; }
	
	  // Returns a number indicating which of two overlapping collapsed
	  // spans is larger (and thus includes the other). Falls back to
	  // comparing ids when the spans cover exactly the same range.
	  function compareCollapsedMarkers(a, b) {
	    var lenDiff = a.lines.length - b.lines.length;
	    if (lenDiff != 0) return lenDiff;
	    var aPos = a.find(), bPos = b.find();
	    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
	    if (fromCmp) return -fromCmp;
	    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
	    if (toCmp) return toCmp;
	    return b.id - a.id;
	  }
	
	  // Find out whether a line ends or starts in a collapsed span. If
	  // so, return the marker for that span.
	  function collapsedSpanAtSide(line, start) {
	    var sps = sawCollapsedSpans && line.markedSpans, found;
	    if (sps) for (var sp, i = 0; i < sps.length; ++i) {
	      sp = sps[i];
	      if (sp.marker.collapsed && (start ? sp.from : sp.to) == null &&
	          (!found || compareCollapsedMarkers(found, sp.marker) < 0))
	        found = sp.marker;
	    }
	    return found;
	  }
	  function collapsedSpanAtStart(line) { return collapsedSpanAtSide(line, true); }
	  function collapsedSpanAtEnd(line) { return collapsedSpanAtSide(line, false); }
	
	  // Test whether there exists a collapsed span that partially
	  // overlaps (covers the start or end, but not both) of a new span.
	  // Such overlap is not allowed.
	  function conflictingCollapsedRange(doc, lineNo, from, to, marker) {
	    var line = getLine(doc, lineNo);
	    var sps = sawCollapsedSpans && line.markedSpans;
	    if (sps) for (var i = 0; i < sps.length; ++i) {
	      var sp = sps[i];
	      if (!sp.marker.collapsed) continue;
	      var found = sp.marker.find(0);
	      var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
	      var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
	      if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) continue;
	      if (fromCmp <= 0 && (cmp(found.to, from) || extraRight(sp.marker) - extraLeft(marker)) > 0 ||
	          fromCmp >= 0 && (cmp(found.from, to) || extraLeft(sp.marker) - extraRight(marker)) < 0)
	        return true;
	    }
	  }
	
	  // A visual line is a line as drawn on the screen. Folding, for
	  // example, can cause multiple logical lines to appear on the same
	  // visual line. This finds the start of the visual line that the
	  // given line is part of (usually that is the line itself).
	  function visualLine(line) {
	    var merged;
	    while (merged = collapsedSpanAtStart(line))
	      line = merged.find(-1, true).line;
	    return line;
	  }
	
	  // Returns an array of logical lines that continue the visual line
	  // started by the argument, or undefined if there are no such lines.
	  function visualLineContinued(line) {
	    var merged, lines;
	    while (merged = collapsedSpanAtEnd(line)) {
	      line = merged.find(1, true).line;
	      (lines || (lines = [])).push(line);
	    }
	    return lines;
	  }
	
	  // Get the line number of the start of the visual line that the
	  // given line number is part of.
	  function visualLineNo(doc, lineN) {
	    var line = getLine(doc, lineN), vis = visualLine(line);
	    if (line == vis) return lineN;
	    return lineNo(vis);
	  }
	  // Get the line number of the start of the next visual line after
	  // the given line.
	  function visualLineEndNo(doc, lineN) {
	    if (lineN > doc.lastLine()) return lineN;
	    var line = getLine(doc, lineN), merged;
	    if (!lineIsHidden(doc, line)) return lineN;
	    while (merged = collapsedSpanAtEnd(line))
	      line = merged.find(1, true).line;
	    return lineNo(line) + 1;
	  }
	
	  // Compute whether a line is hidden. Lines count as hidden when they
	  // are part of a visual line that starts with another line, or when
	  // they are entirely covered by collapsed, non-widget span.
	  function lineIsHidden(doc, line) {
	    var sps = sawCollapsedSpans && line.markedSpans;
	    if (sps) for (var sp, i = 0; i < sps.length; ++i) {
	      sp = sps[i];
	      if (!sp.marker.collapsed) continue;
	      if (sp.from == null) return true;
	      if (sp.marker.widgetNode) continue;
	      if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp))
	        return true;
	    }
	  }
	  function lineIsHiddenInner(doc, line, span) {
	    if (span.to == null) {
	      var end = span.marker.find(1, true);
	      return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
	    }
	    if (span.marker.inclusiveRight && span.to == line.text.length)
	      return true;
	    for (var sp, i = 0; i < line.markedSpans.length; ++i) {
	      sp = line.markedSpans[i];
	      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to &&
	          (sp.to == null || sp.to != span.from) &&
	          (sp.marker.inclusiveLeft || span.marker.inclusiveRight) &&
	          lineIsHiddenInner(doc, line, sp)) return true;
	    }
	  }
	
	  // LINE WIDGETS
	
	  // Line widgets are block elements displayed above or below a line.
	
	  var LineWidget = CodeMirror.LineWidget = function(cm, node, options) {
	    if (options) for (var opt in options) if (options.hasOwnProperty(opt))
	      this[opt] = options[opt];
	    this.cm = cm;
	    this.node = node;
	  };
	  eventMixin(LineWidget);
	
	  function adjustScrollWhenAboveVisible(cm, line, diff) {
	    if (heightAtLine(line) < ((cm.curOp && cm.curOp.scrollTop) || cm.doc.scrollTop))
	      addToScrollPos(cm, null, diff);
	  }
	
	  LineWidget.prototype.clear = function() {
	    var cm = this.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
	    if (no == null || !ws) return;
	    for (var i = 0; i < ws.length; ++i) if (ws[i] == this) ws.splice(i--, 1);
	    if (!ws.length) line.widgets = null;
	    var height = widgetHeight(this);
	    runInOp(cm, function() {
	      adjustScrollWhenAboveVisible(cm, line, -height);
	      regLineChange(cm, no, "widget");
	      updateLineHeight(line, Math.max(0, line.height - height));
	    });
	  };
	  LineWidget.prototype.changed = function() {
	    var oldH = this.height, cm = this.cm, line = this.line;
	    this.height = null;
	    var diff = widgetHeight(this) - oldH;
	    if (!diff) return;
	    runInOp(cm, function() {
	      cm.curOp.forceUpdate = true;
	      adjustScrollWhenAboveVisible(cm, line, diff);
	      updateLineHeight(line, line.height + diff);
	    });
	  };
	
	  function widgetHeight(widget) {
	    if (widget.height != null) return widget.height;
	    if (!contains(document.body, widget.node))
	      removeChildrenAndAdd(widget.cm.display.measure, elt("div", [widget.node], null, "position: relative"));
	    return widget.height = widget.node.offsetHeight;
	  }
	
	  function addLineWidget(cm, handle, node, options) {
	    var widget = new LineWidget(cm, node, options);
	    if (widget.noHScroll) cm.display.alignWidgets = true;
	    changeLine(cm, handle, "widget", function(line) {
	      var widgets = line.widgets || (line.widgets = []);
	      if (widget.insertAt == null) widgets.push(widget);
	      else widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget);
	      widget.line = line;
	      if (!lineIsHidden(cm.doc, line)) {
	        var aboveVisible = heightAtLine(line) < cm.doc.scrollTop;
	        updateLineHeight(line, line.height + widgetHeight(widget));
	        if (aboveVisible) addToScrollPos(cm, null, widget.height);
	        cm.curOp.forceUpdate = true;
	      }
	      return true;
	    });
	    return widget;
	  }
	
	  // LINE DATA STRUCTURE
	
	  // Line objects. These hold state related to a line, including
	  // highlighting info (the styles array).
	  var Line = CodeMirror.Line = function(text, markedSpans, estimateHeight) {
	    this.text = text;
	    attachMarkedSpans(this, markedSpans);
	    this.height = estimateHeight ? estimateHeight(this) : 1;
	  };
	  eventMixin(Line);
	  Line.prototype.lineNo = function() { return lineNo(this); };
	
	  // Change the content (text, markers) of a line. Automatically
	  // invalidates cached information and tries to re-estimate the
	  // line's height.
	  function updateLine(line, text, markedSpans, estimateHeight) {
	    line.text = text;
	    if (line.stateAfter) line.stateAfter = null;
	    if (line.styles) line.styles = null;
	    if (line.order != null) line.order = null;
	    detachMarkedSpans(line);
	    attachMarkedSpans(line, markedSpans);
	    var estHeight = estimateHeight ? estimateHeight(line) : 1;
	    if (estHeight != line.height) updateLineHeight(line, estHeight);
	  }
	
	  // Detach a line from the document tree and its markers.
	  function cleanUpLine(line) {
	    line.parent = null;
	    detachMarkedSpans(line);
	  }
	
	  function extractLineClasses(type, output) {
	    if (type) for (;;) {
	      var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
	      if (!lineClass) break;
	      type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
	      var prop = lineClass[1] ? "bgClass" : "textClass";
	      if (output[prop] == null)
	        output[prop] = lineClass[2];
	      else if (!(new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)")).test(output[prop]))
	        output[prop] += " " + lineClass[2];
	    }
	    return type;
	  }
	
	  function callBlankLine(mode, state) {
	    if (mode.blankLine) return mode.blankLine(state);
	    if (!mode.innerMode) return;
	    var inner = CodeMirror.innerMode(mode, state);
	    if (inner.mode.blankLine) return inner.mode.blankLine(inner.state);
	  }
	
	  function readToken(mode, stream, state) {
	    for (var i = 0; i < 10; i++) {
	      var style = mode.token(stream, state);
	      if (stream.pos > stream.start) return style;
	    }
	    throw new Error("Mode " + mode.name + " failed to advance stream.");
	  }
	
	  // Run the given mode's parser over a line, calling f for each token.
	  function runMode(cm, text, mode, state, f, lineClasses, forceToEnd) {
	    var flattenSpans = mode.flattenSpans;
	    if (flattenSpans == null) flattenSpans = cm.options.flattenSpans;
	    var curStart = 0, curStyle = null;
	    var stream = new StringStream(text, cm.options.tabSize), style;
	    if (text == "") extractLineClasses(callBlankLine(mode, state), lineClasses);
	    while (!stream.eol()) {
	      if (stream.pos > cm.options.maxHighlightLength) {
	        flattenSpans = false;
	        if (forceToEnd) processLine(cm, text, state, stream.pos);
	        stream.pos = text.length;
	        style = null;
	      } else {
	        style = extractLineClasses(readToken(mode, stream, state), lineClasses);
	      }
	      if (cm.options.addModeClass) {
	        var mName = CodeMirror.innerMode(mode, state).mode.name;
	        if (mName) style = "m-" + (style ? mName + " " + style : mName);
	      }
	      if (!flattenSpans || curStyle != style) {
	        if (curStart < stream.start) f(stream.start, curStyle);
	        curStart = stream.start; curStyle = style;
	      }
	      stream.start = stream.pos;
	    }
	    while (curStart < stream.pos) {
	      // Webkit seems to refuse to render text nodes longer than 57444 characters
	      var pos = Math.min(stream.pos, curStart + 50000);
	      f(pos, curStyle);
	      curStart = pos;
	    }
	  }
	
	  // Compute a style array (an array starting with a mode generation
	  // -- for invalidation -- followed by pairs of end positions and
	  // style strings), which is used to highlight the tokens on the
	  // line.
	  function highlightLine(cm, line, state, forceToEnd) {
	    // A styles array always starts with a number identifying the
	    // mode/overlays that it is based on (for easy invalidation).
	    var st = [cm.state.modeGen], lineClasses = {};
	    // Compute the base array of styles
	    runMode(cm, line.text, cm.doc.mode, state, function(end, style) {
	      st.push(end, style);
	    }, lineClasses, forceToEnd);
	
	    // Run overlays, adjust style array.
	    for (var o = 0; o < cm.state.overlays.length; ++o) {
	      var overlay = cm.state.overlays[o], i = 1, at = 0;
	      runMode(cm, line.text, overlay.mode, true, function(end, style) {
	        var start = i;
	        // Ensure there's a token end at the current position, and that i points at it
	        while (at < end) {
	          var i_end = st[i];
	          if (i_end > end)
	            st.splice(i, 1, end, st[i+1], i_end);
	          i += 2;
	          at = Math.min(end, i_end);
	        }
	        if (!style) return;
	        if (overlay.opaque) {
	          st.splice(start, i - start, end, "cm-overlay " + style);
	          i = start + 2;
	        } else {
	          for (; start < i; start += 2) {
	            var cur = st[start+1];
	            st[start+1] = (cur ? cur + " " : "") + "cm-overlay " + style;
	          }
	        }
	      }, lineClasses);
	    }
	
	    return {styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null};
	  }
	
	  function getLineStyles(cm, line) {
	    if (!line.styles || line.styles[0] != cm.state.modeGen) {
	      var result = highlightLine(cm, line, line.stateAfter = getStateBefore(cm, lineNo(line)));
	      line.styles = result.styles;
	      if (result.classes) line.styleClasses = result.classes;
	      else if (line.styleClasses) line.styleClasses = null;
	    }
	    return line.styles;
	  }
	
	  // Lightweight form of highlight -- proceed over this line and
	  // update state, but don't save a style array. Used for lines that
	  // aren't currently visible.
	  function processLine(cm, text, state, startAt) {
	    var mode = cm.doc.mode;
	    var stream = new StringStream(text, cm.options.tabSize);
	    stream.start = stream.pos = startAt || 0;
	    if (text == "") callBlankLine(mode, state);
	    while (!stream.eol() && stream.pos <= cm.options.maxHighlightLength) {
	      readToken(mode, stream, state);
	      stream.start = stream.pos;
	    }
	  }
	
	  // Convert a style as returned by a mode (either null, or a string
	  // containing one or more styles) to a CSS style. This is cached,
	  // and also looks for line-wide styles.
	  var styleToClassCache = {}, styleToClassCacheWithMode = {};
	  function interpretTokenStyle(style, options) {
	    if (!style || /^\s*$/.test(style)) return null;
	    var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
	    return cache[style] ||
	      (cache[style] = style.replace(/\S+/g, "cm-$&"));
	  }
	
	  // Render the DOM representation of the text of a line. Also builds
	  // up a 'line map', which points at the DOM nodes that represent
	  // specific stretches of text, and is used by the measuring code.
	  // The returned object contains the DOM node, this map, and
	  // information about line-wide styles that were set by the mode.
	  function buildLineContent(cm, lineView) {
	    // The padding-right forces the element to have a 'border', which
	    // is needed on Webkit to be able to get line-level bounding
	    // rectangles for it (in measureChar).
	    var content = elt("span", null, null, webkit ? "padding-right: .1px" : null);
	    var builder = {pre: elt("pre", [content]), content: content, col: 0, pos: 0, cm: cm};
	    lineView.measure = {};
	
	    // Iterate over the logical lines that make up this visual line.
	    for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
	      var line = i ? lineView.rest[i - 1] : lineView.line, order;
	      builder.pos = 0;
	      builder.addToken = buildToken;
	      // Optionally wire in some hacks into the token-rendering
	      // algorithm, to deal with browser quirks.
	      if ((ie || webkit) && cm.getOption("lineWrapping"))
	        builder.addToken = buildTokenSplitSpaces(builder.addToken);
	      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line)))
	        builder.addToken = buildTokenBadBidi(builder.addToken, order);
	      builder.map = [];
	      insertLineContent(line, builder, getLineStyles(cm, line));
	      if (line.styleClasses) {
	        if (line.styleClasses.bgClass)
	          builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
	        if (line.styleClasses.textClass)
	          builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
	      }
	
	      // Ensure at least a single node is present, for measuring.
	      if (builder.map.length == 0)
	        builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
	
	      // Store the map and a cache object for the current logical line
	      if (i == 0) {
	        lineView.measure.map = builder.map;
	        lineView.measure.cache = {};
	      } else {
	        (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
	        (lineView.measure.caches || (lineView.measure.caches = [])).push({});
	      }
	    }
	
	    signal(cm, "renderLine", cm, lineView.line, builder.pre);
	    if (builder.pre.className)
	      builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
	    return builder;
	  }
	
	  function defaultSpecialCharPlaceholder(ch) {
	    var token = elt("span", "\u2022", "cm-invalidchar");
	    token.title = "\\u" + ch.charCodeAt(0).toString(16);
	    return token;
	  }
	
	  // Build up the DOM representation for a single token, and add it to
	  // the line map. Takes care to render special characters separately.
	  function buildToken(builder, text, style, startStyle, endStyle, title) {
	    if (!text) return;
	    var special = builder.cm.options.specialChars, mustWrap = false;
	    if (!special.test(text)) {
	      builder.col += text.length;
	      var content = document.createTextNode(text);
	      builder.map.push(builder.pos, builder.pos + text.length, content);
	      if (ie_upto8) mustWrap = true;
	      builder.pos += text.length;
	    } else {
	      var content = document.createDocumentFragment(), pos = 0;
	      while (true) {
	        special.lastIndex = pos;
	        var m = special.exec(text);
	        var skipped = m ? m.index - pos : text.length - pos;
	        if (skipped) {
	          var txt = document.createTextNode(text.slice(pos, pos + skipped));
	          if (ie_upto8) content.appendChild(elt("span", [txt]));
	          else content.appendChild(txt);
	          builder.map.push(builder.pos, builder.pos + skipped, txt);
	          builder.col += skipped;
	          builder.pos += skipped;
	        }
	        if (!m) break;
	        pos += skipped + 1;
	        if (m[0] == "\t") {
	          var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
	          var txt = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
	          builder.col += tabWidth;
	        } else {
	          var txt = builder.cm.options.specialCharPlaceholder(m[0]);
	          if (ie_upto8) content.appendChild(elt("span", [txt]));
	          else content.appendChild(txt);
	          builder.col += 1;
	        }
	        builder.map.push(builder.pos, builder.pos + 1, txt);
	        builder.pos++;
	      }
	    }
	    if (style || startStyle || endStyle || mustWrap) {
	      var fullStyle = style || "";
	      if (startStyle) fullStyle += startStyle;
	      if (endStyle) fullStyle += endStyle;
	      var token = elt("span", [content], fullStyle);
	      if (title) token.title = title;
	      return builder.content.appendChild(token);
	    }
	    builder.content.appendChild(content);
	  }
	
	  function buildTokenSplitSpaces(inner) {
	    function split(old) {
	      var out = " ";
	      for (var i = 0; i < old.length - 2; ++i) out += i % 2 ? " " : "\u00a0";
	      out += " ";
	      return out;
	    }
	    return function(builder, text, style, startStyle, endStyle, title) {
	      inner(builder, text.replace(/ {3,}/g, split), style, startStyle, endStyle, title);
	    };
	  }
	
	  // Work around nonsense dimensions being reported for stretches of
	  // right-to-left text.
	  function buildTokenBadBidi(inner, order) {
	    return function(builder, text, style, startStyle, endStyle, title) {
	      style = style ? style + " cm-force-border" : "cm-force-border";
	      var start = builder.pos, end = start + text.length;
	      for (;;) {
	        // Find the part that overlaps with the start of this text
	        for (var i = 0; i < order.length; i++) {
	          var part = order[i];
	          if (part.to > start && part.from <= start) break;
	        }
	        if (part.to >= end) return inner(builder, text, style, startStyle, endStyle, title);
	        inner(builder, text.slice(0, part.to - start), style, startStyle, null, title);
	        startStyle = null;
	        text = text.slice(part.to - start);
	        start = part.to;
	      }
	    };
	  }
	
	  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
	    var widget = !ignoreWidget && marker.widgetNode;
	    if (widget) {
	      builder.map.push(builder.pos, builder.pos + size, widget);
	      builder.content.appendChild(widget);
	    }
	    builder.pos += size;
	  }
	
	  // Outputs a number of spans to make up a line, taking highlighting
	  // and marked text into account.
	  function insertLineContent(line, builder, styles) {
	    var spans = line.markedSpans, allText = line.text, at = 0;
	    if (!spans) {
	      for (var i = 1; i < styles.length; i+=2)
	        builder.addToken(builder, allText.slice(at, at = styles[i]), interpretTokenStyle(styles[i+1], builder.cm.options));
	      return;
	    }
	
	    var len = allText.length, pos = 0, i = 1, text = "", style;
	    var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, title, collapsed;
	    for (;;) {
	      if (nextChange == pos) { // Update current marker set
	        spanStyle = spanEndStyle = spanStartStyle = title = "";
	        collapsed = null; nextChange = Infinity;
	        var foundBookmarks = [];
	        for (var j = 0; j < spans.length; ++j) {
	          var sp = spans[j], m = sp.marker;
	          if (sp.from <= pos && (sp.to == null || sp.to > pos)) {
	            if (sp.to != null && nextChange > sp.to) { nextChange = sp.to; spanEndStyle = ""; }
	            if (m.className) spanStyle += " " + m.className;
	            if (m.startStyle && sp.from == pos) spanStartStyle += " " + m.startStyle;
	            if (m.endStyle && sp.to == nextChange) spanEndStyle += " " + m.endStyle;
	            if (m.title && !title) title = m.title;
	            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0))
	              collapsed = sp;
	          } else if (sp.from > pos && nextChange > sp.from) {
	            nextChange = sp.from;
	          }
	          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) foundBookmarks.push(m);
	        }
	        if (collapsed && (collapsed.from || 0) == pos) {
	          buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos,
	                             collapsed.marker, collapsed.from == null);
	          if (collapsed.to == null) return;
	        }
	        if (!collapsed && foundBookmarks.length) for (var j = 0; j < foundBookmarks.length; ++j)
	          buildCollapsedSpan(builder, 0, foundBookmarks[j]);
	      }
	      if (pos >= len) break;
	
	      var upto = Math.min(len, nextChange);
	      while (true) {
	        if (text) {
	          var end = pos + text.length;
	          if (!collapsed) {
	            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
	            builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle,
	                             spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title);
	          }
	          if (end >= upto) {text = text.slice(upto - pos); pos = upto; break;}
	          pos = end;
	          spanStartStyle = "";
	        }
	        text = allText.slice(at, at = styles[i++]);
	        style = interpretTokenStyle(styles[i++], builder.cm.options);
	      }
	    }
	  }
	
	  // DOCUMENT DATA STRUCTURE
	
	  // By default, updates that start and end at the beginning of a line
	  // are treated specially, in order to make the association of line
	  // widgets and marker elements with the text behave more intuitive.
	  function isWholeLineUpdate(doc, change) {
	    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" &&
	      (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
	  }
	
	  // Perform a change on the document data structure.
	  function updateDoc(doc, change, markedSpans, estimateHeight) {
	    function spansFor(n) {return markedSpans ? markedSpans[n] : null;}
	    function update(line, text, spans) {
	      updateLine(line, text, spans, estimateHeight);
	      signalLater(line, "change", line, change);
	    }
	
	    var from = change.from, to = change.to, text = change.text;
	    var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
	    var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
	
	    // Adjust the line structure
	    if (isWholeLineUpdate(doc, change)) {
	      // This is a whole-line replace. Treated specially to make
	      // sure line objects move the way they are supposed to.
	      for (var i = 0, added = []; i < text.length - 1; ++i)
	        added.push(new Line(text[i], spansFor(i), estimateHeight));
	      update(lastLine, lastLine.text, lastSpans);
	      if (nlines) doc.remove(from.line, nlines);
	      if (added.length) doc.insert(from.line, added);
	    } else if (firstLine == lastLine) {
	      if (text.length == 1) {
	        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
	      } else {
	        for (var added = [], i = 1; i < text.length - 1; ++i)
	          added.push(new Line(text[i], spansFor(i), estimateHeight));
	        added.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight));
	        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
	        doc.insert(from.line + 1, added);
	      }
	    } else if (text.length == 1) {
	      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
	      doc.remove(from.line + 1, nlines);
	    } else {
	      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
	      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
	      for (var i = 1, added = []; i < text.length - 1; ++i)
	        added.push(new Line(text[i], spansFor(i), estimateHeight));
	      if (nlines > 1) doc.remove(from.line + 1, nlines - 1);
	      doc.insert(from.line + 1, added);
	    }
	
	    signalLater(doc, "change", doc, change);
	  }
	
	  // The document is represented as a BTree consisting of leaves, with
	  // chunk of lines in them, and branches, with up to ten leaves or
	  // other branch nodes below them. The top node is always a branch
	  // node, and is the document object itself (meaning it has
	  // additional methods and properties).
	  //
	  // All nodes have parent links. The tree is used both to go from
	  // line numbers to line objects, and to go from objects to numbers.
	  // It also indexes by height, and is used to convert between height
	  // and line object, and to find the total height of the document.
	  //
	  // See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html
	
	  function LeafChunk(lines) {
	    this.lines = lines;
	    this.parent = null;
	    for (var i = 0, height = 0; i < lines.length; ++i) {
	      lines[i].parent = this;
	      height += lines[i].height;
	    }
	    this.height = height;
	  }
	
	  LeafChunk.prototype = {
	    chunkSize: function() { return this.lines.length; },
	    // Remove the n lines at offset 'at'.
	    removeInner: function(at, n) {
	      for (var i = at, e = at + n; i < e; ++i) {
	        var line = this.lines[i];
	        this.height -= line.height;
	        cleanUpLine(line);
	        signalLater(line, "delete");
	      }
	      this.lines.splice(at, n);
	    },
	    // Helper used to collapse a small branch into a single leaf.
	    collapse: function(lines) {
	      lines.push.apply(lines, this.lines);
	    },
	    // Insert the given array of lines at offset 'at', count them as
	    // having the given height.
	    insertInner: function(at, lines, height) {
	      this.height += height;
	      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
	      for (var i = 0; i < lines.length; ++i) lines[i].parent = this;
	    },
	    // Used to iterate over a part of the tree.
	    iterN: function(at, n, op) {
	      for (var e = at + n; at < e; ++at)
	        if (op(this.lines[at])) return true;
	    }
	  };
	
	  function BranchChunk(children) {
	    this.children = children;
	    var size = 0, height = 0;
	    for (var i = 0; i < children.length; ++i) {
	      var ch = children[i];
	      size += ch.chunkSize(); height += ch.height;
	      ch.parent = this;
	    }
	    this.size = size;
	    this.height = height;
	    this.parent = null;
	  }
	
	  BranchChunk.prototype = {
	    chunkSize: function() { return this.size; },
	    removeInner: function(at, n) {
	      this.size -= n;
	      for (var i = 0; i < this.children.length; ++i) {
	        var child = this.children[i], sz = child.chunkSize();
	        if (at < sz) {
	          var rm = Math.min(n, sz - at), oldHeight = child.height;
	          child.removeInner(at, rm);
	          this.height -= oldHeight - child.height;
	          if (sz == rm) { this.children.splice(i--, 1); child.parent = null; }
	          if ((n -= rm) == 0) break;
	          at = 0;
	        } else at -= sz;
	      }
	      // If the result is smaller than 25 lines, ensure that it is a
	      // single leaf node.
	      if (this.size - n < 25 &&
	          (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
	        var lines = [];
	        this.collapse(lines);
	        this.children = [new LeafChunk(lines)];
	        this.children[0].parent = this;
	      }
	    },
	    collapse: function(lines) {
	      for (var i = 0; i < this.children.length; ++i) this.children[i].collapse(lines);
	    },
	    insertInner: function(at, lines, height) {
	      this.size += lines.length;
	      this.height += height;
	      for (var i = 0; i < this.children.length; ++i) {
	        var child = this.children[i], sz = child.chunkSize();
	        if (at <= sz) {
	          child.insertInner(at, lines, height);
	          if (child.lines && child.lines.length > 50) {
	            while (child.lines.length > 50) {
	              var spilled = child.lines.splice(child.lines.length - 25, 25);
	              var newleaf = new LeafChunk(spilled);
	              child.height -= newleaf.height;
	              this.children.splice(i + 1, 0, newleaf);
	              newleaf.parent = this;
	            }
	            this.maybeSpill();
	          }
	          break;
	        }
	        at -= sz;
	      }
	    },
	    // When a node has grown, check whether it should be split.
	    maybeSpill: function() {
	      if (this.children.length <= 10) return;
	      var me = this;
	      do {
	        var spilled = me.children.splice(me.children.length - 5, 5);
	        var sibling = new BranchChunk(spilled);
	        if (!me.parent) { // Become the parent node
	          var copy = new BranchChunk(me.children);
	          copy.parent = me;
	          me.children = [copy, sibling];
	          me = copy;
	        } else {
	          me.size -= sibling.size;
	          me.height -= sibling.height;
	          var myIndex = indexOf(me.parent.children, me);
	          me.parent.children.splice(myIndex + 1, 0, sibling);
	        }
	        sibling.parent = me.parent;
	      } while (me.children.length > 10);
	      me.parent.maybeSpill();
	    },
	    iterN: function(at, n, op) {
	      for (var i = 0; i < this.children.length; ++i) {
	        var child = this.children[i], sz = child.chunkSize();
	        if (at < sz) {
	          var used = Math.min(n, sz - at);
	          if (child.iterN(at, used, op)) return true;
	          if ((n -= used) == 0) break;
	          at = 0;
	        } else at -= sz;
	      }
	    }
	  };
	
	  var nextDocId = 0;
	  var Doc = CodeMirror.Doc = function(text, mode, firstLine) {
	    if (!(this instanceof Doc)) return new Doc(text, mode, firstLine);
	    if (firstLine == null) firstLine = 0;
	
	    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
	    this.first = firstLine;
	    this.scrollTop = this.scrollLeft = 0;
	    this.cantEdit = false;
	    this.cleanGeneration = 1;
	    this.frontier = firstLine;
	    var start = Pos(firstLine, 0);
	    this.sel = simpleSelection(start);
	    this.history = new History(null);
	    this.id = ++nextDocId;
	    this.modeOption = mode;
	
	    if (typeof text == "string") text = splitLines(text);
	    updateDoc(this, {from: start, to: start, text: text});
	    setSelection(this, simpleSelection(start), sel_dontScroll);
	  };
	
	  Doc.prototype = createObj(BranchChunk.prototype, {
	    constructor: Doc,
	    // Iterate over the document. Supports two forms -- with only one
	    // argument, it calls that for each line in the document. With
	    // three, it iterates over the range given by the first two (with
	    // the second being non-inclusive).
	    iter: function(from, to, op) {
	      if (op) this.iterN(from - this.first, to - from, op);
	      else this.iterN(this.first, this.first + this.size, from);
	    },
	
	    // Non-public interface for adding and removing lines.
	    insert: function(at, lines) {
	      var height = 0;
	      for (var i = 0; i < lines.length; ++i) height += lines[i].height;
	      this.insertInner(at - this.first, lines, height);
	    },
	    remove: function(at, n) { this.removeInner(at - this.first, n); },
	
	    // From here, the methods are part of the public interface. Most
	    // are also available from CodeMirror (editor) instances.
	
	    getValue: function(lineSep) {
	      var lines = getLines(this, this.first, this.first + this.size);
	      if (lineSep === false) return lines;
	      return lines.join(lineSep || "\n");
	    },
	    setValue: docMethodOp(function(code) {
	      var top = Pos(this.first, 0), last = this.first + this.size - 1;
	      makeChange(this, {from: top, to: Pos(last, getLine(this, last).text.length),
	                        text: splitLines(code), origin: "setValue"}, true);
	      setSelection(this, simpleSelection(top));
	    }),
	    replaceRange: function(code, from, to, origin) {
	      from = clipPos(this, from);
	      to = to ? clipPos(this, to) : from;
	      replaceRange(this, code, from, to, origin);
	    },
	    getRange: function(from, to, lineSep) {
	      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
	      if (lineSep === false) return lines;
	      return lines.join(lineSep || "\n");
	    },
	
	    getLine: function(line) {var l = this.getLineHandle(line); return l && l.text;},
	
	    getLineHandle: function(line) {if (isLine(this, line)) return getLine(this, line);},
	    getLineNumber: function(line) {return lineNo(line);},
	
	    getLineHandleVisualStart: function(line) {
	      if (typeof line == "number") line = getLine(this, line);
	      return visualLine(line);
	    },
	
	    lineCount: function() {return this.size;},
	    firstLine: function() {return this.first;},
	    lastLine: function() {return this.first + this.size - 1;},
	
	    clipPos: function(pos) {return clipPos(this, pos);},
	
	    getCursor: function(start) {
	      var range = this.sel.primary(), pos;
	      if (start == null || start == "head") pos = range.head;
	      else if (start == "anchor") pos = range.anchor;
	      else if (start == "end" || start == "to" || start === false) pos = range.to();
	      else pos = range.from();
	      return pos;
	    },
	    listSelections: function() { return this.sel.ranges; },
	    somethingSelected: function() {return this.sel.somethingSelected();},
	
	    setCursor: docMethodOp(function(line, ch, options) {
	      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
	    }),
	    setSelection: docMethodOp(function(anchor, head, options) {
	      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
	    }),
	    extendSelection: docMethodOp(function(head, other, options) {
	      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
	    }),
	    extendSelections: docMethodOp(function(heads, options) {
	      extendSelections(this, clipPosArray(this, heads, options));
	    }),
	    extendSelectionsBy: docMethodOp(function(f, options) {
	      extendSelections(this, map(this.sel.ranges, f), options);
	    }),
	    setSelections: docMethodOp(function(ranges, primary, options) {
	      if (!ranges.length) return;
	      for (var i = 0, out = []; i < ranges.length; i++)
	        out[i] = new Range(clipPos(this, ranges[i].anchor),
	                           clipPos(this, ranges[i].head));
	      if (primary == null) primary = Math.min(ranges.length - 1, this.sel.primIndex);
	      setSelection(this, normalizeSelection(out, primary), options);
	    }),
	    addSelection: docMethodOp(function(anchor, head, options) {
	      var ranges = this.sel.ranges.slice(0);
	      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
	      setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
	    }),
	
	    getSelection: function(lineSep) {
	      var ranges = this.sel.ranges, lines;
	      for (var i = 0; i < ranges.length; i++) {
	        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
	        lines = lines ? lines.concat(sel) : sel;
	      }
	      if (lineSep === false) return lines;
	      else return lines.join(lineSep || "\n");
	    },
	    getSelections: function(lineSep) {
	      var parts = [], ranges = this.sel.ranges;
	      for (var i = 0; i < ranges.length; i++) {
	        var sel = getBetween(this, ranges[i].from(), ranges[i].to());
	        if (lineSep !== false) sel = sel.join(lineSep || "\n");
	        parts[i] = sel;
	      }
	      return parts;
	    },
	    replaceSelection: function(code, collapse, origin) {
	      var dup = [];
	      for (var i = 0; i < this.sel.ranges.length; i++)
	        dup[i] = code;
	      this.replaceSelections(dup, collapse, origin || "+input");
	    },
	    replaceSelections: docMethodOp(function(code, collapse, origin) {
	      var changes = [], sel = this.sel;
	      for (var i = 0; i < sel.ranges.length; i++) {
	        var range = sel.ranges[i];
	        changes[i] = {from: range.from(), to: range.to(), text: splitLines(code[i]), origin: origin};
	      }
	      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
	      for (var i = changes.length - 1; i >= 0; i--)
	        makeChange(this, changes[i]);
	      if (newSel) setSelectionReplaceHistory(this, newSel);
	      else if (this.cm) ensureCursorVisible(this.cm);
	    }),
	    undo: docMethodOp(function() {makeChangeFromHistory(this, "undo");}),
	    redo: docMethodOp(function() {makeChangeFromHistory(this, "redo");}),
	    undoSelection: docMethodOp(function() {makeChangeFromHistory(this, "undo", true);}),
	    redoSelection: docMethodOp(function() {makeChangeFromHistory(this, "redo", true);}),
	
	    setExtending: function(val) {this.extend = val;},
	    getExtending: function() {return this.extend;},
	
	    historySize: function() {
	      var hist = this.history, done = 0, undone = 0;
	      for (var i = 0; i < hist.done.length; i++) if (!hist.done[i].ranges) ++done;
	      for (var i = 0; i < hist.undone.length; i++) if (!hist.undone[i].ranges) ++undone;
	      return {undo: done, redo: undone};
	    },
	    clearHistory: function() {this.history = new History(this.history.maxGeneration);},
	
	    markClean: function() {
	      this.cleanGeneration = this.changeGeneration(true);
	    },
	    changeGeneration: function(forceSplit) {
	      if (forceSplit)
	        this.history.lastOp = this.history.lastOrigin = null;
	      return this.history.generation;
	    },
	    isClean: function (gen) {
	      return this.history.generation == (gen || this.cleanGeneration);
	    },
	
	    getHistory: function() {
	      return {done: copyHistoryArray(this.history.done),
	              undone: copyHistoryArray(this.history.undone)};
	    },
	    setHistory: function(histData) {
	      var hist = this.history = new History(this.history.maxGeneration);
	      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
	      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
	    },
	
	    markText: function(from, to, options) {
	      return markText(this, clipPos(this, from), clipPos(this, to), options, "range");
	    },
	    setBookmark: function(pos, options) {
	      var realOpts = {replacedWith: options && (options.nodeType == null ? options.widget : options),
	                      insertLeft: options && options.insertLeft,
	                      clearWhenEmpty: false, shared: options && options.shared};
	      pos = clipPos(this, pos);
	      return markText(this, pos, pos, realOpts, "bookmark");
	    },
	    findMarksAt: function(pos) {
	      pos = clipPos(this, pos);
	      var markers = [], spans = getLine(this, pos.line).markedSpans;
	      if (spans) for (var i = 0; i < spans.length; ++i) {
	        var span = spans[i];
	        if ((span.from == null || span.from <= pos.ch) &&
	            (span.to == null || span.to >= pos.ch))
	          markers.push(span.marker.parent || span.marker);
	      }
	      return markers;
	    },
	    findMarks: function(from, to, filter) {
	      from = clipPos(this, from); to = clipPos(this, to);
	      var found = [], lineNo = from.line;
	      this.iter(from.line, to.line + 1, function(line) {
	        var spans = line.markedSpans;
	        if (spans) for (var i = 0; i < spans.length; i++) {
	          var span = spans[i];
	          if (!(lineNo == from.line && from.ch > span.to ||
	                span.from == null && lineNo != from.line||
	                lineNo == to.line && span.from > to.ch) &&
	              (!filter || filter(span.marker)))
	            found.push(span.marker.parent || span.marker);
	        }
	        ++lineNo;
	      });
	      return found;
	    },
	    getAllMarks: function() {
	      var markers = [];
	      this.iter(function(line) {
	        var sps = line.markedSpans;
	        if (sps) for (var i = 0; i < sps.length; ++i)
	          if (sps[i].from != null) markers.push(sps[i].marker);
	      });
	      return markers;
	    },
	
	    posFromIndex: function(off) {
	      var ch, lineNo = this.first;
	      this.iter(function(line) {
	        var sz = line.text.length + 1;
	        if (sz > off) { ch = off; return true; }
	        off -= sz;
	        ++lineNo;
	      });
	      return clipPos(this, Pos(lineNo, ch));
	    },
	    indexFromPos: function (coords) {
	      coords = clipPos(this, coords);
	      var index = coords.ch;
	      if (coords.line < this.first || coords.ch < 0) return 0;
	      this.iter(this.first, coords.line, function (line) {
	        index += line.text.length + 1;
	      });
	      return index;
	    },
	
	    copy: function(copyHistory) {
	      var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first);
	      doc.scrollTop = this.scrollTop; doc.scrollLeft = this.scrollLeft;
	      doc.sel = this.sel;
	      doc.extend = false;
	      if (copyHistory) {
	        doc.history.undoDepth = this.history.undoDepth;
	        doc.setHistory(this.getHistory());
	      }
	      return doc;
	    },
	
	    linkedDoc: function(options) {
	      if (!options) options = {};
	      var from = this.first, to = this.first + this.size;
	      if (options.from != null && options.from > from) from = options.from;
	      if (options.to != null && options.to < to) to = options.to;
	      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from);
	      if (options.sharedHist) copy.history = this.history;
	      (this.linked || (this.linked = [])).push({doc: copy, sharedHist: options.sharedHist});
	      copy.linked = [{doc: this, isParent: true, sharedHist: options.sharedHist}];
	      copySharedMarkers(copy, findSharedMarkers(this));
	      return copy;
	    },
	    unlinkDoc: function(other) {
	      if (other instanceof CodeMirror) other = other.doc;
	      if (this.linked) for (var i = 0; i < this.linked.length; ++i) {
	        var link = this.linked[i];
	        if (link.doc != other) continue;
	        this.linked.splice(i, 1);
	        other.unlinkDoc(this);
	        detachSharedMarkers(findSharedMarkers(this));
	        break;
	      }
	      // If the histories were shared, split them again
	      if (other.history == this.history) {
	        var splitIds = [other.id];
	        linkedDocs(other, function(doc) {splitIds.push(doc.id);}, true);
	        other.history = new History(null);
	        other.history.done = copyHistoryArray(this.history.done, splitIds);
	        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
	      }
	    },
	    iterLinkedDocs: function(f) {linkedDocs(this, f);},
	
	    getMode: function() {return this.mode;},
	    getEditor: function() {return this.cm;}
	  });
	
	  // Public alias.
	  Doc.prototype.eachLine = Doc.prototype.iter;
	
	  // Set up methods on CodeMirror's prototype to redirect to the editor's document.
	  var dontDelegate = "iter insert remove copy getEditor".split(" ");
	  for (var prop in Doc.prototype) if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0)
	    CodeMirror.prototype[prop] = (function(method) {
	      return function() {return method.apply(this.doc, arguments);};
	    })(Doc.prototype[prop]);
	
	  eventMixin(Doc);
	
	  // Call f for all linked documents.
	  function linkedDocs(doc, f, sharedHistOnly) {
	    function propagate(doc, skip, sharedHist) {
	      if (doc.linked) for (var i = 0; i < doc.linked.length; ++i) {
	        var rel = doc.linked[i];
	        if (rel.doc == skip) continue;
	        var shared = sharedHist && rel.sharedHist;
	        if (sharedHistOnly && !shared) continue;
	        f(rel.doc, shared);
	        propagate(rel.doc, doc, shared);
	      }
	    }
	    propagate(doc, null, true);
	  }
	
	  // Attach a document to an editor.
	  function attachDoc(cm, doc) {
	    if (doc.cm) throw new Error("This document is already in use.");
	    cm.doc = doc;
	    doc.cm = cm;
	    estimateLineHeights(cm);
	    loadMode(cm);
	    if (!cm.options.lineWrapping) findMaxLine(cm);
	    cm.options.mode = doc.modeOption;
	    regChange(cm);
	  }
	
	  // LINE UTILITIES
	
	  // Find the line object corresponding to the given line number.
	  function getLine(doc, n) {
	    n -= doc.first;
	    if (n < 0 || n >= doc.size) throw new Error("There is no line " + (n + doc.first) + " in the document.");
	    for (var chunk = doc; !chunk.lines;) {
	      for (var i = 0;; ++i) {
	        var child = chunk.children[i], sz = child.chunkSize();
	        if (n < sz) { chunk = child; break; }
	        n -= sz;
	      }
	    }
	    return chunk.lines[n];
	  }
	
	  // Get the part of a document between two positions, as an array of
	  // strings.
	  function getBetween(doc, start, end) {
	    var out = [], n = start.line;
	    doc.iter(start.line, end.line + 1, function(line) {
	      var text = line.text;
	      if (n == end.line) text = text.slice(0, end.ch);
	      if (n == start.line) text = text.slice(start.ch);
	      out.push(text);
	      ++n;
	    });
	    return out;
	  }
	  // Get the lines between from and to, as array of strings.
	  function getLines(doc, from, to) {
	    var out = [];
	    doc.iter(from, to, function(line) { out.push(line.text); });
	    return out;
	  }
	
	  // Update the height of a line, propagating the height change
	  // upwards to parent nodes.
	  function updateLineHeight(line, height) {
	    var diff = height - line.height;
	    if (diff) for (var n = line; n; n = n.parent) n.height += diff;
	  }
	
	  // Given a line object, find its line number by walking up through
	  // its parent links.
	  function lineNo(line) {
	    if (line.parent == null) return null;
	    var cur = line.parent, no = indexOf(cur.lines, line);
	    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
	      for (var i = 0;; ++i) {
	        if (chunk.children[i] == cur) break;
	        no += chunk.children[i].chunkSize();
	      }
	    }
	    return no + cur.first;
	  }
	
	  // Find the line at the given vertical position, using the height
	  // information in the document tree.
	  function lineAtHeight(chunk, h) {
	    var n = chunk.first;
	    outer: do {
	      for (var i = 0; i < chunk.children.length; ++i) {
	        var child = chunk.children[i], ch = child.height;
	        if (h < ch) { chunk = child; continue outer; }
	        h -= ch;
	        n += child.chunkSize();
	      }
	      return n;
	    } while (!chunk.lines);
	    for (var i = 0; i < chunk.lines.length; ++i) {
	      var line = chunk.lines[i], lh = line.height;
	      if (h < lh) break;
	      h -= lh;
	    }
	    return n + i;
	  }
	
	
	  // Find the height above the given line.
	  function heightAtLine(lineObj) {
	    lineObj = visualLine(lineObj);
	
	    var h = 0, chunk = lineObj.parent;
	    for (var i = 0; i < chunk.lines.length; ++i) {
	      var line = chunk.lines[i];
	      if (line == lineObj) break;
	      else h += line.height;
	    }
	    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
	      for (var i = 0; i < p.children.length; ++i) {
	        var cur = p.children[i];
	        if (cur == chunk) break;
	        else h += cur.height;
	      }
	    }
	    return h;
	  }
	
	  // Get the bidi ordering for the given line (and cache it). Returns
	  // false for lines that are fully left-to-right, and an array of
	  // BidiSpan objects otherwise.
	  function getOrder(line) {
	    var order = line.order;
	    if (order == null) order = line.order = bidiOrdering(line.text);
	    return order;
	  }
	
	  // HISTORY
	
	  function History(startGen) {
	    // Arrays of change events and selections. Doing something adds an
	    // event to done and clears undo. Undoing moves events from done
	    // to undone, redoing moves them in the other direction.
	    this.done = []; this.undone = [];
	    this.undoDepth = Infinity;
	    // Used to track when changes can be merged into a single undo
	    // event
	    this.lastModTime = this.lastSelTime = 0;
	    this.lastOp = null;
	    this.lastOrigin = this.lastSelOrigin = null;
	    // Used by the isClean() method
	    this.generation = this.maxGeneration = startGen || 1;
	  }
	
	  // Create a history change event from an updateDoc-style change
	  // object.
	  function historyChangeFromChange(doc, change) {
	    var histChange = {from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to)};
	    attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
	    linkedDocs(doc, function(doc) {attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);}, true);
	    return histChange;
	  }
	
	  // Pop all selection events off the end of a history array. Stop at
	  // a change event.
	  function clearSelectionEvents(array) {
	    while (array.length) {
	      var last = lst(array);
	      if (last.ranges) array.pop();
	      else break;
	    }
	  }
	
	  // Find the top change event in the history. Pop off selection
	  // events that are in the way.
	  function lastChangeEvent(hist, force) {
	    if (force) {
	      clearSelectionEvents(hist.done);
	      return lst(hist.done);
	    } else if (hist.done.length && !lst(hist.done).ranges) {
	      return lst(hist.done);
	    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
	      hist.done.pop();
	      return lst(hist.done);
	    }
	  }
	
	  // Register a change in the history. Merges changes that are within
	  // a single operation, ore are close together with an origin that
	  // allows merging (starting with "+") into a single event.
	  function addChangeToHistory(doc, change, selAfter, opId) {
	    var hist = doc.history;
	    hist.undone.length = 0;
	    var time = +new Date, cur;
	
	    if ((hist.lastOp == opId ||
	         hist.lastOrigin == change.origin && change.origin &&
	         ((change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay) ||
	          change.origin.charAt(0) == "*")) &&
	        (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
	      // Merge this change into the last event
	      var last = lst(cur.changes);
	      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
	        // Optimized case for simple insertion -- don't want to add
	        // new changesets for every character typed
	        last.to = changeEnd(change);
	      } else {
	        // Add new sub-event
	        cur.changes.push(historyChangeFromChange(doc, change));
	      }
	    } else {
	      // Can not be merged, start a new event.
	      var before = lst(hist.done);
	      if (!before || !before.ranges)
	        pushSelectionToHistory(doc.sel, hist.done);
	      cur = {changes: [historyChangeFromChange(doc, change)],
	             generation: hist.generation};
	      hist.done.push(cur);
	      while (hist.done.length > hist.undoDepth) {
	        hist.done.shift();
	        if (!hist.done[0].ranges) hist.done.shift();
	      }
	    }
	    hist.done.push(selAfter);
	    hist.generation = ++hist.maxGeneration;
	    hist.lastModTime = hist.lastSelTime = time;
	    hist.lastOp = opId;
	    hist.lastOrigin = hist.lastSelOrigin = change.origin;
	
	    if (!last) signal(doc, "historyAdded");
	  }
	
	  function selectionEventCanBeMerged(doc, origin, prev, sel) {
	    var ch = origin.charAt(0);
	    return ch == "*" ||
	      ch == "+" &&
	      prev.ranges.length == sel.ranges.length &&
	      prev.somethingSelected() == sel.somethingSelected() &&
	      new Date - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
	  }
	
	  // Called whenever the selection changes, sets the new selection as
	  // the pending selection in the history, and pushes the old pending
	  // selection into the 'done' array when it was significantly
	  // different (in number of selected ranges, emptiness, or time).
	  function addSelectionToHistory(doc, sel, opId, options) {
	    var hist = doc.history, origin = options && options.origin;
	
	    // A new event is started when the previous origin does not match
	    // the current, or the origins don't allow matching. Origins
	    // starting with * are always merged, those starting with + are
	    // merged when similar and close together in time.
	    if (opId == hist.lastOp ||
	        (origin && hist.lastSelOrigin == origin &&
	         (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin ||
	          selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))))
	      hist.done[hist.done.length - 1] = sel;
	    else
	      pushSelectionToHistory(sel, hist.done);
	
	    hist.lastSelTime = +new Date;
	    hist.lastSelOrigin = origin;
	    hist.lastOp = opId;
	    if (options && options.clearRedo !== false)
	      clearSelectionEvents(hist.undone);
	  }
	
	  function pushSelectionToHistory(sel, dest) {
	    var top = lst(dest);
	    if (!(top && top.ranges && top.equals(sel)))
	      dest.push(sel);
	  }
	
	  // Used to store marked span information in the history.
	  function attachLocalSpans(doc, change, from, to) {
	    var existing = change["spans_" + doc.id], n = 0;
	    doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
	      if (line.markedSpans)
	        (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
	      ++n;
	    });
	  }
	
	  // When un/re-doing restores text containing marked spans, those
	  // that have been explicitly cleared should not be restored.
	  function removeClearedSpans(spans) {
	    if (!spans) return null;
	    for (var i = 0, out; i < spans.length; ++i) {
	      if (spans[i].marker.explicitlyCleared) { if (!out) out = spans.slice(0, i); }
	      else if (out) out.push(spans[i]);
	    }
	    return !out ? spans : out.length ? out : null;
	  }
	
	  // Retrieve and filter the old marked spans stored in a change event.
	  function getOldSpans(doc, change) {
	    var found = change["spans_" + doc.id];
	    if (!found) return null;
	    for (var i = 0, nw = []; i < change.text.length; ++i)
	      nw.push(removeClearedSpans(found[i]));
	    return nw;
	  }
	
	  // Used both to provide a JSON-safe object in .getHistory, and, when
	  // detaching a document, to split the history in two
	  function copyHistoryArray(events, newGroup, instantiateSel) {
	    for (var i = 0, copy = []; i < events.length; ++i) {
	      var event = events[i];
	      if (event.ranges) {
	        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
	        continue;
	      }
	      var changes = event.changes, newChanges = [];
	      copy.push({changes: newChanges});
	      for (var j = 0; j < changes.length; ++j) {
	        var change = changes[j], m;
	        newChanges.push({from: change.from, to: change.to, text: change.text});
	        if (newGroup) for (var prop in change) if (m = prop.match(/^spans_(\d+)$/)) {
	          if (indexOf(newGroup, Number(m[1])) > -1) {
	            lst(newChanges)[prop] = change[prop];
	            delete change[prop];
	          }
	        }
	      }
	    }
	    return copy;
	  }
	
	  // Rebasing/resetting history to deal with externally-sourced changes
	
	  function rebaseHistSelSingle(pos, from, to, diff) {
	    if (to < pos.line) {
	      pos.line += diff;
	    } else if (from < pos.line) {
	      pos.line = from;
	      pos.ch = 0;
	    }
	  }
	
	  // Tries to rebase an array of history events given a change in the
	  // document. If the change touches the same lines as the event, the
	  // event, and everything 'behind' it, is discarded. If the change is
	  // before the event, the event's positions are updated. Uses a
	  // copy-on-write scheme for the positions, to avoid having to
	  // reallocate them all on every rebase, but also avoid problems with
	  // shared position objects being unsafely updated.
	  function rebaseHistArray(array, from, to, diff) {
	    for (var i = 0; i < array.length; ++i) {
	      var sub = array[i], ok = true;
	      if (sub.ranges) {
	        if (!sub.copied) { sub = array[i] = sub.deepCopy(); sub.copied = true; }
	        for (var j = 0; j < sub.ranges.length; j++) {
	          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
	          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
	        }
	        continue;
	      }
	      for (var j = 0; j < sub.changes.length; ++j) {
	        var cur = sub.changes[j];
	        if (to < cur.from.line) {
	          cur.from = Pos(cur.from.line + diff, cur.from.ch);
	          cur.to = Pos(cur.to.line + diff, cur.to.ch);
	        } else if (from <= cur.to.line) {
	          ok = false;
	          break;
	        }
	      }
	      if (!ok) {
	        array.splice(0, i + 1);
	        i = 0;
	      }
	    }
	  }
	
	  function rebaseHist(hist, change) {
	    var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
	    rebaseHistArray(hist.done, from, to, diff);
	    rebaseHistArray(hist.undone, from, to, diff);
	  }
	
	  // EVENT UTILITIES
	
	  // Due to the fact that we still support jurassic IE versions, some
	  // compatibility wrappers are needed.
	
	  var e_preventDefault = CodeMirror.e_preventDefault = function(e) {
	    if (e.preventDefault) e.preventDefault();
	    else e.returnValue = false;
	  };
	  var e_stopPropagation = CodeMirror.e_stopPropagation = function(e) {
	    if (e.stopPropagation) e.stopPropagation();
	    else e.cancelBubble = true;
	  };
	  function e_defaultPrevented(e) {
	    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
	  }
	  var e_stop = CodeMirror.e_stop = function(e) {e_preventDefault(e); e_stopPropagation(e);};
	
	  function e_target(e) {return e.target || e.srcElement;}
	  function e_button(e) {
	    var b = e.which;
	    if (b == null) {
	      if (e.button & 1) b = 1;
	      else if (e.button & 2) b = 3;
	      else if (e.button & 4) b = 2;
	    }
	    if (mac && e.ctrlKey && b == 1) b = 3;
	    return b;
	  }
	
	  // EVENT HANDLING
	
	  // Lightweight event framework. on/off also work on DOM nodes,
	  // registering native DOM handlers.
	
	  var on = CodeMirror.on = function(emitter, type, f) {
	    if (emitter.addEventListener)
	      emitter.addEventListener(type, f, false);
	    else if (emitter.attachEvent)
	      emitter.attachEvent("on" + type, f);
	    else {
	      var map = emitter._handlers || (emitter._handlers = {});
	      var arr = map[type] || (map[type] = []);
	      arr.push(f);
	    }
	  };
	
	  var off = CodeMirror.off = function(emitter, type, f) {
	    if (emitter.removeEventListener)
	      emitter.removeEventListener(type, f, false);
	    else if (emitter.detachEvent)
	      emitter.detachEvent("on" + type, f);
	    else {
	      var arr = emitter._handlers && emitter._handlers[type];
	      if (!arr) return;
	      for (var i = 0; i < arr.length; ++i)
	        if (arr[i] == f) { arr.splice(i, 1); break; }
	    }
	  };
	
	  var signal = CodeMirror.signal = function(emitter, type /*, values...*/) {
	    var arr = emitter._handlers && emitter._handlers[type];
	    if (!arr) return;
	    var args = Array.prototype.slice.call(arguments, 2);
	    for (var i = 0; i < arr.length; ++i) arr[i].apply(null, args);
	  };
	
	  // Often, we want to signal events at a point where we are in the
	  // middle of some work, but don't want the handler to start calling
	  // other methods on the editor, which might be in an inconsistent
	  // state or simply not expect any other events to happen.
	  // signalLater looks whether there are any handlers, and schedules
	  // them to be executed when the last operation ends, or, if no
	  // operation is active, when a timeout fires.
	  var delayedCallbacks, delayedCallbackDepth = 0;
	  function signalLater(emitter, type /*, values...*/) {
	    var arr = emitter._handlers && emitter._handlers[type];
	    if (!arr) return;
	    var args = Array.prototype.slice.call(arguments, 2);
	    if (!delayedCallbacks) {
	      ++delayedCallbackDepth;
	      delayedCallbacks = [];
	      setTimeout(fireDelayed, 0);
	    }
	    function bnd(f) {return function(){f.apply(null, args);};};
	    for (var i = 0; i < arr.length; ++i)
	      delayedCallbacks.push(bnd(arr[i]));
	  }
	
	  function fireDelayed() {
	    --delayedCallbackDepth;
	    var delayed = delayedCallbacks;
	    delayedCallbacks = null;
	    for (var i = 0; i < delayed.length; ++i) delayed[i]();
	  }
	
	  // The DOM events that CodeMirror handles can be overridden by
	  // registering a (non-DOM) handler on the editor for the event name,
	  // and preventDefault-ing the event in that handler.
	  function signalDOMEvent(cm, e, override) {
	    signal(cm, override || e.type, cm, e);
	    return e_defaultPrevented(e) || e.codemirrorIgnore;
	  }
	
	  function signalCursorActivity(cm) {
	    var arr = cm._handlers && cm._handlers.cursorActivity;
	    if (!arr) return;
	    var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
	    for (var i = 0; i < arr.length; ++i) if (indexOf(set, arr[i]) == -1)
	      set.push(arr[i]);
	  }
	
	  function hasHandler(emitter, type) {
	    var arr = emitter._handlers && emitter._handlers[type];
	    return arr && arr.length > 0;
	  }
	
	  // Add on and off methods to a constructor's prototype, to make
	  // registering events on such objects more convenient.
	  function eventMixin(ctor) {
	    ctor.prototype.on = function(type, f) {on(this, type, f);};
	    ctor.prototype.off = function(type, f) {off(this, type, f);};
	  }
	
	  // MISC UTILITIES
	
	  // Number of pixels added to scroller and sizer to hide scrollbar
	  var scrollerCutOff = 30;
	
	  // Returned or thrown by various protocols to signal 'I'm not
	  // handling this'.
	  var Pass = CodeMirror.Pass = {toString: function(){return "CodeMirror.Pass";}};
	
	  // Reused option objects for setSelection & friends
	  var sel_dontScroll = {scroll: false}, sel_mouse = {origin: "*mouse"}, sel_move = {origin: "+move"};
	
	  function Delayed() {this.id = null;}
	  Delayed.prototype.set = function(ms, f) {
	    clearTimeout(this.id);
	    this.id = setTimeout(f, ms);
	  };
	
	  // Counts the column offset in a string, taking tabs into account.
	  // Used mostly to find indentation.
	  var countColumn = CodeMirror.countColumn = function(string, end, tabSize, startIndex, startValue) {
	    if (end == null) {
	      end = string.search(/[^\s\u00a0]/);
	      if (end == -1) end = string.length;
	    }
	    for (var i = startIndex || 0, n = startValue || 0;;) {
	      var nextTab = string.indexOf("\t", i);
	      if (nextTab < 0 || nextTab >= end)
	        return n + (end - i);
	      n += nextTab - i;
	      n += tabSize - (n % tabSize);
	      i = nextTab + 1;
	    }
	  };
	
	  // The inverse of countColumn -- find the offset that corresponds to
	  // a particular column.
	  function findColumn(string, goal, tabSize) {
	    for (var pos = 0, col = 0;;) {
	      var nextTab = string.indexOf("\t", pos);
	      if (nextTab == -1) nextTab = string.length;
	      var skipped = nextTab - pos;
	      if (nextTab == string.length || col + skipped >= goal)
	        return pos + Math.min(skipped, goal - col);
	      col += nextTab - pos;
	      col += tabSize - (col % tabSize);
	      pos = nextTab + 1;
	      if (col >= goal) return pos;
	    }
	  }
	
	  var spaceStrs = [""];
	  function spaceStr(n) {
	    while (spaceStrs.length <= n)
	      spaceStrs.push(lst(spaceStrs) + " ");
	    return spaceStrs[n];
	  }
	
	  function lst(arr) { return arr[arr.length-1]; }
	
	  var selectInput = function(node) { node.select(); };
	  if (ios) // Mobile Safari apparently has a bug where select() is broken.
	    selectInput = function(node) { node.selectionStart = 0; node.selectionEnd = node.value.length; };
	  else if (ie) // Suppress mysterious IE10 errors
	    selectInput = function(node) { try { node.select(); } catch(_e) {} };
	
	  function indexOf(array, elt) {
	    for (var i = 0; i < array.length; ++i)
	      if (array[i] == elt) return i;
	    return -1;
	  }
	  if ([].indexOf) indexOf = function(array, elt) { return array.indexOf(elt); };
	  function map(array, f) {
	    var out = [];
	    for (var i = 0; i < array.length; i++) out[i] = f(array[i], i);
	    return out;
	  }
	  if ([].map) map = function(array, f) { return array.map(f); };
	
	  function createObj(base, props) {
	    var inst;
	    if (Object.create) {
	      inst = Object.create(base);
	    } else {
	      var ctor = function() {};
	      ctor.prototype = base;
	      inst = new ctor();
	    }
	    if (props) copyObj(props, inst);
	    return inst;
	  };
	
	  function copyObj(obj, target, overwrite) {
	    if (!target) target = {};
	    for (var prop in obj)
	      if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
	        target[prop] = obj[prop];
	    return target;
	  }
	
	  function bind(f) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return function(){return f.apply(null, args);};
	  }
	
	  var nonASCIISingleCaseWordChar = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
	  var isWordCharBasic = CodeMirror.isWordChar = function(ch) {
	    return /\w/.test(ch) || ch > "\x80" &&
	      (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
	  };
	  function isWordChar(ch, helper) {
	    if (!helper) return isWordCharBasic(ch);
	    if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) return true;
	    return helper.test(ch);
	  }
	
	  function isEmpty(obj) {
	    for (var n in obj) if (obj.hasOwnProperty(n) && obj[n]) return false;
	    return true;
	  }
	
	  // Extending unicode characters. A series of a non-extending char +
	  // any number of extending chars is treated as a single unit as far
	  // as editing and measuring is concerned. This is not fully correct,
	  // since some scripts/fonts/browsers also treat other configurations
	  // of code points as a group.
	  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
	  function isExtendingChar(ch) { return ch.charCodeAt(0) >= 768 && extendingChars.test(ch); }
	
	  // DOM UTILITIES
	
	  function elt(tag, content, className, style) {
	    var e = document.createElement(tag);
	    if (className) e.className = className;
	    if (style) e.style.cssText = style;
	    if (typeof content == "string") e.appendChild(document.createTextNode(content));
	    else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
	    return e;
	  }
	
	  var range;
	  if (document.createRange) range = function(node, start, end) {
	    var r = document.createRange();
	    r.setEnd(node, end);
	    r.setStart(node, start);
	    return r;
	  };
	  else range = function(node, start, end) {
	    var r = document.body.createTextRange();
	    r.moveToElementText(node.parentNode);
	    r.collapse(true);
	    r.moveEnd("character", end);
	    r.moveStart("character", start);
	    return r;
	  };
	
	  function removeChildren(e) {
	    for (var count = e.childNodes.length; count > 0; --count)
	      e.removeChild(e.firstChild);
	    return e;
	  }
	
	  function removeChildrenAndAdd(parent, e) {
	    return removeChildren(parent).appendChild(e);
	  }
	
	  function contains(parent, child) {
	    if (parent.contains)
	      return parent.contains(child);
	    while (child = child.parentNode)
	      if (child == parent) return true;
	  }
	
	  function activeElt() { return document.activeElement; }
	  // Older versions of IE throws unspecified error when touching
	  // document.activeElement in some cases (during loading, in iframe)
	  if (ie_upto10) activeElt = function() {
	    try { return document.activeElement; }
	    catch(e) { return document.body; }
	  };
	
	  function classTest(cls) { return new RegExp("\\b" + cls + "\\b\\s*"); }
	  function rmClass(node, cls) {
	    var test = classTest(cls);
	    if (test.test(node.className)) node.className = node.className.replace(test, "");
	  }
	  function addClass(node, cls) {
	    if (!classTest(cls).test(node.className)) node.className += " " + cls;
	  }
	  function joinClasses(a, b) {
	    var as = a.split(" ");
	    for (var i = 0; i < as.length; i++)
	      if (as[i] && !classTest(as[i]).test(b)) b += " " + as[i];
	    return b;
	  }
	
	  // WINDOW-WIDE EVENTS
	
	  // These must be handled carefully, because naively registering a
	  // handler for each editor will cause the editors to never be
	  // garbage collected.
	
	  function forEachCodeMirror(f) {
	    if (!document.body.getElementsByClassName) return;
	    var byClass = document.body.getElementsByClassName("CodeMirror");
	    for (var i = 0; i < byClass.length; i++) {
	      var cm = byClass[i].CodeMirror;
	      if (cm) f(cm);
	    }
	  }
	
	  var globalsRegistered = false;
	  function ensureGlobalHandlers() {
	    if (globalsRegistered) return;
	    registerGlobalHandlers();
	    globalsRegistered = true;
	  }
	  function registerGlobalHandlers() {
	    // When the window resizes, we need to refresh active editors.
	    var resizeTimer;
	    on(window, "resize", function() {
	      if (resizeTimer == null) resizeTimer = setTimeout(function() {
	        resizeTimer = null;
	        knownScrollbarWidth = null;
	        forEachCodeMirror(onResize);
	      }, 100);
	    });
	    // When the window loses focus, we want to show the editor as blurred
	    on(window, "blur", function() {
	      forEachCodeMirror(onBlur);
	    });
	  }
	
	  // FEATURE DETECTION
	
	  // Detect drag-and-drop
	  var dragAndDrop = function() {
	    // There is *some* kind of drag-and-drop support in IE6-8, but I
	    // couldn't get it to work yet.
	    if (ie_upto8) return false;
	    var div = elt('div');
	    return "draggable" in div || "dragDrop" in div;
	  }();
	
	  var knownScrollbarWidth;
	  function scrollbarWidth(measure) {
	    if (knownScrollbarWidth != null) return knownScrollbarWidth;
	    var test = elt("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
	    removeChildrenAndAdd(measure, test);
	    if (test.offsetWidth)
	      knownScrollbarWidth = test.offsetHeight - test.clientHeight;
	    return knownScrollbarWidth || 0;
	  }
	
	  var zwspSupported;
	  function zeroWidthElement(measure) {
	    if (zwspSupported == null) {
	      var test = elt("span", "\u200b");
	      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
	      if (measure.firstChild.offsetHeight != 0)
	        zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !ie_upto7;
	    }
	    if (zwspSupported) return elt("span", "\u200b");
	    else return elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
	  }
	
	  // Feature-detect IE's crummy client rect reporting for bidi text
	  var badBidiRects;
	  function hasBadBidiRects(measure) {
	    if (badBidiRects != null) return badBidiRects;
	    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
	    var r0 = range(txt, 0, 1).getBoundingClientRect();
	    if (r0.left == r0.right) return false;
	    var r1 = range(txt, 1, 2).getBoundingClientRect();
	    return badBidiRects = (r1.right - r0.right < 3);
	  }
	
	  // See if "".split is the broken IE version, if so, provide an
	  // alternative way to split lines.
	  var splitLines = CodeMirror.splitLines = "\n\nb".split(/\n/).length != 3 ? function(string) {
	    var pos = 0, result = [], l = string.length;
	    while (pos <= l) {
	      var nl = string.indexOf("\n", pos);
	      if (nl == -1) nl = string.length;
	      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
	      var rt = line.indexOf("\r");
	      if (rt != -1) {
	        result.push(line.slice(0, rt));
	        pos += rt + 1;
	      } else {
	        result.push(line);
	        pos = nl + 1;
	      }
	    }
	    return result;
	  } : function(string){return string.split(/\r\n?|\n/);};
	
	  var hasSelection = window.getSelection ? function(te) {
	    try { return te.selectionStart != te.selectionEnd; }
	    catch(e) { return false; }
	  } : function(te) {
	    try {var range = te.ownerDocument.selection.createRange();}
	    catch(e) {}
	    if (!range || range.parentElement() != te) return false;
	    return range.compareEndPoints("StartToEnd", range) != 0;
	  };
	
	  var hasCopyEvent = (function() {
	    var e = elt("div");
	    if ("oncopy" in e) return true;
	    e.setAttribute("oncopy", "return;");
	    return typeof e.oncopy == "function";
	  })();
	
	  // KEY NAMES
	
	  var keyNames = {3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
	                  19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
	                  36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
	                  46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod", 107: "=", 109: "-", 127: "Delete",
	                  173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
	                  221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
	                  63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"};
	  CodeMirror.keyNames = keyNames;
	  (function() {
	    // Number keys
	    for (var i = 0; i < 10; i++) keyNames[i + 48] = keyNames[i + 96] = String(i);
	    // Alphabetic keys
	    for (var i = 65; i <= 90; i++) keyNames[i] = String.fromCharCode(i);
	    // Function keys
	    for (var i = 1; i <= 12; i++) keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
	  })();
	
	  // BIDI HELPERS
	
	  function iterateBidiSections(order, from, to, f) {
	    if (!order) return f(from, to, "ltr");
	    var found = false;
	    for (var i = 0; i < order.length; ++i) {
	      var part = order[i];
	      if (part.from < to && part.to > from || from == to && part.to == from) {
	        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr");
	        found = true;
	      }
	    }
	    if (!found) f(from, to, "ltr");
	  }
	
	  function bidiLeft(part) { return part.level % 2 ? part.to : part.from; }
	  function bidiRight(part) { return part.level % 2 ? part.from : part.to; }
	
	  function lineLeft(line) { var order = getOrder(line); return order ? bidiLeft(order[0]) : 0; }
	  function lineRight(line) {
	    var order = getOrder(line);
	    if (!order) return line.text.length;
	    return bidiRight(lst(order));
	  }
	
	  function lineStart(cm, lineN) {
	    var line = getLine(cm.doc, lineN);
	    var visual = visualLine(line);
	    if (visual != line) lineN = lineNo(visual);
	    var order = getOrder(visual);
	    var ch = !order ? 0 : order[0].level % 2 ? lineRight(visual) : lineLeft(visual);
	    return Pos(lineN, ch);
	  }
	  function lineEnd(cm, lineN) {
	    var merged, line = getLine(cm.doc, lineN);
	    while (merged = collapsedSpanAtEnd(line)) {
	      line = merged.find(1, true).line;
	      lineN = null;
	    }
	    var order = getOrder(line);
	    var ch = !order ? line.text.length : order[0].level % 2 ? lineLeft(line) : lineRight(line);
	    return Pos(lineN == null ? lineNo(line) : lineN, ch);
	  }
	
	  function compareBidiLevel(order, a, b) {
	    var linedir = order[0].level;
	    if (a == linedir) return true;
	    if (b == linedir) return false;
	    return a < b;
	  }
	  var bidiOther;
	  function getBidiPartAt(order, pos) {
	    bidiOther = null;
	    for (var i = 0, found; i < order.length; ++i) {
	      var cur = order[i];
	      if (cur.from < pos && cur.to > pos) return i;
	      if ((cur.from == pos || cur.to == pos)) {
	        if (found == null) {
	          found = i;
	        } else if (compareBidiLevel(order, cur.level, order[found].level)) {
	          if (cur.from != cur.to) bidiOther = found;
	          return i;
	        } else {
	          if (cur.from != cur.to) bidiOther = i;
	          return found;
	        }
	      }
	    }
	    return found;
	  }
	
	  function moveInLine(line, pos, dir, byUnit) {
	    if (!byUnit) return pos + dir;
	    do pos += dir;
	    while (pos > 0 && isExtendingChar(line.text.charAt(pos)));
	    return pos;
	  }
	
	  // This is needed in order to move 'visually' through bi-directional
	  // text -- i.e., pressing left should make the cursor go left, even
	  // when in RTL text. The tricky part is the 'jumps', where RTL and
	  // LTR text touch each other. This often requires the cursor offset
	  // to move more than one unit, in order to visually move one unit.
	  function moveVisually(line, start, dir, byUnit) {
	    var bidi = getOrder(line);
	    if (!bidi) return moveLogically(line, start, dir, byUnit);
	    var pos = getBidiPartAt(bidi, start), part = bidi[pos];
	    var target = moveInLine(line, start, part.level % 2 ? -dir : dir, byUnit);
	
	    for (;;) {
	      if (target > part.from && target < part.to) return target;
	      if (target == part.from || target == part.to) {
	        if (getBidiPartAt(bidi, target) == pos) return target;
	        part = bidi[pos += dir];
	        return (dir > 0) == part.level % 2 ? part.to : part.from;
	      } else {
	        part = bidi[pos += dir];
	        if (!part) return null;
	        if ((dir > 0) == part.level % 2)
	          target = moveInLine(line, part.to, -1, byUnit);
	        else
	          target = moveInLine(line, part.from, 1, byUnit);
	      }
	    }
	  }
	
	  function moveLogically(line, start, dir, byUnit) {
	    var target = start + dir;
	    if (byUnit) while (target > 0 && isExtendingChar(line.text.charAt(target))) target += dir;
	    return target < 0 || target > line.text.length ? null : target;
	  }
	
	  // Bidirectional ordering algorithm
	  // See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
	  // that this (partially) implements.
	
	  // One-char codes used for character types:
	  // L (L):   Left-to-Right
	  // R (R):   Right-to-Left
	  // r (AL):  Right-to-Left Arabic
	  // 1 (EN):  European Number
	  // + (ES):  European Number Separator
	  // % (ET):  European Number Terminator
	  // n (AN):  Arabic Number
	  // , (CS):  Common Number Separator
	  // m (NSM): Non-Spacing Mark
	  // b (BN):  Boundary Neutral
	  // s (B):   Paragraph Separator
	  // t (S):   Segment Separator
	  // w (WS):  Whitespace
	  // N (ON):  Other Neutrals
	
	  // Returns null if characters are ordered as they appear
	  // (left-to-right), or an array of sections ({from, to, level}
	  // objects) in the order in which they occur visually.
	  var bidiOrdering = (function() {
	    // Character types for codepoints 0 to 0xff
	    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
	    // Character types for codepoints 0x600 to 0x6ff
	    var arabicTypes = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
	    function charType(code) {
	      if (code <= 0xf7) return lowTypes.charAt(code);
	      else if (0x590 <= code && code <= 0x5f4) return "R";
	      else if (0x600 <= code && code <= 0x6ed) return arabicTypes.charAt(code - 0x600);
	      else if (0x6ee <= code && code <= 0x8ac) return "r";
	      else if (0x2000 <= code && code <= 0x200b) return "w";
	      else if (code == 0x200c) return "b";
	      else return "L";
	    }
	
	    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
	    var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
	    // Browsers seem to always treat the boundaries of block elements as being L.
	    var outerType = "L";
	
	    function BidiSpan(level, from, to) {
	      this.level = level;
	      this.from = from; this.to = to;
	    }
	
	    return function(str) {
	      if (!bidiRE.test(str)) return false;
	      var len = str.length, types = [];
	      for (var i = 0, type; i < len; ++i)
	        types.push(type = charType(str.charCodeAt(i)));
	
	      // W1. Examine each non-spacing mark (NSM) in the level run, and
	      // change the type of the NSM to the type of the previous
	      // character. If the NSM is at the start of the level run, it will
	      // get the type of sor.
	      for (var i = 0, prev = outerType; i < len; ++i) {
	        var type = types[i];
	        if (type == "m") types[i] = prev;
	        else prev = type;
	      }
	
	      // W2. Search backwards from each instance of a European number
	      // until the first strong type (R, L, AL, or sor) is found. If an
	      // AL is found, change the type of the European number to Arabic
	      // number.
	      // W3. Change all ALs to R.
	      for (var i = 0, cur = outerType; i < len; ++i) {
	        var type = types[i];
	        if (type == "1" && cur == "r") types[i] = "n";
	        else if (isStrong.test(type)) { cur = type; if (type == "r") types[i] = "R"; }
	      }
	
	      // W4. A single European separator between two European numbers
	      // changes to a European number. A single common separator between
	      // two numbers of the same type changes to that type.
	      for (var i = 1, prev = types[0]; i < len - 1; ++i) {
	        var type = types[i];
	        if (type == "+" && prev == "1" && types[i+1] == "1") types[i] = "1";
	        else if (type == "," && prev == types[i+1] &&
	                 (prev == "1" || prev == "n")) types[i] = prev;
	        prev = type;
	      }
	
	      // W5. A sequence of European terminators adjacent to European
	      // numbers changes to all European numbers.
	      // W6. Otherwise, separators and terminators change to Other
	      // Neutral.
	      for (var i = 0; i < len; ++i) {
	        var type = types[i];
	        if (type == ",") types[i] = "N";
	        else if (type == "%") {
	          for (var end = i + 1; end < len && types[end] == "%"; ++end) {}
	          var replace = (i && types[i-1] == "!") || (end < len && types[end] == "1") ? "1" : "N";
	          for (var j = i; j < end; ++j) types[j] = replace;
	          i = end - 1;
	        }
	      }
	
	      // W7. Search backwards from each instance of a European number
	      // until the first strong type (R, L, or sor) is found. If an L is
	      // found, then change the type of the European number to L.
	      for (var i = 0, cur = outerType; i < len; ++i) {
	        var type = types[i];
	        if (cur == "L" && type == "1") types[i] = "L";
	        else if (isStrong.test(type)) cur = type;
	      }
	
	      // N1. A sequence of neutrals takes the direction of the
	      // surrounding strong text if the text on both sides has the same
	      // direction. European and Arabic numbers act as if they were R in
	      // terms of their influence on neutrals. Start-of-level-run (sor)
	      // and end-of-level-run (eor) are used at level run boundaries.
	      // N2. Any remaining neutrals take the embedding direction.
	      for (var i = 0; i < len; ++i) {
	        if (isNeutral.test(types[i])) {
	          for (var end = i + 1; end < len && isNeutral.test(types[end]); ++end) {}
	          var before = (i ? types[i-1] : outerType) == "L";
	          var after = (end < len ? types[end] : outerType) == "L";
	          var replace = before || after ? "L" : "R";
	          for (var j = i; j < end; ++j) types[j] = replace;
	          i = end - 1;
	        }
	      }
	
	      // Here we depart from the documented algorithm, in order to avoid
	      // building up an actual levels array. Since there are only three
	      // levels (0, 1, 2) in an implementation that doesn't take
	      // explicit embedding into account, we can build up the order on
	      // the fly, without following the level-based algorithm.
	      var order = [], m;
	      for (var i = 0; i < len;) {
	        if (countsAsLeft.test(types[i])) {
	          var start = i;
	          for (++i; i < len && countsAsLeft.test(types[i]); ++i) {}
	          order.push(new BidiSpan(0, start, i));
	        } else {
	          var pos = i, at = order.length;
	          for (++i; i < len && types[i] != "L"; ++i) {}
	          for (var j = pos; j < i;) {
	            if (countsAsNum.test(types[j])) {
	              if (pos < j) order.splice(at, 0, new BidiSpan(1, pos, j));
	              var nstart = j;
	              for (++j; j < i && countsAsNum.test(types[j]); ++j) {}
	              order.splice(at, 0, new BidiSpan(2, nstart, j));
	              pos = j;
	            } else ++j;
	          }
	          if (pos < i) order.splice(at, 0, new BidiSpan(1, pos, i));
	        }
	      }
	      if (order[0].level == 1 && (m = str.match(/^\s+/))) {
	        order[0].from = m[0].length;
	        order.unshift(new BidiSpan(0, 0, m[0].length));
	      }
	      if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
	        lst(order).to -= m[0].length;
	        order.push(new BidiSpan(0, len - m[0].length, len));
	      }
	      if (order[0].level != lst(order).level)
	        order.push(new BidiSpan(order[0].level, len, len));
	
	      return order;
	    };
	  })();
	
	  // THE END
	
	  CodeMirror.version = "4.2.0";
	
	  return CodeMirror;
	});


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	// TODO actually recognize syntax of TypeScript constructs
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(91));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";
	
	CodeMirror.defineMode("javascript", function(config, parserConfig) {
	  var indentUnit = config.indentUnit;
	  var statementIndent = parserConfig.statementIndent;
	  var jsonldMode = parserConfig.jsonld;
	  var jsonMode = parserConfig.json || jsonldMode;
	  var isTS = parserConfig.typescript;
	
	  // Tokenizer
	
	  var keywords = function(){
	    function kw(type) {return {type: type, style: "keyword"};}
	    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c");
	    var operator = kw("operator"), atom = {type: "atom", style: "atom"};
	
	    var jsKeywords = {
	      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
	      "return": C, "break": C, "continue": C, "new": C, "delete": C, "throw": C, "debugger": C,
	      "var": kw("var"), "const": kw("var"), "let": kw("var"),
	      "function": kw("function"), "catch": kw("catch"),
	      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
	      "in": operator, "typeof": operator, "instanceof": operator,
	      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
	      "this": kw("this"), "module": kw("module"), "class": kw("class"), "super": kw("atom"),
	      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C
	    };
	
	    // Extend the 'normal' keywords with the TypeScript language extensions
	    if (isTS) {
	      var type = {type: "variable", style: "variable-3"};
	      var tsKeywords = {
	        // object-like things
	        "interface": kw("interface"),
	        "extends": kw("extends"),
	        "constructor": kw("constructor"),
	
	        // scope modifiers
	        "public": kw("public"),
	        "private": kw("private"),
	        "protected": kw("protected"),
	        "static": kw("static"),
	
	        // types
	        "string": type, "number": type, "bool": type, "any": type
	      };
	
	      for (var attr in tsKeywords) {
	        jsKeywords[attr] = tsKeywords[attr];
	      }
	    }
	
	    return jsKeywords;
	  }();
	
	  var isOperatorChar = /[+\-*&%=<>!?|~^]/;
	  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
	
	  function readRegexp(stream) {
	    var escaped = false, next, inSet = false;
	    while ((next = stream.next()) != null) {
	      if (!escaped) {
	        if (next == "/" && !inSet) return;
	        if (next == "[") inSet = true;
	        else if (inSet && next == "]") inSet = false;
	      }
	      escaped = !escaped && next == "\\";
	    }
	  }
	
	  // Used as scratch variables to communicate multiple values without
	  // consing up tons of objects.
	  var type, content;
	  function ret(tp, style, cont) {
	    type = tp; content = cont;
	    return style;
	  }
	  function tokenBase(stream, state) {
	    var ch = stream.next();
	    if (ch == '"' || ch == "'") {
	      state.tokenize = tokenString(ch);
	      return state.tokenize(stream, state);
	    } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
	      return ret("number", "number");
	    } else if (ch == "." && stream.match("..")) {
	      return ret("spread", "meta");
	    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
	      return ret(ch);
	    } else if (ch == "=" && stream.eat(">")) {
	      return ret("=>", "operator");
	    } else if (ch == "0" && stream.eat(/x/i)) {
	      stream.eatWhile(/[\da-f]/i);
	      return ret("number", "number");
	    } else if (/\d/.test(ch)) {
	      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
	      return ret("number", "number");
	    } else if (ch == "/") {
	      if (stream.eat("*")) {
	        state.tokenize = tokenComment;
	        return tokenComment(stream, state);
	      } else if (stream.eat("/")) {
	        stream.skipToEnd();
	        return ret("comment", "comment");
	      } else if (state.lastType == "operator" || state.lastType == "keyword c" ||
	               state.lastType == "sof" || /^[\[{}\(,;:]$/.test(state.lastType)) {
	        readRegexp(stream);
	        stream.eatWhile(/[gimy]/); // 'y' is "sticky" option in Mozilla
	        return ret("regexp", "string-2");
	      } else {
	        stream.eatWhile(isOperatorChar);
	        return ret("operator", "operator", stream.current());
	      }
	    } else if (ch == "`") {
	      state.tokenize = tokenQuasi;
	      return tokenQuasi(stream, state);
	    } else if (ch == "#") {
	      stream.skipToEnd();
	      return ret("error", "error");
	    } else if (isOperatorChar.test(ch)) {
	      stream.eatWhile(isOperatorChar);
	      return ret("operator", "operator", stream.current());
	    } else {
	      stream.eatWhile(/[\w\$_]/);
	      var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
	      return (known && state.lastType != ".") ? ret(known.type, known.style, word) :
	                     ret("variable", "variable", word);
	    }
	  }
	
	  function tokenString(quote) {
	    return function(stream, state) {
	      var escaped = false, next;
	      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
	        state.tokenize = tokenBase;
	        return ret("jsonld-keyword", "meta");
	      }
	      while ((next = stream.next()) != null) {
	        if (next == quote && !escaped) break;
	        escaped = !escaped && next == "\\";
	      }
	      if (!escaped) state.tokenize = tokenBase;
	      return ret("string", "string");
	    };
	  }
	
	  function tokenComment(stream, state) {
	    var maybeEnd = false, ch;
	    while (ch = stream.next()) {
	      if (ch == "/" && maybeEnd) {
	        state.tokenize = tokenBase;
	        break;
	      }
	      maybeEnd = (ch == "*");
	    }
	    return ret("comment", "comment");
	  }
	
	  function tokenQuasi(stream, state) {
	    var escaped = false, next;
	    while ((next = stream.next()) != null) {
	      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
	        state.tokenize = tokenBase;
	        break;
	      }
	      escaped = !escaped && next == "\\";
	    }
	    return ret("quasi", "string-2", stream.current());
	  }
	
	  var brackets = "([{}])";
	  // This is a crude lookahead trick to try and notice that we're
	  // parsing the argument patterns for a fat-arrow function before we
	  // actually hit the arrow token. It only works if the arrow is on
	  // the same line as the arguments and there's no strange noise
	  // (comments) in between. Fallback is to only notice when we hit the
	  // arrow, and not declare the arguments as locals for the arrow
	  // body.
	  function findFatArrow(stream, state) {
	    if (state.fatArrowAt) state.fatArrowAt = null;
	    var arrow = stream.string.indexOf("=>", stream.start);
	    if (arrow < 0) return;
	
	    var depth = 0, sawSomething = false;
	    for (var pos = arrow - 1; pos >= 0; --pos) {
	      var ch = stream.string.charAt(pos);
	      var bracket = brackets.indexOf(ch);
	      if (bracket >= 0 && bracket < 3) {
	        if (!depth) { ++pos; break; }
	        if (--depth == 0) break;
	      } else if (bracket >= 3 && bracket < 6) {
	        ++depth;
	      } else if (/[$\w]/.test(ch)) {
	        sawSomething = true;
	      } else if (sawSomething && !depth) {
	        ++pos;
	        break;
	      }
	    }
	    if (sawSomething && !depth) state.fatArrowAt = pos;
	  }
	
	  // Parser
	
	  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};
	
	  function JSLexical(indented, column, type, align, prev, info) {
	    this.indented = indented;
	    this.column = column;
	    this.type = type;
	    this.prev = prev;
	    this.info = info;
	    if (align != null) this.align = align;
	  }
	
	  function inScope(state, varname) {
	    for (var v = state.localVars; v; v = v.next)
	      if (v.name == varname) return true;
	    for (var cx = state.context; cx; cx = cx.prev) {
	      for (var v = cx.vars; v; v = v.next)
	        if (v.name == varname) return true;
	    }
	  }
	
	  function parseJS(state, style, type, content, stream) {
	    var cc = state.cc;
	    // Communicate our context to the combinators.
	    // (Less wasteful than consing up a hundred closures on every call.)
	    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc;
	
	    if (!state.lexical.hasOwnProperty("align"))
	      state.lexical.align = true;
	
	    while(true) {
	      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
	      if (combinator(type, content)) {
	        while(cc.length && cc[cc.length - 1].lex)
	          cc.pop()();
	        if (cx.marked) return cx.marked;
	        if (type == "variable" && inScope(state, content)) return "variable-2";
	        return style;
	      }
	    }
	  }
	
	  // Combinator utils
	
	  var cx = {state: null, column: null, marked: null, cc: null};
	  function pass() {
	    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
	  }
	  function cont() {
	    pass.apply(null, arguments);
	    return true;
	  }
	  function register(varname) {
	    function inList(list) {
	      for (var v = list; v; v = v.next)
	        if (v.name == varname) return true;
	      return false;
	    }
	    var state = cx.state;
	    if (state.context) {
	      cx.marked = "def";
	      if (inList(state.localVars)) return;
	      state.localVars = {name: varname, next: state.localVars};
	    } else {
	      if (inList(state.globalVars)) return;
	      if (parserConfig.globalVars)
	        state.globalVars = {name: varname, next: state.globalVars};
	    }
	  }
	
	  // Combinators
	
	  var defaultVars = {name: "this", next: {name: "arguments"}};
	  function pushcontext() {
	    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
	    cx.state.localVars = defaultVars;
	  }
	  function popcontext() {
	    cx.state.localVars = cx.state.context.vars;
	    cx.state.context = cx.state.context.prev;
	  }
	  function pushlex(type, info) {
	    var result = function() {
	      var state = cx.state, indent = state.indented;
	      if (state.lexical.type == "stat") indent = state.lexical.indented;
	      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
	    };
	    result.lex = true;
	    return result;
	  }
	  function poplex() {
	    var state = cx.state;
	    if (state.lexical.prev) {
	      if (state.lexical.type == ")")
	        state.indented = state.lexical.indented;
	      state.lexical = state.lexical.prev;
	    }
	  }
	  poplex.lex = true;
	
	  function expect(wanted) {
	    function exp(type) {
	      if (type == wanted) return cont();
	      else if (wanted == ";") return pass();
	      else return cont(exp);
	    };
	    return exp;
	  }
	
	  function statement(type, value) {
	    if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
	    if (type == "keyword a") return cont(pushlex("form"), expression, statement, poplex);
	    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
	    if (type == "{") return cont(pushlex("}"), block, poplex);
	    if (type == ";") return cont();
	    if (type == "if") {
	      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
	        cx.state.cc.pop()();
	      return cont(pushlex("form"), expression, statement, poplex, maybeelse);
	    }
	    if (type == "function") return cont(functiondef);
	    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
	    if (type == "variable") return cont(pushlex("stat"), maybelabel);
	    if (type == "switch") return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"),
	                                      block, poplex, poplex);
	    if (type == "case") return cont(expression, expect(":"));
	    if (type == "default") return cont(expect(":"));
	    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
	                                     statement, poplex, popcontext);
	    if (type == "module") return cont(pushlex("form"), pushcontext, afterModule, popcontext, poplex);
	    if (type == "class") return cont(pushlex("form"), className, objlit, poplex);
	    if (type == "export") return cont(pushlex("form"), afterExport, poplex);
	    if (type == "import") return cont(pushlex("form"), afterImport, poplex);
	    return pass(pushlex("stat"), expression, expect(";"), poplex);
	  }
	  function expression(type) {
	    return expressionInner(type, false);
	  }
	  function expressionNoComma(type) {
	    return expressionInner(type, true);
	  }
	  function expressionInner(type, noComma) {
	    if (cx.state.fatArrowAt == cx.stream.start) {
	      var body = noComma ? arrowBodyNoComma : arrowBody;
	      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext);
	      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
	    }
	
	    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
	    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
	    if (type == "function") return cont(functiondef, maybeop);
	    if (type == "keyword c") return cont(noComma ? maybeexpressionNoComma : maybeexpression);
	    if (type == "(") return cont(pushlex(")"), maybeexpression, comprehension, expect(")"), poplex, maybeop);
	    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
	    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
	    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
	    if (type == "quasi") { return pass(quasi, maybeop); }
	    return cont();
	  }
	  function maybeexpression(type) {
	    if (type.match(/[;\}\)\],]/)) return pass();
	    return pass(expression);
	  }
	  function maybeexpressionNoComma(type) {
	    if (type.match(/[;\}\)\],]/)) return pass();
	    return pass(expressionNoComma);
	  }
	
	  function maybeoperatorComma(type, value) {
	    if (type == ",") return cont(expression);
	    return maybeoperatorNoComma(type, value, false);
	  }
	  function maybeoperatorNoComma(type, value, noComma) {
	    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
	    var expr = noComma == false ? expression : expressionNoComma;
	    if (value == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
	    if (type == "operator") {
	      if (/\+\+|--/.test(value)) return cont(me);
	      if (value == "?") return cont(expression, expect(":"), expr);
	      return cont(expr);
	    }
	    if (type == "quasi") { return pass(quasi, me); }
	    if (type == ";") return;
	    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
	    if (type == ".") return cont(property, me);
	    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
	  }
	  function quasi(type, value) {
	    if (type != "quasi") return pass();
	    if (value.slice(value.length - 2) != "${") return cont(quasi);
	    return cont(expression, continueQuasi);
	  }
	  function continueQuasi(type) {
	    if (type == "}") {
	      cx.marked = "string-2";
	      cx.state.tokenize = tokenQuasi;
	      return cont(quasi);
	    }
	  }
	  function arrowBody(type) {
	    findFatArrow(cx.stream, cx.state);
	    if (type == "{") return pass(statement);
	    return pass(expression);
	  }
	  function arrowBodyNoComma(type) {
	    findFatArrow(cx.stream, cx.state);
	    if (type == "{") return pass(statement);
	    return pass(expressionNoComma);
	  }
	  function maybelabel(type) {
	    if (type == ":") return cont(poplex, statement);
	    return pass(maybeoperatorComma, expect(";"), poplex);
	  }
	  function property(type) {
	    if (type == "variable") {cx.marked = "property"; return cont();}
	  }
	  function objprop(type, value) {
	    if (type == "variable") {
	      cx.marked = "property";
	      if (value == "get" || value == "set") return cont(getterSetter);
	    } else if (type == "number" || type == "string") {
	      cx.marked = jsonldMode ? "property" : (type + " property");
	    } else if (type == "[") {
	      return cont(expression, expect("]"), afterprop);
	    }
	    if (atomicTypes.hasOwnProperty(type)) return cont(afterprop);
	  }
	  function getterSetter(type) {
	    if (type != "variable") return pass(afterprop);
	    cx.marked = "property";
	    return cont(functiondef);
	  }
	  function afterprop(type) {
	    if (type == ":") return cont(expressionNoComma);
	    if (type == "(") return pass(functiondef);
	  }
	  function commasep(what, end) {
	    function proceed(type) {
	      if (type == ",") {
	        var lex = cx.state.lexical;
	        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
	        return cont(what, proceed);
	      }
	      if (type == end) return cont();
	      return cont(expect(end));
	    }
	    return function(type) {
	      if (type == end) return cont();
	      return pass(what, proceed);
	    };
	  }
	  function contCommasep(what, end, info) {
	    for (var i = 3; i < arguments.length; i++)
	      cx.cc.push(arguments[i]);
	    return cont(pushlex(end, info), commasep(what, end), poplex);
	  }
	  function block(type) {
	    if (type == "}") return cont();
	    return pass(statement, block);
	  }
	  function maybetype(type) {
	    if (isTS && type == ":") return cont(typedef);
	  }
	  function typedef(type) {
	    if (type == "variable"){cx.marked = "variable-3"; return cont();}
	  }
	  function vardef() {
	    return pass(pattern, maybetype, maybeAssign, vardefCont);
	  }
	  function pattern(type, value) {
	    if (type == "variable") { register(value); return cont(); }
	    if (type == "[") return contCommasep(pattern, "]");
	    if (type == "{") return contCommasep(proppattern, "}");
	  }
	  function proppattern(type, value) {
	    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
	      register(value);
	      return cont(maybeAssign);
	    }
	    if (type == "variable") cx.marked = "property";
	    return cont(expect(":"), pattern, maybeAssign);
	  }
	  function maybeAssign(_type, value) {
	    if (value == "=") return cont(expressionNoComma);
	  }
	  function vardefCont(type) {
	    if (type == ",") return cont(vardef);
	  }
	  function maybeelse(type, value) {
	    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
	  }
	  function forspec(type) {
	    if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
	  }
	  function forspec1(type) {
	    if (type == "var") return cont(vardef, expect(";"), forspec2);
	    if (type == ";") return cont(forspec2);
	    if (type == "variable") return cont(formaybeinof);
	    return pass(expression, expect(";"), forspec2);
	  }
	  function formaybeinof(_type, value) {
	    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
	    return cont(maybeoperatorComma, forspec2);
	  }
	  function forspec2(type, value) {
	    if (type == ";") return cont(forspec3);
	    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
	    return pass(expression, expect(";"), forspec3);
	  }
	  function forspec3(type) {
	    if (type != ")") cont(expression);
	  }
	  function functiondef(type, value) {
	    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
	    if (type == "variable") {register(value); return cont(functiondef);}
	    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, statement, popcontext);
	  }
	  function funarg(type) {
	    if (type == "spread") return cont(funarg);
	    return pass(pattern, maybetype);
	  }
	  function className(type, value) {
	    if (type == "variable") {register(value); return cont(classNameAfter);}
	  }
	  function classNameAfter(_type, value) {
	    if (value == "extends") return cont(expression);
	  }
	  function objlit(type) {
	    if (type == "{") return contCommasep(objprop, "}");
	  }
	  function afterModule(type, value) {
	    if (type == "string") return cont(statement);
	    if (type == "variable") { register(value); return cont(maybeFrom); }
	  }
	  function afterExport(_type, value) {
	    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
	    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
	    return pass(statement);
	  }
	  function afterImport(type) {
	    if (type == "string") return cont();
	    return pass(importSpec, maybeFrom);
	  }
	  function importSpec(type, value) {
	    if (type == "{") return contCommasep(importSpec, "}");
	    if (type == "variable") register(value);
	    return cont();
	  }
	  function maybeFrom(_type, value) {
	    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
	  }
	  function arrayLiteral(type) {
	    if (type == "]") return cont();
	    return pass(expressionNoComma, maybeArrayComprehension);
	  }
	  function maybeArrayComprehension(type) {
	    if (type == "for") return pass(comprehension, expect("]"));
	    if (type == ",") return cont(commasep(expressionNoComma, "]"));
	    return pass(commasep(expressionNoComma, "]"));
	  }
	  function comprehension(type) {
	    if (type == "for") return cont(forspec, comprehension);
	    if (type == "if") return cont(expression, comprehension);
	  }
	
	  // Interface
	
	  return {
	    startState: function(basecolumn) {
	      var state = {
	        tokenize: tokenBase,
	        lastType: "sof",
	        cc: [],
	        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
	        localVars: parserConfig.localVars,
	        context: parserConfig.localVars && {vars: parserConfig.localVars},
	        indented: 0
	      };
	      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
	        state.globalVars = parserConfig.globalVars;
	      return state;
	    },
	
	    token: function(stream, state) {
	      if (stream.sol()) {
	        if (!state.lexical.hasOwnProperty("align"))
	          state.lexical.align = false;
	        state.indented = stream.indentation();
	        findFatArrow(stream, state);
	      }
	      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
	      var style = state.tokenize(stream, state);
	      if (type == "comment") return style;
	      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
	      return parseJS(state, style, type, content, stream);
	    },
	
	    indent: function(state, textAfter) {
	      if (state.tokenize == tokenComment) return CodeMirror.Pass;
	      if (state.tokenize != tokenBase) return 0;
	      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
	      // Kludge to prevent 'maybelse' from blocking lexical scope pops
	      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
	        var c = state.cc[i];
	        if (c == poplex) lexical = lexical.prev;
	        else if (c != maybeelse) break;
	      }
	      if (lexical.type == "stat" && firstChar == "}") lexical = lexical.prev;
	      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
	        lexical = lexical.prev;
	      var type = lexical.type, closing = firstChar == type;
	
	      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);
	      else if (type == "form" && firstChar == "{") return lexical.indented;
	      else if (type == "form") return lexical.indented + indentUnit;
	      else if (type == "stat")
	        return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? statementIndent || indentUnit : 0);
	      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
	        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
	      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
	      else return lexical.indented + (closing ? 0 : indentUnit);
	    },
	
	    electricChars: ":{}",
	    blockCommentStart: jsonMode ? null : "/*",
	    blockCommentEnd: jsonMode ? null : "*/",
	    lineComment: jsonMode ? null : "//",
	    fold: "brace",
	
	    helperType: jsonMode ? "json" : "javascript",
	    jsonldMode: jsonldMode,
	    jsonMode: jsonMode
	  };
	});
	
	CodeMirror.registerHelper("wordChars", "javascript", /[\\w$]/);
	
	CodeMirror.defineMIME("text/javascript", "javascript");
	CodeMirror.defineMIME("text/ecmascript", "javascript");
	CodeMirror.defineMIME("application/javascript", "javascript");
	CodeMirror.defineMIME("application/ecmascript", "javascript");
	CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
	CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
	CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
	CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
	CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });
	
	});


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(91));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	  var GUTTER_ID = "CodeMirror-lint-markers";
	  var SEVERITIES = /^(?:error|warning)$/;
	
	  function showTooltip(e, content) {
	    var tt = document.createElement("div");
	    tt.className = "CodeMirror-lint-tooltip";
	    tt.appendChild(content.cloneNode(true));
	    document.body.appendChild(tt);
	
	    function position(e) {
	      if (!tt.parentNode) return CodeMirror.off(document, "mousemove", position);
	      tt.style.top = Math.max(0, e.clientY - tt.offsetHeight - 5) + "px";
	      tt.style.left = (e.clientX + 5) + "px";
	    }
	    CodeMirror.on(document, "mousemove", position);
	    position(e);
	    if (tt.style.opacity != null) tt.style.opacity = 1;
	    return tt;
	  }
	  function rm(elt) {
	    if (elt.parentNode) elt.parentNode.removeChild(elt);
	  }
	  function hideTooltip(tt) {
	    if (!tt.parentNode) return;
	    if (tt.style.opacity == null) rm(tt);
	    tt.style.opacity = 0;
	    setTimeout(function() { rm(tt); }, 600);
	  }
	
	  function showTooltipFor(e, content, node) {
	    var tooltip = showTooltip(e, content);
	    function hide() {
	      CodeMirror.off(node, "mouseout", hide);
	      if (tooltip) { hideTooltip(tooltip); tooltip = null; }
	    }
	    var poll = setInterval(function() {
	      if (tooltip) for (var n = node;; n = n.parentNode) {
	        if (n == document.body) return;
	        if (!n) { hide(); break; }
	      }
	      if (!tooltip) return clearInterval(poll);
	    }, 400);
	    CodeMirror.on(node, "mouseout", hide);
	  }
	
	  function LintState(cm, options, hasGutter) {
	    this.marked = [];
	    this.options = options;
	    this.timeout = null;
	    this.hasGutter = hasGutter;
	    this.onMouseOver = function(e) { onMouseOver(cm, e); };
	  }
	
	  function parseOptions(cm, options) {
	    if (options instanceof Function) return {getAnnotations: options};
	    if (!options || options === true) options = {};
	    if (!options.getAnnotations) options.getAnnotations = cm.getHelper(CodeMirror.Pos(0, 0), "lint");
	    if (!options.getAnnotations) throw new Error("Required option 'getAnnotations' missing (lint addon)");
	    return options;
	  }
	
	  function clearMarks(cm) {
	    var state = cm.state.lint;
	    if (state.hasGutter) cm.clearGutter(GUTTER_ID);
	    for (var i = 0; i < state.marked.length; ++i)
	      state.marked[i].clear();
	    state.marked.length = 0;
	  }
	
	  function makeMarker(labels, severity, multiple, tooltips) {
	    var marker = document.createElement("div"), inner = marker;
	    marker.className = "CodeMirror-lint-marker-" + severity;
	    if (multiple) {
	      inner = marker.appendChild(document.createElement("div"));
	      inner.className = "CodeMirror-lint-marker-multiple";
	    }
	
	    if (tooltips != false) CodeMirror.on(inner, "mouseover", function(e) {
	      showTooltipFor(e, labels, inner);
	    });
	
	    return marker;
	  }
	
	  function getMaxSeverity(a, b) {
	    if (a == "error") return a;
	    else return b;
	  }
	
	  function groupByLine(annotations) {
	    var lines = [];
	    for (var i = 0; i < annotations.length; ++i) {
	      var ann = annotations[i], line = ann.from.line;
	      (lines[line] || (lines[line] = [])).push(ann);
	    }
	    return lines;
	  }
	
	  function annotationTooltip(ann) {
	    var severity = ann.severity;
	    if (!SEVERITIES.test(severity)) severity = "error";
	    var tip = document.createElement("div");
	    tip.className = "CodeMirror-lint-message-" + severity;
	    tip.appendChild(document.createTextNode(ann.message));
	    return tip;
	  }
	
	  function startLinting(cm) {
	    var state = cm.state.lint, options = state.options;
	    if (options.async)
	      options.getAnnotations(cm, updateLinting, options);
	    else
	      updateLinting(cm, options.getAnnotations(cm.getValue(), options.options));
	  }
	
	  function updateLinting(cm, annotationsNotSorted) {
	    clearMarks(cm);
	    var state = cm.state.lint, options = state.options;
	
	    var annotations = groupByLine(annotationsNotSorted);
	
	    for (var line = 0; line < annotations.length; ++line) {
	      var anns = annotations[line];
	      if (!anns) continue;
	
	      var maxSeverity = null;
	      var tipLabel = state.hasGutter && document.createDocumentFragment();
	
	      for (var i = 0; i < anns.length; ++i) {
	        var ann = anns[i];
	        var severity = ann.severity;
	        if (!SEVERITIES.test(severity)) severity = "error";
	        maxSeverity = getMaxSeverity(maxSeverity, severity);
	
	        if (options.formatAnnotation) ann = options.formatAnnotation(ann);
	        if (state.hasGutter) tipLabel.appendChild(annotationTooltip(ann));
	
	        if (ann.to) state.marked.push(cm.markText(ann.from, ann.to, {
	          className: "CodeMirror-lint-mark-" + severity,
	          __annotation: ann
	        }));
	      }
	
	      if (state.hasGutter)
	        cm.setGutterMarker(line, GUTTER_ID, makeMarker(tipLabel, maxSeverity, anns.length > 1,
	                                                       state.options.tooltips));
	    }
	    if (options.onUpdateLinting) options.onUpdateLinting(annotationsNotSorted, annotations, cm);
	  }
	
	  function onChange(cm) {
	    var state = cm.state.lint;
	    clearTimeout(state.timeout);
	    state.timeout = setTimeout(function(){startLinting(cm);}, state.options.delay || 500);
	  }
	
	  function popupSpanTooltip(ann, e) {
	    var target = e.target || e.srcElement;
	    showTooltipFor(e, annotationTooltip(ann), target);
	  }
	
	  // When the mouseover fires, the cursor might not actually be over
	  // the character itself yet. These pairs of x,y offsets are used to
	  // probe a few nearby points when no suitable marked range is found.
	  var nearby = [0, 0, 0, 5, 0, -5, 5, 0, -5, 0];
	
	  function onMouseOver(cm, e) {
	    if (!/\bCodeMirror-lint-mark-/.test((e.target || e.srcElement).className)) return;
	    for (var i = 0; i < nearby.length; i += 2) {
	      var spans = cm.findMarksAt(cm.coordsChar({left: e.clientX + nearby[i],
	                                                top: e.clientY + nearby[i + 1]}, "client"));
	      for (var j = 0; j < spans.length; ++j) {
	        var span = spans[j], ann = span.__annotation;
	        if (ann) return popupSpanTooltip(ann, e);
	      }
	    }
	  }
	
	  CodeMirror.defineOption("lint", false, function(cm, val, old) {
	    if (old && old != CodeMirror.Init) {
	      clearMarks(cm);
	      cm.off("change", onChange);
	      CodeMirror.off(cm.getWrapperElement(), "mouseover", cm.state.lint.onMouseOver);
	      delete cm.state.lint;
	    }
	
	    if (val) {
	      var gutters = cm.getOption("gutters"), hasLintGutter = false;
	      for (var i = 0; i < gutters.length; ++i) if (gutters[i] == GUTTER_ID) hasLintGutter = true;
	      var state = cm.state.lint = new LintState(cm, parseOptions(cm, val), hasLintGutter);
	      cm.on("change", onChange);
	      if (state.options.tooltips != false)
	        CodeMirror.on(cm.getWrapperElement(), "mouseover", state.onMouseOver);
	
	      startLinting(cm);
	    }
	  });
	});


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(91));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	  // declare global: JSHINT
	
	  var bogus = [ "Dangerous comment" ];
	
	  var warnings = [ [ "Expected '{'",
	                     "Statement body should be inside '{ }' braces." ] ];
	
	  var errors = [ "Missing semicolon", "Extra comma", "Missing property name",
	                 "Unmatched ", " and instead saw", " is not defined",
	                 "Unclosed string", "Stopping, unable to continue" ];
	
	  function validator(text, options) {
	    if (!window.JSHINT) return [];
	    JSHINT(text, options);
	    var errors = JSHINT.data().errors, result = [];
	    if (errors) parseErrors(errors, result);
	    return result;
	  }
	
	  CodeMirror.registerHelper("lint", "javascript", validator);
	
	  function cleanup(error) {
	    // All problems are warnings by default
	    fixWith(error, warnings, "warning", true);
	    fixWith(error, errors, "error");
	
	    return isBogus(error) ? null : error;
	  }
	
	  function fixWith(error, fixes, severity, force) {
	    var description, fix, find, replace, found;
	
	    description = error.description;
	
	    for ( var i = 0; i < fixes.length; i++) {
	      fix = fixes[i];
	      find = (typeof fix === "string" ? fix : fix[0]);
	      replace = (typeof fix === "string" ? null : fix[1]);
	      found = description.indexOf(find) !== -1;
	
	      if (force || found) {
	        error.severity = severity;
	      }
	      if (found && replace) {
	        error.description = replace;
	      }
	    }
	  }
	
	  function isBogus(error) {
	    var description = error.description;
	    for ( var i = 0; i < bogus.length; i++) {
	      if (description.indexOf(bogus[i]) !== -1) {
	        return true;
	      }
	    }
	    return false;
	  }
	
	  function parseErrors(errors, output) {
	    for ( var i = 0; i < errors.length; i++) {
	      var error = errors[i];
	      if (error) {
	        var linetabpositions, index;
	
	        linetabpositions = [];
	
	        // This next block is to fix a problem in jshint. Jshint
	        // replaces
	        // all tabs with spaces then performs some checks. The error
	        // positions (character/space) are then reported incorrectly,
	        // not taking the replacement step into account. Here we look
	        // at the evidence line and try to adjust the character position
	        // to the correct value.
	        if (error.evidence) {
	          // Tab positions are computed once per line and cached
	          var tabpositions = linetabpositions[error.line];
	          if (!tabpositions) {
	            var evidence = error.evidence;
	            tabpositions = [];
	            // ugggh phantomjs does not like this
	            // forEachChar(evidence, function(item, index) {
	            Array.prototype.forEach.call(evidence, function(item,
	                                                            index) {
	              if (item === '\t') {
	                // First col is 1 (not 0) to match error
	                // positions
	                tabpositions.push(index + 1);
	              }
	            });
	            linetabpositions[error.line] = tabpositions;
	          }
	          if (tabpositions.length > 0) {
	            var pos = error.character;
	            tabpositions.forEach(function(tabposition) {
	              if (pos > tabposition) pos -= 1;
	            });
	            error.character = pos;
	          }
	        }
	
	        var start = error.character - 1, end = start + 1;
	        if (error.evidence) {
	          index = error.evidence.substring(start).search(/.\b/);
	          if (index > -1) {
	            end += index;
	          }
	        }
	
	        // Convert to format expected by validation service
	        error.description = error.reason;// + "(jshint)";
	        error.start = error.character;
	        error.end = end;
	        error = cleanup(error);
	
	        if (error)
	          output.push({message: error.description,
	                       severity: error.severity,
	                       from: CodeMirror.Pos(error.line - 1, start),
	                       to: CodeMirror.Pos(error.line - 1, end)});
	      }
	    }
	  }
	});


/***/ },
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<span class=\"inner-field\"><span></span><%= name %></span>";

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<span class=\"inner-field\"><%= name %><span></span></span>";

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ul id=\"field-context-menu\" class=\"context-menu\">\n  <li><a href=\"#removeConnection\">Remove connection(s)</a></li>\n</ul>";

/***/ },
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

//# sourceMappingURL=ThreeNodes.NodeTypes.js.map