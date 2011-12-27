var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/core/NodeConnection', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
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
      this.compute_node_position = __bind(this.compute_node_position, this);
      this.init = __bind(this.init, this);
      this.createAnimContainer = __bind(this.createAnimContainer, this);
      this.enable_property_anim = __bind(this.enable_property_anim, this);
      this.disable_property_anim = __bind(this.disable_property_anim, this);
      this.remove_connection = __bind(this.remove_connection, this);
      this.add_out_connection = __bind(this.add_out_connection, this);
      this.add_field_listener = __bind(this.add_field_listener, this);
      this.get_cached_array = __bind(this.get_cached_array, this);
      this.render_connections = __bind(this.render_connections, this);
      this.create_field_connection = __bind(this.create_field_connection, this);
      this.apply_fields_to_val = __bind(this.apply_fields_to_val, this);
      this.toXML = __bind(this.toXML, this);
      this.toJSON = __bind(this.toJSON, this);
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
      this.init_context_menu = __bind(this.init_context_menu, this);
      this.add_count_input = __bind(this.add_count_input, this);
      this.loadAnimation = __bind(this.loadAnimation, this);
      this.typename = __bind(this.typename, this);
      this.auto_evaluate = false;
      this.delays_output = false;
      this.dirty = true;
      this.anim_obj = {};
      this.is_animated = false;
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
      this.container = $("#container");
      this.out_connections = [];
      this.rack = new ThreeNodes.NodeFieldRack(this, this.inXML);
      this.value = false;
      this.name = this.typename();
      this.main_view = false;
      if (this.inJSON && this.inJSON.name && this.inJSON.name !== false) {
        this.name = this.inJSON.name;
      }
      this.init();
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
      return this.init_context_menu();
    };
    NodeBase.prototype.typename = function() {
      return String(this.constructor.name);
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
    NodeBase.prototype.add_count_input = function() {
      return this.rack.addFields({
        inputs: {
          "count": 1
        }
      });
    };
    NodeBase.prototype.init_context_menu = function() {
      var self;
      self = this;
      return $(".field", this.main_view).contextMenu({
        menu: "field-context-menu"
      }, function(action, el, pos) {
        var f_name, f_type, field;
        if (action === "remove_connection") {
          f_name = $(el).attr("id");
          f_type = $(el).parent().attr("class");
          field = self.rack.node_fields[f_type][f_name];
          return field.remove_connections();
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
    NodeBase.prototype.toJSON = function() {
      var res;
      res = {
        nid: this.nid,
        name: this.name,
        type: this.typename(),
        anim: this.getAnimationData(),
        x: this.x,
        y: this.y,
        fields: this.rack.toJSON()
      };
      return res;
    };
    NodeBase.prototype.toXML = function() {
      var pos;
      pos = this.main_view.position();
      return "\t\t\t<node nid='" + this.nid + "' type='" + (this.typename()) + "' x='" + pos.left + "' y='" + pos.top + "'>" + (this.rack.toXML()) + "</node>\n";
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
    NodeBase.prototype.render_connections = function() {
      return this.rack.render_connections();
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
    NodeBase.prototype.add_field_listener = function($field) {
      var f_name, f_type, field, self;
      self = this;
      f_name = $field.attr("id");
      f_type = $field.parent().attr("class");
      field = this.rack.node_fields[f_type][f_name];
      $field.click(function(e) {
        e.preventDefault();
        if (e.shiftKey === true) {
          return field.remove_connections();
        } else {
          return self.create_field_connection(field);
        }
      });
      return this;
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
    NodeBase.prototype.init = function() {
      var apptimeline, self;
      self = this;
      this.main_view = $.tmpl(_view_node_template, this);
      this.main_view.data("object", this);
      this.container.append(this.main_view);
      this.main_view.css({
        left: this.x,
        top: this.y
      });
      apptimeline = self.context.injector.get("AppTimeline");
      this.main_view.draggable({
        start: function(ev, ui) {
          if ($(this).hasClass("ui-selected")) {
            ThreeNodes.selected_nodes = $(".ui-selected").each(function() {
              return $(this).data("offset", $(this).offset());
            });
          } else {
            ThreeNodes.selected_nodes = $([]);
            $(".node").removeClass("ui-selected");
          }
          return ThreeNodes.nodes_offset = $(this).offset();
        },
        drag: function(ev, ui) {
          var dl, dt;
          dt = ui.position.top - ThreeNodes.nodes_offset.top;
          dl = ui.position.left - ThreeNodes.nodes_offset.left;
          ThreeNodes.selected_nodes.not(this).each(function() {
            var dx, dy, el, offset;
            el = $(this);
            offset = el.data("offset");
            dx = offset.top + dt;
            dy = offset.left + dl;
            el.css({
              top: dx,
              left: dy
            });
            el.data("object").render_connections();
            return el.data("object").compute_node_position();
          });
          return self.render_connections();
        },
        stop: function() {
          ThreeNodes.selected_nodes.not(this).each(function() {
            var el;
            el = $(this).data("object");
            return el.render_connections();
          });
          self.compute_node_position();
          return self.render_connections();
        }
      });
      $("#container").selectable({
        filter: ".node",
        stop: __bind(function(event, ui) {
          var $selected, nodes;
          $selected = $(".node.ui-selected");
          nodes = [];
          $selected.each(function() {
            return nodes.push($(this).data("object").anim);
          });
          return apptimeline.timeline.selectAnims(nodes);
        }, this)
      });
      this.main_view.click(function(e) {
        var selectable;
        if (e.metaKey === false) {
          $(".node").removeClass("ui-selected");
          $(this).addClass("ui-selecting");
        } else {
          if ($(this).hasClass("ui-selected")) {
            $(this).removeClass("ui-selected");
          } else {
            $(this).addClass("ui-selecting");
          }
        }
        selectable = $("#container").data("selectable");
        selectable.refresh();
        selectable._mouseStop(null);
        return self.rack.render_sidebar();
      });
      return $(".head span", this.main_view).dblclick(function(e) {
        var $input, apply_input_result, prev;
        prev = $(this).html();
        $(".head", self.main_view).append("<input type='text' />");
        $(this).hide();
        $input = $(".head input", self.main_view);
        $input.val(prev);
        apply_input_result = function() {
          $(".head span", self.main_view).html($input.val()).show();
          self.name = $input.val();
          return $input.remove();
        };
        $input.blur(function(e) {
          return apply_input_result();
        });
        $("#graph").click(function(e) {
          return apply_input_result();
        });
        return $input.keydown(function(e) {
          if (e.keyCode === 13) {
            return apply_input_result();
          }
        });
      });
    };
    NodeBase.prototype.compute_node_position = function() {
      var pos;
      pos = this.main_view.position();
      this.x = pos.left;
      return this.y = pos.top;
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
      this.v_in = this.rack.addField("in", 0);
      return this.v_out = this.rack.addField("out", 0, "outputs");
    };
    NodeNumberSimple.prototype.process_val = function(num, i) {
      return num;
    };
    NodeNumberSimple.prototype.compute = function() {
      var i, numItems, res;
      res = [];
      numItems = this.rack.getMaxInputSliceCount();
      for (i = 0; 0 <= numItems ? i <= numItems : i >= numItems; 0 <= numItems ? i++ : i--) {
        res[i] = this.process_val(this.v_in.get(i), i);
      }
      this.v_out.set(res);
      return true;
    };
    return NodeNumberSimple;
  })();
});