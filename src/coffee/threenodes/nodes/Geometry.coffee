define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  class ThreeNodes.nodes.types.Geometry.PlaneGeometry extends ThreeNodes.NodeBase
    set_fields: =>
      super
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
      @ob = new THREE.SphereGeometry(100, 20, 20)
      
      #@value = 0
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