#global module:false
module.exports = (grunt) ->
  "use strict"
  grunt.initConfig
    compass:
      clean:
        options:
          clean: true

      dev:
        options:
          debugInfo: false
          bundleExec: true

      build:
        options:
          environment: "production"
          outputStyle: "compressed"
          noLineComments: true
          imagesDir: "assets/images"
          fontsDir: "assets/fonts"
          bundleExec: true

    webpack:
      options: require("./webpack.config.js")

      dev:
        devtool: "sourcemap"
        debug: true

    watch:
      sass:
        files: ["src/styles/**"]
        tasks: ["compass:dev"]

      js:
        files: ["src/scripts/**", "!src/scripts/bower_components/**"]
        tasks: ["scripts:dev"]

      reloadcss:
        options: {livereload: true}
        files: ["assets/styles/*.css"]

      reloadjs:
        options: {livereload: true}
        files: ["assets/scripts/**", "!src/scripts/bower_components/**"]

      reloadhtmlphp:
        options: {livereload: true}
        files: ["**.php", "**.html"]

    clean:
      build: ["assets/images/"]
      scripts: ["assets/scripts/"]

    copy:
      main:
        files: [
          expand: true
          src: ["**"]
          cwd: "src/images/"
          dest: "assets/images/"
        ,
          expand: true
          src: ["**"]
          cwd: "src/fonts/"
          dest: "assets/fonts/"
        ,
          expand: true
          src: ["src/scripts/vendors/modernizr.js"]
          dest: "assets/scripts/vendors/"
        ,
          expand: true
          src: ["src/scripts/app.js"]
          dest: "assets/scripts/"
        ]

    imagemin:
      build:
        options:
          optimizationLevel: 7
          progressive: true

        files: [
          expand: true
          cwd: "assets/images/"
          src: ["**.png", "*/**.png"]
          dest: "assets/images/"
        ,
          expand: true
          cwd: "assets/images/"
          src: ["**.jpg", "*/**.jpg"]
          dest: "assets/images/"
        ]

    notify:
      build:
        options: {message: "Build complete"}

  # Load necessary plugins
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-compass"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-imagemin"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-requirejs"
  grunt.loadNpmTasks "grunt-notify"
  grunt.loadNpmTasks "grunt-webpack"

  grunt.registerTask "init", ["compass:clean", "compass:dev", "scripts:dev"]
  grunt.registerTask "default", ["compass:clean", "compass:dev", "scripts:dev", "watch"]
  grunt.registerTask "scripts", ["webpack:dev"]
  grunt.registerTask "build", ["clean", "compass:clean", "copy", "imagemin", "compass:build", "scripts:dev", "notify:build"]
