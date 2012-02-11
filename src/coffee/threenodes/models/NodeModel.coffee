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
    
    load: (xml, json) =>
      if xml
        @fromXML(xml)
      else if json
        @fromJSON(json)
      
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
        "name": if data.name then data.name else @get("name")
        "x": data.x
        "y": data.y
      ThreeNodes.uid = @get("nid")
      @
    
    fromXML: (data) =>
      @set
        "nid": parseInt @inXML.attr("nid")
      ThreeNodes.uid = @get("nid")
      @
