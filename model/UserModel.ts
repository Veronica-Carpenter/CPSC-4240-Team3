import Mongoose from "mongoose";
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel{
    public schema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(){
        this.schema = new Mongoose.Schema(
            {
                userId: Number,
                userName: String,
                password: String,
                fname: String,
                lname: String,
                email: String,
                userCategory: String
            }, {collection: 'users'}
        )
    }

    public createModel(){
        this.model = mongooseConnection.model<IUserModel>("Users", this.schema);
    }
}
export {UserModel};