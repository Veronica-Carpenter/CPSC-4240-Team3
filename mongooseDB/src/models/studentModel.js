"use strict";
exports.__esModule = true;
exports.studentModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var studentModel = /** @class */ (function () {
    function studentModel() {
        this.createSchema();
        this.createModel();
    }
    studentModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            studentId: Number,
            fname: String,
            lname: String,
            email: String,
            courseList: [
                {
                    courseId: Number,
                    courseName: String
                }
            ],
            attendanceList: [
                {
                    lectureId: Number,
                    date: Date,
                    studentId: Number,
                    status: String
                }
            ]
        });
    };
    studentModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Student", this.schema);
    };
    studentModel.prototype.retrieveStudentLists = function (res) {
        var findResult = this.model.find({});
        console.log('list of students fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    studentModel.prototype.retrieveASingleStudent = function (res, filter) {
        var findResult = this.model.findOne(filter);
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    return studentModel;
}());
exports.studentModel = studentModel;
