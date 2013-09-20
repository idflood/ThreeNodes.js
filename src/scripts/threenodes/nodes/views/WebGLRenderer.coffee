define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  require 'cs!threenodes/models/Node'
  require 'cs!threenodes/views/NodeView'

  namespace "ThreeNodes.nodes.views",
    WebGLRenderer: class WebGLRenderer extends ThreeNodes.NodeView
      initialize: (options) =>
        super

        @preview_mode = true
        @creating_popup = false
        @win = false
        @old_bg = false

        $("body").append("<div id='webgl-window'></div>")
        @webgl_container = $("#webgl-window")

        @apply_size()
        @apply_bg_color()
        @add_mouse_handler()

        @model.on("on_compute", @update)

        @webgl_container.bind "click", (e) =>
          if @model.settings.player_mode == false
            @create_popup_view()
        #@update()

      update: () =>
        # help fix asynchronous bug with firefox when opening popup
        if @creating_popup == true && !@win
          return

        @creating_popup = false
        if @win != false
          if @win.closed && @preview_mode == false
            @preview_mode = true
            @win = false
        if !@model.settings.test
          @add_renderer_to_dom()

        @apply_size()
        @apply_bg_color()

      remove: () =>
        if @win && @win != false
          @win.close()

        @webgl_container.unbind()
        @webgl_container.remove()

        delete @webgl_container
        delete @win
        super

      add_mouse_handler: =>
        $(@model.ob.domElement).unbind("mousemove")
        $(@model.ob.domElement).bind "mousemove", (e) ->
          ThreeNodes.renderer.mouseX = e.clientX
          ThreeNodes.renderer.mouseY = e.clientY
        return this

      create_popup_view: =>
        @preview_mode = false
        @creating_popup = true

        w = @model.fields.getField('width').getValue()
        h = @model.fields.getField('height').getValue()

        @win = window.open('', 'win' + @model.nid, "width=#{w},height=#{h},scrollbars=false,location=false,status=false,menubar=false")
        $("body", $(@win.document)).append( @model.ob.domElement )
        $("*", $(@win.document)).css
          padding: 0
          margin: 0
        @apply_bg_color(true)
        @apply_size(true)
        @add_mouse_handler()
        return this

      create_preview_view: =>
        @preview_mode = true
        @webgl_container.append( @model.ob.domElement )
        @apply_bg_color(true)
        @apply_size(true)
        @add_mouse_handler()
        return this

      add_renderer_to_dom: =>
        if @preview_mode && $("canvas", @webgl_container).length == 0
          @create_preview_view()
        if @preview_mode == false && @win == false
          @create_popup_view()
        return this

      apply_bg_color: (force_refresh = false) ->
        new_val = @model.fields.getField('bg_color').getValue().getContextStyle()

        if @old_bg == new_val && force_refresh == false
          return false

        @model.ob.setClearColor( @model.fields.getField('bg_color').getValue(), 1 )
        @webgl_container.css
          background: new_val

        if @win
          $(@win.document.body).css
            background: new_val

        @old_bg = new_val

      apply_size: (force_refresh = false) =>
        w = @model.fields.getField('width').getValue()
        h = @model.fields.getField('height').getValue()
        dw = w
        dh = h
        if @win == false && @model.settings.player_mode == false
          maxw = 220
          r = w / h
          dw = maxw
          dh = dw / r
        if dw != @model.width || dh != @model.height || force_refresh
          @model.ob.setSize(dw, dh)
          if @win && @win != false
            console.log "..."
            # todo: implement the same with ".innerWidth =" and ".innerHeight =" when chrome support this
            # resize to beacame buggy on some chrome versions
            #@win.resizeTo(dw, dh + 52)
        @model.width = dw
        @model.height = dh
