var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jQuery', 'Underscore', 'Backbone'], function($, _, Backbone) {
  "use strict";  return ThreeNodes.CodeExporter = (function() {

    function CodeExporter() {
      this.nodeToCode = __bind(this.nodeToCode, this);
      this.toCode = __bind(this.toCode, this);
    }

    CodeExporter.prototype.toCode = function(json) {
      var connection, node, res, _i, _j, _len, _len2, _ref, _ref2;
      res = "//\n";
      res += "// code exported from ThreeNodes.js (github.com/idflood/ThreeNodes.js)\n";
      res += "//\n\n";
      res += "require.config({paths: {jQuery: 'loaders/jquery-loader',Underscore: 'loaders/underscore-loader',Backbone: 'loaders/backbone-loader'}});";
      res += "require(['order!threenodes/App', 'order!libs/jquery-1.6.4.min', 'order!libs/underscore-min', 'order!libs/backbone'], function(App) {";
      res += "\n\n";
      res += '"use strict";\n';
      res += "var app = new App();\n";
      res += "var nodegraph = app.nodegraph;\n\n";
      res += "//\n";
      res += "// nodes\n";
      res += "//\n";
      _ref = json.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        res += this.nodeToCode(node);
      }
      res += "\n";
      res += "//\n";
      res += "// connections\n";
      res += "//\n\n";
      _ref2 = json.connections;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        connection = _ref2[_j];
        res += this.connectionToCode(connection);
      }
      res += "\n\n";
      res += "// set player mode\n";
      res += "app.setDisplayMode('SetDisplayModeCommand', true);\n";
      res += "});";
      return res;
    };

    CodeExporter.prototype.nodeToCode = function(node) {
      var anim_to_code, fields_to_code, res;
      anim_to_code = function(anims) {
        var anim, propName, res, _i, _len, _ref;
        res = "{\n";
        for (propName in anims) {
          res += "\t\t" + ("'" + propName + "' : [\n");
          _ref = anims[propName];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            anim = _ref[_i];
            res += "\t\t\t" + ("{time: " + anim.time + ", value: " + anim.value + ", easing: '" + anim.easing + "'},\n");
          }
          res += "\t\t" + "],\n";
        }
        res += "\t}";
        return res;
      };
      fields_to_code = function(fields) {
        var field, res, _i, _len, _ref;
        res = "{'in': [\n";
        _ref = fields["in"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          if (field.val) {
            res += "\t\t{name: '" + field.name + "', val: " + field.val + "},\n";
          } else {
            res += "\t\t{name: '" + field.name + "'},\n";
          }
        }
        res += "\t]}";
        return res;
      };
      res = "\n// node: " + node.name + "\n";
      res += "var node_" + node.nid + "_data = {\n";
      res += "\t" + ("nid: " + node.nid + ",\n");
      res += "\t" + ("name: '" + node.name + "',\n");
      res += "\t" + ("type: '" + node.type + "',\n");
      res += "\t" + ("x: " + node.x + ",\n");
      res += "\t" + ("y: " + node.y + ",\n");
      res += "\t" + ("fields: " + (fields_to_code(node.fields)) + ",\n");
      res += "\t" + ("anim: " + (anim_to_code(node.anim)) + "\n");
      res += "};\n";
      res += "var node_" + node.nid + " = nodegraph.create_node(node_" + node.nid + "_data);\n";
      return res;
    };

    CodeExporter.prototype.connectionToCode = function(connection) {
      var res;
      res = "var connection_" + connection.id + "_data = {\n";
      res += "\t" + ("id: " + connection.id + ",\n");
      res += "\t" + ("from_node: " + connection.from_node + ", from: '" + connection.from + "',\n");
      res += "\t" + ("to_node: " + connection.to_node + ", to: '" + connection.to + "'\n");
      res += "};\n";
      res += "var connection_" + connection.id + " = nodegraph.createConnectionFromObject(connection_" + connection.id + "_data);\n";
      return res;
    };

    return CodeExporter;

  })();
});
