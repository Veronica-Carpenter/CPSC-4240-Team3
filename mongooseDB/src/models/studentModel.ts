import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IstudentModel} from '../interfaces/IstudentModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class studentModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                studentId: Number,
                fname: String,
                lname: String,
                email: String,
                courseList :[
                    {
                        courseId: Number,
                        courseName: String
                    }
                ],
                attendanceList:[
                    {
                        lectureId: Number,
                        date: Date,
                        studentId: Number,
                        status: String
                    }
                ]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IstudentModel>("Student", this.schema);
    }

    public retrieveStudentLists(res:any): any {
        var findResult = this.model.find({});
        console.log('list of students fetched: ');
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleStudent(res:any, filter:Object) {
        var findResult = this.model.findOne(filter);
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }
}
export {studentModel};