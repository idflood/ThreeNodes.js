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
      Underscore:
        attach: "_"
      
      # backbone looks for "underscore" while all threenodes classes looks for "Underscore"
      underscore:
        attach: "_"
      
      Backbone:
        deps: [ "use!Underscore", "jQuery" ]
        attach: "Backbone"

      jQueryUi:
        deps: [ "jQuery" ]
        attach: "jQuery"

  requirejs = require("requirejs")
  requirejs.config(conf)
  global.define = requirejs
  
  jsdom = require("jsdom")
  jsdom.defaultDocumentFeatures =
    MutationEvents: '2.0'
  
  document = jsdom.jsdom()
  window = document.createWindow()
  global.window = window
  global.document = document
  
  requirejs ["mocha", "chai"], (mocha) ->
    suite = new mocha.Suite("", new mocha.Context)
    ui = mocha.interfaces["tdd"]
    mocha.useColors = true
    ui suite
    suite.emit "pre-require", root
    
    requirejs [
      "../../test/NodesTest2", 'use!Underscore', 'use!Backbone',"cs!threenodes/App", "cs!threenodes/utils/Utils"
    ], (tmp_test) ->
      # todo: remove tmp_test when this is working...
      console.log tmp_test
      suite.emit "run"
      runner = new mocha.Runner(suite)
      runner.ignoreLeaks = true
      mocha_reporter = new mocha.reporters.Dot(runner)
      runner.run()

module.exports.run = run