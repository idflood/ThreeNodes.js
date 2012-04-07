define [
  'use!Underscore', 
  'use!Backbone',
  'order!threenodes/utils/Utils',
  'order!threenodes/models/Node',
  "order!libs/Three",
  "order!libs/csg",
  "order!libs/ThreeCSG",
], (_, Backbone, Utils) ->
  "use strict"
  
  $ = jQuery
  
  class NodeCSG extends ThreeNodes.NodeBase
    set_fields: =>
      super
      @auto_evaluate = true
      @ob = false
      @fields.addFields
        inputs:
          "a": {type: "Any", val: false},
          "b": {type: "Any", val: false},
        outputs:
          "geometry": {type: "Any", val: @ob}
      
    comput_csg_geometry: (a, b) => a.union(b)
    
    remove: =>
      delete @ob
      super
    
    compute: =>
      a = @fields.getField("a").getValue()
      b = @fields.getField("b").getValue()
      # todo: recompute if a or b change
      if a && b
        csg_a = THREE.CSG.toCSG(a)
        csg_b = THREE.CSG.toCSG(b)
        csg_geom = @comput_csg_geometry(csg_a, csg_b)
        @ob = THREE.CSG.fromCSG(csg_geom)
      @fields.setField("geometry", @ob)
      
  class ThreeNodes.nodes.CsgUnion extends NodeCSG
    @node_name = 'Union'
    @group_name = 'Constructive-Geometry'
  
  class ThreeNodes.nodes.CsgSubtract extends NodeCSG
    @node_name = 'Subtract'
    @group_name = 'Constructive-Geometry'
    
    comput_csg_geometry: (a, b) => a.subtract(b)
  
  class ThreeNodes.nodes.CsgIntersect extends NodeCSG
    @node_name = 'Intersect'
    @group_name = 'Constructive-Geometry'
    
    comput_csg_geometry: (a, b) => a.intersect(b)
    
  