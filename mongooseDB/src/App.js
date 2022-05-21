"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var courseModel_1 = require("./models/courseModel");
var bodyParser = require("body-parser");
var professorModel_1 = require("./models/professorModel");
var lectureModel_1 = require("./models/lectureModel");
var studentModel_1 = require("./models/studentModel");
var attendanceModel_1 = require("./models/attendanceModel");
// setting up endpoints
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Courses = new courseModel_1.courseModel();
        this.Professors = new professorModel_1.professorModel();
        this.Lectures = new lectureModel_1.lectureModel();
        this.Students = new studentModel_1.studentModel();
        this.Attendances = new attendanceModel_1.attendanceModel();
    }
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
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
            _this.Professors.retrieveASingleProfessor(res, { id: id });
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
            _this.Students.retrieveASingleStudent(res, { id: id });
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
        //Get all courses
        router.get('/courses', function (req, res) {
            _this.Courses.retrieveCourseLists(res);
        });
        // Get a course by id
        router.get('/courses/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a course with id : ' + id);
            _this.Courses.retrieveASingleCourse(res, { id: id });
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
            _this.Lectures.retrieveASingleLecture(res, { id: id });
        });
        //Get a lecture by secure code
        router.get('/lectures/code/:secureCode', function (req, res) {
            var code = req.params.secureCode;
            console.log('Getting a lecture with secure code: ' + code);
            _this.Lectures.retrieveASingleLectureByCode(res, { secureCode: code });
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
            _this.Attendances.retrieveASingleAttendance(res, { id: id });
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static("../public"));
    };
    return App;
}());
exports.App = App;
