define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/models/Node',
  "order!libs/colorpicker/js/colorpicker",
  'cs!threenodes/utils/Utils',
], (_, Backbone) ->
  #"use strict"
  
  $ = window.jQuery
  
  window.namespace "ThreeNodes.nodes",
    Number: class Number extends ThreeNodes.NodeNumberSimple
      @node_name = 'Number'
      @group_name = 'Base'
      
      setFields: =>
        super
        @fields.add_center_textfield(@v_in)
    
    Boolean: class Boolean extends ThreeNodes.NodeBase
      @node_name = 'Boolean'
      @group_name = 'Base'
      
      init: =>
        super
        @value = true
        
      setFields: =>
        @fields.addFields
          inputs:
            "bool": true
          outputs:
            "out": {type: "Bool", val: @value}
      
      compute: =>
        @fields.setField("out", @fields.getField("bool").getValue())
    
    String: class String extends ThreeNodes.NodeBase
      @node_name = 'String'
      @group_name = 'Base'
      
      init: =>
        super
        @value = ""
        
      setFields: =>
        @fields.addFields
          inputs:
            "string": ""
          outputs:
            "out": {type: "Any", val: @value}
       
        @fields.add_center_textfield(@fields.getField("string"))
      
      compute: =>
        @fields.setField("out", @fields.getField("string").getValue())
    
    Vector2: class Vector2 extends ThreeNodes.NodeBase
      @node_name = 'Vector2'
      @group_name = 'Base'
      
      setFields: =>
        super
        @vec = new THREE.Vector2(0, 0)
        @fields.addFields
          inputs:
            "x" : 0
            "y" : 0
          outputs:
            "xy" : {type: "Vector2", val: false}
            "x" : 0
            "y" : 0
      
      remove: () =>
        delete @vec
        super
      
      compute: =>
        res = []
        resx = []
        resy = []
        numItems = @fields.getMaxInputSliceCount()
        
        for i in [0..numItems]
          resx[i] = @fields.getField("x").getValue(i)
          resy[i] = @fields.getField("y").getValue(i)
          res[i] = new THREE.Vector3(resx[i], resy[i])
        
        @fields.setField("xy", res)
        @fields.setField("x", resx)
        @fields.setField("y", resy)
    
    Vector3: class Vector3 extends ThreeNodes.NodeBase
      @node_name = 'Vector3'
      @group_name = 'Base'
      
      setFields: =>
        super
        @fields.addFields
          inputs:
            "x" : 0
            "y" : 0
            "z" : 0
          outputs:
            "xyz" : {type: "Vector3", val: false}
            "x" : 0
            "y" : 0
            "z" : 0
      
      compute: =>
        res = []
        resx = []
        resy = []
        resz = []
        numItems = @fields.getMaxInputSliceCount()
        
        for i in [0..numItems]
          resx[i] = @fields.getField("x").getValue(i)
          resy[i] = @fields.getField("y").getValue(i)
          resz[i] = @fields.getField("z").getValue(i)
          res[i] = new THREE.Vector3(resx[i], resy[i], resz[i])
        
        @fields.setField("xyz", res)
        @fields.setField("x", resx)
        @fields.setField("y", resy)
        @fields.setField("z", resz)
    
    Color: class Color extends ThreeNodes.NodeBase
      @node_name = 'Color'
      @group_name = 'Base'
      
      init_preview: () =>
        @$picker_el = $("<div class='color_preview'></div>")
        col = @fields.getField("rgb", true).getValue(0)
        @$picker_el.ColorPicker
          color: {r: col.r * 255, g: col.g * 255, b: col.b * 255}
          onChange: (hsb, hex, rgb) =>
            @fields.getField("r").setValue(rgb.r / 255)
            @fields.getField("g").setValue(rgb.g / 255)
            @fields.getField("b").setValue(rgb.b / 255)
        
        @fields.trigger("addCustomHtml", @$picker_el, ".center")
        
        # on output value change set preview color
        @fields.getField("rgb", true).on_value_update_hooks.set_bg_color_preview = (v) =>
          @$picker_el.css
            background: v[0].getContextStyle()
      
      remove: () =>
        @$picker_el.each () ->
          if $(this).data('colorpickerId')
            cal = $('#' + $(this).data('colorpickerId'))
            picker = cal.data('colorpicker')
            if picker
              delete picker.onChange
            # remove colorpicker dom element
            cal.remove()
        @$picker_el.unbind()
        @$picker_el.remove()
        delete @$picker_el
        super
      
      setFields: =>
        super
        @fields.addFields
          inputs:
            "r": 0
            "g": 0
            "b": 0
          outputs:
            "rgb": {type: "Color", val: false}
            "r": 0
            "g": 0
            "b": 0
        @init_preview()
      
      compute: =>
        res = []
        resr = []
        resg = []
        resb = []
        numItems = @fields.getMaxInputSliceCount()
        
        for i in [0..numItems]
          resr[i] = @fields.getField("r").getValue(i)
          resg[i] = @fields.getField("g").getValue(i)
          resb[i] = @fields.getField("b").getValue(i)
          res[i] = new THREE.Color().setRGB(resr[i], resg[i], resb[i])
        
        @fields.setField("rgb", res)
        @fields.setField("r", resr)
        @fields.setField("g", resg)
        @fields.setField("b", resb)
