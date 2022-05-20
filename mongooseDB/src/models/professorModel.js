"use strict";
exports.__esModule = true;
exports.professorModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var professorModel = /** @class */ (function () {
    function professorModel() {
        this.createSchema();
        this.createModel();
    }
    professorModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            professorId: Number,
            fname: String,
            lname: String,
            email: String,
            courseList: [
                {
                    courseId: Number,
                    courseName: String
                }
            ]
        });
    };
    professorModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Professor", this.schema);
    };
    professorModel.prototype.retrieveProfessorLists = function (res) {
        var findResult = this.model.find({});
        console.log('list of professors fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    professorModel.prototype.retrieveASingleProfessor = function (res, filter) {
        var findResult = this.model.findById(filter.id);
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    return professorModel;
}());
exports.professorModel = professorModel;
