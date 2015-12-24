(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("_"), require("Backbone"), require("Raphael"), require("Blob"), require("FileSaver"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "_", "Backbone", "Raphael", "Blob", "FileSaver"], factory);
	else if(typeof exports === 'object')
		exports["UI"] = factory(require("jQuery"), require("_"), require("Backbone"), require("Raphael"), require("Blob"), require("FileSaver"));
	else
		root["ThreeNodes"] = root["ThreeNodes"] || {}, root["ThreeNodes"]["UI"] = factory(root["jQuery"], root["_"], root["Backbone"], root["Raphael"], root["Blob"], root["FileSaver"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_30__, __WEBPACK_EXTERNAL_MODULE_31__, __WEBPACK_EXTERNAL_MODULE_32__) {
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

	var AppTimeline, Backbone, FileHandler, GroupDefinitionView, NodeView, NodeViewColor, NodeViewGroup, NodeViewWebgl, UI, UIView, UrlHandler, Workspace, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	__webpack_require__(1);
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	UIView = __webpack_require__(5);
	
	Workspace = __webpack_require__(6);
	
	AppTimeline = __webpack_require__(7);
	
	GroupDefinitionView = __webpack_require__(8);
	
	UrlHandler = __webpack_require__(9);
	
	FileHandler = __webpack_require__(10);
	
	NodeView = __webpack_require__(12);
	
	NodeViewColor = __webpack_require__(13);
	
	NodeViewWebgl = __webpack_require__(14);
	
	NodeViewGroup = __webpack_require__(15);
	
	UI = (function() {
	  function UI(core) {
	    this.core = core;
	    this.clearWorkspace = bind(this.clearWorkspace, this);
	    this.initTimeline = bind(this.initTimeline, this);
	    this.setDisplayMode = bind(this.setDisplayMode, this);
	    this.initUI = bind(this.initUI, this);
	    this.setWorkspaceFromDefinition = bind(this.setWorkspaceFromDefinition, this);
	    this.createWorkspace = bind(this.createWorkspace, this);
	    Backbone.$ = $;
	    ThreeNodes.renderer = {
	      mouseX: 0,
	      mouseY: 0
	    };
	    this.url_handler = new UrlHandler();
	    this.file_handler = new FileHandler(this.core);
	    this.file_handler.on("ClearWorkspace", (function(_this) {
	      return function() {
	        return _this.clearWorkspace();
	      };
	    })(this));
	    this.url_handler.on("ClearWorkspace", (function(_this) {
	      return function() {
	        return _this.clearWorkspace();
	      };
	    })(this));
	    this.url_handler.on("LoadJSON", this.file_handler.loadFromJsonData);
	    this.initUI();
	    this.initTimeline();
	    this.createWorkspace();
	    this.workspace.render(this.core.nodes);
	    Backbone.history.start({
	      pushState: false
	    });
	    return true;
	  }
	
	  UI.prototype.createWorkspace = function() {
	    if (this.workspace) {
	      this.workspace.destroy();
	    }
	    return this.workspace = new Workspace({
	      el: jQuery("<div class='nodes-container'></div>").appendTo("#container"),
	      settings: this.core.settings
	    });
	  };
	
	  UI.prototype.setWorkspaceFromDefinition = function(definition) {
	    this.createWorkspace();
	    if (this.edit_node) {
	      console.log("remove edit node");
	      this.edit_node.remove();
	      delete this.edit_node;
	    }
	    if (definition === "global") {
	      this.workspace.render(this.core.nodes);
	      return this.ui.breadcrumb.reset();
	    } else {
	      this.edit_node = this.core.nodes.createGroup({
	        type: "Group",
	        definition: definition,
	        x: -9999
	      });
	      this.workspace.render(this.edit_node.nodes);
	      return this.ui.breadcrumb.set([definition]);
	    }
	  };
	
	  UI.prototype.initUI = function() {
	    if (this.core.settings.test === false) {
	      this.ui = new UIView({
	        el: $("body"),
	        settings: this.core.settings
	      });
	      this.ui.on("render", this.core.nodes.render);
	      this.ui.on("renderConnections", this.core.nodes.renderAllConnections);
	      this.ui.menubar.on("RemoveSelectedNodes", this.core.nodes.removeSelectedNodes);
	      this.ui.menubar.on("ClearWorkspace", this.clearWorkspace);
	      this.ui.menubar.on("SaveFile", this.file_handler.saveLocalFile);
	      this.ui.menubar.on("ExportCode", this.file_handler.exportCode);
	      this.ui.menubar.on("LoadJSON", this.file_handler.loadFromJsonData);
	      this.ui.menubar.on("LoadFile", this.file_handler.loadLocalFile);
	      this.ui.menubar.on("GroupSelectedNodes", this.core.group_definitions.groupSelectedNodes);
	      this.core.nodes.on("nodeslist:rebuild", this.ui.onNodeListRebuild);
	      this.url_handler.on("SetDisplayModeCommand", this.ui.setDisplayMode);
	      this.ui.breadcrumb.on("click", this.setWorkspaceFromDefinition);
	    } else {
	      $("body").addClass("test-mode");
	    }
	    return this;
	  };
	
	  UI.prototype.setDisplayMode = function(is_player) {
	    if (is_player == null) {
	      is_player = false;
	    }
	    if (this.ui) {
	      return this.ui.setDisplayMode(is_player);
	    }
	  };
	
	  UI.prototype.initTimeline = function() {
	    $("#timeline-container, #keyEditDialog").remove();
	    if (this.timelineView) {
	      this.core.nodes.off("remove", this.timelineView.onNodeRemove);
	      this.timelineView.remove();
	      if (this.ui) {
	        this.timelineView.off("TimelineCreated", this.ui.onUiWindowResize);
	      }
	    }
	    this.timelineView = new AppTimeline({
	      el: $("#timeline"),
	      ui: this.ui
	    });
	    this.core.nodes.bindTimelineEvents(this.timelineView);
	    this.core.nodes.on("remove", this.timelineView.onNodeRemove);
	    if (this.ui) {
	      this.ui.onUiWindowResize();
	    }
	    return this;
	  };
	
	  UI.prototype.clearWorkspace = function() {
	    this.core.nodes.clearWorkspace();
	    this.core.group_definitions.removeAll();
	    if (this.ui) {
	      return this.ui.clearWorkspace();
	    }
	  };
	
	  return UI;
	
	})();
	
	UI.nodes = {};
	
	UI.UIView = UIView;
	
	UI.nodes.NodeView = NodeView;
	
	UI.nodes.Color = NodeViewColor;
	
	UI.nodes.WebGLRenderer = NodeViewWebgl;
	
	UI.nodes.Group = NodeViewGroup;
	
	module.exports = UI;


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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	/* UI View */
	var Backbone, Breadcrumb, MenuBar, Sidebar, UIView, _, _view_app_ui,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	_view_app_ui = __webpack_require__(75);
	
	Sidebar = __webpack_require__(45);
	
	Breadcrumb = __webpack_require__(46);
	
	MenuBar = __webpack_require__(47);
	
	__webpack_require__(60);
	
	__webpack_require__(30);
	
	__webpack_require__(1);
	
	__webpack_require__(48);
	
	__webpack_require__(49);
	
	__webpack_require__(1);
	
	UIView = (function(superClass) {
	  extend(UIView, superClass);
	
	  function UIView() {
	    this.animate = bind(this.animate, this);
	    this.onUiWindowResize = bind(this.onUiWindowResize, this);
	    this.showApplication = bind(this.showApplication, this);
	    this.initResizeSlider = bind(this.initResizeSlider, this);
	    this.initBottomToolbox = bind(this.initBottomToolbox, this);
	    this.initDisplayModeSwitch = bind(this.initDisplayModeSwitch, this);
	    this.switchDisplayMode = bind(this.switchDisplayMode, this);
	    this.scrollTo = bind(this.scrollTo, this);
	    this.setupMouseScroll = bind(this.setupMouseScroll, this);
	    this.setDisplayMode = bind(this.setDisplayMode, this);
	    this.initLayout = bind(this.initLayout, this);
	    this.initMenubar = bind(this.initMenubar, this);
	    this.clearWorkspace = bind(this.clearWorkspace, this);
	    this.onNodeListRebuild = bind(this.onNodeListRebuild, this);
	    return UIView.__super__.constructor.apply(this, arguments);
	  }
	
	  UIView.svg = false;
	
	  UIView.connecting_line = false;
	
	  UIView.prototype.initialize = function(options) {
	    var ui_tmpl;
	    UIView.__super__.initialize.apply(this, arguments);
	    this.settings = options.settings;
	    this.is_grabbing = false;
	    $(window).resize(this.onUiWindowResize);
	    ui_tmpl = _.template(_view_app_ui, {});
	    this.$el.append(ui_tmpl);
	    this.breadcrumb = new Breadcrumb({
	      el: $("#breadcrumb")
	    });
	    UIView.svg = Raphael("graph", 4000, 4000);
	    UIView.connecting_line = UIView.svg.path("M0 -20 L0 -20").attr({
	      stroke: "#fff",
	      'stroke-dasharray': "-",
	      fill: "none",
	      opacity: 0
	    });
	    this.sidebar = new Sidebar({
	      el: $("#sidebar")
	    });
	    this.initMenubar();
	    this.initLayout();
	    this.showApplication();
	    this.onUiWindowResize();
	    return this.animate();
	  };
	
	  UIView.prototype.onNodeListRebuild = function(nodes) {
	    var onTimeOut;
	    if (this.timeoutId) {
	      clearTimeout(this.timeoutId);
	    }
	    onTimeOut = (function(_this) {
	      return function() {
	        return _this.sidebar.render(nodes);
	      };
	    })(this);
	    return this.timeoutId = setTimeout(onTimeOut, 10);
	  };
	
	  UIView.prototype.clearWorkspace = function() {
	    return this.sidebar.clearWorkspace();
	  };
	
	  UIView.prototype.initMenubar = function() {
	    var $menu_tmpl, menu_tmpl;
	    menu_tmpl = _.template(MenuBar.template, {});
	    $menu_tmpl = $(menu_tmpl).prependTo("body");
	    this.menubar = new MenuBar({
	      el: $menu_tmpl
	    });
	    this.menubar.on("ToggleAttributes", (function(_this) {
	      return function() {
	        if (_this.layout) {
	          return _this.layout.toggle("west");
	        }
	      };
	    })(this));
	    this.menubar.on("ToggleLibrary", (function(_this) {
	      return function() {
	        if (_this.layout) {
	          return _this.layout.toggle("east");
	        }
	      };
	    })(this));
	    this.menubar.on("ToggleTimeline", (function(_this) {
	      return function() {
	        if (_this.layout) {
	          return _this.layout.toggle("south");
	        }
	      };
	    })(this));
	    return this;
	  };
	
	  UIView.prototype.initLayout = function() {
	    this.makeSelectable();
	    this.setupMouseScroll();
	    this.initBottomToolbox();
	    this.initDisplayModeSwitch();
	    this.layout = $('body').layout({
	      scrollToBookmarkOnLoad: false,
	      animatePaneSizing: false,
	      fxName: 'none',
	      center: {
	        size: "100%"
	      },
	      north: {
	        closable: false,
	        resizable: false,
	        slidable: false,
	        showOverflowOnHover: true,
	        size: 27,
	        resizerClass: "ui-layout-resizer-hidden",
	        spacing_open: 0,
	        spacing_closed: 0
	      },
	      east: {
	        minSize: 220,
	        initClosed: true,
	        onresize: (function(_this) {
	          return function(name, pane_el, state, opt, layout_name) {
	            return _this.onUiWindowResize();
	          };
	        })(this),
	        onopen: (function(_this) {
	          return function(name, pane_el, state, opt, layout_name) {
	            return _this.onUiWindowResize();
	          };
	        })(this),
	        onclose: (function(_this) {
	          return function(name, pane_el, state, opt, layout_name) {
	            return _this.onUiWindowResize();
	          };
	        })(this)
	      },
	      west: {
	        minSize: 220
	      },
	      south: {
	        minSize: 48,
	        size: 48,
	        onopen: (function(_this) {
	          return function(name, pane_el, state, opt, layout_name) {
	            _this.trigger("timelineResize", pane_el.innerHeight());
	            return _this.onUiWindowResize();
	          };
	        })(this),
	        onclose: (function(_this) {
	          return function(name, pane_el, state, opt, layout_name) {
	            _this.trigger("timelineResize", pane_el.innerHeight());
	            return _this.onUiWindowResize();
	          };
	        })(this),
	        onresize: (function(_this) {
	          return function(name, pane_el, state, opt, layout_name) {
	            _this.trigger("timelineResize", pane_el.innerHeight());
	            return _this.onUiWindowResize();
	          };
	        })(this)
	      }
	    });
	    this.trigger("timelineResize", 48);
	    return this;
	  };
	
	  UIView.prototype.makeSelectable = function() {
	    $("#container").selectable({
	      filter: ".node",
	      stop: (function(_this) {
	        return function(event, ui) {
	          var $selected, anims, nodes;
	          $selected = $(".node.ui-selected");
	          nodes = [];
	          anims = [];
	          $selected.each(function() {
	            var ob, obgrp;
	            ob = $(this).data("object");
	            if (!ob.get("parent")) {
	              ob.anim.objectTrack.name = ob.get("name");
	              anims.push(ob.anim);
	              return nodes.push(ob);
	            } else {
	              obgrp = ob.get("parent");
	              obgrp.anim.objectTrack.name = ob.get("name");
	              if (!_.find(nodes, function(n) {
	                return n.cid === obgrp.cid;
	              })) {
	                anims.push(obgrp.anim);
	                return nodes.push(obgrp);
	              }
	            }
	          });
	          _this.sidebar.clearNodesAttributes();
	          _this.sidebar.renderNodesAttributes(nodes);
	          return _this.trigger("selectAnims", anims);
	        };
	      })(this)
	    });
	    $("#container").mousedown(function(e) {
	      return $('input, textarea').trigger('blur');
	    });
	    return this;
	  };
	
	  UIView.prototype.setDisplayMode = function(is_player) {
	    if (is_player == null) {
	      is_player = false;
	    }
	    if (is_player === true) {
	      $("body").addClass("player-mode");
	      $("body").removeClass("editor-mode");
	      $("#display-mode-switch").html("");
	    } else {
	      $("body").addClass("editor-mode");
	      $("body").removeClass("player-mode");
	      $("#display-mode-switch").html("player mode");
	    }
	    $("#display-mode-switch").toggleClass("icon-pencil", is_player);
	    this.settings.player_mode = is_player;
	    if (is_player === false) {
	      this.trigger("renderConnections");
	    }
	    return true;
	  };
	
	  UIView.prototype.setupMouseScroll = function() {
	    var is_from_target;
	    this.scroll_target = $("#container-wrapper");
	    is_from_target = function(e) {
	      if (e.target === $("#graph svg")[0]) {
	        return true;
	      }
	      return false;
	    };
	    this.scroll_target.bind("contextmenu", function(e) {
	      return false;
	    });
	    this.scroll_target.mousedown((function(_this) {
	      return function(e) {
	        if (is_from_target(e) && (e.which === 2 || e.which === 3)) {
	          _this.is_grabbing = true;
	          _this.xp = e.pageX;
	          _this.yp = e.pageY;
	          return false;
	        }
	      };
	    })(this));
	    this.scroll_target.mousemove((function(_this) {
	      return function(e) {
	        if (is_from_target(e) && (_this.is_grabbing === true)) {
	          _this.scrollTo(_this.xp - e.pageX, _this.yp - e.pageY);
	          _this.xp = e.pageX;
	          return _this.yp = e.pageY;
	        }
	      };
	    })(this));
	    this.scroll_target.mouseout((function(_this) {
	      return function() {
	        return _this.is_grabbing = false;
	      };
	    })(this));
	    this.scroll_target.mouseup((function(_this) {
	      return function(e) {
	        if (is_from_target(e) && (e.which === 2 || e.which === 3)) {
	          return _this.is_grabbing = false;
	        }
	      };
	    })(this));
	    return true;
	  };
	
	  UIView.prototype.scrollTo = function(dx, dy) {
	    var x, y;
	    x = this.scroll_target.scrollLeft() + dx;
	    y = this.scroll_target.scrollTop() + dy;
	    return this.scroll_target.scrollLeft(x).scrollTop(y);
	  };
	
	  UIView.prototype.switchDisplayMode = function() {
	    this.setDisplayMode(!this.settings.player_mode);
	    return this;
	  };
	
	  UIView.prototype.initDisplayModeSwitch = function() {
	    $("body").append("<div id='display-mode-switch'>switch mode</div>");
	    return $("#display-mode-switch").click((function(_this) {
	      return function(e) {
	        return _this.switchDisplayMode();
	      };
	    })(this));
	  };
	
	  UIView.prototype.initBottomToolbox = function() {
	    var $container;
	    $("body").append("<div id='bottom-toolbox'></div>");
	    $container = $("#bottom-toolbox");
	    return this.initResizeSlider($container);
	  };
	
	  UIView.prototype.initResizeSlider = function($container) {
	    var scale_graph;
	    $container.append("<div id='zoom-slider'></div>");
	    scale_graph = function(val) {
	      var factor;
	      factor = val / 100;
	      return $("#container").css('transform', "scale(" + factor + ", " + factor + ")");
	    };
	    return $("#zoom-slider").slider({
	      min: 25,
	      step: 25,
	      value: 100,
	      change: function(event, ui) {
	        return scale_graph(ui.value);
	      },
	      slide: function(event, ui) {
	        return scale_graph(ui.value);
	      }
	    });
	  };
	
	  UIView.prototype.showApplication = function() {
	    var delay_intro;
	    delay_intro = 500;
	    $("body > header").delay(delay_intro).hide();
	    $("#sidebar").delay(delay_intro).show();
	    $("#container-wrapper").delay(delay_intro).show();
	    return this.trigger("renderConnections");
	  };
	
	  UIView.prototype.onUiWindowResize = function() {
	    var margin_bottom, margin_right;
	    margin_bottom = 20;
	    margin_right = 25;
	    if (this.layout.south.state.isClosed === false) {
	      margin_bottom += $("#timeline").innerHeight();
	    }
	    if (this.layout.east.state.isClosed === false) {
	      margin_right += $("#library").innerWidth();
	    }
	    $("#bottom-toolbox").attr("style", "bottom: " + margin_bottom + "px !important; right: " + margin_right + "px");
	    return $("#webgl-window").css({
	      right: margin_right
	    });
	  };
	
	  UIView.prototype.animate = function() {
	    this.trigger("render");
	    return requestAnimationFrame(this.animate);
	  };
	
	  return UIView;
	
	})(Backbone.View);
	
	module.exports = UIView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ConnectionView, Workspace, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	ConnectionView = __webpack_require__(56);
	
	__webpack_require__(1);
	
	
	/* Workspace View */
	
	Workspace = (function(superClass) {
	  extend(Workspace, superClass);
	
	  function Workspace() {
	    this.initDrop = bind(this.initDrop, this);
	    this.renderConnection = bind(this.renderConnection, this);
	    this.renderNode = bind(this.renderNode, this);
	    this.destroy = bind(this.destroy, this);
	    this.render = bind(this.render, this);
	    this.initialize = bind(this.initialize, this);
	    return Workspace.__super__.constructor.apply(this, arguments);
	  }
	
	  Workspace.prototype.initialize = function(options) {
	    Workspace.__super__.initialize.apply(this, arguments);
	    this.settings = options.settings;
	    return this.initDrop();
	  };
	
	  Workspace.prototype.render = function(nodes) {
	    this.nodes = nodes;
	    console.log("Workspace.render " + nodes.length);
	    this.views = [];
	    _.each(this.nodes.models, this.renderNode);
	    _.each(this.nodes.connections.models, this.renderConnection);
	    this.nodes.bind("add", this.renderNode);
	    return this.nodes.connections.bind("add", this.renderConnection);
	  };
	
	  Workspace.prototype.destroy = function() {
	    _.each(this.views, function(view) {
	      return view.remove();
	    });
	    this.nodes.unbind("add", this.renderNode);
	    this.nodes.connections.unbind("add", this.renderConnection);
	    delete this.views;
	    delete this.settings;
	    return this.remove();
	  };
	
	  Workspace.prototype.renderNode = function(node) {
	    var $nodeEl, nodename, view, viewclass;
	    nodename = node.constructor.name;
	    if (ThreeNodes.Core.nodes.views[nodename]) {
	      viewclass = ThreeNodes.Core.nodes.views[nodename];
	    } else {
	      viewclass = ThreeNodes.Core.nodes.views.NodeView;
	    }
	    $nodeEl = $("<div class='node'></div>").appendTo(this.$el);
	    view = new viewclass({
	      model: node,
	      el: $nodeEl
	    });
	    view.$el.data("nid", node.get("nid"));
	    view.$el.data("object", node);
	    return this.views.push(view);
	  };
	
	  Workspace.prototype.renderConnection = function(connection) {
	    var view;
	    if (this.settings.test === true) {
	      return false;
	    }
	    view = new ConnectionView({
	      model: connection
	    });
	    return this.views.push(view);
	  };
	
	  Workspace.prototype.initDrop = function() {
	    var self;
	    self = this;
	    $("#container").droppable({
	      accept: "#tab-new a.button, #library .definition",
	      activeClass: "ui-state-active",
	      hoverClass: "ui-state-hover",
	      drop: function(event, ui) {
	        var container, definition, dx, dy, nodename, offset;
	        offset = $("#container-wrapper").offset();
	        definition = false;
	        if (ui.draggable.hasClass("definition")) {
	          nodename = "Group";
	          container = $("#library");
	          definition = ui.draggable.data("model");
	          offset.left -= container.offset().left;
	        } else {
	          nodename = ui.draggable.attr("rel");
	          container = $("#sidebar .ui-layout-center");
	        }
	        dx = ui.position.left + $("#container-wrapper").scrollLeft() - offset.left - 10;
	        dy = ui.position.top + $("#container-wrapper").scrollTop() - container.scrollTop() - offset.top;
	        if (self.nodes) {
	          self.nodes.createNode({
	            type: nodename,
	            x: dx,
	            y: dy,
	            definition: definition
	          });
	        }
	        return $("#sidebar").show();
	      }
	    });
	    return this;
	  };
	
	  return Workspace;
	
	})(Backbone.View);
	
	module.exports = Workspace;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var AppTimeline, Backbone, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	
	/* Timeline View */
	
	AppTimeline = (function(superClass) {
	  extend(AppTimeline, superClass);
	
	  function AppTimeline() {
	    this.update = bind(this.update, this);
	    this.resize = bind(this.resize, this);
	    this.remove = bind(this.remove, this);
	    this.onNodeRemove = bind(this.onNodeRemove, this);
	    this.selectAnims = bind(this.selectAnims, this);
	    this.initialize = bind(this.initialize, this);
	    return AppTimeline.__super__.constructor.apply(this, arguments);
	  }
	
	  AppTimeline.prototype.initialize = function(options) {
	    var self;
	    AppTimeline.__super__.initialize.apply(this, arguments);
	    localStorage["timeline.js.settings.canvasHeight"] = this.$el.innerHeight();
	    this.$el.html("");
	    self = this;
	    this.timeline = new Timeline({
	      element: this.el,
	      displayOnlySelected: true,
	      colorBackground: "#313638",
	      colorButtonBackground: "#313638",
	      colorButtonStroke: "#aeb7bb",
	      colorScrollbar: "#313638",
	      colorScrollbarThumb: "#656c6f",
	      colorTimelineLabel: "#999",
	      colorTimelineTick: "#656c6f",
	      colorTimeScale: "#666",
	      colorHeaderBorder: "#313638",
	      colorTimeTicker: "#f00",
	      colorTrackBottomLine: "#555",
	      colorPropertyLabel: "#999",
	      onGuiSave: (function(_this) {
	        return function() {
	          return self.trigger("OnUIResize");
	        };
	      })(this),
	      setPropertyValue: function(propertyAnim, t) {
	        return propertyAnim.target[propertyAnim.propertyName].setValue(t);
	      },
	      applyPropertyValue: function(propertyAnim, t) {
	        return propertyAnim.target[propertyAnim.propertyName].setValue(propertyAnim.startValue + (propertyAnim.endValue - propertyAnim.startValue) * t);
	      },
	      getPropertyValue: function(propertyAnim) {
	        var val;
	        val = propertyAnim.target[propertyAnim.propertyName].attributes["value"];
	        if ($.type(val) !== "array") {
	          return val;
	        } else {
	          return val[0];
	        }
	      },
	      onTrackRebuild: (function(_this) {
	        return function() {
	          return _this.trigger("trackRebuild");
	        };
	      })(this),
	      onStop: (function(_this) {
	        return function() {
	          return _this.trigger("stopSound");
	        };
	      })(this),
	      onPlay: (function(_this) {
	        return function(time) {
	          return _this.trigger("startSound", time);
	        };
	      })(this)
	    });
	    Timeline.globalInstance = this.timeline;
	    this.timeline.loop(-1);
	    this.time = 0;
	    if (options.ui) {
	      this.ui = options.ui;
	      this.ui.on("render", this.update);
	      this.ui.on("selectAnims", this.selectAnims);
	      this.ui.on("timelineResize", this.resize);
	    }
	    return this.trigger("OnUIResize");
	  };
	
	  AppTimeline.prototype.selectAnims = function(nodes) {
	    if (this.timeline) {
	      return this.timeline.selectAnims(nodes);
	    }
	  };
	
	  AppTimeline.prototype.onNodeRemove = function(node) {
	    return this.selectAnims([]);
	  };
	
	  AppTimeline.prototype.remove = function() {
	    this.undelegateEvents();
	    if (this.ui) {
	      this.ui.off("render", this.update);
	      this.ui.off("selectAnims", this.selectAnims);
	      this.ui.off("timelineResize", this.resize);
	      delete this.ui;
	    }
	    this.timeline.destroy();
	    delete this.timeline;
	    return this.time = null;
	  };
	
	  AppTimeline.prototype.resize = function(height) {
	    if (this.timeline) {
	      this.timeline.canvasHeight = height;
	      this.timeline.tracksScrollY = 0;
	      this.timeline.tracksScrollThumbPos = 0;
	      return this.timeline.save();
	    }
	  };
	
	  AppTimeline.prototype.update = function() {
	    var dt, n;
	    n = Date.now();
	    if (this.timeline) {
	      dt = n - this.time;
	      this.timeline.update(dt / 1000);
	    }
	    return this.time = n;
	  };
	
	  return AppTimeline;
	
	})(Backbone.View);
	
	module.exports = AppTimeline;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, GroupDefinitionView, _, _view_group_delete, _view_template,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	_view_template = __webpack_require__(76);
	
	_view_group_delete = __webpack_require__(77);
	
	__webpack_require__(1);
	
	
	/* Node View */
	
	GroupDefinitionView = (function(superClass) {
	  extend(GroupDefinitionView, superClass);
	
	  function GroupDefinitionView() {
	    this.createConfirmModal = bind(this.createConfirmModal, this);
	    return GroupDefinitionView.__super__.constructor.apply(this, arguments);
	  }
	
	  GroupDefinitionView.template = _view_template;
	
	  GroupDefinitionView.prototype.initialize = function() {
	    this.$el.draggable({
	      revert: "valid",
	      opacity: 0.7,
	      helper: "clone",
	      revertDuration: 0,
	      scroll: false,
	      containment: "document"
	    });
	    this.$el.data("model", this.model);
	    this.model.bind('remove', (function(_this) {
	      return function() {
	        return _this.remove();
	      };
	    })(this));
	    $(".edit", this.$el).click((function(_this) {
	      return function(e) {
	        e.preventDefault();
	        return _this.trigger("edit", _this.model);
	      };
	    })(this));
	    return $(".remove", this.$el).click((function(_this) {
	      return function(e) {
	        e.preventDefault();
	        return _this.createConfirmModal();
	      };
	    })(this));
	  };
	
	  GroupDefinitionView.prototype.createConfirmModal = function() {
	    var grp_confirm_tmpl, self;
	    if (this.$confirm) {
	      this.$confirm.dialog("destroy");
	    }
	    $("#confirm-groupdefinition-delete").remove();
	    self = this;
	    grp_confirm_tmpl = _.template(_view_group_delete, {});
	    this.$confirm = $(grp_confirm_tmpl).appendTo("body");
	    return this.$confirm.dialog({
	      resizable: false,
	      height: 120,
	      modal: true,
	      buttons: {
	        "Delete": function() {
	          self.model.destroy();
	          return self.$confirm.dialog("close");
	        },
	        "Cancel": (function(_this) {
	          return function() {
	            return self.$confirm.dialog("close");
	          };
	        })(this)
	      }
	    });
	  };
	
	  return GroupDefinitionView;
	
	})(Backbone.View);
	
	module.exports = GroupDefinitionView;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, UrlHandler,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Backbone = __webpack_require__(3);
	
	UrlHandler = (function(superClass) {
	  extend(UrlHandler, superClass);
	
	  function UrlHandler() {
	    this.onPlayExample = bind(this.onPlayExample, this);
	    this.onExample = bind(this.onExample, this);
	    this.onPlay = bind(this.onPlay, this);
	    this.onDefault = bind(this.onDefault, this);
	    return UrlHandler.__super__.constructor.apply(this, arguments);
	  }
	
	  UrlHandler.prototype.routes = {
	    "": "onDefault",
	    "play": "onPlay",
	    "example/:file": "onExample",
	    "play/example/:file": "onPlayExample"
	  };
	
	  UrlHandler.prototype.onDefault = function() {
	    return this.trigger("SetDisplayModeCommand", false);
	  };
	
	  UrlHandler.prototype.onPlay = function() {
	    return this.trigger("SetDisplayModeCommand", true);
	  };
	
	  UrlHandler.prototype.onExample = function(file, player_mode) {
	    var self;
	    if (player_mode == null) {
	      player_mode = false;
	    }
	    self = this;
	    this.trigger("SetDisplayModeCommand", player_mode);
	    this.trigger("ClearWorkspace");
	    return $.ajax({
	      url: "examples/" + file,
	      dataType: 'text',
	      success: function(data) {
	        return self.trigger("LoadJSON", data);
	      }
	    });
	  };
	
	  UrlHandler.prototype.onPlayExample = function(file) {
	    return this.onExample(file, true);
	  };
	
	  return UrlHandler;
	
	})(Backbone.Router);
	
	module.exports = UrlHandler;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CodeExporter, FileHandler, Utils, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Utils = __webpack_require__(34);
	
	CodeExporter = __webpack_require__(58);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	FileHandler = (function(superClass) {
	  extend(FileHandler, superClass);
	
	  function FileHandler(core) {
	    this.core = core;
	    this.loadLocalFile = bind(this.loadLocalFile, this);
	    this.loadFromJsonData = bind(this.loadFromJsonData, this);
	    this.getLocalJson = bind(this.getLocalJson, this);
	    this.exportCode = bind(this.exportCode, this);
	    this.saveLocalFile = bind(this.saveLocalFile, this);
	    _.extend(FileHandler.prototype, Backbone.Events);
	  }
	
	  FileHandler.prototype.saveLocalFile = function() {
	    var blob, fileSaver, result_string;
	    result_string = this.getLocalJson();
	    blob = new Blob([result_string], {
	      "text/plain;charset=utf-8": "text/plain;charset=utf-8"
	    });
	    return fileSaver = saveAs(blob, "nodes.json");
	  };
	
	  FileHandler.prototype.exportCode = function() {
	    var blob, exporter, fileSaver, json, res;
	    json = this.getLocalJson(false);
	    exporter = new CodeExporter();
	    res = exporter.toCode(json);
	    blob = new Blob([res], {
	      "text/plain;charset=utf-8": "text/plain;charset=utf-8"
	    });
	    return fileSaver = saveAs(blob, "nodes.js");
	  };
	
	  FileHandler.prototype.getLocalJson = function(stringify) {
	    var res;
	    if (stringify == null) {
	      stringify = true;
	    }
	    res = {
	      uid: this.core.nodes.indexer.getUID(false),
	      nodes: jQuery.map(this.core.nodes.models, function(n, i) {
	        return n.toJSON();
	      }),
	      connections: jQuery.map(this.core.nodes.connections.models, function(c, i) {
	        return c.toJSON();
	      }),
	      groups: jQuery.map(this.core.group_definitions.models, function(g, i) {
	        return g.toJSON();
	      })
	    };
	    if (stringify) {
	      return JSON.stringify(res, null, 2);
	    } else {
	      return res;
	    }
	  };
	
	  FileHandler.prototype.loadFromJsonData = function(txt) {
	    var loaded_data;
	    loaded_data = JSON.parse(txt);
	    return this.core.setNodes(loaded_data);
	  };
	
	  FileHandler.prototype.loadLocalFile = function(e) {
	    var file, reader, self;
	    this.trigger("ClearWorkspace");
	    file = e.target.files[0];
	    reader = new FileReader();
	    self = this;
	    reader.onload = function(e) {
	      var txt;
	      txt = e.target.result;
	      return self.loadFromJsonData(txt);
	    };
	    return reader.readAsText(file, "UTF-8");
	  };
	
	  return FileHandler;
	
	})(Backbone.Events);
	
	module.exports = FileHandler;


/***/ },
/* 11 */,
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, NodeView, WebGLRenderer, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	__webpack_require__(35);
	
	NodeView = __webpack_require__(12);
	
	WebGLRenderer = (function(superClass) {
	  extend(WebGLRenderer, superClass);
	
	  function WebGLRenderer() {
	    this.apply_size = bind(this.apply_size, this);
	    this.add_renderer_to_dom = bind(this.add_renderer_to_dom, this);
	    this.create_preview_view = bind(this.create_preview_view, this);
	    this.create_popup_view = bind(this.create_popup_view, this);
	    this.add_mouse_handler = bind(this.add_mouse_handler, this);
	    this.remove = bind(this.remove, this);
	    this.update = bind(this.update, this);
	    this.initialize = bind(this.initialize, this);
	    return WebGLRenderer.__super__.constructor.apply(this, arguments);
	  }
	
	  WebGLRenderer.prototype.initialize = function(options) {
	    WebGLRenderer.__super__.initialize.apply(this, arguments);
	    this.preview_mode = true;
	    this.creating_popup = false;
	    this.win = false;
	    this.old_bg = false;
	    $("body").append("<div id='webgl-window'></div>");
	    this.webgl_container = $("#webgl-window");
	    this.apply_size();
	    this.apply_bg_color();
	    this.add_mouse_handler();
	    this.model.on("on_compute", this.update);
	    return this.webgl_container.bind("click", (function(_this) {
	      return function(e) {
	        if (_this.model.settings.player_mode === false) {
	          return _this.create_popup_view();
	        }
	      };
	    })(this));
	  };
	
	  WebGLRenderer.prototype.update = function() {
	    if (this.creating_popup === true && !this.win) {
	      return;
	    }
	    this.creating_popup = false;
	    if (!this.model.settings.test) {
	      this.add_renderer_to_dom();
	    }
	    this.apply_size();
	    return this.apply_bg_color();
	  };
	
	  WebGLRenderer.prototype.remove = function() {
	    if (this.win && this.win !== false) {
	      this.win.close();
	    }
	    this.webgl_container.unbind();
	    this.webgl_container.remove();
	    delete this.webgl_container;
	    delete this.win;
	    return WebGLRenderer.__super__.remove.apply(this, arguments);
	  };
	
	  WebGLRenderer.prototype.add_mouse_handler = function() {
	    $(this.model.ob.domElement).unbind("mousemove");
	    $(this.model.ob.domElement).bind("mousemove", function(e) {
	      ThreeNodes.renderer.mouseX = e.clientX;
	      return ThreeNodes.renderer.mouseY = e.clientY;
	    });
	    return this;
	  };
	
	  WebGLRenderer.prototype.create_popup_view = function() {
	    var h, w;
	    this.preview_mode = false;
	    this.creating_popup = true;
	    w = this.model.fields.getField('width').getValue();
	    h = this.model.fields.getField('height').getValue();
	    this.win = window.open('', 'win' + this.model.nid, "width=" + w + ",height=" + h + ",scrollbars=false,location=false,status=false,menubar=false");
	    $("body", $(this.win.document)).append(this.model.ob.domElement);
	    $("*", $(this.win.document)).css({
	      padding: 0,
	      margin: 0
	    });
	    this.win.onbeforeunload = (function(_this) {
	      return function() {
	        _this.preview_mode = true;
	        _this.win.onbeforeunload = false;
	        _this.win = false;
	        _this.webgl_container.append(_this.model.ob.domElement);
	        _this.apply_bg_color(true);
	        _this.apply_size(true);
	      };
	    })(this);
	    this.apply_bg_color(true);
	    this.apply_size(true);
	    this.add_mouse_handler();
	    return this;
	  };
	
	  WebGLRenderer.prototype.create_preview_view = function() {
	    this.preview_mode = true;
	    this.webgl_container.append(this.model.ob.domElement);
	    this.apply_bg_color(true);
	    this.apply_size(true);
	    this.add_mouse_handler();
	    return this;
	  };
	
	  WebGLRenderer.prototype.add_renderer_to_dom = function() {
	    if (this.preview_mode && $("canvas", this.webgl_container).length === 0) {
	      this.create_preview_view();
	    }
	    if (this.preview_mode === false && this.win === false) {
	      this.create_popup_view();
	    }
	    return this;
	  };
	
	  WebGLRenderer.prototype.apply_bg_color = function(force_refresh) {
	    var new_val;
	    if (force_refresh == null) {
	      force_refresh = false;
	    }
	    new_val = this.model.fields.getField('bg_color').getValue().getStyle();
	    if (this.old_bg === new_val && force_refresh === false) {
	      return false;
	    }
	    this.model.ob.setClearColor(this.model.fields.getField('bg_color').getValue(), 1);
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
	    if (force_refresh == null) {
	      force_refresh = false;
	    }
	    w = this.model.fields.getField('width').getValue();
	    h = this.model.fields.getField('height').getValue();
	    dw = w;
	    dh = h;
	    if (this.win === false && this.model.settings.player_mode === false) {
	      maxw = 220;
	      r = w / h;
	      dw = maxw;
	      dh = dw / r;
	    }
	    if (dw !== this.model.width || dh !== this.model.height || force_refresh) {
	      this.model.ob.setSize(dw, dh);
	      if (this.win && this.win !== false) {
	        this.win.resizeTo(dw, dh + 52);
	      }
	    }
	    this.model.width = dw;
	    return this.model.height = dh;
	  };
	
	  return WebGLRenderer;
	
	})(NodeView);
	
	ThreeNodes.Core.addNodeView('WebGLRenderer', WebGLRenderer);
	
	module.exports = WebGLRenderer;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Group, NodeView, _, namespace,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	namespace = __webpack_require__(50).namespace;
	
	__webpack_require__(35);
	
	NodeView = __webpack_require__(12);
	
	Group = (function(superClass) {
	  extend(Group, superClass);
	
	  function Group() {
	    this.remove = bind(this.remove, this);
	    this.renderNode = bind(this.renderNode, this);
	    this.initialize = bind(this.initialize, this);
	    return Group.__super__.constructor.apply(this, arguments);
	  }
	
	  Group.prototype.initialize = function(options) {
	    Group.__super__.initialize.apply(this, arguments);
	    this.views = [];
	    console.log(options.model.nodes);
	    return _.each(options.model.nodes.models, this.renderNode);
	  };
	
	  Group.prototype.renderNode = function(node) {
	    var $nodeEl, nodename, view, viewclass;
	    nodename = node.constructor.name;
	    if (ThreeNodes.Core.nodes.views[nodename]) {
	      viewclass = ThreeNodes.Core.nodes.views[nodename];
	    } else {
	      viewclass = ThreeNodes.NodeView;
	    }
	    $nodeEl = $("<div class='node'></div>").appendTo(this.$el.find("> .options"));
	    view = new viewclass({
	      model: node,
	      isSubNode: true,
	      el: $nodeEl
	    });
	    view.$el.data("nid", node.get("nid"));
	    view.$el.data("object", node);
	    return this.views.push(view);
	  };
	
	  Group.prototype.remove = function() {
	    return Group.__super__.remove.apply(this, arguments);
	  };
	
	  return Group;
	
	})(NodeView);
	
	module.exports = Group;


/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_30__;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ },
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
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, NodeSidebarView, Sidebar, TreeView, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	NodeSidebarView = __webpack_require__(87);
	
	TreeView = __webpack_require__(88);
	
	__webpack_require__(1);
	
	
	/* Sidebar View */
	
	Sidebar = (function(superClass) {
	  extend(Sidebar, superClass);
	
	  function Sidebar() {
	    this.initNewNode = bind(this.initNewNode, this);
	    this.initSearch = bind(this.initSearch, this);
	    this.filterList = bind(this.filterList, this);
	    this.filterListItem = bind(this.filterListItem, this);
	    this.renderNodesAttributes = bind(this.renderNodesAttributes, this);
	    this.clearNodesAttributes = bind(this.clearNodesAttributes, this);
	    this.initTabs = bind(this.initTabs, this);
	    this.clearWorkspace = bind(this.clearWorkspace, this);
	    this.render = bind(this.render, this);
	    this.initTreeView = bind(this.initTreeView, this);
	    return Sidebar.__super__.constructor.apply(this, arguments);
	  }
	
	  Sidebar.prototype.initialize = function() {
	    Sidebar.__super__.initialize.apply(this, arguments);
	    this.node_views = [];
	    this.initNewNode();
	    this.initSearch();
	    this.initTabs();
	    this.initTreeView();
	    return this.layout = this.$el.layout({
	      scrollToBookmarkOnLoad: false,
	      north: {
	        closable: false,
	        resizable: false,
	        slidable: false,
	        resizerClass: "ui-layout-resizer-hidden",
	        spacing_open: 0,
	        spacing_closed: 0
	      },
	      center: {
	        size: "100%"
	      }
	    });
	  };
	
	  Sidebar.prototype.initTreeView = function() {
	    this.treeview = new TreeView({
	      el: $("#tab-list")
	    });
	    return this;
	  };
	
	  Sidebar.prototype.render = function(nodes) {
	    if (this.treeview) {
	      return this.treeview.render(nodes);
	    }
	  };
	
	  Sidebar.prototype.clearWorkspace = function() {
	    return this.treeview.render(false);
	  };
	
	  Sidebar.prototype.initTabs = function() {
	    this.$el.tabs({
	      fx: {
	        opacity: 'toggle',
	        duration: 100
	      }
	    });
	    return this;
	  };
	
	  Sidebar.prototype.clearNodesAttributes = function() {
	    var $target, removeExistingNodes;
	    removeExistingNodes = (function(_this) {
	      return function() {
	        if (_this.node_views.length > 0) {
	          _.each(_this.node_views, function(view) {
	            return view.remove();
	          });
	          return _this.node_views = [];
	        }
	      };
	    })(this);
	    removeExistingNodes();
	    $target = $("#tab-attribute");
	    $target.html("");
	    return this;
	  };
	
	  Sidebar.prototype.renderNodesAttributes = function(nodes) {
	    var $target, i, len, node, nodes_grp, view;
	    $target = $("#tab-attribute");
	    if (!nodes || nodes.length < 1) {
	      return this;
	    }
	    for (i = 0, len = nodes.length; i < len; i++) {
	      node = nodes[i];
	      if (node.get("type") !== "Group") {
	        view = new NodeSidebarView({
	          model: node
	        });
	        $target.append(view.el);
	        this.node_views.push(view);
	      } else {
	        $target.append("<h3>" + (node.get("name")) + "</h3>");
	        nodes_grp = node.nodes.models;
	        this.renderNodesAttributes(nodes_grp);
	      }
	    }
	    return this;
	  };
	
	  Sidebar.prototype.filterListItem = function($item, value) {
	    var s;
	    s = $.trim($("a", $item).html()).toLowerCase();
	    if (s.indexOf(value) === -1) {
	      return $item.hide();
	    } else {
	      return $item.show();
	    }
	  };
	
	  Sidebar.prototype.filterList = function(ul, value) {
	    var has_visible_items, self, ul_title;
	    self = this;
	    ul_title = ul.prev();
	    has_visible_items = false;
	    $("li", ul).each(function() {
	      return self.filterListItem($(this), value);
	    });
	    if ($("li:visible", ul).length === 0) {
	      ul_title.hide();
	    } else {
	      ul_title.show();
	    }
	    return this;
	  };
	
	  Sidebar.prototype.initSearch = function() {
	    var self;
	    self = this;
	    $("#node_filter").keyup(function(e) {
	      var v;
	      v = $.trim($("#node_filter").val()).toLowerCase();
	      if (v === "") {
	        return $("#tab-new li, #tab-new h3").show();
	      } else {
	        return $("#tab-new ul").each(function() {
	          return self.filterList($(this), v);
	        });
	      }
	    });
	    return this;
	  };
	
	  Sidebar.prototype.initNewNode = function() {
	    var $container, group, group_name, i, len, node, nodes_by_group, ref, result, self;
	    self = this;
	    $container = $("#tab-new");
	    result = [];
	    nodes_by_group = {
	      Base: [],
	      Conditional: [],
	      Math: [],
	      Code: [],
	      Utils: [],
	      Three: [],
	      Geometry: [],
	      Materials: [],
	      Lights: [],
	      PostProcessing: [],
	      Spread: [],
	      Particle: [],
	      "Particle-sparks": [],
	      "Particle-sparks-initializers": [],
	      "Particle-sparks-actions": [],
	      "Particle-sparks-zone": [],
	      "Constructive-Geometry": []
	    };
	    for (node in ThreeNodes.Core.nodes.models) {
	      if (ThreeNodes.Core.nodes.models[node].group_name) {
	        group_name = ThreeNodes.Core.nodes.models[node].group_name.replace(/\./g, "-");
	        if (!nodes_by_group[group_name]) {
	          nodes_by_group[group_name] = [];
	        }
	        nodes_by_group[group_name].push(node);
	      }
	    }
	    for (group in nodes_by_group) {
	      $container.append("<h3>" + group + "</h3><ul id='nodetype-" + group + "'></ul>");
	      ref = nodes_by_group[group];
	      for (i = 0, len = ref.length; i < len; i++) {
	        node = ref[i];
	        $("#nodetype-" + group, $container).append("<li><a class='button' rel='" + node + "' href='#'>" + ThreeNodes.Core.nodes.models[node].node_name + "</a></li>");
	      }
	    }
	    $("a.button", $container).draggable({
	      revert: "valid",
	      opacity: 0.7,
	      helper: "clone",
	      revertDuration: 0,
	      scroll: false,
	      containment: "document"
	    });
	    return this;
	  };
	
	  return Sidebar;
	
	})(Backbone.View);
	
	module.exports = Sidebar;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, Breadcrumb, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	Breadcrumb = (function(superClass) {
	  extend(Breadcrumb, superClass);
	
	  function Breadcrumb() {
	    this.onClick = bind(this.onClick, this);
	    this.set = bind(this.set, this);
	    this.reset = bind(this.reset, this);
	    return Breadcrumb.__super__.constructor.apply(this, arguments);
	  }
	
	  Breadcrumb.prototype.initialize = function() {
	    Breadcrumb.__super__.initialize.apply(this, arguments);
	    return this.$el.click(this.onClick);
	  };
	
	  Breadcrumb.prototype.reset = function() {
	    this.items = [];
	    return this.$el.html("");
	  };
	
	  Breadcrumb.prototype.set = function(items) {
	    var gid, i, item, len, name, results;
	    this.items = items;
	    this.$el.html("<a href='#' data-gid='global'>Global</a>");
	    results = [];
	    for (i = 0, len = items.length; i < len; i++) {
	      item = items[i];
	      name = item.get("name");
	      gid = item.get("gid");
	      results.push(this.$el.append(" ▶ " + ("<a href='#' class='grp' data-gid='" + gid + "'>" + name + "</a>")));
	    }
	    return results;
	  };
	
	  Breadcrumb.prototype.onClick = function(e) {
	    var gid;
	    gid = $(e.target).data("gid");
	    if (gid === "global") {
	      return this.trigger("click", "global");
	    }
	  };
	
	  return Breadcrumb;
	
	})(Backbone.View);
	
	module.exports = Breadcrumb;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, MenuBar, _, _view_menubar,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	_view_menubar = __webpack_require__(85);
	
	__webpack_require__(86);
	
	MenuBar = (function(superClass) {
	  extend(MenuBar, superClass);
	
	  function MenuBar() {
	    this.onLinkClick = bind(this.onLinkClick, this);
	    return MenuBar.__super__.constructor.apply(this, arguments);
	  }
	
	  MenuBar.template = _view_menubar;
	
	  MenuBar.prototype.initialize = function() {
	    var self;
	    this.$el.menubar();
	    self = this;
	    $("a", this.$el).click(function(event) {
	      var url;
	      if ($(this).next().is("ul")) {
	        return false;
	      }
	      url = $(this).attr('href').substr(1);
	      return self.onLinkClick(event, this, url);
	    });
	    return $("#main_file_input_open").change((function(_this) {
	      return function(e) {
	        return _this.trigger("LoadFile", e);
	      };
	    })(this));
	  };
	
	  MenuBar.prototype.onLinkClick = function(event, link, url) {
	    var data_attr, data_event;
	    data_event = $(link).data("event");
	    data_attr = $(link).data("eventData");
	    if (data_event) {
	      this.trigger(data_event, data_attr);
	      switch (data_event) {
	        case "ClearWorkspace":
	          Backbone.history.navigate("", false);
	          break;
	        case "OpenFile":
	          $("#main_file_input_open").click();
	      }
	      return true;
	    }
	    return true;
	  };
	
	  return MenuBar;
	
	})(Backbone.View);
	
	module.exports = MenuBar;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * transform: A jQuery cssHooks adding cross-browser 2d transform capabilities to $.fn.css() and $.fn.animate()
	 *
	 * limitations:
	 * - requires jQuery 1.4.3+
	 * - Should you use the *translate* property, then your elements need to be absolutely positionned in a relatively positionned wrapper **or it will fail in IE678**.
	 * - transformOrigin is not accessible
	 *
	 * latest version and complete README available on Github:
	 * https://github.com/louisremi/jquery.transform.js
	 *
	 * Copyright 2011 @louis_remi
	 * Licensed under the MIT license.
	 *
	 * This saved you an hour of work?
	 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
	 *
	 */
	(function( $, window, document, Math, undefined ) {
	
	/*
	 * Feature tests and global variables
	 */
	var div = document.createElement("div"),
		divStyle = div.style,
		suffix = "Transform",
		testProperties = [
			"O" + suffix,
			"ms" + suffix,
			"Webkit" + suffix,
			"Moz" + suffix
		],
		i = testProperties.length,
		supportProperty,
		supportMatrixFilter,
		supportFloat32Array = "Float32Array" in window,
		propertyHook,
		propertyGet,
		rMatrix = /Matrix([^)]*)/,
		rAffine = /^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,
		_transform = "transform",
		_transformOrigin = "transformOrigin",
		_translate = "translate",
		_rotate = "rotate",
		_scale = "scale",
		_skew = "skew",
		_matrix = "matrix";
	
	// test different vendor prefixes of these properties
	while ( i-- ) {
		if ( testProperties[i] in divStyle ) {
			$.support[_transform] = supportProperty = testProperties[i];
			$.support[_transformOrigin] = supportProperty + "Origin";
			continue;
		}
	}
	// IE678 alternative
	if ( !supportProperty ) {
		$.support.matrixFilter = supportMatrixFilter = divStyle.filter === "";
	}
	
	// px isn't the default unit of these properties
	$.cssNumber[_transform] = $.cssNumber[_transformOrigin] = true;
	
	/*
	 * fn.css() hooks
	 */
	if ( supportProperty && supportProperty != _transform ) {
		// Modern browsers can use jQuery.cssProps as a basic hook
		$.cssProps[_transform] = supportProperty;
		$.cssProps[_transformOrigin] = supportProperty + "Origin";
	
		// Firefox needs a complete hook because it stuffs matrix with "px"
		if ( supportProperty == "Moz" + suffix ) {
			propertyHook = {
				get: function( elem, computed ) {
					return (computed ?
						// remove "px" from the computed matrix
						$.css( elem, supportProperty ).split("px").join(""):
						elem.style[supportProperty]
					);
				},
				set: function( elem, value ) {
					// add "px" to matrices
					elem.style[supportProperty] = /matrix\([^)p]*\)/.test(value) ?
						value.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/, _matrix+"$1$2px,$3px"):
						value;
				}
			};
		/* Fix two jQuery bugs still present in 1.5.1
		 * - rupper is incompatible with IE9, see http://jqbug.com/8346
		 * - jQuery.css is not really jQuery.cssProps aware, see http://jqbug.com/8402
		 */
		} else if ( /^1\.[0-5](?:\.|$)/.test($.fn.jquery) ) {
			propertyHook = {
				get: function( elem, computed ) {
					return (computed ?
						$.css( elem, supportProperty.replace(/^ms/, "Ms") ):
						elem.style[supportProperty]
					);
				}
			};
		}
		/* TODO: leverage hardware acceleration of 3d transform in Webkit only
		else if ( supportProperty == "Webkit" + suffix && support3dTransform ) {
			propertyHook = {
				set: function( elem, value ) {
					elem.style[supportProperty] =
						value.replace();
				}
			}
		}*/
	
	} else if ( supportMatrixFilter ) {
		propertyHook = {
			get: function( elem, computed, asArray ) {
				var elemStyle = ( computed && elem.currentStyle ? elem.currentStyle : elem.style ),
					matrix, data;
	
				if ( elemStyle && rMatrix.test( elemStyle.filter ) ) {
					matrix = RegExp.$1.split(",");
					matrix = [
						matrix[0].split("=")[1],
						matrix[2].split("=")[1],
						matrix[1].split("=")[1],
						matrix[3].split("=")[1]
					];
				} else {
					matrix = [1,0,0,1];
				}
	
				if ( ! $.cssHooks[_transformOrigin] ) {
					matrix[4] = elemStyle ? parseInt(elemStyle.left, 10) || 0 : 0;
					matrix[5] = elemStyle ? parseInt(elemStyle.top, 10) || 0 : 0;
	
				} else {
					data = $._data( elem, "transformTranslate", undefined );
					matrix[4] = data ? data[0] : 0;
					matrix[5] = data ? data[1] : 0;
				}
	
				return asArray ? matrix : _matrix+"(" + matrix + ")";
			},
			set: function( elem, value, animate ) {
				var elemStyle = elem.style,
					currentStyle,
					Matrix,
					filter,
					centerOrigin;
	
				if ( !animate ) {
					elemStyle.zoom = 1;
				}
	
				value = matrix(value);
	
				// rotate, scale and skew
				Matrix = [
					"Matrix("+
						"M11="+value[0],
						"M12="+value[2],
						"M21="+value[1],
						"M22="+value[3],
						"SizingMethod='auto expand'"
				].join();
				filter = ( currentStyle = elem.currentStyle ) && currentStyle.filter || elemStyle.filter || "";
	
				elemStyle.filter = rMatrix.test(filter) ?
					filter.replace(rMatrix, Matrix) :
					filter + " progid:DXImageTransform.Microsoft." + Matrix + ")";
	
				if ( ! $.cssHooks[_transformOrigin] ) {
	
					// center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
					if ( (centerOrigin = $.transform.centerOrigin) ) {
						elemStyle[centerOrigin == "margin" ? "marginLeft" : "left"] = -(elem.offsetWidth/2) + (elem.clientWidth/2) + "px";
						elemStyle[centerOrigin == "margin" ? "marginTop" : "top"] = -(elem.offsetHeight/2) + (elem.clientHeight/2) + "px";
					}
	
					// translate
					// We assume that the elements are absolute positionned inside a relative positionned wrapper
					elemStyle.left = value[4] + "px";
					elemStyle.top = value[5] + "px";
	
				} else {
					$.cssHooks[_transformOrigin].set( elem, value );
				}
			}
		};
	}
	// populate jQuery.cssHooks with the appropriate hook if necessary
	if ( propertyHook ) {
		$.cssHooks[_transform] = propertyHook;
	}
	// we need a unique setter for the animation logic
	propertyGet = propertyHook && propertyHook.get || $.css;
	
	/*
	 * fn.animate() hooks
	 */
	$.fx.step.transform = function( fx ) {
		var elem = fx.elem,
			start = fx.start,
			end = fx.end,
			pos = fx.pos,
			transform = "",
			precision = 1E5,
			i, startVal, endVal, unit;
	
		// fx.end and fx.start need to be converted to interpolation lists
		if ( !start || typeof start === "string" ) {
	
			// the following block can be commented out with jQuery 1.5.1+, see #7912
			if ( !start ) {
				start = propertyGet( elem, supportProperty );
			}
	
			// force layout only once per animation
			if ( supportMatrixFilter ) {
				elem.style.zoom = 1;
			}
	
			// replace "+=" in relative animations (-= is meaningless with transforms)
			end = end.split("+=").join(start);
	
			// parse both transform to generate interpolation list of same length
			$.extend( fx, interpolationList( start, end ) );
			start = fx.start;
			end = fx.end;
		}
	
		i = start.length;
	
		// interpolate functions of the list one by one
		while ( i-- ) {
			startVal = start[i];
			endVal = end[i];
			unit = +false;
	
			switch ( startVal[0] ) {
	
				case _translate:
					unit = "px";
				case _scale:
					unit || ( unit = "");
	
					transform = startVal[0] + "(" +
						Math.round( (startVal[1][0] + (endVal[1][0] - startVal[1][0]) * pos) * precision ) / precision + unit +","+
						Math.round( (startVal[1][1] + (endVal[1][1] - startVal[1][1]) * pos) * precision ) / precision + unit + ")"+
						transform;
					break;
	
				case _skew + "X":
				case _skew + "Y":
				case _rotate:
					transform = startVal[0] + "(" +
						Math.round( (startVal[1] + (endVal[1] - startVal[1]) * pos) * precision ) / precision +"rad)"+
						transform;
					break;
			}
		}
	
		fx.origin && ( transform = fx.origin + transform );
	
		propertyHook && propertyHook.set ?
			propertyHook.set( elem, transform, +true ):
			elem.style[supportProperty] = transform;
	};
	
	/*
	 * Utility functions
	 */
	
	// turns a transform string into its "matrix(A,B,C,D,X,Y)" form (as an array, though)
	function matrix( transform ) {
		transform = transform.split(")");
		var
				trim = $.trim
			, i = -1
			// last element of the array is an empty string, get rid of it
			, l = transform.length -1
			, split, prop, val
			, prev = supportFloat32Array ? new Float32Array(6) : []
			, curr = supportFloat32Array ? new Float32Array(6) : []
			, rslt = supportFloat32Array ? new Float32Array(6) : [1,0,0,1,0,0]
			;
	
		prev[0] = prev[3] = rslt[0] = rslt[3] = 1;
		prev[1] = prev[2] = prev[4] = prev[5] = 0;
	
		// Loop through the transform properties, parse and multiply them
		while ( ++i < l ) {
			split = transform[i].split("(");
			prop = trim(split[0]);
			val = split[1];
			curr[0] = curr[3] = 1;
			curr[1] = curr[2] = curr[4] = curr[5] = 0;
	
			switch (prop) {
				case _translate+"X":
					curr[4] = parseInt(val, 10);
					break;
	
				case _translate+"Y":
					curr[5] = parseInt(val, 10);
					break;
	
				case _translate:
					val = val.split(",");
					curr[4] = parseInt(val[0], 10);
					curr[5] = parseInt(val[1] || 0, 10);
					break;
	
				case _rotate:
					val = toRadian(val);
					curr[0] = Math.cos(val);
					curr[1] = Math.sin(val);
					curr[2] = -Math.sin(val);
					curr[3] = Math.cos(val);
					break;
	
				case _scale+"X":
					curr[0] = +val;
					break;
	
				case _scale+"Y":
					curr[3] = val;
					break;
	
				case _scale:
					val = val.split(",");
					curr[0] = val[0];
					curr[3] = val.length>1 ? val[1] : val[0];
					break;
	
				case _skew+"X":
					curr[2] = Math.tan(toRadian(val));
					break;
	
				case _skew+"Y":
					curr[1] = Math.tan(toRadian(val));
					break;
	
				case _matrix:
					val = val.split(",");
					curr[0] = val[0];
					curr[1] = val[1];
					curr[2] = val[2];
					curr[3] = val[3];
					curr[4] = parseInt(val[4], 10);
					curr[5] = parseInt(val[5], 10);
					break;
			}
	
			// Matrix product (array in column-major order)
			rslt[0] = prev[0] * curr[0] + prev[2] * curr[1];
			rslt[1] = prev[1] * curr[0] + prev[3] * curr[1];
			rslt[2] = prev[0] * curr[2] + prev[2] * curr[3];
			rslt[3] = prev[1] * curr[2] + prev[3] * curr[3];
			rslt[4] = prev[0] * curr[4] + prev[2] * curr[5] + prev[4];
			rslt[5] = prev[1] * curr[4] + prev[3] * curr[5] + prev[5];
	
			prev = [rslt[0],rslt[1],rslt[2],rslt[3],rslt[4],rslt[5]];
		}
		return rslt;
	}
	
	// turns a matrix into its rotate, scale and skew components
	// algorithm from http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp
	function unmatrix(matrix) {
		var
				scaleX
			, scaleY
			, skew
			, A = matrix[0]
			, B = matrix[1]
			, C = matrix[2]
			, D = matrix[3]
			;
	
		// Make sure matrix is not singular
		if ( A * D - B * C ) {
			// step (3)
			scaleX = Math.sqrt( A * A + B * B );
			A /= scaleX;
			B /= scaleX;
			// step (4)
			skew = A * C + B * D;
			C -= A * skew;
			D -= B * skew;
			// step (5)
			scaleY = Math.sqrt( C * C + D * D );
			C /= scaleY;
			D /= scaleY;
			skew /= scaleY;
			// step (6)
			if ( A * D < B * C ) {
				A = -A;
				B = -B;
				skew = -skew;
				scaleX = -scaleX;
			}
	
		// matrix is singular and cannot be interpolated
		} else {
			// In this case the elem shouldn't be rendered, hence scale == 0
			scaleX = scaleY = skew = 0;
		}
	
		// The recomposition order is very important
		// see http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp#l971
		return [
			[_translate, [+matrix[4], +matrix[5]]],
			[_rotate, Math.atan2(B, A)],
			[_skew + "X", Math.atan(skew)],
			[_scale, [scaleX, scaleY]]
		];
	}
	
	// build the list of transform functions to interpolate
	// use the algorithm described at http://dev.w3.org/csswg/css3-2d-transforms/#animation
	function interpolationList( start, end ) {
		var list = {
				start: [],
				end: []
			},
			i = -1, l,
			currStart, currEnd, currType;
	
		// get rid of affine transform matrix
		( start == "none" || isAffine( start ) ) && ( start = "" );
		( end == "none" || isAffine( end ) ) && ( end = "" );
	
		// if end starts with the current computed style, this is a relative animation
		// store computed style as the origin, remove it from start and end
		if ( start && end && !end.indexOf("matrix") && toArray( start ).join() == toArray( end.split(")")[0] ).join() ) {
			list.origin = start;
			start = "";
			end = end.slice( end.indexOf(")") +1 );
		}
	
		if ( !start && !end ) { return; }
	
		// start or end are affine, or list of transform functions are identical
		// => functions will be interpolated individually
		if ( !start || !end || functionList(start) == functionList(end) ) {
	
			start && ( start = start.split(")") ) && ( l = start.length );
			end && ( end = end.split(")") ) && ( l = end.length );
	
			while ( ++i < l-1 ) {
				start[i] && ( currStart = start[i].split("(") );
				end[i] && ( currEnd = end[i].split("(") );
				currType = $.trim( ( currStart || currEnd )[0] );
	
				append( list.start, parseFunction( currType, currStart ? currStart[1] : 0 ) );
				append( list.end, parseFunction( currType, currEnd ? currEnd[1] : 0 ) );
			}
	
		// otherwise, functions will be composed to a single matrix
		} else {
			list.start = unmatrix(matrix(start));
			list.end = unmatrix(matrix(end))
		}
	
		return list;
	}
	
	function parseFunction( type, value ) {
		var
			// default value is 1 for scale, 0 otherwise
			defaultValue = +(!type.indexOf(_scale)),
			scaleX,
			// remove X/Y from scaleX/Y & translateX/Y, not from skew
			cat = type.replace( /e[XY]/, "e" );
	
		switch ( type ) {
			case _translate+"Y":
			case _scale+"Y":
	
				value = [
					defaultValue,
					value ?
						parseFloat( value ):
						defaultValue
				];
				break;
	
			case _translate+"X":
			case _translate:
			case _scale+"X":
				scaleX = 1;
			case _scale:
	
				value = value ?
					( value = value.split(",") ) &&	[
						parseFloat( value[0] ),
						parseFloat( value.length>1 ? value[1] : type == _scale ? scaleX || value[0] : defaultValue+"" )
					]:
					[defaultValue, defaultValue];
				break;
	
			case _skew+"X":
			case _skew+"Y":
			case _rotate:
				value = value ? toRadian( value ) : 0;
				break;
	
			case _matrix:
				return unmatrix( value ? toArray(value) : [1,0,0,1,0,0] );
				break;
		}
	
		return [[ cat, value ]];
	}
	
	function isAffine( matrix ) {
		return rAffine.test(matrix);
	}
	
	function functionList( transform ) {
		return transform.replace(/(?:\([^)]*\))|\s/g, "");
	}
	
	function append( arr1, arr2, value ) {
		while ( value = arr2.shift() ) {
			arr1.push( value );
		}
	}
	
	// converts an angle string in any unit to a radian Float
	function toRadian(value) {
		return ~value.indexOf("deg") ?
			parseInt(value,10) * (Math.PI * 2 / 360):
			~value.indexOf("grad") ?
				parseInt(value,10) * (Math.PI/200):
				parseFloat(value);
	}
	
	// Converts "matrix(A,B,C,D,X,Y)" to [A,B,C,D,X,Y]
	function toArray(matrix) {
		// remove the unit of X and Y for Firefox
		matrix = /([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(matrix);
		return [matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6]];
	}
	
	$.transform = {
		centerOrigin: "margin"
	};
	
	})( jQuery, window, document, Math );


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ScrollView - jQuery plugin 0.1
	 *
	 * This plugin supplies contents view by grab and drag scroll.
	 *
	 * Copyright (c) 2009 Toshimitsu Takahashi
	 *
	 * Released under the MIT license.
	 *
	 * == Usage =======================
	 *   // apply to block element.
	 *   $("#map").scrollview();
	 *   
	 *   // with setting grab and drag icon urls.
	 *   //   grab: the cursor when mouse button is up.
	 *   //   grabbing: the cursor when mouse button is down.
	 *   //
	 *   $("#map".scrollview({
	 *     grab : "images/openhand.cur",
	 *     grabbing : "images/closedhand.cur"
	 *   });
	 * ================================
	 */
	(function() {
	    function ScrollView(){ this.initialize.apply(this, arguments) }
	    ScrollView.prototype = {
	        initialize: function(container, config){
	                // setting cursor.
	                var gecko = navigator.userAgent.indexOf("Gecko/") != -1;
	                var opera = navigator.userAgent.indexOf("Opera/") != -1;
	                var mac = navigator.userAgent.indexOf("Mac OS") != -1;
	                if (opera) {
	                    this.grab = "default";
	                    this.grabbing = "move";
	                } else if (!(mac && gecko) && config) {
	                    if (config.grab) {
	                       this.grab = "url(\"" + config.grab + "\"),default";
	                    }
	                    if (config.grabbing) {
	                       this.grabbing = "url(" + config.grabbing + "),move";
	                    }
	                } else if (gecko) {
	                    this.grab = "-moz-grab";
	                    this.grabbing = "-moz-grabbing";
	                } else {
	                    this.grab = "default";
	                    this.grabbing = "move";
	                }
	                
	                // Get container and image.
	                this.m = $(container);
	                this.i = this.m.children().css("cursor", this.grab);
	                
	                this.isgrabbing = false;
	                
	                // Set mouse events.
	                var self = this;
	                this.i.mousedown(function(e){
	                  // todo: make the first condition an option and submit a patch when it's done
	                        if (e.target != $("svg", $(container))[0]) {
	                          return false;
	                        }
	                        self.startgrab();
	                        this.xp = e.pageX;
	                        this.yp = e.pageY;
	                        return false;
	                }).mousemove(function(e){
	                        if (!self.isgrabbing) return true;
	                        self.scrollTo(this.xp - e.pageX, this.yp - e.pageY);
	                        this.xp = e.pageX;
	                        this.yp = e.pageY;
	                        return false;
	                })
	                .mouseout(function(){ self.stopgrab() })
	                .mouseup(function(){ self.stopgrab() });
	                
	                this.centering();
	        },
	        centering: function(){
	                var _m = this.m;
	                var w = this.i.width() - _m.width();
	                var h = this.i.height() - _m.height();
	                _m.scrollLeft(w / 2).scrollTop(h / 2);
	        },
	        startgrab: function(){
	                this.isgrabbing = true;
	                this.i.css("cursor", this.grabbing);
	        },
	        stopgrab: function(){
	                this.isgrabbing = false;
	                this.i.css("cursor", this.grab);
	        },
	        scrollTo: function(dx, dy){
	                var _m = this.m;
	                var x = _m.scrollLeft() + dx;
	                var y = _m.scrollTop() + dy;
	                _m.scrollLeft(x).scrollTop(y);
	        }
	    };
	    
	    jQuery.fn.scrollview = function(config){
	        return this.each(function(){
	            new ScrollView(this, config);
	        });
	    };
	})(jQuery);


/***/ },
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, ConnectionView, _,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	__webpack_require__(1);
	
	
	/* Connection View */
	
	ConnectionView = (function(superClass) {
	  extend(ConnectionView, superClass);
	
	  function ConnectionView() {
	    return ConnectionView.__super__.constructor.apply(this, arguments);
	  }
	
	  ConnectionView.prototype.initialize = function(options) {
	    ConnectionView.__super__.initialize.apply(this, arguments);
	    this.container = $("#graph");
	    this.line = ThreeNodes.UI.UIView.svg.path().attr({
	      stroke: "#555",
	      fill: "none"
	    });
	    this.el = this.line.node;
	    this.model.bind("render", (function(_this) {
	      return function() {
	        return _this.render();
	      };
	    })(this));
	    this.model.bind("destroy", (function(_this) {
	      return function() {
	        return _this.remove();
	      };
	    })(this));
	    return this.render();
	  };
	
	  ConnectionView.prototype.remove = function() {
	    if (ThreeNodes.UI.UIView.svg && this.line) {
	      this.line.remove();
	      delete this.line;
	    }
	    return true;
	  };
	
	  ConnectionView.prototype.render = function() {
	    if (ThreeNodes.UI.UIView.svg && this.line && this.line.attrs) {
	      this.line.attr({
	        path: this.getPath()
	      });
	    }
	    return this;
	  };
	
	  ConnectionView.prototype.getFieldPosition = function(field) {
	    var diff, o1;
	    if (!field.button) {
	      console.log("no button");
	      console.log(field);
	      return {
	        left: 0,
	        top: 0
	      };
	    }
	    o1 = $(".inner-field span", field.button).offset();
	    if (!o1) {
	      console.log("no o1");
	      return {
	        left: 0,
	        top: 0
	      };
	    }
	    diff = 3;
	    o1.top += diff;
	    o1.left += diff;
	    return o1;
	  };
	
	  ConnectionView.prototype.getPath = function() {
	    var diffx, diffy, f1, f2, min_diff, offset, ofx, ofy, x1, x2, x3, x4, y1, y2, y3, y4;
	    f1 = this.getFieldPosition(this.model.from_field);
	    f2 = this.getFieldPosition(this.model.to_field);
	    offset = $("#container-wrapper").offset();
	    ofx = $("#container-wrapper").scrollLeft() - offset.left;
	    ofy = $("#container-wrapper").scrollTop() - offset.top;
	    x1 = f1.left + ofx;
	    y1 = f1.top + ofy;
	    x4 = f2.left + ofx;
	    y4 = f2.top + ofy;
	    min_diff = 42;
	    diffx = Math.max(min_diff, x4 - x1);
	    diffy = Math.max(min_diff, y4 - y1);
	    x2 = x1 + diffx * 0.5;
	    y2 = y1;
	    x3 = x4 - diffx * 0.5;
	    y3 = y4;
	    return ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
	  };
	
	  return ConnectionView;
	
	})(Backbone.View);
	
	module.exports = ConnectionView;


