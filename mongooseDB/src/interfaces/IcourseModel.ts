import Mongoose = require("mongoose");

interface IcourseModel extends Mongoose.Document {
    courseId: number;
    courseName: string;
    courseDays: {
        day1: String,
        day2: String
    };
    courseTime: Date;
}
export {IcourseModel};
