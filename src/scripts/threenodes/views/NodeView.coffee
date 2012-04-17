root = if typeof window != "undefined" && window != null then window else exports

define [
  'use!Underscore', 
  'use!Backbone',
  "text!templates/node.tmpl.html",
  'cs!threenodes/views/FieldsView',
  "order!libs/jquery.contextMenu",
  "jQueryUi",
  'cs!threenodes/utils/Utils',
], (_, Backbone, _view_node_template) ->
  #"use strict"
  ### Node View ###
  $ = jQuery
  
  class root.ThreeNodes.NodeView extends Backbone.View
    className: "node"
      
    initialize: (options) ->
      # Setup the view DOM element
      @makeElement()
      
      # Initialize mouse events
      @makeDraggable()
      @initNodeClick()
      @initTitleClick()
      
      # Initialize the fields view
      @fields_view = new root.ThreeNodes.FieldsView
        node: @model
        collection: @model.fields
        el: $(".options", @$el)
      
      # Bind events
      @model.bind('change', @render)
      @model.bind('postInit', @postInit)
      @model.bind('remove', () => @remove())
      @model.bind("node:computePosition", @computeNodePosition)
      @model.bind("node:renderConnections", @renderConnections)
      @model.bind("node:showAnimations", @highlighAnimations)
      @model.bind("node:addSelectedClass", @addSelectedClass)
      
      # Render the node and "post init" the model
      @render()
      @model.postInit()
    
    makeElement: () =>
      # Compile the template file
      @template = _.template(_view_node_template, @model)
      @$el.html(@template)
      
      # Add the node group name as a class to the node element for easier styling
      @$el.addClass("type-" + @model.constructor.group_name)
      
      # Add other dynamic classes
      @$el.addClass("node-" + @model.typename())
    
    render: () =>
      @$el.css
        left: parseInt @model.get("x")
        top: parseInt @model.get("y")
      $(".head span", @$el).text(@model.get("name"))
      $(".head span", @$el).show()
    
    highlighAnimations: () =>
      nodeAnimation = false
      for propTrack in @model.anim.objectTrack.propertyTracks
        $target = $('.inputs .field-' + propTrack.name , @$el)
        if propTrack.anims.length > 0
          $target.addClass "has-animation"
          nodeAnimation = true
        else
          $target.removeClass "has-animation"
      if nodeAnimation == true
        @$el.addClass "node-has-animation"
      else
        @$el.removeClass "node-has-animation"
      true
    
    addSelectedClass: () =>
      @$el.addClass("ui-selected")
    
    renderConnections: () =>
      @model.fields.renderConnections()
    
    computeNodePosition: () =>
      pos = $(@el).position()
      offset = $("#container-wrapper").offset()
      @model.set
        x: pos.left + $("#container-wrapper").scrollLeft()
        y: pos.top + $("#container-wrapper").scrollTop()
    
    remove: () =>
      $(".field", this.el).destroyContextMenu()
      if @$el.data("draggable") then @$el.draggable("destroy")
      $(this.el).unbind()
      @undelegateEvents()
      if @fields_view then @fields_view.remove()
      @fields_view = null
      super
    
    initNodeClick: () ->
      self = this
      $(@el).click (e) ->
        if e.metaKey == false
          $( ".node" ).removeClass("ui-selected")
          $(this).addClass("ui-selecting")
        else
          if $(this).hasClass("ui-selected")
            $(this).removeClass("ui-selected")
          else
            $(this).addClass("ui-selecting")
        selectable = $("#container").data("selectable")
        selectable.refresh()
        selectable._mouseStop(null)
        self.model.fields.renderSidebar()
      return @
    
    initTitleClick: () ->
      self = this
      $(".head span", @el).dblclick (e) ->
        prev = $(this).html()
        $(".head", self.el).append("<input type='text' />")
        $(this).hide()
        $input = $(".head input", self.el)
        $input.val(prev)
        
        apply_input_result = () ->
          self.model.set('name', $input.val())
          $input.remove()
        
        $input.blur (e) ->
          apply_input_result()
        
        $("#graph").click (e) ->
          apply_input_result()
        
        $input.keydown (e) ->
          # on enter
          if e.keyCode == 13
            apply_input_result()
      return @
    
    makeDraggable: () =>
      self = this
      
      nodes_offset = {top: 0, left: 0}
      selected_nodes = $([])
      
      $(this.el).draggable
        start: (ev, ui) ->
          if $(this).hasClass("ui-selected")
            selected_nodes = $(".ui-selected").each () ->
              $(this).data("offset", $(this).offset())
          else
            selected_nodes = $([])
            $(".node").removeClass("ui-selected")
          nodes_offset = $(this).offset()
        drag: (ev, ui) ->
          
          dt = ui.position.top - nodes_offset.top
          dl = ui.position.left - nodes_offset.left
          selected_nodes.not(this).each () ->
            el = $(this)
            offset = el.data("offset")
            dx = offset.top + dt
            dy = offset.left + dl
            el.css
              top: dx
              left: dy
            el.data("object").trigger("node:computePosition")
            el.data("object").trigger("node:renderConnections")
            
          self.renderConnections()
        stop: () ->
          selected_nodes.not(this).each () ->
            el = $(this).data("object")
            el.trigger("node:renderConnections")
          self.computeNodePosition()
          self.renderConnections()
      return @
  
  return root.ThreeNodes.NodeView
