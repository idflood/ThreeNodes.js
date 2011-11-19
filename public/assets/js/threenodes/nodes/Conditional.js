var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  ThreeNodes.nodes.types.Conditional.IfElse = (function() {
    __extends(IfElse, ThreeNodes.NodeBase);
    function IfElse() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      IfElse.__super__.constructor.apply(this, arguments);
    }
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
        res = this.rack.get("val1").get();
      } else {
        res = this.rack.get("val2").get();
      }
      return this.rack.set("out", res);
    };
    return IfElse;
  })();
  ThreeNodes.nodes.types.Conditional.And = (function() {
    __extends(And, ThreeNodes.NodeBase);
    function And() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      And.__super__.constructor.apply(this, arguments);
    }
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
      res = this.rack.get("val1").get() && this.rack.get("val2").get();
      return this.rack.set("out", res);
    };
    return And;
  })();
  ThreeNodes.nodes.types.Conditional.Or = (function() {
    __extends(Or, ThreeNodes.NodeBase);
    function Or() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Or.__super__.constructor.apply(this, arguments);
    }
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
      res = this.rack.get("val1").get() || this.rack.get("val2").get();
      return this.rack.set("out", res);
    };
    return Or;
  })();
  ThreeNodes.nodes.types.Conditional.Equal = (function() {
    __extends(Equal, ThreeNodes.NodeBase);
    function Equal() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Equal.__super__.constructor.apply(this, arguments);
    }
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
      res = this.rack.get("val1").get() === this.rack.get("val2").get();
      return this.rack.set("out", res);
    };
    return Equal;
  })();
  ThreeNodes.nodes.types.Conditional.Smaller = (function() {
    __extends(Smaller, ThreeNodes.NodeBase);
    function Smaller() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Smaller.__super__.constructor.apply(this, arguments);
    }
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
      res = this.rack.get("val1").get() < this.rack.get("val2").get();
      return this.rack.set("out", res);
    };
    return Smaller;
  })();
  return ThreeNodes.nodes.types.Conditional.Greater = (function() {
    __extends(Greater, ThreeNodes.NodeBase);
    function Greater() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Greater.__super__.constructor.apply(this, arguments);
    }
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
      res = this.rack.get("val1").get() > this.rack.get("val2").get();
      return this.rack.set("out", res);
    };
    return Greater;
  })();
});