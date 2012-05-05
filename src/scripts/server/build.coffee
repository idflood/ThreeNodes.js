# Require node modules
sys = require("util")
fs = require("fs")
path = require("path")
url = require("url")
exec = require("child_process").exec
watch = require("watch")
jade = require("jade")
wrench = require("wrench")
requirejs = require('requirejs')

node_define = global.define

# Point __dirname to the project root
# @see: server.js
__dirname = global.basePath

# Utility functions
delay = (ms, func) -> setTimeout func, ms
exec_and_log = (command, on_complete = null) ->
  console.log "executing command: " + command
  exec command, (err, stdout, stderr) ->
    if err
      console.log "error: " + err
    console.log stdout + stderr
    if on_complete then delay 50, () => on_complete()

copyFileSync = (srcFile, destFile) ->
  BUF_LENGTH = 64*1024
  buff = new Buffer(BUF_LENGTH)
  fdr = fs.openSync(srcFile, 'r')
  fdw = fs.openSync(destFile, 'w')
  bytesRead = 1
  pos = 0
  while bytesRead > 0
    bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw,buff,0,bytesRead)
    pos += bytesRead
  fs.closeSync(fdr)
  fs.closeSync(fdw)
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
wrench.mkdirSyncRecursive('output_static/scripts', parseInt('777', 8))
# Copy public assets
wrench.copyDirSyncRecursive('public/assets', 'output_static/assets')
wrench.copyDirSyncRecursive('public/examples', 'output_static/examples')
wrench.copyDirSyncRecursive('src/scripts/libs', 'output_static/scripts/libs')

# copy test, require-config and boot file (js)
copyFileSync("src/scripts/boot.js", "output_static/scripts/boot.js")
copyFileSync("src/scripts/boot_test.js", "output_static/scripts/boot_test.js")
copyFileSync("src/scripts/require-config.js", "output_static/scripts/require-config.js")

# Copy the development css to the output_static dir
# todo: use the node.js stylus module with compress option
wrench.copyDirSyncRecursive('public/stylesheets', 'output_static/stylesheets')

# Compile jade to html
console.log "Compiling jade files..."
compile_jade("index")
compile_jade("test")

console.log "Starting to optimize the javascripts..."
# Optimize the js
config =
  baseUrl: 'src/scripts/'
  mainConfigFile: 'src/scripts/require-config.js'
  optimize: 'none'
  pragmasOnSave:
    excludeCoffeeScript: true
  name: 'boot'
  out: 'output_static/scripts/boot.js'

requirejs.config({ nodeRequire: require })

requirejs.optimize config, (buildResponse) ->
  # Done
  console.log "Optimization complete!"
  console.log "next-boilerplate.js has successfuly been compiled to /output_static !"
  process.exit()
