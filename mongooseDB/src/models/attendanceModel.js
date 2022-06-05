"use strict";
exports.__esModule = true;
exports.attendanceModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var attendanceModel = /** @class */ (function () {
    function attendanceModel() {
        this.createSchema();
        this.createModel();
    }
    attendanceModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            lectureId: Number,
            date: Date,
            status: String,
            Student: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "Student",
                required: true
            }
        });
    };
    attendanceModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Attendance", this.schema);
    };
    attendanceModel.prototype.retrieveAttendanceLists = function (res) {
        var findResult = this.model.find({}).populate("Student");
        console.log('list of attendances fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    attendanceModel.prototype.retrieveASingleAttendance = function (res, filter) {
        var findResult = this.model.findById(filter.id).populate("Student");
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid ID' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    attendanceModel.prototype.retrieveAttendancesByLectureIdAndStudentId = function (res, data) {
        var lectureId = data[0];
        var studentId = data[1];
        console.log("Lecture id: " + lectureId);
        console.log("student object id: " + studentId);
        var findResult = this.model.find({ lectureId: lectureId, Student: { _id: studentId } });
        findResult.exec(function (err, lectureArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid student id' });
            }
            res.json(lectureArray);
        });
    };
    attendanceModel.prototype.retrieveAttendancesByLectureId = function (res, data) {
        var lectureId = data;
        console.log("Lecture id: " + lectureId);
        var findResult = this.model.find({ lectureId: lectureId });
        findResult.exec(function (err, attendanceArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid lecture id' });
            }
            res.json(attendanceArray);
        });
    };
    return attendanceModel;
}());
exports.attendanceModel = attendanceModel;
