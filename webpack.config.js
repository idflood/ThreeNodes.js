var path = require("path");
var webpack = require("webpack");
module.exports = {
  cache: true,
  context: "./src/scripts/",
  //devtool: "eval",
  entry: {
    "Core": "./threenodes/Core.coffee",
    "NodeTypes": "./NodeTypes.coffee",
    "UI": "./threenodes/UI.coffee"
  },
  output: {
    path: path.join(__dirname, "assets/scripts/"),
    publicPath: "assets/",
    filename: "ThreeNodes.[name].js",
    chunkFilename: "ThreeNodes.[hash].js",
    library: ["ThreeNodes", "[name]"],
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {test: /\.coffee$/, loader: "coffee-loader"},
      {test: /\.html$/, loader: "html-loader"},
    ]
  },
  externals: {
    "jquery": "jQuery",
    "jquery.ui": "jQuery",
    "Three": "Three",
		"jquery.layout": "jQuery",
		"treeJquery": "jQuery",
		"Raphael": "Raphael",
    "jshint": "libs/jshint",
    "Underscore": "_",
    "underscore": "_",
    "Backbone": "Backbone",
    "Blob": "Blob",
    "FileSaver": "FileSaver"
  },
  resolve: {
    alias: {
      // Bind version of jquery
      "Underscore": "libs/underscore",
      "underscore": "libs/underscore",
      Backbone: "libs/backbone",
      //jquery: "libs/jquery-2.0.3",
      //"jquery.ui": 'libs/jquery-ui/js/jquery-ui',
      'jquery.menubar': 'libs/jquery.menubar',
      //'jquery.layout': 'libs/jquery.layout-latest',
      //treeJquery: "libs/tree.jquery",
      RequestAnimationFrame: "libs/three-extras/js/RequestAnimationFrame",
      //Raphael: "libs/raphael-min",
      colorpicker: "libs/colorpicker/js/colorpicker",
      Blob: 'libs/Blob',
      FileSaver: 'libs/FileSaver.min',
      //Three: "libs/Three",
      ThreeCSG: 'libs/ThreeCSG',
      csg: 'libs/csg',
      'draggable-number': 'libs/draggable-number',
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
      //timeline: "libs/timeline.js/timeline",
      //'timeline-gui': "libs/timeline.js/timeline-gui"
    },
    extensions: ['', '.coffee', '.js'],
    root: path.join(__dirname, "src/scripts/")
  },
  plugins: [
    new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])),
    new webpack.optimize.DedupePlugin()
  ]
  /*plugins: [
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: "jquery",
      $: "jquery"
    })
  ]*/
};
