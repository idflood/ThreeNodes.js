define [
  'Underscore',
  'Backbone',
  "libs/qunit-git",
], (_, Backbone) ->
  "use strict"

  $ = jQuery
  class NodesSpeedTest
    constructor: (app) ->
      ng = app.nodes
      filehandler = app.file_handler
      app.clearWorkspace()

      n1 = ng.createNode("Number")
      n2 = ng.createNode("Vector3")
      rnd = ng.createNode("Random")
      node_mult = ng.createNode("MathMult")

      node_mult.fields.getField("factor").setValue(3)

      ng.connections.create
        from_field: n1.v_out
        to_field: node_mult.v_in
      ng.connections.create
        from_field: rnd.v_out
        to_field: n1.v_in

      ng.render()

      JSLitmus.test "Simple math.mult function", () ->
        ng.render()
