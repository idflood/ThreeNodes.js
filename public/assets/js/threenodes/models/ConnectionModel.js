var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['Underscore', 'Backbone', 'order!threenodes/utils/Utils'], function(_, Backbone) {
  "use strict";  return ThreeNodes.ConnectionModel = (function(_super) {

    __extends(ConnectionModel, _super);

    function ConnectionModel() {
      this.setCID = __bind(this.setCID, this);
      this.switch_fields_if_needed = __bind(this.switch_fields_if_needed, this);
      this.validate = __bind(this.validate, this);
      this.render = __bind(this.render, this);
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
      if (this.isValid()) {
        this.to_field.remove_connections();
        this.from_field.add_connection(this);
        this.to_field.add_connection(this);
        this.to_field.setValue(this.from_field.get("value"));
        return this.from_field.node.dirty = true;
      }
    };

    ConnectionModel.prototype.remove = function() {
      this.from_field.unregister_connection(this);
      this.to_field.unregister_connection(this);
      this.to_field.node.dirty = true;
      this.to_field.changed = true;
      this.trigger("connection:removed", this);
      this.destroy();
      return false;
    };

    ConnectionModel.prototype.render = function() {
      return this.trigger("render", this, this);
    };

    ConnectionModel.prototype.validate = function(attrs, options) {
      this.from_field = attrs.from_field;
      this.to_field = attrs.to_field;
      if (!this.from_field || !this.to_field) return true;
      if (this.from_field.get("is_output") === this.to_field.get("is_output")) {
        return true;
      }
      if (this.from_field.node.get('nid') === this.to_field.node.get('nid')) {
        return true;
      }
      this.switch_fields_if_needed();
      return false;
    };

    ConnectionModel.prototype.switch_fields_if_needed = function() {
      var f_out;
      if (this.from_field.get("is_output") === false) {
        f_out = this.to_field;
        this.to_field = this.from_field;
        this.from_field = f_out;
      }
      return this;
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
        from_node: this.get("from_field").node.get("nid"),
        from: this.get("from_field").get("name"),
        to_node: this.get("to_field").node.get("nid"),
        to: this.get("to_field").get("name")
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
      res += "\t" + ("from_node: " + (this.get('from_field').node.get('nid')) + ", from: '" + (this.get('from_field').get('name')) + "',\n");
      res += "\t" + ("to_node: " + (this.get('to_field').node.get('nid')) + ", to: '" + (this.get('to_field').get('name')) + "'\n");
      res += "};\n";
      res += "var connection_" + this.cid + " = nodegraph.createConnectionFromObject(connection_" + (this.get('cid')) + "_data);\n";
      return res;
    };

    return ConnectionModel;

  })(Backbone.Model);
});
