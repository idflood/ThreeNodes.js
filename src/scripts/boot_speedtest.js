// We need to configure cs! and require.js plugins to boot.
// @see: require-config.js
require.config({
  paths: {
    CoffeeScript: "libs/coffee-script",
    cs: "libs/require/cs"
  }
});

require([
  'require-config',
  'cs!threenodes/App',
  'cs!tests/speedtests/NodesSpeedTest',
  "libs/JSLitmus"
  ], function(conf, App, NodesSpeedTest) {
  "use strict";
  var app = new ThreeNodes.App({
    test: true
  });
  return new NodesSpeedTest(app);
});
