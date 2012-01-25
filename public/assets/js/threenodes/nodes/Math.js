var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
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
  ThreeNodes.NodeNumberParam1 = (function() {
    __extends(NodeNumberParam1, ThreeNodes.NodeNumberSimple);
    function NodeNumberParam1() {
      this.compute = __bind(this.compute, this);
      this.apply_num_to_vec3 = __bind(this.apply_num_to_vec3, this);
      this.apply_num_to_vec2 = __bind(this.apply_num_to_vec2, this);
      this.process_val = __bind(this.process_val, this);
      NodeNumberParam1.__super__.constructor.apply(this, arguments);
    }
    NodeNumberParam1.prototype.process_val = function(num, numb, i) {
      return num + numb;
    };
    NodeNumberParam1.prototype.apply_num_to_vec2 = function(a, b, i) {
      switch ($.type(a)) {
        case "number":
          return new THREE.Vector2(this.process_val(a, b.x, i), this.process_val(a, b.y, i));
        case "object":
          return new THREE.Vector2(this.process_val(a.x, b, i), this.process_val(a.y, b, i));
      }
    };
    NodeNumberParam1.prototype.apply_num_to_vec3 = function(a, b, i) {
      switch ($.type(a)) {
        case "number":
          return new THREE.Vector3(this.process_val(a, b.x, i), this.process_val(a, b.y, i), this.process_val(a, b.z, i));
        case "object":
          return new THREE.Vector3(this.process_val(a.x, b, i), this.process_val(a.y, b, i), this.process_val(a.z, b, i));
      }
    };
    NodeNumberParam1.prototype.compute = function() {
      var i, numItems, ref, refb, res;
      res = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        ref = this.v_in.get(i);
        refb = this.v_factor.get(i);
        switch ($.type(ref)) {
          case "number":
            switch ($.type(refb)) {
              case "number":
                res[i] = this.process_val(ref, refb, i);
                break;
              case "object":
                switch (refb.constructor) {
                  case THREE.Vector2:
                    res[i] = this.apply_num_to_vec2(ref, refb, i);
                    break;
                  case THREE.Vector3:
                    res[i] = this.apply_num_to_vec3(ref, refb, i);
                }
            }
            break;
          case "object":
            switch (ref.constructor) {
              case THREE.Vector2:
                switch ($.type(refb)) {
                  case "number":
                    res[i] = this.apply_num_to_vec2(ref, refb, i);
                    break;
                  case "object":
                    res[i] = new THREE.Vector2(this.process_val(ref.x, refb.x, i), this.process_val(ref.y, refb.y, i));
                }
                break;
              case THREE.Vector3:
                switch ($.type(refb)) {
                  case "number":
                    res[i] = this.apply_num_to_vec3(ref, refb, i);
                    break;
                  case "object":
                    res[i] = new THREE.Vector3(this.process_val(ref.x, refb.x, i), this.process_val(ref.y, refb.y, i), this.process_val(ref.z, refb.z, i));
                }
            }
        }
      }
      this.v_out.set(res);
      return true;
    };
    return NodeNumberParam1;
  })();
  ThreeNodes.nodes.types.Math.Mod = (function() {
    __extends(Mod, ThreeNodes.NodeNumberParam1);
    function Mod() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Mod.__super__.constructor.apply(this, arguments);
    }
    Mod.prototype.set_fields = function() {
      Mod.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 2
      });
    };
    Mod.prototype.process_val = function(num, numb, i) {
      return num % numb;
    };
    return Mod;
  })();
  ThreeNodes.nodes.types.Math.Add = (function() {
    __extends(Add, ThreeNodes.NodeNumberParam1);
    function Add() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Add.__super__.constructor.apply(this, arguments);
    }
    Add.prototype.set_fields = function() {
      Add.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 1
      });
    };
    Add.prototype.process_val = function(num, numb, i) {
      return num + numb;
    };
    return Add;
  })();
  ThreeNodes.nodes.types.Math.Subtract = (function() {
    __extends(Subtract, ThreeNodes.NodeNumberParam1);
    function Subtract() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Subtract.__super__.constructor.apply(this, arguments);
    }
    Subtract.prototype.set_fields = function() {
      Subtract.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 1
      });
    };
    Subtract.prototype.process_val = function(num, numb, i) {
      return num - numb;
    };
    return Subtract;
  })();
  ThreeNodes.nodes.types.Math.Mult = (function() {
    __extends(Mult, ThreeNodes.NodeNumberParam1);
    function Mult() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Mult.__super__.constructor.apply(this, arguments);
    }
    Mult.prototype.set_fields = function() {
      Mult.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("factor", {
        type: "Float",
        val: 2
      });
    };
    Mult.prototype.process_val = function(num, numb, i) {
      return num * numb;
    };
    return Mult;
  })();
  ThreeNodes.nodes.types.Math.Divide = (function() {
    __extends(Divide, ThreeNodes.NodeNumberParam1);
    function Divide() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Divide.__super__.constructor.apply(this, arguments);
    }
    Divide.prototype.set_fields = function() {
      Divide.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 2
      });
    };
    Divide.prototype.process_val = function(num, numb, i) {
      return num / numb;
    };
    return Divide;
  })();
  ThreeNodes.nodes.types.Math.Min = (function() {
    __extends(Min, ThreeNodes.NodeNumberParam1);
    function Min() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Min.__super__.constructor.apply(this, arguments);
    }
    Min.prototype.set_fields = function() {
      Min.__super__.set_fields.apply(this, arguments);
      this.v_factor = this.rack.addField("in2", {
        type: "Float",
        val: 0
      });
      return this.anim_obj = {
        "in": 0,
        in2: 0
      };
    };
    Min.prototype.process_val = function(num, numb, i) {
      return Math.min(num, numb);
    };
    return Min;
  })();
  ThreeNodes.nodes.types.Math.Max = (function() {
    __extends(Max, ThreeNodes.NodeNumberParam1);
    function Max() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Max.__super__.constructor.apply(this, arguments);
    }
    Max.prototype.set_fields = function() {
      Max.__super__.set_fields.apply(this, arguments);
      this.v_factor = this.rack.addField("in2", {
        type: "Float",
        val: 0
      });
      return this.anim_obj = {
        "in": 0,
        in2: 0
      };
    };
    Max.prototype.process_val = function(num, numb, i) {
      return Math.max(num, numb);
    };
    return Max;
  })();
  return ThreeNodes.nodes.types.Math.Attenuation = (function() {
    __extends(Attenuation, ThreeNodes.NodeNumberParam1);
    function Attenuation() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      Attenuation.__super__.constructor.apply(this, arguments);
    }
    Attenuation.prototype.set_fields = function() {
      Attenuation.__super__.set_fields.apply(this, arguments);
      this.def_val = this.rack.addField("default", 0);
      this.reset_val = this.rack.addField("reset", false);
      this.v_factor = this.rack.addField("factor", 0.8);
      return this.val = this.def_val.get();
    };
    Attenuation.prototype.process_val = function(num, numb, i) {
      if (this.reset_val.get(i) === true) {
        this.val = this.def_val.get(i);
      }
      this.val = this.val + (this.v_in.get(i) - this.val) * this.v_factor.get(i);
      return this.val;
    };
    return Attenuation;
  })();
});