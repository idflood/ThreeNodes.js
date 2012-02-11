var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['Underscore', 'Backbone', 'order!threenodes/models/ConnectionModel', 'order!threenodes/views/ConnectionView'], function(_, Backbone) {
  "use strict";  return ThreeNodes.ConnectionsCollection = (function() {
    __extends(ConnectionsCollection, Backbone.Collection);
    function ConnectionsCollection() {
      this.removeAll = __bind(this.removeAll, this);
      this.create = __bind(this.create, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      ConnectionsCollection.__super__.constructor.apply(this, arguments);
    }
    ConnectionsCollection.prototype.model = ThreeNodes.ConnectionModel;
    ConnectionsCollection.prototype.initialize = function() {
      return this.bind("connection:removed", __bind(function(c) {
        console.log("ConnectionsCollection -> connection:removed");
        return this.remove(c);
      }, this));
    };
    ConnectionsCollection.prototype.render = function() {
      return this.each(function(c) {
        return c.render();
      });
    };
    ConnectionsCollection.prototype.create = function(model, options) {
      if (!options) {
        options = {};
      }
      model = this._prepareModel(model, options);
      if (!model) {
        return false;
      }
      this.add(model, options);
      return model;
    };
    ConnectionsCollection.prototype.removeAll = function() {
      return this.remove(this.models);
    };
    ConnectionsCollection.prototype.addOne = function(connection) {
      var view;
      view = new ThreeNodes.ConnectionView({
        model: connection
      });
      this.context.injector.applyContext(view);
      return connection;
    };
    return ConnectionsCollection;
  })();
});