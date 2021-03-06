"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var courseModel_1 = require("./models/courseModel");
var bodyParser = require("body-parser");
var professorModel_1 = require("./models/professorModel");
var lectureModel_1 = require("./models/lectureModel");
var studentModel_1 = require("./models/studentModel");
var attendanceModel_1 = require("./models/attendanceModel");
var GooglePassport_1 = require("./GooglePassport");
var expressSession = require('express-session');
var passport = require("passport");
var middleware_auth_1 = require("./middleware-auth");
var MongoStore = require('connect-mongo');
var cookieParser = require('cookie-parser');
// setting up endpoints
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.googlePassportObj = new GooglePassport_1["default"]();
        this.Courses = new courseModel_1.courseModel();
        this.Professors = new professorModel_1.professorModel();
        this.Lectures = new lectureModel_1.lectureModel();
        this.Students = new studentModel_1.studentModel();
        this.Attendances = new attendanceModel_1.attendanceModel();
    }
    App.prototype.middleware = function () {
        this.expressApp.use(cookieParser());
        // required for passport session
        this.expressApp.use(expressSession({
            secret: 'My Express App',
            saveUninitialized: false,
            resave: false,
            store: MongoStore.create({
                // mongoUrl: "mongodb://127.0.0.1:27017/attendance-tracker",
                mongoUrl: App.DB_CONNECTION_STRING,
                collection: 'sessions'
            })
        }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        //This will allow CORS permission for localhost:4200
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        //current User
        this.expressApp.use(function (req, res, next) {
            res.locals.currentUser = req.user;
            next();
        });
    };
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        // professor Google SSO routes
        router.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));
        router.get('/auth/error', function (req, res) { return res.send('Unknown Error'); });
        router.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }), function (req, res) {
            var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                user: req.user
            }));
            res.status(200).send(responseHTML);
        });
        // logout
        router.post('/logout', function (req, res) {
            req.logOut(function (err) {
                if (err) {
                    console.log("Error logging out " + err);
                }
                res.json({
                    "message": "Successfully logged out!!"
                });
            });
        });
        //create professor
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
        //Get a professor by professor id
        router.get('/professors/professorId/:professorId', middleware_auth_1.AuthMiddleWare.ensureAuth, function (req, res) {
            var professorId = req.params.professorId;
            console.log('Getting a professor with professorId: ' + professorId);
            _this.Professors.retrieveASingleProfessorByProfessorId(res, { professorId: professorId });
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
            _this.Students.retrieveAStudentById(res, { id: id });
        });
        //Get a student by student id
        router.get('/students/studentId/:studentId', function (req, res) {
            var studentId = req.params.studentId;
            console.log('Getting a student withs studentId: ' + studentId);
            _this.Students.retrieveASingleStudenteByStudentId(res, { studentId: studentId });
        });
        // Get Students By Course
        router.route("/find/:courseId").get(function (req, res) {
            var courseId = req.params.courseId;
            var findResult = _this.Students.model.find({}).populate('courseList');
            findResult.exec(function (err, studentsList) {
                res.json(studentsList.filter(function (student) { return student.courseList.filter(function (course) { return course.courseId == courseId; }).length > 0; }));
            });
        });
        // Delete a student by student Id
        router["delete"]('/students/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, student, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.query.studentId;
                        console.log('Deleting a student by Student ID: ' + id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Students.model.remove({ studentId: id })];
                    case 2:
                        student = _b.sent();
                        if (!student) {
                            return [2 /*return*/, res.status(404).send()];
                        }
                        console.log('Student deleted!');
                        res.status(200).send('Student deleted!');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        res.status(500).send();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // Delete a student by its Id
        router["delete"]('/students/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, student, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        console.log('Deleting a student by ID: ' + id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Students.model.findByIdAndDelete(id)];
                    case 2:
                        student = _b.sent();
                        if (!student) {
                            return [2 /*return*/, res.status(404).send()];
                        }
                        res.status(200).send(student);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        res.status(500).send();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //Update a student by its student Id
        router.patch('/students/update', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, student, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.query.studentId;
                        console.log('Updating a student by its ID: ' + id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Students.model.update({ studentId: id }, req.body, { "new": true, runValidators: true })];
                    case 2:
                        student = _b.sent();
                        if (!student) {
                            return [2 /*return*/, res.status(404).send()];
                        }
                        console.log(student);
                        res.status(200).send(student);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        res.status(400).send(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //Update a student by its Id
        router.patch('/students/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, student, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        console.log('Updating a student by its ID: ' + id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Students.model.findByIdAndUpdate(id, req.body, { "new": true, runValidators: true })];
                    case 2:
                        student = _b.sent();
                        if (!student) {
                            return [2 /*return*/, res.status(404).send()];
                        }
                        console.log(student);
                        res.status(200).send(student);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        res.status(400).send(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // map courses to professors
        router.post('/mapCourseToProfessor', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _b, courseId, professorId, course, professor, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = req.body, courseId = _b.courseId, professorId = _b.professorId;
                        return [4 /*yield*/, this.Courses.model.findById(courseId)];
                    case 1:
                        course = _c.sent();
                        return [4 /*yield*/, this.Professors.model.findById(professorId)];
                    case 2:
                        professor = _c.sent();
                        course.Professor = professorId;
                        professor.courseList.push(courseId);
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.Courses.model.findByIdAndUpdate({ _id: courseId }, course, { "new": true, runValidators: true })];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, this.Professors.model.findByIdAndUpdate({ _id: professorId }, professor, { "new": true, runValidators: true })];
                    case 5:
                        _c.sent();
                        res.status(200).send("Mapped");
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _c.sent();
                        res.status(400).send(e_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        // map courses to students
        router.post('/mapCourseToStudent', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _b, courseId, studentId, course, student, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = req.body, courseId = _b.courseId, studentId = _b.studentId;
                        return [4 /*yield*/, this.Courses.model.findById(courseId)];
                    case 1:
                        course = _c.sent();
                        return [4 /*yield*/, this.Students.model.findById(studentId)];
                    case 2:
                        student = _c.sent();
                        student.courseList = __spreadArray(__spreadArray([], student.courseList, true), [course], false);
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.Students.model.findByIdAndUpdate({ _id: studentId }, student, { "new": true, runValidators: true })];
                    case 4:
                        _c.sent();
                        res.status(200).json({
                            "result": "Mapped Successfully"
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_4 = _c.sent();
                        res.status(400).send(e_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        // map attendances to students
        router.post('/mapStudenttoAttendance', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _b, attendanceId, studentId, attendance, student, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = req.body, attendanceId = _b.attendanceId, studentId = _b.studentId;
                        return [4 /*yield*/, this.Attendances.model.findById(attendanceId)];
                    case 1:
                        attendance = _c.sent();
                        return [4 /*yield*/, this.Students.model.findById(studentId)];
                    case 2:
                        student = _c.sent();
                        attendance.Student = studentId;
                        student.attendanceList.push(attendanceId);
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.Attendances.model.findByIdAndUpdate({ _id: attendanceId }, attendance, { "new": true, runValidators: true })];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, this.Students.model.findByIdAndUpdate({ _id: studentId }, student, { "new": true, runValidators: true })
                            //res.status(200).send("Mapped")
                        ];
                    case 5:
                        _c.sent();
                        //res.status(200).send("Mapped")
                        res.status(201).json({
                            message: 'Mapped'
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        e_5 = _c.sent();
                        res.status(400).send(e_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
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
        // router.get('/courses', AuthMiddleWare.ensureAuth, (req, res) => {
        //     console.log("authenticating..")
        //     console.log(req.isAuthenticated())
        //     this.Courses.retrieveCourseLists(res);
        // });
        router.get('/courses', function (req, res) {
            console.log("authenticating..");
            console.log(req.isAuthenticated());
            _this.Courses.retrieveCourseLists(res);
        });
        // Get a course by id
        router.get('/courses/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a course with id : ' + id);
            _this.Courses.retrieveASingleCourse(res, { id: id });
        });
        //Get a courseobjId by course id
        router.get('/courses/obj/:courseId', function (req, res) {
            var courseId = req.params.courseId;
            var findResult = _this.Courses.model.find({ courseId: courseId });
            findResult.exec(function (err, courseObjId) {
                res.json(courseObjId);
            });
        });
        router.route("/find/:courseId").get(function (req, res) {
            var courseId = req.params.courseId;
            var findResult = _this.Students.model.find({}).populate('courseList');
            findResult.exec(function (err, studentsList) {
                res.json(studentsList.filter(function (student) { return student.courseList.filter(function (course) { return course.courseId == courseId; }).length > 0; }));
            });
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
        //Get a student by first name
        router.get('/students/studentFName/:fName', function (req, res) {
            var fName = req.params.fName;
            console.log('Getting a student with first name : ' + fName);
            _this.Students.retrieveStudentByfname(res, fName);
        });
        //Get a lecture by date and courseId
        router.get('/lectures/date/:date/courseId/:courseId', function (req, res) {
            var date = req.params.date;
            var courseId = req.params.courseId;
            console.log('Getting a lecture with date : ' + date);
            var temp = [date, courseId];
            console.log("temp" + temp);
            _this.Lectures.retrieveLecturesByDate(res, [date, courseId]);
        });
        //Get a lecture by secure code
        router.get('/lectures/code/:secureCode', function (req, res) {
            var code = req.params.secureCode;
            console.log('Getting a lecture with secure code: ' + code);
            _this.Lectures.retrieveASingleLectureByCode(res, { secureCode: code });
        });
        // Get lectures by course Id
        router.get('/lectures/course/:courseId', function (req, res) {
            var courseId = req.params.courseId;
            _this.Lectures.retrieveLecturesByCourse(res, { courseId: courseId });
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
        //Get an attendance by lecture id and student object id
        router.get('/attendances/lecture/:lectureId/student/:studentObjId', function (req, res) {
            var lectureId = req.params.lectureId;
            var studentObjId = req.params.studentObjId;
            console.log('Getting a lecture with lecture id : ' + lectureId);
            var temp = [lectureId, studentObjId];
            console.log("temp" + temp);
            _this.Attendances.retrieveAttendancesByLectureIdAndStudentId(res, [lectureId, studentObjId]);
        });
        //Get an attendance by lecture id
        router.get('/attendances/lecture/:lectureId', function (req, res) {
            var lectureId = req.params.lectureId;
            console.log('Getting a lecture with lecture id : ' + lectureId);
            var temp = lectureId;
            console.log("temp" + temp);
            _this.Attendances.retrieveAttendancesByLectureId(res, lectureId);
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static("../public"));
    };
    var _a;
    _a = App;
    App.mongoUsername = process.env.mongoUsername;
    App.mongoPassword = process.env.mongoPassword;
    App.DB_CONNECTION_STRING = 'mongodb+srv://' + _a.mongoUsername + ':' + _a.mongoPassword + '@cluster0.ztcdq.mongodb.net/attendance-tracker?retryWrites=true&w=majority';
    return App;
}());
exports.App = App;
