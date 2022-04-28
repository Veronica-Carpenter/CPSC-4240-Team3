import Mongoose from "mongoose";
import internal from "stream";

interface IProfessorModel extends Mongoose.Document{
    userId: Number;
    courseList:[
        {
            courseId: Number,
            courseName: String
        }
    ];
}
export{IProfessorModel};