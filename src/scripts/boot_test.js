require(['require-config', 'libs/namespace'], function () {
  require(['order!cs!threenodes/App', 
    'order!cs!tests/NodesTest', 
    'order!cs!tests/FieldTest', 
    'order!cs!tests/ConnectionTest', 
    'order!cs!tests/MathTest', 
    'order!cs!tests/FileSaveTest', 
    'order!cs!tests/FileLoadTest', 
    'order!cs!tests/ThreeJsIntegrationTest', 
    'order!cs!tests/GroupTest', 
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
});
