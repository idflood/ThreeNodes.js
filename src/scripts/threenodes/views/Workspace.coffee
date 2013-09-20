define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'
  ConnectionView = require 'cs!threenodes/views/ConnectionView'

  require 'jquery.ui'
  require 'cs!threenodes/views/NodeView'
  require 'cs!threenodes/nodes/views/Color'
  require 'cs!threenodes/nodes/views/WebGLRenderer'
  require 'cs!threenodes/nodes/views/Group'

  ### Workspace View ###

  # A workspace consists of nodes and connections.
  # There is a global workspace and possibly many workspaces
  # from group nodes. There is always only one workspace displayed.

  class Workspace extends Backbone.View
    initialize: (options) =>
      super
      @settings = options.settings
      @initDrop()

    render: (nodes) =>
      # Keep a reference of the current nodes
      @nodes = nodes

      console.log "Workspace.render " + nodes.length
      @views = []

      # Create the views for already created nodes and connections
      _.each(@nodes.models, @renderNode)
      _.each(@nodes.connections.models, @renderConnection)

      # Create views when a new node is created
      @nodes.bind("add", @renderNode)

      # Create a connection view when a connection is created
      @nodes.connections.bind("add", @renderConnection)

    destroy: () =>
      # Remove all existing views before displaying new ones
      _.each(@views, (view) -> view.remove())
      @nodes.unbind("add", @renderNode)
      @nodes.connections.unbind("add", @renderConnection)
      delete @views
      delete @settings
      @remove()

    renderNode: (node) =>
      nodename = node.constructor.name

      if ThreeNodes.nodes.views[nodename]
        # If there is a view associated with the node model use it
        viewclass = ThreeNodes.nodes.views[nodename]
      else
        # Use the default view class
        viewclass = ThreeNodes.NodeView

      # Add directly the node element to the dom so that the view can
      # access the .parent() directly. (@see FieldsView.onFieldCreated)
      $nodeEl = $("<div class='node'></div>").appendTo(@$el)
      view = new viewclass
        model: node
        el: $nodeEl

      # Save the nid and model in the data attribute
      view.$el.data("nid", node.get("nid"))
      view.$el.data("object", node)
      @views.push(view)

    renderConnection: (connection) =>
      if @settings.test == true
        return false
      view = new ConnectionView
        model: connection
      @views.push(view)

    initDrop: () =>
      self = this
      # Setup the drop area for the draggables created above
      $("#container").droppable
        accept: "#tab-new a.button, #library .definition"
        activeClass: "ui-state-active"
        hoverClass: "ui-state-hover"
        drop: (event, ui) ->
          offset = $("#container-wrapper").offset()
          definition = false

          if ui.draggable.hasClass("definition")
            nodename = "Group"
            container =  $("#library")
            definition = ui.draggable.data("model")
            offset.left -= container.offset().left
          else
            nodename = ui.draggable.attr("rel")
            container =  $("#sidebar .ui-layout-center")

          dx = ui.position.left + $("#container-wrapper").scrollLeft() - offset.left - 10
          dy = ui.position.top + $("#container-wrapper").scrollTop() - container.scrollTop() - offset.top
          if self.nodes
            self.nodes.createNode({type: nodename, x: dx, y: dy, definition: definition})
          $("#sidebar").show()

      return this
