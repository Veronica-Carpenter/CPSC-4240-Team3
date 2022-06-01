import Mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    static mongoUsername: string = process.env.mongoUsername;
    static mongoPassword: string = process.env.mongoPassword; 
    static DB_CONNECTION_STRING:string = 'mongodb://127.0.0.1:27017/attendance-tracker';
    // static DB_CONNECTION_STRING: string = 'mongodb+srv://' + this.mongoUsername +':' + this.mongoPassword + '@cluster0.ztcdq.mongodb.net/attendance-tracker?retryWrites=true&w=majority';
    
    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();
export {DataAccess};