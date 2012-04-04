var sys = require('util');
var exec = require('child_process').exec;
var watch = require('watch');
var express = require('express');

var first_pass_sass = false;

function puts(error, stdout, stderr) { console.log(stdout) }

function compile_sass() {
  exec("compass compile", puts);
  console.log("compile_sass done");
}

function compile_haml() {
  exec("haml src/haml/index.haml public/index.html", puts);
  exec("haml src/haml/test.haml public/test.html", puts);
  exec("haml src/haml/speedtest.haml public/speedtest.html", puts);
  console.log("compile_haml done");
}

function compile_coffee() {
  exec("cake build", puts);
  console.log("compile_coffee done");
}

function watchDirectoryAndRecompile(dir, callback) {
  watch.watchTree(dir, {'ignoreDotFiles' : true}, function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // f is a new file
      callback();
    } else if (curr.nlink === 0) {
      // f was removed
      callback();
    } else {
      // f was changed
      callback();
    }
  });
}

var app = express.createServer();
var port = process.env.PORT || 3000;
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.listen(port);

watchDirectoryAndRecompile("src/sass", compile_sass);
watchDirectoryAndRecompile("src/haml", compile_haml);
watchDirectoryAndRecompile("src/coffee", compile_coffee);

console.log("ready: http://localhost:8042/");
