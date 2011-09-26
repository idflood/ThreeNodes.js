node_connections = []

render_connections = () ->
  for connection in node_connections
    connection.render()

class NodeConnection
  constructor: (@from_field, @to_field) ->
    @cid = get_uid()
    @container = $("#graph")
    @line = svg.line(0, 0, 0, 0, {id: "line-#{@cid}", class: "connection"})
    node_connections.push(this)
    @from_field.add_connection(this)
    @to_field.add_connection(this)
    @update()
    @render()
  
  update: () ->
    @to_field.set(@from_field.get())
    
  update_node_from: () =>
    @from_field.node.update()

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
    @from_field.remove_connection(this)
    @to_field.remove_connection(this)
    #@from_field.signal.remove @listener
    svg.remove(@line)
    ind = node_connections.indexOf(this)
    if ind != -1
      node_connections.splice(ind, 1)
    false
  render: ->
    f1 = @get_field_position(@from_field)
    f2 = @get_field_position(@to_field)
    ofx = $("#container-wrapper").scrollLeft()
    ofy = $("#container-wrapper").scrollTop()
    $("#line-#{@cid}").attr
      x1: f1.left + ofx
      y1: f1.top + ofy
      x2: f2.left + ofx
      y2: f2.top + ofy
      