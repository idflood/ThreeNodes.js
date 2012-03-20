
define(['jQuery', 'Underscore', 'Backbone', "order!libs/qunit-git"], function($, _, Backbone) {
  "use strict";
  var FileLoadTest;
  return FileLoadTest = (function() {

    function FileLoadTest(app) {
      module("File");
      test("JSON loader", function() {
        var c1, c2, filehandler, json_string1, json_string2, n1, n2, n3, ng;
        ng = app.nodegraph;
        filehandler = app.file_handler;
        app.clearWorkspace();
        n1 = ng.create_node({
          type: "Number",
          x: 363,
          y: 113
        });
        n2 = ng.create_node("Number");
        c1 = ng.connections.create({
          from_field: n1.v_out,
          to_field: n2.v_in
        });
        n1.v_in.setValue(4);
        ng.render();
        json_string1 = filehandler.get_local_json();
        console.log(json_string1);
        app.clearWorkspace();
        filehandler.load_from_json_data(json_string1);
        ng.render();
        equals(ng.length, 2, "The 2 nodes are created in the nodegraph");
        equals(ng.connections.length, 1, "A connection has been created");
        equals(ng.models[0].get("x"), 363, "node1.x has been set");
        equals(ng.models[0].get("y"), 113, "node1.y has been set");
        equals(ng.models[0].v_in.getValue(), 4, "The first node input has been set to 4");
        equals(ng.models[1].v_out.getValue(), 4, "The second node has been connected and the output is 4");
        app.clearWorkspace();
        n1 = ng.create_node("Vector3");
        n2 = ng.create_node("Number");
        n3 = ng.create_node("Number");
        c1 = ng.connections.create({
          from_field: n1.rack.getField("x", true),
          to_field: n2.v_in
        });
        c2 = ng.connections.create({
          from_field: n1.rack.getField("y", true),
          to_field: n3.v_in
        });
        n1.rack.getField("x").setValue(0.7);
        n1.rack.getField("y").setValue(12);
        ng.render();
        json_string2 = filehandler.get_local_json();
        app.clearWorkspace();
        filehandler.load_from_json_data(json_string2);
        ng.render();
        equals(ng.length, 3, "The 3 nodes are created in the nodegraph");
        equals(ng.connections.length, 2, "2 connections has been created");
        equals(ng.models[1].v_out.getValue(), 0.7, "node2.input has been set");
        equals(ng.models[2].v_out.getValue(), 12, "node3.input has been set");
        app.clearWorkspace();
        n1 = ng.create_node("Scene");
        n2 = ng.create_node("Merge");
        n3 = ng.create_node("ThreeMesh");
        c1 = ng.connections.create({
          from_field: n2.rack.getField("out", true),
          to_field: n1.rack.getField("children")
        });
        c2 = ng.connections.create({
          from_field: n3.rack.getField("out", true),
          to_field: n2.rack.getField("in0")
        });
        ng.render();
        json_string2 = filehandler.get_local_json();
        app.clearWorkspace();
        filehandler.load_from_json_data(json_string2);
        ng.render();
        equals(ng.length, 3, "The 3 nodes are created in the nodegraph");
        return equals(ng.connections.length, 2, "2 connections has been created");
      });
    }

    return FileLoadTest;

  })();
});
