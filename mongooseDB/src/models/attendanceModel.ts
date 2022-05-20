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
                studentId: Number,
                status: String
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IattendanceModel>("Attendance", this.schema);
    }

    public retrieveAttendanceLists(res:any): any {
        var findResult = this.model.find({});
        console.log('list of attendances fetched: ');
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleAttendance(res:any, filter: {id: Number}) {
        var findResult = this.model.findById(filter.id);
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid ID'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }
}
export {attendanceModel};