var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ThreeNodes.field_click_1 = false;
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/core/NodeConnection', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
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
      this.remove = __bind(this.remove, this);
      this.compute = __bind(this.compute, this);
      this.has_out_connection = __bind(this.has_out_connection, this);
      this.set_fields = __bind(this.set_fields, this);
      this.input_value_has_changed = __bind(this.input_value_has_changed, this);
      this.create_cache_object = __bind(this.create_cache_object, this);
      this.init_context_menu = __bind(this.init_context_menu, this);
      this.typename = __bind(this.typename, this);
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
      this.updated = false;
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
    NodeBase.prototype.compute = function() {
      return this.value = this.value;
    };
    NodeBase.prototype.remove = function() {
      this.rack.remove_all_connections();
      return this.main_view.remove();
    };
    NodeBase.prototype.update = function() {
      if (this.updated === true) {
        return true;
      }
      this.updated = true;
      this.rack.update_inputs();
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
    NodeBase.prototype.apply_fields_to_val = function(afields, target, exceptions) {
      var f, nf, _results;
      if (exceptions == null) {
        exceptions = [];
      }
      _results = [];
      for (f in afields) {
        nf = afields[f];
        _results.push(exceptions.indexOf(nf.name) === -1 ? target[nf.name] = this.rack.get(nf.name).val : void 0);
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
        c = new ThreeNodes.NodeConnection(ThreeNodes.field_click_1, field_click_2);
        this.context.injector.applyContext(c);
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
      this.container.append(this.main_view);
      this.main_view.css({
        left: this.x,
        top: this.y
      });
      this.main_view.draggable({
        drag: function() {
          return self.render_connections();
        },
        stop: function() {
          var pos;
          self.render_connections();
          pos = self.main_view.position();
          self.x = pos.left;
          return self.y = pos.top;
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
      var res;
      res = false;
      switch ($.type(this.v_in.get())) {
        case "array":
          res = _.map(this.v_in.val, function(n, i) {
            return this.process_val(n, i);
          });
          break;
        default:
          res = this.process_val(this.v_in.get(), 0);
      }
      if (this.v_out.get() !== res) {
        this.v_out.set(res);
      }
      return true;
    };
    return NodeNumberSimple;
  })();
});