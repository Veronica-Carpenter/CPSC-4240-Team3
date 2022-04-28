import Mongoose from "mongoose";
import {DataAccess} from './../DataAccess';
import {IProfessorModel} from '../interfaces/IProfessorModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ProfessorModel{
    public schema: any;
    public innerSchema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(){
        this.schema = new Mongoose.Schema(
            {
                userId: Number,
                courseList:[
                    {
                        courseId: Number,
                        courseName: String
                    }
                ]
            }, {collection: 'professors'}
        );
    }

    public createModel(){
        this.model = mongooseConnection.model<IProfessorModel>("Professors", this.schema);
    }
}

export {ProfessorModel};