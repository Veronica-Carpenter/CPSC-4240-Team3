"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;

var CourseModel = /** @class */ (function() {
    function CourseModel(){
        this.createSchema();
        this.createModel();
    }

    CourseModel.prototype.createSchema = function(){
        this.schema = new Mongoose.Schema({
            courseId: Number,
            courseName: String
        }, {collection: 'courses'});
    };

    CourseModel.prototype.createModel = function(){
        this.model = mongooseConnection.model("Courses", this.schema)
    };


    return CourseModel;
}());


exports.CourseModel = CourseModel;