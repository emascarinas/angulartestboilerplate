/*
 * grunt-protractor-coverage
 * https://github.com/r3b/grunt-protractor-coverage
 *
 * Copyright (c) 2014 ryan bridges
 * Licensed under the APLv2 license.
 */

'use strict';
var tmp = require('tmp');
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'build', 'instrumented', 'coverage-e2e']
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'instrumented/app'
                }
            }
        },
        // Configuration to be run (and then tested).
        protractor_coverage: {
            options: {
                configFile: "protractor.conf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                coverageDir: 'coverage-e2e',
                args: {}
            },
            local: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:3000/',
                        // Arguments passed to the command
                        'browser': 'chrome'
                    }
                }
            },
            remote: {
                options: {
                    configFile: "test/protractorConf.remote.js", // Default config file
                    args: {
                        baseUrl: 'http://localhost:3000/',
                        // Arguments passed to the command
                        'browser': 'chrome'
                    }
                }
            }
        },
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../instrumented/app/js/'
            }
        },
        copy: {
            'instrument': {
                files: [{
                        src: ['app/**/*', '!app/js/**/*.js'],
                        dest: 'instrumented/'
                    }]
            }
        },
        instrument: {
            files: ['app/**/*.js', '!app/lib/**/*.js'], //excludes scripts under lib for coverage
            options: {
                basePath: "instrumented"
            }
        },
        makeReport: {
            src: 'coverage-e2e/**/*.json',
            options: {
                type: 'lcov',
                dir: 'coverage-e2e',
                print: 'detail'
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-istanbul');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'copy', 'instrument', 'connect:server', 'protractor_coverage:local', 'makeReport']);
    //grunt.registerTask('test', ['clean', 'copy', 'instrument']);

    grunt.registerTask('test-remote', ['clean', 'copy', 'instrument', 'connect:server', 'protractor_coverage:remote', 'makeReport']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
