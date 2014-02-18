/*
 * grunt-extendscript
 * https://github.com/megurock/grunt-psdslicer
 *
 * Copyright (c) 2014 Eiji Meguro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

    // Project configuration.
    grunt.initConfig({
        jshint: {
          all: [
            'Gruntfile.js',
            'tasks/*.js'
          ],
          options: {
            jshintrc: '.jshintrc',
          },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
          tests: ['test/css/main.css'],
        },

        // Configuration to be run (and then tested).
        psdslicer: {
            main: {
                psd: [ "test/psd/social.psd", "test/psd/arrows.psd" ],
                template: "test/template/main_template.css",
                dest: "test/css/main.css"
            }
        }
    });  

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'psdslicer']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};