var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['Underscore', 'Backbone'], function(_, Backbone) {
  "use strict";  return ThreeNodes.NodeModel = (function() {
    __extends(NodeModel, Backbone.Model);
    function NodeModel() {
      this.fromXML = __bind(this.fromXML, this);
      this.fromJSON = __bind(this.fromJSON, this);
      this.setPosition = __bind(this.setPosition, this);
      this.setName = __bind(this.setName, this);
      this.setNID = __bind(this.setNID, this);
      this.initialize = __bind(this.initialize, this);
      NodeModel.__super__.constructor.apply(this, arguments);
    }
    NodeModel.prototype["default"] = {
      nid: 0,
      x: 0,
      y: 0,
      name: "nodename"
    };
    NodeModel.prototype.initialize = function() {
      var json, xml;
      xml = this.get("xml");
      json = this.get("json");
      if (xml) {
        return this.fromXML(xml);
      } else if (json) {
        return this.fromJSON(json);
      }
    };
    NodeModel.prototype.setNID = function(nid) {
      this.set({
        "nid": nid
      });
      return this;
    };
    NodeModel.prototype.setName = function(name) {
      this.set({
        "name": name
      });
      return this;
    };
    NodeModel.prototype.setPosition = function(x, y) {
      this.set({
        "x": x,
        "y": y
      });
      return this;
    };
    NodeModel.prototype.fromJSON = function(data) {
      this.set({
        "nid": data.nid,
        "name": data.name ? data.name : this.get("name"),
        "x": data.x,
        "y": data.y
      });
      ThreeNodes.uid = this.get("nid");
      return this;
    };
    NodeModel.prototype.fromXML = function(data) {
      this.set({
        "nid": parseInt(this.inXML.attr("nid"))
      });
      ThreeNodes.uid = this.get("nid");
      return this;
    };
    return NodeModel;
  })();
});