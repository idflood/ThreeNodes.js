var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeField'], function($, _, Backbone) {
  return ThreeNodes.NodeFieldRack = (function() {
    function NodeFieldRack(node) {
      this.node = node;
      this.add_center_textfield = __bind(this.add_center_textfield, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.registerField = __bind(this.registerField, this);
      this.addFields = __bind(this.addFields, this);
      this.addField = __bind(this.addField, this);
      this.fromXML = __bind(this.fromXML, this);
      this.fromJSON = __bind(this.fromJSON, this);
      this.toXML = __bind(this.toXML, this);
      this.toJSON = __bind(this.toJSON, this);
      this.remove_all_connections = __bind(this.remove_all_connections, this);
      this.render_connections = __bind(this.render_connections, this);
      this.setFieldInputUnchanged = __bind(this.setFieldInputUnchanged, this);
      this.getDownstreamNodes = __bind(this.getDownstreamNodes, this);
      this.getUpstreamNodes = __bind(this.getUpstreamNodes, this);
      this.getMaxInputSliceCount = __bind(this.getMaxInputSliceCount, this);
      this.node_fields = {};
      this.node_fields.inputs = {};
      this.node_fields.outputs = {};
      this.node_fields_by_name = {};
      this.node_fields_by_name.inputs = {};
      this.node_fields_by_name.outputs = {};
    }
    NodeFieldRack.prototype.get = function(key, is_out) {
      if (is_out == null) {
        is_out = false;
      }
      if (is_out === true) {
        return this.node_fields_by_name.outputs[key];
      } else {
        return this.node_fields_by_name.inputs[key];
      }
    };
    NodeFieldRack.prototype.set = function(key, value) {
      return this.node_fields_by_name.outputs[key].set(value);
    };
    NodeFieldRack.prototype.getMaxInputSliceCount = function() {
      var f, fid, res, _i, _len, _ref;
      res = 0;
      _ref = this.node_fields.inputs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fid = _ref[_i];
        f = this.node_fields.inputs[fid];
        if (f.val.length > res) {
          res = f.val.length;
        }
      }
      return res;
    };
    NodeFieldRack.prototype.getUpstreamNodes = function() {
      var c, f, fid, res, _i, _len, _ref;
      res = [];
      for (fid in this.node_fields.inputs) {
        f = this.node_fields.inputs[fid];
        _ref = f.connections;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          res[res.length] = c.from_field.node;
        }
      }
      return res;
    };
    NodeFieldRack.prototype.getDownstreamNodes = function() {
      var c, f, fid, res, _i, _j, _len, _len2, _ref, _ref2;
      res = [];
      _ref = this.node_fields.outputs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fid = _ref[_i];
        f = this.node_fields.inputs[fid];
        _ref2 = f.connections;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          c = _ref2[_j];
          res[res.length] = c.to_field.node;
        }
      }
      return res;
    };
    NodeFieldRack.prototype.setFieldInputUnchanged = function() {
      var f, fid, _i, _len, _ref, _results;
      _ref = this.node_fields.inputs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fid = _ref[_i];
        f = this.node_fields.inputs[fid];
        _results.push(f.changed = false);
      }
      return _results;
    };
    NodeFieldRack.prototype.render_connections = function() {
      var f;
      for (f in this.node_fields.inputs) {
        this.node_fields.inputs[f].render_connections();
      }
      for (f in this.node_fields.outputs) {
        this.node_fields.outputs[f].render_connections();
      }
      return true;
    };
    NodeFieldRack.prototype.remove_all_connections = function() {
      var f, _results;
      for (f in this.node_fields.inputs) {
        this.node_fields.inputs[f].remove_connections();
      }
      _results = [];
      for (f in this.node_fields.outputs) {
        _results.push(this.node_fields.outputs[f].remove_connections());
      }
      return _results;
    };
    NodeFieldRack.prototype.toJSON = function() {
      var res;
      res = {
        "in": jQuery.map(this.node_fields.inputs, function(f, i) {
          return f.toJSON();
        }),
        out: jQuery.map(this.node_fields.outputs, function(f, i) {
          return f.toJSON();
        })
      };
      return res;
    };
    NodeFieldRack.prototype.toXML = function() {
      var f, res;
      res = "\t\t<in>\n";
      for (f in this.node_fields.inputs) {
        res += this.node_fields.inputs[f].toXML();
      }
      res += "\t\t</in>\n";
      res += "\t\t<out>\n";
      for (f in this.node_fields.outputs) {
        res += this.node_fields.outputs[f].toXML();
      }
      res += "\t\t</out>\n";
      return res;
    };
    NodeFieldRack.prototype.fromJSON = function(data) {
      var f, node_field, _i, _len, _ref;
      _ref = data.fields["in"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        node_field = this.node_fields.inputs["fid-" + f.fid];
        if (node_field && f.val) {
          node_field.set(f.val);
        }
      }
      return true;
    };
    NodeFieldRack.prototype.fromXML = function(data) {
      var self;
      self = this;
      $("in field", data).each(function() {
        var f, field_val;
        f = self.node_fields.inputs["fid-" + $(this).attr("fid")];
        field_val = $(this).attr("val");
        if (f && field_val !== "[object Object]") {
          return f.set(field_val);
        }
      });
      return true;
    };
    NodeFieldRack.prototype.addField = function(name, value, direction) {
      var f;
      if (direction == null) {
        direction = "inputs";
      }
      f = false;
      if ($.type(value) === "object") {
        if (value.values) {
          f = new ThreeNodes.fields.types[value.type](name, value.val, value.values);
        } else {
          f = new ThreeNodes.fields.types[value.type](name, value.val);
        }
      } else {
        f = this.create_field_from_default_type(name, value);
      }
      if (direction !== "inputs") {
        f.is_output = true;
      }
      this.registerField(f);
      return f;
    };
    NodeFieldRack.prototype.addFields = function(fields_array) {
      var dir, fname, value;
      for (dir in fields_array) {
        for (fname in fields_array[dir]) {
          value = fields_array[dir][fname];
          this.addField(fname, value, dir);
        }
      }
      return true;
    };
    NodeFieldRack.prototype.registerField = function(field) {
      field.node = this.node;
      if (field.is_output === false) {
        this.node_fields.inputs["fid-" + field.fid] = field;
        this.node_fields_by_name.inputs[field.name] = field;
        $(".inputs", this.node.main_view).append(field.render_button());
      } else {
        this.node_fields.outputs["fid-" + field.fid] = field;
        this.node_fields_by_name.outputs[field.name] = field;
        $(".outputs", this.node.main_view).append(field.render_button());
      }
      this.node.add_field_listener($("#fid-" + field.fid));
      return field;
    };
    NodeFieldRack.prototype.render_sidebar = function() {
      var $target, f;
      $target = $("#tab-attribute");
      $target.html("");
      for (f in this.node_fields.inputs) {
        this.node_fields.inputs[f].render_sidebar();
      }
      return true;
    };
    NodeFieldRack.prototype.add_center_textfield = function(field) {
      var f_in;
      $(".options .center", this.node.main_view).append("<div><input type='text' id='f-txt-input-" + field.fid + "' /></div>");
      f_in = $("#f-txt-input-" + field.fid);
      field.on_value_update_hooks.update_center_textfield = function(v) {
        return f_in.val(v.toString().substring(0, 10));
      };
      f_in.val(field.get());
      if (field.is_output === true) {
        return f_in.attr("disabled", "disabled");
      } else {
        return f_in.keypress(function(e) {
          if (e.which === 13) {
            field.set($(this).val());
            return $(this).blur();
          }
        });
      }
    };
    NodeFieldRack.prototype.create_field_from_default_type = function(fname, default_value) {
      var ftype;
      ftype = (function() {
        switch ($.type(default_value)) {
          case "number":
            return "Float";
          case "boolean":
            return "Bool";
          default:
            return "String";
        }
      })();
      return new ThreeNodes.fields.types[ftype](fname, default_value);
    };
    return NodeFieldRack;
  })();
});