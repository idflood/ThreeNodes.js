define [
  'use!Underscore', 
  'use!Backbone',
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
      while @models.length > 0
        @models[0].remove()
      delete @node
      delete @node_fields
    
    # Load saved fields values
    load: (data) =>
      if !data || !data.in
        return false
      
      for f in data.in
        if !f.nid
          # Simple node field
          node_field = @node_fields.inputs[f.name]
        else
          # Group node field
          node_field = @node_fields.inputs[f.name + "-" + f.nid]
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
      for fname, f of @node_fields.inputs
        val = f.attributes.value
        if val && $.type(val) == "array"
          if val.length > result
            result = val.length
      # start with 0
      return result - 1
    
    getUpstreamNodes: () =>
      res = []
      for fname, f of @node_fields.inputs
        for c in f.connections
          res[res.length] = c.from_field.node
      res
    
    getDownstreamNodes: () =>
      res = []
      for fname, f in @node_fields.outputs
        f = @node_fields.inputs[fname]
        for c in f.connections
          res[res.length] = c.to_field.node
      res
    
    hasUnconnectedInputs: () =>
      for fname, f of @node_fields.inputs
        if f.connections.length == 0
          return true
      return false
    
    hasUnconnectedOutputs: () =>
      for fname, f of @node_fields.outputs
        if f.connections.length == 0
          return true
      return false
    
    hasUnconnectedFields: () =>
      return hasUnconnectedInputs() || hasUnconnectedOutputs()
      
    setFieldInputUnchanged: () =>
      for fname in @node_fields.inputs
        f = @node_fields.inputs[fname]
        f.changed = false
    
    renderConnections: =>
      @invoke "render_connections"
    
    removeAllConnections: =>
      @invoke "remove_connections"
    
    cloneSubField: (field) =>
      options = 
        type: field.constructor.name
        value: field.attributes.value
        possibilities: field.get("values")
        node: @node
        default: field.get("default")
        subfield: field
      direction = if field.get("is_output") then "outputs" else "inputs"
      proxy_field = @addField(field.get('name'), options, direction)
      # Save a reference of the proxy field in the subfield
      field.proxy = proxy_field
      
      # set the initial value of input proxy
      if field.get("is_output") == false
        proxy_field.setValue(field.attributes.value)
        # save it in the nodefields array
        @node_fields.inputs[proxy_field.get('name') + "-" + field.get("node").get("nid")] = proxy_field
      
      return proxy_field
    
    createNodesProxyFields: (nodes) =>
      if $.type(nodes) != "array"
        @createNodesProxyFields([nodes])
        return this
      
      setSubfields = (node, direction = "inputs") =>
        @trigger("addCustomHtml", $("<h3>#{node.get('name')}</h3>"), "." + direction)
        for name, field of node.rack.node_fields[direction]
          # We hide subfields inputs with internal connection
          if field.connections.length == 0 || field.attributes.is_output == true
            @cloneSubField(field)
      
      for node in nodes
        if node.rack.hasUnconnectedInputs() == true then setSubfields(node, "inputs")
        # We want to be able to retrieve all outputs
        setSubfields(node, "outputs")
      return this
    
    addField: (name, value, direction = "inputs") =>
      f = false
      field_is_out = (direction != "inputs")
      if $.type(value) != "object"
        value = @getFieldValueObject(value)
      field = new ThreeNodes.fields[value.type]
        name: name
        value: value.val
        possibilities: value.values
        node: @node
        is_output: field_is_out
        default: value.default
        subfield: value.subfield
      
      target = if field.get("is_output") == false then "inputs" else "outputs"
      field_index = field.get("name")
      if field.subfield
        # In group nodes we want to have a unique field index
        field_index += "-" + field.subfield.node.get("nid")
      @node_fields[target][field_index] = field
      
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
