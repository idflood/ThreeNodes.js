define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min",
  "order!libs/colorpicker/js/colorpicker",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  class ThreeNodes.nodes.types.Base.Number extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @rack.add_center_textfield(@v_in)
  
  class ThreeNodes.nodes.types.Base.String extends ThreeNodes.NodeBase
    init: =>
      super
      @value = ""
      
    set_fields: =>
      @rack.addFields
        inputs:
          "string": ""
        outputs:
          "out": {type: "Any", val: @ob}
    compute: =>
      @rack.set("out", @rack.get("string").get())
  
  class ThreeNodes.nodes.types.Base.Vector2 extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @vec = new THREE.Vector2(0, 0)
      @rack.addFields
        inputs:
          "xy" : {type: "Vector2", val: false}
          "x" : 0
          "y" : 0
        outputs:
          "xy" : {type: "Vector2", val: false}
          "x" : 0
          "y" : 0
    
    compute: =>
      old = @rack.get("xy", true).get()
      @value = @rack.get("xy").get()
      if @rack.get("xy").connections.length == 0
        @value = new THREE.Vector2(@rack.get("x").get(), @rack.get("y").get())
      if @value != old
        #@v_out.signal.dispatch @value
        @rack.set("xy", @value)
        @rack.set("x", @value.x)
        @rack.set("y", @value.y)
  
  class ThreeNodes.nodes.types.Base.Vector3 extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @vec = new THREE.Vector3(0, 0, 0)
      @rack.addFields
        inputs:
          "xyz" : {type: "Vector3", val: false}
          "x" : 0
          "y" : 0
          "z" : 0
        outputs:
          "xyz" : {type: "Vector3", val: false}
          "x" : 0
          "y" : 0
          "z" : 0
    
    compute: =>
      old = @rack.get("xyz", true).get()
      @value = @rack.get("xyz").get()
      if @rack.get("xyz").connections.length == 0
        #@vec.set @v_in_x.val, @v_in_y.val, @v_in_z.val
        @value = new THREE.Vector3(@rack.get("x").get(), @rack.get("y").get(), @rack.get("z").get())
      if @value != old
        @rack.set("xyz", @value)
        @rack.set("x", @value.x)
        @rack.set("y", @value.y)
        @rack.set("z", @value.z)
  
  class ThreeNodes.nodes.types.Base.Color extends ThreeNodes.NodeBase
    init_preview: () =>
      $(".center", @main_view).append("<div class='color_preview'></div>")
      col = @rack.get("rgb").get()
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
          background: v.getContextStyle()
    
    set_fields: =>
      super
      @vec = new THREE.Color(1, 0, 0)
      @rack.addFields
        inputs:
          "rgb": {type: "Color", val: false}
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
      old = @rack.get("rgb", true).get()
      @value = @rack.get("rgb").get()
      if @rack.get("rgb").connections.length == 0
        @value = new THREE.Color().setRGB(@rack.get("r").get(), @rack.get("g").get(), @rack.get("b").get())
      if @value != old
        @rack.set("rgb", @value)
        @rack.set("r", @value.r)
        @rack.set("g", @value.g)
        @rack.set("b", @value.b)
