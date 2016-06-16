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
            standalone: 'ProgressiveKITT',
            debug: true
          }
        }
      },
    },
    watch: {
      files: ['src/progressive-ui-kitt.js', 'test/specs/*Spec.js', 'themes/**/*', 'test/helper_functions.js', '!**/node_modules/**'],
      tasks: ['default']
    },
    connect: {
      server: {
        options: {
          protocol: 'https',
          port: 8443,
          hostname: '*',
          base: '.',
          open: 'https://localhost:8443/demo'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/themes/flat.css': 'themes/flat/flat.scss',
          'dist/themes/basic.css': 'themes/basic.scss'
        }
      }
    },
    markdox: {
      dist: {
        files: [
          {src: 'src/progressive-ui-kitt.js', dest: 'docs/README.md'}
        ]
      }
    },
    jasmine: {
      testAndCoverage: {
        src: ['dist/progressive-ui-kitt.js'],
        options: {
          specs: ['test/specs/*Spec.js'],
          outfile: 'test/SpecRunner.html',
          polyfills: ['test/helper_functions.js'],
          vendor: ['test/vendor/jquery-2.1.4.min.js', 'test/vendor/jasmine-jquery.js'],
          styles: ['dist/themes/basic.css'],
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
              statements: 60,
              branches: 40,
              functions: 90,
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-markdox');

  // Register tasks.
  grunt.registerTask('default', ['jshint', 'browserify', 'sass', 'jasmine', 'markdox']);
  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('serve', ['default', 'connect', 'watch']);

};
