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
  class ThreeNodes.nodes.types.Particle.ParticleSystem extends ThreeNodes.nodes.types.Three.Object3D
    set_fields: =>
      super
      @rack.addFields
        inputs:
          "geometry": {type: "Any", val: new THREE.CubeGeometry( 200, 200, 200 )}
          "material": {type: "Any", val: new THREE.ParticleBasicMaterial()}
          "sortParticles": false
      @ob = new THREE.ParticleSystem(@rack.get('geometry').get(), @rack.get('material').get())
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
      @ob = new THREE.ParticleBasicMaterial({color: 0xff0000})
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
    
    compute: =>
      if @input_value_has_changed(@vars_rebuild_shader_on_change)
        @ob = new THREE.ParticleBasicMaterial({color: 0xffffff})
      @apply_fields_to_val(@rack.node_fields.inputs, @ob)
      @material_cache = @create_cache_object(@vars_rebuild_shader_on_change)
      @rack.set("out", @ob)

  class ThreeNodes.nodes.types.Particle.RandomCloudGeometry extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @ob = new THREE.Geometry()
      @rack.addFields
        inputs:
          "nbrParticles": 20000
          "radius": 2000
        outputs:
          "out": {type: "Any", val: @ob}
      @vars_rebuild_on_change = ["nbrParticles", "radius"]
      @cache = @get_cache_array()
      @generate()
    
    get_cache_array: =>
      [@rack.get("radius").get(), @rack.get("nbrParticles").get()]
    
    generate: =>
      @ob = new THREE.Geometry()
      rad = @rack.get("radius").get()
      total = @rack.get("nbrParticles").get()
      for i in [0..total]
        vector = new THREE.Vector3( Math.random() * rad - rad * 0.5, Math.random() * rad - rad * 0.5, Math.random() * rad - rad * 0.5 )
        @ob.vertices.push( new THREE.Vertex( vector ) )
      true
      
    compute: =>
      new_cache = @get_cache_array()
      if new_cache != @cache
        @generate()
      
      @cache = new_cache
      @rack.set("out", @ob)
      