define [
  'Underscore', 
  'Backbone',
  'order!threenodes/models/NodeFieldModel',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.NodeFieldsCollection extends Backbone.Collection
    model: ThreeNodes.NodeFieldModel
    
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
      @node_fields_by_name.outputs[key].set value
    
    getMaxInputSliceCount: () =>
      res = 1
      for fid of @node_fields.inputs
        f = @node_fields.inputs[fid]
        if f.val && $.type(f.val) == "array"
          if f.val.length > res
            res = f.val.length
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
      if field.is_output == false
        @node_fields.inputs["fid-" + field.fid] = field
        @node_fields_by_name.inputs[field.name] = field
        $(".inputs", @node.main_view).append(field.render_button())
      else
        @node_fields.outputs["fid-" + field.fid] = field
        @node_fields_by_name.outputs[field.name] = field
        $(".outputs", @node.main_view).append(field.render_button())
      
      if @view != false
        #@view.add_field_listener($("#fid-#{field.fid}"))
        @trigger("field:registered", this, $("#fid-#{field.fid}"))
      
      field
    
    fromJSON: (data) =>
      console.log "loading data..."
      console.log data
      for f in data.fields.in
        node_field = @node_fields_by_name.inputs[f.name]
        if node_field && f.val
          node_field.set(f.val)
      true
    
    fromXML: (data) =>
      self = this
      
      $("in field", data).each () ->
        f = self.node_fields.inputs["fid-" + $(this).attr("fid")]
        field_val = $(this).attr("val")
        if f && field_val != "[object Object]"
          f.set(field_val)
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
