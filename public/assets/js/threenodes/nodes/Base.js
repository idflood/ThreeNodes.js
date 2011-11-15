var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min", "order!libs/colorpicker/js/colorpicker", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  ThreeNodes.nodes.types.Base.Number = (function() {
    __extends(Number, ThreeNodes.NodeNumberSimple);
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
  ThreeNodes.nodes.types.Base.String = (function() {
    __extends(String, ThreeNodes.NodeBase);
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
      return this.rack.set("out", this.rack.get("string").get());
    };
    return String;
  })();
  ThreeNodes.nodes.types.Base.Vector2 = (function() {
    __extends(Vector2, ThreeNodes.NodeBase);
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
        this.rack.set("xy", this.value);
        this.rack.set("x", this.value.x);
        return this.rack.set("y", this.value.y);
      }
    };
    return Vector2;
  })();
  ThreeNodes.nodes.types.Base.Vector3 = (function() {
    __extends(Vector3, ThreeNodes.NodeBase);
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
        this.rack.set("xyz", this.value);
        this.rack.set("x", this.value.x);
        this.rack.set("y", this.value.y);
        return this.rack.set("z", this.value.z);
      }
    };
    return Vector3;
  })();
  return ThreeNodes.nodes.types.Base.Color = (function() {
    __extends(Color, ThreeNodes.NodeBase);
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
        this.rack.set("rgb", this.value);
        this.rack.set("r", this.value.r);
        this.rack.set("g", this.value.g);
        return this.rack.set("b", this.value.b);
      }
    };
    return Color;
  })();
});