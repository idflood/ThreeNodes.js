define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.InitUrlHandler
    execute: () ->
      injector = @context.injector
      url_cache = false
      
      on_url_change = (e) =>
        url = $.param.fragment()
        fh = injector.get("FileHandler")
        
        if url == url_cache
          return false
        
        if url.indexOf("play/") == 0
          url = url.replace("play/", "")
          @context.player_mode = true
          $("body").addClass "player-mode"
        else
          $("body").addClass "editor-mode"
        
        if url.indexOf("example/") == 0
          filename = url.replace("example/", "")
          @context.commandMap.execute("ClearWorkspaceCommand")
          $.ajax
            url: "examples/#{filename}"
            dataType: 'text'
            success: (data) ->
              fh.load_from_json_data(data)
        url_cache = $.param.fragment()
      
      $(window).bind 'hashchange', (e) =>
        on_url_change(e)
        
      #delay = (ms, func) -> setTimeout func, ms
      #init_url = () ->
      #  $(window).trigger( 'hashchange' )
      #delay 500, -> init_url()
      on_url_change(null)
