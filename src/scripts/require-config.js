require.config({
  paths: {
    jquery: 'libs/jquery-1.7.2',
    "jquery.ui": 'libs/jquery-ui/js/jquery-ui-1.9m6',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    text: "libs/require/text",
    cs: "libs/require/cs",
    CoffeeScript: "libs/coffee-script",
    treeJquery: "libs/tree.jquery",
    RequestAnimationFrame: "libs/three-extras/js/RequestAnimationFrame",
    Raphael: "libs/raphael-min",
    colorpicker: "libs/colorpicker/js/colorpicker"
  },
  shim: {
    'Three':{
      exports: "THREE"
    },
    'RequestAnimationFrame':{
      exports: "requestAnimationFrame"
    },
    'Raphael':{
      exports: "Raphael"
    },
    'treeJquery': {
      deps: ['jquery.ui'],
      exports: "jquery"
    },
    'Underscore': {
      exports: "_"
    },
    'Backbone': {
      deps: ['Underscore', 'jquery'],
      exports: "Backbone"
    },
    'jquery.ui': {
      deps: ['jquery'],
      exports: "jquery"
    },
    'colorpicker': {
      deps: ['jquery'],
      exports: "jquery"
    }
  }
});
