var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.nodes.Random = (function() {
    __extends(Random, ThreeNodes.NodeBase);
    function Random() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Random.__super__.constructor.apply(this, arguments);
    }
    Random.node_name = 'Random';
    Random.group_name = 'Utils';
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
      this.value = this.rack.get("min").get() + Math.random() * (this.rack.get("max").get() - this.rack.get("min").get());
      return this.rack.set("out", this.value);
    };
    return Random;
  })();
  ThreeNodes.nodes.LFO = (function() {
    __extends(LFO, ThreeNodes.NodeBase);
    function LFO() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      LFO.__super__.constructor.apply(this, arguments);
    }
    LFO.node_name = 'LFO';
    LFO.group_name = 'Utils';
    LFO.prototype.set_fields = function() {
      LFO.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rndB = Math.random();
      this.rndA = this.rndB;
      this.rndrange = 1;
      this.flip = 0;
      this.taskinterval = 1;
      this.taskintervalhold = 20;
      this.clock = 0;
      this.PI = 3.14159;
      this.rack.addFields({
        inputs: {
          "min": 0,
          "max": 1,
          "duration": 1000,
          "mode": {
            type: "Float",
            val: 0,
            values: {
              "sawtooth": 0,
              "sine": 1,
              "triangle": 2,
              "square waver": 3,
              "random": 4,
              "random triangle": 5
            }
          }
        },
        outputs: {
          "out": 0
        }
      });
      return this.rack.add_center_textfield(this.rack.get("out", true));
    };
    LFO.prototype.compute = function() {
      var duration, halfway, hi, lfoout, lfout, low, max, min, mode, range, src, srctmp, time;
      duration = this.rack.get("duration").get();
      min = this.rack.get("min").get();
      max = this.rack.get("max").get();
      mode = this.rack.get("mode").get();
      this.clock = Date.now();
      time = (this.taskinterval * this.clock) % duration;
      src = time / duration;
      range = max - min;
      lfoout = 0;
      lfout = (function() {
        switch (mode) {
          case 0:
            return (src * range) + min;
          case 1:
            return (range * Math.sin(src * this.PI)) + min;
          case 2:
            halfway = duration / 2;
            if (time < halfway) {
              return (2 * src * range) + min;
            } else {
              srctmp = (halfway - (time - halfway)) / duration;
              return (2 * srctmp * range) + min;
            }
            break;
          case 3:
            low = time < duration / 2;
            hi = time >= duration / 2;
            return low * min + hi * max;
          case 4:
            if (time >= duration - this.taskinterval) {
              this.rndA = Math.random();
            }
            return (this.rndA * range) + min;
          case 5:
            if (time < this.taskinterval) {
              this.rndA = this.rndB;
              this.rndB = range * Math.random() + min;
              this.rndrange = this.rndB - this.rndA;
            }
            return src * this.rndrange + this.rndA;
        }
      }).call(this);
      return this.rack.set("out", lfout);
    };
    return LFO;
  })();
  ThreeNodes.nodes.Merge = (function() {
    __extends(Merge, ThreeNodes.NodeBase);
    function Merge() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Merge.__super__.constructor.apply(this, arguments);
    }
    Merge.node_name = 'Merge';
    Merge.group_name = 'Utils';
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
        if (k.val !== null && k.connections.length > 0) {
          subval = k.val;
          if (jQuery.type(subval) === "array") {
            this.value = this.value.concat(subval);
          } else {
            this.value[this.value.length] = subval;
          }
        }
      }
      return this.rack.set("out", this.value);
    };
    return Merge;
  })();
  ThreeNodes.nodes.Get = (function() {
    __extends(Get, ThreeNodes.NodeBase);
    function Get() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Get.__super__.constructor.apply(this, arguments);
    }
    Get.node_name = 'Get';
    Get.group_name = 'Utils';
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
  ThreeNodes.nodes.Mp3Input = (function() {
    __extends(Mp3Input, ThreeNodes.NodeBase);
    function Mp3Input() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.getAverageLevel = __bind(this.getAverageLevel, this);
      this.onSoundLoad = __bind(this.onSoundLoad, this);
      this.loadAudioBuffer = __bind(this.loadAudioBuffer, this);
      this.loadAudio = __bind(this.loadAudio, this);
      this.createSound = __bind(this.createSound, this);
      this.finishLoad = __bind(this.finishLoad, this);
      this.set_fields = __bind(this.set_fields, this);
      this.is_chrome = __bind(this.is_chrome, this);
      Mp3Input.__super__.constructor.apply(this, arguments);
    }
    Mp3Input.node_name = 'Mp3Input';
    Mp3Input.group_name = 'Utils';
    Mp3Input.prototype.is_chrome = function() {
      return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    };
    Mp3Input.prototype.set_fields = function() {
      Mp3Input.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.counter = 0;
      this.rack.addFields({
        inputs: {
          "url": "",
          "smoothingTime": 0.1
        },
        outputs: {
          "average": 0,
          "low": 0,
          "medium": 0,
          "high": 0
        }
      });
      if (this.is_chrome()) {
        this.audioContext = new window.webkitAudioContext();
      } else {
        $(".options", this.main_view).prepend('<p class="warning">This node currently require chrome.</p>');
      }
      this.url_cache = this.rack.get("url").get();
      return ThreeNodes.sound_nodes.push(this);
    };
    Mp3Input.prototype.onRegister = function() {
      Mp3Input.__super__.onRegister.apply(this, arguments);
      if (this.rack.get("url").get() !== "") {
        return this.loadAudio(this.rack.get("url").get());
      }
    };
    Mp3Input.prototype.stopSound = function() {
      if (this.source) {
        this.source.noteOff(0.0);
        this.source.disconnect(0);
        return console.log("stop sound");
      }
    };
    Mp3Input.prototype.playSound = function(time) {
      if (this.source && this.audioContext && this.audioBuffer) {
        this.stopSound();
        this.source = this.createSound();
        return this.source.noteGrainOn(0, time, this.audioBuffer.duration - time);
      }
    };
    Mp3Input.prototype.finishLoad = function() {
      var delay;
      this.source.buffer = this.audioBuffer;
      this.source.looping = true;
      this.onSoundLoad();
      Timeline.getGlobalInstance().maxTime = this.audioBuffer.duration;
      delay = function(ms, func) {
        return setTimeout(func, ms);
      };
      return delay(1000, __bind(function() {
        Timeline.getGlobalInstance().stop();
        return Timeline.getGlobalInstance().play();
      }, this));
    };
    Mp3Input.prototype.createSound = function() {
      var src;
      src = this.audioContext.createBufferSource();
      if (this.audioBuffer) {
        src.buffer = this.audioBuffer;
      }
      src.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      return src;
    };
    Mp3Input.prototype.loadAudio = function(url) {
      Timeline.getGlobalInstance().stop();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 1024;
      this.source = this.createSound();
      return this.loadAudioBuffer(url);
    };
    Mp3Input.prototype.loadAudioBuffer = function(url) {
      var request;
      request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onload = __bind(function() {
        this.audioBuffer = this.audioContext.createBuffer(request.response, false);
        return this.finishLoad();
      }, this);
      request.send();
      return this;
    };
    Mp3Input.prototype.onSoundLoad = function() {
      this.freqByteData = new Uint8Array(this.analyser.frequencyBinCount);
      return this.timeByteData = new Uint8Array(this.analyser.frequencyBinCount);
    };
    Mp3Input.prototype.getAverageLevel = function(start, max) {
      var i, length, sum;
      if (start == null) {
        start = 0;
      }
      if (max == null) {
        max = 512;
      }
      if (!this.freqByteData) {
        return 0;
      }
      start = Math.floor(start);
      max = Math.floor(max);
      length = max - start;
      sum = 0;
      for (i = start; start <= max ? i <= max : i >= max; start <= max ? i++ : i--) {
        sum += this.freqByteData[i];
      }
      return sum / length;
    };
    Mp3Input.prototype.remove = function() {
      Mp3Input.__super__.remove.apply(this, arguments);
      if (this.source) {
        this.source.noteOff(0.0);
        this.source.disconnect();
      }
      this.freqByteData = false;
      this.timeByteData = false;
      this.audioBuffer = false;
      this.audioContext = false;
      return this.source = false;
    };
    Mp3Input.prototype.compute = function() {
      var length, length3rd;
      if (!this.is_chrome()) {
        return;
      }
      if (this.url_cache !== this.rack.get("url").get()) {
        this.url_cache = this.rack.get("url").get();
        this.loadAudio(this.url_cache);
      }
      if (this.analyser) {
        this.analyser.smoothingTimeConstant = this.rack.get("smoothingTime").get();
        this.analyser.getByteFrequencyData(this.freqByteData);
        this.analyser.getByteTimeDomainData(this.timeByteData);
      }
      if (this.freqByteData) {
        length = this.freqByteData.length;
        length3rd = length / 3;
        this.rack.set("average", this.getAverageLevel(0, length - 1));
        this.rack.set("low", this.getAverageLevel(0, length3rd - 1));
        this.rack.set("medium", this.getAverageLevel(length3rd, (length3rd * 2) - 1));
        this.rack.set("high", this.getAverageLevel(length3rd * 2, length - 1));
      }
      return true;
    };
    return Mp3Input;
  })();
  ThreeNodes.nodes.SoundInput = (function() {
    __extends(SoundInput, ThreeNodes.NodeBase);
    function SoundInput() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SoundInput.__super__.constructor.apply(this, arguments);
    }
    SoundInput.node_name = 'SoundInput';
    SoundInput.group_name = 'Utils';
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
  ThreeNodes.nodes.Mouse = (function() {
    __extends(Mouse, ThreeNodes.NodeBase);
    function Mouse() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Mouse.__super__.constructor.apply(this, arguments);
    }
    Mouse.node_name = 'Mouse';
    Mouse.group_name = 'Utils';
    Mouse.prototype.set_fields = function() {
      Mouse.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      return this.rack.addFields({
        outputs: {
          "xy": {
            type: "Vector2",
            val: new THREE.Vector2()
          },
          "x": 0,
          "y": 0
        }
      });
    };
    Mouse.prototype.compute = function() {
      this.rack.set("xy", new THREE.Vector2(ThreeNodes.mouseX, ThreeNodes.mouseY));
      this.rack.set("x", ThreeNodes.mouseX);
      return this.rack.set("y", ThreeNodes.mouseY);
    };
    return Mouse;
  })();
  ThreeNodes.nodes.Timer = (function() {
    __extends(Timer, ThreeNodes.NodeBase);
    function Timer() {
      this.compute = __bind(this.compute, this);
      this.get_time = __bind(this.get_time, this);
      this.set_fields = __bind(this.set_fields, this);
      Timer.__super__.constructor.apply(this, arguments);
    }
    Timer.node_name = 'Timer';
    Timer.group_name = 'Utils';
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
  return ThreeNodes.nodes.Font = (function() {
    __extends(Font, ThreeNodes.NodeBase);
    function Font() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Font.__super__.constructor.apply(this, arguments);
    }
    Font.node_name = 'Font';
    Font.group_name = 'Utils';
    Font.prototype.set_fields = function() {
      var dir, i;
      Font.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = "";
      dir = "../fonts/";
      this.files = {
        "helvetiker": {
          "normal": dir + "helvetiker_regular.typeface",
          "bold": dir + "helvetiker_bold.typeface"
        },
        "optimer": {
          "normal": dir + "optimer_regular.typeface",
          "bold": dir + "optimer_bold.typeface"
        },
        "gentilis": {
          "normal": dir + "gentilis_regular.typeface",
          "bold": dir + "gentilis_bold.typeface"
        },
        "droid sans": {
          "normal": dir + "droid/droid_sans_regular.typeface",
          "bold": dir + "droid/droid_sans_bold.typeface"
        },
        "droid serif": {
          "normal": dir + "droid/droid_serif_regular.typeface",
          "bold": dir + "droid/droid_serif_bold.typeface"
        }
      };
      this.rack.addFields({
        inputs: {
          "font": {
            type: "Float",
            val: 0,
            values: {
              "helvetiker": 0,
              "optimer": 1,
              "gentilis": 2,
              "droid sans": 3,
              "droid serif": 4
            }
          },
          "weight": {
            type: "Float",
            val: 0,
            values: {
              "normal": 0,
              "bold": 1
            }
          }
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.reverseFontMap = {};
      this.reverseWeightMap = {};
      for (i in this.rack.node_fields_by_name.inputs.weight.possible_values) {
        this.reverseWeightMap[this.rack.node_fields_by_name.inputs.weight.possible_values[i]] = i;
      }
      for (i in this.rack.node_fields_by_name.inputs.font.possible_values) {
        this.reverseFontMap[this.rack.node_fields_by_name.inputs.font.possible_values[i]] = i;
      }
      this.fontcache = -1;
      return this.weightcache = -1;
    };
    Font.prototype.compute = function() {
      var findex, font, weight, windex;
      findex = parseInt(this.rack.get("font").get());
      windex = parseInt(this.rack.get("weight").get());
      if (findex > 4 || findex < 0) {
        findex = 0;
      }
      if (windex !== 0 || windex !== 1) {
        windex = 0;
      }
      font = this.reverseFontMap[findex];
      weight = this.reverseWeightMap[windex];
      if (findex !== this.fontcache ||  windex !== this.weightcache) {
        require([this.files[font][weight]], __bind(function() {
          return this.ob = {
            font: font,
            weight: weight
          };
        }, this));
      }
      this.fontcache = findex;
      this.weightcache = windex;
      return this.rack.set("out", this.ob);
    };
    return Font;
  })();
});