define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  return ThreeNodes.Injector = (function() {
    function Injector(context) {
      this.context = context;
      this.definitions = {
        singletons: {},
        classes: {},
        values: {}
      };
      this.instancedSingletons = {};
    }
    Injector.prototype.applyContext = function(v) {
      if (v && !v.context) {
        v.context = this.context;
        if (v.onRegister) {
          return v.onRegister();
        }
      }
    };
    Injector.prototype.get = function(className, name) {
      var res;
      if (name == null) {
        name = null;
      }
      res = false;
      if (this.instancedSingletons[className]) {
        res = this.instancedSingletons[className];
      } else if (this.definitions.singletons[className]) {
        res = new this.definitions.singletons[className]();
        this.instancedSingletons[className] = res;
      } else if (this.definitions.classes[className]) {
        res = new this.definitions.classes[className]();
      } else if (this.definitions.values[className]) {
        res = this.definitions.values[className];
      }
      this.applyContext(res);
      return res;
    };
    Injector.prototype.mapClass = function(whenAskedFor, useClass) {
      return this.definitions.classes[whenAskedFor] = useClass;
    };
    Injector.prototype.mapSingleton = function(whenAskedFor, useClass) {
      return this.definitions.singletons[whenAskedFor] = useClass;
    };
    Injector.prototype.mapValue = function(whenAskedFor, useValue, named) {
      if (named == null) {
        named = null;
      }
      return this.definitions.values[whenAskedFor] = useValue;
    };
    return Injector;
  })();
});