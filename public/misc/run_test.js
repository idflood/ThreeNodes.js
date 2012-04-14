var run = function() {
  var reporter = 'dot';
  
  var conf = {
    baseUrl: '../../src/scripts/',
    nodeRequire: require,
    paths: {
      jQuery: 'libs/jquery-1.7.2',
      jQueryUi: 'libs/jquery-ui/js/jquery-ui-1.9m6',
      Underscore: 'libs/underscore',
      Backbone: 'libs/backbone',
      mocha: 'libs/mocha',
      requirejs: 'libs/require/require',
      use: "libs/require/use",
      text: "libs/require/text",
      order: "libs/require/order",
      cs: "libs/require/cs",
      CoffeeScript: "libs/coffee-script",
      chai: "libs/chai"
    },
    use: {
      'Underscore': {
        attach: "_"
      },
      'Backbone': {
        deps: ['use!Underscore', 'jQuery'],
        attach: "Backbone"
      },
      'jQueryUi': {
        deps: ['jQuery'],
        attach: "jQuery"
      }
    }
  };
  
  // Configure require.js for node.js
  requirejs = require('requirejs');
  requirejs.config(conf);
  
  jsdom = require("jsdom").jsdom;
  global.document = jsdom();
  global.window = global.document.parentWindow;
  window = global.window;
  console.log("ok1");
  requirejs(['require', 'mocha', 'chai'], function(require, mocha){
    var suite = new mocha.Suite('', new mocha.Context);
    var ui = mocha.interfaces['tdd'];
    ui(suite);
    suite.emit('pre-require', root);
    console.log("ok");
    requirejs([
      'cs!../../test/NodesTest2'
    ], function() {
      console.log("42asfdafsdsa");
      suite.emit('run');
      var runner = new mocha.Runner(suite);
      runner.ignoreLeaks = true;
      var mocha_reporter = new mocha.reporters.Dot(runner);
      runner.run();
    });
  });
};

module.exports.run = run;

