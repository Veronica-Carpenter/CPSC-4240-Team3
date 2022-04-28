import Mongoose from "mongoose";
import internal from "stream";

interface ICourseModel extends Mongoose.Document{
    courseId: Number;
    courseName: String;
}
export{ICourseModel};