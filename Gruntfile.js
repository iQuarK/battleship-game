'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: 'src',
    tmp: '.tmp'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    config: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= config.src %>/{,*/}*.js'],
        tasks: ['jshint:all', 'babel'],
        options: {
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          '!Gruntfile.js',
          '<%= config.src %>/{,*/}*.js'
        ]
      }
    },
    clean: {
      dist: ['dist', '.tmp']
    },
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: [{
              expand: true,
              dot: true,
              dest: '<%= config.tmp %>',
              src: [
                '<%= config.src %>/{,*/}*.js'
              ]
            }]
        }
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'Spec'
      },
      all: ['test/spec']
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-node-new');

  grunt.registerTask('build', [
    'clean:dist',
    'jshint:all',
    'babel'
  ]);

  grunt.registerTask('test', [
    'clean:dist',
    'babel',
    'jasmine_node'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

};
