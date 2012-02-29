var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.MathSin = (function(_super) {

    __extends(MathSin, _super);

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

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.nodes.MathCos = (function(_super) {

    __extends(MathCos, _super);

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

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.nodes.MathTan = (function(_super) {

    __extends(MathTan, _super);

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

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.nodes.MathRound = (function(_super) {

    __extends(MathRound, _super);

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

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.nodes.MathCeil = (function(_super) {

    __extends(MathCeil, _super);

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

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.nodes.MathFloor = (function(_super) {

    __extends(MathFloor, _super);

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

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.NodeNumberParam1 = (function(_super) {

    __extends(NodeNumberParam1, _super);

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
        ref = this.v_in.getValue(i);
        refb = this.v_factor.getValue(i);
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
      this.v_out.setValue(res);
      return true;
    };

    return NodeNumberParam1;

  })(ThreeNodes.NodeNumberSimple);
  ThreeNodes.nodes.MathMod = (function(_super) {

    __extends(MathMod, _super);

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

  })(ThreeNodes.NodeNumberParam1);
  ThreeNodes.nodes.MathAdd = (function(_super) {

    __extends(MathAdd, _super);

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

  })(ThreeNodes.NodeNumberParam1);
  ThreeNodes.nodes.MathSubtract = (function(_super) {

    __extends(MathSubtract, _super);

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

  })(ThreeNodes.NodeNumberParam1);
  ThreeNodes.nodes.MathMult = (function(_super) {

    __extends(MathMult, _super);

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

  })(ThreeNodes.NodeNumberParam1);
  ThreeNodes.nodes.MathDivide = (function(_super) {

    __extends(MathDivide, _super);

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

  })(ThreeNodes.NodeNumberParam1);
  ThreeNodes.nodes.MathMin = (function(_super) {

    __extends(MathMin, _super);

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

  })(ThreeNodes.NodeNumberParam1);
  ThreeNodes.nodes.MathMax = (function(_super) {

    __extends(MathMax, _super);

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

  })(ThreeNodes.NodeNumberParam1);
  return ThreeNodes.nodes.MathAttenuation = (function(_super) {

    __extends(MathAttenuation, _super);

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
      return this.val = this.def_val.getValue();
    };

    MathAttenuation.prototype.process_val = function(num, numb, i) {
      if (this.reset_val.getValue(i) === true) this.val = this.def_val.getValue(i);
      this.val = this.val + (this.v_in.getValue(i) - this.val) * this.v_factor.getValue(i);
      return this.val;
    };

    return MathAttenuation;

  })(ThreeNodes.NodeNumberParam1);
});
