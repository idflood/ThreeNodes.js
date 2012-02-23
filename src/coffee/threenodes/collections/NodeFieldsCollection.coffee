define [
  'Underscore', 
  'Backbone',
  'order!threenodes/core/NodeField',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.NodeFieldsCollection extends Backbone.Collection
    #model: ThreeNodes.NodeField
    
    initialize: (models, options) =>
      @node = options.node
      @node_fields = {}
      @node_fields.inputs = {}
      @node_fields.outputs = {}
      @node_fields_by_name = {}
      @node_fields_by_name.inputs = {}
      @node_fields_by_name.outputs = {}
    
    load: (xml, json) =>
      if xml
        @fromXML(xml)
      else if json
        @fromJSON(json)
    
    getField: (key, is_out = false) =>
      if is_out == true
        @node_fields_by_name.outputs[key]
      else
        @node_fields_by_name.inputs[key]
    
    setField: (key, value) =>
      @node_fields_by_name.outputs[key].setValue value
    
    getMaxInputSliceCount: () =>
      res = 1
      for fid of @node_fields.inputs
        f = @node_fields.inputs[fid]
        val = f.attributes.value;
        if val && $.type(val) == "array"
          if val.length > res
            res = val.length
      # start with 0
      res - 1
    
    getUpstreamNodes: () =>
      res = []
      for fid of @node_fields.inputs
        f = @node_fields.inputs[fid]
        for c in f.connections
          res[res.length] = c.from_field.node
      res
    
    getDownstreamNodes: () =>
      res = []
      for fid in @node_fields.outputs
        f = @node_fields.inputs[fid]
        for c in f.connections
          res[res.length] = c.to_field.node
      res
      
    setFieldInputUnchanged: () =>
      for fid in @node_fields.inputs
        f = @node_fields.inputs[fid]
        f.changed = false
    
    registerField: (field) =>
      field.node = @node
      if field.get("is_output") == false
        @node_fields.inputs["fid-" + field.get("fid")] = field
        @node_fields_by_name.inputs[field.get("name")] = field
        $(".inputs", @node.main_view).append(field.render_button())
      else
        @node_fields.outputs["fid-" + field.get("fid")] = field
        @node_fields_by_name.outputs[field.get("name")] = field
        $(".outputs", @node.main_view).append(field.render_button())
      
      #if @view != false
      #@view.add_field_listener($("#fid-#{field.fid}"))
      fid = field.get("fid")
      @trigger("field:registered", this, $("#fid-#{fid}"))
      
      field
    
    fromJSON: (data) =>
      for f in data.fields.in
        node_field = @node_fields_by_name.inputs[f.name]
        if node_field && f.val
          node_field.setValue(f.val)
      true
    
    fromXML: (data) =>
      self = this
      
      $("in field", data).each () ->
        f = self.node_fields.inputs["fid-" + $(this).attr("fid")]
        field_val = $(this).attr("val")
        if f && field_val != "[object Object]"
          f.setValue(field_val)
      true

    toJSON: =>
      res = 
        in: jQuery.map(@node_fields.inputs, (f, i) -> f.toJSON())
        out: jQuery.map(@node_fields.outputs, (f, i) -> f.toJSON()) 
      res
    
    toCode: =>
      res = "{'in': [\n"
      for field of @node_fields.inputs
        res += @node_fields.inputs[field].toCode()
      res += "\t]}"
      res
    
    toXML: =>
      res = "\t\t<in>\n"
      for f of @node_fields.inputs
        res += @node_fields.inputs[f].toXML()
      res += "\t\t</in>\n"
      
      res += "\t\t<out>\n"
      for f of @node_fields.outputs
        res += @node_fields.outputs[f].toXML()
      res += "\t\t</out>\n"
      res
    
    renderConnections: =>
      for f of @node_fields.inputs
        @node_fields.inputs[f].render_connections()
      for f of @node_fields.outputs
        @node_fields.outputs[f].render_connections()
      true
    
    removeAllConnections: =>
      for f of @node_fields.inputs
        @node_fields.inputs[f].remove_connections()
      for f of @node_fields.outputs
        @node_fields.outputs[f].remove_connections()
    
    addField: (name, value, direction = "inputs") =>
      f = false
      if $.type(value) != "object"
        value = @getFieldValueObject(value)
      if value.values
        f = new ThreeNodes.fields.types[value.type]
          name: name
          value: value.val
          possibilities: value.values
          node: @node
      else
        f = new ThreeNodes.fields.types[value.type]
          name: name
          value: value.val
          node: @node
      if value.default != null
        f.default_value = value.default
      if direction != "inputs"
        f.set("is_output", true)
      
      @registerField(f)
      #@context.injector.applyContext(f)
      @add(f)
      f
      
    addFields: (fields_array) =>
      for dir of fields_array
        # dir = inputs / outputs
        for fname of fields_array[dir]
          value = fields_array[dir][fname]
          @addField(fname, value, dir)
      @
    
    render_sidebar: () =>
      #if @view
      #  @view.renderSidebar()
      @
    
    add_center_textfield: (field) =>
      #if @view
      #  @view.addCenterTextfield(field)
      @
            
    getFieldValueObject: (default_value) ->
      ftype = switch $.type(default_value)
        when "number" then "Float"
        when "boolean" then "Bool"
        else "String"
      #new ThreeNodes.fields.types[ftype](fname, default_value)
      res =
        type: ftype
        val: default_value
      return res
