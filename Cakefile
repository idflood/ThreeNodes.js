fs     = require 'fs'
{exec} = require 'child_process'

exec_and_log = (command) ->
  exec command, (err, stdout, stderr) ->
    console.log stdout + stderr

task 'build', 'Build single application file from source files', ->
  exec_and_log 'coffee -b -o public/assets/js/ -c src/coffee/boot.coffee'
  exec_and_log 'coffee -b -o public/assets/js/threenodes/ -c src/coffee/threenodes/'
  exec_and_log 'coffee -b -o public/assets/js/ -c src/coffee/boot_test.coffee'
  exec_and_log 'coffee -b -o public/assets/js/tests/ -c src/coffee/tests/'
