class NodeFieldRack
  constructor: (@node) ->
    @node_fields = {}
    @node_fields.inputs = {}
    @node_fields.outputs = {}
    @node_fields_by_name = {}
    @node_fields_by_name.inputs = {}
    @node_fields_by_name.outputs = {}

  get: (key, is_out = false) ->
    if is_out == true
      @node_fields_by_name.outputs[key]
    else
      @node_fields_by_name.inputs[key]
  
  render_connections: =>
    for f of @node_fields.inputs
      @node_fields.inputs[f].render_connections()
    for f of @node_fields.outputs
      @node_fields.outputs[f].render_connections()
    true
  
  toXML: =>
    res = "<in>"
    for f of @node_fields.inputs
      res += @node_fields.inputs[f].toXML()
    res += "</in>"
    
    res
  
  update_inputs: =>
    for f of @node_fields.inputs
      @node_fields.inputs[f].update_input_node()
      
  addInput: (field) =>
    field.node = @node
    @node_fields.inputs["fid-" + field.fid] = field
    @node_fields_by_name.inputs[field.name] = field
    $(".inputs", @node.main_view).append(field.render_button())
    @node.add_field_listener($("#fid-#{field.fid}"))
    field
  
  addOutput: (field) =>
    field.node = @node
    field.is_output = true
    @node_fields.outputs["fid-" + field.fid] = field
    @node_fields_by_name.outputs[field.name] = field
    $(".outputs", @node.main_view).append(field.render_button())
    @node.add_field_listener($("#fid-#{field.fid}"))
    field
    
  addFields: (fields_array) =>
    for dir of fields_array
      # dir = inputs / outputs
      for fname of fields_array[dir]
        k = fields_array[dir][fname]
        f = false
        if $.type(k) == "object"
          f = new fields.types[k.type](fname, k.val)
        else
          f = @create_field_from_default_type(fname, k)
        if dir == "inputs"
          @addInput(f)
        else
          @addOutput(f)
    false
    
  render_sidebar: () =>
    $target = $("#tab-attribute")
    $target.html("");
    for f of @node_fields.inputs
      console.log @node_fields.inputs[f]
      @node_fields.inputs[f].render_sidebar()
    false
  
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
    new fields.types[ftype](fname, default_value)