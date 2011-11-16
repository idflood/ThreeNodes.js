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
      this.update_inputs = __bind(this.update_inputs, this);
      this.fromXML = __bind(this.fromXML, this);
      this.fromJSON = __bind(this.fromJSON, this);
      this.toXML = __bind(this.toXML, this);
      this.toJSON = __bind(this.toJSON, this);
      this.remove_all_connections = __bind(this.remove_all_connections, this);
      this.render_connections = __bind(this.render_connections, this);
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
      var f, node_field, _i, _len, _ref, _results;
      console.log(data);
      _ref = data.fields["in"];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        node_field = this.node_fields.inputs["fid-" + f.fid];
        console.log(node_field);
        _results.push(node_field ? node_field.set(f.val) : void 0);
      }
      return _results;
    };
    NodeFieldRack.prototype.fromXML = function(data) {
      var self;
      self = this;
      return $("in field", data).each(function() {
        var f, field_val;
        f = self.node_fields.inputs["fid-" + $(this).attr("fid")];
        field_val = $(this).attr("val");
        if (f && field_val !== "[object Object]") {
          return f.set(field_val);
        }
      });
    };
    NodeFieldRack.prototype.update_inputs = function() {
      var f;
      for (f in this.node_fields.inputs) {
        this.node_fields.inputs[f].update_input_node();
      }
      return this;
    };
    NodeFieldRack.prototype.addField = function(name, value, direction) {
      var f;
      if (direction == null) {
        direction = "inputs";
      }
      f = false;
      if ($.type(value) === "object") {
        f = new ThreeNodes.fields.types[value.type](name, value.val);
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