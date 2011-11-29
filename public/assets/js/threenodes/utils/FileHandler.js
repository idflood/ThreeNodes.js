var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "order!libs/BlobBuilder.min", "order!libs/FileSaver.min", "order!libs/json2"], function($, _, Backbone) {
  return ThreeNodes.FileHandler = (function() {
    function FileHandler() {
      this.load_local_file_input_changed = __bind(this.load_local_file_input_changed, this);
      this.load_from_xml_data = __bind(this.load_from_xml_data, this);
      this.load_from_json_data = __bind(this.load_from_json_data, this);
      this.get_local_xml = __bind(this.get_local_xml, this);
      this.get_local_json = __bind(this.get_local_json, this);
      this.save_local_file = __bind(this.save_local_file, this);
    }
    FileHandler.prototype.save_local_file = function() {
      var bb, fileSaver, result_string;
      bb = new BlobBuilder();
      result_string = this.get_local_json();
      bb.append(result_string);
      return fileSaver = saveAs(bb.getBlob("text/plain;charset=utf-8"), "nodes.json");
    };
    FileHandler.prototype.get_local_json = function() {
      var nodegraph, res;
      nodegraph = this.context.injector.get("NodeGraph");
      res = {
        uid: ThreeNodes.uid,
        nodes: jQuery.map(nodegraph.nodes, function(n, i) {
          return n.toJSON();
        }),
        connections: jQuery.map(nodegraph.node_connections, function(c, i) {
          return c.toJSON();
        })
      };
      return JSON.stringify(res);
    };
    FileHandler.prototype.get_local_xml = function() {
      var c, node, nodegraph, res, _i, _j, _len, _len2, _ref, _ref2;
      nodegraph = this.context.injector.get("NodeGraph");
      res = "";
      res += '<?xml version="1.0" encoding="UTF-8"?>\n';
      res += "<app>\n";
      res += "\t<uid last='" + ThreeNodes.uid + "' />\n";
      res += "\t<nodes>\n";
      _ref = nodegraph.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        res += node.toXML();
      }
      res += "\t</nodes>\n";
      res += "\t<connections>\n";
      _ref2 = nodegraph.node_connections;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        c = _ref2[_j];
        res += c.toXML();
      }
      res += "\t</connections>\n";
      res += "</app>";
      return res;
    };
    FileHandler.prototype.load_from_json_data = function(txt) {
      var c, component, connection, from, from_node, loaded_data, n, node, nodegraph, to, to_node, _i, _j, _len, _len2, _ref, _ref2;
      nodegraph = this.context.injector.get("NodeGraph");
      loaded_data = JSON.parse(txt);
      _ref = loaded_data.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        component = nodegraph.get_component_by_type(node.type);
        n = nodegraph.create_node(component, node.type, node.x, node.y, false, node);
      }
      _ref2 = loaded_data.connections;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        connection = _ref2[_j];
        from_node = nodegraph.get_node(connection.from_node.toString());
        from = from_node.rack.node_fields_by_name.outputs[connection.from.toString()];
        to_node = nodegraph.get_node(connection.to_node.toString());
        to = to_node.rack.node_fields_by_name.inputs[connection.to.toString()];
        c = new ThreeNodes.NodeConnection(from, to, connection.id);
        this.context.injector.applyContext(c);
      }
      return ThreeNodes.uid = loaded_data.uid;
    };
    FileHandler.prototype.load_from_xml_data = function(txt) {
      var loaded_data, nodegraph;
      nodegraph = this.context.injector.get("NodeGraph");
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
        from = ThreeNodes.nodes.fields[from.toString()];
        to = ThreeNodes.nodes.fields[to.toString()];
        c = new NodeConnection(from, to, cid);
        return this.context.injector.applyContext(c);
      });
      return ThreeNodes.uid = parseInt($("uid", loaded_data).attr("last"));
    };
    FileHandler.prototype.load_local_file_input_changed = function(e) {
      var file, nodegraph, reader, self;
      this.context.commandMap.execute("ClearWorkspaceCommand");
      nodegraph = this.context.injector.get("NodeGraph");
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