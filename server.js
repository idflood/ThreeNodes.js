var sys = require('util');
var fs = require('fs');
var path = require('path');
var url = require('url');
var exec = require('child_process').exec;
var watch = require('watch');
var express = require('express');
var coffee = require('coffee-script');
var stylus = require('stylus');
var nib = require('nib');

function puts(error, stdout, stderr) { console.log(stdout) }

function compile_sass() {
  exec("compass compile", puts);
  console.log("compile_sass done");
}

function compile_coffee() {
  exec("cake build", puts);
  console.log("compile_coffee done");
}

var app = express.createServer();
app.use(app.router);
app.use(express.methodOverride());
app.use(express.bodyParser());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
  src: __dirname + '/src',
  dest: __dirname + '/public',
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('warn', true)
      .set('compress', false)
      .use(nib());
  }
}));

app.use(express.static(__dirname + '/public'));

// Routes

// process coffeescript files if needed
app.get('/assets/js/*.js', function(req, res){
  var file = req.params[0];
  path.exists('src/coffee/' + file + '.coffee', function(exists){
    if (exists) {
      // compile the source if there is one
      res.header('Content-Type', 'application/x-javascript');
      var cs = fs.readFileSync('src/coffee/' + file + '.coffee', 'utf8');
      res.send(coffee.compile(cs, {bare: true}));
    }
    else {
      // try to locate a static file
      path.exists('public/assets/js/' + file + '.js', function(exists_static){
        if (exists_static) {
          // return the rendered content
          res.header('Content-Type', 'application/x-javascript');
          var cs = fs.readFileSync('public/assets/js/' + file + '.js', 'utf8');
          res.send(cs);
        }
        else {
          // 404 error
          res.send('Cannot GET ' + '/public/assets/js/' + file + '.js', 404);
        }
      });
    }
  });
});


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

//watchDirectoryAndRecompile("src/sass", compile_sass);
//watchDirectoryAndRecompile("src/coffee", compile_coffee);

console.log("ready: http://localhost:8042/");
