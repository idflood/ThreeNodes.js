define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.nodes.types.Geometry.PlaneGeometry extends ThreeNodes.NodeBase
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
      [@rack.get("width").get(), @rack.get("height").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.PlaneGeometry(@rack.get("width").get(), @rack.get("height").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get())
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Geometry.CubeGeometry extends ThreeNodes.NodeBase
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
      [@rack.get("width").get(), @rack.get("height").get(), @rack.get("depth").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get(), @rack.get("segments_depth").get(), @rack.get("flip").get()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.CubeGeometry(@rack.get("width").get(), @rack.get("height").get(), @rack.get("depth").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get(), @rack.get("segments_depth").get(), @rack.get("flip").get())
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Geometry.SphereGeometry extends ThreeNodes.NodeBase
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
      [@rack.get("radius").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.SphereGeometry(@rack.get("radius").get(), @rack.get("segments_width").get(), @rack.get("segments_height").get())
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Geometry.CylinderGeometry extends ThreeNodes.NodeBase
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
        @rack.get("radiusTop").get(), @rack.get("radiusBottom").get(), @rack.get("height").get(), 
        @rack.get("segmentsRadius").get(), @rack.get("segmentsHeight").get(), @rack.get("openEnded").get()
      ]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.CylinderGeometry(
          @rack.get("radiusTop").get(), @rack.get("radiusBottom").get(), @rack.get("height").get(), 
          @rack.get("segmentsRadius").get(), @rack.get("segmentsHeight").get(), @rack.get("openEnded").get()
        )
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Geometry.TorusGeometry extends ThreeNodes.NodeBase
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
        @rack.get("radius").get(), @rack.get("tube").get(), @rack.get("segmentsR").get(), 
        @rack.get("segmentsT").get(), @rack.get("arc").get()
      ]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.TorusGeometry(
          @rack.get("radius").get(), @rack.get("tube").get(), @rack.get("segmentsR").get(), 
          @rack.get("segmentsT").get(), @rack.get("arc").get()
        )
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Geometry.TorusKnotGeometry extends ThreeNodes.NodeBase
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
        @rack.get("radius").get(), @rack.get("tube").get(), @rack.get("segmentsR").get(), 
        @rack.get("segmentsT").get(), @rack.get("p").get(), @rack.get("q").get(), @rack.get("heightScale").get()
      ]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.TorusKnotGeometry(
          @rack.get("radius").get(), @rack.get("tube").get(), @rack.get("segmentsR").get(), 
          @rack.get("segmentsT").get(), @rack.get("p").get(), @rack.get("q").get(), @rack.get("heightScale").get()
        )
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Geometry.OctahedronGeometry extends ThreeNodes.NodeBase
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
      [@rack.get("radius").get(), @rack.get("detail").get()]
  
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false
        @ob = new THREE.OctahedronGeometry(@rack.get("radius").get(), @rack.get("detail").get())
        @cached = new_cache
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @rack.set("out", @ob)

###
# todo: maybe use require to load the font as required
# see: https://github.com/idflood/three.js/blob/master/examples/canvas_geometry_text.html
class nodes.types.Geometry.TextGeometry extends NodeBase
  set_fields: =>
    super
    @ob = new THREE.TextGeometry(".")
    
    # todo: implement other attributes (height, bevel, ...)
    @rack.addFields
      inputs:
        "text": "."
      outputs:
        "out": {type: "Any", val: @ob}
    @cached = @get_cache_array()
  
  get_cache_array: =>
    [@rack.get("text").get()]

  compute: =>
    new_cache = @get_cache_array()
    if flatArraysAreEquals(new_cache, @cached) == false
      @ob = new THREE.SphereGeometry(@rack.get("text").get())
      @cached = new_cache
    #@apply_fields_to_val(@rack.node_fields.inputs, @ob, ["text"])
    @rack.set("out", @ob)
    
###