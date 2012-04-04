#ThreeNodes.js
<img src="http://github.com/idflood/ThreeNodes.js/raw/master/misc/screenshot1.jpg" width="852" height="436" alt="screenshot version 0.02">

This is an attempt to make something like "vvvv" in javascript, html and webgl.

Live demo: http://idflood.github.com/ThreeNodes.js/

## Key principles
- modular
- creating a custom "node" must be as easy as possible
- should be possible to switch interface for live performance (selection of buttons/toggle)

## Some ideas
- local timelines ?
- grouping (multiple nodes in one, possibility to have multiple instances)
- some kind of library panel like in flash to manage images/fonts/groups... 
- preloader
- maybe add processingjs.org as an alternative to three.js

## Development setup
This will automatically compile coffescript files to javascript, sass to css and haml to html.

1. install node.js 0.6.x (http://nodejs.org/)
2. install npm (https://github.com/isaacs/npm)
3. install coffeescript (http://jashkenas.github.com/coffee-script/)
4. install jade globally: sudo npm install -g jade 
5. cd in ThreeNodes
6. npm install -d

## Usage
1. cd in ThreeNodes
2. node server.js
3. with firefox or chrome go to http://localhost:8042/
4. allow this site to create popups (for webglrender node)

## Build / Deploy
1. cd in ThreeNodes
2. node server.js build
3. a new /output_static should have been created

## Known limitations
- It is recommended to always access ThreeNodes.js from http since chrome has a highly restrictive file access when using file://. (see http://code.google.com/p/chromium/issues/detail?id=40787)

## Howto create a simple scene
First, create a webglrenderer node. Then add a scene and connect it to the "scene" of the webgl node. On the scene children you would connect a "merge" and to it a mesh. With that there should be a red cube showing in the renderer window.
