'use string';

var util = require('util'),
    request = require('request'),
    GitHubApi = require('github'),
    fs = require('fs');

module.exports = function(grunt){

    grunt.registerMultiTask('package-github-data', 'Adds information from Github about this project to package.json', function(){

        var done = this.async(),
            options = this.options({});

        grunt.verbose.writeflags(options);

        done();
    });
};