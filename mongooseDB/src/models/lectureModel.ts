import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IlectureModel} from '../interfaces/IlectureModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class lectureModel {
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
                courseId: Number,
                courseName: String,
                date: Date,
                secureCode: Number
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IlectureModel>("Lecture", this.schema);
    }

    public retrieveLectureLists(res:any): any {
        var findResult = this.model.find({});
        console.log('list of lectures fetched: ');
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleLecture(res:any, filter:Object) {
        var findResult = this.model.findOne(filter);
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }
}
export {lectureModel};