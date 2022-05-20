var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/App')

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('sample test', () => {
    it('should get all the students', (done) => {
        assert.equal(-1, [1,2,3].indexOf(5));
        assert.equal(-1, [1,2,3].indexOf(0));
    });

    it('new World!', function(){
        
    });
});