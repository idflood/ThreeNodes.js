
define [
  'use!Underscore', 
  'use!Backbone',
  "order!libs/Three",
  "order!libs/three-extras/js/ShaderExtras",
  "order!libs/three-extras/js/postprocessing/EffectComposer",
  "order!libs/three-extras/js/postprocessing/MaskPass",
  "order!libs/three-extras/js/postprocessing/RenderPass",
  "order!libs/three-extras/js/postprocessing/ShaderPass",
  "order!libs/three-extras/js/postprocessing/BloomPass",
  "order!libs/three-extras/js/postprocessing/FilmPass",
  "order!libs/three-extras/js/postprocessing/DotScreenPass",
  "order!libs/BlobBuilder.min",
  "order!libs/FileSaver.min",
  "order!libs/canvas-toBlob.min",
], (_, Backbone) ->
  #"use strict"
  
  $ = window.jQuery
  
  namespace "ThreeNodes"
    Webgl = {}
    
    class WebglBase
      constructor: () ->
        console.log "webgl init..."
        @current_scene = new THREE.Scene()
        @current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
        @current_renderer = new THREE.WebGLRenderer
          clearColor: 0x000000
          preserveDrawingBuffer: true
        @current_renderer.autoClear = false
        @effectScreen = new THREE.ShaderPass( THREE.ShaderExtras[ "screen" ] )
        @effectScreen.renderToScreen = true
        @renderModel = new THREE.RenderPass( @current_scene, @current_camera )
        @composer = new THREE.EffectComposer( @current_renderer )
        
        ThreeNodes.Webgl.current_renderer = @current_renderer
        ThreeNodes.Webgl.current_scene = @current_scene
        ThreeNodes.Webgl.current_camera = @current_camera
        ThreeNodes.Webgl.composer = @composer
        ThreeNodes.Webgl.renderModel = @renderModel
        ThreeNodes.Webgl.effectScreen = @effectScreen
      
      exportImage: (fname) =>
        canvas = @current_renderer.domElement
        on_write = (blob) ->
          saveAs(blob, fname)
        canvas.toBlob(on_write, "image/png")
    