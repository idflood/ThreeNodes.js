define (require) ->
  #"use strict"
  Backbone = require 'Backbone'

  require 'cs!threenodes/models/Connection'

  class Connections extends Backbone.Collection
    model: ThreeNodes.Connection

    initialize: (models, options) =>
      @indexer = options.indexer
      @bind "connection:removed", (c) => @remove(c)
      super

    render: () =>
      @each (c) -> c.render()

    create: (model, options) =>
      if !options then options = {}
      model.indexer = @indexer
      model = @_prepareModel(model, options)
      if !model
        return false
      @add(model, options)
      return model

    removeAll: () =>
      @remove(@models)
