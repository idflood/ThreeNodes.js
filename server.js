var connect = require('connect');
var sys = require('util');
var exec = require('child_process').exec;
var watch = require('watch');

var first_pass_sass = false;

function puts(error, stdout, stderr) { console.log(stdout) }

function compile_sass() {
  exec("compass compile", puts);
}

function compile_haml() {
  exec("haml src/haml/index.haml public/index.html", puts);
  exec("haml src/haml/test.haml public/test.html", puts);
  exec("haml src/haml/speedtest.haml public/speedtest.html", puts);
}

function compile_coffee() {
  exec("cake build", puts);
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

connect.createServer(
    connect.static(__dirname + '/public', { maxAge: 0 })
  , function(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('404')
  }
).listen(8042);

watchDirectoryAndRecompile("src/sass", compile_sass);
watchDirectoryAndRecompile("src/haml", compile_haml);
watchDirectoryAndRecompile("src/coffee", compile_coffee);

console.log("ready: http://localhost:8042/");
