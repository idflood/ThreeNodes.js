define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/colorpicker/js/colorpicker",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.nodes.Number extends ThreeNodes.NodeNumberSimple
    @node_name = 'Number'
    @group_name = 'Base'
    
    set_fields: =>
      super
      @rack.add_center_textfield(@v_in)
  
  class ThreeNodes.nodes.Boolean extends ThreeNodes.NodeBase
    @node_name = 'Boolean'
    @group_name = 'Base'
    
    init: =>
      super
      @value = true
      
    set_fields: =>
      @rack.addFields
        inputs:
          "bool": true
        outputs:
          "out": {type: "Bool", val: @value}
    
    compute: =>
      @rack.set("out", @rack.get("bool").get())
  
  class ThreeNodes.nodes.String extends ThreeNodes.NodeBase
    @node_name = 'String'
    @group_name = 'Base'
    
    init: =>
      super
      @value = ""
      
    set_fields: =>
      @rack.addFields
        inputs:
          "string": ""
        outputs:
          "out": {type: "Any", val: @value}
     
      @rack.add_center_textfield(@rack.get("string"))
    
    compute: =>
      @rack.set("out", @rack.get("string").get())
  
  class ThreeNodes.nodes.Vector2 extends ThreeNodes.NodeBase
    @node_name = 'Vector2'
    @group_name = 'Base'
    
    set_fields: =>
      super
      @vec = new THREE.Vector2(0, 0)
      @rack.addFields
        inputs:
          "x" : 0
          "y" : 0
        outputs:
          "xy" : {type: "Vector2", val: false}
          "x" : 0
          "y" : 0
    
    compute: =>
      res = []
      resx = []
      resy = []
      numItems = @rack.getMaxInputSliceCount()
      
      for i in [0..numItems]
        resx[i] = @rack.get("x").get(i)
        resy[i] = @rack.get("y").get(i)
        res[i] = new THREE.Vector3(resx[i], resy[i])
      
      @rack.set("xy", res)
      @rack.set("x", resx)
      @rack.set("y", resy)
  
  class ThreeNodes.nodes.Vector3 extends ThreeNodes.NodeBase
    @node_name = 'Vector3'
    @group_name = 'Base'
    
    set_fields: =>
      super
      @rack.addFields
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
      numItems = @rack.getMaxInputSliceCount()
      
      for i in [0..numItems]
        resx[i] = @rack.get("x").get(i)
        resy[i] = @rack.get("y").get(i)
        resz[i] = @rack.get("z").get(i)
        res[i] = new THREE.Vector3(resx[i], resy[i], resz[i])
      
      @rack.set("xyz", res)
      @rack.set("x", resx)
      @rack.set("y", resy)
      @rack.set("z", resz)
  
  class ThreeNodes.nodes.Color extends ThreeNodes.NodeBase
    @node_name = 'Color'
    @group_name = 'Base'
    
    init_preview: () =>
      $(".center", @main_view).append("<div class='color_preview'></div>")
      col = @rack.get("rgb", true).get(0)
      self = this
      $(".color_preview", @main_view).ColorPicker
        color: {r: col.r * 255, g: col.g * 255, b: col.b * 255}
        onChange: (hsb, hex, rgb) ->
          self.rack.get("r").set(rgb.r / 255)
          self.rack.get("g").set(rgb.g / 255)
          self.rack.get("b").set(rgb.b / 255)
      # on output value change set preview color
      self.rack.get("rgb", true).on_value_update_hooks.set_bg_color_preview = (v) ->
        $(".color_preview", self.main_view).css
          background: v[0].getContextStyle()
    
    set_fields: =>
      super
      @rack.addFields
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
      numItems = @rack.getMaxInputSliceCount()
      
      for i in [0..numItems]
        resr[i] = @rack.get("r").get(i)
        resg[i] = @rack.get("g").get(i)
        resb[i] = @rack.get("b").get(i)
        res[i] = new THREE.Color().setRGB(resr[i], resg[i], resb[i])
      
      @rack.set("rgb", res)
      @rack.set("r", resr)
      @rack.set("g", resg)
      @rack.set("b", resb)
