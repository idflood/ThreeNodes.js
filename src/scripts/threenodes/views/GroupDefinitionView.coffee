define [
  'use!Underscore', 
  'use!Backbone',
  "text!templates/definition.tmpl.html",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.9m6.min",
  'order!threenodes/utils/Utils',
], (_, Backbone, _view_template) ->
  "use strict"
  ### Node View ###
  
  $ = jQuery
  
  class ThreeNodes.GroupDefinitionView extends Backbone.View
    @template = _view_template
        
    initialize: () ->
      @$el.draggable
        revert: "valid"
        opacity: 0.7
        helper: "clone"
        revertDuration: 0
        scroll: false
        containment: "document"
      @$el.data("model", @model)
