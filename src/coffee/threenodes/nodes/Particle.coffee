define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "text!templates/node.tmpl.html",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  'order!threenodes/core/NodeFieldRack',
  'order!threenodes/utils/Utils',
  "order!libs/Tween",
  "order!libs/Sparks",
], ($, _, Backbone, _view_node_template) ->
  "use strict"
  class ThreeNodes.nodes.types.Particle.ParticleSystem extends ThreeNodes.nodes.types.Three.Object3D
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "geometry": {type: "Any", val: new THREE.CubeGeometry( 200, 200, 200 )}
          "material": {type: "Any", val: new THREE.ParticleBasicMaterial()}
          "sortParticles": false
      @ob = new THREE.ParticleSystem(@rack.get('geometry').get(), @rack.get('material').get())
      @ob.dynamic = true
      @geometry_cache = false
      @material_cache = false
      @compute()
    
    rebuild_geometry: =>
      field = @rack.get('geometry')
      if field.connections.length > 0
        geom = field.connections[0].from_field.node
        geom.cached = []
        geom.compute()
      else
        @rack.get('geometry').set(new THREE.CubeGeometry( 200, 200, 200 ))
      
    compute: =>
      needs_rebuild = false
      
      if @material_cache != @rack.get('material').get().id
        # let's trigger a geometry rebuild so we have the appropriate buffers set
        @rebuild_geometry()
      
      if @geometry_cache != @rack.get('geometry').get().id || @material_cache != @rack.get('material').get().id || needs_rebuild
        @ob = new THREE.ParticleSystem(@rack.get('geometry').get(), @rack.get('material').get())
        @geometry_cache = @rack.get('geometry').get().id
        @material_cache = @rack.get('material').get().id
      
      @apply_fields_to_val(@rack.node_fields.inputs, @ob, ['children', 'geometry', 'material'])
      
      if needs_rebuild == true
        ThreeNodes.rebuild_all_shaders()
      
      @rack.set("out", @ob)
  
  class ThreeNodes.nodes.types.Particle.ParticleBasicMaterial extends ThreeNodes.NodeMaterialBase
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

  class ThreeNodes.nodes.types.Particle.SparksEmitter extends ThreeNodes.NodeBase
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
      @pool = @rack.get("pool").get()
      @ob = new SPARKS.Emitter(@rack.get("counter").get())
      #@ob._velocityVerlet = true
      #@ob.start()
    
    setTargetParticle: (p) =>
      if @pool
        return @pool.pool.get()
    
    compute: =>
      if @rack.get("pool").get() != false
        if @pool != @rack.get("pool").get()
          @ob.removeCallback "created"
          @ob.removeCallback "dead"
          @ob.stop()
          @ob = new SPARKS.Emitter(@rack.get("counter").get())
          @geom = new THREE.Geometry()
          
          @pool = @rack.get("pool").get()
          @pool.init_pool(@geom)
          @ob.addCallback "created", @pool.on_particle_created
          #@ob.addCallback "updated", @pool.on_particle_updated
          @ob.addCallback "dead", @pool.on_particle_dead
          console.log "pool particle setup..."
      
      # works on a copy of the incoming array
      initializers = @rack.get("initializers").val.slice(0)
      initializers.push(@target_initializer)
      
      @ob._initializers = initializers
      @ob._actions = @rack.get("actions").val
      @ob._counter = @rack.get("counter").get()
      if @pool != false && @ob.isRunning() == false
        @ob.start()
      
      @rack.set("out", @geom)
    
    remove: =>
      super
      if @ob
        @ob.removeCallback "created"
        @ob.removeCallback "dead"
        @ob.stop()
  
  class ThreeNodes.nodes.types.Particle.SparksAge extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "easing": {type: "Any", val: TWEEN.Easing.Linear.EaseNone}
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.Age(@rack.get("easing").get())
    compute: =>
      @ob._easing = @rack.get("easing").val
      @rack.set("action", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksMove extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @rack.addFields
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.Move()
    compute: =>
      @rack.set("action", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksAccelerate extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "vector": {type: "Vector3", val: new THREE.Vector3(0, 1, 0)}
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.Accelerate(@rack.get("vector").get())
    compute: =>
      @ob.acceleration = @rack.get("vector").get()
      @rack.set("action", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksAccelerateFactor extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "factor": 2.0
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.AccelerateFactor(@rack.get("factor").get())
    compute: =>
      @ob.factor = @rack.get("factor").get()
      @rack.set("action", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksAccelerateVelocity extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "factor": 2.0
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.AccelerateVelocity(@rack.get("factor").get())
    compute: =>
      @ob.factor = @rack.get("factor").get()
      @rack.set("action", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksRandomDrift extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "vector": {type: "Vector3", val: new THREE.Vector3(0, 1, 0)}
        outputs:
          "action": {type: "Any", val: @ob}
      @ob = new SPARKS.RandomDrift(@rack.get("vector").get())
    compute: =>
      @ob.drift = @rack.get("vector").get()
      @rack.set("action", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksLifetime extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "min": 4
          "max": 7
        outputs:
          "initializer": {type: "Any", val: @ob}
      @ob = new SPARKS.Lifetime(@rack.get("min").get(), @rack.get("max").get())
    compute: =>
      @ob._min = @rack.get("min").get()
      @ob._min = @rack.get("max").get()
      @rack.set("initializer", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksPosition extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "zone": {type: "Any", val: new SPARKS.PointZone( new THREE.Vector3(0,0,0) )}
        outputs:
          "initializer": {type: "Any", val: @ob}
      @ob = new SPARKS.Position(@rack.get("zone").get())
    compute: =>
      @ob.zone = @rack.get("zone").get()
      @rack.set("initializer", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksPointZone extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "pos": {type: "Vector3", val: new THREE.Vector3()}
        outputs:
          "zone": {type: "Any", val: @ob}
      @ob = new SPARKS.PointZone(@rack.get("pos").get())
    compute: =>
      @ob.pos = @rack.get("pos").get()
      @rack.set("zone", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksLineZone extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "start": {type: "Vector3", val: new THREE.Vector3()}
          "end": {type: "Vector3", val: new THREE.Vector3(100, 0, 0)}
        outputs:
          "zone": {type: "Any", val: @ob}
      @ob = new SPARKS.LineZone(@rack.get("start").get(), @rack.get("end").get())
    compute: =>
      if this.ob.start != this.rack.get("start").get() || this.ob.end != this.rack.get("end").get()
        @ob.start = @rack.get("start").get()
        @ob.end = @rack.get("end").get()
        @ob._length = @ob.end.clone().subSelf( @ob.start )
      @rack.set("zone", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksCubeZone extends ThreeNodes.NodeBase
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
      @ob = new SPARKS.CubeZone(@rack.get("position").get(), @rack.get("x").get(), @rack.get("y").get(), @rack.get("z").get())
    compute: =>
      @ob.position = @rack.get("position").get()
      @ob.x = @rack.get("x").get()
      @ob.y = @rack.get("y").get()
      @ob.z = @rack.get("z").get()
      @rack.set("zone", @ob)
  
  class ThreeNodes.nodes.types.Particle.SparksSteadyCounter extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      
      @rack.addFields
        inputs:
          "rate": 100
        outputs:
          "counter": {type: "Any", val: @ob}
      @ob = new SPARKS.SteadyCounter(@rack.get("rate").get())
    compute: =>
      @ob.pos = @rack.get("rate").get()
      @rack.set("counter", @ob)
  
  class ThreeNodes.nodes.types.Particle.ParticlePool extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @geom = false
      @rack.addFields
        inputs:
          "maxParticles": 10000
        outputs:
          "pool": {type: "Any", val: this}
    
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
      
      for i in [0..@rack.get("maxParticles").get() - 1]
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
      @rack.set("pool", this)
    
  class ThreeNodes.nodes.types.Particle.RandomCloudGeometry extends ThreeNodes.NodeBase
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
    
    get_cache_array: =>
      [@rack.get("radius").get(), @rack.get("nbrParticles").get(), @rack.get("linearVelocity").get()]
    
    limit_position: (pos) =>
      radius = @rack.get("radius").get()
      margin = 5
      if pos < radius * -1
        pos = radius - margin
      else if pos > radius
        pos = radius * -1 + margin
      pos
    
    move_particles: =>
      rndVelocity = @rack.get("rndVelocity").get()
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
      rad = @rack.get("radius").get()
      total = @rack.get("nbrParticles").get()
      linearVelocity = @rack.get("linearVelocity").get()
      for i in [0..total]
        vector = new THREE.Vector3( Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad )
        v = new THREE.Vertex( vector )
        v.velocity = new THREE.Vector3( Math.random() * linearVelocity.x - linearVelocity.x * 0.5, Math.random() * linearVelocity.y - linearVelocity.y * 0.5, Math.random() * linearVelocity.z - linearVelocity.z * 0.5 )
        @ob.vertices.push( v )
      true
      
    compute: =>
      new_cache = @get_cache_array()
      if ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cache) == false
        @generate()
        
      @move_particles()
      @cache = new_cache
      @rack.set("out", @ob)
      