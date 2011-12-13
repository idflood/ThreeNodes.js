define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  class ThreeNodes.RemoveSelectedNodesCommand
    execute: (connection) ->
      $(".node.ui-selected").each () ->
        $(this).data("object").remove()
