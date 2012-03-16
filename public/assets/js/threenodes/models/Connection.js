var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['Underscore', 'Backbone', 'order!threenodes/utils/Utils'], function(_, Backbone) {
  "use strict";  return ThreeNodes.Connection = (function(_super) {

    __extends(Connection, _super);

    function Connection() {
      this.setCID = __bind(this.setCID, this);
      this.switch_fields_if_needed = __bind(this.switch_fields_if_needed, this);
      this.validate = __bind(this.validate, this);
      this.render = __bind(this.render, this);
      this.remove = __bind(this.remove, this);
      this.initialize = __bind(this.initialize, this);
      this.sync = __bind(this.sync, this);
      Connection.__super__.constructor.apply(this, arguments);
    }

    Connection.prototype.defaults = {
      "cid": -1
    };

    Connection.prototype.sync = function() {};

    Connection.prototype.initialize = function(options) {
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

    Connection.prototype.remove = function() {
      this.from_field.unregister_connection(this);
      this.to_field.unregister_connection(this);
      this.to_field.remove_connections();
      this.to_field.node.dirty = true;
      this.to_field.changed = true;
      delete this.from_field;
      delete this.to_field;
      delete this.node;
      this.trigger("connection:removed", this);
      this.destroy();
      return false;
    };

    Connection.prototype.render = function() {
      return this.trigger("render", this, this);
    };

    Connection.prototype.validate = function(attrs, options) {
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

    Connection.prototype.switch_fields_if_needed = function() {
      var f_out;
      if (this.from_field.get("is_output") === false) {
        f_out = this.to_field;
        this.to_field = this.from_field;
        this.from_field = f_out;
      }
      return this;
    };

    Connection.prototype.setCID = function(cid) {
      return this.set({
        "cid": cid
      });
    };

    Connection.prototype.toJSON = function() {
      var res;
      res = {
        id: this.get("cid"),
        from_node: this.from_field.node.get("nid"),
        from: this.from_field.get("name"),
        to_node: this.to_field.node.get("nid"),
        to: this.to_field.get("name")
      };
      return res;
    };

    return Connection;

  })(Backbone.Model);
});
