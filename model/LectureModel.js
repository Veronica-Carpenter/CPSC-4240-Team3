"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;

var LectureModel = /** @class */ (function() {
    function LectureModel(){
        this.createSchema();
        this.createModel();
    }

    LectureModel.prototype.createSchema = function(){
        this.schema = new Mongoose.Schema({
            lectureId: Number,
            courseId: Number,
            courseName: String,
            date: Date,
            secureCode: Number
        }, {collection: 'lectures'});
    };

    LectureModel.prototype.createModel = function(){
        this.model = mongooseConnection.model("Lectures", this.schema)
    };


    return LectureModel;
}());


exports.LectureModel = LectureModel;