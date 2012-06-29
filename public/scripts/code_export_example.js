//
// code exported from ThreeNodes.js (github.com/idflood/ThreeNodes.js)
//

require.config({paths: {jQuery: 'loaders/jquery-loader',Underscore: 'loaders/underscore-loader',Backbone: 'loaders/backbone-loader'}});require(['threenodes/App', 'libs/jquery-1.6.4.min', 'libs/underscore-min', 'libs/backbone'], function(App) {

"use strict";
var app = new App();
var nodegraph = app.nodegraph;

//
// nodes
//

// node: WebGLRenderer
var node_1_data = {
  nid: 1,
  name: 'WebGLRenderer',
  type: 'WebGLRenderer',
  x: 1700,
  y: 523,
  fields: {'in': [
    {name: 'width', val: 800},
    {name: 'height', val: 600},
    {name: 'scene'},
    {name: 'camera'},
    {name: 'bg_color'},
    {name: 'postfx'},
    {name: 'shadowCameraNear', val: 3},
    {name: 'shadowCameraFar', val: 3000},
    {name: 'shadowMapWidth', val: 512},
    {name: 'shadowMapHeight', val: 512},
    {name: 'shadowMapEnabled'},
    {name: 'shadowMapSoft', val: true},
  ]},
  anim: {
  }
};
var node_1 = nodegraph.create_node(node_1_data);

// node: Scene
var node_14_data = {
  nid: 14,
  name: 'Scene',
  type: 'Scene',
  x: 1477,
  y: 407,
  fields: {'in': [
    {name: 'children'},
    {name: 'position'},
    {name: 'rotation'},
    {name: 'scale'},
    {name: 'doubleSided'},
    {name: 'visible', val: true},
    {name: 'castShadow'},
    {name: 'receiveShadow'},
    {name: 'fog'},
  ]},
  anim: {
  }
};
var node_14 = nodegraph.create_node(node_14_data);

// node: Camera
var node_25_data = {
  nid: 25,
  name: 'Camera',
  type: 'Camera',
  x: 1162,
  y: 667,
  fields: {'in': [
    {name: 'fov', val: 50},
    {name: 'aspect', val: 1},
    {name: 'near', val: 0.1},
    {name: 'far', val: 2000},
    {name: 'position'},
    {name: 'target'},
    {name: 'useTarget'},
  ]},
  anim: {
  }
};
var node_25 = nodegraph.create_node(node_25_data);

// node: Merge
var node_34_data = {
  nid: 34,
  name: 'Merge',
  type: 'Merge',
  x: 1379,
  y: 407,
  fields: {'in': [
    {name: 'in0'},
    {name: 'in1'},
    {name: 'in2'},
    {name: 'in3'},
    {name: 'in4'},
    {name: 'in5'},
  ]},
  anim: {
  }
};
var node_34 = nodegraph.create_node(node_34_data);

// node: Color
var node_45_data = {
  nid: 45,
  name: 'Color',
  type: 'Color',
  x: 1483,
  y: 670,
  fields: {'in': [
    {name: 'r', val: 0.0784313725490196},
    {name: 'g', val: 0.06666666666666667},
    {name: 'b', val: 0.0784313725490196},
  ]},
  anim: {
  }
};
var node_45 = nodegraph.create_node(node_45_data);

// node: ThreeMesh
var node_55_data = {
  nid: 55,
  name: 'ThreeMesh',
  type: 'ThreeMesh',
  x: 1026,
  y: 66,
  fields: {'in': [
    {name: 'children'},
    {name: 'position'},
    {name: 'rotation'},
    {name: 'scale'},
    {name: 'doubleSided'},
    {name: 'visible', val: true},
    {name: 'castShadow'},
    {name: 'receiveShadow'},
    {name: 'geometry'},
    {name: 'material'},
    {name: 'overdraw'},
  ]},
  anim: {
  }
};
var node_55 = nodegraph.create_node(node_55_data);

// node: TorusGeometry
var node_69_data = {
  nid: 69,
  name: 'TorusGeometry',
  type: 'TorusGeometry',
  x: 726,
  y: 136,
  fields: {'in': [
    {name: 'radius', val: 100},
    {name: 'tube', val: 40},
    {name: 'segmentsR', val: 8},
    {name: 'segmentsT', val: 32},
    {name: 'arc', val: 6.283185307179586},
  ]},
  anim: {
  }
};
var node_69 = nodegraph.create_node(node_69_data);

// node: Vector3
var node_77_data = {
  nid: 77,
  name: 'Vector3',
  type: 'Vector3',
  x: 1002,
  y: 686,
  fields: {'in': [
    {name: 'x'},
    {name: 'y'},
    {name: 'z', val: 700},
  ]},
  anim: {
  }
};
var node_77 = nodegraph.create_node(node_77_data);

// node: Vector3
var node_87_data = {
  nid: 87,
  name: 'Vector3',
  type: 'Vector3',
  x: 759,
  y: 32,
  fields: {'in': [
    {name: 'x'},
    {name: 'y'},
    {name: 'z'},
  ]},
  anim: {
  }
};
var node_87 = nodegraph.create_node(node_87_data);

// node: PointLight
var node_97_data = {
  nid: 97,
  name: 'PointLight',
  type: 'PointLight',
  x: 1174,
  y: 547,
  fields: {'in': [
    {name: 'color'},
    {name: 'position'},
    {name: 'intensity', val: 1.3},
    {name: 'distance'},
  ]},
  anim: {
  }
};
var node_97 = nodegraph.create_node(node_97_data);

// node: MeshLambertMaterial
var node_104_data = {
  nid: 104,
  name: 'MeshLambertMaterial',
  type: 'MeshLambertMaterial',
  x: 787,
  y: 240,
  fields: {'in': [
    {name: 'opacity', val: 1},
    {name: 'transparent'},
    {name: 'depthTest', val: true},
    {name: 'alphaTest'},
    {name: 'polygonOffset'},
    {name: 'polygonOffsetFactor'},
    {name: 'polygonOffsetUnits'},
    {name: 'blending'},
    {name: 'color'},
    {name: 'map'},
    {name: 'reflectivity', val: 1},
    {name: 'refractionRatio', val: 0.98},
    {name: 'wireframe'},
    {name: 'vertexColors'},
    {name: 'skinning'},
    {name: 'fog', val: true},
  ]},
  anim: {
  }
};
var node_104 = nodegraph.create_node(node_104_data);

// node: Timer
var node_121_data = {
  nid: 121,
  name: 'Timer',
  type: 'Timer',
  x: 131,
  y: 60,
  fields: {'in': [
    {name: 'reset'},
    {name: 'pause'},
    {name: 'max', val: 99999999999},
  ]},
  anim: {
  }
};
var node_121 = nodegraph.create_node(node_121_data);

// node: MathMult
var node_126_data = {
  nid: 126,
  name: 'MathMult',
  type: 'MathMult',
  x: 542,
  y: 139,
  fields: {'in': [
    {name: 'in', val: 64971},
    {name: 'factor', val: 0.0001},
  ]},
  anim: {
  }
};
var node_126 = nodegraph.create_node(node_126_data);

// node: TorusKnotGeometry
var node_134_data = {
  nid: 134,
  name: 'TorusKnotGeometry',
  type: 'TorusKnotGeometry',
  x: 387,
  y: 630,
  fields: {'in': [
    {name: 'radius', val: 700},
    {name: 'tube', val: 5},
    {name: 'segmentsR', val: 256},
    {name: 'segmentsT', val: 16},
    {name: 'p', val: 12},
    {name: 'q', val: 5},
    {name: 'heightScale', val: 5},
  ]},
  anim: {
  }
};
var node_134 = nodegraph.create_node(node_134_data);

// node: ThreeMesh
var node_143_data = {
  nid: 143,
  name: 'ThreeMesh',
  type: 'ThreeMesh',
  x: 722,
  y: 545,
  fields: {'in': [
    {name: 'children'},
    {name: 'position'},
    {name: 'rotation'},
    {name: 'scale'},
    {name: 'doubleSided'},
    {name: 'visible', val: true},
    {name: 'castShadow'},
    {name: 'receiveShadow'},
    {name: 'geometry'},
    {name: 'material'},
    {name: 'overdraw'},
  ]},
  anim: {
  }
};
var node_143 = nodegraph.create_node(node_143_data);

// node: Vector3
var node_158_data = {
  nid: 158,
  name: 'Vector3',
  type: 'Vector3',
  x: 586,
  y: 481,
  fields: {'in': [
    {name: 'x'},
    {name: 'y'},
    {name: 'z'},
  ]},
  anim: {
  }
};
var node_158 = nodegraph.create_node(node_158_data);

// node: Color
var node_169_data = {
  nid: 169,
  name: 'Color',
  type: 'Color',
  x: 655,
  y: 313,
  fields: {'in': [
    {name: 'r', val: 0.9786666666666646},
    {name: 'g'},
    {name: 'b', val: 0.33873873873874005},
  ]},
  anim: {
    'r' : [
      {time: 0, value: 1, easing: 'Linear.EaseNone'},
      {time: 1.4, value: 0, easing: 'Linear.EaseNone'},
      {time: 2.9, value: 1, easing: 'Linear.EaseNone'},
    ],
    'g' : [
    ],
    'b' : [
      {time: 0, value: 0.3333333333333333, easing: 'Linear.EaseNone'},
      {time: 1.4, value: 1, easing: 'Linear.EaseNone'},
      {time: 2.88, value: 0.3333333333333333, easing: 'Linear.EaseNone'},
    ],
  }
};
var node_169 = nodegraph.create_node(node_169_data);

// node: MeshPhongMaterial
var node_179_data = {
  nid: 179,
  name: 'MeshPhongMaterial',
  type: 'MeshPhongMaterial',
  x: 492,
  y: 808,
  fields: {'in': [
    {name: 'opacity', val: 1},
    {name: 'transparent'},
    {name: 'depthTest', val: true},
    {name: 'alphaTest'},
    {name: 'polygonOffset'},
    {name: 'polygonOffsetFactor'},
    {name: 'polygonOffsetUnits'},
    {name: 'blending'},
    {name: 'color'},
    {name: 'map'},
    {name: 'ambient'},
    {name: 'specular'},
    {name: 'shininess', val: 30},
    {name: 'reflectivity', val: 1},
    {name: 'refractionRatio', val: 0.98},
    {name: 'wireframe'},
    {name: 'vertexColors'},
    {name: 'skinning'},
    {name: 'fog', val: true},
  ]},
  anim: {
  }
};
var node_179 = nodegraph.create_node(node_179_data);

// node: Color
var node_199_data = {
  nid: 199,
  name: 'Color',
  type: 'Color',
  x: 279,
  y: 961,
  fields: {'in': [
    {name: 'r', val: 0.03137254901960784},
    {name: 'g', val: 0.5490196078431373},
    {name: 'b', val: 1},
  ]},
  anim: {
  }
};
var node_199 = nodegraph.create_node(node_199_data);

// node: AmbientLight
var node_209_data = {
  nid: 209,
  name: 'AmbientLight',
  type: 'AmbientLight',
  x: 1103,
  y: 385,
  fields: {'in': [
    {name: 'color'},
    {name: 'position'},
  ]},
  anim: {
  }
};
var node_209 = nodegraph.create_node(node_209_data);

// node: Merge
var node_215_data = {
  nid: 215,
  name: 'Merge',
  type: 'Merge',
  x: 1521,
  y: 791,
  fields: {'in': [
    {name: 'in0'},
    {name: 'in1'},
    {name: 'in2'},
    {name: 'in3'},
    {name: 'in4'},
    {name: 'in5'},
  ]},
  anim: {
  }
};
var node_215 = nodegraph.create_node(node_215_data);

// node: BloomPass
var node_224_data = {
  nid: 224,
  name: 'BloomPass',
  type: 'BloomPass',
  x: 1092,
  y: 819,
  fields: {'in': [
    {name: 'strength', val: 1.8},
    {name: 'kernelSize', val: 25},
    {name: 'sigma', val: 4},
    {name: 'resolution', val: 256},
  ]},
  anim: {
  }
};
var node_224 = nodegraph.create_node(node_224_data);

// node: VignettePass
var node_231_data = {
  nid: 231,
  name: 'VignettePass',
  type: 'VignettePass',
  x: 1063,
  y: 934,
  fields: {'in': [
    {name: 'offset', val: 2},
    {name: 'darkness', val: 1.2},
  ]},
  anim: {
  }
};
var node_231 = nodegraph.create_node(node_231_data);

// node: FilmPass
var node_236_data = {
  nid: 236,
  name: 'FilmPass',
  type: 'FilmPass',
  x: 1149,
  y: 999,
  fields: {'in': [
    {name: 'noiseIntensity', val: 0.7},
    {name: 'scanlinesIntensity', val: 0.2},
    {name: 'scanlinesCount', val: 2048},
    {name: 'grayscale'},
  ]},
  anim: {
  }
};
var node_236 = nodegraph.create_node(node_236_data);

//
// connections
//

var connection_24_data = {
  id: 24,
  from_node: 14, from: 'out',
  to_node: 1, to: 'scene'
};
var connection_24 = nodegraph.createConnectionFromObject(connection_24_data);
var connection_42_data = {
  id: 42,
  from_node: 25, from: 'out',
  to_node: 34, to: 'in5'
};
var connection_42 = nodegraph.createConnectionFromObject(connection_42_data);
var connection_43_data = {
  id: 43,
  from_node: 25, from: 'out',
  to_node: 1, to: 'camera'
};
var connection_43 = nodegraph.createConnectionFromObject(connection_43_data);
var connection_44_data = {
  id: 44,
  from_node: 34, from: 'out',
  to_node: 14, to: 'children'
};
var connection_44 = nodegraph.createConnectionFromObject(connection_44_data);
var connection_54_data = {
  id: 54,
  from_node: 45, from: 'rgb',
  to_node: 1, to: 'bg_color'
};
var connection_54 = nodegraph.createConnectionFromObject(connection_54_data);
var connection_68_data = {
  id: 68,
  from_node: 55, from: 'out',
  to_node: 34, to: 'in0'
};
var connection_68 = nodegraph.createConnectionFromObject(connection_68_data);
var connection_76_data = {
  id: 76,
  from_node: 69, from: 'out',
  to_node: 55, to: 'geometry'
};
var connection_76 = nodegraph.createConnectionFromObject(connection_76_data);
var connection_86_data = {
  id: 86,
  from_node: 77, from: 'xyz',
  to_node: 25, to: 'position'
};
var connection_86 = nodegraph.createConnectionFromObject(connection_86_data);
var connection_96_data = {
  id: 96,
  from_node: 87, from: 'xyz',
  to_node: 55, to: 'rotation'
};
var connection_96 = nodegraph.createConnectionFromObject(connection_96_data);
var connection_103_data = {
  id: 103,
  from_node: 97, from: 'out',
  to_node: 34, to: 'in4'
};
var connection_103 = nodegraph.createConnectionFromObject(connection_103_data);
var connection_120_data = {
  id: 120,
  from_node: 104, from: 'out',
  to_node: 55, to: 'material'
};
var connection_120 = nodegraph.createConnectionFromObject(connection_120_data);
var connection_130_data = {
  id: 130,
  from_node: 121, from: 'out',
  to_node: 126, to: 'in'
};
var connection_130 = nodegraph.createConnectionFromObject(connection_130_data);
var connection_131_data = {
  id: 131,
  from_node: 126, from: 'out',
  to_node: 87, to: 'y'
};
var connection_131 = nodegraph.createConnectionFromObject(connection_131_data);
var connection_132_data = {
  id: 132,
  from_node: 126, from: 'out',
  to_node: 87, to: 'z'
};
var connection_132 = nodegraph.createConnectionFromObject(connection_132_data);
var connection_133_data = {
  id: 133,
  from_node: 126, from: 'out',
  to_node: 87, to: 'x'
};
var connection_133 = nodegraph.createConnectionFromObject(connection_133_data);
var connection_156_data = {
  id: 156,
  from_node: 143, from: 'out',
  to_node: 34, to: 'in1'
};
var connection_156 = nodegraph.createConnectionFromObject(connection_156_data);
var connection_157_data = {
  id: 157,
  from_node: 134, from: 'out',
  to_node: 143, to: 'geometry'
};
var connection_157 = nodegraph.createConnectionFromObject(connection_157_data);
var connection_167_data = {
  id: 167,
  from_node: 126, from: 'out',
  to_node: 158, to: 'y'
};
var connection_167 = nodegraph.createConnectionFromObject(connection_167_data);
var connection_168_data = {
  id: 168,
  from_node: 158, from: 'xyz',
  to_node: 143, to: 'rotation'
};
var connection_168 = nodegraph.createConnectionFromObject(connection_168_data);
var connection_178_data = {
  id: 178,
  from_node: 169, from: 'rgb',
  to_node: 104, to: 'color'
};
var connection_178 = nodegraph.createConnectionFromObject(connection_178_data);
var connection_198_data = {
  id: 198,
  from_node: 179, from: 'out',
  to_node: 143, to: 'material'
};
var connection_198 = nodegraph.createConnectionFromObject(connection_198_data);
var connection_208_data = {
  id: 208,
  from_node: 199, from: 'rgb',
  to_node: 179, to: 'color'
};
var connection_208 = nodegraph.createConnectionFromObject(connection_208_data);
var connection_214_data = {
  id: 214,
  from_node: 209, from: 'out',
  to_node: 34, to: 'in3'
};
var connection_214 = nodegraph.createConnectionFromObject(connection_214_data);
var connection_223_data = {
  id: 223,
  from_node: 215, from: 'out',
  to_node: 1, to: 'postfx'
};
var connection_223 = nodegraph.createConnectionFromObject(connection_223_data);
var connection_230_data = {
  id: 230,
  from_node: 224, from: 'out',
  to_node: 215, to: 'in0'
};
var connection_230 = nodegraph.createConnectionFromObject(connection_230_data);
var connection_235_data = {
  id: 235,
  from_node: 231, from: 'out',
  to_node: 215, to: 'in1'
};
var connection_235 = nodegraph.createConnectionFromObject(connection_235_data);
var connection_242_data = {
  id: 242,
  from_node: 236, from: 'out',
  to_node: 215, to: 'in2'
};
var connection_242 = nodegraph.createConnectionFromObject(connection_242_data);


// set player mode
ThreeNodes.events.trigger('SetDisplayModeCommand', true);
});