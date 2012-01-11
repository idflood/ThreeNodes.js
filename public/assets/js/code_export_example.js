//
// code exported from ThreeNodes.js (github.com/idflood/ThreeNodes.js)
//

require.config({paths: {jQuery: 'loaders/jquery-loader',Underscore: 'loaders/underscore-loader',Backbone: 'loaders/backbone-loader'}});require(['order!threenodes/App', 'order!libs/jquery-1.6.4.min', 'order!libs/underscore-min', 'order!libs/backbone'], function(App) {

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
    {name: 'shadowMapEnabled', val: false},
    {name: 'shadowMapSoft', val: true},
  ]},
  anim: false
};
var node_1 = nodegraph.create_node("Three", "WebGLRenderer", 1149, 290, false, node_1_data);

// node: Camera
var node_14_data = {
  nid: 14,
  name: 'Camera',
  type: 'Camera',
  fields: {'in': [
    {name: 'fov', val: 50},
    {name: 'aspect', val: 1},
    {name: 'near', val: 0.1},
    {name: 'far', val: 2000},
    {name: 'position'},
    {name: 'target'},
    {name: 'useTarget', val: false},
  ]},
  anim: false
};
var node_14 = nodegraph.create_node("Three", "Camera", 637, 443, false, node_14_data);

// node: Scene
var node_23_data = {
  nid: 23,
  name: 'Scene',
  type: 'Scene',
  fields: {'in': [
    {name: 'children'},
    {name: 'position'},
    {name: 'rotation'},
    {name: 'scale'},
    {name: 'doubleSided', val: false},
    {name: 'visible', val: true},
    {name: 'castShadow', val: false},
    {name: 'receiveShadow', val: false},
    {name: 'fog', val: null},
  ]},
  anim: false
};
var node_23 = nodegraph.create_node("Three", "Scene", 916, 217, false, node_23_data);

// node: Merge
var node_35_data = {
  nid: 35,
  name: 'Merge',
  type: 'Merge',
  fields: {'in': [
    {name: 'in0'},
    {name: 'in1', val: null},
    {name: 'in2', val: null},
    {name: 'in3', val: null},
    {name: 'in4', val: null},
    {name: 'in5'},
  ]},
  anim: false
};
var node_35 = nodegraph.create_node("Utils", "Merge", 818, 217, false, node_35_data);

// node: Color
var node_45_data = {
  nid: 45,
  name: 'Color',
  type: 'Color',
  fields: {'in': [
    {name: 'r', val: 0.4196078431372549},
    {name: 'g', val: 0.48627450980392156},
    {name: 'b', val: 0.5019607843137255},
  ]},
  anim: false
};
var node_45 = nodegraph.create_node("Base", "Color", 950, 484, false, node_45_data);

// node: Vector3
var node_55_data = {
  nid: 55,
  name: 'Vector3',
  type: 'Vector3',
  fields: {'in': [
    {name: 'x', val: 200},
    {name: 'y', val: 300},
    {name: 'z', val: 700},
  ]},
  anim: false
};
var node_55 = nodegraph.create_node("Base", "Vector3", 479, 503, false, node_55_data);

// node: Mesh
var node_65_data = {
  nid: 65,
  name: 'Mesh',
  type: 'Mesh',
  fields: {'in': [
    {name: 'children', val: undefined},
    {name: 'position'},
    {name: 'rotation'},
    {name: 'scale'},
    {name: 'doubleSided', val: false},
    {name: 'visible', val: true},
    {name: 'castShadow', val: false},
    {name: 'receiveShadow', val: false},
    {name: 'geometry'},
    {name: 'material'},
    {name: 'overdraw', val: false},
  ]},
  anim: false
};
var node_65 = nodegraph.create_node("Three", "Mesh", 587, 192, false, node_65_data);

// node: Timer
var node_79_data = {
  nid: 79,
  name: 'Timer',
  type: 'Timer',
  fields: {'in': [
    {name: 'reset', val: false},
    {name: 'pause', val: false},
    {name: 'max', val: 99999999999},
  ]},
  anim: false
};
var node_79 = nodegraph.create_node("Utils", "Timer", 209, 182, false, node_79_data);

// node: Mult
var node_84_data = {
  nid: 84,
  name: 'Mult',
  type: 'Mult',
  fields: {'in': [
    {name: 'in', val: 2211},
    {name: 'factor', val: 0.001},
  ]},
  anim: false
};
var node_84 = nodegraph.create_node("Math", "Mult", 384, 182, false, node_84_data);

// node: Vector3
var node_89_data = {
  nid: 89,
  name: 'Vector3',
  type: 'Vector3',
  fields: {'in': [
    {name: 'x', val: 0},
    {name: 'y', val: 2.211},
    {name: 'z', val: 0},
  ]},
  anim: false
};
var node_89 = nodegraph.create_node("Base", "Vector3", 486, 188, false, node_89_data);

//
// connections
//

var connection_33_data = {
  id: 33,
  from_node: 23, from: 'out',
  to_node: 1, to: 'scene'
};
var connection_33 = nodegraph.createConnectionFromObject(connection_33_data);
var connection_34_data = {
  id: 34,
  from_node: 14, from: 'out',
  to_node: 1, to: 'camera'
};
var connection_34 = nodegraph.createConnectionFromObject(connection_34_data);
var connection_43_data = {
  id: 43,
  from_node: 14, from: 'out',
  to_node: 35, to: 'in5'
};
var connection_43 = nodegraph.createConnectionFromObject(connection_43_data);
var connection_44_data = {
  id: 44,
  from_node: 35, from: 'out',
  to_node: 23, to: 'children'
};
var connection_44 = nodegraph.createConnectionFromObject(connection_44_data);
var connection_54_data = {
  id: 54,
  from_node: 45, from: 'rgb',
  to_node: 1, to: 'bg_color'
};
var connection_54 = nodegraph.createConnectionFromObject(connection_54_data);
var connection_64_data = {
  id: 64,
  from_node: 55, from: 'xyz',
  to_node: 14, to: 'position'
};
var connection_64 = nodegraph.createConnectionFromObject(connection_64_data);
var connection_78_data = {
  id: 78,
  from_node: 65, from: 'out',
  to_node: 35, to: 'in0'
};
var connection_78 = nodegraph.createConnectionFromObject(connection_78_data);
var connection_88_data = {
  id: 88,
  from_node: 79, from: 'out',
  to_node: 84, to: 'in'
};
var connection_88 = nodegraph.createConnectionFromObject(connection_88_data);
var connection_98_data = {
  id: 98,
  from_node: 89, from: 'xyz',
  to_node: 65, to: 'rotation'
};
var connection_98 = nodegraph.createConnectionFromObject(connection_98_data);
var connection_99_data = {
  id: 99,
  from_node: 84, from: 'out',
  to_node: 89, to: 'y'
};
var connection_99 = nodegraph.createConnectionFromObject(connection_99_data);


});