import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IcourseModel} from '../interfaces/IcourseModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class courseModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                courseId: Number,
                courseName: String
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IcourseModel>("Course", this.schema);
    }
}
export {courseModel};