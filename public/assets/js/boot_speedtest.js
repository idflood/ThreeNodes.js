require.config({
  paths: {
    jQuery: 'loaders/jquery-loader',
    Underscore: 'loaders/underscore-loader',
    Backbone: 'loaders/backbone-loader'
  }
});
require(['order!threenodes/App', 'speedtests/NodeGraphSpeedTest', 'order!libs/jquery-1.6.4.min', 'order!libs/underscore-min', 'order!libs/backbone', "order!libs/JSLitmus"], function(App, NodeGraphSpeedTest) {
  "use strict";
  var app;
  app = new App(true);
  return new NodeGraphSpeedTest(app);
});