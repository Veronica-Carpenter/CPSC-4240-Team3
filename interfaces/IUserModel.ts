import Mongoose from "mongoose";
import internal from "stream";

interface IUserModel extends Mongoose.Document{
    userId: Number;
    userName: String;
    password: String;
    fname: String;
    lname: String;
    email: String;
    userCategory: String;
}
export{IUserModel};