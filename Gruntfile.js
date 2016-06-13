module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/progressive-ui-kitt.js',
        'Gruntfile.js',
        'test/specs/*Spec.js'
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
    },
    jasmine: {
      testAndCoverage: {
        src: ['dist/progressive-ui-kitt.js'],
        options: {
          specs: ['test/specs/*Spec.js'],
          outfile: 'test/SpecRunner.html',
          keepRunner: true,
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'test/coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'test/coverage'
                }
              },
              {
                type: 'text'
              }
            ],
            thresholds: {
              statements: 50,
              branches: 30,
              functions: 80,
              lines: 90
            }
          }
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'browserify', 'jasmine']);

  // Test task
  grunt.registerTask('test', ['jshint']);

};
