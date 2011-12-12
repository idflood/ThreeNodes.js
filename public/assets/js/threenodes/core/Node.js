var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/core/NodeConnection', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  ThreeNodes.field_click_1 = false;
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
      this.init = __bind(this.init, this);
      this.remove_connection = __bind(this.remove_connection, this);
      this.add_out_connection = __bind(this.add_out_connection, this);
      this.add_field_listener = __bind(this.add_field_listener, this);
      this.get_cached_array = __bind(this.get_cached_array, this);
      this.render_connections = __bind(this.render_connections, this);
      this.create_field_connection = __bind(this.create_field_connection, this);
      this.apply_fields_to_val = __bind(this.apply_fields_to_val, this);
      this.toXML = __bind(this.toXML, this);
      this.toJSON = __bind(this.toJSON, this);
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
      this.typename = __bind(this.typename, this);
      this.auto_evaluate = false;
      this.delays_output = false;
      this.dirty = true;
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
      this.name = false;
      this.main_view = false;
      this.init();
      this.set_fields();
      if (this.inXML) {
        this.rack.fromXML(this.inXML);
      } else if (this.inJSON) {
        this.rack.fromJSON(this.inJSON);
      }
      return this.init_context_menu();
    };
    NodeBase.prototype.typename = function() {
      return String(this.constructor.name);
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
    NodeBase.prototype.toJSON = function() {
      var res;
      res = {
        nid: this.nid,
        type: this.typename(),
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
    NodeBase.prototype.init = function() {
      var self;
      self = this;
      this.main_view = $.tmpl(_view_node_template, this);
      this.main_view.data("object", this);
      this.container.append(this.main_view);
      this.main_view.css({
        left: this.x,
        top: this.y
      });
      $("#container").selectable({
        filter: ".node"
      });
      this.main_view.draggable({
        start: function(ev, ui) {
          ThreeNodes.selected_nodes = $(".ui-selected").each(function() {
            return $(this).data("offset", $(this).offset());
          });
          if (!$(this).hasClass("ui-selected")) {
            $(this).addClass("ui-selected");
          }
          return ThreeNodes.nodes_offset = $(this).offset();
        },
        drag: function(ev, ui) {
          var dl, dt;
          dt = ui.position.top - ThreeNodes.nodes_offset.top;
          dl = ui.position.left - ThreeNodes.nodes_offset.left;
          ThreeNodes.selected_nodes.not(this).each(function() {
            var el, offset;
            el = $(this);
            offset = el.data("offset");
            el.css({
              top: offset.top + dt,
              left: offset.left + dl
            });
            return el.data("object").render_connections();
          });
          return self.render_connections();
        },
        stop: function() {
          var pos;
          ThreeNodes.selected_nodes.not(this).each(function() {
            var el;
            el = $(this);
            return el.data("object").render_connections();
          });
          pos = self.main_view.position();
          self.x = pos.left;
          self.y = pos.top;
          return self.render_connections();
        }
      });
      $(".head", this.main_view).dblclick(function(e) {
        return $(".options", self.main_view).animate({
          height: 'toggle'
        }, 120, function() {
          return self.render_connections();
        });
      });
      return $(".head", this.main_view).click(function(e) {
        return self.rack.render_sidebar();
      });
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