import Mongoose from "mongoose";

interface IprofessorModel extends Mongoose.Document{
    professorId: Number;
    fName: String;
    lName: String;
    email: String;
    courseList:[
        {
            courseId: Number,
            courseName: String
        }
    ];
}
export{IprofessorModel};