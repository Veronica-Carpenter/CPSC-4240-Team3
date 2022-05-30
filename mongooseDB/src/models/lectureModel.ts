import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IlectureModel} from '../interfaces/IlectureModel';

import{customAlphabet} from 'nanoid';
const nanoid = customAlphabet('1234567890', 7);

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
                lectureId: {
                    type: Number,
                    required: true,
                    default: () => nanoid(),
                    index: {unique: true},
                },
                courseId : Number,
                date: Date,
                secureCode: {
                    type: Number,
                    required: true,
                    default: () => nanoid(),
                    index: {unique: true},
                }
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

    public retrieveASingleLecture(res:any, filter: {id: any}) {
        var findResult = this.model.findById(filter.id);
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid ID'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleLectureByCode(res:any, filter: Object) {
        var findResult = this.model.findOne(filter);
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid secure code'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }
    public retrieveLecturesByCourse(res, {courseId}) {
        var findResult = this.model.find({courseId})
        findResult.exec( (err, lectureArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid course Id'})
            }
            res.json(lectureArray);
        });
    }

    public retrieveLecturesByDate(res, date) {
        var findResult = this.model.find({date: {$gte: new Date (new Date(date)).setHours(0,0,0) , $lt: new Date(new Date(date).setHours(23,59,59))}})
        findResult.exec( (err, lectureArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid date'})
            }
            res.json(lectureArray);
        });
    }

    
}
export {lectureModel};