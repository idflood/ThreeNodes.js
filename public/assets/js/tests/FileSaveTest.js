define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  "use strict";
  var FileSaveTest;
  return FileSaveTest = (function() {
    function FileSaveTest(app) {
      module("File");
      test("JSON save", function() {
        var c1, c2, filehandler, json_string, n1, n2, n3, ng, parsed_data1, _c1, _n1, _n2;
        ng = app.nodegraph;
        filehandler = app.injector.get("FileHandler");
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Number", 363, 113);
        n2 = ng.create_node("Number", 123, 456);
        c1 = ng.connections.create({
          from_field: n1.v_out,
          to_field: n2.v_in
        });
        n1.v_in.set(4);
        ng.render();
        json_string = filehandler.get_local_json();
        parsed_data1 = JSON.parse(json_string);
        equals(parsed_data1.uid, 7, "Saved the last uid");
        equals(parsed_data1.nodes.length, 2, "Saved 2 nodes");
        equals(parsed_data1.connections.length, 1, "Saved one connection");
        _n1 = parsed_data1.nodes[0];
        equals(_n1.nid, n1.model.get('nid'), "Node1.nid saved");
        equals(_n1.x, n1.model.get('x'), "Node1.x saved");
        equals(_n1.y, n1.model.get('y'), "Node1.x saved");
        _n2 = parsed_data1.nodes[1];
        equals(_n2.nid, n2.model.get('nid'), "Node1.nid saved");
        equals(_n2.x, n2.model.get('x'), "Node1.x saved");
        equals(_n2.y, n2.model.get('y'), "Node1.x saved");
        _c1 = parsed_data1.connections[0];
        equals(_c1.id, c1.get("cid"), "Connection1.cid saved");
        equals(_c1.from, c1.from_field.name, "Connection1.from_field saved");
        equals(_c1.to, c1.to_field.name, "Connection1.to_field saved");
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Scene");
        n2 = ng.create_node("WebGLRenderer");
        c1 = ng.connections.create({
          from_field: n1.rack.get("out", true),
          to_field: n2.rack.get("scene")
        });
        ng.render();
        json_string = filehandler.get_local_json();
        parsed_data1 = JSON.parse(json_string);
        equals(parsed_data1.nodes.length, 2, "Saved 2 nodes");
        equals(parsed_data1.connections.length, 1, "Saved one connection");
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Scene");
        n2 = ng.create_node("Merge");
        n3 = ng.create_node("ThreeMesh");
        c1 = ng.connections.create({
          from_field: n2.rack.get("out", true),
          to_field: n1.rack.get("children")
        });
        c2 = ng.connections.create({
          from_field: n3.rack.get("out", true),
          to_field: n2.rack.get("in0")
        });
        ng.render();
        json_string = filehandler.get_local_json();
        parsed_data1 = JSON.parse(json_string);
        return equals(parsed_data1.nodes.length, 3, "Saved 3 nodes (cyclic value)");
      });
    }
    return FileSaveTest;
  })();
});