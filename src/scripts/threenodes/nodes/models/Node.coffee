define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  Utils = require 'cs!threenodes/utils/Utils'
  Fields = require 'cs!threenodes/fields/collections/Fields'

  ### Node model ###

  # Common base for all nodes.
  class Node extends Backbone.Model
    @node_name = ''
    @group_name = ''

    defaults:
      nid: -1
      gid: -1 # group id, set on subnodes of group == group.nid
      x: 0
      y: 0
      width: null
      height: null
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

      # Parent node, used to detect if a node is part of a group
      @parent = options.parent

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
      @fields = new Fields(false, {node: this, indexer: @indexer})

      # Call onFieldsCreated so that nodes can alias fields
      @onFieldsCreated()

      # Load saved data after the fields have been set
      @fields.load(@options.fields)

      # Init animation for current fields
      @anim = @createAnimContainer()

      # Load saved animation data if it exists
      if @options.anim != false
        @loadAnimation()

      return this

    typename: => String(@constructor.name)

    onFieldsCreated: () =>
      # This is where fields can get aliased ex:
      # @v_in = @fields.getField("in")

    # Cleanup the variables and destroy internal anims and fields for garbage collection
    remove: () =>
      if @anim
        @anim.destroy()
      if @fields
        @fields.destroy()
      delete @fields
      delete @apptimeline
      delete @anim
      delete @options
      delete @settings
      delete @indexer

      # todo : remove when @model.postInit is removed in NodeView
      delete @fully_inited

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

    addCountInput : () =>
      @fields.addFields
        inputs:
          "count" : 1

    createCacheObject: (values) =>
      res = {}
      for v in values
        field = @fields.getField(v)
        res[v] = if !field then false else field.attributes["value"]
      res

    inputValueHasChanged: (values, cache = @material_cache) =>
      for v in values
        field = @fields.getField(v)
        if !field
          return false
        else
          v2 = field.attributes["value"]
          if v2 != cache[v]
            return true
      false

    getFields: =>
      # to implement
      return {}

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
        width: @get('width')
        height: @get('height')
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
