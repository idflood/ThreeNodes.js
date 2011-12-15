define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.RemoveSelectedNodesCommand
    execute: (connection) ->
      $(".node.ui-selected").each () ->
        $(this).data("object").remove()
