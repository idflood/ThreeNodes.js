require.config({
  paths: {
    jquery: 'libs/jquery-1.7.2',
    "jquery.ui": 'libs/jquery-ui/js/jquery-ui-1.9m6',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    text: "libs/require/text",
    cs: "libs/require/cs",
    CoffeeScript: "libs/coffee-script",
    "coffee-script": "libs/coffee-script",
    treeJquery: "libs/tree.jquery",
    RequestAnimationFrame: "libs/three-extras/js/RequestAnimationFrame",
    Raphael: "libs/raphael-min",
    colorpicker: "libs/colorpicker/js/colorpicker",
    Three: "libs/Three",
    ThreeCSG: 'libs/ThreeCSG',
    csg: 'libs/csg',
    EffectComposer: 'libs/three-extras/js/postprocessing/EffectComposer',
    RenderPass: 'libs/three-extras/js/postprocessing/RenderPass',
    BloomPass: 'libs/three-extras/js/postprocessing/BloomPass',
    FilmPass: 'libs/three-extras/js/postprocessing/FilmPass',
    TexturePass: 'libs/three-extras/js/postprocessing/TexturePass',
    ShaderPass: 'libs/three-extras/js/postprocessing/ShaderPass',
    MaskPass: 'libs/three-extras/js/postprocessing/MaskPass',
    DotScreenPass: 'libs/three-extras/js/postprocessing/DotScreenPass',
    ShaderExtras: 'libs/three-extras/js/ShaderExtras',
    timeline: "libs/timeline.js/timeline",
    'timeline-gui': "libs/timeline.js/timeline-gui"
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
    },
    'timeline-gui': {
      deps: ['timeline'],
    },
    'ThreeCSG': ['Three'],
    'csg': ['ThreeCSG'],
    'EffectComposer': ['Three'],
    'RenderPass': ['Three'],
    'BloomPass': ['Three'],
    'FilmPass': ['Three'],
    'TexturePass': ['Three'],
    'ShaderPass': ['Three'],
    'MaskPass': ['Three'],
    'DotScreenPass': ['Three'],
    'ShaderExtras': ['Three']
  }
});
