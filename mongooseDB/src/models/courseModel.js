"use strict";
exports.__esModule = true;
exports.courseModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var courseModel = /** @class */ (function () {
    function courseModel() {
        this.createSchema();
        this.createModel();
    }
    courseModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            courseId: Number,
            courseName: String,
            courseDays: {
                day1: String,
                day2: String
            },
            courseTime: String
        });
    };
    courseModel.prototype.retrieveCourseLists = function (res) {
        var findResult = this.model.find({});
        console.log('list of courses fetched: ');
        findResult.exec(function (err, courseArray) {
            console.log(courseArray);
            res.json(courseArray);
        });
    };
    courseModel.prototype.retrieveASingleCourse = function (res, filter) {
        var findResult = this.model.findById(filter.id);
        findResult.exec(function (err, courseArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid ID' });
            }
            console.log(courseArray);
            res.json(courseArray);
        });
    };
    courseModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Course", this.schema);
    };
    return courseModel;
}());
exports.courseModel = courseModel;
