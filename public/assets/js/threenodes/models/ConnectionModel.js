var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['Underscore', 'Backbone', 'order!threenodes/utils/Utils'], function(_, Backbone) {
  "use strict";  return ThreeNodes.ConnectionModel = (function() {
    __extends(ConnectionModel, Backbone.Model);
    function ConnectionModel() {
      this.setCID = __bind(this.setCID, this);
      this.switch_fields_if_needed = __bind(this.switch_fields_if_needed, this);
      this.validate_connection = __bind(this.validate_connection, this);
      this.render = __bind(this.render, this);
      this.onRegister = __bind(this.onRegister, this);
      this.remove = __bind(this.remove, this);
      this.initialize = __bind(this.initialize, this);
      this.sync = __bind(this.sync, this);
      ConnectionModel.__super__.constructor.apply(this, arguments);
    }
    ConnectionModel.prototype.defaults = {
      "cid": -1
    };
    ConnectionModel.prototype.sync = function() {};
    ConnectionModel.prototype.initialize = function(options) {
      this.options = options;
      this.node = this.options.node;
      if (this.get("cid") === -1) {
        this.set({
          "cid": ThreeNodes.Utils.get_uid()
        });
      }
      this.from_field = this.options.from_field;
      this.to_field = this.options.to_field;
      this.is_valid = this.validate_connection();
      if (this.is_valid) {
        this.to_field.remove_connections();
        this.from_field.add_connection(this);
        this.to_field.add_connection(this);
        this.to_field.set(this.from_field.get());
        return this.from_field.node.dirty = true;
      }
    };
    ConnectionModel.prototype.remove = function() {
      this.from_field.unregister_connection(this);
      this.to_field.unregister_connection(this);
      this.to_field.node.dirty = true;
      this.to_field.changed = true;
      this.trigger("connection:removed", this, this);
      this.destroy();
      return false;
    };
    ConnectionModel.prototype.onRegister = function() {
      if (this.is_valid) {
        return this.trigger("connection:added", this, this);
      }
    };
    ConnectionModel.prototype.render = function() {
      return this.trigger("render", this);
    };
    ConnectionModel.prototype.validate_connection = function() {
      if (!this.from_field || !this.to_field) {
        return false;
      }
      if (this.from_field.is_output === this.to_field.is_output) {
        return false;
      }
      if (this.from_field.node.model.get('nid') === this.to_field.node.model.get('nid')) {
        return false;
      }
      this.switch_fields_if_needed();
      return true;
    };
    ConnectionModel.prototype.switch_fields_if_needed = function() {
      var f_out;
      if (this.from_field.is_output === false) {
        f_out = this.to_field;
        this.to_field = this.from_field;
        return this.from_field = f_out;
      }
    };
    ConnectionModel.prototype.setCID = function(cid) {
      return this.set({
        "cid": cid
      });
    };
    ConnectionModel.prototype.toJSON = function() {
      var res;
      res = {
        id: this.get("cid"),
        from_node: this.get("from_field").node.model.get("nid"),
        from: this.get("from_field").name,
        to_node: this.get("to_field").node.model.get("nid"),
        to: this.get("to_field").name
      };
      return res;
    };
    ConnectionModel.prototype.toXML = function() {
      return "\t\t<connection id='" + this.cid + "' from='" + this.from_field.fid + "' to='" + this.to_field.fid + "'/>\n";
    };
    ConnectionModel.prototype.toCode = function() {
      var res;
      res = "var connection_" + (this.get('cid')) + "_data = {\n";
      res += "\t" + ("id: " + (this.get('cid')) + ",\n");
      res += "\t" + ("from_node: " + (this.get('from_field').node.model.get('nid')) + ", from: '" + (this.get('from_field').name) + "',\n");
      res += "\t" + ("to_node: " + (this.get('to_field').node.model.get('nid')) + ", to: '" + (this.get('to_field').name) + "'\n");
      res += "};\n";
      res += "var connection_" + this.cid + " = nodegraph.createConnectionFromObject(connection_" + (this.get('cid')) + "_data);\n";
      return res;
    };
    return ConnectionModel;
  })();
});