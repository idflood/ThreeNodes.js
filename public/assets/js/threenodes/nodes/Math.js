var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.nodes.types.Math.Sin = (function() {
    __extends(Sin, ThreeNodes.NodeNumberSimple);
    function Sin() {
      this.process_val = __bind(this.process_val, this);
      Sin.__super__.constructor.apply(this, arguments);
    }
    Sin.prototype.process_val = function(num, i) {
      return Math.sin(num);
    };
    return Sin;
  })();
  ThreeNodes.nodes.types.Math.Cos = (function() {
    __extends(Cos, ThreeNodes.NodeNumberSimple);
    function Cos() {
      this.process_val = __bind(this.process_val, this);
      Cos.__super__.constructor.apply(this, arguments);
    }
    Cos.prototype.process_val = function(num, i) {
      return Math.cos(num);
    };
    return Cos;
  })();
  ThreeNodes.nodes.types.Math.Tan = (function() {
    __extends(Tan, ThreeNodes.NodeNumberSimple);
    function Tan() {
      this.process_val = __bind(this.process_val, this);
      Tan.__super__.constructor.apply(this, arguments);
    }
    Tan.prototype.process_val = function(num, i) {
      return Math.tan(num);
    };
    return Tan;
  })();
  ThreeNodes.nodes.types.Math.Round = (function() {
    __extends(Round, ThreeNodes.NodeNumberSimple);
    function Round() {
      this.process_val = __bind(this.process_val, this);
      Round.__super__.constructor.apply(this, arguments);
    }
    Round.prototype.process_val = function(num, i) {
      return Math.round(num);
    };
    return Round;
  })();
  ThreeNodes.nodes.types.Math.Ceil = (function() {
    __extends(Ceil, ThreeNodes.NodeNumberSimple);
    function Ceil() {
      this.process_val = __bind(this.process_val, this);
      Ceil.__super__.constructor.apply(this, arguments);
    }
    Ceil.prototype.process_val = function(num, i) {
      return Math.ceil(num);
    };
    return Ceil;
  })();
  ThreeNodes.nodes.types.Math.Floor = (function() {
    __extends(Floor, ThreeNodes.NodeNumberSimple);
    function Floor() {
      this.process_val = __bind(this.process_val, this);
      Floor.__super__.constructor.apply(this, arguments);
    }
    Floor.prototype.process_val = function(num, i) {
      return Math.floor(num);
    };
    return Floor;
  })();
  ThreeNodes.nodes.types.Math.Mod = (function() {
    __extends(Mod, ThreeNodes.NodeNumberSimple);
    function Mod() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Mod.__super__.constructor.apply(this, arguments);
    }
    Mod.prototype.set_fields = function() {
      Mod.__super__.set_fields.apply(this, arguments);
      return this.v_valy = this.rack.addField("y", 2);
    };
    Mod.prototype.process_val = function(num, i) {
      return num % this.v_valy.get(i);
    };
    return Mod;
  })();
  ThreeNodes.nodes.types.Math.Add = (function() {
    __extends(Add, ThreeNodes.NodeNumberSimple);
    function Add() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Add.__super__.constructor.apply(this, arguments);
    }
    Add.prototype.set_fields = function() {
      Add.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", 1);
    };
    Add.prototype.process_val = function(num, i) {
      return num + this.v_factor.get(i);
    };
    return Add;
  })();
  ThreeNodes.nodes.types.Math.Subtract = (function() {
    __extends(Subtract, ThreeNodes.NodeNumberSimple);
    function Subtract() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Subtract.__super__.constructor.apply(this, arguments);
    }
    Subtract.prototype.set_fields = function() {
      Subtract.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", 1);
    };
    Subtract.prototype.process_val = function(num, i) {
      return num - this.v_factor.get(i);
    };
    return Subtract;
  })();
  ThreeNodes.nodes.types.Math.Mult = (function() {
    __extends(Mult, ThreeNodes.NodeNumberSimple);
    function Mult() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Mult.__super__.constructor.apply(this, arguments);
    }
    Mult.prototype.set_fields = function() {
      Mult.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("factor", 2);
    };
    Mult.prototype.process_val = function(num, i) {
      return num * this.v_factor.get(i);
    };
    return Mult;
  })();
  ThreeNodes.nodes.types.Math.Divide = (function() {
    __extends(Divide, ThreeNodes.NodeNumberSimple);
    function Divide() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Divide.__super__.constructor.apply(this, arguments);
    }
    Divide.prototype.set_fields = function() {
      Divide.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", 2);
    };
    Divide.prototype.process_val = function(num, i) {
      return num / this.v_factor.get(i);
    };
    return Divide;
  })();
  ThreeNodes.nodes.types.Math.Min = (function() {
    __extends(Min, ThreeNodes.NodeNumberSimple);
    function Min() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Min.__super__.constructor.apply(this, arguments);
    }
    Min.prototype.set_fields = function() {
      Min.__super__.set_fields.apply(this, arguments);
      return this.v_inb = this.rack.addField("in", 0);
    };
    Min.prototype.process_val = function(num, i) {
      return Math.min(num, this.v_inb.get(i));
    };
    return Min;
  })();
  ThreeNodes.nodes.types.Math.Max = (function() {
    __extends(Max, ThreeNodes.NodeNumberSimple);
    function Max() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Max.__super__.constructor.apply(this, arguments);
    }
    Max.prototype.set_fields = function() {
      Max.__super__.set_fields.apply(this, arguments);
      return this.v_inb = this.rack.addField("in2", 0);
    };
    Max.prototype.process_val = function(num, i) {
      return Math.max(num, this.v_inb.get(i));
    };
    return Max;
  })();
  return ThreeNodes.nodes.types.Math.Attenuation = (function() {
    __extends(Attenuation, ThreeNodes.NodeNumberSimple);
    function Attenuation() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Attenuation.__super__.constructor.apply(this, arguments);
    }
    Attenuation.prototype.set_fields = function() {
      Attenuation.__super__.set_fields.apply(this, arguments);
      this.def_val = this.rack.addField("default", 0);
      this.reset_val = this.rack.addField("reset", false);
      this.factor = this.rack.addField("factor", 0.8);
      return this.val = this.def_val.get();
    };
    Attenuation.prototype.process_val = function(num, i) {
      if (this.reset_val.get() === true) {
        this.val = this.def_val.get();
      }
      this.val = this.val + (this.v_in.get() - this.val) * this.factor.get();
      return this.val;
    };
    return Attenuation;
  })();
});