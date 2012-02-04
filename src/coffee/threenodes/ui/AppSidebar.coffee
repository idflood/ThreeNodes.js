define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/jquery.contextMenu",
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.AppSidebar
    constructor: () ->
      _.extend(@, Backbone.Events)
    
    onRegister: () =>
      @init_sidebar_tab_new_node()
      @init_sidebar_search()
      @init_sidebar_toggle()
      @init_sidebar_tabs()
    
    init_sidebar_tabs: () =>
      $("#sidebar").tabs
        fx:
          opacity: 'toggle'
          duration: 100
    
    init_sidebar_toggle: () =>
      $("#sidebar-toggle").click (e) ->
        $t = $("#sidebar")
        o = 10
        if $t.position().left < -20
          $("#sidebar-toggle").removeClass("toggle-closed")
          $t.animate({left: 0}, { queue: false, duration: 140 }, "swing")
          $("#sidebar-toggle").animate({left: 220 + o}, { queue: false, duration: 80 }, "swing")
        else
          $("#sidebar-toggle").addClass("toggle-closed")
          $t.animate({left: -220}, { queue: false, duration: 120 }, "swing")
          $("#sidebar-toggle").animate({left: o}, { queue: false, duration: 180 }, "swing")
    
    filter_list_item: ($item, value) =>
      s = $.trim($("a", $item).html()).toLowerCase()
      if s.indexOf(value) == -1
        $item.hide()
      else
        $item.show()
    
    filter_list: (ul, value) =>
      self = this
      ul_title = ul.prev()
      has_visible_items = false
      
      $("li", ul).each () -> self.filter_list_item($(this), value)
      
      if $("li:visible", ul).length == 0
        ul_title.hide()
      else
        ul_title.show()
    
    init_sidebar_search: () =>
      self = this
      $("#node_filter").keyup (e) ->
        v = $.trim($("#node_filter").val()).toLowerCase()
        if v == ""
          $("#tab-new li, #tab-new h3").show()
        else
          $("#tab-new ul").each () -> self.filter_list($(this), v)
                  
    init_sidebar_tab_new_node: () =>
      self = this
      $container = $("#tab-new")
      result = []
      nodes_by_group = {}
      for node of ThreeNodes.nodes
        group_name = (ThreeNodes.nodes[node].group_name).replace(/\./g, "-")
        if !nodes_by_group[group_name]
          nodes_by_group[group_name] = []
        nodes_by_group[group_name].push(node)
      
      for group of nodes_by_group
        $container.append("<h3>#{group}</h3><ul id='nodetype-#{group}'></ul>")
        for node in nodes_by_group[group]
          $("#nodetype-#{group}", $container).append("<li><a class='button' rel='#{node}' href='#'>#{ ThreeNodes.nodes[node].node_name }</a></li>")
      
      #for nt of ThreeNodes.nodes.types
      #  $container.append("<h3>#{nt}</h3><ul id='nodetype-#{nt}'></ul>")
      #  for node of ThreeNodes.nodes.types[nt]
      #    $("#nodetype-#{nt}", $container).append("<li><a class='button' rel='#{nt}.#{node.toString()}' href='#'>#{ node.toString() }</a></li>")
      
      $("a.button", $container).draggable
        revert: "valid"
        opacity: 0.7
        helper: "clone"
        revertDuration: 0
        scroll: false
        containment: "document"
      
      $("#container").droppable
        accept: "#tab-new a.button"
        activeClass: "ui-state-active"
        hoverClass: "ui-state-hover"
        drop: (event, ui) ->
          nodename = ui.draggable.attr("rel")
          dx = ui.position.left + $("#container-wrapper").scrollLeft() - 10
          dy = ui.position.top - 10 + $("#container-wrapper").scrollTop() - $("#sidebar").scrollTop()
          self.context.commandMap.execute("CreateNodeCommand", nodename, dx, dy)
          $("#sidebar").show()
