var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/collections/NodeFieldsCollection', 'order!threenodes/utils/Utils'], function($, _, Backbone) {
  "use strict";  ThreeNodes.field_click_1 = false;
  ThreeNodes.selected_nodes = $([]);
  ThreeNodes.nodes_offset = {
    top: 0,
    left: 0
  };
  ThreeNodes.NodeBase = (function(_super) {

    __extends(NodeBase, _super);

    function NodeBase() {
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
      this.has_out_connection = __bind(this.has_out_connection, this);
      this.set_fields = __bind(this.set_fields, this);
      this.input_value_has_changed = __bind(this.input_value_has_changed, this);
      this.create_cache_object = __bind(this.create_cache_object, this);
      this.add_count_input = __bind(this.add_count_input, this);
      this.showNodeAnimation = __bind(this.showNodeAnimation, this);
      this.loadAnimation = __bind(this.loadAnimation, this);
      this.createConnection = __bind(this.createConnection, this);
      this.remove = __bind(this.remove, this);
      this.typename = __bind(this.typename, this);
      this.post_init = __bind(this.post_init, this);
      this.initialize = __bind(this.initialize, this);
      this.fromXML = __bind(this.fromXML, this);
      this.fromJSON = __bind(this.fromJSON, this);
      this.setPosition = __bind(this.setPosition, this);
      this.setName = __bind(this.setName, this);
      this.setNID = __bind(this.setNID, this);
      this.load = __bind(this.load, this);
      NodeBase.__super__.constructor.apply(this, arguments);
    }

    NodeBase.node_name = '';

    NodeBase.group_name = '';

    NodeBase.prototype["default"] = {
      nid: 0,
      x: 0,
      y: 0,
      name: ""
    };

    NodeBase.prototype.load = function(xml, json) {
      if (xml) {
        return this.fromXML(xml);
      } else if (json) {
        return this.fromJSON(json);
      }
    };

    NodeBase.prototype.setNID = function(nid) {
      this.set({
        "nid": nid
      });
      return this;
    };

    NodeBase.prototype.setName = function(name) {
      this.set({
        "name": name
      });
      return this;
    };

    NodeBase.prototype.setPosition = function(x, y) {
      this.set({
        "x": x,
        "y": y
      });
      return this;
    };

    NodeBase.prototype.fromJSON = function(data) {
      this.set({
        "nid": data.nid,
        "name": data.name ? data.name : this.get("name"),
        "x": data.x,
        "y": data.y
      });
      ThreeNodes.uid = this.get("nid");
      return this;
    };

    NodeBase.prototype.fromXML = function(data) {
      this.set({
        "nid": parseInt(this.inXML.attr("nid"))
      });
      ThreeNodes.uid = this.get("nid");
      return this;
    };

    NodeBase.prototype.initialize = function(options) {
      this.auto_evaluate = false;
      this.delays_output = false;
      this.dirty = true;
      this.anim_obj = {};
      this.is_animated = false;
      this.out_connections = [];
      this.value = false;
      this.inXML = options.inXML;
      this.inJSON = options.inJSON;
      this.context = options.context;
      if (this.inXML === false && this.inJSON === false) {
        this.setNID(ThreeNodes.Utils.get_uid());
      }
      this.setName(this.typename());
      this.load(this.inXML, this.inJSON);
      this.apptimeline = this.context.timelineView.timeline;
      this.rack = new ThreeNodes.NodeFieldsCollection([], {
        node: this
      });
      return this;
    };

    NodeBase.prototype.post_init = function() {
      this.set_fields();
      this.rack.load(this.inXML, this.inJSON);
      this.anim = this.createAnimContainer();
      if (this.inJSON && this.inJSON.anim !== false) this.loadAnimation();
      this.showNodeAnimation();
      this.trigger("postInit");
      return this;
    };

    NodeBase.prototype.typename = function() {
      return String(this.constructor.name);
    };

    NodeBase.prototype.remove = function() {
      if (this.anim) this.anim.destroy();
      this.rack.destroy();
      delete this.rack;
      delete this.view;
      delete this.main_view;
      delete this.apptimeline;
      delete this.context;
      delete this.anim;
      return this.destroy();
    };

    NodeBase.prototype.createConnection = function(field1, field2) {
      return this.trigger("createConnection", field1, field2);
    };

    NodeBase.prototype.loadAnimation = function() {
      var anims, propKey, propLabel, track, _i, _len, _ref;
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

    NodeBase.prototype.showNodeAnimation = function() {
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
        res[v] = this.rack.getField(v).getValue();
      }
      return res;
    };

    NodeBase.prototype.input_value_has_changed = function(values, cache) {
      var v, v2, _i, _len;
      if (cache == null) cache = this.material_cache;
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v = values[_i];
        v2 = this.rack.getField(v).getValue();
        if (v2 !== cache[v]) return true;
      }
      return false;
    };

    NodeBase.prototype.set_fields = function() {};

    NodeBase.prototype.has_out_connection = function() {
      return this.out_connections.length !== 0;
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
        if (propTrack.anims.length > 0) return true;
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
        nid: this.get('nid'),
        name: this.get('name'),
        type: this.typename(),
        anim: this.getAnimationData(),
        x: this.get('x'),
        y: this.get('y'),
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
      var ng, res;
      ng = this.context.injector.get("NodeGraph");
      res = "\n// node: " + (this.get('name')) + "\n";
      res += "var node_" + (this.get('nid')) + "_data = {\n";
      res += "\t" + ("nid: " + (this.get('nid')) + ",\n");
      res += "\t" + ("name: '" + (this.get('name')) + "',\n");
      res += "\t" + ("type: '" + (this.typename()) + "',\n");
      res += "\t" + ("fields: " + (this.rack.toCode()) + ",\n");
      res += "\t" + ("anim: " + (this.getAnimationDataToCode()) + "\n");
      res += "};\n";
      res += "var node_" + (this.get('nid')) + " = nodegraph.create_node(\"" + (this.typename()) + "\", " + (this.get('x')) + ", " + (this.get('y')) + ", false, node_" + (this.get('nid')) + "_data);\n";
      return res;
    };

    NodeBase.prototype.apply_fields_to_val = function(afields, target, exceptions, index) {
      var f, nf, _results;
      if (exceptions == null) exceptions = [];
      _results = [];
      for (f in afields) {
        nf = afields[f];
        if (exceptions.indexOf(nf.get("name")) === -1) {
          _results.push(target[nf.get("name")] = this.rack.getField(nf.get("name")).getValue(index));
        } else {
          _results.push(void 0);
        }
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
        _results.push(res[res.length] = this.rack.getField(v).getValue());
      }
      return _results;
    };

    NodeBase.prototype.add_out_connection = function(c, field) {
      if (this.out_connections.indexOf(c) === -1) this.out_connections.push(c);
      return c;
    };

    NodeBase.prototype.remove_connection = function(c) {
      var c_index;
      c_index = this.out_connections.indexOf(c);
      if (c_index !== -1) this.out_connections.splice(c_index, 1);
      return c;
    };

    NodeBase.prototype.disable_property_anim = function(field) {
      if (this.anim && field.get("is_output") === false) {
        return this.anim.disableProperty(field.get("name"));
      }
    };

    NodeBase.prototype.enable_property_anim = function(field) {
      if (field.get("is_output") === true || !this.anim) return false;
      if (field.is_animation_property()) {
        return this.anim.enableProperty(field.get("name"));
      }
    };

    NodeBase.prototype.createAnimContainer = function() {
      var f, field, res;
      res = anim("nid-" + this.get("nid"), this.rack.node_fields_by_name.inputs);
      for (f in this.rack.node_fields_by_name.inputs) {
        field = this.rack.node_fields_by_name.inputs[f];
        if (field.is_animation_property() === false) {
          this.disable_property_anim(field);
        }
      }
      return res;
    };

    return NodeBase;

  })(Backbone.Model);
  return ThreeNodes.NodeNumberSimple = (function(_super) {

    __extends(NodeNumberSimple, _super);

    function NodeNumberSimple() {
      this.compute = __bind(this.compute, this);
      this.remove = __bind(this.remove, this);
      this.process_val = __bind(this.process_val, this);
      this.set_fields = __bind(this.set_fields, this);
      NodeNumberSimple.__super__.constructor.apply(this, arguments);
    }

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

    NodeNumberSimple.prototype.remove = function() {
      delete this.v_in;
      delete this.v_out;
      return NodeNumberSimple.__super__.remove.apply(this, arguments);
    };

    NodeNumberSimple.prototype.compute = function() {
      var i, numItems, ref, res;
      res = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        ref = this.v_in.getValue(i);
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
      this.v_out.setValue(res);
      return true;
    };

    return NodeNumberSimple;

  })(ThreeNodes.NodeBase);
});
