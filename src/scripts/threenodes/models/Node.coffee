define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/utils/Utils',
  'cs!threenodes/collections/Fields',
], (_, Backbone, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class ThreeNodes.NodeBase extends Backbone.Model
    @node_name = ''
    @group_name = ''
            
    defaults:
      nid: -1
      x: 0
      y: 0
      name: ""
    
    initialize: (options) =>
      super
      # Define common node properties defining how the node should be updated
      @auto_evaluate = false
      @delays_output = false
      @dirty = true
      
      # Define some utility variables, used internally
      @is_animated = false
      @out_connections = []
      
      # Keep reference of some variables
      @apptimeline = options.timeline
      @settings = options.settings
      @indexer = options.indexer
      @options = options
      
      # Set a default node name if none is provided
      if @get('name') == '' then @set('name', @typename())
      
      if @get('nid') == -1
        # If this a new node assign a unique id to it
        @set('nid', @indexer.getUID())
      else
        # If the node is loaded set the indexer uid to the node.nid.
        # With this, the following created nodes will have a unique nid
        @indexer.uid = @get('nid')
      
      # Create the fields collections
      @fields = new ThreeNodes.FieldsCollection([], {node: this, indexer: @indexer})
      @
      
    postInit: () =>
      # Init fields
      @setFields()
      
      # Load saved data after the fields have been set
      @fields.load(@options.fields)
      
      # Init animation for current fields
      @anim = @createAnimContainer()
      
      # Load saved animation data if it exists
      if @options.anim != false
        @loadAnimation()
            
      @showNodeAnimation()
      @trigger("postInit")
      @
    
    typename: => String(@constructor.name)
    
    # Cleanup the variables and destroy internal anims and fields for garbage collection
    remove: () =>
      if @anim
        @anim.destroy()
      @fields.destroy()
      delete @fields
      delete @apptimeline
      delete @anim
      delete @options
      delete @settings
      delete @indexer
      @destroy()
    
    # Load the animation from json data
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
    
    createConnection: (field1, field2) =>
      @trigger("createConnection", field1, field2)
    
    showNodeAnimation: () =>
      @trigger("node:showAnimations")
    
    addCountInput : () =>
      @fields.addFields
        inputs:
          "count" : 1
    
    createCacheObject: (values) =>
      res = {}
      for v in values
        res[v] = @fields.getField(v).attributes["value"]
      res
    
    inputValueHasChanged: (values, cache = @material_cache) =>
      for v in values
        v2 = @fields.getField(v).attributes["value"]
        if v2 != cache[v]
          return true
      false
    
    setFields: =>
      # to implement
    
    hasOutConnection: () =>
      @out_connections.length != 0
    
    getUpstreamNodes: () => @fields.getUpstreamNodes()
    getDownstreamNodes: () => @fields.getDownstreamNodes()
        
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
        fields: @fields.toJSON()
      res
    
    applyFieldsToVal: (afields, target, exceptions = [], index) =>
      for f of afields
        nf = afields[f]
        field_name = nf.get("name")
        # Only apply value from fields that are not in the exclude list
        if exceptions.indexOf(field_name) == -1
          # Apply the field's value to the object property
          target[field_name] = @fields.getField(field_name).getValue(index)
    
    addOutConnection: (c, field) =>
      if @out_connections.indexOf(c) == -1 then @out_connections.push(c)
      c
  
    removeConnection: (c) =>
      c_index = @out_connections.indexOf(c)
      if c_index != -1
        @out_connections.splice(c_index, 1)
      c
  
    disablePropertyAnim: (field) =>
      # We only want to animate inputs so we deactivate timeline's animation for outputs fields
      if @anim && field.get("is_output") == false
        @anim.disableProperty(field.get("name"))
  
    enablePropertyAnim: (field) =>
      # Make sure we don't enable animation on output fields
      if field.get("is_output") == true || !@anim
        return false
      
      # If the field can be animated enabale property animation
      if field.isAnimationProperty() then @anim.enableProperty(field.get("name"))
    
    createAnimContainer: () =>
      res = anim("nid-" + @get("nid"), @fields.inputs)
      # enable track animation only for number/boolean
      for f of @fields.inputs
        field = @fields.inputs[f]
        if field.isAnimationProperty() == false then @disablePropertyAnim(field)
      return res
  
  class ThreeNodes.NodeNumberSimple extends ThreeNodes.NodeBase
    setFields: =>
      @v_in = @fields.addField("in", {type: "Float", val: 0})
      @v_out = @fields.addField("out", {type: "Float", val: 0}, "outputs")
      
    process_val: (num, i) => num
    
    remove: () =>
      delete @v_in
      delete @v_out
      super
    
    compute: =>
      res = []
      numItems = @fields.getMaxInputSliceCount()
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

