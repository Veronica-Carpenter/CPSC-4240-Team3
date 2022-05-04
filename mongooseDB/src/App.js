"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var usermodel_1 = require("./models/usermodel");
var courseModel_1 = require("./models/courseModel");
var bodyParser = require("body-parser");
var professorModel_1 = require("./models/professorModel");
var lectureModel_1 = require("./models/lectureModel");
var studentModel_1 = require("./models/studentModel");
var attendanceModel_1 = require("./models/attendanceModel");
// setting up endpoints
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express.Application;
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Users = new usermodel_1.userModel();
        this.Courses = new courseModel_1.courseModel();
        this.Professors = new professorModel_1.professorModel();
        this.Lectures = new lectureModel_1.lectureModel();
        this.Students = new studentModel_1.studentModel();
        this.Attendances = new attendanceModel_1.attendanceModel();
    }
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        // Add a new user
        router.post('/users', function (req, res) {
            var user = req.body;
            var userList = new _this.Users.model(user);
            userList.save().then(function () {
                console.log(userList);
                res.send(userList);
            })["catch"](function (error) {
                res.status(400);
                res.send(error);
            });
        });
        // Get all the users
        router.get('/users', function (req, res) {
            _this.Users.retrieveUserLists(res);
        });
        // Get a user by id
        router.get('/users/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a user with id : ' + id);
            _this.Users.retrieveASingleUser(res, { id: id });
        });
        // Add a new course
        router.post('/courses', function (req, res) {
            var course = req.body;
            var courseList = new _this.Courses.model(course);
            courseList.save().then(function () {
                console.log(courseList);
                res.send(courseList);
            })["catch"](function (error) {
                res.status(400);
                res.send(error);
            });
        });
        //Add a new professor
        router.post('/professors', function (req, res) {
            var professor = req.body;
            var professorList = new _this.Professors.model(professor);
            professorList.save().then(function () {
                console.log(professorList);
                res.send(professorList);
            })["catch"](function (error) {
                res.status(400);
                res.send(error);
            });
        });
        //Get all professors
        router.get('/professors', function (req, res) {
            _this.Professors.retrieveProfessorLists(res);
        });
        //Get a professor by id
        router.get('/professors/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a professor with id : ' + id);
            _this.Professors.retrieveASingleProfessor(res, { professorId: id });
        });
        //Add a new lecture
        router.post('/lectures', function (req, res) {
            var lecture = req.body;
            var lectureList = new _this.Lectures.model(lecture);
            lectureList.save().then(function () {
                console.log(lectureList);
                res.send(lectureList);
            })["catch"](function (error) {
                res.status(400);
                res.send(error);
            });
        });
        //Get all lectures
        router.get('/lectures', function (req, res) {
            _this.Lectures.retrieveLectureLists(res);
        });
        //Get a lecture by id
        router.get('/lectures/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a lecture with id : ' + id);
            _this.Lectures.retrieveASingleLecture(res, { lectureId: id });
        });
        //Add a new student
        router.post('/students', function (req, res) {
            var student = req.body;
            var studentList = new _this.Students.model(student);
            studentList.save().then(function () {
                console.log(studentList);
                res.send(studentList);
            })["catch"](function (error) {
                res.status(400);
                res.send(error);
            });
        });
        //Get all students
        router.get('/students', function (req, res) {
            _this.Students.retrieveStudentLists(res);
        });
        //Get a student by id
        router.get('/students/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a student with id : ' + id);
            _this.Students.retrieveASingleStudent(res, { studentId: id });
        });
        //Add a new attendance record 
        router.post('/attendances', function (req, res) {
            var attendance = req.body;
            var attendanceList = new _this.Attendances.model(attendance);
            attendanceList.save().then(function () {
                console.log(attendanceList);
                res.send(attendanceList);
            })["catch"](function (error) {
                res.status(400);
                res.send(error);
            });
        });
        //Get all attendances
        router.get('/attendances', function (req, res) {
            _this.Attendances.retrieveAttendanceLists(res);
        });
        //Get an attendance by student id
        router.get('/attendances/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a attendance with id : ' + id);
            _this.Attendances.retrieveASingleAttendance(res, { studentId: id });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static("../public"));
    };
    return App;
}());
exports.App = App;
