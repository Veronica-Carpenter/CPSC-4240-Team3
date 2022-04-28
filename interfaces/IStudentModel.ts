import Mongoose from "mongoose";
import internal from "stream";

interface IStudentModel extends Mongoose.Document{
    userId: Number;
    courseList:[
        {
            courseId: Number,
            courseName: String
        }
    ];
    attendanceList:[
        {
            lectureId: Number;
            date: Date;
            studentId: Number;
            status: String;
        }
    ];
}
export{IStudentModel};