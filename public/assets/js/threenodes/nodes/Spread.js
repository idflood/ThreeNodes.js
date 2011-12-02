var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  return ThreeNodes.nodes.types.Spread.RandomSpread = (function() {
    __extends(RandomSpread, ThreeNodes.NodeBase);
    function RandomSpread() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      RandomSpread.__super__.constructor.apply(this, arguments);
    }
    RandomSpread.prototype.set_fields = function() {
      RandomSpread.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rnd = false;
      this.value = false;
      this.seed = false;
      this.count = false;
      this.width = false;
      this.offset = false;
      this.rack.addFields({
        inputs: {
          "count": 1,
          "seed": 1,
          "width": 1,
          "offset": 0
        },
        outputs: {
          "out": 0
        }
      });
      return this.v_out = this.rack.get("out", true);
    };
    RandomSpread.prototype.compute = function() {
      var i, needs_rebuild, offset, width, _ref;
      needs_rebuild = false;
      if (this.seed !== this.rack.get("seed").val || this.count !== this.rack.get("count").val || this.width !== this.rack.get("width").val || this.offset !== this.rack.get("offset").val) {
        this.seed = this.rack.get("seed").val;
        this.rnd = new ThreeNodes.Utils.Rc4Random(this.seed.toString());
        this.value = [];
        width = this.rack.get("width").get(0);
        offset = this.rack.get("offset").get(0);
        for (i = 0, _ref = this.rack.get("count").get(0); 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          this.value[i] = this.rnd.getRandomNumber() * width - width / 2 + offset;
        }
      }
      return this.rack.set("out", this.value);
    };
    return RandomSpread;
  })();
});