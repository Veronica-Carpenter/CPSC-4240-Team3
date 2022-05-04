import Mongoose = require("mongoose");

interface IcourseModel extends Mongoose.Document {
    courseId: number;
    courseName: string;
}
export {IcourseModel};
