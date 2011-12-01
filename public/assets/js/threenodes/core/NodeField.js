var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node_field_input.tmpl.html", "text!templates/node_field_output.tmpl.html", 'order!threenodes/utils/Utils', "order!libs/signals.min"], function($, _, Backbone, _view_node_field_in, _view_node_field_out) {
  ThreeNodes.NodeField = (function() {
    NodeField.connections = false;
    function NodeField(name, val, possible_values, fid) {
      var self;
      this.name = name;
      this.val = val;
      this.possible_values = possible_values != null ? possible_values : false;
      this.fid = fid != null ? fid : ThreeNodes.Utils.get_uid();
      this.create_sidebar_container = __bind(this.create_sidebar_container, this);
      this.on_value_changed = __bind(this.on_value_changed, this);
      this.remove_connections = __bind(this.remove_connections, this);
      this.unregister_connection = __bind(this.unregister_connection, this);
      this.add_connection = __bind(this.add_connection, this);
      this.compute_value = __bind(this.compute_value, this);
      this.render_button = __bind(this.render_button, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.render_connections = __bind(this.render_connections, this);
      this.toXML = __bind(this.toXML, this);
      this.toJSON = __bind(this.toJSON, this);
      this.getSliceCount = __bind(this.getSliceCount, this);
      this.isConnected = __bind(this.isConnected, this);
      this.isChanged = __bind(this.isChanged, this);
      this.get = __bind(this.get, this);
      this.set = __bind(this.set, this);
      self = this;
      this.on_value_update_hooks = {};
      this.signal = new signals.Signal();
      this.node = false;
      this.is_output = false;
      this.changed = true;
      this.connections = [];
      ThreeNodes.nodes.fields[this.fid] = this;
      this.on_value_changed(this.val);
    }
    NodeField.prototype.set = function(v) {
      var connection, hook, _i, _len, _ref;
      this.changed = true;
      this.node.dirty = true;
      v = this.on_value_changed(v);
      for (hook in this.on_value_update_hooks) {
        this.on_value_update_hooks[hook](v);
      }
      if (this.is_output === true) {
        _ref = this.connections;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          connection = _ref[_i];
          connection.to_field.set(v);
        }
      }
      return true;
    };
    NodeField.prototype.get = function(index) {
      if (index == null) {
        index = 0;
      }
      if ($.type(this.val) !== "array") {
        return this.val;
      } else {
        return this.val[index % this.val.length];
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
      if (jQuery.type(this.val) !== "array") {
        return 1;
      }
      return this.val.length;
    };
    NodeField.prototype.toJSON = function() {
      var res, val_type;
      res = {
        name: this.name
      };
      val_type = jQuery.type(this.get());
      if (val_type !== "object" && val_type !== "array") {
        res.val = this.get();
      }
      return res;
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
      layout = _view_node_field_in;
      if (this.is_output) {
        layout = _view_node_field_out;
      }
      return $.tmpl(layout, this);
    };
    NodeField.prototype.compute_value = function(val) {
      return val;
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
    NodeField.prototype.unregister_connection = function(c) {
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
      var self;
      self = this;
      switch ($.type(val)) {
        case "array":
          this.val = _.map(val, function(n) {
            return self.compute_value(n);
          });
          break;
        default:
          this.val = this.compute_value(val);
      }
      return this.val;
    };
    NodeField.prototype.create_sidebar_container = function() {
      var $cont, $target;
      $cont = $("#tab-attribute");
      $cont.append("<div id='side-field-" + this.fid + "'></div>");
      $target = $("#side-field-" + this.fid);
      $target.append("<h3>" + this.name + "</h3>");
      return $target;
    };
    return NodeField;
  })();
  ThreeNodes.fields.types.Any = (function() {
    __extends(Any, ThreeNodes.NodeField);
    function Any() {
      this.get = __bind(this.get, this);
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
    Any.prototype.get = function(index) {
      if (index == null) {
        index = 0;
      }
      return this.val;
    };
    return Any;
  })();
  ThreeNodes.fields.types.Array = (function() {
    __extends(Array, ThreeNodes.NodeField);
    function Array() {
      this.get = __bind(this.get, this);
      this.on_value_changed = __bind(this.on_value_changed, this);
      this.remove_connections = __bind(this.remove_connections, this);
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
    Array.prototype.remove_connections = function() {
      Array.__super__.remove_connections.apply(this, arguments);
      if (this.is_output === false) {
        return this.on_value_changed([]);
      }
    };
    Array.prototype.on_value_changed = function(val) {
      return this.val = this.compute_value(val);
    };
    Array.prototype.get = function(index) {
      if (index == null) {
        index = 0;
      }
      return this.val;
    };
    return Array;
  })();
  ThreeNodes.fields.types.Bool = (function() {
    __extends(Bool, ThreeNodes.NodeField);
    function Bool() {
      this.compute_value = __bind(this.compute_value, this);
      Bool.__super__.constructor.apply(this, arguments);
    }
    Bool.prototype.compute_value = function(val) {
      var res;
      res = this.get();
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
  ThreeNodes.fields.types.String = (function() {
    __extends(String, ThreeNodes.NodeField);
    function String() {
      this.compute_value = __bind(this.compute_value, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      String.__super__.constructor.apply(this, arguments);
    }
    String.prototype.render_sidebar = function() {
      var $target, f_in, self;
      self = this;
      $target = this.create_sidebar_container();
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
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
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
  ThreeNodes.fields.types.Float = (function() {
    __extends(Float, ThreeNodes.NodeField);
    function Float() {
      this.compute_value = __bind(this.compute_value, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.create_sidebar_input = __bind(this.create_sidebar_input, this);
      this.create_sidebar_select = __bind(this.create_sidebar_select, this);
      Float.__super__.constructor.apply(this, arguments);
    }
    Float.prototype.create_sidebar_select = function($target) {
      var dval, f, input, self;
      self = this;
      input = "<div><select>";
      for (f in this.possible_values) {
        dval = this.possible_values[f];
        if (dval === this.val) {
          input += "<option value='" + dval + "' selected='selected'>" + f + "</option>";
        } else {
          input += "<option value='" + dval + "'>" + f + "</option>";
        }
      }
      input += "</select></div>";
      $target.append(input);
      $("select", $target).change(function(e) {
        return self.set($(this).val());
      });
      return true;
    };
    Float.prototype.create_sidebar_input = function($target) {
      var f_in, self;
      self = this;
      $target.append("<div><input type='text' id='side-field-txt-input-" + this.fid + "' /></div>");
      f_in = $("#side-field-txt-input-" + this.fid);
      this.on_value_update_hooks.update_sidebar_textfield = function(v) {
        return f_in.val(v.toString().substring(0, 10));
      };
      f_in.val(this.get());
      return f_in.keypress(function(e) {
        if (e.which === 13) {
          self.set($(this).val());
          return $(this).blur();
        }
      });
    };
    Float.prototype.render_sidebar = function() {
      var $target;
      $target = this.create_sidebar_container();
      if (this.possible_values) {
        this.create_sidebar_select($target);
      } else {
        this.create_sidebar_input($target);
      }
      return true;
    };
    Float.prototype.compute_value = function(val) {
      var res;
      res = this.val;
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "number":
          res = parseFloat(val);
          break;
        case "string":
          res = parseFloat(val);
          break;
        case "boolean":
          if (val) {
            res = 1;
          } else {
            res = 0;
          }
      }
      return res;
    };
    return Float;
  })();
  ThreeNodes.fields.types.Vector2 = (function() {
    __extends(Vector2, ThreeNodes.NodeField);
    function Vector2() {
      this.compute_value = __bind(this.compute_value, this);
      Vector2.__super__.constructor.apply(this, arguments);
    }
    Vector2.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Vector2) {
            res = val;
          }
      }
      return res;
    };
    return Vector2;
  })();
  ThreeNodes.fields.types.Vector3 = (function() {
    __extends(Vector3, ThreeNodes.NodeField);
    function Vector3() {
      this.compute_value = __bind(this.compute_value, this);
      Vector3.__super__.constructor.apply(this, arguments);
    }
    Vector3.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Vector3) {
            res = val;
          }
      }
      return res;
    };
    return Vector3;
  })();
  ThreeNodes.fields.types.Vector4 = (function() {
    __extends(Vector4, ThreeNodes.NodeField);
    function Vector4() {
      this.compute_value = __bind(this.compute_value, this);
      Vector4.__super__.constructor.apply(this, arguments);
    }
    Vector4.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Vector4) {
            res = val;
          }
      }
      return res;
    };
    return Vector4;
  })();
  ThreeNodes.fields.types.Quaternion = (function() {
    __extends(Quaternion, ThreeNodes.NodeField);
    function Quaternion() {
      this.compute_value = __bind(this.compute_value, this);
      Quaternion.__super__.constructor.apply(this, arguments);
    }
    Quaternion.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Quaternion) {
            res = val;
          }
      }
      return res;
    };
    return Quaternion;
  })();
  ThreeNodes.fields.types.Color = (function() {
    __extends(Color, ThreeNodes.NodeField);
    function Color() {
      this.compute_value = __bind(this.compute_value, this);
      Color.__super__.constructor.apply(this, arguments);
    }
    Color.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "number":
          res = new THREE.Color().setRGB(val, val, val);
          break;
        case "object":
          switch (val.constructor) {
            case THREE.Color:
              res = val;
              break;
            case THREE.Vector3:
              res = new THREE.Color().setRGB(val.x, val.y, val.z);
          }
          break;
        case "boolean":
          if (val) {
            res = new THREE.Color(0xffffff);
          } else {
            res = new THREE.Color(0x000000);
          }
      }
      return res;
    };
    return Color;
  })();
  ThreeNodes.fields.types.Object3D = (function() {
    __extends(Object3D, ThreeNodes.NodeField);
    function Object3D() {
      this.compute_value = __bind(this.compute_value, this);
      Object3D.__super__.constructor.apply(this, arguments);
    }
    Object3D.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Object3D || val instanceof THREE.Object3D) {
            res = val;
          }
      }
      return res;
    };
    return Object3D;
  })();
  ThreeNodes.fields.types.Scene = (function() {
    __extends(Scene, ThreeNodes.NodeField);
    function Scene() {
      this.compute_value = __bind(this.compute_value, this);
      Scene.__super__.constructor.apply(this, arguments);
    }
    Scene.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Scene) {
            res = val;
          }
      }
      return res;
    };
    return Scene;
  })();
  ThreeNodes.fields.types.Camera = (function() {
    __extends(Camera, ThreeNodes.NodeField);
    function Camera() {
      this.compute_value = __bind(this.compute_value, this);
      Camera.__super__.constructor.apply(this, arguments);
    }
    Camera.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Camera ||  val.constructor === THREE.PerspectiveCamera ||  val.constructor === THREE.OrthographicCamera) {
            res = val;
          }
      }
      return res;
    };
    return Camera;
  })();
  ThreeNodes.fields.types.Mesh = (function() {
    __extends(Mesh, ThreeNodes.NodeField);
    function Mesh() {
      this.compute_value = __bind(this.compute_value, this);
      Mesh.__super__.constructor.apply(this, arguments);
    }
    Mesh.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Mesh || val instanceof THREE.Mesh) {
            res = val;
          }
      }
      return res;
    };
    return Mesh;
  })();
  ThreeNodes.fields.types.Geometry = (function() {
    __extends(Geometry, ThreeNodes.NodeField);
    function Geometry() {
      this.compute_value = __bind(this.compute_value, this);
      Geometry.__super__.constructor.apply(this, arguments);
    }
    Geometry.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Geometry || val instanceof THREE.Geometry) {
            res = val;
          }
      }
      return res;
    };
    return Geometry;
  })();
  return ThreeNodes.fields.types.Texture = (function() {
    __extends(Texture, ThreeNodes.NodeField);
    function Texture() {
      this.compute_value = __bind(this.compute_value, this);
      Texture.__super__.constructor.apply(this, arguments);
    }
    Texture.prototype.compute_value = function(val) {
      var res;
      res = this.get();
      switch ($.type(val)) {
        case "array":
          res = val;
          break;
        case "object":
          if (val.constructor === THREE.Texture || val instanceof THREE.Texture) {
            res = val;
          }
      }
      return res;
    };
    return Texture;
  })();
});