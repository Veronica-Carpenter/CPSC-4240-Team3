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
            studentId: {
                type: Number,
                required: true,
                unique: true
            },
            fname: {
                type: String,
                required: true
            },
            lname: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            courseList: [
                {
                    type: Mongoose.Schema.Types.ObjectId,
                    ref: "Course"
                }
            ],
            attendanceList: [
                {
                    type: Mongoose.Schema.Types.ObjectId,
                    ref: "Attendance"
                }
            ]
        });
    };
    studentModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Student", this.schema);
    };
    studentModel.prototype.retrieveStudentLists = function (res) {
        var findResult = this.model.find({}).populate("attendanceList").populate("courseList");
        console.log('list of students fetched: ');
        findResult.exec(function (err, studentArray) {
            console.log(studentArray);
            res.json(studentArray);
        });
    };
    studentModel.prototype.retrieveAStudentById = function (res, filter) {
        var findResult = this.model.findById(filter.id).populate("attendanceList").populate("courseList");
        findResult.exec(function (err, studentArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid ID' });
            }
            console.log(studentArray);
            res.json(studentArray);
        });
    };
    studentModel.prototype.retrieveASingleStudenteByStudentId = function (res, filter) {
        var findResult = this.model.findOne(filter).populate("attendanceList").populate("courseList");
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid student Id' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    studentModel.prototype.retrieveStudentByfname = function (res, fName) {
        var findResult = this.model.find({ fname: fName });
        findResult.exec(function (err, lectureArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid student first name' });
            }
            res.json(lectureArray);
        });
    };
    return studentModel;
}());
exports.studentModel = studentModel;
