var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/utils/Utils', 'order!threenodes/models/GroupDefinition'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.nodes.Group = (function(_super) {

    __extends(Group, _super);

    function Group() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      Group.__super__.constructor.apply(this, arguments);
    }

    Group.node_name = 'Group';

    Group.group_name = false;

    Group.prototype.set_fields = function() {
      return Group.__super__.set_fields.apply(this, arguments);
    };

    Group.prototype.compute = function() {
      return this;
    };

    return Group;

  })(ThreeNodes.NodeBase);
});
