"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;

var UserModel = /** @class */ (function() {
    function UserModel(){
        this.createSchema();
        this.createModel();
    }

    UserModel.prototype.createSchema = function(){
        this.schema = new Mongoose.Schema({
            userId: Number,
            userName: String,
            password: String,
            fname: String,
            lname: String,
            email: String,
            userCategory: String
        }, {collection: 'users'});
    };

    UserModel.prototype.createModel = function(){
        this.model = mongooseConnection.model("Users", this.schema)
    };


    return UserModel;
}());


exports.UserModel = UserModel;