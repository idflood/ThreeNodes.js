(function() {
  var NodeBase, NodeConnection, NodeField, NodeNumberSimple, animate, field_click_1, fields, get_uid, init_sidebar_search, init_tab_new_node, make_sidebar_toggle, node_connections, nodegraph, nodes, on_ui_window_resize, render, render_connections, svg, uid;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
  uid = 0;
  get_uid = function() {
    return uid += 1;
  };
  svg = false;
  animate = function() {
    requestAnimationFrame(animate);
    return render();
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
      this.listener = function(v) {
        return this.on_output_signal(v);
      };
      this.render();
      this.from_field.signal.add(this.listener, this);
      this.from_field.signal.dispatch(this.from_field.val);
    }
    NodeConnection.prototype.on_output_signal = function(v) {
      return this.to_field.signal.dispatch(v);
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
      this.from_field.signal.remove(this.listener);
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
      this.set = __bind(this.set, this);
      self = this;
      this.signal = new signals.Signal();
      this.node = false;
      this.is_output = false;
      this.connections = [];
      this.signal.add(function(v) {
        return self.on_value_changed(v);
      });
      this.signal.dispatch(this.val);
    }
    NodeField.prototype.set = function(v) {
      return this.signal.dispatch(v);
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
      return val;
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
      Float.__super__.constructor.apply(this, arguments);
    }
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
      this.add_center_textfield = __bind(this.add_center_textfield, this);
      this.addOutput = __bind(this.addOutput, this);
      this.addInput = __bind(this.addInput, this);
      this.addFields = __bind(this.addFields, this);
      this.apply_fields_to_val = __bind(this.apply_fields_to_val, this);
      this.get_out = __bind(this.get_out, this);
      this.get_in = __bind(this.get_in, this);
      this.update = __bind(this.update, this);
      this.compute = __bind(this.compute, this);
      this.update_inputs = __bind(this.update_inputs, this);
      this.has_out_connection = __bind(this.has_out_connection, this);
      this.typename = __bind(this.typename, this);
      this.nid = get_uid();
      this.container = $("#container");
      this.out_connections = [];
      this.node_fields = {};
      this.node_fields.inputs = {};
      this.node_fields.outputs = {};
      this.node_fields_by_name = {};
      this.node_fields_by_name.inputs = {};
      this.node_fields_by_name.outputs = {};
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
    NodeBase.prototype.update_inputs = function() {
      var f, _results;
      _results = [];
      for (f in this.node_fields.inputs) {
        _results.push(this.node_fields.inputs[f].update_input_node());
      }
      return _results;
    };
    NodeBase.prototype.compute = function() {
      return this.value = this.value;
    };
    NodeBase.prototype.update = function() {
      if (this.updated === true) {
        return true;
      }
      this.updated = true;
      this.update_inputs();
      return this.compute();
    };
    NodeBase.prototype.get_in = function(n) {
      return this.node_fields_by_name.inputs[n];
    };
    NodeBase.prototype.get_out = function(n) {
      return this.node_fields_by_name.outputs[n];
    };
    NodeBase.prototype.apply_fields_to_val = function(afields, target) {
      var f, nf, _results;
      _results = [];
      for (f in afields) {
        nf = afields[f];
        _results.push(nf.name !== "children" ? target[nf.name] = this.get_in(nf.name).val : void 0);
      }
      return _results;
    };
    NodeBase.prototype.create_field_from_default_type = function(fname, default_value) {
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
    NodeBase.prototype.addFields = function(fields_array) {
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
    NodeBase.prototype.addInput = function(field) {
      field.node = this;
      this.node_fields.inputs["fid-" + field.fid] = field;
      this.node_fields_by_name.inputs[field.name] = field;
      $(".inputs", this.main_view).append(field.render_button());
      this.add_field_listener($("#fid-" + field.fid));
      return field;
    };
    NodeBase.prototype.addOutput = function(field) {
      field.node = this;
      field.is_output = true;
      this.node_fields.outputs["fid-" + field.fid] = field;
      this.node_fields_by_name.outputs[field.name] = field;
      $(".outputs", this.main_view).append(field.render_button());
      this.add_field_listener($("#fid-" + field.fid));
      return field;
    };
    NodeBase.prototype.add_center_textfield = function(field) {
      var f_in;
      $(".options .center", this.main_view).append("<div><input type='text' id='f-txt-input-" + field.fid + "' /></div>");
      f_in = $("#f-txt-input-" + field.fid);
      field.signal.add(function(v) {
        return f_in.val(v.toString().substring(0, 10));
      });
      f_in.val(field.val);
      if (field.is_output === true) {
        return f_in.attr("disabled", "disabled");
      } else {
        return f_in.keypress(function(e) {
          if (e.which === 13) {
            field.signal.dispatch($(this).val());
            return $(this).blur();
          }
        });
      }
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
      field = this.node_fields[f_type][f_name];
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
      return $(".head", this.main_view).dblclick(function(e) {
        return $(".options", n.main_view).animate({
          height: 'toggle'
        }, 120, function() {
          return render_connections();
        });
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
      this.v_in = this.addInput(new fields.types.Float("in", 0));
      this.v_out = this.addOutput(new fields.types.Float("out", 0));
    }
    NodeNumberSimple.prototype.process_val = function(num, i) {
      return num;
    };
    NodeNumberSimple.prototype.compute = function() {
      var res;
      res = false;
      switch ($.type(this.v_in.val)) {
        case "array":
          res = _.map(this.v_in.val, function(n, i) {
            return this.process_val(n, i);
          });
          break;
        default:
          res = this.process_val(this.v_in.val, 0);
      }
      if (this.v_out.val !== res) {
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
      this.add_center_textfield(this.v_in);
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
      this.addFields({
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
      return this.get_out("out").set(this.get_in("string"));
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
  nodes.types.Math.Mult = (function() {
    __extends(Mult, NodeNumberSimple);
    function Mult(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Mult.__super__.constructor.call(this, x, y);
      this.v_factor = this.addInput(new fields.types.Float("factor", 2));
    }
    Mult.prototype.process_val = function(num, i) {
      return num * this.v_factor.val;
    };
    Mult.prototype.typename = function() {
      return "Mult";
    };
    return Mult;
  })();
  nodes.types.Math.Max = (function() {
    __extends(Max, NodeNumberSimple);
    function Max(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Max.__super__.constructor.call(this, x, y);
      this.v_inb = this.addInput(new fields.types.Float("in2", 0));
    }
    Max.prototype.process_val = function(num, i) {
      return Math.max(num, this.v_inb.val);
    };
    Max.prototype.typename = function() {
      return "Max";
    };
    return Max;
  })();
  nodes.types.Math.Min = (function() {
    __extends(Min, NodeNumberSimple);
    function Min(x, y) {
      this.typename = __bind(this.typename, this);
      this.process_val = __bind(this.process_val, this);      Min.__super__.constructor.call(this, x, y);
      this.v_inb = this.addInput(new fields.types.Float("in2", 0));
    }
    Min.prototype.process_val = function(num, i) {
      return Math.min(num, this.v_inb.val);
    };
    Min.prototype.typename = function() {
      return "Min";
    };
    return Min;
  })();
  nodes.types.Utils.Random = (function() {
    __extends(Random, NodeBase);
    function Random(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Random.__super__.constructor.call(this, x, y);
      this.addFields({
        inputs: {
          "min": 0,
          "max": 1
        },
        outputs: {
          "out": 0
        }
      });
      this.add_center_textfield(this.get_out("out"));
    }
    Random.prototype.compute = function() {
      var old;
      old = this.get_out("out").val;
      this.value = this.get_in("min").val + Math.random() * (this.get_in("max").val - this.get_in("min").val);
      if (this.value !== old) {
        return this.get_out("out").set(this.value);
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
      this.addFields({
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
      old = this.get_out("out").val;
      this.value = [];
      for (f in this.node_fields.inputs) {
        k = this.node_fields.inputs[f];
        if (k.val !== null) {
          this.value[this.value.length] = k.val;
        }
      }
      if (this.value !== old) {
        return this.get_out("out").set(this.value);
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
      this.addFields({
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
      old = this.get_out("out").val;
      this.value = false;
      arr = this.get_in("array").val;
      ind = parseInt(this.get_in("index").val);
      if ($.type(arr) === "array") {
        this.value = arr[ind % arr.length];
      }
      if (this.value !== old) {
        return this.get_out("out").set(this.value);
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
      this.addFields({
        inputs: {
          "reset": false,
          "pause": false,
          "max": 99999999999
        },
        outputs: {
          "out": 0
        }
      });
      this.add_center_textfield(this.get_out("out"));
    }
    Timer.prototype.get_time = function() {
      return new Date().getTime();
    };
    Timer.prototype.compute = function() {
      var diff, now, oldval;
      oldval = this.get_out("out").val;
      now = this.get_time();
      if (this.get_in("pause").val === false) {
        this.counter += now - this.old;
      }
      if (this.get_in("reset").val === true) {
        this.counter = 0;
      }
      diff = this.get_in("max").val - this.counter;
      if (diff <= 0) {
        this.counter = 0;
      }
      this.old = now;
      return this.get_out("out").set(this.counter);
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
      this.addFields({
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
      old = this.get_out("xy").val;
      this.value = this.get_in("xy").val;
      if (this.get_in("xy").connections.length === 0) {
        this.value = new THREE.Vector2(this.get_in("x").val, this.get_in("y").val);
      }
      if (this.value !== old) {
        this.get_out("xy").set(this.value);
        this.get_out("x").set(this.value.x);
        return this.get_out("y").set(this.value.y);
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
      this.addFields({
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
      old = this.get_out("xyz").val;
      this.value = this.get_in("xyz").val;
      if (this.get_in("xyz").connections.length === 0) {
        this.value = new THREE.Vector3(this.get_in("x").val, this.get_in("y").val, this.get_in("z").val);
      }
      if (this.value !== old) {
        this.get_out("xyz").set(this.value);
        this.get_out("x").set(this.value.x);
        this.get_out("y").set(this.value.y);
        return this.get_out("z").set(this.value.z);
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
      this.addFields({
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
      old = this.get_out("rgb").val;
      this.value = this.get_in("rgb").val;
      if (this.get_in("rgb").connections.length === 0) {
        this.value = new THREE.Color(this.get_in("r").val, this.get_in("g").val, this.get_in("b").val);
      }
      if (this.value !== old) {
        this.get_out("rgb").set(this.value);
        this.get_out("r").set(this.value.x);
        this.get_out("g").set(this.value.y);
        return this.get_out("b").set(this.value.z);
      }
    };
    Color.prototype.typename = function() {
      return "Color";
    };
    return Color;
  })();
  nodes.types.Geometry.CubeGeometry = (function() {
    __extends(CubeGeometry, NodeBase);
    function CubeGeometry(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      CubeGeometry.__super__.constructor.call(this, x, y);
      this.ob = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1);
      this.addFields({
        inputs: {
          "materials": {
            type: "Array",
            val: []
          },
          "flip": -1,
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
    CubeGeometry.prototype.compute = function() {
      this.apply_fields_to_val(this.node_fields.inputs, this.ob);
      return this.get_out("out").set(this.ob);
    };
    CubeGeometry.prototype.typename = function() {
      return "CubeGeometry";
    };
    return CubeGeometry;
  })();
  nodes.types.Three.Object3D = (function() {
    __extends(Object3D, NodeBase);
    function Object3D(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      Object3D.__super__.constructor.call(this, x, y);
      this.ob = new THREE.Object3D();
      this.addFields({
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
      this.apply_fields_to_val(this.node_fields.inputs, this.ob);
      _ref = this.get_in("children").val;
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
        ind = this.get_in("children").val.indexOf(child);
        if (ind !== -1) {
          this.ob.removeChild(child);
        }
      }
      return this.get_out("out").set(this.ob);
    };
    Object3D.prototype.typename = function() {
      return "Object3D";
    };
    return Object3D;
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
      this.apply_fields_to_val(this.node_fields.inputs, this.ob);
      childs_in = this.get_in("children").val;
      _ref = this.ob.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        ind = childs_in.indexOf(child);
        if (ind === -1) {
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
      return this.get_out("out").set(this.ob);
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
      this.addFields({
        inputs: {
          "materials": {
            type: "Any",
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
      this.get_out("out").set(this.ob);
    }
    Mesh.prototype.compute = function() {
      this.apply_fields_to_val(this.node_fields.inputs, this.ob);
      return this.get_out("out").set(this.ob);
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
      this.addFields({
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
      this.apply_fields_to_val(this.node_fields.inputs, this.ob);
      return this.get_out("out").set(this.ob);
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
      this.addFields({
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
      this.get_in("camera").val.position.z = 1000;
      this.win = window.open('', 'win' + this.nid, "width=800,height=600,scrollbars=false");
      this.win.document.body.appendChild(this.ob.domElement);
    }
    WebGLRenderer.prototype.apply_size = function() {
      return this.ob.setSize(this.get_in("width").val, this.get_in("height").val);
    };
    WebGLRenderer.prototype.compute = function() {
      var cam, sce;
      this.apply_size();
      sce = this.get_in("scene").val;
      cam = this.get_in("camera").val;
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
      this.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(1, 1, 1)
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
      this.apply_fields_to_val(this.node_fields.inputs, this.ob);
      return this.get_out("out").set(this.ob);
    };
    PointLight.prototype.typename = function() {
      return "PointLight";
    };
    return PointLight;
  })();
  nodes.types.Materials.MeshBasicMaterial = (function() {
    __extends(MeshBasicMaterial, NodeBase);
    function MeshBasicMaterial(x, y) {
      this.typename = __bind(this.typename, this);
      this.compute = __bind(this.compute, this);      MeshBasicMaterial.__super__.constructor.call(this, x, y);
      this.ob = new THREE.MeshBasicMaterial({
        color: 0xff0000
      });
      this.addFields({
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
    MeshBasicMaterial.prototype.compute = function() {
      this.apply_fields_to_val(this.node_fields.inputs, this.ob);
      return this.get_out("out").set(this.ob);
    };
    MeshBasicMaterial.prototype.typename = function() {
      return "MeshBasicMaterial";
    };
    return MeshBasicMaterial;
  })();
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
