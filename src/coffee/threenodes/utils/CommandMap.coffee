define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.CommandMap
    constructor: (context) ->
      @context = context
      @commands = {}
    
    register: (commandName, command) ->
      @commands[commandName] = command
      
    execute: (commandName) ->
      command = false
      if !@commands[commandName]
        console.log "command not found!"
        console.log commandName
        return false
      
      command = new @commands[commandName]()
      if command
        args = arguments
        command.context = @context
        if args.length == 1
          command.execute(args)
        else if args.length == 2
          command.execute(args[1])
        else if args.length == 3
          command.execute(args[1], args[2])
        else if args.length == 4
          command.execute(args[1], args[2], args[3])
        else if args.length == 5
          command.execute(args[1], args[2], args[3], args[4])
        else if args.length == 6
          command.execute(args[1], args[2], args[3], args[4], args[5])
        else if args.length == 7
          command.execute(args[1], args[2], args[3], args[4], args[5], args[6])
      true
