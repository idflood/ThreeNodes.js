define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  var FileSaveTest;
  return FileSaveTest = (function() {
    function FileSaveTest(app) {
      module("File");
      test("JSON save", function() {
        var c1, filehandler, json_string1, n1, n2, ng, parsed_data1, _c1, _n1, _n2;
        ng = app.nodegraph;
        filehandler = app.injector.get("FileHandler");
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Base", "Number", 363, 113);
        n2 = ng.create_node("Base", "Number", 123, 456);
        c1 = new ThreeNodes.NodeConnection(n1.v_out, n2.v_in);
        app.injector.applyContext(c1);
        n1.v_in.set(4);
        ng.render();
        json_string1 = filehandler.get_local_json();
        parsed_data1 = JSON.parse(json_string1);
        console.log(parsed_data1);
        equals(parsed_data1.uid, 7, "Saved the last uid");
        equals(parsed_data1.nodes.length, 2, "Saved 2 nodes");
        equals(parsed_data1.connections.length, 1, "Saved one connection");
        _n1 = parsed_data1.nodes[0];
        equals(_n1.nid, n1.nid, "Node1.nid saved");
        equals(_n1.x, n1.x, "Node1.x saved");
        equals(_n1.y, n1.y, "Node1.x saved");
        _n2 = parsed_data1.nodes[1];
        equals(_n2.nid, n2.nid, "Node1.nid saved");
        equals(_n2.x, n2.x, "Node1.x saved");
        equals(_n2.y, n2.y, "Node1.x saved");
        _c1 = parsed_data1.connections[0];
        equals(_c1.id, c1.cid, "Connection1.cid saved");
        equals(_c1.from, c1.from_field, "Connection1.from_field saved");
        return equals(_c1.to, c1.to_field, "Connection1.to_field saved");
      });
    }
    return FileSaveTest;
  })();
});