define [
  'use!Underscore', 
  'use!Backbone',
  'order!threenodes/utils/Utils',
], (_, Backbone, Utils) ->
  "use strict"
  
  class ThreeNodes.Connection extends Backbone.Model
    defaults:
      "cid": -1
    
    sync: () =>
    
    initialize: (options) =>
      @options = options
      if @get("cid") == -1
        @set({"cid": Utils.get_uid()})
      
      if @isValid()
        # remove existing input connection since inputs only have one connection
        @to_field.remove_connections()
        # add the connection to each fields
        @from_field.add_connection(this)
        @to_field.add_connection(this)
        # dispatch the new value
        @to_field.setValue(@from_field.get("value"))
        @from_field.node.dirty = true
    
    remove: =>
      @from_field.unregister_connection(this)
      @to_field.unregister_connection(this)
      @to_field.remove_connections()
      @to_field.node.dirty = true
      @to_field.changed = true
      delete @from_field
      delete @to_field
      
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
      if @from_field.get("is_output") == @to_field.get("is_output")
        return true
      
      # never connect in/out from the same node
      if @from_field.node.get('nid') == @to_field.node.get('nid')
        return true
      
      @switch_fields_if_needed()
      return false
    
    switch_fields_if_needed: () =>
      if @from_field.get("is_output") == false
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
        from_node: @from_field.node.get("nid")
        from: @from_field.get("name")
        to_node: @to_field.node.get("nid")
        to: @to_field.get("name")
      res
    