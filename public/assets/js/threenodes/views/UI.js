var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/field_context_menu.tmpl.html", "text!templates/node_context_menu.tmpl.html", "text!templates/app_ui.tmpl.html", 'order!threenodes/views/Sidebar', 'order!threenodes/views/MenuBar', "order!libs/three-extras/js/RequestAnimationFrame", "order!libs/raphael-min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", "order!libs/jquery.transform2d", "order!libs/jquery-scrollview/jquery.scrollview", "order!libs/jquery.layout-latest"], function($, _, Backbone, _view_field_context_menu, _view_node_context_menu, _view_app_ui) {
  "use strict";
  /* UI View
  */  return ThreeNodes.UI = (function(_super) {

    __extends(UI, _super);

    function UI() {
      this.animate = __bind(this.animate, this);
      this.on_ui_window_resize = __bind(this.on_ui_window_resize, this);
      this.render = __bind(this.render, this);
      this.show_application = __bind(this.show_application, this);
      this.init_context_menus = __bind(this.init_context_menus, this);
      this.init_resize_slider = __bind(this.init_resize_slider, this);
      this.init_bottom_toolbox = __bind(this.init_bottom_toolbox, this);
      this.init_display_mode_switch = __bind(this.init_display_mode_switch, this);
      this.switch_display_mode = __bind(this.switch_display_mode, this);
      this.scrollTo = __bind(this.scrollTo, this);
      this.stropgrab = __bind(this.stropgrab, this);
      this.setupMouseScroll = __bind(this.setupMouseScroll, this);
      this.setDisplayMode = __bind(this.setDisplayMode, this);
      this.initLayout = __bind(this.initLayout, this);
      this.initMenubar = __bind(this.initMenubar, this);
      this.clearWorkspace = __bind(this.clearWorkspace, this);
      this.initDrop = __bind(this.initDrop, this);
      this.onNodeListRebuild = __bind(this.onNodeListRebuild, this);
      UI.__super__.constructor.apply(this, arguments);
    }

    UI.prototype.initialize = function(options) {
      var ui_tmpl;
      UI.__super__.initialize.apply(this, arguments);
      this.is_grabbing = false;
      $(window).resize(this.on_ui_window_resize);
      ui_tmpl = _.template(_view_app_ui, {});
      this.$el.append(ui_tmpl);
      this.svg = Raphael("graph", 4000, 4000);
      ThreeNodes.svg = this.svg;
      ThreeNodes.svg_connecting_line = this.svg.path("M0 -20 L0 -20").attr({
        stroke: "#fff",
        'stroke-dasharray': "-",
        fill: "none",
        opacity: 0
      });
      this.sidebar = new ThreeNodes.Sidebar({
        el: $("#sidebar")
      });
      this.initMenubar();
      this.initLayout();
      this.initDrop();
      this.show_application();
      this.on_ui_window_resize();
      return this.animate();
    };

    UI.prototype.onNodeListRebuild = function(nodegraph) {
      var onTimeOut,
        _this = this;
      if (this.timeoutId) clearTimeout(this.timeoutId);
      onTimeOut = function() {
        return _this.sidebar.render(nodegraph);
      };
      return this.timeoutId = setTimeout(onTimeOut, 10);
    };

    UI.prototype.initDrop = function() {
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
          } else {
            nodename = ui.draggable.attr("rel");
            container = $("#sidebar");
          }
          dx = ui.position.left + $("#container-wrapper").scrollLeft() - offset.left - 10;
          dy = ui.position.top + $("#container-wrapper").scrollTop() - container.scrollTop() - offset.top;
          self.trigger("CreateNode", {
            type: nodename,
            x: dx,
            y: dy,
            definition: definition
          });
          return $("#sidebar").show();
        }
      });
      return this;
    };

    UI.prototype.clearWorkspace = function() {
      return this.sidebar.clearWorkspace();
    };

    UI.prototype.initMenubar = function() {
      var $menu_tmpl, menu_tmpl,
        _this = this;
      menu_tmpl = _.template(ThreeNodes.MenuBar.template, {});
      $menu_tmpl = $(menu_tmpl).prependTo("body");
      this.menubar = new ThreeNodes.MenuBar({
        el: $menu_tmpl
      });
      this.menubar.on("ToggleAttributes", function() {
        if (_this.layout) return _this.layout.toggle("west");
      });
      this.menubar.on("ToggleLibrary", function() {
        if (_this.layout) return _this.layout.toggle("east");
      });
      this.menubar.on("ToggleTimeline", function() {
        if (_this.layout) return _this.layout.toggle("south");
      });
      return this;
    };

    UI.prototype.initLayout = function() {
      var _this = this;
      this.makeSelectable();
      this.setupMouseScroll();
      this.init_context_menus();
      this.init_bottom_toolbox();
      this.init_display_mode_switch();
      this.layout = $('body').layout({
        scrollToBookmarkOnLoad: false,
        center: {
          size: "100%"
        },
        north: {
          closable: false,
          resizable: false,
          slidable: false,
          showOverflowOnHover: true,
          size: 24,
          resizerClass: "ui-layout-resizer-hidden",
          spacing_open: 0,
          spacing_closed: 0
        },
        east: {
          minSize: 220,
          initClosed: true
        },
        west: {
          minSize: 220
        },
        south: {
          minSize: 48,
          size: 48,
          onopen: function(name, pane_el, state, opt, layout_name) {
            _this.trigger("timelineResize", pane_el.innerHeight());
            return _this.on_ui_window_resize();
          },
          onclose: function(name, pane_el, state, opt, layout_name) {
            _this.trigger("timelineResize", pane_el.innerHeight());
            return _this.on_ui_window_resize();
          },
          onresize: function(name, pane_el, state, opt, layout_name) {
            _this.trigger("timelineResize", pane_el.innerHeight());
            return _this.on_ui_window_resize();
          }
        }
      });
      this.trigger("timelineResize", 48);
      return this;
    };

    UI.prototype.makeSelectable = function() {
      var _this = this;
      $("#container").selectable({
        filter: ".node",
        stop: function(event, ui) {
          var $selected, anims, nodes;
          $selected = $(".node.ui-selected");
          nodes = [];
          anims = [];
          $selected.each(function() {
            var ob;
            ob = $(this).data("object");
            ob.anim.objectTrack.name = ob.get("name");
            anims.push(ob.anim);
            return nodes.push(ob);
          });
          _this.sidebar.renderNodesAttributes(nodes);
          return _this.trigger("selectAnims", anims);
        }
      });
      return this;
    };

    UI.prototype.setDisplayMode = function(is_player) {
      if (is_player == null) is_player = false;
      if (is_player === true) {
        $("body").addClass("player-mode");
        $("body").removeClass("editor-mode");
        $("#display-mode-switch").html("editor mode");
      } else {
        $("body").addClass("editor-mode");
        $("body").removeClass("player-mode");
        $("#display-mode-switch").html("player mode");
      }
      ThreeNodes.settings.player_mode = is_player;
      if (is_player === false) this.trigger("renderConnections");
      return true;
    };

    UI.prototype.setupMouseScroll = function() {
      var is_from_target,
        _this = this;
      this.scroll_target = $("#container-wrapper");
      is_from_target = function(e) {
        if (e.target === $("#graph svg")[0]) return true;
        return false;
      };
      this.scroll_target.bind("contextmenu", function(e) {
        return false;
      });
      this.scroll_target.mousedown(function(e) {
        if (is_from_target(e)) {
          if (e.which === 2 || e.which === 3) {
            _this.is_grabbing = true;
            _this.xp = e.pageX;
            _this.yp = e.pageY;
            return false;
          }
        }
      });
      this.scroll_target.mousemove(function(e) {
        if (is_from_target(e)) {
          if (_this.is_grabbing === true) {
            _this.scrollTo(_this.xp - e.pageX, _this.yp - e.pageY);
            _this.xp = e.pageX;
            return _this.yp = e.pageY;
          }
        }
      });
      this.scroll_target.mouseout(function() {
        return _this.stropgrab();
      });
      this.scroll_target.mouseup(function(e) {
        if (is_from_target(e)) {
          if (e.which === 2 || e.which === 3) return _this.stropgrab();
        }
      });
      return true;
    };

    UI.prototype.stropgrab = function() {
      return this.is_grabbing = false;
    };

    UI.prototype.scrollTo = function(dx, dy) {
      var x, y;
      x = this.scroll_target.scrollLeft() + dx;
      y = this.scroll_target.scrollTop() + dy;
      return this.scroll_target.scrollLeft(x).scrollTop(y);
    };

    UI.prototype.switch_display_mode = function() {
      this.setDisplayMode(!ThreeNodes.settings.player_mode);
      return this;
    };

    UI.prototype.init_display_mode_switch = function() {
      var _this = this;
      $("body").append("<div id='display-mode-switch'>switch mode</div>");
      return $("#display-mode-switch").click(function(e) {
        return _this.switch_display_mode();
      });
    };

    UI.prototype.init_bottom_toolbox = function() {
      var $container;
      $("body").append("<div id='bottom-toolbox'></div>");
      $container = $("#bottom-toolbox");
      return this.init_resize_slider($container);
    };

    UI.prototype.init_resize_slider = function($container) {
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

    UI.prototype.init_context_menus = function() {
      var menu_field_menu, node_menu;
      menu_field_menu = _.template(_view_field_context_menu, {});
      $("body").append(menu_field_menu);
      node_menu = _.template(_view_node_context_menu, {});
      return $("body").append(node_menu);
    };

    UI.prototype.show_application = function() {
      var delay_intro;
      delay_intro = 500;
      $("body > header").delay(delay_intro).hide();
      $("#sidebar").delay(delay_intro).show();
      $("#container-wrapper").delay(delay_intro).show();
      return this.trigger("renderConnections");
    };

    UI.prototype.render = function() {
      return this.trigger("render");
    };

    UI.prototype.on_ui_window_resize = function() {
      var h, timelinesize, toolbox_pos, w;
      w = $(window).width();
      h = $(window).height();
      timelinesize = $("#timeline").innerHeight();
      toolbox_pos = timelinesize + 20;
      return $("#bottom-toolbox").attr("style", "bottom: " + toolbox_pos + "px !important;");
    };

    UI.prototype.animate = function() {
      this.render();
      return requestAnimationFrame(this.animate);
    };

    return UI;

  })(Backbone.View);
});
