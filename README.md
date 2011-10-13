#ThreeNodes.js

This is an attempt to make something like "vvvv" in javascript, html and webgl.

## Key principles
- modular
- creating a custom "node" must be as easy as possible
- should be possible to switch interface for live performance (selection of buttons/toggle)

## Some ideas
- timeline (global and "local")
- use flash or processing via websockets to get incoming sound, live or mp3
- create something like a player that loads a saved project and only display the result
- maybe add processingjs.org as an alternative to three.js

## Installation
1. install node.js 0.4.x (http://nodejs.org/)
2. install npm (https://github.com/isaacs/npm)
3. install compass/coffeescript (http://compass-style.org/ and http://jashkenas.github.com/coffee-script/)
4. optional: install vogue (https://github.com/andrewdavey/vogue)
5. cd in ThreeNodes
6. npm install -d

## Usage
1. cd in ThreeNodes
2. node server.js
3. if vogue is installed open another terminal and simply call "vogue" in ThreeNodes directory
4. with firefox or chrome go to http://localhost:8042/
5. allow this site to create popups (for webglrender node)
