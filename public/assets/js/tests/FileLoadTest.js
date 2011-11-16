define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  var FileLoadTest;
  return FileLoadTest = (function() {
    function FileLoadTest(app) {
      module("File");
      test("JSON loader", function() {
        var filehandler, json_string1, ng;
        ng = app.nodegraph;
        filehandler = app.injector.get("FileHandler");
        app.commandMap.execute("ClearWorkspaceCommand");
        json_string1 = '{"uid":7,"nodes":[{"nid":1,"type":"Number","x":363,"y":113,"fields":{"in":[{"fid":2,"val":4}],"out":[{"fid":3,"val":4}]}},{"nid":4,"type":"Number","x":607,"y":169,"fields":{"in":[{"fid":5,"val":4}],"out":[{"fid":6,"val":4}]}}],"connections":[{"id":7,"from":3,"to":5}]}';
        filehandler.load_from_json_data(json_string1);
        ng.render();
        equals(ng.nodes.length, 2, "The 2 nodes are created in the nodegraph");
        equals(ng.node_connections.length, 1, "A connection has been created");
        equals(ng.nodes[0].x, 363, "node1.x has been set");
        equals(ng.nodes[0].y, 113, "node1.y has been set");
        equals(ng.nodes[0].v_in.get(), 4, "The first node input has been set to 4");
        return equals(ng.nodes[1].v_out.get(), 4, "The second node has been connected and the output is 4");
      });
    }
    return FileLoadTest;
  })();
});