require.config({
  paths: {
    jQuery: 'libs/jquery-1.7.2',
    jQueryUi: 'libs/jquery-ui/js/jquery-ui-1.9m6',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
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
});
require(['cs!threenodes/App', "order!libs/mocha", "chai"], function(App, NodesTest2) {
  "use strict";  mocha.setup("tdd");
  return require(['cs!test/NodesTest2'], function() {
    console.log("tests loaded");
    return mocha.run();
  });
});