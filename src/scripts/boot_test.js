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
require(["libs/namespace"]);
require(['order!cs!threenodes/App', 
  'order!cs!tests/NodesTest', 
  'order!cs!tests/FieldTest', 
  'order!cs!tests/ConnectionTest', 
  'order!cs!tests/MathTest', 
  'order!cs!tests/FileSaveTest', 
  'order!cs!tests/FileLoadTest', 
  'order!cs!tests/ThreeJsIntegrationTest', 
  'order!cs!tests/GroupTest', 
  'use!Underscore', 
  'use!Backbone', 
  "order!libs/qunit-git"], function(App, NodesTest, FieldTest, ConnectionTest, MathTest, FileSaveTest, FileLoadTest, ThreeJsIntegrationTest, GroupTest) {
  "use strict";
  var app;
  app = new ThreeNodes.App({
    test: true
  });
  new NodesTest(app);
  new FieldTest(app);
  new ConnectionTest(app);
  new MathTest(app);
  new FileSaveTest(app);
  new FileLoadTest(app);
  new ThreeJsIntegrationTest(app);
  return new GroupTest(app);
});