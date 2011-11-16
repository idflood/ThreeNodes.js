define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  var FileLoadTest;
  return FileLoadTest = (function() {
    function FileLoadTest(app) {
      module("File");
      test("JSON loader", function() {
        var c1, filehandler, json_string1, json_string2, n1, n2, ng;
        ng = app.nodegraph;
        filehandler = app.injector.get("FileHandler");
        app.commandMap.execute("ClearWorkspaceCommand");
        n1 = ng.create_node("Base", "Number", 363, 113);
        n2 = ng.create_node("Base", "Number", 0, 0);
        c1 = new ThreeNodes.NodeConnection(n1.v_out, n2.v_in);
        app.injector.applyContext(c1);
        n1.v_in.set(4);
        ng.render();
        json_string1 = filehandler.get_local_json();
        app.commandMap.execute("ClearWorkspaceCommand");
        filehandler.load_from_json_data(json_string1);
        ng.render();
        equals(ng.nodes.length, 2, "The 2 nodes are created in the nodegraph");
        equals(ng.node_connections.length, 1, "A connection has been created");
        equals(ng.nodes[0].x, 363, "node1.x has been set");
        equals(ng.nodes[0].y, 113, "node1.y has been set");
        equals(ng.nodes[0].v_in.get(), 4, "The first node input has been set to 4");
        equals(ng.nodes[1].v_out.get(), 4, "The second node has been connected and the output is 4");
        app.commandMap.execute("ClearWorkspaceCommand");
        json_string2 = '{"uid":38,"nodes":[{"nid":1,"type":"Vector3","x":448,"y":217,"fields":{"in":[{"fid":2,"val":false},{"fid":3,"val":1},{"fid":4,"val":2},{"fid":5,"val":3}],"out":[{"fid":6,"val":{"x":1,"y":2,"z":3}},{"fid":7,"val":1},{"fid":8,"val":2},{"fid":9,"val":3}]}},{"nid":10,"type":"Add","x":653,"y":184,"fields":{"in":[{"fid":11,"val":1},{"fid":13,"val":2}],"out":[{"fid":12,"val":3}]}},{"nid":16,"type":"Number","x":784,"y":248,"fields":{"in":[{"fid":17,"val":3}],"out":[{"fid":18,"val":3}]}},{"nid":20,"type":"Add","x":959,"y":297,"fields":{"in":[{"fid":21,"val":3},{"fid":23,"val":3}],"out":[{"fid":22,"val":6}]}},{"nid":26,"type":"Number","x":1060,"y":309,"fields":{"in":[{"fid":27,"val":6}],"out":[{"fid":28,"val":6}]}},{"nid":30,"type":"Mult","x":622,"y":383,"fields":{"in":[{"fid":31,"val":3},{"fid":33,"val":0.5}],"out":[{"fid":32,"val":1.5}]}},{"nid":35,"type":"Number","x":833,"y":454,"fields":{"in":[{"fid":36,"val":1.5}],"out":[{"fid":37,"val":1.5}]}}],"connections":[{"id":14,"from":7,"to":11},{"id":15,"from":8,"to":13},{"id":19,"from":12,"to":17},{"id":24,"from":9,"to":23},{"id":25,"from":18,"to":21},{"id":29,"from":22,"to":27},{"id":34,"from":9,"to":31},{"id":38,"from":32,"to":36}]}';
        filehandler.load_from_json_data(json_string2);
        ng.render();
        equals(ng.nodes.length, 7, "The 7 nodes are created in the nodegraph");
        return equals(ng.node_connections.length, 8, "8 connections has been created");
      });
    }
    return FileLoadTest;
  })();
});