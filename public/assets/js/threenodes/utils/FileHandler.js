var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/utils/CodeExporter', "order!libs/BlobBuilder.min", "order!libs/FileSaver.min", "order!libs/json2"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.FileHandler = (function() {

    function FileHandler(nodes) {
      this.nodes = nodes;
      this.load_local_file = __bind(this.load_local_file, this);
      this.load_from_xml_data = __bind(this.load_from_xml_data, this);
      this.load_from_json_data = __bind(this.load_from_json_data, this);
      this.get_local_xml = __bind(this.get_local_xml, this);
      this.get_local_json = __bind(this.get_local_json, this);
      this.export_code = __bind(this.export_code, this);
      this.save_local_file = __bind(this.save_local_file, this);
      _.extend(FileHandler.prototype, Backbone.Events);
    }

    FileHandler.prototype.save_local_file = function() {
      var bb, fileSaver, result_string;
      bb = new BlobBuilder();
      result_string = this.get_local_json();
      bb.append(result_string);
      return fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.json");
    };

    FileHandler.prototype.export_code = function() {
      var bb, exporter, fileSaver, json, res;
      json = this.get_local_json(false);
      exporter = new ThreeNodes.CodeExporter();
      res = exporter.toCode(json);
      bb = new BlobBuilder();
      bb.append(res);
      return fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.js");
    };

    FileHandler.prototype.get_local_json = function(stringify) {
      var res;
      if (stringify == null) stringify = true;
      res = {
        uid: ThreeNodes.uid,
        nodes: jQuery.map(this.nodes.models, function(n, i) {
          return n.toJSON();
        }),
        connections: jQuery.map(this.nodes.connections.models, function(c, i) {
          return c.toJSON();
        })
      };
      if (stringify) {
        return JSON.stringify(res);
      } else {
        return res;
      }
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
        n = this.nodes.create_node(node);
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
        return n = this.nodes.create_node($this);
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

    FileHandler.prototype.load_local_file = function(e) {
      var file, reader, self;
      this.trigger("ClearWorkspace");
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

  })();
});
