
define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.CommandMap = (function() {

    function CommandMap(context) {
      this.context = context;
      this.commands = {};
    }

    CommandMap.prototype.register = function(commandName, command) {
      return this.commands[commandName] = command;
    };

    CommandMap.prototype.execute = function(commandName) {
      var args, command;
      command = false;
      if (!this.commands[commandName]) {
        console.log("command not found!");
        console.log(commandName);
        return false;
      }
      command = new this.commands[commandName]();
      if (command) {
        args = arguments;
        command.context = this.context;
        if (args.length === 1) {
          command.execute(args);
        } else if (args.length === 2) {
          command.execute(args[1]);
        } else if (args.length === 3) {
          command.execute(args[1], args[2]);
        } else if (args.length === 4) {
          command.execute(args[1], args[2], args[3]);
        } else if (args.length === 5) {
          command.execute(args[1], args[2], args[3], args[4]);
        } else if (args.length === 6) {
          command.execute(args[1], args[2], args[3], args[4], args[5]);
        } else if (args.length === 7) {
          command.execute(args[1], args[2], args[3], args[4], args[5], args[6]);
        }
      }
      return true;
    };

    return CommandMap;

  })();
});
