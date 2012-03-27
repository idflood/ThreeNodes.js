var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/app_menubar.tmpl.html"], function($, _, Backbone, _view_menubar) {
  "use strict";  return ThreeNodes.MenuBar = (function(_super) {

    __extends(MenuBar, _super);

    function MenuBar() {
      this.on_link_click = __bind(this.on_link_click, this);
      MenuBar.__super__.constructor.apply(this, arguments);
    }

    MenuBar.template = _view_menubar;

    MenuBar.prototype.initialize = function() {
      var self,
        _this = this;
      this.$el.menubar();
      self = this;
      $("a", this.$el).click(function(event) {
        var url;
        if ($(this).next().is("ul")) return false;
        url = $(this).attr('href').substr(1);
        return self.on_link_click(event, this, url);
      });
      return $("#main_file_input_open").change(function(e) {
        return _this.trigger("LoadFile", e);
      });
    };

    MenuBar.prototype.on_link_click = function(event, link, url) {
      var data_attr, data_event;
      data_event = $(link).data("event");
      data_attr = $(link).data("eventData");
      if (data_event) {
        this.trigger(data_event, data_attr);
        switch (data_event) {
          case "ClearWorkspace":
            Backbone.history.navigate("", false);
            break;
          case "OpenFile":
            $("#main_file_input_open").click();
        }
        return true;
      }
      return true;
    };

    return MenuBar;

  })(Backbone.View);
});
