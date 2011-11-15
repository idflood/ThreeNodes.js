define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/qunit-git",
], ($, _, Backbone) ->
  class NodeFieldTest
    constructor: (app) ->
      module "NodeFields"
      
      test "Bool field", () ->
        nf = new ThreeNodes.fields.types.Bool("booltest", false)
        equals nf.get(), false, "Bool value is false"
        nf.set true
        equals nf.get(), true, "Bool value is true"
        nf.set 0
        equals nf.get(), false, "Boolfield converted float value to bool (0 == false)"
        nf.set 0.4
        equals nf.get(), true, "Boolfield converted float value to bool (!0 == true)"
        nf.set new THREE.Object3D
        equals nf.get(), true, "Boolfield kept previous value when wrong type is set"

      test "Float field", () ->
        nf = new ThreeNodes.fields.types.Float("floattest", 3)
        equals nf.get(), 3, "Floatfield value is 3"
        nf.set 0.5
        equals nf.get(), 0.5, "Floatfield value is 0.5"
        nf.set "4.2"
        equals nf.get(), 4.2, "Floatfield converted string value to float"
        nf.set new THREE.Object3D
        equals nf.get(), 4.2, "Floatfield kept previous value when wrong type is set"
        nf.set true
        equals nf.get(), 1, "Floatfield converted TRUE value to 1"
        nf.set false
        equals nf.get(), 0, "Floatfield converted FALSE value to 0"
      
      test "Color field", () ->
        nf = new ThreeNodes.fields.types.Color("colortest", new THREE.Color(0xff000))
        equals nf.get().getHex(), new THREE.Color(0xff000).getHex(), "ColorField value is 0xff0000"
        nf.set new THREE.Color(0x123456)
        equals nf.get().getHex(), new THREE.Color(0x123456).getHex(), "ColorField value is 0x123456"
        nf.set 1
        equals nf.get().getHex(), new THREE.Color(0xffffff).getHex(), "ColorField converted float (1.0) to 0xffffff"
        nf.set new THREE.Object3D
        equals nf.get().getHex(), new THREE.Color(0xffffff).getHex(), "ColorField kept previous value when wrong type is set"
        nf.set false
        equals nf.get().getHex(), new THREE.Color(0x000000).getHex(), "ColorField converted FALSE value to 0x000000"
        nf.set true
        equals nf.get().getHex(), new THREE.Color(0xffffff).getHex(), "ColorField converted TRUE value to 0xffffff"
        nf.set new THREE.Vector3(0.1, 0.2, 0.3)
        equals nf.get().getHex(), new THREE.Color().setRGB(0.1, 0.2, 0.3).getHex(), "ColorField converted Vector3 value to Color"
