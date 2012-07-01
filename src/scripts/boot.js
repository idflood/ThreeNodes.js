// We need to configure cs! and require.js plugins to boot.
// @see: require-config.js
require.config({
  paths: {
    CoffeeScript: "libs/coffee-script",
    cs: "libs/require/cs"
  }
});

require(['cs!threenodes/App'], function () {
  return new ThreeNodes.App();
});
