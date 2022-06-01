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
            professorId: {
                type: String,
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
            courseList: [{
                    type: Mongoose.Schema.Types.ObjectId,
                    ref: "Course",
                    required: true
                }]
        });
    };
    professorModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Professor", this.schema);
    };
    professorModel.prototype.retrieveProfessorLists = function (res) {
        var findResult = this.model.find({}).populate("courseList");
        console.log('list of professors fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    professorModel.prototype.retrieveASingleProfessor = function (res, filter) {
        var findResult = this.model.findById(filter.id).populate("courseList");
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid ID' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    professorModel.prototype.retrieveASingleProfessorByProfessorId = function (res, filter) {
        var findResult = this.model.findOne(filter).populate("courseList");
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid professor Id' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    return professorModel;
}());
exports.professorModel = professorModel;
