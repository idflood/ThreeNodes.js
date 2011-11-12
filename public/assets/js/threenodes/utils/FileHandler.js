var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "libs/BlobBuilder.min", "libs/FileSaver.min"], function($, _, Backbone) {
  return ThreeNodes.FileHandler = (function() {
    function FileHandler() {
      this.load_local_file_input_changed = __bind(this.load_local_file_input_changed, this);
      this.save_local_file = __bind(this.save_local_file, this);
    }
    FileHandler.prototype.save_local_file = function() {
      var bb, c, fileSaver, node, _i, _j, _len, _len2, _ref;
      bb = new BlobBuilder();
      bb.append('<?xml version="1.0" encoding="UTF-8"?>\n');
      bb.append("<app>\n");
      bb.append("\t<uid last='" + uid + "' />\n");
      bb.append("\t<nodes>\n");
      _ref = nodegraph.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        bb.append(node.toXML());
      }
      bb.append("\t</nodes>\n");
      bb.append("\t<connections>\n");
      for (_j = 0, _len2 = node_connections.length; _j < _len2; _j++) {
        c = node_connections[_j];
        bb.append(c.toXML());
      }
      bb.append("\t</connections>\n");
      bb.append("</app>");
      return fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.xml");
    };
    FileHandler.prototype.load_local_file_input_changed = function(e) {
      var file, reader;
      clear_workspace();
      file = this.files[0];
      reader = new FileReader();
      reader.onload = function(e) {
        var loaded_data, txt, uid;
        txt = e.target.result;
        loaded_data = $(txt);
        $("node", loaded_data).each(function() {
          var $this, component, n, nid, type, x, y;
          $this = $(this);
          x = parseInt($this.attr("x"));
          y = parseInt($this.attr("y"));
          nid = parseInt($this.attr("nid"));
          type = $this.attr("type");
          component = nodegraph.get_component_by_type(type);
          return n = nodegraph.create_node(component, type, x, y, $this);
        });
        $("connection", loaded_data).each(function() {
          var $this, c, cid, from, to;
          $this = $(this);
          from = parseInt($this.attr("from"));
          to = parseInt($this.attr("to"));
          cid = parseInt($this.attr("id"));
          from = nodes.fields[from.toString()];
          to = nodes.fields[to.toString()];
          return c = new NodeConnection(from, to, cid);
        });
        return uid = parseInt($("uid", loaded_data).attr("last"));
      };
      return reader.readAsText(file, "UTF-8");
    };
    return FileHandler;
  })();
});