var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['Underscore', 'Backbone', 'order!threenodes/models/Field'], function(_, Backbone) {
  "use strict";
  /* Fields Collection
  */  return ThreeNodes.NodeFieldsCollection = (function(_super) {

    __extends(NodeFieldsCollection, _super);

    function NodeFieldsCollection() {
      this.add_center_textfield = __bind(this.add_center_textfield, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.addFields = __bind(this.addFields, this);
      this.addField = __bind(this.addField, this);
      this.removeAllConnections = __bind(this.removeAllConnections, this);
      this.renderConnections = __bind(this.renderConnections, this);
      this.setFieldInputUnchanged = __bind(this.setFieldInputUnchanged, this);
      this.getDownstreamNodes = __bind(this.getDownstreamNodes, this);
      this.getUpstreamNodes = __bind(this.getUpstreamNodes, this);
      this.getMaxInputSliceCount = __bind(this.getMaxInputSliceCount, this);
      this.setField = __bind(this.setField, this);
      this.getField = __bind(this.getField, this);
      this.toJSON = __bind(this.toJSON, this);
      this.load = __bind(this.load, this);
      this.destroy = __bind(this.destroy, this);
      this.initialize = __bind(this.initialize, this);
      NodeFieldsCollection.__super__.constructor.apply(this, arguments);
    }

    NodeFieldsCollection.prototype.initialize = function(models, options) {
      this.node = options.node;
      this.node_fields = {};
      this.node_fields.inputs = {};
      return this.node_fields.outputs = {};
    };

    NodeFieldsCollection.prototype.destroy = function() {
      this.removeAllConnections();
      while (this.models.length > 0) {
        this.models[0].remove();
      }
      delete this.node;
      return delete this.node_fields;
    };

    NodeFieldsCollection.prototype.load = function(data) {
      var f, node_field, _i, _len, _ref;
      if (!data || !data["in"]) return false;
      _ref = data["in"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        node_field = this.node_fields.inputs[f.name];
        if (node_field) node_field.load(f.val);
      }
      return true;
    };

    NodeFieldsCollection.prototype.toJSON = function() {
      var data;
      data = {
        "in": jQuery.map(this.node_fields.inputs, function(f, i) {
          return f.toJSON();
        }),
        out: jQuery.map(this.node_fields.outputs, function(f, i) {
          return f.toJSON();
        })
      };
      return data;
    };

    NodeFieldsCollection.prototype.getField = function(key, is_out) {
      var target;
      if (is_out == null) is_out = false;
      target = is_out === true ? "outputs" : "inputs";
      return this.node_fields[target][key];
    };

    NodeFieldsCollection.prototype.setField = function(key, value) {
      return this.node_fields.outputs[key].setValue(value);
    };

    NodeFieldsCollection.prototype.getMaxInputSliceCount = function() {
      var f, fname, result, val;
      result = 1;
      for (fname in this.node_fields.inputs) {
        f = this.node_fields.inputs[fname];
        val = f.attributes.value;
        if (val && $.type(val) === "array") {
          if (val.length > result) result = val.length;
        }
      }
      return result - 1;
    };

    NodeFieldsCollection.prototype.getUpstreamNodes = function() {
      var c, f, fname, res, _i, _len, _ref;
      res = [];
      for (fname in this.node_fields.inputs) {
        f = this.node_fields.inputs[fname];
        _ref = f.connections;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          res[res.length] = c.from_field.node;
        }
      }
      return res;
    };

    NodeFieldsCollection.prototype.getDownstreamNodes = function() {
      var c, f, fname, res, _i, _j, _len, _len2, _ref, _ref2;
      res = [];
      _ref = this.node_fields.outputs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fname = _ref[_i];
        f = this.node_fields.inputs[fname];
        _ref2 = f.connections;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          c = _ref2[_j];
          res[res.length] = c.to_field.node;
        }
      }
      return res;
    };

    NodeFieldsCollection.prototype.setFieldInputUnchanged = function() {
      var f, fname, _i, _len, _ref, _results;
      _ref = this.node_fields.inputs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fname = _ref[_i];
        f = this.node_fields.inputs[fname];
        _results.push(f.changed = false);
      }
      return _results;
    };

    NodeFieldsCollection.prototype.renderConnections = function() {
      return this.invoke("render_connections");
    };

    NodeFieldsCollection.prototype.removeAllConnections = function() {
      return this.invoke("remove_connections");
    };

    NodeFieldsCollection.prototype.addField = function(name, value, direction) {
      var f, field, field_is_out, target;
      if (direction == null) direction = "inputs";
      f = false;
      field_is_out = direction !== "inputs";
      if ($.type(value) !== "object") value = this.getFieldValueObject(value);
      field = new ThreeNodes.fields.types[value.type]({
        name: name,
        value: value.val,
        possibilities: value.values,
        node: this.node,
        is_output: field_is_out,
        "default": value["default"]
      });
      target = field.get("is_output") === false ? "inputs" : "outputs";
      this.node_fields[target][field.get("name")] = field;
      this.add(field);
      return field;
    };

    NodeFieldsCollection.prototype.addFields = function(fields_array) {
      var dir, fname, value;
      for (dir in fields_array) {
        for (fname in fields_array[dir]) {
          value = fields_array[dir][fname];
          this.addField(fname, value, dir);
        }
      }
      return this;
    };

    NodeFieldsCollection.prototype.render_sidebar = function() {
      this.trigger("renderSidebar");
      return this;
    };

    NodeFieldsCollection.prototype.add_center_textfield = function(field) {
      this.trigger("addCenterTextfield", field);
      return this;
    };

    NodeFieldsCollection.prototype.getFieldValueObject = function(default_value) {
      var ftype, res;
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
      res = {
        type: ftype,
        val: default_value
      };
      return res;
    };

    return NodeFieldsCollection;

  })(Backbone.Collection);
});
