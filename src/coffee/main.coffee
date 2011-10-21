nodes = {}
nodes.fields = {}
nodes.list = []
nodes.types = {}
nodes.types.Base = {}
nodes.types.Math = {}
nodes.types.Utils = {}
nodes.types.Geometry = {}
nodes.types.Three = {}
nodes.types.Materials = {}
nodes.types.Lights = {}

fields = {}
fields.types = {}

webgl_materials_node = []

svg = false

flash_sound_value = []

node_template = false
node_field_in_template = false
node_field_out_template = false

$ = false

require [
  # views
  "text!templates/node.tmpl.html",
  "text!templates/node_field_input.tmpl.html",
  "text!templates/node_field_output.tmpl.html",
  
  # libraries
  "order!libs/jquery-1.6.4.min",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min",
  "order!libs/Three",
  "order!libs/raphael-min",
  "order!libs/underscore-min",
  "order!libs/backbone",
  "libs/BlobBuilder.min",
  "libs/FileSaver.min",
  "libs/sockjs-latest.min",
  "libs/signals.min",
  #"libs/knockout-1.2.1",
  #"libs/koExternalTemplateEngine",
  "libs/RequestAnimationFrame"
  ], (_node_template, _node_field_in_template, _node_field_out_template) ->
    $ = jQuery
    node_template = _node_template
    node_field_in_template = _node_field_in_template
    node_field_out_template = _node_field_out_template
    console.log "init..."
    svg = Raphael("graph", 4000, 4000)
    init_sidebar()
    animate()
    #init_websocket()
    $(window).resize on_ui_window_resize
    on_ui_window_resize()

init_websocket = () ->
  webso = false
  if !WebSocket
    webso = MozWebsocket
  else
    webso = WebSocket

  console.log("trying to open a websocket2")
  socket = new WebSocket("ws://localhost:8080/p5websocket")
  #ws = new io.Socket(null, {port: 8080, rememberTransport: false})
  socket.onmessage = (data) ->
    console.log data
    console.log "ok"
  socket.onerror = () ->
    console.log 'socket close'
  true

animate = () ->
  render()
  
  requestAnimationFrame( animate )

@onSoundInput = (data) ->
  #console.log data
  flash_sound_value = data.split('&')
  flash_sound_value.pop()
  #console.log flash_sound_value

render = () ->
  nodegraph.render()
  if $("#sound-input").length > 0
    try
      k = document.sound_input.getKick()
      console.log k
    catch e
      console.log "empty"

on_ui_window_resize = () ->
  w = $(window).width() - 4
  h = $(window).height() - 4
  $("#container-wrapper").css
    width: w
    height: h
  $("#sidebar").css("height", h)

  
