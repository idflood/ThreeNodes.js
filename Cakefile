fs     = require 'fs'
{exec} = require 'child_process'

appFiles  = [
  # omit src/ and .coffee to make the below lines a little shorter
  'utils'
  'UI'
  'main'
  'NodeConnection'
  'NodeField'
  'NodeFieldRack'
  'Node'
  'nodes/Base'
  'nodes/Geometry'
  'nodes/Lights'
  'nodes/Materials'
  'nodes/Math'
  'nodes/Three'
  'nodes/Utils'
  'Sidebar'
  'NodeGraph'
  'File'
]

process = (filename, appContents)->
  fs.writeFile 'public/assets/js/' + filename + '.coffee', appContents.join('\n\n'), 'utf8', (err) ->
    throw err if err
    exec 'coffee --compile public/assets/js/' + filename + '.coffee', (err, stdout, stderr) ->
      throw err if err
      console.log stdout + stderr
      fs.unlink 'public/assets/js/' + filename + '.coffee', (err) ->
        throw err if err
        console.log 'Done.'

build_app = () ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/coffee/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process("app", appContents) if --remaining is 0

task 'build', 'Build single application file from source files', ->
  build_app()
