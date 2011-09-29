(function() {
  var NodeBase, NodeConnection, NodeField, NodeFieldRack, NodeMaterialBase, NodeNumberSimple, animate, field_click_1, fields, flatArraysAreEquals, get_uid, implements, init_sidebar_search, init_tab_new_node, make_sidebar_toggle, node_connections, nodegraph, nodes, on_ui_window_resize, render, render_connections, svg, uid;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
  implements = function() {
    var classes, getter, klass, prop, setter, _i, _len;
    classes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = classes.length; _i < _len; _i++) {
      klass = classes[_i];
      for (prop in klass) {
        this[prop] = klass[prop];
      }
      for (prop in klass.prototype) {
        getter = klass.prototype.__lookupGetter__(prop);
        setter = klass.prototype.__lookupSetter__(prop);
        if (getter || setter) {
          if (getter) {
            this.prototype.__defineGetter__(prop, getter);
          }
          if (setter) {
            this.prototype.__defineSetter__(prop, setter);
          }
        } else {
          this.prototype[prop] = klass.prototype[prop];
        }
      }
    }
    return this;
  };
  if (Object.defineProperty) {
    Object.defineProperty(Function.prototype, "implements", {
      value: implements
    });
  } else {
    Function.prototype.implements = implements;
  }
  nodes = {};
  nodes.list = [];
  nodes.types = {};
  nodes.types.Base = {};
  nodes.types.Math = {};
  nodes.types.Utils = {};
  nodes.types.Geometry = {};
  nodes.types.Three = {};
  nodes.types.Materials = {};
  fields = {};
  fields.types = {};
  svg = false;
  animate = function() {
    render();
    return requestAnimationFrame(animate);
  };
  render = function() {
    return nodegraph.render();
  };
  on_ui_window_resize = function() {
    var h, w;
    w = $(window).width() - 4;
    h = $(window).height() - 4;
    $("#container-wrapper").css({
      width: w,
      height: h
    });
    return $("#sidebar").css("height", h);
  };
  $(document).ready(function() {
    var f1;
    $("#graph").svg({
      onLoad: function(s) {
        return svg = s;
      }
    });
    make_sidebar_toggle();
    f1 = new fields.types.Float("test", 0.4);
    f1.signal.dispatch(42.0);
    $("#sidebar").tabs({
      fx: {
        opacity: 'toggle',
        duration: 100
      }
    });
    console.log("starting...");
    init_tab_new_node();
    animate();
    $(window).resize(on_ui_window_resize);
    on_ui_window_resize();
    return init_sidebar_search();
  });
  node_connections = [];
  render_connections = function() {
    var connection, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = node_connections.length; _i < _len; _i++) {
      connection = node_connections[_i];
      _results.push(connection.render());
    }
    return _results;
  };
  NodeConnection = (function() {
    function NodeConnection(from_field, to_field) {
      this.from_field = from_field;
      this.to_field = to_field;
      this.update_node_from = __bind(this.update_node_from, this);
      this.cid = get_uid();
      this.container = $("#graph");
      this.line = svg.line(0, 0, 0, 0, {
        id: "line-" + this.cid,
        "class": "connection"
      });
      node_connections.push(this);
      this.from_field.add_connection(this);
      this.to_field.add_connection(this);
      this.update();
      this.render();
    }
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
      svg.remove(this.line);
      ind = node_connections.indexOf(this);
      if (ind !== -1) {
        node_connections.splice(ind, 1);
      }
      return false;
    };
    NodeConnection.prototype.render = function() {
      var f1, f2, ofx, ofy;
      f1 = this.get_field_position(this.from_field);
      f2 = this.get_field_position(this.to_field);
      ofx = $("#container-wrapper").scrollLeft();
      ofy = $("#container-wrapper").scrollTop();
      return $("#line-" + this.cid).attr({
        x1: f1.left + ofx,
        y1: f1.top + ofy,
        x2: f2.left + ofx,
        y2: f2.top + ofy
      });
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
      this.get = __bind(this.get, this);
      this.set = __bind(this.set, this);
      self = this;
      this.on_value_update_hooks = {};
      this.signal = new signals.Signal();
      this.node = false;
      this.is_output = false;
      this.connections = [];
      this.on_value_changed(this.val);
    }
    NodeField.prototype.set = function(v) {
      var connection, hook, _i, _len, _ref;
      this.on_value_changed(v);
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
    NodeField.prototype.render_sidebar = function() {
      return false;
    };
    NodeField.prototype.render_button = function() {
      if (this.is_output) {
        return "<div id='fid-" + this.fid + "' class='field field-" + this.name + "' rel='" + this.name + "'>" + this.name + "<a href='#'></a></div>";
      } else {
        return "<div id='fid-" + this.fid + "' class='field field-" + this.name + "' rel='" + this.name + "'><a href='#'></a>" + this.name + "</div>";
      }
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
          if (val.constructor === THREE.Object3D) {
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
          if (val.constructor === THREE.Mesh) {
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
          if (val.constructor === THREE.Geometry) {
            res = val;
          }
      }
      return res;
    };
    return Geometry;
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
        console.log(this.node_fields.inputs[f]);
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
    function NodeBase(x, y) {
      this.x = x;
      this.y = y;
      this.init = __bind(this.init, this);
      this.remove_connection = __bind(this.remove_connection, this);
      this.add_out_connection = __bind(this.add_out_connection, this);
      this.add_field_listener = __bind(this.add_field_listener, this);
      this.create_field_connection = __bind(this.create_field_connection, this);
      this.apply_fields_to_val = __bind(this.apply_fields_to_val, this);
      this.update = __bind(this.update, this);
      this.compute = __bind(this.compute, this);
      this.has_out_connection = __bind(this.has_out_connection, this);
      this.typename = __bind(this.typename, this);
      this.nid = get_uid();
      this.container = $("#container");
      this.out_connections = [];
      this.rack = new NodeFieldRack(this);
      this.value = false;
      this.name = false;
      this.main_view = false;
      this.updated = false;
      this.init();
    }
    NodeBase.prototype.typename = function() {
      return "Node";
    };
    NodeBase.prototype.has_out_connection = function() {
      return this.out_connections.length !== 0;
    };
    NodeBase.prototype.compute = function() {
      return this.value = this.value;
    };
    NodeBase.prototype.update = function() {
      if (this.updated === true) {
        return true;
      }
      this.updated = true;
      this.rack.update_inputs();
      return this.compute();
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
        }).addClass("field-target");
      } else {
        field_click_2 = field;
        new NodeConnection(field_click_1, field_click_2);
        $(".field").removeClass("field-target");
        return field_click_1 = false;
      }
    };
    NodeBase.prototype.add_field_listener = function($field) {
      var f_name, f_type, field, self;
      self = this;
      f_name = $field.attr("id");
      f_type = $field.parent().attr("class");
      field = this.rack.node_fields[f_type][f_name];
      return $field.click(function(e) {
        e.preventDefault();
        if (e.shiftKey === true) {
          return field.remove_connections();
        } else {
          return self.create_field_connection(field);
        }
      });
    };
    NodeBase.prototype.add_out_connection = function(c, field) {
      if (this.out_connections.indexOf(c) === -1) {
        return this.out_connections.push(c);
      }
    };
    NodeBase.prototype.remove_connection = function(c) {
      var c_index;
      c_index = this.out_connections.indexOf(c);
      if (c_index !== -1) {
        return this.out_connections.splice(c_index, 1);
      }
    };
    NodeBase.prototype.init = function() {
      var n;
      n = this;
      this.container.append("<div id='nid-" + this.nid + "' class='node node-" + (this.typename()) + "'><div class='head'>" + (this.typename()) + "</div><div class='options'><div class='inputs'></div><div class='center'></div><div class='outputs'></div></div></div>");
      this.main_view = $("#nid-" + this.nid);
      this.main_view.css({
        left: this.x,
        top: this.y
      });
      this.main_view.draggable({
        drag: function() {
          return render_connections();
        },
        stop: function() {
          return render_connections();
        }
      });
      $(".head", this.main_view).dblclick(function(e) {
        return $(".options", n.main_view).animate({
          height: 'toggle'
        }, 120, function() {
          return render_connections();
        });
      });
      return $(".head", this.main_view).click(function(e) {
        return n.rack.render_sidebar();
      });
    };
    return NodeBase;
  })();
  NodeNumberSimple = (function() {
    __extends(NodeNumberSimple, NodeBase);
    function NodeNumberSimple(x, y) {
      this.compute = __bind(this.compute, this);
      this.process_val = __bind(this.process_val, this);      NodeNumberSimple.__super__.constructor.call(this, x, y);
      this.value = 0;
      this.v_in = this.rack.addInput(new fields.types.Float("in", 0));
      this.v_out = this.rack.addOutput(new fields.types.Float("out", 0));
    }
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
    function Number(x, y) {
      this.typename = __bind(this.typename, this);      Number.__super__.constructor.call(this, x, y);
      this.rack.add_center_textfield(this.v_in);
    }
    Number.prototype.typename = function() {
      return "Number";
    };
    return Number;
  })();
  nodes.types.Base.String = (function() {
    __extends(String, NodeBase);
    function String(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      String.__super__.constructor.call(this, x, y);
      this.value = "";
      this.rack.addFields({
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
    }
    String.prototype.compute = function() {
      return this.rack.get("out", true).set(this.rack.get("string").get());
    };
    String.prototype.typename = function() {
      return "String";
    };
    return String;
  })();
  nodes.types.Math.Sin = (function() {
    __extends(Sin, NodeNumberSimple);
    function Sin(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Sin.__super__.constructor.call(this, x, y);
    }
    Sin.prototype.process_val = function(num, i) {
      return Math.sin(num);
    };
    Sin.prototype.typename = function() {
      return "Sin";
    };
    return Sin;
  })();
  nodes.types.Math.Cos = (function() {
    __extends(Cos, NodeNumberSimple);
    function Cos(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Cos.__super__.constructor.call(this, x, y);
    }
    Cos.prototype.process_val = function(num, i) {
      return Math.cos(num);
    };
    Cos.prototype.typename = function() {
      return "Cos";
    };
    return Cos;
  })();
  nodes.types.Math.Tan = (function() {
    __extends(Tan, NodeNumberSimple);
    function Tan(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Tan.__super__.constructor.call(this, x, y);
    }
    Tan.prototype.process_val = function(num, i) {
      return Math.tan(num);
    };
    Tan.prototype.typename = function() {
      return "Tan";
    };
    return Tan;
  })();
  nodes.types.Math.Round = (function() {
    __extends(Round, NodeNumberSimple);
    function Round(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Round.__super__.constructor.call(this, x, y);
    }
    Round.prototype.process_val = function(num, i) {
      return Math.round(num);
    };
    Round.prototype.typename = function() {
      return "Round";
    };
    return Round;
  })();
  nodes.types.Math.Ceil = (function() {
    __extends(Ceil, NodeNumberSimple);
    function Ceil(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Ceil.__super__.constructor.call(this, x, y);
    }
    Ceil.prototype.process_val = function(num, i) {
      return Math.ceil(num);
    };
    Ceil.prototype.typename = function() {
      return "Ceil";
    };
    return Ceil;
  })();
  nodes.types.Math.Floor = (function() {
    __extends(Floor, NodeNumberSimple);
    function Floor(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Floor.__super__.constructor.call(this, x, y);
    }
    Floor.prototype.process_val = function(num, i) {
      return Math.floor(num);
    };
    Floor.prototype.typename = function() {
      return "Floor";
    };
    return Floor;
  })();
  nodes.types.Math.Mod = (function() {
    __extends(Mod, NodeNumberSimple);
    function Mod(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Mod.__super__.constructor.call(this, x, y);
      this.v_valy = this.rack.addInput(new fields.types.Float("y", 2));
    }
    Mod.prototype.process_val = function(num, i) {
      return num % this.v_valy.get();
    };
    Mod.prototype.typename = function() {
      return "Mod";
    };
    return Mod;
  })();
  nodes.types.Math.Mult = (function() {
    __extends(Mult, NodeNumberSimple);
    function Mult(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Mult.__super__.constructor.call(this, x, y);
      this.v_factor = this.rack.addInput(new fields.types.Float("factor", 2));
    }
    Mult.prototype.process_val = function(num, i) {
      return num * this.v_factor.get();
    };
    Mult.prototype.typename = function() {
      return "Mult";
    };
    return Mult;
  })();
  nodes.types.Math.Min = (function() {
    __extends(Min, NodeNumberSimple);
    function Min(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Min.__super__.constructor.call(this, x, y);
      this.v_inb = this.rack.addInput(new fields.types.Float("in2", 0));
    }
    Min.prototype.process_val = function(num, i) {
      return Math.min(num, this.v_inb.get());
    };
    Min.prototype.typename = function() {
      return "Min";
    };
    return Min;
  })();
  nodes.types.Math.Max = (function() {
    __extends(Max, NodeNumberSimple);
    function Max(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Max.__super__.constructor.call(this, x, y);
      this.v_inb = this.rack.addInput(new fields.types.Float("in2", 0));
    }
    Max.prototype.process_val = function(num, i) {
      return Math.max(num, this.v_inb.get());
    };
    Max.prototype.typename = function() {
      return "Max";
    };
    return Max;
  })();
  nodes.types.Utils.Random = (function() {
    __extends(Random, NodeBase);
    function Random(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Random.__super__.constructor.call(this, x, y);
      this.rack.addFields({
        inputs: {
          "min": 0,
          "max": 1
        },
        outputs: {
          "out": 0
        }
      });
      this.rack.add_center_textfield(this.rack.get("out", true));
    }
    Random.prototype.compute = function() {
      var old;
      old = this.rack.get("out", true).get();
      this.value = this.rack.get("min").get() + Math.random() * (this.rack.get("max").get() - this.rack.get("min").get());
      if (this.value !== old) {
        return this.rack.get("out", true).set(this.value);
      }
    };
    Random.prototype.typename = function() {
      return "Random";
    };
    return Random;
  })();
  nodes.types.Utils.Merge = (function() {
    __extends(Merge, NodeBase);
    function Merge(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Merge.__super__.constructor.call(this, x, y);
      this.rack.addFields({
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
    }
    Merge.prototype.compute = function() {
      var f, k, old;
      old = this.rack.get("out", true).get();
      this.value = [];
      for (f in this.rack.node_fields.inputs) {
        k = this.rack.node_fields.inputs[f];
        if (k.get() !== null) {
          this.value[this.value.length] = k.get();
        }
      }
      if (this.value !== old) {
        return this.rack.get("out", true).set(this.value);
      }
    };
    Merge.prototype.typename = function() {
      return "Merge";
    };
    return Merge;
  })();
  nodes.types.Utils.Get = (function() {
    __extends(Get, NodeBase);
    function Get(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Get.__super__.constructor.call(this, x, y);
      this.rack.addFields({
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
    }
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
    Get.prototype.typename = function() {
      return "Get";
    };
    return Get;
  })();
  nodes.types.Utils.Timer = (function() {
    __extends(Timer, NodeBase);
    function Timer(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);
      this.get_time = __bind(this.get_time, this);      Timer.__super__.constructor.call(this, x, y);
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
      this.rack.add_center_textfield(this.rack.get("out", true));
    }
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
    Timer.prototype.typename = function() {
      return "Timer";
    };
    return Timer;
  })();
  nodes.types.Base.Vector2 = (function() {
    __extends(Vector2, NodeBase);
    function Vector2(x, y) {
      this.compute = __bind(this.compute, this);      Vector2.__super__.constructor.call(this, x, y);
      this.vec = new THREE.Vector2(0, 0);
      this.rack.addFields({
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
    }
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
    Vector2.prototype.typename = function() {
      return "Vector2";
    };
    return Vector2;
  })();
  nodes.types.Base.Vector3 = (function() {
    __extends(Vector3, NodeBase);
    function Vector3(x, y) {
      this.compute = __bind(this.compute, this);      Vector3.__super__.constructor.call(this, x, y);
      this.vec = new THREE.Vector3(0, 0, 0);
      this.rack.addFields({
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
    }
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
    Vector3.prototype.typename = function() {
      return "Vector3";
    };
    return Vector3;
  })();
  nodes.types.Base.Color = (function() {
    __extends(Color, NodeBase);
    function Color(x, y) {
      this.compute = __bind(this.compute, this);      Color.__super__.constructor.call(this, x, y);
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
    }
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
    Color.prototype.typename = function() {
      return "Color";
    };
    return Color;
  })();
  nodes.types.Three.Object3D = (function() {
    __extends(Object3D, NodeBase);
    function Object3D(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Object3D.__super__.constructor.call(this, x, y);
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
          "visible": true
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
    }
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
    Object3D.prototype.typename = function() {
      return "Object3D";
    };
    return Object3D;
  })();
  nodes.types.Geometry.CubeGeometry = (function() {
    __extends(CubeGeometry, NodeBase);
    function CubeGeometry(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);      CubeGeometry.__super__.constructor.call(this, x, y);
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
      this.cached = this.get_cache_array();
    }
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
    CubeGeometry.prototype.typename = function() {
      return "CubeGeometry";
    };
    return CubeGeometry;
  })();
  nodes.types.Geometry.SphereGeometry = (function() {
    __extends(SphereGeometry, NodeBase);
    function SphereGeometry(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);
      this.get_cache_array = __bind(this.get_cache_array, this);      SphereGeometry.__super__.constructor.call(this, x, y);
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
      this.cached = this.get_cache_array();
    }
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
    SphereGeometry.prototype.typename = function() {
      return "SphereGeometry";
    };
    return SphereGeometry;
  })();
  nodes.types.Three.Scene = (function() {
    __extends(Scene, nodes.types.Three.Object3D);
    function Scene(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Scene.__super__.constructor.call(this, x, y);
      this.ob = new THREE.Scene();
    }
    Scene.prototype.compute = function() {
      var child, childs_in, ind, _i, _j, _len, _len2, _ref;
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children', 'lights']);
      childs_in = this.rack.get("children").get();
      _ref = this.ob.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        ind = childs_in.indexOf(child);
        if (ind === -1) {
          console.log("remove");
          console.log(child);
          this.ob.removeChild(child);
        }
      }
      for (_j = 0, _len2 = childs_in.length; _j < _len2; _j++) {
        child = childs_in[_j];
        ind = this.ob.children.indexOf(child);
        if (ind === -1) {
          console.log(child);
          this.ob.addChild(child);
        }
      }
      return this.rack.get("out", true).set(this.ob);
    };
    Scene.prototype.typename = function() {
      return "Scene";
    };
    return Scene;
  })();
  nodes.types.Three.Mesh = (function() {
    __extends(Mesh, nodes.types.Three.Object3D);
    function Mesh(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Mesh.__super__.constructor.call(this, x, y);
      this.ob = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
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
              new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
              })
            ]
          },
          "overdraw": false
        }
      });
      this.rack.get("out", true).set(this.ob);
      this.geometry_cache = this.rack.get('geometry').get().id;
      this.materials_cache = this.rack.get('materials').get();
    }
    Mesh.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children', 'geometry']);
      if (this.geometry_cache !== this.rack.get('geometry').get().id || flatArraysAreEquals(this.materials_cache, this.rack.get('materials').get()) === false) {
        this.ob = new THREE.Mesh(this.rack.get('geometry').get(), this.rack.get('materials').get());
        this.geometry_cache = this.rack.get('geometry').get().id;
        this.materials_cache = this.rack.get('materials').get();
      }
      return this.rack.get("out", true).set(this.ob);
    };
    Mesh.prototype.typename = function() {
      return "Mesh";
    };
    return Mesh;
  })();
  nodes.types.Three.Camera = (function() {
    __extends(Camera, NodeBase);
    function Camera(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Camera.__super__.constructor.call(this, x, y);
      this.ob = new THREE.Camera();
      this.rack.addFields({
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
    }
    Camera.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.get("out", true).set(this.ob);
    };
    Camera.prototype.typename = function() {
      return "Camera";
    };
    return Camera;
  })();
  nodes.types.Three.WebGLRenderer = (function() {
    __extends(WebGLRenderer, NodeBase);
    function WebGLRenderer(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);
      this.apply_size = __bind(this.apply_size, this);      WebGLRenderer.__super__.constructor.call(this, x, y);
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
          }
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
      this.win = window.open('', 'win' + this.nid, "width=800,height=600,scrollbars=false");
      this.win.document.body.appendChild(this.ob.domElement);
    }
    WebGLRenderer.prototype.apply_size = function() {
      var h, w;
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
      sce = this.rack.get("scene").get();
      cam = this.rack.get("camera").get();
      return this.ob.render(sce, cam);
    };
    WebGLRenderer.prototype.typename = function() {
      return "WebGLRenderer";
    };
    return WebGLRenderer;
  })();
  nodes.types.Three.PointLight = (function() {
    __extends(PointLight, NodeBase);
    function PointLight(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      PointLight.__super__.constructor.call(this, x, y);
      this.ob = new THREE.PointLight(0xffffff);
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xffffff)
          },
          "position": {
            type: "Vector3",
            val: new THREE.Vector3()
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
    }
    PointLight.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.get("out", true).set(this.ob);
    };
    PointLight.prototype.typename = function() {
      return "PointLight";
    };
    return PointLight;
  })();
  NodeMaterialBase = (function() {
    __extends(NodeMaterialBase, NodeBase);
    function NodeMaterialBase(x, y) {
      this.compute = __bind(this.compute, this);      NodeMaterialBase.__super__.constructor.call(this, x, y);
      this.ob = false;
      this.rack.addFields({
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
    }
    NodeMaterialBase.prototype.compute = function() {
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      return this.rack.get("out", true).set(this.ob);
    };
    return NodeMaterialBase;
  })();
  nodes.types.Materials.MeshBasicMaterial = (function() {
    __extends(MeshBasicMaterial, NodeMaterialBase);
    function MeshBasicMaterial(x, y) {
      this.typename = __bind(this.typename, this);      MeshBasicMaterial.__super__.constructor.call(this, x, y);
      this.ob = new THREE.MeshBasicMaterial({
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
    }
    MeshBasicMaterial.prototype.typename = function() {
      return "MeshBasicMaterial";
    };
    return MeshBasicMaterial;
  })();
  nodes.types.Materials.MeshLambertMaterial = (function() {
    __extends(MeshLambertMaterial, NodeMaterialBase);
    function MeshLambertMaterial(x, y) {
      this.typename = __bind(this.typename, this);      MeshLambertMaterial.__super__.constructor.call(this, x, y);
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
    }
    MeshLambertMaterial.prototype.typename = function() {
      return "MeshLambertMaterial";
    };
    return MeshLambertMaterial;
  })();
  make_sidebar_toggle = function() {
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
  init_tab_new_node = function() {
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
  nodegraph.create_node = function(component, type, x, y) {
    var n;
    n = false;
    n = new nodes.types[component][type](x, y);
    return nodegraph.nodes.push(n);
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
}).call(this);
