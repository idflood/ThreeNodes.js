root = if typeof window != "undefined" && window != null then window else exports

define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/views/NodeView',
  'cs!threenodes/views/ConnectionView',
], (_, Backbone) ->
  #"use strict"
  $ = jQuery
  
  class root.ThreeNodes.Workspace extends Backbone.View
    initialize: (options) =>
      super
      @views = []
      @settings = options.settings
    
    render: (nodes) =>
      # Remove all existing views before displaying new ones
      _.each(@views, (view) -> view.remove())
      
      # Keep a reference of the current nodes
      @nodes = nodes
      
      console.log "Workspace.render"
      
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
      view = new root.ThreeNodes.NodeView
        model: node
      
      view.$el.appendTo(@$el)
      
      # Save the nid and model in the data attribute
      view.$el.data("nid", node.get("nid"))
      view.$el.data("object", node)
      @views.push(view)
    
    renderConnection: (connection) =>
      if @settings.test == true
        return false
      view = new root.ThreeNodes.ConnectionView
        model: connection
      @views.push(view)
