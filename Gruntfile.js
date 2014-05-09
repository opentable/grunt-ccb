module.exports = function(grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json');

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
                      name: "projectname",
                      version:"projectversion"
                    },
                    manifest: "tests/data/manifest.json",
                    build_label: "grunt-ccb_1234"
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
