define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/utils/Utils',
  'order!threenodes/collections/Fields',
], ($, _, Backbone, Utils) ->
  "use strict"
  ThreeNodes.field_click_1 = false
  ThreeNodes.selected_nodes = $([])
  ThreeNodes.nodes_offset =
    top: 0
    left: 0
  
  class ThreeNodes.NodeBase extends Backbone.Model
    @node_name = ''
    @group_name = ''
            
    default:
      nid: -1
      x: 0
      y: 0
      name: ""
    
    setNID: (nid) =>
      @set
        "nid": nid
      @
    
    setName: (name) =>
      @set
        "name": name
      @
    
    setPosition: (x, y) =>
      @set
        "x": x
        "y": y
      @
        
    initialize: (options) =>
      super
      @auto_evaluate = false
      @delays_output = false
      @dirty = true
      @is_animated = false
      @out_connections = []
      @value = false
      @apptimeline = options.timeline
      @options = options
      
      @setName(@typename())
      
      if !@get("nid")
        @setNID(Utils.get_uid())
      else
        ThreeNodes.uid = @get("nid")
      
      @rack = new ThreeNodes.NodeFieldsCollection([], {node: this})
      @
      
    post_init: () =>
      # init fields
      @set_fields()
      
      # load saved data after the fields have been set
      @rack.load(@options.fields)
      
      # init animation for current fields
      @anim = @createAnimContainer()
      
      # load saved data
      if @options.anim != false
        # load animation
        @loadAnimation()
            
      @showNodeAnimation()
      @trigger("postInit")
      @
    
    typename: => String(@constructor.name)
    
    remove: () =>
      if @anim
        @anim.destroy()
      @rack.destroy()
      delete @rack
      delete @apptimeline
      delete @anim
      delete @options
      @destroy()
    
    createConnection: (field1, field2) =>
      @trigger("createConnection", field1, field2)
    
    loadAnimation: () =>
      for propLabel, anims of @options.anim
        track = @anim.getPropertyTrack(propLabel)
        for propKey in anims
          track.keys.push
            time: propKey.time,
            value: propKey.value,          
            easing: Timeline.stringToEasingFunction(propKey.easing),
            track: track
        @anim.timeline.rebuildTrackAnimsFromKeys(track)
      true
    
    showNodeAnimation: () =>
      @trigger("node:showAnimations")
    
    add_count_input : () =>
      @rack.addFields
        inputs:
          "count" : 1
    
    create_cache_object: (values) =>
      res = {}
      for v in values
        res[v] = @rack.getField(v).attributes["value"]
      res
    
    input_value_has_changed: (values, cache = @material_cache) =>
      for v in values
        v2 = @rack.getField(v).attributes["value"]
        if v2 != cache[v]
          return true
      false
    
    set_fields: =>
      # to implement
    
    has_out_connection: () =>
      @out_connections.length != 0
    
    getUpstreamNodes: () => @rack.getUpstreamNodes()
    getDownstreamNodes: () => @rack.getDownstreamNodes()
        
    hasPropertyTrackAnim: () =>
      for propTrack in @anim.objectTrack.propertyTracks
        if propTrack.anims.length > 0
          return true
      false
    
    getAnimationData: () =>
      if !@anim || !@anim.objectTrack || !@anim.objectTrack.propertyTracks || @hasPropertyTrackAnim() == false
        return false
      if @anim != false
        res = {}
        for propTrack in @anim.objectTrack.propertyTracks
          res[propTrack.propertyName] = []
          for anim in propTrack.keys
            k = 
              time: anim.time
              value: anim.value
              easing: Timeline.easingFunctionToString(anim.easing)
            res[propTrack.propertyName].push(k)
            
      res
        
    toJSON: () =>
      res =
        nid: @get('nid')
        name: @get('name')
        type: @typename()
        anim: @getAnimationData()
        x: @get('x')
        y: @get('y')
        fields: @rack.toJSON()
      res
    
    apply_fields_to_val: (afields, target, exceptions = [], index) =>
      for f of afields
        nf = afields[f]
        field_name = nf.get("name")
        if exceptions.indexOf(field_name) == -1
          target[field_name] = @rack.getField(field_name).getValue(index)
    
    create_field_connection: (field) =>
      f = this
      if ThreeNodes.field_click_1 == false
        ThreeNodes.field_click_1 = field
        $(".inputs .field").filter () ->
          $(this).parent().parent().parent().attr("id") != "nid-#{f.nid}"
        .addClass "field-possible-target"
      else
        field_click_2 = field
        @trigger("createConnection", ThreeNodes.field_click_1, field_click_2)
        $(".field").removeClass "field-possible-target"
        ThreeNodes.field_click_1 = false
    
    get_cached_array: (vals) =>
      res = []
      for v in vals
        res[res.length] = @rack.getField(v).getValue()
      
    add_out_connection: (c, field) =>
      if @out_connections.indexOf(c) == -1
        @out_connections.push(c)
      c
  
    remove_connection: (c) =>
      c_index = @out_connections.indexOf(c)
      if c_index != -1
        @out_connections.splice(c_index, 1)
      c
  
    disable_property_anim: (field) =>
      if @anim && field.get("is_output") == false
        @anim.disableProperty(field.get("name"))
  
    enable_property_anim: (field) =>
      if field.get("is_output") == true || !@anim
        return false
      if field.is_animation_property()
        @anim.enableProperty(field.get("name"))
    
    createAnimContainer: () =>
      res = anim("nid-" + @get("nid"), @rack.node_fields.inputs)
      # enable track animation only for number/boolean
      for f of @rack.node_fields.inputs
        field = @rack.node_fields.inputs[f]
        if field.is_animation_property() == false
          @disable_property_anim(field)
      return res
  
  class ThreeNodes.NodeNumberSimple extends ThreeNodes.NodeBase
    set_fields: =>
      @v_in = @rack.addField("in", {type: "Float", val: 0})
      @v_out = @rack.addField("out", {type: "Float", val: 0}, "outputs")
      
    process_val: (num, i) => num
    
    remove: () =>
      delete @v_in
      delete @v_out
      super
    
    compute: =>
      res = []
      numItems = @rack.getMaxInputSliceCount()
      for i in [0..numItems]
        ref = @v_in.getValue(i)
        switch $.type(ref)
          when "number" then res[i] = @process_val(ref, i)
          when "object"
            switch ref.constructor
              when THREE.Vector2
                res[i].x = @process_val(ref.x, i)
                res[i].y = @process_val(ref.y, i)
              when THREE.Vector3
                res[i].x = @process_val(ref.x, i)
                res[i].y = @process_val(ref.y, i)
                res[i].z = @process_val(ref.z, i)
      
      @v_out.setValue res
      true

