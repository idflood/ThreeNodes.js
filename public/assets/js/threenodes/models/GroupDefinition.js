var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['Underscore', 'Backbone', 'order!threenodes/utils/Utils'], function(_, Backbone) {
  "use strict";  return ThreeNodes.GroupDefinition = (function(_super) {

    __extends(GroupDefinition, _super);

    function GroupDefinition() {
      this.remove = __bind(this.remove, this);
      this.initialize = __bind(this.initialize, this);
      this.getUID = __bind(this.getUID, this);
      this.sync = __bind(this.sync, this);
      GroupDefinition.__super__.constructor.apply(this, arguments);
    }

    GroupDefinition.prototype.defaults = {
      "nodes": {},
      "conncections": {},
      "name": "Group"
    };

    GroupDefinition.prototype.sync = function() {};

    GroupDefinition.prototype.getUID = function() {
      this.internal_uid += 1;
      return this.internal_uid;
    };

    GroupDefinition.prototype.initialize = function(options) {
      return this.internal_uid = 0;
    };

    GroupDefinition.prototype.remove = function() {
      return GroupDefinition.__super__.remove.apply(this, arguments);
    };

    GroupDefinition.prototype.toJSON = function() {
      var res;
      res = {
        name: this.get("name"),
        conncections: this.get("conncections"),
        nodes: this.get("nodes")
      };
      return res;
    };

    GroupDefinition.prototype.toCode = function() {
      var res;
      res = "";
      return res;
    };

    return GroupDefinition;

  })(Backbone.Model);
});
