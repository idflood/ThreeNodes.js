require.config
  paths:
    jQuery: 'libs/jquery-1.7.2'
    jQueryUi: 'libs/jquery-ui/js/jquery-ui-1.9m6'
    Underscore: 'libs/underscore'
    Backbone: 'libs/backbone'
    use: "libs/require/use"
    text: "libs/require/text"
    order: "libs/require/order"
    cs: "libs/require/cs"
    CoffeeScript: "libs/coffee-script"
    chai: "libs/chai"
  use:
    'Underscore':
      attach: "_"
    'Backbone':
      deps: ['use!Underscore', 'jQuery']
      attach: "Backbone"
    'jQueryUi':
      deps: ['jQuery']
      attach: "jQuery"
        

require [
  'order!threenodes/App',
  "order!libs/mocha",
  "chai",
], (App, NodesTest2) ->
  "use strict"
  mocha.setup("tdd")
  require [
    'test/NodesTest2',
  ], () ->
    #mocha.globals(["ThreeNodes"]).run()
    console.log "tests loaded"
    mocha.run()