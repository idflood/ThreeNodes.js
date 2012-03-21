var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', "order!libs/colorpicker/js/colorpicker", 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.Number = (function(_super) {

    __extends(Number, _super);

    function Number() {
      this.set_fields = __bind(this.set_fields, this);
      Number.__super__.constructor.apply(this, arguments);
    }

    Number.node_name = 'Number';

    Number.group_name = 'Base';

    Number.prototype.set_fields = function() {
      Number.__super__.set_fields.apply(this, arguments);
      return this.rack.add_center_textfield(this.v_in);
    };

    return Number;

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.nodes.Boolean = (function(_super) {

    __extends(Boolean, _super);

    function Boolean() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      this.init = __bind(this.init, this);
      Boolean.__super__.constructor.apply(this, arguments);
    }

    Boolean.node_name = 'Boolean';

    Boolean.group_name = 'Base';

    Boolean.prototype.init = function() {
      Boolean.__super__.init.apply(this, arguments);
      return this.value = true;
    };

    Boolean.prototype.set_fields = function() {
      return this.rack.addFields({
        inputs: {
          "bool": true
        },
        outputs: {
          "out": {
            type: "Bool",
            val: this.value
          }
        }
      });
    };

    Boolean.prototype.compute = function() {
      return this.rack.setField("out", this.rack.getField("bool").getValue());
    };

    return Boolean;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.String = (function(_super) {

    __extends(String, _super);

    function String() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      this.init = __bind(this.init, this);
      String.__super__.constructor.apply(this, arguments);
    }

    String.node_name = 'String';

    String.group_name = 'Base';

    String.prototype.init = function() {
      String.__super__.init.apply(this, arguments);
      return this.value = "";
    };

    String.prototype.set_fields = function() {
      this.rack.addFields({
        inputs: {
          "string": ""
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.value
          }
        }
      });
      return this.rack.add_center_textfield(this.rack.getField("string"));
    };

    String.prototype.compute = function() {
      return this.rack.setField("out", this.rack.getField("string").getValue());
    };

    return String;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Vector2 = (function(_super) {

    __extends(Vector2, _super);

    function Vector2() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.set_fields = __bind(this.set_fields, this);
      Vector2.__super__.constructor.apply(this, arguments);
    }

    Vector2.node_name = 'Vector2';

    Vector2.group_name = 'Base';

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

    Vector2.prototype.remove = function() {
      delete this.vec;
      return Vector2.__super__.remove.apply(this, arguments);
    };

    Vector2.prototype.compute = function() {
      var i, numItems, res, resx, resy;
      res = [];
      resx = [];
      resy = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        resx[i] = this.rack.getField("x").getValue(i);
        resy[i] = this.rack.getField("y").getValue(i);
        res[i] = new THREE.Vector3(resx[i], resy[i]);
      }
      this.rack.setField("xy", res);
      this.rack.setField("x", resx);
      return this.rack.setField("y", resy);
    };

    return Vector2;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Vector3 = (function(_super) {

    __extends(Vector3, _super);

    function Vector3() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Vector3.__super__.constructor.apply(this, arguments);
    }

    Vector3.node_name = 'Vector3';

    Vector3.group_name = 'Base';

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
        resx[i] = this.rack.getField("x").getValue(i);
        resy[i] = this.rack.getField("y").getValue(i);
        resz[i] = this.rack.getField("z").getValue(i);
        res[i] = new THREE.Vector3(resx[i], resy[i], resz[i]);
      }
      this.rack.setField("xyz", res);
      this.rack.setField("x", resx);
      this.rack.setField("y", resy);
      return this.rack.setField("z", resz);
    };

    return Vector3;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.Color = (function(_super) {

    __extends(Color, _super);

    function Color() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      this.remove = __bind(this.remove, this);
      this.init_preview = __bind(this.init_preview, this);
      Color.__super__.constructor.apply(this, arguments);
    }

    Color.node_name = 'Color';

    Color.group_name = 'Base';

    Color.prototype.init_preview = function() {
      var col,
        _this = this;
      this.$picker_el = $("<div class='color_preview'></div>");
      col = this.rack.getField("rgb", true).getValue(0);
      this.$picker_el.ColorPicker({
        color: {
          r: col.r * 255,
          g: col.g * 255,
          b: col.b * 255
        },
        onChange: function(hsb, hex, rgb) {
          _this.rack.getField("r").setValue(rgb.r / 255);
          _this.rack.getField("g").setValue(rgb.g / 255);
          return _this.rack.getField("b").setValue(rgb.b / 255);
        }
      });
      this.rack.trigger("addCustomHtml", this.$picker_el, ".center");
      return this.rack.getField("rgb", true).on_value_update_hooks.set_bg_color_preview = function(v) {
        return _this.$picker_el.css({
          background: v[0].getContextStyle()
        });
      };
    };

    Color.prototype.remove = function() {
      this.$picker_el.each(function() {
        var cal, picker;
        if ($(this).data('colorpickerId')) {
          cal = $('#' + $(this).data('colorpickerId'));
          picker = cal.data('colorpicker');
          if (picker) delete picker.onChange;
          return cal.remove();
        }
      });
      this.$picker_el.unbind();
      this.$picker_el.remove();
      delete this.$picker_el;
      return Color.__super__.remove.apply(this, arguments);
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
        resr[i] = this.rack.getField("r").getValue(i);
        resg[i] = this.rack.getField("g").getValue(i);
        resb[i] = this.rack.getField("b").getValue(i);
        res[i] = new THREE.Color().setRGB(resr[i], resg[i], resb[i]);
      }
      this.rack.setField("rgb", res);
      this.rack.setField("r", resr);
      this.rack.setField("g", resg);
      return this.rack.setField("b", resb);
    };

    return Color;

  })(ThreeNodes.NodeBase);
});
