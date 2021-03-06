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
                courseName: String,
                courseDays: {
                    day1: String,
                    day2: String
                },
                courseTime: String,
                Professor: {
                    type:  Mongoose.Schema.Types.ObjectId,
                    ref: "Professor"
                }
            }
        );
    }

    public retrieveCourseLists(res:any): any {
        var findResult = this.model.find({}).populate("Professor");
        console.log('list of courses fetched: ');
        findResult.exec((err, courseArray) => {
            console.log(courseArray);
            res.json(courseArray);
        });
    }

    public retrieveASingleCourse(res:any, filter: {id : any}) {
        var findResult = this.model.findById(filter.id).populate("Professor");
        
        findResult.exec((err, courseArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid ID'})
            }
            console.log(courseArray);
            res.json(courseArray);
        });
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IcourseModel>("Course", this.schema);
    }
}
export {courseModel};