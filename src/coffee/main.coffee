nodes = {}
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

#http://www.w3.org/TR/file-writer-api/
#http://www.html5rocks.com/en/tutorials/file/dndfiles/

svg = false


ws = null
host = "localhost"
port = 8080
socket = "p5websocket"

#init_websocket = () ->
#  console.log("trying to open a websocket")
#  ws = new WebSocket("ws://" + host + ":" + port + _socket)
#  _socket = !socket ? "" : "/" + socket
#  ws.onopen = () ->
#    console.log("opened")
#    ws.send('Ping')

#  ws.onerror = (e) ->
#    console.log('WebSocket did close ',e)
  
#  ws.onerror = (error) ->
#    console.log('WebSocket Error ' + error)

#  ws.onmessage = (e) ->
#    console.log('Server: ' + e.data)


animate = () ->
  render()
  requestAnimationFrame( animate )

render = () ->
  nodegraph.render()


on_ui_window_resize = () ->
  w = $(window).width() - 4
  h = $(window).height() - 4
  $("#container-wrapper").css
    width: w
    height: h
  $("#sidebar").css("height", h)

  
$(document).ready ->
  svg = Raphael("graph", 4000, 4000)
  make_sidebar_toggle()
  
  f1 = new fields.types.Float("test", 0.4)
  f1.signal.dispatch 42.0
  
  $("#sidebar").tabs
    fx:
      opacity: 'toggle'
      duration: 100

  $(".rebuild_shaders").click (e) ->
    for n in webgl_materials_node
      n.ob.program = false
      

  console.log("starting...")
  init_tab_new_node()
  animate()
  
  $(window).resize on_ui_window_resize
  on_ui_window_resize()
  init_sidebar_search()
  #init_websocket()
