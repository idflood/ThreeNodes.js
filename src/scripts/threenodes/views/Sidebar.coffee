root = if typeof window != "undefined" && window != null then window else exports

define [
  'use!Underscore', 
  'use!Backbone',
  "jQueryUi",
  'cs!threenodes/views/TreeView',
  "order!libs/jquery.layout-latest",
], (_, Backbone, jQueryUi) ->
  #"use strict"
  
  ### Sidebar View ###
  $ = jQuery
  
  class root.ThreeNodes.Sidebar extends Backbone.View
    initialize: () ->
      super
      @initNewNode()
      @initSearch()
      @initTabs()
      @initTreeView()
      @layout = @$el.layout
        scrollToBookmarkOnLoad: false
        north:
          closable: false
          resizable: false
          slidable: false
          #size: 24
          resizerClass: "ui-layout-resizer-hidden"
          spacing_open: 0
          spacing_closed: 0
        center:
          size: "100%"
    
    initTreeView: () =>
      @treeview = new root.ThreeNodes.TreeView
        el: $("#tab-list")
      return this
    
    render: (nodes) =>
      if @treeview then @treeview.render(nodes)
    
    clearWorkspace: () =>
      @treeview.render(false)
    
    initTabs: () =>
      @$el.tabs
        fx:
          opacity: 'toggle'
          duration: 100
      return this
    
    # Display fields attributes in sidebar when nodes are selected
    renderNodesAttributes: (nodes) =>
      # Always start with an empty element
      $target = $("#tab-attribute")
      $target.html("");
      
      # If there is no nodes to show abort now
      if !nodes || nodes.length < 1
        return this
      
      for node in nodes
        $target.append("<h2>#{node.get('name')}</h2>")
        for f of node.fields.inputs
          node.fields.inputs[f].renderSidebar()
      return this
    
    filterListItem: ($item, value) =>
      s = $.trim($("a", $item).html()).toLowerCase()
      if s.indexOf(value) == -1
        $item.hide()
      else
        $item.show()
    
    filterList: (ul, value) =>
      self = this
      ul_title = ul.prev()
      has_visible_items = false
      
      $("li", ul).each () -> self.filterListItem($(this), value)
      
      if $("li:visible", ul).length == 0
        ul_title.hide()
      else
        ul_title.show()
      return this
    
    initSearch: () =>
      self = this
      $("#node_filter").keyup (e) ->
        v = $.trim($("#node_filter").val()).toLowerCase()
        if v == ""
          $("#tab-new li, #tab-new h3").show()
        else
          $("#tab-new ul").each () -> self.filterList($(this), v)
      return this
                  
    initNewNode: () =>
      self = this
      $container = $("#tab-new")
      result = []
      nodes_by_group = {}
      
      # Organize each node types by group
      for node of root.ThreeNodes.nodes
        # don't show hidden nodes types (group_name = false)
        if root.ThreeNodes.nodes[node].group_name
          group_name = (ThreeNodes.nodes[node].group_name).replace(/\./g, "-")
          if !nodes_by_group[group_name]
            nodes_by_group[group_name] = []
          nodes_by_group[group_name].push(node)
      
      # Render the buttons and add them to the dom
      for group of nodes_by_group
        $container.append("<h3>#{group}</h3><ul id='nodetype-#{group}'></ul>")
        for node in nodes_by_group[group]
          $("#nodetype-#{group}", $container).append("<li><a class='button' rel='#{node}' href='#'>#{ root.ThreeNodes.nodes[node].node_name }</a></li>")
      
      # Make the list of nodes draggable
      jQuery("a.button", $container).draggable
        revert: "valid"
        opacity: 0.7
        helper: "clone"
        revertDuration: 0
        scroll: false
        containment: "document"
      
      return this
