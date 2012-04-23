
define [
  'use!Underscore', 
  'use!Backbone',
  "use!treeJquery",
], (_, Backbone) ->
  #"use strict"
  
  $ = window.jQuery
  
  namespace "ThreeNodes",
    TreeView: class TreeView extends Backbone.View
      initialize: (options) ->
        super
        @timeoutId = false
    
      render: (nodelist) =>
        if @$el.data("tree")
          @$el.tree("destroy")
      
        if nodelist == false
          @$el.html("")
          return this
        data = []
        terminalNodes = {}
        for node in nodelist.models
          if node.hasOutConnection() == false
            terminalNodes[node.attributes["nid"]] = node
      
        renderNode = (node) =>
          result = {}
          result.label = node.get("name")
          result.model = node
          result.children = []
          upstreamNodes = node.getUpstreamNodes()
          for upnode in upstreamNodes
            result.children.push(renderNode(upnode))
        
          return result
      
        for nid of terminalNodes
          data.push(renderNode(terminalNodes[nid]))
      
        @$el.tree
          data: data
          autoOpen: true
          selectable: true
      
        @$el.bind "tree.click", (e) =>
          node = e.node.model
          $( ".node" ).removeClass("ui-selected")
          node.trigger("node:addSelectedClass")
          selectable = $("#container").data("selectable")
          selectable.refresh()
          selectable._mouseStop(null)
        return this
