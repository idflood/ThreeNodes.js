define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Utils = require 'cs!threenodes/utils/Utils'
  Node = require 'cs!threenodes/nodes/models/Node'

  namespace "ThreeNodes.nodes.models",
    PlaneGeometry: class PlaneGeometry extends Node
      @node_name = 'Plane'
      @group_name = 'Geometry'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.PlaneGeometry(100, 100, 1, 1, 1)
        @cached = @get_cache_array()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "width": 100,
            "height": 100,
            "segments_width": 1,
            "segments_height": 1,
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [@fields.getField("width").getValue(), @fields.getField("height").getValue(), @fields.getField("segments_width").getValue(), @fields.getField("segments_height").getValue()]

      compute: =>
        new_cache = @get_cache_array()
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          @ob = new THREE.PlaneGeometry(@fields.getField("width").getValue(), @fields.getField("height").getValue(), @fields.getField("segments_width").getValue(), @fields.getField("segments_height").getValue())
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    CubeGeometry: class CubeGeometry extends Node
      @node_name = 'Cube'
      @group_name = 'Geometry'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1)
        @cached = @get_cache_array()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "flip": -1
            "width": 100,
            "height": 100,
            "depth": 100,
            "segments_width": 1,
            "segments_height": 1,
            "segments_depth": 1,
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [@fields.getField("width").getValue(), @fields.getField("height").getValue(), @fields.getField("depth").getValue(), @fields.getField("segments_width").getValue(), @fields.getField("segments_height").getValue(), @fields.getField("segments_depth").getValue(), @fields.getField("flip").getValue()]

      compute: =>
        new_cache = @get_cache_array()
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          @ob = new THREE.CubeGeometry(@fields.getField("width").getValue(), @fields.getField("height").getValue(), @fields.getField("depth").getValue(), @fields.getField("segments_width").getValue(), @fields.getField("segments_height").getValue(), @fields.getField("segments_depth").getValue(), @fields.getField("flip").getValue())
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    SphereGeometry: class SphereGeometry extends Node
      @node_name = 'Sphere'
      @group_name = 'Geometry'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.SphereGeometry(100, 20, 20)
        @cached = @get_cache_array()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "radius": 100
            "segments_width": 1
            "segments_height": 1
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [@fields.getField("radius").getValue(), @fields.getField("segments_width").getValue(), @fields.getField("segments_height").getValue()]

      compute: =>
        new_cache = @get_cache_array()
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          @ob = new THREE.SphereGeometry(@fields.getField("radius").getValue(), @fields.getField("segments_width").getValue(), @fields.getField("segments_height").getValue())
          @cached = new_cache
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    CylinderGeometry: class CylinderGeometry extends Node
      @node_name = 'Cylinder'
      @group_name = 'Geometry'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.CylinderGeometry(100, 100, 20, 30, 1, false)
        @cached = @get_cache_array()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "radiusTop": 100
            "radiusBottom": 100
            "height": 20
            "segmentsRadius": 30
            "segmentsHeight": 1
            "openEnded": false
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [
          @fields.getField("radiusTop").getValue(), @fields.getField("radiusBottom").getValue(), @fields.getField("height").getValue(),
          @fields.getField("segmentsRadius").getValue(), @fields.getField("segmentsHeight").getValue(), @fields.getField("openEnded").getValue()
        ]

      compute: =>
        new_cache = @get_cache_array()
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          @ob = new THREE.CylinderGeometry(
            @fields.getField("radiusTop").getValue(), @fields.getField("radiusBottom").getValue(), @fields.getField("height").getValue(),
            @fields.getField("segmentsRadius").getValue(), @fields.getField("segmentsHeight").getValue(), @fields.getField("openEnded").getValue()
          )
          @cached = new_cache
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    TorusGeometry: class TorusGeometry extends Node
      @node_name = 'Torus'
      @group_name = 'Geometry'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.TorusGeometry(100, 40, 8, 6, Math.PI * 2)
        @cached = @get_cache_array()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "radius": 100
            "tube": 40
            "segmentsR": 8
            "segmentsT": 6
            "arc": Math.PI * 2
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [
          @fields.getField("radius").getValue(), @fields.getField("tube").getValue(), @fields.getField("segmentsR").getValue(),
          @fields.getField("segmentsT").getValue(), @fields.getField("arc").getValue()
        ]

      compute: =>
        new_cache = @get_cache_array()
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          @ob = new THREE.TorusGeometry(
            @fields.getField("radius").getValue(), @fields.getField("tube").getValue(), @fields.getField("segmentsR").getValue(),
            @fields.getField("segmentsT").getValue(), @fields.getField("arc").getValue()
          )
          @cached = new_cache
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    TorusKnotGeometry: class TorusKnotGeometry extends Node
      @node_name = 'TorusKnot'
      @group_name = 'Geometry'

      initialize: (options) =>
        super
        @auto_evaluate = true
        @ob = new THREE.TorusKnotGeometry(200, 40, 64, 8, 2, 3, 1)
        @cached = @get_cache_array()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "radius": 200
            "tube": 40
            "segmentsR": 64
            "segmentsT": 8
            "p": 2
            "q": 3
            "heightScale": 1
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [
          @fields.getField("radius").getValue(), @fields.getField("tube").getValue(), @fields.getField("segmentsR").getValue(),
          @fields.getField("segmentsT").getValue(), @fields.getField("p").getValue(), @fields.getField("q").getValue(), @fields.getField("heightScale").getValue()
        ]

      compute: =>
        new_cache = @get_cache_array()
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          @ob = new THREE.TorusKnotGeometry(
            @fields.getField("radius").getValue(), @fields.getField("tube").getValue(), @fields.getField("segmentsR").getValue(),
            @fields.getField("segmentsT").getValue(), @fields.getField("p").getValue(), @fields.getField("q").getValue(), @fields.getField("heightScale").getValue()
          )
          @cached = new_cache
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    OctahedronGeometry: class OctahedronGeometry extends Node
      @node_name = 'Octahedron'
      @group_name = 'Geometry'

      constructor: () ->
        super
        @auto_evaluate = true
        @ob = new THREE.OctahedronGeometry(100, 0)
        @cached = @get_cache_array()

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "radius": 100
            "detail": 0
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [@fields.getField("radius").getValue(), @fields.getField("detail").getValue()]

      compute: =>
        new_cache = @get_cache_array()
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          @ob = new THREE.OctahedronGeometry(@fields.getField("radius").getValue(), @fields.getField("detail").getValue())
          @cached = new_cache
        @applyFieldsToVal(@fields.inputs, @ob)
        @fields.setField("out", @ob)

    TextGeometry: class TextGeometry extends Node
      @node_name = 'Text'
      @group_name = 'Geometry'

      initialize: (options) =>
        super
        @ob = false
        @cached = []

      getFields: =>
        base_fields = super
        fields =
          inputs:
            "text": "Example"
            "font": {type: "Any", val: {}}
            "size": 100
            "height": 20
            "curveSegments": 4
            "bevelEnabled": false
            "bevelThickness": 0
            "bevelSize": 0
          outputs:
            "out": {type: "Any", val: @ob}
        return $.extend(true, base_fields, fields)

      remove: =>
        delete @ob
        delete @cached
        super

      get_cache_array: =>
        [@fields.getField("font").getValue(), @fields.getField("text").getValue(), @fields.getField("size").getValue(), @fields.getField("height").getValue(), @fields.getField("curveSegments").getValue(),
          @fields.getField("bevelEnabled").getValue(), @fields.getField("bevelThickness").getValue(), @fields.getField("bevelSize").getValue()]

      compute: =>
        new_cache = @get_cache_array()
        font = this.fields.getField("font").getValue()
        has_font_attribute = (f) ->
          if font["font"] && font["weight"]
            return true
          false

        if !has_font_attribute(font) || this.fields.getField("text").getValue() == ""
          @ob = false
          @fields.setField("out", @ob)
          return false
        if Utils.flatArraysAreEquals(new_cache, @cached) == false
          console.log "building text #{font.font} / #{font.weight}"
          @ob = new THREE.TextGeometry @fields.getField("text").getValue(),
            size: @fields.getField("size").getValue()
            height: @fields.getField("height").getValue()
            font: font.font
            weight: font.weight
            curveSegments: @fields.getField("curveSegments").getValue()
          @ob.computeBoundingBox()
          @ob.computeVertexNormals()

          @cached = new_cache

        @fields.setField("out", @ob)
