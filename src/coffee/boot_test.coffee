require.config
  paths:
    jQuery: 'loaders/jquery-loader'
    Underscore: 'loaders/underscore-loader'
    Backbone: 'loaders/backbone-loader'

require [
  'order!threenodes/App',
  'tests/NodeGraphTest',
  'order!libs/jquery-1.6.4.min',
  'order!libs/underscore-min',
  'order!libs/backbone',
  "order!libs/qunit-git",
], (App, NodeGraphTest) ->
  app = new App()
  new NodeGraphTest(app)
  