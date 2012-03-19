define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/app_menubar.tmpl.html",
], ($, _, Backbone, _view_menubar) ->
  "use strict"
  class ThreeNodes.MenuBar extends Backbone.View
    @template = _view_menubar
    
    initialize: () ->
      @$el.menubar()
      
      self = this
      $("a", @$el).click (event) ->
        if $(this).next().is("ul")
          return false
        
        url = $(this).attr('href').substr(1)
        self.on_link_click(event, this, url)
      
      $("#main_file_input_open").change (e) =>
        ThreeNodes.events.trigger("LoadFile", e)
    
    on_link_click: (event, link, url) =>
      is_exception = switch $(link).text().toLowerCase()
        when "new"
          ThreeNodes.events.trigger("ClearWorkspace")
          Backbone.history.navigate("", false)
          true
        when "open"
          $("#main_file_input_open").click()
          true
        when "save"
          ThreeNodes.events.trigger("SaveFile")
          true
        when "export to code"
          ThreeNodes.events.trigger("ExportCode")
          true
        when "export image"
          ThreeNodes.events.trigger("ExportImage", "exported-image.png")
          true
        when "rebuild all shaders"
          ThreeNodes.events.trigger("RebuildAllShaders")
          true
        when "group selected nodes"
          ThreeNodes.events.trigger("GroupSelectedNodes")
          true
        when "remove selected node(s)"
          ThreeNodes.events.trigger("RmoveSelectedNodes")
          true
        else false
      
      if is_exception == true
        event.preventDefault()
        return true
      
      # sends "normal" urls to the router
      return true
    