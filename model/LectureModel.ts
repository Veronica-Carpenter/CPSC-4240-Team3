import Mongoose from "mongoose";
import {DataAccess} from './../DataAccess';
import {ILectureModel} from '../interfaces/ILectureModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class LectureModel{
    public schema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(){
        this.schema = new Mongoose.Schema(
            {
                lectureId: Number,
                courseId: Number,
                courseName: String,
                date: Date,
                secureCode: Number
            }, {collection: 'lectures'}
        )
    }

    public createModel(){
        this.model = mongooseConnection.model<ILectureModel>("Lectures", this.schema);
    }
}
export {LectureModel};