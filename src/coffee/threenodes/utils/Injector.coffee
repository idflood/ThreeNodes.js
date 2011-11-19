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
      
    instanciate: (className) ->
      res = false
      args = arguments
      if args.length == 1
        res = new className()
      else if args.length == 2
        res = new className(args[1])
      else if args.length == 3
        res = new className(args[1], args[2])
      else if args.length == 4
        res = new className(args[1], args[2], args[3])
      else if args.length == 5
        res = new className(args[1], args[2], args[3], args[4])
      else if args.length == 6
        res = new className(args[1], args[2], args[3], args[4], args[5])
      else if args.length == 7
        res = new className(args[1], args[2], args[3], args[4], args[5], args[6])
      
      @applyContext(res)
      res
      
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
