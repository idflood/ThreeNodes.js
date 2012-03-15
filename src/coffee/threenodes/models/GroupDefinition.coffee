define [
  'Underscore', 
  'Backbone',
  'order!threenodes/utils/Utils',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.GroupDefinition extends Backbone.Model
    defaults:
      "nodes": {}
      "conncections": {}
      "name": "Group"
    
    sync: () =>
    
    getUID: () =>
      @internal_uid += 1
      return @internal_uid
    
    initialize: (options) =>
      @internal_uid = 0
      
    
    remove: =>
      super
    
    toJSON: () ->
      res =
        name: @get("name")
        conncections: @get("conncections")
        nodes: @get("nodes")
      res
    
    toCode: () ->
      res = ""
      res
