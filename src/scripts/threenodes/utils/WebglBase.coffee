#"use strict"
_ = require 'Underscore'
Backbone = require 'Backbone'

#THREE = require 'Three'
require 'EffectComposer'
require 'MaskPass'
require 'RenderPass'
require 'ShaderPass'
require 'CopyShader'
require 'libs/BlobBuilder.min'
require 'libs/FileSaver.min'
require 'libs/canvas-toBlob.min'

class WebglBase
  constructor: () ->
    console.log "webgl init..."
    @current_scene = new THREE.Scene()
    @current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
    @current_renderer = false
    if window.WebGLRenderingContext
      @current_renderer = new THREE.WebGLRenderer
        clearColor: 0x000000
        preserveDrawingBuffer: true
    @current_renderer.autoClear = false
    @effectScreen = new THREE.ShaderPass( THREE.CopyShader )
    @effectScreen.renderToScreen = true
    @renderModel = new THREE.RenderPass( @current_scene, @current_camera )
    @composer = new THREE.EffectComposer( @current_renderer )

    WebglBase.current_renderer = @current_renderer
    WebglBase.current_scene = @current_scene
    WebglBase.current_camera = @current_camera
    WebglBase.composer = @composer
    WebglBase.renderModel = @renderModel
    WebglBase.effectScreen = @effectScreen

  exportImage: (fname) =>
    canvas = @current_renderer.domElement
    on_write = (blob) ->
      saveAs(blob, fname)
    canvas.toBlob(on_write, "image/png")

module.exports = WebglBase
