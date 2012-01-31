var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils', "order!libs/Tween", "order!libs/Sparks"], function($, _, Backbone, _view_node_template) {
  "use strict";  ThreeNodes.nodes.types.Particle.ParticleSystem = (function() {
    __extends(ParticleSystem, ThreeNodes.nodes.types.Three.Object3D);
    function ParticleSystem() {
      this.compute = __bind(this.compute, this);
      this.rebuild_geometry = __bind(this.rebuild_geometry, this);
      this.set_fields = __bind(this.set_fields, this);
      ParticleSystem.__super__.constructor.apply(this, arguments);
    }
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
        return this.rack.get('geometry').set(new THREE.CubeGeometry(200, 200, 200));
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
      if (needs_rebuild === true) {
        ThreeNodes.rebuild_all_shaders();
      }
      return this.rack.set("out", this.ob);
    };
    return ParticleSystem;
  })();
  ThreeNodes.nodes.types.Particle.ParticleBasicMaterial = (function() {
    __extends(ParticleBasicMaterial, ThreeNodes.NodeMaterialBase);
    function ParticleBasicMaterial() {
      this.set_fields = __bind(this.set_fields, this);
      ParticleBasicMaterial.__super__.constructor.apply(this, arguments);
    }
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
  })();
  ThreeNodes.nodes.types.Particle.SparksEmitter = (function() {
    __extends(SparksEmitter, ThreeNodes.NodeBase);
    function SparksEmitter() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksEmitter.__super__.constructor.apply(this, arguments);
    }
    SparksEmitter.prototype.set_fields = function() {
      SparksEmitter.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "counter": {
            type: "Any",
            val: new SPARKS.SteadyCounter(10)
          },
          "initializers": {
            type: "Any",
            val: []
          },
          "actions": {
            type: "Any",
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
      return this.ob = new SPARKS.Emitter(this.rack.get("counter").get());
    };
    SparksEmitter.prototype.compute = function() {
      this.ob.update();
      return this.rack.set("out", this.ob);
    };
    return SparksEmitter;
  })();
  ThreeNodes.nodes.types.Particle.SparksAge = (function() {
    __extends(SparksAge, ThreeNodes.NodeBase);
    function SparksAge() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAge.__super__.constructor.apply(this, arguments);
    }
    SparksAge.prototype.set_fields = function() {
      SparksAge.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.rack.addFields({
        inputs: {
          "easing": {
            type: "Any",
            val: TWEEN.Easing.Linear
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
      this.ob._easing = this.rack.get("easing").get();
      return this.rack.set("action", this.ob);
    };
    return SparksAge;
  })();
  ThreeNodes.nodes.types.Particle.SparksAccelerate = (function() {
    __extends(SparksAccelerate, ThreeNodes.NodeBase);
    function SparksAccelerate() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAccelerate.__super__.constructor.apply(this, arguments);
    }
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
      return this.rack.set("action", this.ob);
    };
    return SparksAccelerate;
  })();
  ThreeNodes.nodes.types.Particle.SparksAccelerateFactor = (function() {
    __extends(SparksAccelerateFactor, ThreeNodes.NodeBase);
    function SparksAccelerateFactor() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAccelerateFactor.__super__.constructor.apply(this, arguments);
    }
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
      return this.rack.set("action", this.ob);
    };
    return SparksAccelerateFactor;
  })();
  ThreeNodes.nodes.types.Particle.SparksAccelerateVelocity = (function() {
    __extends(SparksAccelerateVelocity, ThreeNodes.NodeBase);
    function SparksAccelerateVelocity() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksAccelerateVelocity.__super__.constructor.apply(this, arguments);
    }
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
      return this.rack.set("action", this.ob);
    };
    return SparksAccelerateVelocity;
  })();
  ThreeNodes.nodes.types.Particle.SparksRandomDrift = (function() {
    __extends(SparksRandomDrift, ThreeNodes.NodeBase);
    function SparksRandomDrift() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksRandomDrift.__super__.constructor.apply(this, arguments);
    }
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
      return this.rack.set("action", this.ob);
    };
    return SparksRandomDrift;
  })();
  ThreeNodes.nodes.types.Particle.SparksLifetime = (function() {
    __extends(SparksLifetime, ThreeNodes.NodeBase);
    function SparksLifetime() {
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      SparksLifetime.__super__.constructor.apply(this, arguments);
    }
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
      return this.rack.set("initializer", this.ob);
    };
    return SparksLifetime;
  })();
  ThreeNodes.nodes.types.Particle.ParticlePool = (function() {
    __extends(ParticlePool, ThreeNodes.NodeBase);
    function ParticlePool() {
      this.compute = __bind(this.compute, this);
      this.init_pool = __bind(this.init_pool, this);
      this.set_fields = __bind(this.set_fields, this);
      ParticlePool.__super__.constructor.apply(this, arguments);
    }
    ParticlePool.prototype.set_fields = function() {
      ParticlePool.__super__.set_fields.apply(this, arguments);
      this.auto_evaluate = true;
      this.ob = new THREE.Geometry();
      this.rack.addFields({
        inputs: {
          "maxParticles": 10000,
          "emitter": {
            type: "Any",
            val: false
          }
        },
        outputs: {
          "geometry": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.emitter = this.rack.get("emitter").get();
      return this.init_pool();
    };
    ParticlePool.prototype.init_pool = function() {
      var i, new_pos, pos, _ref, _results;
      this.pool = {
        pools: [],
        get: function() {
          if (this.pools.length > 0) {
            return this.pools.pop();
          }
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
        this.ob.vertices.push(pos);
        _results.push(this.pool.add(pos));
      }
      return _results;
    };
    ParticlePool.prototype.on_particle_created = function(particle) {
      var target;
      target = particle.target;
      return this.ob.vertices[target].position = particle.position;
    };
    ParticlePool.prototype.on_particle_dead = function(particle) {
      var target;
      target = particle.target;
      if (target) {
        this.ob.vertices[target].position.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        return this.pool.add(particle.target);
      }
    };
    ParticlePool.prototype.compute = function() {
      if (this.emitter !== this.rack.get("emitter").get()) {
        this.emitter = this.rack.get("emitter").get();
        if (this.emitter !== false) {
          this.emitter.addCallback("created", this.on_particle_created);
          this.emitter.addCallback("dead", this.on_particle_dead);
          this.emitter.start();
        }
      }
      if (this.emitter !== false) {
        return this.rack.set("geometry", this.ob);
      }
    };
    return ParticlePool;
  })();
  return ThreeNodes.nodes.types.Particle.RandomCloudGeometry = (function() {
    __extends(RandomCloudGeometry, ThreeNodes.NodeBase);
    function RandomCloudGeometry() {
      this.compute = __bind(this.compute, this);
      this.generate = __bind(this.generate, this);
      this.move_particles = __bind(this.move_particles, this);
      this.limit_position = __bind(this.limit_position, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      RandomCloudGeometry.__super__.constructor.apply(this, arguments);
    }
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
      return this.rack.set("out", this.ob);
    };
    return RandomCloudGeometry;
  })();
});