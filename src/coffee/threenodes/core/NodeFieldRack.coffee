define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/core/NodeField',
  'order!threenodes/core/NodeFieldRackView',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.NodeFieldRack
    constructor: (@node) ->
      @node_fields = {}
      @node_fields.inputs = {}
      @node_fields.outputs = {}
      @node_fields_by_name = {}
      @node_fields_by_name.inputs = {}
      @node_fields_by_name.outputs = {}
      @view = false
    
    onRegister: () ->
      #if @context.player_mode == false
      @view = @context.injector.instanciate(ThreeNodes.NodeFieldRackView, {node: @node})
      return true
  
    get: (key, is_out = false) ->
      if is_out == true
        @node_fields_by_name.outputs[key]
      else
        @node_fields_by_name.inputs[key]
    
    set: (key, value) ->
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
    
    render_connections: =>
      for f of @node_fields.inputs
        @node_fields.inputs[f].render_connections()
      for f of @node_fields.outputs
        @node_fields.outputs[f].render_connections()
      true
    
    remove_all_connections: =>
      for f of @node_fields.inputs
        @node_fields.inputs[f].remove_connections()
      for f of @node_fields.outputs
        @node_fields.outputs[f].remove_connections()
    
    toJSON: =>
      res = 
        in: jQuery.map(@node_fields.inputs, (f, i) -> f.toJSON())
        out: jQuery.map(@node_fields.outputs, (f, i) -> f.toJSON()) 
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
    
    fromJSON: (data) =>
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
    
    addField: (name, value, direction = "inputs") =>
      f = false
      if $.type(value) == "object"
        if value.values
          f = new ThreeNodes.fields.types[value.type](name, value.val, value.values)
        else
          f = new ThreeNodes.fields.types[value.type](name, value.val)
        if value.default != null
          f.default_value = value.default
      else
        f = @create_field_from_default_type(name, value)
      if direction != "inputs"
        f.is_output = true
      
      @registerField(f)
      f
      
    addFields: (fields_array) =>
      for dir of fields_array
        # dir = inputs / outputs
        for fname of fields_array[dir]
          value = fields_array[dir][fname]
          @addField(fname, value, dir)
      true
    
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
        @view.add_field_listener($("#fid-#{field.fid}"))
      
      field
    
    render_sidebar: () =>
      $target = $("#tab-attribute")
      $target.html("");
      for f of @node_fields.inputs
        @node_fields.inputs[f].render_sidebar()
      true
    
    add_center_textfield: (field) =>
      $(".options .center", @node.main_view).append("<div><input type='text' id='f-txt-input-#{field.fid}' /></div>")
      f_in = $("#f-txt-input-#{field.fid}")
      field.on_value_update_hooks.update_center_textfield = (v) ->
        f_in.val(v.toString().substring(0, 10))
      f_in.val(field.get())
      if field.is_output == true
        f_in.attr("disabled", "disabled")
      else
        f_in.keypress (e) ->
          if e.which == 13
            field.set($(this).val())
            $(this).blur()
            
    create_field_from_default_type: (fname, default_value) ->
      ftype = switch $.type(default_value)
        when "number" then "Float"
        when "boolean" then "Bool"
        else "String"
      new ThreeNodes.fields.types[ftype](fname, default_value)
