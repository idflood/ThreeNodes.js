define [
  'Underscore',
  'Backbone',
  "libs/qunit-git",
], (_, Backbone) ->
  #"use strict"

  $ = jQuery

  class FieldTest
    constructor: (app) ->
      module "NodeFields"

      test "Bool field", () ->
        nf = new ThreeNodes.fields.Bool
          name: "booltest"
          value: false
        equals nf.get("name"), "booltest", "Bool name is set"
        equals nf.getValue(), false, "Bool value is false"
        nf.setValue true
        equals nf.getValue(), true, "Bool value is true"
        nf.setValue 0
        strictEqual nf.getValue(), false, "Boolfield converted float value to bool (0 == false)"
        nf.setValue 0.4
        strictEqual nf.getValue(), true, "Boolfield converted float value to bool (!0 == true)"
        nf.setValue new THREE.Object3D
        strictEqual nf.getValue(), true, "Boolfield kept previous value when wrong type is set"

      test "Float field", () ->
        nf = new ThreeNodes.fields.Float
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
        strictEqual nf.getValue(), 1, "Floatfield converted TRUE value to 1"
        nf.setValue false
        strictEqual nf.getValue(), 0, "Floatfield converted FALSE value to 0"
        nf.setValue "42"
        strictEqual nf.getValue(), 42, "Floatfield converted string value to float"

      test "Color field", () ->
        nf = new ThreeNodes.fields.Color
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

      test "Three.js fields", () ->
        fields =
          vector2:
            instance: new ThreeNodes.fields.Vector2({})
            values:
              vector2:
                val: new THREE.Vector2()
                return: true
              float:
                val: 42
                return: false
              vector3:
                val: new THREE.Vector3()
                return: false
          color:
            instance: new ThreeNodes.fields.Color({})
            values:
              color:
                val: new THREE.Color()
                return: true
              vector3:
                val: new THREE.Vector3()
                return: true
              float:
                val: 0xff0000
                return: true
              boolean:
                val: true
                return: true
              vector2:
                val: new THREE.Vector2()
                return: false
          scene:
            instance: new ThreeNodes.fields.Scene({})
            values:
              color:
                val: new THREE.Scene()
                return: true
              vector3:
                val: new THREE.Vector3()
                return: false
          material:
            instance: new ThreeNodes.fields.Material({})
            values:
              MeshBasicMaterial:
                val: new THREE.MeshBasicMaterial()
                return: true
              MeshLambertMaterial:
                val: new THREE.MeshLambertMaterial()
                return: true
              MeshPhongMaterial:
                val: new THREE.MeshPhongMaterial()
                return: true
              vector3:
                val: new THREE.Vector3()
                return: false
          geometry:
            instance: new ThreeNodes.fields.Geometry({})
            values:
              CubeGeometry:
                val: new THREE.CubeGeometry()
                return: true
              SphereGeometry:
                val: new THREE.SphereGeometry()
                return: true
              CylinderGeometry:
                val: new THREE.CylinderGeometry()
                return: true
              vector3:
                val: new THREE.Vector3()
                return: false
          object3d:
            instance: new ThreeNodes.fields.Object3D({})
            values:
              Object3D:
                val: new THREE.Object3D()
                return: true
              SphereGeometry:
                val: new THREE.Mesh()
                return: true
              vector3:
                val: new THREE.Vector3()
                return: false
          fog:
            instance: new ThreeNodes.fields.Fog({})
            values:
              fog:
                val: new THREE.Fog()
                return: true
              fogExp2:
                val: new THREE.FogExp2()
                return: true
              vector3:
                val: new THREE.Vector3()
                return: false

        for i, field of fields
          instance = field.instance
          for index, value of field.values
            returnsomething = value.return
            result = instance.computeValue(value.val)
            valuename = index

            if returnsomething
              equals result != null, returnsomething, "Field type " + instance.constructor.name + " should return something when passed a " + valuename
            else
              equals result != null, returnsomething, "Field type " + instance.constructor.name + " should return null when passed a " + valuename
