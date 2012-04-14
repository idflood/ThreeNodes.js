define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/models/Node',
  'cs!threenodes/utils/Utils',
], (_, Backbone) ->
  "use strict"
  
  $ = jQuery
  
  class ThreeNodes.nodes.MathSin extends ThreeNodes.NodeNumberSimple
    @node_name = 'Sin'
    @group_name = 'Math'
    
    process_val: (num, i) =>
      Math.sin(num)
  
  class ThreeNodes.nodes.MathCos extends ThreeNodes.NodeNumberSimple
    @node_name = 'Cos'
    @group_name = 'Math'
    
    process_val: (num, i) =>
      Math.cos(num)
  
  class ThreeNodes.nodes.MathTan extends ThreeNodes.NodeNumberSimple
    @node_name = 'Tan'
    @group_name = 'Math'
    
    process_val: (num, i) =>
      Math.tan(num)
  
  class ThreeNodes.nodes.MathRound extends ThreeNodes.NodeNumberSimple
    @node_name = 'Round'
    @group_name = 'Math'
    
    process_val: (num, i) =>
      Math.round(num)
  
  class ThreeNodes.nodes.MathCeil extends ThreeNodes.NodeNumberSimple
    @node_name = 'Ceil'
    @group_name = 'Math'
    
    process_val: (num, i) =>
      Math.ceil(num)
  
  class ThreeNodes.nodes.MathFloor extends ThreeNodes.NodeNumberSimple
    @node_name = 'Floor'
    @group_name = 'Math'
    
    process_val: (num, i) =>
      Math.floor(num)
  
  class ThreeNodes.NodeNumberParam1 extends ThreeNodes.NodeNumberSimple
    process_val: (num, numb, i) =>
      num + numb
    
    apply_num_to_vec2: (a, b, i) =>
      switch $.type(a)
        when "number" then new THREE.Vector2(@process_val(a, b.x, i), @process_val(a, b.y, i))
        when "object" then new THREE.Vector2(@process_val(a.x, b, i), @process_val(a.y, b, i))
    
    apply_num_to_vec3: (a, b, i) =>
      switch $.type(a)
        when "number" then new THREE.Vector3(@process_val(a, b.x, i), @process_val(a, b.y, i), @process_val(a, b.z, i))
        when "object" then new THREE.Vector3(@process_val(a.x, b, i), @process_val(a.y, b, i), @process_val(a.z, b, i))
    
    remove: () =>
      delete @v_factor
      super
    
    compute: =>
      res = []
      numItems = @fields.getMaxInputSliceCount()
      for i in [0..numItems]
        ref = @v_in.getValue(i)
        refb = @v_factor.getValue(i)
        switch $.type(ref)
          when "number"
            switch $.type(refb)
              when "number" then res[i] = @process_val(ref, refb, i)
              when "object"
                switch refb.constructor
                  when THREE.Vector2 then res[i] = @apply_num_to_vec2(ref, refb, i)
                  when THREE.Vector3 then res[i] = @apply_num_to_vec3(ref, refb, i)
          when "object"
            switch ref.constructor
              when THREE.Vector2
                switch $.type(refb)
                  when "number" then res[i] = @apply_num_to_vec2(ref, refb, i)
                  when "object" then res[i] = new THREE.Vector2(@process_val(ref.x, refb.x, i), @process_val(ref.y, refb.y, i))
              when THREE.Vector3
                switch $.type(refb)
                  when "number" then res[i] = @apply_num_to_vec3(ref, refb, i)
                  when "object" then res[i] = new THREE.Vector3(@process_val(ref.x, refb.x, i), @process_val(ref.y, refb.y, i), @process_val(ref.z, refb.z, i))
        
      #if @v_out.get() != res
      @v_out.setValue res
      true
  
  class ThreeNodes.nodes.MathMod extends ThreeNodes.NodeNumberParam1
    @node_name = 'Mod'
    @group_name = 'Math'
    
    setFields: =>
      super
      @v_factor = @fields.addField("y", {type: "Float", val: 2})
    process_val: (num, numb, i) =>
      num % numb
  
  class ThreeNodes.nodes.MathAdd extends ThreeNodes.NodeNumberParam1
    @node_name = 'Add'
    @group_name = 'Math'
    
    setFields: =>
      super
      @v_factor = @fields.addField("y", {type: "Float", val: 1})
    process_val: (num, numb, i) =>
      num + numb
  
  class ThreeNodes.nodes.MathSubtract extends ThreeNodes.NodeNumberParam1
    @node_name = 'Subtract'
    @group_name = 'Math'
    
    setFields: =>
      super
      @v_factor = @fields.addField("y", {type: "Float", val: 1})
    process_val: (num, numb, i) =>
      num - numb
  
  class ThreeNodes.nodes.MathMult extends ThreeNodes.NodeNumberParam1
    @node_name = 'Mult'
    @group_name = 'Math'
    
    setFields: =>
      super
      @v_factor = @fields.addField("factor", {type: "Float", val: 2})
    
    process_val: (num, numb, i) =>
      num * numb
    
                
  class ThreeNodes.nodes.MathDivide extends ThreeNodes.NodeNumberParam1
    @node_name = 'Divide'
    @group_name = 'Math'
    
    setFields: =>
      super
      @v_factor = @fields.addField("y", {type: "Float", val: 2})
    process_val: (num, numb, i) =>
      num / numb
  
  class ThreeNodes.nodes.MathMin extends ThreeNodes.NodeNumberParam1
    @node_name = 'Min'
    @group_name = 'Math'
    
    setFields: =>
      super
      @v_factor = @fields.addField("in2", {type: "Float", val: 0})
      
    process_val: (num, numb, i) =>
      Math.min(num, numb)
  
  class ThreeNodes.nodes.MathMax extends ThreeNodes.NodeNumberParam1
    @node_name = 'Max'
    @group_name = 'Math'
    
    setFields: =>
      super
      @v_factor = @fields.addField("in2", {type: "Float", val: 0})
      
    process_val: (num, numb, i) =>
      Math.max(num, numb)
      
  class ThreeNodes.nodes.MathAttenuation extends ThreeNodes.NodeNumberParam1
    @node_name = 'Attenuation'
    @group_name = 'Math'
    
    setFields: =>
      super
      @def_val = @fields.addField("default", 0)
      @reset_val = @fields.addField("reset", false)
      @v_factor = @fields.addField("factor", 0.8)
      @val = @def_val.getValue()
    process_val: (num, numb, i) =>
      if @reset_val.getValue(i) == true
        @val = @def_val.getValue(i)
      @val = @val + (@v_in.getValue(i) - @val) * @v_factor.getValue(i)
      @val
