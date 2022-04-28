import { ChangeStreamDocument } from "mongodb";
import Mongoose from "mongoose";
import internal from "stream";

interface IAttendanceModel extends Mongoose.Document{
    lectureId: Number;
    date: Date;
    studentId: Number;
    status: String;
    
}
export{IAttendanceModel};