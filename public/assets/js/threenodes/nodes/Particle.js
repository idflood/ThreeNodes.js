var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['jQuery', 'Underscore', 'Backbone', "text!templates/node.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery.contextMenu", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min", 'order!threenodes/core/NodeFieldRack', 'order!threenodes/utils/Utils'], function($, _, Backbone, _view_node_template) {
  ThreeNodes.nodes.types.Particle.ParticleSystem = (function() {
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
      this.compute = __bind(this.compute, this);
      this.set_fields = __bind(this.set_fields, this);
      ParticleBasicMaterial.__super__.constructor.apply(this, arguments);
    }
    ParticleBasicMaterial.prototype.set_fields = function() {
      ParticleBasicMaterial.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.ParticleBasicMaterial({
        color: 0xff0000
      });
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
    ParticleBasicMaterial.prototype.compute = function() {
      if (this.input_value_has_changed(this.vars_rebuild_shader_on_change)) {
        this.ob = new THREE.ParticleBasicMaterial({
          color: 0xffffff
        });
      }
      this.apply_fields_to_val(this.rack.node_fields.inputs, this.ob);
      this.material_cache = this.create_cache_object(this.vars_rebuild_shader_on_change);
      return this.rack.set("out", this.ob);
    };
    return ParticleBasicMaterial;
  })();
  return ThreeNodes.nodes.types.Particle.RandomCloudGeometry = (function() {
    __extends(RandomCloudGeometry, ThreeNodes.NodeBase);
    function RandomCloudGeometry() {
      this.compute = __bind(this.compute, this);
      this.generate = __bind(this.generate, this);
      this.get_cache_array = __bind(this.get_cache_array, this);
      this.set_fields = __bind(this.set_fields, this);
      RandomCloudGeometry.__super__.constructor.apply(this, arguments);
    }
    RandomCloudGeometry.prototype.set_fields = function() {
      RandomCloudGeometry.__super__.set_fields.apply(this, arguments);
      this.ob = new THREE.Geometry();
      this.rack.addFields({
        inputs: {
          "nbrParticles": 20000,
          "radius": 2000
        },
        outputs: {
          "out": {
            type: "Any",
            val: this.ob
          }
        }
      });
      this.vars_rebuild_on_change = ["nbrParticles", "radius"];
      this.cache = this.get_cache_array();
      return this.generate();
    };
    RandomCloudGeometry.prototype.get_cache_array = function() {
      return [this.rack.get("radius").get(), this.rack.get("nbrParticles").get()];
    };
    RandomCloudGeometry.prototype.generate = function() {
      var i, rad, total, vector;
      this.ob = new THREE.Geometry();
      rad = this.rack.get("radius").get();
      total = this.rack.get("nbrParticles").get();
      for (i = 0; 0 <= total ? i <= total : i >= total; 0 <= total ? i++ : i--) {
        vector = new THREE.Vector3(Math.random() * rad - rad * 0.5, Math.random() * rad - rad * 0.5, Math.random() * rad - rad * 0.5);
        this.ob.vertices.push(new THREE.Vertex(vector));
      }
      return true;
    };
    RandomCloudGeometry.prototype.compute = function() {
      var new_cache;
      new_cache = this.get_cache_array();
      if (new_cache !== this.cache) {
        this.generate();
      }
      this.cache = new_cache;
      return this.rack.set("out", this.ob);
    };
    return RandomCloudGeometry;
  })();
});