'use string';

var util = require('util'),
    request = require('request'),
    fs = require('fs'),
    q = require('q');

module.exports = function(grunt){

    grunt.registerMultiTask('ccb', 'Create a CCB with manifest information in JIRA', function(){

        var done = this.async(),
            options = this.options({});
        grunt.verbose.writeflags(options);

        // todo: this should probably be passed in (as would be different for non-Opentable users)
        var createCcbContents = function(){

            return {
                fields: {
                    project: {
                        id: options.jira.project_id
                    },
                    summary: util.format('Deploying %s %s to production', options.project.name, options.build_number),
                    issuetype: {
                        id: options.jira.ccb_issue_type
                    },
                    customfield_11502: grunt.template.today("isoDateTime"),
                    customfield_11505: 'Commit log:\n\n' + grunt.file.read(options.manifest)
                }
            };

        };

        var createCbb = function(){

            var ccbContents = createCcbContents(),
                deferred = q.defer();

            request({
                url: options.jira.api_url + "issue/",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                    // todo: add user agent
                },
                method: 'POST',
                auth: {
                    user: options.jira.user,
                    pass: options.jira.password
                },
                json: ccbContents
            }, function(error, response, body){

                if (response.statusCode >= 300 || error){
                    deferred.reject(error);
                }
                else{
                    var ccbId = body.id;
                    grunt.log.writeln('CCB ID is: ' + ccbId);

                    deferred.resolve(ccbId);
                }
            });

            return deferred.promise;
        };

        var updateCcbToInDevelopmentState = function(ccbId){

            var deferred = q.defer();

            request({
                url: options.jira.api_url + util.format("issue/%s/transitions", ccbId),
                headers: {
                    "Content-Type": "application/json"
                    // todo: add user agent
                },
                method: 'POST',
                auth: {
                    user: options.jira.user,
                    pass: options.jira.password
                },
                json: {
                    "transition":
                    {
                        "id": "11"
                    }
                }
            }, function(error, response, body){

                if (error){
                    deferred.reject(error);
                }
                else{
                    deferred.resolve(ccbId);
                }
            });

            return deferred.promise;

        };

        var closeCcb = function(ccbId){

            var deferred = q.defer();

            request({
                url: options.jira.api_url + util.format("issue/%s/transitions", ccbId),
                headers: {
                    "Content-Type": "application/json"
                    // todo: add user agent
                },
                method: 'POST',
                auth: {
                    user: options.jira.user,
                    pass: options.jira.password
                },
                json: {
                    "transition":
                    {
                        "id": "21"
                    }
                }
            }, function(error, response, body){

                if (error){
                    deferred.reject(error);
                }
                else{
                    deferred.resolve();
                }
            });

            return deferred.promise;

        };

        createCbb()
            .then(updateCcbToInDevelopmentState)
            .then(closeCcb)
            .catch(function(error){
                grunt.fatal.fail(error);
            })
            .done(done);

    });
};
