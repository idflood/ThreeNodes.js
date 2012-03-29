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
app.use(app.router);
app.use(express.methodOverride());
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', function(req, res){
  res.render('index', { layout: false});
});

app.get('/code_export_example', function(req, res){
  res.render('code_export_example', { layout: false});
});

app.get('/speedtest', function(req, res){
  res.render('speedtest', { layout: false});
});

app.get('/test', function(req, res){
  res.render('test', { layout: false});
});

// app.get('/compositions', function(req, res) {
//   res.sendfile('public/index.html');
// });

app.listen(8042);

watchDirectoryAndRecompile("src/sass", compile_sass);
watchDirectoryAndRecompile("src/haml", compile_haml);
watchDirectoryAndRecompile("src/coffee", compile_coffee);

console.log("ready: http://localhost:8042/");
