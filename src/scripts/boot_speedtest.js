require([
  'cs!threenodes/App',
  'cs!tests/speedtests/NodesSpeedTest',
  "libs/JSLitmus",
  'cs!node-types'
  ], function(App, NodesSpeedTest) {
  "use strict";
  var appl = new App({
    test: true
  });
  return new NodesSpeedTest(appl);
});
