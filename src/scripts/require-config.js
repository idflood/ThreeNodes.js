require.config({
  paths: {
    jquery: 'libs/jquery-2.0.3',
    "jquery.ui": 'libs/jquery-ui/js/jquery-ui',
    'jquery.menubar': 'libs/jquery.menubar',
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
    ColladaLoader: 'libs/three-extras/js/loaders/ColladaLoader',
    EffectComposer: 'libs/three-extras/js/postprocessing/EffectComposer',
    RenderPass: 'libs/three-extras/js/postprocessing/RenderPass',
    BloomPass: 'libs/three-extras/js/postprocessing/BloomPass',
    FilmPass: 'libs/three-extras/js/postprocessing/FilmPass',
    TexturePass: 'libs/three-extras/js/postprocessing/TexturePass',
    ShaderPass: 'libs/three-extras/js/postprocessing/ShaderPass',
    MaskPass: 'libs/three-extras/js/postprocessing/MaskPass',
    DotScreenPass: 'libs/three-extras/js/postprocessing/DotScreenPass',
    ShaderVignette: 'libs/three-extras/js/shaders/VignetteShader',
    HorizontalBlurShader: 'libs/three-extras/js/shaders/HorizontalBlurShader',
    VerticalBlurShader: 'libs/three-extras/js/shaders/VerticalBlurShader',
    BleachBypassShader: 'libs/three-extras/js/shaders/BleachBypassShader',
    ConvolutionShader: 'libs/three-extras/js/shaders/ConvolutionShader',
    FilmShader: 'libs/three-extras/js/shaders/FilmShader',
    CopyShader: 'libs/three-extras/js/shaders/CopyShader',
    RenderPass: 'libs/three-extras/js/postprocessing/RenderPass',
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
    'jquery.menubar': {
      deps: ['jquery.ui'],
      exports: "jquery"
    },
    'colorpicker': {
      deps: ['jquery'],
      exports: "jquery"
    },
    'timeline-gui': {
      deps: ['timeline'],
    },
    'ColladaLoader': ['Three'],
    'ThreeCSG': ['Three'],
    'csg': ['ThreeCSG'],
    'RenderPass': ['Three'],
    'BloomPass': ['Three'],
    'FilmPass': ['Three'],
    'TexturePass': ['Three'],
    'ShaderPass': ['Three'],
    'MaskPass': ['Three'],
    'DotScreenPass': ['Three'],
    'EffectComposer': {
      deps: ['Three', 'CopyShader']
    },
    'RenderPass': ['Three'],
    'BloomPass': {
      deps: ['Three', 'ConvolutionShader']
    },
    'ConvolutionShader': ['Three'],
    'FilmPass': {
      deps: ['Three', 'FilmShader']
    },
    'ShaderVignette': ['Three'],
    'HorizontalBlurShader': ['Three'],
    'VerticalBlurShader': ['Three'],
    'BleachBypassShader': ['Three'],
    'FilmShader': ['Three'],
    'CopyShader': ['Three'],
    'RenderPass': ['Three']
  }
});
