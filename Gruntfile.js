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
    browserify: {
      standalone: {
        src: [ 'src/progressive-ui-kitt.js' ],
        dest: 'dist/progressive-ui-kitt.js',
        options: {
          plugin: [
            [ "minifyify", { output: "dist/progressive-ui-kitt.js.map", map: 'progressive-ui-kitt.js.map' } ],
            [ "browserify-header" ]
          ],
          browserifyOptions: {
            standalone: 'puikitt',
            debug: true
          }
        }
      },
    },
    watch: {
      files: ['src/progressive-ui-kitt.js', '!**/node_modules/**'],
      tasks: ['default']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'browserify']);

  // Test task
  grunt.registerTask('test', ['jshint']);

};
