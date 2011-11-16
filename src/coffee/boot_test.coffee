require.config
  paths:
    jQuery: 'loaders/jquery-loader'
    Underscore: 'loaders/underscore-loader'
    Backbone: 'loaders/backbone-loader'

require [
  'order!threenodes/App',
  'tests/NodeGraphTest',
  'tests/NodeFieldTest',
  'tests/NodeConnectionTest',
  'tests/FileSaveTest',
  'tests/FileLoadTest',
  'order!libs/jquery-1.6.4.min',
  'order!libs/underscore-min',
  'order!libs/backbone',
  "order!libs/qunit-git",
], (App, NodeGraphTest, NodeFieldTest, NodeConnectionTest, FileSaveTest, FileLoadTest) ->
  app = new App()
  new NodeGraphTest(app)
  new NodeFieldTest(app)
  new NodeConnectionTest(app)
  new FileSaveTest(app)
  new FileLoadTest(app)
