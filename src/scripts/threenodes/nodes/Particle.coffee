define [
  'use!Underscore', 
  'use!Backbone',
  'order!threenodes/utils/Utils',
  'order!threenodes/models/Node',
  "order!libs/Tween",
  "order!libs/Sparks",
], (_, Backbone, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class ThreeNodes.nodes.ParticleSystem extends ThreeNodes.nodes.Object3D
    @node_name = 'ParticleSystem'
    @group_name = 'Particle'
    
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "geometry": {type: "Any", val: new THREE.CubeGeometry( 200, 200, 200 )}
          "material": {type: "Any", val: new THREE.ParticleBasicMaterial()}
          "sortParticles": false
      @ob = new THREE.ParticleSystem(@rack.getField('geometry').getValue(), @rack.getField('material').getValue())
      @ob.dynamic = true
      @geometry_cache = false
      @material_cache = false
      @compute()
    
    remove: () =>
      super
      delete @geometry_cache
      delete @material_cache
    
    rebuild_geometry: =>
      field = @rack.getField('geometry')
      if field.connections.length > 0
        geom = field.connections[0].from_field.node
        geom.cached = []
        geom.compute()
      else
        @rack.getField('geometry').setValue(new THREE.CubeGeometry( 200, 200, 200 ))
      
    compute: =>
      needs_rebuild = false
      
      if @material_cache != @rack.getField('material').getValue().id
        # let's trigger a geometry rebuild so we have the appropriate buffers set
        @rebuild_geometry()
      
      if @geometry_cache != @rack.getField('geometry').getValue().id || @material_cache != @rack.getField('material').getValue().id || needs_rebuild
        @ob = new THREE.ParticleSystem(@rack.getField('geometry').getValue(), @rack.getField('material').getValue())
        @geometry_cache = @rack.getField('geometry').getValue().id
        @material_cache = @rack.getField('material').getValue().id
      
      @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'geometry', 'material'])
      
      if needs_rebuild == true
        ThreeNodes.events.trigger("RebuildAllShaders")
      
      @rack.setField("out", @ob)
  
  class ThreeNodes.nodes.ParticleBasicMaterial extends ThreeNodes.NodeMaterialBase
    @node_name = 'ParticleBasicMaterial'
    @group_name = 'Materials'
    
    set_fields: =>
      super
      @ob = []
      @material_class = THREE.ParticleBasicMaterial
      @rack.addFields
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xff0000)}
          "map": {type: "Any", val: false}
          "size": 1
          "sizeAttenuation": true
          "vertexColors": false
        outputs:
          "out": {type: "Any", val: @ob}
      @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
      @material_cache = @create_cache_object(@vars_rebuild_shader_on_change)

  class ThreeNodes.nodes.SparksEmitter extends ThreeNodes.NodeBase
    @node_name = 'Emitter'
    @group_name = 'Particle.sparks'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @geom = new THREE.Geometry()
      @target_initializer = new SPARKS.Target( null, @setTargetParticle )
      @rack.addFields
        inputs:
          "counter": {type: "Any", val: new SPARKS.SteadyCounter(50)}
          "pool": {type: "Any", val: false}
          "initializers": {type: "Array", val: []}
          "actions": {type: "Array", val: []}
        outputs:
          "out": {type: "Any", val: @ob}
      @pool = @rack.getField("pool").getValue()
      @ob = new SPARKS.Emitter(@rack.getField("counter").getValue())
      #@ob._velocityVerlet = true
      #@ob.start()
    
    setTargetParticle: (p) =>
      if @pool && @pool.pool
        return @pool.pool.get()
    
    compute: =>
      if @rack.getField("pool").getValue() != false
        if @pool != @rack.getField("pool").getValue()
          @ob.removeCallback "created"
          @ob.removeCallback "dead"
          @ob.stop()
          @ob = new SPARKS.Emitter(@rack.getField("counter").getValue())
          @geom = new THREE.Geometry()
          
          @pool = @rack.getField("pool").getValue()
          @pool.init_pool(@geom)
          @ob.addCallback "created", @pool.on_particle_created
          #@ob.addCallback "updated", @pool.on_particle_updated
          @ob.addCallback "dead", @pool.on_particle_dead
          console.log "pool particle setup..."
      
      # works on a copy of the incoming array
      initializers = @rack.getField("initializers").getValue().slice(0)
      initializers.push(@target_initializer)
      
      @ob._initializers = initializers
      @ob._actions = @rack.getField("actions").getValue()
      @ob._counter = @rack.getField("counter").getValue()
      if @pool != false && @ob.isRunning() == false
        @ob.start()
      
      @rack.setField("out", @geom)
    
    remove: =>
      super
      if @ob
        @ob.removeCallback "created"
        @ob.removeCallback "dead"
        @ob.stop()
      delete @ob
      delete @target_initializer
      delete @geom
      delete @pool
  
  class ThreeNodes.nodes.SparksAge extends ThreeNodes.NodeBase
    @node_name = 'Age'
    @group_name = 'Particle.sparks.actions'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "easing": {type: "Any", val: TWEEN.Easing.Linear.EaseNone}
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.Age(@rack.getField("easing").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob._easing = @rack.getField("easing").get("value")
      @rack.setField("action", @ob)
  
  class ThreeNodes.nodes.SparksMove extends ThreeNodes.NodeBase
    @node_name = 'Move'
    @group_name = 'Particle.sparks.actions'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @rack.addFields
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.Move()
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @rack.setField("action", @ob)
  
  class ThreeNodes.nodes.SparksAccelerate extends ThreeNodes.NodeBase
    @node_name = 'Accelerate'
    @group_name = 'Particle.sparks.actions'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "vector": {type: "Vector3", val: new THREE.Vector3(0, 1, 0)}
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.Accelerate(@rack.getField("vector").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.acceleration = @rack.getField("vector").getValue()
      @rack.setField("action", @ob)
  
  class ThreeNodes.nodes.SparksAccelerateFactor extends ThreeNodes.NodeBase
    @node_name = 'AccelerateFactor'
    @group_name = 'Particle.sparks.actions'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "factor": 2.0
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.AccelerateFactor(@rack.getField("factor").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.factor = @rack.getField("factor").getValue()
      @rack.setField("action", @ob)
  
  class ThreeNodes.nodes.SparksAccelerateVelocity extends ThreeNodes.NodeBase
    @node_name = 'AccelerateVelocity'
    @group_name = 'Particle.sparks.actions'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "factor": 2.0
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.AccelerateVelocity(@rack.getField("factor").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.factor = @rack.getField("factor").getValue()
      @rack.setField("action", @ob)
  
  class ThreeNodes.nodes.SparksRandomDrift extends ThreeNodes.NodeBase
    @node_name = 'RandomDrift'
    @group_name = 'Particle.sparks.actions'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "vector": {type: "Vector3", val: new THREE.Vector3(0, 1, 0)}
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.RandomDrift(@rack.getField("vector").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.drift = @rack.getField("vector").getValue()
      @rack.setField("action", @ob)
  
  class ThreeNodes.nodes.SparksLifetime extends ThreeNodes.NodeBase
    @node_name = 'Lifetime'
    @group_name = 'Particle.sparks.initializers'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "min": 4
          "max": 7
        outputs:
          "initializer": {type: "Any", val: @ob}
      @ob = new SPARKS.Lifetime(@rack.getField("min").getValue(), @rack.getField("max").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob._min = @rack.getField("min").getValue()
      @ob._min = @rack.getField("max").getValue()
      @rack.setField("initializer", @ob)
  
  class ThreeNodes.nodes.SparksPosition extends ThreeNodes.NodeBase
    @node_name = 'Position'
    @group_name = 'Particle.sparks.initializers'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "zone": {type: "Any", val: new SPARKS.PointZone( new THREE.Vector3(0,0,0) )}
        outputs:
          "initializer": {type: "Any", val: @ob}
      @ob = new SPARKS.Position(@rack.getField("zone").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.zone = @rack.getField("zone").getValue()
      @rack.setField("initializer", @ob)
  
  class ThreeNodes.nodes.SparksPointZone extends ThreeNodes.NodeBase
    @node_name = 'PointZone'
    @group_name = 'Particle.sparks.zone'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "pos": {type: "Vector3", val: new THREE.Vector3()}
        outputs:
          "zone": {type: "Any", val: @ob}
      @ob = new SPARKS.PointZone(@rack.getField("pos").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.pos = @rack.getField("pos").getValue()
      @rack.setField("zone", @ob)
  
  class ThreeNodes.nodes.SparksLineZone extends ThreeNodes.NodeBase
    @node_name = 'LineZone'
    @group_name = 'Particle.sparks.zone'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "start": {type: "Vector3", val: new THREE.Vector3()}
          "end": {type: "Vector3", val: new THREE.Vector3(100, 0, 0)}
        outputs:
          "zone": {type: "Any", val: @ob}
      @ob = new SPARKS.LineZone(@rack.getField("start").getValue(), @rack.getField("end").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      if this.ob.start != this.rack.get("start").getValue() || this.ob.end != this.rack.get("end").getValue()
        @ob.start = @rack.getField("start").getValue()
        @ob.end = @rack.getField("end").getValue()
        @ob._length = @ob.end.clone().subSelf( @ob.start )
      @rack.setField("zone", @ob)
  
  class ThreeNodes.nodes.SparksCubeZone extends ThreeNodes.NodeBase
    @node_name = 'CubeZone'
    @group_name = 'Particle.sparks.zone'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "position": {type: "Vector3", val: new THREE.Vector3()}
          "x": 0
          "y": 0
          "z": 0
        outputs:
          "zone": {type: "Any", val: @ob}
      @ob = new SPARKS.CubeZone(@rack.getField("position").getValue(), @rack.getField("x").getValue(), @rack.getField("y").getValue(), @rack.getField("z").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.position = @rack.getField("position").getValue()
      @ob.x = @rack.getField("x").getValue()
      @ob.y = @rack.getField("y").getValue()
      @ob.z = @rack.getField("z").getValue()
      @rack.setField("zone", @ob)
  
  class ThreeNodes.nodes.SparksSteadyCounter extends ThreeNodes.NodeBase
    @node_name = 'SteadyCounter'
    @group_name = 'Particle.sparks'
    
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "rate": 100
        outputs:
          "counter": {type: "Any", val: @ob}
      @ob = new SPARKS.SteadyCounter(@rack.getField("rate").getValue())
    
    remove: () =>
      delete @ob
      super
    
    compute: =>
      @ob.pos = @rack.getField("rate").getValue()
      @rack.setField("counter", @ob)
  
  class ThreeNodes.nodes.ParticlePool extends ThreeNodes.NodeBase
    @node_name = 'ParticlePool'
    @group_name = 'Particle.sparks'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @geom = false
      @rack.addFields
        inputs:
          "maxParticles": 10000
        outputs:
          "pool": {type: "Any", val: this}
    
    remove: () =>
      delete @pool
      delete @geom
      super
    
    init_pool: (geom) =>
      @geom = geom
      @pool =
        pools: []
        get: () ->
          if @pools.length > 0
            return @pools.pop()
          return null
        add: (v) ->
          @pools.push(v)
          
      new_pos = () ->
        new THREE.Vertex(new THREE.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY))
      
      for i in [0..@rack.getField("maxParticles").getValue() - 1]
        pos = new_pos()
        geom.vertices.push(pos)
        @pool.add(pos)
      
    on_particle_created: (particle) =>
      if @geom == false
        return false
      target = particle.target
      
      if target
        particle.target.position = particle.position
    
    on_particle_updated: (particle) =>
      return true
    
    on_particle_dead: (particle) =>
      if @geom == false
        return false
      target = particle.target
      if target
        particle.target.position.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
        @pool.add(particle.target)
    
    compute: () =>
      if @geom != false
        @geom.__dirtyVertices = true
      @rack.setField("pool", this)
    
  class ThreeNodes.nodes.RandomCloudGeometry extends ThreeNodes.NodeBase
    @node_name = 'RandomCloudGeometry'
    @group_name = 'Particle'
    
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = new THREE.Geometry()
      @rack.addFields
        inputs:
          "nbrParticles": 20000
          "radius": 2000
          "rndVelocity": {type: "Vector3", val: new THREE.Vector3(1, 1, 1)}
          "linearVelocity": {type: "Vector3", val: new THREE.Vector3(1, 1, 1)}
        outputs:
          "out": {type: "Any", val: @ob}
      @cache = @get_cache_array()
      @generate()
    
    remove: () =>
      delete @ob
      delete @cache
      super
      
    get_cache_array: =>
      [@rack.getField("radius").getValue(), @rack.getField("nbrParticles").getValue(), @rack.getField("linearVelocity").getValue()]
    
    limit_position: (pos) =>
      radius = @rack.getField("radius").getValue()
      margin = 5
      if pos < radius * -1
        pos = radius - margin
      else if pos > radius
        pos = radius * -1 + margin
      pos
    
    move_particles: =>
      rndVelocity = @rack.getField("rndVelocity").getValue()
      for key,p of @ob.vertices
        p.position.x += Math.random() * rndVelocity.x - rndVelocity.x * 0.5 + p.velocity.x
        p.position.y += Math.random() * rndVelocity.y - rndVelocity.y * 0.5 + p.velocity.y
        p.position.z += Math.random() * rndVelocity.z - rndVelocity.z * 0.5 + p.velocity.z
        p.position.x = @limit_position(p.position.x)
        p.position.y = @limit_position(p.position.y)
        p.position.z = @limit_position(p.position.z)
      @ob.__dirtyVertices = true
      true
    
    generate: =>
      @ob = new THREE.Geometry()
      rad = @rack.getField("radius").getValue()
      total = @rack.getField("nbrParticles").getValue()
      linearVelocity = @rack.getField("linearVelocity").getValue()
      for i in [0..total]
        vector = new THREE.Vector3( Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad )
        v = new THREE.Vertex( vector )
        v.velocity = new THREE.Vector3( Math.random() * linearVelocity.x - linearVelocity.x * 0.5, Math.random() * linearVelocity.y - linearVelocity.y * 0.5, Math.random() * linearVelocity.z - linearVelocity.z * 0.5 )
        @ob.vertices.push( v )
      true
      
    compute: =>
      new_cache = @get_cache_array()
      if Utils.flatArraysAreEquals(new_cache, @cache) == false
        @generate()
        
      @move_particles()
      @cache = new_cache
      @rack.setField("out", @ob)
      