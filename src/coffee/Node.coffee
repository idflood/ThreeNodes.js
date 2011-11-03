field_click_1 = false

class NodeBase 
  constructor: (@x, @y, @inXML = false) ->
    if @inXML
      @nid = parseInt @inXML.attr("nid")
      uid = @nid
    else
      @nid = get_uid()
    @container = $("#container")
    @out_connections = []
    @rack = new NodeFieldRack(this, @inXML)
    @value = false
    @name = false
    @main_view = false
    @updated = false
    @init()
    @set_fields()
    if @inXML != false
      @rack.fromXML(@inXML)
    @init_context_menu()
    
  typename: => String(@constructor.name)
  
  init_context_menu: () =>
    self = this
    #$(@main_view).contextMenu {menu: "node-context-menu"}, (action, el, pos) ->
    #  if action == "remove_node"
    #    self.remove()
    $(".field", @main_view).contextMenu {menu: "field-context-menu"}, (action, el, pos) ->
      if action == "remove_connection"
        f_name = $(el).attr("id")
        f_type = $(el).parent().attr("class")
        field = self.rack.node_fields[f_type][f_name]
        field.remove_connections()
  
  create_cache_object: (values) =>
    res = {}
    for v in values
      res[v] = @rack.get(v).get()
    res
  
  input_value_has_changed: (values, cache = @material_cache) =>
    for v in values
      v2 = @rack.get(v).get()
      if v2 != cache[v]
        return true
    false
  
  set_fields: =>
    # to implement
  
  has_out_connection: () =>
    @out_connections.length != 0
  
  compute: () =>
    @value = @value
  
  remove: () =>
    @rack.remove_all_connections()
    @main_view.remove()
    # todo: maybe remove fields
    # todo: remove sidebar attributes if this is the selected node
  
  update: () =>
    if @updated == true
      return true
    @updated = true
    # update all input fields and their connected node source
    @rack.update_inputs()
    # update node output values based on inputs
    @compute()
  
  toXML: () =>
    pos = @main_view.position()
    "\t\t\t<node nid='#{@nid}' type='#{@typename()}' x='#{pos.left}' y='#{pos.top}'>#{@rack.toXML()}</node>\n"
  
  apply_fields_to_val: (afields, target, exceptions = []) =>
    for f of afields
      nf = afields[f]
      if exceptions.indexOf(nf.name) == -1
        target[nf.name] = @rack.get(nf.name).val
  
  create_field_connection: (field) =>
    f = this
    if field_click_1 == false
      field_click_1 = field
      $(".inputs .field").filter () ->
        $(this).parent().parent().parent().attr("id") != "nid-#{f.nid}"
      .addClass "field-possible-target"
    else
      field_click_2 = field
      new NodeConnection(field_click_1, field_click_2)
      $(".field").removeClass "field-possible-target"
      field_click_1 = false
      
  render_connections: () =>
    @rack.render_connections()
    #svg.safari()
  
  get_cached_array: (vals) =>
    res = []
    for v in vals
      res[res.length] = @rack.get(v).get()
  
  add_field_listener: ($field) =>
    self = this
    f_name = $field.attr("id")
    f_type = $field.parent().attr("class")
    field = @rack.node_fields[f_type][f_name]
    $field.click (e) ->
      e.preventDefault()
      if e.shiftKey == true
        field.remove_connections()
      else
        self.create_field_connection(field)
    this
    
  add_out_connection: (c, field) =>
    if @out_connections.indexOf(c) == -1
      @out_connections.push(c)
    c

  remove_connection: (c) =>
    c_index = @out_connections.indexOf(c)
    if c_index != -1
      @out_connections.splice(c_index, 1)
    c

  init: () =>
    self = this
    @main_view = $.tmpl(node_template, this)
    @container.append(@main_view)
    @main_view.css
      left: @x
      top: @y
    @main_view.draggable
      drag: () ->
        self.render_connections()
      stop: () ->
        self.render_connections()
    $(".head", @main_view).dblclick (e) ->
      $(".options", self.main_view).animate {height: 'toggle'}, 120, () ->
        self.render_connections()
        
    $(".head", @main_view).click (e) ->
      self.rack.render_sidebar()

class NodeNumberSimple extends NodeBase
  init: =>
    super
    @value = 0
    
  set_fields: =>
    @v_in = @rack.addInput(new fields.types.Float("in", 0))
    @v_out = @rack.addOutput(new fields.types.Float("out", 0))
    
  process_val: (num, i) => num
  
  compute: =>
    res = false
    switch $.type(@v_in.get())
      when "array" then res = _.map(@v_in.val, (n, i) -> @process_val(n, i))
      else res = @process_val(@v_in.get(), 0)
    if @v_out.get() != res
      @v_out.set res
    true

