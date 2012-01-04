define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  ThreeNodes.NodeView = Backbone.View.extend
    initialize: () ->
      console.log "view init"
    onRegister: () ->
      console.log "view registered"
      #@init_context_menu()
      $(@el).css
        left: @options.x
        top: @options.y
      @make_draggable()
      @init_el_click()
      @init_title_click()
      @make_selectable()
    
    init_context_menu: () ->
      $(".field", this.el).contextMenu {menu: "field-context-menu"}, (action, el, pos) ->
        if action == "remove_connection"
          field = $(el).data("object")
          field.remove_connections()
    
    render_connections: () ->
      @options.rack.render_connections()
    
    compute_node_position: () ->
      pos = $(@el).position()
      this.options.x = pos.left
      this.options.y = pos.top
    
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
        self.options.rack.render_sidebar()
    
    init_title_click: () ->
      self = this
      $(".head span", @el).dblclick (e) ->
        prev = $(this).html()
        $(".head", self.el).append("<input type='text' />")
        $(this).hide()
        $input = $(".head input", self.el)
        $input.val(prev)
        
        apply_input_result = () ->
          $(".head span", self.el).html($input.val()).show()
          self.options.name = $input.val()
          $input.remove()
        
        $input.blur (e) ->
          apply_input_result()
        
        $("#graph").click (e) ->
          apply_input_result()
        
        $input.keydown (e) ->
          # on enter
          if e.keyCode == 13
            apply_input_result()
    
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
            el.data("object").view.render_connections()
            el.data("object").view.compute_node_position()
          self.render_connections()
        stop: () ->
          ThreeNodes.selected_nodes.not(this).each () ->
            el = $(this).data("object")
            el.render_connections()
          self.compute_node_position()
          self.render_connections()
  
    make_selectable: () ->
      self = this
      $("#container").selectable
        filter: ".node"
        stop: (event, ui) =>
          $selected = $(".node.ui-selected")
          nodes = []
          $selected.each () ->
            nodes.push($(this).data("object").anim)
          self.options.apptimeline.timeline.selectAnims(nodes)
  
  return ThreeNodes.NodeView
