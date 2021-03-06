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
                studentId: {
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
                courseList :[
                    {
                        type: Mongoose.Schema.Types.ObjectId,
                        ref: "Course"
                    }
                ],
                attendanceList: [
                    {
                        type: Mongoose.Schema.Types.ObjectId,
                        ref: "Attendance"
                    }
                ]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IstudentModel>("Student", this.schema);
    }

    public retrieveStudentLists(res:any): any {
        var findResult = this.model.find({}).populate("attendanceList").populate("courseList");
        console.log('list of students fetched: ');
        findResult.exec( (err, studentArray) => {
            console.log(studentArray);
            res.json(studentArray);
        });
    }

    public retrieveAStudentById(res:any, filter: {id: any}) {
        var findResult = this.model.findById(filter.id).populate("attendanceList").populate("courseList");
        findResult.exec( (err, studentArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid ID'})
            }
            console.log(studentArray);
            res.json(studentArray);
        });
    }

    public retrieveASingleStudenteByStudentId(res:any, filter: Object) {
        var findResult = this.model.findOne(filter).populate("attendanceList").populate("courseList");
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid student Id'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveStudentByfname(res, fName) {
        var findResult = this.model.find({fname: fName})
        findResult.exec( (err, lectureArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid student first name'})
            }
            res.json(lectureArray);
        });
    }

}
export {studentModel};