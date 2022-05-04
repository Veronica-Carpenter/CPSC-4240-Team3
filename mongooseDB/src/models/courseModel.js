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
            courseName: String
        });
    };
    courseModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Course", this.schema);
    };
    return courseModel;
}());
exports.courseModel = courseModel;
