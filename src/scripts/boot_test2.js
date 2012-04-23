require.config({
  paths: {
    jQuery: 'libs/jquery-1.7.2',
    jQueryUi: 'libs/jquery-ui/js/jquery-ui-1.9m6',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    namespace: 'libs/namespace',
    use: "libs/require/use",
    text: "libs/require/text",
    order: "libs/require/order",
    cs: "libs/require/cs",
    CoffeeScript: "libs/coffee-script",
    chai: "libs/chai",
    treeJquery: "libs/tree.jquery",
    RequestAnimationFrame: "libs/three-extras/js/RequestAnimationFrame",
    Raphael: "libs/raphael-min"
  },
  use: {
    Three: {
      attach: "THREE"
    },
    RequestAnimationFrame: {
      attach: "requestAnimationFrame"
    },
    Raphael: {
      attach: "Raphael"
    },
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

require(['order!threenodes/App', "order!libs/mocha", "chai", 'namespace'], function(App, NodesTest2) {
  "use strict";
  mocha.setup("tdd");
  return require(['cs!test/NodesTest2'], function() {
    console.log("tests loaded");
    return mocha.run();
  });
});