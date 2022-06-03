var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/App');
var mongoose = require('mongoose');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');

const { studentModel } = require('../src/models/studentModel');
const { professorModel } = require('../src/models/professorModel');

chai.use(chaiHttp);

describe('Testing API routes', () => {

    // Test GET routes
    describe('Test GET/ routes', () => {

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
                response.body.length.should.be.above(0);
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
        });

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
                // response.body.length.should.be.eq(1);
                response.body.length.should.be.above(0);
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
                // response.body.length.should.be.eq(1);
                response.body.length.should.be.above(0);
                response.body.should.not.be.a('string');
            });

            it('should have first entry of array with some known properties', () => {
                expect(requestResult[0]).to.include.keys('courseId');
                expect(requestResult[0]).to.include.keys('courseName');
                expect(requestResult[0]).to.include.keys('_id');
            });
        });

        // Test the GET lectures routes
        describe("Get all lectures", () => {

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
                response.body.length.should.be.above(0);
                response.body.should.not.be.a('string');
            });

            it('should have first entry of array with some known properties', () => {
                expect(requestResult[0]).to.include.keys('courseId');
                expect(requestResult[0]).to.include.keys('lectureId');
                expect(requestResult[0]).to.include.keys('date');
                expect(requestResult[0]).to.include.keys('secureCode');
            });
        });
    });

    // Tets GET/:id routes
    describe('Test GET/:id routes', () => {

        // get a student by Id
        it('get a student by id', (done) => {
            let student = new studentModel();
            let studenttobeInserted = {
                studentId : "101",
                fname: "Shipra",
                lname: "Shipra",
                email: "shipra@sample.edu"
            };
            student.model(studenttobeInserted).save((err, res) => {
                chai.request("http://localhost:8080")
                    .get('/students/' + res._id)
                    .send(student)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('studentId');
                        res.body.should.have.property('fname');
                        res.body.should.have.property('lname');
                        res.body.should.have.property('email');
                    done();    
                });
           });
        });

        // get a professor by Id
        it('get a professor by id', (done) => {
            let professor = new professorModel();
            let professorToBeInserted = {
                professorId : "101",
                fname: "ABC",
                lname: "ABC",
                email: "abc@sample.edu"
            };
            professor.model(professorToBeInserted).save((err, res) => {
                chai.request("http://localhost:8080")
                    .get('/professors/' + res._id)
                    .send(professor)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('professorId');
                        res.body.should.have.property('fname');
                        res.body.should.have.property('lname');
                        res.body.should.have.property('email');
                    done();    
                });
           });
        });
    });

    // Test POST/ routes
    describe('Test POST/ routes', () => {

        // Test the POST student route
        describe("Post a student", () => {

            it('should post a student', (done) => {
                let student = {
                    studentId : "201",
                    fname: "Shipra",
                    lname: "Shipra",
                    email: "shipra@sample.edu"
                }
    
                chai.request("http://localhost:8080")
                    .post('/students')
                    .send(student)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('studentId');
                        res.body.should.have.property('fname');
                        res.body.should.have.property('lname');
                        res.body.should.have.property('email');
                    done();
                });
            });
    
            it('should not post a student without studentId, fname, lname and email', (done) => {
                let student = {
                    studentId : "999",
                    fname: "Shipra",
                    lname: "Shipra"
                }
    
                chai.request("http://localhost:8080")
                    .post('/students')
                    .send(student)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('email');
                        res.body.errors.email.should.have.property('kind').eq('required');
                    done();
                });
            });
        });
    });
});