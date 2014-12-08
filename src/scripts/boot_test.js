require(['cs!threenodes/App',
'cs!tests/NodesTest',
'cs!tests/FieldTest',
'cs!tests/ConnectionTest',
'cs!tests/MathTest',
'cs!tests/FileSaveTest',
'cs!tests/FileLoadTest',
'cs!tests/ThreeJsIntegrationTest',
'cs!tests/GroupTest',
"libs/qunit-git",
'cs!node-types'], function(App, NodesTest, FieldTest, ConnectionTest, MathTest, FileSaveTest, FileLoadTest, ThreeJsIntegrationTest, GroupTest) {
"use strict";
var appl;
appl = new App({
  test: true
});
new NodesTest(appl);
new FieldTest(appl);
new ConnectionTest(appl);
new MathTest(appl);
new FileSaveTest(appl);
new FileLoadTest(appl);
new ThreeJsIntegrationTest(appl);
return new GroupTest(appl);
});
