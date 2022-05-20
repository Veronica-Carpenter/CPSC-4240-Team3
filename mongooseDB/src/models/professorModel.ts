import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IprofessorModel} from '../interfaces/IprofessorModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class professorModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                professorId: Number,
                fname: String,
                lname: String,
                email: String,
                courseList :[
                    {
                        courseId: Number,
                        courseName: String
                    }
                ]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IprofessorModel>("Professor", this.schema);
    }

    public retrieveProfessorLists(res:any): any {
        var findResult = this.model.find({});
        console.log('list of professors fetched: ');
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleProfessor(res:any, filter: {id: Number}) {
        var findResult = this.model.findById(filter.id);
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }
}
export {professorModel};