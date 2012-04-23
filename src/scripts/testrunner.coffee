run = ->
  
  phantom = require 'phantom'
  
  phantom.create (ph) ->
    ph.createPage (page) ->
      
      page.set "onConsoleMessage", (msg) ->
        console.log msg
      
      page.open "http://localhost:3000/test", (status) ->
        console.log "opened test page3? ", status
        if status isnt "success"
          console.log "Unable to access network: " + status
          ph.exit 1
        else
          interval = false
          checkTests = () ->
            console.log "check..."
            #page.evaluate (-> document.body.querySelectorAll('span.status > span')[0].innerHTML), (total) ->
            page.evaluate (-> document), (total) ->
              console.log "------------"
              page.evaluate (-> document.body.querySelectorAll('span.status > span')[0].innerHTML), (total) ->
                console.log "------------ok"
                console.log total
                #console.log total
                #clearInterval(interval)
                ph.exit(0)
                return false
              #if body.querySelectorAll('span.status > span')[0].innerHTML == 'Completed'
              #  clearInterval(interval)
              #  total = body.querySelectorAll('span.status > span.total')[0].innerHTML
              #  passed = body.querySelectorAll('span.status > span.passed')[0].innerHTML
              #  
              #  phantom.exit(0)
          
          
          checkTests()
          #interval = setInterval(checkTests, 1000)
          
          #page.evaluate (-> window), (window) ->
          #  console.log("ok")
          #  output = JSON.stringify window.qunitDone
          #  #ph.exit(0)
          #  console.log window
          #  ph.exit (if JSON.parse(output).failed > 0 then 1 else 0)
          #page.evaluate (-> document.getElementById('qunit-testresult').innerText), (result) ->
          #page.evaluate (-> window.QUnit), (result) ->
          #page.evaluate (-> document.body.querySelectorAll('span.status > span.total')), (result) ->
          #  console.log result
            
          #page.evaluate addLogging
          
          
  
run()
module.exports.run = run