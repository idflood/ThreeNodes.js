init_tab_new_node = () ->
  $container = $("#tab-new")
  for nt of nodes.types
    $container.append("<h3>#{nt}</h3><ul id='nodetype-#{nt}'></ul>")
    for node of nodes.types[nt]
      $("#nodetype-#{nt}", $container).append("<li><a class='button' rel='#{nt}' href='#'>#{ node.toString() }</a></li>")
  
  $("a.button", $container).draggable
    revert: "valid"
    opacity: 0.7
    helper: "clone"
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