class nodes.types.Math.Sin extends NodeNumberSimple
  process_val: (num, i) =>
    Math.sin(num)

class nodes.types.Math.Cos extends NodeNumberSimple
  process_val: (num, i) =>
    Math.cos(num)

class nodes.types.Math.Tan extends NodeNumberSimple
  process_val: (num, i) =>
    Math.tan(num)

class nodes.types.Math.Round extends NodeNumberSimple
  process_val: (num, i) =>
    Math.round(num)

class nodes.types.Math.Ceil extends NodeNumberSimple
  process_val: (num, i) =>
    Math.ceil(num)

class nodes.types.Math.Floor extends NodeNumberSimple
  process_val: (num, i) =>
    Math.floor(num)

class nodes.types.Math.Mod extends NodeNumberSimple
  set_fields: =>
    super
    @v_valy = @rack.addInput(new fields.types.Float("y", 2))
  process_val: (num, i) =>
    num % @v_valy.get()

class nodes.types.Math.Add extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("y", 1))
  process_val: (num, i) =>
    num + @v_factor.get()

class nodes.types.Math.Subtract extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("y", 1))
  process_val: (num, i) =>
    num - @v_factor.get()

class nodes.types.Math.Mult extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("factor", 2))
  process_val: (num, i) =>
    num * @v_factor.get()

class nodes.types.Math.Divide extends NodeNumberSimple
  set_fields: =>
    super
    @v_factor = @rack.addInput(new fields.types.Float("y", 2))
  process_val: (num, i) =>
    num / @v_factor.get()

class nodes.types.Math.Min extends NodeNumberSimple
  set_fields: =>
    super
    @v_inb = @rack.addInput(new fields.types.Float("in2", 0))
  process_val: (num, i) =>
    Math.min(num, @v_inb.get())

class nodes.types.Math.Max extends NodeNumberSimple
  set_fields: =>
    super
    @v_inb = @rack.addInput(new fields.types.Float("in2", 0))
  process_val: (num, i) =>
    Math.max(num, @v_inb.get())