/***/ },
/* 57 */,
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, CodeExporter, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	CodeExporter = (function() {
	  function CodeExporter() {
	    this.nodeToCode = bind(this.nodeToCode, this);
	    this.toCode = bind(this.toCode, this);
	  }
	
	  CodeExporter.prototype.toCode = function(json) {
	    var connection, i, j, len, len1, node, ref, ref1, res;
	    res = "//\n";
	    res += "// code exported from ThreeNodes.js (github.com/idflood/ThreeNodes.js)\n";
	    res += "//\n\n";
	    res += "require.config({paths: {jQuery: 'loaders/jquery-loader',Underscore: 'loaders/Underscore-loader',Backbone: 'loaders/backbone-loader'}});";
	    res += "require(['threenodes/App', 'libs/jquery-1.6.4.min', 'libs/Underscore-min', 'libs/backbone'], function(App) {";
	    res += "\n\n";
	    res += '"use strict";\n';
	    res += "var app = new App();\n";
	    res += "var nodes = app.nodes;\n\n";
	    res += "//\n";
	    res += "// nodes\n";
	    res += "//\n";
	    ref = json.nodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      res += this.nodeToCode(node);
	    }
	    res += "\n";
	    res += "//\n";
	    res += "// connections\n";
	    res += "//\n\n";
	    ref1 = json.connections;
	    for (j = 0, len1 = ref1.length; j < len1; j++) {
	      connection = ref1[j];
	      res += this.connectionToCode(connection);
	    }
	    res += "\n\n";
	    res += "// set player mode\n";
	    res += "app.setDisplayMode('SetDisplayModeCommand', true);\n";
	    res += "});";
	    return res;
	  };
	
	  CodeExporter.prototype.nodeToCode = function(node) {
	    var anim_to_code, fields_to_code, res;
	    anim_to_code = function(anims) {
	      var anim, i, len, propName, ref, res;
	      res = "{\n";
	      for (propName in anims) {
	        res += "\t\t" + ("'" + propName + "' : [\n");
	        ref = anims[propName];
	        for (i = 0, len = ref.length; i < len; i++) {
	          anim = ref[i];
	          res += "\t\t\t" + ("{time: " + anim.time + ", value: " + anim.value + ", easing: '" + anim.easing + "'},\n");
	        }
	        res += "\t\t" + "],\n";
	      }
	      res += "\t}";
	      return res;
	    };
	    fields_to_code = function(fields) {
	      var field, i, len, ref, res;
	      res = "{'in': [\n";
	      ref = fields["in"];
	      for (i = 0, len = ref.length; i < len; i++) {
	        field = ref[i];
	        if (field.val) {
	          res += "\t\t{name: '" + field.name + "', val: " + field.val + "},\n";
	        } else {
	          res += "\t\t{name: '" + field.name + "'},\n";
	        }
	      }
	      res += "\t]}";
	      return res;
	    };
	    res = "\n// node: " + node.name + "\n";
	    res += "var node_" + node.nid + "_data = {\n";
	    res += "\t" + ("nid: " + node.nid + ",\n");
	    res += "\t" + ("name: '" + node.name + "',\n");
	    res += "\t" + ("type: '" + node.type + "',\n");
	    res += "\t" + ("x: " + node.x + ",\n");
	    res += "\t" + ("y: " + node.y + ",\n");
	    res += "\t" + ("fields: " + (fields_to_code(node.fields)) + ",\n");
	    res += "\t" + ("anim: " + (anim_to_code(node.anim)) + "\n");
	    res += "};\n";
	    res += "var node_" + node.nid + " = nodes.createNode(node_" + node.nid + "_data);\n";
	    return res;
	  };
	
	  CodeExporter.prototype.connectionToCode = function(connection) {
	    var res;
	    res = "var connection_" + connection.id + "_data = {\n";
	    res += "\t" + ("id: " + connection.id + ",\n");
	    res += "\t" + ("from_node: " + connection.from_node + ", from: '" + connection.from + "',\n");
	    res += "\t" + ("to_node: " + connection.to_node + ", to: '" + connection.to + "'\n");
	    res += "};\n";
	    res += "var connection_" + connection.id + " = nodes.createConnectionFromObject(connection_" + connection.id + "_data);\n";
	    return res;
	  };
	
	  return CodeExporter;
	
	})();
	
	module.exports = CodeExporter;


