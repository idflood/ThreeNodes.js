define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/utils/Utils',
  'cs!threenodes/models/Node',
  "order!libs/Three",
  "order!libs/csg",
  "order!libs/ThreeCSG",
], (_, Backbone, Utils) ->
  #"use strict"
  
  namespace "ThreeNodes.nodes",
    NodeCSG: class NodeCSG extends ThreeNodes.NodeBase
      setFields: =>
        super
        @auto_evaluate = true
        @ob = false
        @fields.addFields
          inputs:
            "a": {type: "Any", val: false},
            "position_a": {type: "Vector3", val: new THREE.Vector3()}
            "rotation_a": {type: "Vector3", val: new THREE.Vector3()}
            "b": {type: "Any", val: false},
            "position_b": {type: "Vector3", val: new THREE.Vector3()}
            "rotation_b": {type: "Vector3", val: new THREE.Vector3()}
          outputs:
            "geometry": {type: "Any", val: @ob}
        @cached = []
      
      comput_csg_geometry: (a, b) => a.union(b)
      
      get_cache_array: =>
        a = @fields.getField("a").getValue()
        pos_a = @fields.getField("position_a").getValue()
        rot_a = @fields.getField("rotation_a").getValue()
        b = @fields.getField("b").getValue()
        pos_b = @fields.getField("position_b").getValue()
        rot_b = @fields.getField("rotation_b").getValue()
        if !a || !b then return []
        [a.id, b.id, pos_a.x, pos_a.y, pos_a.z, rot_a.x, rot_a.y, rot_a.z, pos_b.x, pos_b.y, pos_b.z, rot_b.x, rot_b.y, rot_b.z]
      
      remove: =>
        delete @ob
        delete @cached
        super
      
      compute: =>
        a = @fields.getField("a").getValue()
        pos_a = @fields.getField("position_a").getValue()
        rot_a = @fields.getField("rotation_a").getValue()
        b = @fields.getField("b").getValue()
        pos_b = @fields.getField("position_b").getValue()
        rot_b = @fields.getField("rotation_b").getValue()
        new_cache = @get_cache_array()
        # todo: recompute if a or b change
        if (a && b) && (ThreeNodes.Utils.flatArraysAreEquals(new_cache, @cached) == false)
          console.log "csg operation"
          csg_a = THREE.CSG.toCSG(a, pos_a, rot_a)
          csg_b = THREE.CSG.toCSG(b, pos_b, rot_b)
          csg_geom = @comput_csg_geometry(csg_a, csg_b)
          @ob = THREE.CSG.fromCSG(csg_geom)
          @cached = new_cache
        @fields.setField("geometry", @ob)
        
    CsgUnion: class CsgUnion extends NodeCSG
      @node_name = 'Union'
      @group_name = 'Constructive-Geometry'
    
    CsgSubtract: class CsgSubtract extends NodeCSG
      @node_name = 'Subtract'
      @group_name = 'Constructive-Geometry'
      
      comput_csg_geometry: (a, b) => a.subtract(b)
    
    CsgIntersect: class CsgIntersect extends NodeCSG
      @node_name = 'Intersect'
      @group_name = 'Constructive-Geometry'
      
      comput_csg_geometry: (a, b) => a.intersect(b)
    
  