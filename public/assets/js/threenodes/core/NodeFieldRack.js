var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/core/NodeField', 'order!threenodes/collections/NodeFieldsCollection'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.NodeFieldRack = (function() {

    function NodeFieldRack(node) {
      this.node = node;
      this.add_center_textfield = __bind(this.add_center_textfield, this);
      this.render_sidebar = __bind(this.render_sidebar, this);
      this.addFields = __bind(this.addFields, this);
      this.addField = __bind(this.addField, this);
      this.toXML = __bind(this.toXML, this);
      this.toCode = __bind(this.toCode, this);
      this.toJSON = __bind(this.toJSON, this);
      this.load = __bind(this.load, this);
      this.remove_all_connections = __bind(this.remove_all_connections, this);
      this.render_connections = __bind(this.render_connections, this);
      this.setFieldInputUnchanged = __bind(this.setFieldInputUnchanged, this);
      this.getDownstreamNodes = __bind(this.getDownstreamNodes, this);
      this.getUpstreamNodes = __bind(this.getUpstreamNodes, this);
      this.getMaxInputSliceCount = __bind(this.getMaxInputSliceCount, this);
      this.set = __bind(this.set, this);
      this.get = __bind(this.get, this);
      this.view = false;
    }

    NodeFieldRack.prototype.onRegister = function() {
      this.collection = new ThreeNodes.NodeFieldsCollection([], {
        node: this.node,
        xml: this.node.inXML,
        json: this.node.inJSON
      });
      return this;
    };

    NodeFieldRack.prototype.get = function(key, is_out) {
      if (is_out == null) is_out = false;
      return this.collection.getField(key, is_out);
    };

    NodeFieldRack.prototype.set = function(key, value) {
      return this.collection.setField(key, value);
    };

    NodeFieldRack.prototype.getMaxInputSliceCount = function() {
      return this.collection.getMaxInputSliceCount();
    };

    NodeFieldRack.prototype.getUpstreamNodes = function() {
      return this.collection.getUpstreamNodes();
    };

    NodeFieldRack.prototype.getDownstreamNodes = function() {
      return this.collection.getDownstreamNodes();
    };

    NodeFieldRack.prototype.setFieldInputUnchanged = function() {
      return this.collection.setFieldInputUnchanged();
    };

    NodeFieldRack.prototype.render_connections = function() {
      return this.collection.renderConnections();
    };

    NodeFieldRack.prototype.remove_all_connections = function() {
      return this.collection.removeAllConnections();
    };

    NodeFieldRack.prototype.load = function(xml, json) {
      return this.collection.load(xml, json);
    };

    NodeFieldRack.prototype.toJSON = function() {
      return this.collection.toJSON();
    };

    NodeFieldRack.prototype.toCode = function() {
      return this.collection.toCode();
    };

    NodeFieldRack.prototype.toXML = function() {
      return this.collection.toXML();
    };

    NodeFieldRack.prototype.addField = function(name, value, direction) {
      var f;
      if (direction == null) direction = "inputs";
      f = false;
      if ($.type(value) === "object") {
        if (value.values) {
          f = new ThreeNodes.fields.types[value.type](name, value.val, value.values);
        } else {
          f = new ThreeNodes.fields.types[value.type](name, value.val);
        }
        if (value["default"] !== null) f.default_value = value["default"];
      } else {
        f = this.create_field_from_default_type(name, value);
      }
      if (direction !== "inputs") f.is_output = true;
      this.collection.registerField(f);
      this.context.injector.applyContext(f);
      this.collection.add(f);
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
      return this;
    };

    NodeFieldRack.prototype.render_sidebar = function() {
      if (this.view) this.view.renderSidebar();
      return this;
    };

    NodeFieldRack.prototype.add_center_textfield = function(field) {
      if (this.view) this.view.addCenterTextfield(field);
      return this;
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
