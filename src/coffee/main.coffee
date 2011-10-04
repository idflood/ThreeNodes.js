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
  init_sidebar()
  animate()
  
  $(window).resize on_ui_window_resize
  on_ui_window_resize()
  
  #init_websocket()
