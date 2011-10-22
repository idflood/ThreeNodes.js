svg = false

init_ui = () ->
  svg = Raphael("graph", 4000, 4000)
  init_sidebar()
  add_window_resize_handler()
  init_context_menus()
  show_application()

init_context_menus = () ->
  menu_field_menu = $.tmpl(field_context_menu, {})
  $("body").append(menu_field_menu)
  
  node_menu = $.tmpl(node_context_menu, {})
  $("body").append(node_menu)

add_window_resize_handler = () ->
  $(window).resize on_ui_window_resize
  on_ui_window_resize()

show_application = () ->
  delay_intro = 500
  $("body > header").delay(delay_intro).fadeOut(0)
  $("#sidebar").delay(delay_intro).fadeIn(0)
  $("#container-wrapper").delay(delay_intro).fadeIn(0)
  $("#sidebar-toggle").delay(delay_intro).fadeIn(0)
  
render = () ->
  nodegraph.render()
  if $("#sound-input").length > 0
    try
      k = document.sound_input.getKick()
      console.log k
    catch e
      console.log "empty"

on_ui_window_resize = () ->
  w = $(window).width()
  h = $(window).height()
  $("#container-wrapper").css
    width: w
    height: h
  $("#sidebar").css("height", h)
  
animate = () ->
  render()
  requestAnimationFrame( animate )