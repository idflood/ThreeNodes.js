define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/collections/NodeFieldsCollection',
  'order!threenodes/utils/Utils',
], ($, _, Backbone) ->
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
      nid: 0
      x: 0
      y: 0
      name: ""
    
    load: (xml, json) =>
      if xml
        @fromXML(xml)
      else if json
        @fromJSON(json)
      
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
    
    fromJSON: (data) =>
      @set
        "nid": data.nid
        "name": if data.name then data.name else @get("name")
        "x": data.x
        "y": data.y
      ThreeNodes.uid = @get("nid")
      @
    
    fromXML: (data) =>
      @set
        "nid": parseInt @inXML.attr("nid")
      ThreeNodes.uid = @get("nid")
      @
    
    initialize: (options) =>
      @auto_evaluate = false
      @delays_output = false
      @dirty = true
      @anim_obj = {}
      @is_animated = false
      @out_connections = []
      @value = false
      @inXML = options.inXML
      @inJSON = options.inJSON
      @context = options.context
        
      if @inXML == false && @inJSON == false
        @setNID(ThreeNodes.Utils.get_uid())
      @setName(@typename())
      @load(@inXML, @inJSON)
      
      @apptimeline = @context.injector.get "AppTimeline"
      @rack = new ThreeNodes.NodeFieldsCollection [],
        node: this
        
      
    post_init: () =>
      # init fields
      @set_fields()
      
      # load saved data after the fields have been set
      @rack.load(@inXML, @inJSON)
      
      # init animation for current fields
      @anim = @createAnimContainer()
      
      # load saved data
      if @inJSON && @inJSON.anim != false
        # load animation
        @loadAnimation()
            
      @onTimelineRebuild()
      @trigger("postInit")
      @
    
    typename: => String(@constructor.name)
    
    createConnection: (field1, field2) => @trigger("createConnection", field1, field2)
    
    loadAnimation: () =>
      @anim = @createAnimContainer()
      for propLabel, anims of @inJSON.anim
        track = @anim.getPropertyTrack(propLabel)
        for propKey in anims
          track.keys.push
            time: propKey.time,
            value: propKey.value,          
            easing: Timeline.stringToEasingFunction(propKey.easing),
            track: track
        @anim.timeline.rebuildTrackAnimsFromKeys(track)
      true
    
    onTimelineRebuild: () =>
      nodeAnimation = false
      for propTrack in @anim.objectTrack.propertyTracks
        $target = $('.inputs .field-' + propTrack.name , @main_view)
        if propTrack.anims.length > 0
          $target.addClass "has-animation"
          nodeAnimation = true
        else
          $target.removeClass "has-animation"
      if nodeAnimation == true
        $(@main_view).addClass "node-has-animation"
      else
        $(@main_view).removeClass "node-has-animation"
      true
    
    add_count_input : () =>
      @rack.addFields
        inputs:
          "count" : 1
    
    create_cache_object: (values) =>
      res = {}
      for v in values
        res[v] = @rack.getField(v).getValue()
      res
    
    input_value_has_changed: (values, cache = @material_cache) =>
      for v in values
        v2 = @rack.getField(v).getValue()
        if v2 != cache[v]
          return true
      false
    
    set_fields: =>
      # to implement
    
    has_out_connection: () =>
      @out_connections.length != 0
    
    remove: () =>
      ng = @context.injector.get("NodeGraph")
      ng.removeNode(this)
      @rack.remove_all_connections()
      @main_view.remove()
      
      # todo: maybe remove fields
      # todo: remove sidebar attributes if this is the selected node
    
    getUpstreamNodes: () => @rack.getUpstreamNodes()
    getDownstreamNodes: () => @rack.getDownstreamNodes()
    
    update: () =>
      # update node output values based on inputs
      @compute()
    
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
    
    getAnimationDataToCode: () =>
      res = "false"
      if !@anim || !@anim.objectTrack || !@anim.objectTrack.propertyTracks || @hasPropertyTrackAnim() == false
        return res
      if @anim != false
        res = "{\n"
        for propTrack in @anim.objectTrack.propertyTracks
          res += "\t\t" + "'#{propTrack.propertyName}' : [\n"
          for anim in propTrack.keys
            res += "\t\t\t" + "{time: #{anim.time}, value: #{anim.value}, easing: '#{Timeline.easingFunctionToString(anim.easing)}'},\n"
          res += "\t\t" + "],\n"
        res += "\t}"
    
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
    
    toXML: () =>
      pos = @main_view.position()
      "\t\t\t<node nid='#{@nid}' type='#{@typename()}' x='#{pos.left}' y='#{pos.top}'>#{@rack.toXML()}</node>\n"
    
    toCode: () =>
      ng = @context.injector.get("NodeGraph")
      component = ng.get_component_by_type(@typename())
      res = "\n// node: #{@get('name')}\n"
      res += "var node_#{@get('nid')}_data = {\n"
      res += "\t" + "nid: #{@get('nid')},\n"
      res += "\t" + "name: '#{@get('name')}',\n"
      res += "\t" + "type: '#{@typename()}',\n"
      res += "\t" + "fields: #{@rack.toCode()},\n"
      res += "\t" + "anim: #{@getAnimationDataToCode()}\n"
      res += "};\n"
      res += "var node_#{@nid} = nodegraph.create_node(\"#{component}\", \"#{@typename()}\", #{@get('x')}, #{@get('y')}, false, node_#{@get('nid')}_data);\n"
      return res
    
    apply_fields_to_val: (afields, target, exceptions = [], index) =>
      for f of afields
        nf = afields[f]
        if exceptions.indexOf(nf.get("name")) == -1
          target[nf.get("name")] = @rack.getField(nf.get("name")).getValue(index)
    
    create_field_connection: (field) =>
      f = this
      if ThreeNodes.field_click_1 == false
        ThreeNodes.field_click_1 = field
        $(".inputs .field").filter () ->
          $(this).parent().parent().parent().attr("id") != "nid-#{f.nid}"
        .addClass "field-possible-target"
      else
        field_click_2 = field
        c = @context.injector.instanciate(ThreeNodes.NodeConnection, ThreeNodes.field_click_1, field_click_2)
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
      if @anim && field.is_output == false
        @anim.disableProperty(field.name)
  
    enable_property_anim: (field) =>
      if field.is_output == true || !@anim
        return false
      if field.is_animation_property()
        @anim.enableProperty(field.name)
    
    createAnimContainer: () =>
      res = anim("nid-" + @nid, @rack.node_fields_by_name.inputs)
      # enable track animation only for number/boolean
      for f of @rack.node_fields_by_name.inputs
        field = @rack.node_fields_by_name.inputs[f]
        if field.is_animation_property() == false
          @disable_property_anim(field)
      return res
  
  class ThreeNodes.NodeNumberSimple extends ThreeNodes.NodeBase
    set_fields: =>
      @v_in = @rack.addField("in", {type: "Float", val: 0})
      @v_out = @rack.addField("out", {type: "Float", val: 0}, "outputs")
      
    process_val: (num, i) => num
    
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

