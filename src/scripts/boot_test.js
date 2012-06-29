require(['require-config', 'libs/namespace'], function () {
  require(['cs!threenodes/App', 
    'cs!tests/NodesTest', 
    'cs!tests/FieldTest', 
    'cs!tests/ConnectionTest', 
    'cs!tests/MathTest', 
    'cs!tests/FileSaveTest', 
    'cs!tests/FileLoadTest', 
    'cs!tests/ThreeJsIntegrationTest', 
    'cs!tests/GroupTest', 
    "libs/qunit-git"], function(App, NodesTest, FieldTest, ConnectionTest, MathTest, FileSaveTest, FileLoadTest, ThreeJsIntegrationTest, GroupTest) {
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
