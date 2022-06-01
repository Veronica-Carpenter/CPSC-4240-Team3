"use strict";
exports.__esModule = true;
exports.DataAccess = void 0;
var Mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config();
var DataAccess = /** @class */ (function () {
    //static DB_CONNECTION_STRING: string = 'mongodb+srv://' + this.mongoUsername +':' + this.mongoPassword + '@cluster0.ztcdq.mongodb.net/attendance-tracker?retryWrites=true&w=majority';
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    DataAccess.mongoUsername = process.env.mongoUsername;
    DataAccess.mongoPassword = process.env.mongoPassword;
    DataAccess.DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/attendance-tracker';
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
