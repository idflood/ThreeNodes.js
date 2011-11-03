nodes = {}
nodes.fields = {}
nodes.list = []
nodes.types = {}
nodes.types.Base = {}
nodes.types.Math = {}
nodes.types.Utils = {}
nodes.types.Conditional = {}
nodes.types.Geometry = {}
nodes.types.Three = {}
nodes.types.Materials = {}
nodes.types.Lights = {}
nodes.types.PostProcessing = {}

fields = {}
fields.types = {}

current_scene = false
current_camera = false
current_renderer = false
effectScreen = false
renderModel = false
composer = false

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
  init_webgl()
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
  "order!libs/three-extras/js/ShaderExtras",
  "order!libs/three-extras/js/postprocessing/EffectComposer",
  "order!libs/three-extras/js/postprocessing/MaskPass",
  "order!libs/three-extras/js/postprocessing/RenderPass",
  "order!libs/three-extras/js/postprocessing/ShaderPass",
  "order!libs/three-extras/js/postprocessing/BloomPass",
  "order!libs/three-extras/js/postprocessing/FilmPass",
  "order!libs/three-extras/js/postprocessing/DotScreenPass",
  "order!libs/raphael-min",
  "order!libs/underscore-min",
  "order!libs/backbone",
  "libs/BlobBuilder.min",
  "libs/FileSaver.min",
  "libs/sockjs-latest.min",
  "libs/signals.min",
  "libs/three-extras/js/RequestAnimationFrame"
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

init_webgl = () ->
  current_scene = new THREE.Scene()
  current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
  current_renderer = new THREE.WebGLRenderer
    clearColor: 0x000000
  current_renderer.autoClear = false
  effectScreen = new THREE.ShaderPass( THREE.ShaderExtras[ "screen" ] )
  effectScreen.renderToScreen = true
  renderModel = new THREE.RenderPass( current_scene, current_camera )
  composer = new THREE.EffectComposer( current_renderer )

rebuild_all_shaders = () ->
  console.log "rebuilding shaders"
  console.log webgl_materials_node
  for n in webgl_materials_node
    n.ob.program = false

@onSoundInput = (data) ->
  #console.log data
  flash_sound_value = data.split('&')
  flash_sound_value.pop()
  #console.log flash_sound_value