/***/ },
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Provides requestAnimationFrame in a cross browser way.
	 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	 */
	
	if ( !window.requestAnimationFrame ) {
	
		window.requestAnimationFrame = ( function() {
	
			return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
	
				window.setTimeout( callback, 1000 / 60 );
	
			};
	
		} )();
	
	}


/***/ },
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
/* 72 */,
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class='head'><span><%= get(\"name\") %></span></div>\n<div class='options'>\n  <div class='inputs'></div>\n  <div class='center'></div>\n  <div class='outputs'></div>\n</div>\n";

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ul id=\"node-context-menu\" class=\"context-menu\">\n  <li><a href=\"#remove_node\">Remove node</a></li>\n</ul>";

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div id='container-wrapper' class=\"ui-layout-center\">\n  <div id='container'>\n    <div id='graph'></div>\n  </div>\n  <div id=\"breadcrumb\"></div>\n</div>\n<div id='sidebar' class=\"ui-layout-west\">\n  <ul class=\"ui-layout-north\">\n    <li><a href='#tab-new'>New</a></li>\n    <li><a href='#tab-attribute'>Attributes</a></li>\n    <li><a href='#tab-list'>List</a></li>\n  </ul>\n  <div class=\"container ui-layout-center\">\n    <div id='tab-attribute'></div>\n    <div id='tab-new'>\n      <input id='node_filter' name='search-node' placeholder='Search' type='input' />\n    </div>\n    <div id='tab-list'></div>\n  </div>\n</div>\n<div id=\"library\" class=\"ui-layout-east\"></div>\n<div id=\"timeline\" class=\"ui-layout-south\"></div>\n<input id='main_file_input_open' multiple='false' type='file' />\n";

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class='definition definition-<%= get(\"name\") %>'>\n  <div class='head'><span><%= get(\"name\") %></span></div>\n  <div class='options'>\n    <a href='#' class='edit'>edit</a>\n    <a href='#' class='remove'>remove</a>\n  </div>\n</div>";

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div id=\"confirm-groupdefinition-delete\" title=\"This will remove any existing group node using this group definition\">\n  <p class=\"found-items\"></p>\n  <p>Are you sure?</p>\n</div>\n";

/***/ },
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ul id=\"main-menu-bar\" class=\"menubar ui-layout-north\">\n  <li>\n    <a href=\"#File\">File</a>\n    <ul>\n      <li><a href=\"#NewFile\" data-event=\"ClearWorkspace\">New</a></li>\n      <li><a href=\"#OpenFile\" data-event=\"OpenFile\">Open</a></li>\n      <li><a href=\"#SaveFile\" data-event=\"SaveFile\">Save</a></li>\n      <li><a href=\"#ExportCode\" data-event=\"ExportCode\">Export to code</a></li>\n      <li><a href=\"#ExportImage\" data-event=\"ExportImage\" data-eventData=\"exported-image.png\">Export image</a></li>\n    </ul>\n  </li>\n  <li>\n    <a href=\"#Edit\">Edit</a>\n    <ul>\n      <li><a href=\"#GroupSelectedNodes\" data-event=\"GroupSelectedNodes\">Group selected nodes</a></li>\n      <li><a href=\"#RemoveSelectedNodes\" data-event=\"RemoveSelectedNodes\">Remove selected node(s)</a></li>\n      <li><a href=\"#RebuildAllShaders\" data-event=\"RebuildAllShaders\">Rebuild all shaders</a></li>\n    </ul>\n  </li>\n  <li>\n    <a href=\"#View\">View</a>\n    <ul>\n      <li><a href=\"#Attributes\" data-event=\"ToggleAttributes\">Attributes</a></li>\n      <li><a href=\"#Library\" data-event=\"ToggleLibrary\">Library</a></li>\n      <li><a href=\"#Timeline\" data-event=\"ToggleTimeline\">Timeline</a></li>\n    </ul>\n  </li>\n  <li class=\"expanded\">\n    <a href=\"#examples\">Examples</a>\n    <ul>\n      <li><a href=\"#example/rotating_cube1.json\">Simple cube</a></li>\n      <li><a href=\"#example/geometry_and_material1.json\">Geometry & materials</a></li>\n      <li><a href=\"#example/postprocessing1.json\">Postprocessing</a></li>\n      <li><a href=\"#example/particle1.json\">Particles</a></li>\n      <li><a href=\"#example/particle2.json\">Sparks particle and Mouse</a></li>\n      <li><a href=\"#example/spreads1.json\">Spreads</a></li>\n      <li><a href=\"#example/texture1.json\">Texture</a></li>\n      <li><a href=\"#example/text1.json\">Text</a></li>\n      <li><a href=\"#example/collada1.json\">Collada model</a></li>\n      <li><a href=\"#example/sound1.json\">Sound input</a></li>\n    </ul>\n  </li>\n  <li class=\"expanded\">\n    <a href=\"#about\">About</a>\n    <ul>\n      <li><a href=\"https://github.com/idflood/ThreeNodes.js\" target=\"_blank\">Github page</a></li>\n    </ul>\n  </li>\n</ul>\n";

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * jQuery UI Menubar @VERSION
	 * http://jqueryui.com
	 *
	 * Copyright 2013 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/menubar/
	 *
	 * Depends:
	 *  jquery.ui.core.js
	 *  jquery.ui.widget.js
	 *  jquery.ui.position.js
	 *  jquery.ui.menu.js
	 */
	(function( $ ) {
	
	$.widget( "ui.menubar", {
	  version: "@VERSION",
	  options: {
	    items: "li",
	    menus: "ul",
	    icons: {
	      dropdown: "ui-icon-triangle-1-s"
	    },
	    position: {
	      my: "left top",
	      at: "left bottom"
	    },
	
	    // callbacks
	    select: null
	  },
	
	  _create: function() {
	    // Top-level elements containing the submenu-triggering elem
	    this.menuItems = this.element.children( this.options.items );
	
	    // Links or buttons in menuItems, triggers of the submenus
	    this.items = this.menuItems.children( "button, a" );
	
	    // Keep track of open submenus
	    this.openSubmenus = 0;
	
	    this._initializeWidget();
	    this._initializeMenuItems();
	    this._initializeItems();
	  },
	
	  _initializeWidget: function() {
	    this.element
	      .addClass( "ui-menubar ui-widget-header ui-helper-clearfix" )
	      .attr( "role", "menubar" );
	    this._on({
	      keydown: function( event ) {
	        var active;
	
	        // If we are in a nested sub-sub-menu and we see an ESCAPE
	        // we must close recursively.
	        if ( event.keyCode === $.ui.keyCode.ESCAPE &&
	            this.active &&
	            this.active.menu( "collapse", event ) !== true ) {
	          active = this.active;
	          this.active.blur();
	          this._close( event );
	          $( event.target ).blur().mouseleave();
	          active.prev().focus();
	        }
	      },
	      focusin: function() {
	        clearTimeout( this.closeTimer );
	      },
	      focusout: function( event ) {
	        this.closeTimer = this._delay( function() {
	          this._close( event );
	          this.items.attr( "tabIndex", -1 );
	          this.lastFocused.attr( "tabIndex", 0 );
	        }, 150 );
	      },
	      "mouseenter .ui-menubar-item": function() {
	        clearTimeout( this.closeTimer );
	      }
	    } );
	  },
	
	  _initializeMenuItems: function() {
	    var subMenus,
	      menubar = this;
	
	    this.menuItems
	      .addClass( "ui-menubar-item" )
	      .attr( "role", "presentation" )
	      // TODO why do these not work when moved to CSS?
	      .css({
	        "border-width": "1px",
	        "border-style": "hidden"
	      });
	
	    subMenus = this.menuItems.children( menubar.options.menus ).menu({
	      position: {
	        within: this.options.position.within
	      },
	      select: function( event, ui ) {
	        // TODO don't hardcode markup selectors
	        ui.item.parents( "ul.ui-menu:last" ).hide();
	        menubar._close();
	        ui.item.parents( ".ui-menubar-item" ).children().first().focus();
	        menubar._trigger( "select", event, ui );
	      },
	      menus: this.options.menus
	    })
	      .hide()
	      .attr({
	        "aria-hidden": "true",
	        "aria-expanded": "false"
	      });
	
	    this._on( subMenus, {
	      keydown: function( event ) {
	        // TODO why is this needed?
	        $( event.target ).attr( "tabIndex", 0 );
	        var parentButton,
	          menu = $( this );
	        // TODO why are there keydown events on a hidden menu?
	        if ( menu.is( ":hidden" ) ) {
	          return;
	        }
	        switch ( event.keyCode ) {
	        case $.ui.keyCode.LEFT:
	          // TODO why can't this call menubar.previous()?
	          parentButton = menubar.active.prev( ".ui-button" );
	
	          if ( this.openSubmenus ) {
	            this.openSubmenus--;
	          } else if ( this._hasSubMenu( parentButton.parent().prev() ) ) {
	            menubar.active.blur();
	            menubar._open( event, parentButton.parent().prev().find( ".ui-menu" ) );
	          } else {
	            parentButton.parent().prev().find( ".ui-button" ).focus();
	            menubar._close( event );
	            this.open = true;
	          }
	
	          event.preventDefault();
	          // TODO same as above where it's set to 0
	          $( event.target ).attr( "tabIndex", -1 );
	          break;
	        case $.ui.keyCode.RIGHT:
	          this.next( event );
	          event.preventDefault();
	          break;
	        }
	      },
	      focusout: function( event ) {
	        // TODO why does this have to use event.target? Is that different from currentTarget?
	        $( event.target ).removeClass( "ui-state-focus" );
	      }
	    });
	
	    this.menuItems.each(function( index, menuItem ) {
	      menubar._identifyMenuItemsNeighbors( $( menuItem ), menubar, index );
	    });
	
	  },
	
	  _hasSubMenu: function( menuItem ) {
	    return $( menuItem ).children( this.options.menus ).length > 0;
	  },
	
	  // TODO get rid of these - currently still in use in _move
	  _identifyMenuItemsNeighbors: function( menuItem, menubar, index ) {
	    var collectionLength = this.menuItems.length,
	      isFirstElement = ( index === 0 ),
	      isLastElement = ( index === ( collectionLength - 1 ) );
	
	    if ( isFirstElement ) {
	      menuItem.data( "prevMenuItem", $( this.menuItems[collectionLength - 1]) );
	      menuItem.data( "nextMenuItem", $( this.menuItems[index+1]) );
	    } else if ( isLastElement ) {
	      menuItem.data( "nextMenuItem", $( this.menuItems[0]) );
	      menuItem.data( "prevMenuItem", $( this.menuItems[index-1]) );
	    } else {
	      menuItem.data( "nextMenuItem", $( this.menuItems[index+1]) );
	      menuItem.data( "prevMenuItem", $( this.menuItems[index-1]) );
	    }
	  },
	
	  _initializeItems: function() {
	    var menubar = this;
	
	    this._focusable( this.items );
	    this._hoverable( this.items );
	
	    // let only the first item receive focus
	    this.items.slice(1).attr( "tabIndex", -1 );
	
	    this.items.each(function( index, item ) {
	      menubar._initializeItem( $( item ), menubar );
	    });
	  },
	
	  _initializeItem: function( anItem ) {
	    var menuItemHasSubMenu = this._hasSubMenu( anItem.parent() );
	
	    anItem
	      .addClass( "ui-button ui-widget ui-button-text-only ui-menubar-link" )
	      .attr( "role", "menuitem" )
	      .wrapInner( "<span class='ui-button-text'></span>" );
	
	    this._on( anItem, {
	      focus:  function( event ){
	        anItem.attr( "tabIndex", 0 );
	        anItem.addClass( "ui-state-focus" );
	        event.preventDefault();
	      },
	      focusout:  function( event ){
	        anItem.attr( "tabIndex", -1 );
	        this.lastFocused = anItem;
	        anItem.removeClass( "ui-state-focus" );
	        event.preventDefault();
	      }
	    } );
	
	    if ( menuItemHasSubMenu ) {
	      this._on( anItem, {
	        click: this._mouseBehaviorForMenuItemWithSubmenu,
	        focus: this._mouseBehaviorForMenuItemWithSubmenu,
	        mouseenter: this._mouseBehaviorForMenuItemWithSubmenu
	      });
	
	      this._on( anItem, {
	        keydown: function( event ) {
	          switch ( event.keyCode ) {
	          case $.ui.keyCode.SPACE:
	          case $.ui.keyCode.UP:
	          case $.ui.keyCode.DOWN:
	            this._open( event, $( event.target ).next() );
	            event.preventDefault();
	            break;
	          case $.ui.keyCode.LEFT:
	            this.previous( event );
	            event.preventDefault();
	            break;
	          case $.ui.keyCode.RIGHT:
	            this.next( event );
	            event.preventDefault();
	            break;
	          case $.ui.keyCode.TAB:
	            break;
	          }
	        }
	      });
	
	      anItem.attr( "aria-haspopup", "true" );
	      if ( this.options.icons ) {
	        anItem.append( "<span class='ui-button-icon-secondary ui-icon " + this.options.icons.dropdown + "'></span>" );
	        anItem.removeClass( "ui-button-text-only" ).addClass( "ui-button-text-icon-secondary" );
	      }
	    } else {
	      this._on( anItem, {
	        click: function() {
	          if ( this.active ) {
	            this._close();
	          } else {
	            this.open = true;
	            this.active = $( anItem ).parent();
	          }
	        },
	        mouseenter: function() {
	          if ( this.open ) {
	            this.stashedOpenMenu = this.active;
	            this._close();
	          }
	        },
	        keydown: function( event ) {
	          if ( event.keyCode === $.ui.keyCode.LEFT ) {
	            this.previous( event );
	            event.preventDefault();
	          } else if ( event.keyCode === $.ui.keyCode.RIGHT ) {
	            this.next( event );
	            event.preventDefault();
	          }
	        }
	      });
	    }
	  },
	
	  // TODO silly name, too much complexity
	  // TODO why is this used for three types of events?
	  _mouseBehaviorForMenuItemWithSubmenu: function( event ) {
	    var isClickingToCloseOpenMenu, menu;
	
	    // ignore triggered focus event
	    if ( event.type === "focus" && !event.originalEvent ) {
	      return;
	    }
	    event.preventDefault();
	
	    menu = $(event.target).parents( ".ui-menubar-item" ).children( this.options.menus );
	
	    // If we have an open menu and we see a click on the menuItem
	    // and the menu thereunder is the same as the active menu, close it.
	    // Succinctly: toggle menu open / closed  on the menuItem
	    isClickingToCloseOpenMenu = event.type === "click" &&
	      menu.is( ":visible" ) &&
	      this.active &&
	      this.active[0] === menu[0];
	
	    if ( isClickingToCloseOpenMenu ) {
	      this._close();
	      return;
	    }
	    if ( event.type === "mouseenter" ) {
	      this.element.find( ":focus" ).focusout();
	      if ( this.stashedOpenMenu ) {
	        this._open( event, menu);
	      }
	      this.stashedOpenMenu = undefined;
	    }
	    // If we already opened a menu and then changed to be "over" another MenuItem ||
	    // we clicked on a new menuItem (whether open or not) or if we auto expand (i.e.
	    // we expand regardless of click if there is a submenu
	    if ( ( this.open && event.type === "mouseenter" ) || event.type === "click" ) {
	      clearTimeout( this.closeTimer );
	      this._open( event, menu );
	      // Stop propagation so that menuItem mouseenter doesn't fire.  If it does it
	      // takes the "selected" status off off of the first element of the submenu.
	      event.stopPropagation();
	    }
	  },
	
	  _destroy : function() {
	    this.menuItems
	      .removeClass( "ui-menubar-item" )
	      .removeAttr( "role" )
	      .css({
	        "border-width": "",
	        "border-style": ""
	      });
	
	    this.element
	      .removeClass( "ui-menubar ui-widget-header ui-helper-clearfix" )
	      .removeAttr( "role" )
	      .unbind( ".menubar" );
	
	    this.items
	      .unbind( ".menubar" )
	      .removeClass( "ui-button ui-widget ui-button-text-only ui-menubar-link ui-state-default" )
	      .removeAttr( "role" )
	      .removeAttr( "aria-haspopup" )
	      .children( ".ui-icon" ).remove();
	
	    // TODO fix this
	    if ( false ) {
	      // Does not unwrap
	      this.items.children( "span.ui-button-text" ).unwrap();
	    } else {
	      // Does "unwrap"
	      this.items.children( "span.ui-button-text" ).each( function(){
	        var item = $( this );
	        item.parent().html( item.html() );
	      });
	    }
	
	    this.element.find( ":ui-menu" )
	      .menu( "destroy" )
	      .show()
	      .removeAttr( "aria-hidden" )
	      .removeAttr( "aria-expanded" )
	      .removeAttr( "tabindex" )
	      .unbind( ".menubar" );
	  },
	
	  _collapseActiveMenu: function() {
	    if ( !this.active.is( ":ui-menu" ) ) {
	      return;
	    }
	    this.active
	      .menu( "collapseAll" )
	      .hide()
	      .attr({
	        "aria-hidden": "true",
	        "aria-expanded": "false"
	      })
	      .closest( this.options.items ).removeClass( "ui-state-active" );
	  },
	
	  _close: function() {
	    if ( !this.active ) {
	      return;
	    }
	
	    this._collapseActiveMenu();
	
	    this.active = null;
	    this.open = false;
	    this.openSubmenus = 0;
	  },
	
	  _open: function( event, menu ) {
	    var menuItem = menu.closest( ".ui-menubar-item" );
	
	    if ( this.active && this.active.length &&
	        this._hasSubMenu( this.active.closest( this.options.items ) ) ) {
	          this._collapseActiveMenu();
	    }
	
	    menuItem.addClass( "ui-state-active" );
	    // workaround when clicking a non-menu item, then hovering a menu, then going back
	    // this way afterwards its still possible to tab back to a menubar, even if its
	    // the wrong item
	    // see also "click menu-less item, hover in and out of item with menu" test in menubar_core
	    if ( !this.lastFocused ) {
	      this.lastFocused = menu.prev();
	    }
	
	    this.active = menu
	      .show()
	      .position( $.extend({
	        of: menuItem
	      }, this.options.position ) )
	      .removeAttr( "aria-hidden" )
	      .attr( "aria-expanded", "true" )
	      .menu( "focus", event, menu.children( ".ui-menu-item" ).first()  )
	      .focus();
	
	    this.open = true;
	  },
	
	  next: function( event ) {
	    function shouldOpenNestedSubMenu() {
	      return this.active &&
	        this._hasSubMenu( this.active.closest( this.options.items ) ) &&
	        this.active.data( "uiMenu" ) &&
	        this.active.data( "uiMenu" ).active &&
	        this.active.data( "uiMenu" ).active.has( ".ui-menu" ).length;
	    }
	
	    if ( this.open ) {
	      if ( shouldOpenNestedSubMenu.call( this ) ) {
	        // Track number of open submenus and prevent moving to next menubar item
	        this.openSubmenus++;
	        return;
	      }
	    }
	    this.openSubmenus = 0;
	    this._move( "next", event );
	  },
	
	  previous: function( event ) {
	    if ( this.open && this.openSubmenus ) {
	      // Track number of open submenus and prevent moving to previous menubar item
	      this.openSubmenus--;
	      return;
	    }
	    this.openSubmenus = 0;
	    this._move( "prev", event );
	  },
	
	  _move: function( direction, event ) {
	    var closestMenuItem = $( event.target ).closest( ".ui-menubar-item" ),
	      nextMenuItem = closestMenuItem.data( direction + "MenuItem" ),
	      focusableTarget = nextMenuItem.find( ".ui-button" );
	
	    if ( this.open ) {
	      if ( this._hasSubMenu( nextMenuItem ) ) {
	        this._open( event, nextMenuItem.children( ".ui-menu" ) );
	      } else {
	        this._collapseActiveMenu();
	        nextMenuItem.find( ".ui-button" ).focus();
	        this.open = true;
	      }
	    } else {
	      closestMenuItem.find( ".ui-button" );
	      focusableTarget.focus();
	    }
	  }
	
	});
	
	}( jQuery ));


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, NodeSidebarView, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	
	/* NodeSidebarView */
	
	NodeSidebarView = (function(superClass) {
	  extend(NodeSidebarView, superClass);
	
	  function NodeSidebarView() {
	    this.render = bind(this.render, this);
	    this.displayFields = bind(this.displayFields, this);
	    return NodeSidebarView.__super__.constructor.apply(this, arguments);
	  }
	
	  NodeSidebarView.prototype.initialize = function(options) {
	    NodeSidebarView.__super__.initialize.apply(this, arguments);
	    return this.render();
	  };
	
	  NodeSidebarView.prototype.displayFields = function(fields) {
	    var f, field, results, view, view_class;
	    results = [];
	    for (f in fields) {
	      field = fields[f];
	      view_class = field.constructor.VIEW;
	      if (view_class !== false) {
	        view = new view_class({
	          model: field
	        });
	        results.push(this.$el.append(view.el));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };
	
	  NodeSidebarView.prototype.render = function() {
	    var $inputs_form, self;
	    this.$el.html("<h2>" + (this.model.get('name')) + "</h2>");
	    this.displayFields(this.model.fields.inputs);
	    if (this.model.onCodeUpdate) {
	      self = this;
	      this.$el.append("<h2>Add custom fields</h2>");
	      $inputs_form = $('<form class="dynamic-fields__form"></form>');
	      $inputs_form.append('<input type="text" name="key" placeholder="key" />');
	      $inputs_form.append('<input type="text" name="type" placeholder="type" />');
	      $inputs_form.append('<input type="submit" value="Add input field" />');
	      this.$el.append($inputs_form);
	      $inputs_form.on('submit', function(e) {
	        var $form, $key, $type, key, type;
	        e.preventDefault();
	        $form = $(this);
	        $key = $(this).find('[name="key"]');
	        $type = $(this).find('[name="type"]');
	        type = 'Any';
	        if ($.trim($type.val()) !== '') {
	          type = $.trim($type.val());
	        }
	        key = $.trim($key.val());
	        if (key !== '') {
	          self.model.addCustomField(key, type, 'inputs');
	          $key.val('');
	          $type.val('');
	          return self.render();
	        }
	      });
	    }
	    return this;
	  };
	
	  return NodeSidebarView;
	
	})(Backbone.View);
	
	module.exports = NodeSidebarView;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone, TreeView, _,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	_ = __webpack_require__(2);
	
	Backbone = __webpack_require__(3);
	
	__webpack_require__(1);
	
	TreeView = (function(superClass) {
	  extend(TreeView, superClass);
	
	  function TreeView() {
	    this.render = bind(this.render, this);
	    return TreeView.__super__.constructor.apply(this, arguments);
	  }
	
	  TreeView.prototype.initialize = function(options) {
	    TreeView.__super__.initialize.apply(this, arguments);
	    return this.timeoutId = false;
	  };
	
	  TreeView.prototype.render = function(nodelist) {
	    var data, i, len, nid, node, ref, renderNode, terminalNodes;
	    if (this.$el.data("tree")) {
	      this.$el.tree("destroy");
	    }
	    if (nodelist === false) {
	      this.$el.html("");
	      return this;
	    }
	    data = [];
	    terminalNodes = {};
	    ref = nodelist.models;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      if (node.hasOutConnection() === false) {
	        terminalNodes[node.attributes["nid"]] = node;
	      }
	    }
	    renderNode = (function(_this) {
	      return function(node) {
	        var j, len1, result, upnode, upstreamNodes;
	        result = {};
	        result.label = node.get("name");
	        result.model = node;
	        result.children = [];
	        upstreamNodes = node.getUpstreamNodes();
	        for (j = 0, len1 = upstreamNodes.length; j < len1; j++) {
	          upnode = upstreamNodes[j];
	          result.children.push(renderNode(upnode));
	        }
	        return result;
	      };
	    })(this);
	    for (nid in terminalNodes) {
	      data.push(renderNode(terminalNodes[nid]));
	    }
	    this.$el.tree({
	      data: data,
	      autoOpen: true,
	      selectable: true
	    });
	    this.$el.bind("tree.click", (function(_this) {
	      return function(e) {
	        var selectable;
	        node = e.node.model;
	        $(".node").removeClass("ui-selected");
	        node.trigger("node:addSelectedClass");
	        selectable = $("#container").data("selectable");
	        selectable.refresh();
	        return selectable._mouseStop(null);
	      };
	    })(this));
	    return this;
	  };
	
	  return TreeView;
	
	})(Backbone.View);
	
	module.exports = TreeView;


/***/ },
/* 89 */,
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

//# sourceMappingURL=ThreeNodes.UI.js.map