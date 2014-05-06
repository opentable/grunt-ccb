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
                src: ['tests/package-github-data-tests.js']
            }
        },
        "package-github-data": {
            test: {
                options: {
                    github: {
                        user: "christriddle",
                        repo: "grunt-package-github"
                    }
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['jshint', 'removePackageProperties', 'package-github-data:test', 'mochaTest']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');

    grunt.registerTask('removePackageProperties', 'Removes the lastCommitTimestamp and sha from the package.json', function(){
        var packagejson = require('./package.json');
        delete packagejson.lastCommitTimestamp;
        delete packagejson.sha;
        packagejson.monkey = "woo";
        grunt.verbose.write(packagejson);
        grunt.file.write('package.json', JSON.stringify(packagejson, null, 2));
    });
};