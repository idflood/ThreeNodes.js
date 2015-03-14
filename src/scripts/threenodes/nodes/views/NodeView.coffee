_ = require 'Underscore'
Backbone = require 'Backbone'
_view_node_template = require '../templates/node.tmpl.html'
_view_node_context_menu = require '../templates/node_context_menu.tmpl.html'
FieldsView = require 'threenodes/fields/views/FieldsView'
namespace = require('libs/namespace').namespace

require 'libs/jquery.contextMenu'
require 'jquery.ui'

### Node View ###
class NodeView extends Backbone.View
  className: "node"

  initialize: (options) ->
    # Setup the view DOM element
    @makeElement()

    # Initialize mouse events
    if !options.isSubNode
      @makeDraggable()
    @initNodeClick()
    @initTitleClick()

    # Initialize the fields view
    @fields_view = new FieldsView
      node: @model
      collection: @model.fields
      el: $("> .options", @$el)

    # Bind events
    @model.on('change', @render)
    #@model.on('postInit', @postInit)
    @model.on('remove', () => @remove())
    @model.on("node:computePosition", @computeNodePosition)
    @model.on("node:renderConnections", @renderConnections)
    @model.on("node:addSelectedClass", @addSelectedClass)

    # Render the node and "post init" the model
    @render()
    @initContextMenus()
    @highlighAnimations()
    #@model.postInit()

  initContextMenus: () =>
    if $("#node-context-menu").length < 1
      node_menu = _.template(_view_node_context_menu, {})
      $("body").append(node_menu)
    @$el.find(".head").contextMenu {menu: "node-context-menu"}, (action, el, pos) =>
      if action == "remove_node" then @model.remove()
    return @

  makeElement: () =>
    # Compile the template file
    @template = _.template(_view_node_template, @model)
    @$el.html(@template)

    # Add the node group name as a class to the node element for easier styling
    @$el.addClass("type-" + @model.constructor.group_name)

    # Add other dynamic classes
    @$el.addClass("node-" + @model.typename())

  render: () =>
    @$el.css
      left: parseInt @model.get("x")
      top: parseInt @model.get("y")
    @$el.find("> .head span").text(@model.get("name"))
    @$el.find("> .head span").show()

  highlighAnimations: () =>
    nodeAnimation = false
    for propTrack in @model.anim.objectTrack.propertyTracks
      $target = $('.inputs .field-' + propTrack.name , @$el)
      if propTrack.anims.length > 0
        $target.addClass "has-animation"
        nodeAnimation = true
      else
        $target.removeClass "has-animation"

    @$el.toggleClass "node-has-animation", nodeAnimation
    true

  addSelectedClass: () =>
    @$el.addClass("ui-selected")

  renderConnections: () =>
    @model.fields.renderConnections()
    if @model.nodes
      _.each @model.nodes.models, (n) ->
        n.fields.renderConnections()

  computeNodePosition: () =>
    pos = $(@el).position()
    offset = $("#container-wrapper").offset()
    @model.set
      x: pos.left + $("#container-wrapper").scrollLeft()
      y: pos.top + $("#container-wrapper").scrollTop()

  remove: () =>
    $(".field", this.el).destroyContextMenu()
    if @$el.data("draggable") then @$el.draggable("destroy")
    $(this.el).unbind()
    @undelegateEvents()
    if @fields_view then @fields_view.remove()
    delete @fields_view
    super

  initNodeClick: () ->
    self = this
    $(@el).click (e) ->
      if e.metaKey == false
        $( ".node" ).removeClass("ui-selected")
        $(this).addClass("ui-selecting")
      else
        if $(this).hasClass("ui-selected")
          $(this).removeClass("ui-selected")
        else
          $(this).addClass("ui-selecting")
      selectable = $("#container").data("ui-selectable")
      if !selectable then return
      selectable.refresh()
      selectable._mouseStop(null)
      self.model.fields.renderSidebar()
    return @

  initTitleClick: () ->
    self = this

    $title_span = @$el.find("> .head span")
    $input = $("<input type='text' />")
    @$el.find("> .head").append($input)
    $input.hide()

    # Fix conflict with contextmenu.
    $input.on 'mousedown', (e) ->
      e.stopPropagation()

    $title_span.dblclick (e) ->
      prev = $(this).html()
      $input.val(prev)
      $title_span.hide();
      $input.show()

      apply_input_result = () ->
        self.model.set('name', $input.val())
        $input.hide()
        $title_span.show()

      $input.blur (e) ->
        apply_input_result()

      $("#graph").click (e) ->
        apply_input_result()

      $input.keydown (e) ->
        # on enter
        if e.keyCode == 13
          apply_input_result()
    return @

  makeDraggable: () =>
    self = this

    nodes_offset = {top: 0, left: 0}
    selected_nodes = $([])

    $(this.el).draggable
      start: (ev, ui) ->
        if $(this).hasClass("ui-selected")
          selected_nodes = $(".ui-selected").each () ->
            $(this).data("offset", $(this).offset())
        else
          selected_nodes = $([])
          $(".node").removeClass("ui-selected")
        nodes_offset = $(this).offset()
      drag: (ev, ui) ->

        dt = ui.position.top - nodes_offset.top
        dl = ui.position.left - nodes_offset.left
        selected_nodes.not(this).each () ->
          el = $(this)
          offset = el.data("offset")
          dx = offset.top + dt
          dy = offset.left + dl
          el.css
            top: dx
            left: dy
          el.data("object").trigger("node:computePosition")
          el.data("object").trigger("node:renderConnections")

        self.renderConnections()
      stop: () ->
        selected_nodes.not(this).each () ->
          el = $(this).data("object")
          el.trigger("node:renderConnections")
        self.computeNodePosition()
        self.renderConnections()
    return @

ThreeNodes.Core.addNodeView('NodeView', NodeView)

module.exports = NodeView
