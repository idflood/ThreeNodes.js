require.config({
  paths: {
    jQuery: 'libs/jquery-1.7.2',
    jQueryUi: 'libs/jquery-ui/js/jquery-ui-1.9m6',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    use: "libs/require/use",
    text: "libs/require/text",
    order: "libs/require/order",
    cs: "libs/require/cs",
    CoffeeScript: "libs/coffee-script",
    treeJquery: "libs/tree.jquery",
    RequestAnimationFrame: "libs/three-extras/js/RequestAnimationFrame",
    Raphael: "libs/raphael-min",
    colorpicker: "libs/colorpicker/js/colorpicker"
  },
  use: {
    'Three':{
      attach: "THREE"
    },
    'RequestAnimationFrame':{
      attach: "requestAnimationFrame"
    },
    'Raphael':{
      attach: "Raphael"
    },
    'treeJquery': {
      deps: ['jQueryUi'],
      attach: "jQuery"
    },
    'Underscore': {
      attach: "_"
    },
    'Backbone': {
      deps: ['Underscore', 'jQuery'],
      attach: "Backbone"
    },
    'jQueryUi': {
      deps: ['jQuery'],
      attach: "jQuery"
    },
    'colorpicker': {
      deps: ['jQuery'],
      attach: "jQuery"
    }
  }
});
