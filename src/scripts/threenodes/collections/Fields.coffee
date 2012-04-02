define [
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Field',
], (_, Backbone) ->
  "use strict"
  ### Fields Collection ###
  
  class ThreeNodes.NodeFieldsCollection extends Backbone.Collection
    initialize: (models, options) =>
      @node = options.node
      @node_fields = {}
      @node_fields.inputs = {}
      @node_fields.outputs = {}
    
    # Remove connections, fields and delete variables
    destroy: () =>
      @removeAllConnections()
      @each (field) ->
        field.remove()
      delete @node
      delete @node_fields
    
    # Load saved fields values
    load: (data) =>
      if !data || !data.in
        return false
      
      for f in data.in
        node_field = @node_fields.inputs[f.name]
        if node_field then node_field.load(f.val)
      true

    toJSON: =>
      data = 
        in: jQuery.map(@node_fields.inputs, (f, i) -> f.toJSON())
        out: jQuery.map(@node_fields.outputs, (f, i) -> f.toJSON()) 
      return data
    
    getField: (key, is_out = false) =>
      target = if is_out == true then "outputs" else "inputs"
      return @node_fields[target][key]
    
    setField: (key, value) =>
      @node_fields.outputs[key].setValue(value)
    
    getMaxInputSliceCount: () =>
      result = 1
      for fname of @node_fields.inputs
        f = @node_fields.inputs[fname]
        val = f.attributes.value
        if val && $.type(val) == "array"
          if val.length > result
            result = val.length
      # start with 0
      return result - 1
    
    getUpstreamNodes: () =>
      res = []
      for fname of @node_fields.inputs
        f = @node_fields.inputs[fname]
        for c in f.connections
          res[res.length] = c.from_field.node
      res
    
    getDownstreamNodes: () =>
      res = []
      for fname in @node_fields.outputs
        f = @node_fields.inputs[fname]
        for c in f.connections
          res[res.length] = c.to_field.node
      res
      
    setFieldInputUnchanged: () =>
      for fname in @node_fields.inputs
        f = @node_fields.inputs[fname]
        f.changed = false
    
    renderConnections: =>
      @invoke "render_connections"
    
    removeAllConnections: =>
      @invoke "remove_connections"
    
    addField: (name, value, direction = "inputs") =>
      f = false
      field_is_out = (direction != "inputs")
      if $.type(value) != "object"
        value = @getFieldValueObject(value)
      field = new ThreeNodes.fields.types[value.type]
        name: name
        value: value.val
        possibilities: value.values
        node: @node
        is_output: field_is_out
        default: value.default
      
      target = if field.get("is_output") == false then "inputs" else "outputs"
      @node_fields[target][field.get("name")] = field
      
      @add(field)
      field
      
    addFields: (fields_array) =>
      for dir of fields_array
        # dir = inputs / outputs
        for fname of fields_array[dir]
          value = fields_array[dir][fname]
          @addField(fname, value, dir)
      @
    
    render_sidebar: () =>
      @trigger("renderSidebar")
      @
    
    add_center_textfield: (field) =>
      @trigger("addCenterTextfield", field)
      @
            
    getFieldValueObject: (default_value) ->
      ftype = switch $.type(default_value)
        when "number" then "Float"
        when "boolean" then "Bool"
        else "String"
      res =
        type: ftype
        val: default_value
      return res
