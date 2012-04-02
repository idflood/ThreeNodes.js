define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  "use strict"
  class NodeFieldTest
    constructor: (app) ->
      module "NodeFields"
      
      test "Bool field", () ->
        nf = new ThreeNodes.fields.types.Bool
          name: "booltest"
          value: false
        equals nf.get("name"), "booltest", "Bool name is set"
        equals nf.getValue(), false, "Bool value is false"
        nf.setValue true
        equals nf.getValue(), true, "Bool value is true"
        nf.setValue 0
        equals nf.getValue(), false, "Boolfield converted float value to bool (0 == false)"
        nf.setValue 0.4
        equals nf.getValue(), true, "Boolfield converted float value to bool (!0 == true)"
        nf.setValue new THREE.Object3D
        equals nf.getValue(), true, "Boolfield kept previous value when wrong type is set"

      test "Float field", () ->
        nf = new ThreeNodes.fields.types.Float
          name: "floattest"
          value: 3
        equals nf.getValue(), 3, "Floatfield value is 3"
        nf.setValue 0.5
        equals nf.getValue(), 0.5, "Floatfield value is 0.5"
        nf.setValue "4.2"
        equals nf.getValue(), 4.2, "Floatfield converted string value to float"
        nf.setValue new THREE.Object3D
        equals nf.getValue(), 4.2, "Floatfield kept previous value when wrong type is set"
        nf.setValue true
        equals nf.getValue(), 1, "Floatfield converted TRUE value to 1"
        nf.setValue false
        equals nf.getValue(), 0, "Floatfield converted FALSE value to 0"
      
      test "Color field", () ->
        nf = new ThreeNodes.fields.types.Color
          name: "colortest"
          value: new THREE.Color(0xff000)
        equals nf.getValue().getHex(), new THREE.Color(0xff000).getHex(), "ColorField value is 0xff0000"
        nf.setValue new THREE.Color(0x123456)
        equals nf.getValue().getHex(), new THREE.Color(0x123456).getHex(), "ColorField value is 0x123456"
        nf.setValue 1
        equals nf.getValue().getHex(), new THREE.Color(0xffffff).getHex(), "ColorField converted float (1.0) to 0xffffff"
        nf.setValue new THREE.Object3D
        equals nf.getValue().getHex(), new THREE.Color(0xffffff).getHex(), "ColorField kept previous value when wrong type is set"
        nf.setValue false
        equals nf.getValue().getHex(), new THREE.Color(0x000000).getHex(), "ColorField converted FALSE value to 0x000000"
        nf.setValue true
        equals nf.getValue().getHex(), new THREE.Color(0xffffff).getHex(), "ColorField converted TRUE value to 0xffffff"
        nf.setValue new THREE.Vector3(0.1, 0.2, 0.3)
        equals nf.getValue().getHex(), new THREE.Color().setRGB(0.1, 0.2, 0.3).getHex(), "ColorField converted Vector3 value to Color"
