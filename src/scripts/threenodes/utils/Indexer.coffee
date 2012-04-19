
define [
  'use!Underscore', 
  'use!Backbone',
], (_, Backbone) ->
  #"use strict"
  
  window.namespace "ThreeNodes",
    Indexer: class Indexer
      constructor: () ->
        # Define a "unique id" property
        @uid = 0
      
      getUID: (increment = true) ->
        if increment
          return @uid += 1
        else
          return @uid
      
      reset: () ->
        @uid = 0
