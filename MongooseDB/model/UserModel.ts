import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { STATUS_CODES } from "http";


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
                userId: { type: String, required: true, index: {unique: true}},
                userName: { type: String, required: true }, 
                password: { type: String, required: true },
                email: { type: String, required: true }, 
                avatar_url: { type: String },
                totalUpvotes: { type: Number },
                swimmingPosts: { type: Number },
                sinkingPosts: { type: Number }, 
                reports: { type: Number }
            }, {collection: 'users'}
        );
    }

    // create a user
    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }
    
    public createUser(response:any, userObject: IUserModel){
        this.model.insertMany(userObject)
            .then((result) => { response.json(result); })
            .catch((err) => { response.json(err) });
    }

    // get user details
    public retrieveUserDetails(response:any, filter:Object) {
        this.model.findOne(filter)
            .then((result) => {response.json(result);})
            .catch((err) => {response.json(err);});
    }

    public updateUserDetails(response:any, userObject:IUserModel){
        this.model.replaceOne({userId: userObject["userId"]}, userObject)
            .then((result) => { response.json(result); })
            .catch((err) => { response.json(err); });
    }

    public deleteUser(response:any, userObject:IUserModel){
        this.model.deleteOne(userObject)
            .then((result) => { response.json(result); })
            .catch((err) => { response.json(err) });
    }

    private mongoExecHandler(response:any, mongoQuery){
        mongoQuery.exec( (err, result) => {
            response.json(err ? err : result);
        }); 
    }

}
export {UserModel};
