module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/progressive-ui-kitt.js',
        'src/progressive-ui-kitt-sw-helper.js',
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
      standaloneSWHelper: {
        src: [ 'src/progressive-ui-kitt-sw-helper.js' ],
        dest: 'dist/progressive-ui-kitt-sw-helper.js',
        options: {
          plugin: [
            [ "minifyify", { output: "dist/progressive-ui-kitt-sw-helper.js.map", map: 'progressive-ui-kitt-sw-helper.js.map' } ],
            [ "browserify-header" ]
          ],
          browserifyOptions: {
            standalone: 'ProgressiveKITT',
            debug: true
          }
        }
      }
    },
    watch: {
      files: ['src/progressive-ui-kitt.js', 'src/progressive-ui-kitt-sw-helper.js', 'test/specs/*Spec.js', 'themes/**/*', 'test/helper_functions.js', '!**/node_modules/**'],
      tasks: ['default']
    },
    connect: {
      server: {
        options: {
          protocol: 'http',
          port: 8443,
          hostname: '*',
          base: '.',
          open: 'http://localhost:8443/demo'
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
          'dist/themes/flat-amethyst.css': 'themes/flat-amethyst/flat-amethyst.scss',
          'dist/themes/flat-clouds.css': 'themes/flat-clouds/flat-clouds.scss',
          'dist/themes/flat-concrete.css': 'themes/flat-concrete/flat-concrete.scss',
          'dist/themes/flat-emerald.css': 'themes/flat-emerald/flat-emerald.scss',
          'dist/themes/flat-lime.css': 'themes/flat-lime/flat-lime.scss',
          'dist/themes/flat-midnight-blue.css': 'themes/flat-midnight-blue/flat-midnight-blue.scss',
          'dist/themes/flat-orange.css': 'themes/flat-orange/flat-orange.scss',
          'dist/themes/flat-pomegranate.css': 'themes/flat-pomegranate/flat-pomegranate.scss',
          'dist/themes/flat-pumpkin.css': 'themes/flat-pumpkin/flat-pumpkin.scss',
          'dist/themes/flat-sand.css': 'themes/flat-sand/flat-sand.scss',
          'dist/themes/flat-stormy.css': 'themes/flat-stormy/flat-stormy.scss',
          'dist/themes/flat-turquoise.css': 'themes/flat-turquoise/flat-turquoise.scss',
          'dist/themes/basic.css': 'themes/basic.scss'
        }
      }
    },
    markdox: {
      dist: {
        files: [
          {src: 'src/progressive-ui-kitt.js', dest: 'docs/README.md'},
          {src: 'src/progressive-ui-kitt-sw-helper.js', dest: 'docs/README-sw-helper.md'}
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-markdox');

  // Register tasks.
  grunt.registerTask('default', ['jshint', 'browserify', 'sass', 'jasmine', 'markdox']);
  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('serve', ['default', 'connect', 'watch']);

};
