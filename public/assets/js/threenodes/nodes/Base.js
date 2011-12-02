var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", "order!libs/colorpicker/js/colorpicker", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
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
      var i, numItems, res, resx, resy;
      res = [];
      resx = [];
      resy = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        resx[i] = this.rack.get("x").get(i);
        resy[i] = this.rack.get("y").get(i);
        res[i] = new THREE.Vector3(resx[i], resy[i]);
      }
      this.rack.set("xy", res);
      this.rack.set("x", resx);
      return this.rack.set("y", resy);
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
      return this.rack.addFields({
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
      });
    };
    Vector3.prototype.compute = function() {
      var i, numItems, res, resx, resy, resz;
      res = [];
      resx = [];
      resy = [];
      resz = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        resx[i] = this.rack.get("x").get(i);
        resy[i] = this.rack.get("y").get(i);
        resz[i] = this.rack.get("z").get(i);
        res[i] = new THREE.Vector3(resx[i], resy[i], resz[i]);
      }
      this.rack.set("xyz", res);
      this.rack.set("x", resx);
      this.rack.set("y", resy);
      return this.rack.set("z", resz);
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
      var i, numItems, res, resb, resg, resr;
      res = [];
      resr = [];
      resg = [];
      resb = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        resr[i] = this.rack.get("r").get(i);
        resg[i] = this.rack.get("g").get(i);
        resb[i] = this.rack.get("b").get(i);
        res[i] = new THREE.Color().setRGB(resr[i], resg[i], resb[i]);
      }
      this.rack.set("xyz", res);
      this.rack.set("r", resr);
      this.rack.set("g", resg);
      return this.rack.set("b", resb);
    };
    return Color;
  })();
});