module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        mochaTest:{
            options: {
                reporter: 'spec'
            },
            tests:{
                src: ['tests/ccb-tests.js']
            }
        },
        "ccb": {
            test: {
                options: {
                    jira: {
                        api_url: "http://localhost:8888/",
                        user: "user",
                        password: "password",
                        project_id: "4321",
                        ccb_issue_type: 20
                    },
                    project: {
                        name: "project",
                        version: "0.0.1"
                    },
                    manifest: "tests/data/manifest.json"

                }
            },

            beavers_test: {
                options: {
                    jira: {
                        api_url: "https://opentable.atlassian.net/rest/api/2/",
                        user: "user",
                        password: "password",
                        project_id: "4321",
                        ccb_issue_type: 20
                    },
                    project: {
                        name: "project",
                        version: "0.0.1"
                    },
                    manifest: "manifest/manifest.json"
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['jshint',  'start-jira-server', 'ccb:test', 'mochaTest']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');
};