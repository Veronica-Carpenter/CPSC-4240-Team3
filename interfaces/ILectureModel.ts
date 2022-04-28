import Mongoose from "mongoose";
import internal from "stream";

interface ILectureModel extends Mongoose.Document{
    lectureId: Number;
    courseId: Number;
    courseName: String;
    date: Date;
    secureCode: Number;
}
export{ILectureModel};