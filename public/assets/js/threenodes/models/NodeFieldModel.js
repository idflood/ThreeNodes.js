var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['Underscore', 'Backbone'], function(_, Backbone) {
  "use strict";  return ThreeNodes.NodeFieldModel = (function(_super) {

    __extends(NodeFieldModel, _super);

    function NodeFieldModel() {
      this.setFID = __bind(this.setFID, this);
      this.initialize = __bind(this.initialize, this);
      NodeFieldModel.__super__.constructor.apply(this, arguments);
    }

    NodeFieldModel.prototype["default"] = {
      fid: -1,
      name: "fieldname",
      is_out: false,
      value: 0
    };

    NodeFieldModel.prototype.initialize = function() {
      var json, xml;
      this.node = this.options.node;
      xml = this.options.xml;
      return json = this.options.json;
    };

    NodeFieldModel.prototype.setFID = function(fid) {
      return this.set("fid", fid);
    };

    return NodeFieldModel;

  })(Backbone.Model);
});
