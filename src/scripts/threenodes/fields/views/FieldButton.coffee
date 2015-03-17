_ = require 'Underscore'
Backbone = require 'Backbone'
_view_node_field_in = require '../templates/node_field_input.tmpl.html'
_view_node_field_out = require '../templates/node_field_output.tmpl.html'
_view_field_context_menu = require '../templates/field_context_menu.tmpl.html'

require 'threenodes/utils/Utils'
require 'libs/jquery.contextMenu'

### FieldButton View ###
class FieldButton extends Backbone.View
  className: "field"
  # Save some options in variables and bind events
  initialize: (options) ->
    super
    @makeElement()
    @render()

  remove: () =>
    $inner = $(".inner-field", @$el)
    # Remove drag & drop events
    if $inner.data("droppable") then $inner.droppable("destroy")
    if $inner.data("draggable") then $inner.draggable("destroy")

    # Remove the inner DOM element to also unbind some possible events
    $inner.remove()
    super

  makeElement: () =>
    layout = if @model.get("is_output") then _view_node_field_out else _view_node_field_in

    bt = _.template layout,
      fid: @model.get("fid")
      name: @model.get("name")
    @$el.html(bt)

  render: () =>
    @$el.attr("rel", @model.get("name"))
    @$el.addClass("field-" + @model.get("name"))

    @$el.data("object", @model)
    @$el.data("fid", @model.get("fid"))

    @initContextMenu()
    @addFieldListener()

  initContextMenu: () ->
    if $("#field-context-menu").length < 1
      menu_field_menu = _.template(_view_field_context_menu, {})
      $("body").append(menu_field_menu)
    @$el.contextMenu {menu: "field-context-menu"}, (action, el, pos) =>
      if action == "removeConnection" then @model.removeConnections()
    return @

  addFieldListener: () ->
    self = this
    field = @model

    start_offset_x = 0
    start_offset_y = 0

    getPath = (start, end, offset) ->
      ofx = $("#container-wrapper").scrollLeft()
      ofy = $("#container-wrapper").scrollTop()
      "M#{start.left + offset.left + 2} #{start.top + offset.top + 2} L#{end.left + offset.left + ofx - start_offset_x} #{end.top + offset.top + ofy - start_offset_y}"

    highlight_possible_targets = () ->
      target = ".outputs .field"
      if field.get("is_output") == true
        target = ".inputs .field"
      $(target).filter () ->
        $(this).parent().parent().parent().data("nid") != field.node.get("nid")
      .addClass "field-possible-target"

    $(".inner-field", @$el).draggable
      helper: () ->
        $("<div class='ui-widget-drag-helper'></div>")
      scroll: true
      cursor: 'pointer'
      cursorAt:
        left: 0
        top: 0
      start: (event, ui) ->
        start_offset_x = $("#container-wrapper").scrollLeft()
        start_offset_y = $("#container-wrapper").scrollTop()
        highlight_possible_targets()
        if ThreeNodes.UI.UIView.connecting_line then ThreeNodes.UI.UIView.connecting_line.attr({opacity: 1})
      stop: (event, ui) ->
        $(".field").removeClass "field-possible-target"
        if ThreeNodes.UI.UIView.connecting_line then ThreeNodes.UI.UIView.connecting_line.attr({opacity: 0})
      drag: (event, ui) ->
        if ThreeNodes.UI.UIView.connecting_line
          pos = $(this).position()
          node_pos =
            left: field.node.get("x")
            top: field.node.get("y")
          ThreeNodes.UI.UIView.connecting_line.attr
            path: getPath(pos, ui.position, node_pos)
          return true

    accept_class = ".outputs .inner-field"
    if field && field.get("is_output") == true
      accept_class = ".inputs .inner-field"

    $(".inner-field", @$el).droppable
      accept: accept_class
      activeClass: "ui-state-active"
      hoverClass: "ui-state-hover"
      drop: (event, ui) ->
        origin = $(ui.draggable).parent()
        field2 = origin.data("object")
        # We need to find the most global @connections
        # For a connection between a normal node and one in a group
        # we want to find the global @connections
        #
        # For now we simply get the node from the second field if the
        # first one has a parent node
        #
        # TODO: fix this for nested groups (try to connect to in ins and outs)
        if field.node.parent
          field2.node.createConnection(field, field2)
        else
          field.node.createConnection(field, field2)

    return this

module.exports = FieldButton
