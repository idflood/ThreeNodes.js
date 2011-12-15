define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.nodes.types.Utils.Random extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @rack.addFields
        inputs:
          "min" : 0
          "max" : 1
        outputs:
          "out" : 0
      @rack.add_center_textfield(@rack.get("out", true))
  
    compute: =>
      @value = @rack.get("min").get() + Math.random() * (@rack.get("max").get() - @rack.get("min").get())
      @rack.set("out", @value)
  
  # based on http://www.cycling74.com/forums/topic.php?id=7821
  class ThreeNodes.nodes.types.Utils.LFO extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @rndB = Math.random()
      @rndA = @rndB
      @rndrange = 1
      @flip = 0
      @taskinterval = 1
      @taskintervalhold = 20
      @clock = 0
      @PI = 3.14159
      
      @rack.addFields
        inputs:
          "min" : 0
          "max" : 1
          "duration" : 1000
          "mode": 
            type: "Float"
            val: 0
            values:
              "sawtooth": 0
              "sine": 1
              "triangle": 2
              "square waver": 3
              "random": 4
              "random triangle": 5
        outputs:
          "out" : 0
      @rack.add_center_textfield(@rack.get("out", true))
  
    compute: =>
      duration = @rack.get("duration").get()
      min = @rack.get("min").get()
      max = @rack.get("max").get()
      mode = @rack.get("mode").get()
      
      @clock = Date.now()
      time = (@taskinterval * @clock) % duration
      src = time / duration
      range = max - min
      lfoout = 0
      lfout = switch mode
        # sawtooth
        when 0 then (src * range) + min
        # sine
        when 1 then ( range * Math.sin(src * @PI)) + min
        # triangle
        when 2
          halfway = duration / 2
          if time < halfway
            (2 * src * range) + min
          else
            srctmp = (halfway - (time - halfway)) / duration
            (2 * srctmp * range) + min
        # square waver
        when 3
          low = time < duration / 2
          hi = time >= duration / 2
          low * min + hi * max
        # random
        when 4
          if time >= duration - @taskinterval
            @rndA = Math.random()
          (@rndA * range) + min
        # random triangle
        when 5
          if time < @taskinterval
            @rndA = @rndB
            @rndB = range * Math.random() + min
            @rndrange = @rndB - @rndA
          src * @rndrange + @rndA
      
      @rack.set("out", lfout)
  
  class ThreeNodes.nodes.types.Utils.Merge extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
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
        if k.val != null && k.connections.length > 0
          subval = k.val
          # if subvalue is an array append it to the result
          if jQuery.type(subval) == "array"
            @value = @value.concat(subval)
          else
            @value[@value.length] = subval
      @rack.set("out", @value)
  
  class ThreeNodes.nodes.types.Utils.Get extends ThreeNodes.NodeBase
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
        @rack.set("out", @value)
  
  class ThreeNodes.nodes.types.Utils.SoundInput extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
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
      @rack.set("low", ThreeNodes.flash_sound_value.kick)
      @rack.set("medium", ThreeNodes.flash_sound_value.snare)
      @rack.set("high", ThreeNodes.flash_sound_value.hat)
  
  class ThreeNodes.nodes.types.Utils.Timer extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
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
      @rack.set("out", @counter)