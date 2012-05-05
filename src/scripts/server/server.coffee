sys = require("util")
fs = require("fs")
spawn = require("child_process").spawn
path = require("path")
url = require("url")
exec = require("child_process").exec
watch = require("watch")
express = require("express")
coffee = require("coffee-script")
stylus = require("stylus")
jade = require("jade")
nib = require("nib")
requirejs = require('requirejs')

# Dirname to point to the project root
# @see: server.js
__dirname = global.basePath

delay = (ms, func) -> setTimeout func, ms
exec_and_log = (command, on_complete = null) ->
  console.log "executing command: " + command
  exec command, (err, stdout, stderr) ->
    if err
      console.log "error: " + err
    console.log stdout + stderr
    if on_complete then delay 50, () => on_complete()
    

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
  path.exists "src/scripts/templates/" + file, (exists) ->
    if exists
      res.header("Content-Type", "text/html")
      cs = fs.readFileSync("src/scripts/templates/" + file, "utf8")
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

# Start the server
app.listen port
console.log "ready: http://localhost:#{port}/"

if process.argv[2] == "test"
  # Run continuous tests if "node server.js test"
  runTests = () -> exec_and_log "node ./src/scripts/server/testrunner.js"
  
  test_if_change = (f, curr, prev) ->
    # Skip testrunner.js changes to avoid infinite compilation
    if !f || f == "src/scripts/server/testrunner.js" then return
    if typeof f != "object" && prev != null && curr != null then runTests()
  watch.watchTree("src/scripts", {'ignoreDotFiles': true}, test_if_change)
  
  runTests()
