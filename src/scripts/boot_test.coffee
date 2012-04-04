require.config
  paths:
    jQuery: 'libs/jquery-1.7.2'
    jQueryUi: 'libs/jquery-ui/js/jquery-ui-1.9m6'
    Underscore: 'libs/underscore'
    Backbone: 'libs/backbone'
    use: "libs/require/use"
    text: "libs/require/text"
    order: "libs/require/order"
  use:
    'Underscore':
      attach: "_"
    'Backbone':
      deps: ['use!Underscore', 'jQuery']
      attach: () ->
        return window.Backbone
    'jQueryUi':
      deps: ['jQuery']
      attach: ($) ->
        return jQuery

require [
  'order!threenodes/App',
  'tests/NodeGraphTest',
  'tests/NodeFieldTest',
  'tests/NodeConnectionTest',
  'tests/MathTest',
  'tests/FileSaveTest',
  'tests/FileLoadTest',
  'tests/ThreeJsIntegrationTest',
  'use!Underscore',
  'use!Backbone',
  "order!libs/qunit-git",
], (App, NodeGraphTest, NodeFieldTest, NodeConnectionTest, MathTest, FileSaveTest, FileLoadTest, ThreeJsIntegrationTest) ->
  "use strict"
  app = new App(true)
  new NodeGraphTest(app)
  new NodeFieldTest(app)
  new NodeConnectionTest(app)
  new MathTest(app)
  new FileSaveTest(app)
  new FileLoadTest(app)
  new ThreeJsIntegrationTest(app)
