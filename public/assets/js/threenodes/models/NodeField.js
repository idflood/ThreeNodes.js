var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/node_field_input.tmpl.html", "text!templates/node_field_output.tmpl.html", 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_field_in, _view_node_field_out) {
  "use strict";  ThreeNodes.NodeField = (function(_super) {

    __extends(NodeField, _super);

    function NodeField() {
      this.create_subval_textinput = __bind(this.create_subval_textinput, this);
      this.create_sidebar_field_title = __bind(this.create_sidebar_field_title, this);
      this.link_textfield_to_subval = __bind(this.link_textfield_to_subval, this);
      this.link_textfield_to_val = __bind(this.link_textfield_to_val, this);
      this.create_textfield = __bind(this.create_textfield, this);
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
      this.toCode = __bind(this.toCode, this);
      this.toJSON = __bind(this.toJSON, this);
      this.is_animation_property = __bind(this.is_animation_property, this);
      this.getSliceCount = __bind(this.getSliceCount, this);
      this.isConnected = __bind(this.isConnected, this);
      this.isChanged = __bind(this.isChanged, this);
      this.getValue = __bind(this.getValue, this);
      this.setValue = __bind(this.setValue, this);
      this.setFID = __bind(this.setFID, this);
      this.initialize = __bind(this.initialize, this);
      this.sync = __bind(this.sync, this);
      NodeField.__super__.constructor.apply(this, arguments);
    }

    NodeField.prototype.defaults = function() {
      return {
        fid: -1,
        name: "fieldname",
        is_output: false,
        value: 0,
        "default": null
      };
    };

    NodeField.prototype.sync = function() {};

    NodeField.prototype.initialize = function(options) {
      var self;
      self = this;
      this.on_value_update_hooks = {};
      this.node = options.node;
      this.changed = true;
      this.connections = [];
      if (this.get("fid") === -1) {
        return this.set("fid", ThreeNodes.Utils.get_uid());
      }
    };

    NodeField.prototype.setFID = function(fid) {
      return this.set("fid", fid);
    };

    NodeField.prototype.onRegister = function() {
      var ng;
      ng = this.context.injector.get("NodeGraph");
      ng.fields_by_fid[this.fid] = this;
      return this.on_value_changed(this.val);
    };

    NodeField.prototype.setValue = function(v) {
      var connection, hook, new_val, prev_val, tmp_val, _i, _len, _ref;
      this.changed = true;
      if (this.node) this.node.dirty = true;
      prev_val = this.get("value");
      new_val = this.on_value_changed(v);
      if ($.type(new_val) === "array") {
        tmp_val = _.filter(new_val, function(item) {
          return item !== null;
        });
        if (this.constructor === ThreeNodes.fields.types.Array) {
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
        if (this.get("default") !== null && this.get("default") !== void 0) {
          prev_val = this.get("default");
        }
        new_val = prev_val;
      }
      this.set("value", new_val);
      for (hook in this.on_value_update_hooks) {
        this.on_value_update_hooks[hook](new_val);
      }
      if (this.get("is_output") === true) {
        _ref = this.connections;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          connection = _ref[_i];
          connection.to_field.setValue(new_val);
        }
      }
      return true;
    };

    NodeField.prototype.getValue = function(index) {
      var val;
      if (index == null) index = 0;
      val = this.get("value");
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
      val = this.get("value");
      if (jQuery.type(val) !== "array") return 1;
      return val.length;
    };

    NodeField.prototype.is_animation_property = function() {
      if (this.constructor === ThreeNodes.fields.types.Float ||  this.constructor === ThreeNodes.fields.types.Bool) {
        return true;
      }
      return false;
    };

    NodeField.prototype.toJSON = function() {
      var res, val, val_type;
      res = {
        name: this.get("name")
      };
      val = this.get("value");
      val_type = jQuery.type(val);
      if (val_type !== "object" && val_type !== "array") res.val = val;
      return res;
    };

    NodeField.prototype.toCode = function() {
      var res, val, val_type;
      res = "";
      val = this.get("value");
      val_type = jQuery.type(val);
      if (val_type !== "object" && val_type !== "array") {
        res = "\t\t{name: '" + (this.get('name')) + "', val: " + val + "},\n";
      } else {
        res = "\t\t{name: '" + (this.get('name')) + "'},\n";
      }
      return res;
    };

    NodeField.prototype.toXML = function() {
      var val;
      val = this.get("value");
      return "\t\t\t<field fid='" + (this.get('fid')) + "' val='" + val + "'/>\n";
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
      var el, layout;
      layout = _view_node_field_in;
      if (this.get("is_output")) layout = _view_node_field_out;
      el = $.tmpl(layout, {
        fid: this.get("fid"),
        name: this.get("name")
      });
      el.data("object", this);
      return el;
    };

    NodeField.prototype.compute_value = function(val) {
      return val;
    };

    NodeField.prototype.add_connection = function(c) {
      if (this.connections.indexOf(c) === -1) {
        this.connections.push(c);
        if (this.get("is_output") === true) this.node.add_out_connection(c, this);
        this.node.disable_property_anim(this);
      }
      return c;
    };

    NodeField.prototype.unregister_connection = function(c) {
      var ind;
      this.node.remove_connection(c);
      ind = this.connections.indexOf(c);
      if (ind !== -1) this.connections.splice(ind, 1);
      if (this.connections.length === 0) {
        return this.node.enable_property_anim(this);
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
      if ($.type(val) === "array") {
        return _.map(val, function(n) {
          return self.compute_value(n);
        });
      }
      return this.compute_value(val);
    };

    NodeField.prototype.create_sidebar_container = function(name) {
      var $cont, $target;
      if (name == null) name = this.get("name");
      $cont = $("#tab-attribute");
      $cont.append("<div id='side-field-" + this.get("fid") + "'></div>");
      $target = $("#side-field-" + (this.get('fid')));
      $target.append("<h3>" + name + "</h3>");
      return $target;
    };

    NodeField.prototype.create_textfield = function($target, id) {
      $target.append("<div><input type='text' id='" + id + "' /></div>");
      return $("#" + id);
    };

    NodeField.prototype.link_textfield_to_val = function(f_input) {
      var self;
      self = this;
      this.on_value_update_hooks.update_sidebar_textfield = function(v) {
        return f_input.val(v);
      };
      f_input.val(this.getValue());
      f_input.keypress(function(e) {
        if (e.which === 13) {
          self.setValue($(this).val());
          return $(this).blur();
        }
      });
      return f_input;
    };

    NodeField.prototype.link_textfield_to_subval = function(f_input, subval) {
      var self;
      self = this;
      this.on_value_update_hooks["update_sidebar_textfield_" + subval] = function(v) {
        return f_input.val(v[subval]);
      };
      f_input.val(this.get("value")[subval]);
      f_input.keypress(function(e) {
        if (e.which === 13) {
          self.attributes.value[subval] = $(this).val();
          return $(this).blur();
        }
      });
      return f_input;
    };

    NodeField.prototype.create_sidebar_field_title = function(name) {
      var $cont;
      if (name == null) name = this.name;
      $cont = $("#tab-attribute");
      $cont.append("<h3>" + name + "</h3>");
      return $cont;
    };

    NodeField.prototype.create_subval_textinput = function(subval) {
      var $target, f_in;
      $target = this.create_sidebar_container(subval);
      f_in = this.create_textfield($target, "side-field-txt-input-" + subval + "-" + this.fid);
      return this.link_textfield_to_subval(f_in, subval);
    };

    return NodeField;

  })(Backbone.Model);
  ThreeNodes.fields.types.Any = (function(_super) {

    __extends(Any, _super);

    function Any() {
      this.on_value_changed = __bind(this.on_value_changed, this);
      this.compute_value = __bind(this.compute_value, this);
      Any.__super__.constructor.apply(this, arguments);
    }

    Any.prototype.compute_value = function(val) {
      return val;
    };

    Any.prototype.on_value_changed = function(val) {
      return val;
    };

    return Any;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Array = (function(_super) {

    __extends(Array, _super);

    function Array() {
      this.getValue = __bind(this.getValue, this);
      this.on_value_changed = __bind(this.on_value_changed, this);
      this.remove_connections = __bind(this.remove_connections, this);
      this.compute_value = __bind(this.compute_value, this);
      Array.__super__.constructor.apply(this, arguments);
    }

    Array.prototype.compute_value = function(val) {
      if (!val ||  val === false) return [];
      if ($.type(val) === "array") {
        return val;
      } else {
        return [val];
      }
    };

    Array.prototype.remove_connections = function() {
      Array.__super__.remove_connections.apply(this, arguments);
      if (this.get("is_output") === false) return this.setValue([]);
    };

    Array.prototype.on_value_changed = function(val) {
      return this.compute_value(val);
    };

    Array.prototype.getValue = function(index) {
      if (index == null) index = 0;
      return this.get("value");
    };

    return Array;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Bool = (function(_super) {

    __extends(Bool, _super);

    function Bool() {
      this.compute_value = __bind(this.compute_value, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      Bool.__super__.constructor.apply(this, arguments);
    }

    Bool.prototype.render_sidebar = function() {
      var $target, f_in, id, self;
      self = this;
      $target = this.create_sidebar_container();
      id = "side-field-checkbox-" + this.fid;
      $target.append("<div><input type='checkbox' id='" + id + "'/></div>");
      f_in = $("#" + id);
      this.on_value_update_hooks.update_sidebar_textfield = function(v) {
        if (self.getValue() === true) {
          return f_in.attr('checked', 'checked');
        } else {
          return f_in.removeAttr('checked');
        }
      };
      if (this.getValue() === true) f_in.attr('checked', 'checked');
      f_in.change(function(e) {
        if ($(this).is(':checked')) {
          return self.setValue(true);
        } else {
          return self.setValue(false);
        }
      });
      return true;
    };

    Bool.prototype.compute_value = function(val) {
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

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.String = (function(_super) {

    __extends(String, _super);

    function String() {
      this.compute_value = __bind(this.compute_value, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      String.__super__.constructor.apply(this, arguments);
    }

    String.prototype.render_sidebar = function() {
      var $target, f_in, self;
      self = this;
      $target = this.create_sidebar_container();
      f_in = this.create_textfield($target, "side-field-txt-input-" + this.fid);
      this.on_value_update_hooks.update_sidebar_textfield = function(v) {
        return f_in.val(v.toString());
      };
      f_in.val(this.getValue());
      f_in.keypress(function(e) {
        if (e.which === 13) {
          self.setValue($(this).val());
          return $(this).blur();
        }
      });
      return true;
    };

    String.prototype.compute_value = function(val) {
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

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Float = (function(_super) {

    __extends(Float, _super);

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
        return self.setValue($(this).val());
      });
      return true;
    };

    Float.prototype.create_sidebar_input = function($target) {
      var f_in;
      f_in = this.create_textfield($target, "side-field-txt-input-" + this.fid);
      return this.link_textfield_to_val(f_in);
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
      switch ($.type(val)) {
        case "number":
        case "string":
          return parseFloat(val);
        case "object":
          if (val.constructor === THREE.Vector2 ||  val.constructor === THREE.Vector3) {
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

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Vector2 = (function(_super) {

    __extends(Vector2, _super);

    function Vector2() {
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.compute_value = __bind(this.compute_value, this);
      Vector2.__super__.constructor.apply(this, arguments);
    }

    Vector2.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Vector2) return val;
      }
      return null;
    };

    Vector2.prototype.render_sidebar = function() {
      this.create_sidebar_field_title();
      this.create_subval_textinput("x");
      this.create_subval_textinput("y");
      return true;
    };

    return Vector2;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Vector3 = (function(_super) {

    __extends(Vector3, _super);

    function Vector3() {
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.compute_value = __bind(this.compute_value, this);
      Vector3.__super__.constructor.apply(this, arguments);
    }

    Vector3.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Vector3) return val;
      }
      return null;
    };

    Vector3.prototype.render_sidebar = function() {
      this.create_sidebar_field_title();
      this.create_subval_textinput("x");
      this.create_subval_textinput("y");
      this.create_subval_textinput("z");
      return true;
    };

    return Vector3;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Vector4 = (function(_super) {

    __extends(Vector4, _super);

    function Vector4() {
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.compute_value = __bind(this.compute_value, this);
      Vector4.__super__.constructor.apply(this, arguments);
    }

    Vector4.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Vector4) return val;
      }
      return null;
    };

    Vector4.prototype.render_sidebar = function() {
      this.create_sidebar_field_title();
      this.create_subval_textinput("x");
      this.create_subval_textinput("y");
      this.create_subval_textinput("z");
      this.create_subval_textinput("w");
      return true;
    };

    return Vector4;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Quaternion = (function(_super) {

    __extends(Quaternion, _super);

    function Quaternion() {
      this.compute_value = __bind(this.compute_value, this);
      Quaternion.__super__.constructor.apply(this, arguments);
    }

    Quaternion.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Quaternion) return val;
      }
      return null;
    };

    return Quaternion;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Color = (function(_super) {

    __extends(Color, _super);

    function Color() {
      this.compute_value = __bind(this.compute_value, this);
      Color.__super__.constructor.apply(this, arguments);
    }

    Color.prototype.compute_value = function(val) {
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

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Object3D = (function(_super) {

    __extends(Object3D, _super);

    function Object3D() {
      this.compute_value = __bind(this.compute_value, this);
      Object3D.__super__.constructor.apply(this, arguments);
    }

    Object3D.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Object3D || val instanceof THREE.Object3D) {
          return val;
        }
      }
      return null;
    };

    return Object3D;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Scene = (function(_super) {

    __extends(Scene, _super);

    function Scene() {
      this.compute_value = __bind(this.compute_value, this);
      Scene.__super__.constructor.apply(this, arguments);
    }

    Scene.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Scene) return val;
      }
      return null;
    };

    return Scene;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Camera = (function(_super) {

    __extends(Camera, _super);

    function Camera() {
      this.compute_value = __bind(this.compute_value, this);
      Camera.__super__.constructor.apply(this, arguments);
    }

    Camera.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Camera ||  val.constructor === THREE.PerspectiveCamera ||  val.constructor === THREE.OrthographicCamera) {
          return val;
        }
      }
      return null;
    };

    return Camera;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Mesh = (function(_super) {

    __extends(Mesh, _super);

    function Mesh() {
      this.compute_value = __bind(this.compute_value, this);
      Mesh.__super__.constructor.apply(this, arguments);
    }

    Mesh.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Mesh || val instanceof THREE.Mesh) {
          return val;
        }
      }
      return null;
    };

    return Mesh;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Geometry = (function(_super) {

    __extends(Geometry, _super);

    function Geometry() {
      this.compute_value = __bind(this.compute_value, this);
      Geometry.__super__.constructor.apply(this, arguments);
    }

    Geometry.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Geometry || val instanceof THREE.Geometry) {
          return val;
        }
      }
      return null;
    };

    return Geometry;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Material = (function(_super) {

    __extends(Material, _super);

    function Material() {
      this.compute_value = __bind(this.compute_value, this);
      Material.__super__.constructor.apply(this, arguments);
    }

    Material.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Material || val instanceof THREE.Material) {
          return val;
        }
      }
      return null;
    };

    return Material;

  })(ThreeNodes.NodeField);
  ThreeNodes.fields.types.Texture = (function(_super) {

    __extends(Texture, _super);

    function Texture() {
      this.compute_value = __bind(this.compute_value, this);
      Texture.__super__.constructor.apply(this, arguments);
    }

    Texture.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Texture || val instanceof THREE.Texture) {
          return val;
        }
      }
      return null;
    };

    return Texture;

  })(ThreeNodes.NodeField);
  return ThreeNodes.fields.types.Fog = (function(_super) {

    __extends(Fog, _super);

    function Fog() {
      this.compute_value = __bind(this.compute_value, this);
      Fog.__super__.constructor.apply(this, arguments);
    }

    Fog.prototype.compute_value = function(val) {
      if ($.type(val) === "object") {
        if (val.constructor === THREE.Fog || val.constructor === THREE.FogExp2) {
          return val;
        }
      }
      return null;
    };

    return Fog;

  })(ThreeNodes.NodeField);
});
