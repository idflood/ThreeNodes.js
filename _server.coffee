sys = require("util")
fs = require("fs")
path = require("path")
url = require("url")
exec = require("child_process").exec
watch = require("watch")
express = require("express")
coffee = require("coffee-script")
stylus = require("stylus")
nib = require("nib")
wrench = require("wrench")

is_build = (process.argv[2] == "build")

# Require the external coffeescript and jade to build the static_output
# todo: also remove the external dependencies
if is_build
  delay = (ms, func) -> setTimeout func, ms
  exec_and_log = (command, on_complete) ->
    console.log "executing command: " + command
    exec command, (err, stdout, stderr) ->
      if err
        console.log "error: " + err
      console.log stdout + stderr
      delay 100, () => on_complete()
      
  console.log "Building..."
  
  # Remove previous build
  wrench.rmdirSyncRecursive('output_static', true)
  # Create root and css directories
  wrench.mkdirSyncRecursive('output_static/css', 0777)
  # Copy public assets
  wrench.copyDirSyncRecursive('public/assets', 'output_static/assets')
  wrench.copyDirSyncRecursive('public/examples', 'output_static/examples')
  wrench.copyDirSyncRecursive('src/html/templates', 'output_static/assets/js/templates')
    
  # Copy the development css to the output_static dir
  # todo: use the node.js stylus module with compress option
  wrench.copyDirSyncRecursive('public/css', 'output_static/css')
  
  # Compile jade to html
  console.log "Compiling jade files..."
  exec_and_log 'jade src/html/ --out output_static/', () ->
    # Compile coffeescript to js
    console.log "Compiling coffeescript and jade files..."
    exec_and_log 'coffee -b -o output_static/assets/js/ -c src/js/'
    
    console.log "ThreeNodes.js has successfuly been compiled to /output_static !"
    process.exit()

else
  # development environment
  
  # Setup express server
  app = express.createServer()
  app.use app.router
  app.use express.methodOverride()
  app.use express.bodyParser()
  app.set "views", __dirname + "/src/html"
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
  app.get "/assets/js/*.js", (req, res) ->
    file = req.params[0]
    compile_coffee = () ->
      res.header("Content-Type", "application/x-javascript")
      cs = fs.readFileSync("src/js/" + file + ".coffee", "utf8")
      res.send(coffee.compile(cs, {bare: true}))
    
    return_static = () ->
      path.exists "public/assets/js/" + file + ".js", (exists) ->
        if exists
          res.header("Content-Type", "application/x-javascript")
          cs = fs.readFileSync("public/assets/js/" + file + ".js", "utf8")
          res.send(cs)
        else
          res.send("Cannot GET " + "/public/assets/js/" + file + ".js", 404)
    
    path.exists "src/js/" + file + ".coffee", (exists) ->
      if exists
        compile_coffee()
      else
        return_static()
  
  # Pseudo link for js templates (src/html/templates -> assets/js/templates/)
  app.get "/assets/js/templates/*", (req, res) ->
    file = req.params[0]
    path.exists "src/html/templates/" + file, (exists) ->
      if exists
        res.header("Content-Type", "text/html")
        cs = fs.readFileSync("src/html/templates/" + file, "utf8")
        res.send(cs)
      else
        res.send("Cannot GET " + "/assets/js/templates/" + file, 404)
  
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
  
  # Start the server
  app.listen 8042
  console.log "ready: http://localhost:8042/"

