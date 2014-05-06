var fs = require('fs'),
    should = require('should'),
    packagejson = require('../package.json'),
    util = require('util');

describe("updating the package.json with sha and last commit date", function(){

    it ("should populate lastCommitTimestamp with a valid date", function(){
        packagejson.should.have.property("lastCommitTimestamp");
        var isDate = util.isDate(new Date(packagejson.lastCommitTimestamp));
        isDate.should.be.true;
    })

    it ("should populate the sha property", function(){
        packagejson.should.have.property("sha");
        packagejson.should.not.be.empty;
    })
})