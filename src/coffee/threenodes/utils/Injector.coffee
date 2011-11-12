define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  class ThreeNodes.Injector
    constructor: (context) ->
      @context = context
      @definitions =
        singletons: {}
        classes: {}
        values: {}
      @instancedSingletons = {}
      
    applyContext: (v) ->
      if v && !v.context
        v.context = @context
        if v.onRegister
          v.onRegister()
    
    get: (className, name = null) ->
      res = false
      if @instancedSingletons[className]
        res = @instancedSingletons[className]
      else if @definitions.singletons[className]
        res = new @definitions.singletons[className]()
        @instancedSingletons[className] = res
      else if @definitions.classes[className]
        res = new @definitions.classes[className]()
      else if @definitions.values[className]
        res = @definitions.values[className]
      
      @applyContext(res)
      res
    
    mapClass: (whenAskedFor, useClass) ->
      @definitions.classes[whenAskedFor] = useClass
    
    mapSingleton: (whenAskedFor, useClass) ->
      @definitions.singletons[whenAskedFor] = useClass
    
    mapValue: (whenAskedFor, useValue, named = null) ->
      @definitions.values[whenAskedFor] = useValue
