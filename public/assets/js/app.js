(function() {
  var $, NodeBase, NodeConnection, NodeField, NodeFieldRack, NodeMaterialBase, NodeNumberSimple, add_window_resize_handler, animate, clear_workspace, field_click_1, field_context_menu, fields, flash_sound_value, flatArraysAreEquals, get_uid, init_app, init_context_menus, init_sidebar, init_sidebar_search, init_sidebar_tab_new_node, init_sidebar_tab_system, init_sidebar_tabs, init_sidebar_toggle, init_ui, init_websocket, load_local_file_input_changed, node_connections, node_context_menu, node_field_in_template, node_field_out_template, node_template, nodegraph, nodes, on_ui_window_resize, rebuild_all_shaders, remove_all_connections, remove_all_nodes, render, reset_global_variables, save_local_file, show_application, svg, uid, webgl_materials_node;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  uid = 0;
  get_uid = function() {
    return uid += 1;
  };
  flatArraysAreEquals = function(arr1, arr2) {
    var i, k, _len;
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (i = 0, _len = arr1.length; i < _len; i++) {
      k = arr1[i];
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };
  svg = false;
  init_ui = function() {
    svg = Raphael("graph", 4000, 4000);
    init_sidebar();
    add_window_resize_handler();
    init_context_menus();
    return show_application();
  };
  init_context_menus = function() {
    var menu_field_menu, node_menu;
    menu_field_menu = $.tmpl(field_context_menu, {});
    $("body").append(menu_field_menu);
    node_menu = $.tmpl(node_context_menu, {});
    return $("body").append(node_menu);
  };
  add_window_resize_handler = function() {
    $(window).resize(on_ui_window_resize);
    return on_ui_window_resize();
  };
  show_application = function() {
    var delay_intro;
    delay_intro = 500;
    $("body > header").delay(delay_intro).fadeOut(0);
    $("#sidebar").delay(delay_intro).fadeIn(0);
    $("#container-wrapper").delay(delay_intro).fadeIn(0);
    return $("#sidebar-toggle").delay(delay_intro).fadeIn(0);
  };
  render = function() {
    var k;
    nodegraph.render();
    if ($("#sound-input").length > 0) {
      try {
        k = document.sound_input.getKick();
        return console.log(k);
      } catch (e) {
        return console.log("empty");
      }
    }
  };
  on_ui_window_resize = function() {
    var h, w;
    w = $(window).width();
    h = $(window).height();
    $("#container-wrapper").css({
      width: w,
      height: h
    });
    return $("#sidebar").css("height", h);
  };
  animate = function() {
    render();
    return requestAnimationFrame(animate);
  };
  nodes = {};
  nodes.fields = {};
  nodes.list = [];
  nodes.types = {};
  nodes.types.Base = {};
  nodes.types.Math = {};
  nodes.types.Utils = {};
  nodes.types.Geometry = {};
  nodes.types.Three = {};
  nodes.types.Materials = {};
  nodes.types.Lights = {};
  fields = {};
  fields.types = {};
  webgl_materials_node = [];
  flash_sound_value = [];
  node_template = false;
  node_field_in_template = false;
  node_field_out_template = false;
  field_context_menu = false;
  node_context_menu = false;
  $ = false;
  init_app = function(_node_template, _node_field_in_template, _node_field_out_template, _field_context_menu, _node_context_menu) {
    $ = jQuery;
    node_template = _node_template;
    node_field_in_template = _node_field_in_template;
    node_field_out_template = _node_field_out_template;
    field_context_menu = _field_context_menu;
    node_context_menu = _node_context_menu;
    console.log("init...");
    init_ui();
    return animate();
  };
  require(["text!templates/node.tmpl.html", "text!templates/node_field_input.tmpl.html", "text!templates/node_field_output.tmpl.html", "text!templates/field_context_menu.tmpl.html", "text!templates/node_context_menu.tmpl.html", "order!libs/jquery-1.6.4.min", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min", "order!libs/colorpicker/js/colorpicker", "order!libs/Three", "order!libs/raphael-min", "order!libs/underscore-min", "order!libs/backbone", "libs/BlobBuilder.min", "libs/FileSaver.min", "libs/sockjs-latest.min", "libs/signals.min", "libs/RequestAnimationFrame"], init_app);
  init_websocket = function() {
    var socket, webso;
    webso = false;
    if (!WebSocket) {
      webso = MozWebsocket;
    } else {
      webso = WebSocket;
    }
    console.log("trying to open a websocket2");
    socket = new WebSocket("ws://localhost:8080/p5websocket");
    socket.onmessage = function(data) {
      console.log(data);
      return console.log("ok");
    };
    socket.onerror = function() {
      return console.log('socket close');
    };
    return true;
  };
  rebuild_all_shaders = function() {
    var n, _i, _len, _results;
    console.log("rebuilding shaders");
    console.log(webgl_materials_node);
    _results = [];
    for (_i = 0, _len = webgl_materials_node.length; _i < _len; _i++) {
      n = webgl_materials_node[_i];
      _results.push(n.ob.program = false);
    }
    return _results;
  };
  this.onSoundInput = function(data) {
    flash_sound_value = data.split('&');
    return flash_sound_value.pop();
  };
  node_connections = [];
  NodeConnection = (function() {
    function NodeConnection(from_field, to_field, cid) {
      this.from_field = from_field;
      this.to_field = to_field;
      this.cid = cid != null ? cid : get_uid();
      this.update_node_from = __bind(this.update_node_from, this);
      this.container = $("#graph");
      this.line = false;
      node_connections.push(this);
      this.from_field.add_connection(this);
      this.to_field.add_connection(this);
      this.update();
      this.render();
    }
    NodeConnection.prototype.get_path = function() {
      var diffx, diffy, f1, f2, min_diff, ofx, ofy, x1, x2, x3, x4, y1, y2, y3, y4;
      f1 = this.get_field_position(this.from_field);
      f2 = this.get_field_position(this.to_field);
      ofx = $("#container-wrapper").scrollLeft();
      ofy = $("#container-wrapper").scrollTop();
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
    NodeConnection.prototype.toXML = function() {
      return "\t\t<connection id='" + this.cid + "' from='" + this.from_field.fid + "' to='" + this.to_field.fid + "'/>\n";
    };
    NodeConnection.prototype.update = function() {
      return this.to_field.set(this.from_field.get());
    };
    NodeConnection.prototype.update_node_from = function() {
      return this.from_field.node.update();
    };
    NodeConnection.prototype.get_field_position = function(field) {
      var diff, o1;
      o1 = $("#fid-" + field.fid + " a").offset();
      diff = 3;
      o1.top += diff;
      o1.left += diff;
      if (o1.left === diff && o1.top === diff) {
        o1 = $("#nid-" + field.node.nid).offset();
        o1.top += $("#nid-" + field.node.nid).outerHeight() / 2 + 3;
        if (field.is_output === true) {
          o1.left += $("#nid-" + field.node.nid).outerWidth() - 2;
        }
      }
      return o1;
    };
    NodeConnection.prototype.remove = function() {
      var ind;
      this.from_field.remove_connection(this);
      this.to_field.remove_connection(this);
      this.line.remove();
      this.line = false;
      ind = node_connections.indexOf(this);
      if (ind !== -1) {
        node_connections.splice(ind, 1);
      }
      return false;
    };
    NodeConnection.prototype.render = function() {
      var color;
      if (this.line && this.line.attrs) {
        return this.line.attr({
          path: this.get_path()
        });
      } else {
        color = "#555";
        return this.line = svg.path(this.get_path()).attr({
          stroke: color,
          fill: "none"
        });
      }
    };
    return NodeConnection;
  })();
  NodeField = (function() {
    NodeField.connections = false;
    function NodeField(name, val, fid) {
      var self;
      this.name = name;
      this.val = val;
      this.fid = fid != null ? fid : get_uid();
      this.on_value_changed = __bind(this.on_value_changed, this);
      this.remove_connections = __bind(this.remove_connections, this);
      this.remove_connection = __bind(this.remove_connection, this);
      this.add_connection = __bind(this.add_connection, this);
      this.update_input_node = __bind(this.update_input_node, this);
      this.compute_value = __bind(this.compute_value, this);
      this.render_button = __bind(this.render_button, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.render_connections = __bind(this.render_connections, this);
      this.toXML = __bind(this.toXML, this);
      this.get = __bind(this.get, this);
      this.set = __bind(this.set, this);
      self = this;
      this.on_value_update_hooks = {};
      this.signal = new signals.Signal();
      this.node = false;
      this.is_output = false;
      this.connections = [];
      nodes.fields[this.fid] = this;
      this.on_value_changed(this.val);
    }
    NodeField.prototype.set = function(v) {
      var connection, hook, _i, _len, _ref;
      v = this.on_value_changed(v);
      for (hook in this.on_value_update_hooks) {
        this.on_value_update_hooks[hook](v);
      }
      if (this.is_output === true) {
        _ref = this.connections;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          connection = _ref[_i];
          connection.update();
        }
      }
      return true;
    };
    NodeField.prototype.get = function() {
      return this.val;
    };
    NodeField.prototype.toXML = function() {
      return "\t\t\t<field fid='" + this.fid + "' val='" + (this.get()) + "'/>\n";
    };
    NodeField.prototype.render_connections = function() {
      var connection, _i, _len, _ref;
      _ref = this.connections;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        connection = _ref[_i];
        connection.render();
      }
      return true;
    };
    NodeField.prototype.render_sidebar = function() {
      return false;
    };
    NodeField.prototype.render_button = function() {
      var layout;
      layout = node_field_in_template;
      if (this.is_output) {
        layout = node_field_out_template;
      }
      return $.tmpl(layout, this);
    };
    NodeField.prototype.compute_value = function(val) {
      return val;
    };
    NodeField.prototype.update_input_node = function() {
      var c, _i, _len, _ref;
      _ref = this.connections;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        c.update_node_from();
      }
      return true;
    };
    NodeField.prototype.add_connection = function(c) {
      if (this.connections.indexOf(c) === -1) {
        this.connections.push(c);
      }
      if (this.is_output === true) {
        this.node.add_out_connection(c, this);
      }
      return c;
    };
    NodeField.prototype.remove_connection = function(c) {
      var ind;
      this.node.remove_connection(c);
      ind = this.connections.indexOf(c);
      if (ind !== -1) {
        return this.connections.splice(ind, 1);
      }
    };
    NodeField.prototype.remove_connections = function() {
      while (this.connections.length > 0) {
        this.connections[0].remove();
      }
      return true;
    };
    NodeField.prototype.on_value_changed = function(val) {
      switch ($.type(val)) {
        case "array":
          this.val = _.map(val, function(n) {
            return this.compute_value(n);
          });
          break;
        default:
          this.val = this.compute_value(val);
      }
      return this.val;
    };
    return NodeField;
  })();
  fields.types.Any = (function() {
    __extends(Any, NodeField);
    function Any() {
      this.on_value_changed = __bind(this.on_value_changed, this);
      this.compute_value = __bind(this.compute_value, this);
      Any.__super__.constructor.apply(this, arguments);
    }
    Any.prototype.compute_value = function(val) {
      return val;
    };
    Any.prototype.on_value_changed = function(val) {
      return this.val = this.compute_value(val);
    };
    return Any;
  })();
  fields.types.Array = (function() {
    __extends(Array, NodeField);
    function Array() {
      this.on_value_changed = __bind(this.on_value_changed, this);
      this.compute_value = __bind(this.compute_value, this);
      Array.__super__.constructor.apply(this, arguments);
    }
    Array.prototype.compute_value = function(val) {
      if (!val ||  val === false) {
        return [];
      }
      if ($.type(val) === "array") {
        return val;
      } else {
        return [val];
      }
    };
    Array.prototype.on_value_changed = function(val) {
      return this.val = this.compute_value(val);
    };
    return Array;
  })();
  fields.types.Bool = (function() {
    __extends(Bool, NodeField);
    function Bool() {
      this.compute_value = __bind(this.compute_value, this);
      Bool.__super__.constructor.apply(this, arguments);
    }
    Bool.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "boolean":
          res = val;
          break;
        case "number":
          res = val !== 0;
          break;
        case "string":
          res = val === "1";
      }
      return res;
    };
    return Bool;
  })();
  fields.types.String = (function() {
    __extends(String, NodeField);
    function String() {
      this.compute_value = __bind(this.compute_value, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      String.__super__.constructor.apply(this, arguments);
    }
    String.prototype.render_sidebar = function() {
      var $cont, $target, f_in, self;
      self = this;
      $cont = $("#tab-attribute");
      $cont.append("<div id='side-field-" + this.fid + "'></div>");
      $target = $("#side-field-" + this.fid);
      $target.append("<h3>" + this.name + "</h3>");
      $target.append("<div><input type='text' id='side-field-txt-input-" + this.fid + "' /></div>");
      f_in = $("#side-field-txt-input-" + this.fid);
      this.on_value_update_hooks.update_sidebar_textfield = function(v) {
        return f_in.val(v.toString());
      };
      f_in.val(this.get());
      f_in.keypress(function(e) {
        if (e.which === 13) {
          self.set($(this).val());
          return $(this).blur();
        }
      });
      return false;
    };
    String.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "number":
          res = val.toString;
          break;
        case "string":
          res = val;
      }
      return res;
    };
    return String;
  })();
  fields.types.Float = (function() {
    __extends(Float, NodeField);
    function Float() {
      this.compute_value = __bind(this.compute_value, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      Float.__super__.constructor.apply(this, arguments);
    }
    Float.prototype.render_sidebar = function() {
      var $cont, $target, f_in, self;
      self = this;
      $cont = $("#tab-attribute");
      $cont.append("<div id='side-field-" + this.fid + "'></div>");
      $target = $("#side-field-" + this.fid);
      $target.append("<h3>" + this.name + "</h3>");
      $target.append("<div><input type='text' id='side-field-txt-input-" + this.fid + "' /></div>");
      f_in = $("#side-field-txt-input-" + this.fid);
      this.on_value_update_hooks.update_sidebar_textfield = function(v) {
        return f_in.val(v.toString().substring(0, 10));
      };
      f_in.val(this.get());
      f_in.keypress(function(e) {
        if (e.which === 13) {
          self.set($(this).val());
          return $(this).blur();
        }
      });
      return false;
    };
    Float.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "number":
          res = parseFloat(val);
          break;
        case "string":
          res = parseFloat(val);
      }
      return res;
    };
    return Float;
  })();
  fields.types.Vector2 = (function() {
    __extends(Vector2, NodeField);
    function Vector2() {
      this.compute_value = __bind(this.compute_value, this);
      Vector2.__super__.constructor.apply(this, arguments);
    }
    Vector2.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Vector2) {
            res = val;
          }
      }
      return res;
    };
    return Vector2;
  })();
  fields.types.Vector3 = (function() {
    __extends(Vector3, NodeField);
    function Vector3() {
      this.compute_value = __bind(this.compute_value, this);
      Vector3.__super__.constructor.apply(this, arguments);
    }
    Vector3.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Vector3) {
            res = val;
          }
      }
      return res;
    };
    return Vector3;
  })();
  fields.types.Vector4 = (function() {
    __extends(Vector4, NodeField);
    function Vector4() {
      this.compute_value = __bind(this.compute_value, this);
      Vector4.__super__.constructor.apply(this, arguments);
    }
    Vector4.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Vector4) {
            res = val;
          }
      }
      return res;
    };
    return Vector4;
  })();
  fields.types.Quaternion = (function() {
    __extends(Quaternion, NodeField);
    function Quaternion() {
      this.compute_value = __bind(this.compute_value, this);
      Quaternion.__super__.constructor.apply(this, arguments);
    }
    Quaternion.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Quaternion) {
            res = val;
          }
      }
      return res;
    };
    return Quaternion;
  })();
  fields.types.Color = (function() {
    __extends(Color, NodeField);
    function Color() {
      this.compute_value = __bind(this.compute_value, this);
      Color.__super__.constructor.apply(this, arguments);
    }
    Color.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Color) {
            res = val;
          }
      }
      return res;
    };
    return Color;
  })();
  fields.types.Object3D = (function() {
    __extends(Object3D, NodeField);
    function Object3D() {
      this.compute_value = __bind(this.compute_value, this);
      Object3D.__super__.constructor.apply(this, arguments);
    }
    Object3D.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Object3D || val instanceof THREE.Object3D) {
            res = val;
          }
      }
      return res;
    };
    return Object3D;
  })();
  fields.types.Scene = (function() {
    __extends(Scene, NodeField);
    function Scene() {
      this.compute_value = __bind(this.compute_value, this);
      Scene.__super__.constructor.apply(this, arguments);
    }
    Scene.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Scene) {
            res = val;
          }
      }
      return res;
    };
    return Scene;
  })();
  fields.types.Camera = (function() {
    __extends(Camera, NodeField);
    function Camera() {
      this.compute_value = __bind(this.compute_value, this);
      Camera.__super__.constructor.apply(this, arguments);
    }
    Camera.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Camera) {
            res = val;
          }
      }
      return res;
    };
    return Camera;
  })();
  fields.types.Mesh = (function() {
    __extends(Mesh, NodeField);
    function Mesh() {
      this.compute_value = __bind(this.compute_value, this);
      Mesh.__super__.constructor.apply(this, arguments);
    }
    Mesh.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Mesh || val instanceof THREE.Mesh) {
            res = val;
          }
      }
      return res;
    };
    return Mesh;
  })();
  fields.types.Geometry = (function() {
    __extends(Geometry, NodeField);
    function Geometry() {
      this.compute_value = __bind(this.compute_value, this);
      Geometry.__super__.constructor.apply(this, arguments);
    }
    Geometry.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Geometry || val instanceof THREE.Geometry) {
            res = val;
          }
      }
      return res;
    };
    return Geometry;
  })();
  fields.types.Texture = (function() {
    __extends(Texture, NodeField);
    function Texture() {
      this.compute_value = __bind(this.compute_value, this);
      Texture.__super__.constructor.apply(this, arguments);
    }
    Texture.prototype.compute_value = function(val) {
      var res;
      res = false;
      switch ($.type(val)) {
        case "object":
          if (val.constructor === THREE.Texture || val instanceof THREE.Texture) {
            res = val;
          }
      }
      return res;
    };
    return Texture;
  })();
  NodeFieldRack = (function() {
    function NodeFieldRack(node) {
      this.node = node;
      this.add_center_textfield = __bind(this.add_center_textfield, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.addFields = __bind(this.addFields, this);
      this.addOutput = __bind(this.addOutput, this);
      this.addInput = __bind(this.addInput, this);
      this.update_inputs = __bind(this.update_inputs, this);
      this.fromXML = __bind(this.fromXML, this);
      this.toXML = __bind(this.toXML, this);
      this.remove_all_connections = __bind(this.remove_all_connections, this);
      this.render_connections = __bind(this.render_connections, this);
      this.node_fields = {};
      this.node_fields.inputs = {};
      this.node_fields.outputs = {};
      this.node_fields_by_name = {};
      this.node_fields_by_name.inputs = {};
      this.node_fields_by_name.outputs = {};
    }
    NodeFieldRack.prototype.get = function(key, is_out) {
      if (is_out == null) {
        is_out = false;
      }
      if (is_out === true) {
        return this.node_fields_by_name.outputs[key];
      } else {
        return this.node_fields_by_name.inputs[key];
      }
    };
    NodeFieldRack.prototype.render_connections = function() {
      var f;
      for (f in this.node_fields.inputs) {
        this.node_fields.inputs[f].render_connections();
      }
      for (f in this.node_fields.outputs) {
        this.node_fields.outputs[f].render_connections();
      }
      return true;
    };
    NodeFieldRack.prototype.remove_all_connections = function() {
      var f, _results;
      for (f in this.node_fields.inputs) {
        this.node_fields.inputs[f].remove_connections();
      }
      _results = [];
      for (f in this.node_fields.outputs) {
        _results.push(this.node_fields.outputs[f].remove_connections());
      }
      return _results;
    };
    NodeFieldRack.prototype.toXML = function() {
      var f, res;
      res = "\t\t<in>\n";
      for (f in this.node_fields.inputs) {
        res += this.node_fields.inputs[f].toXML();
      }
      res += "\t\t</in>\n";
      res += "\t\t<out>\n";
      for (f in this.node_fields.outputs) {
        res += this.node_fields.outputs[f].toXML();
      }
      res += "\t\t</out>\n";
      return res;
    };
    NodeFieldRack.prototype.fromXML = function(data) {
      var self;
      self = this;
      return $("in field", data).each(function() {
        var f, field_val;
        f = self.node_fields.inputs["fid-" + $(this).attr("fid")];
        field_val = $(this).attr("val");
        if (f && field_val !== "[object Object]") {
          return f.set(field_val);
        }
      });
    };
    NodeFieldRack.prototype.update_inputs = function() {
      var f, _results;
      _results = [];
      for (f in this.node_fields.inputs) {
        _results.push(this.node_fields.inputs[f].update_input_node());
      }
      return _results;
    };
    NodeFieldRack.prototype.addInput = function(field) {
      field.node = this.node;
      this.node_fields.inputs["fid-" + field.fid] = field;
      this.node_fields_by_name.inputs[field.name] = field;
      $(".inputs", this.node.main_view).append(field.render_button());
      this.node.add_field_listener($("#fid-" + field.fid));
      return field;
    };
    NodeFieldRack.prototype.addOutput = function(field) {
      field.node = this.node;
      field.is_output = true;
      this.node_fields.outputs["fid-" + field.fid] = field;
      this.node_fields_by_name.outputs[field.name] = field;
      $(".outputs", this.node.main_view).append(field.render_button());
      this.node.add_field_listener($("#fid-" + field.fid));
      return field;
    };
    NodeFieldRack.prototype.addFields = function(fields_array) {
      var dir, f, fname, k;
      for (dir in fields_array) {
        for (fname in fields_array[dir]) {
          k = fields_array[dir][fname];
          f = false;
          if ($.type(k) === "object") {
            f = new fields.types[k.type](fname, k.val);
          } else {
            f = this.create_field_from_default_type(fname, k);
          }
          if (dir === "inputs") {
            this.addInput(f);
          } else {
            this.addOutput(f);
          }
        }
      }
      return false;
    };
    NodeFieldRack.prototype.render_sidebar = function() {
      var $target, f;
      $target = $("#tab-attribute");
      $target.html("");
      for (f in this.node_fields.inputs) {
        this.node_fields.inputs[f].render_sidebar();
      }
      return false;
    };
    NodeFieldRack.prototype.add_center_textfield = function(field) {
      var f_in;
      $(".options .center", this.node.main_view).append("<div><input type='text' id='f-txt-input-" + field.fid + "' /></div>");
      f_in = $("#f-txt-input-" + field.fid);
      field.on_value_update_hooks.update_center_textfield = function(v) {
        return f_in.val(v.toString().substring(0, 10));
      };
      f_in.val(field.get());
      if (field.is_output === true) {
        return f_in.attr("disabled", "disabled");
      } else {
        return f_in.keypress(function(e) {
          if (e.which === 13) {
            field.set($(this).val());
            return $(this).blur();
          }
        });
      }
    };
    NodeFieldRack.prototype.create_field_from_default_type = function(fname, default_value) {
      var ftype;
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
      return new fields.types[ftype](fname, default_value);
    };
    return NodeFieldRack;
  })();
  field_click_1 = false;
  NodeBase = (function() {
    function NodeBase(x, y, inXML) {
      this.x = x;
      this.y = y;
      this.inXML = inXML != null ? inXML : false;
      this.init = __bind(this.init, this);
      this.remove_connection = __bind(this.remove_connection, this);
      this.add_out_connection = __bind(this.add_out_connection, this);
      this.add_field_listener = __bind(this.add_field_listener, this);
      this.render_connections = __bind(this.render_connections, this);
      this.create_field_connection = __bind(this.create_field_connection, this);
      this.apply_fields_to_val = __bind(this.apply_fields_to_val, this);
      this.toXML = __bind(this.toXML, this);
      this.update = __bind(this.update, this);
      this.remove = __bind(this.remove, this);
      this.compute = __bind(this.compute, this);
      this.has_out_connection = __bind(this.has_out_connection, this);
      this.set_fields = __bind(this.set_fields, this);
      this.input_value_has_changed = __bind(this.input_value_has_changed, this);
      this.create_cache_object = __bind(this.create_cache_object, this);
      this.init_context_menu = __bind(this.init_context_menu, this);
      this.typename = __bind(this.typename, this);
      if (this.inXML) {
        this.nid = parseInt(this.inXML.attr("nid"));
        uid = this.nid;
      } else {
        this.nid = get_uid();
      }
      this.container = $("#container");
      this.out_connections = [];
      this.rack = new NodeFieldRack(this, this.inXML);
      this.value = false;
      this.name = false;
      this.main_view = false;
      this.updated = false;
      this.init();
      this.set_fields();
      if (this.inXML !== false) {
        this.rack.fromXML(this.inXML);
      }
      this.init_context_menu();
    }
    NodeBase.prototype.typename = function() {
      return String(this.constructor.name);
    };
    NodeBase.prototype.init_context_menu = function() {
      var self;
      self = this;
      return $(".field", this.main_view).contextMenu({
        menu: "field-context-menu"
      }, function(action, el, pos) {
        var f_name, f_type, field;
        if (action === "remove_connection") {
          f_name = $(el).attr("id");
          f_type = $(el).parent().attr("class");
          field = self.rack.node_fields[f_type][f_name];
          return field.remove_connections();
        }
      });
    };
    NodeBase.prototype.create_cache_object = function(values) {
      var res, v, _i, _len;
      res = {};
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v = values[_i];
        res[v] = this.rack.get(v).get();
      }
      return res;
    };
    NodeBase.prototype.input_value_has_changed = function(values, cache) {
      var v, v2, _i, _len;
      if (cache == null) {
        cache = this.material_cache;
      }
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v = values[_i];
        v2 = this.rack.get(v).get();
        if (v2 !== cache[v]) {
          return true;
        }
      }
      return false;
    };
    NodeBase.prototype.set_fields = function() {};
    NodeBase.prototype.has_out_connection = function() {
      return this.out_connections.length !== 0;
    };
    NodeBase.prototype.compute = function() {
      return this.value = this.value;
    };
    NodeBase.prototype.remove = function() {
      this.rack.remove_all_connections();
      return this.main_view.remove();
    };
    NodeBase.prototype.update = function() {
      if (this.updated === true) {
        return true;
      }
      this.updated = true;
      this.rack.update_inputs();
      return this.compute();
    };
    NodeBase.prototype.toXML = function() {
      var pos;
      pos = this.main_view.position();
      return "\t\t\t<node nid='" + this.nid + "' type='" + (this.typename()) + "' x='" + pos.left + "' y='" + pos.top + "'>" + (this.rack.toXML()) + "</node>\n";
    };
    NodeBase.prototype.apply_fields_to_val = function(afields, target, exceptions) {
      var f, nf, _results;
      if (exceptions == null) {
        exceptions = [];
      }
      _results = [];
      for (f in afields) {
        nf = afields[f];
        _results.push(exceptions.indexOf(nf.name) === -1 ? target[nf.name] = this.rack.get(nf.name).val : void 0);
      }
      return _results;
    };
    NodeBase.prototype.create_field_connection = function(field) {
      var f, field_click_2;
      f = this;
      if (field_click_1 === false) {
        field_click_1 = field;
        return $(".inputs .field").filter(function() {
          return $(this).parent().parent().parent().attr("id") !== ("nid-" + f.nid);
        }).addClass("field-possible-target");
      } else {
        field_click_2 = field;
        new NodeConnection(field_click_1, field_click_2);
        $(".field").removeClass("field-possible-target");
        return field_click_1 = false;
      }
    };
    NodeBase.prototype.render_connections = function() {
      return this.rack.render_connections();
    };
    NodeBase.prototype.add_field_listener = function($field) {
      var f_name, f_type, field, self;
      self = this;
      f_name = $field.attr("id");
      f_type = $field.parent().attr("class");
      field = this.rack.node_fields[f_type][f_name];
      $field.click(function(e) {
        e.preventDefault();
        if (e.shiftKey === true) {
          return field.remove_connections();
        } else {
          return self.create_field_connection(field);
        }
      });
      return this;
    };
    NodeBase.prototype.add_out_connection = function(c, field) {
      if (this.out_connections.indexOf(c) === -1) {
        this.out_connections.push(c);
      }
      return c;
    };
    NodeBase.prototype.remove_connection = function(c) {
      var c_index;
      c_index = this.out_connections.indexOf(c);
      if (c_index !== -1) {
        this.out_connections.splice(c_index, 1);
      }
      return c;
    };
    NodeBase.prototype.init = function() {
      var self;
      self = this;
      this.main_view = $.tmpl(node_template, this);
      this.container.append(this.main_view);
      this.main_view.css({
        left: this.x,
        top: this.y
      });
      this.main_view.draggable({
        drag: function() {
          return self.render_connections();
        },
        stop: function() {
          return self.render_connections();
        }
      });
      $(".head", this.main_view).dblclick(function(e) {
        return $(".options", self.main_view).animate({
          height: 'toggle'
        }, 120, function() {
          return self.render_connections();
        });
      });
      return $(".head", this.main_view).click(function(e) {
        return self.rack.render_sidebar();
      });
    };
    return NodeBase;
  })();
  NodeNumberSimple = (function() {
    __extends(NodeNumberSimple, NodeBase);
    function NodeNumberSimple() {
      this.compute = __bind(this.compute, this);
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      this.init = __bind(this.init, this);
      NodeNumberSimple.__super__.constructor.apply(this, arguments);
    }
    NodeNumberSimple.prototype.init = function() {
      NodeNumberSimple.__super__.init.apply(this, arguments);
      return this.value = 0;
    };
    NodeNumberSimple.prototype.set_fields = function() {
      this.v_in = this.rack.addInput(new fields.types.Float("in", 0));
      return this.v_out = this.rack.addOutput(new fields.types.Float("out", 0));
    };
    NodeNumberSimple.prototype.process_val = function(num, i) {
      return num;
    };
    NodeNumberSimple.prototype.compute = function() {
      var res;
      res = false;
      switch ($.type(this.v_in.get())) {
        case "array":
          res = _.map(this.v_in.val, function(n, i) {
            return this.process_val(n, i);
          });
          break;
        default:
          res = this.process_val(this.v_in.get(), 0);
      }
      if (this.v_out.get() !== res) {
        this.v_out.set(res);
      }
      return true;
    };
    return NodeNumberSimple;
  })();
  nodes.types.Base.Number = (function() {
    __extends(Number, NodeNumberSimple);
    function Number() {
      this.set_fields = __bind(this.set_fields, this);
      Number.__super__.constructor.apply(this, arguments);
    }
    Number.prototype.set_fields = function() {
      Number.__super__.set_fields.apply(this, arguments);
      return this.rack.add_center_textfield(this.v_in);
    };
    return Number;
  })();
  nodes.types.Base.String = (function() {
    __extends(String, NodeBase);
    function String() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      this.init = __bind(this.init, this);
      String.__super__.constructor.apply(this, arguments);
    }
    String.prototype.init = function() {
      String.__super__.init.apply(this, arguments);
      return this.value = "";
    };
    String.prototype.set_fields = function() {
      return this.rack.addFields({
        inputs: {
          "string": ""
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };
    String.prototype.compute = function() {
      return this.rack.get("out", true).set(this.rack.get("string").get());
    };
    return String;
  })();
  nodes.types.Base.Vector2 = (function() {
    __extends(Vector2, NodeBase);
    function Vector2() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Vector2.__super__.constructor.apply(this, arguments);
    }
    Vector2.prototype.set_fields = function() {
      Vector2.__super__.set_fields.apply(this, arguments);
      this.vec = new THREE.Vector2(0, 0);
      return this.rack.addFields({
        inputs: {
          "xy": {
            type: "Vector2",
            val: false
          },
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
      });
    };
    Vector2.prototype.compute = function() {
      var old;
      old = this.rack.get("xy", true).get();
      this.value = this.rack.get("xy").get();
      if (this.rack.get("xy").connections.length === 0) {
        this.value = new THREE.Vector2(this.rack.get("x").get(), this.rack.get("y").get());
      }
      if (this.value !== old) {
        this.rack.get("xy", true).set(this.value);
        this.rack.get("x", true).set(this.value.x);
        return this.rack.get("y", true).set(this.value.y);
      }
    };
    return Vector2;
  })();
  nodes.types.Base.Vector3 = (function() {
    __extends(Vector3, NodeBase);
    function Vector3() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Vector3.__super__.constructor.apply(this, arguments);
    }
    Vector3.prototype.set_fields = function() {
      Vector3.__super__.set_fields.apply(this, arguments);
      this.vec = new THREE.Vector3(0, 0, 0);
      return this.rack.addFields({
        inputs: {
          "xyz": {
            type: "Vector3",
            val: false
          },
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
      });
    };
    Vector3.prototype.compute = function() {
      var old;
      old = this.rack.get("xyz", true).get();
      this.value = this.rack.get("xyz").get();
      if (this.rack.get("xyz").connections.length === 0) {
        this.value = new THREE.Vector3(this.rack.get("x").get(), this.rack.get("y").get(), this.rack.get("z").get());
      }
      if (this.value !== old) {
        this.rack.get("xyz", true).set(this.value);
        this.rack.get("x", true).set(this.value.x);
        this.rack.get("y", true).set(this.value.y);
        return this.rack.get("z", true).set(this.value.z);
      }
    };
    return Vector3;
  })();
  nodes.types.Base.Color = (function() {
    __extends(Color, NodeBase);
    function Color() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      this.init_preview = __bind(this.init_preview, this);
      Color.__super__.constructor.apply(this, arguments);
    }
    Color.prototype.init_preview = function() {
      var col, self;
      $(".center", this.main_view).append("<div class='color_preview'></div>");
      col = this.rack.get("rgb").get();
      self = this;
      $(".color_preview", this.main_view).ColorPicker({
        color: {
          r: col.r * 255,
          g: col.g * 255,
          b: col.b * 255
        },
        onChange: function(hsb, hex, rgb) {
          self.rack.get("r").set(rgb.r / 255);
          self.rack.get("g").set(rgb.g / 255);
          return self.rack.get("b").set(rgb.b / 255);
        }
      });
      return self.rack.get("rgb", true).on_value_update_hooks.set_bg_color_preview = function(v) {
        return $(".color_preview", self.main_view).css({
          background: v.getContextStyle()
        });
      };
    };
    Color.prototype.set_fields = function() {
      Color.__super__.set_fields.apply(this, arguments);
      this.vec = new THREE.Color(1, 0, 0);
      this.rack.addFields({
        inputs: {
          "rgb": {
            type: "Color",
            val: false
          },
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
      });
      return this.init_preview();
    };
    Color.prototype.compute = function() {
      var old;
      old = this.rack.get("rgb", true).get();
      this.value = this.rack.get("rgb").get();
      if (this.rack.get("rgb").connections.length === 0) {
        this.value = new THREE.Color().setRGB(this.rack.get("r").get(), this.rack.get("g").get(), this.rack.get("b").get());
      }
      if (this.value !== old) {
        this.rack.get("rgb", true).set(this.value);
        this.rack.get("r", true).set(this.value.r);
        this.rack.get("g", true).set(this.value.g);
        return this.rack.get("b", true).set(this.value.b);
      }
    };
    return Color;
  })();
  nodes.types.Geometry.CubeGeometry = (function() {
    __extends(CubeGeometry, NodeBase);
    function CubeGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      CubeGeometry.__super__.constructor.apply(this, arguments);
    }
    CubeGeometry.prototype.set_fields = function() {
      CubeGeometry.__super__.set_fields.apply(this, arguments);
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
      return [this.rack.get("width").get(), this.rack.get("height").get(), this.rack.get("depth").get(), this.rack.get("segments_width").get(), this.rack.get("segments_height").get(), this.rack.get("segments_depth").get(), this.rack.get("flip").get()];
    };
    CubeGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.CubeGeometry(this.rack.get("width").get(), this.rack.get("height").get(), this.rack.get("depth").get(), this.rack.get("segments_width").get(), this.rack.get("segments_height").get(), this.rack.get("segments_depth").get(), this.rack.get("flip").get());
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.get("out", true).set(this.ob);
    };
    return CubeGeometry;
  })();
  nodes.types.Geometry.SphereGeometry = (function() {
    __extends(SphereGeometry, NodeBase);
    function SphereGeometry() {
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      SphereGeometry.__super__.constructor.apply(this, arguments);
    }
    SphereGeometry.prototype.set_fields = function() {
      SphereGeometry.__super__.set_fields.apply(this, arguments);
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
      return [this.rack.get("radius").get(), this.rack.get("segments_width").get(), this.rack.get("segments_height").get()];
    };
    SphereGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (flatArraysAreEquals(new_cache, this.cached) === false) {
        this.ob = new THREE.SphereGeometry(this.rack.get("radius").get(), this.rack.get("segments_width").get(), this.rack.get("segments_height").get());
        this.cached = new_cache;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.get("out", true).set(this.ob);
    };
    return SphereGeometry;
  })();
  nodes.types.Lights.PointLight = (function() {
    __extends(PointLight, NodeBase);
    function PointLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      PointLight.__super__.constructor.apply(this, arguments);
    }
    PointLight.prototype.set_fields = function() {
      PointLight.__super__.set_fields.apply(this, arguments);
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
      return this.rack.get("out", true).set(this.ob);
    };
    return PointLight;
  })();
  nodes.types.Lights.SpotLight = (function() {
    __extends(SpotLight, NodeBase);
    function SpotLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SpotLight.__super__.constructor.apply(this, arguments);
    }
    SpotLight.prototype.set_fields = function() {
      SpotLight.__super__.set_fields.apply(this, arguments);
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
        rebuild_all_shaders();
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.get("out", true).set(this.ob);
    };
    return SpotLight;
  })();
  nodes.types.Lights.DirectionalLight = (function() {
    __extends(DirectionalLight, NodeBase);
    function DirectionalLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      DirectionalLight.__super__.constructor.apply(this, arguments);
    }
    DirectionalLight.prototype.set_fields = function() {
      DirectionalLight.__super__.set_fields.apply(this, arguments);
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
      return this.rack.get("out", true).set(this.ob);
    };
    return DirectionalLight;
  })();
  nodes.types.Lights.AmbientLight = (function() {
    __extends(AmbientLight, NodeBase);
    function AmbientLight() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      AmbientLight.__super__.constructor.apply(this, arguments);
    }
    AmbientLight.prototype.set_fields = function() {
      AmbientLight.__super__.set_fields.apply(this, arguments);
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
      return this.rack.get("out", true).set(this.ob);
    };
    return AmbientLight;
  })();
  NodeMaterialBase = (function() {
    __extends(NodeMaterialBase, NodeBase);
    function NodeMaterialBase() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      NodeMaterialBase.__super__.constructor.apply(this, arguments);
    }
    NodeMaterialBase.prototype.set_fields = function() {
      NodeMaterialBase.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      webgl_materials_node[webgl_materials_node.length] = this;
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
      return this.rack.get("out", true).set(this.ob);
    };
    return NodeMaterialBase;
  })();
  nodes.types.Materials.MeshBasicMaterial = (function() {
    __extends(MeshBasicMaterial, NodeMaterialBase);
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
      return this.rack.get("out", true).set(this.ob);
    };
    return MeshBasicMaterial;
  })();
  nodes.types.Materials.MeshLambertMaterial = (function() {
    __extends(MeshLambertMaterial, NodeMaterialBase);
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
      return this.rack.get("out", true).set(this.ob);
    };
    return MeshLambertMaterial;
  })();
  nodes.types.Math.Sin = (function() {
    __extends(Sin, NodeNumberSimple);
    function Sin() {
      this.process_val = __bind(this.process_val, this);
      Sin.__super__.constructor.apply(this, arguments);
    }
    Sin.prototype.process_val = function(num, i) {
      return Math.sin(num);
    };
    return Sin;
  })();
  nodes.types.Math.Cos = (function() {
    __extends(Cos, NodeNumberSimple);
    function Cos() {
      this.process_val = __bind(this.process_val, this);
      Cos.__super__.constructor.apply(this, arguments);
    }
    Cos.prototype.process_val = function(num, i) {
      return Math.cos(num);
    };
    return Cos;
  })();
  nodes.types.Math.Tan = (function() {
    __extends(Tan, NodeNumberSimple);
    function Tan() {
      this.process_val = __bind(this.process_val, this);
      Tan.__super__.constructor.apply(this, arguments);
    }
    Tan.prototype.process_val = function(num, i) {
      return Math.tan(num);
    };
    return Tan;
  })();
  nodes.types.Math.Round = (function() {
    __extends(Round, NodeNumberSimple);
    function Round() {
      this.process_val = __bind(this.process_val, this);
      Round.__super__.constructor.apply(this, arguments);
    }
    Round.prototype.process_val = function(num, i) {
      return Math.round(num);
    };
    return Round;
  })();
  nodes.types.Math.Ceil = (function() {
    __extends(Ceil, NodeNumberSimple);
    function Ceil() {
      this.process_val = __bind(this.process_val, this);
      Ceil.__super__.constructor.apply(this, arguments);
    }
    Ceil.prototype.process_val = function(num, i) {
      return Math.ceil(num);
    };
    return Ceil;
  })();
  nodes.types.Math.Floor = (function() {
    __extends(Floor, NodeNumberSimple);
    function Floor() {
      this.process_val = __bind(this.process_val, this);
      Floor.__super__.constructor.apply(this, arguments);
    }
    Floor.prototype.process_val = function(num, i) {
      return Math.floor(num);
    };
    return Floor;
  })();
  nodes.types.Math.Mod = (function() {
    __extends(Mod, NodeNumberSimple);
    function Mod() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Mod.__super__.constructor.apply(this, arguments);
    }
    Mod.prototype.set_fields = function() {
      Mod.__super__.set_fields.apply(this, arguments);
      return this.v_valy = this.rack.addInput(new fields.types.Float("y", 2));
    };
    Mod.prototype.process_val = function(num, i) {
      return num % this.v_valy.get();
    };
    return Mod;
  })();
  nodes.types.Math.Add = (function() {
    __extends(Add, NodeNumberSimple);
    function Add() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Add.__super__.constructor.apply(this, arguments);
    }
    Add.prototype.set_fields = function() {
      Add.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addInput(new fields.types.Float("y", 1));
    };
    Add.prototype.process_val = function(num, i) {
      return num + this.v_factor.get();
    };
    return Add;
  })();
  nodes.types.Math.Subtract = (function() {
    __extends(Subtract, NodeNumberSimple);
    function Subtract() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Subtract.__super__.constructor.apply(this, arguments);
    }
    Subtract.prototype.set_fields = function() {
      Subtract.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addInput(new fields.types.Float("y", 1));
    };
    Subtract.prototype.process_val = function(num, i) {
      return num - this.v_factor.get();
    };
    return Subtract;
  })();
  nodes.types.Math.Mult = (function() {
    __extends(Mult, NodeNumberSimple);
    function Mult() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Mult.__super__.constructor.apply(this, arguments);
    }
    Mult.prototype.set_fields = function() {
      Mult.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addInput(new fields.types.Float("factor", 2));
    };
    Mult.prototype.process_val = function(num, i) {
      return num * this.v_factor.get();
    };
    return Mult;
  })();
  nodes.types.Math.Divide = (function() {
    __extends(Divide, NodeNumberSimple);
    function Divide() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Divide.__super__.constructor.apply(this, arguments);
    }
    Divide.prototype.set_fields = function() {
      Divide.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addInput(new fields.types.Float("y", 2));
    };
    Divide.prototype.process_val = function(num, i) {
      return num / this.v_factor.get();
    };
    return Divide;
  })();
  nodes.types.Math.Min = (function() {
    __extends(Min, NodeNumberSimple);
    function Min() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Min.__super__.constructor.apply(this, arguments);
    }
    Min.prototype.set_fields = function() {
      Min.__super__.set_fields.apply(this, arguments);
      return this.v_inb = this.rack.addInput(new fields.types.Float("in2", 0));
    };
    Min.prototype.process_val = function(num, i) {
      return Math.min(num, this.v_inb.get());
    };
    return Min;
  })();
  nodes.types.Math.Max = (function() {
    __extends(Max, NodeNumberSimple);
    function Max() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Max.__super__.constructor.apply(this, arguments);
    }
    Max.prototype.set_fields = function() {
      Max.__super__.set_fields.apply(this, arguments);
      return this.v_inb = this.rack.addInput(new fields.types.Float("in2", 0));
    };
    Max.prototype.process_val = function(num, i) {
      return Math.max(num, this.v_inb.get());
    };
    return Max;
  })();
  nodes.types.Three.Object3D = (function() {
    __extends(Object3D, NodeBase);
    function Object3D() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Object3D.__super__.constructor.apply(this, arguments);
    }
    Object3D.prototype.set_fields = function() {
      Object3D.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.Object3D();
      this.rack.addFields({
        inputs: {
          "children": {
            type: "Array",
            val: []
          },
          "position": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "rotation": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "scale": {
            type: "Vector3",
            val: new THREE.Vector3(1, 1, 1)
          },
          "doubleSided": false,
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
      });
      this.vars_shadow_options = ["castShadow", "receiveShadow"];
      return this.shadow_cache = this.create_cache_object(this.vars_shadow_options);
    };
    Object3D.prototype.compute = function() {
      var child, ind, _i, _j, _len, _len2, _ref, _ref2;
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children']);
      _ref = this.rack.get("children").get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        ind = this.ob.children.indexOf(child);
        if (ind === -1) {
          this.ob.addChild(child);
        }
      }
      _ref2 = this.ob.children;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        child = _ref2[_j];
        ind = this.rack.get("children").val.indexOf(child);
        if (ind !== -1) {
          this.ob.removeChild(child);
        }
      }
      return this.rack.get("out", true).set(this.ob);
    };
    return Object3D;
  })();
  nodes.types.Three.Scene = (function() {
    __extends(Scene, nodes.types.Three.Object3D);
    function Scene() {
      this.compute = __bind(this.compute, this);
      this.apply_children = __bind(this.apply_children, this);
      this.set_fields = __bind(this.set_fields, this);
      Scene.__super__.constructor.apply(this, arguments);
    }
    Scene.prototype.set_fields = function() {
      Scene.__super__.set_fields.apply(this, arguments);
      return this.ob = new THREE.Scene();
    };
    Scene.prototype.apply_children = function() {
      var child, childs_in, ind, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _results;
      childs_in = this.rack.get("children").get();
      _ref = this.ob.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        ind = childs_in.indexOf(child);
        if (child && ind === -1 && child instanceof THREE.Light === false) {
          this.ob.removeChild(child);
        }
      }
      _ref2 = this.ob.children;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        child = _ref2[_j];
        ind = childs_in.indexOf(child);
        if (child && ind === -1 && child instanceof THREE.Light === true) {
          this.ob.removeLight(child);
        }
      }
      _results = [];
      for (_k = 0, _len3 = childs_in.length; _k < _len3; _k++) {
        child = childs_in[_k];
        _results.push(child instanceof THREE.Light === true ? (ind = this.ob.children.indexOf(child), ind === -1 ? (this.ob.addLight(child), rebuild_all_shaders()) : void 0) : (ind = this.ob.children.indexOf(child), ind === -1 ? this.ob.addChild(child) : void 0));
      }
      return _results;
    };
    Scene.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children', 'lights']);
      this.apply_children();
      return this.rack.get("out", true).set(this.ob);
    };
    return Scene;
  })();
  nodes.types.Three.Mesh = (function() {
    __extends(Mesh, nodes.types.Three.Object3D);
    function Mesh() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Mesh.__super__.constructor.apply(this, arguments);
    }
    Mesh.prototype.set_fields = function() {
      Mesh.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshLambertMaterial({
        color: 0xff0000,
        wireframe: false
      }));
      this.rack.addFields({
        inputs: {
          "geometry": {
            type: "Any",
            val: new THREE.CubeGeometry(200, 200, 200)
          },
          "materials": {
            type: "Array",
            val: [
              new THREE.MeshLambertMaterial({
                color: 0xff0000,
                wireframe: false
              })
            ]
          },
          "overdraw": false
        }
      });
      this.rack.get("out", true).set(this.ob);
      this.geometry_cache = this.rack.get('geometry').get().id;
      return this.materials_cache = this.rack.get('materials').get();
    };
    Mesh.prototype.compute = function() {
      var needs_rebuild;
      needs_rebuild = false;
      if (this.input_value_has_changed(this.vars_shadow_options, this.shadow_cache)) {
        this.ob = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshLambertMaterial({
          color: 0xff0000,
          wireframe: false
        }));
        needs_rebuild = true;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children', 'geometry']);
      if (this.geometry_cache !== this.rack.get('geometry').get().id || flatArraysAreEquals(this.materials_cache, this.rack.get('materials').get()) === false) {
        this.ob = new THREE.Mesh(this.rack.get('geometry').get(), this.rack.get('materials').get());
        this.geometry_cache = this.rack.get('geometry').get().id;
        this.materials_cache = this.rack.get('materials').get();
      }
      this.shadow_cache = this.create_cache_object(this.vars_shadow_options);
      if (needs_rebuild === true) {
        rebuild_all_shaders();
      }
      return this.rack.get("out", true).set(this.ob);
    };
    return Mesh;
  })();
  nodes.types.Three.Camera = (function() {
    __extends(Camera, NodeBase);
    function Camera() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Camera.__super__.constructor.apply(this, arguments);
    }
    Camera.prototype.set_fields = function() {
      Camera.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.Camera();
      return this.rack.addFields({
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
            type: "Object3D",
            val: new THREE.Object3D()
          },
          "useTarget": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    };
    Camera.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.get("out", true).set(this.ob);
    };
    return Camera;
  })();
  nodes.types.Three.Texture = (function() {
    __extends(Texture, NodeBase);
    function Texture() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Texture.__super__.constructor.apply(this, arguments);
    }
    Texture.prototype.set_fields = function() {
      Texture.__super__.set_fields.apply(this, arguments);
      this.ob = false;
      this.cached = false;
      return this.rack.addFields({
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
      });
    };
    Texture.prototype.compute = function() {
      var current;
      current = this.rack.get("image").get();
      if (current && current !== "") {
        if (this.cached === false ||  ($.type(this.cached) === "object" && this.cached.constructor === THREE.Texture && this.cached.image.src !== current)) {
          this.ob = new THREE.ImageUtils.loadTexture(current);
          console.log("new texture");
          console.log(this.ob);
          console.log(current);
          this.cached = this.ob;
        }
      }
      return this.rack.get("out", true).set(this.ob);
    };
    return Texture;
  })();
  nodes.types.Three.WebGLRenderer = (function() {
    __extends(WebGLRenderer, NodeBase);
    function WebGLRenderer() {
      this.compute = __bind(this.compute, this);
      this.apply_size = __bind(this.apply_size, this);
      this.set_fields = __bind(this.set_fields, this);
      WebGLRenderer.__super__.constructor.apply(this, arguments);
    }
    WebGLRenderer.prototype.set_fields = function() {
      WebGLRenderer.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.WebGLRenderer();
      this.width = 0;
      this.height = 0;
      this.rack.addFields({
        inputs: {
          "width": 800,
          "height": 600,
          "scene": {
            type: "Scene",
            val: new THREE.Scene()
          },
          "camera": {
            type: "Camera",
            val: new THREE.Camera(75, 800 / 600, 1, 10000)
          },
          "bg_color": {
            type: "Color",
            val: new THREE.Color(0, 0, 0)
          },
          "shadowCameraNear": 3,
          "shadowCameraFar": 3000,
          "shadowMapWidth": 512,
          "shadowMapHeight": 512,
          "shadowMapEnabled": false,
          "shadowMapSoft": true
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.apply_size();
      this.rack.get("camera").val.position.z = 1000;
      this.win = window.open('', 'win' + this.nid, "width=800,height=600,scrollbars=false,location=false,status=false,menubar=false");
      this.win.document.body.appendChild(this.ob.domElement);
      return this.apply_bg_color();
    };
    WebGLRenderer.prototype.apply_bg_color = function() {
      return $(this.win.document.body).css({
        background: this.rack.get('bg_color').get().getContextStyle()
      });
    };
    WebGLRenderer.prototype.apply_size = function() {
      var h, w;
      if (!this.win) {
        return false;
      }
      w = this.rack.get('width').get();
      h = this.rack.get('height').get();
      if (w !== this.width || h !== this.height) {
        this.ob.setSize(w, h);
      }
      this.width = w;
      return this.height = h;
    };
    WebGLRenderer.prototype.compute = function() {
      var cam, sce;
      this.apply_size();
      this.apply_bg_color();
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['width', 'height', 'scene', 'camera', 'bg_color']);
      sce = this.rack.get("scene").get();
      cam = this.rack.get("camera").get();
      return this.ob.render(sce, cam);
    };
    return WebGLRenderer;
  })();
  nodes.types.Utils.Random = (function() {
    __extends(Random, NodeBase);
    function Random() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Random.__super__.constructor.apply(this, arguments);
    }
    Random.prototype.set_fields = function() {
      Random.__super__.set_fields.apply(this, arguments);
      this.rack.addFields({
        inputs: {
          "min": 0,
          "max": 1
        },
        outputs: {
          "out": 0
        }
      });
      return this.rack.add_center_textfield(this.rack.get("out", true));
    };
    Random.prototype.compute = function() {
      var old;
      old = this.rack.get("out", true).get();
      this.value = this.rack.get("min").get() + Math.random() * (this.rack.get("max").get() - this.rack.get("min").get());
      if (this.value !== old) {
        return this.rack.get("out", true).set(this.value);
      }
    };
    return Random;
  })();
  nodes.types.Utils.Merge = (function() {
    __extends(Merge, NodeBase);
    function Merge() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Merge.__super__.constructor.apply(this, arguments);
    }
    Merge.prototype.set_fields = function() {
      Merge.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
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
      });
    };
    Merge.prototype.compute = function() {
      var f, k, old;
      old = this.rack.get("out", true).get();
      this.value = [];
      for (f in this.rack.node_fields.inputs) {
        k = this.rack.node_fields.inputs[f];
        if (k.get() !== null && k.connections.length > 0) {
          this.value[this.value.length] = k.get();
        }
      }
      if (this.value !== old) {
        return this.rack.get("out", true).set(this.value);
      }
    };
    return Merge;
  })();
  nodes.types.Utils.Get = (function() {
    __extends(Get, NodeBase);
    function Get() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Get.__super__.constructor.apply(this, arguments);
    }
    Get.prototype.set_fields = function() {
      Get.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
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
      });
    };
    Get.prototype.compute = function() {
      var arr, ind, old;
      old = this.rack.get("out", true).get();
      this.value = false;
      arr = this.rack.get("array").get();
      ind = parseInt(this.rack.get("index").get());
      if ($.type(arr) === "array") {
        this.value = arr[ind % arr.length];
      }
      if (this.value !== old) {
        return this.rack.get("out", true).set(this.value);
      }
    };
    return Get;
  })();
  nodes.types.Utils.SoundInput = (function() {
    __extends(SoundInput, NodeBase);
    function SoundInput() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SoundInput.__super__.constructor.apply(this, arguments);
    }
    SoundInput.prototype.set_fields = function() {
      SoundInput.__super__.set_fields.apply(this, arguments);
      this.counter = 0;
      return this.rack.addFields({
        outputs: {
          "low": 0,
          "medium": 0,
          "high": 0
        }
      });
    };
    SoundInput.prototype.compute = function() {
      this.rack.get("low", true).set(flash_sound_value[2 % flash_sound_value.length]);
      this.rack.get("medium", true).set(flash_sound_value[9 % flash_sound_value.length]);
      return this.rack.get("high", true).set(flash_sound_value[14 % flash_sound_value.length]);
    };
    return SoundInput;
  })();
  nodes.types.Utils.Timer = (function() {
    __extends(Timer, NodeBase);
    function Timer() {
      this.compute = __bind(this.compute, this);
      this.get_time = __bind(this.get_time, this);
      this.set_fields = __bind(this.set_fields, this);
      Timer.__super__.constructor.apply(this, arguments);
    }
    Timer.prototype.set_fields = function() {
      Timer.__super__.set_fields.apply(this, arguments);
      this.old = this.get_time();
      this.counter = 0;
      this.rack.addFields({
        inputs: {
          "reset": false,
          "pause": false,
          "max": 99999999999
        },
        outputs: {
          "out": 0
        }
      });
      return this.rack.add_center_textfield(this.rack.get("out", true));
    };
    Timer.prototype.get_time = function() {
      return new Date().getTime();
    };
    Timer.prototype.compute = function() {
      var diff, now, oldval;
      oldval = this.rack.get("out", true).get();
      now = this.get_time();
      if (this.rack.get("pause").get() === false) {
        this.counter += now - this.old;
      }
      if (this.rack.get("reset").get() === true) {
        this.counter = 0;
      }
      diff = this.rack.get("max").get() - this.counter;
      if (diff <= 0) {
        this.counter = 0;
      }
      this.old = now;
      return this.rack.get("out", true).set(this.counter);
    };
    return Timer;
  })();
  init_sidebar = function() {
    init_sidebar_tab_new_node();
    init_sidebar_search();
    init_sidebar_toggle();
    init_sidebar_tabs();
    return init_sidebar_tab_system();
  };
  init_sidebar_tab_system = function() {
    $(".new_file").click(function(e) {
      e.preventDefault();
      return clear_workspace();
    });
    $(".open_file").click(function(e) {
      e.preventDefault();
      return $("#main_file_input_open").click();
    });
    $(".save_file").click(function(e) {
      e.preventDefault();
      return save_local_file();
    });
    $("#main_file_input_open").change(load_local_file_input_changed);
    return $(".rebuild_shaders").click(function(e) {
      e.preventDefault();
      rebuild_all_shaders();
      return false;
    });
  };
  init_sidebar_tabs = function() {
    return $("#sidebar").tabs({
      fx: {
        opacity: 'toggle',
        duration: 100
      }
    });
  };
  init_sidebar_toggle = function() {
    return $("#sidebar-toggle").click(function(e) {
      var $t, o;
      $t = $("#sidebar");
      o = 10;
      if ($t.position().left < -20) {
        $("#sidebar-toggle").removeClass("toggle-closed");
        $t.animate({
          left: 0
        }, {
          queue: false,
          duration: 140
        }, "swing");
        return $("#sidebar-toggle").animate({
          left: 220 + o
        }, {
          queue: false,
          duration: 80
        }, "swing");
      } else {
        $("#sidebar-toggle").addClass("toggle-closed");
        $t.animate({
          left: -220
        }, {
          queue: false,
          duration: 120
        }, "swing");
        return $("#sidebar-toggle").animate({
          left: o
        }, {
          queue: false,
          duration: 180
        }, "swing");
      }
    });
  };
  init_sidebar_search = function() {
    var toggle_class;
    toggle_class = "hidden-element";
    return $("#node_filter").keyup(function(e) {
      var v;
      v = $.trim($("#node_filter").val()).toLowerCase();
      if (v === "") {
        return $("#tab-new li").removeClass(toggle_class);
      } else {
        return $("#tab-new li").each(function(el) {
          var has_visible_items, s, ul;
          s = $.trim($("a", this).html()).toLowerCase();
          if (s.indexOf(v) !== -1) {
            return $(this).removeClass(toggle_class);
          } else {
            $(this).addClass(toggle_class);
            ul = $(this).parent();
            has_visible_items = false;
            ul.children().each(function() {
              if ($(this).hasClass(toggle_class) === false) {
                return has_visible_items = true;
              }
            });
            if (has_visible_items === false) {
              return ul.prev().addClass(toggle_class);
            } else {
              return ul.prev().removeClass(toggle_class);
            }
          }
        });
      }
    });
  };
  init_sidebar_tab_new_node = function() {
    var $container, node, nt;
    $container = $("#tab-new");
    for (nt in nodes.types) {
      $container.append("<h3>" + nt + "</h3><ul id='nodetype-" + nt + "'></ul>");
      for (node in nodes.types[nt]) {
        $("#nodetype-" + nt, $container).append("<li><a class='button' rel='" + nt + "' href='#'>" + (node.toString()) + "</a></li>");
      }
    }
    $("a.button", $container).draggable({
      revert: "valid",
      opacity: 0.7,
      helper: "clone",
      revertDuration: 0,
      start: function(event, ui) {
        return $("#sidebar").hide();
      }
    });
    return $("#container").droppable({
      accept: "#tab-new a.button",
      activeClass: "ui-state-active",
      hoverClass: "ui-state-hover",
      drop: function(event, ui) {
        nodegraph.create_node(ui.draggable.attr("rel"), jQuery.trim(ui.draggable.html()), ui.position.left + $("#container-wrapper").scrollLeft() - 10, ui.position.top - 10 + $("#container-wrapper").scrollTop());
        return $("#sidebar").show();
      }
    });
  };
  nodegraph = {};
  nodegraph.nodes = [];
  nodegraph.types = false;
  nodegraph.create_node = function(component, type, x, y, inXML) {
    var n;
    if (inXML == null) {
      inXML = false;
    }
    n = false;
    n = new nodes.types[component][type](x, y, inXML);
    nodegraph.nodes.push(n);
    return n;
  };
  nodegraph.get_component_by_type = function(type) {
    var comp, typ;
    if (nodegraph.types === false) {
      nodegraph.types = {};
      for (comp in nodes.types) {
        for (typ in nodes.types[comp]) {
          nodegraph.types[typ.toString()] = comp;
        }
      }
    }
    return nodegraph.types[type];
  };
  nodegraph.render = function() {
    var node, _i, _j, _len, _len2, _ref, _ref2;
    _ref = nodegraph.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      if (node.has_out_connection() === false) {
        node.update();
      }
    }
    _ref2 = nodegraph.nodes;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      node = _ref2[_j];
      node.updated = false;
    }
    return true;
  };
  save_local_file = function() {
    var bb, c, fileSaver, node, _i, _j, _len, _len2, _ref;
    bb = new BlobBuilder();
    bb.append('<?xml version="1.0" encoding="UTF-8"?>\n');
    bb.append("<app>\n");
    bb.append("\t<uid last='" + uid + "' />\n");
    bb.append("\t<nodes>\n");
    _ref = nodegraph.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      bb.append(node.toXML());
    }
    bb.append("\t</nodes>\n");
    bb.append("\t<connections>\n");
    for (_j = 0, _len2 = node_connections.length; _j < _len2; _j++) {
      c = node_connections[_j];
      bb.append(c.toXML());
    }
    bb.append("\t</connections>\n");
    bb.append("</app>");
    return fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.xml");
  };
  load_local_file_input_changed = function(e) {
    var file, reader;
    clear_workspace();
    file = this.files[0];
    reader = new FileReader();
    reader.onload = function(e) {
      var loaded_data, txt;
      txt = e.target.result;
      loaded_data = $(txt);
      $("node", loaded_data).each(function() {
        var $this, component, n, nid, type, x, y;
        $this = $(this);
        x = parseInt($this.attr("x"));
        y = parseInt($this.attr("y"));
        nid = parseInt($this.attr("nid"));
        type = $this.attr("type");
        component = nodegraph.get_component_by_type(type);
        return n = nodegraph.create_node(component, type, x, y, $this);
      });
      $("connection", loaded_data).each(function() {
        var $this, c, cid, from, to;
        $this = $(this);
        from = parseInt($this.attr("from"));
        to = parseInt($this.attr("to"));
        cid = parseInt($this.attr("id"));
        from = nodes.fields[from.toString()];
        to = nodes.fields[to.toString()];
        return c = new NodeConnection(from, to, cid);
      });
      return uid = parseInt($("uid", loaded_data).attr("last"));
    };
    return reader.readAsText(file, "UTF-8");
  };
  clear_workspace = function() {
    remove_all_connections();
    remove_all_nodes();
    return reset_global_variables();
  };
  remove_all_nodes = function() {
    var node, _i, _len, _ref;
    $("#tab-attribute").html("");
    _ref = nodegraph.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      node.remove();
    }
    return true;
  };
  remove_all_connections = function() {
    while (node_connections.length > 0) {
      node_connections[0].remove();
    }
    return true;
  };
  reset_global_variables = function() {
    uid = 0;
    node_connections = [];
    nodegraph.nodes = [];
    nodes.fields = {};
    nodes.list = [];
    return webgl_materials_node = [];
  };
}).call(this);
