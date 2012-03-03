var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/app_menubar.tmpl.html"], function($, _, Backbone, _view_menubar) {
  "use strict";  return ThreeNodes.AppMenuBar = (function(_super) {

    __extends(AppMenuBar, _super);

    function AppMenuBar() {
      this.on_menu_select = __bind(this.on_menu_select, this);
      AppMenuBar.__super__.constructor.apply(this, arguments);
    }

    AppMenuBar.template = _view_menubar;

    AppMenuBar.prototype.initialize = function() {
      var _this = this;
      this.$el.menubar({
        select: this.on_menu_select
      });
      return $("#main_file_input_open").change(function(e) {
        return ThreeNodes.events.trigger("LoadFile", e);
      });
    };

    AppMenuBar.prototype.on_menu_select = function(event, ui) {
      var rel;
      if ($('a', ui.item).attr('href') === "#example") {
        rel = $('a', ui.item).attr("rel");
        ThreeNodes.events.trigger("ClearWorkspace");
        $.ajax({
          url: "examples/" + rel,
          dataType: 'text',
          success: function(data) {
            return ThreeNodes.events.trigger("LoadJSON", data);
          }
        });
        return this;
      }
      switch (ui.item.text().toLowerCase()) {
        case "new":
          ThreeNodes.events.trigger("ClearWorkspace");
          break;
        case "open":
          $("#main_file_input_open").click();
          break;
        case "save":
          ThreeNodes.events.trigger("SaveFile");
          break;
        case "export to code":
          ThreeNodes.events.trigger("ExportCode");
          break;
        case "export image":
          ThreeNodes.events.trigger("ExportImage", "exported-image.png");
          break;
        case "rebuild all shaders":
          ThreeNodes.events.trigger("RebuildAllShaders");
          break;
        case "remove selected node(s)":
          ThreeNodes.events.trigger("RmoveSelectedNodes");
      }
      return this;
    };

    return AppMenuBar;

  })(Backbone.View);
});
