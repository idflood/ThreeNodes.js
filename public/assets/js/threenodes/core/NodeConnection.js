var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min", 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  return ThreeNodes.NodeConnection = (function() {
    function NodeConnection(from_field, to_field, cid) {
      this.from_field = from_field;
      this.to_field = to_field;
      this.cid = cid != null ? cid : ThreeNodes.Utils.get_uid();
      this.update_node_from = __bind(this.update_node_from, this);
      this.container = $("#graph");
      this.to_field.remove_connections();
    }
    NodeConnection.prototype.onRegister = function() {
      this.line = false;
      this.context.commandMap.execute("AddConnectionCommand", this);
      this.from_field.add_connection(this);
      this.to_field.add_connection(this);
      this.update();
      return this.render();
    };
    NodeConnection.prototype.get_path = function() {
      var diffx, diffy, f1, f2, min_diff, ofx, ofy, x1, x2, x3, x4, y1, y2, y3, y4;
      f1 = this.get_field_position(this.from_field);
      f2 = this.get_field_position(this.to_field);
      ofx = $("#container-wrapper").scrollLeft();
      ofy = $("#container-wrapper").scrollTop();
      x1 = f1.left + ofx;
      y1 = f1.top + ofy;
      x4 = f2.left + ofx;
      y4 = f2.top + ofy;
      min_diff = 42;
      diffx = Math.max(min_diff, x4 - x1);
      diffy = Math.max(min_diff, y4 - y1);
      x2 = x1 + diffx * 0.5;
      y2 = y1;
      x3 = x4 - diffx * 0.5;
      y3 = y4;
      return ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    };
    NodeConnection.prototype.toXML = function() {
      return "\t\t<connection id='" + this.cid + "' from='" + this.from_field.fid + "' to='" + this.to_field.fid + "'/>\n";
    };
    NodeConnection.prototype.update = function() {
      return this.to_field.set(this.from_field.get());
    };
    NodeConnection.prototype.update_node_from = function() {
      return this.from_field.node.update();
    };
    NodeConnection.prototype.get_field_position = function(field) {
      var diff, o1;
      o1 = $("#fid-" + field.fid + " a").offset();
      diff = 3;
      o1.top += diff;
      o1.left += diff;
      if (o1.left === diff && o1.top === diff) {
        o1 = $("#nid-" + field.node.nid).offset();
        o1.top += $("#nid-" + field.node.nid).outerHeight() / 2 + 3;
        if (field.is_output === true) {
          o1.left += $("#nid-" + field.node.nid).outerWidth() - 2;
        }
      }
      return o1;
    };
    NodeConnection.prototype.remove = function() {
      this.from_field.unregister_connection(this);
      this.to_field.unregister_connection(this);
      if (ThreeNodes.svg && this.line) {
        this.line.remove();
        this.line = false;
      }
      this.context.commandMap.execute("RemoveConnectionCommand", this);
      return false;
    };
    NodeConnection.prototype.render = function() {
      var color;
      if (ThreeNodes.svg) {
        if (this.line && this.line.attrs) {
          return this.line.attr({
            path: this.get_path()
          });
        } else {
          color = "#555";
          return this.line = ThreeNodes.svg.path(this.get_path()).attr({
            stroke: color,
            fill: "none"
          });
        }
      }
    };
    return NodeConnection;
  })();
});