define [
  'jQuery',
  'Underscore', 
  'Backbone',
], ($, _, Backbone) ->
  "use strict"
  class ThreeNodes.UrlHandler extends Backbone.Events
    constructor: () ->
      ThreeNodes.events.on "InitUrlHandler", (e) => @execute()
    
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
          ThreeNodes.events.trigger("SetDisplayModeCommand", true)
        else
          ThreeNodes.events.trigger("SetDisplayModeCommand", false)
        
        if url.indexOf("example/") == 0
          filename = url.replace("example/", "")
          ThreeNodes.events.trigger("ClearWorkspace")
          $.ajax
            url: "examples/#{filename}"
            dataType: 'text'
            success: (data) ->
              fh.load_from_json_data(data)
        url_cache = $.param.fragment()
      
      $(window).bind 'hashchange', (e) =>
        on_url_change(e)
        
      on_url_change(null)
