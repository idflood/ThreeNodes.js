var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', 'order!threenodes/models/Node', 'order!threenodes/utils/Utils', "order!libs/Tween", "order!libs/Sparks"], function($, _, Backbone) {
  "use strict";  ThreeNodes.nodes.ParticleSystem = (function(_super) {

    __extends(ParticleSystem, _super);

    function ParticleSystem() {
      this.compute = __bind(this.compute, this);
      this.rebuild_geometry = __bind(this.rebuild_geometry, this);
      this.set_fields = __bind(this.set_fields, this);
      ParticleSystem.__super__.constructor.apply(this, arguments);
    }

    ParticleSystem.node_name = 'ParticleSystem';

    ParticleSystem.group_name = 'Particle';

    ParticleSystem.prototype.set_fields = function() {
      ParticleSystem.__super__.set_fields.apply(this, arguments);
      this.rack.addFields({
        inputs: {
          "geometry": {
            type: "Any",
            val: new THREE.CubeGeometry(200, 200, 200)
          },
          "material": {
            type: "Any",
            val: new THREE.ParticleBasicMaterial()
          },
          "sortParticles": false
        }
      });
      this.ob = new THREE.ParticleSystem(this.rack.get('geometry').get(), this.rack.get('material').get());
      this.ob.dynamic = true;
      this.geometry_cache = false;
      this.material_cache = false;
      return this.compute();
    };

    ParticleSystem.prototype.rebuild_geometry = function() {
      var field, geom;
      field = this.rack.get('geometry');
      if (field.connections.length > 0) {
        geom = field.connections[0].from_field.node;
        geom.cached = [];
        return geom.compute();
      } else {
        return this.rack.get('geometry').setValue(new THREE.CubeGeometry(200, 200, 200));
      }
    };

    ParticleSystem.prototype.compute = function() {
      var needs_rebuild;
      needs_rebuild = false;
      if (this.material_cache !== this.rack.get('material').get().id) {
        this.rebuild_geometry();
      }
      if (this.geometry_cache !== this.rack.get('geometry').get().id || this.material_cache !== this.rack.get('material').get().id || needs_rebuild) {
        this.ob = new THREE.ParticleSystem(this.rack.get('geometry').get(), this.rack.get('material').get());
        this.geometry_cache = this.rack.get('geometry').get().id;
        this.material_cache = this.rack.get('material').get().id;
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob, ['children', 'geometry', 'material']);
      if (needs_rebuild === true) ThreeNodes.rebuild_all_shaders();
      return this.rack.setField("out", this.ob);
    };

    return ParticleSystem;

  })(ThreeNodes.nodes.Object3D);
  ThreeNodes.nodes.ParticleBasicMaterial = (function(_super) {

    __extends(ParticleBasicMaterial, _super);

    function ParticleBasicMaterial() {
      this.set_fields = __bind(this.set_fields, this);
      ParticleBasicMaterial.__super__.constructor.apply(this, arguments);
    }

    ParticleBasicMaterial.node_name = 'ParticleBasicMaterial';

    ParticleBasicMaterial.group_name = 'Materials';

    ParticleBasicMaterial.prototype.set_fields = function() {
      ParticleBasicMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = [];
      this.material_class = THREE.ParticleBasicMaterial;
      this.rack.addFields({
        inputs: {
          "color": {
            type: "Color",
            val: new THREE.Color(0xff0000)
          },
          "map": {
            type: "Any",
            val: false
          },
          "size": 1,
          "sizeAttenuation": true,
          "vertexColors": false
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.vars_rebuild_shader_on_change = ["transparent", "depthTest", "map"];
      return this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
    };

    return ParticleBasicMaterial;

  })(ThreeNodes.NodeMaterialBase);
  ThreeNodes.nodes.SparksEmitter = (function(_super) {

    __extends(SparksEmitter, _super);

    function SparksEmitter() {
      this.remove = __bind(this.remove, this);
      this.compute = __bind(this.compute, this);
      this.setTargetParticle = __bind(this.setTargetParticle, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksEmitter.__super__.constructor.apply(this, arguments);
    }

    SparksEmitter.node_name = 'Emitter';

    SparksEmitter.group_name = 'Particle.sparks';

    SparksEmitter.prototype.set_fields = function() {
      SparksEmitter.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.geom = new THREE.Geometry();
      this.target_initializer = new SPARKS.Target(null, this.setTargetParticle);
      this.rack.addFields({
        inputs: {
          "counter": {
            type: "Any",
            val: new SPARKS.SteadyCounter(50)
          },
          "pool": {
            type: "Any",
            val: false
          },
          "initializers": {
            type: "Array",
            val: []
          },
          "actions": {
            type: "Array",
            val: []
          }
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.pool = this.rack.get("pool").get();
      return this.ob = new SPARKS.Emitter(this.rack.get("counter").get());
    };

    SparksEmitter.prototype.setTargetParticle = function(p) {
      if (this.pool) return this.pool.pool.get();
    };

    SparksEmitter.prototype.compute = function() {
      var initializers;
      if (this.rack.get("pool").get() !== false) {
        if (this.pool !== this.rack.get("pool").get()) {
          this.ob.removeCallback("created");
          this.ob.removeCallback("dead");
          this.ob.stop();
          this.ob = new SPARKS.Emitter(this.rack.get("counter").get());
          this.geom = new THREE.Geometry();
          this.pool = this.rack.get("pool").get();
          this.pool.init_pool(this.geom);
          this.ob.addCallback("created", this.pool.on_particle_created);
          this.ob.addCallback("dead", this.pool.on_particle_dead);
          console.log("pool particle setup...");
        }
      }
      initializers = this.rack.get("initializers").val.slice(0);
      initializers.push(this.target_initializer);
      this.ob._initializers = initializers;
      this.ob._actions = this.rack.get("actions").val;
      this.ob._counter = this.rack.get("counter").get();
      if (this.pool !== false && this.ob.isRunning() === false) this.ob.start();
      return this.rack.setField("out", this.geom);
    };

    SparksEmitter.prototype.remove = function() {
      SparksEmitter.__super__.remove.apply(this, arguments);
      if (this.ob) {
        this.ob.removeCallback("created");
        this.ob.removeCallback("dead");
        return this.ob.stop();
      }
    };

    return SparksEmitter;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksAge = (function(_super) {

    __extends(SparksAge, _super);

    function SparksAge() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAge.__super__.constructor.apply(this, arguments);
    }

    SparksAge.node_name = 'Age';

    SparksAge.group_name = 'Particle.sparks.actions';

    SparksAge.prototype.set_fields = function() {
      SparksAge.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "easing": {
            type: "Any",
            val: TWEEN.Easing.Linear.EaseNone
          }
        },
        outputs: {
          "action": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.Age(this.rack.get("easing").get());
    };

    SparksAge.prototype.compute = function() {
      this.ob._easing = this.rack.get("easing").val;
      return this.rack.setField("action", this.ob);
    };

    return SparksAge;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksMove = (function(_super) {

    __extends(SparksMove, _super);

    function SparksMove() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksMove.__super__.constructor.apply(this, arguments);
    }

    SparksMove.node_name = 'Move';

    SparksMove.group_name = 'Particle.sparks.actions';

    SparksMove.prototype.set_fields = function() {
      SparksMove.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        outputs: {
          "action": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.Move();
    };

    SparksMove.prototype.compute = function() {
      return this.rack.setField("action", this.ob);
    };

    return SparksMove;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksAccelerate = (function(_super) {

    __extends(SparksAccelerate, _super);

    function SparksAccelerate() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAccelerate.__super__.constructor.apply(this, arguments);
    }

    SparksAccelerate.node_name = 'Accelerate';

    SparksAccelerate.group_name = 'Particle.sparks.actions';

    SparksAccelerate.prototype.set_fields = function() {
      SparksAccelerate.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "vector": {
            type: "Vector3",
            val: new THREE.Vector3(0, 1, 0)
          }
        },
        outputs: {
          "action": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.Accelerate(this.rack.get("vector").get());
    };

    SparksAccelerate.prototype.compute = function() {
      this.ob.acceleration = this.rack.get("vector").get();
      return this.rack.setField("action", this.ob);
    };

    return SparksAccelerate;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksAccelerateFactor = (function(_super) {

    __extends(SparksAccelerateFactor, _super);

    function SparksAccelerateFactor() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAccelerateFactor.__super__.constructor.apply(this, arguments);
    }

    SparksAccelerateFactor.node_name = 'AccelerateFactor';

    SparksAccelerateFactor.group_name = 'Particle.sparks.actions';

    SparksAccelerateFactor.prototype.set_fields = function() {
      SparksAccelerateFactor.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "factor": 2.0
        },
        outputs: {
          "action": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.AccelerateFactor(this.rack.get("factor").get());
    };

    SparksAccelerateFactor.prototype.compute = function() {
      this.ob.factor = this.rack.get("factor").get();
      return this.rack.setField("action", this.ob);
    };

    return SparksAccelerateFactor;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksAccelerateVelocity = (function(_super) {

    __extends(SparksAccelerateVelocity, _super);

    function SparksAccelerateVelocity() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAccelerateVelocity.__super__.constructor.apply(this, arguments);
    }

    SparksAccelerateVelocity.node_name = 'AccelerateVelocity';

    SparksAccelerateVelocity.group_name = 'Particle.sparks.actions';

    SparksAccelerateVelocity.prototype.set_fields = function() {
      SparksAccelerateVelocity.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "factor": 2.0
        },
        outputs: {
          "action": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.AccelerateVelocity(this.rack.get("factor").get());
    };

    SparksAccelerateVelocity.prototype.compute = function() {
      this.ob.factor = this.rack.get("factor").get();
      return this.rack.setField("action", this.ob);
    };

    return SparksAccelerateVelocity;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksRandomDrift = (function(_super) {

    __extends(SparksRandomDrift, _super);

    function SparksRandomDrift() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksRandomDrift.__super__.constructor.apply(this, arguments);
    }

    SparksRandomDrift.node_name = 'RandomDrift';

    SparksRandomDrift.group_name = 'Particle.sparks.actions';

    SparksRandomDrift.prototype.set_fields = function() {
      SparksRandomDrift.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "vector": {
            type: "Vector3",
            val: new THREE.Vector3(0, 1, 0)
          }
        },
        outputs: {
          "action": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.RandomDrift(this.rack.get("vector").get());
    };

    SparksRandomDrift.prototype.compute = function() {
      this.ob.drift = this.rack.get("vector").get();
      return this.rack.setField("action", this.ob);
    };

    return SparksRandomDrift;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksLifetime = (function(_super) {

    __extends(SparksLifetime, _super);

    function SparksLifetime() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksLifetime.__super__.constructor.apply(this, arguments);
    }

    SparksLifetime.node_name = 'Lifetime';

    SparksLifetime.group_name = 'Particle.sparks.initializers';

    SparksLifetime.prototype.set_fields = function() {
      SparksLifetime.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "min": 4,
          "max": 7
        },
        outputs: {
          "initializer": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.Lifetime(this.rack.get("min").get(), this.rack.get("max").get());
    };

    SparksLifetime.prototype.compute = function() {
      this.ob._min = this.rack.get("min").get();
      this.ob._min = this.rack.get("max").get();
      return this.rack.setField("initializer", this.ob);
    };

    return SparksLifetime;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksPosition = (function(_super) {

    __extends(SparksPosition, _super);

    function SparksPosition() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksPosition.__super__.constructor.apply(this, arguments);
    }

    SparksPosition.node_name = 'Position';

    SparksPosition.group_name = 'Particle.sparks.initializers';

    SparksPosition.prototype.set_fields = function() {
      SparksPosition.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "zone": {
            type: "Any",
            val: new SPARKS.PointZone(new THREE.Vector3(0, 0, 0))
          }
        },
        outputs: {
          "initializer": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.Position(this.rack.get("zone").get());
    };

    SparksPosition.prototype.compute = function() {
      this.ob.zone = this.rack.get("zone").get();
      return this.rack.setField("initializer", this.ob);
    };

    return SparksPosition;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksPointZone = (function(_super) {

    __extends(SparksPointZone, _super);

    function SparksPointZone() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksPointZone.__super__.constructor.apply(this, arguments);
    }

    SparksPointZone.node_name = 'PointZone';

    SparksPointZone.group_name = 'Particle.sparks.zone';

    SparksPointZone.prototype.set_fields = function() {
      SparksPointZone.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "pos": {
            type: "Vector3",
            val: new THREE.Vector3()
          }
        },
        outputs: {
          "zone": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.PointZone(this.rack.get("pos").get());
    };

    SparksPointZone.prototype.compute = function() {
      this.ob.pos = this.rack.get("pos").get();
      return this.rack.setField("zone", this.ob);
    };

    return SparksPointZone;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksLineZone = (function(_super) {

    __extends(SparksLineZone, _super);

    function SparksLineZone() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksLineZone.__super__.constructor.apply(this, arguments);
    }

    SparksLineZone.node_name = 'LineZone';

    SparksLineZone.group_name = 'Particle.sparks.zone';

    SparksLineZone.prototype.set_fields = function() {
      SparksLineZone.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "start": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "end": {
            type: "Vector3",
            val: new THREE.Vector3(100, 0, 0)
          }
        },
        outputs: {
          "zone": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.LineZone(this.rack.get("start").get(), this.rack.get("end").get());
    };

    SparksLineZone.prototype.compute = function() {
      if (this.ob.start !== this.rack.get("start").get() ||  this.ob.end !== this.rack.get("end").get()) {
        this.ob.start = this.rack.get("start").get();
        this.ob.end = this.rack.get("end").get();
        this.ob._length = this.ob.end.clone().subSelf(this.ob.start);
      }
      return this.rack.setField("zone", this.ob);
    };

    return SparksLineZone;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksCubeZone = (function(_super) {

    __extends(SparksCubeZone, _super);

    function SparksCubeZone() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksCubeZone.__super__.constructor.apply(this, arguments);
    }

    SparksCubeZone.node_name = 'CubeZone';

    SparksCubeZone.group_name = 'Particle.sparks.zone';

    SparksCubeZone.prototype.set_fields = function() {
      SparksCubeZone.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "position": {
            type: "Vector3",
            val: new THREE.Vector3()
          },
          "x": 0,
          "y": 0,
          "z": 0
        },
        outputs: {
          "zone": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.CubeZone(this.rack.get("position").get(), this.rack.get("x").get(), this.rack.get("y").get(), this.rack.get("z").get());
    };

    SparksCubeZone.prototype.compute = function() {
      this.ob.position = this.rack.get("position").get();
      this.ob.x = this.rack.get("x").get();
      this.ob.y = this.rack.get("y").get();
      this.ob.z = this.rack.get("z").get();
      return this.rack.setField("zone", this.ob);
    };

    return SparksCubeZone;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.SparksSteadyCounter = (function(_super) {

    __extends(SparksSteadyCounter, _super);

    function SparksSteadyCounter() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksSteadyCounter.__super__.constructor.apply(this, arguments);
    }

    SparksSteadyCounter.node_name = 'SteadyCounter';

    SparksSteadyCounter.group_name = 'Particle.sparks';

    SparksSteadyCounter.prototype.set_fields = function() {
      SparksSteadyCounter.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "rate": 100
        },
        outputs: {
          "counter": {
            type: "Any",
            val: this.ob
          }
        }
      });
      return this.ob = new SPARKS.SteadyCounter(this.rack.get("rate").get());
    };

    SparksSteadyCounter.prototype.compute = function() {
      this.ob.pos = this.rack.get("rate").get();
      return this.rack.setField("counter", this.ob);
    };

    return SparksSteadyCounter;

  })(ThreeNodes.NodeBase);
  ThreeNodes.nodes.ParticlePool = (function(_super) {

    __extends(ParticlePool, _super);

    function ParticlePool() {
      this.compute = __bind(this.compute, this);
      this.on_particle_dead = __bind(this.on_particle_dead, this);
      this.on_particle_updated = __bind(this.on_particle_updated, this);
      this.on_particle_created = __bind(this.on_particle_created, this);
      this.init_pool = __bind(this.init_pool, this);
      this.set_fields = __bind(this.set_fields, this);
      ParticlePool.__super__.constructor.apply(this, arguments);
    }

    ParticlePool.node_name = 'ParticlePool';

    ParticlePool.group_name = 'Particle.sparks';

    ParticlePool.prototype.set_fields = function() {
      ParticlePool.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.geom = false;
      return this.rack.addFields({
        inputs: {
          "maxParticles": 10000
        },
        outputs: {
          "pool": {
            type: "Any",
            val: this
          }
        }
      });
    };

    ParticlePool.prototype.init_pool = function(geom) {
      var i, new_pos, pos, _ref, _results;
      this.geom = geom;
      this.pool = {
        pools: [],
        get: function() {
          if (this.pools.length > 0) return this.pools.pop();
          return null;
        },
        add: function(v) {
          return this.pools.push(v);
        }
      };
      new_pos = function() {
        return new THREE.Vertex(new THREE.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
      };
      _results = [];
      for (i = 0, _ref = this.rack.get("maxParticles").get() - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        pos = new_pos();
        geom.vertices.push(pos);
        _results.push(this.pool.add(pos));
      }
      return _results;
    };

    ParticlePool.prototype.on_particle_created = function(particle) {
      var target;
      if (this.geom === false) return false;
      target = particle.target;
      if (target) return particle.target.position = particle.position;
    };

    ParticlePool.prototype.on_particle_updated = function(particle) {
      return true;
    };

    ParticlePool.prototype.on_particle_dead = function(particle) {
      var target;
      if (this.geom === false) return false;
      target = particle.target;
      if (target) {
        particle.target.position.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        return this.pool.add(particle.target);
      }
    };

    ParticlePool.prototype.compute = function() {
      if (this.geom !== false) this.geom.__dirtyVertices = true;
      return this.rack.setField("pool", this);
    };

    return ParticlePool;

  })(ThreeNodes.NodeBase);
  return ThreeNodes.nodes.RandomCloudGeometry = (function(_super) {

    __extends(RandomCloudGeometry, _super);

    function RandomCloudGeometry() {
      this.compute = __bind(this.compute, this);
      this.generate = __bind(this.generate, this);
      this.move_particles = __bind(this.move_particles, this);
      this.limit_position = __bind(this.limit_position, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      RandomCloudGeometry.__super__.constructor.apply(this, arguments);
    }

    RandomCloudGeometry.node_name = 'RandomCloudGeometry';

    RandomCloudGeometry.group_name = 'Particle';

    RandomCloudGeometry.prototype.set_fields = function() {
      RandomCloudGeometry.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.Geometry();
      this.rack.addFields({
        inputs: {
          "nbrParticles": 20000,
          "radius": 2000,
          "rndVelocity": {
            type: "Vector3",
            val: new THREE.Vector3(1, 1, 1)
          },
          "linearVelocity": {
            type: "Vector3",
            val: new THREE.Vector3(1, 1, 1)
          }
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.cache = this.get_cache_array();
      return this.generate();
    };

    RandomCloudGeometry.prototype.get_cache_array = function() {
      return [this.rack.get("radius").get(), this.rack.get("nbrParticles").get(), this.rack.get("linearVelocity").get()];
    };

    RandomCloudGeometry.prototype.limit_position = function(pos) {
      var margin, radius;
      radius = this.rack.get("radius").get();
      margin = 5;
      if (pos < radius * -1) {
        pos = radius - margin;
      } else if (pos > radius) {
        pos = radius * -1 + margin;
      }
      return pos;
    };

    RandomCloudGeometry.prototype.move_particles = function() {
      var key, p, rndVelocity, _ref;
      rndVelocity = this.rack.get("rndVelocity").get();
      _ref = this.ob.vertices;
      for (key in _ref) {
        p = _ref[key];
        p.position.x += Math.random() * rndVelocity.x - rndVelocity.x * 0.5 + p.velocity.x;
        p.position.y += Math.random() * rndVelocity.y - rndVelocity.y * 0.5 + p.velocity.y;
        p.position.z += Math.random() * rndVelocity.z - rndVelocity.z * 0.5 + p.velocity.z;
        p.position.x = this.limit_position(p.position.x);
        p.position.y = this.limit_position(p.position.y);
        p.position.z = this.limit_position(p.position.z);
      }
      this.ob.__dirtyVertices = true;
      return true;
    };

    RandomCloudGeometry.prototype.generate = function() {
      var i, linearVelocity, rad, total, v, vector;
      this.ob = new THREE.Geometry();
      rad = this.rack.get("radius").get();
      total = this.rack.get("nbrParticles").get();
      linearVelocity = this.rack.get("linearVelocity").get();
      for (i = 0; 0 <= total ? i <= total : i >= total; 0 <= total ? i++ : i--) {
        vector = new THREE.Vector3(Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad, Math.random() * rad * 2 - rad);
        v = new THREE.Vertex(vector);
        v.velocity = new THREE.Vector3(Math.random() * linearVelocity.x - linearVelocity.x * 0.5, Math.random() * linearVelocity.y - linearVelocity.y * 0.5, Math.random() * linearVelocity.z - linearVelocity.z * 0.5);
        this.ob.vertices.push(v);
      }
      return true;
    };

    RandomCloudGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (ThreeNodes.Utils.flatArraysAreEquals(new_cache, this.cache) === false) {
        this.generate();
      }
      this.move_particles();
      this.cache = new_cache;
      return this.rack.setField("out", this.ob);
    };

    return RandomCloudGeometry;

  })(ThreeNodes.NodeBase);
});
