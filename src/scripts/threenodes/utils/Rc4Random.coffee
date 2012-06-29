
define [
  'Underscore',
  'Backbone',
], ($, _, Backbone) ->
  #"use strict"
  namespace "ThreeNodes",
    Rc4Random: class Rc4Random
      # Rc4Random function taken from http://www.webdeveloper.com/forum/showthread.php?t=140572
      constructor: (seed) ->
        @keySchedule = []
        @keySchedule_i = 0
        @keySchedule_j = 0
        
        for i in [0..256 - 1]
          @keySchedule[i] = i
        j = 0
        for i in [0..256 - 1]
          j = (j + @keySchedule[i] + seed.charCodeAt(i % seed.length)) % 256
          t = @keySchedule[i]
          @keySchedule[i] = @keySchedule[j]
          @keySchedule[j] = t
      
      getRandomByte: () =>
        @keySchedule_i = (@keySchedule_i + 1) % 256
        @keySchedule_j = (@keySchedule_j + @keySchedule[@keySchedule_i]) % 256
        
        t = @keySchedule[@keySchedule_i]
        @keySchedule[@keySchedule_i] = @keySchedule[@keySchedule_j]
        @keySchedule[@keySchedule_j] = t
        return @keySchedule[(@keySchedule[@keySchedule_i] + @keySchedule[@keySchedule_j]) % 256]
      
      getRandomNumber: () =>
        number =  0
        multiplier = 1
        for i in [0..8 - 1]
          number += @getRandomByte() * multiplier
          multiplier *= 256
        return number / 18446744073709551616
      