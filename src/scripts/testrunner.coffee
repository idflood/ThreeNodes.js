run = ->
  reporter = "dot"
  conf =
    baseUrl: __dirname
    nodeRequire: require
    paths:
      jQuery: "libs/jquery-1.7.2"
      jQueryUi: "libs/jquery-ui/js/jquery-ui-1.9m6"
      Underscore: "libs/underscore"
      underscore: "libs/underscore"
      Backbone: "libs/backbone"
      mocha: "libs/mocha2"
      requirejs: "libs/require/require"
      use: "libs/require/use"
      text: "libs/require/text"
      order: "libs/require/order"
      cs: "libs/require/cs"
      CoffeeScript: "libs/coffee-script"
      chai: "libs/chai"

    use:
      jQuery:
        attach: "jQuery"
      Underscore:
        attach: "_"
      
      # backbone looks for "underscore" while all custom classes looks for "Underscore"
      # todo: maybe replace all Underscore to underscore
      underscore:
        attach: "_"
      
      Backbone:
        deps: [ "use!Underscore", "jQuery" ]
        attach: "Backbone"

      jQueryUi:
        deps: [ "use!jQuery" ]
        attach: "jQuery"

  # Setup require.js
  requirejs = require("requirejs")
  requirejs.config(conf)
  global.define = requirejs
  
  # Loads the coffeescript module before setting the global.window since it relies on this to see if this is a browser or node.js
  requirejs("cs")
  requirejs("use")
  requirejs("text")
  requirejs("order")
  
  jsdom = require("jsdom")
  jsdom.defaultDocumentFeatures =
    MutationEvents: '2.0'
    QuerySelector: true
  
  # Create main DOM elements with jsdom
  document = jsdom.jsdom()
  window = document.createWindow()
  
  # Set global.window and global.document for Underscore/backbone/jquery/...
  global.window = window
  global.document = document
  global.ThreeNodes = {}
  
  requirejs ["mocha", "chai", 'use!Underscore'], (mocha, chai, unde) ->
    suite = new mocha.Suite("", new mocha.Context)
    ui = mocha.interfaces["tdd"]
    mocha.useColors = true
    ui suite
    suite.emit "pre-require", root
    
    requirejs [
      "../../test/NodesTest2", 'use!Underscore', 'use!Backbone',"cs!threenodes/App", "threenodes/utils/Utils"
    ], (tmp_test, _) ->
      # todo: remove tmp_test when this is working...
      console.log _
      suite.emit "run"
      runner = new mocha.Runner(suite)
      runner.ignoreLeaks = true
      mocha_reporter = new mocha.reporters.Dot(runner)
      runner.run()

module.exports.run = run