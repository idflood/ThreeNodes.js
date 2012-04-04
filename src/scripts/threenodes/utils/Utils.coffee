define [
  'use!Underscore', 
  'use!Backbone',
], (_, Backbone) ->
  "use strict"
  
  class Utils
    # Define a static "unique id" property
    @uid: 0
    
    @get_uid: (increment = true) ->
      if increment
        return Utils.uid += 1
      else
        return Utils.uid
    
    @flatArraysAreEquals: (arr1, arr2) ->
      if arr1.length != arr2.length
        return false
      
      for k, i in arr1
        if arr1[i] != arr2[i]
          return false
          
      true
