root = if typeof window != "undefined" && window != null then window else exports

if root.ThreeNodes == null || typeof(!root.ThreeNodes) != "object" then root.ThreeNodes = {}

define [
  'use!Underscore', 
  'use!Backbone',
], (_, Backbone) ->
  #"use strict"
  
  class root.ThreeNodes.Utils
    @flatArraysAreEquals: (arr1, arr2) ->
      if arr1.length != arr2.length
        return false
      
      for k, i in arr1
        if arr1[i] != arr2[i]
          return false
          
      true
