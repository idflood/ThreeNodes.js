var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.IfElse = (function(_super) {

    __extends(IfElse, _super);

    function IfElse() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      IfElse.__super__.constructor.apply(this, arguments);
    }

    IfElse.node_name = 'IfElse';

    IfElse.group_name = 'Conditional';

    IfElse.prototype.set_fields = function() {
      IfElse.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
        inputs: {
          "condition": false,
          "val1": {
            type: "Any",
            val: 0.0
          },
          "val2": {
            type: "Any",
            val: 1.0
          }
        },
        outputs: {
          "out": {
            type: "Any",
            val: false
          }
        }
      });
    };

    IfElse.prototype.compute = function() {
      var cond, res;
      cond = this.rack.get("condition").get();
      if (cond === false) {
        res = this.rack.get("val1").val;
      } else {
        res = this.rack.get("val2").val;
      }
      return this.rack.setField("out", res);
    };

    return IfElse;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.And = (function(_super) {

    __extends(And, _super);

    function And() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      And.__super__.constructor.apply(this, arguments);
    }

    And.node_name = 'And';

    And.group_name = 'Conditional';

    And.prototype.set_fields = function() {
      And.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
        inputs: {
          "val1": false,
          "val2": false
        },
        outputs: {
          "out": false
        }
      });
    };

    And.prototype.compute = function() {
      var res;
      res = this.rack.get("val1").get() !== false && this.rack.get("val2").get() !== false;
      return this.rack.setField("out", res);
    };

    return And;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Or = (function(_super) {

    __extends(Or, _super);

    function Or() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Or.__super__.constructor.apply(this, arguments);
    }

    Or.node_name = 'Or';

    Or.group_name = 'Conditional';

    Or.prototype.set_fields = function() {
      Or.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
        inputs: {
          "val1": false,
          "val2": false
        },
        outputs: {
          "out": false
        }
      });
    };

    Or.prototype.compute = function() {
      var res;
      res = this.rack.get("val1").get() !== false || this.rack.get("val2").get() !== false;
      return this.rack.setField("out", res);
    };

    return Or;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Equal = (function(_super) {

    __extends(Equal, _super);

    function Equal() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Equal.__super__.constructor.apply(this, arguments);
    }

    Equal.node_name = 'Equal';

    Equal.group_name = 'Conditional';

    Equal.prototype.set_fields = function() {
      Equal.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
        inputs: {
          "val1": {
            type: "Any",
            val: 0.0
          },
          "val2": {
            type: "Any",
            val: 1.0
          }
        },
        outputs: {
          "out": false
        }
      });
    };

    Equal.prototype.compute = function() {
      var res;
      res = this.rack.get("val1").get(0) === this.rack.get("val2").get(0);
      return this.rack.setField("out", res);
    };

    return Equal;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.Smaller = (function(_super) {

    __extends(Smaller, _super);

    function Smaller() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Smaller.__super__.constructor.apply(this, arguments);
    }

    Smaller.node_name = 'Smaller';

    Smaller.group_name = 'Conditional';

    Smaller.prototype.set_fields = function() {
      Smaller.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
        inputs: {
          "val1": {
            type: "Float",
            val: 0.0
          },
          "val2": {
            type: "Float",
            val: 1.0
          }
        },
        outputs: {
          "out": false
        }
      });
    };

    Smaller.prototype.compute = function() {
      var res;
      res = this.rack.get("val1").get(0) < this.rack.get("val2").get(0);
      return this.rack.setField("out", res);
    };

    return Smaller;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.Greater = (function(_super) {

    __extends(Greater, _super);

    function Greater() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Greater.__super__.constructor.apply(this, arguments);
    }

    Greater.node_name = 'Greater';

    Greater.group_name = 'Conditional';

    Greater.prototype.set_fields = function() {
      Greater.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
        inputs: {
          "val1": {
            type: "Float",
            val: 0.0
          },
          "val2": {
            type: "Float",
            val: 1.0
          }
        },
        outputs: {
          "out": false
        }
      });
    };

    Greater.prototype.compute = function() {
      var res;
      res = this.rack.get("val1").get(0) > this.rack.get("val2").get(0);
      return this.rack.setField("out", res);
    };

    return Greater;

  })(ThreeNodes.NodeBase);
});
