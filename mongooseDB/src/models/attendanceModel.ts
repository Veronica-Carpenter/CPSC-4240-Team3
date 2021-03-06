import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IattendanceModel} from '../interfaces/IattendanceModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class attendanceModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                lectureId: Number,
                date: Date,
                status: String,
                Student: {
                    type: Mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                    required: true
                }
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IattendanceModel>("Attendance", this.schema);
    }

    public retrieveAttendanceLists(res:any): any {
        var findResult = this.model.find({}).populate("Student");
        console.log('list of attendances fetched: ');
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleAttendance(res:any, filter: {id: any}) {
        var findResult = this.model.findById(filter.id).populate("Student");
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid ID'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveAttendancesByLectureIdAndStudentId(res, data) {
        var lectureId = data[0];
        var studentId = data[1];
        console.log("Lecture id: " + lectureId);
        console.log("student object id: " + studentId);
        var findResult = this.model.find({lectureId: lectureId, Student: {_id: studentId}});
        findResult.exec( (err, lectureArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid student id'})
            }
            res.json(lectureArray);
        });
    }

    public retrieveAttendancesByLectureId(res, data) {
        var lectureId = data;
        console.log("Lecture id: " + lectureId);
        var findResult = this.model.find({lectureId: lectureId});
        findResult.exec( (err, attendanceArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid lecture id'})
            }
            res.json(attendanceArray);
        });
    }
}
export {attendanceModel};