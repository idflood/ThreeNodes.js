// We need to configure order! and cs! require.js plugins to boot.
// @see: require-config.js
require.config({
  paths: {
    order: "libs/require/order",
    CoffeeScript: "libs/coffee-script",
    cs: "libs/require/cs"
  }
});

require(['order!require-config', 'order!cs!threenodes/App'], function () {
  return new ThreeNodes.App();
});
