var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  ThreeNodes.nodes.types.Utils.Random = (function() {
    __extends(Random, ThreeNodes.NodeBase);
    function Random() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Random.__super__.constructor.apply(this, arguments);
    }
    Random.prototype.set_fields = function() {
      Random.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "min": 0,
          "max": 1
        },
        outputs: {
          "out": 0
        }
      });
      return this.rack.add_center_textfield(this.rack.get("out", true));
    };
    Random.prototype.compute = function() {
      var old;
      old = this.rack.get("out", true).get();
      this.value = this.rack.get("min").get() + Math.random() * (this.rack.get("max").get() - this.rack.get("min").get());
      if (this.value !== old) {
        return this.rack.set("out", this.value);
      }
    };
    return Random;
  })();
  ThreeNodes.nodes.types.Utils.Merge = (function() {
    __extends(Merge, ThreeNodes.NodeBase);
    function Merge() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Merge.__super__.constructor.apply(this, arguments);
    }
    Merge.prototype.set_fields = function() {
      Merge.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      return this.rack.addFields({
        inputs: {
          "in0": {
            type: "Any",
            val: null
          },
          "in1": {
            type: "Any",
            val: null
          },
          "in2": {
            type: "Any",
            val: null
          },
          "in3": {
            type: "Any",
            val: null
          },
          "in4": {
            type: "Any",
            val: null
          },
          "in5": {
            type: "Any",
            val: null
          }
        },
        outputs: {
          "out": {
            type: "Array",
            val: []
          }
        }
      });
    };
    Merge.prototype.compute = function() {
      var f, k, old, subval;
      old = this.rack.get("out", true).get();
      this.value = [];
      for (f in this.rack.node_fields.inputs) {
        k = this.rack.node_fields.inputs[f];
        if (k.get() !== null && k.connections.length > 0) {
          subval = k.get();
          if (jQuery.type(subval) === "array") {
            this.value = this.value.concat(subval);
          } else {
            this.value[this.value.length] = k.get();
          }
        }
      }
      return this.rack.set("out", this.value);
    };
    return Merge;
  })();
  ThreeNodes.nodes.types.Utils.Get = (function() {
    __extends(Get, ThreeNodes.NodeBase);
    function Get() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Get.__super__.constructor.apply(this, arguments);
    }
    Get.prototype.set_fields = function() {
      Get.__super__.set_fields.apply(this, arguments);
      return this.rack.addFields({
        inputs: {
          "array": {
            type: "Array",
            val: null
          },
          "index": 0
        },
        outputs: {
          "out": {
            type: "Any",
            val: null
          }
        }
      });
    };
    Get.prototype.compute = function() {
      var arr, ind, old;
      old = this.rack.get("out", true).get();
      this.value = false;
      arr = this.rack.get("array").get();
      ind = parseInt(this.rack.get("index").get());
      if ($.type(arr) === "array") {
        this.value = arr[ind % arr.length];
      }
      if (this.value !== old) {
        return this.rack.set("out", this.value);
      }
    };
    return Get;
  })();
  ThreeNodes.nodes.types.Utils.SoundInput = (function() {
    __extends(SoundInput, ThreeNodes.NodeBase);
    function SoundInput() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SoundInput.__super__.constructor.apply(this, arguments);
    }
    SoundInput.prototype.set_fields = function() {
      SoundInput.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.counter = 0;
      return this.rack.addFields({
        inputs: {
          "gain": 1.0
        },
        outputs: {
          "low": 0,
          "medium": 0,
          "high": 0
        }
      });
    };
    SoundInput.prototype.compute = function() {
      this.rack.set("low", ThreeNodes.flash_sound_value.kick);
      this.rack.set("medium", ThreeNodes.flash_sound_value.snare);
      return this.rack.set("high", ThreeNodes.flash_sound_value.hat);
    };
    return SoundInput;
  })();
  return ThreeNodes.nodes.types.Utils.Timer = (function() {
    __extends(Timer, ThreeNodes.NodeBase);
    function Timer() {
      this.compute = __bind(this.compute, this);
      this.get_time = __bind(this.get_time, this);
      this.set_fields = __bind(this.set_fields, this);
      Timer.__super__.constructor.apply(this, arguments);
    }
    Timer.prototype.set_fields = function() {
      Timer.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.old = this.get_time();
      this.counter = 0;
      this.rack.addFields({
        inputs: {
          "reset": false,
          "pause": false,
          "max": 99999999999
        },
        outputs: {
          "out": 0
        }
      });
      return this.rack.add_center_textfield(this.rack.get("out", true));
    };
    Timer.prototype.get_time = function() {
      return new Date().getTime();
    };
    Timer.prototype.compute = function() {
      var diff, now, oldval;
      oldval = this.rack.get("out", true).get();
      now = this.get_time();
      if (this.rack.get("pause").get() === false) {
        this.counter += now - this.old;
      }
      if (this.rack.get("reset").get() === true) {
        this.counter = 0;
      }
      diff = this.rack.get("max").get() - this.counter;
      if (diff <= 0) {
        this.counter = 0;
      }
      this.old = now;
      return this.rack.set("out", this.counter);
    };
    return Timer;
  })();
});