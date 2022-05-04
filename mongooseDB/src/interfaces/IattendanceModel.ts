import { ChangeStreamDocument } from "mongodb";
import Mongoose from "mongoose";

interface IattendanceModel extends Mongoose.Document{
    lectureId: Number;
    date: Date;
    studentId: Number;
    status: String;
    
}
export{IattendanceModel};