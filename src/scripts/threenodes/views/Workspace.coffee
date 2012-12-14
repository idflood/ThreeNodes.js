define [
  'Underscore',
  'Backbone',
  'cs!threenodes/views/NodeView',
  'cs!threenodes/views/ConnectionView',
  'cs!threenodes/nodes/views/Color',
  'cs!threenodes/nodes/views/WebGLRenderer',
], (_, Backbone) ->
  #"use strict"

  ### Workspace View ###

  # A workspace consists of nodes and connections.
  # There is a global workspace and possibly many workspaces
  # from group nodes. There is always only one workspace displayed.

  namespace "ThreeNodes",
    Workspace: class Workspace extends Backbone.View
      initialize: (options) =>
        super
        @views = []
        @settings = options.settings

      render: (nodes) =>
        console.log "should remove " + @views.length
        console.log @views
        # Remove all existing views before displaying new ones
        _.each(@views, (view) -> view.remove())

        # Keep a reference of the current nodes
        @nodes = nodes

        console.log "Workspace.render " + nodes.length

        # Create the views for already created nodes and connections
        _.each(@nodes.models, @renderNode)
        _.each(@nodes.connections.models, @renderConnection)

        # Reset the array of views
        @views = []

        # Create views when a new node is created
        @nodes.bind("add", @renderNode)

        # Create a connection view when a connection is created
        @nodes.connections.bind("add", @renderConnection)

      renderNode: (node) =>
        nodename = node.constructor.name

        if ThreeNodes.nodes.views[nodename]
          # If there is a view associated with the node model use it
          viewclass = ThreeNodes.nodes.views[nodename]
        else
          # Use the default view class
          viewclass = ThreeNodes.NodeView
        view = new viewclass
          model: node

        view.$el.appendTo(@$el)

        # Save the nid and model in the data attribute
        view.$el.data("nid", node.get("nid"))
        view.$el.data("object", node)
        @views.push(view)

      renderConnection: (connection) =>
        if @settings.test == true
          return false
        view = new ThreeNodes.ConnectionView
          model: connection
        @views.push(view)
