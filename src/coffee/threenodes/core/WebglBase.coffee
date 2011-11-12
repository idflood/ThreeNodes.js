define [
  'jQuery',
  'Underscore', 
  'Backbone',
  "order!libs/Three",
  "order!libs/three-extras/js/ShaderExtras",
  "order!libs/three-extras/js/postprocessing/EffectComposer",
  "order!libs/three-extras/js/postprocessing/MaskPass",
  "order!libs/three-extras/js/postprocessing/RenderPass",
  "order!libs/three-extras/js/postprocessing/ShaderPass",
  "order!libs/three-extras/js/postprocessing/BloomPass",
  "order!libs/three-extras/js/postprocessing/FilmPass",
  "order!libs/three-extras/js/postprocessing/DotScreenPass",
], ($, _, Backbone) ->
  ThreeNodes.Webgl = {}
  class ThreeNodes.WebglBase
    constructor: () ->
      @current_scene = new THREE.Scene()
      @current_camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 10000)
      @current_renderer = new THREE.WebGLRenderer
        clearColor: 0x000000
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
      
      ThreeNodes.rebuild_all_shaders = @rebuild_all_shaders
    
    rebuild_all_shaders: () =>
      console.log "rebuilding shaders"
      console.log ThreeNodes.webgl_materials_node
      for n in ThreeNodes.webgl_materials_node
        n.ob.program = false
    