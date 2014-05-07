var http = require("http"),
    fs = require("fs"),
    server = {},

    createCbbRequest = fs.openSync('tests/data/actual/ccb-request.json', 'w'),
    inDevTransitionRequest = fs.openSync('tests/data/actual/in-dev-transition-request.json', 'w'),
    closeTransitionRequest = fs.openSync('tests/data/actual/close-transition-request.json', 'w');

module.exports = function(grunt){
    grunt.registerTask('start-jira-server', function(){
        server = http.createServer(function(request, response) {

            if (request.method != 'POST'){
                throw new Error("This dummy server only responds to POST requests");
            }

            var body = '';
            request.on('data', function (data) {
                body += data;
            });

            request.on('end', function () {

                var bodyJson = JSON.parse(body);

                if (request.url === '/issue/') //create ccb
                {
                    fs.writeSync(createCbbRequest, JSON.stringify({ headers: request.headers, url: request.url, body: bodyJson  }));
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.write('{ "id": 1234 }');
                }
                else if (bodyJson.transition.id === "11"){ //in-development

                    fs.writeSync(inDevTransitionRequest, JSON.stringify({ headers: request.headers, url: request.url, body: bodyJson }));
                    response.writeHead(200, {"Content-Type": "application/json"});

                } else if (bodyJson.transition.id === "21"){ //close

                    fs.writeSync(closeTransitionRequest, JSON.stringify({ headers: request.headers, url: request.url, body: bodyJson }));
                    response.writeHead(200, {"Content-Type": "application/json"});
                }
                response.end();
            });
        }).listen(8888);
    });
};