import Mongoose from "mongoose";

interface IlectureModel extends Mongoose.Document{
    lectureId: Number;
    courseId: Number;
    courseName: String;
    date: Date;
    secureCode: Number;
}
export{IlectureModel};