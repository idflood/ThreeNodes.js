define [
  'Underscore', 
  'Backbone',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.NodeModel extends Backbone.Model
    default:
      nid: 0
      x: 0
      y: 0
      name: "nodename"
    
    initialize: () =>
      xml = @get("xml")
      json = @get("json")
      if xml
        @fromXML(xml)
      else if json
        @fromJSON(json)
      else
        
    
    setNID: (nid) =>
      @set
        "nid": nid
      @
    
    setName: (name) =>
      @set
        "name": name
      @
    
    setPosition: (x, y) =>
      @set
        "x": x
        "y": y
      @
    
    fromJSON: (data) =>
      @set
        "nid": data.nid
        "name": data.name
        "x": data.x
        "y": data.y
      ThreeNodes.uid = @get("nid")
      @
    
    fromXML: (data) =>
      @set
        "nid": parseInt @inXML.attr("nid")
      ThreeNodes.uid = @get("nid")
      @
