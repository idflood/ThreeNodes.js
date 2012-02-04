var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.nodes.MathSin = (function() {
    __extends(MathSin, ThreeNodes.NodeNumberSimple);
    function MathSin() {
      this.process_val = __bind(this.process_val, this);
      MathSin.__super__.constructor.apply(this, arguments);
    }
    MathSin.node_name = 'Sin';
    MathSin.group_name = 'Math';
    MathSin.prototype.process_val = function(num, i) {
      return Math.sin(num);
    };
    return MathSin;
  })();
  ThreeNodes.nodes.MathCos = (function() {
    __extends(MathCos, ThreeNodes.NodeNumberSimple);
    function MathCos() {
      this.process_val = __bind(this.process_val, this);
      MathCos.__super__.constructor.apply(this, arguments);
    }
    MathCos.node_name = 'Cos';
    MathCos.group_name = 'Math';
    MathCos.prototype.process_val = function(num, i) {
      return Math.cos(num);
    };
    return MathCos;
  })();
  ThreeNodes.nodes.MathTan = (function() {
    __extends(MathTan, ThreeNodes.NodeNumberSimple);
    function MathTan() {
      this.process_val = __bind(this.process_val, this);
      MathTan.__super__.constructor.apply(this, arguments);
    }
    MathTan.node_name = 'Tan';
    MathTan.group_name = 'Math';
    MathTan.prototype.process_val = function(num, i) {
      return Math.tan(num);
    };
    return MathTan;
  })();
  ThreeNodes.nodes.MathRound = (function() {
    __extends(MathRound, ThreeNodes.NodeNumberSimple);
    function MathRound() {
      this.process_val = __bind(this.process_val, this);
      MathRound.__super__.constructor.apply(this, arguments);
    }
    MathRound.node_name = 'Round';
    MathRound.group_name = 'Math';
    MathRound.prototype.process_val = function(num, i) {
      return Math.round(num);
    };
    return MathRound;
  })();
  ThreeNodes.nodes.MathCeil = (function() {
    __extends(MathCeil, ThreeNodes.NodeNumberSimple);
    function MathCeil() {
      this.process_val = __bind(this.process_val, this);
      MathCeil.__super__.constructor.apply(this, arguments);
    }
    MathCeil.node_name = 'Ceil';
    MathCeil.group_name = 'Math';
    MathCeil.prototype.process_val = function(num, i) {
      return Math.ceil(num);
    };
    return MathCeil;
  })();
  ThreeNodes.nodes.MathFloor = (function() {
    __extends(MathFloor, ThreeNodes.NodeNumberSimple);
    function MathFloor() {
      this.process_val = __bind(this.process_val, this);
      MathFloor.__super__.constructor.apply(this, arguments);
    }
    MathFloor.node_name = 'Floor';
    MathFloor.group_name = 'Math';
    MathFloor.prototype.process_val = function(num, i) {
      return Math.floor(num);
    };
    return MathFloor;
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
  ThreeNodes.nodes.MathMod = (function() {
    __extends(MathMod, ThreeNodes.NodeNumberParam1);
    function MathMod() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathMod.__super__.constructor.apply(this, arguments);
    }
    MathMod.node_name = 'Mod';
    MathMod.group_name = 'Math';
    MathMod.prototype.set_fields = function() {
      MathMod.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 2
      });
    };
    MathMod.prototype.process_val = function(num, numb, i) {
      return num % numb;
    };
    return MathMod;
  })();
  ThreeNodes.nodes.MathAdd = (function() {
    __extends(MathAdd, ThreeNodes.NodeNumberParam1);
    function MathAdd() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathAdd.__super__.constructor.apply(this, arguments);
    }
    MathAdd.node_name = 'Add';
    MathAdd.group_name = 'Math';
    MathAdd.prototype.set_fields = function() {
      MathAdd.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 1
      });
    };
    MathAdd.prototype.process_val = function(num, numb, i) {
      return num + numb;
    };
    return MathAdd;
  })();
  ThreeNodes.nodes.MathSubtract = (function() {
    __extends(MathSubtract, ThreeNodes.NodeNumberParam1);
    function MathSubtract() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathSubtract.__super__.constructor.apply(this, arguments);
    }
    MathSubtract.node_name = 'Subtract';
    MathSubtract.group_name = 'Math';
    MathSubtract.prototype.set_fields = function() {
      MathSubtract.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 1
      });
    };
    MathSubtract.prototype.process_val = function(num, numb, i) {
      return num - numb;
    };
    return MathSubtract;
  })();
  ThreeNodes.nodes.MathMult = (function() {
    __extends(MathMult, ThreeNodes.NodeNumberParam1);
    function MathMult() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathMult.__super__.constructor.apply(this, arguments);
    }
    MathMult.node_name = 'Mult';
    MathMult.group_name = 'Math';
    MathMult.prototype.set_fields = function() {
      MathMult.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("factor", {
        type: "Float",
        val: 2
      });
    };
    MathMult.prototype.process_val = function(num, numb, i) {
      return num * numb;
    };
    return MathMult;
  })();
  ThreeNodes.nodes.MathDivide = (function() {
    __extends(MathDivide, ThreeNodes.NodeNumberParam1);
    function MathDivide() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathDivide.__super__.constructor.apply(this, arguments);
    }
    MathDivide.node_name = 'Divide';
    MathDivide.group_name = 'Math';
    MathDivide.prototype.set_fields = function() {
      MathDivide.__super__.set_fields.apply(this, arguments);
      return this.v_factor = this.rack.addField("y", {
        type: "Float",
        val: 2
      });
    };
    MathDivide.prototype.process_val = function(num, numb, i) {
      return num / numb;
    };
    return MathDivide;
  })();
  ThreeNodes.nodes.MathMin = (function() {
    __extends(MathMin, ThreeNodes.NodeNumberParam1);
    function MathMin() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathMin.__super__.constructor.apply(this, arguments);
    }
    MathMin.node_name = 'Min';
    MathMin.group_name = 'Math';
    MathMin.prototype.set_fields = function() {
      MathMin.__super__.set_fields.apply(this, arguments);
      this.v_factor = this.rack.addField("in2", {
        type: "Float",
        val: 0
      });
      return this.anim_obj = {
        "in": 0,
        in2: 0
      };
    };
    MathMin.prototype.process_val = function(num, numb, i) {
      return Math.min(num, numb);
    };
    return MathMin;
  })();
  ThreeNodes.nodes.MathMax = (function() {
    __extends(MathMax, ThreeNodes.NodeNumberParam1);
    function MathMax() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathMax.__super__.constructor.apply(this, arguments);
    }
    MathMax.node_name = 'Max';
    MathMax.group_name = 'Math';
    MathMax.prototype.set_fields = function() {
      MathMax.__super__.set_fields.apply(this, arguments);
      this.v_factor = this.rack.addField("in2", {
        type: "Float",
        val: 0
      });
      return this.anim_obj = {
        "in": 0,
        in2: 0
      };
    };
    MathMax.prototype.process_val = function(num, numb, i) {
      return Math.max(num, numb);
    };
    return MathMax;
  })();
  return ThreeNodes.nodes.MathAttenuation = (function() {
    __extends(MathAttenuation, ThreeNodes.NodeNumberParam1);
    function MathAttenuation() {
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      MathAttenuation.__super__.constructor.apply(this, arguments);
    }
    MathAttenuation.node_name = 'Attenuation';
    MathAttenuation.group_name = 'Math';
    MathAttenuation.prototype.set_fields = function() {
      MathAttenuation.__super__.set_fields.apply(this, arguments);
      this.def_val = this.rack.addField("default", 0);
      this.reset_val = this.rack.addField("reset", false);
      this.v_factor = this.rack.addField("factor", 0.8);
      return this.val = this.def_val.get();
    };
    MathAttenuation.prototype.process_val = function(num, numb, i) {
      if (this.reset_val.get(i) === true) {
        this.val = this.def_val.get(i);
      }
      this.val = this.val + (this.v_in.get(i) - this.val) * this.v_factor.get(i);
      return this.val;
    };
    return MathAttenuation;
  })();
});