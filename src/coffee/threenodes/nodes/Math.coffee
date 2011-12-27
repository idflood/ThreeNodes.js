define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.nodes.types.Math.Sin extends ThreeNodes.NodeNumberSimple
    process_val: (num, i) =>
      Math.sin(num)
  
  class ThreeNodes.nodes.types.Math.Cos extends ThreeNodes.NodeNumberSimple
    process_val: (num, i) =>
      Math.cos(num)
  
  class ThreeNodes.nodes.types.Math.Tan extends ThreeNodes.NodeNumberSimple
    process_val: (num, i) =>
      Math.tan(num)
  
  class ThreeNodes.nodes.types.Math.Round extends ThreeNodes.NodeNumberSimple
    process_val: (num, i) =>
      Math.round(num)
  
  class ThreeNodes.nodes.types.Math.Ceil extends ThreeNodes.NodeNumberSimple
    process_val: (num, i) =>
      Math.ceil(num)
  
  class ThreeNodes.nodes.types.Math.Floor extends ThreeNodes.NodeNumberSimple
    process_val: (num, i) =>
      Math.floor(num)
  
  class ThreeNodes.nodes.types.Math.Mod extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @v_valy = @rack.addField("y", 2)
    process_val: (num, i) =>
      num % @v_valy.get(i)
  
  class ThreeNodes.nodes.types.Math.Add extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @v_factor = @rack.addField("y", 1)
    process_val: (num, i) =>
      num + @v_factor.get(i)
  
  class ThreeNodes.nodes.types.Math.Subtract extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @v_factor = @rack.addField("y", 1)
    process_val: (num, i) =>
      num - @v_factor.get(i)
  
  class ThreeNodes.nodes.types.Math.Mult extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @v_factor = @rack.addField("factor", 2)
    process_val: (num, i) =>
      num * @v_factor.get(i)
  
  class ThreeNodes.nodes.types.Math.Divide extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @v_factor = @rack.addField("y", 2)
    process_val: (num, i) =>
      num / @v_factor.get(i)
  
  class ThreeNodes.nodes.types.Math.Min extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @v_inb = @rack.addField("in2", 0)
      @anim_obj = {in: 0, in2: 0}
    process_val: (num, i) =>
      Math.min(num, @v_inb.get(i))
  
  class ThreeNodes.nodes.types.Math.Max extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @v_inb = @rack.addField("in2", 0)
      @anim_obj = {in: 0, in2: 0}
    process_val: (num, i) =>
      Math.max(num, @v_inb.get(i))
      
  class ThreeNodes.nodes.types.Math.Attenuation extends ThreeNodes.NodeNumberSimple
    set_fields: =>
      super
      @def_val = @rack.addField("default", 0)
      @reset_val = @rack.addField("reset", false)
      @factor = @rack.addField("factor", 0.8)
      @val = @def_val.get()
    process_val: (num, i) =>
      if @reset_val.get() == true
        @val = @def_val.get()
      @val = @val + (@v_in.get() - @val) * @factor.get()
      @val
