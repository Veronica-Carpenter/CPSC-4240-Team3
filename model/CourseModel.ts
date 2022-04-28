import Mongoose from "mongoose";
import {DataAccess} from './../DataAccess';
import {ICourseModel} from '../interfaces/ICourseModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class CourseModel{
    public schema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(){
        this.schema = new Mongoose.Schema(
            {
                courseId: Number,
                courseName: String
            }, {collection: 'courses'}
        )
    }

    public createModel(){
        this.model = mongooseConnection.model<ICourseModel>("Courses", this.schema);
    }
}
export {CourseModel};