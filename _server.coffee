sys = require("util")
fs = require("fs")
path = require("path")
url = require("url")
exec = require("child_process").exec
watch = require("watch")
express = require("express")
coffee = require("coffee-script")
stylus = require("stylus")
jade = require("jade")
nib = require("nib")
wrench = require("wrench")
requirejs = require('requirejs')

is_build = (process.argv[2] == "build")


exec_and_log = (command, on_complete = null) ->
  console.log "executing command: " + command
  exec command, (err, stdout, stderr) ->
    if err
      console.log "error: " + err
    console.log stdout + stderr
    if on_complete then delay 100, () => on_complete()
    
# Require the external coffeescript and jade to build the static_output
# todo: also remove the external dependencies
if is_build
  delay = (ms, func) -> setTimeout func, ms
  
  compile_jade = (filename) ->
    html = jade.compile(fs.readFileSync('views/' + filename + ".jade", 'utf8'), {pretty: true})
    if html
      fs.writeFileSync('output_static/' + filename + ".html", html())
    else
      console.log "Can't compile: views/" + filename + ".jade"
  console.log "Building..."
  
  # Remove previous build
  wrench.rmdirSyncRecursive('output_static', true)
  # Create root directory
  wrench.mkdirSyncRecursive('output_static', 0777)
  # Copy public assets
  wrench.copyDirSyncRecursive('public/assets', 'output_static/assets')
  wrench.copyDirSyncRecursive('public/scripts', 'output_static/scripts')
  wrench.copyDirSyncRecursive('public/examples', 'output_static/examples')
  wrench.copyDirSyncRecursive('views/templates', 'output_static/scripts/templates')
    
  # Copy the development css to the output_static dir
  # todo: use the node.js stylus module with compress option
  wrench.copyDirSyncRecursive('public/stylesheets', 'output_static/stylesheets')
  
  # Compile jade to html
  console.log "Compiling jade files..."
  compile_jade("index")
  compile_jade("test")
  compile_jade("speedtest")
  compile_jade("code_export_example")
  #exec_and_log 'jade views/ --out output_static/', () ->
  # Compile coffeescript to js
  console.log "Compiling coffeescript files..."
  exec_and_log 'coffee -b -o output_static/scripts/ -c src/scripts/', () ->
    console.log "Starting to optimize the javascripts..."
    # optimize the js
    config =
      baseUrl: 'output_static/scripts/'
      paths:
        jQuery: 'libs/jquery-1.7.2'
        jQueryUi: 'libs/jquery-ui/js/jquery-ui-1.9m6'
        Underscore: 'libs/underscore'
        Backbone: 'libs/backbone'
        use: "libs/require/use"
        text: "libs/require/text"
        order: "libs/require/order"
      use:
        'Underscore':
          attach: "_"
        'Backbone':
          deps: ['use!Underscore', 'jQuery']
          attach: "Backbone"
        'jQueryUi':
          deps: ['jQuery']
          attach: 'jQuery'
      
      optimize: 'none'
      name: 'threenodes/App'
      out: 'output_static/scripts/threenodes/App.js'
    
    requirejs.optimize config, (buildResponse) ->
      console.log "Optimization complete!"
      console.log "ThreeNodes.js has successfuly been compiled to /output_static !"
      process.exit()

else
  # development environment
  
  # Setup express server
  app = express.createServer()
  port = process.env.PORT || 3000
  app.use app.router
  app.use express.methodOverride()
  app.use express.bodyParser()
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  
  # Configure the stylus middleware (.styl -> .css)
  app.use stylus.middleware(
    src: __dirname + "/src"
    dest: __dirname + "/public"
    compile: (str, path) ->
      stylus(str).set("filename", path).set("warn", true).set("compress", false).set("paths", [ require("stylus-blueprint") ]).use nib()
  )
  # Configure static assets
  app.use express.static(__dirname + "/public")
  
  # Serve on the fly compiled js or existing js if there is no .coffee
  app.get "/scripts/*.coffee", (req, res) ->
    file = req.params[0]
    return_static = () ->
      path.exists "src/scripts/" + file + ".coffee", (exists) ->
        if exists
          res.header("Content-Type", "application/x-javascript")
          cs = fs.readFileSync("src/scripts/" + file + ".coffee", "utf8")
          res.send(cs)
        else
          # attempt to serve test file before doing a 404
          path.exists file + ".coffee", (exists) ->
            if exists
              res.header("Content-Type", "application/x-javascript")
              cs = fs.readFileSync(file + ".coffee", "utf8")
              res.send(cs)
            else
              res.send("Cannot GET " + "src/scripts/" + file + ".coffee", 404)
    
    return_static()
  
  app.get "/scripts/*.js", (req, res) ->
    file = req.params[0]
    
    return_static = () ->
      path.exists "src/scripts/" + file + ".js", (exists) ->
        if exists
          res.header("Content-Type", "application/x-javascript")
          cs = fs.readFileSync("src/scripts/" + file + ".js", "utf8")
          res.send(cs)
        else
          res.send("Cannot GET " + "/scripts/" + file + ".js", 404)
    
    return_static()
  
  
  # Pseudo link for js templates (src/html/templates -> assets/js/templates/)
  app.get "/scripts/templates/*", (req, res) ->
    file = req.params[0]
    path.exists "views/templates/" + file, (exists) ->
      if exists
        res.header("Content-Type", "text/html")
        cs = fs.readFileSync("views/templates/" + file, "utf8")
        res.send(cs)
      else
        res.send("Cannot GET " + "/scripts/templates/" + file, 404)
  
  # Setup html routes
  app.get "/", (req, res) ->
    res.render "index",
      layout: false
  
  app.get "/code_export_example", (req, res) ->
    res.render "code_export_example",
      layout: false
  
  app.get "/speedtest", (req, res) ->
    res.render "speedtest",
      layout: false
  
  app.get "/test", (req, res) ->
    res.render "test",
      layout: false
      
  app.get "/test2", (req, res) ->
    res.render "test2",
      layout: false
  
  # Continuous integration
  runTests = () ->
    console.log "run mocha tests"
    #exec_and_log "./node_modules/mocha/bin/mocha --compilers coffee:coffee-script -u tdd"
    require("./public/misc/run_test").run()

  watch.watchTree "src/", {'ignoreDotFiles': true}, (f, curr, prev) ->
    if typeof f != "object" && prev != null && curr != null then runTests()
  watch.watchTree "test/", {'ignoreDotFiles': true}, (f, curr, prev) ->
    if typeof f != "object" && prev != null && curr != null then runTests()
  runTests()
  
  # Start the server
  app.listen port
  console.log "ready: http://localhost:#{port}/"
