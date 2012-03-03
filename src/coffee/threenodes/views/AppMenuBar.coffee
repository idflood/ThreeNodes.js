define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/app_menubar.tmpl.html",
], ($, _, Backbone, _view_menubar) ->
  "use strict"
  class ThreeNodes.AppMenuBar extends Backbone.View
    @template = _view_menubar
    
    initialize: () ->
      @$el.menubar
        select: @on_menu_select
      
      $("#main_file_input_open").change (e) =>
        ThreeNodes.events.trigger("LoadFile", e)
    
    on_menu_select: (event, ui) =>
      if $('a', ui.item).attr('href') == "#example"
        rel = $('a', ui.item).attr("rel")
        ThreeNodes.events.trigger("ClearWorkspace")
        $.ajax
          url: "examples/#{rel}"
          dataType: 'text'
          success: (data) ->
            ThreeNodes.events.trigger("LoadJSON", data)
        return this
      
      switch ui.item.text().toLowerCase()
        when "new" then ThreeNodes.events.trigger("ClearWorkspace")
        when "open" then $("#main_file_input_open").click()
        when "save" then ThreeNodes.events.trigger("SaveFile")
        when "export to code" then ThreeNodes.events.trigger("ExportCode")
        when "export image" then ThreeNodes.events.trigger("ExportImage", "exported-image.png")
        when "rebuild all shaders" then ThreeNodes.events.trigger("RebuildAllShaders")
        when "remove selected node(s)" then ThreeNodes.events.trigger("RmoveSelectedNodes")
      return this
    