import Mongoose from "mongoose";

interface IprofessorModel extends Mongoose.Document{
    professorId: String;
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