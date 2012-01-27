var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/core/NodeConnection', 'order!threenodes/core/NodeView', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.field_click_1 = false;
  ThreeNodes.selected_nodes = $([]);
  ThreeNodes.nodes_offset = {
    top: 0,
    left: 0
  };
  ThreeNodes.NodeBase = (function() {
    function NodeBase(x, y, inXML, inJSON) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
      this.inXML = inXML != null ? inXML : false;
      this.inJSON = inJSON != null ? inJSON : false;
      this.createAnimContainer = __bind(this.createAnimContainer, this);
      this.enable_property_anim = __bind(this.enable_property_anim, this);
      this.disable_property_anim = __bind(this.disable_property_anim, this);
      this.remove_connection = __bind(this.remove_connection, this);
      this.add_out_connection = __bind(this.add_out_connection, this);
      this.get_cached_array = __bind(this.get_cached_array, this);
      this.create_field_connection = __bind(this.create_field_connection, this);
      this.apply_fields_to_val = __bind(this.apply_fields_to_val, this);
      this.toCode = __bind(this.toCode, this);
      this.toXML = __bind(this.toXML, this);
      this.toJSON = __bind(this.toJSON, this);
      this.getAnimationDataToCode = __bind(this.getAnimationDataToCode, this);
      this.getAnimationData = __bind(this.getAnimationData, this);
      this.hasPropertyTrackAnim = __bind(this.hasPropertyTrackAnim, this);
      this.update = __bind(this.update, this);
      this.getDownstreamNodes = __bind(this.getDownstreamNodes, this);
      this.getUpstreamNodes = __bind(this.getUpstreamNodes, this);
      this.remove = __bind(this.remove, this);
      this.has_out_connection = __bind(this.has_out_connection, this);
      this.set_fields = __bind(this.set_fields, this);
      this.input_value_has_changed = __bind(this.input_value_has_changed, this);
      this.create_cache_object = __bind(this.create_cache_object, this);
      this.add_count_input = __bind(this.add_count_input, this);
      this.onTimelineRebuild = __bind(this.onTimelineRebuild, this);
      this.loadAnimation = __bind(this.loadAnimation, this);
      this.init_main_view = __bind(this.init_main_view, this);
      this.typename = __bind(this.typename, this);
      this.auto_evaluate = false;
      this.delays_output = false;
      this.dirty = true;
      this.anim_obj = {};
      this.is_animated = false;
      this.view = false;
      if (this.inXML) {
        this.nid = parseInt(this.inXML.attr("nid"));
        ThreeNodes.uid = this.nid;
      } else if (this.inJSON) {
        this.nid = this.inJSON.nid;
        ThreeNodes.uid = this.nid;
      } else {
        this.nid = ThreeNodes.Utils.get_uid();
      }
    }
    NodeBase.prototype.onRegister = function() {
      this.out_connections = [];
      this.value = false;
      this.main_view = false;
      this.container = $("#container");
      this.name = this.typename();
      this.apptimeline = this.context.injector.get("AppTimeline");
      this.rack = this.context.injector.instanciate(ThreeNodes.NodeFieldRack, this, this.inXML);
      if (this.inJSON && this.inJSON.name && this.inJSON.name !== false) {
        this.name = this.inJSON.name;
      }
      this.init_main_view();
      this.set_fields();
      this.anim = this.createAnimContainer();
      if (this.inXML) {
        this.rack.fromXML(this.inXML);
      } else if (this.inJSON) {
        this.rack.fromJSON(this.inJSON);
        if (this.inJSON.anim !== false) {
          this.loadAnimation();
        }
      }
      if (this.view !== false) {
        this.view.init_context_menu();
      }
      this.onTimelineRebuild();
      return true;
    };
    NodeBase.prototype.typename = function() {
      return String(this.constructor.name);
    };
    NodeBase.prototype.init_main_view = function() {
      this.main_view = $.tmpl(_view_node_template, this);
      this.main_view.data("object", this);
      this.container.append(this.main_view);
      this.view = new ThreeNodes.NodeView({
        el: this.main_view,
        x: this.x,
        y: this.y,
        name: this.name,
        rack: this.rack,
        apptimeline: this.apptimeline
      });
      return this.context.injector.applyContext(this.view);
    };
    NodeBase.prototype.loadAnimation = function() {
      var anims, propKey, propLabel, track, _i, _len, _ref;
      this.anim = this.createAnimContainer();
      _ref = this.inJSON.anim;
      for (propLabel in _ref) {
        anims = _ref[propLabel];
        track = this.anim.getPropertyTrack(propLabel);
        for (_i = 0, _len = anims.length; _i < _len; _i++) {
          propKey = anims[_i];
          track.keys.push({
            time: propKey.time,
            value: propKey.value,
            easing: Timeline.stringToEasingFunction(propKey.easing),
            track: track
          });
        }
        this.anim.timeline.rebuildTrackAnimsFromKeys(track);
      }
      return true;
    };
    NodeBase.prototype.onTimelineRebuild = function() {
      var $target, nodeAnimation, propTrack, _i, _len, _ref;
      nodeAnimation = false;
      _ref = this.anim.objectTrack.propertyTracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        propTrack = _ref[_i];
        $target = $('.inputs .field-' + propTrack.name, this.main_view);
        if (propTrack.anims.length > 0) {
          $target.addClass("has-animation");
          nodeAnimation = true;
        } else {
          $target.removeClass("has-animation");
        }
      }
      if (nodeAnimation === true) {
        $(this.main_view).addClass("node-has-animation");
      } else {
        $(this.main_view).removeClass("node-has-animation");
      }
      return true;
    };
    NodeBase.prototype.add_count_input = function() {
      return this.rack.addFields({
        inputs: {
          "count": 1
        }
      });
    };
    NodeBase.prototype.create_cache_object = function(values) {
      var res, v, _i, _len;
      res = {};
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v = values[_i];
        res[v] = this.rack.get(v).get();
      }
      return res;
    };
    NodeBase.prototype.input_value_has_changed = function(values, cache) {
      var v, v2, _i, _len;
      if (cache == null) {
        cache = this.material_cache;
      }
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v = values[_i];
        v2 = this.rack.get(v).get();
        if (v2 !== cache[v]) {
          return true;
        }
      }
      return false;
    };
    NodeBase.prototype.set_fields = function() {};
    NodeBase.prototype.has_out_connection = function() {
      return this.out_connections.length !== 0;
    };
    NodeBase.prototype.remove = function() {
      var ng;
      ng = this.context.injector.get("NodeGraph");
      ng.removeNode(this);
      this.rack.remove_all_connections();
      return this.main_view.remove();
    };
    NodeBase.prototype.getUpstreamNodes = function() {
      return this.rack.getUpstreamNodes();
    };
    NodeBase.prototype.getDownstreamNodes = function() {
      return this.rack.getDownstreamNodes();
    };
    NodeBase.prototype.update = function() {
      return this.compute();
    };
    NodeBase.prototype.hasPropertyTrackAnim = function() {
      var propTrack, _i, _len, _ref;
      _ref = this.anim.objectTrack.propertyTracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        propTrack = _ref[_i];
        if (propTrack.anims.length > 0) {
          return true;
        }
      }
      return false;
    };
    NodeBase.prototype.getAnimationData = function() {
      var anim, k, propTrack, res, _i, _j, _len, _len2, _ref, _ref2;
      if (!this.anim || !this.anim.objectTrack || !this.anim.objectTrack.propertyTracks || this.hasPropertyTrackAnim() === false) {
        return false;
      }
      if (this.anim !== false) {
        res = {};
        _ref = this.anim.objectTrack.propertyTracks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          propTrack = _ref[_i];
          res[propTrack.propertyName] = [];
          _ref2 = propTrack.keys;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            anim = _ref2[_j];
            k = {
              time: anim.time,
              value: anim.value,
              easing: Timeline.easingFunctionToString(anim.easing)
            };
            res[propTrack.propertyName].push(k);
          }
        }
      }
      return res;
    };
    NodeBase.prototype.getAnimationDataToCode = function() {
      var anim, propTrack, res, _i, _j, _len, _len2, _ref, _ref2;
      res = "false";
      if (!this.anim || !this.anim.objectTrack || !this.anim.objectTrack.propertyTracks || this.hasPropertyTrackAnim() === false) {
        return res;
      }
      if (this.anim !== false) {
        res = "{\n";
        _ref = this.anim.objectTrack.propertyTracks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          propTrack = _ref[_i];
          res += "\t\t" + ("'" + propTrack.propertyName + "' : [\n");
          _ref2 = propTrack.keys;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            anim = _ref2[_j];
            res += "\t\t\t" + ("{time: " + anim.time + ", value: " + anim.value + ", easing: '" + (Timeline.easingFunctionToString(anim.easing)) + "'},\n");
          }
          res += "\t\t" + "],\n";
        }
        return res += "\t}";
      }
    };
    NodeBase.prototype.toJSON = function() {
      var res;
      res = {
        nid: this.nid,
        name: this.view.options.name,
        type: this.typename(),
        anim: this.getAnimationData(),
        x: this.view.options.x,
        y: this.view.options.y,
        fields: this.rack.toJSON()
      };
      return res;
    };
    NodeBase.prototype.toXML = function() {
      var pos;
      pos = this.main_view.position();
      return "\t\t\t<node nid='" + this.nid + "' type='" + (this.typename()) + "' x='" + pos.left + "' y='" + pos.top + "'>" + (this.rack.toXML()) + "</node>\n";
    };
    NodeBase.prototype.toCode = function() {
      var component, ng, res;
      ng = this.context.injector.get("NodeGraph");
      component = ng.get_component_by_type(this.typename());
      res = "\n// node: " + this.view.options.name + "\n";
      res += "var node_" + this.nid + "_data = {\n";
      res += "\t" + ("nid: " + this.nid + ",\n");
      res += "\t" + ("name: '" + this.view.options.name + "',\n");
      res += "\t" + ("type: '" + (this.typename()) + "',\n");
      res += "\t" + ("fields: " + (this.rack.toCode()) + ",\n");
      res += "\t" + ("anim: " + (this.getAnimationDataToCode()) + "\n");
      res += "};\n";
      res += "var node_" + this.nid + " = nodegraph.create_node(\"" + component + "\", \"" + (this.typename()) + "\", " + this.view.options.x + ", " + this.view.options.y + ", false, node_" + this.nid + "_data);\n";
      return res;
    };
    NodeBase.prototype.apply_fields_to_val = function(afields, target, exceptions, index) {
      var f, nf, _results;
      if (exceptions == null) {
        exceptions = [];
      }
      _results = [];
      for (f in afields) {
        nf = afields[f];
        _results.push(exceptions.indexOf(nf.name) === -1 ? target[nf.name] = this.rack.get(nf.name).get(index) : void 0);
      }
      return _results;
    };
    NodeBase.prototype.create_field_connection = function(field) {
      var c, f, field_click_2;
      f = this;
      if (ThreeNodes.field_click_1 === false) {
        ThreeNodes.field_click_1 = field;
        return $(".inputs .field").filter(function() {
          return $(this).parent().parent().parent().attr("id") !== ("nid-" + f.nid);
        }).addClass("field-possible-target");
      } else {
        field_click_2 = field;
        c = this.context.injector.instanciate(ThreeNodes.NodeConnection, ThreeNodes.field_click_1, field_click_2);
        $(".field").removeClass("field-possible-target");
        return ThreeNodes.field_click_1 = false;
      }
    };
    NodeBase.prototype.get_cached_array = function(vals) {
      var res, v, _i, _len, _results;
      res = [];
      _results = [];
      for (_i = 0, _len = vals.length; _i < _len; _i++) {
        v = vals[_i];
        _results.push(res[res.length] = this.rack.get(v).get());
      }
      return _results;
    };
    NodeBase.prototype.add_out_connection = function(c, field) {
      if (this.out_connections.indexOf(c) === -1) {
        this.out_connections.push(c);
      }
      return c;
    };
    NodeBase.prototype.remove_connection = function(c) {
      var c_index;
      c_index = this.out_connections.indexOf(c);
      if (c_index !== -1) {
        this.out_connections.splice(c_index, 1);
      }
      return c;
    };
    NodeBase.prototype.disable_property_anim = function(field) {
      if (this.anim && field.is_output === false) {
        return this.anim.disableProperty(field.name);
      }
    };
    NodeBase.prototype.enable_property_anim = function(field) {
      if (field.is_output === true || !this.anim) {
        return false;
      }
      if (field.is_animation_property()) {
        return this.anim.enableProperty(field.name);
      }
    };
    NodeBase.prototype.createAnimContainer = function() {
      var f, field, res;
      res = anim("nid-" + this.nid, this.rack.node_fields_by_name.inputs);
      for (f in this.rack.node_fields_by_name.inputs) {
        field = this.rack.node_fields_by_name.inputs[f];
        if (field.is_animation_property() === false) {
          this.disable_property_anim(field);
        }
      }
      return res;
    };
    return NodeBase;
  })();
  return ThreeNodes.NodeNumberSimple = (function() {
    __extends(NodeNumberSimple, ThreeNodes.NodeBase);
    function NodeNumberSimple() {
      this.compute = __bind(this.compute, this);
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      this.init = __bind(this.init, this);
      NodeNumberSimple.__super__.constructor.apply(this, arguments);
    }
    NodeNumberSimple.prototype.init = function() {
      NodeNumberSimple.__super__.init.apply(this, arguments);
      return this.value = 0;
    };
    NodeNumberSimple.prototype.set_fields = function() {
      this.v_in = this.rack.addField("in", {
        type: "Float",
        val: 0
      });
      return this.v_out = this.rack.addField("out", {
        type: "Float",
        val: 0
      }, "outputs");
    };
    NodeNumberSimple.prototype.process_val = function(num, i) {
      return num;
    };
    NodeNumberSimple.prototype.compute = function() {
      var i, numItems, ref, res;
      res = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        ref = this.v_in.get(i);
        switch ($.type(ref)) {
          case "number":
            res[i] = this.process_val(ref, i);
            break;
          case "object":
            switch (ref.constructor) {
              case THREE.Vector2:
                res[i].x = this.process_val(ref.x, i);
                res[i].y = this.process_val(ref.y, i);
                break;
              case THREE.Vector3:
                res[i].x = this.process_val(ref.x, i);
                res[i].y = this.process_val(ref.y, i);
                res[i].z = this.process_val(ref.z, i);
            }
        }
      }
      this.v_out.set(res);
      return true;
    };
    return NodeNumberSimple;
  })();
});