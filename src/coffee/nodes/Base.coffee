class nodes.types.Base.Number extends NodeNumberSimple
  set_fields: =>
    super
    @rack.add_center_textfield(@v_in)

class nodes.types.Base.String extends NodeBase
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
    @rack.get("out", true).set @rack.get("string").get()

class nodes.types.Base.Vector2 extends NodeBase
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
      @rack.get("xy", true).set @value
      @rack.get("x", true).set @value.x
      @rack.get("y", true).set @value.y

class nodes.types.Base.Vector3 extends NodeBase
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
      #@value = @vec
      @value = new THREE.Vector3(@rack.get("x").get(), @rack.get("y").get(), @rack.get("z").get())
    if @value != old
      #@v_out.signal.dispatch @value
      @rack.get("xyz", true).set @value
      @rack.get("x", true).set @value.x
      @rack.get("y", true).set @value.y
      @rack.get("z", true).set @value.z

class nodes.types.Base.Color extends NodeBase
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
  
  compute: =>
    old = @rack.get("rgb", true).get()
    @value = @rack.get("rgb").get()
    if @rack.get("rgb").connections.length == 0
      @value = new THREE.Color().setRGB(@rack.get("r").get(), @rack.get("g").get(), @rack.get("b").get())
    if @value != old
      @rack.get("rgb", true).set @value
      @rack.get("r", true).set @value.r
      @rack.get("g", true).set @value.g
      @rack.get("b", true).set @value.b
