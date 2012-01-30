define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/app_menubar.tmpl.html",
  "order!libs/jquery.tmpl.min",
], ($, _, Backbone, _view_menubar) ->
  "use strict"
  class ThreeNodes.AppMenuBar
    constructor: () ->
      menu_bar_view = $.tmpl(_view_menubar, {})
      $("body").prepend(menu_bar_view)
      $("#main-menu-bar").menubar
        select: @on_menu_select
      
      self = this
      $("#main_file_input_open").change (e) ->
        self.context.commandMap.execute("LoadLocalFileCommand", e)
    
    on_menu_select: (event, ui) =>
      fh = @context.injector.get("FileHandler")
      
      if $('a', ui.item).attr('href') == "#example"
        rel = $('a', ui.item).attr("rel")
        @context.commandMap.execute("ClearWorkspaceCommand")
        $.ajax
          url: "examples/#{rel}"
          dataType: 'text'
          success: (data) ->
            fh.load_from_json_data(data)
        return false
      
      switch ui.item.text().toLowerCase()
        when "new" then @context.commandMap.execute("ClearWorkspaceCommand")
        when "open" then $("#main_file_input_open").click()
        when "save" then @context.commandMap.execute("SaveFileCommand")
        when "export to code" then @context.commandMap.execute("ExportCodeCommand")
        when "export image" then @context.commandMap.execute("ExportImageCommand")
        when "rebuild all shaders" then @context.commandMap.execute("RebuildShadersCommand")
        when "remove selected node(s)" then @context.commandMap.execute("RemoveSelectedNodesCommand")
