
define [
  'use!Underscore', 
  'use!Backbone',
  'cs!threenodes/views/FieldButton',
  "use!jquery.ui",
  'cs!threenodes/utils/Utils',
], (_, Backbone) ->
  #"use strict"
  
  ### Fields View ###
  namespace "ThreeNodes",
    FieldsView: class FieldsView extends Backbone.View
      # Save some options in variables and bind events
      initialize: (options) ->
        super
        @node = options.node
        @subviews = []
        @collection.bind("addCenterTextfield", @addCenterTextfield)
        @collection.bind("addCustomHtml", @addCustomHtml)
        @collection.bind("add", @onFieldCreated)
    
      # Create the field dom element and add events to it
      onFieldCreated: (field) =>
        target = if field.get("is_output") == false then ".inputs" else ".outputs"
        view = new ThreeNodes.FieldButton
          model: field
      
        view.$el.appendTo($(target, @$el))
      
        # Save a reference of the field DOM element for ConnectionView
        # todo: remove this... but how?
        field.button = view.$el
      
        @subviews.push(view)
    
      # Unbind events, destroy jquery-ui widgets, remove dom elements
      # and delete variables
      remove: () =>
        @undelegateEvents()
      
        # Remove all FieldButton subviews
        views = @subviews.concat()
        _.each views, (view) => view.remove()
      
        # Remove elements which may have events attached
        $("input", $(@el)).remove()
      
        # Delete references
        delete @collection
        delete @node
        delete @subviews
        super
    
      addCustomHtml: ($element, target = ".center") =>
        $element.appendTo($(target, @$el))
        return this
    
      addCenterTextfield: (field) =>
        container = $("<div><input type='text' data-fid='#{field.get('fid')}' /></div>").appendTo($(".center", @$el))
        f_in = $("input", container)
        field.on_value_update_hooks.update_center_textfield = (v) ->
          if v != null
            f_in.val(v.toString())
            #f_in.val(v.toString().substring(0, 10))
        f_in.val(field.getValue())
        if field.get("is_output") == true
          f_in.attr("disabled", "disabled")
        else
          f_in.keypress (e) ->
            if e.which == 13
              field.setValue($(this).val())
              $(this).blur()
        @
    
