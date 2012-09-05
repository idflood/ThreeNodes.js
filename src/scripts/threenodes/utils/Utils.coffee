define [
  'Underscore',
  'Backbone',
], (_, Backbone) ->
  #"use strict"

  namespace "ThreeNodes",
    Utils: class Utils
      @flatArraysAreEquals: (arr1, arr2) ->
        if arr1.length != arr2.length
          return false

        for k, i in arr1
          if arr1[i] != arr2[i]
            return false

        true
