import Mongoose from "mongoose";

interface IstudentModel extends Mongoose.Document{
    studentId: Number;
    fname: String;
    lname: String;
    email: String;
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
export{IstudentModel};