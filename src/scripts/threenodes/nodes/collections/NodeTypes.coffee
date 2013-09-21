define (require) ->
  #"use strict"
  _ = require 'Underscore'
  Backbone = require 'Backbone'

  class NodeTypes extends Backbone.Collection

    initialize: (models, options) =>
