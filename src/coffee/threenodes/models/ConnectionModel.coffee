define [
  'Underscore', 
  'Backbone',
  'order!threenodes/utils/Utils',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.ConnectionModel extends Backbone.Model
    defaults:
      "cid": -1
    
    sync: () =>
    
    initialize: (options) =>
      @options = options
      @node = @options.node
      if @get("cid") == -1
        @set({"cid": ThreeNodes.Utils.get_uid()})
      
      if @isValid()
        # remove existing input connection since inputs only have one connection
        @to_field.remove_connections()
        # add the connection to each fields
        @from_field.add_connection(this)
        @to_field.add_connection(this)
        # dispatch the new value
        @to_field.set(@from_field.get())
        @from_field.node.dirty = true
    
    remove: =>
      @from_field.unregister_connection(this)
      @to_field.unregister_connection(this)
      @to_field.node.dirty = true
      @to_field.changed = true
      
      @trigger "connection:removed", this
      @destroy()
      false
    
    render: () =>
      @trigger("render", this, this)
    
    validate: (attrs, options) =>
      @from_field = attrs.from_field
      @to_field = attrs.to_field
      
      # make sure we have input and output
      if !@from_field || !@to_field
        return true
      
      # never connect 2 outputs or 2 inputs
      if @from_field.is_output == @to_field.is_output
        return true
      
      # never connect in/out from the same node
      if @from_field.node.model.get('nid') == @to_field.node.model.get('nid')
        return true
      
      @switch_fields_if_needed()
      return false
    
    switch_fields_if_needed: () =>
      if @from_field.is_output == false
        f_out = @to_field
        @to_field = @from_field
        @from_field = f_out
      @
    
    setCID: (cid) =>
      @set
        "cid": cid

    toJSON: () ->
      res =
        id: @get("cid")
        from_node: @get("from_field").node.model.get("nid")
        from: @get("from_field").name
        to_node: @get("to_field").node.model.get("nid")
        to: @get("to_field").name
      res
    
    toXML: () ->
      "\t\t<connection id='#{@cid}' from='#{@from_field.fid}' to='#{@to_field.fid}'/>\n"
    
    toCode: () ->
      res = "var connection_#{@get('cid')}_data = {\n"
      res += "\t" + "id: #{@get('cid')},\n"
      res += "\t" + "from_node: #{@get('from_field').node.model.get('nid')}, from: '#{@get('from_field').name}',\n"
      res += "\t" + "to_node: #{@get('to_field').node.model.get('nid')}, to: '#{@get('to_field').name}'\n"
      res += "};\n"
      res += "var connection_#{@cid} = nodegraph.createConnectionFromObject(connection_#{@get('cid')}_data);\n"
      res
