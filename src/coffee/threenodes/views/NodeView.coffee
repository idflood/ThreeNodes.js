define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  'order!threenodes/views/NodeFieldRackView',
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  ### Node View ###
  
  class ThreeNodes.NodeView extends Backbone.View
    @template = _view_node_template
        
    initialize: () ->
      @make_draggable()
      @init_el_click()
      @init_title_click()
      
      @rack_view = new ThreeNodes.NodeFieldRackView
        node: @model
        collection: @model.rack
        el: $(".options", @el)
        node_el: @$el
      
      @model.bind('change', @render)
      @model.bind('postInit', @postInit)
      @model.bind('remove', () => @remove())
      @model.bind("node:computePosition", @compute_node_position)
      @model.bind("node:renderConnections", @render_connections)
      @model.bind("node:showAnimations", @highlighAnimations)
      @render()
      @model.post_init()
      @
    
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
    
    render_connections: () =>
      @model.rack.renderConnections()
    
    compute_node_position: () =>
      pos = $(@el).position()
      offset = $("#container-wrapper").offset()
      @model.setPosition(pos.left + $("#container-wrapper").scrollLeft(), pos.top + $("#container-wrapper").scrollTop())
    
    remove: () =>
      $(".field", this.el).destroyContextMenu()
      $(this.el).draggable("destroy")
      $(this.el).unbind()
      @undelegateEvents()
      @rack_view.remove()
      @rack_view = null
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
        self.model.rack.render_sidebar()
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
          self.model.setName($input.val())
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
      $(this.el).draggable
        start: (ev, ui) ->
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
            el.data("object").trigger("node:computePosition")
            el.data("object").trigger("node:renderConnections")
            
          self.render_connections()
        stop: () ->
          ThreeNodes.selected_nodes.not(this).each () ->
            el = $(this).data("object")
            el.trigger("node:renderConnections")
          self.compute_node_position()
          self.render_connections()
      return @
  
  return ThreeNodes.NodeView
