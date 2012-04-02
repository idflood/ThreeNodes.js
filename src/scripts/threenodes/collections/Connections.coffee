define [
  'Underscore', 
  'Backbone',
  'order!threenodes/models/Connection',
  'order!threenodes/views/ConnectionView',
], (_, Backbone) ->
  "use strict"
  
  class ThreeNodes.ConnectionsCollection extends Backbone.Collection
    model: ThreeNodes.Connection
    
    initialize: () =>
      @.bind "connection:removed", (c) =>
        @remove(c)
    
    render: () =>
      @.each (c) ->
        c.render()
    
    create: (model, options) =>
      if !options
        options = {}
      model = @_prepareModel(model, options)
      if !model
        return false
      @add(model, options)
      return model
    
    removeAll: () =>
      @remove(@models)
    