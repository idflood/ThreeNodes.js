define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/app_menubar.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
], ($, _, Backbone, _view_menubar) ->
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
      @context.commandMap.execute("ClearWorkspaceCommand")
      if $('a', ui.item).attr('href') == "#example"
        rel = $('a', ui.item).attr("rel")
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
        when "rebuild shaders" then @context.commandMap.execute("RebuildShadersCommand")
