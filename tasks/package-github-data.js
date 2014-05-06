'use string';

var util = require('util'),
    request = require('request'),
    GitHubApi = require('github'),
    fs = require('fs');

module.exports = function(grunt){

    grunt.registerMultiTask('package-github-data', 'Adds information from Github about this project to package.json', function(){

        var done = this.async(),
            options = this.options({}),
            packagejson = require('../package.json');

        grunt.verbose.writeflags(options);

        var github = new GitHubApi({
            version: "3.0.0"
            // todo: add User Agent
        });

        if (options.github.o_auth_token) {
            github.authenticate({
                type: "oauth",
                token: options.github.o_auth_token
            });
        }

        github.repos.getCommits({
            user: options.github.user,
            repo: options.github.repo
        }, function(err, res) {
            if (err){
                grunt.fatal.fail("Error when requesting commits from Github: " + err);
            }
            else{
                var lastCommit = res[0];

                grunt.verbose.writeln("Last commit: " + JSON.stringify(lastCommit));

                packagejson.sha = lastCommit.sha;
                packagejson.lastCommitTimestamp = lastCommit.commit.committer.date;

                grunt.file.write('package.json', JSON.stringify(packagejson, null, 2));

                done();
            }
        });
    });
};