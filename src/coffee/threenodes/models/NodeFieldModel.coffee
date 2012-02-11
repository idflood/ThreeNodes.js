define [
  'Underscore', 
  'Backbone',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.NodeFieldModel extends Backbone.Model
    default:
      fid: -1
      name: "fieldname"
      is_out: false
      value: 0
    
    initialize: () =>
      @node = @options.node
      xml = @options.xml
      json = @options.json
    
    setFID: (fid) =>
      @set("fid", fid)
    
    
