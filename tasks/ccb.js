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
            try
            {
                return {
                    fields: {
                        project: {
                            id: options.jira.project_id
                        },
                        summary: util.format('Deploying %s %s to production', options.project.name, options.buildNumber),
                        issuetype: {
                            id: options.jira.ccb_issue_type
                        },
                        customfield_11502: grunt.template.today("isoDateTime"),
                        customfield_11505: 'Commit log:\n\n' + grunt.file.read(options.manifest)
                    }
                };
            }
            catch(err){
                grunt.fail(err);
            }
        };

        var createCbb = function(){
            grunt.verbose.writeln("Creating CCB");

            var ccbContents = createCcbContents(),
                deferred = q.defer();

            grunt.verbose.writeln(JSON.stringify(ccbContents));

            request({
                url: options.jira.api_url + "issue/",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "User-Agent" : "Node Request"
                },
                method: 'POST',
                auth: {
                    user: options.jira.user,
                    pass: options.jira.password
                },
                proxy: options.jira.proxy,
                json: ccbContents
            }, function(error, response, body){
                if (error) {
                    deferred.reject(error);
                }
                else if (response.statusCode >= 300 ) {
                    deferred.reject(response.statusCode + " - bad response: " + JSON.stringify(response));
                }
                else {
                    var ccbId = body.id;
                    grunt.log.writeln('CCB ID is: ' + ccbId);
                    deferred.resolve(ccbId);
                }
            });

            return deferred.promise;
        };

        var updateCcbToDone = function(ccbId){
            grunt.verbose.writeln("Updating CCB to 'Done' state");

            var deferred = q.defer();

            request({
                url: options.jira.api_url + util.format("issue/%s/transitions", ccbId),
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent" : "Node Request"
                },
                method: 'POST',
                auth: {
                    user: options.jira.user,
                    pass: options.jira.password
                },
                proxy: options.jira.proxy,
                json: {
                    "transition":
                    {
                        "id": options.jira.ccb_done_state
                    }
                }
            }, function(error, response, body){
                if (error) {
                    deferred.reject(error);
                }
                else if (response.statusCode >= 300 ) {
                    deferred.reject(response.statusCode + " - bad response: " + JSON.stringify(response));
                }
                else {
                    deferred.resolve(ccbId);
                }
            });

            return deferred.promise;
        };

        createCbb()
            .then(function(ccbId){
                return updateCcbToDone(ccbId);
            })
            .catch(function(error){
                grunt.fatal(error);
            })
            .done(function(){
                grunt.verbose.writeln("Done!");
                done();
            });

    });
};
