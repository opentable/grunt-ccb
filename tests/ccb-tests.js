var should = require('should'),
    fs = require('fs');

describe('issuing the create ccb request', function(){

    var actual = JSON.parse(fs.readFileSync('tests/data/actual/ccb-request.json'));
    var expected = JSON.parse(fs.readFileSync('tests/data/expected/ccb-request.json'));

    it('should set the host correctly', function(){
        actual.headers.host.should.be.equal(expected.headers.host);
    });

    it('should set authorization header correctly', function(){
        actual.headers.authorization.should.be.equal(expected.headers.authorization);
    });

    it('should set url correctly', function(){
        actual.url.should.be.equal(expected.url);
    });

    it('should send the correct body', function(){
        actual.body.should.be.eql(expected.body);
    });
});

describe('issuing the transition ticket to in-development request', function(){

    var actual = JSON.parse(fs.readFileSync('tests/data/actual/in-dev-transition-request.json'));
    var expected = JSON.parse(fs.readFileSync('tests/data/expected/in-dev-transition-request.json'));

    it('should set the host correctly', function(){
        actual.headers.host.should.be.equal(expected.headers.host);
    });

    it('should set authorization header correctly', function(){
        actual.headers.authorization.should.be.equal(expected.headers.authorization);
    });

    it('should set url correctly', function(){
        actual.url.should.be.equal(expected.url);
    });

    it('should send the correct body', function(){
        actual.body.should.be.eql(expected.body);
    });
});

describe('issuing the close ticket request', function(){

    var actual = JSON.parse(fs.readFileSync('tests/data/actual/close-transition-request.json'));
    var expected = JSON.parse(fs.readFileSync('tests/data/expected/close-transition-request.json'));

    it('should set the host correctly', function(){
        actual.headers.host.should.be.equal(expected.headers.host);
    });

    it('should set authorization header correctly', function(){
        actual.headers.authorization.should.be.equal(expected.headers.authorization);
    });

    it('should set url correctly', function(){
        actual.url.should.be.equal(expected.url);
    });

    it('should send the correct body', function(){
        actual.body.should.be.eql(expected.body);
    });
});