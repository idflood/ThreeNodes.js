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
flash_sound_value = []

node_template = false
node_field_in_template = false
node_field_out_template = false
field_context_menu = false
node_context_menu = false
$ = false

init_app = (_node_template, _node_field_in_template, _node_field_out_template, _field_context_menu, _node_context_menu) ->
  $ = jQuery
  node_template = _node_template
  node_field_in_template = _node_field_in_template
  node_field_out_template = _node_field_out_template
  field_context_menu = _field_context_menu
  node_context_menu = _node_context_menu
  
  console.log "init..."
  init_ui()
  animate()
  #init_websocket()

require [
  # views
  "text!templates/node.tmpl.html",
  "text!templates/node_field_input.tmpl.html",
  "text!templates/node_field_output.tmpl.html",
  "text!templates/field_context_menu.tmpl.html",
  "text!templates/node_context_menu.tmpl.html",
  
  # libraries
  "order!libs/jquery-1.6.4.min",
  "order!libs/jquery.tmpl.min",
  "order!libs/jquery.contextMenu",
  "order!libs/jquery-ui/js/jquery-ui-1.8.16.custom.min",
  "order!libs/colorpicker/js/colorpicker",
  "order!libs/Three",
  "order!libs/raphael-min",
  "order!libs/underscore-min",
  "order!libs/backbone",
  "libs/BlobBuilder.min",
  "libs/FileSaver.min",
  "libs/sockjs-latest.min",
  "libs/signals.min",
  "libs/RequestAnimationFrame"
  ], init_app

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

rebuild_all_shaders = () ->
  for n in webgl_materials_node
    n.ob.program = false

@onSoundInput = (data) ->
  #console.log data
  flash_sound_value = data.split('&')
  flash_sound_value.pop()
  #console.log flash_sound_value
