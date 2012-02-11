define [
  'jQuery',
  'Underscore', 
  'Backbone',
  'order!threenodes/core/NodeField',
  'order!threenodes/core/NodeFieldRackView',
  'order!threenodes/collections/NodeFieldsCollection',
], ($, _, Backbone) ->
  "use strict"
  
  class ThreeNodes.NodeFieldRack
    constructor: (@node) ->
      @view = false
    
    onRegister: () ->
      @collection = new ThreeNodes.NodeFieldsCollection [],
        node: @node
        xml: @node.inXML
        json: @node.inJSON
      
      #if @context.player_mode == false
      @view = new ThreeNodes.NodeFieldRackView
        node: @node
        collection: @collection
      
      @context.injector.applyContext(@view)
      @
  
    get: (key, is_out = false) => @collection.getField(key, is_out)
    
    set: (key, value) => @collection.setField(key, value)
    
    getMaxInputSliceCount: () => @collection.getMaxInputSliceCount()
    
    getUpstreamNodes: () => @collection.getUpstreamNodes()
    
    getDownstreamNodes: () => @collection.getDownstreamNodes()
    
    setFieldInputUnchanged: () => @collection.setFieldInputUnchanged()
    
    render_connections: => @collection.renderConnections()
    
    remove_all_connections: => @collection.removeAllConnections()
    
    load: (xml, json) => @collection.load(xml, json)
    
    toJSON: => @collection.toJSON()
    
    toCode: => @collection.toCode()
    
    toXML: => @collection.toXML()
        
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
      
      @collection.registerField(f)
      @context.injector.applyContext(f)
      f
      
    addFields: (fields_array) =>
      for dir of fields_array
        # dir = inputs / outputs
        for fname of fields_array[dir]
          value = fields_array[dir][fname]
          @addField(fname, value, dir)
      @
        
    render_sidebar: () =>
      if @view
        @view.renderSidebar()
      @
    
    add_center_textfield: (field) =>
      if @view
        @view.addCenterTextfield(field)
      @
            
    create_field_from_default_type: (fname, default_value) ->
      ftype = switch $.type(default_value)
        when "number" then "Float"
        when "boolean" then "Bool"
        else "String"
      new ThreeNodes.fields.types[ftype](fname, default_value)
