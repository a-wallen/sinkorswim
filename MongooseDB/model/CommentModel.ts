import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {ICommentModel} from '../interfaces/ICommentModel';
import {IPostModel} from '../interfaces/IPostModel';
import { json } from "body-parser";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

/*
Comments model
CRUD
create: post a comment
read: view a comment
update: like a comment, edit a comment
delete: delete a comment 
*/

class CommentModel {
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
                commentId: { type:String, required:true, index: { unique:true }},
                postId: { type:String, required:true },
                userId: { type:String, required:true },
                content: { type:String, required:true },
                timestamp: { type:String, required:true },
                likes: { type:Number }
            }, {collection: 'comments'}
        );
    }

    public createModel(): void {
      this.model = mongooseConnection.model<ICommentModel>("Comments", this.schema);
    }

    public createComment(response:any, commentObject:ICommentModel) {
      this.model.insertMany(commentObject)
        .then((result) => { response.json(result); })
        .catch((err) => { response.json(err); });
    }

    public retrieveComment(response:any, commentObject:ICommentModel){
      this.model.findOne({commentId: commentObject["commentId"]})
        .then((result) => {response.json(result); });
    }
    // view a comment 
    public retrieveComments(response:any, postObject:IPostModel) {
      this.model.find({postId: postObject["postId"]})
        .then((result) => { response.json(result); });
    }

    public updateComment(response:any, commentObject:ICommentModel){
      this.model.replaceOne({commentId: commentObject["commentId"]}, commentObject)
        .then((result) => { response.json(result); })
        .catch((err) => { response.json(err); });
    }

    // delete a comment 
    public deleteComment(response: any, commentObject: Object) {
      this.model.deleteMany({commentId: commentObject["commentId"]})
        .then((result) => { response.json(result); })
        .catch((err) => { response.json(err); });
    }
}
export {CommentModel};
