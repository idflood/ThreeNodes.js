run = ->
  reporter = "dot"
  conf =
    baseUrl: '.'
    nodeRequire: require
    paths:
      jQuery: "libs/jquery-1.7.2"
      jQueryUi: "libs/jquery-ui/js/jquery-ui-1.9m6"
      Underscore: "libs/underscore"
      Backbone: "libs/backbone"
      mocha: "libs/mocha"
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

      Backbone:
        deps: [ "use!Underscore", "jQuery" ]
        attach: "Backbone"

      jQueryUi:
        deps: [ "jQuery" ]
        attach: "jQuery"

  requirejs = require("requirejs")
  requirejs.config(conf)
  global.define = requirejs
  
  jsdom = require("jsdom").jsdom
  global.document = jsdom()
  global.window = global.document.parentWindow
  window = global.window
  #requirejs(['requirejs', 'mocha', 'chai'], function(require, mocha){
  requirejs [ "requirejs", "mocha", "chai", "jQuery" ], (require, mocha) ->
    suite = new mocha.Suite("", new mocha.Context)
    ui = mocha.interfaces["tdd"]
    mocha.useColors = true
    ui suite
    suite.emit "pre-require", root
    requirejs [ "../../test/NodesTest2" ], (tmp_test) ->
      # todo: remove tmp_test when this is working...
      console.log tmp_test
      suite.emit "run"
      runner = new mocha.Runner(suite)
      runner.ignoreLeaks = true
      mocha_reporter = new mocha.reporters.Dot(runner)
      runner.run()

module.exports.run = run