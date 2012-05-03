require('coffee-script');

// Check for "build" parameter (node server.js build)
var is_build = (process.argv[2] == "build");

global.basePath = __dirname;

if (is_build == false) {
  require(__dirname + '/src/scripts/_server');
}
else {
  require(__dirname + '/src/scripts/_build');
}
