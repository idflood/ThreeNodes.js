class nodes.types.Utils.Random extends NodeBase
  set_fields: =>
    super
    @rack.addFields
      inputs:
        "min" : 0
        "max" : 1
      outputs:
        "out" : 0
    @rack.add_center_textfield(@rack.get("out", true))

  compute: =>
    old = @rack.get("out", true).get()
    @value = @rack.get("min").get() + Math.random() * (@rack.get("max").get() - @rack.get("min").get())
    if @value != old
      @rack.get("out", true).set @value

class nodes.types.Utils.Merge extends NodeBase
  set_fields: =>
    super
    @rack.addFields
      inputs:
        "in0" : {type: "Any", val: null}
        "in1" : {type: "Any", val: null}
        "in2" : {type: "Any", val: null}
        "in3" : {type: "Any", val: null}
        "in4" : {type: "Any", val: null}
        "in5" : {type: "Any", val: null}
      outputs:
        "out" : {type: "Array", val: []}

  compute: =>
    old = @rack.get("out", true).get()
    @value = []
    for f of @rack.node_fields.inputs
      k = @rack.node_fields.inputs[f]
      if k.get() != null && k.connections.length > 0
        @value[@value.length] = k.get()
    if @value != old
      @rack.get("out", true).set @value

class nodes.types.Utils.Get extends NodeBase
  set_fields: =>
    super
    @rack.addFields
      inputs:
        "array" : {type: "Array", val: null}
        "index" : 0
      outputs:
        "out" : {type: "Any", val: null}

  compute: =>
    old = @rack.get("out", true).get()
    @value = false
    arr = @rack.get("array").get()
    ind = parseInt(@rack.get("index").get())
    if $.type(arr) == "array"
      @value = arr[ind % arr.length]
    if @value != old
      @rack.get("out", true).set @value

class nodes.types.Utils.SoundInput extends NodeBase
  set_fields: =>
    super
    @counter = 0
    @rack.addFields
      inputs:
        "gain": 1.0
      outputs:
        "low" : 0
        "medium" : 0
        "high" : 0
  compute: () =>
    #console.log flash_sound_value
    @rack.get("low", true).set flash_sound_value.kick
    @rack.get("medium", true).set flash_sound_value.snare
    @rack.get("high", true).set flash_sound_value.hat
  

class nodes.types.Utils.Timer extends NodeBase
  set_fields: =>
    super
    @old = @get_time()
    @counter = 0
    @rack.addFields
      inputs:
        "reset" : false
        "pause" : false
        "max" : 99999999999
      outputs:
        "out" : 0
    @rack.add_center_textfield(@rack.get("out", true))
  
  get_time: => new Date().getTime()
    
  compute: =>
    oldval = @rack.get("out", true).get()
    now = @get_time()
    if @rack.get("pause").get() == false
      @counter += now - @old
    if @rack.get("reset").get() == true
      @counter = 0
    
    diff = @rack.get("max").get() - @counter
    if diff <= 0
      #@counter = diff * -1
      @counter = 0
    @old = now
    @rack.get("out", true).set @counter