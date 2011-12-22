define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/core/NodeConnection',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  ThreeNodes.field_click_1 = false
  ThreeNodes.selected_nodes = $([])
  ThreeNodes.nodes_offset =
    top: 0
    left: 0
  
  class ThreeNodes.NodeBase
    constructor: (@x = 0, @y = 0, @inXML = false, @inJSON = false) ->
      @auto_evaluate = false
      @delays_output = false
      @dirty = true
      @anim_obj = {}
      @is_animated = false
      
      if @inXML
        @nid = parseInt @inXML.attr("nid")
        ThreeNodes.uid = @nid
      else if @inJSON
        @nid = @inJSON.nid
        ThreeNodes.uid = @nid
      else
        @nid = ThreeNodes.Utils.get_uid()
    
    onRegister: () ->
      @container = $("#container")
      @out_connections = []
      @rack = new ThreeNodes.NodeFieldRack(this, @inXML)
      @value = false
      @name = false
      @main_view = false
      @init()
      @set_fields()
      @anim = @createAnimContainer()
      if @inXML
        @rack.fromXML(@inXML)
      else if @inJSON
        @rack.fromJSON(@inJSON)
        if @inJSON.anim != false
          @loadAnimation()
          
      @init_context_menu()
      
    typename: => String(@constructor.name)
    
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
      
    add_count_input : () =>
      @rack.addFields
        inputs:
          "count" : 1
    
    init_context_menu: () =>
      self = this
      $(".field", @main_view).contextMenu {menu: "field-context-menu"}, (action, el, pos) ->
        if action == "remove_connection"
          f_name = $(el).attr("id")
          f_type = $(el).parent().attr("class")
          field = self.rack.node_fields[f_type][f_name]
          field.remove_connections()
    
    create_cache_object: (values) =>
      res = {}
      for v in values
        res[v] = @rack.get(v).get()
      res
    
    input_value_has_changed: (values, cache = @material_cache) =>
      for v in values
        v2 = @rack.get(v).get()
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
    
    toJSON: () =>
      res =
        nid: @nid
        type: @typename()
        anim: @getAnimationData()
        x: @x
        y: @y
        fields: @rack.toJSON()
      res
    
    toXML: () =>
      pos = @main_view.position()
      "\t\t\t<node nid='#{@nid}' type='#{@typename()}' x='#{pos.left}' y='#{pos.top}'>#{@rack.toXML()}</node>\n"
    
    apply_fields_to_val: (afields, target, exceptions = [], index) =>
      for f of afields
        nf = afields[f]
        if exceptions.indexOf(nf.name) == -1
          target[nf.name] = @rack.get(nf.name).get(index)
    
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
        
    render_connections: () =>
      @rack.render_connections()
    
    get_cached_array: (vals) =>
      res = []
      for v in vals
        res[res.length] = @rack.get(v).get()
    
    add_field_listener: ($field) =>
      self = this
      f_name = $field.attr("id")
      f_type = $field.parent().attr("class")
      field = @rack.node_fields[f_type][f_name]
      $field.click (e) ->
        e.preventDefault()
        if e.shiftKey == true
          field.remove_connections()
        else
          self.create_field_connection(field)
      this
      
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
    
    init: () =>
      self = this
      @main_view = $.tmpl(_view_node_template, this)
      @main_view.data("object", this)
      @container.append(@main_view)
      @main_view.css
        left: @x
        top: @y
      
      @main_view.draggable
        handle: ".head span"
        start: (ev, ui) ->
          ev.stopPropagation()
          if $(this).hasClass("ui-selected")
            ThreeNodes.selected_nodes = $(".ui-selected").each () ->
              $(this).data("offset", $(this).offset())
          else
            ThreeNodes.selected_nodes = $([])
            $(".node").removeClass("ui-selected")
          ThreeNodes.nodes_offset = $(this).offset()
        drag: (ev, ui) ->
          dt = ui.position.top - ThreeNodes.nodes_offset.top
          dl = ui.position.left - ThreeNodes.nodes_offset.left
          ThreeNodes.selected_nodes.not(this).each () ->
            el = $(this)
            offset = el.data("offset")
            dx = offset.top + dt
            dy = offset.left + dl
            el.css
              top: dx
              left: dy
            el.data("object").render_connections()
            el.data("object").compute_node_position()
          self.render_connections()
        stop: () ->
          ThreeNodes.selected_nodes.not(this).each () ->
            el = $(this).data("object")
            el.render_connections()
          self.compute_node_position()
          self.render_connections()
      
      $("#container").selectable
        filter: ".node"
        stop: (event, ui) =>
          $selected = $(".node.ui-selected")
          nodes = []
          $selected.each () ->
            nodes.push($(this).data("object").anim)
          apptimeline.timeline.selectAnims(nodes)
      
      $(".head", @main_view).dblclick (e) ->
        $(".options", self.main_view).animate {height: 'toggle'}, 120, () ->
          self.render_connections()
          
      apptimeline = self.context.injector.get "AppTimeline"
      @main_view.click (e) =>
        @rack.render_sidebar()
  
    compute_node_position: () =>
      pos = @main_view.position()
      @x = pos.left
      @y = pos.top
    
  class ThreeNodes.NodeNumberSimple extends ThreeNodes.NodeBase
    init: =>
      super
      @value = 0
      
    set_fields: =>
      @v_in = @rack.addField("in", 0)
      @v_out = @rack.addField("out", 0, "outputs")
      
    process_val: (num, i) => num
    
    compute: =>
      res = []
      numItems = @rack.getMaxInputSliceCount()
      for i in [0..numItems]
        res[i] = @process_val(@v_in.get(i), i)
      #if @v_out.get() != res
      @v_out.set res
      true

