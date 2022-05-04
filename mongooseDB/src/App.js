"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require('express');
// const Professor = require('./models/professorModel')
var usermodel_1 = require("./models/usermodel");
var courseModel_1 = require("./models/courseModel");
// const Lecture = require('./models/lectureModel')
var bodyParser = require("body-parser");
var professorModel_1 = require("./models/professorModel");
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
    }
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
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
        router.get('/users', function (req, res) {
            _this.Users.retrieveUserLists(res);
        });
        router.get('/users/:id', function (req, res) {
            var id = req.params.id;
            console.log('Getting a user with id : ' + id);
            _this.Users.retrieveASingleUser(res, { id: id });
        });
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
        this.expressApp.use('/', router);
    };
    return App;
}());
exports.App = App;
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById({_id}).then((user) => {
//         if (!user) {
//             res.status(404)
//             return res.send()
//         }
//         console.log("user fetched by Id: " + user)
//         res.send(user)
//     }).catch((error) => {
//         res.status(500)
//         res.send(error)
//     })
// })
// app.patch('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findByIdAndUpdate({_id}, req.body, {
//         new: true,
//         runValidators: true
//     }).then((user) => {
//         if (!user) {
//             res.status(404)
//             return res.send()
//         }
//         console.log('user updated: ')
//         console.log(user)
//         res.send(user)
//     }).catch((error) => {
//         res.status(400)
//         res.send(error)
//     })
// })
// app.post('/professors', (req, res) => {
//     console.log(req.body)
//     const professor = new Professor(req.body)
//     professor.save().then(() => {
//         res.send(professor)
//     }).catch((error) => {
//         console.log(error)
//         res.status(400)
//         res.send(error)
//     })
// })
// app.post("/lectures", (req, res)=>{
//     console.log(req.body)
//     const lecture = new Lecture (req.body)
//     lecture.save().then(()=>{
//         res.send(lecture)
//     }).catch((error) => {
//         console.log(error)
//         res.status(400)
//         res.send(error)
//     })
// })
