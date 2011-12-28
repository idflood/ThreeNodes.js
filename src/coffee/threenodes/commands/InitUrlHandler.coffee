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
      $(window).bind 'hashchange', (e) =>
        url = $.param.fragment()
        fh = injector.get("FileHandler")
        
        if url == url_cache
          return false
        if url.indexOf("example/") == 0
          filename = url.replace("example/", "")
          @context.commandMap.execute("ClearWorkspaceCommand")
          $.ajax
            url: "examples/#{filename}"
            dataType: 'text'
            success: (data) ->
              fh.load_from_json_data(data)
        url_cache = url
        
      delay = (ms, func) -> setTimeout func, ms
      init_url = () ->
        $(window).trigger( 'hashchange' )
      delay 500, -> init_url()
