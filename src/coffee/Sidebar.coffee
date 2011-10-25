init_sidebar = () ->
  init_sidebar_tab_new_node()
  init_sidebar_search()
  init_sidebar_toggle()
  init_sidebar_tabs()
  init_sidebar_tab_system()

init_sidebar_tab_system = () ->
  $(".new_file").click (e) ->
    e.preventDefault()
    clear_workspace()
    
  $(".open_file").click (e) ->
    e.preventDefault()
    $("#main_file_input_open").click()

  $(".save_file").click (e) ->
    e.preventDefault()
    save_local_file()

  $("#main_file_input_open").change load_local_file_input_changed

  $(".rebuild_shaders").click (e) ->
    e.preventDefault()
    rebuild_all_shaders()
    false

init_sidebar_tabs = () ->
  $("#sidebar").tabs
    fx:
      opacity: 'toggle'
      duration: 100

init_sidebar_toggle = () ->
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
              
init_sidebar_tab_new_node = () ->
  $container = $("#tab-new")
  for nt of nodes.types
    $container.append("<h3>#{nt}</h3><ul id='nodetype-#{nt}'></ul>")
    for node of nodes.types[nt]
      $("#nodetype-#{nt}", $container).append("<li><a class='button' rel='#{nt}' href='#'>#{ node.toString() }</a></li>")
  
  $("a.button", $container).draggable
    revert: "valid"
    opacity: 0.7
    helper: "clone"
    revertDuration: 0
    start: (event, ui) ->
      #$("#sidebar").animate({left: -170}, { queue: false, duration: 80 }, "swing")
      $("#sidebar").hide()
  $("#container").droppable
    accept: "#tab-new a.button"
    activeClass: "ui-state-active"
    hoverClass: "ui-state-hover"
    drop: (event, ui) ->
      nodegraph.create_node(ui.draggable.attr("rel"), jQuery.trim(ui.draggable.html()), ui.position.left + $("#container-wrapper").scrollLeft() - 10, ui.position.top - 10 + $("#container-wrapper").scrollTop())
      $("#sidebar").show()
      #$("#sidebar").animate({left: 0}, { queue: false, duration: 140 }, "swing")
  #$("a.button", $container).click (e) ->
  #  e.preventDefault()
  #  nodegraph.create_node(jQuery.trim($(this).html()))