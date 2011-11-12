var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
ThreeNodes.Sidebar = (function() {
  function Sidebar() {
    this.init_sidebar_tab_new_node = __bind(this.init_sidebar_tab_new_node, this);
    this.init_sidebar_search = __bind(this.init_sidebar_search, this);
    this.init_sidebar_toggle = __bind(this.init_sidebar_toggle, this);
    this.init_sidebar_tabs = __bind(this.init_sidebar_tabs, this);
    this.init_sidebar_tab_system = __bind(this.init_sidebar_tab_system, this);
    this.init_sidebar = __bind(this.init_sidebar, this);
  }
  Sidebar.prototype.init_sidebar = function() {
    init_sidebar_tab_new_node();
    init_sidebar_search();
    init_sidebar_toggle();
    init_sidebar_tabs();
    return init_sidebar_tab_system();
  };
  Sidebar.prototype.init_sidebar_tab_system = function() {
    $(".new_file").click(function(e) {
      e.preventDefault();
      return clear_workspace();
    });
    $(".open_file").click(function(e) {
      e.preventDefault();
      return $("#main_file_input_open").click();
    });
    $(".save_file").click(function(e) {
      e.preventDefault();
      return save_local_file();
    });
    $("#main_file_input_open").change(load_local_file_input_changed);
    return $(".rebuild_shaders").click(function(e) {
      e.preventDefault();
      rebuild_all_shaders();
      return false;
    });
  };
  Sidebar.prototype.init_sidebar_tabs = function() {
    return $("#sidebar").tabs({
      fx: {
        opacity: 'toggle',
        duration: 100
      }
    });
  };
  Sidebar.prototype.init_sidebar_toggle = function() {
    return $("#sidebar-toggle").click(function(e) {
      var $t, o;
      $t = $("#sidebar");
      o = 10;
      if ($t.position().left < -20) {
        $("#sidebar-toggle").removeClass("toggle-closed");
        $t.animate({
          left: 0
        }, {
          queue: false,
          duration: 140
        }, "swing");
        return $("#sidebar-toggle").animate({
          left: 220 + o
        }, {
          queue: false,
          duration: 80
        }, "swing");
      } else {
        $("#sidebar-toggle").addClass("toggle-closed");
        $t.animate({
          left: -220
        }, {
          queue: false,
          duration: 120
        }, "swing");
        return $("#sidebar-toggle").animate({
          left: o
        }, {
          queue: false,
          duration: 180
        }, "swing");
      }
    });
  };
  Sidebar.prototype.init_sidebar_search = function() {
    var toggle_class;
    toggle_class = "hidden-element";
    return $("#node_filter").keyup(function(e) {
      var v;
      v = $.trim($("#node_filter").val()).toLowerCase();
      if (v === "") {
        return $("#tab-new li").removeClass(toggle_class);
      } else {
        return $("#tab-new li").each(function(el) {
          var has_visible_items, s, ul;
          s = $.trim($("a", this).html()).toLowerCase();
          if (s.indexOf(v) !== -1) {
            return $(this).removeClass(toggle_class);
          } else {
            $(this).addClass(toggle_class);
            ul = $(this).parent();
            has_visible_items = false;
            ul.children().each(function() {
              if ($(this).hasClass(toggle_class) === false) {
                return has_visible_items = true;
              }
            });
            if (has_visible_items === false) {
              return ul.prev().addClass(toggle_class);
            } else {
              return ul.prev().removeClass(toggle_class);
            }
          }
        });
      }
    });
  };
  Sidebar.prototype.init_sidebar_tab_new_node = function() {
    var $container, node, nt;
    $container = $("#tab-new");
    for (nt in nodes.types) {
      $container.append("<h3>" + nt + "</h3><ul id='nodetype-" + nt + "'></ul>");
      for (node in nodes.types[nt]) {
        $("#nodetype-" + nt, $container).append("<li><a class='button' rel='" + nt + "' href='#'>" + (node.toString()) + "</a></li>");
      }
    }
    $("a.button", $container).draggable({
      revert: "valid",
      opacity: 0.7,
      helper: "clone",
      revertDuration: 0,
      start: function(event, ui) {
        return $("#sidebar").hide();
      }
    });
    return $("#container").droppable({
      accept: "#tab-new a.button",
      activeClass: "ui-state-active",
      hoverClass: "ui-state-hover",
      drop: function(event, ui) {
        nodegraph.create_node(ui.draggable.attr("rel"), jQuery.trim(ui.draggable.html()), ui.position.left + $("#container-wrapper").scrollLeft() - 10, ui.position.top - 10 + $("#container-wrapper").scrollTop());
        return $("#sidebar").show();
      }
    });
  };
  return Sidebar;
})();