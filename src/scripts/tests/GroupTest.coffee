define [
  'Underscore',
  'Backbone',
  "libs/qunit-git",
], (_, Backbone) ->
  #"use strict"

  $ = jQuery

  class GroupTest
    constructor: (app) ->
      module "Group test"
      filehandler = app.file_handler
      ng = app.nodes

      test "Basic group", () ->
        app.clearWorkspace()

        n1 = ng.createNode("Number")
        n2 = ng.createNode("Vector3")
        node_mult = ng.createNode("MathMult")

        n1.v_in.setValue 2
        node_mult.fields.getField("factor").setValue(3)

        c1 = ng.connections.create
          from_field: n1.v_out
          to_field: node_mult.v_in

        ng.render()

        selected_nodes = [n1, n2, node_mult]
        definition = app.group_definitions.groupSelectedNodes(selected_nodes)

        equals ng.length, 1, "There is one group node"
        equals app.group_definitions.length, 1, "There is one group definition"
        grp = ng.models[0]
        equals grp.nodes.length, 3, "The group node has 3 subnodes"

        nbr_in1 = grp.nodes.models[0].fields.inputs["in"]
        mult_out1 = grp.nodes.models[2].fields.outputs["out"]
        mult_fact1 = grp.nodes.models[2].fields.inputs["factor"]

        console.log "SAVED JSON"
        console.log JSON.parse(filehandler.getLocalJson())

        # Add a 4th node, external to the group, connected to a group field
        n3 = ng.createNode("Number")
        n4 = ng.createNode("Number")
        c1 = ng.connections.create
          from_field: n3.v_out
          to_field: nbr_in1

        c2 = ng.connections.create
          from_field: mult_out1
          to_field: n4.v_in

        n3.v_in.setValue 5
        mult_fact1.setValue 3
        ng.render()
        # 5 * 3
        equals mult_out1.getValue(), 15, "Group 1 sends correct value (1/2)"
        n3.v_in.setValue 7
        ng.render()
        # 7 * 3
        equals mult_out1.getValue(), 21, "Group 1 sends correct value (2/2)"

        # Create a second group node based on the same definition
        model =
          type: "Group"
          definition: definition
        ng.createGroup(model)
        ng.render()

        equals ng.length, 4, "There is two group nodes + two external node"
        equals ng.connections.length, 2, "There is only two connections (without subconnections)"
        grp2 = ng.models[3]
        equals grp2.nodes.length, 3, "The group2 has 3 subnodes"

        nbr_in2 = grp2.nodes.models[0].fields.inputs["in"]
        mult_out2 = grp2.nodes.models[2].fields.outputs["out"]
        mult_fact2 = grp2.nodes.models[2].fields.inputs["factor"]

        # Set different values for the second group but don't touch the first one

        nbr_in2.setValue 11
        mult_fact2.setValue 2
        ng.render()

        equals mult_out1.getValue(), 21, "Group 1 value has not changed (1/2)"
        equals n4.v_out.getValue(), 21, "Group 1  output propagated to external number node"
        # 11 * 2
        equals mult_out2.getValue(), 22, "Group 2 sends correct value (1/2)"

        nbr_in2.setValue 2
        ng.render()
        equals mult_out1.getValue(), 21, "Group 1 value has not changed (2/2)"
        # 2 * 2
        equals mult_out2.getValue(), 4, "Group 2 sends correct value (2/2)"

        equals nbr_in1.getValue(), 7, "Group 1 input value still 7"
        # Save current group in json for next test
        @saved_grp = filehandler.getLocalJson()

        app.clearWorkspace()

        equals ng.length, 0, "The workspace is empty"
        equals app.group_definitions.length, 0, "The group definition has been removed"

        console.log "SAVED JSON"
        console.log JSON.parse(@saved_grp)
        # Load the previous workspace which had 2 groups
        filehandler.loadFromJsonData(@saved_grp)
        ng.render()

        equals app.group_definitions.length, 1, "The group definition has been recreated"
        def1 = app.group_definitions.models[0]

        equals def1.get("nodes").length, 3, "The group definition has 3 nodes"
        equals def1.get("connections").length, 1, "The group definition has 1 connection"
        equals ng.length, 4, "The two group nodes + the two number nodes have been loaded"
        equals ng.connections.length, 2, "The external connections has been loaded"
        console.log ng.connections
        grp = ng.models[0]
        node_number_out = ng.models[2]
        grp2 = ng.models[3]
        equals grp.nodes.length, 3, "The group node has 3 subnodes"

        # Verify the output values of the group nodes
        nbr_in1 = grp.nodes.models[0].fields.inputs["in"]
        mult_out1 = grp.nodes.models[2].fields.outputs["out"]
        mult_fact1 = grp.nodes.models[2].fields.inputs["factor"]
        nbr_in2 = grp2.nodes.models[0].fields.inputs["in"]
        mult_out2 = grp2.nodes.models[2].fields.outputs["out"]
        mult_fact2 = grp2.nodes.models[2].fields.inputs["factor"]

        equals nbr_in1.getValue(), 7, "Group 1 input value is loaded"
        equals nbr_in2.getValue(), 2, "Group 2 input value is loaded"
        equals mult_out1.getValue(), 21, "Group 1 out value is loaded"
        equals mult_out2.getValue(), 4, "Group 2 out value is loaded"

        equals node_number_out.v_out.getValue(), 21, "External node connected to goup output has correct value"
