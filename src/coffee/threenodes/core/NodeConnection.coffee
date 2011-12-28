define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.NodeConnection
    constructor: (@from_field, @to_field, @cid = ThreeNodes.Utils.get_uid()) ->
      @is_valid = @validate_connection()
      if @is_valid
        @container = $("#graph")
        # remove existing input connection since inputs only have one connection
        @to_field.remove_connections()
        # add the connection to each fields
        @from_field.add_connection(this)
        @to_field.add_connection(this)
        # dispatch the new value
        @to_field.set(@from_field.get())
        @from_field.node.dirty = true
    
    switch_fields_if_needed: () =>
      if @from_field.is_output == false
        f_out = @to_field
        @to_field = @from_field
        @from_field = f_out
    
    validate_connection: () =>
      # make sure we have input and output
      if !@from_field || !@to_field
        return false
      
      # never connect 2 outputs or 2 inputs
      if @from_field.is_output == @to_field.is_output
        return false
      
      # never connect in/out from the same node
      if @from_field.node.nid == @to_field.node.nid
        return false
      
      @switch_fields_if_needed()
      
      true
    
    onRegister: () ->
      if @is_valid
        @line = false
        @context.commandMap.execute "AddConnectionCommand", this
        @render()
    
    get_path: () ->
      container_y = parseFloat($("#container-wrapper").css("top"))
      f1 = @get_field_position(@from_field)
      f2 = @get_field_position(@to_field)
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
    
    toJSON: () ->
      res =
        id: @cid
        from_node: @from_field.node.nid
        from: @from_field.name
        to_node: @to_field.node.nid
        to: @to_field.name
      res
    
    toXML: () ->
      "\t\t<connection id='#{@cid}' from='#{@from_field.fid}' to='#{@to_field.fid}'/>\n"
  
    get_field_position: (field) ->
      o1 = $("#fid-#{field.fid} a span").offset()
      diff = 3
      o1.top += diff
      o1.left += diff
      if o1.left == diff && o1.top == diff
        o1 = $("#nid-#{field.node.nid}").offset()
        o1.top += $("#nid-#{field.node.nid}").outerHeight() / 2 + 3
        if field.is_output == true
          o1.left += $("#nid-#{field.node.nid}").outerWidth() - 2
      o1
    
    remove: ->
      @from_field.unregister_connection(this)
      @to_field.unregister_connection(this)
      @to_field.node.dirty = true
      @to_field.changed = true
      if ThreeNodes.svg && @line
        @line.remove()
        @line = false
      @context.commandMap.execute "RemoveConnectionCommand", this
      false
    
    render: ->
      if ThreeNodes.svg
        if @line && @line.attrs
          @line.attr
            path: @get_path()
        else
          color = "#555"
          @line = ThreeNodes.svg.path(@get_path()).attr
            stroke: color
            fill: "none"
            
