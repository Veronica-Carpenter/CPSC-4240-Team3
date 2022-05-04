import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IuserModel} from '../interfaces/IuserModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class userModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userId: Number,
                userName: String,
                password: String,
                fname: String,
                lname: String,
                email: String,
                userCategory: String
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IuserModel>("User", this.schema);
    }

    public retrieveUserLists(res:any): any {
        var findResult = this.model.find({});
        console.log('list of users fetched: ');
        findResult.exec((err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveASingleUser(res:any, filter: {id : number}) {
        var findResult = this.model.findById(filter.id);
        findResult.exec((err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }
}
export {userModel};
