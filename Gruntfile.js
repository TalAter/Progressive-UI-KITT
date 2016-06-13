module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/progressive-ui-kitt.js',
        'Gruntfile.js'
      ],
      options: {
        jshintrc: true
      }
    },
    uglify: {
      dist: {
        options: {
          preserveComments: /^\! /
        },
        files: {
          'dist/progressive-ui-kitt.min.js': ['src/progressive-ui-kitt.js']
        }
      }
    },
    watch: {
      files: ['src/progressive-ui-kitt.js', '!**/node_modules/**'],
      tasks: ['default']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);

  // Test task
  grunt.registerTask('test', ['jshint']);

};
