import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {ICommentModel} from '../interfaces/ICommentModel';

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
                commentId: { type:String, required:true },
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

    // view a comment 
    public retrieveComments(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, comment) => {
            if (err) {
                console.log('Error retrieving comment.'); 
            }
            response.json(comment);
        });
    }

    public updateComment(response:any, commentObject:ICommentModel){
      
    }

    // delete a comment 
    public deleteComment(response: any, filter: Object) {
        var query = this.model.deleteOne(filter); 
        query.exec( (err, comment) => {
            if (err) {
                console.log('Error deleting comment.'); 
            }
        }); 
    }

    // like a comment
    public likeComment(response: any, filter: Object) {
        var query = this.model.findOne(Object); 
        query.likes += 1;
        query.save(); 
    }

}
export {CommentModel};