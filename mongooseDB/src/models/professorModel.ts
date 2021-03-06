import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IprofessorModel} from '../interfaces/IprofessorModel';
import { courseModel } from "./courseModel";

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
                professorId: {
                    type: String,
                    required: true,
                    unique: true
                },
                fname: {
                    type: String,
                    required: true
                },
                lname: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                courseList :  [{
                 type:    Mongoose.Schema.Types.ObjectId,
                 ref: "Course",
                 required: true
                } ]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IprofessorModel>("Professor", this.schema);
    }

    public retrieveProfessorLists(res:any): any {
        var findResult = this.model.find({}).populate("courseList");
        console.log('list of professors fetched: ');
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleProfessor(res:any, filter: {id: any}) {
        var findResult = this.model.findById(filter.id).populate("courseList");
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid ID'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleProfessorByProfessorId(res:any, filter: Object) {
        var findResult = this.model.findOne(filter).populate("courseList");
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid professor Id'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }
}
export {professorModel};