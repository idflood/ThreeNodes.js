#ThreeNodes.js
<img src="http://github.com/idflood/ThreeNodes.js/raw/master/misc/screenshot1.jpg" width="900" height="489" alt="screenshot v 0.01">

This is an attempt to make something like "vvvv" in javascript, html and webgl.

Live demo: http://idflood.github.com/ThreeNodes.js/

## Key principles
- modular
- creating a custom "node" must be as easy as possible
- should be possible to switch interface for live performance (selection of buttons/toggle)

## Some ideas
- timeline (global and "local")
- use flash or processing via websockets to get incoming sound, live or mp3
- create something like a player that loads a saved project and only display the result
- maybe add processingjs.org as an alternative to three.js

## Development setup
This will automatically compile coffescript files to javascript, sass to css and haml to html.

1. install node.js 0.4.x (http://nodejs.org/)
2. install npm (https://github.com/isaacs/npm)
3. install compass/coffeescript (http://compass-style.org/ and http://jashkenas.github.com/coffee-script/)
4. cd in ThreeNodes
5. npm install -d

## Usage
1. cd in ThreeNodes
2. node server.js
3. with firefox or chrome go to http://localhost:8042/
4. allow this site to create popups (for webglrender node)

## Howto create a simple scene
First, create a webglrenderer node. Then add a scene and connect it to the "scene" of the webgl node. On the scene children you would connect a "merge" and to it a mesh. With that there should be a red cube showing in the renderer window.
