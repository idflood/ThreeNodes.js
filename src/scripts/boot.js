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
    CoffeeScript: "libs/coffee-script"
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
require(['cs!threenodes/App'], function(App) {
  "use strict";
  var app;
  return app = new App();
});