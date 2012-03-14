define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/tree.jquery",
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.TreeView extends Backbone.View
    initialize: (options) ->
      super
      @timeoutId = false
      ThreeNodes.events.on "ClearWorkspace", () =>
        @render(false)
      
      ThreeNodes.events.on "nodeslist:rebuild", (nodelist) =>
        if @timeoutId
          clearTimeout(@timeoutId)
        # add a little delay since the event is fired multiple time on file load
        onTimeOut = () =>
          @render(nodelist)
        @timeoutId = setTimeout(onTimeOut, 10)
    
    render: (nodelist) =>
      if @$el.data("tree")
        @$el.tree("destroy")
      
      if nodelist == false
        @$el.html("")
        return this
      data = []
      terminalNodes = {}
      for node in nodelist.models
        if node.has_out_connection() == false
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
        $("#nid-" + node.get("nid")).addClass("ui-selected")
        selectable = $("#container").data("selectable")
        selectable.refresh()
        selectable._mouseStop(null)
      return this
