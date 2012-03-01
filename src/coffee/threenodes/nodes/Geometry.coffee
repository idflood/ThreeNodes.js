define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Node',
  'order!threenodes/utils/Utils',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.nodes.PlaneGeometry extends ThreeNodes.NodeBase
    @node_name = 'Plane'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.PlaneGeometry(100, 100, 1, 1, 1)
      @rack.addFields
        inputs:
          "width": 100,
          "height": 100,
          "segments_width": 1,
          "segments_height": 1,
        outputs:
          "out": {type: "Any", val: @ob}
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [@rack.getField("width").getValue(), @rack.getField("height").getValue(), @rack.getField("segments_width").getValue(), @rack.getField("segments_height").getValue()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.PlaneGeometry(@rack.getField("width").getValue(), @rack.getField("height").getValue(), @rack.getField("segments_width").getValue(), @rack.getField("segments_height").getValue())
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.CubeGeometry extends ThreeNodes.NodeBase
    @node_name = 'Cube'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1)
      @rack.addFields
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
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [@rack.getField("width").getValue(), @rack.getField("height").getValue(), @rack.getField("depth").getValue(), @rack.getField("segments_width").getValue(), @rack.getField("segments_height").getValue(), @rack.getField("segments_depth").getValue(), @rack.getField("flip").getValue()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.CubeGeometry(@rack.getField("width").getValue(), @rack.getField("height").getValue(), @rack.getField("depth").getValue(), @rack.getField("segments_width").getValue(), @rack.getField("segments_height").getValue(), @rack.getField("segments_depth").getValue(), @rack.getField("flip").getValue())
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.SphereGeometry extends ThreeNodes.NodeBase
    @node_name = 'Sphere'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.SphereGeometry(100, 20, 20)
      @rack.addFields
        inputs:
          "radius": 100
          "segments_width": 1
          "segments_height": 1
        outputs:
          "out": {type: "Any", val: @ob}
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [@rack.getField("radius").getValue(), @rack.getField("segments_width").getValue(), @rack.getField("segments_height").getValue()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.SphereGeometry(@rack.getField("radius").getValue(), @rack.getField("segments_width").getValue(), @rack.getField("segments_height").getValue())
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.CylinderGeometry extends ThreeNodes.NodeBase
    @node_name = 'Cylinder'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.CylinderGeometry(100, 100, 20, 30, 1, false)
      
      #@value = 0
      @rack.addFields
        inputs:
          "radiusTop": 100
          "radiusBottom": 100
          "height": 20
          "segmentsRadius": 30
          "segmentsHeight": 1
          "openEnded": false
        outputs:
          "out": {type: "Any", val: @ob}
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [
        @rack.getField("radiusTop").getValue(), @rack.getField("radiusBottom").getValue(), @rack.getField("height").getValue(), 
        @rack.getField("segmentsRadius").getValue(), @rack.getField("segmentsHeight").getValue(), @rack.getField("openEnded").getValue()
      ]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.CylinderGeometry(
          @rack.getField("radiusTop").getValue(), @rack.getField("radiusBottom").getValue(), @rack.getField("height").getValue(), 
          @rack.getField("segmentsRadius").getValue(), @rack.getField("segmentsHeight").getValue(), @rack.getField("openEnded").getValue()
        )
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.TorusGeometry extends ThreeNodes.NodeBase
    @node_name = 'Torus'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.TorusGeometry(100, 40, 8, 6, Math.PI * 2)
      @rack.addFields
        inputs:
          "radius": 100
          "tube": 40
          "segmentsR": 8
          "segmentsT": 6
          "arc": Math.PI * 2
        outputs:
          "out": {type: "Any", val: @ob}
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [
        @rack.getField("radius").getValue(), @rack.getField("tube").getValue(), @rack.getField("segmentsR").getValue(), 
        @rack.getField("segmentsT").getValue(), @rack.getField("arc").getValue()
      ]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.TorusGeometry(
          @rack.getField("radius").getValue(), @rack.getField("tube").getValue(), @rack.getField("segmentsR").getValue(), 
          @rack.getField("segmentsT").getValue(), @rack.getField("arc").getValue()
        )
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.TorusKnotGeometry extends ThreeNodes.NodeBase
    @node_name = 'TorusKnot'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.TorusKnotGeometry(200, 40, 64, 8, 2, 3, 1)
      @rack.addFields
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
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [
        @rack.getField("radius").getValue(), @rack.getField("tube").getValue(), @rack.getField("segmentsR").getValue(), 
        @rack.getField("segmentsT").getValue(), @rack.getField("p").getValue(), @rack.getField("q").getValue(), @rack.getField("heightScale").getValue()
      ]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.TorusKnotGeometry(
          @rack.getField("radius").getValue(), @rack.getField("tube").getValue(), @rack.getField("segmentsR").getValue(), 
          @rack.getField("segmentsT").getValue(), @rack.getField("p").getValue(), @rack.getField("q").getValue(), @rack.getField("heightScale").getValue()
        )
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.OctahedronGeometry extends ThreeNodes.NodeBase
    @node_name = 'Octahedron'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.OctahedronGeometry(100, 0)
      @rack.addFields
        inputs:
          "radius": 100
          "detail": 0
        outputs:
          "out": {type: "Any", val: @ob}
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [@rack.getField("radius").getValue(), @rack.getField("detail").getValue()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.OctahedronGeometry(@rack.getField("radius").getValue(), @rack.getField("detail").getValue())
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.TextGeometry extends ThreeNodes.NodeBase
    @node_name = 'Text'
    @group_name = 'Geometry'
    
    set_fields: =>
      super
      @ob = false
      
      @rack.addFields
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
      @cached = @get_cache_array()
    
    get_cache_array: =>
      [@rack.getField("font").getValue(), @rack.getField("text").getValue(), @rack.getField("size").getValue(), @rack.getField("height").getValue(), @rack.getField("curveSegments").getValue(),
        @rack.getField("bevelEnabled").getValue(), @rack.getField("bevelThickness").getValue(), @rack.getField("bevelSize").getValue()]
  
    compute: =>
      new_cache = @get_cache_array()
      font = this.rack.get("font").getValue()
      has_font_attribute = (f) ->
        if font["font"] && font["weight"]
          return true
        false
      
      if !has_font_attribute(font) || this.rack.get("text").getValue() == ""
        @ob = false
        @rack.setField("out", @ob)
        return false
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        console.log "building text #{font.font} / #{font.weight}"
        @ob = new THREE.TextGeometry @rack.getField("text").getValue(),
          size: @rack.getField("size").getValue()
          height: @rack.getField("height").getValue()
          font: font.font
          weight: font.weight
          curveSegments: @rack.getField("curveSegments").getValue()
        @ob.computeBoundingBox()
        @ob.computeVertexNormals()
        
        @cached = new_cache
      
      @rack.setField("out", @ob)
