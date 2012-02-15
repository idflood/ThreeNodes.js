var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/app_menubar.tmpl.html", "order!libs/jquery.tmpl.min"], function($, _, Backbone, _view_menubar) {
  "use strict";  return ThreeNodes.AppMenuBar = (function() {

    function AppMenuBar() {
      this.on_menu_select = __bind(this.on_menu_select, this);
      var menu_bar_view, self;
      menu_bar_view = $.tmpl(_view_menubar, {});
      $("body").prepend(menu_bar_view);
      $("#main-menu-bar").menubar({
        select: this.on_menu_select
      });
      self = this;
      $("#main_file_input_open").change(function(e) {
        return self.context.commandMap.execute("LoadLocalFileCommand", e);
      });
    }

    AppMenuBar.prototype.on_menu_select = function(event, ui) {
      var fh, rel;
      fh = this.context.injector.get("FileHandler");
      if ($('a', ui.item).attr('href') === "#example") {
        rel = $('a', ui.item).attr("rel");
        this.context.commandMap.execute("ClearWorkspaceCommand");
        $.ajax({
          url: "examples/" + rel,
          dataType: 'text',
          success: function(data) {
            return fh.load_from_json_data(data);
          }
        });
        return false;
      }
      switch (ui.item.text().toLowerCase()) {
        case "new":
          return this.context.commandMap.execute("ClearWorkspaceCommand");
        case "open":
          return $("#main_file_input_open").click();
        case "save":
          return this.context.commandMap.execute("SaveFileCommand");
        case "export to code":
          return this.context.commandMap.execute("ExportCodeCommand");
        case "export image":
          return this.context.commandMap.execute("ExportImageCommand", "exported-image.png");
        case "rebuild all shaders":
          return this.context.commandMap.execute("RebuildShadersCommand");
        case "remove selected node(s)":
          return this.context.commandMap.execute("RemoveSelectedNodesCommand");
      }
    };

    return AppMenuBar;

  })();
});
