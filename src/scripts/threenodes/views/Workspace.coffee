define [
  'use!Underscore', 
  'use!Backbone',
  'order!threenodes/views/NodeView',
  'order!threenodes/views/ConnectionView',
], (_, Backbone) ->
  "use strict"
  $ = jQuery
  
  class ThreeNodes.Workspace extends Backbone.View
    initialize: (options) =>
      super
      @views = []
    
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
      template = ThreeNodes.NodeView.template
      tmpl = _.template(template, node)
      $tmpl = $(tmpl).appendTo(@$el)
      view = new ThreeNodes.NodeView
        model: node
        el: $tmpl
      @views.push(view)
    
    renderConnection: (connection) =>
      console.log connection
      view = new ThreeNodes.ConnectionView
        model: connection
      @views.push(view)
