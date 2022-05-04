import Mongoose = require("mongoose");

interface IuserModel extends Mongoose.Document {
    userId: Number,
    userName: String,
    password: String,
    fname: String,
    lname: String,
    email: String,
    userCategory: String
}
export {IuserModel};
