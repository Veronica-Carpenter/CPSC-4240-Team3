"use strict";
exports.__esModule = true;
exports.lectureModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)('1234567890', 7);
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var lectureModel = /** @class */ (function () {
    function lectureModel() {
        this.createSchema();
        this.createModel();
    }
    lectureModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            lectureId: {
                type: Number,
                required: true,
                "default": function () { return nanoid(); },
                index: { unique: true }
            },
            courseId: Number,
            date: Date,
            secureCode: {
                type: Number,
                required: true,
                "default": function () { return nanoid(); },
                index: { unique: true }
            }
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
    lectureModel.prototype.retrieveASingleLectureByCode = function (res, filter) {
        var findResult = this.model.findOne(filter);
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid secure code' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    lectureModel.prototype.retrieveLecturesByCourse = function (res, _a) {
        var courseId = _a.courseId;
        var findResult = this.model.find({ courseId: courseId });
        findResult.exec(function (err, lectureArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid course Id' });
            }
            res.json(lectureArray);
        });
    };
    lectureModel.prototype.retrieveLecturesByDate = function (res, date) {
        //  console.log("date2: " , new Date(date));
        //console.log("type " , typeof(new Date(date)));
        var findResult = this.model.find({ date: { $gte: new Date(new Date(date)).setHours(0, 0, 0), $lt: new Date(new Date(date).setHours(23, 59, 59)) } });
        findResult.exec(function (err, lectureArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid course Id' });
            }
            res.json(lectureArray);
        });
    };
    return lectureModel;
}());
exports.lectureModel = lectureModel;
