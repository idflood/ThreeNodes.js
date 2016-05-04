#global module:false
module.exports = (grunt) ->
  "use strict"
  grunt.initConfig
    sass:
      options:
        sourceMap: true
      dist:
        files:
          'assets/styles/screen.css': 'src/styles/screen.sass'
          'assets/styles/qunit-git.css': 'src/styles/qunit-git.scss'
          'assets/styles/reset_test.css': 'src/styles/reset_test.sass'
          'assets/styles/test.css': 'src/styles/test.sass'
    postcss:
        options:
          map: true
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}),
            require('cssnano')()
          ]
        dist:
          src: 'assets/styles/screen.css'
    webpack:
      options: require("./webpack.config.js")

      dev:
        devtool: "sourcemap"
        debug: true

    watch:
      sass:
        files: ["src/styles/**"]
        tasks: ["sass", "postcss"]

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
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-imagemin"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-requirejs"
  grunt.loadNpmTasks "grunt-notify"
  grunt.loadNpmTasks "grunt-webpack"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-postcss"

  grunt.registerTask "init", ["sass", "postcss", "scripts:dev"]
  grunt.registerTask "default", ["sass", "postcss", "scripts:dev", "watch"]
  grunt.registerTask "scripts", ["webpack:dev"]
  grunt.registerTask "build", ["clean", "copy", "imagemin", "sass", "postcss", "scripts:dev", "notify:build"]
