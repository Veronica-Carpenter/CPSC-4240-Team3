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
            studentId: Number,
            status: String
        });
    };
    attendanceModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Attendance", this.schema);
    };
    attendanceModel.prototype.retrieveAttendanceLists = function (res) {
        var findResult = this.model.find({});
        console.log('list of attendances fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    attendanceModel.prototype.retrieveASingleAttendance = function (res, filter) {
        var findResult = this.model.findById(filter.id);
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid ID' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    return attendanceModel;
}());
exports.attendanceModel = attendanceModel;
