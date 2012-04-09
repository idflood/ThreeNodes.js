define [
  'use!Underscore', 
  'use!Backbone',
  "text!templates/node.tmpl.html",
  'order!threenodes/views/NodeFieldRackView',
  "order!libs/jquery.contextMenu",
  "jQueryUi",
  'order!threenodes/utils/Utils',
], (_, Backbone, _view_node_template) ->
  "use strict"
  ### Node View ###
  $ = jQuery
  
  class ThreeNodes.NodeView extends Backbone.View
    @template = _view_node_template
        
    initialize: () ->
      @make_draggable()
      @init_el_click()
      @init_title_click()
      
      # Initialize the fields view
      @fields_view = new ThreeNodes.NodeFieldRackView
        node: @model
        collection: @model.fields
        el: $(".options", @el)
        node_el: @$el
      
      # Bind events
      @model.bind('change', @render)
      @model.bind('postInit', @postInit)
      @model.bind('remove', () => @remove())
      @model.bind("node:computePosition", @compute_node_position)
      @model.bind("node:renderConnections", @render_connections)
      @model.bind("node:showAnimations", @highlighAnimations)
      @model.bind("node:addSelectedClass", @addSelectedClass)
      
      # Render the node and "post init" the model
      @render()
      @model.post_init()
      
      # Add the node group name as a class to the node element for easier styling
      @$el.addClass("type-" + @model.constructor.group_name)
    
    postInit: () =>
      @$el.data("object", @model)
      @init_context_menu()
    
    render: () =>
      @$el.css
        left: parseInt @model.get("x")
        top: parseInt @model.get("y")
      $(".head span", @$el).text(@model.get("name"))
      $(".head span", @$el).show()
      @
    
    init_context_menu: () ->
      $(".field", this.el).contextMenu {menu: "field-context-menu"}, (action, el, pos) ->
        if action == "remove_connection"
          field = $(el).data("object")
          field.remove_connections()
      return @
    
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
    
    render_connections: () =>
      @model.fields.renderConnections()
    
    compute_node_position: () =>
      pos = $(@el).position()
      offset = $("#container-wrapper").offset()
      @model.set
        x: pos.left + $("#container-wrapper").scrollLeft()
        y: pos.top + $("#container-wrapper").scrollTop()
    
    remove: () =>
      $(".field", this.el).destroyContextMenu()
      $(this.el).draggable("destroy")
      $(this.el).unbind()
      @undelegateEvents()
      @fields_view.remove()
      @fields_view = null
      super
    
    init_el_click: () ->
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
        self.model.fields.render_sidebar()
      return @
    
    init_title_click: () ->
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
    
    make_draggable: () ->
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
            
          self.render_connections()
        stop: () ->
          selected_nodes.not(this).each () ->
            el = $(this).data("object")
            el.trigger("node:renderConnections")
          self.compute_node_position()
          self.render_connections()
      return @
  
  return ThreeNodes.NodeView
