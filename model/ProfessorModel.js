"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;

var ProfessorModel = /** @class */ (function() {
    function ProfessorModel(){
        this.createSchema();
        this.createModel();
    }

    ProfessorModel.prototype.createSchema = function(){
        this.schema = new Mongoose.Schema({
            userId: Number,
            courseList:[
                {
                    courseId: Number,
                    courseName: String
                }
            ]
        }, {collection: 'professors'});
    };

    ProfessorModel.prototype.createModel = function(){
        this.model = mongooseConnection.model("Professors", this.schema)
    };

    return ProfessorModel;
}());


exports.ProfessorModel = ProfessorModel;