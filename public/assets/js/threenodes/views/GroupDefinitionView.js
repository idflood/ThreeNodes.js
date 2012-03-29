var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "text!templates/definition.tmpl.html", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_template) {
  "use strict";
  /* Node View
  */  return ThreeNodes.GroupDefinitionView = (function(_super) {

    __extends(GroupDefinitionView, _super);

    function GroupDefinitionView() {
      GroupDefinitionView.__super__.constructor.apply(this, arguments);
    }

    GroupDefinitionView.template = _view_template;

    GroupDefinitionView.prototype.initialize = function() {
      this.$el.draggable({
        revert: "valid",
        opacity: 0.7,
        helper: "clone",
        revertDuration: 0,
        scroll: false,
        containment: "document"
      });
      return this.$el.data("model", this.model);
    };

    return GroupDefinitionView;

  })(Backbone.View);
});
