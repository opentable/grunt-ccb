'use string';

var util = require('util'),
    request = require('request'),
    GitHubApi = require('github'),
    fs = require('fs');

module.exports = function(grunt){

    grunt.registerMultiTask('ccb', 'Create a CCB with manfiest information in JIRA', function(){

        var done = this.async(),
            options = this.options({});

        grunt.verbose.writeflags(options);

        done();
    });
};