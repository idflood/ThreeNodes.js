define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min",
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  class ThreeNodes.NodeConnection
    constructor: (@from_field, @to_field, @cid = ThreeNodes.Utils.get_uid()) ->
      @container = $("#graph")
      # remove existing input connection since inputs only have one connection
      @to_field.remove_connections()
      # add the connection to each fields
      @from_field.add_connection(this)
      @to_field.add_connection(this)
      # dispatch the new value
      @to_field.set(@from_field.get())
      @from_field.node.dirty = true
      console.log "connect"
      console.log @from_field.get()
    
    onRegister: () ->
      @line = false
      @context.commandMap.execute "AddConnectionCommand", this
      @render()
    
    get_path: () ->
      f1 = @get_field_position(@from_field)
      f2 = @get_field_position(@to_field)
      ofx = $("#container-wrapper").scrollLeft()
      ofy = $("#container-wrapper").scrollTop()
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
        from: @from_field.fid
        to: @to_field.fid
      res
    
    toXML: () ->
      "\t\t<connection id='#{@cid}' from='#{@from_field.fid}' to='#{@to_field.fid}'/>\n"
  
    get_field_position: (field) ->
      o1 = $("#fid-#{field.fid} a").offset()
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
