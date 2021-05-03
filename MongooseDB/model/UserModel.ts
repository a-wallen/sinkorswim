import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { STATUS_CODES } from "http";
import { ITaskModel } from "../interfaces/ITaskModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

/* Methods to add:
CRUD
create a new user
get user info (via id)
update user information: update username, update email, update password, 
update user activity: totalUpvotes, swimmingPosts, sinkingPosts, reports
delete: delete a user 
 */


class UserModel {
    public schema:any;
    public innerSchema:any;
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
                email: String, 
                totalUpvotes: Number,
                swimmingPosts: Number,
                sinkingPosts: Number, 
                reports: Number
            }, {collection: 'users'}
        );
    }

    // create a user
    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }
    
    // get user details
    public retrieveUserDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter); 
        query.exec( (err, userDetails) => {
            response.json(userDetails); 
        }); 
    }
    
    public saveUser(userObj:IUserModel){
        console.log(userObj);
        //var query = this.model.save(userObj);
    } 
    /*
    public retrieveTasksDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray); 
        });
    }

    public retrieveTasksCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerTaskList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerTaskList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of tasks: ' + innerTaskList.tasks.length);
                    response.json('{count:' + innerTaskList.tasks.length + '}');
                }
            }
        });
    }
    */

}
export {UserModel};