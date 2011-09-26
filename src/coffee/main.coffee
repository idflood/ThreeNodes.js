nodes = {}
nodes.list = []
nodes.types = {}
nodes.types.Base = {}
nodes.types.Math = {}
nodes.types.Utils = {}
nodes.types.Geometry = {}
nodes.types.Three = {}
nodes.types.Materials = {}

fields = {}
fields.types = {}

#http://www.w3.org/TR/file-writer-api/
#http://www.html5rocks.com/en/tutorials/file/dndfiles/


uid = 0
get_uid = () ->
  uid += 1

svg = false

animate = () ->
  requestAnimationFrame( animate )
  render()

render = () ->
  nodegraph.render()
  
on_ui_window_resize = () ->
  w = $(window).width() - 4
  h = $(window).height() - 4
  $("#container-wrapper").css
    width: w
    height: h
  $("#sidebar").css("height", h)
make_sidebar_toggle = () ->
  $("#sidebar-toggle").click (e) ->
    $t = $("#sidebar")
    o = 10
    if $t.position().left < -20
      $("#sidebar-toggle").removeClass("toggle-closed")
      $t.animate({left: 0}, { queue: false, duration: 140 }, "swing")
      $("#sidebar-toggle").animate({left: 220 + o}, { queue: false, duration: 80 }, "swing")
    else
      $("#sidebar-toggle").addClass("toggle-closed")
      $t.animate({left: -220}, { queue: false, duration: 120 }, "swing")
      $("#sidebar-toggle").animate({left: o}, { queue: false, duration: 180 }, "swing")
  
init_sidebar_search = () ->
  toggle_class = "hidden-element"
  $("#node_filter").keyup (e) ->
    v = $.trim($("#node_filter").val()).toLowerCase()
    if v == ""
      $("#tab-new li").removeClass toggle_class
    else
      $("#tab-new li").each (el) ->
        s = $.trim($("a", this).html()).toLowerCase()
        if s.indexOf(v) != -1
          $(this).removeClass toggle_class
        else
          $(this).addClass toggle_class
          ul = $(this).parent()
          has_visible_items = false
          ul.children().each () ->
            if $(this).hasClass(toggle_class) == false
              has_visible_items = true
          if has_visible_items == false
            ul.prev().addClass toggle_class
          else
            ul.prev().removeClass toggle_class
  
$(document).ready ->
  $("#graph").svg
    onLoad: (s) ->
      svg = s
  make_sidebar_toggle()
  
  f1 = new fields.types.Float("test", 0.4)
  f1.signal.dispatch 42.0
  
  $("#sidebar").tabs
    fx:
      opacity: 'toggle'
      duration: 100
  console.log("starting...")
  init_tab_new_node()
  animate()
  
  $(window).resize on_ui_window_resize
  on_ui_window_resize()
  init_sidebar_search()
