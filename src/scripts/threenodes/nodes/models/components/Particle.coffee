_ = require 'Underscore'
Backbone = require 'Backbone'
Utils = require 'threenodes/utils/Utils'
Node = require 'threenodes/nodes/models/Node'
namespace = require('libs/namespace').namespace
require './Three'
require './Materials'
require 'libs/Tween'
require 'libs/Sparks'

namespace "ThreeNodes.nodes.models",
  ParticleSystem: class ParticleSystem extends ThreeNodes.nodes.models.Object3D
    @node_name = 'ParticleSystem'
    @group_name = 'Particle'

    initialize: () =>
      super
      @ob = new THREE.ParticleSystem(new THREE.CubeGeometry( 200, 200, 200 ), new THREE.ParticleBasicMaterial())
      @ob.dynamic = true
      @geometry_cache = false
      @material_cache = false
      @compute()

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "geometry": {type: "Any", val: new THREE.CubeGeometry( 200, 200, 200 )}
          "material": {type: "Any", val: new THREE.ParticleBasicMaterial()}
          "sortParticles": false
      return $.extend(true, base_fields, fields)

    remove: () =>
      super
      delete @geometry_cache
      delete @material_cache

    rebuild_geometry: =>
      field = @fields.getField('geometry')
      if field.connections.length > 0
        geom = field.connections[0].from_field.node
        geom.cached = []
        geom.compute()
      else
        @fields.getField('geometry').setValue(new THREE.CubeGeometry( 200, 200, 200 ))

    compute: =>
      needs_rebuild = false

      if @material_cache != @fields.getField('material').getValue().id
        # let's trigger a geometry rebuild so we have the appropriate buffers set
        @rebuild_geometry()

      if @geometry_cache != @fields.getField('geometry').getValue().id || @material_cache != @fields.getField('material').getValue().id || needs_rebuild
        @ob = new THREE.ParticleSystem(@fields.getField('geometry').getValue(), @fields.getField('material').getValue())
        @geometry_cache = @fields.getField('geometry').getValue().id
        @material_cache = @fields.getField('material').getValue().id

      @applyFieldsToVal(@fields.inputs, @ob, ['children', 'geometry', 'material'])

      if needs_rebuild == true
        @trigger("RebuildAllShaders")

      @fields.setField("out", @ob)

  ParticleBasicMaterial: class ParticleBasicMaterial extends ThreeNodes.NodeMaterialBase
    @node_name = 'ParticleBasicMaterial'
    @group_name = 'Materials'

    initialize: (options) =>
      super
      @ob = []
      @material_class = THREE.ParticleBasicMaterial
      @vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"]
      @material_cache = @createCacheObject(@vars_rebuild_shader_on_change)

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "color": {type: "Color", val: new THREE.Color(0xff0000)}
          "map": {type: "Any", val: false}
          "size": 1
          "sizeAttenuation": true
          "vertexColors": false
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

  SparksEmitter: class SparksEmitter extends Node
    @node_name = 'Emitter'
    @group_name = 'Particle.sparks'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @geom = new THREE.Geometry()
      @target_initializer = new SPARKS.Target( null, @setTargetParticle )
      @pool = @fields.getField("pool").getValue()
      @ob = new SPARKS.Emitter(@fields.getField("counter").getValue())

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "counter": {type: "Any", val: new SPARKS.SteadyCounter(50)}
          "pool": {type: "Any", val: false}
          "initializers": {type: "Array", val: []}
          "actions": {type: "Array", val: []}
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    setTargetParticle: (p) =>
      if @pool && @pool.pool
        return @pool.pool.get()

    compute: =>
      if @fields.getField("pool").getValue() != false
        if @pool != @fields.getField("pool").getValue()
          @ob.removeCallback "created"
          @ob.removeCallback "dead"
          @ob.stop()
          @ob = new SPARKS.Emitter(@fields.getField("counter").getValue())
          @geom = new THREE.Geometry()

          @pool = @fields.getField("pool").getValue()
          @pool.init_pool(@geom)
          @ob.addCallback "created", @pool.on_particle_created
          #@ob.addCallback "updated", @pool.on_particle_updated
          @ob.addCallback "dead", @pool.on_particle_dead
          console.log "pool particle setup..."

      # works on a copy of the incoming array
      initializers = @fields.getField("initializers").getValue().slice(0)
      initializers.push(@target_initializer)

      @ob._initializers = initializers
      @ob._actions = @fields.getField("actions").getValue()
      @ob._counter = @fields.getField("counter").getValue()
      if @pool != false && @ob.isRunning() == false
        @ob.start()

      @fields.setField("out", @geom)

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

  SparksAge: class SparksAge extends Node
    @node_name = 'Age'
    @group_name = 'Particle.sparks.actions'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.Age(TWEEN.Easing.Linear.EaseNone)

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "easing": {type: "Any", val: TWEEN.Easing.Linear.EaseNone}
        outputs:
          "action": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob._easing = @fields.getField("easing").get("value")
      @fields.setField("action", @ob)

  SparksMove: class SparksMove extends Node
    @node_name = 'Move'
    @group_name = 'Particle.sparks.actions'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.Move()

    getFields: =>
      base_fields = super
      fields =
        outputs:
          "action": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @fields.setField("action", @ob)

  SparksAccelerate: class SparksAccelerate extends Node
    @node_name = 'Accelerate'
    @group_name = 'Particle.sparks.actions'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.Accelerate(new THREE.Vector3(0, 1, 0))

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "vector": {type: "Vector3", val: new THREE.Vector3(0, 1, 0)}
        outputs:
          "action": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.acceleration = @fields.getField("vector").getValue()
      @fields.setField("action", @ob)

  SparksAccelerateFactor: class SparksAccelerateFactor extends Node
    @node_name = 'AccelerateFactor'
    @group_name = 'Particle.sparks.actions'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.AccelerateFactor(2.0)

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "factor": 2.0
        outputs:
          "action": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.factor = @fields.getField("factor").getValue()
      @fields.setField("action", @ob)

  SparksAccelerateVelocity: class SparksAccelerateVelocity extends Node
    @node_name = 'AccelerateVelocity'
    @group_name = 'Particle.sparks.actions'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.AccelerateVelocity(2.0)

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "factor": 2.0
        outputs:
          "action": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.factor = @fields.getField("factor").getValue()
      @fields.setField("action", @ob)

  SparksRandomDrift: class SparksRandomDrift extends Node
    @node_name = 'RandomDrift'
    @group_name = 'Particle.sparks.actions'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.RandomDrift(new THREE.Vector3(0, 1, 0))

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "vector": {type: "Vector3", val: new THREE.Vector3(0, 1, 0)}
        outputs:
          "action": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.drift = @fields.getField("vector").getValue()
      @fields.setField("action", @ob)

  SparksLifetime: class SparksLifetime extends Node
    @node_name = 'Lifetime'
    @group_name = 'Particle.sparks.initializers'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.Lifetime(4, 7)

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "min": 4
          "max": 7
        outputs:
          "initializer": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob._min = @fields.getField("min").getValue()
      @ob._min = @fields.getField("max").getValue()
      @fields.setField("initializer", @ob)

  SparksPosition: class SparksPosition extends Node
    @node_name = 'Position'
    @group_name = 'Particle.sparks.initializers'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.Position(new SPARKS.PointZone( new THREE.Vector3(0,0,0)))

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "zone": {type: "Any", val: new SPARKS.PointZone( new THREE.Vector3(0,0,0))}
        outputs:
          "initializer": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.zone = @fields.getField("zone").getValue()
      @fields.setField("initializer", @ob)

  SparksPointZone: class SparksPointZone extends Node
    @node_name = 'PointZone'
    @group_name = 'Particle.sparks.zone'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.PointZone(new THREE.Vector3())

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "pos": {type: "Vector3", val: new THREE.Vector3()}
        outputs:
          "zone": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.pos = @fields.getField("pos").getValue()
      @fields.setField("zone", @ob)

  SparksLineZone: class SparksLineZone extends Node
    @node_name = 'LineZone'
    @group_name = 'Particle.sparks.zone'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.LineZone(new THREE.Vector3(), new THREE.Vector3(100, 0, 0))

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "start": {type: "Vector3", val: new THREE.Vector3()}
          "end": {type: "Vector3", val: new THREE.Vector3(100, 0, 0)}
        outputs:
          "zone": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      if this.ob.start != this.fields.get("start").getValue() || this.ob.end != this.fields.get("end").getValue()
        @ob.start = @fields.getField("start").getValue()
        @ob.end = @fields.getField("end").getValue()
        @ob._length = @ob.end.clone().subSelf( @ob.start )
      @fields.setField("zone", @ob)

  SparksCubeZone: class SparksCubeZone extends Node
    @node_name = 'CubeZone'
    @group_name = 'Particle.sparks.zone'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.CubeZone(new THREE.Vector3(), 0, 0, 0)

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "position": {type: "Vector3", val: new THREE.Vector3()}
          "x": 0
          "y": 0
          "z": 0
        outputs:
          "zone": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.position = @fields.getField("position").getValue()
      @ob.x = @fields.getField("x").getValue()
      @ob.y = @fields.getField("y").getValue()
      @ob.z = @fields.getField("z").getValue()
      @fields.setField("zone", @ob)

  SparksSteadyCounter: class SparksSteadyCounter extends Node
    @node_name = 'SteadyCounter'
    @group_name = 'Particle.sparks'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new SPARKS.SteadyCounter(100)

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "rate": 100
        outputs:
          "counter": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      super

    compute: =>
      @ob.pos = @fields.getField("rate").getValue()
      @fields.setField("counter", @ob)

  ParticlePool: class ParticlePool extends Node
    @node_name = 'ParticlePool'
    @group_name = 'Particle.sparks'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @geom = false

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "maxParticles": 10000
        outputs:
          "pool": {type: "Any", val: this}
      return $.extend(true, base_fields, fields)

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
        new THREE.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)

      for i in [0..@fields.getField("maxParticles").getValue() - 1]
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
        @geom.verticesNeedUpdate = true
      @fields.setField("pool", this)

  RandomCloudGeometry: class RandomCloudGeometry extends Node
    @node_name = 'RandomCloudGeometry'
    @group_name = 'Particle'

    initialize: (options) =>
      super
      @auto_evaluate = true
      @ob = new THREE.Geometry()
      @cache = @get_cache_array()
      @generate()

    getFields: =>
      base_fields = super
      fields =
        inputs:
          "nbrParticles": 20000
          "radius": 2000
          "rndVelocity": {type: "Vector3", val: new THREE.Vector3(1, 1, 1)}
          "linearVelocity": {type: "Vector3", val: new THREE.Vector3(1, 1, 1)}
        outputs:
          "out": {type: "Any", val: @ob}
      return $.extend(true, base_fields, fields)

    remove: () =>
      delete @ob
      delete @cache
      super

    get_cache_array: =>
      [@fields.getField("radius").getValue(), @fields.getField("nbrParticles").getValue(), @fields.getField("linearVelocity").getValue()]

    limit_position: (pos) =>
      radius = @fields.getField("radius").getValue()
      margin = 5
      if pos < radius * -1
        pos = radius - margin
      else if pos > radius
        pos = radius * -1 + margin
      pos

    move_particles: =>
      rndVelocity = @fields.getField("rndVelocity").getValue()
      for key,p of @ob.vertices
        p.x += Math.random() * rndVelocity.x - rndVelocity.x * 0.5 + p.velocity.x
        p.y += Math.random() * rndVelocity.y - rndVelocity.y * 0.5 + p.velocity.y
        p.z += Math.random() * rndVelocity.z - rndVelocity.z * 0.5 + p.velocity.z
        p.x = @limit_position(p.x)
        p.y = @limit_position(p.y)
        p.z = @limit_position(p.z)
      @ob.verticesNeedUpdate = true
      true

    generate: =>
      @ob = new THREE.Geometry()
      rad = @fields.getField("radius").getValue()
      total = @fields.getField("nbrParticles").getValue()
      linearVelocity = @fields.getField("linearVelocity").getValue()
      for i in [0..total]
        v = new THREE.Vector3( Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad )
        v.velocity = new THREE.Vector3( Math.random() * linearVelocity.x - linearVelocity.x * 0.5, Math.random() * linearVelocity.y - linearVelocity.y * 0.5, Math.random() * linearVelocity.z - linearVelocity.z * 0.5 )
        @ob.vertices.push( v )
      true

    compute: =>
      new_cache = @get_cache_array()
      if Utils.flatArraysAreEquals(new_cache, @cache) == false
        @generate()

      @move_particles()
      @cache = new_cache
      @fields.setField("out", @ob)
