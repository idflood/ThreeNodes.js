define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  
  class ThreeNodes.ConnectionView extends Backbone.View
    
    initialize: () ->
      @container = $("#graph")
      @line = ThreeNodes.svg.path().attr
        stroke: "#555"
        fill: "none"
      # set the dom element
      @el = @line.node
      @model.bind "render", () =>
        @render()
      @model.bind "destroy", () =>
        @remove()
      @render()
      @
    
    remove: ->
      if ThreeNodes.svg && @line
        @line.remove()
        @line = false
      return true
    
    render: () ->
      if ThreeNodes.svg && @line && @line.attrs
        @line.attr
          path: @get_path()
      @
    
    get_field_position: (field) ->
      o1 = $("#fid-#{field.get('fid')} .inner-field span").offset()
      if !o1
        return {left: 0, top: 0}
      diff = 3
      o1.top += diff
      o1.left += diff
      if o1.left == diff && o1.top == diff
        o1 = $("#nid-#{field.node.get('nid')}").offset()
        o1.top += $("#nid-#{field.node.get('nid')}").outerHeight() / 2 + 3
        if field.get("is_output") == true
          o1.left += $("#nid-#{field.node.get('nid')}").outerWidth() - 2
      o1
    
    get_path: () ->
      container_y = parseFloat($("#container-wrapper").css("top"))
      f1 = @get_field_position(@model.from_field)
      f2 = @get_field_position(@model.to_field)
      ofx = $("#container-wrapper").scrollLeft()
      ofy = $("#container-wrapper").scrollTop() - container_y
      x1 = f1.left + ofx
      y1 = f1.top + ofy
      x4 = f2.left + ofx
      y4 = f2.top + ofy
      min_diff = 42
      diffx = Math.max(min_diff, x4 - x1)
      diffy = Math.max(min_diff, y4 - y1)
      
      x2 = x1 + diffx * 0.5
      y2 = y1
      x3 = x4 - diffx * 0.5
      y3 = y4
      
      ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",")
    
    
