var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "order!libs/BlobBuilder.min", "order!libs/FileSaver.min", "order!libs/json2"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.FileHandler = (function(_super) {

    __extends(FileHandler, _super);

    function FileHandler(nodes) {
      this.nodes = nodes;
      this.load_local_file_input_changed = __bind(this.load_local_file_input_changed, this);
      this.load_from_xml_data = __bind(this.load_from_xml_data, this);
      this.load_from_json_data = __bind(this.load_from_json_data, this);
      this.get_local_xml = __bind(this.get_local_xml, this);
      this.get_local_json = __bind(this.get_local_json, this);
      this.export_code = __bind(this.export_code, this);
      this.save_local_file = __bind(this.save_local_file, this);
      ThreeNodes.events.on("SaveFile", this.save_local_file);
      ThreeNodes.events.on("ExportCode", this.export_code);
      ThreeNodes.events.on("LoadFile", this.load_local_file_input_changed);
      ThreeNodes.events.on("LoadJSON", this.load_from_json_data);
    }

    FileHandler.prototype.save_local_file = function() {
      var bb, fileSaver, result_string;
      bb = new BlobBuilder();
      result_string = this.get_local_json();
      bb.append(result_string);
      return fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.json");
    };

    FileHandler.prototype.export_code = function() {
      var bb, c, fileSaver, node, res, _i, _j, _len, _len2, _ref, _ref2;
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
      _ref = this.nodes.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        res += node.toCode();
      }
      res += "\n";
      res += "//\n";
      res += "// connections\n";
      res += "//\n\n";
      _ref2 = this.nodes.connections.models;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        c = _ref2[_j];
        res += c.toCode();
      }
      res += "\n\n";
      res += "// set player mode\n";
      res += "ThreeNodes.events.trigger('SetDisplayModeCommand', true);\n";
      res += "});";
      bb = new BlobBuilder();
      bb.append(res);
      return fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.js");
    };

    FileHandler.prototype.get_local_json = function() {
      var res;
      res = {
        uid: ThreeNodes.uid,
        nodes: jQuery.map(this.nodes.models, function(n, i) {
          return n.toJSON();
        }),
        connections: jQuery.map(this.nodes.connections.models, function(c, i) {
          return c.toJSON();
        })
      };
      return JSON.stringify(res);
    };

    FileHandler.prototype.get_local_xml = function() {
      var c, node, res, _i, _j, _len, _len2, _ref, _ref2;
      res = "";
      res += '<?xml version="1.0" encoding="UTF-8"?>\n';
      res += "<app>\n";
      res += "\t<uid last='" + ThreeNodes.uid + "' />\n";
      res += "\t<nodes>\n";
      _ref = this.nodes.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        res += node.toXML();
      }
      res += "\t</nodes>\n";
      res += "\t<connections>\n";
      _ref2 = this.nodes.connections.models;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        c = _ref2[_j];
        res += c.toXML();
      }
      res += "\t</connections>\n";
      res += "</app>";
      return res;
    };

    FileHandler.prototype.load_from_json_data = function(txt) {
      var connection, delay, loaded_data, n, node, _i, _j, _len, _len2, _ref, _ref2,
        _this = this;
      loaded_data = JSON.parse(txt);
      _ref = loaded_data.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        n = this.nodes.create_node(node.type, node.x, node.y, false, node);
      }
      _ref2 = loaded_data.connections;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        connection = _ref2[_j];
        this.nodes.createConnectionFromObject(connection);
      }
      ThreeNodes.uid = loaded_data.uid;
      delay = function(ms, func) {
        return setTimeout(func, ms);
      };
      return delay(1, function() {
        return _this.nodes.renderAllConnections();
      });
    };

    FileHandler.prototype.load_from_xml_data = function(txt) {
      var loaded_data;
      loaded_data = $(txt);
      $("node", loaded_data).each(function() {
        var $this, n, nid, type, x, y;
        $this = $(this);
        x = parseInt($this.attr("x"));
        y = parseInt($this.attr("y"));
        nid = parseInt($this.attr("nid"));
        type = $this.attr("type");
        return n = this.nodes.create_node(type, x, y, $this);
      });
      $("connection", loaded_data).each(function() {
        var $this, c, cid, from, to;
        $this = $(this);
        from = parseInt($this.attr("from"));
        to = parseInt($this.attr("to"));
        cid = parseInt($this.attr("id"));
        from = ThreeNodes.nodes.fields[from.toString()];
        to = ThreeNodes.nodes.fields[to.toString()];
        return c = this.nodes.connections.create({
          from_field: from,
          to_field: to,
          cid: cid
        });
      });
      return ThreeNodes.uid = parseInt($("uid", loaded_data).attr("last"));
    };

    FileHandler.prototype.load_local_file_input_changed = function(e) {
      var file, reader, self;
      ThreeNodes.events.trigger("ClearWorkspace");
      file = e.target.files[0];
      reader = new FileReader();
      self = this;
      reader.onload = function(e) {
        var txt;
        txt = e.target.result;
        return self.load_from_json_data(txt);
      };
      return reader.readAsText(file, "UTF-8");
    };

    return FileHandler;

  })(Backbone.Events);
});
