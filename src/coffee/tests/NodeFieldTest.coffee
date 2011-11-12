define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  class NodeFieldTest
    constructor: (app) ->
      module "NodeFields"
      
      test "Float field", () ->
        nf = new ThreeNodes.fields.types.Float("floattest", 3)
        equals nf.get(), 3, "Floatfield value is 3"
        nf.set 0.5
        equals nf.get(), 0.5, "Floatfield value is 0.5"
        nf.set "4.2"
        equals nf.get(), 4.2, "Floatfield converted string value to float"
        nf.set new THREE.Vector2
        equals nf.get(), 4.2, "Floatfield kept previous value when wrong type is set"
        nf.set true
        equals nf.get(), 1, "Floatfield converted TRUE value to 1"
        nf.set false
        equals nf.get(), 0, "Floatfield converted FALSE value to 0"
