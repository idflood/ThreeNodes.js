define [
  'Underscore',
  'Backbone',
  'cs!threenodes/utils/Indexer',
], (_, Backbone) ->
  #"use strict"

  ### Connection model ###
  namespace "ThreeNodes",
    Connection: class Connection extends Backbone.Model
      # Create a static indexer used if the connection is not part of a nodes collection (tests)
      @STATIC_INDEXER: new ThreeNodes.Indexer()

      defaults:
        "cid": -1

      sync: () =>

      initialize: (options) =>
        @options = options
        indexer = options.indexer || ThreeNodes.Connection.STATIC_INDEXER

        # Set a unique connection id
        if @get("cid") == -1 then @set({"cid": indexer.getUID()})

        if @isValid()
          # remove existing input connection since inputs only have one connection
          @to_field.removeConnections()
          # add the connection to each fields
          @from_field.addConnection(this)
          @to_field.addConnection(this)
          # dispatch the new value
          @to_field.setValue(@from_field.get("value"))
          @from_field.node.dirty = true

      remove: =>
        # Unregister the connection from the fields
        @from_field.unregisterConnection(this)
        @to_field.unregisterConnection(this)
        @to_field.removeConnections()

        # Set the "to" node dirty so it is reprocessed next time
        @to_field.node.dirty = true
        @to_field.changed = true

        # Delete variable reference for garbage collection
        delete @from_field
        delete @to_field

        # Trigger the removed event and call destroy()
        @trigger "connection:removed", this
        @destroy()
        false

      render: () =>
        @trigger("render", this, this)

      validate: (attrs, options) =>
        @from_field = attrs.from_field
        @to_field = attrs.to_field
        # make sure we have input and output
        if !@from_field || !@to_field
          return true

        # never connect 2 outputs or 2 inputs
        if @from_field.get("is_output") == @to_field.get("is_output")
          return true

        # never connect in/out from the same node
        if @from_field.node.get('nid') == @to_field.node.get('nid')
          return true

        @switchFieldsIfNeeded()
        return false

      switchFieldsIfNeeded: () =>
        # Switch input and output if they are given in the wrong order
        if @from_field.get("is_output") == false
          f_out = @to_field
          @to_field = @from_field
          @from_field = f_out
        @

      toJSON: () ->
        res =
          id: @get("cid")
          from_node: @from_field.node.get("nid")
          from: @from_field.get("machine_name")
          to_node: @to_field.node.get("nid")
          to: @to_field.get("machine_name")
        res
