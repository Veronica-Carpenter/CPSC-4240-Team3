"use strict";
exports.__esModule = true;
exports.lectureModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var lectureModel = /** @class */ (function () {
    function lectureModel() {
        this.createSchema();
        this.createModel();
    }
    lectureModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            lectureId: Number,
            courseId: Number,
            courseName: String,
            date: Date,
            secureCode: Number
        });
    };
    lectureModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Lecture", this.schema);
    };
    lectureModel.prototype.retrieveLectureLists = function (res) {
        var findResult = this.model.find({});
        console.log('list of lectures fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    lectureModel.prototype.retrieveASingleLecture = function (res, filter) {
        var findResult = this.model.findById(filter.id);
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid ID' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    return lectureModel;
}());
exports.lectureModel = lectureModel;
