var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.RandomSpread = (function(_super) {

    __extends(RandomSpread, _super);

    function RandomSpread() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      RandomSpread.__super__.constructor.apply(this, arguments);
    }

    RandomSpread.node_name = 'RandomSpread';

    RandomSpread.group_name = 'Spread';

    RandomSpread.prototype.set_fields = function() {
      RandomSpread.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rnd = false;
      this.value = false;
      this.seed = false;
      this.count = false;
      this.width = false;
      this.offset = false;
      this.rack.addFields({
        inputs: {
          "count": 1,
          "seed": 1,
          "width": 1,
          "offset": 0
        },
        outputs: {
          "out": 0
        }
      });
      return this.v_out = this.rack.getField("out", true);
    };

    RandomSpread.prototype.compute = function() {
      var i, needs_rebuild, _ref;
      needs_rebuild = false;
      if (this.seed !== this.rack.getField("seed").get("value") || this.count !== parseInt(this.rack.getField("count").getValue(0)) || this.width !== this.rack.getField("width").get("value") || this.offset !== this.rack.getField("offset").get("value")) {
        this.seed = this.rack.getField("seed").get("value");
        this.rnd = new ThreeNodes.Utils.Rc4Random(this.seed.toString());
        this.value = [];
        this.width = this.rack.getField("width").getValue(0);
        this.offset = this.rack.getField("offset").getValue(0);
        this.count = parseInt(this.rack.getField("count").get("value"));
        for (i = 0, _ref = this.count - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          this.value[i] = this.rnd.getRandomNumber() * this.width - this.width / 2 + this.offset;
        }
      }
      return this.rack.setField("out", this.value);
    };

    return RandomSpread;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.LinearSpread = (function(_super) {

    __extends(LinearSpread, _super);

    function LinearSpread() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      LinearSpread.__super__.constructor.apply(this, arguments);
    }

    LinearSpread.node_name = 'LinearSpread';

    LinearSpread.group_name = 'Spread';

    LinearSpread.prototype.set_fields = function() {
      LinearSpread.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.value = false;
      this.count = false;
      this.width = false;
      this.phase = false;
      this.offset = false;
      this.rack.addFields({
        inputs: {
          "count": 1,
          "width": 1,
          "phase": 0,
          "offset": 0
        },
        outputs: {
          "out": 0
        }
      });
      return this.v_out = this.rack.getField("out", true);
    };

    LinearSpread.prototype.compute = function() {
      var i, needs_rebuild, res, shift, stepSize, _ref;
      needs_rebuild = false;
      this.width = this.rack.getField("width").getValue(0);
      this.offset = this.rack.getField("offset").getValue(0);
      this.phase = this.rack.getField("phase").getValue(0);
      this.count = parseInt(this.rack.getField("count").getValue());
      this.value = [];
      stepSize = this.width / this.count;
      shift = stepSize / 2;
      for (i = 0, _ref = this.count - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        res = (i * stepSize + shift + this.phase) % this.width;
        res = this.offset - this.width / 2 + res;
        this.value[i] = res;
      }
      return this.rack.setField("out", this.value);
    };

    return LinearSpread;

  })(ThreeNodes.NodeBase);
});
