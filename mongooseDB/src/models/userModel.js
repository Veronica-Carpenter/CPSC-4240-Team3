"use strict";
exports.__esModule = true;
exports.userModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var userModel = /** @class */ (function () {
    function userModel() {
        this.createSchema();
        this.createModel();
    }
    userModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: Number,
            userName: String,
            password: String,
            fname: String,
            lname: String,
            email: String,
            userCategory: String
        });
    };
    userModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("User", this.schema);
    };
    userModel.prototype.retrieveUserLists = function (res) {
        var findResult = this.model.find({});
        console.log('list of users fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    userModel.prototype.retrieveASingleUser = function (res, filter) {
        var findResult = this.model.findOne(filter);
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    return userModel;
}());
exports.userModel = userModel;
