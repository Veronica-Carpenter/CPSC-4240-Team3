var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/App');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Testing API routes', () => {

    // Test the GET student routes
    describe("Get all students", () => {

        var requestResult;
        var response; 

        before((done) => {
            chai.request("http://localhost:8080")
            .get("/students")
			.end((err, res) => {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(response).to.have.status(200);
				done();
			});
        });

        it('should return array of object with more than 1 object', () => {
            response.should.have.status(200);
            response.body.should.be.an('array');
            response.body.length.should.be.eq(7);
            response.body.should.not.be.a('string');
        });

        it('should have first entry of array with some known properties', () => {
            expect(requestResult[0]).to.include.keys('studentId');
            expect(requestResult[0]).to.include.keys('fname');
            expect(requestResult[0]).to.include.keys('lname');
            expect(requestResult[0]).to.include.keys('email');
            expect(requestResult[0]).to.have.deep.property('courseList').that.is.a('array');
            expect(requestResult[0]).to.have.deep.property('attendanceList').that.is.a('array');
        });
    })

    // Test the GET professor routes
    describe("Get all professors", () => {

        var requestResult;
        var response; 

        before((done) => {
            chai.request("http://localhost:8080")
            .get("/professors")
			.end((err, res) => {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(response).to.have.status(200);
				done();
			});
        });

        it('should return array of object with more than 1 object', () => {
            response.should.have.status(200);
            response.body.should.be.an('array');
            response.body.length.should.be.eq(4);
            response.body.should.not.be.a('string');
        });

        it('should have first entry of array with some known properties', () => {
            expect(requestResult[0]).to.include.keys('professorId');
            expect(requestResult[0]).to.include.keys('fname');
            expect(requestResult[0]).to.include.keys('lname');
            expect(requestResult[0]).to.include.keys('email');
            expect(requestResult[0]).to.have.deep.property('courseList').that.is.a('array');
        });
    });

    // Test the GET courses routes
    describe("Get all courses", () => {

        var requestResult;
        var response; 

        before((done) => {
            chai.request("http://localhost:8080")
            .get("/courses")
			.end((err, res) => {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(response).to.have.status(200);
				done();
			});
        });

        it('should return array of object with more than 1 object', () => {
            response.should.have.status(200);
            response.body.should.be.an('array');
            response.body.length.should.be.eq(7);
            response.body.should.not.be.a('string');
        });

        it('should have first entry of array with some known properties', () => {
            expect(requestResult[0]).to.include.keys('courseId');
            expect(requestResult[0]).to.include.keys('courseName');
            expect(requestResult[0]).to.include.keys('_id');
        });
    });

    // Test the GET lectures routes
    describe("Get all courses", () => {

        var requestResult;
        var response; 

        before((done) => {
            chai.request("http://localhost:8080")
            .get("/lectures")
			.end((err, res) => {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(response).to.have.status(200);
				done();
			});
        });

        it('should return array of object with more than 1 object', () => {
            response.should.have.status(200);
            response.body.should.be.an('array');
            response.body.length.should.be.eq(16);
            response.body.should.not.be.a('string');
        });

        it('should have first entry of array with some known properties', () => {
            expect(requestResult[0]).to.include.keys('courseId');
            expect(requestResult[0]).to.include.keys('lectureId');
            expect(requestResult[0]).to.include.keys('courseName');
            expect(requestResult[0]).to.include.keys('date');
            expect(requestResult[0]).to.include.keys('secureCode');
        });
    });
})